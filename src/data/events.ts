import { DecisionSupportItem, PersonnelTelemetry, AuditLogEntry, EnvironmentalMetric } from '../types';

export const DECISION_SUPPORT_ITEMS: DecisionSupportItem[] = [
  {
    id: 'xai-001',
    eventId: 'alt-001',
    title: 'XAI Assessment: Airspace Anomaly Intercept Matrix',
    evidence: [
      'Primary Radar Return cross-section matches medium UAV / High-speed reconnaissance airframe (0.05m² RCS).',
      'Non-squawking Mode-S transponder across corridor FL380 -> FL240 descending profile.',
      'Vector trajectory correlates with historical surveillance patterns along Western air frontier.',
      'Ambala Sector Arudhra Radar tracking continuity at 99.4% confidence.'
    ],
    confidence: 96.4,
    contributingFactors: [
      { factor: 'Radar Cross Section Analysis', weight: 38, description: 'Matched signature of high-altitude tactical drone' },
      { factor: 'Descent Rate & Trajectory Anomaly', weight: 32, description: 'Unplanned 2,800 fpm descent without ATC flight plan' },
      { factor: 'Transponder Absence', weight: 20, description: 'Complete transponder blackout during airspace transit' },
      { factor: 'Geographic Buffer Zone Proximity', weight: 10, description: 'Within 18km of restricted military airspace corridor' }
    ],
    recommendedResponse: 'Scramble 2x Su-30MKI / Rafale alert pair from Ambala AFS for visual identification and electronic escort, while putting regional Akash air defense batteries on cold standby.',
    alternativeOptions: [
      'Option B: Passive electronic surveillance tracking via ground COMINT and NavIC satellite correlation only.',
      'Option C: Direct ground-to-air broadcast warning on Guard Frequency 121.5 MHz / 243.0 MHz.'
    ],
    humanReviewStatus: 'PENDING_OFFICER_REVIEW',
    tacticalImpact: 'STRATEGIC'
  },
  {
    id: 'xai-002',
    eventId: 'alt-002',
    title: 'XAI Assessment: Maritime Drift Pattern Correlation',
    evidence: [
      'Automatic Identification System (AIS) intermittent signal interruption exceeding 45 minutes.',
      'Acoustic passive sonar signature confirms auxiliary generator running while stationary.',
      'Satellite SAR imagery reveals deck crane activity over international seabed cable junction.'
    ],
    confidence: 91.2,
    contributingFactors: [
      { factor: 'Subsea Infrastructure Proximity', weight: 45, description: 'Positioned within 1.2 nautical miles of India-Europe submarine cable line' },
      { factor: 'AIS Spoofing / Blackout History', weight: 30, description: 'Vessel flagged in international maritime safety database for dark voyages' },
      { factor: 'Unusual Hydrographic Depth Profile', weight: 25, description: 'Stationary drifting in non-anchorage deep trench (1,800m depth)' }
    ],
    recommendedResponse: 'Dispatch Coast Guard Offshore Patrol Vessel (OPV) with Chetak helicopter reconnaissance sweep to conduct boarding inspection and hail vessel under maritime EEZ protocol.',
    alternativeOptions: [
      'Option B: Direct Maritime Patrol Aircraft (P-8I Neptune) low-altitude flyover for optical photo-reconnaissance.',
      'Option C: Continuous naval satellite radar surveillance tracking without physical intercept.'
    ],
    humanReviewStatus: 'CONFIRMED',
    reviewedBy: 'Capt. Ananya S. Nambiar (IN-8P31XZ)',
    reviewTimestamp: '2026-08-21T21:10:00Z',
    tacticalImpact: 'TACTICAL'
  }
];

