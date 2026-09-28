import { TacticalAlert } from '../types';

export const TACTICAL_ALERTS: TacticalAlert[] = [
  {
    id: 'alt-001',
    title: 'Uncorrelated High-Altitude Airspace Track',
    priority: 'CRITICAL',
    category: 'AIRSPACE',
    timestamp: '2026-08-21T21:42:10Z',
    locationName: 'North-Western Corridor (Near Ambala / Punjab Border)',
    coordinates: [30.8521, 75.8214],
    status: 'ACTIVE',
    summary: 'Secondary radar sweep identified rapid-entry acoustic anomaly at FL380 without transponder beacon code.',
    confidence: 96.4,
    requiresReview: true
  },
  {
    id: 'alt-002',
    title: 'Anomalous AIS Vessel Cluster (EEZ Perimeter)',
    priority: 'HIGH',
    category: 'MARITIME',
    timestamp: '2026-08-21T20:15:30Z',
    locationName: 'Arabian Sea — 180nm West of Mumbai High',
    coordinates: [19.4512, 70.1205],
    status: 'INVESTIGATING',
    summary: 'Two unidentified bulk carriers maneuvering non-standard drift patterns near critical submarine telecom cable paths.',
    confidence: 91.2,
    requiresReview: true
  },
  {
    id: 'alt-003',
    title: 'Extreme Weather Cyclonic Formation Vector',
    priority: 'MEDIUM',
    category: 'METEOROLOGICAL',
    timestamp: '2026-08-21T18:50:00Z',
    locationName: 'Bay of Bengal Deep Depression',
    coordinates: [14.2189, 86.4190],
    status: 'ACTIVE',
    summary: 'Depression intensifies into severe cyclonic circulation; sea state 6 forecast along Odisha-Andhra coast in next 18 hours.',
    confidence: 98.8,
    requiresReview: false
  },
  {
    id: 'alt-004',
    title: 'Border Perimeter Ground Sensor Trip',
    priority: 'HIGH',
    category: 'BORDER',
    timestamp: '2026-08-21T21:05:14Z',
    locationName: 'Pir Panjal Ridgeline Outpost 14',
    coordinates: [33.6120, 74.3410],
    status: 'INVESTIGATING',
    summary: 'Simultaneous seismic and thermal trip along ravine sector; unmanned aerial reconnaissance dispatched.',
    confidence: 94.0,
    requiresReview: true
  },
  {
    id: 'alt-005',
    title: 'Tactical Sat-Com Frequency Hopping Routine',
    priority: 'INFO',
    category: 'SYSTEM',
    timestamp: '2026-08-21T22:00:00Z',
    locationName: 'GSAT-7A Unified Transponder Array',
    coordinates: [20.5937, 78.9629],
    status: 'RESOLVED',
    summary: 'Scheduled quantum-resistant encryption key exchange completed successfully across all unified theater hubs.',
    confidence: 99.9,
    requiresReview: false
  }
];
