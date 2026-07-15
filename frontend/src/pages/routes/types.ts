export interface RouteStop {
  order: number;
  id: string;
  name: string;
  fill: number;
  priority: 'CRITICAL' | 'WARNING' | 'NORMAL';
  time: string;
  x: number; // SVG coordinate %
  y: number; // SVG coordinate %
  wasteKg: number;
}
