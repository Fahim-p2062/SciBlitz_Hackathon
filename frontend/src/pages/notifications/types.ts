export interface NotifItem {
  notifId: string;
  title: string;
  message: string;
  category: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  zone: string;
  read: boolean;
  createdAt: string;
}
