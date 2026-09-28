import { 
  CctvCamera, 
  CctvRecordingClip, 
  HumanDetectionItem, 
  VehicleAnalyticsItem, 
  FaceDetectionItem, 
  AnprMatchItem, 
  VirtualFenceItem, 
  SuspiciousActivityItem, 
  NightMovementItem, 
  SurveillanceAlert, 
  SurveillanceEventLog, 
  EdgeNodeHealth 
} from '../types/surveillance';

export const SURVEILLANCE_RECORDINGS: CctvRecordingClip[] = [
  {
    id: 'REC-01-1830',
    cameraId: 'C-01',
    cameraName: 'CAMERA 01 - NORTH PERIMETER',
    timeRange: '18:30:00 – 18:45:00',
    date: '27 SEP 2026',
    duration: '15m 00s',
    videoSrc: '/surveillance/rec_camera01_1830.mp4',
    eventsCount: 3,
    tags: ['Perimeter Patrol', 'Vehicle Transit', 'Movement Track']
  },
  {
    id: 'REC-02-1915',
    cameraId: 'C-02',
    cameraName: 'CAMERA 02 - GATE BRAVO CHECKPOINT',
    timeRange: '19:15:00 – 19:30:00',
    date: '27 SEP 2026',
    duration: '15m 00s',
    videoSrc: '/surveillance/rec_camera02_1915.mp4',
    eventsCount: 5,
    tags: ['ANPR Match', 'Checkpoint Search', 'Plate JK-02']
  },
  {
    id: 'REC-03-2200',
    cameraId: 'C-03',
    cameraName: 'CAMERA 03 - FORWARD POST THERMAL',
    timeRange: '22:00:00 – 22:15:00',
    date: '27 SEP 2026',
    duration: '15m 00s',
    videoSrc: '/surveillance/rec_camera03_2200.mp4',
    eventsCount: 2,
    tags: ['Thermal Signature', 'Night Movement', 'Human P-102']
  },
  {
    id: 'REC-04-0230',
    cameraId: 'C-04',
    cameraName: 'CAMERA 04 - DEPOT PERIMETER FENCE',
    timeRange: '02:30:00 – 02:45:00',
    date: '27 SEP 2026',
    duration: '15m 00s',
    videoSrc: '/surveillance/rec_camera04_0230.mp4',
    eventsCount: 4,
    tags: ['Tripwire Tripped', 'Fence Breach', 'Critical Alert']
  }
];

