import React, { useState } from 'react';
import { Navigation, Truck, Fuel, DollarSign, Leaf, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export const RouteOptimizerPage: React.FC = () => {
  const [budgetBdt, setBudgetBdt] = useState<number>(45000);

  // Dynamic route calculation based on budget slider
  const truckCost = 4500;
  const allocatedTrucks = Math.min(6, Math.max(1, Math.floor(budgetBdt / truckCost)));
  const totalDistanceKm = Number((18.4 + (allocatedTrucks * 6.2)).toFixed(1));
  const estimatedCost = Number((allocatedTrucks * truckCost + (totalDistanceKm * 45)).toFixed(0));
  const fuelLiters = Number((totalDistanceKm * 0.28).toFixed(1));
  const co2SavedKg = Number((totalDistanceKm * 1.65).toFixed(1));

  const stops = [
    { order: 1, name: 'Agrabad Commercial Bin (BIN-CTG-001)', fill: 91, priority: 'CRITICAL', time: '08:15 AM' },
    { order: 2, name: 'Gulshan-2 Circle Bin A (BIN-DHK-001)', fill: 88, priority: 'CRITICAL', time: '09:00 AM' },
    { order: 3, name: 'CUET Shaheed Minar Square (BIN-CUET-002)', fill: 82, priority: 'WARNING', time: '10:30 AM' },
    { order: 4, name: 'Banani Road 11 Bin B (BIN-DHK-002)', fill: 74, priority: 'WARNING', time: '11:45 AM' },
    { order: 5, name: 'CUET Academic Hall Bin (BIN-CUET-001)', fill: 65, priority: 'NORMAL', time: '01:15 PM' },
    { order: 6, name: 'Dhanmondi Lake Park Bin (BIN-DHK-003)', fill: 42, priority: 'NORMAL', time: '02:30 PM' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Navigation size={28} color="#10b981" />
          Smart Waste Route Optimizer & Budget Simulator
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          AI TSP (Traveling Salesperson Problem) routing prioritizes dustbins &gt;75% fill capacity to minimize municipal transport cost & carbon emissions.
        </p>
      </div>

      <div className="grid-cols-3" style={{ gap: '2rem' }}>
        {/* Left col: Budget Slider & Optimizer settings */}
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
              min={15000}
              max={95000}
              step={5000}
              value={budgetBdt}
              onChange={(e) => setBudgetBdt(Number(e.target.value))}
              style={{
                width: '100%',
                cursor: 'pointer',
                accentColor: '#10b981'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              <span>৳ 15,000 (Min)</span>
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
            onClick={() => alert(`Dispatching ${allocatedTrucks} collection trucks along optimized TSP route sequence!`)}
          >
            <Sparkles size={16} /> Dispatch Optimized Route
          </button>
        </div>

        {/* Right 2 cols: Ordered TSP Stops Sequence */}
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
            {stops.map((stp) => {
              const badgeClass = stp.priority === 'CRITICAL' ? 'badge-critical' : (stp.priority === 'WARNING' ? 'badge-warning' : 'badge-normal');
              return (
                <div
                  key={stp.order}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-glass)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: stp.priority === 'CRITICAL' ? '#ef4444' : (stp.priority === 'WARNING' ? '#f59e0b' : '#10b981'),
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.9rem'
                      }}
                    >
                      {stp.order}
                    </div>

                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        {stp.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
                        <MapPin size={13} color="#10b981" /> ETA: {stp.time}
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
      </div>
    </div>
  );
};
