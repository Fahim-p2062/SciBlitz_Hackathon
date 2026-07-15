import { useState, useEffect } from 'react';
import type { DashboardStats, LedgerBlock } from './types';
import { apiFetch } from '../../config/api';

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats>({
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
    apiFetch<DashboardStats>('/api/stats')
      .then(data => {
        if (data && data.totalRecycledKg) setStats(data);
      })
      .catch(() => {
        // Safe offline/fallback demo state
      });

    apiFetch<LedgerBlock[]>('/api/ledger')
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

    try {
      const remoteBlock = await apiFetch<LedgerBlock>('/api/ledger/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceZone: newZone,
          wasteType: newWasteType,
          weightKg: Number(newWeight),
          collectorId: 'AI-DISPATCH-09'
        })
      });
      setLedgerBlocks([...ledgerBlocks, remoteBlock]);
      setStats(s => ({ ...s, totalRecycledKg: s.totalRecycledKg + Number(newWeight), verifiedLedgerBlocks: s.verifiedLedgerBlocks + 1 }));
      setIsMinting(false);
      return;
    } catch (err) {
      // fallback local state append
    }

    setLedgerBlocks([...ledgerBlocks, createdBlock]);
    setStats(s => ({ ...s, totalRecycledKg: s.totalRecycledKg + Number(newWeight), verifiedLedgerBlocks: s.verifiedLedgerBlocks + 1 }));
    setIsMinting(false);
  };

  return {
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
  };
}
