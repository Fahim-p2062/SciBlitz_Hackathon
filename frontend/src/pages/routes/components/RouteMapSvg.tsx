import React from 'react';
import { Truck, Sparkles, Pause, Play, RotateCcw } from 'lucide-react';
import type { RouteStop } from '../types';

interface RouteMapSvgProps {
  stops: RouteStop[];
  activeStopIndex: number;
  currentProgress: number;
  truckPos: { x: number; y: number };
  isSimulating: boolean;
  setIsSimulating: (val: boolean) => void;
  setCurrentProgress: (val: number) => void;
  setActiveStopIndex: (val: number) => void;
  collectedKg: number;
  currentStop: RouteStop;
}

export const RouteMapSvg: React.FC<RouteMapSvgProps> = ({
  stops,
  activeStopIndex,
  currentProgress,
  truckPos,
  isSimulating,
  setIsSimulating,
  setCurrentProgress,
  setActiveStopIndex,
  collectedKg,
  currentStop
}) => {
  return (
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
  );
};
