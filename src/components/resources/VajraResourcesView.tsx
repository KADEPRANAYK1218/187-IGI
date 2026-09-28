import React, { useState } from 'react';
import { 
  Layers, Search, Filter, ChevronDown, Check, ArrowRight,
  Shield, Users, User, Anchor, Plane, Crosshair, Box, Package,
  Truck, Wrench, Calendar, Archive, Plus, Minus, Compass, 
  MapPin, Radio, Building2, TowerControl, Navigation, AlertCircle,
  ExternalLink, Fuel, CheckCircle2, ChevronRight, Activity
} from 'lucide-react';
import vajraCyberMap from '../../assets/images/vajra_india_cyber_map_1788188888561.jpg';
import { 
  AllocateResourcesModal, 
  RequestSupplyModal, 
  ScheduleDeploymentModal, 
  ViewInventoryModal 
} from './ResourceModals';

// Custom Tactical SVG Icons matching reference layout
const TankSvg: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 36 28" fill="currentColor" className={className}>
    <rect x="23" y="7" width="11" height="2.2" rx="0.8" />
    <circle cx="34.5" cy="8.1" r="1.2" />
    <path d="M12 6.5C12 5.2 13.2 4.2 15 4.2H21C22.8 4.2 24 5.2 24 6.5V10.5H12V6.5Z" />
    <path d="M5.5 12C5.5 10.8 6.6 10 8.2 10H25.8C27.4 10 28.5 10.8 28.5 12L27.5 16H4.5L5.5 12Z" />
    <rect x="2" y="16" width="30" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="6.5" cy="20" r="2.2" />
    <circle cx="12.2" cy="20" r="2.2" />
    <circle cx="17.9" cy="20" r="2.2" />
    <circle cx="23.6" cy="20" r="2.2" />
    <circle cx="28" cy="20" r="1.6" />
  </svg>
);

const JetSvg: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L9.5 9H3L2 11L9.5 13.5L8 18L5.5 19V21L12 19.5L18.5 21V19L16 18L14.5 13.5L22 11L21 9H14.5L12 2Z" />
  </svg>
);

const WarshipSvg: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2 17L5 13H19L22 17H2Z" />
    <rect x="8" y="8" width="8" height="5" rx="1" />
    <line x1="12" y1="4" x2="12" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 19C5 19 6 20 8 20C10 20 11 19 13 19C15 19 16 20 18 20C20 20 21 19 22 19" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const RifleSvg: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="7" y1="12" x2="7" y2="15" />
    <line x1="12" y1="12" x2="12" y2="17" />
    <line x1="15" y1="12" x2="18" y2="17" />
    <circle cx="5" cy="12" r="1" fill="currentColor" />
  </svg>
);

