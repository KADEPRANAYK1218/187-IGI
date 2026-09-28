import React, { useState } from 'react';
import { Calendar, X, Download, CheckCircle2, Shield, Radio, Clock } from 'lucide-react';
import { downloadFile } from '../../utils/fileDownloader';

interface VajraScheduleReportModalProps {
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const VajraScheduleReportModal: React.FC<VajraScheduleReportModalProps> = ({
  onClose,
  onShowToast
}) => {
  const [scheduleName, setScheduleName] = useState('Dawn Tactical Sector Briefing');
  const [frequency, setFrequency] = useState('Daily at 06:00 IST');
  const [channel, setChannel] = useState('Satellite Uplink (SATCOM-7)');
  const [recipients, setRecipients] = useState('Northern Command HQ & LoC Sector Posts');
  const [format, setFormat] = useState('Encrypted PDF / TXT Dossier');
  const [criticalTrigger, setCriticalTrigger] = useState(true);

  const handleDownloadManifest = (activate = true) => {
    const schedId = `SCH-${Math.floor(1000 + Math.random() * 9000)}`;
    const config = {
      schedule_id: schedId,
      platform: 'VAJRA AUTONOMOUS TACTICAL DISPATCHER',
      schedule_name: scheduleName,
      execution_frequency: frequency,
      dispatch_network: channel,
      designated_recipients: recipients,
      output_format: format,
      immediate_critical_escalation_enabled: criticalTrigger,
      status: activate ? 'ACTIVE_ARMED' : 'DRAFT_CONFIG',
      created_at: new Date().toISOString(),
      encryption_protocol: 'AES-256-GCM QUANTUM HARBOR',
      automated_pipeline_rules: [
        'Ingest multi-sensor drone radar data 15 minutes prior to dispatch window.',
        'Synthesize anomaly detections across J&K, Punjab, and Rajasthan corridors.',
        'Deliver classified report manifest to authenticated command terminals.'
      ]
    };

    downloadFile(
      `VAJRA_Schedule_Manifest_${schedId}.json`,
      JSON.stringify(config, null, 2),
      'application/json'
    );

    if (activate) {
      onShowToast(`Automated Schedule ${schedId} Activated & Manifest File Downloaded!`);
      onClose();
    } else {
      onShowToast(`Schedule Manifest ${schedId}.json downloaded.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-xl bg-[#020b1c] border border-purple-500/60 rounded-2xl shadow-[0_0_45px_rgba(168,85,247,0.3)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 bg-[#031533] border-b border-purple-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-950/90 border border-purple-400 flex items-center justify-center text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-tech font-bold text-white tracking-wider">
                SCHEDULE AUTOMATED INTELLIGENCE REPORT
              </h3>
              <p className="text-[10px] font-mono-code text-purple-400">
                CRON-TRIGGERED MULTI-DOMAIN DISPATCH ENGINE
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs font-mono-code text-slate-200">
          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
              SCHEDULE PROFILE NAME
            </label>
            <input
              type="text"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              className="w-full bg-[#031533] border border-purple-500/40 focus:border-purple-400 rounded-xl px-3 py-2 text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                DISPATCH FREQUENCY
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-[#031533] border border-purple-500/40 focus:border-purple-400 rounded-xl px-3 py-2 text-purple-300 outline-none cursor-pointer"
              >
                <option value="Daily at 06:00 IST">Daily at 06:00 IST (Dawn Sync)</option>
                <option value="Twice Daily (06:00 & 18:00 IST)">Twice Daily (06:00 & 18:00 IST)</option>
                <option value="Weekly on Monday 08:00 IST">Weekly on Monday 08:00 IST</option>
                <option value="Continuous 4-Hour Heartbeat">Continuous 4-Hour Heartbeat</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                DISPATCH CHANNEL
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full bg-[#031533] border border-purple-500/40 focus:border-purple-400 rounded-xl px-3 py-2 text-purple-300 outline-none cursor-pointer"
              >
                <option value="Satellite Uplink (SATCOM-7)">Satellite Uplink (SATCOM-7)</option>
                <option value="Tri-Services Tactical Mesh">Tri-Services Tactical Mesh</option>
                <option value="Classified Fiber Switch Node">Classified Fiber Switch Node</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
              TARGET RECIPIENT COMMANDS
            </label>
            <input
              type="text"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              className="w-full bg-[#031533] border border-purple-500/40 focus:border-purple-400 rounded-xl px-3 py-2 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
              OUTPUT FORMAT
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-[#031533] border border-purple-500/40 focus:border-purple-400 rounded-xl px-3 py-2 text-purple-300 outline-none cursor-pointer"
            >
              <option value="Encrypted PDF / TXT Dossier">Encrypted PDF / TXT Tactical Dossier</option>
              <option value="Structured JSON Sensor Stream">Structured JSON Sensor Stream</option>
              <option value="Classified CSV Spreadsheet Ledger">Classified CSV Spreadsheet Ledger</option>
            </select>
          </div>

          {/* Trigger checkbox */}
          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 cursor-pointer">
            <input
              type="checkbox"
              checked={criticalTrigger}
              onChange={(e) => setCriticalTrigger(e.target.checked)}
              className="rounded bg-[#031533] border-purple-400 text-purple-500 focus:ring-0 cursor-pointer"
            />
            <span className="text-[11px] text-purple-200">
              Trigger instant override dispatch whenever a <strong>Critical Threat</strong> or IED incident is validated.
            </span>
          </label>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-[#031533] border-t border-purple-500/40 flex items-center justify-between">
          <button
            onClick={() => handleDownloadManifest(false)}
            className="px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-400/70 text-purple-300 text-xs font-mono-code font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Config (.json)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-code transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDownloadManifest(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold flex items-center gap-2 text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] transition cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Save & Activate Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
