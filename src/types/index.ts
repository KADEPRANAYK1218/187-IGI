export type ServiceType = 'Indian Army' | 'Indian Navy' | 'Indian Air Force';

export type ServicePrefix = 'IC' | 'IN' | 'IAF';

export interface RankInfo {
  id: string;
  name: string;
  service: ServiceType;
  level: number;
  abbreviation: string;
}

export interface UserRole {
  id: string;
  title: string;
  clearanceLevel: 'SECRET' | 'TOP_SECRET' | 'COSMIC_TOP_SECRET' | 'RESTRICTED';
  permissions: string[];
  description: string;
}

export interface UserAccount {
  id: string;
  serviceId: string; // e.g. IC-7K42P9
  fullName: string;
  name?: string;
  email?: string;
  phone?: string;
  service: ServiceType;
  rank: string;
  roleId: string;
  roleTitle: string;
  passwordHash: string; // synthetic hash
  securityPin: string; // 6 digits
  biometricConsent: boolean;
  clearanceLevel: string;
  sector: string;
  registeredAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface AuthFactorStatus {
  serviceId: boolean;
  service: boolean;
  rank: boolean;
  password: boolean;
  pin: boolean;
  biometricConsent: boolean;
  iris: boolean;
  face: boolean;
  voice: boolean;
  permissions: boolean;
}

export interface AuthSession {
  user: UserAccount | null;
  isAuthenticated: boolean;
  token: string | null;
  loginTime: string | null;
  authFactors: AuthFactorStatus;
  simulationMode: boolean;
}

export interface GeoLocationItem {
  id: string;
  name: string;
  category: 'Strategic Command' | 'Air Base' | 'Naval Dockyard' | 'Forward Outpost' | 'Radar Station' | 'Metropolitan Hub' | 'Border Sector';
  coordinates: [number, number]; // [lat, lng]
  elevation: number; // meters
  mgrs: string;
  state: string;
  status: 'ACTIVE' | 'HIGH_ALERT' | 'STANDBY' | 'MAINTENANCE';
  readinessScore: number; // 0 - 100
  personnelCount: number;
  description: string;
}

export interface PersonnelTelemetry {
  id: string;
  personnelId: string; // synthetic
  name: string;
  rank: string;
  service: ServiceType;
  sector: string;
  assignedLocation: string;
  coordinates: [number, number];
  heartRate: number; // bpm
  spO2: number; // %
  bodyTemp: number; // °C
  readinessIndex: number; // %
  lastUpdate: string;
  status: 'OPERATIONAL' | 'STANDBY' | 'ELEVATED' | 'OFFLINE';
  isSimulation: boolean;
}

export interface SensorData {
  id: string;
  name: string;
  type: 'RADAR_PRIMARY' | 'COASTAL_SURVEILLANCE' | 'SATELLITE_LINK' | 'SEISMIC_ACOUSTIC' | 'DRONE_FEED' | 'CCTV_OPTICAL';
  locationName: string;
  coordinates: [number, number];
  status: 'ONLINE' | 'ACTIVE_SWEEP' | 'CALIBRATING' | 'WARNING';
  coverageRadiusKm: number;
  signalStrength: number; // 0 - 100%
  lastPing: string;
  dataThroughputMbps: number;
}

export interface TacticalAlert {
  id: string;
  title: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  category: 'AIRSPACE' | 'MARITIME' | 'BORDER' | 'CYBER' | 'METEOROLOGICAL' | 'SYSTEM';
  timestamp: string;
  locationName: string;
  coordinates: [number, number];
  status: 'ACTIVE' | 'INVESTIGATING' | 'MITIGATED' | 'RESOLVED';
  summary: string;
  confidence: number;
  requiresReview: boolean;
}

export interface DecisionSupportItem {
  id: string;
  eventId: string;
  title: string;
  evidence: string[];
  confidence: number; // 0 - 100%
  contributingFactors: {
    factor: string;
    weight: number;
    description: string;
  }[];
  recommendedResponse: string;
  alternativeOptions: string[];
  humanReviewStatus: 'PENDING_OFFICER_REVIEW' | 'CONFIRMED' | 'OVERRIDDEN' | 'ESCALATED';
  reviewedBy?: string;
  reviewTimestamp?: string;
  tacticalImpact: 'TACTICAL' | 'STRATEGIC' | 'ROUTINE';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  officerId: string;
  officerName: string;
  rank: string;
  service: ServiceType;
  action: string;
  category: 'AUTHENTICATION' | 'COMMAND_DIRECTIVE' | 'SURVEILLANCE_SWEEP' | 'ALERT_ACK' | 'XAI_DECISION' | 'SYSTEM_OVERRIDE';
  details: string;
  ipAddress: string;
  tamperHash: string; // Simulated SHA-256 block hash
  previousHash: string;
  status: 'VERIFIED_IMMUTABLE' | 'PENDING_VALIDATION';
}

export interface EnvironmentalMetric {
  sector: string;
  coordinates: [number, number];
  temperature: number; // °C
  windSpeed: number; // km/h
  windDirection: string;
  barometricPressure: number; // hPa
  visibilityKm: number;
  weatherCondition: 'Clear' | 'Overcast' | 'Dense Fog' | 'Monsoon Rain' | 'High-Altitude Snow' | 'Dust Storm';
  radarReflectivity: number; // dBZ
}
