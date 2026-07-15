import React from 'react';
import { Layers, ShieldCheck, Database, Search } from 'lucide-react';
import { useClassifier } from './useClassifier';
import { WebcamScanner } from './components/WebcamScanner';
import { TaxonomyDetailsTable } from './components/TaxonomyDetailsTable';

export const ClassifierPage: React.FC = () => {
  const {
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
    conditionFilter,
    setConditionFilter,
    searchQuery,
    setSearchQuery,
    detectionDatabaseEntries,
    selectExactDatabaseEntry,
    videoRef,
    canvasRef,
    lastMintedBlockHash,
    summaryMessage,
    startRealWebcam,
    stopRealWebcam,
    cycleComprehensiveTaxonomy,
    selectCategoryByCode,
    commitToBlockchainLedger
  } = useClassifier();

  const taxonomyCategories = [
    { code: 'PL-01', label: 'PLASTIC (PL-01/02/05)', color: '#3b82f6', bengali: 'পানির বোতল, শ্যাম্পু জার' },
    { code: 'PA-01', label: 'PAPER (PA-01/03)', color: '#06b6d4', bengali: 'কার্টন বক্স, সাদা কাগজ' },
    { code: 'GL-01', label: 'GLASS (GL-01)', color: '#14b8a6', bengali: 'পানির/মেডিসিন বোতল' },
    { code: 'ME-01', label: 'METAL (ME-01/02)', color: '#6366f1', bengali: 'কোল্ড ড্রিংক ক্যান, ফুড ক্যান' },
    { code: 'EW-02', label: 'E-WASTE (EW-02/04)', color: '#a855f7', bengali: 'সার্কিট বোর্ড, ফোন, চার্জার' },
    { code: 'TX-01', label: 'TEXTILE (TX-01)', color: '#ec4899', bengali: 'পুরনো কাপড়' },
    { code: 'OR-01', label: 'ORGANIC (OR-01/02)', color: '#10b981', bengali: 'খাদ্য বর্জ্য, পাতা, ডাল' },
    { code: 'NR-01', label: 'NON-REUSABLE / MANUAL (NR-01..04)', color: '#ef4444', bengali: 'চিপসের প্যাকেট, মাস্ক, টেট্রা প্যাক' }
  ];

  const filteredDatabase = detectionDatabaseEntries.filter(item => {
    const matchesQuery = !searchQuery || 
      item.object_name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.object_name_bn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.object_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sub_type_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCondition = conditionFilter === 'All' || item.condition_state.toLowerCase().includes(conditionFilter.toLowerCase());
    return matchesQuery && matchesCondition;
  });

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Layers size={28} color="#10b981" />
          Comprehensive 3-Tier Waste Classification Engine
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Real-time AI segregation categorizing items by <strong style={{ color: '#fff' }}>Nature/Composition</strong>, <strong style={{ color: '#fff' }}>Recycling Operational Stream</strong>, and <strong style={{ color: '#fff' }}>Physical State & Environmental Risk</strong>.
        </p>
      </div>

      {/* Waste Taxonomy Standard Quick Selector Bar */}
      <div className="card" style={{ marginBottom: '1.75rem', padding: '1.1rem 1.4rem', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border-glass)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#10b981', letterSpacing: '0.5px' }}>
            ⚡ DETECTION DATABASE TAXONOMY QUICK SELECTOR (8 CATEGORIES)
          </span>
          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            CLICK ANY CATEGORY TO INSPECT & SEGREGATE
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.65rem' }}>
          {taxonomyCategories.map((cat) => (
            <button
              key={cat.code}
              onClick={() => selectCategoryByCode(cat.code)}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${cat.color}66`,
                borderRadius: '8px',
                padding: '0.6rem 0.75rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.15rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${cat.color}18`;
                e.currentTarget.style.borderColor = cat.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = `${cat.color}66`;
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '0.78rem', color: cat.color }}>{cat.label}</span>
                <span className="mono" style={{ fontSize: '0.7rem', background: `${cat.color}33`, color: '#fff', padding: '0.1rem 0.35rem', borderRadius: '3px', fontWeight: 700 }}>{cat.code}</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#cbd5e1', fontFamily: 'sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                উদাহরণ: {cat.bengali}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* High-Efficiency Object Detection Database Explorer */}
      <div className="card" style={{ marginBottom: '1.75rem', padding: '1.25rem 1.4rem', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #10b981' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Database size={22} color="#10b981" />
            <div>
              <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff', display: 'block' }}>
                DETECTION DATABASE LIVE SEARCH & BRAND EXPLORER ({filteredDatabase.length} entries)
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Filter across exact conditions (Intact vs Crushed vs Broken) for instant optical matching & 3-tier analysis
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Condition state tabs */}
            {(['All', 'Intact', 'Crushed/Flattened', 'Torn/Broken'] as const).map(cond => (
              <button
                key={cond}
                onClick={() => setConditionFilter(cond)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: conditionFilter === cond ? '#10b981' : 'rgba(255,255,255,0.05)',
                  color: conditionFilter === cond ? '#090e17' : '#e2e8f0',
                  border: `1px solid ${conditionFilter === cond ? '#10b981' : 'var(--border-glass)'}`,
                  transition: 'all 0.15s ease'
                }}
              >
                {cond === 'All' ? '🌐 All Conditions' : cond === 'Intact' ? '✨ Intact' : cond === 'Crushed/Flattened' ? '🔨 Crushed/Flattened' : '✂️ Torn/Broken'}
              </button>
            ))}
          </div>
        </div>

        {/* Search input bar */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search exact brand or code (e.g. Mum, Aquafina, Pran, PL-0001, Surf Excel, E-Waste)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.8rem 0.6rem 2.4rem',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-glass)',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="btn"
              style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)' }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Scrollable grid of matched database entries */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem', maxHeight: '260px', overflowY: 'auto', paddingRight: '0.3rem' }}>
          {filteredDatabase.map(item => (
            <div
              key={item.object_id}
              onClick={() => selectExactDatabaseEntry(item)}
              style={{
                background: activeTarget?.objectId === item.object_id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${activeTarget?.objectId === item.object_id ? '#10b981' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '8px',
                padding: '0.7rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399' }}>
                  {item.object_id} ({item.sub_type_code})
                </span>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '0.12rem 0.45rem',
                  borderRadius: '3px',
                  background: item.condition_state === 'Intact' ? '#10b981' : item.condition_state.includes('Crushed') ? '#f59e0b' : '#ef4444',
                  color: '#fff'
                }}>
                  {item.condition_state}
                </span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.object_name_en}
              </div>
              <div style={{ fontSize: '0.76rem', color: '#a7f3d0', fontFamily: 'sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.object_name_bn}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.3rem' }}>
                <span>Material: {item.material.split(' ')[0]}</span>
                <span style={{ color: item.reusable ? '#34d399' : '#f87171' }}>{item.reusable ? 'Reusable' : 'Non-Reusable'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lastMintedBlockHash && (
        <div style={{ padding: '0.85rem 1.2rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '10px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldCheck size={20} color="#10b981" />
            <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>Blockchain Ledger Block Confirmed</span>
          </div>
          <span className="mono" style={{ fontSize: '0.8rem', color: '#10b981' }}>
            BLOCK TX: {lastMintedBlockHash}
          </span>
        </div>
      )}

      <div className="grid-cols-3" style={{ gap: '2rem' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <WebcamScanner
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            compostCount={compostCount}
            recycleCount={recycleCount}
            hazardousCount={hazardousCount}
            landfillCount={landfillCount}
            hasWebcamPermission={hasWebcamPermission}
            webcamError={webcamError}
            modelLoading={modelLoading}
            realDetections={realDetections}
            activeTarget={activeTarget}
            videoRef={videoRef}
            canvasRef={canvasRef}
            summaryMessage={summaryMessage}
            startRealWebcam={startRealWebcam}
            stopRealWebcam={stopRealWebcam}
            cycleComprehensiveTaxonomy={cycleComprehensiveTaxonomy}
          />
        </div>

        <TaxonomyDetailsTable
          activeTarget={activeTarget}
          commitToBlockchainLedger={commitToBlockchainLedger}
        />
      </div>
    </div>
  );
};

export default ClassifierPage;
