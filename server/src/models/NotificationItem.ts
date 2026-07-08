import mongoose, { Schema, Document } from 'mongoose';

export interface INotificationItem extends Document {
  notifId: string;
  title: string;
  message: string;
  category: 'OVERFLOW_ALERT' | 'COMPLIANCE' | 'SYSTEM' | 'COLLECTION';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  zone: string;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  notifId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  category: {
    type: String,
    enum: ['OVERFLOW_ALERT', 'COMPLIANCE', 'SYSTEM', 'COLLECTION'],
    default: 'OVERFLOW_ALERT'
  },
  severity: {
    type: String,
    enum: ['INFO', 'WARNING', 'CRITICAL'],
    default: 'INFO'
  },
  zone: { type: String, default: 'All Bangladesh' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const NotificationItem = mongoose.model<INotificationItem>('NotificationItem', NotificationSchema);
