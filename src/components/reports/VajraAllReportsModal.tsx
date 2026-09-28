import React, { useState, useMemo } from 'react';
import {
  FileText, X, Download, Search, Filter, Eye, AlertTriangle,
  Shield, CheckCircle2, ArrowUpDown
} from 'lucide-react';
import { ReportItem } from './reportTypes';
import { downloadFile } from '../../utils/fileDownloader';
import { generateTacticalReportPdf } from '../../utils/pdfReportGenerator';

interface VajraAllReportsModalProps {
  reports: ReportItem[];
  onClose: () => void;
  onSelectReport: (report: ReportItem) => void;
  onShowToast: (msg: string) => void;
}

export const VajraAllReportsModal: React.FC<VajraAllReportsModalProps> = ({
  reports,
  onClose,
  onSelectReport,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'id' | 'status'>('date');

  const filteredReports = useMemo(() => {
    return reports
      .filter((rpt) => {
        if (selectedType !== 'ALL' && rpt.type !== selectedType) return false;
        if (selectedStatus !== 'ALL' && rpt.status !== selectedStatus) return false;
        if (selectedRegion !== 'ALL' && !rpt.region.includes(selectedRegion)) return false;
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          return (
            rpt.title.toLowerCase().includes(q) ||
            rpt.id.toLowerCase().includes(q) ||
            rpt.region.toLowerCase().includes(q) ||
            rpt.summary.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'id') return b.id.localeCompare(a.id);
        if (sortBy === 'status') return a.status.localeCompare(b.status);
        return b.dateTime.localeCompare(a.dateTime);
      });
  }, [reports, selectedType, selectedStatus, selectedRegion, searchQuery, sortBy]);

  const handleExportCSV = () => {
    const headers = ['Report_ID', 'Classification_Type', 'Title', 'Region', 'Date_Time', 'Status', 'AI_Confidence', 'Executive_Summary'];
    const rows = filteredReports.map((r) => [
      `"${r.id}"`,
      `"${r.type}"`,
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.region}"`,
      `"${r.dateTime}"`,
      `"${r.status}"`,
      `"${r.confidence || '94%'}"`,
      `"${r.summary.replace(/"/g, '""')}"`
    ]);
    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    downloadFile(
      `VAJRA_All_Reports_Ledger_${new Date().toISOString().slice(0, 10)}.csv`,
      csv,
      'text/csv;charset=utf-8'
    );
    onShowToast(`Exported ${filteredReports.length} reports to CSV!`);
  };

  const handleExportJSON = () => {
    const payload = {
      system: 'VAJRA TACTICAL DEFENSE PLATFORM',
      classification: 'RESTRICTED // BHARAT DEFENSE LEDGER',
      exported_at: new Date().toISOString(),
      total_count: filteredReports.length,
      reports: filteredReports
    };
    downloadFile(
      `VAJRA_All_Reports_Ledger_${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify(payload, null, 2),
      'application/json'
    );
    onShowToast(`Exported ${filteredReports.length} reports to JSON!`);
  };

  const handleExportPDF = () => {
    filteredReports.slice(0, 5).forEach((rpt, idx) => {
      setTimeout(() => {
        generateTacticalReportPdf({
          id: rpt.id,
          title: rpt.title,
          region: rpt.region,
          timestamp: rpt.dateTime,
          status: rpt.status,
          confidence: rpt.confidence || '96%',
          summary: rpt.summary,
          type: rpt.type
        });
      }, idx * 300);
    });
    onShowToast(`Exporting ${Math.min(filteredReports.length, 5)} Tactical PDF Dossiers...`);
  };

  const handleDownloadSingle = (e: React.MouseEvent, rpt: ReportItem) => {
    e.stopPropagation();
    generateTacticalReportPdf({
      id: rpt.id,
      title: rpt.title,
      region: rpt.region,
      timestamp: rpt.dateTime,
      status: rpt.status,
      confidence: rpt.confidence || '94%',
      summary: rpt.summary,
      type: rpt.type
    });
    onShowToast(`Tactical PDF report ${rpt.id} downloaded!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-5xl bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_55px_rgba(6,182,212,0.35)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 bg-[#031533] border-b border-cyan-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/90 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-tech font-bold text-white tracking-wider flex items-center gap-2">
                <span>ALL RECONNAISSANCE & TACTICAL REPORTS</span>
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-[9px] font-mono-code text-cyan-300">
                  {filteredReports.length} Active Records
                </span>
              </h3>
              <p className="text-[10px] font-mono-code text-cyan-400">
                COMPLETE MULTI-DOMAIN SURVEILLANCE & THREAT REPOSITORY
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              className="px-2.5 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/70 text-red-200 text-xs font-mono-code font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
              title="Download tactical intelligence reports as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/60 text-cyan-300 text-xs font-mono-code font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-2.5 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-400/60 text-blue-300 text-xs font-mono-code font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-3 bg-[#020e24] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
          {/* Search box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports by title, ID, region, summary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#031533] border border-cyan-500/40 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-1.5 text-xs font-mono-code text-slate-100 outline-none placeholder-slate-500"
            />
          </div>

          {/* Type filters */}
          <div className="flex items-center gap-1 text-[9.5px] font-mono-code bg-[#031533] p-1 rounded-xl border border-slate-700">
            {['ALL', 'Threat', 'Incident', 'Operational', 'Analysis'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2 py-0.5 rounded-lg font-bold transition cursor-pointer ${
                  selectedType === t
                    ? 'bg-cyan-950 border border-cyan-400 text-cyan-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t === 'ALL' ? 'ALL' : t}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#031533] border border-cyan-500/40 rounded-xl px-2.5 py-1.5 text-xs font-mono-code text-cyan-300 outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Region filter */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-[#031533] border border-cyan-500/40 rounded-xl px-2.5 py-1.5 text-xs font-mono-code text-cyan-300 outline-none cursor-pointer"
          >
            <option value="ALL">All Regions</option>
            <option value="J&K">J&K</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Ladakh">Ladakh</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        {/* Ledger Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono-code text-slate-400 uppercase tracking-wider sticky top-0 bg-[#020b1c] z-10">
                <th className="py-2 px-2.5">ID</th>
                <th className="py-2 px-2.5">TYPE</th>
                <th className="py-2 px-2.5">TITLE</th>
                <th className="py-2 px-2.5">REGION</th>
                <th className="py-2 px-2.5">TIMESTAMP</th>
                <th className="py-2 px-2.5">CONFIDENCE</th>
                <th className="py-2 px-2.5">STATUS</th>
                <th className="py-2 px-2.5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/70 text-[11px] font-mono-code">
              {filteredReports.map((rpt) => (
                <tr
                  key={rpt.id}
                  onClick={() => {
                    onSelectReport(rpt);
                    onClose();
                  }}
                  className="hover:bg-[#041638] cursor-pointer transition group"
                >
                  <td className="py-2.5 px-2.5 text-cyan-300 font-bold whitespace-nowrap">
                    {rpt.id}
                  </td>
                  <td className="py-2.5 px-2.5 whitespace-nowrap">
                    {rpt.type === 'Threat' && (
                      <span className="px-1.5 py-0.5 rounded bg-red-950/70 border border-red-500/60 text-red-400 text-[8.5px] font-bold">
                        ▲ Threat
                      </span>
                    )}
                    {rpt.type === 'Incident' && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-500/60 text-amber-400 text-[8.5px] font-bold">
                        ▲ Incident
                      </span>
                    )}
                    {rpt.type === 'Operational' && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/60 text-emerald-400 text-[8.5px] font-bold">
                        🛡 Operational
                      </span>
                    )}
                    {rpt.type === 'Analysis' && (
                      <span className="px-1.5 py-0.5 rounded bg-blue-950/70 border border-blue-500/60 text-blue-400 text-[8.5px] font-bold">
                        🔍 Analysis
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-2.5 font-tech font-bold text-white group-hover:text-cyan-300 transition max-w-[200px] truncate">
                    {rpt.title}
                  </td>
                  <td className="py-2.5 px-2.5 text-slate-300 whitespace-nowrap">
                    {rpt.region}
                  </td>
                  <td className="py-2.5 px-2.5 text-slate-400 text-[10px] whitespace-nowrap">
                    {rpt.dateTime}
                  </td>
                  <td className="py-2.5 px-2.5 text-cyan-400 font-bold whitespace-nowrap">
                    {rpt.confidence || '94%'}
                  </td>
                  <td className="py-2.5 px-2.5 whitespace-nowrap">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[8.5px] font-bold ${
                        rpt.status === 'Critical'
                          ? 'bg-red-950 border border-red-500 text-red-400 animate-pulse'
                          : rpt.status === 'High'
                          ? 'bg-red-950/80 border border-red-500/70 text-red-400'
                          : rpt.status === 'Medium'
                          ? 'bg-amber-950/80 border border-amber-500/70 text-amber-400'
                          : 'bg-emerald-950/80 border border-emerald-500/70 text-emerald-400'
                      }`}
                    >
                      {rpt.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-2.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectReport(rpt);
                          onClose();
                        }}
                        className="p-1 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 hover:text-white transition cursor-pointer"
                        title="Inspect Dossier"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDownloadSingle(e, rpt)}
                        className="p-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
                        title="Download Report File"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredReports.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs font-mono-code">
              No tactical reports found matching the specified filters.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#031533] border-t border-cyan-500/40 flex items-center justify-between text-[10px] font-mono-code text-slate-400">
          <span>CLASSIFIED RECONNAISSANCE DOSSIERS // VAJRA TACTICAL COMMAND</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-code transition cursor-pointer"
          >
            Close Ledger
          </button>
        </div>
      </div>
    </div>
  );
};