export const SURVEILLANCE_CAMERAS: CctvCamera[] = [
  {
    id: 'C-01',
    name: 'CAMERA 01',
    location: 'Perimeter North Road - Sector 4',
    status: 'ONLINE',
    recordingStatus: 'RECORDING',
    videoSrc: '/surveillance/camera01.mp4',
    resolution: '1920x1080 @ 25 FPS',
    edgeNodeId: 'EDGE-NODE-01',
    fieldOfView: '115° Optical Long Range',
    activeDetectionsCount: 4,
    recordings: [SURVEILLANCE_RECORDINGS[0]]
  },
  {
    id: 'C-02',
    name: 'CAMERA 02',
    location: 'Gate Bravo Vehicle Checkpoint',
    status: 'ONLINE',
    recordingStatus: 'RECORDING',
    videoSrc: '/surveillance/camera02.mp4',
    resolution: '1920x1080 @ 25 FPS',
    edgeNodeId: 'EDGE-NODE-02',
    fieldOfView: '90° High-Res ANPR Focus',
    activeDetectionsCount: 3,
    recordings: [SURVEILLANCE_RECORDINGS[1]]
  },
  {
    id: 'C-03',
    name: 'CAMERA 03',
    location: 'Forward Outpost Ridge - Thermal IR',
    status: 'ONLINE',
    recordingStatus: 'RECORDING',
    videoSrc: '/surveillance/camera03.mp4',
    resolution: '1280x720 Thermal FLIR @ 30 FPS',
    edgeNodeId: 'EDGE-NODE-01',
    fieldOfView: '85° LWIR Uncooled 640x512 Sensor',
    activeDetectionsCount: 2,
    recordings: [SURVEILLANCE_RECORDINGS[2]]
  },
  {
    id: 'C-04',
    name: 'CAMERA 04',
    location: 'Ammunition Depot Virtual Fence',
    status: 'ONLINE',
    recordingStatus: 'RECORDING',
    videoSrc: '/surveillance/camera04.mp4',
    resolution: '1920x1080 @ 25 FPS',
    edgeNodeId: 'EDGE-NODE-03',
    fieldOfView: '120° Wide Perimeter Tripwire',
    activeDetectionsCount: 5,
    recordings: [SURVEILLANCE_RECORDINGS[3]]
  },
  // Additional cameras to fulfill "24 Online"
  ...Array.from({ length: 20 }).map((_, idx) => ({
    id: `C-${String(idx + 5).padStart(2, '0')}`,
    name: `CAMERA ${String(idx + 5).padStart(2, '0')}`,
    location: [
      'Eastern Wire Boundary',
      'Watchtower Charlie 3',
      'South Access Road Corridor',
      'Helipad Approach Zone',
      'Fuel Storage Perimeter',
      'Tactical Comms Mast',
      'River Crossing Point Bravo',
      'Underground Bunker Intake',
      'Sector 7 High Ridge',
      'Western Valley Sentry Post'
    ][idx % 10],
    status: 'ONLINE' as const,
    recordingStatus: 'RECORDING' as const,
    videoSrc: idx % 2 === 0 ? '/surveillance/camera01.mp4' : '/surveillance/camera02.mp4',
    resolution: '1920x1080 @ 25 FPS',
    edgeNodeId: `EDGE-NODE-0${(idx % 3) + 1}`,
    fieldOfView: '100° PTZ HD Optical',
    activeDetectionsCount: (idx % 4) + 1,
    recordings: []
  }))
];

