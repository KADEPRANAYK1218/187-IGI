import React, { useState } from 'react';
import { 
  Crosshair, ArrowRight, ShieldCheck, CheckCircle2, 
  X, Activity, ChevronDown, ChevronUp, MapPin, Radio, 
  Wind, Clock, AlertTriangle, Users, Layers, Shield
} from 'lucide-react';

export interface MissionOverviewItem {
  id: string;
  name: string;
  code: string;
  sector: string;
  coordinates: string;
  commander: string;
  troops: string;
  assets: string;
  details: string;
  objective: string;
  weatherRisk: string;
  satLinkStatus: string;
  phases: { name: string; completed: boolean }[];
  progress: number;
  status: 'OPTIMAL' | 'PEAK READINESS' | 'ACTIVE PATROL' | 'STAGED READY' | 'OBJECTIVE MET' | 'WEATHER HOLD';
  badgeStyle: string;
  category: 'Active' | 'Pending' | 'Completed' | 'Delayed';
}

export const TACTICAL_MISSIONS_LIST: MissionOverviewItem[] = [
  {
    id: 'op-1',
    name: 'Operation Northern Shield',
    code: 'OP-NS-01',
    sector: 'Eastern Ladakh LAC',
    coordinates: '34°12\'N 78°22\'E • Depsang Plains',
    commander: 'Brig. V. S. Rathore, 14 Corps',
    troops: '340 Special Operations & Mechanized Troops',
    assets: '2x Su-30MKI CAP, 8x T-90 Bhishma Tanks, 4x Hermes 900 UAVs',
    details: '340 Deployed • 14 Corps & Su-30MKI • Progress: 84% • SatLink: Locked',
    objective: 'Maintain 24/7 electronic and physical surveillance over sensitive mountain choke points, counter cross-LAC incursions, and verify forward staging posts.',
    weatherRisk: '-28°C Frost, 35 kt wind, zero visibility on ridge crest. Thermal night-sights nominal.',
    satLinkStatus: 'GSAT-7A MilSat Locked • 256-bit Quantum Encrypted',
    phases: [
      { name: 'Forward Staging & Armored Enfilade', completed: true },
      { name: 'High-Altitude Sensor Grid Activation', completed: true },
      { name: 'Continuous Combat Air Patrol Coverage', completed: true },
      { name: 'Rotational Logistics Resupply Via ALH Dhruv', completed: false }
    ],
    progress: 84,
    status: 'OPTIMAL',
    badgeStyle: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50',
    category: 'Active'
  },
  {
    id: 'op-2',
    name: 'Operation Meghdoot Ridge Sentry',
    code: 'OP-MD-84',
    sector: 'Siachen Glacier Command',
    coordinates: '35°25\'N 77°06\'E • Saltoro Ridge (19,800 ft)',
    commander: 'Col. K. N. Chewang, Ladakh Scouts',
    troops: '180 High-Altitude Alpine Troops (HAWS Qualified)',
    assets: 'Cheetah Helicopter Air-Drop Flight, Sub-Zero Heated Bunkers, Ground Radar',
    details: '180 Deployed • Ladakh Scouts, HAWS • Altitude: 19,800 ft • Sub-Zero Pods',
    objective: 'Fortify strategic passes along Saltoro Ridge, monitor avalanche-prone corridors, and maintain uninterrupted forward artillery observation post telemetry.',
    weatherRisk: '-46°C Extreme Cryo Conditions, Crevasse hazard level high. Oxygen pods operational.',
    satLinkStatus: 'Laser Line-of-Sight & SatLink Relay Active (99.9%)',
    phases: [
      { name: 'Sub-Zero Habitat Pre-Heating & Oxygen Calibration', completed: true },
      { name: 'High-Altitude Pass Sonar & Seismic Sensor Insertion', completed: true },
      { name: 'Winter Defensive Perimeter Hardening', completed: true },
      { name: 'Deep Snow Crevasse Patrol sweeps', completed: false }
    ],
    progress: 92,
    status: 'PEAK READINESS',
    badgeStyle: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/50',
    category: 'Active'
  },
  {
    id: 'op-3',
    name: 'Operation Sagar Kavach',
    code: 'OP-SK-19',
    sector: 'Western Naval Command',
    coordinates: '18°55\'N 72°50\'E • Arabian Sea EEZ',
    commander: 'Commodore R. K. Nair, Western Fleet Flagship',
    troops: '420 Naval Personnel & MARCOS Detachments',
    assets: 'INS Vikrant Aircraft Carrier, 2x Kolkata-class Destroyers, 3x P-8I Neptune',
    details: '420 Deployed • INS Vikrant Battle Group • Sea State 2 • Sonar Net: 100%',
    objective: 'Anti-submarine surveillance sweep along international maritime border line, merchant lane safeguarding, and coastal acoustic tripwire verification.',
    weatherRisk: 'Sea State 2, 12 kt breeze, water temp 26°C. Excellent sonar propagation.',
    satLinkStatus: 'Rukmini (GSAT-7) Dedicated Naval Transponder Synced',
    phases: [
      { name: 'Surface Fleet Strike Group Deployment', completed: true },
      { name: 'Sub-Surface Sonobuoy Array Laying', completed: true },
      { name: 'P-8I Multi-Mission Maritime Patrol Sweeps', completed: false },
      { name: 'Coordinated Coastal Radar Net Integration', completed: true }
    ],
    progress: 78,
    status: 'ACTIVE PATROL',
    badgeStyle: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50',
    category: 'Active'
  },
  {
    id: 'op-4',
    name: 'Operation Garuda Sentry',
    code: 'OP-GS-22',
    sector: 'Pathankot - Jammu Forward Axis',
    commander: 'Air Commodore S. Malhotra, IAF Forward Base',
    coordinates: '32°16\'N 75°38\'E • Tactical Sector Alpha',
    troops: '160 Air Force Security & Counter-UAS Crew',
    assets: 'S-400 Triumf Battery, D-4 Counter-Drone Laser, 6x Mirage 2000 on QRA',
    details: '160 Deployed • Counter-Drone Directed Energy Unit • Staged for Deployment',
    objective: 'Interception of hostile low-RCS quadcopters, drone swarms, and electronic surveillance signals targeting airbases along the international border.',
    weatherRisk: 'Dense morning ground fog, visibility 400m. Thermal and RF spectrum tracking 100%.',
    satLinkStatus: 'IACCS (Integrated Air Command and Control System) Online',
    phases: [
      { name: 'Counter-Drone Directed Energy Pod Staging', completed: true },
      { name: 'RF Frequency Scanning & Jammer Calibration', completed: true },
      { name: 'QRA Pilot Scramble Drills & Readiness Validation', completed: false },
      { name: 'Full Operational Live Grid Engagement', completed: false }
    ],
    progress: 12,
    status: 'STAGED READY',
    badgeStyle: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/50',
    category: 'Pending'
  },
  {
    id: 'op-5',
    name: 'Operation Vijay Marg',
    code: 'OP-VM-99',
    sector: 'Zojila & Shinkun La Axis',
    commander: 'Chief Engineer Col. D. B. Rawat, BRO Sappers',
    coordinates: '34°17\'N 75°31\'E • High-Pass Mountain Tunnel',
    troops: '290 Combat Engineers & Heavy Equipment Operators',
    assets: 'Heavy Snow Cutters, Armored Earth Movers, Mobile Bridge Launchers',
    details: '290 Deployed • BRO & Bombay Sappers • All-Weather Heavy Armor Transit',
    objective: 'Clear winter avalanches, establish hardened tactical culverts, and guarantee continuous supply convoy transit for heavy armor brigades across the pass.',
    weatherRisk: 'Snow cleared, sub-zero road icing treated with chemical defrosters.',
    satLinkStatus: 'Convoy Satellite Beacon Relay Verified',
    phases: [
      { name: 'Avalanche Barrier Construction & Detonation', completed: true },
      { name: 'Heavy Armor Transit Road Bed Hardening', completed: true },
      { name: 'All-Weather Logistics Convoy Transit Test', completed: true },
      { name: 'Final Handover to Sector Logistics Command', completed: true }
    ],
    progress: 100,
    status: 'OBJECTIVE MET',
    badgeStyle: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/50',
    category: 'Completed'
  },
  {
    id: 'op-6',
    name: 'Operation Himgiri Alpine Recon',
    code: 'OP-HR-11',
    sector: 'Karakoram Pass North Ridge',
    commander: 'Maj. T. Norbu, Special Frontier Force',
    coordinates: '35°30\'N 77°49\'E • Northern Karakoram Glacier',
    troops: '95 Recon Commandos (High-Altitude Stealth)',
    assets: 'Micro UAV Swarm, Thermal Long-Range Scopes, Satellite Snow Scanners',
    details: '95 Deployed • Special Frontier Force • Temp: -42°C Blizzard • Standby Hold',
    objective: 'Long-range clandestine patrol to survey unmapped glacial spurs and verify enemy withdrawal compliance behind agreed buffer zones.',
    weatherRisk: 'SEVERE WARNING: -42°C Blizzard, 65 kt gale gusts. Patrol sheltered in reinforced ice caves awaiting weather window.',
    satLinkStatus: 'Intermittent Microwave uplink due to atmospheric whiteout; Emergency VLF pulse active',
    phases: [
      { name: 'Helicopter Alpine Insertion at 18,200 ft', completed: true },
      { name: 'Establish Advanced Glacial Survival Redoubt', completed: true },
      { name: 'Long-Range Stealth Observation Traverse', completed: false },
      { name: 'Target Coordinate Transmission to Army HQ', completed: false }
    ],
    progress: 35,
    status: 'WEATHER HOLD',
    badgeStyle: 'text-amber-400 bg-amber-950/80 border-amber-500/50',
    category: 'Delayed'
  }
];

