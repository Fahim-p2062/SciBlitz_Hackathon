import { useState, useEffect } from 'react';
import type { NotifItem } from './types';
import { apiFetch } from '../../config/api';

export function useNotificationsData() {
  const [notifications, setNotifications] = useState<NotifItem[]>([
    {
      notifId: 'NOTIF-101',
      title: 'Critical Overflow Alert',
      message: 'Gulshan-2 Circle Bin A (BIN-DHK-001) has reached 88% capacity. Immediate collection truck dispatch recommended.',
      category: 'OVERFLOW_ALERT',
      severity: 'CRITICAL',
      zone: 'Dhaka North City Corp',
      read: false,
      createdAt: new Date(Date.now() - 1800 * 1000).toISOString()
    },
    {
      notifId: 'NOTIF-102',
      title: 'Blockchain Verification Passed',
      message: 'Block #2 verified on EcoSortha Circular Ledger recording 640kg recycled material from Chittagong.',
      category: 'COMPLIANCE',
      severity: 'INFO',
      zone: 'Chittagong City Corp',
      read: false,
      createdAt: new Date(Date.now() - 3600 * 1000).toISOString()
    },
    {
      notifId: 'NOTIF-103',
      title: 'CUET Hackathon Compliance Milestone',
      message: 'CUET Campus zone achieved 85% segregation efficiency between Compost and Recyclable bins.',
      category: 'COMPLIANCE',
      severity: 'INFO',
      zone: 'CUET Campus',
      read: true,
      createdAt: new Date(Date.now() - 12000 * 1000).toISOString()
    }
  ]);

  const [filter, setFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [zoneFilter, setZoneFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    apiFetch<NotifItem[]>('/api/notifications')
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNotifications(data);
        }
      })
      .catch(() => {});
  };

  const markAsRead = async (id: string) => {
    try {
      await apiFetch(`/api/notifications/${id}/read`, { method: 'POST' });
    } catch (err) {}

    setNotifications(prev => prev.map(n => n.notifId === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = async (id: string) => {
    try {
      await apiFetch(`/api/notifications/${id}`, { method: 'DELETE' });
    } catch (err) {}

    setNotifications(prev => prev.filter(n => n.notifId !== id));
  };

  const clearReadNotifications = async () => {
    try {
      await apiFetch('/api/notifications/clear-read', { method: 'POST' });
    } catch (err) {}

    setNotifications(prev => prev.filter(n => !n.read));
  };

  const simulateAlert = async (type?: string) => {
    setIsSimulating(true);
    try {
      const result = await apiFetch<NotifItem>('/api/notifications/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      if (result && result.notifId) {
        setNotifications(prev => [result, ...prev]);
        showToast(`New ${result.severity} alert simulated successfully!`);
      }
    } catch (err) {
      // Local fallback if API offline
      const localSim: NotifItem = {
        notifId: `NOTIF-${Math.floor(1000 + Math.random() * 9000)}`,
        title: type === 'OVERFLOW_ALERT' ? '🚨 Emergency Fill Sensor Alert' : '✅ Compliance Audit Passed',
        message: type === 'OVERFLOW_ALERT' ? 'Banani Road 11 Bin B capacity spiked to 92%. Dispatch truck recommended.' : 'Municipal audit verified 1,200kg recycled PET plastic.',
        category: type || 'SYSTEM',
        severity: type === 'OVERFLOW_ALERT' ? 'CRITICAL' : 'INFO',
        zone: 'Dhaka North City Corp',
        read: false,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [localSim, ...prev]);
      showToast('New simulated alert added.');
    } finally {
      setIsSimulating(false);
    }
  };

  const executeAction = async (id: string, message: string) => {
    try {
      await apiFetch(`/api/notifications/${id}/action`, { method: 'POST' });
    } catch (err) {}

    setNotifications(prev => prev.map(n => n.notifId === id ? { ...n, read: true } : n));
    showToast(`⚡ Action Executed: ${message}`);
  };

  const createCustomNotification = async (title: string, message: string, category: string, severity: 'INFO' | 'WARNING' | 'CRITICAL', zone: string) => {
    try {
      const result = await apiFetch<NotifItem>('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message, category, severity, zone })
      });
      if (result && result.notifId) {
        setNotifications(prev => [result, ...prev]);
        showToast('Custom notification dispatched!');
        return;
      }
    } catch (err) {}

    const fallback: NotifItem = {
      notifId: `NOTIF-${Date.now().toString().slice(-4)}`,
      title,
      message,
      category,
      severity,
      zone,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [fallback, ...prev]);
    showToast('Custom notification dispatched!');
  };

  const showToast = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 4000);
  };

  const filteredList = notifications.filter(n => {
    const matchesSeverity = filter === 'ALL' || n.severity === filter;
    const matchesCategory = categoryFilter === 'ALL' || n.category === categoryFilter;
    const matchesZone = zoneFilter === 'ALL' || n.zone === zoneFilter;
    const matchesQuery = !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.zone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesCategory && matchesZone && matchesQuery;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    zoneFilter,
    setZoneFilter,
    searchQuery,
    setSearchQuery,
    filteredList,
    unreadCount,
    isSimulating,
    actionMessage,
    markAsRead,
    markAllRead,
    deleteNotification,
    clearReadNotifications,
    simulateAlert,
    executeAction,
    createCustomNotification
  };
}
