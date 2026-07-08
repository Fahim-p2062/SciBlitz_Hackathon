import mongoose, { Schema, Document } from 'mongoose';

export interface IRouteStop {
  order: number;
  dustbinId: string;
  name: string;
  fillLevel: number;
  lat: number;
  lng: number;
}

export interface IRoutePlan extends Document {
  routeId: string;
  title: string;
  zone: string;
  budgetBdt: number;
  estimatedCostBdt: number;
  totalDistanceKm: number;
  co2SavedKg: number;
  assignedTrucks: number;
  stops: IRouteStop[];
  createdAt: Date;
}

const RouteStopSchema = new Schema({
  order: { type: Number, required: true },
  dustbinId: { type: String, required: true },
  name: { type: String, required: true },
  fillLevel: { type: Number, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
});

const RoutePlanSchema: Schema = new Schema({
  routeId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  zone: { type: String, required: true },
  budgetBdt: { type: Number, required: true },
  estimatedCostBdt: { type: Number, required: true },
  totalDistanceKm: { type: Number, required: true },
  co2SavedKg: { type: Number, required: true },
  assignedTrucks: { type: Number, required: true },
  stops: [RouteStopSchema],
  createdAt: { type: Date, default: Date.now }
});

export const RoutePlan = mongoose.model<IRoutePlan>('RoutePlan', RoutePlanSchema);
