import React, { useState } from 'react';
import { Heart, Activity, Thermometer, Shield, CheckCircle2, AlertTriangle, Radio } from 'lucide-react';
import { PersonnelTelemetry } from '../../types';
import { INITIAL_PERSONNEL_TELEMETRY } from '../../data/events';

interface PersonnelTelemetryWidgetProps {
  onClose?: () => void;
  onFocusLocation?: (coords: [number, number]) => void;
}

export const PersonnelTelemetryWidget: React.FC<PersonnelTelemetryWidgetProps> = ({
  onClose,
  onFocusLocation
}) => {
  const [telemetryList, setTelemetryList] = useState<PersonnelTelemetry[]>(INITIAL_PERSONNEL_TELEMETRY);
  const [selectedPersonnel, setSelectedPersonnel] = useState<PersonnelTelemetry | null>(INITIAL_PERSONNEL_TELEMETRY[0]);

  return (
    <div className="vajra-panel-elevated rounded-2xl p-5 border border-cyan-500/35 max-w-4xl w-full backdrop-blur-2xl shadow-2xl animate-fade-in" id="personnel-telemetry-panel">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg tracking-wide">
              PERSONNEL BIOMETRIC & TACTICAL TELEMETRY
            </h3>
            <p className="text-xs font-tech text-cyan-300/70">
              REAL-TIME SOLDIER / COMMANDER HEALTH & MISSION READINESS INDEX
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-tech font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            AUTHORIZED SIMULATION DATA
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: List on Left, Detailed Inspector on Right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Personnel List */}
        <div className="md:col-span-1 space-y-2 max-h-96 overflow-y-auto pr-1">
          {telemetryList.map(person => {
            const isSelected = selectedPersonnel?.id === person.id;
            return (
              <button
                key={person.id}
                type="button"
                onClick={() => setSelectedPersonnel(person)}
                className={`w-full text-left p-3 rounded-xl border transition flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-code font-bold text-xs text-cyan-300">
                    {person.personnelId}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-tech font-bold ${
                    person.status === 'OPERATIONAL'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {person.status}
                  </span>
                </div>
                <div className="text-xs font-semibold text-white">{person.name}</div>
                <div className="text-[10px] text-slate-400 font-tech">{person.sector}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Vitals HUD */}
        {selectedPersonnel && (
          <div className="md:col-span-2 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-4">
                <div>
                  <div className="text-sm font-bold text-white">
                    {selectedPersonnel.rank} {selectedPersonnel.name}
                  </div>
                  <div className="text-xs font-tech text-cyan-400">
                    {selectedPersonnel.service} • {selectedPersonnel.assignedLocation}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono-code text-slate-400">LAST SYNC</div>
                  <div className="text-xs font-mono-code font-bold text-emerald-400">{selectedPersonnel.lastUpdate}</div>
                </div>
              </div>

              {/* Real-time Vitals Metric Cards */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-tech text-slate-400 mb-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                    <span>HEART RATE</span>
                  </div>
                  <div className="text-xl font-mono-code font-bold text-rose-300">
                    {selectedPersonnel.heartRate} <span className="text-xs text-slate-500">BPM</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-tech mt-1">NORMAL SINUS</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-tech text-slate-400 mb-1">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>BLOOD OXYGEN (SpO2)</span>
                  </div>
                  <div className="text-xl font-mono-code font-bold text-cyan-300">
                    {selectedPersonnel.spO2}%
                  </div>
                  <div className="text-[10px] text-emerald-400 font-tech mt-1">OPTIMAL SATURATION</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-tech text-slate-400 mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                    <span>BODY TEMPERATURE</span>
                  </div>
                  <div className="text-xl font-mono-code font-bold text-amber-300">
                    {selectedPersonnel.bodyTemp}°C
                  </div>
                  <div className="text-[10px] text-emerald-400 font-tech mt-1">EUXERMIC</div>
                </div>
              </div>

              {/* Mission Readiness Meter */}
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 mb-4">
                <div className="flex items-center justify-between text-xs font-tech mb-1.5">
                  <span className="text-slate-400">COMBAT & GEOSPATIAL READINESS INDEX:</span>
                  <span className="text-emerald-400 font-bold font-mono-code">{selectedPersonnel.readinessIndex}% / 100</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-cyan-500/20">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-green-500 transition-all duration-300"
                    style={{ width: `${selectedPersonnel.readinessIndex}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Jump to Map Location */}
            {onFocusLocation && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => onFocusLocation(selectedPersonnel.coordinates)}
                  className="px-4 py-2 rounded-lg text-xs font-tech font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <Radio className="w-3.5 h-3.5 text-slate-950" />
                  <span>CENTER ON GEOSPATIAL MAP</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
