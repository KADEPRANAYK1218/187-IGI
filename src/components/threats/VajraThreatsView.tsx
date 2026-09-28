import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  Search,
  Crosshair,
  CheckCircle2,
  Maximize2,
  Radio,
  FileText,
  Cpu,
  Share2,
  Map as MapIcon,
  Shield,
  Plane,
  Eye,
  Anchor,
  Zap,
  Target,
  Clock,
  Compass,
  Layers,
  Flame,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Using existing image assets strictly unchanged
import droneJkImg from '../../assets/images/drone_surveillance_jk_1788709366761.jpg';
import heatmapImg from '../../assets/images/geospatial_heatmap_intel_1788709946423.jpg';
import indiaNeuralMap from '../../assets/images/india_neural_cyber_map_1788703459745.jpg';

import {
  IncidentReportModal,
  DroneSupportModal,
  ShareIntelModal,
  ThreatItem
} from './ThreatModals';
import { useSettings } from '../../context/SettingsContext';

interface VajraThreatsViewProps {
  onNavigate?: (navId: 'DASHBOARD' | 'FEEDS' | 'THREATS' | 'AI' | 'REPORTS' | 'RESOURCES' | 'SETTINGS') => void;
}

// Coordinate mapping for threat hotspots on the uploaded Bharat Neural Cyber Map
const threatGeoPositions: Record<string, { topPct: number; leftPct: number; label: string; icon: string }> = {
  'TI-2026-0918-001': { topPct: 18, leftPct: 42, label: 'J&K (LoC)', icon: '▲' },
  'TI-2026-0918-002': { topPct: 28, leftPct: 39, label: 'Punjab', icon: '▲' },
  'TI-2026-0918-003': { topPct: 34, leftPct: 44, label: 'Delhi', icon: '⊕' },
  'TI-2026-0918-004': { topPct: 22, leftPct: 41, label: 'Jammu', icon: '⊗' },
  'TI-2026-0918-005': { topPct: 62, leftPct: 24, label: 'Arabian Sea', icon: '⚓' },
  'TI-2026-0918-006': { topPct: 38, leftPct: 34, label: 'Rajasthan', icon: '◎' },
  'TI-2026-0918-007': { topPct: 49, leftPct: 30, label: 'Gujarat', icon: '▲' },
  'TI-2026-0918-008': { topPct: 60, leftPct: 39, label: 'Maharashtra', icon: '⊕' },
  'TI-2026-0918-009': { topPct: 15, leftPct: 49, label: 'Ladakh', icon: '▲' },
  'TI-2026-0918-010': { topPct: 53, leftPct: 59, label: 'Odisha', icon: '⊗' }
};