export const HUMAN_DETECTIONS: HumanDetectionItem[] = [
  {
    id: 'HUM-01',
    objectId: 'PERSON P-102',
    cameraId: 'C-01',
    cameraName: 'CAMERA 01 (North Perimeter)',
    timestamp: '18:42:10',
    confidence: 96,
    status: 'TRACKING',
    zone: 'Perimeter Fence Line Sector 4',
    dwellTimeSeconds: 142,
    isSimulation: true
  },
  {
    id: 'HUM-02',
    objectId: 'PERSON P-104',
    cameraId: 'C-03',
    cameraName: 'CAMERA 03 (Forward Post Thermal)',
    timestamp: '18:43:05',
    confidence: 94,
    status: 'TRACKING',
    zone: 'Ridge Line Approach Path',
    dwellTimeSeconds: 88,
    isSimulation: true
  },
  {
    id: 'HUM-03',
    objectId: 'PERSON P-105',
    cameraId: 'C-04',
    cameraName: 'CAMERA 04 (Depot Virtual Fence)',
    timestamp: '18:44:22',
    confidence: 91,
    status: 'TRACKING',
    zone: 'Restricted Storage Bay 3',
    dwellTimeSeconds: 210,
    isSimulation: true
  },
  {
    id: 'HUM-04',
    objectId: 'PERSON P-106',
    cameraId: 'C-02',
    cameraName: 'CAMERA 02 (Gate Checkpoint)',
    timestamp: '18:44:50',
    confidence: 98,
    status: 'TRACKING',
    zone: 'Pedestrian Verification Lane',
    dwellTimeSeconds: 45,
    isSimulation: true
  },
  {
    id: 'HUM-05',
    objectId: 'PERSON P-108',
    cameraId: 'C-01',
    cameraName: 'CAMERA 01 (North Perimeter)',
    timestamp: '18:45:00',
    confidence: 89,
    status: 'TRACKING',
    zone: 'Tree Line Shadow Zone',
    dwellTimeSeconds: 65,
    isSimulation: true
  },
  {
    id: 'HUM-06',
    objectId: 'PERSON P-110',
    cameraId: 'C-04',
    cameraName: 'CAMERA 04 (Depot Virtual Fence)',
    timestamp: '18:45:12',
    confidence: 93,
    status: 'TRACKING',
    zone: 'Secondary Barrier Gate',
    dwellTimeSeconds: 110,
    isSimulation: true
  },
  {
    id: 'HUM-07',
    objectId: 'PERSON P-111',
    cameraId: 'C-05',
    cameraName: 'CAMERA 05 (Eastern Wire)',
    timestamp: '18:45:18',
    confidence: 95,
    status: 'TRACKING',
    zone: 'Sector E Outpost Access',
    dwellTimeSeconds: 52,
    isSimulation: true
  },
  {
    id: 'HUM-08',
    objectId: 'PERSON P-112',
    cameraId: 'C-06',
    cameraName: 'CAMERA 06 (Watchtower Charlie)',
    timestamp: '18:45:30',
    confidence: 92,
    status: 'TRACKING',
    zone: 'Perimeter Observation Berm',
    dwellTimeSeconds: 340,
    isSimulation: true
  },
  {
    id: 'HUM-09',
    objectId: 'PERSON P-115',
    cameraId: 'C-07',
    cameraName: 'CAMERA 07 (South Access)',
    timestamp: '18:45:45',
    confidence: 88,
    status: 'TRACKING',
    zone: 'Concealed Culvert Area',
    dwellTimeSeconds: 74,
    isSimulation: true
  },
  {
    id: 'HUM-10',
    objectId: 'PERSON P-118',
    cameraId: 'C-08',
    cameraName: 'CAMERA 08 (Helipad Zone)',
    timestamp: '18:46:01',
    confidence: 97,
    status: 'TRACKING',
    zone: 'Flight Line Perimeter',
    dwellTimeSeconds: 38,
    isSimulation: true
  },
  {
    id: 'HUM-11',
    objectId: 'PERSON P-120',
    cameraId: 'C-03',
    cameraName: 'CAMERA 03 (Forward Post Thermal)',
    timestamp: '18:46:14',
    confidence: 90,
    status: 'TRACKING',
    zone: 'Northern Scrub Gully',
    dwellTimeSeconds: 95,
    isSimulation: true
  },
  {
    id: 'HUM-12',
    objectId: 'PERSON P-121',
    cameraId: 'C-02',
    cameraName: 'CAMERA 02 (Gate Checkpoint)',
    timestamp: '18:46:25',
    confidence: 99,
    status: 'TRACKING',
    zone: 'Vehicle Inspection Pit',
    dwellTimeSeconds: 180,
    isSimulation: true
  },
  {
    id: 'HUM-13',
    objectId: 'PERSON P-123',
    cameraId: 'C-01',
    cameraName: 'CAMERA 01 (North Perimeter)',
    timestamp: '18:46:33',
    confidence: 94,
    status: 'TRACKING',
    zone: 'Border Patrol Track 2',
    dwellTimeSeconds: 58,
    isSimulation: true
  },
  {
    id: 'HUM-14',
    objectId: 'PERSON P-124',
    cameraId: 'C-09',
    cameraName: 'CAMERA 09 (Fuel Storage)',
    timestamp: '18:46:42',
    confidence: 96,
    status: 'TRACKING',
    zone: 'Hazardous Bund Perimeter',
    dwellTimeSeconds: 124,
    isSimulation: true
  },
  {
    id: 'HUM-15',
    objectId: 'PERSON P-127',
    cameraId: 'C-10',
    cameraName: 'CAMERA 10 (Comms Mast)',
    timestamp: '18:46:50',
    confidence: 91,
    status: 'TRACKING',
    zone: 'Antenna Guy Wire Sector',
    dwellTimeSeconds: 165,
    isSimulation: true
  },
  {
    id: 'HUM-16',
    objectId: 'PERSON P-129',
    cameraId: 'C-04',
    cameraName: 'CAMERA 04 (Depot Virtual Fence)',
    timestamp: '18:47:02',
    confidence: 93,
    status: 'TRACKING',
    zone: 'Perimeter Sensor Wire B',
    dwellTimeSeconds: 83,
    isSimulation: true
  },
  {
    id: 'HUM-17',
    objectId: 'PERSON P-130',
    cameraId: 'C-03',
    cameraName: 'CAMERA 03 (Forward Post Thermal)',
    timestamp: '18:47:11',
    confidence: 95,
    status: 'TRACKING',
    zone: 'Scattered Boulders Sector 4',
    dwellTimeSeconds: 190,
    isSimulation: true
  }
];

