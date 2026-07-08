import React, { useState, useEffect } from 'react';
import { Navigation, Truck, Fuel, DollarSign, Leaf, MapPin, Sparkles, ArrowRight, Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';

interface RouteStop {
  order: number;
  id: string;
  name: string;
  fill: number;
  priority: 'CRITICAL' | 'WARNING' | 'NORMAL';
  time: string;
  x: number; // SVG coordinate %
  y: number; // SVG coordinate %
  wasteKg: number;
}

export const RouteOptimizerPage: React.FC = () => {
  const [budgetBdt, setBudgetBdt] = useState<number>(45000);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [currentProgress, setCurrentProgress] = useState<number>(15); // 0 to 100%
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);

  const truckCost = 4500;
  const allocatedTrucks = Math.min(6, Math.max(1, Math.floor(budgetBdt / truckCost)));
  const totalDistanceKm = Number((18.4 + (allocatedTrucks * 6.2)).toFixed(1));
  const estimatedCost = Number((allocatedTrucks * truckCost + (totalDistanceKm * 45)).toFixed(0));
  const fuelLiters = Number((totalDistanceKm * 0.28).toFixed(1));
  const co2SavedKg = Number((totalDistanceKm * 1.65).toFixed(1));

  const stops: RouteStop[] = [
    { order: 1, id: 'BIN-CTG-001', name: 'Agrabad Commercial Bin', fill: 91, priority: 'CRITICAL', time: '08:15 AM', x: 12, y: 75, wasteKg: 140 },
    { order: 2, id: 'BIN-DHK-001', name: 'Gulshan-2 Circle Bin A', fill: 88, priority: 'CRITICAL', time: '09:00 AM', x: 30, y: 28, wasteKg: 132 },
    { order: 3, id: 'BIN-CUET-002', name: 'CUET Shaheed Minar Square', fill: 82, priority: 'WARNING', time: '10:30 AM', x: 50, y: 65, wasteKg: 110 },
    { order: 4, id: 'BIN-DHK-002', name: 'Banani Road 11 Bin B', fill: 74, priority: 'WARNING', time: '11:45 AM', x: 68, y: 32, wasteKg: 95 },
    { order: 5, id: 'BIN-CUET-001', name: 'CUET Academic Hall Bin', fill: 65, priority: 'NORMAL', time: '01:15 PM', x: 84, y: 78, wasteKg: 80 },
    { order: 6, id: 'BIN-DHK-003', name: 'Dhanmondi Lake Park Bin', fill: 42, priority: 'NORMAL', time: '02:30 PM', x: 92, y: 25, wasteKg: 55 }
  ];

  // Animation effect for live truck tracker
  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      interval = setInterval(() => {
        setCurrentProgress((prev) => {
          const next = prev >= 100 ? 0 : prev + 0.8;
          const index = Math.min(
            stops.length - 1,
            Math.floor((next / 100) * stops.length)
          );
          setActiveStopIndex(index);
          return Number(next.toFixed(1));
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isSimulating, stops.length]);

  // Interpolate truck position on SVG canvas
  const getTruckPosition = () => {
    const totalSegments = stops.length - 1;
    const progressPerSegment = 100 / totalSegments;
    const currentSegmentIndex = Math.min(
      totalSegments - 1,
      Math.floor(currentProgress / progressPerSegment)
    );
    const segmentProgress =
      (currentProgress - currentSegmentIndex * progressPerSegment) /
      progressPerSegment;

    const startNode = stops[currentSegmentIndex];
    const endNode = stops[currentSegmentIndex + 1] || stops[currentSegmentIndex];

    const x = startNode.x + (endNode.x - startNode.x) * segmentProgress;
    const y = startNode.y + (endNode.y - startNode.y) * segmentProgress;

    return { x, y };
  };

  const truckPos = getTruckPosition();
  const currentStop = stops[activeStopIndex] || stops[0];
  const collectedKg = stops
    .slice(0, activeStopIndex + 1)
    .reduce((sum, s) => sum + s.wasteKg, 0);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Navigation size={28} color="#10b981" />
          AI Route Optimizer & Live Fleet Telemetry Tracker
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Real-time Traveling Salesperson Problem (TSP) routing with interactive animated collection truck telemetry across Dhaka, Chittagong & CUET zones.
        </p>
      </div>

      {/* TOP SECTION: Animated Interactive Route Map & Truck Telemetry */}
      <div className="card" style={{ marginBottom: '2rem', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-normal">
              <Sparkles size={14} /> LIVE FLEET TRACKER
            </span>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
              Active Unit: <strong style={{ color: '#10b981' }}>TRUCK-CUET-EXP-04</strong>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              className={`btn ${isSimulating ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.45rem 0.85rem' }}
              onClick={() => setIsSimulating(!isSimulating)}
            >
              {isSimulating ? <Pause size={15} /> : <Play size={15} />}
              {isSimulating ? 'Pause Tracker' : 'Resume Simulation'}
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.85rem' }}
              onClick={() => {
                setCurrentProgress(0);
                setActiveStopIndex(0);
              }}
            >
              <RotateCcw size={15} /> Reset Route
            </button>
          </div>
        </div>

        {/* Animated SVG Route Map Canvas */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '320px',
            background: 'linear-gradient(135deg, #090d16 0%, #111827 100%)',
            borderRadius: '16px',
            border: '1px solid var(--border-glass)',
            overflow: 'hidden',
            marginBottom: '1.25rem'
          }}
        >
          {/* Background grid overlay */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <svg style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            {/* Draw connecting route path */}
            <path
              d={stops.reduce((acc, stp, idx) => {
                return idx === 0
                  ? `M ${stp.x}% ${stp.y}%`
                  : `${acc} L ${stp.x}% ${stp.y}%`;
              }, '')}
              fill="none"
              stroke="rgba(16, 185, 129, 0.35)"
              strokeWidth="4"
              strokeDasharray="8 6"
            />

            {/* Completed path highlight */}
            <path
              d={stops.slice(0, activeStopIndex + 1).reduce((acc, stp, idx) => {
                return idx === 0
                  ? `M ${stp.x}% ${stp.y}%`
                  : `${acc} L ${stp.x}% ${stp.y}%`;
              }, '')}
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
            />
          </svg>

          {/* Render Dustbin Stop Waypoints */}
          {stops.map((stp, idx) => {
            const isCompleted = idx <= activeStopIndex;
            const isCurrent = idx === activeStopIndex;
            const color = stp.priority === 'CRITICAL' ? '#ef4444' : stp.priority === 'WARNING' ? '#f59e0b' : '#3b82f6';

            return (
              <div
                key={stp.id}
                style={{
                  position: 'absolute',
                  left: `${stp.x}%`,
                  top: `${stp.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    width: isCurrent ? '28px' : '22px',
                    height: isCurrent ? '28px' : '22px',
                    borderRadius: '50%',
                    background: isCompleted ? '#10b981' : color,
                    border: '3px solid #fff',
                    boxShadow: isCurrent ? '0 0 20px #10b981' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {stp.order}
                </div>
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid var(--border-glass)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    marginTop: '0.35rem',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    color: isCompleted ? '#10b981' : '#fff'
                  }}
                >
                  {stp.name.split(' ')[0]} ({stp.fill}%)
                </div>
              </div>
            );
          })}

          {/* Animated Moving Truck Icon */}
          <div
            style={{
              position: 'absolute',
              left: `${truckPos.x}%`,
              top: `${truckPos.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              pointerEvents: 'none',
              transition: 'left 0.12s linear, top 0.12s linear'
            }}
          >
            <div
              style={{
                background: '#10b981',
                color: '#fff',
                padding: '0.4rem 0.65rem',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 0 24px rgba(16, 185, 129, 0.8)',
                border: '2px solid #ffffff',
                fontWeight: 800,
                fontSize: '0.78rem'
              }}
            >
              <Truck size={16} />
              <span>COLLECTING</span>
            </div>
          </div>
        </div>

        {/* Live Telemetry Progress Bar underneath map */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Route Completion</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', marginTop: '0.2rem' }}>
              {currentProgress}%
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Target Waypoint</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              Stop #{currentStop.order}: {currentStop.name.split(' ')[0]}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Waste Payload Collected</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#3b82f6', marginTop: '0.2rem' }}>
              {collectedKg} kg
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Live Fleet Velocity</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.2rem' }}>
              {isSimulating ? '38.5 km/h' : '0 km/h (PAUSED)'}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Budget Slider & TSP Sequence Breakdown */}
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
            onClick={() => {
              setCurrentProgress(0);
              setActiveStopIndex(0);
              setIsSimulating(true);
            }}
          >
            <Sparkles size={16} /> Dispatch Animated TSP Tracker
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
      </div>
    </div>
  );
};
