import React, { useState } from 'react';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  Database, 
  ShieldCheck, 
  Server, 
  Camera, 
  Cpu, 
  Layers, 
  Sliders, 
  AlertTriangle 
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

interface SurveillanceSyncViewProps {
  isOnline: boolean;
  onToggleOnline: () => void;
  pendingSyncCount: number;
  onTriggerSync: () => void;
  isSyncing: boolean;
}

export const SurveillanceSyncView: React.FC<SurveillanceSyncViewProps> = ({
  isOnline,
  onToggleOnline,
  pendingSyncCount,
  onTriggerSync,
  isSyncing
}) => {
  const { theme } = useSettings();
  const isLight = theme === 'Light';

  const pipelineSteps = [
    { title: 'CCTV VIDEO', sub: 'RTSP / ONVIF IP Streams / MP4 Footage' },
    { title: 'FRAME EXTRACTION', sub: '25 FPS Hardware Demuxing' },
    { title: 'PREPROCESSING', sub: 'Noise Reduction & Normalization' },
    { title: 'OBJECT DETECTION', sub: 'Neural Weights (YOLOv8 Edge)' },
    { title: 'OBJECT TRACKING', sub: 'ByteTrack & Trajectory Smoothing' },
    { title: 'FEATURE EXTRACTION', sub: 'Embeddings & Visual Vectorization' },
    { title: 'AI ANALYTICS', sub: 'Spatial Logic & Tripwires' },
    { title: 'EVENT CLASSIFICATION', sub: 'Threat Scoring & Categorization' },
    { title: 'ALERT GENERATION', sub: 'Autonomous Local Dispatch' },
    { title: 'EVENT STORAGE', sub: 'Edge SQLite / Encrypted Queue' },
    { title: 'DASHBOARD', sub: 'VAJRA Command & Operator Console' }
  ];

  return (
    <div className="w-full space-y-4 font-tech">
      {/* Overview Banner */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-3 ${
        isLight ? 'bg-white border-slate-300 shadow-sm text-slate-900' : 'bg-[#020b1c]/90 border-cyan-500/40 text-white'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${
            isOnline ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400' : 'bg-amber-600/20 border-amber-500/50 text-amber-400'
          }`}>
            {isOnline ? <Wifi className="w-6 h-6 animate-pulse" /> : <WifiOff className="w-6 h-6 animate-bounce" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold font-tech uppercase tracking-wider">
                Synchronization & Edge Resilience Architecture
              </h2>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase ${
                isOnline ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}>
                {isOnline ? 'CONNECTED • CENTRAL PLATFORM' : 'OFFLINE • EDGE AUTONOMOUS'}
              </span>
            </div>
            <p className="text-xs font-mono-code text-slate-400">
              Guaranteed operational readiness even under complete WAN denial or hostile electronic jamming.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleOnline}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono-code font-bold flex items-center gap-2 transition cursor-pointer shadow-sm ${
              isOnline
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isOnline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            <span>{isOnline ? 'SIMULATE WAN OUTAGE (OFFLINE)' : 'RESTORE WAN LINK (ONLINE)'}</span>
          </button>

          <button
            onClick={onTriggerSync}
            disabled={isSyncing || (!isOnline && pendingSyncCount > 0)}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono-code font-bold flex items-center gap-2 transition cursor-pointer shadow-sm ${
              isSyncing
                ? 'bg-cyan-600 text-white cursor-wait'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>TRIGGER AUTOMATIC SYNC</span>
          </button>
        </div>
      </div>

      {/* Online vs Offline Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Offline Mode Card */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
          !isOnline 
            ? 'bg-amber-950/20 border-amber-500/60 shadow-lg text-white' 
            : isLight ? 'bg-white border-slate-300' : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
        }`}>
          <div>
            <div className="flex items-center justify-between border-b pb-2 border-slate-700/40">
              <span className="text-sm font-bold font-tech text-amber-400 flex items-center gap-2">
                <WifiOff className="w-4 h-4" />
                <span>OFFLINE SURVEILLANCE MODE (EDGE RESILIENCE)</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono-code font-bold">
                MANDATORY BORDER REQUIREMENT
              </span>
            </div>

            <p className="text-xs font-mono-code text-slate-300 my-2 leading-relaxed">
              When satellite, WAN, or optical fiber communication is severed, all critical surveillance pipelines continue uninhibited locally on hardened Edge AI Gateways:
            </p>

            <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-xs font-mono-code space-y-1.5 text-slate-200">
              <div className="text-cyan-400 font-bold">CCTV VIDEO → EDGE PROCESSING → AI INFERENCE → EVENT → LOCAL DATABASE → LOCAL ALERT → LOCAL DASHBOARD</div>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-300 text-[11px] pt-1">
                <li>Local video ingestion and circular NVMe clip recording</li>
                <li>Zero-latency edge human, vehicle, and tripwire inference</li>
                <li>Instant local auditory & visual alarm triggers</li>
                <li>Encrypted local SQLite event queue maintains audit trail</li>
              </ul>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/40 flex justify-between items-center text-xs font-mono-code">
            <span className="text-slate-400">Offline Queue Backlog:</span>
            <span className="text-amber-400 font-bold">{pendingSyncCount} Events Buffered</span>
          </div>
        </div>

        {/* Online Central Synchronization Card */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
          isOnline 
            ? 'bg-emerald-950/20 border-emerald-500/60 shadow-lg text-white' 
            : isLight ? 'bg-white border-slate-300' : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
        }`}>
          <div>
            <div className="flex items-center justify-between border-b pb-2 border-slate-700/40">
              <span className="text-sm font-bold font-tech text-emerald-400 flex items-center gap-2">
                <Wifi className="w-4 h-4" />
                <span>ONLINE & AUTOMATIC RE-SYNCHRONIZATION</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono-code font-bold">
                CENTRAL COMMAND C2
              </span>
            </div>

            <p className="text-xs font-mono-code text-slate-300 my-2 leading-relaxed">
              Once connectivity is restored, the Edge Sync Manager automatically performs reconciliation with Central Headquarters:
            </p>

            <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-xs font-mono-code space-y-1.5 text-slate-200">
              <div className="text-emerald-400 font-bold">OFFLINE EVENTS → LOCAL QUEUE → CONNECTIVITY DETECTOR → SYNC MANAGER → CONFLICT RESOLUTION → SECURE DATA TRANSFER → CENTRAL SERVER → ACKNOWLEDGEMENT → MARK SYNCHRONIZED</div>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-300 text-[11px] pt-1">
                <li>Automated deduplication and timestamp monotonic reconciliation</li>
                <li>Priority queueing (Critical intrusions transfer before telemetry)</li>
                <li>Cryptographic checksum (SHA-256) validation of evidence clips</li>
                <li>Central fleet-wide model updates and watchlist synchronization</li>
              </ul>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/40 flex justify-between items-center text-xs font-mono-code">
            <span className="text-slate-400">WAN Sync Channel:</span>
            <span className="text-emerald-400 font-bold">TLS 1.3 / E-2-E ENCRYPTED</span>
          </div>
        </div>
      </div>

      {/* Complete Video AI Pipeline Visual Diagram */}
      <div className={`p-4 rounded-xl border space-y-3 ${
        isLight ? 'bg-white border-slate-300 shadow-sm text-slate-900' : 'bg-[#020b1c]/90 border-cyan-500/40 text-white'
      }`}>
        <div className="flex items-center justify-between border-b pb-2.5 border-slate-700/40">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold font-tech uppercase tracking-wider">
              Surveillance AI Video Processing Pipeline
            </h3>
          </div>
          <span className="text-[10px] font-mono-code text-cyan-400">
            SPECIFICATION END-TO-END FLOW
          </span>
        </div>

        {/* Pipeline Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 pt-2">
          {pipelineSteps.map((step, idx) => (
            <div 
              key={idx}
              className={`p-3 rounded-xl border flex flex-col justify-between relative group ${
                isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-950/80 border-cyan-500/30 hover:border-cyan-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 mb-1">
                  <span>STEP {String(idx + 1).padStart(2, '0')}</span>
                  {idx < pipelineSteps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-cyan-400 hidden xl:inline" />
                  )}
                </div>
                <div className="text-xs font-bold font-tech text-white leading-tight">
                  {step.title}
                </div>
                <div className="text-[10px] font-mono-code text-slate-300 mt-1">
                  {step.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
