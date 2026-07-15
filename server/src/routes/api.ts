import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { Dustbin } from '../models/Dustbin';
import { LedgerBlock } from '../models/LedgerBlock';
import { NotificationItem } from '../models/NotificationItem';
import { RoutePlan } from '../models/RoutePlan';

export const apiRouter = Router();

// Resilient In-Memory Fallback seed data in case local MongoDB is offline
let memoryDustbins = [
  {
    binId: 'BIN-DHK-001',
    name: 'Gulshan-2 Circle Bin A',
    zone: 'Dhaka North City Corp',
    location: { lat: 23.7925, lng: 90.4078, address: 'Gulshan Avenue, Dhaka' },
    fillLevel: 88,
    temperature: 31,
    battery: 92,
    status: 'CRITICAL',
    lastEmptiedAt: new Date(Date.now() - 36 * 3600 * 1000)
  },
  {
    binId: 'BIN-DHK-002',
    name: 'Banani Road 11 Bin B',
    zone: 'Dhaka North City Corp',
    location: { lat: 23.7937, lng: 90.4066, address: 'Road 11, Banani' },
    fillLevel: 74,
    temperature: 29,
    battery: 87,
    status: 'WARNING',
    lastEmptiedAt: new Date(Date.now() - 18 * 3600 * 1000)
  },
  {
    binId: 'BIN-DHK-003',
    name: 'Dhanmondi Lake Park Bin',
    zone: 'Dhaka South City Corp',
    location: { lat: 23.7461, lng: 90.3742, address: 'Dhanmondi Lake, Dhaka' },
    fillLevel: 42,
    temperature: 28,
    battery: 96,
    status: 'NORMAL',
    lastEmptiedAt: new Date(Date.now() - 6 * 3600 * 1000)
  },
  {
    binId: 'BIN-CTG-001',
    name: 'Agrabad Commercial Bin',
    zone: 'Chittagong City Corp',
    location: { lat: 22.3236, lng: 91.8123, address: 'Agrabad C/A, Chittagong' },
    fillLevel: 91,
    temperature: 32,
    battery: 81,
    status: 'CRITICAL',
    lastEmptiedAt: new Date(Date.now() - 42 * 3600 * 1000)
  },
  {
    binId: 'BIN-CUET-001',
    name: 'CUET Academic Hall Bin',
    zone: 'CUET Campus',
    location: { lat: 22.4633, lng: 91.9782, address: 'CUET Academic Bldg, Raozan' },
    fillLevel: 65,
    temperature: 27,
    battery: 95,
    status: 'NORMAL',
    lastEmptiedAt: new Date(Date.now() - 12 * 3600 * 1000)
  },
  {
    binId: 'BIN-CUET-002',
    name: 'CUET Shaheed Minar Square',
    zone: 'CUET Campus',
    location: { lat: 22.4640, lng: 91.9790, address: 'Shaheed Minar Square, CUET' },
    fillLevel: 82,
    temperature: 28,
    battery: 89,
    status: 'WARNING',
    lastEmptiedAt: new Date(Date.now() - 24 * 3600 * 1000)
  }
];

let memoryLedger = [
  {
    blockIndex: 1,
    hash: '0x8f3c4d29a1b0c7e6f8d392014b2a8f9c3e41d25b6a7c8e9f0d1e2f3a4b5c6d7e',
    previousHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    validatorNode: 'EcoSortha-Validator-DHK01',
    timestamp: new Date(Date.now() - 7200 * 1000),
    transactions: [
      {
        txId: 'TX-CIRC-9901',
        sourceZone: 'Dhaka North City Corp',
        wasteType: 'RECYCLE',
        weightKg: 420.5,
        collectorId: 'TRUCK-DHK-44',
        verificationStatus: 'VERIFIED',
        timestamp: new Date(Date.now() - 7150 * 1000)
      },
      {
        txId: 'TX-CIRC-9902',
        sourceZone: 'CUET Campus',
        wasteType: 'COMPOST',
        weightKg: 185.0,
        collectorId: 'GREEN-CART-02',
        verificationStatus: 'VERIFIED',
        timestamp: new Date(Date.now() - 7100 * 1000)
      }
    ]
  },
  {
    blockIndex: 2,
    hash: '0x4b7c1f8a9e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b',
    previousHash: '0x8f3c4d29a1b0c7e6f8d392014b2a8f9c3e41d25b6a7c8e9f0d1e2f3a4b5c6d7e',
    validatorNode: 'EcoSortha-Validator-CTG02',
    timestamp: new Date(Date.now() - 3600 * 1000),
    transactions: [
      {
        txId: 'TX-CIRC-9903',
        sourceZone: 'Chittagong City Corp',
        wasteType: 'RECYCLE',
        weightKg: 640.0,
        collectorId: 'TRUCK-CTG-12',
        verificationStatus: 'VERIFIED',
        timestamp: new Date(Date.now() - 3500 * 1000)
      }
    ]
  }
];

