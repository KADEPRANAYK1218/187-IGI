import React, { useState } from 'react';
import { CloudSun, Wind, Compass, Droplets, Eye, Gauge, AlertCircle, Radio } from 'lucide-react';
import { ENVIRONMENTAL_METRICS } from '../../data/events';
import { EnvironmentalMetric } from '../../types';

interface EnvironmentWidgetProps {
  onClose?: () => void;
  onFocusCoordinates?: (coords: [number, number]) => void;
}

export const EnvironmentWidget: React.FC<EnvironmentWidgetProps> = ({
  onClose,
  onFocusCoordinates
}) => {
  const [selectedSector, setSelectedSector] = useState<EnvironmentalMetric>(ENVIRONMENTAL_METRICS[0]);

  return (
    <div className="vajra-panel-elevated rounded-2xl p-5 border border-cyan-500/35 max-w-4xl w-full backdrop-blur-2xl shadow-2xl animate-fade-in" id="environment-panel">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg tracking-wide">
              ENVIRONMENT & METEOROLOGICAL RADAR
            </h3>
            <p className="text-xs font-tech text-cyan-300/70">
              SYNTHETIC APERTURE RADAR (SAR) WEATHER PROFILES & MARITIME SEA STATES
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

      {/* Sector Quick Switcher Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {ENVIRONMENTAL_METRICS.map(sec => {
          const isSelected = selectedSector.sector === sec.sector;
          return (
            <button
              key={sec.sector}
              type="button"
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-tech font-bold transition flex items-center gap-2 ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{sec.sector}</span>
              <span className="text-[10px] text-amber-400 font-mono-code">[{sec.weatherCondition}]</span>
            </button>
          );
        })}
      </div>

      {/* Detailed Environmental Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {/* Temperature */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-[11px] font-tech text-slate-400 mb-1">TEMPERATURE</div>
          <div className="text-2xl font-mono-code font-bold text-white">
            {selectedSector.temperature}°C
          </div>
          <div className="text-[10px] text-cyan-400 font-tech mt-1">SURFACE AMBIENT</div>
        </div>

        {/* Wind Speed & Direction */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-[11px] font-tech text-slate-400 mb-1">WIND VECTOR</div>
          <div className="text-2xl font-mono-code font-bold text-cyan-300">
            {selectedSector.windSpeed} <span className="text-xs text-slate-400">km/h</span>
          </div>
          <div className="text-[10px] text-amber-400 font-tech mt-1">HEADING {selectedSector.windDirection}</div>
        </div>

        {/* Barometric Pressure */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-[11px] font-tech text-slate-400 mb-1">BAROMETRIC PRESSURE</div>
          <div className="text-2xl font-mono-code font-bold text-emerald-300">
            {selectedSector.barometricPressure} <span className="text-xs text-slate-400">hPa</span>
          </div>
          <div className="text-[10px] text-slate-400 font-tech mt-1">ALTIMETRIC DATUM</div>
        </div>

        {/* Visibility & Radar Reflectivity */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-[11px] font-tech text-slate-400 mb-1">RADAR REFLECTIVITY</div>
          <div className="text-2xl font-mono-code font-bold text-amber-300">
            {selectedSector.radarReflectivity} <span className="text-xs text-slate-400">dBZ</span>
          </div>
          <div className="text-[10px] text-cyan-300 font-tech mt-1">VISIBILITY {selectedSector.visibilityKm} km</div>
        </div>
      </div>

      {/* Atmospheric Assessment Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Droplets className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <div className="text-xs text-slate-300">
            <strong>CURRENT PHENOMENON:</strong> {selectedSector.weatherCondition} across {selectedSector.sector} coordinates [{selectedSector.coordinates[0]}°N, {selectedSector.coordinates[1]}°E].
          </div>
        </div>

        {onFocusCoordinates && (
          <button
            type="button"
            onClick={() => onFocusCoordinates(selectedSector.coordinates)}
            className="px-3 py-1.5 rounded-lg text-xs font-tech font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition flex items-center gap-1 shadow-md shadow-cyan-500/20 whitespace-nowrap ml-2"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>TRACK SECTOR</span>
          </button>
        )}
      </div>
    </div>
  );
};
