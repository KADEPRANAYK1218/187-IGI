import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Film, 
  Download, 
  Radio, 
  X,
  Play
} from 'lucide-react';
import { SurveillanceEventLog } from '../../types/surveillance';
import { EVENT_LOGS } from '../../data/surveillanceData';
import { useSettings } from '../../context/SettingsContext';

interface SurveillanceEventLogsViewProps {
  onTriggerSync?: () => void;
  isSyncing?: boolean;
}

export const SurveillanceEventLogsView: React.FC<SurveillanceEventLogsViewProps> = ({
  onTriggerSync,
  isSyncing = false
}) => {
  const { theme } = useSettings();
  const isLight = theme === 'Light';

  const [logs, setLogs] = useState<SurveillanceEventLog[]>(EVENT_LOGS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [syncFilter, setSyncFilter] = useState<'ALL' | 'PENDING' | 'SYNCING' | 'SYNCED' | 'FAILED'>('ALL');
  const [previewVideoSrc, setPreviewVideoSrc] = useState<string | null>(null);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.eventId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.cameraId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.objectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSync = syncFilter === 'ALL' || log.syncStatus === syncFilter;

    return matchesSearch && matchesSync;
  });

  const exportCsv = () => {
    const headers = 'Event ID,Camera,Edge Node,Timestamp,Event Type,Confidence,Object ID,Location,Sync Status\n';
    const rows = filteredLogs.map(l => 
      `"${l.eventId}","${l.cameraId}","${l.edgeNodeId}","${l.timestamp}","${l.eventType}",${l.confidenceScore}%,"${l.objectId}","${l.location}","${l.syncStatus}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vajra_surveillance_events_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="w-full space-y-4 font-tech">
      {/* Search and Action Bar */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-3 ${
        isLight ? 'bg-white border-slate-300 shadow-sm text-slate-900' : 'bg-[#020b1c]/90 border-cyan-500/40 text-white'
      }`}>
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search event ID, type, camera, location..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={`w-full pl-9 pr-3 py-1.5 rounded-lg border text-xs font-mono-code outline-none ${
              isLight 
                ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500' 
                : 'bg-slate-950 border-cyan-500/30 text-white focus:border-cyan-400'
            }`}
          />
        </div>

        {/* Sync Status Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['ALL', 'PENDING', 'SYNCING', 'SYNCED', 'FAILED'] as const).map(st => (
            <button
              key={st}
              onClick={() => setSyncFilter(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                syncFilter === st
                  ? 'bg-cyan-600 text-white border border-cyan-400'
                  : isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
              }`}
            >
              {st}
            </button>
          ))}

          <button
            onClick={exportCsv}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono-code flex items-center gap-1.5 transition cursor-pointer ml-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* Main Events Table */}
      <div className={`rounded-xl border overflow-x-auto ${
        isLight ? 'bg-white border-slate-300 text-slate-900 shadow-sm' : 'bg-[#020b1c]/90 border-cyan-500/40 text-white'
      }`}>
        <table className="w-full text-left border-collapse text-xs font-mono-code">
          <thead>
            <tr className={isLight ? 'bg-slate-100 border-b border-slate-300 text-slate-700' : 'bg-slate-900/90 border-b border-cyan-500/30 text-cyan-300'}>
              <th className="p-3">Event ID</th>
              <th className="p-3">Camera</th>
              <th className="p-3">Edge Node</th>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Event Classification</th>
              <th className="p-3">Object / Entity</th>
              <th className="p-3">Confidence</th>
              <th className="p-3">Location</th>
              <th className="p-3">Evidence Clip</th>
              <th className="p-3">Sync Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {filteredLogs.map(log => {
              const isSynced = log.syncStatus === 'SYNCED';
              const isPending = log.syncStatus === 'PENDING';
              const isSyncing = log.syncStatus === 'SYNCING';

              return (
                <tr key={log.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-3 font-bold text-cyan-400 whitespace-nowrap">{log.eventId}</td>
                  <td className="p-3 whitespace-nowrap font-bold text-slate-200">{log.cameraId}</td>
                  <td className="p-3 whitespace-nowrap text-slate-400">{log.edgeNodeId}</td>
                  <td className="p-3 whitespace-nowrap text-slate-300">{log.timestamp}</td>
                  <td className="p-3 font-tech font-bold text-white max-w-[200px] truncate">{log.eventType}</td>
                  <td className="p-3 text-amber-300 font-bold whitespace-nowrap">{log.objectId}</td>
                  <td className="p-3 text-emerald-400 font-bold whitespace-nowrap">{log.confidenceScore}%</td>
                  <td className="p-3 text-slate-300 max-w-[180px] truncate">{log.location}</td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => setPreviewVideoSrc(log.evidenceReference)}
                      className="px-2 py-1 rounded bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/50 text-cyan-300 text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>PLAY VIDEO</span>
                    </button>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold inline-flex items-center gap-1 ${
                      isSynced
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isSyncing
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 animate-pulse'
                        : isPending
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-red-500/20 text-red-400 border border-red-500/40'
                    }`}>
                      {isSynced && <CheckCircle2 className="w-3 h-3" />}
                      {isSyncing && <RefreshCw className="w-3 h-3 animate-spin" />}
                      {isPending && <Clock className="w-3 h-3" />}
                      <span>{log.syncStatus}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Video Evidence Preview Modal */}
      {previewVideoSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className={`w-full max-w-xl rounded-2xl border p-4 space-y-3 shadow-2xl ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#020b1c] border-cyan-500/50 text-white'
          }`}>
            <div className="flex items-center justify-between border-b pb-2 border-slate-700/40">
              <span className="text-xs font-mono-code font-bold text-cyan-400 flex items-center gap-1.5">
                <Film className="w-4 h-4" />
                <span>CCTV EVIDENCE VIDEO CLIP PLAYBACK</span>
              </span>
              <button
                onClick={() => setPreviewVideoSrc(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-cyan-500/40">
              <video
                src={previewVideoSrc}
                autoPlay
                loop
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400 pt-1">
              <span>SOURCE: EDGE VIDEO BUFFER</span>
              <button
                onClick={() => setPreviewVideoSrc(null)}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
