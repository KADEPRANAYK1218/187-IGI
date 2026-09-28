import React, { useState } from 'react';
import { Archive, X, Download, Search, FileText, CheckCircle2, Shield, Calendar, Filter } from 'lucide-react';
import { downloadFile } from '../../utils/fileDownloader';
import { ArchiveItem } from './reportTypes';

interface VajraArchiveModalProps {
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const VajraArchiveModal: React.FC<VajraArchiveModalProps> = ({
  onClose,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const archives: ArchiveItem[] = [
    {
      id: 'ARC-2026-Q2',
      name: 'VAJRA_Border_Recon_Audit_Q2_2026.csv',
      size: '1.4 MB',
      records: '412 Records',
      period: 'Apr 2026 - Jun 2026',
      region: 'LoC & Western Desert',
      type: 'CSV',
      mimeType: 'text/csv;charset=utf-8',
      content: `Report_ID,Sector,Incident_Type,Neutralized,Timestamp,Confidence
ARC-101,J&K,Drone Cross-Border,YES,2026-05-12T04:22:00Z,96%
ARC-102,Punjab,Smuggling Trawler,YES,2026-05-18T22:15:00Z,94%
ARC-103,Rajasthan,Convoy Infiltration,YES,2026-06-04T19:30:00Z,92%
ARC-104,Ladakh,Perimeter Anomaly,CONFIRMED,2026-06-22T08:10:00Z,98%
ARC-105,Delhi HQ,Cyber Port Probe,BLOCKED,2026-06-29T14:45:00Z,99%
ARC-106,Gujarat,Unflagged Maritime Craft,INTERCEPTED,2026-06-30T11:20:00Z,91%`
    },
    {
      id: 'ARC-2026-AUG',
      name: 'Cyber_Intrusion_Forensics_Aug2026.json',
      size: '840 KB',
      records: '158 Forensics Logs',
      period: 'Aug 2026',
      region: 'National Fiber Switch Nodes',
      type: 'JSON',
      mimeType: 'application/json',
      content: JSON.stringify({
        archive_id: 'ARC-2026-AUG',
        classification: 'RESTRICTED // CYBER COMMAND HQ',
        period: 'August 2026',
        total_intrusions_repelled: 158,
        quantum_firewall_status: 'ZERO_BREACHES',
        top_vectors: [
          { vector: 'Brute Force SSH', count: 64, neutralized: '100%' },
          { vector: 'DDoS Amplification', count: 48, neutralized: '100%' },
          { vector: 'Credential Stuffing', count: 46, neutralized: '100%' }
        ],
        notable_events: [
          { node: 'DELHI-SW-01', timestamp: '2026-08-14T02:11:00Z', status: 'MITIGATED' },
          { node: 'MUMBAI-IX-04', timestamp: '2026-08-28T19:40:00Z', status: 'QUARANTINED' }
        ]
      }, null, 2)
    },
    {
      id: 'ARC-2026-DRONE',
      name: 'Aerial_Drone_Surveillance_Comprehensive_2026.txt',
      size: '2.1 MB',
      records: '286 Flight Logs',
      period: 'Jan 2026 - Sep 2026',
      region: 'Northern Command & LoC',
      type: 'TXT',
      mimeType: 'text/plain;charset=utf-8',
      content: `========================================================================
VAJRA AUTONOMOUS UAV FLIGHT ARCHIVE - NORTHERN COMMAND
CLASSIFICATION: TOP SECRET // COMBAT AIR WING
PERIOD: JANUARY 2026 - SEPTEMBER 2026
========================================================================
TOTAL FLIGHT SORTIES   : 286 SATELLITE-DIRECTED PATROLS
DETECTIONS LOGGED      : 74 LOW-RCS INGRESS ATTEMPTS
JAMMED VIA MESH SHIELD : 74 (100% INTERCEPTION RATE)

SIGNIFICANT SECTOR FLIGHT HIGHLIGHTS:
- Sector 7 Valley (J&K): 32 drone incursions detected via RF telemetry.
- Sector 4 Highway Corridor (Punjab): Continuous 4K FLIR thermal scans.
- Western Desert (Rajasthan): Autonomous night convoy thermal sweeps.

VERIFICATION PROTOCOL:
All reconnaissance frames cryptographically hashed with SHA-256 and 
synchronized with Bharat Defense Central Repository.
========================================================================`
    },
    {
      id: 'ARC-2026-IED',
      name: 'IED_Neutralization_Logs_H1_2026.csv',
      size: '620 KB',
      records: '64 Disposals',
      period: 'Jan 2026 - Jun 2026',
      region: 'Punjab & J&K Highways',
      type: 'CSV',
      mimeType: 'text/csv;charset=utf-8',
      content: `Disposal_ID,Location,Explosive_Type,Weight_Kg,Disposal_Unit,Status,Neutralization_Time
IED-01,NH-1A Mile 44,RDX Composite,4.5,Squad Alpha,NEUTRALIZED,2026-01-14T06:12:00Z
IED-02,Sector 7 Canal,Ammonium Nitrate,8.2,Squad Bravo,NEUTRALIZED,2026-02-28T11:45:00Z
IED-03,Gurdaspur Bypass,PEK Plastic,3.1,Squad Delta,NEUTRALIZED,2026-04-09T18:20:00Z
IED-04,Pathankot North,Military Grade Gel,5.4,Squad Alpha,NEUTRALIZED,2026-05-22T04:30:00Z
IED-05,Baramulla Approach,Remote Detonator IED,2.8,Squad Charlie,NEUTRALIZED,2026-06-18T14:15:00Z`
    },
    {
      id: 'ARC-2025-ANNUAL',
      name: 'Annual_Threat_Vector_Summary_2025_2026.json',
      size: '3.8 MB',
      records: '1,280 Dossiers',
      period: '2025 - 2026 Fiscal',
      region: 'All Operational Commands',
      type: 'JSON',
      mimeType: 'application/json',
      content: JSON.stringify({
        archive_id: 'ARC-2025-ANNUAL',
        title: 'Integrated Tri-Services Annual Defense Dossier',
        reporting_commands: ['Northern Command', 'Western Command', 'Southern Naval', 'Air Defense', 'Cyber'],
        aggregate_metrics: {
          total_reports_processed: 1280,
          threat_reduction_trend: '34% improvement vs previous fiscal',
          critical_response_time_seconds: 42,
          sensor_fusion_uptime: '99.98%'
        },
        cyber_resilience: 'Zero nodal penetration recorded on quantum intranet backbone.'
      }, null, 2)
    }
  ];

  const filteredArchives = archives.filter(item => {
    if (selectedCategory !== 'ALL' && item.type !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.period.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDownloadSingle = (item: ArchiveItem) => {
    downloadFile(item.name, item.content, item.mimeType);
    onShowToast(`Archived file ${item.name} downloaded successfully!`);
  };

  const handleDownloadAllBundle = () => {
    const masterBundle = {
      archive_batch_id: `BUNDLE-${Date.now()}`,
      classification: 'RESTRICTED // BHARAT DEFENSE VAULT',
      exported_at: new Date().toISOString(),
      total_archives_included: archives.length,
      archives: archives.map(a => ({
        id: a.id,
        filename: a.name,
        period: a.period,
        region: a.region,
        records: a.records,
        content: a.content
      }))
    };
    downloadFile(
      `VAJRA_Master_Archives_Bundle_${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify(masterBundle, null, 2),
      'application/json'
    );
    onShowToast('Master Intelligence Archive Bundle (.json) downloaded!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-3xl bg-[#020b1c] border border-emerald-500/60 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.3)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#031533] border-b border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/90 border border-emerald-400 flex items-center justify-center text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
              <Archive className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-tech font-bold text-white tracking-wider">
                HISTORICAL INTELLIGENCE ARCHIVE REPOSITORY
              </h3>
              <p className="text-[10px] font-mono-code text-emerald-400">
                DEEP STORAGE DOSSIERS // 2025 - 2026 FISCAL
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

        {/* Search & Filter Toolbar */}
        <div className="p-3 bg-[#020e24] border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search archive files, sectors, dates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#031533] border border-emerald-500/40 focus:border-emerald-400 rounded-xl pl-9 pr-3 py-1.5 text-xs font-mono-code text-slate-100 outline-none placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[10px] font-mono-code bg-[#031533] p-1 rounded-xl border border-slate-700">
              {['ALL', 'CSV', 'JSON', 'TXT'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-lg font-bold transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-950 border border-emerald-400 text-emerald-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={handleDownloadAllBundle}
              className="px-3 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-400 text-emerald-300 text-xs font-mono-code font-bold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Master Bundle</span>
            </button>
          </div>
        </div>

        {/* Archive Files List */}
        <div className="p-4 overflow-y-auto space-y-3">
          {filteredArchives.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-[#031533]/80 border border-slate-800 hover:border-emerald-500/60 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5 group-hover:scale-105 transition">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-tech font-bold text-white group-hover:text-emerald-300 transition">
                      {item.name}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-500/80 text-[8.5px] font-mono-code font-bold text-emerald-400">
                      {item.type}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono-code text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>Period: <strong className="text-slate-200">{item.period}</strong></span>
                    <span>•</span>
                    <span>Sector: <strong className="text-slate-200">{item.region}</strong></span>
                    <span>•</span>
                    <span>Records: <strong className="text-slate-200">{item.records}</strong></span>
                    <span>•</span>
                    <span>Size: <strong className="text-emerald-400">{item.size}</strong></span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownloadSingle(item)}
                className="self-end sm:self-center px-3 py-1.5 rounded-lg bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-400 text-emerald-300 text-xs font-mono-code font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Archive</span>
              </button>
            </div>
          ))}

          {filteredArchives.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs font-mono-code">
              No archived dossiers matching query "{searchQuery}".
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#031533] border-t border-emerald-500/40 flex items-center justify-between text-[10px] font-mono-code text-slate-400">
          <span>CLASSIFICATION: HISTORICAL AUDIT LOG // RESTRICTED ACCESS</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-code transition cursor-pointer"
          >
            Close Repository
          </button>
        </div>
      </div>
    </div>
  );
};
