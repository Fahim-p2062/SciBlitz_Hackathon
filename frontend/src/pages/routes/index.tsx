import React from 'react';
import { Navigation } from 'lucide-react';
import { useRouteSimulation } from './useRouteSimulation';
import { RouteMapSvg } from './components/RouteMapSvg';
import { FleetTelemetryCards } from './components/FleetTelemetryCards';
import { StopsTable } from './components/StopsTable';

export const RouteOptimizerPage: React.FC = () => {
  const {
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
  } = useRouteSimulation();

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Navigation size={28} color="#10b981" />
          AI Route Optimizer & Live Fleet Telemetry Tracker
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Real-time Traveling Salesperson Problem (TSP) routing with interactive animated collection truck telemetry across Dhaka, Chittagong & CUET zones.
        </p>
      </div>

      {/* TOP SECTION: Animated Interactive Route Map & Truck Telemetry */}
      <RouteMapSvg
        stops={stops}
        activeStopIndex={activeStopIndex}
        currentProgress={currentProgress}
        truckPos={truckPos}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        setCurrentProgress={setCurrentProgress}
        setActiveStopIndex={setActiveStopIndex}
        collectedKg={collectedKg}
        currentStop={currentStop}
      />

      {/* BOTTOM SECTION: Budget Slider & TSP Sequence Breakdown */}
      <div className="grid-cols-3" style={{ gap: '2rem' }}>
        <FleetTelemetryCards
          budgetBdt={budgetBdt}
          setBudgetBdt={setBudgetBdt}
          allocatedTrucks={allocatedTrucks}
          totalDistanceKm={totalDistanceKm}
          fuelLiters={fuelLiters}
          co2SavedKg={co2SavedKg}
          setCurrentProgress={setCurrentProgress}
          setActiveStopIndex={setActiveStopIndex}
          setIsSimulating={setIsSimulating}
        />
        <StopsTable
          stops={stops}
          activeStopIndex={activeStopIndex}
          estimatedCost={estimatedCost}
        />
      </div>
    </div>
  );
};

export default RouteOptimizerPage;
