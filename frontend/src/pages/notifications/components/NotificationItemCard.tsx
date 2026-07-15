import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Check, Trash2 } from 'lucide-react';
import type { NotifItem } from '../types';

interface NotificationItemCardProps {
  notif: NotifItem;
  markAsRead: (id: string) => Promise<void> | void;
  deleteNotification: (id: string) => Promise<void> | void;
  executeAction: (id: string, message: string) => Promise<void> | void;
}

export const NotificationItemCard: React.FC<NotificationItemCardProps> = ({
  notif,
  markAsRead,
  deleteNotification,
  executeAction
}) => {
  const badgeClass = notif.severity === 'CRITICAL' ? 'badge-critical' : (notif.severity === 'WARNING' ? 'badge-warning' : 'badge-normal');
  const borderLeftColor = notif.severity === 'CRITICAL' ? '#ef4444' : (notif.severity === 'WARNING' ? '#f59e0b' : '#10b981');

  const getActionConfig = () => {
    if (notif.category === 'OVERFLOW_ALERT' || notif.title.includes('Capacity') || notif.message.includes('BIN-')) {
      return { label: '🚚 Dispatch Collection Truck', desc: 'Dispatched emergency waste collection vehicle to clear overflow.' };
    }
    if (notif.category === 'COMPLIANCE' || notif.title.includes('Blockchain') || notif.title.includes('Ledger')) {
      return { label: '🛡️ Verify Consensus Audit', desc: 'Executed multi-node compliance verification and recorded audit certificate.' };
    }
    if (notif.category === 'COLLECTION' || notif.title.includes('Route')) {
      return { label: '🛰️ Re-optimize TSP Route', desc: 'Recalculated AI fleet waypoints to bypass traffic and save fuel.' };
    }
    return { label: '⚡ Execute System Check', desc: 'Executed diagnostic routine and cleared alert.' };
  };

  const actionConfig = getActionConfig();

  return (
    <div
      className="card"
      style={{
        borderLeft: `5px solid ${borderLeftColor}`,
        opacity: notif.read ? 0.8 : 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1.5rem',
        flexWrap: 'wrap',
        background: notif.read ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.9)',
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flex: 1, minWidth: '280px' }}>
        <div style={{ marginTop: '0.2rem' }}>
          {notif.severity === 'CRITICAL' ? (
            <ShieldAlert size={26} color="#ef4444" />
          ) : notif.severity === 'WARNING' ? (
            <AlertTriangle size={26} color="#f59e0b" />
          ) : (
            <CheckCircle2 size={26} color="#10b981" />
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: notif.read ? '#cbd5e1' : '#fff' }}>
              {notif.title}
            </h3>
            <span className={`badge ${badgeClass}`}>
              {notif.severity}
            </span>
            <span className="mono" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', color: '#94a3b8' }}>
              {notif.category || 'SYSTEM'}
            </span>
            {!notif.read && (
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            )}
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
            {notif.message}
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.78rem', color: 'var(--text-muted)', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
            <span>Zone: <strong style={{ color: 'var(--text-primary)' }}>{notif.zone}</strong></span>
            <span>ID: <strong className="mono" style={{ color: '#a7f3d0' }}>{notif.notifId}</strong></span>
            <span>Time: {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {!notif.read && (
          <button
            className="btn btn-primary"
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem', background: '#10b981', color: '#090e17', fontWeight: 700, border: 'none' }}
            onClick={() => executeAction(notif.notifId, actionConfig.desc)}
          >
            {actionConfig.label}
          </button>
        )}

        {!notif.read && (
          <button
            className="btn btn-secondary"
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.8rem' }}
            onClick={() => markAsRead(notif.notifId)}
            title="Mark as Read"
          >
            <Check size={14} /> Read
          </button>
        )}

        <button
          className="btn"
          style={{ fontSize: '0.78rem', padding: '0.45rem 0.6rem', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}
          onClick={() => deleteNotification(notif.notifId)}
          title="Delete Notification"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};