export const VEHICLE_ANALYTICS: VehicleAnalyticsItem[] = [
  {
    id: 'VEH-01',
    vehicleId: 'VEH-782',
    cameraId: 'C-02',
    cameraName: 'CAMERA 02 (Gate Bravo)',
    timestamp: '18:44:10',
    confidence: 98,
    category: 'Truck',
    licensePlate: 'JK-02-AB-9921',
    speedKmh: 18,
    isSimulation: true
  },
  {
    id: 'VEH-02',
    vehicleId: 'VEH-784',
    cameraId: 'C-02',
    cameraName: 'CAMERA 02 (Gate Bravo)',
    timestamp: '18:44:35',
    confidence: 97,
    category: 'Car',
    licensePlate: 'PB-08-CR-4412',
    speedKmh: 24,
    isSimulation: true
  },
  {
    id: 'VEH-03',
    vehicleId: 'VEH-789',
    cameraId: 'C-01',
    cameraName: 'CAMERA 01 (North Perimeter)',
    timestamp: '18:45:00',
    confidence: 95,
    category: 'Car',
    licensePlate: 'HR-26-DQ-1109',
    speedKmh: 42,
    isSimulation: true
  },
  {
    id: 'VEH-04',
    vehicleId: 'VEH-790',
    cameraId: 'C-07',
    cameraName: 'CAMERA 07 (South Access)',
    timestamp: '18:45:22',
    confidence: 92,
    category: 'Bus',
    licensePlate: 'DL-1C-AA-0921',
    speedKmh: 31,
    isSimulation: true
  },
  {
    id: 'VEH-05',
    vehicleId: 'VEH-793',
    cameraId: 'C-02',
    cameraName: 'CAMERA 02 (Gate Bravo)',
    timestamp: '18:45:48',
    confidence: 96,
    category: 'Motorcycle',
    licensePlate: 'UP-14-BZ-5502',
    speedKmh: 28,
    isSimulation: true
  },
  {
    id: 'VEH-06',
    vehicleId: 'VEH-795',
    cameraId: 'C-01',
    cameraName: 'CAMERA 01 (North Perimeter)',
    timestamp: '18:46:15',
    confidence: 87,
    category: 'Truck',
    licensePlate: 'MH-12-TX-3381',
    speedKmh: 35,
    isSimulation: true
  },
  {
    id: 'VEH-07',
    vehicleId: 'VEH-798',
    cameraId: 'C-03',
    cameraName: 'CAMERA 03 (Thermal Ridge)',
    timestamp: '18:46:50',
    confidence: 84,
    category: 'Unknown',
    licensePlate: 'UNVERIFIED',
    speedKmh: 12,
    isSimulation: true
  },
  {
    id: 'VEH-08',
    vehicleId: 'VEH-801',
    cameraId: 'C-02',
    cameraName: 'CAMERA 02 (Gate Bravo)',
    timestamp: '18:47:05',
    confidence: 99,
    category: 'Car',
    licensePlate: 'KA-04-MB-7714',
    speedKmh: 15,
    isSimulation: true
  }
];

