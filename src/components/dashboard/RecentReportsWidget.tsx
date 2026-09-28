import React, { useState } from 'react';
import { FileText, ArrowRight, Download, Eye, X, Check, Shield } from 'lucide-react';
import { generateTacticalReportPdf } from '../../utils/pdfReportGenerator';

export const RecentReportsWidget: React.FC<{ onNavigateToReports?: () => void }> = ({ onNavigateToReports }) => {
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [showAllModal, setShowAllModal] = useState<boolean>(false);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const reports = [
    {
      id: 'rep-1',
      title: 'Mission Report – Sector 7',
      timestamp: '18 Apr 2025 16:20',
      type: 'PDF',
      size: '2.4 MB',
      region: 'Sector 7 (J&K Forward LOC)',
      status: 'High',
      confidence: '98.2%',
      summary: 'Post-ingress recon summary along Sector 7 LOC forward post. All 4 perimeter optical and thermal sensors calibrated with 100% fidelity. Border patrol QRT deployed on high alert.',
      telemetryLogs: [
        '• UAV Drone Falcon-2 Flight Sweep : LOCKED 120km/h // Sector 7 Ingress Path',
        '• Optical Mast High-Res IR Sensor : ONLINE // 100% Quality index',
        '• Forward Perimeter Fence Seismic  : ACTIVE // Zero vibrational breach',
        '• Quantum Cryptographic Gateway   : SECURE 256-Bit Link'
      ],
      directives: [
        '1. Maintain continuous aerial drone sweep over Sector 7 forward post.',
        '2. Verify auxiliary perimeter lighting across fence corridor.',
        '3. Stream live telemetry to Northern Command Headquarters.'
      ]
    },
    {
      id: 'rep-2',
      title: 'Incident Report – Drone',
      timestamp: '18 Apr 2025 14:46',
      type: 'PDF',
      size: '1.8 MB',
      region: 'Western Border (Rajasthan Sector)',
      status: 'Medium',
      confidence: '94.8%',
      summary: 'Telemetry log for UAV Falcon-2 thermal detection anomaly at 14:42 UTC. Electronic countermeasure sweep initiated. Unflagged signal trace isolated and neutralized.',
      telemetryLogs: [
        '• UAV Falcon-2 Telemetry Signal   : Intercepted frequency 433.92 MHz',
        '• Anti-Drone Jammer Node Array     : ACTIVATED // Beam width 45°',
        '• GPS Anti-Spoofing Filter        : ENCLAVE SECURED'
      ],
      directives: [
        '1. Deploy secondary drone interceptor unit to patrol desert perimeter.',
        '2. Log anomalous RF signatures into the Bharat Command Central Database.'
      ]
    },
    {
      id: 'rep-3',
      title: 'Weather Advisory – J&K',
      timestamp: '18 Apr 2025 12:10',
      type: 'PDF',
      size: '950 KB',
      region: 'Jammu & Kashmir (Srinagar Sector)',
      status: 'Info',
      confidence: '97.5%',
      summary: 'Heavy precipitation forecast for Srinagar and Baramulla corridor. Cloud ceiling below 3,500 ft; tactical night optics and thermal infrared sensors recommended for ground convoys.',
      telemetryLogs: [
        '• Atmospheric Radar Sweep         : Rain cell density +45%',
        '• Surface Visibility Metric       : 8.0 km // Decreasing',
        '• Thermal Imager Penetration      : 92% Efficiency'
      ],
      directives: [
        '1. Switch UAV reconnaissance flights to terrain-following radar mode.',
        '2. Equip forward patrols with low-visibility thermal illumination kits.'
      ]
    },
    {
      id: 'rep-4',
      title: 'Resource Utilization',
      timestamp: '18 Apr 2025 10:35',
      type: 'PDF',
      size: '3.1 MB',
      region: 'Integrated Tri-Services Central Command',
      status: 'Low',
      confidence: '99.1%',
      summary: 'Tri-service quarterly equipment readiness assessment. 54 Fire Tanks, 112 Mission Guns, and 63 Active Tactical Drones verified at 100% combat-ready status.',
      telemetryLogs: [
        '• Armored Fleet Serviceability     : 54/54 Tanks Combat Ready',
        '• Artillery & Mission Guns Depot   : 112/112 Calibrated',
        '• Tactical Reconnaissance Drones   : 63/63 Operational Online'
      ],
      directives: [
        '1. Maintain standard scheduled maintenance cycle for heavy armored units.',
        '2. Authorize battery replenishment for tactical surveillance drones.'
      ]
    }
  ];

  const handleDownloadPdf = (report: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    generateTacticalReportPdf({
      id: report.id.toUpperCase().replace('REP-', 'RPT-'),
      title: report.title,
      region: report.region,
      timestamp: report.timestamp,
      status: report.status,
      confidence: report.confidence,
      summary: report.summary,
      telemetryLogs: report.telemetryLogs,
      directives: report.directives
    });

    setDownloadSuccessId(report.id);
    setTimeout(() => {
      setDownloadSuccessId(null);
    }, 2500);
  };

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-4 sm:p-5 flex flex-col justify-between backdrop-blur-xl shadow-xl min-h-[165px]" id="recent-reports-widget">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <FileText className="w-4 h-4 text-cyan-300" />
          </div>
          <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
            RECENT REPORTS
          </h3>
        </div>

        <button
          type="button"
          id="recent-reports-view-all-btn"
          onClick={() => {
            if (onNavigateToReports) {
              onNavigateToReports();
            } else {
              setShowAllModal(true);
            }
          }}
          className="text-xs font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto pr-1">
        {reports.map(report => (
          <div
            key={report.id}
            onClick={() => setSelectedReport(report)}
            className="group flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-cyan-950/40 transition cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText className="w-4 h-4 text-cyan-400 shrink-0 group-hover:text-cyan-300" />
              <div className="min-w-0">
                <div className="text-[11.5px] font-tech font-semibold text-slate-200 truncate group-hover:text-white">
                  {report.title}
                </div>
                <div className="text-[9.5px] font-mono-code text-slate-400">
                  {report.timestamp} • <span className="text-cyan-400/80">{report.region.split('(')[0]}</span>
                </div>
              </div>
            </div>

            {/* Clickable Red PDF Badge / Download Trigger */}
            <button
              type="button"
              onClick={(e) => handleDownloadPdf(report, e)}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/60 hover:border-red-400 text-[9.5px] font-mono-code font-bold text-red-200 transition flex items-center gap-1 cursor-pointer shadow-sm hover:scale-105 active:scale-95 ml-2"
              title="Download Military Tactical PDF Report"
            >
              {downloadSuccessId === report.id ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300">SAVED</span>
                </>
              ) : (
                <>
                  <Download className="w-2.5 h-2.5 text-red-300" />
                  <span>PDF</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* All Reports Archive Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" id="all-reports-modal-overlay">
          <div className="w-full max-w-2xl bg-slate-950 border border-cyan-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl relative max-h-[90vh] flex flex-col" id="all-reports-modal-container">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/50 text-cyan-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-tech font-bold text-white uppercase tracking-wider">
                    OPERATIONAL INTELLIGENCE REPORTS ARCHIVE
                  </h3>
                  <p className="text-xs font-mono-code text-cyan-400">
                    DEEP TELEMETRY & STRATEGIC DISPATCH DOSSIERS ({reports.length} ACTIVE ARCHIVES)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 overflow-y-auto my-4 pr-1 flex-1">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-tech font-bold text-white">{report.title}</span>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        {report.region}
                      </span>
                    </div>
                    <p className="text-xs font-mono-code text-slate-400 mt-1 line-clamp-2">
                      {report.summary}
                    </p>
                    <div className="text-[10px] font-mono-code text-slate-500 mt-1.5 flex items-center gap-3">
                      <span>Logged: {report.timestamp}</span>
                      <span>• Confidence: <strong className="text-emerald-400">{report.confidence}</strong></span>
                      <span>• Size: {report.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedReport(report);
                        setShowAllModal(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono-code flex items-center gap-1 cursor-pointer transition"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Inspect</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDownloadPdf(report, e)}
                      className="px-3 py-1.5 rounded-lg bg-red-950 hover:bg-red-900 border border-red-500/50 text-red-200 text-xs font-mono-code flex items-center gap-1 cursor-pointer transition"
                    >
                      <Download className="w-3.5 h-3.5 text-red-400" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono-code text-slate-400">
              <span>All dispatches verified by Quantum Cryptographic Link</span>
              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-tech font-bold text-xs cursor-pointer shadow-md transition"
              >
                Close Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-tech font-bold text-white tracking-wide">
                  {selectedReport.title}
                </h3>
                <p className="text-xs font-mono-code text-slate-400">
                  Logged: {selectedReport.timestamp} • Region: {selectedReport.region}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono-code text-slate-300 space-y-2">
              <div className="text-cyan-400 font-bold flex items-center justify-between">
                <span>TACTICAL INTELLIGENCE SUMMARY:</span>
                <span className="text-emerald-400 font-bold">CONFIDENCE: {selectedReport.confidence}</span>
              </div>
              <p className="leading-relaxed text-slate-300">{selectedReport.summary}</p>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-tech font-bold transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownloadPdf(selectedReport);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-tech font-bold flex items-center gap-1.5 shadow-lg shadow-red-500/25 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>GENERATE & DOWNLOAD PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
