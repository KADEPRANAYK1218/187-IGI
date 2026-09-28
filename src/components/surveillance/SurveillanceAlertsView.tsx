import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Eye, 
  Clock, 
  Camera, 
  Filter, 
  X, 
  Film, 
  Radio, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { SurveillanceAlert } from '../../types/surveillance';
import { SURVEILLANCE_ALERTS } from '../../data/surveillanceData';
import { useSettings } from '../../context/SettingsContext';

interface SurveillanceAlertsViewProps {
  onSelectCameraClip?: (cameraId: string) => void;
}

export const SurveillanceAlertsView: React.FC<SurveillanceAlertsViewProps> = ({
  onSelectCameraClip
}) => {
  const { theme } = useSettings();
  const isLight = theme === 'Light';

  const [alerts, setAlerts] = useState<SurveillanceAlert[]>(SURVEILLANCE_ALERTS);
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM'>('ALL');
  const [selectedAlertForModal, setSelectedAlertForModal] = useState<SurveillanceAlert | null>(null);

  // Filtered alerts
  const filteredAlerts = alerts.filter(a => {
    if (severityFilter === 'ALL') return true;
    return a.severity === severityFilter;
  });

  const handleAcknowledge = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'ACKNOWLEDGED' } : a));
    if (selectedAlertForModal?.id === id) {
      setSelectedAlertForModal(prev => prev ? { ...prev, status: 'ACKNOWLEDGED' } : null);
    }
  };

  const handleResolve = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'RESOLVED' } : a));
    if (selectedAlertForModal?.id === id) {
      setSelectedAlertForModal(prev => prev ? { ...prev, status: 'RESOLVED' } : null);
    }
  };

  const criticalCount = alerts.filter(a => a.severity === 'CRITICAL' && a.status !== 'RESOLVED').length;
  const highCount = alerts.filter(a => a.severity === 'HIGH' && a.status !== 'RESOLVED').length;
  const mediumCount = alerts.filter(a => a.severity === 'MEDIUM' && a.status !== 'RESOLVED').length;

  return (
    <div className="w-full space-y-4 font-tech">
      {/* Alert Header Summary & Filter Bar */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-3 ${
        isLight ? 'bg-white border-slate-300 shadow-sm text-slate-900' : 'bg-[#020b1c]/90 border-cyan-500/40 text-white'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-600/20 border border-red-500/50 text-red-400">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-bold font-tech uppercase tracking-wider">
              Surveillance Incident & Alert Matrix
            </h2>
            <p className="text-xs font-mono-code text-slate-400">
              Autonomous Edge Neural Triggers • Resilient Local Dispatch (Zero WAN Dependency)
            </p>
          </div>
        </div>

        {/* Severity Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSeverityFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
              severityFilter === 'ALL'
                ? 'bg-cyan-600 text-white border border-cyan-400'
                : isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
            }`}
          >
            ALL ALERTS ({alerts.length})
          </button>

          <button
            onClick={() => setSeverityFilter('CRITICAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer flex items-center gap-1.5 ${
              severityFilter === 'CRITICAL'
                ? 'bg-red-600 text-white border border-red-400'
                : 'bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30'
            }`}
          >
            <span>CRITICAL</span>
            <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
              {criticalCount}
            </span>
          </button>

          <button
            onClick={() => setSeverityFilter('HIGH')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer flex items-center gap-1.5 ${
              severityFilter === 'HIGH'
                ? 'bg-amber-600 text-white border border-amber-400'
                : 'bg-amber-950/40 hover:bg-amber-900/60 text-amber-400 border border-amber-500/30'
            }`}
          >
            <span>HIGH</span>
            <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">
              {highCount}
            </span>
          </button>

          <button
            onClick={() => setSeverityFilter('MEDIUM')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer flex items-center gap-1.5 ${
              severityFilter === 'MEDIUM'
                ? 'bg-blue-600 text-white border border-blue-400'
                : 'bg-blue-950/40 hover:bg-blue-900/60 text-blue-400 border border-blue-500/30'
            }`}
          >
            <span>MEDIUM</span>
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
              {mediumCount}
            </span>
          </button>
        </div>
      </div>

      {/* Alerts Grid List */}
      <div className="space-y-3">
        {filteredAlerts.map(alert => {
          const isCritical = alert.severity === 'CRITICAL';
          const isHigh = alert.severity === 'HIGH';

          return (
            <div
              key={alert.id}
              onClick={() => setSelectedAlertForModal(alert)}
              className={`p-4 rounded-xl border transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                alert.status === 'RESOLVED'
                  ? isLight ? 'bg-slate-100 border-slate-300 opacity-60' : 'bg-slate-950/50 border-slate-800 opacity-60 text-slate-400'
                  : isCritical
                  ? isLight ? 'bg-red-50 border-red-300 text-slate-900 shadow-sm' : 'bg-red-950/30 border-red-500/50 shadow-lg text-white'
                  : isHigh
                  ? isLight ? 'bg-amber-50 border-amber-300 text-slate-900 shadow-sm' : 'bg-amber-950/20 border-amber-500/40 text-white'
                  : isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
              }`}
            >
              {/* Left Details */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase ${
                    isCritical
                      ? 'bg-red-600 text-white animate-pulse'
                      : isHigh
                      ? 'bg-amber-600 text-white'
                      : 'bg-blue-600 text-white'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs font-mono-code font-bold text-cyan-400">
                    {alert.alertId}
                  </span>
                  <span className="text-xs font-mono-code text-slate-400">
                    • {alert.timestamp}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                    alert.status === 'RESOLVED'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : alert.status === 'ACKNOWLEDGED'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                  }`}>
                    {alert.status}
                  </span>
                </div>

                <div className="text-base font-bold font-tech text-white">
                  {alert.type}
                </div>

                <p className="text-xs font-mono-code text-slate-300 leading-relaxed max-w-3xl">
                  {alert.details}
                </p>

                <div className="flex items-center gap-3 text-[11px] font-mono-code text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-cyan-300">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{alert.camera}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-300">
                    <Film className="w-3.5 h-3.5" />
                    <span>Evidence Clip Stored Locally</span>
                  </span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-700/40">
                {alert.status === 'UNRESOLVED' && (
                  <button
                    onClick={(e) => handleAcknowledge(alert.id, e)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold transition cursor-pointer shadow-sm"
                  >
                    ACKNOWLEDGE
                  </button>
                )}

                {alert.status !== 'RESOLVED' && (
                  <button
                    onClick={(e) => handleResolve(alert.id, e)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono-code font-bold transition cursor-pointer shadow-sm flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>MARK RESOLVED</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedAlertForModal(alert)}
                  className="px-3 py-1.5 rounded-lg border border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-300 text-xs font-mono-code font-bold transition cursor-pointer flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>VIEW DETAILS</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ALERT DETAILS & EVIDENCE VIDEO MODAL */}
      {selectedAlertForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className={`w-full max-w-2xl rounded-2xl border p-5 flex flex-col space-y-4 shadow-2xl ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#020b1c] border-cyan-500/50 text-white'
          }`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-3 border-slate-700/40">
              <div className="flex items-center gap-2.5">
                <span className={`px-2 py-0.5 rounded text-xs font-mono-code font-bold uppercase ${
                  selectedAlertForModal.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-amber-600 text-white'
                }`}>
                  {selectedAlertForModal.severity}
                </span>
                <span className="text-sm font-bold font-tech text-white">
                  {selectedAlertForModal.alertId} — {selectedAlertForModal.type}
                </span>
              </div>

              <button
                onClick={() => setSelectedAlertForModal(null)}
                className="p-1 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Playable Evidence Video Preview */}
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-cyan-500/40">
              <video
                src={selectedAlertForModal.evidenceRef}
                autoPlay
                loop
                muted
                controls
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 pointer-events-none bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono-code text-cyan-300 border border-cyan-400/40">
                EVIDENCE RECORDING REPLAY
              </div>
            </div>

            {/* Details Breakdown */}
            <div className="space-y-2 text-xs font-mono-code">
              <div className="p-3 rounded-lg bg-black/30 border border-white/10 text-slate-200">
                {selectedAlertForModal.details}
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div>Camera: <strong className="text-cyan-400">{selectedAlertForModal.camera}</strong></div>
                <div>Trigger Time: <strong className="text-white">{selectedAlertForModal.timestamp}</strong></div>
                <div>Local Alert Store: <strong className="text-emerald-400">Cached on Edge Node</strong></div>
                <div>Current Status: <strong className="text-amber-400">{selectedAlertForModal.status}</strong></div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-700/40">
              <div className="text-[10px] font-mono-code text-slate-400">
                AUDIT SIGNATURE: VERIFIED LOCAL DISPATCH
              </div>

              <div className="flex items-center gap-2">
                {selectedAlertForModal.status !== 'ACKNOWLEDGED' && (
                  <button
                    onClick={() => handleAcknowledge(selectedAlertForModal.id)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold transition cursor-pointer"
                  >
                    ACKNOWLEDGE
                  </button>
                )}

                {selectedAlertForModal.status !== 'RESOLVED' && (
                  <button
                    onClick={() => handleResolve(selectedAlertForModal.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono-code font-bold transition cursor-pointer"
                  >
                    MARK RESOLVED
                  </button>
                )}

                <button
                  onClick={() => setSelectedAlertForModal(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono-code transition cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
