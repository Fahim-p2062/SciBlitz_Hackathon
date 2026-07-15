export interface LedgerTransaction {
  txId: string;
  sourceZone: string;
  wasteType: 'COMPOST' | 'RECYCLE' | 'TRASH';
  weightKg: number;
  collectorId: string;
  verificationStatus: string;
  timestamp: string;
}

export interface LedgerBlock {
  blockIndex: number;
  hash: string;
  previousHash: string;
  validatorNode: string;
  timestamp: string;
  transactions: LedgerTransaction[];
}

export interface DashboardStats {
  totalRecycledKg: number;
  co2OffsetTons: number;
  verifiedLedgerBlocks: number;
  activeDustbins: number;
  criticalAlerts: number;
  circularEfficiency: number;
}
