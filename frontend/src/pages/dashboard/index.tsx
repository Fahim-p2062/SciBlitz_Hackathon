import React from 'react';
import { useDashboardData } from './useDashboardData';
import { StatsCardsOverview } from './components/StatsCardsOverview';
import { LedgerExplorer } from './components/LedgerExplorer';
import { MintBlockModal } from './components/MintBlockModal';

export const DashboardPage: React.FC = () => {
  const {
    stats,
    ledgerBlocks,
    newZone,
    setNewZone,
    newWasteType,
    setNewWasteType,
    newWeight,
    setNewWeight,
    isMinting,
    handleCreateBlock
  } = useDashboardData();

  return (
    <div>
      {/* Hero & KPIs */}
      <StatsCardsOverview stats={stats} />

      {/* Blockchain Ledger & Minting Grid */}
      <div className="grid-cols-3" style={{ gap: '2rem' }}>
        <LedgerExplorer ledgerBlocks={ledgerBlocks} />
        <MintBlockModal
          newZone={newZone}
          setNewZone={setNewZone}
          newWasteType={newWasteType}
          setNewWasteType={setNewWasteType}
          newWeight={newWeight}
          setNewWeight={setNewWeight}
          isMinting={isMinting}
          handleCreateBlock={handleCreateBlock}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