export const ANPR_MATCHES: AnprMatchItem[] = [
  {
    id: 'ANPR-01',
    plate: 'JK-02-AB-9921',
    vehicleType: 'Heavy Commercial Truck',
    camera: 'C-02 (Gate Bravo)',
    timestamp: '18:44:10',
    confidence: 98,
    watchlistStatus: 'WATCHLIST_MATCH',
    notes: 'FLAGGED: Intelligence Watchlist Sector 4 (Unauthorized Cargo Manifest)'
  },
  {
    id: 'ANPR-02',
    plate: 'PB-08-CR-4412',
    vehicleType: 'Armored Patrol SUV',
    camera: 'C-02 (Gate Bravo)',
    timestamp: '18:44:35',
    confidence: 97,
    watchlistStatus: 'CLEARED',
    notes: 'Authorized Garrison Escort Vehicle'
  },
  {
    id: 'ANPR-03',
    plate: 'HR-26-DQ-1109',
    vehicleType: 'Sedan (Civilian)',
    camera: 'C-01 (North Perimeter)',
    timestamp: '18:45:00',
    confidence: 95,
    watchlistStatus: 'FLAGGED_ALERT',
    notes: 'Civilian Vehicle in Prohibited Military Buffer Corridor'
  },
  {
    id: 'ANPR-04',
    plate: 'DL-1C-AA-0921',
    vehicleType: 'Troop Transit Bus',
    camera: 'C-07 (South Access)',
    timestamp: '18:45:22',
    confidence: 92,
    watchlistStatus: 'CLEARED',
    notes: 'Relief Garrison Personnel Shift Transit'
  },
  {
    id: 'ANPR-05',
    plate: 'UP-14-BZ-5502',
    vehicleType: 'Courier Motorcycle',
    camera: 'C-02 (Gate Bravo)',
    timestamp: '18:45:48',
    confidence: 96,
    watchlistStatus: 'FLAGGED_ALERT',
    notes: 'Secondary Inspection Mandated: Unscheduled Delivery Route'
  }
];

export const SURVEILLANCE_ALERTS: SurveillanceAlert[] = [
  {
    id: 'ALT-SURV-01',
    alertId: 'ALT-CRIT-9102',
    type: 'Border intrusion',
    severity: 'CRITICAL',
    camera: 'CAMERA 01 (North Perimeter)',
    timestamp: '18:42:15',
    status: 'UNRESOLVED',
    details: 'Unidentified subject crossing restricted security trench into Sector 4 buffer zone.',
    evidenceRef: '/surveillance/rec_camera01_1830.mp4'
  },
  {
    id: 'ALT-SURV-02',
    alertId: 'ALT-CRIT-9103',
    type: 'Virtual fence violation',
    severity: 'CRITICAL',
    camera: 'CAMERA 04 (Depot Virtual Fence)',
    timestamp: '18:44:22',
    status: 'UNRESOLVED',
    details: 'Electronic tripwire sensor beam broken along Ammunition Depot East boundary.',
    evidenceRef: '/surveillance/rec_camera04_0230.mp4'
  },
  {
    id: 'ALT-SURV-03',
    alertId: 'ALT-CRIT-9104',
    type: 'Suspicious movement',
    severity: 'CRITICAL',
    camera: 'CAMERA 03 (Thermal Ridge)',
    timestamp: '18:46:14',
    status: 'UNRESOLVED',
    details: 'Multiple high-signature heat targets creeping in formation through unlit defilade.',
    evidenceRef: '/surveillance/rec_camera03_2200.mp4'
  },
  {
    id: 'ALT-SURV-04',
    alertId: 'ALT-HIGH-9105',
    type: 'ANPR watchlist match',
    severity: 'HIGH',
    camera: 'CAMERA 02 (Gate Bravo)',
    timestamp: '18:44:10',
    status: 'UNRESOLVED',
    details: 'Vehicle JK-02-AB-9921 flagged on Regional Intelligence BOLO (Interdiction Order).',
    evidenceRef: '/surveillance/rec_camera02_1915.mp4'
  },
  {
    id: 'ALT-SURV-05',
    alertId: 'ALT-HIGH-9106',
    type: 'Face watchlist match',
    severity: 'HIGH',
    camera: 'CAMERA 02 (Gate Bravo Checkpoint)',
    timestamp: '18:44:48',
    status: 'ACKNOWLEDGED',
    details: 'Edge biometric facial vector matched Persons-of-Interest database (89% similarity).',
    evidenceRef: '/surveillance/rec_camera02_1915.mp4'
  },
  {
    id: 'ALT-SURV-06',
    alertId: 'ALT-HIGH-9107',
    type: 'Repeated suspicious activity',
    severity: 'HIGH',
    camera: 'CAMERA 01 (North Perimeter)',
    timestamp: '18:45:00',
    status: 'ACKNOWLEDGED',
    details: 'Same subject P-102 observed making 3 passes near sensor conduit over 45 minutes.',
    evidenceRef: '/surveillance/rec_camera01_1830.mp4'
  },
  {
    id: 'ALT-SURV-07',
    alertId: 'ALT-MED-9108',
    type: 'Night movement',
    severity: 'MEDIUM',
    camera: 'CAMERA 03 (Forward Post Thermal)',
    timestamp: '18:43:05',
    status: 'RESOLVED',
    details: 'Wildlife disturbance confirmed by thermal operator (wild boar pack crossing fence).',
    evidenceRef: '/surveillance/rec_camera03_2200.mp4'
  },
  {
    id: 'ALT-SURV-08',
    alertId: 'ALT-MED-9109',
    type: 'Abnormal activity',
    severity: 'MEDIUM',
    camera: 'CAMERA 07 (South Access)',
    timestamp: '18:45:22',
    status: 'ACKNOWLEDGED',
    details: 'Civilian bus halted outside perimeter gate with hazard indicators active.',
    evidenceRef: '/surveillance/camera02.mp4'
  }
];

