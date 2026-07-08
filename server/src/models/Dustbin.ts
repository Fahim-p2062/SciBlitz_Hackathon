import mongoose, { Schema, Document } from 'mongoose';

export interface IDustbin extends Document {
  binId: string;
  name: string;
  zone: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  fillLevel: number; // percentage 0-100
  temperature: number; // degrees Celsius
  battery: number; // percentage 0-100
  status: 'NORMAL' | 'WARNING' | 'CRITICAL' | 'EMPTYING_SCHEDULED';
  lastEmptiedAt: Date;
  updatedAt: Date;
}

const DustbinSchema: Schema = new Schema({
  binId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  zone: { type: String, required: true, index: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true }
  },
  fillLevel: { type: Number, required: true, min: 0, max: 100 },
  temperature: { type: Number, default: 28 },
  battery: { type: Number, default: 94 },
  status: {
    type: String,
    enum: ['NORMAL', 'WARNING', 'CRITICAL', 'EMPTYING_SCHEDULED'],
    default: 'NORMAL'
  },
  lastEmptiedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Dustbin = mongoose.model<IDustbin>('Dustbin', DustbinSchema);
