import React from 'react';
import { Trash2 } from 'lucide-react';
import { useDustbinsData } from './useDustbinsData';
import { DustbinCard } from './components/DustbinCard';

export const DustbinsPage: React.FC = () => {
  const {
    filteredBins,
    selectedZone,
    setSelectedZone,
    handleEmptyBin
  } = useDustbinsData();

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
        {filteredBins.map(bin => (
          <DustbinCard
            key={bin.binId}
            bin={bin}
            handleEmptyBin={handleEmptyBin}
          />
        ))}
      </div>
    </div>
  );
};

export default DustbinsPage;
