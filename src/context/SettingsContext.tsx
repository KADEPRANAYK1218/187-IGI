import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { settingsApi } from '../services/settingsApi';

export type ThemeMode = 'Dark' | 'Light' | 'Auto';
export type DateFormatOption = 'DD/MM/YYYY' | 'DD MMM YYYY' | 'YYYY-MM-DD' | 'DD-MM-YYYY';
export type TimeFormatOption = '24 Hour' | '12 Hour (AM/PM)' | 'Zulu / UTC';

export interface SettingsState {
  // Display & UI Preferences
  theme: ThemeMode;
  mapStyle: string;
  defaultView: string;
  language: string;
  timeFormat: TimeFormatOption;
  dateFormat: DateFormatOption;

  // System Preferences
  autoRefreshInterval: string;
  dashboardLayout: 'Standard' | 'Compact' | 'Expanded';
  mapZoomLevel: string;
  enableAiAssistant: boolean;
  enablePredictiveAlerts: boolean;
  enableMissionPlanning: boolean;

  // Security & Access
  authMethod: string;
  secFace: boolean;
  secIris: boolean;
  secVoice: boolean;
  sec2Fa: boolean;

  // Data & Sync
  autoSync: boolean;
  syncInterval: string;
  dataRetention: string;
  backupEnabled: boolean;

  // Notifications
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

  // Updaters
  setTheme: (t: ThemeMode) => void;
  setMapStyle: (s: string) => void;
  setDefaultView: (v: string) => void;
  setLanguage: (l: string) => void;
  setTimeFormat: (f: TimeFormatOption) => void;
  setDateFormat: (f: DateFormatOption) => void;
  setAutoRefreshInterval: (i: string) => void;
  setDashboardLayout: (l: 'Standard' | 'Compact' | 'Expanded') => void;
  setMapZoomLevel: (z: string) => void;
  setEnableAiAssistant: (e: boolean) => void;
  setEnablePredictiveAlerts: (e: boolean) => void;
  setEnableMissionPlanning: (e: boolean) => void;
  setAuthMethod: (m: string) => void;
  setSecFace: (v: boolean) => void;
  setSecIris: (v: boolean) => void;
  setSecVoice: (v: boolean) => void;
  setSec2Fa: (v: boolean) => void;
  setAutoSync: (v: boolean) => void;
  setSyncInterval: (i: string) => void;
  setDataRetention: (r: string) => void;
  setBackupEnabled: (b: boolean) => void;
  setNotifRealtime: (v: boolean) => void;
  setNotifEmail: (v: boolean) => void;
  setNotifSms: (v: boolean) => void;
  setNotifPush: (v: boolean) => void;
  setNotifSound: (v: boolean) => void;
  setNotifCriticalOnly: (v: boolean) => void;
  setChannels: React.Dispatch<React.SetStateAction<{ dashboard: boolean; email: boolean; sms: boolean; mobileApp: boolean }>>;

  // Helper Methods
  formatDate: (date?: Date | string | number) => string;
  formatTime: (date?: Date | string | number) => string;
  resetToDefaults: () => Promise<void>;
  isSaving: boolean;
  lastSavedTime: string | null;
}

