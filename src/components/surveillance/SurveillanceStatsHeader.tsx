import React from 'react';
import { 
  Camera, 
  UserCheck, 
  Truck, 
  AlertTriangle, 
  Scan, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  ShieldCheck, 
  Cpu 
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

interface SurveillanceStatsHeaderProps {
  isOnline: boolean;
  onToggleOnline: () => void;
  pendingSyncCount: number;
  onTriggerSync: () => void;
  isSyncing: boolean;
  activeSubTab: string;
  onSelectSubTab: (tab: any) => void;
}

export const SurveillanceStatsHeader: React.FC<SurveillanceStatsHeaderProps> = ({
  isOnline,
  onToggleOnline,
  pendingSyncCount,
  onTriggerSync,
  isSyncing,
  activeSubTab,
  onSelectSubTab
}) => {
  const { theme } = useSettings();
  const isLight = theme === 'Light';

  const stats = [
    {
      id: 'cameras',
      label: 'Cameras',
      value: '24',
      sub: 'Online',
      statusColor: 'text-emerald-400',
      bgColor: isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300',
      icon: Camera,
      tab: 'CCTV_MONITORING'
    },
    {
      id: 'persons',
      label: 'Persons',
      value: '17',
      sub: 'Tracked',
      statusColor: 'text-cyan-400',
      bgColor: isLight ? 'bg-cyan-50 border-cyan-200 text-cyan-900' : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300',
      icon: UserCheck,
      tab: 'AI_DETECTION'
    },
    {
      id: 'vehicles',
      label: 'Vehicles',
      value: '08',
      sub: 'Detected',
      statusColor: 'text-blue-400',
      bgColor: isLight ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-blue-950/40 border-blue-500/40 text-blue-300',
      icon: Truck,
      tab: 'AI_DETECTION'
    },
    {
      id: 'alerts',
      label: 'Alerts',
      value: '03',
      sub: 'Active',
      statusColor: 'text-red-400',
      bgColor: isLight ? 'bg-red-50 border-red-200 text-red-900' : 'bg-red-950/40 border-red-500/40 text-red-300',
      icon: AlertTriangle,
      tab: 'ALERTS',
      pulse: true
    },
    {
      id: 'anpr',
      label: 'ANPR',
      value: '05',
      sub: 'Matches',
      statusColor: 'text-amber-400',
      bgColor: isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-950/40 border-amber-500/40 text-amber-300',
      icon: Scan,
      tab: 'AI_DETECTION'
    }
  ];

  return (
    <div className="w-full space-y-3">
      {/* Top Banner: Module Title & Edge Connection Status */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border backdrop-blur-md ${
        isLight 
          ? 'bg-white border-slate-300 shadow-sm text-slate-900' 
          : 'bg-[#020b1c]/90 border-cyan-500/40 shadow-lg text-white'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border flex items-center justify-center ${
            isLight ? 'bg-cyan-50 border-cyan-300 text-cyan-700' : 'bg-cyan-950/80 border-cyan-400/60 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
          }`}>
            <Camera className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black font-serif tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                INTELLIGENT SURVEILLANCE
              </h1>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase tracking-wider ${
                isOnline 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}>
                {isOnline ? 'ONLINE • CENTRAL SYNC' : 'OFFLINE • EDGE STANDALONE'}
              </span>
            </div>
            <p className={`text-xs font-mono-code ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-300'}`}>
              High-Definition Video Ingestion • Edge AI Analytics • Automated Threat Classification • Multi-Camera Tracking
            </p>
          </div>
        </div>

        {/* Tactical Edge Connectivity & Synchronization Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle Online / Offline */}
          <button
            onClick={onToggleOnline}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono-code font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm ${
              isOnline
                ? isLight 
                  ? 'bg-emerald-100 hover:bg-emerald-200 border-emerald-300 text-emerald-900' 
                  : 'bg-emerald-950/70 hover:bg-emerald-900/80 border-emerald-500/50 text-emerald-300'
                : isLight
                  ? 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-900'
                  : 'bg-amber-950/70 hover:bg-amber-900/80 border-amber-500/50 text-amber-300'
            }`}
            title="Toggle WAN / Central network connectivity simulation"
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>WAN CONNECTED</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFLINE MODE</span>
              </>
            )}
          </button>

          {/* Sync Manager Button */}
          <button
            onClick={onTriggerSync}
            disabled={isSyncing || (!isOnline && pendingSyncCount > 0)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono-code font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm ${
              isSyncing
                ? 'bg-cyan-600 text-white border-cyan-400 cursor-wait'
                : pendingSyncCount > 0
                ? isLight 
                  ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600' 
                  : 'bg-amber-600/80 hover:bg-amber-600 text-white border-amber-400'
                : isLight 
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' 
                  : 'bg-[#031533] hover:bg-[#052252] border-cyan-500/40 text-cyan-300'
            }`}
            title="Synchronize local offline event queue with Central Command"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>
              {isSyncing 
                ? 'SYNCING...' 
                : pendingSyncCount > 0 
                ? `SYNC QUEUE (${pendingSyncCount})` 
                : 'SYNCHRONIZED'}
            </span>
          </button>
        </div>
      </div>

      {/* Top 5 Statistics KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {stats.map(st => {
          const Icon = st.icon;
          const isSelected = activeSubTab === st.tab;

          return (
            <button
              key={st.id}
              onClick={() => onSelectSubTab(st.tab)}
              className={`p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer group ${
                isSelected
                  ? 'ring-2 ring-cyan-400 border-cyan-400 shadow-md scale-[1.01]'
                  : ''
              } ${st.bgColor}`}
            >
              <div>
                <div className="text-[11px] font-mono-code font-bold tracking-wider uppercase opacity-80">
                  {st.label}
                </div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-2xl font-black font-tech leading-none">
                    {st.value}
                  </span>
                  <span className={`text-[11px] font-mono-code font-bold uppercase ${st.statusColor}`}>
                    {st.sub}
                  </span>
                </div>
              </div>
              <div className={`p-2 rounded-lg border flex items-center justify-center shrink-0 ${
                isLight ? 'bg-white/80 border-slate-200' : 'bg-black/40 border-white/10'
              }`}>
                <Icon className={`w-4 h-4 ${st.statusColor} ${st.pulse ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'}`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
