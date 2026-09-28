import React, { useState } from 'react';
import { Bell, AlertTriangle, ShieldAlert, CheckCircle2, Navigation, Filter, Eye, Radio, Sparkles } from 'lucide-react';
import { TacticalAlert } from '../../types';
import { TACTICAL_ALERTS } from '../../data/alerts';

interface AlertCenterWidgetProps {
  onClose?: () => void;
  onSelectAlert?: (alert: TacticalAlert) => void;
  onFocusCoordinates?: (coords: [number, number]) => void;
  onJumpToXai?: (alertId: string) => void;
}

export const AlertCenterWidget: React.FC<AlertCenterWidgetProps> = ({
  onClose,
  onSelectAlert,
  onFocusCoordinates,
  onJumpToXai
}) => {
  const [alerts, setAlerts] = useState<TacticalAlert[]>(TACTICAL_ALERTS);
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  const filteredAlerts = alerts.filter(a => {
    if (filterPriority === 'ALL') return true;
    return a.priority === filterPriority;
  });

  const handleAcknowledge = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlerts(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'INVESTIGATING' } : a))
    );
  };

  return (
    <div className="vajra-panel-elevated rounded-2xl p-5 border border-cyan-500/35 max-w-4xl w-full backdrop-blur-2xl shadow-2xl animate-fade-in" id="alert-center-panel">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-400">
            <Bell className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg tracking-wide">
              TACTICAL ALERT & INCIDENT COMMAND CENTER
            </h3>
            <p className="text-xs font-tech text-cyan-300/70">
              REAL-TIME GEOSPATIAL EVENT CORRELATION & MULTI-DOMAIN ANOMALY DETECTION
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

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-tech text-slate-400">PRIORITY:</span>
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'INFO'].map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setFilterPriority(p)}
              className={`px-2.5 py-1 rounded-lg text-xs font-tech font-bold transition ${
                filterPriority === p
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono-code text-cyan-300">
          {filteredAlerts.length} ACTIVE INCIDENTS
        </span>
      </div>

      {/* Alert Cards Feed */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {filteredAlerts.map(alert => {
          const isCritical = alert.priority === 'CRITICAL';
          const isHigh = alert.priority === 'HIGH';

          return (
            <div
              key={alert.id}
              onClick={() => onSelectAlert && onSelectAlert(alert)}
              className={`p-4 rounded-xl border transition cursor-pointer ${
                isCritical
                  ? 'bg-rose-950/40 border-rose-500/40 hover:border-rose-400'
                  : isHigh
                  ? 'bg-amber-950/30 border-amber-500/40 hover:border-amber-400'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 animate-pulse'
                        : isHigh
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    }`}
                  >
                    {alert.priority} • {alert.category}
                  </span>
                  <span className="text-xs font-mono-code text-slate-400">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-tech text-emerald-400 font-bold font-mono-code">
                    CONFIDENCE: {alert.confidence}%
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5">{alert.title}</h4>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">{alert.summary}</p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400 font-tech">
                  <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{alert.locationName}</span>
                </div>

                <div className="flex items-center gap-2">
                  {onFocusCoordinates && (
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        onFocusCoordinates(alert.coordinates);
                      }}
                      className="px-2.5 py-1 rounded bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 text-xs flex items-center gap-1 transition"
                    >
                      <Radio className="w-3 h-3" />
                      <span>FOCUS MAP</span>
                    </button>
                  )}

                  {alert.requiresReview && onJumpToXai && (
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        onJumpToXai(alert.id);
                      }}
                      className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs flex items-center gap-1 font-bold transition"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>XAI DECISION SUPPORT</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={e => handleAcknowledge(alert.id, e)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
                  >
                    STATUS: {alert.status}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
