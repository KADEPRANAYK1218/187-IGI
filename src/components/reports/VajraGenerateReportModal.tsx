import React, { useState } from 'react';
import { Sparkles, X, Download, Send, CheckCircle2, Shield, FileText } from 'lucide-react';
import { ReportItem } from './reportTypes';
import { downloadFile } from '../../utils/fileDownloader';
import { generateTacticalReportPdf } from '../../utils/pdfReportGenerator';

interface VajraGenerateReportModalProps {
  onClose: () => void;
  onReportGenerated: (newReport: ReportItem) => void;
  onShowToast: (msg: string) => void;
}

export const VajraGenerateReportModal: React.FC<VajraGenerateReportModalProps> = ({
  onClose,
  onReportGenerated,
  onShowToast
}) => {
  const [title, setTitle] = useState('Automated Threat Assessment - Sector 7');
  const [region, setRegion] = useState('J&K (LoC)');
  const [classification, setClassification] = useState('HIGH // RESTRICTED');
  const [format, setFormat] = useState<'pdf' | 'txt' | 'json' | 'csv'>('pdf');
  const [scope, setScope] = useState(
    'Synthesize drone sensor optical feeds, radar telemetry, and ground patrol movements over the last 24-hour operational window along the forward perimeter.'
  );

  const handleGenerate = () => {
    const reportNum = Math.floor(45873 + Math.random() * 200);
    const newId = `RPT-${reportNum}`;
    const now = new Date();
    const dateTimeStr = `${now.getDate()} Sep 2026 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    let reportType: 'Threat' | 'Incident' | 'Operational' | 'Analysis' = 'Operational';
    if (classification.includes('CRITICAL')) reportType = 'Incident';
    else if (classification.includes('HIGH')) reportType = 'Threat';

    const newReport: ReportItem = {
      id: newId,
      type: reportType,
      title: title.trim() || 'Tactical Sector Intelligence Assessment',
      region: region,
      dateTime: dateTimeStr,
      status: classification.includes('CRITICAL') ? 'Critical' : classification.includes('HIGH') ? 'High' : 'Medium',
      summary: scope.trim() || 'Comprehensive sensor fusion telemetry report compiled.',
      confidence: '96%'
    };

    // Trigger real file download
    if (format === 'pdf') {
      generateTacticalReportPdf({
        id: newId,
        title: newReport.title,
        region: newReport.region,
        timestamp: dateTimeStr,
        classification,
        status: newReport.status,
        summary: newReport.summary,
        confidence: '96.4%',
        directives: [
          '1. Maintain continuous UAV aerial surveillance across targeted sector corridor.',
          '2. Direct ground patrol unit to sweep forward sensor perimeter.',
          '3. Relay automated real-time telemetry to Tri-Services Command Node.'
        ]
      });
    } else if (format === 'json') {
      const jsonContent = JSON.stringify({
        report_id: newId,
        security_classification: classification,
        target_sector: region,
        timestamp: dateTimeStr,
        executive_title: newReport.title,
        operational_summary: newReport.summary,
        status: newReport.status,
        ai_confidence_metric: '96.2%',
        tactical_directives: [
          'Initiate automated radar sweep along forward fence line corridor.',
          'Alert Sector 7 Quick Reaction Command Post (QRT).',
          'Transmit encrypted coordinates package to Bharat Central Switch.'
        ]
      }, null, 2);
      downloadFile(`VAJRA_Dossier_${newId}.json`, jsonContent, 'application/json');
    } else if (format === 'csv') {
      const headers = 'Report_ID,Classification,Region,DateTime,Title,Status,Confidence,Summary';
      const row = `"${newId}","${classification}","${region}","${dateTimeStr}","${newReport.title.replace(/"/g, '""')}","${newReport.status}","96%","${newReport.summary.replace(/"/g, '""')}"`;
      downloadFile(`VAJRA_Dossier_${newId}.csv`, `${headers}\n${row}`, 'text/csv;charset=utf-8');
    } else {
      const txtContent = `================================================================================
VAJRA TACTICAL DEFENSE PLATFORM - CLASSIFIED INTELLIGENCE DOSSIER
SECURITY CLASSIFICATION: ${classification}
================================================================================
REPORT IDENTIFIER : ${newId}
TARGET REGION     : ${region}
GENERATION TIME   : ${dateTimeStr} IST
AUTHORITY         : VAJRA AI CORE COMMAND // BHARAT DEFENSE FORCES
AI CONFIDENCE     : 96.2% PATTERN VERIFIED
--------------------------------------------------------------------------------
EXECUTIVE TITLE:
${newReport.title}

OPERATIONAL SCOPE & RECONNAISSANCE SUMMARY:
${newReport.summary}

SENSOR TELEMETRY CHANNELS:
- Satellite Optical Verification : ACTIVE (LOCKED)
- Drone Reconnaissance Link     : FLIR THERMAL OK
- Border Seismic Fence Sensor    : ONLINE
- Quantum Encryption Status      : SECURE 256-BIT ENCLAVE

AI TACTICAL ACTION DIRECTIVES:
1. Maintain continuous UAV aerial surveillance across Sector 7 corridor.
2. Direct ground patrol unit to sweep coordinates 34°08'N, 74°47'E.
3. Relay automated real-time telemetry to Tri-Services Command Node.
================================================================================
END OF DOSSIER // RESTRICTED ACCESS ONLY
================================================================================`;
      downloadFile(`VAJRA_Dossier_${newId}.txt`, txtContent, 'text/plain;charset=utf-8');
    }

    onReportGenerated(newReport);
    onShowToast(`Tactical Report ${newId} generated and file downloaded (${format.toUpperCase()})`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-xl bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_45px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 bg-[#031533] border-b border-cyan-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/90 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-tech font-bold text-white tracking-wider">
                GENERATE AI TACTICAL REPORT
              </h3>
              <p className="text-[10px] font-mono-code text-cyan-400">
                AI SENSOR FUSION & AUTOMATED DOSSIER COMPILER
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

        {/* Modal Form */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs font-mono-code text-slate-200">
          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
              REPORT TITLE
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#031533] border border-cyan-500/40 focus:border-cyan-400 rounded-xl px-3 py-2 text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                TARGET REGION / SECTOR
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 focus:border-cyan-400 rounded-xl px-3 py-2 text-cyan-300 outline-none cursor-pointer"
              >
                <option value="J&K (LoC)">J&K (LoC)</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Delhi HQ">Delhi HQ</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Odisha">Odisha</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                SECURITY CLASSIFICATION
              </label>
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                className="w-full bg-[#031533] border border-cyan-500/40 focus:border-cyan-400 rounded-xl px-3 py-2 text-amber-300 outline-none cursor-pointer"
              >
                <option value="HIGH // RESTRICTED">HIGH // RESTRICTED</option>
                <option value="CRITICAL // TOP SECRET">CRITICAL // TOP SECRET</option>
                <option value="OPERATIONAL // STANDARD">OPERATIONAL // STANDARD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
              DOWNLOAD FILE FORMAT
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`py-2 px-2 rounded-xl border text-center transition cursor-pointer font-bold text-xs ${
                  format === 'pdf'
                    ? 'bg-red-950 border-red-500 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                    : 'bg-[#031533] border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                📕 PDF Report
              </button>
              <button
                type="button"
                onClick={() => setFormat('txt')}
                className={`py-2 px-2 rounded-xl border text-center transition cursor-pointer font-bold text-xs ${
                  format === 'txt'
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    : 'bg-[#031533] border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                📄 TXT Dossier
              </button>
              <button
                type="button"
                onClick={() => setFormat('json')}
                className={`py-2 px-2 rounded-xl border text-center transition cursor-pointer font-bold text-xs ${
                  format === 'json'
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    : 'bg-[#031533] border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                ⚙️ JSON Feed
              </button>
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`py-2 px-2 rounded-xl border text-center transition cursor-pointer font-bold text-xs ${
                  format === 'csv'
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    : 'bg-[#031533] border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                📊 CSV Sheet
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
              OPERATIONAL SCOPE & SENSOR CORRELATION DIRECTIVES
            </label>
            <textarea
              rows={3}
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="w-full bg-[#031533] border border-cyan-500/40 focus:border-cyan-400 rounded-xl p-3 text-slate-200 outline-none leading-relaxed resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center gap-2.5 text-[11px] text-cyan-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Clicking <strong>Generate Dossier & Download</strong> will compile real sensor telemetry and immediately trigger a direct browser file download.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-[#031533] border-t border-cyan-500/40 flex items-center justify-between">
          <span className="text-[10px] font-mono-code text-slate-400">
            BHARAT DEFENSE INTEL RECON
          </span>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-code transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold flex items-center gap-2 text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Generate Dossier & Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
