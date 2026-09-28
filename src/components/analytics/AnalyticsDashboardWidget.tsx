import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Activity, Radio, Cpu } from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell 
} from 'recharts';

interface AnalyticsDashboardWidgetProps {
  onClose?: () => void;
}

export const AnalyticsDashboardWidget: React.FC<AnalyticsDashboardWidgetProps> = ({
  onClose
}) => {
  // Synthetic Time Series Data for Sensor Throughput
  const throughputData = [
    { time: '16:00', throughput: 3200, packets: 98 },
    { time: '17:00', throughput: 3800, packets: 99 },
    { time: '18:00', throughput: 4200, packets: 97 },
    { time: '19:00', throughput: 4900, packets: 99 },
    { time: '20:00', throughput: 4600, packets: 98 },
    { time: '21:00', throughput: 5300, packets: 100 },
    { time: '22:00', throughput: 5800, packets: 99 }
  ];

  // Tri-Service Readiness Distribution
  const serviceReadinessData = [
    { service: 'Army Command', readiness: 98, outposts: 14 },
    { service: 'Navy Taskforce', readiness: 97, outposts: 8 },
    { service: 'Air Defense', readiness: 99, outposts: 11 },
    { service: 'Tri-Service ANC', readiness: 96, outposts: 6 }
  ];

  // Threat Matrix by Domain
  const threatDomainData = [
    { name: 'Airspace Corridors', value: 35, color: '#38BDF8' },
    { name: 'Maritime EEZ', value: 25, color: '#000080' },
    { name: 'Ground Frontier', value: 30, color: '#FF9933' },
    { name: 'Sat-Com & Cyber', value: 10, color: '#10B981' }
  ];

  return (
    <div className="vajra-panel-elevated rounded-2xl p-5 border border-cyan-500/35 max-w-4xl w-full backdrop-blur-2xl shadow-2xl animate-fade-in" id="analytics-panel">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg tracking-wide">
              STRATEGIC GEOSPATIAL ANALYTICS & TELEMETRY
            </h3>
            <p className="text-xs font-tech text-cyan-300/70">
              AGGREGATED SENSOR METRICS • THEATER READINESS INDEX • SECURE THROUGHPUT
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Top Stat Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-[10px] font-tech text-slate-400">GLOBAL SENSOR NODES</div>
          <div className="text-xl font-mono-code font-bold text-cyan-300">1,482 / 1,482</div>
          <div className="text-[10px] text-emerald-400 font-tech">100% ONLINE</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-[10px] font-tech text-slate-400">RADAR SWEEP THROUGHPUT</div>
          <div className="text-xl font-mono-code font-bold text-white">5.8 Gbps</div>
          <div className="text-[10px] text-cyan-400 font-tech">SAT-LINK QUANTUM ENCRYPTED</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-[10px] font-tech text-slate-400">NATIONAL READINESS</div>
          <div className="text-xl font-mono-code font-bold text-emerald-400">98.4%</div>
          <div className="text-[10px] text-emerald-400 font-tech">HIGH READINESS STATE</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-[10px] font-tech text-slate-400">XAI CORRELATION LATENCY</div>
          <div className="text-xl font-mono-code font-bold text-amber-300">18 ms</div>
          <div className="text-[10px] text-slate-400 font-tech">SUB-SECOND EVENT FUSION</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Chart 1: Sensor Throughput Trend */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs font-tech mb-3">
            <span className="text-white font-bold">RADAR & TELEMETRY BANDWIDTH (Mbps)</span>
            <span className="text-cyan-400 font-mono-code">24H TIMELINE</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughputData}>
                <defs>
                  <linearGradient id="cyanArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={10} />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A1228', borderColor: '#22D3EE', borderRadius: 8, fontSize: 11 }}
                />
                <Area type="monotone" dataKey="throughput" stroke="#22D3EE" fillOpacity={1} fill="url(#cyanArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Tri-Service Readiness Bar */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs font-tech mb-3">
            <span className="text-white font-bold">THEATER COMMAND READINESS SCORES (%)</span>
            <span className="text-emerald-400 font-mono-code">TRI-SERVICE</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceReadinessData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="service" stroke="#64748B" fontSize={10} />
                <YAxis domain={[80, 100]} stroke="#64748B" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A1228', borderColor: '#10B981', borderRadius: 8, fontSize: 11 }}
                />
                <Bar dataKey="readiness" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
