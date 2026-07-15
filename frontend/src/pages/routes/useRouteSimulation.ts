import { useState, useEffect } from 'react';
import type { RouteStop } from './types';

export function useRouteSimulation() {
  const [budgetBdt, setBudgetBdt] = useState<number>(45000);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [currentProgress, setCurrentProgress] = useState<number>(15); // 0 to 100%
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);

  const truckCost = 4500;
  const allocatedTrucks = Math.min(6, Math.max(1, Math.floor(budgetBdt / truckCost)));
  const totalDistanceKm = Number((18.4 + (allocatedTrucks * 6.2)).toFixed(1));
  const estimatedCost = Number((allocatedTrucks * truckCost + (totalDistanceKm * 45)).toFixed(0));
  const fuelLiters = Number((totalDistanceKm * 0.28).toFixed(1));
  const co2SavedKg = Number((totalDistanceKm * 1.65).toFixed(1));

  const stops: RouteStop[] = [
    { order: 1, id: 'BIN-CTG-001', name: 'Agrabad Commercial Bin', fill: 91, priority: 'CRITICAL', time: '08:15 AM', x: 12, y: 75, wasteKg: 140 },
    { order: 2, id: 'BIN-DHK-001', name: 'Gulshan-2 Circle Bin A', fill: 88, priority: 'CRITICAL', time: '09:00 AM', x: 30, y: 28, wasteKg: 132 },
    { order: 3, id: 'BIN-CUET-002', name: 'CUET Shaheed Minar Square', fill: 82, priority: 'WARNING', time: '10:30 AM', x: 50, y: 65, wasteKg: 110 },
    { order: 4, id: 'BIN-DHK-002', name: 'Banani Road 11 Bin B', fill: 74, priority: 'WARNING', time: '11:45 AM', x: 68, y: 32, wasteKg: 95 },
    { order: 5, id: 'BIN-CUET-001', name: 'CUET Academic Hall Bin', fill: 65, priority: 'NORMAL', time: '01:15 PM', x: 84, y: 78, wasteKg: 80 },
    { order: 6, id: 'BIN-DHK-003', name: 'Dhanmondi Lake Park Bin', fill: 42, priority: 'NORMAL', time: '02:30 PM', x: 92, y: 25, wasteKg: 55 }
  ];

  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      interval = setInterval(() => {
        setCurrentProgress((prev) => {
          const next = prev >= 100 ? 0 : prev + 0.8;
          const index = Math.min(
            stops.length - 1,
            Math.floor((next / 100) * stops.length)
          );
          setActiveStopIndex(index);
          return Number(next.toFixed(1));
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isSimulating, stops.length]);

  const getTruckPosition = () => {
    const totalSegments = stops.length - 1;
    const progressPerSegment = 100 / totalSegments;
    const currentSegmentIndex = Math.min(
      totalSegments - 1,
      Math.floor(currentProgress / progressPerSegment)
    );
    const segmentProgress =
      (currentProgress - currentSegmentIndex * progressPerSegment) /
      progressPerSegment;

    const startNode = stops[currentSegmentIndex];
    const endNode = stops[currentSegmentIndex + 1] || stops[currentSegmentIndex];

    const x = startNode.x + (endNode.x - startNode.x) * segmentProgress;
    const y = startNode.y + (endNode.y - startNode.y) * segmentProgress;

    return { x, y };
  };

  const truckPos = getTruckPosition();
  const currentStop = stops[activeStopIndex] || stops[0];
  const collectedKg = stops
    .slice(0, activeStopIndex + 1)
    .reduce((sum, s) => sum + s.wasteKg, 0);

  return {
    budgetBdt,
    setBudgetBdt,
    isSimulating,
    setIsSimulating,
    currentProgress,
    setCurrentProgress,
    activeStopIndex,
    setActiveStopIndex,
    allocatedTrucks,
    totalDistanceKm,
    estimatedCost,
    fuelLiters,
    co2SavedKg,
    stops,
    truckPos,
    currentStop,
    collectedKg
  };
}
