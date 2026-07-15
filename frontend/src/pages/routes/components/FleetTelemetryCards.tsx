import React from 'react';
import { DollarSign, Truck, Navigation, Fuel, Leaf, Sparkles } from 'lucide-react';

interface FleetTelemetryCardsProps {
  budgetBdt: number;
  setBudgetBdt: (val: number) => void;
  allocatedTrucks: number;
  totalDistanceKm: number;
  fuelLiters: number;
  co2SavedKg: number;
  setCurrentProgress: (val: number) => void;
  setActiveStopIndex: (val: number) => void;
  setIsSimulating: (val: boolean) => void;
}

export const FleetTelemetryCards: React.FC<FleetTelemetryCardsProps> = ({
  budgetBdt,
  setBudgetBdt,
  allocatedTrucks,
  totalDistanceKm,
  fuelLiters,
  co2SavedKg,
  setCurrentProgress,
  setActiveStopIndex,
  setIsSimulating
}) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <DollarSign size={20} color="#10b981" />
        Municipal Budget Allocation
      </h3>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Daily Fleet Budget (BDT)
          </span>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981' }}>
            ৳ {budgetBdt.toLocaleString()}
          </span>
        </div>

        <input
          type="range"
          min={2000}
          max={95000}
          step={1000}
          value={budgetBdt}
          onChange={(e) => setBudgetBdt(Number(e.target.value))}
          style={{
            width: '100%',
            cursor: 'pointer',
            accentColor: '#10b981'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
          <span>৳ 2,000 (Min)</span>
          <span>৳ 95,000 (Max)</span>
        </div>
      </div>

      {/* Allocation Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
            <Truck size={16} color="#3b82f6" /> Allocated Trucks
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.3rem' }}>
            {allocatedTrucks} <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>units</span>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
            <Navigation size={16} color="#10b981" /> Optimized Distance
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.3rem' }}>
            {totalDistanceKm} <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>km</span>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
            <Fuel size={16} color="#f59e0b" /> Estimated Fuel
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.3rem' }}>
            {fuelLiters} <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>L</span>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
            <Leaf size={16} color="#10b981" /> CO₂ Reduced
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.3rem', color: '#10b981' }}>
            {co2SavedKg} <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>kg</span>
          </div>
        </div>
      </div>

      <button 
        className="btn btn-primary"
        style={{ width: '100%' }}
        onClick={() => {
          setCurrentProgress(0);
          setActiveStopIndex(0);
          setIsSimulating(true);
        }}
      >
        <Sparkles size={16} /> Dispatch Animated TSP Tracker
      </button>
    </div>
  );
};
