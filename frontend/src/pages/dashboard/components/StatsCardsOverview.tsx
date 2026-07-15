import React from 'react';
import { Award, ShieldCheck, Activity, Recycle, TrendingUp, Database } from 'lucide-react';
import type { DashboardStats } from '../types';

interface StatsCardsOverviewProps {
  stats: DashboardStats;
}

export const StatsCardsOverview: React.FC<StatsCardsOverviewProps> = ({ stats }) => {
  return (
    <>
      {/* Hero Banner */}
      <div className="hero-banner">
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '850px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Award size={20} color="#34d399" />
            <span style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              CUET Hackathon • Circular Bangladesh
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1rem' }}>
            AI & Blockchain Powered Circular Economy
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
            EcoSortha digitizes informal waste sectors across Dhaka, Chittagong, and CUET Campus. Using automated camera vision classification and immutable blockchain audit trails to turn waste into resource.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="badge badge-normal" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', padding: '0.5rem 1rem' }}>
              <ShieldCheck size={16} /> Blockchain Traceability Ledger Online
            </div>
            <div className="badge badge-normal" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', padding: '0.5rem 1rem' }}>
              <Activity size={16} /> Real-Time IoT Sensors
            </div>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid-cols-4" style={{ marginBottom: '2.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Total Recycled Material</span>
            <Recycle size={20} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {stats.totalRecycledKg.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 600, color: '#10b981' }}>kg</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            +18.4% compared to last week
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>CO₂ Emissions Offset</span>
            <TrendingUp size={20} color="#14b8a6" />
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {stats.co2OffsetTons} <span style={{ fontSize: '1rem', fontWeight: 600, color: '#14b8a6' }}>tons</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Equiv. to 420 trees planted
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Verified Ledger Blocks</span>
            <Database size={20} color="#3b82f6" />
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {stats.verifiedLedgerBlocks}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            100% Cryptographically verified
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Circular Efficiency</span>
            <ShieldCheck size={20} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {stats.circularEfficiency}%
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Segregation accuracy benchmark
          </div>
        </div>
      </div>
    </>
  );
};