export const VajraThreatsView: React.FC<VajraThreatsViewProps> = ({ onNavigate }) => {
  const { theme } = useSettings();
  const isLight = theme === 'Light';

  // Filter states
  const [timeRange, setTimeRange] = useState<string>('Last 24 Hours');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All Severities');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dropdown toggles
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showSeverityDropdown, setShowSeverityDropdown] = useState(false);

  // Heatmap layer toggle: Live, Terrain, Hybrid
  const [heatmapLayer, setHeatmapLayer] = useState<'LIVE' | 'TERRAIN' | 'HYBRID'>('LIVE');

  // Analytics timeframe tab: 24H, 7D, 30D
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'24H' | '7D' | '30D'>('24H');

  // Modals state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [droneModalOpen, setDroneModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [expandedFeedOpen, setExpandedFeedOpen] = useState(false);
  const [allThreatsModalOpen, setAllThreatsModalOpen] = useState(false);

  // Full dataset of 10 items matching the screenshot
  const threatItems: ThreatItem[] = useMemo(() => [
    {
      id: 'TI-2026-0918-001',
      time: '21:42:17',
      type: 'Drone Intrusion',
      location: 'J&K (LoC)',
      severity: 'HIGH',
      status: 'Active',
      source: 'Unmanned Aerial Vehicle',
      altitude: '2,400 ft (est.)',
      speed: '120 km/h (est.)',
      lat: 34.1246,
      lng: 74.8567,
      coordsText: '34.1246° N  74.8567° E',
      alertText: 'Multiple drones detected near LoC.',
      details: 'Hostile quadcopter signature observed cross-corridor at Sector 4 LoC with low-altitude evasive maneuvering.'
    },
    {
      id: 'TI-2026-0918-002',
      time: '21:37:50',
      type: 'Missile Launch',
      location: 'Punjab',
      severity: 'CRITICAL',
      status: 'Investigating',
      source: 'Surface-to-Air / Ballistic Trajectory',
      altitude: '18,500 ft (est.)',
      speed: 'Mach 2.8 (est.)',
      lat: 31.1471,
      lng: 75.3412,
      coordsText: '31.1471° N  75.3412° E',
      alertText: 'High-velocity thermal launch flash detected across western perimeter.',
      details: 'Short-range missile telemetry flagged by radar tracking station Alpha. Interceptor batteries on standby.'
    },
    {
      id: 'TI-2026-0918-003',
      time: '21:28:16',
      type: 'Cyber Attack',
      location: 'Delhi',
      severity: 'MEDIUM',
      status: 'Contained',
      source: 'State-sponsored APT Cluster 41',
      altitude: 'N/A (Virtual Domain)',
      speed: '14.2 Gbps DDoS Spike',
      lat: 28.6139,
      lng: 77.2090,
      coordsText: '28.6139° N  77.2090° E',
      alertText: 'Distributed denial-of-service against Northern Command gateway.',
      details: 'Air-gapped firewall rerouted all malicious packet streams into blackhole scrubbing honeypot.'
    },
    {
      id: 'TI-2026-0918-004',
      time: '21:19:03',
      type: 'IED Detected',
      location: 'Jammu',
      severity: 'HIGH',
      status: 'Active',
      source: 'Remote Radio-Detonated Device',
      altitude: 'Ground Level (0 ft)',
      speed: 'Stationary Device',
      lat: 32.7266,
      lng: 74.8570,
      coordsText: '32.7266° N  74.8570° E',
      alertText: 'Sub-surface RF anomaly detected along Highway 44.',
      details: 'Army Bomb Disposal Squad (BDS) and canine team deployed on cordon-and-neutralize mission.'
    },
    {
      id: 'TI-2026-0918-005',
      time: '21:12:44',
      type: 'Naval Movement',
      location: 'Arabian Sea',
      severity: 'MEDIUM',
      status: 'Tracking',
      source: 'Subsurface & Surface Combatant',
      altitude: 'Sea Level / Sub-surface',
      speed: '18 knots',
      lat: 18.9220,
      lng: 69.5000,
      coordsText: '18.9220° N  69.5000° E',
      alertText: 'Unflagged corvette class warship shadow detected 140nm off Mumbai EEZ.',
      details: 'P-8I Neptune maritime patrol aircraft dispatched for sonar buoy seeding and visual telemetry.'
    },
    {
      id: 'TI-2026-0918-006',
      time: '20:58:32',
      type: 'Surveillance Activity',
      location: 'Rajasthan',
      severity: 'LOW',
      status: 'Monitoring',
      source: 'Optical & RF Mast Transmitter',
      altitude: 'Mast Height (45m)',
      speed: 'Stationary Sensor',
      lat: 26.9124,
      lng: 70.9000,
      coordsText: '26.9124° N  70.9000° E',
      alertText: 'Border outpost radar flagged synchronized frequency sweeps.',
      details: 'Electronic Warfare Corps deployed directional jamming jamming sweep on frequency 433.8 MHz.'
    },
    {
      id: 'TI-2026-0918-007',
      time: '20:44:17',
      type: 'Drone Intrusion',
      location: 'Gujarat',
      severity: 'HIGH',
      status: 'Active',
      source: 'Commercial Hexacopter with Payload',
      altitude: '800 ft (est.)',
      speed: '75 km/h',
      lat: 23.2420,
      lng: 69.6669,
      coordsText: '23.2420° N  69.6669° E',
      alertText: 'Kutch marshland radar flagged low-RCS intruder crossing border.',
      details: 'BSF anti-drone gun engaged kinetic and soft-kill counter-drone microwave pulse.'
    },
    {
      id: 'TI-2026-0918-008',
      time: '20:21:09',
      type: 'Cyber Attack',
      location: 'Maharashtra',
      severity: 'MEDIUM',
      status: 'Contained',
      source: 'SCADA Infiltration Attempt',
      altitude: 'Power Grid Telemetry',
      speed: 'Lateral Vector',
      lat: 19.0760,
      lng: 72.8777,
      coordsText: '19.0760° N  72.8777° E',
      alertText: 'Substation automated switches signaled unauthorized firmware reload.',
      details: 'Grid operations isolated infected node; zero power disruption recorded.'
    },
    {
      id: 'TI-2026-0918-009',
      time: '19:56:33',
      type: 'Missile Launch',
      location: 'Ladakh',
      severity: 'HIGH',
      status: 'Investigating',
      source: 'Artillery Rocket / Guided MLRS',
      altitude: '14,200 ft (est.)',
      speed: 'Mach 1.9',
      lat: 34.1526,
      lng: 77.5771,
      coordsText: '34.1526° N  77.5771° E',
      alertText: 'Infrared satellite flagged plume signature in Eastern Sector.',
      details: 'High-altitude radar arrays confirming trajectory vectors. Mountain corps alerted.'
    },
    {
      id: 'TI-2026-0918-010',
      time: '19:32:11',
      type: 'IED Detected',
      location: 'Odisha',
      severity: 'LOW',
      status: 'Resolved',
      source: 'Improvised Pressure Plate',
      altitude: 'Ground Level',
      speed: 'Neutralized',
      lat: 20.9517,
      lng: 85.0985,
      coordsText: '20.9517° N  85.0985° E',
      alertText: 'Suspected roadside charge safely detonated in forest sector.',
      details: 'Controlled counter-charge executed by Central Reserve Police Force (CRPF).'
    }
  ], []);

  // Currently selected incident (default is item #1: Drone Intrusion J&K)
  const [selectedIncident, setSelectedIncident] = useState<ThreatItem>(threatItems[0]);

  // Filtered threat items for the table
  const filteredThreats = useMemo(() => {
    return threatItems.filter((item) => {
      // Region filter
      if (selectedRegion !== 'All Regions') {
        if (selectedRegion === 'Northern' && !['J&K (LoC)', 'Punjab', 'Jammu', 'Delhi', 'Ladakh'].includes(item.location)) {
          return false;
        }
        if (selectedRegion === 'Western' && !['Rajasthan', 'Gujarat', 'Arabian Sea'].includes(item.location)) {
          return false;
        }
        if (selectedRegion === 'Eastern' && !['Odisha', 'Bihar', 'West Bengal'].includes(item.location)) {
          return false;
        }
      }
      // Severity filter
      if (selectedSeverity !== 'All Severities' && item.severity !== selectedSeverity) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.type.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.status.toLowerCase().includes(q) ||
          item.source.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [threatItems, selectedRegion, selectedSeverity, searchQuery]);

  // Helper icons for threat types
  const getThreatTypeIcon = (type: string) => {
    switch (type) {
      case 'Drone Intrusion':
        return <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />;
      case 'Missile Launch':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'Cyber Attack':
        return <Crosshair className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
      case 'IED Detected':
        return <Target className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
      case 'Naval Movement':
        return <Anchor className="w-3.5 h-3.5 text-cyan-300 shrink-0" />;
      case 'Surveillance Activity':
        return <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />;
    }
  };

  // Severity pill style
  const getSeverityPill = (sev: ThreatItem['severity']) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-red-600/30 text-red-300 border border-red-500 font-bold';
      case 'HIGH':
        return 'bg-red-950/80 text-red-400 border border-red-500/60 font-medium';
      case 'MEDIUM':
        return 'bg-amber-950/60 text-amber-300 border border-amber-500/50 font-medium';
      case 'LOW':
        return 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50 font-medium';
    }
  };

  // Status pill style
  const getStatusPill = (status: ThreatItem['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-red-900/60 text-red-300 border border-red-500/50';
      case 'Investigating':
        return 'bg-amber-950/70 text-amber-300 border border-amber-500/50';
      case 'Contained':
        return 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/50';
      case 'Tracking':
        return 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/50';
      case 'Monitoring':
        return 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50';
      case 'Resolved':
        return 'bg-emerald-900/50 text-emerald-300 border border-emerald-500/50';
    }
  };

  return (
    <div className={`w-full space-y-4 font-sans pb-6 transition-colors ${isLight ? 'text-slate-900' : 'text-white'}`}>
      {/* ============================================================ */}
      {/* 1. TOP HEADER & FILTER TOOLBAR                               */}
      {/* ============================================================ */}
      <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border shadow-sm transition-colors ${
        isLight
          ? 'bg-white border-slate-300 text-slate-900 shadow-slate-200'
          : 'bg-slate-950/90 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)] text-white'
      }`}>
        {/* Left Title */}
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm ${
            isLight
              ? 'bg-red-50 border-red-200 text-red-600'
              : 'bg-gradient-to-br from-red-950/90 to-slate-950 border-red-500/80 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
          }`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h1 className={`text-xl font-tech font-bold tracking-wider flex items-center gap-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              THREATS & INCIDENTS
            </h1>
            <p className={`text-[11px] font-mono-code tracking-wider font-bold ${
              isLight ? 'text-cyan-800' : 'text-cyan-400'
            }`}>
              REAL-TIME THREAT INTELLIGENCE & INCIDENT MANAGEMENT
            </p>
          </div>
        </div>

        {/* Right Controls / Filters */}
        <div className="flex flex-wrap items-center gap-2 font-mono-code text-xs">
          {/* Time Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowTimeDropdown(!showTimeDropdown);
                setShowRegionDropdown(false);
                setShowSeverityDropdown(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border font-mono-code font-bold transition-colors ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-cyan-500'
                  : 'bg-slate-900/90 border-cyan-500/40 text-slate-200 hover:border-cyan-400'
              }`}
            >
              <Calendar className={`w-3.5 h-3.5 ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`} />
              <span>{timeRange}</span>
              <ChevronDown className={`w-3.5 h-3.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`} />
            </button>
            {showTimeDropdown && (
              <div className={`absolute right-0 top-full mt-1.5 w-40 z-30 rounded-lg border shadow-xl py-1 ${
                isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-950 border-cyan-500/40 text-slate-200'
              }`}>
                {['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'All Time'].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTimeRange(t);
                      setShowTimeDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      isLight
                        ? timeRange === t
                          ? 'text-cyan-900 font-bold bg-cyan-50'
                          : 'text-slate-700 hover:bg-slate-100'
                        : timeRange === t
                          ? 'text-cyan-300 font-bold bg-cyan-950/40'
                          : 'text-slate-300 hover:bg-cyan-950/60'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Region Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRegionDropdown(!showRegionDropdown);
                setShowTimeDropdown(false);
                setShowSeverityDropdown(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border font-mono-code font-bold transition-colors ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-cyan-500'
                  : 'bg-slate-900/90 border-cyan-500/40 text-slate-200 hover:border-cyan-400'
              }`}
            >
              <span>{selectedRegion}</span>
              <ChevronDown className={`w-3.5 h-3.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`} />
            </button>
            {showRegionDropdown && (
              <div className={`absolute right-0 top-full mt-1.5 w-44 z-30 rounded-lg border shadow-xl py-1 ${
                isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-950 border-cyan-500/40 text-slate-200'
              }`}>
                {['All Regions', 'Northern', 'Western', 'Eastern'].map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setSelectedRegion(r);
                      setShowRegionDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      isLight
                        ? selectedRegion === r
                          ? 'text-cyan-900 font-bold bg-cyan-50'
                          : 'text-slate-700 hover:bg-slate-100'
                        : selectedRegion === r
                          ? 'text-cyan-300 font-bold bg-cyan-950/40'
                          : 'text-slate-300 hover:bg-cyan-950/60'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Severity Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSeverityDropdown(!showSeverityDropdown);
                setShowTimeDropdown(false);
                setShowRegionDropdown(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border font-mono-code font-bold transition-colors ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-cyan-500'
                  : 'bg-slate-900/90 border-cyan-500/40 text-slate-200 hover:border-cyan-400'
              }`}
            >
              <span>{selectedSeverity}</span>
              <ChevronDown className={`w-3.5 h-3.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`} />
            </button>
            {showSeverityDropdown && (
              <div className={`absolute right-0 top-full mt-1.5 w-40 z-30 rounded-lg border shadow-xl py-1 ${
                isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-950 border-cyan-500/40 text-slate-200'
              }`}>
                {['All Severities', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSeverity(s);
                      setShowSeverityDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      isLight
                        ? selectedSeverity === s
                          ? 'text-cyan-900 font-bold bg-cyan-50'
                          : 'text-slate-700 hover:bg-slate-100'
                        : selectedSeverity === s
                          ? 'text-cyan-300 font-bold bg-cyan-950/40'
                          : 'text-slate-300 hover:bg-cyan-950/60'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location, type, keyword..."
              className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs font-mono-code focus:outline-none transition-colors ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-600 focus:bg-white'
                  : 'bg-slate-900/90 border-cyan-500/30 text-slate-200 placeholder-slate-500 focus:border-cyan-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-xs ${isLight ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-white'}`}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. TOP 4 METRIC CARDS                                        */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Threats */}
        <div className={`relative overflow-hidden p-4 rounded-xl border flex items-center justify-between transition-colors shadow-sm ${
          isLight
            ? 'bg-white border-red-300 hover:border-red-400 shadow-sm'
            : 'bg-gradient-to-br from-red-950/40 via-slate-950/90 to-slate-950 border-red-500/70 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
              isLight
                ? 'bg-red-50 border-red-200 text-red-600 shadow-sm'
                : 'bg-red-950/80 border-red-500/60 text-red-500'
            }`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className={`text-[11px] font-mono-code uppercase tracking-wider font-extrabold ${
                isLight ? 'text-slate-700' : 'text-slate-200'
              }`}>
                Total Threats
              </div>
              <div className={`text-3xl font-tech font-black leading-tight ${
                isLight ? 'text-red-600' : 'text-red-500'
              }`}>
                23
              </div>
              <div className="text-[11px] font-mono-code font-bold flex items-center gap-1 mt-0.5">
                <span className={isLight ? 'text-red-600 font-extrabold' : 'text-red-400'}>↑ 12%</span>
                <span className={isLight ? 'text-slate-600 font-semibold' : 'text-slate-300'}>vs. previous 24h</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-red-500/5 blur-xl pointer-events-none" />
        </div>

        {/* Card 2: Incidents */}
        <div className={`relative overflow-hidden p-4 rounded-xl border flex items-center justify-between transition-colors shadow-sm ${
          isLight
            ? 'bg-white border-amber-300 hover:border-amber-400 shadow-sm'
            : 'bg-gradient-to-br from-amber-950/30 via-slate-950/90 to-slate-950 border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
              isLight
                ? 'bg-amber-50 border-amber-200 text-amber-600 shadow-sm'
                : 'bg-amber-950/80 border-amber-500/60 text-amber-400'
            }`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className={`text-[11px] font-mono-code uppercase tracking-wider font-extrabold ${
                isLight ? 'text-slate-700' : 'text-slate-200'
              }`}>
                Incidents
              </div>
              <div className={`text-3xl font-tech font-black leading-tight ${
                isLight ? 'text-amber-600' : 'text-amber-400'
              }`}>
                12
              </div>
              <div className="text-[11px] font-mono-code font-bold flex items-center gap-1 mt-0.5">
                <span className={isLight ? 'text-amber-600 font-extrabold' : 'text-amber-400'}>↑ 8%</span>
                <span className={isLight ? 'text-slate-600 font-semibold' : 'text-slate-300'}>vs. previous 24h</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-amber-500/5 blur-xl pointer-events-none" />
        </div>

        {/* Card 3: Under Investigation */}
        <div className={`relative overflow-hidden p-4 rounded-xl border flex items-center justify-between transition-colors shadow-sm ${
          isLight
            ? 'bg-white border-cyan-300 hover:border-cyan-400 shadow-sm'
            : 'bg-gradient-to-br from-cyan-950/30 via-slate-950/90 to-slate-950 border-cyan-500/70 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
              isLight
                ? 'bg-cyan-50 border-cyan-200 text-cyan-700 shadow-sm'
                : 'bg-cyan-950/80 border-cyan-500/60 text-cyan-400'
            }`}>
              <Crosshair className="w-6 h-6" />
            </div>
            <div>
              <div className={`text-[11px] font-mono-code uppercase tracking-wider font-extrabold ${
                isLight ? 'text-slate-700' : 'text-slate-200'
              }`}>
                Under Investigation
              </div>
              <div className={`text-3xl font-tech font-black leading-tight ${
                isLight ? 'text-cyan-700' : 'text-cyan-400'
              }`}>
                7
              </div>
              <div className="text-[11px] font-mono-code font-bold flex items-center gap-1 mt-0.5">
                <span className={isLight ? 'text-cyan-700 font-extrabold' : 'text-cyan-400'}>↓ 22%</span>
                <span className={isLight ? 'text-slate-600 font-semibold' : 'text-slate-300'}>vs. previous 24h</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-cyan-500/5 blur-xl pointer-events-none" />
        </div>

        {/* Card 4: Resolved */}
        <div className={`relative overflow-hidden p-4 rounded-xl border flex items-center justify-between transition-colors shadow-sm ${
          isLight
            ? 'bg-white border-emerald-300 hover:border-emerald-400 shadow-sm'
            : 'bg-gradient-to-br from-emerald-950/30 via-slate-950/90 to-slate-950 border-emerald-500/70 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
              isLight
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                : 'bg-emerald-950/80 border-emerald-500/60 text-emerald-400'
            }`}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className={`text-[11px] font-mono-code uppercase tracking-wider font-extrabold ${
                isLight ? 'text-slate-700' : 'text-slate-200'
              }`}>
                Resolved
              </div>
              <div className={`text-3xl font-tech font-black leading-tight ${
                isLight ? 'text-emerald-700' : 'text-emerald-400'
              }`}>
                4
              </div>
              <div className="text-[11px] font-mono-code font-bold flex items-center gap-1 mt-0.5">
                <span className={isLight ? 'text-emerald-700 font-extrabold' : 'text-emerald-400'}>↑ 33%</span>
                <span className={isLight ? 'text-slate-600 font-semibold' : 'text-slate-300'}>vs. previous 24h</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. MIDDLE THREE PANELS: MAP | INCIDENT LIST | INCIDENT DETAILS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* PANE 1: THREAT DISTRIBUTION (INDIA) MAP (Col span: 4) */}
        <div className={`lg:col-span-4 rounded-xl border p-3 flex flex-col h-[520px] relative overflow-hidden transition-colors ${
          isLight
            ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
            : 'bg-slate-950/90 border-cyan-500/30 text-white shadow-lg'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between pb-2.5 border-b ${
            isLight ? 'border-slate-200' : 'border-cyan-500/20'
          }`}>
            <div className="flex items-center gap-2">
              <Crosshair className={`w-4 h-4 ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`} />
              <h2 className={`text-xs font-tech font-bold tracking-wider ${isLight ? 'text-slate-900' : 'text-cyan-300'}`}>
                THREAT DISTRIBUTION (INDIA)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono-code font-bold border ${
                isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-slate-900 border-emerald-500/40 text-emerald-400'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
          </div>

          {/* Interactive Tactical Map Canvas */}
          <div className="relative flex-1 w-full mt-2 rounded-lg bg-slate-950 overflow-hidden border border-cyan-500/20 flex items-center justify-center p-2">
            {/* Tactical Grid Background */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.18) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Tactical Coordinate Radar Circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-[320px] h-[320px] rounded-full border border-cyan-400/40 animate-spin duration-[20s]" />
              <div className="w-[200px] h-[200px] rounded-full border border-cyan-500/30 border-dashed" />
            </div>

            {/* Glowing Tactical Cyber Map of India (Uploaded Indian Map) */}
            <div className="relative w-full h-full max-w-[440px] max-h-[460px] flex items-center justify-center">
              <img
                src={indiaNeuralMap}
                alt="Bharat Tactical Cyber Defense Map"
                className="w-full h-full object-contain filter drop-shadow-[0_0_24px_rgba(6,182,212,0.45)] select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Geo Markers for Active Threats */}
              {threatItems.map((threat) => {
                const geo = threatGeoPositions[threat.id];
                if (!geo) return null;

                const isSelected = selectedIncident.id === threat.id;
                const isCritical = threat.severity === 'CRITICAL';
                const isHigh = threat.severity === 'HIGH';
                const isMedium = threat.severity === 'MEDIUM';

                return (
                  <button
                    key={threat.id}
                    onClick={() => setSelectedIncident(threat)}
                    style={{ top: `${geo.topPct}%`, left: `${geo.leftPct}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer p-1.5 focus:outline-none z-10"
                    title={`${threat.type} - ${threat.location}`}
                  >
                    {/* Pulsing indicator ring for active critical/high threats */}
                    {(isCritical || isHigh) && (
                      <span
                        className={`w-6 h-6 rounded-full absolute -top-0.5 -left-0.5 animate-ping opacity-75 pointer-events-none ${
                          isCritical ? 'bg-red-500' : 'bg-orange-500'
                        }`}
                      />
                    )}

                    {/* Core node pin */}
                    <div
                      className={`relative w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200 group-hover:scale-125 ${
                        isSelected
                          ? 'ring-4 ring-cyan-400/80 scale-125'
                          : 'hover:scale-110'
                      } ${
                        isCritical
                          ? 'bg-red-500 border-red-200 shadow-[0_0_12px_#ef4444]'
                          : isHigh
                          ? 'bg-orange-500 border-orange-200 shadow-[0_0_12px_#f97316]'
                          : isMedium
                          ? 'bg-cyan-500 border-cyan-200 shadow-[0_0_10px_#06b6d4]'
                          : 'bg-emerald-400 border-emerald-100 shadow-[0_0_10px_#10b981]'
                      }`}
                    >
                      <span className="text-[7px] text-white font-bold leading-none">
                        {geo.icon}
                      </span>
                    </div>

                    {/* Threat Tooltip on hover/selection */}
                    <div
                      className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded border text-[9px] font-mono-code font-bold transition-all z-20 pointer-events-none ${
                        isSelected
                          ? 'bg-slate-950/95 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)] scale-105'
                          : 'bg-slate-950/80 border-slate-700 text-slate-300 group-hover:border-cyan-500/50 group-hover:bg-slate-950'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isCritical
                              ? 'bg-red-400'
                              : isHigh
                              ? 'bg-orange-400'
                              : isMedium
                              ? 'bg-cyan-400'
                              : 'bg-emerald-400'
                          }`}
                        />
                        <span>{geo.label}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Left Scale Bar & Compass Rose */}
            <div className="absolute left-2.5 bottom-2.5 flex items-center gap-3 text-[9px] font-mono-code text-cyan-300/80 pointer-events-none">
              <div className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>N</span>
              </div>
              <div className="flex flex-col">
                <div className="h-1 w-20 border-b border-l border-r border-cyan-400/70" />
                <span className="text-[8px] text-slate-400 mt-0.5">0 250 750 1,000 km</span>
              </div>
            </div>

            {/* Right Side Overlay Legend: Threat Type & Severity */}
            <div className="absolute right-2 top-2 rounded-lg bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 p-2 text-[10px] font-mono-code text-slate-300 w-28 space-y-2 pointer-events-auto">
              <div>
                <div className="text-[9px] text-cyan-300 font-bold uppercase tracking-wider mb-1">
                  THREAT TYPE
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-red-500 text-xs">▲</span>
                    <span>Drone</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-500 text-xs">▲</span>
                    <span>Missile</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-cyan-400 text-xs">⊕</span>
                    <span>Cyber</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-purple-400 text-xs">⊗</span>
                    <span>IED</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-cyan-300 text-xs">⚓</span>
                    <span>Naval</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 text-xs">◎</span>
                    <span>Surveillance</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-cyan-500/20 pt-1.5">
                <div className="text-[9px] text-cyan-300 font-bold uppercase tracking-wider mb-1">
                  SEVERITY
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Critical</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>High</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Low</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANE 2: THREAT & INCIDENT LIST (Col span: 5) */}
        <div className={`lg:col-span-5 rounded-xl border p-3 flex flex-col h-[520px] transition-colors ${
          isLight
            ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
            : 'bg-slate-950/90 border-cyan-500/30 text-white shadow-lg'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between pb-2.5 border-b ${
            isLight ? 'border-slate-200' : 'border-cyan-500/20'
          }`}>
            <h2 className={`text-xs font-tech font-bold tracking-wider ${isLight ? 'text-slate-900' : 'text-cyan-300'}`}>
              THREAT & INCIDENT LIST
            </h2>
            <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono-code font-bold border ${
              isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-slate-900 border-emerald-500/40 text-emerald-400'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-y-auto mt-2 pr-1 space-y-1">
            <table className="w-full text-left border-collapse text-[11px] font-mono-code">
              <thead>
                <tr className={`border-b text-[10px] uppercase font-bold ${
                  isLight ? 'text-slate-700 border-slate-200 bg-slate-50/80' : 'text-slate-400 border-slate-800/80'
                }`}>
                  <th className="py-2 px-2 w-7">#</th>
                  <th className="py-2 px-2">TIME (IST)</th>
                  <th className="py-2 px-2">TYPE</th>
                  <th className="py-2 px-2">LOCATION</th>
                  <th className="py-2 px-2 text-center">SEVERITY</th>
                  <th className="py-2 px-2 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-900/60'}`}>
                {filteredThreats.map((item, idx) => {
                  const isSelected = selectedIncident.id === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedIncident(item)}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? isLight
                            ? 'bg-cyan-50/90 border-l-4 border-cyan-600 text-slate-900 font-bold shadow-sm'
                            : 'bg-cyan-950/50 border-l-2 border-cyan-400 text-white'
                          : isLight
                            ? 'hover:bg-slate-100 text-slate-800'
                            : 'hover:bg-slate-900/60 text-slate-300'
                      }`}
                    >
                      <td className={`py-2 px-2 font-bold ${isLight ? 'text-slate-600' : 'text-slate-500'}`}>{idx + 1}</td>
                      <td className={`py-2 px-2 font-bold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>{item.time}</td>
                      <td className="py-2 px-2">
                        <div className="flex items-center gap-1.5 font-bold">
                          {getThreatTypeIcon(item.type)}
                          <span className={`truncate ${isLight ? 'text-slate-900 font-bold' : 'text-slate-200'}`}>{item.type}</span>
                        </div>
                      </td>
                      <td className={`py-2 px-2 font-bold ${isLight ? 'text-cyan-800' : 'text-cyan-300'}`}>{item.location}</td>
                      <td className="py-2 px-2 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${getSeverityPill(
                            item.severity
                          )}`}
                        >
                          {item.severity}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${getStatusPill(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* PANE 3: INCIDENT DETAILS (Col span: 3) */}
        <div className={`lg:col-span-3 rounded-xl border p-3 flex flex-col h-[520px] justify-between transition-colors ${
          isLight
            ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
            : 'bg-slate-950/90 border-cyan-500/30 text-white shadow-lg'
        }`}>
          <div>
            {/* Top header */}
            <div className={`flex items-center gap-2 pb-2 border-b ${
              isLight ? 'border-slate-200' : 'border-cyan-500/20'
            }`}>
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h2 className={`text-xs font-tech font-bold tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                INCIDENT DETAILS
              </h2>
            </div>

            {/* Title & Severity Badge */}
            <div className="flex items-center justify-between mt-2.5">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className={`font-tech font-bold text-sm ${isLight ? 'text-red-600' : 'text-red-400'}`}>
                  {selectedIncident.type}
                </span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${getSeverityPill(
                  selectedIncident.severity
                )}`}
              >
                {selectedIncident.severity}
              </span>
            </div>

            {/* Key-Value Specifications */}
            <div className={`my-2.5 space-y-1 text-xs font-mono-code ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
              <div className="flex justify-between">
                <span className={`font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>ID</span>
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>: {selectedIncident.id}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Time</span>
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>: {selectedIncident.time} IST</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Location</span>
                <span className={`font-bold ${isLight ? 'text-cyan-800' : 'text-cyan-300'}`}>: {selectedIncident.location}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Type</span>
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>: {selectedIncident.type}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Status</span>
                <span className={`font-bold ${isLight ? 'text-red-600' : 'text-red-400'}`}>: {selectedIncident.status}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Source</span>
                <span className={`truncate max-w-[150px] font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>: {selectedIncident.source}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Altitude</span>
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>: {selectedIncident.altitude || 'Surface level'}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Speed</span>
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>: {selectedIncident.speed || 'N/A'}</span>
              </div>
            </div>

            {/* Tactical Camera Feed Viewport */}
            <div className="relative rounded-lg overflow-hidden border border-cyan-500/40 bg-black h-36 mt-1">
              <img
                src={droneJkImg}
                alt="Tactical Drone Surveillance"
                className="w-full h-full object-cover opacity-90"
              />
              {/* HUD corner lines */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              {/* Target Crosshair Reticle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-10 h-10 border border-red-500/80 rounded-sm flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <div className="absolute -top-1 w-2 h-0.5 bg-red-500" />
                  <div className="absolute -bottom-1 w-2 h-0.5 bg-red-500" />
                  <div className="absolute -left-1 h-2 w-0.5 bg-red-500" />
                  <div className="absolute -right-1 h-2 w-0.5 bg-red-500" />
                </div>
              </div>

              {/* Top right expand button */}
              <button
                onClick={() => setExpandedFeedOpen(true)}
                className="absolute top-1.5 right-1.5 p-1 rounded bg-black/60 hover:bg-black text-cyan-300 border border-cyan-500/40"
                title="Expand Feed"
              >
                <Maximize2 className="w-3 h-3" />
              </button>

              {/* Coordinates stamp */}
              <div className="absolute bottom-1.5 left-2 bg-black/70 px-1.5 py-0.5 rounded text-[9px] font-mono-code text-cyan-300">
                {selectedIncident.coordsText}
              </div>
            </div>

            {/* Alert Notification banner */}
            <div className={`mt-2.5 p-2 rounded-lg border flex items-center gap-2 text-xs font-mono-code font-bold ${
              isLight ? 'bg-red-50 border-red-200 text-red-700' : 'bg-red-950/60 border-red-500/50 text-red-300'
            }`}>
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span className="truncate">{selectedIncident.alertText}</span>
            </div>
          </div>

          {/* Full Report Action Button */}
          <button
            onClick={() => setReportModalOpen(true)}
            className={`w-full mt-3 py-2 rounded-lg text-xs font-tech font-bold flex items-center justify-center gap-2 transition-all ${
              isLight
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-700 shadow-sm'
                : 'bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 hover:from-cyan-900 hover:to-slate-800 border border-cyan-500/60 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
            }`}
          >
            <span>View Full Report</span>
            <span className={isLight ? 'text-white' : 'text-cyan-400'}>→</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. BOTTOM ROW: ANALYTICS | HEATMAP | RECENT ALERTS | ACTIONS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PANEL 1: INCIDENT ANALYTICS */}
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 shadow-lg flex flex-col justify-between h-[230px]">
          {/* Header with 24H, 7D, 30D toggles */}
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
            <h3 className="text-xs font-tech font-bold text-cyan-300 tracking-wider">
              INCIDENT ANALYTICS
            </h3>
            <div className="flex rounded-md overflow-hidden border border-cyan-500/40 text-[10px] font-mono-code">
              {(['24H', '7D', '30D'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAnalyticsTimeframe(tab)}
                  className={`px-2 py-0.5 transition-colors ${
                    analyticsTimeframe === tab
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Donut Chart & Legend */}
          <div className="flex items-center justify-between gap-2 my-auto">
            {/* SVG Donut */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="4"
                />
                {/* Drone 41.7% (Red) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeDasharray="36.7 88"
                  strokeDashoffset="0"
                />
                {/* Missile 16.7% (Amber) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeDasharray="14.7 88"
                  strokeDashoffset="-36.7"
                />
                {/* Cyber 16.7% (Blue) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="4"
                  strokeDasharray="14.7 88"
                  strokeDashoffset="-51.4"
                />
                {/* IED 16.7% (Purple) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="4"
                  strokeDasharray="14.7 88"
                  strokeDashoffset="-66.1"
                />
                {/* Naval 8.3% (Cyan) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeDasharray="7.3 88"
                  strokeDashoffset="-80.8"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-tech font-bold text-white leading-tight">12</span>
                <span className="text-[8px] font-mono-code text-slate-400">Total Incidents</span>
              </div>
            </div>

            {/* Legend breakdown */}
            <div className="flex-1 space-y-1 text-[10px] font-mono-code">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Drone
                </span>
                <span className="text-slate-400">5</span>
                <span className="text-slate-200 font-bold">41.7%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Missile
                </span>
                <span className="text-slate-400">2</span>
                <span className="text-slate-200 font-bold">16.7%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Cyber
                </span>
                <span className="text-slate-400">2</span>
                <span className="text-slate-200 font-bold">16.7%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  IED
                </span>
                <span className="text-slate-400">2</span>
                <span className="text-slate-200 font-bold">16.7%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Naval
                </span>
                <span className="text-slate-400">1</span>
                <span className="text-slate-200 font-bold">8.3%</span>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: THREAT HEATMAP */}
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 shadow-lg flex flex-col justify-between h-[230px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
            <h3 className="text-xs font-tech font-bold text-cyan-300 tracking-wider">
              THREAT HEATMAP
            </h3>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 border border-emerald-500/40 text-[9px] font-mono-code text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>

          {/* Graphic and Controls */}
          <div className="flex items-center justify-between gap-3 my-auto">
            {/* Miniature India Heatmap */}
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-cyan-500/30 bg-slate-900 flex items-center justify-center">
              <img
                src={heatmapImg}
                alt="Geospatial Threat Heatmap"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Gradient scale and mode buttons */}
            <div className="flex items-center gap-2.5">
              {/* Color Bar */}
              <div className="flex flex-col items-center justify-between h-28 text-[8px] font-mono-code text-slate-400">
                <span className="text-red-400 font-bold">High</span>
                <div className="w-2 flex-1 my-1 rounded-full bg-gradient-to-b from-red-500 via-amber-400 via-emerald-400 to-blue-600" />
                <span className="text-blue-400 font-bold">Low</span>
              </div>

              {/* 4 Mode Buttons */}
              <div className="flex flex-col gap-1 text-[10px] font-mono-code">
                {(['LIVE', 'TERRAIN', 'HYBRID'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setHeatmapLayer(mode)}
                    className={`px-2 py-1 rounded text-left transition-colors border ${
                      heatmapLayer === mode
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode === 'LIVE' && <span className="text-emerald-400 mr-1">●</span>}
                    {mode.charAt(0) + mode.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 3: RECENT ALERTS */}
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 shadow-lg flex flex-col justify-between h-[230px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
            <h3 className="text-xs font-tech font-bold text-cyan-300 tracking-wider">
              RECENT ALERTS
            </h3>
            <button
              onClick={() => setAllThreatsModalOpen(true)}
              className="text-[10px] font-mono-code text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View All
            </button>
          </div>

          {/* Alert list items (6 items) */}
          <div className="space-y-1.5 overflow-hidden my-auto text-[11px] font-mono-code">
            {[
              {
                icon: <AlertTriangle className="w-3.5 h-3.5 text-red-500" />,
                text: 'Drone activity in J&K sector',
                time: '21:42'
              },
              {
                icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />,
                text: 'Missile launch detected (Punjab)',
                time: '21:37'
              },
              {
                icon: <Crosshair className="w-3.5 h-3.5 text-cyan-400" />,
                text: 'Cyber intrusion attempt (Delhi)',
                time: '21:28'
              },
              {
                icon: <Target className="w-3.5 h-3.5 text-purple-400" />,
                text: 'IED suspected (Jammu)',
                time: '21:19'
              },
              {
                icon: <Anchor className="w-3.5 h-3.5 text-cyan-300" />,
                text: 'Naval vessel movement (Arabian Sea)',
                time: '21:12'
              },
              {
                icon: <Eye className="w-3.5 h-3.5 text-emerald-400" />,
                text: 'Unusual surveillance (Rajasthan)',
                time: '20:58'
              }
            ].map((alert, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-1 rounded hover:bg-slate-900/60 transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  {alert.icon}
                  <span className="text-slate-300 truncate">{alert.text}</span>
                </div>
                <span className="text-slate-500 shrink-0 ml-2">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 4: QUICK ACTIONS (3x2 Grid) */}
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 shadow-lg flex flex-col justify-between h-[230px]">
          {/* Header */}
          <div className="pb-2 border-b border-cyan-500/20">
            <h3 className="text-xs font-tech font-bold text-cyan-300 tracking-wider">
              QUICK ACTIONS
            </h3>
          </div>

          {/* 3x2 Grid */}
          <div className="grid grid-cols-3 gap-2 my-auto">
            {/* 1. View All Threats */}
            <button
              onClick={() => setAllThreatsModalOpen(true)}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/60 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all h-[70px] group"
            >
              <Target className="w-5 h-5 text-red-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono-code text-center leading-tight">
                View All Threats
              </span>
            </button>

            {/* 2. Request Drone Support */}
            <button
              onClick={() => setDroneModalOpen(true)}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/60 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all h-[70px] group"
            >
              <Plane className="w-5 h-5 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono-code text-center leading-tight">
                Request Drone Support
              </span>
            </button>

            {/* 3. Generate Report */}
            <button
              onClick={() => setReportModalOpen(true)}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/60 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all h-[70px] group"
            >
              <FileText className="w-5 h-5 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono-code text-center leading-tight">
                Generate Report
              </span>
            </button>

            {/* 4. Run AI Analysis */}
            <button
              onClick={() => onNavigate && onNavigate('AI')}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/60 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all h-[70px] group"
            >
              <Cpu className="w-5 h-5 text-cyan-300 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono-code text-center leading-tight">
                Run AI Analysis
              </span>
            </button>

            {/* 5. Share Intel */}
            <button
              onClick={() => setShareModalOpen(true)}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/60 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all h-[70px] group"
            >
              <Share2 className="w-5 h-5 text-purple-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono-code text-center leading-tight">
                Share Intel
              </span>
            </button>

            {/* 6. Open Map */}
            <button
              onClick={() => onNavigate && onNavigate('DASHBOARD')}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/90 hover:bg-cyan-950/60 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all h-[70px] group"
            >
              <MapIcon className="w-5 h-5 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono-code text-center leading-tight">
                Open Map
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. FUNCTIONAL MODALS                                         */}
      {/* ============================================================ */}
      {/* Incident Dossier Full Modal */}
      <IncidentReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        incident={selectedIncident}
      />

      {/* Request Tactical Drone Support Modal */}
      <DroneSupportModal
        isOpen={droneModalOpen}
        onClose={() => setDroneModalOpen(false)}
        location={selectedIncident.location}
      />

      {/* Share Encrypted Intel Modal */}
      <ShareIntelModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        incidentTitle={`${selectedIncident.id} - ${selectedIncident.type} (${selectedIncident.location})`}
      />

      {/* Expanded Camera / UAV Feed Modal */}
      {expandedFeedOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl rounded-2xl bg-slate-950 border border-cyan-500/60 p-4 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30 mb-3">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-cyan-400" />
                <h3 className="font-tech font-bold text-white text-base">
                  LIVE OPTICAL FEED // SECTOR: {selectedIncident.location}
                </h3>
              </div>
              <button
                onClick={() => setExpandedFeedOpen(false)}
                className="p-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 bg-black aspect-video max-h-[70vh]">
              <img
                src={droneJkImg}
                alt="Expanded Feed"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/80 px-3 py-1 rounded border border-cyan-500/40 text-xs font-mono-code text-cyan-300">
                LAT/LONG: {selectedIncident.coordsText} • ALT: {selectedIncident.altitude || '2,400 ft'}
              </div>
              <div className="absolute bottom-3 right-3 bg-red-950/80 px-3 py-1 rounded border border-red-500/60 text-xs font-mono-code text-red-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                RECORDING ACTIVE // FEED ENCRYPTED
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View All Threats Modal */}
      {allThreatsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-2xl bg-slate-950 border border-cyan-500/60 p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-red-400" />
                <h3 className="font-tech font-bold text-white text-base">
                  MASTER THREAT LOG // 23 ACTIVE ANOMALIES
                </h3>
              </div>
              <button
                onClick={() => setAllThreatsModalOpen(false)}
                className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto my-4 pr-1">
              <table className="w-full text-left text-xs font-mono-code">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800 pb-2">
                    <th className="py-2">ID</th>
                    <th className="py-2">TIME</th>
                    <th className="py-2">TYPE</th>
                    <th className="py-2">SECTOR</th>
                    <th className="py-2">SEVERITY</th>
                    <th className="py-2">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {threatItems.map((t) => (
                    <tr
                      key={t.id}
                      onClick={() => {
                        setSelectedIncident(t);
                        setAllThreatsModalOpen(false);
                      }}
                      className="hover:bg-cyan-950/40 cursor-pointer text-slate-300"
                    >
                      <td className="py-2.5 font-bold text-cyan-400">{t.id}</td>
                      <td className="py-2.5">{t.time}</td>
                      <td className="py-2.5">{t.type}</td>
                      <td className="py-2.5 text-slate-200">{t.location}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${getSeverityPill(t.severity)}`}>
                          {t.severity}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${getStatusPill(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end pt-3 border-t border-cyan-500/20">
              <button
                onClick={() => setAllThreatsModalOpen(false)}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono-code text-white"
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
