export interface SimulationControlState {
  isSimulationActive: boolean;
  simulationSpeed: number; // 1x, 2x, 5x
  activeScenario: 'NORMAL_PATROL' | 'AIRSPACE_INTRUSION' | 'CYCLONE_EVACUATION' | 'BORDER_ALERT';
  dataFeedStatus: 'LIVE_LINK_SYNCED' | 'SIMULATION_SYNTHETIC';
  radarSweepActive: boolean;
  telemetryStreamRateHz: number;
}

export const DEFAULT_SIMULATION_STATE: SimulationControlState = {
  isSimulationActive: false,
  simulationSpeed: 1,
  activeScenario: 'NORMAL_PATROL',
  dataFeedStatus: 'LIVE_LINK_SYNCED',
  radarSweepActive: true,
  telemetryStreamRateHz: 1
};

export const SIMULATION_SCENARIOS = [
  {
    id: 'NORMAL_PATROL',
    name: 'Standard Border & Maritime Readiness',
    description: 'Routine continuous patrol sweep across all Army, Navy, and Air Force command sectors.',
    threatLevel: 'DEFCON 4 / LOW'
  },
  {
    id: 'AIRSPACE_INTRUSION',
    name: 'Tactical Airspace Intrusion Drill',
    description: 'Simulates non-responsive high-altitude track detection and automatic vector intercept escalation.',
    threatLevel: 'DEFCON 2 / HIGH'
  },
  {
    id: 'CYCLONE_EVACUATION',
    name: 'Bay of Bengal Extreme Weather Response',
    description: 'Simulates humanitarian disaster relief coordination with naval taskforce deployment.',
    threatLevel: 'SEVERE WEATHER / PRIORITY'
  },
  {
    id: 'BORDER_ALERT',
    name: 'High-Altitude Frontier Ground Sensor Tripping',
    description: 'Simulates thermal/acoustic perimeter sensor alarms along Northern Sector ridgelines.',
    threatLevel: 'DEFCON 3 / ELEVATED'
  }
];