const SettingsContext = createContext<SettingsState | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  // Display & UI
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('vajra_theme') as ThemeMode) || 'Dark';
  });
  const [mapStyle, setMapStyleState] = useState<string>('Tactical (Neon)');
  const [defaultView, setDefaultViewState] = useState<string>('Dashboard');
  const [language, setLanguageState] = useState<string>('English');
  const [timeFormat, setTimeFormatState] = useState<TimeFormatOption>(() => {
    return (localStorage.getItem('vajra_time_format') as TimeFormatOption) || '24 Hour';
  });
  const [dateFormat, setDateFormatState] = useState<DateFormatOption>(() => {
    return (localStorage.getItem('vajra_date_format') as DateFormatOption) || 'DD MMM YYYY';
  });

  // System Preferences
  const [autoRefreshInterval, setAutoRefreshIntervalState] = useState<string>('30 Seconds');
  const [dashboardLayout, setDashboardLayoutState] = useState<'Standard' | 'Compact' | 'Expanded'>('Standard');
  const [mapZoomLevel, setMapZoomLevelState] = useState<string>('Medium');
  const [enableAiAssistant, setEnableAiAssistantState] = useState<boolean>(true);
  const [enablePredictiveAlerts, setEnablePredictiveAlertsState] = useState<boolean>(true);
  const [enableMissionPlanning, setEnableMissionPlanningState] = useState<boolean>(true);

  // Security & Access
  const [authMethod, setAuthMethodState] = useState<string>('Multi-Factor Authentication');
  const [secFace, setSecFaceState] = useState<boolean>(true);
  const [secIris, setSecIrisState] = useState<boolean>(true);
  const [secVoice, setSecVoiceState] = useState<boolean>(true);
  const [sec2Fa, setSec2FaState] = useState<boolean>(true);

  // Data & Sync
  const [autoSync, setAutoSyncState] = useState<boolean>(true);
  const [syncInterval, setSyncIntervalState] = useState<string>('5 Minutes');
  const [dataRetention, setDataRetentionState] = useState<string>('90 Days');
  const [backupEnabled, setBackupEnabledState] = useState<boolean>(true);

  // Notifications
  const [notifRealtime, setNotifRealtimeState] = useState<boolean>(true);
  const [notifEmail, setNotifEmailState] = useState<boolean>(false);
  const [notifSms, setNotifSmsState] = useState<boolean>(true);
  const [notifPush, setNotifPushState] = useState<boolean>(true);
  const [notifSound, setNotifSoundState] = useState<boolean>(true);
  const [notifCriticalOnly, setNotifCriticalOnlyState] = useState<boolean>(false);
  const [channels, setChannels] = useState({
    dashboard: true,
    email: false,
    sms: true,
    mobileApp: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Apply Theme to DOM Document and cleanup accessibility-long-sight
  useEffect(() => {
    localStorage.removeItem('vajra_long_sight');
    document.documentElement.classList.remove('accessibility-long-sight');
    document.body.classList.remove('accessibility-long-sight');

    localStorage.setItem('vajra_theme', theme);
    const root = document.documentElement;
    const isDark = theme === 'Dark' || (theme === 'Auto' && !window.matchMedia('(prefers-color-scheme: light)').matches);

    if (isDark) {
      root.classList.remove('theme-light');
      root.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('theme-dark');
      root.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  // Sync state to backend silently
  const persistSettings = useCallback(async (overrides: Partial<any> = {}) => {
    setIsSaving(true);
    try {
      const payload = {
        display: {
          theme,
          mapStyle,
          defaultView,
          language,
          timeFormat,
          dateFormat,
          ...(overrides.display || {})
        },
        system: {
          autoRefreshInterval,
          dashboardLayout,
          mapZoomLevel,
          enableAiAssistant,
          enablePredictiveAlerts,
          enableMissionPlanning,
          ...(overrides.system || {})
        },
        security: {
          authMethod,
          secFace,
          secIris,
          secVoice,
          sec2Fa,
          ...(overrides.security || {})
        },
        dataSync: {
          autoSync,
          syncInterval,
          dataRetention,
          backupEnabled,
          ...(overrides.dataSync || {})
        },
        notifications: {
          notifRealtime,
          notifEmail,
          notifSms,
          notifPush,
          notifSound,
          notifCriticalOnly,
          channels,
          ...(overrides.notifications || {})
        }
      };

      const res = await settingsApi.updateSettings(payload);
      if (res && res.lastSaved) {
        setLastSavedTime(res.lastSaved);
      }
    } catch (e) {
      console.warn('Backend sync warning (saved locally):', e);
    } finally {
      setIsSaving(false);
    }
  }, [
    theme, mapStyle, defaultView, language, timeFormat, dateFormat,
    autoRefreshInterval, dashboardLayout, mapZoomLevel, enableAiAssistant, enablePredictiveAlerts, enableMissionPlanning,
    authMethod, secFace, secIris, secVoice, sec2Fa,
    autoSync, syncInterval, dataRetention, backupEnabled,
    notifRealtime, notifEmail, notifSms, notifPush, notifSound, notifCriticalOnly, channels
  ]);

  // Initial Load from Backend API
  useEffect(() => {
    settingsApi.getSettings().then(data => {
      if (data && data.settings) {
        const s = data.settings;
        if (s.display) {
          if (s.display.theme) setThemeState(s.display.theme);
          if (s.display.mapStyle) setMapStyleState(s.display.mapStyle);
          if (s.display.defaultView) setDefaultViewState(s.display.defaultView);
          if (s.display.language) setLanguageState(s.display.language);
          if (s.display.timeFormat) setTimeFormatState(s.display.timeFormat);
          if (s.display.dateFormat) setDateFormatState(s.display.dateFormat);
        }
        if (s.system) {
          if (s.system.autoRefreshInterval) setAutoRefreshIntervalState(s.system.autoRefreshInterval);
          if (s.system.dashboardLayout) setDashboardLayoutState(s.system.dashboardLayout);
          if (s.system.mapZoomLevel) setMapZoomLevelState(s.system.mapZoomLevel);
          if (s.system.enableAiAssistant !== undefined) setEnableAiAssistantState(s.system.enableAiAssistant);
          if (s.system.enablePredictiveAlerts !== undefined) setEnablePredictiveAlertsState(s.system.enablePredictiveAlerts);
          if (s.system.enableMissionPlanning !== undefined) setEnableMissionPlanningState(s.system.enableMissionPlanning);
        }
        if (s.security) {
          if (s.security.authMethod) setAuthMethodState(s.security.authMethod);
          if (s.security.secFace !== undefined) setSecFaceState(s.security.secFace);
          if (s.security.secIris !== undefined) setSecIrisState(s.security.secIris);
          if (s.security.secVoice !== undefined) setSecVoiceState(s.security.secVoice);
          if (s.security.sec2Fa !== undefined) setSec2FaState(s.security.sec2Fa);
        }
        if (s.dataSync) {
          if (s.dataSync.autoSync !== undefined) setAutoSyncState(s.dataSync.autoSync);
          if (s.dataSync.syncInterval) setSyncIntervalState(s.dataSync.syncInterval);
          if (s.dataSync.dataRetention) setDataRetentionState(s.dataSync.dataRetention);
          if (s.dataSync.backupEnabled !== undefined) setBackupEnabledState(s.dataSync.backupEnabled);
        }
        if (s.notifications) {
          if (s.notifications.notifRealtime !== undefined) setNotifRealtimeState(s.notifications.notifRealtime);
          if (s.notifications.notifEmail !== undefined) setNotifEmailState(s.notifications.notifEmail);
          if (s.notifications.notifSms !== undefined) setNotifSmsState(s.notifications.notifSms);
          if (s.notifications.notifPush !== undefined) setNotifPushState(s.notifications.notifPush);
          if (s.notifications.notifSound !== undefined) setNotifSoundState(s.notifications.notifSound);
          if (s.notifications.notifCriticalOnly !== undefined) setNotifCriticalOnlyState(s.notifications.notifCriticalOnly);
          if (s.notifications.channels) setChannels(s.notifications.channels);
        }
      }
    }).catch(() => {});
  }, []);

  // Setters with Immediate Local Update + Background Persistence
  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    persistSettings({ display: { theme: t } });
  };

  const setMapStyle = (s: string) => {
    setMapStyleState(s);
    persistSettings({ display: { mapStyle: s } });
  };

  const setDefaultView = (v: string) => {
    setDefaultViewState(v);
    persistSettings({ display: { defaultView: v } });
  };

  const setLanguage = (l: string) => {
    setLanguageState(l);
    persistSettings({ display: { language: l } });
  };

  const setTimeFormat = (f: TimeFormatOption) => {
    setTimeFormatState(f);
    localStorage.setItem('vajra_time_format', f);
    persistSettings({ display: { timeFormat: f } });
  };

  const setDateFormat = (f: DateFormatOption) => {
    setDateFormatState(f);
    localStorage.setItem('vajra_date_format', f);
    persistSettings({ display: { dateFormat: f } });
  };

  const setAutoRefreshInterval = (i: string) => {
    setAutoRefreshIntervalState(i);
    persistSettings({ system: { autoRefreshInterval: i } });
  };

  const setDashboardLayout = (l: 'Standard' | 'Compact' | 'Expanded') => {
    setDashboardLayoutState(l);
    persistSettings({ system: { dashboardLayout: l } });
  };

  const setMapZoomLevel = (z: string) => {
    setMapZoomLevelState(z);
    persistSettings({ system: { mapZoomLevel: z } });
  };

  const setEnableAiAssistant = (e: boolean) => {
    setEnableAiAssistantState(e);
    persistSettings({ system: { enableAiAssistant: e } });
  };

  const setEnablePredictiveAlerts = (e: boolean) => {
    setEnablePredictiveAlertsState(e);
    persistSettings({ system: { enablePredictiveAlerts: e } });
  };

  const setEnableMissionPlanning = (e: boolean) => {
    setEnableMissionPlanningState(e);
    persistSettings({ system: { enableMissionPlanning: e } });
  };

  const setAuthMethod = (m: string) => {
    setAuthMethodState(m);
    persistSettings({ security: { authMethod: m } });
  };

  const setSecFace = (v: boolean) => {
    setSecFaceState(v);
    persistSettings({ security: { secFace: v } });
  };

  const setSecIris = (v: boolean) => {
    setSecIrisState(v);
    persistSettings({ security: { secIris: v } });
  };

  const setSecVoice = (v: boolean) => {
    setSecVoiceState(v);
    persistSettings({ security: { secVoice: v } });
  };

  const setSec2Fa = (v: boolean) => {
    setSec2FaState(v);
    persistSettings({ security: { sec2Fa: v } });
  };

  const setAutoSync = (v: boolean) => {
    setAutoSyncState(v);
    persistSettings({ dataSync: { autoSync: v } });
  };

  const setSyncInterval = (i: string) => {
    setSyncIntervalState(i);
    persistSettings({ dataSync: { syncInterval: i } });
  };

  const setDataRetention = (r: string) => {
    setDataRetentionState(r);
    persistSettings({ dataSync: { dataRetention: r } });
  };

  const setBackupEnabled = (b: boolean) => {
    setBackupEnabledState(b);
    persistSettings({ dataSync: { backupEnabled: b } });
  };

  const setNotifRealtime = (v: boolean) => {
    setNotifRealtimeState(v);
    persistSettings({ notifications: { notifRealtime: v } });
  };

  const setNotifEmail = (v: boolean) => {
    setNotifEmailState(v);
    persistSettings({ notifications: { notifEmail: v } });
  };

  const setNotifSms = (v: boolean) => {
    setNotifSmsState(v);
    persistSettings({ notifications: { notifSms: v } });
  };

  const setNotifPush = (v: boolean) => {
    setNotifPushState(v);
    persistSettings({ notifications: { notifPush: v } });
  };

  const setNotifSound = (v: boolean) => {
    setNotifSoundState(v);
    persistSettings({ notifications: { notifSound: v } });
  };

  const setNotifCriticalOnly = (v: boolean) => {
    setNotifCriticalOnlyState(v);
    persistSettings({ notifications: { notifCriticalOnly: v } });
  };

  // Reset to Defaults
  const resetToDefaults = async () => {
    try {
      await settingsApi.resetSettings();
    } catch (e) {}

    setThemeState('Dark');
    setMapStyleState('Tactical (Neon)');
    setDefaultViewState('Dashboard');
    setLanguageState('English');
    setTimeFormatState('24 Hour');
    setDateFormatState('DD MMM YYYY');
    setAutoRefreshIntervalState('30 Seconds');
    setDashboardLayoutState('Standard');
    setMapZoomLevelState('Medium');
    setEnableAiAssistantState(true);
    setEnablePredictiveAlertsState(true);
    setEnableMissionPlanningState(true);
    setAuthMethodState('Multi-Factor Authentication');
    setSecFaceState(true);
    setSecIrisState(true);
    setSecVoiceState(true);
    setSec2FaState(true);
    setAutoSyncState(true);
    setSyncIntervalState('5 Minutes');
    setDataRetentionState('90 Days');
    setBackupEnabledState(true);
    setNotifRealtimeState(true);
    setNotifEmailState(false);
    setNotifSmsState(true);
    setNotifPushState(true);
    setNotifSoundState(true);
    setNotifCriticalOnlyState(false);
    setChannels({ dashboard: true, email: false, sms: true, mobileApp: true });
  };

  // Formatter functions
  const formatDate = useCallback((inputDate?: Date | string | number): string => {
    const d = inputDate ? new Date(inputDate) : new Date();
    if (isNaN(d.getTime())) return '';

    const day = String(d.getDate()).padStart(2, '0');
    const monthNum = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const monthsShort = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const monthShort = monthsShort[d.getMonth()];

    switch (dateFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${monthNum}/${year}`;
      case 'DD-MM-YYYY':
        return `${day}-${monthNum}-${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${monthNum}-${day}`;
      case 'DD MMM YYYY':
      default:
        return `${day} ${monthShort} ${year}`;
    }
  }, [dateFormat]);

  const formatTime = useCallback((inputDate?: Date | string | number): string => {
    const d = inputDate ? new Date(inputDate) : new Date();
    if (isNaN(d.getTime())) return '';

    if (timeFormat === 'Zulu / UTC') {
      const hh = String(d.getUTCHours()).padStart(2, '0');
      const mm = String(d.getUTCMinutes()).padStart(2, '0');
      const ss = String(d.getUTCSeconds()).padStart(2, '0');
      return `${hh}:${mm}:${ss}Z UTC`;
    }

    if (timeFormat === '12 Hour (AM/PM)') {
      let hours = d.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // hour '0' should be '12'
      const hh = String(hours).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      return `${hh}:${mm}:${ss} ${ampm} IST`;
    }

    // Default 24 Hour
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss} IST`;
  }, [timeFormat]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        mapStyle,
        defaultView,
        language,
        timeFormat,
        dateFormat,
        autoRefreshInterval,
        dashboardLayout,
        mapZoomLevel,
        enableAiAssistant,
        enablePredictiveAlerts,
        enableMissionPlanning,
        authMethod,
        secFace,
        secIris,
        secVoice,
        sec2Fa,
        autoSync,
        syncInterval,
        dataRetention,
        backupEnabled,
        notifRealtime,
        notifEmail,
        notifSms,
        notifPush,
        notifSound,
        notifCriticalOnly,
        channels,

        setTheme,
        setMapStyle,
        setDefaultView,
        setLanguage,
        setTimeFormat,
        setDateFormat,
        setAutoRefreshInterval,
        setDashboardLayout,
        setMapZoomLevel,
        setEnableAiAssistant,
        setEnablePredictiveAlerts,
        setEnableMissionPlanning,
        setAuthMethod,
        setSecFace,
        setSecIris,
        setSecVoice,
        setSec2Fa,
        setAutoSync,
        setSyncInterval,
        setDataRetention,
        setBackupEnabled,
        setNotifRealtime,
        setNotifEmail,
        setNotifSms,
        setNotifPush,
        setNotifSound,
        setNotifCriticalOnly,
        setChannels,

        formatDate,
        formatTime,
        resetToDefaults,
        isSaving,
        lastSavedTime
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
}