export const VIRTUAL_FENCE_DATA: VirtualFenceItem[] = [
  {
    id: 'VF-01',
    areaName: 'Ammunition Depot Bravo',
    virtualBoundary: 'Perimeter Wire Fence 04 - Sector C',
    fenceStatus: 'TRIPPED',
    camera: 'CAMERA 04 (C-04)',
    intrusionEvents: [
      {
        eventId: 'EVT-VF-881',
        timestamp: '18:44:22',
        severity: 'CRITICAL',
        targetType: 'Human Intruder (Person P-105)',
        confidence: 91
      },
      {
        eventId: 'EVT-VF-879',
        timestamp: '17:15:02',
        severity: 'MEDIUM',
        targetType: 'Wind Debris Vibration Filtered',
        confidence: 65
      }
    ]
  },
  {
    id: 'VF-02',
    areaName: 'Forward Defense Line Alpha',
    virtualBoundary: 'Optical Tripwire Alpha-01',
    fenceStatus: 'ACTIVE',
    camera: 'CAMERA 01 (C-01)',
    intrusionEvents: [
      {
        eventId: 'EVT-VF-874',
        timestamp: '18:42:15',
        severity: 'CRITICAL',
        targetType: 'Trench Crossing (Person P-102)',
        confidence: 96
      }
    ]
  },
  {
    id: 'VF-03',
    areaName: 'Gate Bravo Vehicle Buffer Zone',
    virtualBoundary: 'Anti-Ram Barrier Line',
    fenceStatus: 'ACTIVE',
    camera: 'CAMERA 02 (C-02)',
    intrusionEvents: []
  }
];

export const SUSPICIOUS_ACTIVITIES: SuspiciousActivityItem[] = [
  {
    id: 'SUS-01',
    eventId: 'EVT-SUS-401',
    camera: 'CAMERA 01 (North Perimeter)',
    timestamp: '18:42:10',
    category: 'Loitering',
    confidence: 92,
    severity: 'CRITICAL',
    status: 'ACTIVE',
    description: 'Subject lingering adjacent to high-voltage perimeter feed conduit for over 140s.'
  },
  {
    id: 'SUS-02',
    eventId: 'EVT-SUS-402',
    camera: 'CAMERA 04 (Depot Perimeter)',
    timestamp: '18:44:22',
    category: 'Restricted-area movement',
    confidence: 95,
    severity: 'CRITICAL',
    status: 'ACTIVE',
    description: 'Unauthorized foot movement inside fenced explosives holding yard.'
  },
  {
    id: 'SUS-03',
    eventId: 'EVT-SUS-403',
    camera: 'CAMERA 01 (North Perimeter)',
    timestamp: '18:45:00',
    category: 'Repeated movement',
    confidence: 89,
    severity: 'HIGH',
    status: 'ACTIVE',
    description: 'Back-and-forth pacing along camera blind-spot boundary.'
  },
  {
    id: 'SUS-04',
    eventId: 'EVT-SUS-404',
    camera: 'CAMERA 03 (Thermal Ridge)',
    timestamp: '18:46:14',
    category: 'Multiple-person activity',
    confidence: 94,
    severity: 'CRITICAL',
    status: 'ACTIVE',
    description: 'Group of 3 heat signatures moving in disciplined staggered tactical patrol formation.'
  },
  {
    id: 'SUS-05',
    eventId: 'EVT-SUS-405',
    camera: 'CAMERA 07 (South Access)',
    timestamp: '18:45:22',
    category: 'Abnormal activity',
    confidence: 86,
    severity: 'MEDIUM',
    status: 'INVESTIGATING',
    description: 'Vehicle idling without headlights 100m outside outer barrier checkpoint.'
  }
];

