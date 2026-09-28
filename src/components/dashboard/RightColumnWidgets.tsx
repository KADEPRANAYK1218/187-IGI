import React, { useState } from 'react';
import { 
  AlertTriangle, CloudRain, ArrowRight, CheckCircle2, X
} from 'lucide-react';

// 1. RECENT INCIDENTS WIDGET
export const RecentIncidentsWidget: React.FC<{ onSelectIncident?: (incident: any) => void }> = ({ onSelectIncident }) => {
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);
  const [showAllIncidents, setShowAllIncidents] = useState(false);

  const incidents = [
    {
      id: 'inc-1',
      time: '17:32',
      title: 'Drone detected - Sector 7 (J&K)',
      severity: 'HIGH',
      badgeClass: 'bg-red-950/80 border-red-500/80 text-red-300',
      icon: AlertTriangle,
      iconClass: 'text-red-400 fill-red-500/30'
    },
    {
      id: 'inc-2',
      time: '16:48',
      title: 'Unusual movement near LOC',
      severity: 'MEDIUM',
      badgeClass: 'bg-amber-950/80 border-amber-500/80 text-amber-300',
      icon: AlertTriangle,
      iconClass: 'text-amber-400 fill-amber-500/30'
    },
    {
      id: 'inc-3',
      time: '15:22',
      title: 'Fire in Sector 4 – Tank unit',
      severity: 'MEDIUM',
      badgeClass: 'bg-amber-950/80 border-amber-500/80 text-amber-300',
      icon: AlertTriangle,
      iconClass: 'text-amber-400 fill-amber-500/30'
    },
    {
      id: 'inc-4',
      time: '14:11',
      title: 'Weather alert – Heavy Rain (J&K)',
      severity: 'INFO',
      badgeClass: 'bg-cyan-950/80 border-cyan-500/80 text-cyan-300',
      icon: CloudRain,
      iconClass: 'text-cyan-400'
    },
    {
      id: 'inc-5',
      time: '12:03',
      title: 'Border intrusion attempt (Cancelled)',
      severity: 'RESOLVED',
      badgeClass: 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300',
      icon: CheckCircle2,
      iconClass: 'text-emerald-400'
    }
  ];

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl" id="recent-incidents-widget">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
            RECENT INCIDENTS
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setShowAllIncidents(true)}
          className="text-xs font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Incident Rows */}
      <div className="space-y-1.5">
        {incidents.map(inc => {
          const Icon = inc.icon;
          return (
            <div
              key={inc.id}
              onClick={() => {
                setSelectedIncident(inc);
                onSelectIncident?.(inc);
              }}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-slate-900/40 hover:bg-cyan-950/50 border border-transparent hover:border-cyan-500/30 transition cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[11px] font-mono-code text-slate-400 font-semibold shrink-0">
                  {inc.time}
                </span>
                <Icon className={`w-3.5 h-3.5 shrink-0 ${inc.iconClass}`} />
                <span className="text-[11px] font-tech text-slate-200 truncate group-hover:text-white">
                  {inc.title}
                </span>
              </div>

              {/* Status Badge */}
              <span className={`shrink-0 ml-2 px-2 py-0.5 rounded-full border text-[9px] font-mono-code font-bold ${inc.badgeClass}`}>
                {inc.severity}
              </span>
            </div>
          );
        })}
      </div>

      {/* Incident Details Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-slate-950 border border-cyan-500/40 rounded-2xl p-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedIncident(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-xl ${selectedIncident.badgeClass}`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-tech font-bold text-white text-base">
                  {selectedIncident.title}
                </h4>
                <p className="text-xs font-mono-code text-slate-400">
                  Logged at {selectedIncident.time} • Priority: {selectedIncident.severity}
                </p>
              </div>
            </div>

            <p className="text-xs font-mono-code text-slate-300 p-3 rounded-lg bg-slate-900/80 border border-slate-800 leading-relaxed">
              Tactical incident verified by Tri-Service Automated Sensor Mesh. Forward patrol units notified; situational telemetry broadcast to Command Staff.
            </p>

            <button
              onClick={() => setSelectedIncident(null)}
              className="mt-4 w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-tech font-bold cursor-pointer"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}

      {/* View All Incidents Archive Modal */}
      {showAllIncidents && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl bg-[#020b1c] border border-cyan-500/40 rounded-2xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-tech font-bold text-white uppercase tracking-wider">
                    OPERATIONAL INCIDENT LOG ARCHIVE
                  </h3>
                  <p className="text-[10px] font-mono-code text-cyan-400">
                    5 INCIDENTS LOGGED TODAY • TRI-SERVICE TELEMETRY GRID
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAllIncidents(false)}
                className="text-slate-400 hover:text-white text-xs font-mono-code px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2">
              {incidents.map(inc => {
                const Icon = inc.icon;
                return (
                  <div
                    key={inc.id}
                    onClick={() => {
                      setShowAllIncidents(false);
                      setSelectedIncident(inc);
                    }}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 hover:border-cyan-500/40 hover:bg-slate-900 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-lg shrink-0 ${inc.badgeClass}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-tech font-bold text-white truncate">
                          {inc.title}
                        </div>
                        <div className="text-[10px] font-mono-code text-slate-400 mt-0.5">
                          Logged at {inc.time} • Command Grid Sector: North-West
                        </div>
                      </div>
                    </div>
                    <span className={`shrink-0 px-2 py-0.5 rounded-full border text-[9.5px] font-mono-code font-bold ${inc.badgeClass}`}>
                      {inc.severity}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAllIncidents(false)}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-tech font-bold text-xs cursor-pointer"
              >
                Close Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. WEATHER & INTELLIGENCE WIDGET (Modular, Live Location & Accurate Real-Time Feed)
export { WeatherIntelligenceWidget } from './WeatherIntelligenceWidget';

// 3. MISSION STATUS WIDGET (4 Circular Progress Rings & Live Command Dossier Modal)
export { MissionStatusWidget, MissionStatusWidget as MissionStatusGauges } from './MissionStatusWidget';

// 4. SOLDIER HEALTH WIDGET (4 Circular Bio-Telemetry Gauges + Operational ECG Waveform & Personnel Roster)
export { 
  SoldierHealthGauges, 
  SystemHealthGauges,
  INDIVIDUAL_SOLDIERS_ROSTER
} from './SoldierHealthWidget';
export type { SoldierBiometricRecord } from './SoldierHealthWidget';