export const INITIAL_PERSONNEL_TELEMETRY: PersonnelTelemetry[] = [
  {
    id: 'tel-001',
    personnelId: 'IC-7K42P9',
    name: 'Brig. Vikramaditya Rawat',
    rank: 'Brigadier',
    service: 'Indian Army',
    sector: 'Northern Command — Udhampur',
    assignedLocation: 'Northern Command HQ',
    coordinates: [32.9282, 75.1416],
    heartRate: 72,
    spO2: 99,
    bodyTemp: 36.6,
    readinessIndex: 98,
    lastUpdate: '10s ago',
    status: 'OPERATIONAL',
    isSimulation: false
  },
  {
    id: 'tel-002',
    personnelId: 'IN-8P31XZ',
    name: 'Capt. Ananya S. Nambiar',
    rank: 'Captain',
    service: 'Indian Navy',
    sector: 'Eastern Naval Command',
    assignedLocation: 'Visakhapatnam Dockyard',
    coordinates: [17.6868, 83.2185],
    heartRate: 74,
    spO2: 98,
    bodyTemp: 36.7,
    readinessIndex: 96,
    lastUpdate: '18s ago',
    status: 'OPERATIONAL',
    isSimulation: false
  },
  {
    id: 'tel-003',
    personnelId: 'IAF-92LX5C',
    name: 'Gp Capt. Devraj S. Rathore',
    rank: 'Group Captain',
    service: 'Indian Air Force',
    sector: 'Western Air Command',
    assignedLocation: 'Ambala AFS',
    coordinates: [30.3685, 76.8173],
    heartRate: 78,
    spO2: 99,
    bodyTemp: 36.8,
    readinessIndex: 99,
    lastUpdate: '5s ago',
    status: 'OPERATIONAL',
    isSimulation: false
  },
  {
    id: 'tel-004',
    personnelId: 'IC-4M82Q1',
    name: 'Maj. Rohit S. Tanwar (Sim Unit 1)',
    rank: 'Major',
    service: 'Indian Army',
    sector: 'Siachen Sector Outpost',
    assignedLocation: 'Siachen Base Camp',
    coordinates: [35.4212, 77.1089],
    heartRate: 88,
    spO2: 94,
    bodyTemp: 36.4,
    readinessIndex: 92,
    lastUpdate: '30s ago',
    status: 'ELEVATED',
    isSimulation: true
  },
  {
    id: 'tel-005',
    personnelId: 'IAF-61QW8N',
    name: 'Sqn Ldr. K. Raghavan (Sim Unit 2)',
    rank: 'Squadron Leader',
    service: 'Indian Air Force',
    sector: 'Tezpur Air Defense Node',
    assignedLocation: 'Tezpur AFS',
    coordinates: [26.7090, 92.7844],
    heartRate: 71,
    spO2: 98,
    bodyTemp: 36.5,
    readinessIndex: 95,
    lastUpdate: '45s ago',
    status: 'OPERATIONAL',
    isSimulation: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-001',
    timestamp: '2026-08-21T22:11:30Z',
    officerId: 'SYSTEM',
    officerName: 'VAJRA Security Daemon',
    rank: 'Autonomous Sentinel',
    service: 'Indian Army',
    action: 'INTEGRITY_HEARTBEAT_VERIFY',
    category: 'AUTHENTICATION',
    details: 'Quantum-resistant cryptographic state validation succeeded. 11/11 geospatial nodes synchronized.',
    ipAddress: '10.240.0.1 (Vajra Core Mesh)',
    tamperHash: '0e39b9802cf00139b4b9b9a712e09fa8b61c56a81e91238dfa0029b9',
    previousHash: '00000000000000000000000000000000000000000000000000000000',
    status: 'VERIFIED_IMMUTABLE'
  },
  {
    id: 'aud-002',
    timestamp: '2026-08-21T21:45:10Z',
    officerId: 'IAF-92LX5C',
    officerName: 'Devraj S. Rathore',
    rank: 'Group Captain',
    service: 'Indian Air Force',
    action: 'RADAR_ARRAY_SWEEP_EXPAND',
    category: 'SURVEILLANCE_SWEEP',
    details: 'Extended primary Arudhra radar scan azimuth to 360-deg sector coverage at 420km range.',
    ipAddress: '10.240.18.44 (Ambala Terminal 02)',
    tamperHash: 'a718b29c91f0049102cba89104b68912efac7193910cbe912803ba91',
    previousHash: '0e39b9802cf00139b4b9b9a712e09fa8b61c56a81e91238dfa0029b9',
    status: 'VERIFIED_IMMUTABLE'
  },
  {
    id: 'aud-003',
    timestamp: '2026-08-21T21:10:00Z',
    officerId: 'IN-8P31XZ',
    officerName: 'Ananya S. Nambiar',
    rank: 'Captain',
    service: 'Indian Navy',
    action: 'XAI_DIRECTIVE_CONFIRMED',
    category: 'XAI_DECISION',
    details: 'Signed off on OPV intercept protocol for anomalous AIS vessel cluster in Arabian Sea sector.',
    ipAddress: '10.240.24.12 (Vizag Maritime Bridge)',
    tamperHash: 'c491823901bcefa8102394182903bda8293041920391029384910239',
    previousHash: 'a718b29c91f0049102cba89104b68912efac7193910cbe912803ba91',
    status: 'VERIFIED_IMMUTABLE'
  },
  {
    id: 'aud-004',
    timestamp: '2026-08-21T19:40:00Z',
    officerId: 'IC-7K42P9',
    officerName: 'Vikramaditya Rawat',
    rank: 'Brigadier',
    service: 'Indian Army',
    action: 'MFA_AUTH_SUCCESS',
    category: 'AUTHENTICATION',
    details: 'Multi-factor authentication granted (Credentials, PIN, Iris 98.4%, 3D Face 99.1%, Voice 94.5%).',
    ipAddress: '10.240.11.08 (Udhampur Secure Suite)',
    tamperHash: 'f8192304910293840192830491820394810293840192830491820394',
    previousHash: 'c491823901bcefa8102394182903bda8293041920391029384910239',
    status: 'VERIFIED_IMMUTABLE'
  }
];

export const ENVIRONMENTAL_METRICS: EnvironmentalMetric[] = [
  {
    sector: 'Northern Himalayan Corridor',
    coordinates: [34.1526, 77.5771],
    temperature: -14.2,
    windSpeed: 48,
    windDirection: 'NNW',
    barometricPressure: 640,
    visibilityKm: 4.5,
    weatherCondition: 'High-Altitude Snow',
    radarReflectivity: 32
  },
  {
    sector: 'Western Thar Desert',
    coordinates: [26.2583, 73.0489],
    temperature: 38.5,
    windSpeed: 22,
    windDirection: 'WSW',
    barometricPressure: 1004,
    visibilityKm: 8.0,
    weatherCondition: 'Dust Storm',
    radarReflectivity: 18
  },
  {
    sector: 'Arabian Sea Maritime',
    coordinates: [18.9220, 72.8347],
    temperature: 29.1,
    windSpeed: 31,
    windDirection: 'SW',
    barometricPressure: 1008,
    visibilityKm: 14.0,
    weatherCondition: 'Clear',
    radarReflectivity: 12
  },
  {
    sector: 'Bay of Bengal Deep Depression',
    coordinates: [14.2189, 86.4190],
    temperature: 27.8,
    windSpeed: 75,
    windDirection: 'NE',
    barometricPressure: 988,
    visibilityKm: 3.2,
    weatherCondition: 'Monsoon Rain',
    radarReflectivity: 54
  }
];