export const NIGHT_MOVEMENTS: NightMovementItem[] = [
  {
    id: 'NM-01',
    camera: 'CAMERA 03 (Forward Post Thermal)',
    timestamp: '18:43:05',
    objectType: 'Person',
    confidence: 94,
    thermalIntensity: 'High Delta-T (36.8°C vs 8.2°C ambient)',
    alertStatus: 'CRITICAL'
  },
  {
    id: 'NM-02',
    camera: 'CAMERA 03 (Forward Post Thermal)',
    timestamp: '18:46:14',
    objectType: 'Person',
    confidence: 90,
    thermalIntensity: 'Shielded Thermal Signature (Camo poncho)',
    alertStatus: 'CRITICAL'
  },
  {
    id: 'NM-03',
    camera: 'CAMERA 03 (Forward Post Thermal)',
    timestamp: '18:46:50',
    objectType: 'Convoy Vehicle',
    confidence: 84,
    thermalIntensity: 'Engine Exhaust Heat Plume (145°C)',
    alertStatus: 'MONITORING'
  },
  {
    id: 'NM-04',
    camera: 'CAMERA 01 (North Perimeter IR)',
    timestamp: '18:45:00',
    objectType: 'Person',
    confidence: 89,
    thermalIntensity: 'Near-IR Active Illuminator Reflected',
    alertStatus: 'CRITICAL'
  }
];

export const FACE_DETECTIONS: FaceDetectionItem[] = [
  {
    id: 'FACE-01',
    cameraId: 'C-02',
    cameraName: 'CAMERA 02 (Gate Bravo)',
    timestamp: '18:44:48',
    detectionCount: 1,
    recognitionStatus: 'IDENTIFIED_WATCHLIST',
    personTag: 'POI-BOLO-4892 (Identity Flagged)',
    confidence: 89,
    isSimulation: true
  },
  {
    id: 'FACE-02',
    cameraId: 'C-02',
    cameraName: 'CAMERA 02 (Gate Bravo)',
    timestamp: '18:44:12',
    detectionCount: 1,
    recognitionStatus: 'UNRECOGNIZED_PERSON',
    personTag: 'Commercial Driver (Manifest Verified)',
    confidence: 97,
    isSimulation: true
  },
  {
    id: 'FACE-03',
    cameraId: 'C-04',
    cameraName: 'CAMERA 04 (Depot Gate)',
    timestamp: '18:45:10',
    detectionCount: 2,
    recognitionStatus: 'PROCESSING_EDGE',
    personTag: 'On-duty Security Escort',
    confidence: 94,
    isSimulation: true
  }
];

