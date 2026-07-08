import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, AlertTriangle, ShieldAlert, Check } from 'lucide-react';

interface NotifItem {
  notifId: string;
  title: string;
  message: string;
  category: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  zone: string;
  read: boolean;
  createdAt: string;
}

export const NotificationsPage: React.FC = () => {
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

  useEffect(() => {
    fetch('http://localhost:5000/api/notifications')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNotifications(data);
        }
      })
      .catch(() => {});
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}/read`, { method: 'POST' });
    } catch (err) {}

    setNotifications(notifications.map(n => n.notifId === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredList = filter === 'ALL'
    ? notifications
    : notifications.filter(n => n.severity === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bell size={28} color="#10b981" />
            Compliance Alerts & Notifications
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Environmental compliance logs, dustbin overflow alerts, and automated blockchain verification alerts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={markAllRead}
            className="btn btn-secondary"
          >
            <Check size={16} /> Mark All as Read ({unreadCount})
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
          >
            {f === 'ALL' ? 'All Alerts' : f}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredList.map(notif => {
          const badgeClass = notif.severity === 'CRITICAL' ? 'badge-critical' : (notif.severity === 'WARNING' ? 'badge-warning' : 'badge-normal');
          const borderLeftColor = notif.severity === 'CRITICAL' ? '#ef4444' : (notif.severity === 'WARNING' ? '#f59e0b' : '#10b981');

          return (
            <div
              key={notif.notifId}
              className="card"
              style={{
                borderLeft: `5px solid ${borderLeftColor}`,
                opacity: notif.read ? 0.75 : 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ marginTop: '0.2rem' }}>
                  {notif.severity === 'CRITICAL' ? (
                    <ShieldAlert size={24} color="#ef4444" />
                  ) : notif.severity === 'WARNING' ? (
                    <AlertTriangle size={24} color="#f59e0b" />
                  ) : (
                    <CheckCircle2 size={24} color="#10b981" />
                  )}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                      {notif.title}
                    </h3>
                    <span className={`badge ${badgeClass}`}>
                      {notif.severity}
                    </span>
                    {!notif.read && (
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                    )}
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                    {notif.message}
                  </p>

                  <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>Zone: <strong style={{ color: 'var(--text-primary)' }}>{notif.zone}</strong></span>
                    <span>Time: {new Date(notif.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>

              {!notif.read && (
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.78rem', padding: '0.45rem 0.8rem' }}
                  onClick={() => markAsRead(notif.notifId)}
                >
                  <Check size={14} /> Mark Read
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
