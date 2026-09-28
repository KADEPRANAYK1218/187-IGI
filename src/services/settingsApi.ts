// Client-side API service connecting Vajra Settings to the Express backend

export interface BackendStatus {
  connected: boolean;
  latencyMs?: number;
  uptimeSeconds?: number;
  storage?: string;
  error?: string;
}

export interface ServerSettingsPayload {
  profile?: {
    name: string;
    rank: string;
    serviceBranch: string;
    unit: string;
    email: string;
    phone: string;
  };
  display?: {
    theme: 'Dark' | 'Light' | 'Auto';
    mapStyle: string;
    defaultView: string;
    language: string;
    timeFormat: string;
    dateFormat: string;
  };
  notifications?: {
    notifRealtime: boolean;
    notifEmail: boolean;
    notifSms: boolean;
    notifPush: boolean;
    notifSound: boolean;
    notifCriticalOnly: boolean;
    channels: {
      dashboard: boolean;
      email: boolean;
      sms: boolean;
      mobileApp: boolean;
    };
  };
  security?: {
    authMethod: string;
    secFace: boolean;
    secIris: boolean;
    secVoice: boolean;
    sec2Fa: boolean;
    sessionTimeoutMinutes?: number;
    cipherSuite?: string;
  };
  dataSync?: {
    autoSync: boolean;
    syncInterval: string;
    dataRetention: string;
    backupEnabled: boolean;
    storageLocation?: string;
    lastSyncTimestamp?: string;
  };
  system?: {
    autoRefreshInterval: string;
    dashboardLayout: string;
    mapZoomLevel: string;
    enableAiAssistant: boolean;
    enablePredictiveAlerts: boolean;
    enableMissionPlanning: boolean;
  };
  integrations?: Array<{
    id: string;
    name: string;
    status: string;
    latency: string;
    lastPing: string;
  }>;
}

export const settingsApi = {
  // 1. Fetch settings from server
  async getSettings(): Promise<{ settings: any; backend: any }> {
    const start = performance.now();
    const res = await fetch('/api/settings');
    if (!res.ok) {
      throw new Error(`Failed to fetch settings from server: ${res.statusText}`);
    }
    const data = await res.json();
    const latency = Math.round(performance.now() - start);
    return {
      settings: data.settings,
      backend: {
        ...data.backend,
        latencyMs: latency
      }
    };
  },

  // 2. Persist updated settings to server backend
  async updateSettings(updates: Partial<ServerSettingsPayload>): Promise<{ success: boolean; settings: any; lastSaved: string }> {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      throw new Error(`Server failed to update settings: ${res.statusText}`);
    }
    return await res.json();
  },

  // 3. Reset settings to backend defaults
  async resetSettings(): Promise<{ success: boolean; settings: any }> {
    const res = await fetch('/api/settings/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
      throw new Error(`Server failed to reset settings: ${res.statusText}`);
    }
    return await res.json();
  },

  // 4. Fetch live server health & hardware diagnostics
  async getSystemHealth(): Promise<any> {
    const res = await fetch('/api/settings/health');
    if (!res.ok) {
      throw new Error('Failed to retrieve backend health');
    }
    return await res.json();
  },

  // 5. Fetch server audit logs
  async getAuditLogs(): Promise<any[]> {
    const res = await fetch('/api/settings/audit-logs');
    if (!res.ok) {
      throw new Error('Failed to retrieve audit logs');
    }
    const data = await res.json();
    return data.logs || [];
  },

  // 6. Test ping connection to an external defense integration
  async testIntegration(id: string): Promise<{ id: string; status: string; latency: string }> {
    const res = await fetch('/api/settings/test-integration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (!res.ok) {
      throw new Error(`Failed to test integration ${id}`);
    }
    return await res.json();
  },

  // 7. Generate encrypted tactical backup
  async createBackup(): Promise<{ success?: boolean; backupId: string; filename: string; size: string; downloadUrl: string }> {
    const res = await fetch('/api/settings/backup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
      throw new Error('Failed to generate server backup');
    }
    return await res.json();
  }
};
