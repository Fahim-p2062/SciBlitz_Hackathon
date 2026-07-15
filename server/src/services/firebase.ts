import fs from 'fs';
import path from 'path';

// Firebase configuration parameters provided by user
const FIREBASE_DB_URL = 'https://smartdustbin-696a9-default-rtdb.asia-southeast1.firebasedatabase.app';
const FIREBASE_SECRET_KEY = 'OabTeHdFKGmnrK4w69lcNLhj64HzzjFtqFokCYHG';

let adminInstance: any = null;
let isAdminInitialized = false;

export function initFirebaseAdmin() {
  if (isAdminInitialized) return;
  try {
    const admin = require('firebase-admin');
    
    // Check if serviceAccountKey.json exists locally
    const serviceAccountPath = path.resolve(__dirname, '../../serviceAccountKey.json');
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = require(serviceAccountPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: FIREBASE_DB_URL
      });
      console.log('Firebase Admin SDK initialized successfully with serviceAccountKey.json');
      adminInstance = admin;
    } else {
      console.log('No serviceAccountKey.json found. Using Firebase REST / Secret Key mode for live tracking.');
    }
    isAdminInitialized = true;
  } catch (err) {
    console.warn('Firebase Admin init notice:', (err as Error).message);
    isAdminInitialized = true;
  }
}

export interface LiveHardwareTelemetry {
  fillLevel: number;
  distance: number;
  lastUpdated: string;
}

// Global cached telemetry to ensure low-latency API response
let cachedTelemetry: LiveHardwareTelemetry = {
  fillLevel: 100, // default latest read from RTDB
  distance: 0,
  lastUpdated: new Date().toISOString()
};

/**
 * Fetches live dustbin telemetry from Firebase Realtime Database
 */
export async function getLiveHardwareTelemetry(): Promise<LiveHardwareTelemetry> {
  // First, if admin SDK is initialized and connected, try reading via Admin SDK
  if (adminInstance) {
    try {
      const db = adminInstance.database();
      const ref = db.ref('/binData');
      const snapshot = await ref.once('value');
      const data = snapshot.val();
      const parsedFill = parseFirebasePayload(data);
      if (parsedFill !== null) {
        cachedTelemetry = {
          fillLevel: parsedFill.fillPercent,
          distance: parsedFill.distance,
          lastUpdated: new Date().toISOString()
        };
        return cachedTelemetry;
      }
    } catch (adminErr) {
      // Fallback to REST API below
    }
  }

  // Fallback / Primary REST API call using secret KEY
  try {
    const url = `${FIREBASE_DB_URL}/binData.json?auth=${FIREBASE_SECRET_KEY}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const parsedFill = parseFirebasePayload(data);
      if (parsedFill !== null) {
        cachedTelemetry = {
          fillLevel: parsedFill.fillPercent,
          distance: parsedFill.distance,
          lastUpdated: new Date().toISOString()
        };
      }
    }
  } catch (restErr) {
    console.warn('Error fetching live Firebase RTDB via REST:', restErr);
  }

  return cachedTelemetry;
}

function parseFirebasePayload(data: any): { fillPercent: number; distance: number } | null {
  if (!data) return null;
  // Check structure when querying /binData directly: {"bin1":{"distance":13,"fillPercent":0}, ...}
  if (data.bin1 && typeof data.bin1.fillPercent === 'number') {
    return { fillPercent: Math.round(Math.min(100, Math.max(0, data.bin1.fillPercent)) * 10) / 10, distance: data.bin1.distance || 0 };
  }
  // Check structure when querying root: {"binData":{"bin1":{"distance":0,"fillPercent":100}, ...}}
  if (data.binData && data.binData.bin1) {
    const b = data.binData.bin1;
    if (typeof b.fillPercent === 'number') {
      return { fillPercent: Math.round(Math.min(100, Math.max(0, b.fillPercent)) * 10) / 10, distance: b.distance || 0 };
    }
  }
  if (data.binData) {
    for (const key of Object.keys(data.binData)) {
      const b = data.binData[key];
      if (b && typeof b.fillPercent === 'number') {
        return { fillPercent: Math.round(Math.min(100, Math.max(0, b.fillPercent)) * 10) / 10, distance: b.distance || 0 };
      }
    }
  }
  if (typeof data.fillPercent === 'number') {
    return { fillPercent: Math.round(Math.min(100, Math.max(0, data.fillPercent)) * 10) / 10, distance: data.distance || 0 };
  }
  return null;
}
