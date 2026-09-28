import React from 'react';
import { 
  Cpu, 
  Activity, 
  Thermometer, 
  HardDrive, 
  Wifi, 
  CheckCircle2, 
  AlertTriangle, 
  Server, 
  Radio, 
  Zap 
} from 'lucide-react';
import { EDGE_NODES_HEALTH } from '../../data/surveillanceData';
import { useSettings } from '../../context/SettingsContext';

export const SurveillanceEdgeHealthView: React.FC = () => {
  const { theme } = useSettings();
  const isLight = theme === 'Light';

  return (
    <div className="w-full space-y-4 font-tech">
      {/* Edge System Summary Banner */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-3 ${
        isLight ? 'bg-white border-slate-300 shadow-sm text-slate-900' : 'bg-[#020b1c]/90 border-cyan-500/40 text-white'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-600/20 border border-cyan-500/50 text-cyan-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-bold font-tech uppercase tracking-wider">
              Edge AI Hardware & Ingestion Node Health
            </h2>
            <p className="text-xs font-mono-code text-slate-400">
              Distributed Edge Inference Clusters • Real-time RTSP/ONVIF Stream Ingestion • Local Hardware Accelerators
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-code">
          <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>3/3 EDGE NODES OPTIMAL</span>
          </span>
        </div>
      </div>

      {/* Nodes Health Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {EDGE_NODES_HEALTH.map(node => (
          <div
            key={node.id}
            className={`p-4 rounded-xl border flex flex-col justify-between space-y-4 ${
              isLight ? 'bg-white border-slate-300 text-slate-900 shadow-sm' : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-2.5 border-slate-700/40">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono-code font-bold text-cyan-300">{node.id}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono-code font-bold">
                  {node.status}
                </span>
              </div>

              {/* Title & Location */}
              <div className="my-2.5">
                <div className="text-sm font-bold font-tech text-white leading-tight">
                  {node.name}
                </div>
                <div className="text-[11px] font-mono-code text-slate-400 mt-0.5">
                  {node.location}
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-2 text-xs font-mono-code pt-1">
                {/* GPU & NPU Load */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400">NPU/GPU Tensor Load:</span>
                    <span className="text-cyan-400 font-bold">{node.gpuLoadPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
                      style={{ width: `${node.gpuLoadPercent}%` }} 
                    />
                  </div>
                </div>

                {/* Storage NVMe */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400">NVMe Circular Video Buffer:</span>
                    <span className="text-amber-400 font-bold">{node.storageUsedPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" 
                      style={{ width: `${node.storageUsedPercent}%` }} 
                    />
                  </div>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400">Inference Latency:</span>
                    <div className="text-sm font-tech font-bold text-emerald-400">{node.inferenceNpuMs} ms</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400">FPS Throughput:</span>
                    <div className="text-sm font-tech font-bold text-cyan-300">{node.fps} FPS</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400">Core Temp:</span>
                    <div className="text-sm font-tech font-bold text-slate-200">{node.temperatureC} °C</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400">Cameras Fed:</span>
                    <div className="text-sm font-tech font-bold text-blue-400">{node.activeCameras}/{node.totalCameras}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Link Status */}
            <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] font-mono-code text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <Wifi className="w-3 h-3" />
                <span>LINK: {node.networkLink.replace('_', ' ')}</span>
              </span>
              <span>BUFFER RETENTION: 7 DAYS</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
