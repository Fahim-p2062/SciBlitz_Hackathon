import mongoose, { Schema, Document } from 'mongoose';

export interface ILedgerTransaction {
  txId: string;
  sourceZone: string;
  wasteType: 'COMPOST' | 'RECYCLE' | 'TRASH';
  weightKg: number;
  collectorId: string;
  verificationStatus: 'VERIFIED' | 'PENDING';
  timestamp: Date;
}

export interface ILedgerBlock extends Document {
  blockIndex: number;
  hash: string;
  previousHash: string;
  validatorNode: string;
  timestamp: Date;
  transactions: ILedgerTransaction[];
}

const LedgerTransactionSchema = new Schema({
  txId: { type: String, required: true },
  sourceZone: { type: String, required: true },
  wasteType: { type: String, enum: ['COMPOST', 'RECYCLE', 'TRASH'], required: true },
  weightKg: { type: Number, required: true },
  collectorId: { type: String, required: true },
  verificationStatus: { type: String, enum: ['VERIFIED', 'PENDING'], default: 'VERIFIED' },
  timestamp: { type: Date, default: Date.now }
});

const LedgerBlockSchema: Schema = new Schema({
  blockIndex: { type: Number, required: true, unique: true },
  hash: { type: String, required: true },
  previousHash: { type: String, required: true },
  validatorNode: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  transactions: [LedgerTransactionSchema]
});

export const LedgerBlock = mongoose.model<ILedgerBlock>('LedgerBlock', LedgerBlockSchema);
