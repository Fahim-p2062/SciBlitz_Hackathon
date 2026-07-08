import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { apiRouter } from './routes/api';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecosortha';

app.use(cors());
app.use(express.json());

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
  try {
    console.log(`Connecting to MongoDB at ${MONGO_URI}...`);
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
