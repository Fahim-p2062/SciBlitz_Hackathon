import React from 'react';
import { Eye, Send } from 'lucide-react';
import type { ComprehensiveWasteTaxonomy } from '../types';

interface TaxonomyDetailsTableProps {
  activeTarget: ComprehensiveWasteTaxonomy | null;
  commitToBlockchainLedger: () => Promise<void> | void;
}

export const TaxonomyDetailsTable: React.FC<TaxonomyDetailsTableProps> = ({
  activeTarget,
  commitToBlockchainLedger
}) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Eye size={20} color="#10b981" />
          Comprehensive Taxonomy Analysis
        </h3>

        {activeTarget ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Header */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${activeTarget.color}`, borderRadius: '10px', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span 
                  style={{ 
                    background: activeTarget.color,
                    color: '#fff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontWeight: 800,
                    fontSize: '0.72rem'
                  }}
                >
                  {activeTarget.operationalStream} STREAM
                </span>
                <span style={{ fontWeight: 700, color: activeTarget.color, fontSize: '0.85rem' }}>
                  {activeTarget.confidence}% AI Confidence
                </span>
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {activeTarget.itemName}
              </h4>
            </div>

            {/* Waste Taxonomy Database Match Card (Pattern Required) */}
            <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid #10b981', borderRadius: '10px', padding: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10b981', letterSpacing: '0.5px' }}>
                  WASTE TAXONOMY DETECTION DATABASE
                </span>
                <span style={{ background: '#10b981', color: '#090e17', padding: '0.12rem 0.5rem', borderRadius: '4px', fontWeight: 900, fontSize: '0.75rem' }}>
                  CODE: {activeTarget.categoryCode || 'STD-01'}
                </span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff', marginBottom: '0.35rem' }}>
                {activeTarget.categoryName || 'CATEGORY 1: PLASTIC (Recyclable)'}
              </div>

              {/* Exact Object Match Specs from user database */}
              {activeTarget.objectId ? (
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '6px', padding: '0.6rem', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399' }}>
                      OBJECT ID: {activeTarget.objectId}
                    </span>
                    <span style={{ 
                      fontSize: '0.7rem', fontWeight: 800, padding: '0.1rem 0.4rem', borderRadius: '3px',
                      background: activeTarget.conditionState === 'Intact' ? '#10b981' : activeTarget.conditionState?.includes('Crushed') ? '#f59e0b' : '#ef4444',
                      color: '#fff'
                    }}>
                      {activeTarget.conditionState || 'Intact'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                    {activeTarget.objectNameEn || activeTarget.itemName}
                  </div>
                  {activeTarget.objectNameBn && (
                    <div style={{ fontSize: '0.8rem', color: '#a7f3d0', marginBottom: '0.3rem' }}>
                      {activeTarget.objectNameBn}
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem', fontSize: '0.75rem', color: '#cbd5e1', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.3rem' }}>
                    <div><strong>Material:</strong> {activeTarget.material || 'Standard'}</div>
                    <div><strong>Reusable:</strong> {activeTarget.reusable ? '✅ Yes' : '❌ No'}</div>
                    <div style={{ gridColumn: 'span 2' }}><strong>Context:</strong> {activeTarget.commonSourceContext || 'General municipal refuse'}</div>
                  </div>
                </div>
              ) : null}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', background: 'rgba(0,0,0,0.3)', padding: '0.55rem 0.75rem', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                  <strong>Sub-type:</strong> <span style={{ color: '#10b981' }}>{activeTarget.subType || 'General'}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontFamily: 'sans-serif' }}>
                  <strong>উদাহরণ (Example):</strong> {activeTarget.bengaliExample || 'পানির বোতল, সাধারণ বর্জ্য'}
                </div>
              </div>
            </div>

            {/* Tier 1: Nature & Composition */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.85rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10b981', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
                1. NATURE / COMPOSITION
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                {activeTarget.natureCategory}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {activeTarget.compositionDetail}
              </div>
            </div>

            {/* Tier 2: Operational Processing Pathway */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.85rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3b82f6', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
                2. OPERATIONAL RECYCLING PATHWAY
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                {activeTarget.processingPathway}
              </div>
            </div>

            {/* Tier 3: Physical State & Environmental Risk */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.85rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f59e0b', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
                3. PHYSICAL STATE & ENVIRONMENTAL RISK
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                State: {activeTarget.physicalState} • Mass: {activeTarget.weightGrams}g
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {activeTarget.environmentalRisk}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            Hold an object before the camera to analyze its 3-tier taxonomy.
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
        <button 
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.8rem' }}
          disabled={!activeTarget}
          onClick={commitToBlockchainLedger}
        >
          <Send size={16} /> Sync Verified Taxonomy to Blockchain Ledger
        </button>
      </div>
    </div>
  );
};
