import { UserRole } from '../types';

export const COMMAND_ROLES: UserRole[] = [
  {
    id: 'role-geospatial-commander',
    title: 'Geospatial Sector Commander',
    clearanceLevel: 'TOP_SECRET',
    permissions: [
      'GEO_READ',
      'GEO_OVERLAY_WRITE',
      'TELEMETRY_VIEW',
      'SENSOR_COMMAND',
      'ALERT_DISPATCH',
      'XAI_CONFIRM',
      'AUDIT_ACCESS'
    ],
    description: 'Full strategic visualizer access, sensor sweep oversight and tactical alert dispatch authority.'
  },
  {
    id: 'role-air-defense-controller',
    title: 'Air Defense Network Controller',
    clearanceLevel: 'TOP_SECRET',
    permissions: [
      'AIRSPACE_MONITOR',
      'RADAR_PRIMARY_CONTROL',
      'INTERCEPT_VECTOR_CALC',
      'ALERT_DISPATCH',
      'TELEMETRY_VIEW'
    ],
    description: 'Specialized in multi-node radar fusion, airspace corridor tracking, and interceptor telemetry.'
  },
  {
    id: 'role-maritime-domain-officer',
    title: 'Maritime Domain Awareness Officer',
    clearanceLevel: 'SECRET',
    permissions: [
      'COASTAL_RADAR_READ',
      'VESSEL_AIS_TRACKING',
      'MARITIME_ALERT_LOG',
      'WEATHER_OVERLAY_ACCESS'
    ],
    description: 'Naval sector surveillance, EEZ security monitoring and taskforce communications.'
  },
  {
    id: 'role-tactical-intelligence-analyst',
    title: 'Tactical Intelligence & XAI Analyst',
    clearanceLevel: 'SECRET',
    permissions: [
      'GEO_READ',
      'XAI_EVALUATION',
      'ANALYTICS_QUERY',
      'SENSOR_DIAGNOSTICS',
      'AUDIT_LOG_READ'
    ],
    description: 'Analyzes automated event correlations, validates machine-confidence evidence, and oversees decision support pipelines.'
  },
  {
    id: 'role-senior-command-general',
    title: 'Chief Command & Strategic Oversight',
    clearanceLevel: 'COSMIC_TOP_SECRET',
    permissions: [
      'ALL_SYSTEMS_OVERVIEW',
      'NATIONAL_ALERT_ESCALATE',
      'STRATEGIC_DIRECTIVE_ISSUE',
      'FULL_AUDIT_VERIFY',
      'SIMULATION_OVERRIDE'
    ],
    description: 'Highest echelon access across all tri-service domains, audit logs, and strategic mission nodes.'
  }
];

export function getRoleById(roleId: string): UserRole | undefined {
  return COMMAND_ROLES.find(r => r.id === roleId);
}
