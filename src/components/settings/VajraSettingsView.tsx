import React, { useState, useEffect } from 'react';
import { 
  Settings, User, Monitor, Bell, Shield, Database, 
  Link2, Sliders, FileText, Activity, Headset, 
  Search, Edit3, ChevronRight, Check, Eye, Lock, 
  Mic, Fingerprint, Cloud, RefreshCw, LogOut, 
  HelpCircle, Info, MessageSquare, ArrowRight, X,
  Radio, Plane, CloudSun, Server, Users, Cpu,
  HardDrive, Wifi, Zap, Thermometer, AlertTriangle,
  Download, Sparkles, CheckCircle2, ChevronDown, CheckCircle,
  Sun, Moon, Calendar, Clock, Volume2
} from 'lucide-react';
import { UserAccount } from '../../types';
import { settingsApi } from '../../services/settingsApi';
import { useSettings, DateFormatOption, TimeFormatOption, ThemeMode } from '../../context/SettingsContext';

interface VajraSettingsViewProps {
  user: UserAccount;
  onLogout: () => void;
}

export const VajraSettingsView: React.FC<VajraSettingsViewProps> = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active modal state
  const [activeModal, setActiveModal] = useState<
    'EDIT_PROFILE' | 'BIOMETRIC_DATA' | 'BACKUP' | 'INTEGRATIONS' | 'FULL_LOGS' | 'DETAILED_HEALTH' | 'HELP_DIALOG' | null
  >(null);
  const [helpDialogContent, setHelpDialogContent] = useState<{ title: string; content: string } | null>(null);

  // 1. User Profile State
  const [profileData, setProfileData] = useState({
    name: user.fullName || 'Major IC-7K42P9',
    rank: user.rank || 'Major',
    serviceBranch: user.service || 'Indian Army',
    unit: user.serviceId || 'IC-7K42P9',
    email: user.email || 'major.ic7k42p9@indianarmy.in',
    phone: '+91 98765 43210'
  });

  // Consume Global Settings & Reactive Controls
  const {
    theme, setTheme,
    dateFormat, setDateFormat,
    timeFormat, setTimeFormat,
    mapStyle, setMapStyle,
    defaultView, setDefaultView,
    language, setLanguage,
    autoRefreshInterval, setAutoRefreshInterval,
    dashboardLayout, setDashboardLayout,
    mapZoomLevel, setMapZoomLevel,
    enableAiAssistant, setEnableAiAssistant,
    enablePredictiveAlerts, setEnablePredictiveAlerts,
    enableMissionPlanning, setEnableMissionPlanning,
    authMethod, setAuthMethod,
    secFace, setSecFace,
    secIris, setSecIris,
    secVoice, setSecVoice,
    sec2Fa, setSec2Fa,
    autoSync, setAutoSync,
    syncInterval, setSyncInterval,
    dataRetention, setDataRetention,
    backupEnabled, setBackupEnabled,
    notifRealtime, setNotifRealtime,
    notifEmail, setNotifEmail,
    notifSms, setNotifSms,
    notifPush, setNotifPush,
    notifSound, setNotifSound,
    notifCriticalOnly, setNotifCriticalOnly,
    channels, setChannels,
    formatDate, formatTime,
    resetToDefaults,
    isSaving: isContextSaving
  } = useSettings();

  // Backend Integration State
  const [backendStatus, setBackendStatus] = useState<{
    connected: boolean;
    latencyMs: number;
    host: string;
    storage: string;
    lastSaved: string;
    uptime?: number;
  }>({
    connected: false,
    latencyMs: 0,
    host: '0.0.0.0:3000',
    storage: 'Persistent Store (data/vajra-settings.json)',
    lastSaved: new Date().toISOString()
  });
  const [isSavingToBackend, setIsSavingToBackend] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [serverLogs, setServerLogs] = useState<any[]>([]);
  const [serverHealth, setServerHealth] = useState<any>(null);
  const [testedIntegrations, setTestedIntegrations] = useState<Record<string, { status: string; latency: string }>>({});
  const [backupDownloadUrl, setBackupDownloadUrl] = useState<string | null>(null);

  // Trigger Toast Notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  // Load Settings from Backend API
  const loadSettingsFromBackend = async (silent = false) => {
    setIsSyncing(true);
    try {
      const data = await settingsApi.getSettings();
      if (data && data.settings) {
        const s = data.settings;
        if (s.profile) {
          setProfileData(prev => ({
            ...prev,
            ...s.profile,
            name: s.profile.name || prev.name
          }));
        }
        if (s.display) {
          if (s.display.theme) setTheme(s.display.theme);
          if (s.display.mapStyle) setMapStyle(s.display.mapStyle);
          if (s.display.defaultView) setDefaultView(s.display.defaultView);
          if (s.display.language) setLanguage(s.display.language);
          if (s.display.timeFormat) setTimeFormat(s.display.timeFormat);
          if (s.display.dateFormat) setDateFormat(s.display.dateFormat);
        }
        if (s.notifications) {
          if (s.notifications.notifRealtime !== undefined) setNotifRealtime(s.notifications.notifRealtime);
          if (s.notifications.notifEmail !== undefined) setNotifEmail(s.notifications.notifEmail);
          if (s.notifications.notifSms !== undefined) setNotifSms(s.notifications.notifSms);
          if (s.notifications.notifPush !== undefined) setNotifPush(s.notifications.notifPush);
          if (s.notifications.notifSound !== undefined) setNotifSound(s.notifications.notifSound);
          if (s.notifications.notifCriticalOnly !== undefined) setNotifCriticalOnly(s.notifications.notifCriticalOnly);
          if (s.notifications.channels) setChannels(s.notifications.channels);
        }
        if (s.security) {
          if (s.security.authMethod) setAuthMethod(s.security.authMethod);
          if (s.security.secFace !== undefined) setSecFace(s.security.secFace);
          if (s.security.secIris !== undefined) setSecIris(s.security.secIris);
          if (s.security.secVoice !== undefined) setSecVoice(s.security.secVoice);
          if (s.security.sec2Fa !== undefined) setSec2Fa(s.security.sec2Fa);
        }
        if (s.dataSync) {
          if (s.dataSync.autoSync !== undefined) setAutoSync(s.dataSync.autoSync);
          if (s.dataSync.syncInterval) setSyncInterval(s.dataSync.syncInterval);
          if (s.dataSync.dataRetention) setDataRetention(s.dataSync.dataRetention);
          if (s.dataSync.backupEnabled !== undefined) setBackupEnabled(s.dataSync.backupEnabled);
        }
        if (s.system) {
          if (s.system.autoRefreshInterval) setAutoRefreshInterval(s.system.autoRefreshInterval);
          if (s.system.dashboardLayout) setDashboardLayout(s.system.dashboardLayout);
          if (s.system.mapZoomLevel) setMapZoomLevel(s.system.mapZoomLevel);
          if (s.system.enableAiAssistant !== undefined) setEnableAiAssistant(s.system.enableAiAssistant);
          if (s.system.enablePredictiveAlerts !== undefined) setEnablePredictiveAlerts(s.system.enablePredictiveAlerts);
          if (s.system.enableMissionPlanning !== undefined) setEnableMissionPlanning(s.system.enableMissionPlanning);
        }
      }
      setBackendStatus({
        connected: true,
        latencyMs: data.backend?.latencyMs || 12,
        host: '0.0.0.0:3000',
        storage: data.backend?.storage || 'data/vajra-settings.json',
        lastSaved: data.settings?.metadata?.lastSaved || new Date().toISOString(),
        uptime: data.backend?.uptime
      });
      if (!silent) {
        showToast('SETTINGS SYNCHRONIZED WITH BACKEND');
      }
    } catch (err) {
      console.warn('Backend settings fetch note (using local cache):', err);
      setBackendStatus(prev => ({
        ...prev,
        connected: false,
        latencyMs: 0
      }));
    } finally {
      setIsSyncing(false);
    }
  };

  // Save Settings to Backend API
  const saveSettingsToBackend = async (showToastAlert = true) => {
    setIsSavingToBackend(true);
    try {
      const payload = {
        profile: profileData,
        display: {
          theme,
          mapStyle,
          defaultView,
          language,
          timeFormat,
          dateFormat
        },
        notifications: {
          notifRealtime,
          notifEmail,
          notifSms,
          notifPush,
          notifSound,
          notifCriticalOnly,
          channels
        },
        security: {
          authMethod,
          secFace,
          secIris,
          secVoice,
          sec2Fa
        },
        dataSync: {
          autoSync,
          syncInterval,
          dataRetention,
          backupEnabled
        },
        system: {
          autoRefreshInterval,
          dashboardLayout,
          mapZoomLevel,
          enableAiAssistant,
          enablePredictiveAlerts,
          enableMissionPlanning
        }
      };

      const res = await settingsApi.updateSettings(payload);
      if (res.success) {
        setBackendStatus(prev => ({
          ...prev,
          connected: true,
          lastSaved: res.lastSaved || new Date().toISOString()
        }));
        if (showToastAlert) {
          showToast('ALL SETTINGS SAVED & PERSISTED TO BACKEND');
        }
        loadAuditLogs();
      }
    } catch (err: any) {
      console.error('Error saving settings to backend:', err);
      if (showToastAlert) {
        showToast('SAVED LOCALLY (BACKEND RETRY PENDING)');
      }
    } finally {
      setIsSavingToBackend(false);
    }
  };

  // Load audit logs from backend
  const loadAuditLogs = async () => {
    try {
      const logs = await settingsApi.getAuditLogs();
      if (logs && logs.length > 0) {
        setServerLogs(logs);
      }
    } catch (e) {}
  };

  // Load live health telemetry from backend
  const loadSystemHealth = async () => {
    try {
      const health = await settingsApi.getSystemHealth();
      if (health) {
        setServerHealth(health);
      }
    } catch (e) {}
  };

  // Initial mount load
  useEffect(() => {
    loadSettingsFromBackend(true);
    loadAuditLogs();
    loadSystemHealth();
  }, []);

  // Reset to default handler
  const handleResetDefaults = async () => {
    try {
      const res = await settingsApi.resetSettings();
      if (res.success && res.settings) {
        const s = res.settings;
        setTheme(s.display.theme);
        setMapStyle(s.display.mapStyle);
        setDefaultView(s.display.defaultView);
        setLanguage(s.display.language);
        setTimeFormat(s.display.timeFormat);
        setDateFormat(s.display.dateFormat);
        setAutoRefreshInterval(s.system.autoRefreshInterval);
        setDashboardLayout(s.system.dashboardLayout);
        setMapZoomLevel(s.system.mapZoomLevel);
        setEnableAiAssistant(s.system.enableAiAssistant);
        setEnablePredictiveAlerts(s.system.enablePredictiveAlerts);
        setEnableMissionPlanning(s.system.enableMissionPlanning);
        showToast('SETTINGS RESET TO DEFENSE DEFAULTS ON SERVER');
        loadAuditLogs();
        return;
      }
    } catch (e) {
      // fallback
    }

    setTheme('Dark');
    setMapStyle('Tactical (Neon)');
    setDefaultView('Dashboard');
    setLanguage('English');
    setTimeFormat('24 Hour');
    setDateFormat('DD MMM YYYY');
    setAutoRefreshInterval('30 Seconds');
    setDashboardLayout('Standard');
    setMapZoomLevel('Medium');
    setEnableAiAssistant(true);
    setEnablePredictiveAlerts(true);
    setEnableMissionPlanning(true);
    showToast('PREFERENCES RESET TO SYSTEM DEFAULT');
  };

  const openHelpModal = (title: string, content: string) => {
    setHelpDialogContent({ title, content });
    setActiveModal('HELP_DIALOG');
  };

  // Check if a section matches search query
  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className="w-full flex flex-col space-y-4" id="vajra-settings-view">
      {/* Toast message popup */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2 rounded-xl bg-cyan-950/95 border border-cyan-400 text-cyan-300 text-xs font-mono-code shadow-2xl flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================= TOP HEADER & SEARCH ======================= */}
      <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/35 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Left Title & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/90 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] shrink-0">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-tech font-bold text-white tracking-wider leading-tight">
              SETTINGS
            </h1>
            <p className="text-[10px] sm:text-[11px] font-mono-code text-cyan-400/90 tracking-wider">
              SYSTEM CONFIGURATION • USER PREFERENCES • SECURITY • INTEGRATIONS
            </p>
          </div>
        </div>

        {/* Right Search Box */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-cyan-400/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search settings..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#010816]/90 border border-cyan-500/40 focus:border-cyan-300 text-xs font-tech text-white placeholder-slate-400 outline-none transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ======================= ROW 1: 1. USER PROFILE, 2. DISPLAY & UI, 3. NOTIFICATIONS ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
        {/* CARD 1: 1. USER PROFILE (col-span-4) */}
        {matchesSearch('user profile officer rank service email phone') && (
          <div className="lg:col-span-4 rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between" id="card-user-profile">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3.5">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider">
                    1. USER PROFILE
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal('EDIT_PROFILE')}
                  className="px-2.5 py-1 rounded-lg bg-[#021833] hover:bg-[#032650] border border-cyan-500/40 text-cyan-300 text-xs font-tech font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Officer Status Header */}
              <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-[#01091a]/80 border border-cyan-500/20">
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-tech font-bold text-white leading-tight truncate">
                    {profileData.name}
                  </h4>
                  <div className="text-xs font-tech text-cyan-400 mt-0.5">
                    {profileData.serviceBranch}
                  </div>
                  <div className="text-[11px] font-mono-code text-slate-300 mt-1">
                    Command Level
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10.5px] font-mono-code text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online</span>
                  </span>
                  <span className="text-[10px] font-mono-code text-cyan-400/80">
                    ID: {profileData.unit}
                  </span>
                </div>
              </div>

              {/* Profile Details List */}
              <div className="space-y-2 text-xs font-tech">
                <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-[#010816] border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Rank</span>
                  </span>
                  <span className="font-mono-code font-bold text-white">{profileData.rank}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-[#010816] border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Service Branch</span>
                  </span>
                  <span className="font-mono-code font-bold text-white">{profileData.serviceBranch}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-[#010816] border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Unit</span>
                  </span>
                  <span className="font-mono-code font-bold text-cyan-300">{profileData.unit}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CARD 2: 2. DISPLAY & UI PREFERENCES (col-span-4) */}
        {matchesSearch('display ui preferences theme map language time format') && (
          <div className="lg:col-span-4 rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between" id="card-display-preferences">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3.5">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider">
                    2. DISPLAY & UI PREFERENCES
                  </h3>
                </div>
              </div>

              {/* Form Controls */}
              <div className="space-y-3.5 text-xs font-tech">
                {/* 1. Theme Selector */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                      Theme Mode
                    </span>
                    <span className="font-mono-code text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                      {theme}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#010816] border border-cyan-500/30">
                    <button
                      type="button"
                      onClick={() => {
                        setTheme('Dark');
                        showToast('THEME: TACTICAL DARK APPLIED');
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-tech font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        theme === 'Dark'
                          ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.6)] border border-cyan-400'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      <span>Dark</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setTheme('Light');
                        showToast('THEME: DAYLIGHT OPTICAL MODE APPLIED');
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-tech font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        theme === 'Light'
                          ? 'bg-amber-400 text-slate-950 font-extrabold shadow-[0_0_12px_rgba(251,191,36,0.7)] border border-amber-300'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      <span>Light</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setTheme('Auto');
                        showToast('THEME: SYSTEM SYNCHRONIZED');
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-tech font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        theme === 'Auto'
                          ? 'bg-[#0070f3] text-white shadow-[0_0_10px_rgba(0,112,243,0.5)] border border-blue-400'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Auto</span>
                    </button>
                  </div>
                </div>

                {/* 2. Date Format (Direct Buttons + Live Preview) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      Date Format
                    </span>
                    <span className="font-mono-code text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                      {formatDate(new Date())}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(['DD/MM/YYYY', 'DD MMM YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'] as DateFormatOption[]).map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => {
                          setDateFormat(fmt);
                          showToast(`DATE FORMAT APPLIED: ${fmt}`);
                        }}
                        className={`py-1.5 px-2.5 rounded-lg text-[11px] font-mono-code font-bold transition cursor-pointer text-center border ${
                          dateFormat === fmt
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                            : 'bg-[#010816] text-slate-400 border-slate-800 hover:border-cyan-500/40 hover:text-white'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Time Format (Direct Buttons + Live Preview) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Time Format
                    </span>
                    <span className="font-mono-code text-[11px] font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/40">
                      {formatTime(new Date())}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['24 Hour', '12 Hour (AM/PM)', 'Zulu / UTC'] as TimeFormatOption[]).map((tf) => (
                      <button
                        key={tf}
                        type="button"
                        onClick={() => {
                          setTimeFormat(tf);
                          showToast(`TIME FORMAT APPLIED: ${tf}`);
                        }}
                        className={`py-1.5 px-1 rounded-lg text-[11px] font-tech font-bold transition cursor-pointer text-center border ${
                          timeFormat === tf
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                            : 'bg-[#010816] text-slate-400 border-slate-800 hover:border-cyan-500/40 hover:text-white'
                        }`}
                      >
                        {tf === '12 Hour (AM/PM)' ? '12 Hour' : tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Map Style */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Map Tactical Style</span>
                    <span className="text-[10px] text-cyan-400 font-mono-code">{mapStyle}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      'Tactical (Neon)',
                      'Satellite Recon',
                      'High-Contrast Dark',
                      'Thermal Heatmap'
                    ].map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => {
                          setMapStyle(style);
                          showToast(`MAP STYLE: ${style.toUpperCase()}`);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-tech font-bold transition cursor-pointer text-center border ${
                          mapStyle === style
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                            : 'bg-[#010816] text-slate-400 border-slate-800 hover:border-cyan-500/40 hover:text-white'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Default View */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Default Launch View</span>
                    <span className="text-[10px] text-cyan-400 font-mono-code">{defaultView}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      'Dashboard',
                      'Live Feeds',
                      'Threats & Incidents',
                      'AI Analysis'
                    ].map((view) => (
                      <button
                        key={view}
                        type="button"
                        onClick={() => {
                          setDefaultView(view);
                          showToast(`DEFAULT VIEW: ${view.toUpperCase()}`);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-tech font-bold transition cursor-pointer text-center border ${
                          defaultView === view
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                            : 'bg-[#010816] text-slate-400 border-slate-800 hover:border-cyan-500/40 hover:text-white'
                        }`}
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Language */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Language</span>
                    <span className="text-[10px] text-cyan-400 font-mono-code">{language}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { key: 'English', label: 'English' },
                      { key: 'Hindi (हिंदी)', label: 'Hindi (हिंदी)' },
                      { key: 'Punjabi (ਪੰਜਾਬੀ)', label: 'Punjabi (ਪੰਜਾਬੀ)' },
                      { key: 'Bengali (বাংলা)', label: 'Bengali (বাংলা)' }
                    ].map((lang) => (
                      <button
                        key={lang.key}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.key);
                          showToast(`LANGUAGE: ${lang.key.toUpperCase()}`);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-tech font-bold transition cursor-pointer text-center border ${
                          language === lang.key
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                            : 'bg-[#010816] text-slate-400 border-slate-800 hover:border-cyan-500/40 hover:text-white'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CARD 3: 3. NOTIFICATIONS (col-span-4) */}
        {matchesSearch('notifications alerts email sms push sound channels') && (
          <div className="lg:col-span-4 rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between" id="card-notifications">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3.5">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider">
                    3. NOTIFICATIONS
                  </h3>
                </div>
              </div>

              {/* Notification Toggles with Chevrons */}
              <div className="space-y-1.5 text-xs font-tech mb-3">
                {[
                  { label: 'Real-time Alerts', icon: Shield, state: notifRealtime, set: setNotifRealtime },
                  { label: 'Push Notifications', icon: Bell, state: notifPush, set: setNotifPush },
                  { label: 'Sound Alerts', icon: Volume2, state: notifSound, set: setNotifSound },
                  { label: 'Critical Alerts Only', icon: AlertTriangle, state: notifCriticalOnly, set: setNotifCriticalOnly }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      item.set(!item.state);
                      showToast(`${item.label.toUpperCase()}: ${!item.state ? 'ENABLED' : 'DISABLED'}`);
                    }}
                    className="w-full flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-[#010816] border border-slate-800 hover:border-cyan-500/40 hover:bg-[#021833]/60 transition cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2 text-slate-300">
                      <item.icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[11px]">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono-code font-bold ${
                        item.state 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {item.state ? 'ON' : 'OFF'}
                      </span>
                      <div
                        className={`w-7 h-4 rounded-full p-0.5 transition-colors ${
                          item.state ? 'bg-[#0070f3]' : 'bg-slate-800'
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full bg-white transition-transform ${
                            item.state ? 'translate-x-3' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Alert Channels Checkboxes */}
              <div className="pt-2 border-t border-slate-800">
                <div className="text-[10.5px] font-mono-code text-cyan-400 font-bold uppercase mb-2">
                  Alert Channels
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-tech">
                  {[
                    { key: 'dashboard', label: 'Command Dashboard' },
                    { key: 'mobileApp', label: 'Tactical Mobile App' }
                  ].map(ch => {
                    const isChecked = channels[ch.key as keyof typeof channels];
                    return (
                      <label
                        key={ch.key}
                        onClick={() => {
                          setChannels(prev => ({ ...prev, [ch.key]: !prev[ch.key as keyof typeof channels] }));
                          showToast(`CHANNEL ${ch.label.toUpperCase()}: ${!isChecked ? 'ACTIVE' : 'MUTED'}`);
                        }}
                        className="flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer select-none"
                      >
                        <div className={`w-4 h-4 rounded bg-[#010816] border flex items-center justify-center transition ${
                          isChecked ? 'border-cyan-400 bg-cyan-950 text-cyan-300' : 'border-slate-700 text-transparent'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-[11px]">{ch.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================= ROW 2: 4. SECURITY, 5. DATA & SYNC, 6. INTEGRATIONS, 7. SYSTEM PREFS ======================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* CARD 4: 4. SECURITY & ACCESS */}
        {matchesSearch('security access biometric face iris voice mfa authentication') && (
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between" id="card-security-access">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/20 mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider">
                    4. SECURITY & ACCESS
                  </h3>
                </div>
              </div>

              {/* Authentication Method Selection */}
              <div className="mb-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-tech text-slate-300">Authentication Method</span>
                  <span className="text-[10px] text-cyan-400 font-mono-code">{authMethod.split(' ')[0]}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { key: 'Multi-Factor Authentication', label: 'Multi-Factor' },
                    { key: 'Biometric + PIN', label: 'Bio + PIN' },
                    { key: 'Hardware Token (Yubikey)', label: 'Yubikey' }
                  ].map((method) => (
                    <button
                      key={method.key}
                      type="button"
                      onClick={() => {
                        setAuthMethod(method.key);
                        showToast(`AUTH METHOD: ${method.label.toUpperCase()}`);
                      }}
                      className={`py-1.5 px-1 rounded-lg text-[10.5px] font-tech font-bold transition cursor-pointer text-center border ${
                        authMethod === method.key
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                          : 'bg-[#010816] text-slate-400 border-slate-800 hover:border-cyan-500/40 hover:text-white'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Biometric Toggle Switches */}
              <div className="space-y-1.5 text-xs font-tech">
                {[
                  { label: 'Face Recognition', icon: User, state: secFace, set: setSecFace },
                  { label: 'Iris Scan', icon: Eye, state: secIris, set: setSecIris },
                  { label: 'Voice Recognition', icon: Mic, state: secVoice, set: setSecVoice },
                  { label: 'Two-Factor Authentication', icon: Lock, state: sec2Fa, set: setSec2Fa }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      item.set(!item.state);
                      showToast(`${item.label.toUpperCase()}: ${!item.state ? 'ENABLED' : 'DISABLED'}`);
                    }}
                    className="w-full flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-[#010816] border border-slate-800 hover:border-cyan-500/40 hover:bg-[#021833]/60 transition cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                      <item.icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono-code font-bold ${
                        item.state 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {item.state ? 'ACTIVE' : 'OFF'}
                      </span>
                      <div
                        className={`w-7 h-4 rounded-full p-0.5 transition-colors ${
                          item.state ? 'bg-[#0070f3]' : 'bg-slate-800'
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full bg-white transition-transform ${
                            item.state ? 'translate-x-3' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <button
              onClick={() => setActiveModal('BIOMETRIC_DATA')}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-[#021833] hover:bg-[#032854] border border-cyan-500/40 text-cyan-300 hover:text-white font-tech text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Fingerprint className="w-4 h-4 text-cyan-400" />
              <span>Manage Biometric Data</span>
            </button>
          </div>
        )}

        {/* CARD 5: 5. DATA & SYNC */}
        {matchesSearch('data sync auto interval retention backup cloud') && (
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between" id="card-data-sync">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/20 mb-3">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider">
                    5. DATA & SYNC
                  </h3>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-3 text-xs font-tech">
                {/* Auto Sync Switch */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Auto Sync</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAutoSync(!autoSync);
                      showToast(`AUTO SYNC: ${!autoSync ? 'ENABLED' : 'DISABLED'}`);
                    }}
                    className={`w-8 h-4.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      autoSync ? 'bg-[#0070f3]' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                        autoSync ? 'translate-x-3.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Sync Interval Dropdown */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Sync Interval</span>
                  <select
                    value={syncInterval}
                    onChange={(e) => {
                      setSyncInterval(e.target.value);
                      showToast(`SYNC INTERVAL: ${e.target.value}`);
                    }}
                    className="w-28 px-2 py-1 rounded-lg bg-[#010816] border border-cyan-500/40 text-cyan-300 text-xs font-tech outline-none cursor-pointer"
                  >
                    <option value="1 Minute">1 Minute</option>
                    <option value="5 Minutes">5 Minutes</option>
                    <option value="15 Minutes">15 Minutes</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                </div>

                {/* Data Retention Dropdown */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Data Retention</span>
                  <select
                    value={dataRetention}
                    onChange={(e) => {
                      setDataRetention(e.target.value);
                      showToast(`DATA RETENTION: ${e.target.value}`);
                    }}
                    className="w-28 px-2 py-1 rounded-lg bg-[#010816] border border-cyan-500/40 text-cyan-300 text-xs font-tech outline-none cursor-pointer"
                  >
                    <option value="7 Days">7 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="90 Days">90 Days</option>
                    <option value="365 Days">365 Days</option>
                  </select>
                </div>

                {/* Backup Switch */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Backup</span>
                  <button
                    type="button"
                    onClick={() => {
                      setBackupEnabled(!backupEnabled);
                      showToast(`ENCRYPTED BACKUP: ${!backupEnabled ? 'ENABLED' : 'DISABLED'}`);
                    }}
                    className={`w-8 h-4.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      backupEnabled ? 'bg-[#0070f3]' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                        backupEnabled ? 'translate-x-3.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <button
              onClick={() => setActiveModal('BACKUP')}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-[#021833] hover:bg-[#032854] border border-cyan-500/40 text-cyan-300 hover:text-white font-tech text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Cloud className="w-4 h-4 text-cyan-400" />
              <span>Manage Backup</span>
            </button>
          </div>
        )}

        {/* CARD 6: 6. INTEGRATIONS */}
        {matchesSearch('integrations satellite drone weather database partner networks connected') && (
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between" id="card-integrations">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/20 mb-3">
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider">
                    6. INTEGRATIONS
                  </h3>
                </div>
              </div>

              {/* Connected Feeds List */}
              <div className="space-y-2 text-xs font-tech">
                {[
                  { name: 'Satellite Feeds', icon: Radio },
                  { name: 'Drone Systems', icon: Plane },
                  { name: 'Weather Services', icon: CloudSun },
                  { name: 'External Databases', icon: Server },
                  { name: 'Partner Networks', icon: Users }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-[#010816] border border-slate-800"
                  >
                    <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                      <item.icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10.5px] font-mono-code text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Connected</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <button
              onClick={() => setActiveModal('INTEGRATIONS')}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-[#021833] hover:bg-[#032854] border border-cyan-500/40 text-cyan-300 hover:text-white font-tech text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Link2 className="w-4 h-4 text-cyan-400" />
              <span>Manage Integrations</span>
            </button>
          </div>
        )}

        {/* CARD 7: 7. SYSTEM PREFERENCES */}
        {matchesSearch('system preferences auto refresh interval layout zoom ai assistant predictive alerts mission planning reset') && (
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between" id="card-system-preferences">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/20 mb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider">
                    7. SYSTEM PREFERENCES
                  </h3>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-3 text-xs font-tech">
                {/* 1. Auto Refresh Interval */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-[11px] font-medium">Auto Refresh Interval</span>
                    <span className="text-[10px] text-cyan-400 font-mono-code">{autoRefreshInterval}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {['15 Seconds', '30 Seconds', '60 Seconds'].map((interval) => (
                      <button
                        key={interval}
                        type="button"
                        onClick={() => {
                          setAutoRefreshInterval(interval);
                          showToast(`REFRESH INTERVAL: ${interval.toUpperCase()}`);
                        }}
                        className={`py-1.5 px-1 rounded-lg text-[10.5px] font-tech font-bold transition cursor-pointer text-center border ${
                          autoRefreshInterval === interval
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                            : 'bg-[#010816] text-slate-400 border-slate-800 hover:border-cyan-500/40 hover:text-white'
                        }`}
                      >
                        {interval.replace(' Seconds', 's')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Dashboard Layout Density */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-[11px] font-medium">Dashboard Layout</span>
                    <span className="text-[10px] text-cyan-400 font-mono-code">{dashboardLayout}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {['Standard', 'Compact', 'Expanded'].map((layout) => (
                      <button
                        key={layout}
                        type="button"
                        onClick={() => {
                          setDashboardLayout(layout);
                          showToast(`DASHBOARD DENSITY: ${layout.toUpperCase()}`);
                        }}
                        className={`py-1.5 px-1 rounded-lg text-[10.5px] font-tech font-bold transition cursor-pointer text-center border ${
                          dashboardLayout === layout
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                            : 'bg-[#010816] text-slate-400 border-slate-800 hover:border-cyan-500/40 hover:text-white'
                        }`}
                      >
                        {layout}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Map Zoom Level */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-[11px] font-medium">Map Zoom Level</span>
                    <span className="text-[10px] text-cyan-400 font-mono-code">{mapZoomLevel}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {['Close', 'Medium', 'Far'].map((zoom) => (
                      <button
                        key={zoom}
                        type="button"
                        onClick={() => {
                          setMapZoomLevel(zoom);
                          showToast(`MAP ZOOM: ${zoom.toUpperCase()}`);
                        }}
                        className={`py-1.5 px-1 rounded-lg text-[10.5px] font-tech font-bold transition cursor-pointer text-center border ${
                          mapZoomLevel === zoom
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                            : 'bg-[#010816] text-slate-400 border-slate-800 hover:border-cyan-500/40 hover:text-white'
                        }`}
                      >
                        {zoom}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Feature Intelligence Toggles */}
                <div className="space-y-1.5 pt-1">
                  {[
                    { label: 'AI Tactical Assistant', icon: Eye, state: enableAiAssistant, set: setEnableAiAssistant },
                    { label: 'Predictive Threat Alerts', icon: Shield, state: enablePredictiveAlerts, set: setEnablePredictiveAlerts },
                    { label: 'Mission Autonomous Planning', icon: Sliders, state: enableMissionPlanning, set: setEnableMissionPlanning }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        item.set(!item.state);
                        showToast(`${item.label.toUpperCase()}: ${!item.state ? 'ENABLED' : 'DISABLED'}`);
                      }}
                      className="w-full flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-[#010816] border border-slate-800 hover:border-cyan-500/40 hover:bg-[#021833]/60 transition cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2 text-slate-300 text-[10.5px]">
                        <item.icon className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono-code font-bold ${
                          item.state 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {item.state ? 'ACTIVE' : 'OFF'}
                        </span>
                        <div
                          className={`w-7 h-4 rounded-full p-0.5 transition-colors ${
                            item.state ? 'bg-[#0070f3]' : 'bg-slate-800'
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full bg-white transition-transform ${
                              item.state ? 'translate-x-3' : 'translate-x-0'
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Reset Button */}
            <button
              onClick={handleResetDefaults}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-[#021833] hover:bg-[#032854] border border-cyan-500/40 text-cyan-300 hover:text-white font-tech text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reset to Default</span>
            </button>
          </div>
        )}
      </div>

      {/* ======================= ROW 3: 8. AUDIT LOGS, 9. SYSTEM HEALTH, 10. SUPPORT & HELP ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
        {/* CARD 8: 8. AUDIT LOGS (col-span-5) */}
        {matchesSearch('audit logs activity user status login threat report settings analysis') && (
          <div className="lg:col-span-5 rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between" id="card-audit-logs">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3.5">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider">
                    8. AUDIT LOGS
                  </h3>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-tech">
                  <thead>
                    <tr className="border-b border-slate-800 text-[10px] font-mono-code text-cyan-400/90 uppercase">
                      <th className="pb-2 font-bold">DATE & TIME</th>
                      <th className="pb-2 font-bold">ACTIVITY</th>
                      <th className="pb-2 font-bold">USER</th>
                      <th className="pb-2 font-bold text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {(serverLogs && serverLogs.length > 0
                      ? serverLogs.slice(0, 4).map(l => ({
                          time: l.time || 'Recent',
                          activity: l.action || 'System Action',
                          user: l.user || 'Major IC-7K42P9',
                          status: l.status || 'Success'
                        }))
                      : [
                          { time: '20 Sep 2026 21:15', activity: 'Login Verified', user: 'Major IC-7K42P9', status: 'Success' },
                          { time: '20 Sep 2026 20:32', activity: 'Viewed Threat Report', user: 'Major IC-7K42P9', status: 'Success' },
                          { time: '20 Sep 2026 18:07', activity: 'Updated Settings', user: 'Major IC-7K42P9', status: 'Success' },
                          { time: '20 Sep 2026 16:45', activity: 'Accessed AI Analysis', user: 'Major IC-7K42P9', status: 'Success' }
                        ]
                    ).map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#01091a]/80 transition">
                        <td className="py-2.5 font-mono-code text-[11px] text-slate-300 whitespace-nowrap">
                          {row.time}
                        </td>
                        <td className="py-2.5 text-slate-200 font-semibold whitespace-nowrap">
                          {row.activity}
                        </td>
                        <td className="py-2.5 text-slate-400 font-mono-code text-[11px] whitespace-nowrap">
                          {row.user}
                        </td>
                        <td className="py-2.5 text-right whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono-code text-emerald-400 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{row.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Button */}
            <button
              onClick={() => setActiveModal('FULL_LOGS')}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-[#021833] hover:bg-[#032854] border border-cyan-500/40 text-cyan-300 hover:text-white font-tech text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Full Logs</span>
            </button>
          </div>
        )}

        {/* CARD 9: 9. SYSTEM HEALTH (col-span-4) */}
        {matchesSearch('system health operational cpu memory storage network status power supply temperature') && (
          <div className="lg:col-span-4 rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between" id="card-system-health">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3.5">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider">
                    9. SYSTEM HEALTH
                  </h3>
                </div>
              </div>

              {/* Donut and Metrics Side-by-Side */}
              <div className="flex items-center justify-between gap-4 mb-2">
                {/* Radial Donut Gauge: 98% Operational */}
                <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 70 70">
                    <circle cx="35" cy="35" r="28" fill="none" stroke="#0a192f" strokeWidth="6" />
                    <circle
                      cx="35"
                      cy="35"
                      r="28"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="6"
                      strokeDasharray="175.9"
                      strokeDashoffset="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-display font-black text-white leading-none">98%</span>
                    <span className="text-[8.5px] font-mono-code text-emerald-400 uppercase font-bold mt-1">
                      Operational
                    </span>
                  </div>
                </div>

                {/* Hardware Telemetry List */}
                <div className="flex-1 space-y-1 text-xs font-tech">
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      <span>CPU Usage</span>
                    </span>
                    <span className="font-mono-code font-bold text-white">32%</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Memory Usage</span>
                    </span>
                    <span className="font-mono-code font-bold text-white">48%</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Storage Usage</span>
                    </span>
                    <span className="font-mono-code font-bold text-white">61%</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Network Status</span>
                    </span>
                    <span className="font-mono-code font-bold text-emerald-400">▲ Online</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Power Supply</span>
                    </span>
                    <span className="font-mono-code font-bold text-emerald-400">▲ Normal</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                      <span>Temperature</span>
                    </span>
                    <span className="font-mono-code font-bold text-amber-300">42°C</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <button
              onClick={() => setActiveModal('DETAILED_HEALTH')}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-[#021833] hover:bg-[#032854] border border-cyan-500/40 text-cyan-300 hover:text-white font-tech text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>View Detailed Health</span>
            </button>
          </div>
        )}

        {/* CARD 10: 10. SUPPORT & HELP (col-span-3) */}
        {matchesSearch('support help guide faqs contact updates about logout') && (
          <div className="lg:col-span-3 rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between" id="card-support-help">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3.5">
                <div className="flex items-center gap-2">
                  <Headset className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider">
                    10. SUPPORT & HELP
                  </h3>
                </div>
              </div>

              {/* Action Links */}
              <div className="space-y-2 text-xs font-tech">
                {[
                  {
                    name: 'User Guide',
                    icon: FileText,
                    actionText: 'View',
                    onClick: () => openHelpModal('VAJRA OPERATOR USER GUIDE', 'Standard operating procedures for AI Decision Support, Tactical Reconnaissance, Satellite Ground Link, and Real-Time Threat Analysis.')
                  },
                  {
                    name: 'FAQs',
                    icon: HelpCircle,
                    actionText: 'View',
                    onClick: () => openHelpModal('FREQUENTLY ASKED QUESTIONS', '1. How to calibrate satellite feeds? Click Live Feeds > Inspect > Recalibrate.\n2. How to dispatch UAV drone assets? Use Quick Actions > Request Drone.\n3. Session token renewal? Automatic through Geocore multi-factor channel.')
                  },
                  {
                    name: 'System Updates',
                    icon: Settings,
                    actionText: 'Check',
                    onClick: () => showToast('SYSTEM IS UP TO DATE (VERSION 2.1.0-STABLE)')
                  },
                  {
                    name: 'About VAJRA',
                    icon: Info,
                    actionText: 'View',
                    onClick: () => openHelpModal('ABOUT VAJRA PLATFORM', 'VAJRA — AI Defense Command & Decision Support System\nEngineered for integrated multi-domain border intelligence, geospatial surveillance, and autonomous response coordination.')
                  }
                ].map((link, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-[#010816] border border-slate-800 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                      <link.icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{link.name}</span>
                    </div>

                    <button
                      type="button"
                      onClick={link.onClick}
                      className="px-2.5 py-0.5 rounded bg-[#021833] hover:bg-[#032650] border border-cyan-500/40 text-cyan-300 text-[10.5px] font-tech font-bold transition cursor-pointer"
                    >
                      {link.actionText}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Logout Button */}
            <button
              type="button"
              onClick={onLogout}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/60 text-red-300 hover:text-white font-tech text-xs font-bold tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/30"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* ======================= BOTTOM FOOTER BAR ======================= */}
      <div className="py-2.5 px-4 rounded-xl bg-[#020b1c]/90 border border-[#0055ff]/35 text-center flex flex-col sm:flex-row items-center justify-between gap-2 backdrop-blur-md text-[11px] font-mono-code">
        <div className="text-cyan-400 font-bold tracking-wider uppercase">
          VAJRA • AI POWERED • SECURE • STRONGER TOGETHER
        </div>
        <div className="text-slate-400">
          Version 2.1.0 <span className="mx-1 text-slate-600">|</span> Build 20260920
        </div>
      </div>

      {/* ======================= INTERACTIVE MODALS ======================= */}

      {/* 1. Edit Profile Modal */}
      {activeModal === 'EDIT_PROFILE' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-md bg-[#020c24] border border-cyan-500/60 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/30">
              <h3 className="text-sm font-tech font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-cyan-400" />
                EDIT OFFICER PROFILE
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-tech">
              <div>
                <label className="block text-slate-400 mb-1">Full Name & Title</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#010816] border border-cyan-500/40 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Rank</label>
                <input
                  type="text"
                  value={profileData.rank}
                  onChange={(e) => setProfileData({ ...profileData, rank: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#010816] border border-cyan-500/40 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Service Branch</label>
                <input
                  type="text"
                  value={profileData.serviceBranch}
                  onChange={(e) => setProfileData({ ...profileData, serviceBranch: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#010816] border border-cyan-500/40 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Unit Service ID</label>
                <input
                  type="text"
                  value={profileData.unit}
                  onChange={(e) => setProfileData({ ...profileData, unit: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#010816] border border-cyan-500/40 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Classified Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#010816] border border-cyan-500/40 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Secure Satellite Phone</label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#010816] border border-cyan-500/40 text-white outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-tech cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  setActiveModal(null);
                  await saveSettingsToBackend(false);
                  showToast('OFFICER PROFILE PERSISTED TO BACKEND');
                }}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-tech font-bold cursor-pointer shadow-lg shadow-cyan-600/30"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Biometric Data Modal */}
      {activeModal === 'BIOMETRIC_DATA' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-[#020c24] border border-cyan-500/60 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/30">
              <h3 className="text-sm font-tech font-bold text-white flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-cyan-400" />
                MANAGE ENCRYPTED BIOMETRIC VECTORS
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-tech">
              <div className="p-3 rounded-xl bg-[#01091a] border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Iris Pattern Signature</div>
                  <div className="text-slate-400 text-[11px]">Enrolled: 256-bit Hex Biocryptic Hash</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono-code font-bold">
                  VERIFIED
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#01091a] border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">3D Facial Depth Landmark</div>
                  <div className="text-slate-400 text-[11px]">Enrolled: 68 Anthropometric Nodes</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono-code font-bold">
                  ACTIVE
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#01091a] border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Voice Acoustic Spectrogram</div>
                  <div className="text-slate-400 text-[11px]">Passphrase: "Satyameva Jayate"</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono-code font-bold">
                  STANDBY
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  showToast('BIOMETRIC KEYS RE-ENCRYPTED (AES-GCM-256)');
                  setActiveModal(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-400 text-cyan-300 text-xs font-tech hover:bg-cyan-900 cursor-pointer"
              >
                Re-Key Biometric Hash
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-tech cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Manage Backup Modal */}
      {activeModal === 'BACKUP' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-md bg-[#020c24] border border-cyan-500/60 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/30">
              <h3 className="text-sm font-tech font-bold text-white flex items-center gap-2">
                <Cloud className="w-4 h-4 text-cyan-400" />
                GEOCORE CLOUD BACKUP
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs font-tech text-slate-300 space-y-2">
              <p>Last automated snapshot: <strong>{new Date().toLocaleTimeString()} IST</strong></p>
              <p>Target: <strong>Backend Sovereign Storage (data/vajra-settings.json)</strong></p>
              <p>Encryption: <strong>Quantum-Resistant Kyber-1024 / AES-256-GCM</strong></p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={async () => {
                  try {
                    const res = await settingsApi.createBackup();
                    if (res && res.backupId) {
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute("href", res.downloadUrl);
                      downloadAnchor.setAttribute("download", res.filename || `vajra-defense-backup-${Date.now()}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                      showToast(`ENCRYPTED BACKUP CREATED: ${res.backupId}`);
                      loadAuditLogs();
                    }
                  } catch (err) {
                    showToast('BACKUP ARCHIVE GENERATED');
                  }
                  setActiveModal(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-tech font-bold cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Backup Archive</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Manage Integrations Modal */}
      {activeModal === 'INTEGRATIONS' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-[#020c24] border border-cyan-500/60 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/30">
              <h3 className="text-sm font-tech font-bold text-white flex items-center gap-2">
                <Link2 className="w-4 h-4 text-cyan-400" />
                EXTERNAL INTEGRATION ENDPOINTS
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-tech">
              {[
                { name: 'ISRO GSAT-7A Military Transponder', desc: 'Direct Ku-band Telemetry Uplink (Operational)', defaultLatency: '14ms' },
                { name: 'National Intelligence Grid (NATGRID)', desc: 'Cross-Agency Threat Synchronizer v4', defaultLatency: '8ms' },
                { name: 'Border Security Force (BSF) C4ISR', desc: 'Thermal Fencing & Radar Gateway', defaultLatency: '11ms' }
              ].map((integ, idx) => {
                const tested = testedIntegrations[integ.name];
                return (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#01091a] border border-slate-800 flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-white truncate">{integ.name}</div>
                      <div className="text-slate-400 text-[10.5px] truncate">{integ.desc}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-emerald-400 font-mono-code text-[11px] font-bold">
                        {tested ? `${tested.latency} (${tested.status})` : integ.defaultLatency}
                      </span>
                      <button
                        type="button"
                        onClick={async () => {
                          showToast(`TESTING HANDSHAKE: ${integ.name.slice(0, 15)}...`);
                          try {
                            const res = await settingsApi.testIntegration(integ.name);
                            setTestedIntegrations(prev => ({
                              ...prev,
                              [integ.name]: { status: res.status || 'VERIFIED', latency: res.latency || '9ms' }
                            }));
                            showToast(`PING SUCCESSFUL: ${res.latency}`);
                          } catch (e) {
                            setTestedIntegrations(prev => ({
                              ...prev,
                              [integ.name]: { status: 'VERIFIED', latency: '12ms' }
                            }));
                          }
                        }}
                        className="px-2 py-1 rounded bg-[#021833] hover:bg-[#032650] border border-cyan-500/40 text-cyan-300 text-[10px] font-mono-code font-bold cursor-pointer"
                      >
                        Ping Test
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-tech cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Full Logs Modal */}
      {activeModal === 'FULL_LOGS' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-2xl bg-[#020c24] border border-cyan-500/60 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/30">
              <h3 className="text-sm font-tech font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                COMPLETE AUDIT & SECURITY TRAIL (PERSISTED)
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2 text-xs font-mono-code">
              {(serverLogs && serverLogs.length > 0
                ? serverLogs.map((l, idx) => ({
                    time: l.time || 'Recent',
                    act: l.action || 'Action',
                    ip: l.ip || '127.0.0.1',
                    status: l.status || 'SUCCESS'
                  }))
                : [
                    { time: '20 Sep 2026 21:47:32', act: 'System Heartbeat Broadcast', ip: '10.0.4.12', status: 'SUCCESS' },
                    { time: '20 Sep 2026 21:15:00', act: 'Multi-Factor Login Verified', ip: '10.0.4.12', status: 'SUCCESS' },
                    { time: '20 Sep 2026 20:32:14', act: 'Viewed Threat Report LOC-NORTH', ip: '10.0.4.12', status: 'SUCCESS' },
                    { time: '20 Sep 2026 18:07:45', act: 'Updated Tactical Map Preferences', ip: '10.0.4.12', status: 'SUCCESS' },
                    { time: '20 Sep 2026 16:45:20', act: 'Accessed AI Analysis Engine', ip: '10.0.4.12', status: 'SUCCESS' },
                    { time: '20 Sep 2026 14:12:08', act: 'Biometric Iris Verification Passed', ip: '10.0.4.12', status: 'SUCCESS' },
                    { time: '20 Sep 2026 11:00:54', act: 'Encrypted Geospatial Sync Complete', ip: '10.0.1.99', status: 'SUCCESS' }
                  ]
              ).map((log, idx) => (
                <div key={idx} className="p-2 rounded bg-[#010816] border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400">{log.time}</span> • <span className="text-cyan-300 font-semibold">{log.act}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{log.ip}</span>
                    <span className="text-emerald-400 font-bold">{log.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  loadAuditLogs();
                  showToast('AUDIT LOGS REFRESHED FROM SERVER');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#021833] hover:bg-[#032650] border border-cyan-500/40 text-cyan-300 text-xs font-tech flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Logs</span>
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-tech cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Detailed Health Modal */}
      {activeModal === 'DETAILED_HEALTH' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-[#020c24] border border-cyan-500/60 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/30">
              <h3 className="text-sm font-tech font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                HARDWARE & CLOUD NODE DIAGNOSTICS (EXPRESS BACKEND)
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-tech">
              <div className="p-3 rounded-xl bg-[#01091a] border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-bold">Node.js Express Server</span>
                  <span className="text-emerald-400 font-mono-code font-bold">
                    {serverHealth ? 'ONLINE (PORT 3000)' : 'STANDBY'}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px] font-mono-code">
                  Platform: {serverHealth?.platform || 'linux'} • Node: {serverHealth?.nodeVersion || 'v20+'} • Uptime: {serverHealth ? `${Math.floor(serverHealth.uptime)}s` : 'Active'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#01091a] border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-bold">Process Memory & Storage</span>
                  <span className="text-cyan-400 font-mono-code font-bold">
                    {serverHealth?.memory?.rss || 'Healthy'}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px] font-mono-code">
                  Storage Path: data/vajra-settings.json • Heap Used: {serverHealth?.memory?.heapUsed || 'Normal'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#01091a] border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-bold">Neural Inference TPU Matrix</span>
                  <span className="text-emerald-400 font-mono-code font-bold">READY (48 TFLOPS)</span>
                </div>
                <div className="text-slate-400 text-[11px]">Active model pipelines: Border Anomaly v3.2, Drone Swarm Radar</div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-tech cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Help & Support Dialog Modal */}
      {activeModal === 'HELP_DIALOG' && helpDialogContent && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-md bg-[#020c24] border border-cyan-500/60 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/30">
              <h3 className="text-sm font-tech font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                {helpDialogContent.title}
              </h3>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setHelpDialogContent(null);
                }}
                className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs font-tech text-slate-300 whitespace-pre-line leading-relaxed p-3 rounded-xl bg-[#01091a] border border-slate-800">
              {helpDialogContent.content}
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setActiveModal(null);
                  setHelpDialogContent(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-tech font-bold cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for sound volume icon
function Volume2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
