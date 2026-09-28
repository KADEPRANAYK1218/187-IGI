import React, { useState, useMemo } from 'react';
import {
  FileText, Search, Calendar, MapPin, Filter, Download,
  AlertTriangle, Shield, Folder, Cpu, ArrowUp, ChevronDown,
  CheckCircle2, Compass, PieChart, Printer, X, Eye, Clock,
  ExternalLink, Layers, RefreshCw, Send, Sparkles, Archive, Plus, Camera,
  Maximize2, Globe, Radio, Table
} from 'lucide-react';
import { ReportItem } from './reportTypes';
import { downloadFile } from '../../utils/fileDownloader';
import { generateTacticalReportPdf } from '../../utils/pdfReportGenerator';
import { VajraGenerateReportModal } from './VajraGenerateReportModal';
import { VajraScheduleReportModal } from './VajraScheduleReportModal';
import { VajraArchiveModal } from './VajraArchiveModal';
import { VajraTacticalMapModal } from './VajraTacticalMapModal';
import { VajraAllReportsModal } from './VajraAllReportsModal';

// Report Preview Images
import reportInfiltrationImg from '../../assets/images/patrol_infiltration_valley_1788709882772.jpg';
import reportIedImg from '../../assets/images/ied_roadside_detection_1788709903940.jpg';
import reportDroneImg from '../../assets/images/ai_drone_quadcopter_sky_1788709922432.jpg';
import reportHeatmapImg from '../../assets/images/geospatial_heatmap_intel_1788709946423.jpg';
import indiaNeuralMap from '../../assets/images/india_neural_cyber_map_1788703459745.jpg';

// Initial Tactical Reports Dataset
const initialReports: ReportItem[] = [
  {
    id: 'RPT-45872',
    type: 'Threat',
    title: 'Cross Border Infiltration Activity',
    region: 'J&K (LoC)',
    dateTime: '20 Sep 2026 18:42',
    status: 'High',
    summary: 'Multiple armed groups tracked attempting perimeter ingress along forward line of control. Thermal sensors and drone reconnaissance alerted forward units.',
    image: reportInfiltrationImg,
    confidence: '94%'
  },
  {
    id: 'RPT-45871',
    type: 'Incident',
    title: 'IED Detected - Roadside',
    region: 'Punjab',
    dateTime: '20 Sep 2026 16:27',
    status: 'Critical',
    summary: 'Auxiliary roadside optical anomaly identified along national highway corridor. Bomb disposal squad deployed; controlled neutralization completed.',
    image: reportIedImg,
    confidence: '96%'
  },
  {
    id: 'RPT-45870',
    type: 'Operational',
    title: 'Vehicle Movement - Suspicious',
    region: 'Rajasthan',
    dateTime: '20 Sep 2026 14:12',
    status: 'Medium',
    summary: 'Night convoy formation detected outside approved transit corridor. Geospatial tactical heatmap tracking initiated across western desert command.',
    image: reportHeatmapImg,
    confidence: '82%'
  },
  {
    id: 'RPT-45869',
    type: 'Analysis',
    title: 'AI Pattern - Drone Activity',
    region: 'J&K',
    dateTime: '20 Sep 2026 12:36',
    status: 'Info',
    summary: 'Predictive neural cluster indicates a 32% rise in localized quadcopter flights during night hours across Sector 7 valley sector.',
    image: reportDroneImg,
    confidence: '91%'
  },
  {
    id: 'RPT-45868',
    type: 'Threat',
    title: 'Cyber Intrusion Attempt',
    region: 'Delhi',
    dateTime: '20 Sep 2026 11:03',
    status: 'High',
    summary: 'Brute-force and credential stuffing attack aimed at strategic nodal switch gateway blocked by VAJRA quantum-resistant firewall.',
    confidence: '98%'
  },
  {
    id: 'RPT-45867',
    type: 'Operational',
    title: 'Border Patrol Summary',
    region: 'Ladakh',
    dateTime: '20 Sep 2026 09:18',
    status: 'Low',
    summary: 'Routine high-altitude perimeter patrol completed by 14th Corps reconnaissance division. All optical communication masts functional.',
    confidence: '99%'
  },
  {
    id: 'RPT-45866',
    type: 'Incident',
    title: 'Unusual Vehicle Movement',
    region: 'Gujarat',
    dateTime: '20 Sep 2026 07:44',
    status: 'Medium',
    summary: 'Coastal radar detected unflagged utility trawler changing coordinates abruptly 12 nautical miles off the Rann of Kutch marshlands.',
    confidence: '85%'
  },
  {
    id: 'RPT-45865',
    type: 'Analysis',
    title: 'Weather Impact Assessment',
    region: 'North Zone',
    dateTime: '19 Sep 2026 21:17',
    status: 'Info',
    summary: 'Sudden cold front and mountain cloud ceiling below 4,000 ft affecting low-altitude visual UAV reconnaissance flight safety.',
    confidence: '95%'
  }
];

