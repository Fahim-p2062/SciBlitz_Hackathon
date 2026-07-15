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
    },
    {
      binId: 'BIN-CUET-HW01',
      name: 'CUET Live Hardware IoT Dustbin (Firebase Demo)',
      zone: 'CUET Campus',
      location: { lat: 22.4645, lng: 91.9795, address: 'Hardware IoT Prototype Lab, CUET' },
      fillLevel: 100,
      temperature: 30,
      battery: 98,
      status: 'CRITICAL',
      lastEmptiedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
    }
  ]);

  const [selectedZone, setSelectedZone] = useState('ALL');

  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        const data = await apiFetch<DustbinItem[]>('/api/dustbins');
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setDustbins(data);
          return;
        }
      } catch (err) {}

      // Direct fallback / client-side live update from Firebase RTDB
      try {
        const fbRes = await fetch('https://smartdustbin-696a9-default-rtdb.asia-southeast1.firebasedatabase.app/binData.json?auth=OabTeHdFKGmnrK4w69lcNLhj64HzzjFtqFokCYHG');
        if (fbRes.ok && isMounted) {
          const fbData = await fbRes.json();
          let liveFill = 0;
          if (fbData?.bin1 && typeof fbData.bin1.fillPercent === 'number') {
            liveFill = Math.round(Math.min(100, Math.max(0, fbData.bin1.fillPercent)) * 10) / 10;
          } else if (fbData?.binData?.bin1 && typeof fbData.binData.bin1.fillPercent === 'number') {
            liveFill = Math.round(Math.min(100, Math.max(0, fbData.binData.bin1.fillPercent)) * 10) / 10;
          }
          setDustbins(prev => prev.map(b => b.binId === 'BIN-CUET-HW01' ? {
            ...b,
            fillLevel: liveFill,
            status: liveFill >= 85 ? 'CRITICAL' : (liveFill >= 70 ? 'WARNING' : 'NORMAL')
          } : b));
        }
      } catch (fbErr) {}
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
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
