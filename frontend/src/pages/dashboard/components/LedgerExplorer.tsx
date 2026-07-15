import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';
import type { LedgerBlock } from '../types';

interface LedgerExplorerProps {
  ledgerBlocks: LedgerBlock[];
}

export const LedgerExplorer: React.FC<LedgerExplorerProps> = ({ ledgerBlocks }) => {
  return (
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
  );
};
