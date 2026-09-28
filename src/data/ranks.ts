import { RankInfo, ServiceType } from '../types';

export const ARMY_RANKS: RankInfo[] = [
  { id: 'army-lt', name: 'Lieutenant', service: 'Indian Army', level: 1, abbreviation: 'Lt' },
  { id: 'army-capt', name: 'Captain', service: 'Indian Army', level: 2, abbreviation: 'Capt' },
  { id: 'army-maj', name: 'Major', service: 'Indian Army', level: 3, abbreviation: 'Maj' },
  { id: 'army-lt-col', name: 'Lieutenant Colonel', service: 'Indian Army', level: 4, abbreviation: 'Lt Col' },
  { id: 'army-col', name: 'Colonel', service: 'Indian Army', level: 5, abbreviation: 'Col' },
  { id: 'army-brig', name: 'Brigadier', service: 'Indian Army', level: 6, abbreviation: 'Brig' },
  { id: 'army-maj-gen', name: 'Major General', service: 'Indian Army', level: 7, abbreviation: 'Maj Gen' },
  { id: 'army-lt-gen', name: 'Lieutenant General', service: 'Indian Army', level: 8, abbreviation: 'Lt Gen' },
  { id: 'army-gen', name: 'General', service: 'Indian Army', level: 9, abbreviation: 'Gen' }
];

export const NAVY_RANKS: RankInfo[] = [
  { id: 'navy-sub-lt', name: 'Sub Lieutenant', service: 'Indian Navy', level: 1, abbreviation: 'S Lt' },
  { id: 'navy-lt', name: 'Lieutenant', service: 'Indian Navy', level: 2, abbreviation: 'Lt' },
  { id: 'navy-lt-cdr', name: 'Lieutenant Commander', service: 'Indian Navy', level: 3, abbreviation: 'Lt Cdr' },
  { id: 'navy-cdr', name: 'Commander', service: 'Indian Navy', level: 4, abbreviation: 'Cdr' },
  { id: 'navy-capt', name: 'Captain', service: 'Indian Navy', level: 5, abbreviation: 'Capt' },
  { id: 'navy-cmde', name: 'Commodore', service: 'Indian Navy', level: 6, abbreviation: 'Cmde' },
  { id: 'navy-rear-adm', name: 'Rear Admiral', service: 'Indian Navy', level: 7, abbreviation: 'R Adm' },
  { id: 'navy-vice-adm', name: 'Vice Admiral', service: 'Indian Navy', level: 8, abbreviation: 'V Adm' },
  { id: 'navy-adm', name: 'Admiral', service: 'Indian Navy', level: 9, abbreviation: 'Adm' }
];

export const AIR_FORCE_RANKS: RankInfo[] = [
  { id: 'iaf-fg-off', name: 'Flying Officer', service: 'Indian Air Force', level: 1, abbreviation: 'Fg Off' },
  { id: 'iaf-flt-lt', name: 'Flight Lieutenant', service: 'Indian Air Force', level: 2, abbreviation: 'Flt Lt' },
  { id: 'iaf-sqn-ldr', name: 'Squadron Leader', service: 'Indian Air Force', level: 3, abbreviation: 'Sqn Ldr' },
  { id: 'iaf-wg-cdr', name: 'Wing Commander', service: 'Indian Air Force', level: 4, abbreviation: 'Wg Cdr' },
  { id: 'iaf-gp-capt', name: 'Group Captain', service: 'Indian Air Force', level: 5, abbreviation: 'Gp Capt' },
  { id: 'iaf-air-cmde', name: 'Air Commodore', service: 'Indian Air Force', level: 6, abbreviation: 'Air Cmde' },
  { id: 'iaf-avm', name: 'Air Vice Marshal', service: 'Indian Air Force', level: 7, abbreviation: 'AVM' },
  { id: 'iaf-air-mshl', name: 'Air Marshal', service: 'Indian Air Force', level: 8, abbreviation: 'Air Mshl' },
  { id: 'iaf-acm', name: 'Air Chief Marshal', service: 'Indian Air Force', level: 9, abbreviation: 'ACM' }
];

export const ALL_RANKS: RankInfo[] = [
  ...ARMY_RANKS,
  ...NAVY_RANKS,
  ...AIR_FORCE_RANKS
];

export function getRanksForService(service: ServiceType): RankInfo[] {
  switch (service) {
    case 'Indian Army':
      return ARMY_RANKS;
    case 'Indian Navy':
      return NAVY_RANKS;
    case 'Indian Air Force':
      return AIR_FORCE_RANKS;
    default:
      return [];
  }
}