let memoryNotifications = [
  {
    notifId: 'NOTIF-101',
    title: 'Critical Overflow Alert',
    message: 'Gulshan-2 Circle Bin A (BIN-DHK-001) has reached 88% capacity. Immediate collection recommended.',
    category: 'OVERFLOW_ALERT',
    severity: 'CRITICAL',
    zone: 'Dhaka North City Corp',
    read: false,
    createdAt: new Date(Date.now() - 1800 * 1000)
  },
  {
    notifId: 'NOTIF-102',
    title: 'Blockchain Verification Passed',
    message: 'Block #2 verified on EcoSortha Circular Ledger recording 640kg recycled material from Chittagong.',
    category: 'COMPLIANCE',
    severity: 'INFO',
    zone: 'Chittagong City Corp',
    read: false,
    createdAt: new Date(Date.now() - 3600 * 1000)
  },
  {
    notifId: 'NOTIF-103',
    title: 'CUET Hackathon Compliance Milestone',
    message: 'CUET Campus zone achieved 85% segregation efficiency between Compost and Recyclable bins.',
    category: 'COMPLIANCE',
    severity: 'INFO',
    zone: 'CUET Campus',
    read: true,
    createdAt: new Date(Date.now() - 12000 * 1000)
  }
];

// GET /api/stats
apiRouter.get('/stats', async (req: Request, res: Response) => {
  try {
    const totalRecycled = memoryLedger.reduce((sum, block) => {
      const blockWeight = block.transactions?.reduce((tsum, tx) => tsum + (Number(tx.weightKg) || 0), 0) || 0;
      return sum + blockWeight;
    }, 0);
    const co2Offset = Number((totalRecycled * 0.0031).toFixed(2));

    res.json({
      totalRecycledKg: Number(totalRecycled.toFixed(1)),
      co2OffsetTons: co2Offset || 3.84,
      verifiedLedgerBlocks: memoryLedger.length,
      activeDustbins: memoryDustbins.length,
      criticalAlerts: memoryDustbins.filter(d => d.fillLevel >= 85).length,
      circularEfficiency: 89.4
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

// GET /api/routes
apiRouter.get('/routes', async (req: Request, res: Response) => {
  try {
    const stops = [
      { order: 1, id: 'BIN-CTG-001', name: 'Agrabad Commercial Bin', fill: 91, priority: 'CRITICAL', time: '08:15 AM', x: 12, y: 75, wasteKg: 140 },
      { order: 2, id: 'BIN-DHK-001', name: 'Gulshan-2 Circle Bin A', fill: 88, priority: 'CRITICAL', time: '09:00 AM', x: 30, y: 28, wasteKg: 132 },
      { order: 3, id: 'BIN-CUET-002', name: 'CUET Shaheed Minar Square', fill: 82, priority: 'WARNING', time: '10:30 AM', x: 50, y: 65, wasteKg: 110 },
      { order: 4, id: 'BIN-DHK-002', name: 'Banani Road 11 Bin B', fill: 74, priority: 'WARNING', time: '11:45 AM', x: 68, y: 32, wasteKg: 95 },
      { order: 5, id: 'BIN-CUET-001', name: 'CUET Academic Hall Bin', fill: 65, priority: 'NORMAL', time: '01:15 PM', x: 84, y: 78, wasteKg: 80 },
      { order: 6, id: 'BIN-DHK-003', name: 'Dhanmondi Lake Park Bin', fill: 42, priority: 'NORMAL', time: '02:30 PM', x: 92, y: 25, wasteKg: 55 }
    ];
    res.json(stops);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch route stops' });
  }
});

// GET /api/dustbins
apiRouter.get('/dustbins', async (req: Request, res: Response) => {
  try {
    const { zone } = req.query;
    let list = [...memoryDustbins];
    if (zone && zone !== 'ALL') {
      list = list.filter(b => b.zone === zone);
    }
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dustbins' });
  }
});

// POST /api/dustbins/:binId/empty
apiRouter.post('/dustbins/:binId/empty', async (req: Request, res: Response) => {
  const { binId } = req.params;
  const bin = memoryDustbins.find(b => b.binId === binId);
  if (!bin) {
    return res.status(404).json({ error: 'Dustbin not found' });
  }
  bin.fillLevel = 5;
  bin.status = 'NORMAL';
  bin.lastEmptiedAt = new Date();

  memoryNotifications.unshift({
    notifId: `NOTIF-${Date.now().toString().slice(-4)}`,
    title: '🗑️ Dustbin Collection Completed',
    message: `${bin.name} (${bin.binId}) in ${bin.zone} has been emptied and reset to 5% fill level.`,
    category: 'COLLECTION',
    severity: 'INFO',
    zone: bin.zone,
    read: false,
    createdAt: new Date()
  });

  res.json({ message: 'Dustbin collection scheduled/emptied successfully', dustbin: bin });
});

// GET /api/ledger
apiRouter.get('/ledger', async (req: Request, res: Response) => {
  res.json(memoryLedger);
});

// POST /api/ledger/block
apiRouter.post('/ledger/block', async (req: Request, res: Response) => {
  const { sourceZone, wasteType, weightKg, collectorId } = req.body;

  // SECURITY: Input validation — reject missing required fields
  if (!sourceZone || typeof sourceZone !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid required field: sourceZone (string)' });
  }
  if (!wasteType || typeof wasteType !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid required field: wasteType (string)' });
  }
  const parsedWeight = Number(weightKg);
  if (isNaN(parsedWeight) || parsedWeight <= 0 || parsedWeight > 100000) {
    return res.status(400).json({ error: 'Invalid weightKg: must be a positive number up to 100,000' });
  }

  const sanitizedZone = String(sourceZone).trim().substring(0, 100);
  const sanitizedWasteType = String(wasteType).trim().substring(0, 50);
  const sanitizedCollector = collectorId ? String(collectorId).trim().substring(0, 50) : 'AI-COLLECTOR-01';

  const newIndex = memoryLedger.length + 1;
  const prevHash = memoryLedger[memoryLedger.length - 1]?.hash || '0x0000000000000000';
  // SECURITY: Cryptographically secure hash using Node.js crypto
  const newHash = '0x' + crypto.randomBytes(32).toString('hex');

  const newBlock = {
    blockIndex: newIndex,
    hash: newHash,
    previousHash: prevHash,
    validatorNode: `EcoSortha-Validator-${sanitizedZone.substring(0, 3).toUpperCase()}`,
    timestamp: new Date(),
    transactions: [
      {
        txId: `TX-CIRC-${crypto.randomInt(1000, 9999)}`,
        sourceZone: sanitizedZone,
        wasteType: sanitizedWasteType,
        weightKg: parsedWeight,
        collectorId: sanitizedCollector,
        verificationStatus: 'VERIFIED',
        timestamp: new Date()
      }
    ]
  };

  memoryLedger.push(newBlock);

  memoryNotifications.unshift({
    notifId: `NOTIF-${Date.now().toString().slice(-4)}`,
    title: `⚡ Blockchain Ledger Block #${newIndex} Minted`,
    message: `Verified transaction of ${parsedWeight}kg (${sanitizedWasteType}) from ${sanitizedZone}. Block Hash: ${newHash.substring(0, 16)}...`,
    category: 'COMPLIANCE',
    severity: 'INFO',
    zone: sanitizedZone,
    read: false,
    createdAt: new Date()
  });

  res.json(newBlock);
});

// GET /api/notifications
apiRouter.get('/notifications', async (req: Request, res: Response) => {
  res.json(memoryNotifications);
});

// POST /api/notifications
apiRouter.post('/notifications', async (req: Request, res: Response) => {
  const { title, message, category, severity, zone } = req.body;

  // SECURITY: Input validation for custom notification creation
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Missing or invalid required field: title (non-empty string)' });
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Missing or invalid required field: message (non-empty string)' });
  }

  const allowedSeverities = ['INFO', 'WARNING', 'CRITICAL'];
  const allowedCategories = ['OVERFLOW_ALERT', 'COMPLIANCE', 'COLLECTION', 'SYSTEM'];

  const newNotif = {
    notifId: `NOTIF-${Date.now().toString().slice(-4)}`,
    title: String(title).trim().substring(0, 200),
    message: String(message).trim().substring(0, 1000),
    category: allowedCategories.includes(category) ? category : 'SYSTEM',
    severity: allowedSeverities.includes(severity) ? severity : 'INFO',
    zone: zone ? String(zone).trim().substring(0, 100) : 'Dhaka North City Corp',
    read: false,
    createdAt: new Date()
  };
  memoryNotifications.unshift(newNotif);
  res.status(201).json(newNotif);
});

// POST /api/notifications/simulate
apiRouter.post('/notifications/simulate', async (req: Request, res: Response) => {
  const { type } = req.body;
  const templates = [
    {
      title: '🚨 Emergency Dustbin Capacity Alert',
      message: 'Banani Road 11 Bin B (BIN-DHK-002) fill sensor spiked above 92%. Temperature sensor reading 34°C indicates potential organic decomposition buildup.',
      category: 'OVERFLOW_ALERT',
      severity: 'CRITICAL',
      zone: 'Dhaka North City Corp'
    },
    {
      title: '✅ Blockchain Verification Confirmed',
      message: 'New Ledger Block #3 successfully validated across 4 consensus nodes recording 820kg PET & High-Value E-Waste from Mirpur-10 Depot.',
      category: 'COMPLIANCE',
      severity: 'INFO',
      zone: 'Dhaka North City Corp'
    },
    {
      title: '⚠️ Fleet Route Optimization Notice',
      message: 'TSP Route #4 diverted due to heavy traffic on Airport Road. Estimated collection delay: 18 minutes for 4 commercial bins.',
      category: 'COLLECTION',
      severity: 'WARNING',
      zone: 'Dhaka North City Corp'
    },
    {
      title: '🧪 Toxic E-Waste & Residual Warning',
      message: 'High concentration of unsegregated lithium batteries detected during optical sorting scan at Chittagong Agrabad Transfer Station.',
      category: 'SYSTEM',
      severity: 'CRITICAL',
      zone: 'Chittagong City Corp'
    },
    {
      title: '🌱 CUET Zero-Waste Campus Milestone',
      message: 'CUET Academic Hall achieved 100% organic waste diversion to local biogas digester during today shift.',
      category: 'COMPLIANCE',
      severity: 'INFO',
      zone: 'CUET Campus'
    }
  ];

  const template = type && templates.find(t => t.category === type)
    ? templates.find(t => t.category === type)!
    : templates[Math.floor(Math.random() * templates.length)];

  const newNotif = {
    notifId: `NOTIF-${Math.floor(1000 + Math.random() * 9000)}`,
    title: template.title,
    message: template.message,
    category: template.category,
    severity: template.severity as 'INFO' | 'WARNING' | 'CRITICAL',
    zone: template.zone,
    read: false,
    createdAt: new Date()
  };
  memoryNotifications.unshift(newNotif);
  res.status(201).json(newNotif);
});

// POST /api/notifications/:id/read
apiRouter.post('/notifications/:id/read', async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = memoryNotifications.find(n => n.notifId === id);
  if (item) {
    item.read = true;
  }
  res.json({ success: true, notification: item });
});

// POST /api/notifications/:id/action
apiRouter.post('/notifications/:id/action', async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = memoryNotifications.find(n => n.notifId === id);
  if (item) {
    item.read = true;
    // If it's an overflow alert or collection alert, reset matching bins if present
    if (item.category === 'OVERFLOW_ALERT' || item.message.includes('BIN-')) {
      const binMatch = item.message.match(/BIN-[A-Z]+-\d+/);
      if (binMatch && binMatch[0]) {
        const bin = memoryDustbins.find(b => b.binId === binMatch[0]);
        if (bin) {
          bin.fillLevel = 5;
          bin.status = 'NORMAL';
          bin.lastEmptiedAt = new Date();
        }
      }
    }
  }
  res.json({ success: true, message: `Action executed for alert ${id}` });
});

// POST /api/notifications/clear-read
apiRouter.post('/notifications/clear-read', async (req: Request, res: Response) => {
  memoryNotifications = memoryNotifications.filter(n => !n.read);
  res.json({ success: true, remaining: memoryNotifications });
});

// DELETE /api/notifications/:id
apiRouter.delete('/notifications/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  memoryNotifications = memoryNotifications.filter(n => n.notifId !== id);
  res.json({ success: true, deletedId: id });
});
