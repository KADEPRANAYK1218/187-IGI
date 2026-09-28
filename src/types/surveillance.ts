export type SurveillanceSubTab = 
  | 'OVERVIEW'
  | 'CCTV_MONITORING'
  | 'RECORDED_CCTV'
  | 'AI_DETECTION'
  | 'ALERTS'
  | 'EVENT_LOGS'
  | 'EDGE_HEALTH'
  | 'SYNC_STATUS'
  | 'PIPELINE_ARCHITECTURE';

export type AiDetectionSubCategory = 
  | 'HUMAN'
  | 'VEHICLE'
  | 'FACE'
  | 'ANPR'
  | 'VIRTUAL_FENCE'
  | 'SUSPICIOUS'
  | 'NIGHT_MOVEMENT';

export interface CctvCamera {
  id: string; // e.g. C-01
  name: string; // e.g. CAMERA 01
  location: string; // e.g. Perimeter North - Sector 4
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  recordingStatus: 'RECORDING' | 'STANDBY' | 'STOPPED';
  videoSrc: string; // e.g. /surveillance/camera01.mp4
  resolution: string; // e.g. 1920x1080 @ 25 FPS
  edgeNodeId: string; // e.g. EDGE-NODE-01
  fieldOfView: string; // e.g. 110° Wide Optical + Thermal
  activeDetectionsCount: number;
  recordings: CctvRecordingClip[];
}

export interface CctvRecordingClip {
  id: string;
  cameraId: string;
  cameraName: string;
  timeRange: string; // e.g. "18:30:00 – 18:45:00"
  date: string;
  duration: string; // e.g. "15m 00s"
  videoSrc: string;
  thumbnailPlaceholder?: string;
  eventsCount: number;
  tags: string[];
}

export interface HumanDetectionItem {
  id: string;
  objectId: string; // e.g. PERSON P-102
  cameraId: string; // e.g. C-01
  cameraName: string;
  timestamp: string;
  confidence: number; // 96
  status: 'TRACKING' | 'SEARCHING' | 'LOST';
  zone: string;
  dwellTimeSeconds: number;
  isSimulation: boolean; // clearly flagged for prototype
}

export interface VehicleAnalyticsItem {
  id: string;
  vehicleId: string; // e.g. VEH-782
  cameraId: string; // e.g. C-02
  cameraName: string;
  timestamp: string;
  confidence: number;
  category: 'Car' | 'Truck' | 'Bus' | 'Motorcycle' | 'Unknown';
  licensePlate?: string;
  speedKmh?: number;
  isSimulation: boolean;
}

export interface FaceDetectionItem {
  id: string;
  cameraId: string;
  cameraName: string;
  timestamp: string;
  detectionCount: number;
  recognitionStatus: 'IDENTIFIED_WATCHLIST' | 'UNRECOGNIZED_PERSON' | 'PROCESSING_EDGE';
  personTag?: string;
  confidence: number;
  isSimulation: boolean;
}

export interface AnprMatchItem {
  id: string;
  plate: string; // e.g. JK-02-AB-9921
  vehicleType: string; // e.g. Heavy Armored Truck / SUV
  camera: string; // e.g. C-02
  timestamp: string;
  confidence: number;
  watchlistStatus: 'WATCHLIST_MATCH' | 'FLAGGED_ALERT' | 'CLEARED';
  notes: string;
}

export interface VirtualFenceItem {
  id: string;
  areaName: string; // e.g. Ammunition Depot Bravo
  virtualBoundary: string; // e.g. Perimeter Wire Fence 04 - Sector C
  fenceStatus: 'ACTIVE' | 'TRIPPED' | 'MAINTENANCE';
  camera: string; // e.g. C-07 / C-04
  intrusionEvents: {
    eventId: string;
    timestamp: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    targetType: string;
    confidence: number;
  }[];
}

export interface SuspiciousActivityItem {
  id: string;
  eventId: string;
  camera: string;
  timestamp: string;
  category: 'Loitering' | 'Restricted-area movement' | 'Repeated movement' | 'Abnormal activity' | 'Multiple-person activity';
  confidence: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: 'ACTIVE' | 'INVESTIGATING' | 'RESOLVED';
  description: string;
}

export interface NightMovementItem {
  id: string;
  camera: string;
  timestamp: string;
  objectType: 'Person' | 'Unidentified Quadruped' | 'Convoy Vehicle' | 'Thermal Glint';
  confidence: number;
  thermalIntensity: string;
  alertStatus: 'CRITICAL' | 'MONITORING' | 'RESOLVED';
}

export interface SurveillanceAlert {
  id: string;
  alertId: string;
  type: string; // e.g. Border intrusion, Virtual fence violation, ANPR watchlist match
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  camera: string;
  timestamp: string;
  status: 'UNRESOLVED' | 'ACKNOWLEDGED' | 'RESOLVED';
  details: string;
  evidenceRef: string;
}

export interface SurveillanceEventLog {
  id: string;
  eventId: string;
  cameraId: string;
  edgeNodeId: string;
  timestamp: string;
  eventType: string;
  confidenceScore: number;
  objectId: string;
  location: string;
  evidenceReference: string;
  syncStatus: 'PENDING' | 'SYNCING' | 'SYNCED' | 'FAILED';
}

export interface EdgeNodeHealth {
  id: string;
  name: string;
  location: string;
  status: 'HEALTHY' | 'WARNING' | 'OFFLINE';
  fps: number;
  latencyMs: number;
  inferenceNpuMs: number;
  gpuLoadPercent: number;
  temperatureC: number;
  activeCameras: number;
  totalCameras: number;
  storageUsedPercent: number;
  networkLink: 'FIBER_SECURE' | 'TACTICAL_MESH' | 'DISCONNECTED';
}
