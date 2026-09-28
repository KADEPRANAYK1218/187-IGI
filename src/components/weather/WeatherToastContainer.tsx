import React from 'react';
import { useWeatherLocation } from '../../context/WeatherLocationContext';
import { CloudRain, Wind, AlertTriangle, Radio, X, Bell } from 'lucide-react';

export const WeatherToastContainer: React.FC = () => {
  const { activeToasts, dismissToast } = useWeatherLocation();

  if (activeToasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {activeToasts.map((toast) => {
        const isCritical = toast.severity === 'critical';
        const isCaution = toast.severity === 'caution';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-in ${
              isCritical
                ? 'bg-red-950/90 border-red-500/70 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                : isCaution
                ? 'bg-amber-950/90 border-amber-500/70 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-[#021129]/95 border-cyan-500/60 text-slate-100 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                  isCritical 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                    : isCaution 
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' 
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                }`}>
                  {toast.type === 'gps' ? (
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                  ) : toast.type === 'warning' ? (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  ) : (
                    <Bell className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="text-[10px] font-mono-code font-bold tracking-wider uppercase text-cyan-300">
                  {toast.title}
                </div>
              </div>

              <button
                onClick={() => dismissToast(toast.id)}
                className="text-slate-400 hover:text-white transition p-0.5 rounded hover:bg-slate-800"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] font-mono-code text-slate-200 mt-1.5 leading-relaxed">
              {toast.message}
            </p>

            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-cyan-500/20 text-[9px] font-mono-code text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>VAJRA INTEL SATELLITE LINK</span>
              </span>
              <span>{toast.timestamp}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
