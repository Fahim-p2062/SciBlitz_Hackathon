export interface DustbinItem {
  binId: string;
  name: string;
  zone: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  fillLevel: number;
  temperature: number;
  battery: number;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL' | 'EMPTYING_SCHEDULED';
  lastEmptiedAt: string;
}
