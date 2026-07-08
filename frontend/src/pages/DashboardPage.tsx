import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Recycle, 
  Database, 
  TrendingUp, 
  Layers, 
  PlusCircle, 
  CheckCircle2, 
  Activity,
  Award
} from 'lucide-react';

interface LedgerTransaction {
  txId: string;
  sourceZone: string;
  wasteType: 'COMPOST' | 'RECYCLE' | 'TRASH';
  weightKg: number;
  collectorId: string;
  verificationStatus: string;
  timestamp: string;
}

interface LedgerBlock {
  blockIndex: number;
  hash: string;
  previousHash: string;
  validatorNode: string;
  timestamp: string;
  transactions: LedgerTransaction[];
}

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalRecycledKg: 1485.5,
    co2OffsetTons: 4.12,
    verifiedLedgerBlocks: 8,
    activeDustbins: 6,
    criticalAlerts: 2,
    circularEfficiency: 91.2
  });

  const [ledgerBlocks, setLedgerBlocks] = useState<LedgerBlock[]>([
    {
      blockIndex: 1,
      hash: '0x8f3c4d29a1b0c7e6f8d392014b2a8f9c3e41d25b6a7c8e9f0d1e2f3a4b5c6d7e',
      previousHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      validatorNode: 'EcoSortha-Validator-DHK01',
      timestamp: new Date(Date.now() - 7200 * 1000).toISOString(),
      transactions: [
        {
          txId: 'TX-CIRC-9901',
          sourceZone: 'Dhaka North City Corp',
          wasteType: 'RECYCLE',
          weightKg: 420.5,
          collectorId: 'TRUCK-DHK-44',
          verificationStatus: 'VERIFIED',
          timestamp: new Date(Date.now() - 7150 * 1000).toISOString()
        },
        {
          txId: 'TX-CIRC-9902',
          sourceZone: 'CUET Campus',
          wasteType: 'COMPOST',
          weightKg: 185.0,
          collectorId: 'GREEN-CART-02',
          verificationStatus: 'VERIFIED',
          timestamp: new Date(Date.now() - 7100 * 1000).toISOString()
        }
      ]
    },
    {
      blockIndex: 2,
      hash: '0x4b7c1f8a9e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b',
      previousHash: '0x8f3c4d29a1b0c7e6f8d392014b2a8f9c3e41d25b6a7c8e9f0d1e2f3a4b5c6d7e',
      validatorNode: 'EcoSortha-Validator-CTG02',
      timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
      transactions: [
        {
          txId: 'TX-CIRC-9903',
          sourceZone: 'Chittagong City Corp',
          wasteType: 'RECYCLE',
          weightKg: 640.0,
          collectorId: 'TRUCK-CTG-12',
          verificationStatus: 'VERIFIED',
          timestamp: new Date(Date.now() - 3500 * 1000).toISOString()
        }
      ]
    }
  ]);

  const [newZone, setNewZone] = useState('Dhaka South City Corp');
  const [newWasteType, setNewWasteType] = useState<'COMPOST' | 'RECYCLE' | 'TRASH'>('RECYCLE');
  const [newWeight, setNewWeight] = useState('320');
  const [isMinting, setIsMinting] = useState(false);

  useEffect(() => {
    // Attempt fetching from backend server if online
    fetch('http://localhost:5000/api/stats')
      .then(r => r.json())
      .then(data => {
        if (data && data.totalRecycledKg) setStats(data);
      })
      .catch(() => {
        // Safe offline/fallback demo state
      });

    fetch('http://localhost:5000/api/ledger')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setLedgerBlocks(data);
      })
      .catch(() => {});
  }, []);

  const handleCreateBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMinting(true);
    const prevBlock = ledgerBlocks[ledgerBlocks.length - 1];
    const prevHash = prevBlock ? prevBlock.hash : '0x0000000000000000';
    const nextIndex = ledgerBlocks.length + 1;
    const newHash = '0x' + Math.random().toString(16).substring(2, 18) + Math.random().toString(16).substring(2, 18);

    const createdBlock: LedgerBlock = {
      blockIndex: nextIndex,
      hash: newHash,
      previousHash: prevHash,
      validatorNode: `EcoSortha-Validator-${newZone.substring(0, 3).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      transactions: [
        {
          txId: `TX-CIRC-${Math.floor(1000 + Math.random() * 9000)}`,
          sourceZone: newZone,
          wasteType: newWasteType,
          weightKg: Number(newWeight) || 320,
          collectorId: 'AI-DISPATCH-09',
          verificationStatus: 'VERIFIED',
          timestamp: new Date().toISOString()
        }
      ]
    };

    // Try sending to server
    try {
      const res = await fetch('http://localhost:5000/api/ledger/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceZone: newZone,
          wasteType: newWasteType,
          weightKg: Number(newWeight),
          collectorId: 'AI-DISPATCH-09'
        })
      });
      if (res.ok) {
        const remoteBlock = await res.json();
        setLedgerBlocks([...ledgerBlocks, remoteBlock]);
        setStats(s => ({ ...s, totalRecycledKg: s.totalRecycledKg + Number(newWeight), verifiedLedgerBlocks: s.verifiedLedgerBlocks + 1 }));
        setIsMinting(false);
        return;
      }
    } catch (err) {
      // fallback local state append
    }

    setLedgerBlocks([...ledgerBlocks, createdBlock]);
    setStats(s => ({ ...s, totalRecycledKg: s.totalRecycledKg + Number(newWeight), verifiedLedgerBlocks: s.verifiedLedgerBlocks + 1 }));
    setIsMinting(false);
  };

  return (
    <div>
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

      {/* Blockchain Ledger & Minting Grid */}
      <div className="grid-cols-3" style={{ gap: '2rem' }}>
        {/* Left 2 cols: Blockchain Ledger Explorer */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={22} color="#10b981" />
                EcoSortha Immutable Blockchain Ledger
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Every verified collection event is cryptographically linked to prevent tampering.
              </p>
            </div>
            <span className="badge badge-normal">
              <CheckCircle2 size={14} /> Synchronized
            </span>
          </div>

          <div className="blockchain-ledger">
            {ledgerBlocks.map((blk) => (
              <div key={blk.blockIndex} className="block-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '6px' }}>
                      Block #{blk.blockIndex}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Validator: <strong style={{ color: 'var(--text-primary)' }}>{blk.validatorNode}</strong>
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(blk.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.6rem 0.85rem', borderRadius: '6px', marginBottom: '0.85rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BLOCK HASH:</div>
                  <div className="mono" style={{ fontSize: '0.8rem', color: '#34d399', wordBreak: 'break-all' }}>
                    {blk.hash}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    PREV HASH: <span className="mono">{blk.previousHash.substring(0, 32)}...</span>
                  </div>
                </div>

                <div>
                  {blk.transactions.map((tx) => (
                    <div 
                      key={tx.txId} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                          {tx.sourceZone} • <span style={{ color: tx.wasteType === 'COMPOST' ? '#10b981' : '#38bdf8' }}>{tx.wasteType}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          TxID: {tx.txId} | Collector: {tx.collectorId}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: '#10b981' }}>
                          +{tx.weightKg} kg
                        </div>
                        <span className="badge badge-normal" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                          {tx.verificationStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right col: Mint new ledger record */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlusCircle size={20} color="#10b981" />
            Mint Verification Block
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Simulate a municipal waste collection transaction and verify it onto the EcoSortha Circular ledger.
          </p>

          <form onSubmit={handleCreateBlock} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                Municipal Zone
              </label>
              <select 
                value={newZone}
                onChange={(e) => setNewZone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-glass)',
                  fontWeight: 500
                }}
              >
                <option value="Dhaka North City Corp">Dhaka North City Corp</option>
                <option value="Dhaka South City Corp">Dhaka South City Corp</option>
                <option value="Chittagong City Corp">Chittagong City Corp</option>
                <option value="CUET Campus">CUET Campus Zone</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                Segregated Waste Category
              </label>
              <select 
                value={newWasteType}
                onChange={(e) => setNewWasteType(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-glass)',
                  fontWeight: 500
                }}
              >
                <option value="RECYCLE">Recycle (Plastics, Glass, Metal)</option>
                <option value="COMPOST">Compost (Organic & Biodegradable)</option>
                <option value="TRASH">General Trash (Residual)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                Weight (kg)
              </label>
              <input 
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-glass)',
                  fontWeight: 600
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              {isMinting ? 'Minting Block...' : 'Verify & Mint Block'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
