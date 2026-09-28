import { ServiceType, ServicePrefix } from '../types';

export interface ServiceDefinition {
  type: ServiceType;
  prefix: ServicePrefix;
  motto: string;
  commandHeadquarters: string;
  primaryColor: string;
  accentColor: string;
  badgeSymbol: string;
  description: string;
}

export const SERVICES_DATA: ServiceDefinition[] = [
  {
    type: 'Indian Army',
    prefix: 'IC',
    motto: 'Service Before Self',
    commandHeadquarters: 'Integrated HQ of Ministry of Defence (Army), New Delhi',
    primaryColor: '#F97316', // Saffron warm
    accentColor: '#10B981', // India Green
    badgeSymbol: '⚔️',
    description: 'Ground defense and land tactical operations command network.'
  },
  {
    type: 'Indian Navy',
    prefix: 'IN',
    motto: 'May the Lord of the Oceans be Auspicious Unto Us',
    commandHeadquarters: 'Integrated HQ of Ministry of Defence (Navy), New Delhi',
    primaryColor: '#000080', // Chakra Blue
    accentColor: '#22D3EE', // Cyan
    badgeSymbol: '⚓',
    description: 'Maritime boundary surveillance, oceanic taskforces & blue-water security.'
  },
  {
    type: 'Indian Air Force',
    prefix: 'IAF',
    motto: 'Touch the Sky with Glory',
    commandHeadquarters: 'Air Headquarters (Vayu Bhawan), New Delhi',
    primaryColor: '#22D3EE', // Sky Cyan
    accentColor: '#FF9933', // Saffron
    badgeSymbol: '✈️',
    description: 'Air defense radar network, airspace interceptors & strategic deterrence.'
  }
];

export const SERVICE_PREFIX_MAP: Record<ServiceType, ServicePrefix> = {
  'Indian Army': 'IC',
  'Indian Navy': 'IN',
  'Indian Air Force': 'IAF'
};
