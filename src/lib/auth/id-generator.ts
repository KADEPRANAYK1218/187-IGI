import { ServiceType, ServicePrefix } from '../../types';
import { SERVICE_PREFIX_MAP } from '../../data/services';

const CHAR_SET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Omits easily confused chars (0/O, 1/I)

export function generateSyntheticServiceId(service: ServiceType, existingIds: string[] = []): string {
  const prefix: ServicePrefix = SERVICE_PREFIX_MAP[service] || 'IC';
  
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    let suffix = '';
    for (let i = 0; i < 6; i++) {
      const randIndex = Math.floor(Math.random() * CHAR_SET.length);
      suffix += CHAR_SET[randIndex];
    }

    const fullId = `${prefix}-${suffix}`;
    if (!existingIds.includes(fullId)) {
      return fullId;
    }
    attempts++;
  }

  // Fallback unique with timestamp
  const timeSuffix = Date.now().toString(36).slice(-6).toUpperCase();
  return `${prefix}-${timeSuffix}`;
}

export function validateServiceIdFormat(serviceId: string, expectedService?: ServiceType): {
  valid: boolean;
  prefix?: string;
  error?: string;
} {
  if (!serviceId || typeof serviceId !== 'string') {
    return { valid: false, error: 'Service ID is required.' };
  }

  const trimmed = serviceId.trim().toUpperCase();
  const parts = trimmed.split('-');

  if (parts.length !== 2) {
    return { valid: false, error: 'Format must be PREFIX-XXXXXX (e.g. IC-7K42P9).' };
  }

  const [prefix, suffix] = parts;

  if (!['IC', 'IN', 'IAF'].includes(prefix)) {
    return { valid: false, error: 'Prefix must be IC (Army), IN (Navy), or IAF (Air Force).' };
  }

  if (suffix.length !== 6 || !/^[A-Z0-9]{6}$/.test(suffix)) {
    return { valid: false, error: 'Suffix must be exactly 6 alphanumeric characters.' };
  }

  if (expectedService) {
    const requiredPrefix = SERVICE_PREFIX_MAP[expectedService];
    if (prefix !== requiredPrefix) {
      return { 
        valid: false, 
        error: `Selected service (${expectedService}) requires prefix ${requiredPrefix}-, but found ${prefix}-.` 
      };
    }
  }

  return { valid: true, prefix };
}
