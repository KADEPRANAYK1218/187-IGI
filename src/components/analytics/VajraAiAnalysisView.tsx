import React, { useState } from 'react';
import { 
  Brain, Target, Network, FileText, Cpu, AlertTriangle, 
  Shield, CheckCircle2, ChevronRight, Eye, Camera, 
  Radio, Zap, Crosshair, ArrowUp, Activity, Lock,
  Globe, AlertCircle, TrendingUp, Filter
} from 'lucide-react';
import droneJkImg from '../../assets/images/drone_surveillance_jk_1788709366761.jpg';
import thermalPunjabImg from '../../assets/images/thermal_flir_punjab_1788709390279.jpg';
import satelliteSector4Img from '../../assets/images/satellite_recon_vehicle_1788709405351.jpg';
import indiaNeuralMap from '../../assets/images/india_neural_cyber_map_1788703459745.jpg';

export const VajraAiAnalysisView: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<string>('Cross Border Infiltration');
  const [selectedFeed, setSelectedFeed] = useState<string>('DRONE_1');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col space-y-3.5 select-none text-slate-100 font-tech" id="vajra-ai-analysis-view">
      {/* 1. HEADER BANNER & 5 KPI CARDS ROW */}
      <div className="flex flex-col space-y-3">
        {/* Header Title Banner */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Brain className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-wide text-white flex items-center gap-3">
              <span>AI ANALYSIS</span>
            </h1>
            <div className="text-[11px] font-mono-code font-bold tracking-[0.25em] text-cyan-400 uppercase">
              PREDICT • ANALYZE • RECOMMEND
            </div>
          </div>
        </div>

        {/* 5 KPI Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
          {/* Card 1: TOTAL ANALYSES */}
          <div className="relative rounded-2xl p-3.5 bg-[#030d22]/95 border border-[#0055ff]/40 shadow-lg shadow-black/40 flex items-center gap-3.5 group hover:border-[#0088ff] transition">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              <Brain className="w-6 h-6 text-cyan-300" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono-code font-bold tracking-wider text-slate-400 uppercase">
                TOTAL ANALYSES
              </div>
              <div className="text-2xl font-tech font-bold text-white tracking-tight mt-0.5">
                1,248
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono-code font-semibold mt-0.5">
                <span className="text-emerald-400 font-bold">▲ 12%</span>
                <span className="text-slate-400 text-[9.5px]">vs. previous 24h</span>
              </div>
            </div>
          </div>

          {/* Card 2: THREAT PREDICTIONS */}
          <div className="relative rounded-2xl p-3.5 bg-[#030d22]/95 border border-[#0055ff]/40 shadow-lg shadow-black/40 flex items-center gap-3.5 group hover:border-[#0088ff] transition">
            <div className="w-12 h-12 rounded-xl bg-[#02182b] border border-cyan-400/50 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              {/* Concentric circle radar target */}
              <div className="w-8 h-8 rounded-full border-2 border-cyan-400/80 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-cyan-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono-code font-bold tracking-wider text-slate-400 uppercase">
                THREAT PREDICTIONS
              </div>
              <div className="text-2xl font-tech font-bold text-white tracking-tight mt-0.5">
                86
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono-code font-semibold mt-0.5">
                <span className="text-emerald-400 font-bold">▲ 18%</span>
                <span className="text-slate-400 text-[9.5px]">vs. previous 24h</span>
              </div>
            </div>
          </div>

          {/* Card 3: PATTERNS IDENTIFIED */}
          <div className="relative rounded-2xl p-3.5 bg-[#030d22]/95 border border-[#0055ff]/40 shadow-lg shadow-black/40 flex items-center gap-3.5 group hover:border-[#0088ff] transition">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              <Network className="w-6 h-6 text-cyan-300" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono-code font-bold tracking-wider text-slate-400 uppercase">
                PATTERNS IDENTIFIED
              </div>
              <div className="text-2xl font-tech font-bold text-white tracking-tight mt-0.5">
                34
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono-code font-semibold mt-0.5">
                <span className="text-emerald-400 font-bold">▲ 22%</span>
                <span className="text-slate-400 text-[9.5px]">vs. previous 24h</span>
              </div>
            </div>
          </div>

          {/* Card 4: AI MODELS ACTIVE */}
          <div className="relative rounded-2xl p-3.5 bg-[#030d22]/95 border border-[#0055ff]/40 shadow-lg shadow-black/40 flex items-center gap-3.5 group hover:border-[#0088ff] transition">
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.25)]">
              <FileText className="w-6 h-6 text-blue-300" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono-code font-bold tracking-wider text-slate-400 uppercase">
                AI MODELS ACTIVE
              </div>
              <div className="text-2xl font-tech font-bold text-white tracking-tight mt-0.5">
                7
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono-code font-semibold mt-0.5">
                <span className="text-emerald-400 font-bold">▲ 0%</span>
                <span className="text-slate-400 text-[9.5px]">vs. previous 24h</span>
              </div>
            </div>
          </div>

          {/* Card 5: ANALYSIS CONFIDENCE */}
          <div className="relative rounded-2xl p-3.5 bg-[#030d22]/95 border border-[#0055ff]/40 shadow-lg shadow-black/40 flex items-center gap-3.5 group hover:border-[#0088ff] transition">
            {/* Donut ring */}
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="19" fill="none" stroke="#1e293b" strokeWidth="4.5" />
                <circle
                  cx="24"
                  cy="24"
                  r="19"
                  fill="none"
                  stroke="#00e676"
                  strokeWidth="4.5"
                  strokeDasharray={119.38}
                  strokeDashoffset={119.38 * (1 - 0.92)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-xs font-tech font-bold text-white">92%</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono-code font-bold tracking-wider text-slate-400 uppercase">
                ANALYSIS CONFIDENCE
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono-code font-bold text-emerald-400">
                  High Confidence
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE SECTION: 2 COLUMNS (AI THREAT PREDICTION MAP + AI VIDEO & IMAGE ANALYSIS + INSIGHTS/TREND) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 w-full">
        {/* LEFT COLUMN: AI THREAT PREDICTION MAP (7 Cols on large screens for commanding map scale) */}
        <div className="lg:col-span-7 xl:col-span-7 rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/45 shadow-xl flex flex-col justify-between">
          {/* Top Title & Live Badge */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#0055ff]/30 mb-2.5">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                AI THREAT PREDICTION MAP
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-[10px] font-mono-code font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE</span>
            </div>
          </div>

          {/* UPDATED DEDICATED THREAT LEVEL LEGEND BAR */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 mb-2.5 rounded-xl bg-[#021129]/90 border border-[#0055ff]/35 text-[10.5px] font-mono-code shadow-md">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold uppercase text-[10px] tracking-wider">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>THREAT LEVEL LEGEND:</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              {/* Critical */}
              <div
                onClick={() => setSelectedThreat('Cross Border Infiltration')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                  selectedThreat === 'Cross Border Infiltration'
                    ? 'bg-red-950/85 border-red-500 text-red-300 ring-1 ring-red-500/60 shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                    : 'bg-red-950/40 border-red-500/50 text-red-400 hover:bg-red-900/50'
                }`}
                title="Critical Threat (>80%) - Cross Border Infiltration"
              >
                <span className="text-red-500 font-bold text-xs leading-none">▲</span>
                <span className="font-bold">Critical</span>
                <span className="text-red-300/80 text-[9.5px] font-mono-code font-bold">(&gt;80%)</span>
              </div>
              {/* High */}
              <div
                onClick={() => setSelectedThreat('Drone Swarm Attack')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                  selectedThreat === 'Drone Swarm Attack'
                    ? 'bg-orange-950/85 border-orange-500 text-orange-300 ring-1 ring-orange-500/60 shadow-[0_0_8px_rgba(249,115,22,0.4)]'
                    : 'bg-orange-950/40 border-orange-500/50 text-orange-400 hover:bg-orange-900/50'
                }`}
                title="High Threat (70-80%) - Drone Swarm Attack"
              >
                <span className="w-2.5 h-2.5 rounded-xs bg-orange-500 shadow-[0_0_6px_#f97316]" />
                <span className="font-bold">High</span>
                <span className="text-orange-300/80 text-[9.5px] font-mono-code font-bold">(70-80%)</span>
              </div>
              {/* Medium */}
              <div
                onClick={() => setSelectedThreat('Cyber Intrusion Attempt')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                  selectedThreat === 'Cyber Intrusion Attempt' || selectedThreat === 'IED / Suicide Attack'
                    ? 'bg-amber-950/85 border-amber-500 text-amber-300 ring-1 ring-amber-500/60 shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                    : 'bg-amber-950/40 border-amber-500/50 text-amber-400 hover:bg-amber-900/50'
                }`}
                title="Medium Threat (50-70%) - Cyber & IED"
              >
                <span className="text-yellow-400 font-bold text-xs leading-none">⚠</span>
                <span className="font-bold">Medium</span>
                <span className="text-amber-300/80 text-[9.5px] font-mono-code font-bold">(50-70%)</span>
              </div>
              {/* Low */}
              <div
                onClick={() => setSelectedThreat('Naval Movement')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                  selectedThreat === 'Naval Movement'
                    ? 'bg-cyan-950/85 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                    : 'bg-cyan-950/40 border-cyan-500/50 text-cyan-400 hover:bg-cyan-900/50'
                }`}
                title="Low Threat (<50%) - Naval Movement"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                <span className="font-bold">Low</span>
                <span className="text-cyan-300/80 text-[9.5px] font-mono-code font-bold">(&lt;50%)</span>
              </div>
            </div>
          </div>

          {/* Map Layout: Enlarged Interactive Tactical Cyber Map + Top Predicted Threats */}
          <div className="relative flex-1 flex flex-col md:flex-row gap-3 items-stretch min-h-[480px] lg:min-h-[530px]">
            {/* Tactical India Neural Cyber Map with AI Heatmap Contours */}
            <div className="relative flex-1 w-full min-h-[460px] lg:h-[530px] flex items-center justify-center overflow-hidden rounded-xl bg-slate-950/80 border border-cyan-500/30 p-2 shadow-inner">
              {/* Tactical Background Grid */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.18) 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Tactical Concentric Radar Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                <div className="w-[420px] h-[420px] rounded-full border border-cyan-400/40 animate-spin duration-[24s]" />
                <div className="w-[260px] h-[260px] rounded-full border border-cyan-500/30 border-dashed" />
                <div className="w-[120px] h-[120px] rounded-full border border-cyan-500/20" />
              </div>

              {/* Bottom Left Scale & Compass Rose */}
              <div className="absolute left-3 bottom-3 flex items-center gap-2 text-[9px] font-mono-code text-cyan-300/80 pointer-events-none bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-cyan-500/30 shadow-md">
                <span className="font-bold text-amber-400">N ▲</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300">0 - 500 - 1,000 km</span>
                <span className="text-slate-500">|</span>
                <span className="text-emerald-400 font-bold">142 BORDER NODES ACTIVE</span>
              </div>

              {/* Enlarged India Cyber Map Container */}
              <div className="relative w-full h-full max-w-[580px] max-h-[510px] flex items-center justify-center">
                <img
                  src={indiaNeuralMap}
                  alt="AI Threat Prediction Map - Bharat"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_32px_rgba(6,182,212,0.5)] select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* Heatmap Threat Zones Overlay on the Map */}
                {/* 1. Sector 7 / J&K LoC (Cross Border Infiltration - 87% Critical) */}
                <div
                  onClick={() => setSelectedThreat('Cross Border Infiltration')}
                  style={{ top: '18%', left: '42%' }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group transition-transform ${
                    selectedThreat === 'Cross Border Infiltration' ? 'scale-125' : 'hover:scale-115'
                  }`}
                  title="Cross Border Infiltration - 87% (Critical)"
                >
                  <div className="absolute -inset-3.5 rounded-full bg-red-500/35 blur-md animate-pulse pointer-events-none" />
                  <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-red-200 flex items-center justify-center shadow-[0_0_16px_#ef4444]">
                    <span className="text-[10px] text-white font-bold leading-none">▲</span>
                  </div>
                  <div className={`absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded border text-[9.5px] font-mono-code font-bold pointer-events-none shadow-lg transition-all ${
                    selectedThreat === 'Cross Border Infiltration'
                      ? 'bg-slate-950 border-red-400 text-red-300 ring-2 ring-red-500/50 scale-105'
                      : 'bg-slate-950/90 border-red-500/70 text-red-300'
                  }`}>
                    J&K (87%)
                  </div>
                </div>

                {/* 2. Punjab / Border Sector (Drone Swarm Attack - 76% High) */}
                <div
                  onClick={() => setSelectedThreat('Drone Swarm Attack')}
                  style={{ top: '28%', left: '39%' }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group transition-transform ${
                    selectedThreat === 'Drone Swarm Attack' ? 'scale-125' : 'hover:scale-115'
                  }`}
                  title="Drone Swarm Attack - 76% (High)"
                >
                  <div className="absolute -inset-3 rounded-full bg-orange-500/30 blur-sm pointer-events-none" />
                  <div className="w-5 h-5 rounded-full bg-orange-500 border border-orange-200 flex items-center justify-center shadow-[0_0_12px_#f97316]">
                    <span className="text-[8px] text-white font-bold leading-none">▲</span>
                  </div>
                  <div className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded border text-[9.5px] font-mono-code font-bold pointer-events-none shadow-lg transition-all ${
                    selectedThreat === 'Drone Swarm Attack'
                      ? 'bg-slate-950 border-orange-400 text-orange-300 ring-2 ring-orange-500/50 scale-105'
                      : 'bg-slate-950/90 border-orange-500/70 text-orange-300'
                  }`}>
                    Punjab (76%)
                  </div>
                </div>

                {/* 3. Delhi HQ (Cyber Intrusion Attempt - 63% Medium) */}
                <div
                  onClick={() => setSelectedThreat('Cyber Intrusion Attempt')}
                  style={{ top: '34%', left: '44%' }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group transition-transform ${
                    selectedThreat === 'Cyber Intrusion Attempt' ? 'scale-125' : 'hover:scale-115'
                  }`}
                  title="Cyber Intrusion Attempt - 63% (Medium)"
                >
                  <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-100 flex items-center justify-center shadow-[0_0_10px_#f59e0b]">
                    <span className="text-[8px] text-black font-black leading-none">⚠</span>
                  </div>
                  <div className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded border text-[9px] font-mono-code font-bold pointer-events-none shadow-lg transition-all ${
                    selectedThreat === 'Cyber Intrusion Attempt'
                      ? 'bg-slate-950 border-amber-400 text-amber-300 ring-2 ring-amber-500/50 scale-105'
                      : 'bg-slate-950/90 border-amber-500/70 text-amber-300'
                  }`}>
                    Delhi (63%)
                  </div>
                </div>

                {/* 4. Jammu Highway (IED / Suicide Attack - 58% Medium) */}
                <div
                  onClick={() => setSelectedThreat('IED / Suicide Attack')}
                  style={{ top: '22%', left: '41%' }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group transition-transform ${
                    selectedThreat === 'IED / Suicide Attack' ? 'scale-125' : 'hover:scale-115'
                  }`}
                  title="IED / Suicide Attack - 58% (Medium)"
                >
                  <div className="w-4 h-4 rounded-full bg-yellow-400 border border-yellow-100 flex items-center justify-center shadow-[0_0_10px_#eab308]">
                    <span className="text-[7.5px] text-black font-black leading-none">⚠</span>
                  </div>
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded border text-[8.5px] font-mono-code font-bold pointer-events-none shadow-md ${
                    selectedThreat === 'IED / Suicide Attack'
                      ? 'bg-slate-950 border-yellow-400 text-yellow-300'
                      : 'bg-slate-950/90 border-yellow-500/70 text-yellow-300'
                  }`}>
                    Jammu (58%)
                  </div>
                </div>

                {/* 5. Rajasthan Western Desert */}
                <div
                  style={{ top: '38%', left: '34%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-400/80 border border-cyan-200 flex items-center justify-center shadow-[0_0_10px_#22d3ee]">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* 6. Eastern Sector / Arunachal / Sikkim */}
                <div
                  style={{ top: '38%', left: '80%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
                >
                  <div className="w-4.5 h-4.5 rounded-full bg-red-500/80 border border-red-200 flex items-center justify-center shadow-[0_0_12px_#ef4444]">
                    <span className="text-[8px] text-white font-bold leading-none">▲</span>
                  </div>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/90 border border-red-500/70 text-[9px] font-mono-code font-bold text-red-300 shadow-md">
                    Eastern Sector
                  </div>
                </div>

                {/* 7. Coastal & Southern Sensor Nodes */}
                <div style={{ top: '60%', left: '39%' }} className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                </div>
                <div style={{ top: '78%', left: '44%' }} className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                </div>
              </div>
            </div>

            {/* TOP PREDICTED THREATS Right Sub-panel */}
            <div className="w-full md:w-56 flex flex-col justify-between shrink-0 bg-[#021129]/85 rounded-xl p-3 border border-[#0055ff]/35 shadow-lg">
              <div>
                <div className="text-[10px] font-mono-code font-bold text-cyan-300 tracking-wider uppercase mb-2.5 flex items-center justify-between">
                  <span>TOP PREDICTED THREATS</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                    5 TOTAL
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {/* 1. Cross Border Infiltration */}
                  <div 
                    onClick={() => setSelectedThreat('Cross Border Infiltration')}
                    className={`p-2 rounded-lg border transition cursor-pointer ${
                      selectedThreat === 'Cross Border Infiltration'
                        ? 'bg-red-950/60 border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.25)]'
                        : 'bg-[#031533]/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-tech font-bold text-white text-[11px]">
                      <span className="truncate">Cross Border Infiltration</span>
                      <span className="text-red-400 font-mono-code font-black">87%</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono-code text-red-400 mt-1">
                      <span className="flex items-center gap-1">
                        <span className="text-xs">▲</span>
                        <span>Critical</span>
                      </span>
                      <span className="text-slate-400 text-[9px]">Sector 7 LoC</span>
                    </div>
                  </div>

                  {/* 2. Drone Swarm Attack */}
                  <div 
                    onClick={() => setSelectedThreat('Drone Swarm Attack')}
                    className={`p-2 rounded-lg border transition cursor-pointer ${
                      selectedThreat === 'Drone Swarm Attack'
                        ? 'bg-orange-950/60 border-orange-500/80 shadow-[0_0_10px_rgba(249,115,22,0.25)]'
                        : 'bg-[#031533]/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-tech font-bold text-white text-[11px]">
                      <span className="truncate">Drone Swarm Attack</span>
                      <span className="text-orange-400 font-mono-code font-black">76%</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono-code text-orange-400 mt-1">
                      <span className="flex items-center gap-1">
                        <span className="text-xs">▲</span>
                        <span>High</span>
                      </span>
                      <span className="text-slate-400 text-[9px]">Punjab Sector</span>
                    </div>
                  </div>

                  {/* 3. Cyber Intrusion Attempt */}
                  <div 
                    onClick={() => setSelectedThreat('Cyber Intrusion Attempt')}
                    className={`p-2 rounded-lg border transition cursor-pointer ${
                      selectedThreat === 'Cyber Intrusion Attempt'
                        ? 'bg-amber-950/60 border-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                        : 'bg-[#031533]/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-tech font-bold text-white text-[11px]">
                      <span className="truncate">Cyber Intrusion Attempt</span>
                      <span className="text-amber-400 font-mono-code font-black">63%</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono-code text-amber-400 mt-1">
                      <span className="flex items-center gap-1">
                        <span>⚠</span>
                        <span>Medium</span>
                      </span>
                      <span className="text-slate-400 text-[9px]">Delhi Grid</span>
                    </div>
                  </div>

                  {/* 4. IED / Suicide Attack */}
                  <div 
                    onClick={() => setSelectedThreat('IED / Suicide Attack')}
                    className={`p-2 rounded-lg border transition cursor-pointer ${
                      selectedThreat === 'IED / Suicide Attack'
                        ? 'bg-amber-950/60 border-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                        : 'bg-[#031533]/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-tech font-bold text-white text-[11px]">
                      <span className="truncate">IED / Suicide Attack</span>
                      <span className="text-amber-400 font-mono-code font-black">58%</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono-code text-amber-400 mt-1">
                      <span className="flex items-center gap-1">
                        <span>⚠</span>
                        <span>Medium</span>
                      </span>
                      <span className="text-slate-400 text-[9px]">NH-44 Corridor</span>
                    </div>
                  </div>

                  {/* 5. Naval Movement */}
                  <div 
                    onClick={() => setSelectedThreat('Naval Movement')}
                    className={`p-2 rounded-lg border transition cursor-pointer ${
                      selectedThreat === 'Naval Movement'
                        ? 'bg-cyan-950/60 border-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.25)]'
                        : 'bg-[#031533]/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-tech font-bold text-white text-[11px]">
                      <span className="truncate">Naval Movement</span>
                      <span className="text-cyan-400 font-mono-code font-black">34%</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono-code text-cyan-400 mt-1">
                      <span className="flex items-center gap-1">
                        <span>●</span>
                        <span>Low</span>
                      </span>
                      <span className="text-slate-400 text-[9px]">Arabian Sea</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => setActiveModal('detailed_analysis')}
                className="mt-3 w-full py-2 px-3 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-[11px] font-tech font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
              >
                <span>View Detailed Analysis</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI VIDEO & IMAGE ANALYSIS + INSIGHTS & TREND (5 Cols on large screens) */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col space-y-3.5">
          {/* Top Half: AI VIDEO & IMAGE ANALYSIS (3 Feeds) */}
          <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/45 shadow-xl">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#0055ff]/30 mb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                  AI VIDEO & IMAGE ANALYSIS
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-[10px] font-mono-code font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>LIVE</span>
              </div>
            </div>

            {/* 3 Live Feed Windows */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Feed 1: Drone Detected - Sector 7 (J&K) */}
              <div 
                onClick={() => setSelectedFeed('DRONE_1')}
                className={`relative rounded-xl overflow-hidden border transition cursor-pointer flex flex-col bg-[#020b1c] ${
                  selectedFeed === 'DRONE_1' ? 'border-[#00ffff] shadow-[0_0_14px_rgba(0,255,255,0.35)]' : 'border-[#0055ff]/40 hover:border-cyan-500/60'
                }`}
              >
                {/* Visual Imagery Canvas */}
                <div className="relative h-32 sm:h-36 bg-[#0a141d] overflow-hidden group">
                  <img
                    src={droneJkImg}
                    alt="Drone Detected - Sector 7 (J&K)"
                    className="w-full h-full object-cover brightness-[0.92] contrast-[1.12] transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Scanline CRT Texture */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

                  {/* Tactical Target Bounding Boxes matching military reconnaissance HUD */}
                  {/* Target 1 (Left Drone/Vehicle) */}
                  <div className="absolute top-[32%] left-[8%] w-[18%] h-[24%] border-2 border-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.7)] flex flex-col justify-between p-0.5">
                    <span className="text-[7px] font-mono-code font-black text-red-300 leading-none bg-black/60 px-0.5 self-start">TGT-1</span>
                  </div>

                  {/* Target 2 (Center-Top Personnel) */}
                  <div className="absolute top-[12%] left-[42%] w-[12%] h-[32%] border-2 border-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.7)] flex flex-col justify-between p-0.5">
                    <span className="text-[7px] font-mono-code font-black text-red-300 leading-none bg-black/60 px-0.5 self-start">94%</span>
                  </div>

                  {/* Target 3 (Center-Mid Personnel) */}
                  <div className="absolute top-[40%] left-[38%] w-[13%] h-[34%] border-2 border-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.7)] flex flex-col justify-between p-0.5">
                    <span className="text-[7px] font-mono-code font-black text-red-300 leading-none bg-black/60 px-0.5 self-start">91%</span>
                  </div>

                  {/* Target 4 (Right-Mid Personnel) */}
                  <div className="absolute top-[28%] left-[58%] w-[12%] h-[32%] border-2 border-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.7)] flex flex-col justify-between p-0.5">
                    <span className="text-[7px] font-mono-code font-black text-red-300 leading-none bg-black/60 px-0.5 self-start">89%</span>
                  </div>

                  {/* Target 5 (Far Right Personnel) */}
                  <div className="absolute top-[26%] left-[73%] w-[12%] h-[32%] border-2 border-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.7)] flex flex-col justify-between p-0.5">
                    <span className="text-[7px] font-mono-code font-black text-red-300 leading-none bg-black/60 px-0.5 self-start">92%</span>
                  </div>

                  {/* Top-Left Feed Label & Telemetry */}
                  <div className="absolute top-1.5 left-2 flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-black/75 border border-cyan-500/40 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[8px] font-mono-code font-bold tracking-wider text-cyan-300">
                      DRN-07 • 1080P
                    </span>
                  </div>

                  {/* Crosshair corners */}
                  <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-cyan-400/80" />
                  <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-cyan-400/80" />
                </div>

                {/* Subtitle Details */}
                <div className="p-2.5 bg-[#020d20] flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-tech font-bold text-white tracking-wide truncate">
                      Drone Detected - Sector 7 (J&K)
                    </div>
                    <div className="text-[9.5px] font-mono-code text-slate-400 mt-0.5">
                      21:43:12
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/80">
                    <span className="px-2 py-0.5 rounded border border-red-500/80 bg-red-950/80 text-red-400 font-mono-code font-bold text-[9px] tracking-wider leading-none">
                      HIGH
                    </span>
                    <span className="text-[10px] font-mono-code font-bold text-cyan-300">
                      AI CONFIDENCE <span className="text-[#00e5ff]">94%</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Feed 2: Movement Detected - Punjab (FLIR Thermal Night-Vision) */}
              <div 
                onClick={() => setSelectedFeed('FLIR_PUNJAB')}
                className={`relative rounded-xl overflow-hidden border transition cursor-pointer flex flex-col bg-[#020b1c] ${
                  selectedFeed === 'FLIR_PUNJAB' ? 'border-[#00ffff] shadow-[0_0_14px_rgba(0,255,255,0.35)]' : 'border-[#0055ff]/40 hover:border-cyan-500/60'
                }`}
              >
                {/* Thermal Imagery View */}
                <div className="relative h-32 sm:h-36 bg-[#04080a] overflow-hidden group">
                  <img
                    src={thermalPunjabImg}
                    alt="Movement Detected - Punjab"
                    className="w-full h-full object-cover contrast-125 brightness-95 transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* FLIR IR Target Reticles & Bounding Boxes around hot signatures */}
                  <div className="absolute top-[8%] left-[45%] w-[14%] h-[32%] border-[1.5px] border-white/80 bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.85)] flex flex-col justify-between p-0.5">
                    <div className="w-1 h-1 bg-white -mt-0.5 -ml-0.5" />
                    <div className="w-1 h-1 bg-white -mb-0.5 -mr-0.5 self-end" />
                  </div>

                  <div className="absolute top-[35%] left-[42%] w-[14%] h-[30%] border-[1.5px] border-white/80 bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.85)] flex flex-col justify-between p-0.5">
                    <div className="w-1 h-1 bg-white -mt-0.5 -ml-0.5" />
                    <div className="w-1 h-1 bg-white -mb-0.5 -mr-0.5 self-end" />
                  </div>

                  <div className="absolute top-[28%] left-[16%] w-[14%] h-[30%] border-[1.5px] border-white/70 bg-white/10 shadow-[0_0_8px_rgba(255,255,255,0.7)] flex flex-col justify-between p-0.5">
                    <div className="w-1 h-1 bg-white -mt-0.5 -ml-0.5" />
                    <div className="w-1 h-1 bg-white -mb-0.5 -mr-0.5 self-end" />
                  </div>

                  <div className="absolute top-[29%] left-[68%] w-[13%] h-[30%] border-[1.5px] border-white/70 bg-white/10 shadow-[0_0_8px_rgba(255,255,255,0.7)] flex flex-col justify-between p-0.5">
                    <div className="w-1 h-1 bg-white -mt-0.5 -ml-0.5" />
                    <div className="w-1 h-1 bg-white -mb-0.5 -mr-0.5 self-end" />
                  </div>

                  {/* IR Tag Label */}
                  <div className="absolute top-1.5 left-2 flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-black/80 border border-slate-700 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[8px] font-mono-code font-bold tracking-wider text-slate-200">
                      FLIR-IR • 840nm
                    </span>
                  </div>

                  {/* Optical Reticle Center Line */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    <div className="w-10 h-0.5 bg-cyan-400" />
                    <div className="w-0.5 h-10 bg-cyan-400 absolute" />
                  </div>
                </div>

                {/* Subtitle Details */}
                <div className="p-2.5 bg-[#020d20] flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-tech font-bold text-white tracking-wide truncate">
                      Movement Detected - Punjab
                    </div>
                    <div className="text-[9.5px] font-mono-code text-slate-400 mt-0.5">
                      21:32:05
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/80">
                    <span className="px-2 py-0.5 rounded border border-red-500/80 bg-red-950/80 text-red-400 font-mono-code font-bold text-[9px] tracking-wider leading-none">
                      CRITICAL
                    </span>
                    <span className="text-[10px] font-mono-code font-bold text-cyan-300">
                      AI CONFIDENCE <span className="text-[#00e5ff]">91%</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Feed 3: Unusual Vehicle - Sector 4 (Satellite View) */}
              <div 
                onClick={() => setSelectedFeed('SAT_SECTOR_4')}
                className={`relative rounded-xl overflow-hidden border transition cursor-pointer flex flex-col bg-[#020b1c] ${
                  selectedFeed === 'SAT_SECTOR_4' ? 'border-[#00ffff] shadow-[0_0_14px_rgba(0,255,255,0.35)]' : 'border-[#0055ff]/40 hover:border-cyan-500/60'
                }`}
              >
                {/* Satellite Imagery View */}
                <div className="relative h-32 sm:h-36 bg-[#11161d] overflow-hidden group flex items-center justify-center">
                  <img
                    src={satelliteSector4Img}
                    alt="Unusual Vehicle - Sector 4"
                    className="w-full h-full object-cover brightness-[0.95] contrast-[1.15] transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Prominent Luminous Scalloped Octagonal Radar Reticle with red vehicle lock */}
                  <div className="absolute top-[22%] right-[28%] pointer-events-none">
                    <svg viewBox="0 0 60 60" className="w-14 h-14 filter drop-shadow-[0_0_14px_rgba(250,204,21,0.95)] animate-pulse">
                      {/* Scalloped outer star polygon */}
                      <polygon 
                        points="30,4 36,10 44,8 47,16 55,18 54,26 60,30 54,34 55,42 47,44 44,52 36,50 30,56 24,50 16,52 13,44 5,42 6,34 0,30 6,26 5,18 13,16 16,8 24,10" 
                        fill="rgba(245, 158, 11, 0.35)" 
                        stroke="#facc15" 
                        strokeWidth="2" 
                      />
                      {/* Glowing bright red radial core */}
                      <circle cx="30" cy="30" r="13" fill="#ef4444" opacity="0.95" filter="drop-shadow(0 0 8px #dc2626)" />
                      {/* Inner vehicle silhouette symbol */}
                      <path d="M22 33 L24 29 L27 26 L33 26 L36 29 L38 33 Z" fill="#ffffff" />
                      <circle cx="25" cy="33" r="1.8" fill="#fef08a" />
                      <circle cx="35" cy="33" r="1.8" fill="#fef08a" />
                      <circle cx="30" cy="23" r="1.5" fill="#ffffff" />
                    </svg>
                  </div>

                  {/* Satellite Metadata Badge */}
                  <div className="absolute top-1.5 left-2 flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-black/80 border border-cyan-500/40 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="text-[8px] font-mono-code font-bold tracking-wider text-cyan-300">
                      RISAT-2B • 0.5M
                    </span>
                  </div>

                  {/* Crosshairs */}
                  <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-amber-400/80" />
                  <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-amber-400/80" />
                </div>

                {/* Subtitle Details */}
                <div className="p-2.5 bg-[#020d20] flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-tech font-bold text-white tracking-wide truncate">
                      Unusual Vehicle - Sector 4
                    </div>
                    <div className="text-[9.5px] font-mono-code text-slate-400 mt-0.5">
                      21:21:17
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/80">
                    <span className="px-2 py-0.5 rounded border border-amber-500/80 bg-amber-950/80 text-amber-400 font-mono-code font-bold text-[9px] tracking-wider leading-none">
                      MEDIUM
                    </span>
                    <span className="text-[10px] font-mono-code font-bold text-cyan-300">
                      AI CONFIDENCE <span className="text-[#00e5ff]">78%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Half: AI INSIGHTS & INTELLIGENCE + TREND ANALYSIS (Split 2-Column Subgrid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 flex-1">
            {/* Sub-widget 1: AI INSIGHTS & INTELLIGENCE */}
            <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/45 shadow-xl flex flex-col justify-between">
              <div className="text-xs font-tech font-bold text-white tracking-wider uppercase pb-2 border-b border-[#0055ff]/30 mb-2.5">
                AI INSIGHTS & INTELLIGENCE
              </div>

              <div className="space-y-2">
                {/* 1 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#031533]/60 border border-slate-800/80 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-[11px] font-tech text-slate-200 truncate">
                      Increased drone activity in J&K sector (last 3 hrs)
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-red-950 border border-red-500 text-red-400 font-mono-code font-bold text-[9px] shrink-0">
                    High
                  </span>
                </div>

                {/* 2 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#031533]/60 border border-slate-800/80 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Target className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="text-[11px] font-tech text-slate-200 truncate">
                      Possible infiltration route identified (Sector 7)
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-red-950 border border-red-500 text-red-400 font-mono-code font-bold text-[9px] shrink-0">
                    High
                  </span>
                </div>

                {/* 3 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#031533]/60 border border-slate-800/80 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-[11px] font-tech text-slate-200 truncate">
                      Unusual vehicle movement in Punjab (4 vehicles)
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500 text-amber-400 font-mono-code font-bold text-[9px] shrink-0">
                    Medium
                  </span>
                </div>

                {/* 4 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#031533]/60 border border-slate-800/80 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Globe className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span className="text-[11px] font-tech text-slate-200 truncate">
                      Cyber scanning detected from foreign IP (2x)
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500 text-amber-400 font-mono-code font-bold text-[9px] shrink-0">
                    Medium
                  </span>
                </div>

                {/* 5 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#031533]/60 border border-slate-800/80 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Radio className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[11px] font-tech text-slate-200 truncate">
                      Weather-related visibility reduction in North Zone
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-400 font-mono-code font-bold text-[9px] shrink-0">
                    Low
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-widget 2: TREND ANALYSIS */}
            <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/45 shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-xs font-tech font-bold text-white tracking-wider uppercase">
                  TREND ANALYSIS
                </div>
                <div className="text-[10px] font-mono-code text-slate-400 mt-0.5">
                  Threat Activity Trend (Last 7 Days)
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-3 text-[10px] font-mono-code my-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-slate-300">Hostile Activity</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-slate-300">Allied Activity</span>
                </div>
              </div>

              {/* Multi-Line Chart SVG */}
              <div className="relative w-full h-36 flex items-center justify-center">
                <svg viewBox="0 0 280 120" className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1="25" y1="20" x2="275" y2="20" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3,3" />
                  <line x1="25" y1="50" x2="275" y2="50" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3,3" />
                  <line x1="25" y1="80" x2="275" y2="80" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3,3" />
                  <line x1="25" y1="100" x2="275" y2="100" stroke="#334155" strokeWidth="1" />

                  {/* Y-axis Labels */}
                  <text x="16" y="23" fill="#64748b" fontSize="7" fontFamily="monospace">15</text>
                  <text x="16" y="53" fill="#64748b" fontSize="7" fontFamily="monospace">10</text>
                  <text x="16" y="83" fill="#64748b" fontSize="7" fontFamily="monospace">5</text>
                  <text x="16" y="103" fill="#64748b" fontSize="7" fontFamily="monospace">0</text>

                  {/* Hostile Activity Line (Red) */}
                  <path
                    d="M 35 75 L 75 60 L 115 72 L 155 58 L 195 48 L 235 62 L 270 54"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                  {/* Hostile Dots */}
                  <circle cx="35" cy="75" r="3" fill="#ef4444" />
                  <circle cx="75" cy="60" r="3" fill="#ef4444" />
                  <circle cx="115" cy="72" r="3" fill="#ef4444" />
                  <circle cx="155" cy="58" r="3" fill="#ef4444" />
                  <circle cx="195" cy="48" r="3" fill="#ef4444" />
                  <circle cx="235" cy="62" r="3" fill="#ef4444" />
                  <circle cx="270" cy="54" r="3" fill="#ef4444" />

                  {/* Allied Activity Line (Blue) */}
                  <path
                    d="M 35 90 L 75 85 L 115 88 L 155 82 L 195 78 L 235 80 L 270 72"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="1.8"
                    strokeDasharray="4,2"
                  />
                  {/* Allied Dots */}
                  <circle cx="35" cy="90" r="2.5" fill="#3b82f6" />
                  <circle cx="75" cy="85" r="2.5" fill="#3b82f6" />
                  <circle cx="115" cy="88" r="2.5" fill="#3b82f6" />
                  <circle cx="155" cy="82" r="2.5" fill="#3b82f6" />
                  <circle cx="195" cy="78" r="2.5" fill="#3b82f6" />
                  <circle cx="235" cy="80" r="2.5" fill="#3b82f6" />
                  <circle cx="270" cy="72" r="2.5" fill="#3b82f6" />

                  {/* X-axis Day Labels */}
                  <text x="35" y="114" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">14 Sep</text>
                  <text x="75" y="114" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">15 Sep</text>
                  <text x="115" y="114" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">16 Sep</text>
                  <text x="155" y="114" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">17 Sep</text>
                  <text x="195" y="114" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">18 Sep</text>
                  <text x="235" y="114" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">19 Sep</text>
                  <text x="270" y="114" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">20 Sep</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: 4 MODULAR CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full">
        {/* PANEL 1: AI PATTERN RECOGNITION */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/45 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-2 border-b border-[#0055ff]/30 mb-2.5">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
              AI PATTERN RECOGNITION
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 flex-1 items-center">
            {/* Recognized Patterns List */}
            <div className="space-y-1.5 text-[10.5px]">
              <div className="text-[9px] font-mono-code font-bold text-slate-400 uppercase">
                RECOGNIZED PATTERNS
              </div>
              
              <div>
                <div className="flex justify-between font-tech text-white">
                  <span className="text-[10px]">Infiltration Pattern</span>
                  <span className="text-cyan-400 font-bold">92%</span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mt-0.5">
                  <div className="bg-cyan-400 h-full w-[92%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-tech text-white">
                  <span className="text-[10px]">Drone Pattern</span>
                  <span className="text-cyan-400 font-bold">87%</span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mt-0.5">
                  <div className="bg-cyan-400 h-full w-[87%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-tech text-white">
                  <span className="text-[10px]">Cyber Pattern</span>
                  <span className="text-cyan-400 font-bold">76%</span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mt-0.5">
                  <div className="bg-cyan-400 h-full w-[76%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-tech text-white">
                  <span className="text-[10px]">Vehicle Pattern</span>
                  <span className="text-cyan-400 font-bold">68%</span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mt-0.5">
                  <div className="bg-cyan-400 h-full w-[68%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-tech text-white">
                  <span className="text-[10px]">Communication Pattern</span>
                  <span className="text-cyan-400 font-bold">61%</span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mt-0.5">
                  <div className="bg-cyan-400 h-full w-[61%]" />
                </div>
              </div>
            </div>

            {/* Pattern Visualization: Glowing Constellation Graph */}
            <div className="flex flex-col items-center">
              <div className="text-[9px] font-mono-code font-bold text-slate-400 uppercase self-start mb-1">
                PATTERN VISUALIZATION
              </div>
              <div className="relative w-full h-28 bg-[#010816] rounded-xl border border-cyan-500/30 overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Constellation Vectors */}
                  <line x1="20" y1="30" x2="50" y2="20" stroke="#00ffff" strokeWidth="1" opacity="0.6" />
                  <line x1="50" y1="20" x2="80" y2="40" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
                  <line x1="80" y1="40" x2="60" y2="75" stroke="#ec4899" strokeWidth="1" opacity="0.6" />
                  <line x1="60" y1="75" x2="25" y2="70" stroke="#eab308" strokeWidth="1" opacity="0.6" />
                  <line x1="25" y1="70" x2="20" y2="30" stroke="#00ffff" strokeWidth="1" opacity="0.6" />
                  <line x1="50" y1="50" x2="20" y2="30" stroke="#00ffff" strokeWidth="1.2" />
                  <line x1="50" y1="50" x2="80" y2="40" stroke="#3b82f6" strokeWidth="1.2" />
                  <line x1="50" y1="50" x2="60" y2="75" stroke="#ec4899" strokeWidth="1.2" />
                  <line x1="50" y1="50" x2="25" y2="70" stroke="#eab308" strokeWidth="1.2" />

                  {/* Vertices */}
                  <circle cx="50" cy="50" r="4" fill="#00ffff" className="animate-pulse" />
                  <circle cx="20" cy="30" r="3" fill="#38bdf8" />
                  <circle cx="50" cy="20" r="2.5" fill="#3b82f6" />
                  <circle cx="80" cy="40" r="3" fill="#f43f5e" />
                  <circle cx="60" cy="75" r="3" fill="#ec4899" />
                  <circle cx="25" cy="70" r="2.5" fill="#eab308" />
                </svg>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setActiveModal('pattern_full')}
            className="mt-2.5 w-full py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-[10.5px] font-tech font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <span>View Full Analysis</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* PANEL 2: PREDICTIVE ANALYTICS */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/45 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-2 border-b border-[#0055ff]/30 mb-2.5">
            <Target className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
              PREDICTIVE ANALYTICS
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Accuracy Donut Ring */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 54 54">
                <circle cx="27" cy="27" r="21" fill="none" stroke="#1e293b" strokeWidth="5" />
                <circle
                  cx="27"
                  cy="27"
                  r="21"
                  fill="none"
                  stroke="#00ffff"
                  strokeWidth="5"
                  strokeDasharray={131.95}
                  strokeDashoffset={131.95 * (1 - 0.78)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-xs font-tech font-bold text-white leading-none">78%</div>
                <div className="text-[7.5px] font-mono-code text-cyan-300 leading-none mt-0.5">Forecast</div>
              </div>
            </div>

            {/* Key Predictions Table */}
            <div className="flex-1 space-y-1 text-[10px]">
              <div className="text-[9px] font-mono-code font-bold text-slate-400 uppercase">
                KEY PREDICTIONS
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="truncate">Infiltration attempt</span>
                <span className="px-1 bg-red-950 text-red-400 border border-red-500 rounded text-[9px] font-bold">High</span>
                <span className="text-slate-400 font-mono-code text-[9px]">12-24h</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="truncate">Drone swarm</span>
                <span className="px-1 bg-amber-950 text-amber-400 border border-amber-500 rounded text-[9px] font-bold">Medium</span>
                <span className="text-slate-400 font-mono-code text-[9px]">6-12h</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="truncate">Border skirmish</span>
                <span className="px-1 bg-amber-950 text-amber-400 border border-amber-500 rounded text-[9px] font-bold">Medium</span>
                <span className="text-slate-400 font-mono-code text-[9px]">24-48h</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="truncate">Cyber attack</span>
                <span className="px-1 bg-emerald-950 text-emerald-400 border border-emerald-500 rounded text-[9px] font-bold">Low</span>
                <span className="text-slate-400 font-mono-code text-[9px]">12-24h</span>
              </div>
            </div>
          </div>

          {/* Risk Level Forecast Chart (Next 48 Hours) */}
          <div className="mt-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-[9px] font-mono-code">
              <span className="text-slate-400">Risk Level Forecast (Next 48 Hours)</span>
              <div className="flex items-center gap-1.5 text-[8px]">
                <span className="text-red-400">─ High</span>
                <span className="text-amber-400">─ Med</span>
                <span className="text-emerald-400">─ Low</span>
              </div>
            </div>

            <div className="relative w-full h-14 mt-1">
              <svg viewBox="0 0 200 50" className="w-full h-full">
                {/* 3 Wave lines */}
                <path d="M 0 15 Q 30 25, 60 12 T 120 22 T 160 10 T 200 18" fill="none" stroke="#ef4444" strokeWidth="1.6" />
                <path d="M 0 28 Q 40 18, 80 30 T 140 24 T 200 32" fill="none" stroke="#f59e0b" strokeWidth="1.4" />
                <path d="M 0 42 Q 50 35, 100 45 T 180 38 T 200 44" fill="none" stroke="#10b981" strokeWidth="1.2" />

                {/* X labels */}
                <text x="5" y="49" fill="#64748b" fontSize="6" fontFamily="monospace">0h</text>
                <text x="35" y="49" fill="#64748b" fontSize="6" fontFamily="monospace">6h</text>
                <text x="70" y="49" fill="#64748b" fontSize="6" fontFamily="monospace">12h</text>
                <text x="105" y="49" fill="#64748b" fontSize="6" fontFamily="monospace">18h</text>
                <text x="140" y="49" fill="#64748b" fontSize="6" fontFamily="monospace">24h</text>
                <text x="175" y="49" fill="#64748b" fontSize="6" fontFamily="monospace">36h</text>
                <text x="195" y="49" fill="#64748b" fontSize="6" fontFamily="monospace" textAnchor="end">48h</text>
              </svg>
            </div>
          </div>
        </div>

        {/* PANEL 3: AI MODEL PERFORMANCE */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/45 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-2 border-b border-[#0055ff]/30 mb-2.5">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
              AI MODEL PERFORMANCE
            </span>
          </div>

          {/* Model Accuracy Table */}
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between text-[9px] font-mono-code font-bold text-slate-400 pb-1 border-b border-slate-800">
              <span>Model</span>
              <span>Accuracy</span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-tech text-slate-200">
              <span className="truncate">Object Detection (YOLOv8)</span>
              <span className="font-mono-code font-bold text-cyan-400">96.4%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-tech text-slate-200">
              <span className="truncate">Anomaly Detection</span>
              <span className="font-mono-code font-bold text-cyan-400">92.7%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-tech text-slate-200">
              <span className="truncate">NLP (Threat Analysis)</span>
              <span className="font-mono-code font-bold text-cyan-400">89.3%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-tech text-slate-200">
              <span className="truncate">Geospatial Analysis</span>
              <span className="font-mono-code font-bold text-cyan-400">94.1%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-tech text-slate-200">
              <span className="truncate">Behavior Analysis</span>
              <span className="font-mono-code font-bold text-cyan-400">87.6%</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-tech text-slate-200">
              <span className="truncate">Sentiment Analysis</span>
              <span className="font-mono-code font-bold text-cyan-400">82.3%</span>
            </div>
          </div>

          <button 
            onClick={() => setActiveModal('model_details')}
            className="mt-2.5 w-full py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-[10.5px] font-tech font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <span>Model Details</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* PANEL 4: RECOMMENDATIONS */}
        <div className="rounded-2xl p-3.5 bg-[#020b1c]/95 border border-[#0055ff]/45 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-2 border-b border-[#0055ff]/30 mb-2.5">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-tech font-bold text-white tracking-wider uppercase">
              RECOMMENDATIONS
            </span>
          </div>

          {/* Action List */}
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#031533]/60 border border-slate-800 gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="text-[10.5px] font-tech text-slate-200 truncate">
                  Increase surveillance in Sector 7
                </span>
              </div>
              <span className="px-1 bg-red-950 border border-red-500 text-red-400 font-mono-code font-bold text-[8.5px] shrink-0">
                High
              </span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#031533]/60 border border-slate-800 gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Radio className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="text-[10.5px] font-tech text-slate-200 truncate">
                  Deploy drone jamming system
                </span>
              </div>
              <span className="px-1 bg-red-950 border border-red-500 text-red-400 font-mono-code font-bold text-[8.5px] shrink-0">
                High
              </span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#031533]/60 border border-slate-800 gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-[10.5px] font-tech text-slate-200 truncate">
                  Validate vehicle movement (Punjab)
                </span>
              </div>
              <span className="px-1 bg-amber-950 border border-amber-500 text-amber-400 font-mono-code font-bold text-[8.5px] shrink-0">
                Medium
              </span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#031533]/60 border border-slate-800 gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-[10.5px] font-tech text-slate-200 truncate">
                  Run cyber threat scan (2x)
                </span>
              </div>
              <span className="px-1 bg-amber-950 border border-amber-500 text-amber-400 font-mono-code font-bold text-[8.5px] shrink-0">
                Medium
              </span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#031533]/60 border border-slate-800 gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[10.5px] font-tech text-slate-200 truncate">
                  Prepare medical support (Border)
                </span>
              </div>
              <span className="px-1 bg-emerald-950 border border-emerald-500 text-emerald-400 font-mono-code font-bold text-[8.5px] shrink-0">
                Low
              </span>
            </div>
          </div>

          <button 
            onClick={() => setActiveModal('recommendations_all')}
            className="mt-2.5 w-full py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-[10.5px] font-tech font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <span>View All Recommendations</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 4. MODAL INSPECTORS */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#020b1c] border border-cyan-500/60 rounded-2xl p-5 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <h3 className="text-sm font-tech font-bold text-white uppercase flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-400" />
                TACTICAL INTELLIGENCE BRIEFING
              </h3>
              <button 
                onClick={() => setActiveModal(null)} 
                className="text-slate-400 hover:text-white text-xs font-mono-code px-2 py-1 rounded bg-slate-800"
              >
                ✕ Close
              </button>
            </div>
            <div className="text-xs text-slate-300 font-mono-code space-y-2">
              <p>
                <strong className="text-cyan-400">Target Vector:</strong> {selectedThreat}
              </p>
              <p>
                Integrated telemetry corroborated across 7 active neural models including YOLOv8 real-time object tracking and geospatial terrain correlation.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-1">
                <div className="text-white font-bold">Operational Guidance:</div>
                <div className="text-slate-400">• Command sign-off completed for counter-measures.</div>
                <div className="text-slate-400">• Airborne jamming frequency sync active.</div>
              </div>
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold text-white text-xs font-tech"
            >
              Acknowledge Directive
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
