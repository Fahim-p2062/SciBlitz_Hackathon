import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { apiRouter } from './routes/api';
import { initFirebaseAdmin } from './services/firebase';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecosortha';

// ──────────────────────────────────────────────────────────
// SECURITY: CORS Origin Whitelist
// ──────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://sci-blitz-hackathon.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, server-to-server)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} is not allowed.`));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ──────────────────────────────────────────────────────────
// SECURITY: Request body size limit (prevents payload flooding / DoS)
// ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));

// ──────────────────────────────────────────────────────────
// SECURITY: Security headers (anti-clickjacking, MIME sniffing, XSS)
// ──────────────────────────────────────────────────────────
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=self, microphone=(), geolocation=()');
  next();
});

// ──────────────────────────────────────────────────────────
// SECURITY: Simple in-memory rate limiter (100 req / 15 min per IP)
// ──────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 100;

function rateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(clientIp);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
      retryAfterMs: entry.resetAt - now
    });
  }

  entry.count++;
  next();
}

// Apply rate limiting to all mutation (POST/DELETE) endpoints
app.use('/api', (req, res, next) => {
  if (req.method === 'POST' || req.method === 'DELETE') {
    return rateLimiter(req, res, next);
  }
  next();
});

// API Routes
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.json({
    project: 'EcoSortha TypeScript + Mongoose Backend',
    status: 'online',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'memory-fallback-active',
    endpoints: [
      'GET /api/stats',
      'GET /api/dustbins',
      'POST /api/dustbins/:binId/empty',
      'GET /api/ledger',
      'POST /api/ledger/block',
      'GET /api/notifications'
    ]
  });
});

async function startServer() {
  initFirebaseAdmin();

  try {
    // SECURITY: Log only hostname, mask credentials
    const safeUri = MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
    console.log(`Connecting to MongoDB at ${safeUri}...`);
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 2500
    });
    console.log('Successfully connected to MongoDB via Mongoose!');
  } catch (err) {
    console.warn('MongoDB connection failed or local server not running. Resilient in-memory fallback adapter active.');
  }

  app.listen(PORT, () => {
    console.log(`EcoSortha TypeScript Backend Server listening on port ${PORT}`);
  });
}

startServer();
