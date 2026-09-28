import React from 'react';
import { Radar, Video, Eye, Radio, Shield, Activity, Sparkles, Layers } from 'lucide-react';
import { SENSORS_DATA } from '../../data/sensors';
import { SensorData } from '../../types';

interface SituationalOverviewWidgetProps {
  onClose?: () => void;
  activeLayers: {
    strategicCommands: boolean;
    airBases: boolean;
    navalDockyards: boolean;
    radarsAndSensors: boolean;
    tacticalAlerts: boolean;
    weatherOverlay: boolean;
    radarRings: boolean;
  };
  onToggleLayer: (layerKey: keyof SituationalOverviewWidgetProps['activeLayers']) => void;
  onFocusCoordinates?: (coords: [number, number]) => void;
}

export const SituationalOverviewWidget: React.FC<SituationalOverviewWidgetProps> = ({
  onClose,
  activeLayers,
  onToggleLayer,
  onFocusCoordinates
}) => {
  return (
    <div className="vajra-panel-elevated rounded-2xl p-5 border border-cyan-500/35 max-w-4xl w-full backdrop-blur-2xl shadow-2xl animate-fade-in" id="situational-view-panel">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
            <Radar className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg tracking-wide">
              GLOBAL SITUATIONAL AWARENESS & SENSOR SWEEP
            </h3>
            <p className="text-xs font-tech text-cyan-300/70">
              ACTIVE SENSOR ARRAYS • DRONE RECONNAISSANCE LINKS • GEOCORE LAYER CONTROLS
            </p>
          </div>
        </div>

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

      {/* Layer Toggles Strip */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 mb-4">
        <div className="text-xs font-tech text-cyan-300 font-bold mb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          <span>GEOCORE MAP OVERLAY TOGGLES:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ['strategicCommands', 'Strategic Commands'],
              ['airBases', 'Air Force Bases'],
              ['navalDockyards', 'Naval Ports & Taskforces'],
              ['radarsAndSensors', 'Active Sensors'],
              ['tacticalAlerts', 'Tactical Alerts'],
              ['weatherOverlay', 'Meteorological Radar'],
              ['radarRings', '360° Radar Sweep Rings']
            ] as const
          ).map(([key, label]) => {
            const isEnabled = activeLayers[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => onToggleLayer(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-tech font-bold transition flex items-center gap-1.5 ${
                  isEnabled
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400 shadow-sm'
                    : 'bg-slate-900/40 text-slate-500 border border-slate-800 hover:text-slate-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sensor Arrays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
        {SENSORS_DATA.map(sensor => (
          <div
            key={sensor.id}
            className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/30 transition space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="font-bold text-white text-xs">{sensor.name}</div>
              <span className="px-2 py-0.5 rounded text-[9px] font-tech font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {sensor.status}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 font-tech">
              LOCATION: <span className="text-slate-200">{sensor.locationName}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono-code pt-1 border-t border-slate-900">
              <div>
                <span className="text-slate-500">COVERAGE:</span>
                <div className="text-cyan-300">{sensor.coverageRadiusKm} km</div>
              </div>
              <div>
                <span className="text-slate-500">SIGNAL:</span>
                <div className="text-emerald-300">{sensor.signalStrength}%</div>
              </div>
              <div>
                <span className="text-slate-500">THROUGHPUT:</span>
                <div className="text-amber-300">{sensor.dataThroughputMbps} Mbps</div>
              </div>
            </div>

            {onFocusCoordinates && (
              <div className="pt-2 border-t border-slate-900 flex justify-end">
                <button
                  type="button"
                  onClick={() => onFocusCoordinates(sensor.coordinates)}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-cyan-950 text-cyan-300 border border-slate-800 text-[10px] flex items-center gap-1 font-tech"
                >
                  <Radio className="w-3 h-3" />
                  <span>JUMP TO SENSOR</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
