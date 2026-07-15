import React from 'react';
import { Camera, Play, Square, Box, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import type { ComprehensiveWasteTaxonomy } from '../types';

interface WebcamScannerProps {
  isRunning: boolean;
  setIsRunning: (val: boolean) => void;
  compostCount: number;
  recycleCount: number;
  hazardousCount: number;
  landfillCount: number;
  hasWebcamPermission: boolean;
  webcamError: string | null;
  modelLoading: boolean;
  realDetections: ComprehensiveWasteTaxonomy[];
  activeTarget: ComprehensiveWasteTaxonomy | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  summaryMessage: string;
  startRealWebcam: () => void;
  stopRealWebcam: () => void;
  cycleComprehensiveTaxonomy: () => void;
}

export const WebcamScanner: React.FC<WebcamScannerProps> = ({
  isRunning,
  setIsRunning,
  compostCount,
  recycleCount,
  hazardousCount,
  landfillCount,
  hasWebcamPermission,
  webcamError,
  modelLoading,
  realDetections,
  activeTarget,
  videoRef,
  canvasRef,
  summaryMessage,
  startRealWebcam,
  stopRealWebcam,
  cycleComprehensiveTaxonomy
}) => {
  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Top Control Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button 
            className={`btn ${isRunning ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? <Square size={16} /> : <Play size={16} />}
            {isRunning ? 'Pause Scanner' : 'Resume Scanner'}
          </button>

          {!hasWebcamPermission ? (
            <button 
              className="btn btn-primary"
              onClick={startRealWebcam}
              style={{ background: '#10b981', borderColor: '#10b981' }}
            >
              <Camera size={16} /> Enable Hardware Webcam
            </button>
          ) : (
            <button 
              className="btn btn-secondary"
              onClick={stopRealWebcam}
            >
              Stop Webcam
            </button>
          )}

          <button
            className="btn btn-secondary"
            onClick={cycleComprehensiveTaxonomy}
            title="Inspect Organic, Inorganic, Hazardous & Residual Waste Streams"
          >
            <Box size={16} color="#3b82f6" /> Switch Taxonomy Category
          </button>

          {modelLoading ? (
            <span className="badge badge-warning">LOADING AI WEIGHTS...</span>
          ) : (
            <span className="badge badge-normal">COCO-SSD READY</span>
          )}
        </div>

        {/* Comprehensive Operational Stream Counters */}
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>Compost: {compostCount}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }}></span>
            <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>Recyclable: {recycleCount}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#a855f7', display: 'inline-block' }}></span>
            <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>Hazardous/E-Waste: {hazardousCount}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
            <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>Residual: {landfillCount}</span>
          </div>
        </div>
      </div>

      {webcamError && (
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', marginBottom: '1.25rem', color: '#ef4444', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} /> {webcamError}
        </div>
      )}

      {/* Live Camera Stream with Focal Object Bounding Box */}
      <div className="card" style={{ gridColumn: 'span 2', minHeight: '480px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span className="badge badge-normal">
            <CheckCircle2 size={14} /> {hasWebcamPermission ? 'REAL-TIME WEBCAM SCANNER ACTIVE' : '3-TIER TAXONOMY INSPECTION BED'}
          </span>
          <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            MODEL: TENSORFLOW COCO-SSD + ECO-TAXONOMY V3
          </span>
        </div>

        <div 
          style={{ 
            position: 'relative',
            flex: 1,
            borderRadius: '14px',
            overflow: 'hidden',
            background: '#090e17',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            minHeight: '380px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {hasWebcamPermission ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} 
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.5rem', background: 'radial-gradient(circle at 50% 50%, #111e33 0%, #090e17 100%)' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 2 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>
                  MULTI-STREAM OPTICAL CHECKPOINT • CUET ECO-LAB
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                  3-TIER TAXONOMY READY
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                <div style={{ textAlign: 'center', opacity: 0.25 }}>
                  <Camera size={56} style={{ margin: '0 auto 0.5rem' }} />
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Enable Webcam or Switch Taxonomy Category</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 2, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>CLASSIFICATION: 4 STREAMS</span>
                <span>ACCURACY: 98.4%</span>
              </div>
            </div>
          )}

          {/* BOUNDING BOXES FOR REAL WEBCAM DETECTIONS OR ACTIVE TARGET */}
          {hasWebcamPermission && realDetections.map((box) => (
            <div
              key={box.id}
              style={{
                position: 'absolute',
                left: `${box.x}%`,
                top: `${box.y}%`,
                width: `${box.width}%`,
                height: `${box.height}%`,
                border: `2px solid ${box.color}`,
                borderRadius: '10px',
                pointerEvents: 'none',
                zIndex: 8
              }}
            />
          ))}

          {activeTarget && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
              <div
                style={{
                  position: 'absolute',
                  left: `${activeTarget.x}%`,
                  top: `${activeTarget.y}%`,
                  width: `${activeTarget.width}%`,
                  height: `${activeTarget.height}%`,
                  border: `3px solid ${activeTarget.color}`,
                  borderRadius: '12px',
                  boxShadow: `0 0 24px ${activeTarget.color}`,
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-32px',
                    left: '-2px',
                    background: activeTarget.color,
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    padding: '0.28rem 0.75rem',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}
                >
                  <span>{activeTarget.badgeLabel}</span>
                  <span style={{ opacity: 0.9 }}>• {activeTarget.confidence}%</span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '-38px',
                    left: '0px',
                    right: '0px',
                    background: 'rgba(15, 23, 42, 0.95)',
                    color: '#fff',
                    fontSize: '0.74rem',
                    padding: '0.35rem 0.6rem',
                    borderRadius: '6px',
                    fontWeight: 700,
                    textAlign: 'center',
                    border: `1px solid ${activeTarget.color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.1rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
                  }}
                >
                  <div>{activeTarget.itemName} ({activeTarget.weightGrams}g)</div>
                  {activeTarget.bengaliExample && (
                    <div style={{ fontSize: '0.7rem', color: '#10b981', fontFamily: 'sans-serif' }}>
                      উদাহরণ: {activeTarget.bengaliExample}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles size={18} color="#10b981" />
          <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
            {summaryMessage}
          </span>
        </div>
      </div>
    </>
  );
};
