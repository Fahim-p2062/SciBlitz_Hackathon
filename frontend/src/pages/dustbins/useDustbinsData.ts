import { useState, useEffect } from 'react';
import type { DustbinItem } from './types';
import { apiFetch } from '../../config/api';

export function useDustbinsData() {
  const [dustbins, setDustbins] = useState<DustbinItem[]>([
    {
      binId: 'BIN-DHK-001',
      name: 'Gulshan-2 Circle Bin A',
      zone: 'Dhaka North City Corp',
      location: { lat: 23.7925, lng: 90.4078, address: 'Gulshan Avenue, Dhaka' },
      fillLevel: 88,
      temperature: 31,
      battery: 92,
      status: 'CRITICAL',
      lastEmptiedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
    },
    {
      binId: 'BIN-DHK-002',
      name: 'Banani Road 11 Bin B',
      zone: 'Dhaka North City Corp',
      location: { lat: 23.7937, lng: 90.4066, address: 'Road 11, Banani' },
      fillLevel: 74,
      temperature: 29,
      battery: 87,
      status: 'WARNING',
      lastEmptiedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString()
    },
    {
      binId: 'BIN-DHK-003',
      name: 'Dhanmondi Lake Park Bin',
      zone: 'Dhaka South City Corp',
      location: { lat: 23.7461, lng: 90.3742, address: 'Dhanmondi Lake, Dhaka' },
      fillLevel: 42,
      temperature: 28,
      battery: 96,
      status: 'NORMAL',
      lastEmptiedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString()
    },
    {
      binId: 'BIN-CTG-001',
      name: 'Agrabad Commercial Bin',
      zone: 'Chittagong City Corp',
      location: { lat: 22.3236, lng: 91.8123, address: 'Agrabad C/A, Chittagong' },
      fillLevel: 91,
      temperature: 32,
      battery: 81,
      status: 'CRITICAL',
      lastEmptiedAt: new Date(Date.now() - 42 * 3600 * 1000).toISOString()
    },
    {
      binId: 'BIN-CUET-001',
      name: 'CUET Academic Hall Bin',
      zone: 'CUET Campus',
      location: { lat: 22.4633, lng: 91.9782, address: 'CUET Academic Bldg, Raozan' },
      fillLevel: 65,
      temperature: 27,
      battery: 95,
      status: 'NORMAL',
      lastEmptiedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
    },
    {
      binId: 'BIN-CUET-002',
      name: 'CUET Shaheed Minar Square',
      zone: 'CUET Campus',
      location: { lat: 22.4640, lng: 91.9790, address: 'Shaheed Minar Square, CUET' },
      fillLevel: 82,
      temperature: 28,
      battery: 89,
      status: 'WARNING',
      lastEmptiedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
    }
  ]);

  const [selectedZone, setSelectedZone] = useState('ALL');

  useEffect(() => {
    apiFetch<DustbinItem[]>('/api/dustbins')
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDustbins(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleEmptyBin = async (binId: string) => {
    try {
      await apiFetch(`/api/dustbins/${binId}/empty`, { method: 'POST' });
    } catch (err) {}

    setDustbins(dustbins.map(b => b.binId === binId ? {
      ...b,
      fillLevel: 5,
      status: 'NORMAL' as const,
      lastEmptiedAt: new Date().toISOString()
    } : b));
  };

  const filteredBins = selectedZone === 'ALL' 
    ? dustbins 
    : dustbins.filter(b => b.zone === selectedZone);

  return {
    dustbins,
    filteredBins,
    selectedZone,
    setSelectedZone,
    handleEmptyBin
  };
}
