import React, { useState } from 'react';
import { Bell, Check, Trash2, Plus, Zap, Search, Filter, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useNotificationsData } from './useNotificationsData';
import { NotificationItemCard } from './components/NotificationItemCard';

export const NotificationsPage: React.FC = () => {
  const {
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
  } = useNotificationsData();

  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customMsg, setCustomMsg] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('SYSTEM');
  const [customSeverity, setCustomSeverity] = useState<'INFO' | 'WARNING' | 'CRITICAL'>('WARNING');
  const [customZone, setCustomZone] = useState<string>('Dhaka North City Corp');

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle || !customMsg) return;
    createCustomNotification(customTitle, customMsg, customCategory, customSeverity, customZone);
    setCustomTitle('');
    setCustomMsg('');
    setShowCustomModal(false);
  };

  return (
    <div>
      {/* Toast Feedback Banner */}
      {actionMessage && (
        <div style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          background: '#10b981',
          color: '#090e17',
          padding: '0.85rem 1.4rem',
          borderRadius: '10px',
          fontWeight: 800,
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          animation: 'fadeIn 0.2s ease'
        }}>
          <Zap size={18} />
          {actionMessage}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bell size={28} color="#10b981" />
            Compliance & Telemetry Notification Command Center
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Real-time IoT fill alerts, automated blockchain consensus events, and actionable municipal dispatch workflows.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem', opacity: unreadCount === 0 ? 0.5 : 1 }}
          >
            <Check size={16} /> Mark All Read ({unreadCount})
          </button>
          <button
            onClick={clearReadNotifications}
            disabled={notifications.every(n => !n.read)}
            className="btn"
            style={{ fontSize: '0.82rem', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}
          >
            <Trash2 size={16} /> Clear Read Alerts
          </button>
        </div>
      </div>

      {/* Simulation Command Panel */}
      <div className="card" style={{ marginBottom: '1.75rem', padding: '1.2rem 1.4rem', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #10b981' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={18} />
            ⚡ LIVE TELEMETRY SIMULATOR & ALERT DISPATCHER
          </span>
          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            INSTANT MULTI-NODE DISPATCH SIMULATION
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => simulateAlert('OVERFLOW_ALERT')}
            disabled={isSimulating}
            className="btn"
            style={{ padding: '0.55rem 0.95rem', fontSize: '0.78rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', fontWeight: 700 }}
          >
            🚨 Simulate Overflow Critical
          </button>
          <button
            onClick={() => simulateAlert('COMPLIANCE')}
            disabled={isSimulating}
            className="btn"
            style={{ padding: '0.55rem 0.95rem', fontSize: '0.78rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#6ee7b7', fontWeight: 700 }}
          >
            ✅ Simulate Ledger Audit
          </button>
          <button
            onClick={() => simulateAlert('COLLECTION')}
            disabled={isSimulating}
            className="btn"
            style={{ padding: '0.55rem 0.95rem', fontSize: '0.78rem', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b', color: '#fcd34d', fontWeight: 700 }}
          >
            🚚 Simulate Route Diversion
          </button>
          <button
            onClick={() => simulateAlert('SYSTEM')}
            disabled={isSimulating}
            className="btn"
            style={{ padding: '0.55rem 0.95rem', fontSize: '0.78rem', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid #a855f7', color: '#d8b4fe', fontWeight: 700 }}
          >
            🧪 Simulate Toxic E-Waste Warning
          </button>
          <button
            onClick={() => setShowCustomModal(true)}
            className="btn btn-primary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.78rem', background: '#3b82f6', color: '#fff', border: 'none', fontWeight: 700, marginLeft: 'auto' }}
          >
            <Plus size={15} /> Create Custom Dispatch
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search alerts by bin, zone, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.8rem 0.55rem 2.4rem',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-glass)',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            />
          </div>

          {/* Severity Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {(['ALL', 'CRITICAL', 'WARNING', 'INFO'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: filter === s ? (s === 'CRITICAL' ? '#ef4444' : s === 'WARNING' ? '#f59e0b' : '#10b981') : 'rgba(255,255,255,0.05)',
                  color: filter === s ? '#090e17' : '#e2e8f0',
                  border: `1px solid ${filter === s ? 'transparent' : 'var(--border-glass)'}`,
                  transition: 'all 0.15s ease'
                }}
              >
                {s === 'ALL' ? '🌐 All Severities' : s}
              </button>
            ))}
          </div>

          {/* Zone selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={15} color="#94a3b8" />
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              style={{
                padding: '0.45rem 0.8rem',
                borderRadius: '6px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-glass)',
                color: '#fff',
                fontSize: '0.8rem'
              }}
            >
              <option value="ALL">📍 All Municipal Zones</option>
              <option value="Dhaka North City Corp">Dhaka North City Corp</option>
              <option value="Dhaka South City Corp">Dhaka South City Corp</option>
              <option value="Chittagong City Corp">Chittagong City Corp</option>
              <option value="CUET Campus">CUET Campus</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredList.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <CheckCircle2 size={42} color="#10b981" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.4rem' }}>All Systems Operational</h3>
            <p>No alerts match your current filter criteria (`{filter}` / `{zoneFilter}`).</p>
          </div>
        ) : (
          filteredList.map(notif => (
            <NotificationItemCard
              key={notif.notifId}
              notif={notif}
              markAsRead={markAsRead}
              deleteNotification={deleteNotification}
              executeAction={executeAction}
            />
          ))
        )}
      </div>

      {/* Custom Alert Modal */}
      {showCustomModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '1.75rem', background: '#0f172a', border: '1px solid #10b981' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={20} color="#3b82f6" />
              Create Custom Municipal Alert
            </h3>
            <form onSubmit={handleCreateCustom} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Alert Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hazardous Battery Dump Warning"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-glass)', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Message Details</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the environmental incident or compliance notification..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-glass)', color: '#fff', fontFamily: 'inherit' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Severity</label>
                  <select
                    value={customSeverity}
                    onChange={(e) => setCustomSeverity(e.target.value as any)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-glass)', color: '#fff' }}
                  >
                    <option value="INFO">INFO</option>
                    <option value="WARNING">WARNING</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Category</label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-glass)', color: '#fff' }}
                  >
                    <option value="OVERFLOW_ALERT">OVERFLOW_ALERT</option>
                    <option value="COMPLIANCE">COMPLIANCE</option>
                    <option value="COLLECTION">COLLECTION</option>
                    <option value="SYSTEM">SYSTEM</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Target Zone</label>
                <select
                  value={customZone}
                  onChange={(e) => setCustomZone(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-glass)', color: '#fff' }}
                >
                  <option value="Dhaka North City Corp">Dhaka North City Corp</option>
                  <option value="Dhaka South City Corp">Dhaka South City Corp</option>
                  <option value="Chittagong City Corp">Chittagong City Corp</option>
                  <option value="CUET Campus">CUET Campus</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowCustomModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Dispatch Alert</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
