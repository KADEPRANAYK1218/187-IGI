import React, { useState } from 'react';
import { 
  Camera, 
  Cpu, 
  AlertTriangle, 
  FileText, 
  Activity, 
  Wifi, 
  Film, 
  Layers, 
  BrainCircuit, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { SurveillanceSubTab, AiDetectionSubCategory } from '../../types/surveillance';
import { SurveillanceStatsHeader } from './SurveillanceStatsHeader';
import { CctvMonitoringView } from './CctvMonitoringView';
import { AiDetectionHubView } from './AiDetectionHubView';
import { SurveillanceAlertsView } from './SurveillanceAlertsView';
import { SurveillanceEventLogsView } from './SurveillanceEventLogsView';
import { SurveillanceEdgeHealthView } from './SurveillanceEdgeHealthView';
import { SurveillanceSyncView } from './SurveillanceSyncView';
import { useSettings } from '../../context/SettingsContext';

interface VajraSurveillanceViewProps {
  onNavigateHome?: () => void;
}

export const VajraSurveillanceView: React.FC<VajraSurveillanceViewProps> = () => {
  const { theme } = useSettings();
  const isLight = theme === 'Light';

  const [activeTab, setActiveTab] = useState<SurveillanceSubTab>('OVERVIEW');
  const [selectedAiCategory, setSelectedAiCategory] = useState<AiDetectionSubCategory>('HUMAN');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(2);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [targetCameraForClip, setTargetCameraForClip] = useState<string>('C-01');

  // Trigger simulated sync
  const handleTriggerSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setTimeout(() => {
      setPendingSyncCount(0);
      setIsSyncing(false);
    }, 1800);
  };

  const handleToggleOnline = () => {
    setIsOnline(prev => {
      const next = !prev;
      if (!next) {
        // If switched to offline, generate simulated pending events
        setPendingSyncCount(count => count + 2);
      }
      return next;
    });
  };

  const navTabs = [
    { id: 'OVERVIEW', label: 'Command Overview', icon: Layers },
    { id: 'CCTV_MONITORING', label: 'CCTV Surveillance', icon: Camera },
    { id: 'AI_DETECTION', label: 'AI Detection Engine', icon: BrainCircuit },
    { id: 'ALERTS', label: 'Surveillance Alerts', icon: AlertTriangle, count: '03' },
    { id: 'EVENT_LOGS', label: 'Event Logs', icon: FileText },
    { id: 'EDGE_HEALTH', label: 'System / Edge Health', icon: Cpu },
    { id: 'SYNC_STATUS', label: 'Sync & Offline Mode', icon: Wifi }
  ];

  return (
    <div className={`w-full space-y-4 font-tech transition-colors duration-200 ${
      isLight ? 'text-slate-900' : 'text-slate-100'
    }`} id="vajra-intelligent-surveillance-module">
      
      {/* 1. TOP STATISTICS HEADER */}
      <SurveillanceStatsHeader
        isOnline={isOnline}
        onToggleOnline={handleToggleOnline}
        pendingSyncCount={pendingSyncCount}
        onTriggerSync={handleTriggerSync}
        isSyncing={isSyncing}
        activeSubTab={activeTab}
        onSelectSubTab={(tab) => setActiveTab(tab)}
      />

      {/* Module Internal Navigation Bar */}
      <div className={`p-1.5 rounded-xl border flex items-center gap-1 overflow-x-auto ${
        isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#020b1c]/90 border-cyan-500/40 backdrop-blur-md'
      }`}>
        {navTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SurveillanceSubTab)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono-code font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white shadow-md border border-cyan-400/60'
                  : isLight 
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
              <span>{tab.label}</span>
              {tab.count && (
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[9px] flex items-center justify-center font-bold">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ======================= TAB CONTENT DISPLAY ======================= */}

      {/* 1. COMPLETE COMMAND OVERVIEW (Shows everything stacked as described in Section 5) */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          {/* Section: CCTV SURVEILLANCE */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold font-serif tracking-wider text-cyan-400 uppercase flex items-center gap-2">
                <Camera className="w-5 h-5 text-cyan-400" />
                <span>CCTV SURVEILLANCE (REAL VIDEO FEEDS)</span>
              </h2>
              <button
                onClick={() => setActiveTab('CCTV_MONITORING')}
                className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
              >
                EXPAND MATRIX & ARCHIVES →
              </button>
            </div>
            <CctvMonitoringView initialMode="LIVE_GRID" />
          </section>

          {/* Section: AI DETECTION */}
          <section className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold font-serif tracking-wider text-cyan-400 uppercase flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-cyan-400" />
                <span>AI DETECTION (HUMAN, VEHICLE, FACE, ANPR, VIRTUAL FENCE, SUSPICIOUS, NIGHT)</span>
              </h2>
              <button
                onClick={() => setActiveTab('AI_DETECTION')}
                className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
              >
                VIEW FULL AI SUITE →
              </button>
            </div>
            <AiDetectionHubView onSelectCameraClip={(cam) => {
              setTargetCameraForClip(cam);
              setActiveTab('CCTV_MONITORING');
            }} />
          </section>

          {/* Section: ALERTS */}
          <section className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold font-serif tracking-wider text-red-400 uppercase flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span>SURVEILLANCE ALERTS (CRITICAL / HIGH / MEDIUM)</span>
              </h2>
              <button
                onClick={() => setActiveTab('ALERTS')}
                className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
              >
                MANAGE ALL ALERTS →
              </button>
            </div>
            <SurveillanceAlertsView />
          </section>

          {/* Section: EVENT LOGS */}
          <section className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold font-serif tracking-wider text-cyan-400 uppercase flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>EVENT LOGS & SYNCHRONIZATION STATUS</span>
              </h2>
              <button
                onClick={() => setActiveTab('EVENT_LOGS')}
                className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
              >
                VIEW DETAILED AUDIT LOGS →
              </button>
            </div>
            <SurveillanceEventLogsView 
              onTriggerSync={handleTriggerSync} 
              isSyncing={isSyncing} 
            />
          </section>

          {/* Section: SYSTEM / EDGE HEALTH */}
          <section className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold font-serif tracking-wider text-cyan-400 uppercase flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>SYSTEM / EDGE HEALTH & RTSP INGESTION</span>
              </h2>
              <button
                onClick={() => setActiveTab('EDGE_HEALTH')}
                className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
              >
                VIEW CLUSTER TELEMETRY →
              </button>
            </div>
            <SurveillanceEdgeHealthView />
          </section>

          {/* Section: ONLINE / OFFLINE / SYNCHRONIZATION STATUS */}
          <section className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold font-serif tracking-wider text-emerald-400 uppercase flex items-center gap-2">
                <Wifi className="w-5 h-5 text-emerald-400" />
                <span>ONLINE / OFFLINE ARCHITECTURE & AUTOMATIC RE-SYNC</span>
              </h2>
              <button
                onClick={() => setActiveTab('SYNC_STATUS')}
                className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
              >
                INSPECT PIPELINE FLOW →
              </button>
            </div>
            <SurveillanceSyncView 
              isOnline={isOnline}
              onToggleOnline={handleToggleOnline}
              pendingSyncCount={pendingSyncCount}
              onTriggerSync={handleTriggerSync}
              isSyncing={isSyncing}
            />
          </section>
        </div>
      )}

      {/* 2. DEDICATED TAB: CCTV MONITORING */}
      {activeTab === 'CCTV_MONITORING' && (
        <CctvMonitoringView initialCameraId={targetCameraForClip} />
      )}

      {/* 3. DEDICATED TAB: AI DETECTION */}
      {activeTab === 'AI_DETECTION' && (
        <AiDetectionHubView onSelectCameraClip={(cam) => {
          setTargetCameraForClip(cam);
          setActiveTab('CCTV_MONITORING');
        }} />
      )}

      {/* 4. DEDICATED TAB: ALERTS */}
      {activeTab === 'ALERTS' && (
        <SurveillanceAlertsView />
      )}

      {/* 5. DEDICATED TAB: EVENT LOGS */}
      {activeTab === 'EVENT_LOGS' && (
        <SurveillanceEventLogsView 
          onTriggerSync={handleTriggerSync} 
          isSyncing={isSyncing} 
        />
      )}

      {/* 6. DEDICATED TAB: SYSTEM / EDGE HEALTH */}
      {activeTab === 'EDGE_HEALTH' && (
        <SurveillanceEdgeHealthView />
      )}

      {/* 7. DEDICATED TAB: SYNC & OFFLINE ARCHITECTURE */}
      {activeTab === 'SYNC_STATUS' && (
        <SurveillanceSyncView 
          isOnline={isOnline}
          onToggleOnline={handleToggleOnline}
          pendingSyncCount={pendingSyncCount}
          onTriggerSync={handleTriggerSync}
          isSyncing={isSyncing}
        />
      )}
    </div>
  );
};
