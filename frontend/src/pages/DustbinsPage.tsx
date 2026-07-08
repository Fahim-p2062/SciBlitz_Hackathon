import React, { useState, useEffect } from 'react';
import { Trash2, AlertTriangle, BatteryCharging, Thermometer, RefreshCw, CheckCircle2, MapPin } from 'lucide-react';

interface DustbinItem {
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

export const DustbinsPage: React.FC = () => {
  const [dustbins, setDustbins] = useState<DustbinItem[]>([
    {
      binId: 'BIN-DHK-001',
      name: 'Gulshan-2 Circle Bin A',
      zone: 'Dhaka North City Corp',
      location: { lat: 23.7925, lng: 90.4078, address: 'Gulshan Avenue, Dhaka' },
      fillLevel: 88,
      temperature: 31,
      battery: 92,
      status: 'CRITICAL',
      lastEmptiedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
    },
    {
      binId: 'BIN-DHK-002',
      name: 'Banani Road 11 Bin B',
      zone: 'Dhaka North City Corp',
      location: { lat: 23.7937, lng: 90.4066, address: 'Road 11, Banani' },
      fillLevel: 74,
      temperature: 29,
      battery: 87,
      status: 'WARNING',
      lastEmptiedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString()
    },
    {
      binId: 'BIN-DHK-003',
      name: 'Dhanmondi Lake Park Bin',
      zone: 'Dhaka South City Corp',
      location: { lat: 23.7461, lng: 90.3742, address: 'Dhanmondi Lake, Dhaka' },
      fillLevel: 42,
      temperature: 28,
      battery: 96,
      status: 'NORMAL',
      lastEmptiedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString()
    },
    {
      binId: 'BIN-CTG-001',
      name: 'Agrabad Commercial Bin',
      zone: 'Chittagong City Corp',
      location: { lat: 22.3236, lng: 91.8123, address: 'Agrabad C/A, Chittagong' },
      fillLevel: 91,
      temperature: 32,
      battery: 81,
      status: 'CRITICAL',
      lastEmptiedAt: new Date(Date.now() - 42 * 3600 * 1000).toISOString()
    },
    {
      binId: 'BIN-CUET-001',
      name: 'CUET Academic Hall Bin',
      zone: 'CUET Campus',
      location: { lat: 22.4633, lng: 91.9782, address: 'CUET Academic Bldg, Raozan' },
      fillLevel: 65,
      temperature: 27,
      battery: 95,
      status: 'NORMAL',
      lastEmptiedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
    },
    {
      binId: 'BIN-CUET-002',
      name: 'CUET Shaheed Minar Square',
      zone: 'CUET Campus',
      location: { lat: 22.4640, lng: 91.9790, address: 'Shaheed Minar Square, CUET' },
      fillLevel: 82,
      temperature: 28,
      battery: 89,
      status: 'WARNING',
      lastEmptiedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
    }
  ]);

  const [selectedZone, setSelectedZone] = useState('ALL');

  useEffect(() => {
    fetch('http://localhost:5000/api/dustbins')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDustbins(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleEmptyBin = async (binId: string) => {
    try {
      await fetch(`http://localhost:5000/api/dustbins/${binId}/empty`, { method: 'POST' });
    } catch (err) {}

    setDustbins(dustbins.map(b => b.binId === binId ? {
      ...b,
      fillLevel: 5,
      status: 'NORMAL' as const,
      lastEmptiedAt: new Date().toISOString()
    } : b));
  };

  const filteredBins = selectedZone === 'ALL' 
    ? dustbins 
    : dustbins.filter(b => b.zone === selectedZone);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Trash2 size={28} color="#10b981" />
            Smart Dustbin Monitor & Telemetry
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Real-time IoT ultrasonic fill-level sensors, temperature, and battery telemetry across municipal zones.
          </p>
        </div>

        {/* Zone Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['ALL', 'Dhaka North City Corp', 'Dhaka South City Corp', 'Chittagong City Corp', 'CUET Campus'].map(zone => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`btn ${selectedZone === zone ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem' }}
            >
              {zone === 'ALL' ? 'All Zones' : zone}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Smart Bins */}
      <div className="grid-cols-3">
        {filteredBins.map(bin => {
          const badgeClass = bin.fillLevel >= 85 ? 'badge-critical' : (bin.fillLevel >= 70 ? 'badge-warning' : 'badge-normal');
          const progressColor = bin.fillLevel >= 85 ? '#ef4444' : (bin.fillLevel >= 70 ? '#f59e0b' : '#10b981');

          return (
            <div key={bin.binId} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                    {bin.fillLevel}% FULL
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
                    <span style={{ fontWeight: 700, color: progressColor }}>{bin.fillLevel}%</span>
                  </div>
                  <div className="progress-container">
                    <div 
                      className="progress-bar"
                      style={{ width: `${bin.fillLevel}%`, background: progressColor }}
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
        })}
      </div>
    </div>
  );
};
