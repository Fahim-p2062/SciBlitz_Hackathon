import React from 'react';
import { CheckCircle2, MapPin, ArrowRight } from 'lucide-react';
import type { RouteStop } from '../types';

interface StopsTableProps {
  stops: RouteStop[];
  activeStopIndex: number;
  estimatedCost: number;
}

export const StopsTable: React.FC<StopsTableProps> = ({
  stops,
  activeStopIndex,
  estimatedCost
}) => {
  return (
    <div className="card" style={{ gridColumn: 'span 2' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
          AI TSP Collection Stop Sequence
        </h3>
        <span className="badge badge-normal">
          Cost: ৳ {estimatedCost.toLocaleString()}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {stops.map((stp, idx) => {
          const badgeClass = stp.priority === 'CRITICAL' ? 'badge-critical' : stp.priority === 'WARNING' ? 'badge-warning' : 'badge-normal';
          const isCurrent = idx === activeStopIndex;
          const isDone = idx < activeStopIndex;

          return (
            <div
              key={stp.order}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                background: isCurrent ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                border: isCurrent ? '2px solid #10b981' : '1px solid var(--border-glass)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isDone ? '#10b981' : stp.priority === 'CRITICAL' ? '#ef4444' : stp.priority === 'WARNING' ? '#f59e0b' : '#3b82f6',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem'
                  }}
                >
                  {isDone ? <CheckCircle2 size={18} /> : stp.order}
                </div>

                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {stp.name}
                    {isCurrent && <span className="badge badge-normal" style={{ fontSize: '0.65rem' }}>ACTIVE STOP</span>}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
                    <MapPin size={13} color="#10b981" /> ETA: {stp.time} • Payload: {stp.wasteKg} kg
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className={`badge ${badgeClass}`}>
                  {stp.fill}% FULL ({stp.priority})
                </span>
                <ArrowRight size={18} color="var(--text-muted)" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
