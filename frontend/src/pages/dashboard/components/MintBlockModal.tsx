import React from 'react';
import { PlusCircle } from 'lucide-react';

interface MintBlockModalProps {
  newZone: string;
  setNewZone: (val: string) => void;
  newWasteType: 'COMPOST' | 'RECYCLE' | 'TRASH';
  setNewWasteType: (val: 'COMPOST' | 'RECYCLE' | 'TRASH') => void;
  newWeight: string;
  setNewWeight: (val: string) => void;
  isMinting: boolean;
  handleCreateBlock: (e: React.FormEvent) => Promise<void> | void;
}

export const MintBlockModal: React.FC<MintBlockModalProps> = ({
  newZone,
  setNewZone,
  newWasteType,
  setNewWasteType,
  newWeight,
  setNewWeight,
  isMinting,
  handleCreateBlock
}) => {
  return (
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
  );
};
