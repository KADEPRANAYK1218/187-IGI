import { SensorData } from '../types';

export const SENSORS_DATA: SensorData[] = [
  {
    id: 'snr-001',
    name: 'Radar Arudhra Array — Ambala',
    type: 'RADAR_PRIMARY',
    locationName: 'Western Air Command Sector',
    coordinates: [30.3685, 76.8173],
    status: 'ACTIVE_SWEEP',
    coverageRadiusKm: 420,
    signalStrength: 98,
    lastPing: '2026-08-21T22:10:00Z',
    dataThroughputMbps: 1250
  },
  {
    id: 'snr-002',
    name: 'Coastal Radar Network — Dwarka Node',
    type: 'COASTAL_SURVEILLANCE',
    locationName: 'Gujarat Maritime Sector',
    coordinates: [22.2442, 68.9685],
    status: 'ONLINE',
    coverageRadiusKm: 280,
    signalStrength: 95,
    lastPing: '2026-08-21T22:11:00Z',
    dataThroughputMbps: 840
  },
  {
    id: 'snr-003',
    name: 'NavIC / GSAT-7A Tactical Satellite Link',
    type: 'SATELLITE_LINK',
    locationName: 'Geostationary Polar Node B',
    coordinates: [20.5937, 78.9629],
    status: 'ONLINE',
    coverageRadiusKm: 3200,
    signalStrength: 99,
    lastPing: '2026-08-21T22:11:20Z',
    dataThroughputMbps: 4800
  },
  {
    id: 'snr-004',
    name: 'Himalayan Acoustic & Seismic Grid — Leh',
    type: 'SEISMIC_ACOUSTIC',
    locationName: 'Ladakh High-Altitude Frontier',
    coordinates: [34.1526, 77.5771],
    status: 'ACTIVE_SWEEP',
    coverageRadiusKm: 180,
    signalStrength: 92,
    lastPing: '2026-08-21T22:09:45Z',
    dataThroughputMbps: 320
  },
  {
    id: 'snr-005',
    name: 'UAV Archer Recon Alpha — Rann Sector',
    type: 'DRONE_FEED',
    locationName: 'Western Border Perimeter',
    coordinates: [23.8344, 70.1245],
    status: 'ONLINE',
    coverageRadiusKm: 150,
    signalStrength: 94,
    lastPing: '2026-08-21T22:10:50Z',
    dataThroughputMbps: 650
  },
  {
    id: 'snr-006',
    name: 'Bay of Bengal Deep-Array Sonar Node 04',
    type: 'COASTAL_SURVEILLANCE',
    locationName: 'Andaman Sea Approach',
    coordinates: [10.5123, 91.8901],
    status: 'ACTIVE_SWEEP',
    coverageRadiusKm: 350,
    signalStrength: 97,
    lastPing: '2026-08-21T22:11:15Z',
    dataThroughputMbps: 920
  }
];
