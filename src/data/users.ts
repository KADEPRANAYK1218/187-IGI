import { UserAccount } from '../types';

export const INITIAL_OFFICERS: UserAccount[] = [
  {
    id: 'usr-001',
    serviceId: 'IC-7K42P9',
    fullName: 'Vikramaditya Rawat',
    service: 'Indian Army',
    rank: 'Brigadier',
    roleId: 'role-geospatial-commander',
    roleTitle: 'Geospatial Sector Commander',
    passwordHash: 'Vajra@2026', // Stored password string for frontend prototype verification
    securityPin: '849201',
    biometricConsent: true,
    clearanceLevel: 'TOP_SECRET',
    sector: 'Northern Command — Udhampur HQ',
    registeredAt: '2026-01-15T08:30:00Z',
    lastLogin: '2026-08-21T19:40:00Z',
    isActive: true
  },
  {
    id: 'usr-002',
    serviceId: 'IN-8P31XZ',
    fullName: 'Ananya S. Nambiar',
    service: 'Indian Navy',
    rank: 'Captain',
    roleId: 'role-maritime-domain-officer',
    roleTitle: 'Maritime Domain Awareness Officer',
    passwordHash: 'Varuna#2026',
    securityPin: '730194',
    biometricConsent: true,
    clearanceLevel: 'SECRET',
    sector: 'Eastern Naval Command — Visakhapatnam',
    registeredAt: '2026-02-10T11:15:00Z',
    lastLogin: '2026-08-20T14:22:00Z',
    isActive: true
  },
  {
    id: 'usr-003',
    serviceId: 'IAF-92LX5C',
    fullName: 'Devraj S. Rathore',
    service: 'Indian Air Force',
    rank: 'Group Captain',
    roleId: 'role-air-defense-controller',
    roleTitle: 'Air Defense Network Controller',
    passwordHash: 'Garuda$2026',
    securityPin: '492815',
    biometricConsent: true,
    clearanceLevel: 'TOP_SECRET',
    sector: 'Western Air Command — Subroto Park',
    registeredAt: '2026-03-01T09:00:00Z',
    lastLogin: '2026-08-21T21:10:00Z',
    isActive: true
  }
];

const STORAGE_KEY = 'vajra_registered_officers_db_v1';

export function getStoredOfficers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_OFFICERS));
      return INITIAL_OFFICERS;
    }
    const parsed: UserAccount[] = JSON.parse(raw);
    return parsed.length > 0 ? parsed : INITIAL_OFFICERS;
  } catch {
    return INITIAL_OFFICERS;
  }
}

export function saveOfficer(newOfficer: UserAccount): { success: boolean; error?: string } {
  const current = getStoredOfficers();
  if (current.some(o => o.serviceId.toUpperCase() === newOfficer.serviceId.toUpperCase())) {
    return { success: false, error: `Service ID ${newOfficer.serviceId} already exists in database.` };
  }
  
  const updated = [...current, newOfficer];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Failed to persist officer record in local storage.' };
  }
}

export function findOfficerByServiceId(serviceId: string): UserAccount | undefined {
  const officers = getStoredOfficers();
  return officers.find(o => o.serviceId.toUpperCase() === serviceId.trim().toUpperCase());
}