const ArmySwordsSvg: React.FC<{ className?: string; size?: number }> = ({ className = 'w-4 h-4', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" y1="20" x2="18" y2="6" />
    <line x1="18" y1="6" x2="20" y2="4" />
    <line x1="6" y1="18" x2="4" y2="20" />
    <line x1="20" y1="20" x2="6" y2="6" />
    <line x1="6" y1="6" x2="4" y2="4" />
    <line x1="18" y1="18" x2="20" y2="20" />
  </svg>
);

const CommandInsigniaSvg: React.FC<{ className?: string; size?: number }> = ({ className = 'w-4 h-4', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <polygon points="12,5 14,10 19,10 15,13 17,18 12,15 7,18 9,13 5,10 10,10" fill="currentColor" />
  </svg>
);

export const VajraResourcesView: React.FC = () => {
  // Filter States
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');

  // Map Controls State
  const [mapZoom, setMapZoom] = useState(1);
  const [activeMapFilter, setActiveMapFilter] = useState<string | null>(null);

  // Modals State
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [showSupplyModal, setShowSupplyModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [detailModalTitle, setDetailModalTitle] = useState<string | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Zoom handlers
  const handleZoomIn = () => setMapZoom(prev => Math.min(prev + 0.25, 2.2));
  const handleZoomOut = () => setMapZoom(prev => Math.max(prev - 0.25, 0.8));

  return (
    <div className="relative w-full flex flex-col space-y-3.5 select-none font-tech" id="vajra-resources-main-view">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-[#02132d] border border-cyan-400 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center gap-2.5 text-xs font-mono-code text-cyan-200 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP TOOLBAR BAR: TITLE & FILTERS */}
      {/* ========================================================================= */}
      <div className="w-full rounded-2xl p-3 sm:p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-[0_0_25px_rgba(0,85,255,0.2)] flex flex-wrap items-center justify-between gap-3">
        {/* Left: Icon, Title & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase leading-tight">
              RESOURCES
            </h1>
            <p className="text-[9.5px] sm:text-[10px] font-mono-code font-bold tracking-wider text-cyan-400 uppercase">
              PERSONNEL • UNITS • EQUIPMENT • ASSETS • SUPPLY CHAIN
            </p>
          </div>
        </div>

        {/* Right: Dropdowns & Search Input */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono-code">
          {/* Region Dropdown */}
          <div className="flex flex-col">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Region</label>
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  triggerToast(`Region filter: ${e.target.value}`);
                }}
                className="appearance-none bg-[#031533] border border-cyan-500/40 rounded-xl pl-3 pr-8 py-1.5 text-slate-200 font-bold outline-none hover:border-cyan-400 focus:border-cyan-300 transition cursor-pointer text-xs"
              >
                <option value="All Regions">All Regions</option>
                <option value="Northern Command">Northern Command</option>
                <option value="Western Command">Western Command</option>
                <option value="Eastern Command">Eastern Command</option>
                <option value="Southern Command">Southern Command</option>
                <option value="Central Command">Central Command</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Branch Dropdown */}
          <div className="flex flex-col">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Branch</label>
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  triggerToast(`Branch filter: ${e.target.value}`);
                }}
                className="appearance-none bg-[#031533] border border-cyan-500/40 rounded-xl pl-3 pr-8 py-1.5 text-slate-200 font-bold outline-none hover:border-cyan-400 focus:border-cyan-300 transition cursor-pointer text-xs"
              >
                <option value="All Branches">All Branches</option>
                <option value="Army">Indian Army</option>
                <option value="Navy">Indian Navy</option>
                <option value="Air Force">Indian Air Force</option>
                <option value="Paramilitary">Paramilitary Forces</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="flex flex-col">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Status</label>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  triggerToast(`Status filter: ${e.target.value}`);
                }}
                className="appearance-none bg-[#031533] border border-cyan-500/40 rounded-xl pl-3 pr-8 py-1.5 text-slate-200 font-bold outline-none hover:border-cyan-400 focus:border-cyan-300 transition cursor-pointer text-xs"
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Standby">Standby</option>
                <option value="Deployed">Deployed</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Search Resources Input */}
          <div className="flex flex-col">
            <label className="text-[9px] font-bold text-transparent mb-0.5 select-none">Search</label>
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 sm:w-56 bg-[#031533] border border-cyan-500/40 rounded-xl pl-8 pr-3 py-1.5 text-slate-200 placeholder-slate-500 outline-none hover:border-cyan-400 focus:border-cyan-300 transition text-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-slate-400 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP METRICS ROW: 6 KPI CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Card 1: TOTAL PERSONNEL */}
        <div className="rounded-2xl p-3 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-lg flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <User className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase truncate">
              TOTAL PERSONNEL
            </div>
            <div className="text-xl font-tech font-bold text-white tracking-tight leading-tight mt-0.5">
              1,24,860
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono-code font-bold text-emerald-400 mt-0.5">
              <span>▲ 2.4%</span>
              <span className="text-slate-400 font-normal">vs. previous 24h</span>
            </div>
          </div>
        </div>

        {/* Card 2: COMBAT UNITS */}
        <div className="rounded-2xl p-3 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-lg flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <Shield className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase truncate">
              COMBAT UNITS
            </div>
            <div className="text-xl font-tech font-bold text-white tracking-tight leading-tight mt-0.5">
              428
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono-code font-bold text-emerald-400 mt-0.5">
              <span>▲ 1.8%</span>
              <span className="text-slate-400 font-normal">vs. previous 24h</span>
            </div>
          </div>
        </div>

        {/* Card 3: EQUIPMENT */}
        <div className="rounded-2xl p-3 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-lg flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <TankSvg size={24} className="text-cyan-300" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase truncate">
              EQUIPMENT
            </div>
            <div className="text-xl font-tech font-bold text-white tracking-tight leading-tight mt-0.5">
              12,360
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono-code font-bold text-emerald-400 mt-0.5">
              <span>▲ 3.2%</span>
              <span className="text-slate-400 font-normal">vs. previous 24h</span>
            </div>
          </div>
        </div>

        {/* Card 4: AIRCRAFT */}
        <div className="rounded-2xl p-3 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-lg flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <JetSvg size={24} className="text-cyan-300" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase truncate">
              AIRCRAFT
            </div>
            <div className="text-xl font-tech font-bold text-white tracking-tight leading-tight mt-0.5">
              286
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono-code font-bold text-emerald-400 mt-0.5">
              <span>▲ 1.9%</span>
              <span className="text-slate-400 font-normal">▲ 2.7% vs. 24h</span>
            </div>
          </div>
        </div>

        {/* Card 5: SHIPS */}
        <div className="rounded-2xl p-3 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-lg flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <WarshipSvg size={24} className="text-cyan-300" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase truncate">
              SHIPS
            </div>
            <div className="text-xl font-tech font-bold text-white tracking-tight leading-tight mt-0.5">
              54
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono-code font-bold text-emerald-400 mt-0.5">
              <span>▲ 7.9%</span>
              <span className="text-slate-400 font-normal">▲ 1.9% vs. 24h</span>
            </div>
          </div>
        </div>

        {/* Card 6: SUPPLY LEVEL */}
        <div className="rounded-2xl p-3 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-lg flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <Package className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9.5px] font-mono-code font-bold tracking-wider text-slate-300 uppercase truncate">
              SUPPLY LEVEL
            </div>
            <div className="text-xl font-tech font-bold text-white tracking-tight leading-tight mt-0.5">
              87%
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono-code font-bold text-emerald-400 mt-0.5">
              <span>▲ 0.5%</span>
              <span className="text-slate-400 font-normal">▲ 0.5% vs. 24h</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MIDDLE SECTION: 3 COLUMNS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* ========================================================= */}
        {/* COLUMN 1 (4 COLS): PERSONNEL OVERVIEW & EQUIPMENT & ASSETS */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 flex flex-col space-y-3.5">
          {/* Card A: PERSONNEL OVERVIEW */}
          <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#0055ff]/30 mb-2.5">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                    PERSONNEL OVERVIEW
                  </span>
                </div>
                <button
                  onClick={() => setDetailModalTitle('PERSONNEL OVERVIEW')}
                  className="text-[10px] font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
                >
                  <span>View All</span>
                  <span>→</span>
                </button>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 text-[10px] font-mono-code text-slate-400 uppercase tracking-wider pb-1.5 px-2 border-b border-slate-800/80">
                <div className="col-span-5">Branch</div>
                <div className="col-span-2 text-right">Total</div>
                <div className="col-span-3 text-right">Active</div>
                <div className="col-span-2 text-right">On Leave</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-1 mt-1 font-mono-code text-xs">
                {/* Army */}
                <div className="grid grid-cols-12 items-center p-2 rounded-xl bg-[#031533]/50 hover:bg-[#031533] transition">
                  <div className="col-span-5 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shrink-0">
                      <ArmySwordsSvg />
                    </div>
                    <span className="text-white font-bold text-[11px]">Army</span>
                  </div>
                  <div className="col-span-2 text-right text-slate-300 font-bold">72,480</div>
                  <div className="col-span-3 text-right text-emerald-400 font-bold">70,120</div>
                  <div className="col-span-2 text-right text-slate-400">2,360</div>
                </div>

                {/* Navy */}
                <div className="grid grid-cols-12 items-center p-2 rounded-xl bg-[#031533]/50 hover:bg-[#031533] transition">
                  <div className="col-span-5 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shrink-0">
                      <Anchor className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-white font-bold text-[11px]">Navy</span>
                  </div>
                  <div className="col-span-2 text-right text-slate-300 font-bold">22,560</div>
                  <div className="col-span-3 text-right text-emerald-400 font-bold">21,740</div>
                  <div className="col-span-2 text-right text-slate-400">820</div>
                </div>

                {/* Air Force */}
                <div className="grid grid-cols-12 items-center p-2 rounded-xl bg-[#031533]/50 hover:bg-[#031533] transition">
                  <div className="col-span-5 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center text-blue-400 shrink-0">
                      <Plane className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-white font-bold text-[11px]">Air Force</span>
                  </div>
                  <div className="col-span-2 text-right text-slate-300 font-bold">18,420</div>
                  <div className="col-span-3 text-right text-emerald-400 font-bold">17,860</div>
                  <div className="col-span-2 text-right text-slate-400">560</div>
                </div>

                {/* Paramilitary */}
                <div className="grid grid-cols-12 items-center p-2 rounded-xl bg-[#031533]/50 hover:bg-[#031533] transition">
                  <div className="col-span-5 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0">
                      <Shield className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-white font-bold text-[11px]">Paramilitary</span>
                  </div>
                  <div className="col-span-2 text-right text-slate-300 font-bold">11,200</div>
                  <div className="col-span-3 text-right text-emerald-400 font-bold">10,760</div>
                  <div className="col-span-2 text-right text-slate-400">440</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: EQUIPMENT & ASSETS */}
          <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#0055ff]/30 mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                    EQUIPMENT & ASSETS
                  </span>
                </div>
                <button
                  onClick={() => setShowInventoryModal(true)}
                  className="text-[10px] font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
                >
                  <span>View All</span>
                  <span>→</span>
                </button>
              </div>

              {/* 4 Donut Progress Rings */}
              <div className="grid grid-cols-4 gap-2 text-center font-mono-code">
                {/* 1. Vehicles */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-300 font-bold mb-1">Vehicles</span>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#0a1a36" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="10"
                        strokeDasharray="238.76"
                        strokeDashoffset={238.76 * (1 - 0.86)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-cyan-300">
                      <TankSvg size={20} />
                    </div>
                  </div>
                  <div className="text-[9.5px] text-slate-300 mt-1 font-bold">3,420 / 4,000</div>
                  <div className="text-[10px] text-cyan-400 font-bold">86%</div>
                </div>

                {/* 2. Weapons */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-300 font-bold mb-1">Weapons</span>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#0a1a36" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="10"
                        strokeDasharray="238.76"
                        strokeDashoffset={238.76 * (1 - 0.88)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-cyan-300">
                      <RifleSvg size={20} />
                    </div>
                  </div>
                  <div className="text-[9.5px] text-slate-300 mt-1 font-bold">8,760 / 10,000</div>
                  <div className="text-[10px] text-cyan-400 font-bold">88%</div>
                </div>

                {/* 3. Aircraft */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-300 font-bold mb-1">Aircraft</span>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#0a1a36" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="10"
                        strokeDasharray="238.76"
                        strokeDashoffset={238.76 * (1 - 0.89)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-amber-400">
                      <JetSvg size={20} />
                    </div>
                  </div>
                  <div className="text-[9.5px] text-slate-300 mt-1 font-bold">286 / 320</div>
                  <div className="text-[10px] text-amber-400 font-bold">89%</div>
                </div>

                {/* 4. Ships */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-300 font-bold mb-1">Ships</span>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#0a1a36" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="10"
                        strokeDasharray="238.76"
                        strokeDashoffset={238.76 * (1 - 0.77)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-purple-400">
                      <WarshipSvg size={20} />
                    </div>
                  </div>
                  <div className="text-[9.5px] text-slate-300 mt-1 font-bold">54 / 70</div>
                  <div className="text-[10px] text-purple-400 font-bold">77%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 2 (4 COLS): UNITS DEPLOYMENT & SUPPLY & LOGISTICS */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 flex flex-col space-y-3.5">
          {/* Card C: UNITS DEPLOYMENT */}
          <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#0055ff]/30 mb-2.5">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                    UNITS DEPLOYMENT
                  </span>
                </div>
                <button
                  onClick={() => setDetailModalTitle('UNITS DEPLOYMENT')}
                  className="text-[10px] font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
                >
                  <span>View All</span>
                  <span>→</span>
                </button>
              </div>

              {/* 5 Command Rows */}
              <div className="space-y-1.5 font-mono-code text-xs">
                {/* 1. Northern Command */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#031533]/50 hover:bg-[#031533] transition">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                      <CommandInsigniaSvg />
                    </div>
                    <div className="truncate">
                      <div className="text-white font-bold text-[11px] leading-none">Northern Command</div>
                      <div className="text-[9.5px] text-slate-400 leading-none mt-0.5">J&K & Ladakh</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/60 text-[9px] text-emerald-300 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Active</span>
                    </span>
                    <span className="text-white font-bold text-xs">18,450</span>
                  </div>
                </div>

                {/* 2. Western Command */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#031533]/50 hover:bg-[#031533] transition">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                      <CommandInsigniaSvg />
                    </div>
                    <div className="truncate">
                      <div className="text-white font-bold text-[11px] leading-none">Western Command</div>
                      <div className="text-[9.5px] text-slate-400 leading-none mt-0.5">Rajasthan</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/60 text-[9px] text-emerald-300 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Active</span>
                    </span>
                    <span className="text-white font-bold text-xs">16,320</span>
                  </div>
                </div>

                {/* 3. Eastern Command */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#031533]/50 hover:bg-[#031533] transition">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                      <CommandInsigniaSvg />
                    </div>
                    <div className="truncate">
                      <div className="text-white font-bold text-[11px] leading-none">Eastern Command</div>
                      <div className="text-[9.5px] text-slate-400 leading-none mt-0.5">NE Region</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/60 text-[9px] text-emerald-300 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Active</span>
                    </span>
                    <span className="text-white font-bold text-xs">14,280</span>
                  </div>
                </div>

                {/* 4. Southern Command */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#031533]/50 hover:bg-[#031533] transition">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                      <CommandInsigniaSvg />
                    </div>
                    <div className="truncate">
                      <div className="text-white font-bold text-[11px] leading-none">Southern Command</div>
                      <div className="text-[9.5px] text-slate-400 leading-none mt-0.5">Tamil Nadu</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/60 text-[9px] text-emerald-300 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Active</span>
                    </span>
                    <span className="text-white font-bold text-xs">12,760</span>
                  </div>
                </div>

                {/* 5. Central Command */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#031533]/50 hover:bg-[#031533] transition">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                      <CommandInsigniaSvg />
                    </div>
                    <div className="truncate">
                      <div className="text-white font-bold text-[11px] leading-none">Central Command</div>
                      <div className="text-[9.5px] text-slate-400 leading-none mt-0.5">MP & Chhattisgarh</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-amber-950 border border-amber-500/60 text-[9px] text-amber-300 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>Standby</span>
                    </span>
                    <span className="text-white font-bold text-xs">9,420</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card D: SUPPLY & LOGISTICS */}
          <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#0055ff]/30 mb-2.5">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                    SUPPLY & LOGISTICS
                  </span>
                </div>
                <button
                  onClick={() => setShowSupplyModal(true)}
                  className="text-[10px] font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
                >
                  <span>View All</span>
                  <span>→</span>
                </button>
              </div>

              {/* Gauge + Bars Layout */}
              <div className="flex items-center gap-4">
                {/* Left: Donut Gauge */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#0a1a36" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="10"
                        strokeDasharray="238.76"
                        strokeDashoffset={238.76 * (1 - 0.87)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-base font-tech font-bold text-white leading-none">87%</span>
                      <span className="text-[7.5px] font-mono-code text-emerald-400 font-bold uppercase mt-0.5">Readiness</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono-code text-slate-300 mt-1">Supply Readiness</span>
                </div>

                {/* Right: 5 Progress Bars */}
                <div className="flex-1 space-y-1 text-[10px] font-mono-code">
                  {[
                    { label: 'Fuel', percent: 93 },
                    { label: 'Ammunition', percent: 88 },
                    { label: 'Rations', percent: 84 },
                    { label: 'Medical', percent: 76 },
                    { label: 'Spare Parts', percent: 69 }
                  ].map((bar) => (
                    <div key={bar.label} className="flex items-center gap-2">
                      <span className="w-20 text-slate-300 truncate">{bar.label}</span>
                      <div className="flex-1 h-2 rounded-full bg-[#0a1a36] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                          style={{ width: `${bar.percent}%` }}
                        />
                      </div>
                      <span className="w-7 text-right text-slate-200 font-bold text-[9px]">{bar.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom 3 Chips */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-800/80 font-mono-code text-center">
                <div className="flex items-center justify-center gap-1.5 p-1.5 rounded-xl bg-[#031533]/60">
                  <Package className="w-3.5 h-3.5 text-cyan-400" />
                  <div className="text-left leading-none">
                    <div className="text-[8px] text-slate-400 uppercase">Supply Depots</div>
                    <div className="text-xs font-bold text-white mt-0.5">48</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1.5 p-1.5 rounded-xl bg-[#031533]/60">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <div className="text-left leading-none">
                    <div className="text-[8px] text-slate-400 uppercase">Forward Bases</div>
                    <div className="text-xs font-bold text-white mt-0.5">12</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1.5 p-1.5 rounded-xl bg-[#031533]/60">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <div className="text-left leading-none">
                    <div className="text-[8px] text-slate-400 uppercase">Logistics Convoys</div>
                    <div className="text-xs font-bold text-white mt-0.5">26</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 3 (4 COLS): RESOURCE MAP & INFRASTRUCTURE */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 flex flex-col space-y-3.5">
          {/* Card E: RESOURCE MAP */}
          <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex-1 flex flex-col justify-between overflow-hidden relative">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#0055ff]/30 mb-2 relative z-10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                    RESOURCE MAP
                  </span>
                </div>
              </div>

              {/* Map Canvas with Interactive Overlay & Zoom */}
              <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-[#01091a] border border-cyan-500/30 flex items-center justify-center">
                {/* Cybernetic India Map Background (UNCHANGED ASSET) */}
                <div
                  className="absolute inset-0 w-full h-full transition-transform duration-300"
                  style={{ transform: `scale(${mapZoom})` }}
                >
                  <img
                    src={vajraCyberMap}
                    alt="Resource Operational Map of India"
                    className="w-full h-full object-contain object-center filter brightness-110 contrast-125 select-none pointer-events-none"
                  />

                  {/* Geographical Watermark Labels */}
                  <div className="absolute top-[16%] right-[22%] text-[9px] font-tech font-bold text-cyan-400/60 tracking-widest pointer-events-none">
                    CHINA
                  </div>
                  <div className="absolute top-[50%] left-[8%] text-[8px] font-mono-code font-bold text-cyan-400/50 tracking-wider pointer-events-none">
                    ARABIAN SEA
                  </div>
                  <div className="absolute top-[50%] right-[10%] text-[8px] font-mono-code font-bold text-cyan-400/50 tracking-wider pointer-events-none">
                    BAY OF BENGAL
                  </div>
                  <div className="absolute bottom-[6%] right-[26%] text-[8px] font-mono-code font-bold text-cyan-400/50 tracking-wider pointer-events-none">
                    INDIAN OCEAN
                  </div>

                  {/* Tactical Markers on Map */}
                  {/* Army Units (Green) */}
                  <div className="absolute top-[22%] left-[45%] group cursor-pointer" onClick={() => triggerToast('Northern Strike Command (J&K)')}>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-500/50 animate-ping absolute" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 relative shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </div>
                  <div className="absolute top-[38%] left-[34%] group cursor-pointer" onClick={() => triggerToast('Western Armored Division (Rajasthan)')}>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                  </div>
                  <div className="absolute top-[34%] right-[32%] group cursor-pointer" onClick={() => triggerToast('Eastern Mountain Corps')}>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                  </div>

                  {/* Navy Units (Cyan) */}
                  <div className="absolute top-[56%] left-[28%] group cursor-pointer" onClick={() => triggerToast('Western Naval Fleet')}>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                  </div>
                  <div className="absolute top-[60%] right-[35%] group cursor-pointer" onClick={() => triggerToast('Eastern Naval Fleet (Visakhapatnam)')}>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                  </div>

                  {/* Air Force Units (Blue) */}
                  <div className="absolute top-[28%] left-[42%] group cursor-pointer" onClick={() => triggerToast('Ambala Air Base Squadron')}>
                    <Plane className="w-3 h-3 text-blue-400 filter drop-shadow-[0_0_4px_rgba(59,130,246,0.8)]" />
                  </div>

                  {/* Strategic Assets (Amber Triangle) */}
                  <div className="absolute top-[44%] left-[48%] group cursor-pointer" onClick={() => triggerToast('Strategic S-400 Unit - Central')}>
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-amber-400 filter drop-shadow-[0_0_4px_rgba(245,158,11,0.8)]" />
                  </div>

                  {/* Supply Depots (Purple Dot) */}
                  <div className="absolute top-[42%] left-[40%] group cursor-pointer" onClick={() => triggerToast('Secunderabad Central Depot')}>
                    <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                  </div>

                  {/* Naval Bases (Anchor) */}
                  <div className="absolute top-[54%] left-[24%] group cursor-pointer" onClick={() => triggerToast('INS Shikra / Mumbai Naval Dockyard')}>
                    <Anchor className="w-3 h-3 text-cyan-400 filter drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]" />
                  </div>
                </div>

                {/* Right Side Map Legend Overlay */}
                <div className="absolute right-2 top-2 bg-[#020b1c]/90 border border-cyan-500/30 rounded-lg p-1.5 space-y-1 text-[8px] font-mono-code z-10 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Army Unit</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Navy Unit</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Plane className="w-2.5 h-2.5 text-blue-400" />
                    <span>Air Force Unit</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-amber-400 text-[8px]">▲</span>
                    <span>Strategic Asset</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>Supply Depot</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Anchor className="w-2.5 h-2.5 text-cyan-400" />
                    <span>Naval Base</span>
                  </div>
                </div>

                {/* Zoom Controls Overlay */}
                <div className="absolute right-2 bottom-8 flex flex-col gap-1 z-10">
                  <button
                    onClick={handleZoomIn}
                    title="Zoom in map"
                    className="w-6 h-6 rounded-md bg-[#020b1c]/90 border border-cyan-500/40 text-cyan-300 hover:text-white flex items-center justify-center transition cursor-pointer text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    title="Zoom out map"
                    className="w-6 h-6 rounded-md bg-[#020b1c]/90 border border-cyan-500/40 text-cyan-300 hover:text-white flex items-center justify-center transition cursor-pointer text-xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Left Compass & Scale Bar */}
                <div className="absolute left-2 bottom-2 font-mono-code text-[7.5px] text-slate-400 z-10">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Compass className="w-3 h-3 text-cyan-400 animate-spin-slow" />
                    <span className="text-cyan-400 font-bold">N</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>0</span>
                    <span className="w-6 h-[1px] bg-slate-500 inline-block" />
                    <span>500</span>
                    <span className="w-6 h-[1px] bg-slate-500 inline-block" />
                    <span>1,000</span>
                    <span className="w-6 h-[1px] bg-slate-500 inline-block" />
                    <span>1,500 km</span>
                  </div>
                </div>

                {/* Bottom Right: View Details Button */}
                <button
                  onClick={() => setDetailModalTitle('RESOURCE MAP & TACTICAL BASES')}
                  className="absolute right-2 bottom-2 z-10 text-[9px] font-mono-code text-cyan-300 hover:text-white bg-cyan-950/90 border border-cyan-500/50 rounded-md px-2 py-0.5 flex items-center gap-1 transition cursor-pointer"
                >
                  <span>View Details</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card F: INFRASTRUCTURE */}
          <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#0055ff]/30 mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                    INFRASTRUCTURE
                  </span>
                </div>
                <button
                  onClick={() => setDetailModalTitle('MILITARY INFRASTRUCTURE')}
                  className="text-[10px] font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
                >
                  <span>View All</span>
                  <span>→</span>
                </button>
              </div>

              {/* 5 Infrastructure Items */}
              <div className="space-y-1 font-mono-code text-xs">
                {[
                  { icon: Plane, label: 'Air Bases', ratio: '28 / 30', percent: '93%' },
                  { icon: Anchor, label: 'Naval Bases', ratio: '12 / 14', percent: '86%' },
                  { icon: Radio, label: 'Radar Stations', ratio: '24 / 28', percent: '86%' },
                  { icon: TowerControl, label: 'Communication Towers', ratio: '56 / 60', percent: '93%' },
                  { icon: Archive, label: 'Storage Facilities', ratio: '18 / 22', percent: '82%' }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between p-1.5 rounded-xl bg-[#031533]/50 hover:bg-[#031533] transition">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0">
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="text-white text-[11px] font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-300 font-bold text-xs">{item.ratio}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/60 text-[9px] text-emerald-300 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{item.percent}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM ROW: 4 CARDS ACROSS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {/* Card 1: AVAILABLE RESOURCES */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex flex-col justify-between">
          <div>
            <div className="pb-2 border-b border-[#0055ff]/30 mb-2.5">
              <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                AVAILABLE RESOURCES
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1 text-center font-mono-code pt-1">
              {/* Personnel */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-1">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-[9px] text-slate-400 uppercase">Personnel</span>
                <span className="text-xs font-bold text-white mt-0.5">4,320</span>
              </div>

              {/* Vehicles */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-1">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-[9px] text-slate-400 uppercase">Vehicles</span>
                <span className="text-xs font-bold text-white mt-0.5">680</span>
              </div>

              {/* Aircraft */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-1">
                  <JetSvg size={16} />
                </div>
                <span className="text-[9px] text-slate-400 uppercase">Aircraft</span>
                <span className="text-xs font-bold text-white mt-0.5">34</span>
              </div>

              {/* Ships */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-1">
                  <WarshipSvg size={16} />
                </div>
                <span className="text-[9px] text-slate-400 uppercase">Ships</span>
                <span className="text-xs font-bold text-white mt-0.5">6</span>
              </div>

              {/* Equipment */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-1">
                  <Box className="w-4 h-4" />
                </div>
                <span className="text-[9px] text-slate-400 uppercase">Equipment</span>
                <span className="text-xs font-bold text-white mt-0.5">1,250</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: RESOURCES UTILIZATION */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex flex-col justify-between">
          <div>
            <div className="pb-2 border-b border-[#0055ff]/30 mb-2.5">
              <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                RESOURCES UTILIZATION
              </span>
            </div>

            <div className="space-y-1.5 font-mono-code text-[10px]">
              {[
                { label: 'Personnel', percent: 78 },
                { label: 'Vehicles', percent: 72 },
                { label: 'Aircraft', percent: 68 },
                { label: 'Ships', percent: 54 },
                { label: 'Equipment', percent: 76 }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="w-16 text-slate-300 truncate">{item.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-[#0a1a36] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <span className="w-7 text-right text-slate-200 font-bold">{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: RECENT ACTIVITIES */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#0055ff]/30 mb-2">
              <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                RECENT ACTIVITIES
              </span>
              <button
                onClick={() => setDetailModalTitle('ALL LOGISTICS ACTIVITIES')}
                className="text-[10px] font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
              >
                <span>View All</span>
                <span>→</span>
              </button>
            </div>

            <div className="space-y-1 font-mono-code text-xs">
              {[
                { icon: User, text: 'New troop deployment - Northern Command', time: '21:32' },
                { icon: Wrench, text: 'Equipment maintenance completed - Air Force', time: '20:45' },
                { icon: Truck, text: 'Supply convoy arrived - Rajasthan', time: '19:18' },
                { icon: JetSvg, text: 'Aircraft sortie - Eastern Command', time: '18:47' },
                { icon: WarshipSvg, text: 'Ship patrol initiated - Indian Navy', time: '17:20' }
              ].map((act, i) => {
                const Icon = act.icon;
                return (
                  <div key={i} className="flex items-center justify-between py-0.5 text-[10px]">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="text-cyan-400 shrink-0">
                        {typeof Icon === 'function' && <Icon size={12} />}
                      </span>
                      <span className="text-slate-300 truncate">{act.text}</span>
                    </div>
                    <span className="text-slate-500 text-[9px] shrink-0">{act.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 4: QUICK ACTIONS */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/40 shadow-xl flex flex-col justify-between">
          <div>
            <div className="pb-2 border-b border-[#0055ff]/30 mb-2.5">
              <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                QUICK ACTIONS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono-code text-[11px]">
              {/* Button 1: Allocate Resources */}
              <button
                onClick={() => setShowAllocateModal(true)}
                className="p-2.5 rounded-xl bg-[#031533] hover:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-slate-200 hover:text-white flex flex-col items-center justify-center text-center gap-1.5 transition cursor-pointer shadow-sm group"
              >
                <Users className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="leading-tight">Allocate Resources</span>
              </button>

              {/* Button 2: Request Supply */}
              <button
                onClick={() => setShowSupplyModal(true)}
                className="p-2.5 rounded-xl bg-[#031533] hover:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-slate-200 hover:text-white flex flex-col items-center justify-center text-center gap-1.5 transition cursor-pointer shadow-sm group"
              >
                <Package className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="leading-tight">Request Supply</span>
              </button>

              {/* Button 3: Schedule Deployment */}
              <button
                onClick={() => setShowScheduleModal(true)}
                className="p-2.5 rounded-xl bg-[#031533] hover:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-slate-200 hover:text-white flex flex-col items-center justify-center text-center gap-1.5 transition cursor-pointer shadow-sm group"
              >
                <Calendar className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="leading-tight">Schedule Deployment</span>
              </button>

              {/* Button 4: View Inventory */}
              <button
                onClick={() => setShowInventoryModal(true)}
                className="p-2.5 rounded-xl bg-[#031533] hover:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-slate-200 hover:text-white flex flex-col items-center justify-center text-center gap-1.5 transition cursor-pointer shadow-sm group"
              >
                <Archive className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="leading-tight">View Inventory</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MODALS & POPUPS */}
      {/* ========================================================================= */}
      <AllocateResourcesModal
        isOpen={showAllocateModal}
        onClose={() => setShowAllocateModal(false)}
        onSuccess={triggerToast}
      />

      <RequestSupplyModal
        isOpen={showSupplyModal}
        onClose={() => setShowSupplyModal(false)}
        onSuccess={triggerToast}
      />

      <ScheduleDeploymentModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSuccess={triggerToast}
      />

      <ViewInventoryModal
        isOpen={showInventoryModal}
        onClose={() => setShowInventoryModal(false)}
        onSuccess={triggerToast}
      />

      {/* Generic Category Breakdown Modal for "View All" buttons */}
      {detailModalTitle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-tech">
          <div className="relative w-full max-w-xl bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.35)] p-5 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wider uppercase">{detailModalTitle}</h3>
                  <p className="text-[10px] font-mono-code text-cyan-400">BHARAT COMMAND NETWORK • COMPLETE AUDIT RECORD</p>
                </div>
              </div>
              <button
                onClick={() => setDetailModalTitle(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                ×
              </button>
            </div>

            <div className="mt-4 space-y-2 font-mono-code text-xs text-slate-300 max-h-72 overflow-y-auto pr-1">
              <div className="p-3 rounded-xl bg-[#031533] border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-sm">Active Field Strength</div>
                  <div className="text-[10px] text-slate-400">Total verified personnel ready for mobilization</div>
                </div>
                <div className="text-emerald-400 font-bold text-base">1,24,860</div>
              </div>
              <div className="p-3 rounded-xl bg-[#031533] border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-sm">Strategic Readiness Index</div>
                  <div className="text-[10px] text-slate-400">Across all 5 Indian Military Commands</div>
                </div>
                <div className="text-cyan-400 font-bold text-base">94.8%</div>
              </div>
              <div className="p-3 rounded-xl bg-[#031533] border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-sm">Forward Logistics Saturation</div>
                  <div className="text-[10px] text-slate-400">48 Supply Depots • 12 Forward Bases</div>
                </div>
                <div className="text-emerald-400 font-bold text-base">87%</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end mt-4">
              <button
                onClick={() => {
                  triggerToast(`Exported full audit log for ${detailModalTitle}`);
                  setDetailModalTitle(null);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono-code transition"
              >
                Export Audit Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