export const VajraReportsView: React.FC = () => {
  const [allReports, setAllReports] = useState<ReportItem[]>(initialReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Reports');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 7 Days');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  // Quick Filter within Recent Reports table
  const [recentFilter, setRecentFilter] = useState<'ALL' | 'Threat' | 'Incident' | 'Operational' | 'Analysis'>('ALL');

  // Modals state
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showAllReportsModal, setShowAllReportsModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showTypeFilterMenu, setShowTypeFilterMenu] = useState(false);

  // Toast Notification state
  const [showExportToast, setShowExportToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Tactical Intelligence Dossier Exported Successfully');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3500);
  };

  // Report Previews dataset (4 cards in the dedicated row)
  const previewReports: ReportItem[] = [
    allReports[0] || initialReports[0], // Cross Border Infiltration Activity
    allReports[1] || initialReports[1], // IED Detected - Roadside
    allReports[3] || initialReports[3], // AI Pattern - Drone Activity
    allReports[2] || initialReports[2], // Vehicle Movement - Suspicious
  ];

  // Filtered reports by top global toolbar
  const filteredReports = useMemo(() => {
    return allReports.filter(report => {
      // Type filter
      if (selectedType !== 'All Reports') {
        const typeKey = selectedType.replace(' Reports', '').trim();
        if (typeKey === 'Threat' && report.type !== 'Threat') return false;
        if (typeKey === 'Incident' && report.type !== 'Incident') return false;
        if (typeKey === 'Operational' && report.type !== 'Operational') return false;
        if (typeKey === 'AI Analysis' && report.type !== 'Analysis') return false;
      }
      // Region filter
      if (selectedRegion !== 'All Regions') {
        if (!report.region.toLowerCase().includes(selectedRegion.toLowerCase().split(' ')[0])) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = report.title.toLowerCase().includes(query);
        const matchId = report.id.toLowerCase().includes(query);
        const matchRegion = report.region.toLowerCase().includes(query);
        if (!matchTitle && !matchId && !matchRegion) return false;
      }
      return true;
    });
  }, [allReports, selectedType, selectedRegion, searchQuery]);

  // Recent Reports table filtered by local quick tabs
  const recentDisplayedReports = useMemo(() => {
    return filteredReports.filter(rpt => {
      if (recentFilter === 'ALL') return true;
      return rpt.type === recentFilter;
    });
  }, [filteredReports, recentFilter]);

  // Real File Export Handlers
  const handleExportCSV = () => {
    const headers = ['Report_ID', 'Classification_Type', 'Title', 'Region', 'Date_Time', 'Status', 'AI_Confidence', 'Executive_Summary'];
    const rows = allReports.map(r => [
      `"${r.id}"`,
      `"${r.type}"`,
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.region}"`,
      `"${r.dateTime}"`,
      `"${r.status}"`,
      `"${r.confidence || '94%'}"`,
      `"${r.summary.replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadFile(
      `VAJRA_Intelligence_Reports_${new Date().toISOString().slice(0, 10)}.csv`,
      csvContent,
      'text/csv;charset=utf-8'
    );
    showToast(`Exported ${allReports.length} reports: VAJRA_Intelligence_Reports.csv downloaded!`);
  };

  const handleExportPDF = () => {
    filteredReports.slice(0, 5).forEach((rpt, idx) => {
      setTimeout(() => {
        handleDownloadSingleReport(rpt);
      }, idx * 300);
    });
    showToast(`Generating ${Math.min(filteredReports.length, 5)} Tactical PDF Dossiers...`);
  };

  const handleDownloadSingleReport = (rpt: ReportItem) => {
    generateTacticalReportPdf({
      id: rpt.id,
      title: rpt.title,
      region: rpt.region,
      timestamp: rpt.dateTime,
      status: rpt.status,
      confidence: rpt.confidence || '94%',
      summary: rpt.summary,
      type: rpt.type,
      directives: [
        '1. Dispatch aerial telemetry sweep along designated sector corridor.',
        '2. Escalate threat level to Sector Commander (Command IC-7K42P9).',
        '3. Transmit encrypted telemetry package to Bharat Command Central Node.'
      ]
    });
    showToast(`Tactical PDF Dossier ${rpt.id}.pdf generated & downloaded!`);
  };

  return (
    <div className="w-full flex flex-col space-y-3.5 select-none text-slate-100 font-tech" id="vajra-reports-view">
      {/* ========================================================
          1. HEADER & TOP FILTER TOOLBAR
         ======================================================== */}
      <div className="rounded-2xl bg-[#020b1c]/95 border border-[#0055ff]/40 p-3 sm:p-4 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Title Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0">
            <FileText className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-wide text-white flex items-center gap-3 leading-tight">
              REPORTS
            </h1>
            <div className="text-[10px] sm:text-[11px] font-mono-code font-bold tracking-[0.25em] text-cyan-400 uppercase">
              INTELLIGENCE • OPERATIONAL • COMPLIANCE
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Report Type Selector */}
          <div className="flex flex-col">
            <label className="text-[9px] font-mono-code font-bold text-slate-400 mb-0.5 uppercase tracking-wider">
              Report Type
            </label>
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-1.5 pr-8 text-xs font-mono-code text-cyan-300 focus:outline-none focus:border-cyan-400 cursor-pointer shadow-inner"
              >
                <option value="All Reports">All Reports</option>
                <option value="Threat Reports">Threat Reports</option>
                <option value="Incident Reports">Incident Reports</option>
                <option value="Operational Reports">Operational Reports</option>
                <option value="AI Analysis Reports">AI Analysis</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Date Range Selector */}
          <div className="flex flex-col">
            <label className="text-[9px] font-mono-code font-bold text-slate-400 mb-0.5 uppercase tracking-wider">
              Date Range
            </label>
            <div className="relative">
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="appearance-none bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-1.5 pr-8 text-xs font-mono-code text-cyan-300 focus:outline-none focus:border-cyan-400 cursor-pointer shadow-inner"
              >
                <option value="Last 24 Hours">Last 24 Hours</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Quarterly">Quarterly</option>
              </select>
              <Calendar className="w-3.5 h-3.5 text-cyan-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Region Selector */}
          <div className="flex flex-col">
            <label className="text-[9px] font-mono-code font-bold text-slate-400 mb-0.5 uppercase tracking-wider">
              Region
            </label>
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="appearance-none bg-[#031533] border border-cyan-500/40 rounded-xl px-3 py-1.5 pr-8 text-xs font-mono-code text-cyan-300 focus:outline-none focus:border-cyan-400 cursor-pointer shadow-inner"
              >
                <option value="All Regions">All Regions</option>
                <option value="J&K (LoC)">J&K (LoC)</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Delhi">Delhi</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Search Box */}
          <div className="flex flex-col flex-1 sm:w-56">
            <label className="text-[9px] font-mono-code font-bold text-transparent mb-0.5 select-none">
              Search
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports by keyword...."
                className="w-full bg-[#031533] border border-cyan-500/40 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono-code text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Reset / Active Indicator */}
          {(selectedType !== 'All Reports' || selectedRegion !== 'All Regions' || selectedDateRange !== 'Last 7 Days' || searchQuery || recentFilter !== 'ALL') && (
            <div className="flex flex-col justify-end">
              <label className="text-[9px] font-mono-code font-bold text-transparent mb-0.5 select-none">Reset</label>
              <button
                onClick={() => {
                  setSelectedType('All Reports');
                  setSelectedRegion('All Regions');
                  setSelectedDateRange('Last 7 Days');
                  setSearchQuery('');
                  setRecentFilter('ALL');
                  showToast('All filters cleared and reset to default');
                }}
                className="px-2.5 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400 text-cyan-300 text-xs font-mono-code font-bold flex items-center gap-1.5 transition cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                title="Clear all active filters"
              >
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          2. 5 KPI METRIC SUMMARY CARDS ROW
         ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
        {/* Card 1: TOTAL REPORTS */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-lg flex items-center gap-3.5 group hover:border-cyan-400/60 transition">
          <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
            <FileText className="w-5 h-5 text-cyan-300" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9.5px] font-mono-code font-bold tracking-wider text-slate-400 uppercase">
              TOTAL REPORTS
            </div>
            <div className="text-2xl font-tech font-bold text-white tracking-tight mt-0.5">
              246
            </div>
            <div className="flex items-center gap-1 text-[9.5px] font-mono-code font-semibold text-emerald-400 mt-0.5">
              <span>▲ 18%</span>
              <span className="text-slate-400 font-normal text-[8.5px]">vs. previous 7 days</span>
            </div>
          </div>
        </div>

        {/* Card 2: INCIDENT REPORTS */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-lg flex items-center gap-3.5 group hover:border-red-500/60 transition">
          <div className="w-11 h-11 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 shadow-[0_0_12px_rgba(239,68,68,0.25)]">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9.5px] font-mono-code font-bold tracking-wider text-slate-400 uppercase">
              INCIDENT REPORTS
            </div>
            <div className="text-2xl font-tech font-bold text-white tracking-tight mt-0.5">
              48
            </div>
            <div className="flex items-center gap-1 text-[9.5px] font-mono-code font-semibold text-red-400 mt-0.5">
              <span>▲ 32%</span>
              <span className="text-slate-400 font-normal text-[8.5px]">vs. previous 7 days</span>
            </div>
          </div>
        </div>

        {/* Card 3: THREAT REPORTS */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-lg flex items-center gap-3.5 group hover:border-blue-500/60 transition">
          <div className="w-11 h-11 rounded-xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.25)]">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9.5px] font-mono-code font-bold tracking-wider text-slate-400 uppercase">
              THREAT REPORTS
            </div>
            <div className="text-2xl font-tech font-bold text-white tracking-tight mt-0.5">
              72
            </div>
            <div className="flex items-center gap-1 text-[9.5px] font-mono-code font-semibold text-emerald-400 mt-0.5">
              <span>▲ 21%</span>
              <span className="text-slate-400 font-normal text-[8.5px]">vs. previous 7 days</span>
            </div>
          </div>
        </div>

        {/* Card 4: OPERATIONAL REPORTS */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-lg flex items-center gap-3.5 group hover:border-cyan-500/60 transition">
          <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
            <Folder className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9.5px] font-mono-code font-bold tracking-wider text-slate-400 uppercase">
              OPERATIONAL REPORTS
            </div>
            <div className="text-2xl font-tech font-bold text-white tracking-tight mt-0.5">
              98
            </div>
            <div className="flex items-center gap-1 text-[9.5px] font-mono-code font-semibold text-emerald-400 mt-0.5">
              <span>▲ 14%</span>
              <span className="text-slate-400 font-normal text-[8.5px]">vs. previous 7 days</span>
            </div>
          </div>
        </div>

        {/* Card 5: AI ANALYSIS REPORTS */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-lg flex items-center gap-3.5 group hover:border-purple-500/60 transition">
          <div className="w-11 h-11 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.25)]">
            <Cpu className="w-5 h-5 text-purple-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9.5px] font-mono-code font-bold tracking-wider text-slate-400 uppercase">
              AI ANALYSIS REPORTS
            </div>
            <div className="text-2xl font-tech font-bold text-white tracking-tight mt-0.5">
              28
            </div>
            <div className="flex items-center gap-1 text-[9.5px] font-mono-code font-semibold text-emerald-400 mt-0.5">
              <span>▲ 9%</span>
              <span className="text-slate-400 font-normal text-[8.5px]">vs. previous 7 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. MIDDLE SECTION: 3 COLUMNS
          (Recent Reports Table | Reports by Region Map | Reports by Type Donut)
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* 3A. RECENT REPORTS (Table) - 5 Cols */}
        <div className="lg:col-span-5 rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#0055ff]/30 mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                  RECENT REPORTS
                </span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[9px] font-mono-code text-cyan-300 font-bold">
                  {recentDisplayedReports.length}
                </span>
              </div>
              <button
                onClick={() => setShowAllReportsModal(true)}
                className="text-[10px] font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer font-bold"
              >
                <span>View All ({allReports.length})</span>
                <span>→</span>
              </button>
            </div>

            {/* Filter option in Recent Reports */}
            <div className="flex items-center gap-1 pb-2 mb-2.5 border-b border-slate-800/80 overflow-x-auto text-[9px] font-mono-code">
              <button
                onClick={() => {
                  const nextFilter = recentFilter === 'ALL' ? 'Threat' : recentFilter === 'Threat' ? 'Incident' : recentFilter === 'Incident' ? 'Operational' : recentFilter === 'Operational' ? 'Analysis' : 'ALL';
                  setRecentFilter(nextFilter as any);
                  showToast(`Filter: ${nextFilter}`);
                }}
                title="Click to cycle filter or reset"
                className="text-slate-300 hover:text-cyan-300 mr-1 flex items-center gap-1 shrink-0 font-bold transition cursor-pointer p-0.5 rounded hover:bg-[#031533]"
              >
                <Filter className="w-3 h-3 text-cyan-400" />
                <span>FILTER:</span>
              </button>
              {[
                { label: 'ALL', value: 'ALL' },
                { label: '▲ Threat', value: 'Threat' },
                { label: '▲ Incident', value: 'Incident' },
                { label: '🛡 Operational', value: 'Operational' },
                { label: '🔍 Analysis', value: 'Analysis' }
              ].map(f => {
                const isActive = recentFilter === f.value;
                return (
                  <button
                    key={f.value}
                    onClick={() => setRecentFilter(f.value as any)}
                    className={`px-2 py-0.5 rounded transition cursor-pointer font-bold whitespace-nowrap ${
                      isActive
                        ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                        : 'bg-[#031533] border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[9px] font-mono-code text-slate-400 uppercase">
                    <th className="py-1.5 px-2">ID</th>
                    <th className="py-1.5 px-2">TYPE</th>
                    <th className="py-1.5 px-2">TITLE</th>
                    <th className="py-1.5 px-2">REGION</th>
                    <th className="py-1.5 px-2">DATE & TIME</th>
                    <th className="py-1.5 px-2 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850/60 text-[10px]">
                  {recentDisplayedReports.slice(0, 8).map((rpt) => {
                    const isThreat = rpt.type === 'Threat';
                    const isIncident = rpt.type === 'Incident';
                    const isOperational = rpt.type === 'Operational';
                    const isAnalysis = rpt.type === 'Analysis';

                    return (
                      <tr
                        key={rpt.id}
                        onClick={() => setSelectedReport(rpt)}
                        className="hover:bg-[#041638]/70 cursor-pointer transition group"
                      >
                        <td className="py-2 px-2 font-mono-code text-cyan-300 font-bold whitespace-nowrap">
                          {rpt.id}
                        </td>
                        <td className="py-2 px-2 whitespace-nowrap">
                          {isThreat && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-950/70 border border-red-500/60 text-red-400 font-mono-code text-[8.5px] font-bold">
                              ▲ Threat
                            </span>
                          )}
                          {isIncident && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-500/60 text-amber-400 font-mono-code text-[8.5px] font-bold">
                              ▲ Incident
                            </span>
                          )}
                          {isOperational && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/60 text-emerald-400 font-mono-code text-[8.5px] font-bold">
                              🛡 Operational
                            </span>
                          )}
                          {isAnalysis && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-950/70 border border-blue-500/60 text-blue-400 font-mono-code text-[8.5px] font-bold">
                              🔍 Analysis
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-2 font-tech font-bold text-slate-100 group-hover:text-cyan-300 transition max-w-[140px] truncate">
                          {rpt.title}
                        </td>
                        <td className="py-2 px-2 font-mono-code text-slate-300 whitespace-nowrap">
                          {rpt.region}
                        </td>
                        <td className="py-2 px-2 font-mono-code text-slate-400 text-[9px] whitespace-nowrap">
                          {rpt.dateTime}
                        </td>
                        <td className="py-2 px-2 text-right whitespace-nowrap">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[8.5px] font-mono-code font-bold ${
                              rpt.status === 'Critical'
                                ? 'bg-red-950 border border-red-500 text-red-400 animate-pulse'
                                : rpt.status === 'High'
                                ? 'bg-red-950/80 border border-red-500/70 text-red-400'
                                : rpt.status === 'Medium'
                                ? 'bg-amber-950/80 border border-amber-500/70 text-amber-400'
                                : rpt.status === 'Low'
                                ? 'bg-emerald-950/80 border border-emerald-500/70 text-emerald-400'
                                : 'bg-blue-950/80 border border-blue-500/70 text-blue-400'
                            }`}
                          >
                            {rpt.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {recentDisplayedReports.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 font-mono-code text-[11px]">
                        No reports matching "{recentFilter}" category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3B. REPORTS BY REGION (Map) - 4 Cols */}
        <div className="lg:col-span-4 rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#0055ff]/30 mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                REPORTS BY REGION
              </span>
            </div>
          </div>

          {/* Map + Region Stats Layout */}
          <div className="relative flex-1 flex items-center justify-between gap-3 min-h-[200px]">
            {/* Holographic Glowing India Map */}
            <div className="relative w-3/5 h-48 flex items-center justify-center">
              <img
                src={indiaNeuralMap}
                alt="Reports by Region Bharat Map"
                className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                referrerPolicy="no-referrer"
              />

              {/* Pulsing Tactical Node Markers on India Map */}
              {/* J&K Node */}
              <div className="absolute top-[18%] left-[42%] flex items-center justify-center">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500/40 animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
              </div>

              {/* Punjab Node */}
              <div className="absolute top-[28%] left-[36%] flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-orange-500/40 animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
              </div>

              {/* Rajasthan Node */}
              <div className="absolute top-[38%] left-[28%] flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-yellow-500/40 animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
              </div>

              {/* Gujarat Node */}
              <div className="absolute top-[50%] left-[22%] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 animate-ping absolute" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
              </div>

              {/* Maharashtra Node */}
              <div className="absolute top-[60%] left-[36%] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
              </div>

              {/* Odisha Node */}
              <div className="absolute top-[55%] left-[64%] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]" />
              </div>

              {/* Compass Rose vector watermark */}
              <div className="absolute bottom-1 left-1 opacity-70 pointer-events-none">
                <Compass className="w-6 h-6 text-cyan-400" />
              </div>
            </div>

            {/* Region Legend Stats List */}
            <div className="w-2/5 space-y-1.5 text-[10px] font-mono-code pr-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-slate-200">J&K</span>
                </div>
                <span className="font-bold text-white">32</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-slate-200">Punjab</span>
                </div>
                <span className="font-bold text-white">18</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-slate-200">Rajasthan</span>
                </div>
                <span className="font-bold text-white">22</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-200">Gujarat</span>
                </div>
                <span className="font-bold text-white">16</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-slate-200">Maharashtra</span>
                </div>
                <span className="font-bold text-white">14</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-slate-200">Odisha</span>
                </div>
                <span className="font-bold text-white">10</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-slate-200">Others</span>
                </div>
                <span className="font-bold text-white">12</span>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="pt-2 border-t border-[#0055ff]/30 flex justify-end">
            <button
              onClick={() => setShowMapModal(true)}
              className="px-3 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 hover:text-white text-[10px] font-mono-code font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm group"
            >
              <Maximize2 className="w-3 h-3 text-cyan-400 group-hover:scale-110 transition" />
              <span>View Map</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* 3C. REPORTS BY TYPE (Donut Chart & Top Threat Categories) - 3 Cols */}
        <div className="lg:col-span-3 rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex flex-col justify-between">
          <div>
            {/* Header with Interactive Filter Option */}
            <div className="flex items-center justify-between pb-2 border-b border-[#0055ff]/30 mb-2.5 relative">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                  REPORTS BY TYPE
                </span>
                {selectedType !== 'All Reports' && (
                  <span className="px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-400 text-[8.5px] font-mono-code text-cyan-300 font-bold animate-pulse">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Interactive Filter Button */}
              <div className="relative">
                <button
                  onClick={() => setShowTypeFilterMenu(!showTypeFilterMenu)}
                  title="Filter reports by type"
                  className={`p-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1 text-[10px] font-mono-code font-bold ${
                    selectedType !== 'All Reports' || showTypeFilterMenu
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.45)]'
                      : 'bg-[#031533] border-cyan-500/40 text-cyan-400 hover:border-cyan-300 hover:text-cyan-200 hover:bg-cyan-950/50'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5 text-cyan-300" />
                  <ChevronDown className={`w-3 h-3 text-cyan-400 transition-transform ${showTypeFilterMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Filter Dropdown Popover */}
                {showTypeFilterMenu && (
                  <div className="absolute right-0 top-full mt-1.5 w-52 bg-[#020b1c] border border-cyan-500/60 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] p-2 z-40 font-mono-code text-[11px] backdrop-blur-xl animate-fade-in">
                    <div className="px-1.5 py-1 text-[9px] text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800 flex items-center justify-between mb-1">
                      <span>FILTER REPORTS</span>
                      {selectedType !== 'All Reports' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedType('All Reports');
                            setRecentFilter('ALL');
                            setShowTypeFilterMenu(false);
                            showToast('Filter reset: Showing All Reports');
                          }}
                          className="text-cyan-400 hover:text-cyan-200 cursor-pointer underline font-bold"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                    <div className="space-y-1">
                      {[
                        { label: 'All Reports', count: '246', value: 'All Reports', color: 'text-slate-200', tagColor: 'bg-slate-800 text-slate-300', recent: 'ALL' },
                        { label: 'Threat Reports', count: '72', value: 'Threat Reports', color: 'text-red-400', tagColor: 'bg-red-950/80 border border-red-500/50 text-red-300', recent: 'Threat' },
                        { label: 'Incident Reports', count: '48', value: 'Incident Reports', color: 'text-orange-400', tagColor: 'bg-orange-950/80 border border-orange-500/50 text-orange-300', recent: 'Incident' },
                        { label: 'Operational Reports', count: '98', value: 'Operational Reports', color: 'text-emerald-400', tagColor: 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300', recent: 'Operational' },
                        { label: 'AI Analysis Reports', count: '28', value: 'AI Analysis Reports', color: 'text-purple-400', tagColor: 'bg-purple-950/80 border border-purple-500/50 text-purple-300', recent: 'Analysis' },
                      ].map((opt) => {
                        const isCurrent = selectedType === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSelectedType(opt.value);
                              setRecentFilter(opt.recent as any);
                              setShowTypeFilterMenu(false);
                              showToast(`Filtered dashboard to: ${opt.label}`);
                            }}
                            className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition cursor-pointer ${
                              isCurrent
                                ? 'bg-cyan-950 border border-cyan-400 text-cyan-200 font-bold shadow-sm'
                                : 'text-slate-300 hover:bg-[#031533] hover:text-white'
                            }`}
                          >
                            <span className={opt.color}>{opt.label}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${opt.tagColor}`}>
                              {opt.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Donut Chart + Legend */}
            <div className="flex items-center justify-between gap-2 py-1">
              {/* Circular SVG Donut */}
              <div
                className="relative w-24 h-24 shrink-0 flex items-center justify-center cursor-pointer group"
                onClick={() => {
                  setSelectedType('All Reports');
                  setRecentFilter('ALL');
                  showToast('Reset filter: Displaying All Types');
                }}
                title="Click center to reset type filter"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Background Track */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#0a1a36" strokeWidth="12" />

                  {/* Operational Segment (40%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth={selectedType === 'Operational Reports' ? 14 : 12}
                    strokeDasharray="95.5 143.2"
                    strokeDashoffset="0"
                    className="cursor-pointer hover:opacity-80 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedType('Operational Reports');
                      setRecentFilter('Operational');
                      showToast('Filtered: Operational Reports (98)');
                    }}
                  />

                  {/* Threat Segment (29%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth={selectedType === 'Threat Reports' ? 14 : 12}
                    strokeDasharray="69.2 169.5"
                    strokeDashoffset="-95.5"
                    className="cursor-pointer hover:opacity-80 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedType('Threat Reports');
                      setRecentFilter('Threat');
                      showToast('Filtered: Threat Reports (72)');
                    }}
                  />

                  {/* Incident Segment (20%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth={selectedType === 'Incident Reports' ? 14 : 12}
                    strokeDasharray="47.7 191.0"
                    strokeDashoffset="-164.7"
                    className="cursor-pointer hover:opacity-80 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedType('Incident Reports');
                      setRecentFilter('Incident');
                      showToast('Filtered: Incident Reports (48)');
                    }}
                  />

                  {/* Analysis Segment (11%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth={selectedType === 'AI Analysis Reports' ? 14 : 12}
                    strokeDasharray="26.2 212.5"
                    strokeDashoffset="-212.4"
                    className="cursor-pointer hover:opacity-80 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedType('AI Analysis Reports');
                      setRecentFilter('Analysis');
                      showToast('Filtered: AI Analysis Reports (28)');
                    }}
                  />
                </svg>

                {/* Donut Center Count */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-tech font-bold text-white leading-none group-hover:text-cyan-300 transition">
                    {selectedType === 'Threat Reports'
                      ? '72'
                      : selectedType === 'Incident Reports'
                      ? '48'
                      : selectedType === 'Operational Reports'
                      ? '98'
                      : selectedType === 'AI Analysis Reports'
                      ? '28'
                      : '246'}
                  </span>
                  <span className="text-[7px] font-mono-code text-slate-400 uppercase tracking-tight">
                    {selectedType === 'All Reports' ? 'Total Reports' : 'Filtered'}
                  </span>
                </div>
              </div>

              {/* Legend with interactive clicking */}
              <div className="space-y-1 text-[9.5px] font-mono-code flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType(selectedType === 'Threat Reports' ? 'All Reports' : 'Threat Reports');
                    setRecentFilter(selectedType === 'Threat Reports' ? 'ALL' : 'Threat');
                    showToast(selectedType === 'Threat Reports' ? 'Filter reset' : 'Filtered: Threat Reports (72)');
                  }}
                  className={`w-full flex items-center justify-between px-1.5 py-0.5 rounded transition cursor-pointer text-left ${
                    selectedType === 'Threat Reports'
                      ? 'bg-red-950/80 border border-red-500/60 shadow-sm'
                      : 'hover:bg-[#031533]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className={selectedType === 'Threat Reports' ? 'text-red-300 font-bold' : 'text-slate-300'}>
                      Threat
                    </span>
                  </div>
                  <span className="font-bold text-slate-100">72 (29%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedType(selectedType === 'Incident Reports' ? 'All Reports' : 'Incident Reports');
                    setRecentFilter(selectedType === 'Incident Reports' ? 'ALL' : 'Incident');
                    showToast(selectedType === 'Incident Reports' ? 'Filter reset' : 'Filtered: Incident Reports (48)');
                  }}
                  className={`w-full flex items-center justify-between px-1.5 py-0.5 rounded transition cursor-pointer text-left ${
                    selectedType === 'Incident Reports'
                      ? 'bg-orange-950/80 border border-orange-500/60 shadow-sm'
                      : 'hover:bg-[#031533]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className={selectedType === 'Incident Reports' ? 'text-orange-300 font-bold' : 'text-slate-300'}>
                      Incident
                    </span>
                  </div>
                  <span className="font-bold text-slate-100">48 (20%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedType(selectedType === 'Operational Reports' ? 'All Reports' : 'Operational Reports');
                    setRecentFilter(selectedType === 'Operational Reports' ? 'ALL' : 'Operational');
                    showToast(selectedType === 'Operational Reports' ? 'Filter reset' : 'Filtered: Operational Reports (98)');
                  }}
                  className={`w-full flex items-center justify-between px-1.5 py-0.5 rounded transition cursor-pointer text-left ${
                    selectedType === 'Operational Reports'
                      ? 'bg-emerald-950/80 border border-emerald-500/60 shadow-sm'
                      : 'hover:bg-[#031533]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className={selectedType === 'Operational Reports' ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
                      Operational
                    </span>
                  </div>
                  <span className="font-bold text-slate-100">98 (40%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedType(selectedType === 'AI Analysis Reports' ? 'All Reports' : 'AI Analysis Reports');
                    setRecentFilter(selectedType === 'AI Analysis Reports' ? 'ALL' : 'Analysis');
                    showToast(selectedType === 'AI Analysis Reports' ? 'Filter reset' : 'Filtered: Analysis Reports (28)');
                  }}
                  className={`w-full flex items-center justify-between px-1.5 py-0.5 rounded transition cursor-pointer text-left ${
                    selectedType === 'AI Analysis Reports'
                      ? 'bg-purple-950/80 border border-purple-500/60 shadow-sm'
                      : 'hover:bg-[#031533]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className={selectedType === 'AI Analysis Reports' ? 'text-purple-300 font-bold' : 'text-slate-300'}>
                      Analysis
                    </span>
                  </div>
                  <span className="font-bold text-slate-100">28 (11%)</span>
                </button>
              </div>
            </div>

            {/* Sub-Section: TOP THREAT CATEGORIES */}
            <div className="mt-3 pt-2.5 border-t border-[#0055ff]/30">
              <div className="text-[10px] font-tech font-bold text-cyan-300 uppercase tracking-wider mb-2">
                TOP THREAT CATEGORIES
              </div>

              <div className="space-y-1.5 text-[9.5px] font-mono-code">
                {/* 1. Drone Activity */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span>Drone Activity</span>
                    <span className="font-bold text-red-400">32%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '32%' }} />
                  </div>
                </div>

                {/* 2. IED / Explosives */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span>IED / Explosives</span>
                    <span className="font-bold text-orange-400">24%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '24%' }} />
                  </div>
                </div>

                {/* 3. Infiltration */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span>Infiltration</span>
                    <span className="font-bold text-yellow-400">18%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: '18%' }} />
                  </div>
                </div>

                {/* 4. Cyber Threats */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span>Cyber Threats</span>
                    <span className="font-bold text-cyan-400">14%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '14%' }} />
                  </div>
                </div>

                {/* 5. Vehicle Movement */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span>Vehicle Movement</span>
                    <span className="font-bold text-teal-400">12%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div className="h-full bg-teal-400 rounded-full" style={{ width: '12%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          4. ROW 4: REPORT PREVIEWS (4 Cards) + QUICK ACTIONS
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left: REPORT PREVIEWS (4 Cards) - 9 Cols */}
        <div className="lg:col-span-9 rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#0055ff]/30 mb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                  REPORT PREVIEWS
                </span>
              </div>
              <span className="text-[10px] font-mono-code text-cyan-400/80">
                ACTIVE SURVEILLANCE DOSSIERS
              </span>
            </div>

            {/* 4 Report Preview Cards Grid matching user's reference image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Card 1: Cross Border Infiltration Activity */}
              <div
                onClick={() => setSelectedReport(previewReports[0])}
                className="rounded-xl overflow-hidden border border-[#0055ff]/40 hover:border-cyan-400 transition bg-[#020e24] cursor-pointer flex flex-col group shadow-lg"
              >
                {/* Visual Imagery */}
                <div className="relative h-28 sm:h-32 bg-[#040c1a] overflow-hidden">
                  <img
                    src={reportInfiltrationImg}
                    alt="Cross Border Infiltration Activity"
                    className="w-full h-full object-cover brightness-95 contrast-110 transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Scanline Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

                  {/* Corner Reticles */}
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-cyan-400" />
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-cyan-400" />

                  {/* Corner Camera HUD badge */}
                  <div className="absolute bottom-1.5 right-1.5 px-1 py-0.5 rounded bg-black/60 border border-cyan-500/40 text-[7px] font-mono-code text-cyan-300">
                    CAM-LOC
                  </div>
                </div>

                {/* Subtitle Details */}
                <div className="p-2.5 flex-1 flex flex-col justify-between bg-[#020d20]">
                  <div>
                    {/* Badge */}
                    <div className="mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-500/80 text-red-400 font-mono-code font-bold text-[8.5px] tracking-wider inline-flex items-center gap-1">
                        ▲ THREAT
                      </span>
                    </div>

                    <div className="text-[11px] font-tech font-bold text-white tracking-wide leading-snug group-hover:text-cyan-300 transition truncate">
                      Cross Border Infiltration Activity
                    </div>
                    <div className="text-[9px] font-mono-code text-slate-400 mt-0.5">
                      J&K (LoC) • 20 Sep 2026 18:42
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/80">
                    <span className="text-[9.5px] font-mono-code font-bold text-cyan-400">
                      RPT-45872
                    </span>
                    <span className="text-[9.5px] font-mono-code text-cyan-400 group-hover:text-cyan-200 flex items-center gap-0.5">
                      <span>View Details</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: IED Detected - Roadside */}
              <div
                onClick={() => setSelectedReport(previewReports[1])}
                className="rounded-xl overflow-hidden border border-[#0055ff]/40 hover:border-amber-400 transition bg-[#020e24] cursor-pointer flex flex-col group shadow-lg"
              >
                {/* Visual Imagery */}
                <div className="relative h-28 sm:h-32 bg-[#040c1a] overflow-hidden">
                  <img
                    src={reportIedImg}
                    alt="IED Detected - Roadside"
                    className="w-full h-full object-cover brightness-95 contrast-110 transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Scanline Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

                  {/* Corner Reticles */}
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-amber-400" />
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-amber-400" />

                  {/* Warning line HUD */}
                  <div className="absolute bottom-1.5 right-1.5 px-1 py-0.5 rounded bg-black/60 border border-amber-500/40 text-[7px] font-mono-code text-amber-300">
                    CORRIDOR-A
                  </div>
                </div>

                {/* Subtitle Details */}
                <div className="p-2.5 flex-1 flex flex-col justify-between bg-[#020d20]">
                  <div>
                    {/* Badge */}
                    <div className="mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/80 text-amber-400 font-mono-code font-bold text-[8.5px] tracking-wider inline-flex items-center gap-1">
                        ▲ INCIDENT
                      </span>
                    </div>

                    <div className="text-[11px] font-tech font-bold text-white tracking-wide leading-snug group-hover:text-amber-300 transition truncate">
                      IED Detected - Roadside
                    </div>
                    <div className="text-[9px] font-mono-code text-slate-400 mt-0.5">
                      Punjab • 20 Sep 2026 16:27
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/80">
                    <span className="text-[9.5px] font-mono-code font-bold text-cyan-400">
                      RPT-45871
                    </span>
                    <span className="text-[9.5px] font-mono-code text-cyan-400 group-hover:text-cyan-200 flex items-center gap-0.5">
                      <span>View Details</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: AI Pattern - Drone Activity */}
              <div
                onClick={() => setSelectedReport(previewReports[2])}
                className="rounded-xl overflow-hidden border border-[#0055ff]/40 hover:border-purple-400 transition bg-[#020e24] cursor-pointer flex flex-col group shadow-lg"
              >
                {/* Visual Imagery */}
                <div className="relative h-28 sm:h-32 bg-[#040c1a] overflow-hidden">
                  <img
                    src={reportDroneImg}
                    alt="AI Pattern - Drone Activity"
                    className="w-full h-full object-cover brightness-95 contrast-110 transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Scanline Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

                  {/* Corner Reticles */}
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-purple-400" />
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-purple-400" />

                  <div className="absolute bottom-1.5 right-1.5 px-1 py-0.5 rounded bg-black/60 border border-purple-500/40 text-[7px] font-mono-code text-purple-300">
                    UAV-AI
                  </div>
                </div>

                {/* Subtitle Details */}
                <div className="p-2.5 flex-1 flex flex-col justify-between bg-[#020d20]">
                  <div>
                    {/* Badge */}
                    <div className="mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/80 text-purple-400 font-mono-code font-bold text-[8.5px] tracking-wider inline-flex items-center gap-1">
                        🔍 ANALYSIS
                      </span>
                    </div>

                    <div className="text-[11px] font-tech font-bold text-white tracking-wide leading-snug group-hover:text-purple-300 transition truncate">
                      AI Pattern - Drone Activity
                    </div>
                    <div className="text-[9px] font-mono-code text-slate-400 mt-0.5">
                      J&K • 20 Sep 2026 12:36
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/80">
                    <span className="text-[9.5px] font-mono-code font-bold text-cyan-400">
                      RPT-45869
                    </span>
                    <span className="text-[9.5px] font-mono-code text-cyan-400 group-hover:text-cyan-200 flex items-center gap-0.5">
                      <span>View Details</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 4: Vehicle Movement - Suspicious */}
              <div
                onClick={() => setSelectedReport(previewReports[3])}
                className="rounded-xl overflow-hidden border border-[#0055ff]/40 hover:border-emerald-400 transition bg-[#020e24] cursor-pointer flex flex-col group shadow-lg"
              >
                {/* Visual Imagery */}
                <div className="relative h-28 sm:h-32 bg-[#040c1a] overflow-hidden">
                  <img
                    src={reportHeatmapImg}
                    alt="Vehicle Movement - Suspicious"
                    className="w-full h-full object-cover brightness-95 contrast-110 transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Scanline Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

                  {/* Corner Reticles */}
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-emerald-400" />
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-emerald-400" />

                  <div className="absolute bottom-1.5 right-1.5 px-1 py-0.5 rounded bg-black/60 border border-emerald-500/40 text-[7px] font-mono-code text-emerald-300">
                    HEATMAP
                  </div>
                </div>

                {/* Subtitle Details */}
                <div className="p-2.5 flex-1 flex flex-col justify-between bg-[#020d20]">
                  <div>
                    {/* Badge */}
                    <div className="mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/80 text-emerald-400 font-mono-code font-bold text-[8.5px] tracking-wider inline-flex items-center gap-1">
                        🛡 OPERATIONAL
                      </span>
                    </div>

                    <div className="text-[11px] font-tech font-bold text-white tracking-wide leading-snug group-hover:text-emerald-300 transition truncate">
                      Vehicle Movement - Suspicious
                    </div>
                    <div className="text-[9px] font-mono-code text-slate-400 mt-0.5">
                      Rajasthan • 20 Sep 2026 14:12
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/80">
                    <span className="text-[9.5px] font-mono-code font-bold text-cyan-400">
                      RPT-45870
                    </span>
                    <span className="text-[9.5px] font-mono-code text-cyan-400 group-hover:text-cyan-200 flex items-center gap-0.5">
                      <span>View Details</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: QUICK ACTIONS (2x2 Buttons Grid) - 3 Cols */}
        <div className="lg:col-span-3 rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#0055ff]/30 mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                  QUICK ACTIONS
                </span>
              </div>
            </div>

            {/* 2x2 Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Button 1: Generate Report */}
              <button
                onClick={() => setShowGenerateModal(true)}
                className="p-3 rounded-xl bg-[#031533] hover:bg-[#062452] border border-cyan-500/40 hover:border-cyan-400 transition cursor-pointer flex flex-col items-center justify-center text-center group shadow-md"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition mb-2 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-tech font-bold text-slate-100 group-hover:text-cyan-300 leading-tight">
                  Generate Report
                </span>
              </button>

              {/* Button 2: Export Reports */}
              <button
                onClick={handleExportPDF}
                className="p-3 rounded-xl bg-[#031533] hover:bg-[#062452] border border-red-500/40 hover:border-red-400 transition cursor-pointer flex flex-col items-center justify-center text-center group shadow-md"
                title="Generate & Download Tactical PDF Dossiers"
              >
                <div className="w-9 h-9 rounded-lg bg-red-950/80 border border-red-400/50 flex items-center justify-center text-red-300 group-hover:scale-110 transition mb-2 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                  <Download className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-tech font-bold text-slate-100 group-hover:text-red-300 leading-tight">
                  Export PDF Dossiers
                </span>
              </button>

              {/* Button 3: Schedule Report */}
              <button
                onClick={() => setShowScheduleModal(true)}
                className="p-3 rounded-xl bg-[#031533] hover:bg-[#062452] border border-purple-500/40 hover:border-purple-400 transition cursor-pointer flex flex-col items-center justify-center text-center group shadow-md"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-950/80 border border-purple-400/50 flex items-center justify-center text-purple-300 group-hover:scale-110 transition mb-2 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-tech font-bold text-slate-100 group-hover:text-purple-300 leading-tight">
                  Schedule Report
                </span>
              </button>

              {/* Button 4: View Archive */}
              <button
                onClick={() => setShowArchiveModal(true)}
                className="p-3 rounded-xl bg-[#031533] hover:bg-[#062452] border border-emerald-500/40 hover:border-emerald-400 transition cursor-pointer flex flex-col items-center justify-center text-center group shadow-md"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-400/50 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition mb-2 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <Archive className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-tech font-bold text-slate-100 group-hover:text-emerald-300 leading-tight">
                  View Archive
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          5. ROW 5: REPORT INSIGHTS (AI POWERED)
         ======================================================== */}
      <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center gap-2 pb-2 border-b border-[#0055ff]/30 mb-3">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
            REPORT INSIGHTS (AI POWERED)
          </span>
        </div>

        {/* 3 Insight Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Insight 1: Rising Threat Trend */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#031533]/80 border border-red-500/30 shadow-md">
            <div className="w-10 h-10 rounded-full bg-red-950/80 border border-red-500/60 flex items-center justify-center text-red-400 shrink-0 shadow-[0_0_12px_rgba(239,68,68,0.3)]">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-tech font-bold text-white">
                  Rising Threat Trend
                </span>
                <span className="px-1.5 py-0.5 rounded bg-red-950 border border-red-500 text-red-400 font-mono-code font-bold text-[8.5px]">
                  High
                </span>
              </div>
              <p className="text-[10px] font-mono-code text-slate-300 leading-relaxed">
                Drone activity increased by 32% in J&K region in the last 24 hours.
              </p>
            </div>
          </div>

          {/* Insight 2: Pattern Detected */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#031533]/80 border border-amber-500/30 shadow-md">
            <div className="w-10 h-10 rounded-full bg-amber-950/80 border border-amber-500/60 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-tech font-bold text-white">
                  Pattern Detected
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500 text-amber-400 font-mono-code font-bold text-[8.5px]">
                  Medium
                </span>
              </div>
              <p className="text-[10px] font-mono-code text-slate-300 leading-relaxed">
                Unusual vehicle movement observed near Sector 7 (Punjab).
              </p>
            </div>
          </div>

          {/* Insight 3: Operational Update */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#031533]/80 border border-emerald-500/30 shadow-md">
            <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-tech font-bold text-white">
                  Operational Update
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-400 font-mono-code font-bold text-[8.5px]">
                  Positive
                </span>
              </div>
              <p className="text-[10px] font-mono-code text-slate-300 leading-relaxed">
                Border surveillance activity showing 18% improvement in threat detection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          6. MODAL: REPORT DOSSIER DETAIL VIEW
         ======================================================== */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 bg-[#031533] border-b border-cyan-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-code text-cyan-400 font-bold">{selectedReport.id}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs font-mono-code text-slate-300">{selectedReport.region}</span>
                  </div>
                  <h3 className="text-base font-tech font-bold text-white leading-tight">
                    {selectedReport.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-4">
              {/* Image banner if available */}
              {selectedReport.image && (
                <div className="relative h-48 rounded-xl overflow-hidden border border-cyan-500/40">
                  <img
                    src={selectedReport.image}
                    alt={selectedReport.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 text-xs font-mono-code font-bold text-cyan-300">
                    SATELLITE & TACTICAL RECONNAISSANCE DOSSIER
                  </div>
                </div>
              )}

              {/* Status Metadata Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-[#031533]/80 border border-slate-800 text-xs font-mono-code">
                <div>
                  <span className="text-slate-400 block text-[9px]">TYPE</span>
                  <span className="font-bold text-white">{selectedReport.type}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">STATUS</span>
                  <span className="font-bold text-red-400">{selectedReport.status}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">TIMESTAMP</span>
                  <span className="font-bold text-slate-200">{selectedReport.dateTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">AI CONFIDENCE</span>
                  <span className="font-bold text-cyan-300">{selectedReport.confidence || '94%'}</span>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h4 className="text-xs font-tech font-bold text-cyan-300 tracking-wider uppercase mb-1">
                  EXECUTIVE SUMMARY
                </h4>
                <p className="text-xs font-mono-code text-slate-200 leading-relaxed p-3 rounded-xl bg-[#031533]/50 border border-slate-800">
                  {selectedReport.summary}
                </p>
              </div>

              {/* Tactical Recommendation */}
              <div>
                <h4 className="text-xs font-tech font-bold text-amber-300 tracking-wider uppercase mb-1">
                  AI DECISION RECOMMENDATION
                </h4>
                <div className="text-xs font-mono-code text-slate-200 p-3 rounded-xl bg-amber-950/20 border border-amber-500/40">
                  ✓ Dispatch aerial telemetry sweep along designated sector corridor.<br />
                  ✓ Escalate threat level to Sector Commander (Command IC-7K42P9).<br />
                  ✓ Transmit encrypted telemetry package to Bharat Command Central Node.
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-[#031533] border-t border-cyan-500/40 flex items-center justify-between">
              <span className="text-[10px] font-mono-code text-slate-400">
                CLASSIFICATION: RESTRICTED // BHARAT DEFENSE
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadSingleReport(selectedReport)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-400 text-cyan-300 text-xs font-mono-code font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Dossier (.txt)</span>
                </button>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono-code transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          7. MODALS
         ======================================================== */}
      {/* Generate Report Modal */}
      {showGenerateModal && (
        <VajraGenerateReportModal
          onClose={() => setShowGenerateModal(false)}
          onReportGenerated={(newReport) => {
            setAllReports((prev) => [newReport, ...prev]);
          }}
          onShowToast={showToast}
        />
      )}

      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <VajraScheduleReportModal
          onClose={() => setShowScheduleModal(false)}
          onShowToast={showToast}
        />
      )}

      {/* Archive Repository Modal */}
      {showArchiveModal && (
        <VajraArchiveModal
          onClose={() => setShowArchiveModal(false)}
          onShowToast={showToast}
        />
      )}

      {/* Tactical Map Reconnaissance Modal */}
      {showMapModal && (
        <VajraTacticalMapModal
          onClose={() => setShowMapModal(false)}
          onSelectRegion={(regionName) => {
            setSelectedRegion(regionName);
          }}
          onShowToast={showToast}
        />
      )}

      {/* All Reports Ledger Modal */}
      {showAllReportsModal && (
        <VajraAllReportsModal
          reports={allReports}
          onClose={() => setShowAllReportsModal(false)}
          onSelectReport={(rpt) => {
            setSelectedReport(rpt);
          }}
          onShowToast={showToast}
        />
      )}

      {/* Export Toast Notification */}
      {showExportToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-200 shadow-2xl flex items-center gap-2.5 text-xs font-mono-code font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