export const MissionStatusWidget: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'ALL' | 'Active' | 'Pending' | 'Completed' | 'Delayed'>('ALL');
  const [expandedMissionId, setExpandedMissionId] = useState<string | null>('op-1');

  // Widget Circular Percentages matching exact design
  const missions = [
    { label: 'Active', value: 84, count: '3 Ops (124 Field)', color: '#10B981', category: 'Active' as const, subtext: 'Operational & Deployed' },
    { label: 'Pending', value: 12, count: '1 Op (18 Field)', color: '#06B6D4', category: 'Pending' as const, subtext: 'Staged for Deployment' },
    { label: 'Completed', value: 3, count: '1 Op (4 Field)', color: '#F59E0B', category: 'Completed' as const, subtext: 'Objectives Fulfilled' },
    { label: 'Delayed', value: 1, count: '1 Op (2 Field)', color: '#EF4444', category: 'Delayed' as const, subtext: 'Weather Hold' }
  ];

  // Count calculations for filter tabs
  const totalCount = TACTICAL_MISSIONS_LIST.length;
  const activeCount = TACTICAL_MISSIONS_LIST.filter(m => m.category === 'Active').length;
  const pendingCount = TACTICAL_MISSIONS_LIST.filter(m => m.category === 'Pending').length;
  const completedCount = TACTICAL_MISSIONS_LIST.filter(m => m.category === 'Completed').length;
  const delayedCount = TACTICAL_MISSIONS_LIST.filter(m => m.category === 'Delayed').length;

  const filteredMissions = activeCategoryFilter === 'ALL'
    ? TACTICAL_MISSIONS_LIST
    : TACTICAL_MISSIONS_LIST.filter(m => m.category === activeCategoryFilter);

  const openModal = (category: 'ALL' | 'Active' | 'Pending' | 'Completed' | 'Delayed' = 'ALL') => {
    setActiveCategoryFilter(category);
    // Expand the first mission of this category by default for clarity
    const firstMatch = category === 'ALL' 
      ? TACTICAL_MISSIONS_LIST[0] 
      : TACTICAL_MISSIONS_LIST.find(m => m.category === category);
    if (firstMatch) {
      setExpandedMissionId(firstMatch.id);
    }
    setShowModal(true);
  };

  const toggleMissionExpansion = (id: string) => {
    setExpandedMissionId(prev => (prev === id ? null : id));
  };

  return (
    <>
      <div 
        className="rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl transition-all cursor-pointer group hover:border-cyan-500/40"
        id="mission-status-widget"
        onClick={() => openModal('ALL')}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
              MISSION STATUS
            </h3>
          </div>

          {/* View All Button */}
          <button 
            type="button"
            id="mission-status-view-all-btn"
            onClick={(e) => {
              e.stopPropagation();
              openModal('ALL');
            }}
            className="text-xs font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Circular Percentage Rings */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {missions.map(m => {
            const radius = 22;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (m.value / 100) * circumference;

            return (
              <div
                key={m.label}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(m.category);
                }}
                className="flex flex-col items-center text-center cursor-pointer group/ring"
                title={`${m.label}: ${m.value}% (${m.count}) - Click to filter`}
              >
                <div className="relative w-14 h-14 flex items-center justify-center transition-transform group-hover/ring:scale-105">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                    {/* Background Track */}
                    <circle
                      cx="28"
                      cy="28"
                      r={radius}
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="3.5"
                    />
                    {/* Progress Arc */}
                    <circle
                      cx="28"
                      cy="28"
                      r={radius}
                      fill="none"
                      stroke={m.color}
                      strokeWidth="3.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>

                  {/* Center Percentage */}
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-tech font-bold text-white">
                    {m.value}%
                  </div>
                </div>

                {/* Label */}
                <span className="text-[10px] font-mono-code text-slate-300 mt-1 truncate max-w-full group-hover/ring:text-cyan-300">
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Operational Summary Pill Footer */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono-code text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>148 Total Operations • 124 Active</span>
          </span>
          <span className="text-cyan-400 text-[10px]">
            Click to Inspect
          </span>
        </div>
      </div>

      {/* ======================= DETAILED MODAL VIEW ======================= */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in"
          id="mission-status-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="max-w-3xl w-full bg-[#020b1c] border border-cyan-500/50 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 animate-fade-in max-h-[92vh] overflow-y-auto"
            id="mission-status-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shrink-0">
                  <Crosshair className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-tech font-bold text-white uppercase tracking-wider">
                    TACTICAL MISSION STATUS & OPERATIONS READINESS
                  </h3>
                  <p className="text-[10px] sm:text-xs font-mono-code text-cyan-400">
                    REAL-TIME THEATER COMMAND GRID • 148 ACTIVE DEPLOYMENTS • ENCRYPTED TELEMETRY
                  </p>
                </div>
              </div>
              <button 
                type="button"
                id="close-mission-modal-btn"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono-code px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer flex items-center gap-1 shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>

            {/* Top 4 KPI Cards - Clicking Filters Immediately with Active Glow */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Card 1: Active */}
              <div 
                onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Active' ? 'ALL' : 'Active')}
                className={`p-2.5 rounded-xl border text-center cursor-pointer transition relative ${
                  activeCategoryFilter === 'Active' 
                    ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-950/50' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center justify-center gap-1">
                  <span>Active Missions</span>
                  {activeCategoryFilter === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
                </div>
                <div className="text-xl font-tech font-bold text-emerald-400 mt-0.5">84%</div>
                <div className="text-[9.5px] font-mono-code text-emerald-300">124 Operational</div>
              </div>

              {/* Card 2: Pending */}
              <div 
                onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Pending' ? 'ALL' : 'Pending')}
                className={`p-2.5 rounded-xl border text-center cursor-pointer transition relative ${
                  activeCategoryFilter === 'Pending' 
                    ? 'bg-cyan-950/70 border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-950/50' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center justify-center gap-1">
                  <span>Pending Staging</span>
                  {activeCategoryFilter === 'Pending' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                </div>
                <div className="text-xl font-tech font-bold text-cyan-400 mt-0.5">12%</div>
                <div className="text-[9.5px] font-mono-code text-cyan-300">18 Pre-Deployment</div>
              </div>

              {/* Card 3: Completed */}
              <div 
                onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Completed' ? 'ALL' : 'Completed')}
                className={`p-2.5 rounded-xl border text-center cursor-pointer transition relative ${
                  activeCategoryFilter === 'Completed' 
                    ? 'bg-amber-950/70 border-amber-400 ring-2 ring-amber-500/40 shadow-lg shadow-amber-950/50' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center justify-center gap-1">
                  <span>Completed Ops</span>
                  {activeCategoryFilter === 'Completed' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                </div>
                <div className="text-xl font-tech font-bold text-amber-400 mt-0.5">3%</div>
                <div className="text-[9.5px] font-mono-code text-amber-300">4 Objectives Met</div>
              </div>

              {/* Card 4: Delayed */}
              <div 
                onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Delayed' ? 'ALL' : 'Delayed')}
                className={`p-2.5 rounded-xl border text-center cursor-pointer transition relative ${
                  activeCategoryFilter === 'Delayed' 
                    ? 'bg-red-950/70 border-red-400 ring-2 ring-red-500/40 shadow-lg shadow-red-950/50' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-red-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center justify-center gap-1">
                  <span>Delayed / Hold</span>
                  {activeCategoryFilter === 'Delayed' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />}
                </div>
                <div className="text-xl font-tech font-bold text-red-400 mt-0.5">1%</div>
                <div className="text-[9.5px] font-mono-code text-red-300">2 Weather Standby</div>
              </div>
            </div>

            {/* Filter Pills / Tabs for High-Clarity Filtering */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-mono-code text-slate-400 mr-1 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>FILTER STATUS:</span>
                </span>
                
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('ALL')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    activeCategoryFilter === 'ALL'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>ALL</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${activeCategoryFilter === 'ALL' ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                    {totalCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('Active')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    activeCategoryFilter === 'Active'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>ACTIVE</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${activeCategoryFilter === 'Active' ? 'bg-slate-950 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                    {activeCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('Pending')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    activeCategoryFilter === 'Pending'
                      ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>PENDING</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${activeCategoryFilter === 'Pending' ? 'bg-slate-950 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    {pendingCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('Completed')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    activeCategoryFilter === 'Completed'
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>COMPLETED</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${activeCategoryFilter === 'Completed' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                    {completedCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('Delayed')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    activeCategoryFilter === 'Delayed'
                      ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>DELAYED</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${activeCategoryFilter === 'Delayed' ? 'bg-slate-950 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                    {delayedCount}
                  </span>
                </button>
              </div>

              <div className="text-[11px] font-mono-code text-cyan-400">
                Click any mission to inspect full telemetry & directives
              </div>
            </div>

            {/* Strategic Breakdown List with Clear Click-to-Expand Details */}
            <div className="space-y-2">
              <div className="text-xs font-mono-code font-bold text-cyan-300 uppercase tracking-wider flex items-center justify-between">
                <span>DEPLOYED OPERATIONS STRATEGIC BREAKDOWN ({filteredMissions.length} DISPLAYED)</span>
                {activeCategoryFilter !== 'ALL' && (
                  <button
                    type="button"
                    onClick={() => setActiveCategoryFilter('ALL')}
                    className="text-[10.5px] font-mono-code text-cyan-400 hover:underline cursor-pointer"
                  >
                    Reset Filter to All ({totalCount})
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {filteredMissions.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 font-mono-code text-xs bg-slate-900/50 rounded-xl border border-slate-800">
                    No operations matching status filter "{activeCategoryFilter}".
                  </div>
                ) : (
                  filteredMissions.map((op) => {
                    const isExpanded = expandedMissionId === op.id;

                    return (
                      <div 
                        key={op.id} 
                        className={`rounded-xl border transition-all ${
                          isExpanded 
                            ? 'bg-[#031533]/90 border-cyan-500/60 shadow-lg shadow-cyan-950/40' 
                            : 'bg-[#031533]/50 border-slate-800/80 hover:border-cyan-500/30 hover:bg-[#031533]/70'
                        }`}
                      >
                        {/* Clickable Header Row */}
                        <div
                          onClick={() => toggleMissionExpansion(op.id)}
                          className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer select-none"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-white font-tech font-bold text-sm">
                                {op.name}
                              </span>
                              <span className="text-[11px] font-mono-code text-cyan-400 font-normal">
                                ({op.sector})
                              </span>
                              <span className="text-[10px] font-mono-code text-slate-400 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">
                                {op.code}
                              </span>
                            </div>

                            {/* Summary Details */}
                            <div className="text-[11px] font-mono-code text-slate-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span>{op.troops}</span>
                              <span>• Progress: <strong className="text-emerald-300">{op.progress}%</strong></span>
                              <span>• SatLink: <strong className="text-cyan-300">Locked</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-mono-code font-bold ${op.badgeStyle}`}>
                              {op.status}
                            </span>
                            <div className="p-1 rounded-lg bg-slate-800/80 text-cyan-400 hover:text-white transition">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                          </div>
                        </div>

                        {/* CLEAR IN-DEPTH EXPANDED MISSION DOSSIER */}
                        {isExpanded && (
                          <div className="px-3.5 pb-4 pt-2 border-t border-cyan-500/25 space-y-3.5 bg-slate-950/60 rounded-b-xl animate-fade-in text-xs font-mono-code">
                            
                            {/* Mission Objective */}
                            <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30">
                              <div className="text-[10px] font-bold text-cyan-400 uppercase flex items-center gap-1.5 mb-1">
                                <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                                <span>PRIMARY MISSION OBJECTIVE & DIRECTIVE</span>
                              </div>
                              <p className="text-slate-200 text-xs leading-relaxed">
                                {op.objective}
                              </p>
                            </div>

                            {/* Tactical Grid: Coordinates, Commander, Assets, Weather */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {/* Left Col */}
                              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
                                <div className="text-[10.5px] text-slate-400 flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>Coordinates:</span>
                                  <strong className="text-white ml-auto">{op.coordinates}</strong>
                                </div>
                                <div className="text-[10.5px] text-slate-400 flex items-center gap-1.5">
                                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Command Officer:</span>
                                  <strong className="text-white ml-auto">{op.commander}</strong>
                                </div>
                                <div className="text-[10.5px] text-slate-400 flex items-center gap-1.5">
                                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>Comms Datalink:</span>
                                  <strong className="text-cyan-300 ml-auto">{op.satLinkStatus}</strong>
                                </div>
                              </div>

                              {/* Right Col */}
                              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
                                <div className="text-[10.5px] text-slate-400 flex items-center gap-1.5">
                                  <Users className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Deployed Assets:</span>
                                  <strong className="text-white ml-auto text-right truncate max-w-[200px]" title={op.assets}>
                                    {op.assets}
                                  </strong>
                                </div>
                                <div className="text-[10.5px] text-slate-400 flex items-start gap-1.5">
                                  <Wind className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                                  <span>Weather & Hazard:</span>
                                  <span className="text-amber-300 ml-auto text-right text-[10px] leading-tight max-w-[220px]">
                                    {op.weatherRisk}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Phase Progress Checklist & Visual Bar */}
                            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>OPERATIONAL PHASE CHECKLIST</span>
                                </span>
                                <span className="font-bold text-emerald-400">
                                  {op.progress}% Completion
                                </span>
                              </div>

                              {/* Visual Progress Bar */}
                              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500" 
                                  style={{ width: `${op.progress}%` }} 
                                />
                              </div>

                              {/* Phases items */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                                {op.phases.map((phase, i) => (
                                  <div 
                                    key={i} 
                                    className={`flex items-center gap-2 p-1.5 rounded text-[11px] ${
                                      phase.completed 
                                        ? 'bg-emerald-950/40 text-emerald-200 border border-emerald-500/30' 
                                        : 'bg-slate-800/40 text-slate-400 border border-slate-700/50'
                                    }`}
                                  >
                                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${phase.completed ? 'text-emerald-400' : 'text-slate-500'}`} />
                                    <span className="truncate">{phase.name}</span>
                                    <span className="ml-auto text-[9.5px] font-bold">
                                      {phase.completed ? 'COMPLETED' : 'PENDING'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20 text-xs font-mono-code text-slate-400 flex-wrap gap-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Encrypted Defense SatLink Grid: 100% Synced</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-tech font-bold text-xs cursor-pointer transition shadow-md"
                >
                  Acknowledge Missions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