export const EVENT_LOGS: SurveillanceEventLog[] = [
  {
    id: 'LOG-01',
    eventId: 'EVT-2026-0927-001',
    cameraId: 'C-01',
    edgeNodeId: 'EDGE-NODE-01',
    timestamp: '18:42:15',
    eventType: 'Human Detection & Perimeter Breach',
    confidenceScore: 96,
    objectId: 'PERSON P-102',
    location: 'Perimeter North - Sector 4',
    evidenceReference: '/surveillance/rec_camera01_1830.mp4',
    syncStatus: 'SYNCED'
  },
  {
    id: 'LOG-02',
    eventId: 'EVT-2026-0927-002',
    cameraId: 'C-02',
    edgeNodeId: 'EDGE-NODE-02',
    timestamp: '18:44:10',
    eventType: 'ANPR Watchlist Trigger',
    confidenceScore: 98,
    objectId: 'VEH-782 [JK-02-AB-9921]',
    location: 'Gate Bravo Vehicle Checkpoint',
    evidenceReference: '/surveillance/rec_camera02_1915.mp4',
    syncStatus: 'SYNCED'
  },
  {
    id: 'LOG-03',
    eventId: 'EVT-2026-0927-003',
    cameraId: 'C-04',
    edgeNodeId: 'EDGE-NODE-03',
    timestamp: '18:44:22',
    eventType: 'Virtual Fence Tripwire Intrusion',
    confidenceScore: 91,
    objectId: 'PERSON P-105',
    location: 'Ammunition Depot East Barrier',
    evidenceReference: '/surveillance/rec_camera04_0230.mp4',
    syncStatus: 'PENDING'
  },
  {
    id: 'LOG-04',
    eventId: 'EVT-2026-0927-004',
    cameraId: 'C-03',
    edgeNodeId: 'EDGE-NODE-01',
    timestamp: '18:46:14',
    eventType: 'Night Movement & Thermal Tracking',
    confidenceScore: 90,
    objectId: 'PERSON P-120',
    location: 'Forward Post Ridge',
    evidenceReference: '/surveillance/rec_camera03_2200.mp4',
    syncStatus: 'PENDING'
  },
  {
    id: 'LOG-05',
    eventId: 'EVT-2026-0927-005',
    cameraId: 'C-01',
    edgeNodeId: 'EDGE-NODE-01',
    timestamp: '18:45:00',
    eventType: 'Suspicious Loitering Warning',
    confidenceScore: 89,
    objectId: 'PERSON P-108',
    location: 'Sector 4 Buffer Road',
    evidenceReference: '/surveillance/camera01.mp4',
    syncStatus: 'SYNCING'
  },
  {
    id: 'LOG-06',
    eventId: 'EVT-2026-0927-006',
    cameraId: 'C-02',
    edgeNodeId: 'EDGE-NODE-02',
    timestamp: '18:44:48',
    eventType: 'Facial Biometric Match',
    confidenceScore: 89,
    objectId: 'POI-BOLO-4892',
    location: 'Gate Bravo Lane 1',
    evidenceReference: '/surveillance/rec_camera02_1915.mp4',
    syncStatus: 'SYNCED'
  }
];

export const EDGE_NODES_HEALTH: EdgeNodeHealth[] = [
  {
    id: 'EDGE-NODE-01',
    name: 'Edge AI Node Alpha (Northern Ridge)',
    location: 'Sector 4 Forward Hardened Shelter',
    status: 'HEALTHY',
    fps: 25,
    latencyMs: 16.4,
    inferenceNpuMs: 7.2,
    gpuLoadPercent: 62,
    temperatureC: 42.5,
    activeCameras: 8,
    totalCameras: 8,
    storageUsedPercent: 44,
    networkLink: 'FIBER_SECURE'
  },
  {
    id: 'EDGE-NODE-02',
    name: 'Edge AI Node Bravo (Checkpoint Gateway)',
    location: 'Gate Bravo Checkpoint Server Bunker',
    status: 'HEALTHY',
    fps: 25,
    latencyMs: 14.8,
    inferenceNpuMs: 6.8,
    gpuLoadPercent: 58,
    temperatureC: 41.2,
    activeCameras: 8,
    totalCameras: 8,
    storageUsedPercent: 39,
    networkLink: 'FIBER_SECURE'
  },
  {
    id: 'EDGE-NODE-03',
    name: 'Edge AI Node Charlie (Depot Perimeter)',
    location: 'Ammunition Depot Central Tower',
    status: 'HEALTHY',
    fps: 25,
    latencyMs: 19.1,
    inferenceNpuMs: 8.4,
    gpuLoadPercent: 68,
    temperatureC: 45.0,
    activeCameras: 8,
    totalCameras: 8,
    storageUsedPercent: 52,
    networkLink: 'TACTICAL_MESH'
  }
];
