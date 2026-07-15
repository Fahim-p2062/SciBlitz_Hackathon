import React from 'react';
import { AlertTriangle, CheckCircle2, MapPin, Thermometer, BatteryCharging, RefreshCw } from 'lucide-react';
import type { DustbinItem } from '../types';

interface DustbinCardProps {
  bin: DustbinItem;
  handleEmptyBin: (binId: string) => Promise<void> | void;
}

export const DustbinCard: React.FC<DustbinCardProps> = ({ bin, handleEmptyBin }) => {
  const badgeClass = bin.fillLevel >= 85 ? 'badge-critical' : (bin.fillLevel >= 70 ? 'badge-warning' : 'badge-normal');
  const progressColor = bin.fillLevel >= 85 ? '#ef4444' : (bin.fillLevel >= 70 ? '#f59e0b' : '#10b981');

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {bin.binId}
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '0.2rem' }}>
              {bin.name}
            </h3>
          </div>
          <span className={`badge ${badgeClass}`}>
            {bin.fillLevel >= 85 ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
            {typeof bin.fillLevel === 'number' ? Number(bin.fillLevel).toFixed(1).replace(/\.0$/, '') : bin.fillLevel}% FULL
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
          <MapPin size={15} color="#10b981" />
          {bin.location.address} ({bin.zone})
        </div>

        {/* Fill Meter Bar */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.35rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Fill Capacity</span>
            <span style={{ fontWeight: 700, color: progressColor }}>{typeof bin.fillLevel === 'number' ? Number(bin.fillLevel).toFixed(1).replace(/\.0$/, '') : bin.fillLevel}%</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{ width: `${Math.min(100, Math.max(0, bin.fillLevel))}%`, background: progressColor }}
            />
          </div>
        </div>

        {/* Sensors */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
            <Thermometer size={16} color="#f59e0b" />
            <span>{bin.temperature}°C</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
            <BatteryCharging size={16} color="#10b981" />
            <span>{bin.battery}% Battery</span>
          </div>
        </div>
      </div>

      <div>
        <button
          className="btn btn-secondary"
          style={{ width: '100%', borderColor: progressColor }}
          onClick={() => handleEmptyBin(bin.binId)}
        >
          <RefreshCw size={15} /> Schedule Truck / Mark Emptied
        </button>
      </div>
    </div>
  );
};
