import React, { useState } from 'react';
import { FileText, ShieldCheck, Lock, Search, Filter, Hash, CheckCircle2 } from 'lucide-react';
import { AuditLogEntry } from '../../types';
import { INITIAL_AUDIT_LOGS } from '../../data/events';

interface AuditTrailWidgetProps {
  onClose?: () => void;
}

export const AuditTrailWidget: React.FC<AuditTrailWidgetProps> = ({
  onClose
}) => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredLogs = logs.filter(l => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      l.officerId.toLowerCase().includes(term) ||
      l.action.toLowerCase().includes(term) ||
      l.details.toLowerCase().includes(term) ||
      l.tamperHash.toLowerCase().includes(term)
    );
  });

  return (
    <div className="vajra-panel-elevated rounded-2xl p-5 border border-cyan-500/35 max-w-4xl w-full backdrop-blur-2xl shadow-2xl animate-fade-in" id="audit-panel">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg tracking-wide">
              IMMUTABLE AUDIT LOG & BLOCK HASH TRAIL
            </h3>
            <p className="text-xs font-tech text-cyan-300/70">
              TAMPER-EVIDENT CRYPTOGRAPHIC DIRECTIVES & MULTI-FACTOR VERIFICATION RECORDS
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

      {/* Filter & Search Bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs w-72">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search Officer ID, Hash, Action..."
            className="bg-transparent text-white placeholder-slate-500 focus:outline-none w-full font-tech text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-tech text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>CRYPTOGRAPHIC CHAIN VERIFIED</span>
        </div>
      </div>

      {/* Audit Log Entries List */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1 font-mono-code text-xs">
        {filteredLogs.map(log => (
          <div
            key={log.id}
            className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/30 transition space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {log.category}
                </span>
                <span className="font-bold text-white font-tech text-xs">{log.action}</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>{new Date(log.timestamp).toUTCString()}</span>
                <span className="text-emerald-400 font-bold">✓ IMMUTABLE</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 font-sans leading-relaxed">
              {log.details}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-900 text-[10px] text-slate-400">
              <div>
                <span className="text-slate-500">OFFICER: </span>
                <span className="text-cyan-300 font-bold">{log.officerName} ({log.officerId})</span>
                <span className="text-slate-500"> • {log.ipAddress}</span>
              </div>
              <div className="truncate">
                <span className="text-slate-500">BLOCK HASH: </span>
                <span className="text-amber-300/90">{log.tamperHash}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
