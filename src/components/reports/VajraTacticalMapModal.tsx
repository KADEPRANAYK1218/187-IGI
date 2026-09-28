import React, { useState } from 'react';
import {
  Globe, X, Download, Filter, Compass, AlertTriangle,
  Shield, Radio, CheckCircle2, Crosshair, Layers, MapPin
} from 'lucide-react';
import { downloadFile } from '../../utils/fileDownloader';
import indiaNeuralMap from '../../assets/images/india_neural_cyber_map_1788703459745.jpg';

interface SectorIntel {
  id: string;
  name: string;
  topPct: number;
  leftPct: number;
  reportsCount: number;
  threats: number;
  incidents: number;
  status: 'Critical' | 'High' | 'Medium' | 'Low';
  coordinates: string;
  activeSurveillance: string;
  alertSummary: string;
}

interface VajraTacticalMapModalProps {
  onClose: () => void;
  onSelectRegion: (region: string) => void;
  onShowToast: (msg: string) => void;
}

export const VajraTacticalMapModal: React.FC<VajraTacticalMapModalProps> = ({
  onClose,
  onSelectRegion,
  onShowToast
}) => {
  const sectors: SectorIntel[] = [
    {
      id: 'jk',
      name: 'J&K (LoC)',
      topPct: 18,
      leftPct: 42,
      reportsCount: 32,
      threats: 18,
      incidents: 9,
      status: 'Critical',
      coordinates: '34.0837° N, 74.7973° E',
      activeSurveillance: 'Sector 7 UAV Swarm + FLIR Thermal',
      alertSummary: '32% rise in cross-border quadcopter activity along forward line of control.'
    },
    {
      id: 'punjab',
      name: 'Punjab',
      topPct: 28,
      leftPct: 36,
      reportsCount: 18,
      threats: 6,
      incidents: 8,
      status: 'High',
      coordinates: '31.1471° N, 75.3412° E',
      activeSurveillance: 'Highway Optical Corridor Anomaly Lock',
      alertSummary: 'IED detected along NH corridor; bomb disposal squad neutralization confirmed.'
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      topPct: 38,
      leftPct: 28,
      reportsCount: 22,
      threats: 8,
      incidents: 4,
      status: 'Medium',
      coordinates: '27.0238° N, 74.2179° E',
      activeSurveillance: 'Desert Command Thermal Satellite Lock',
      alertSummary: 'Unapproved vehicle night convoy tracked moving outside designated corridor.'
    },
    {
      id: 'gujarat',
      name: 'Gujarat',
      topPct: 50,
      leftPct: 22,
      reportsCount: 16,
      threats: 4,
      incidents: 5,
      status: 'Medium',
      coordinates: '22.2587° N, 71.1924° E',
      activeSurveillance: 'Rann of Kutch Coastal Radar & Sonar',
      alertSummary: 'Unflagged trawler anomaly tracked 12 nautical miles off coastal marshlands.'
    },
    {
      id: 'maharashtra',
      name: 'Maharashtra',
      topPct: 60,
      leftPct: 36,
      reportsCount: 14,
      threats: 5,
      incidents: 3,
      status: 'Low',
      coordinates: '19.7515° N, 75.7139° E',
      activeSurveillance: 'Western Cyber Switch Gateway Monitor',
      alertSummary: 'Automated quantum firewall blocked credential stuffing probes.'
    },
    {
      id: 'ladakh',
      name: 'Ladakh',
      topPct: 15,
      leftPct: 48,
      reportsCount: 11,
      threats: 3,
      incidents: 1,
      status: 'Low',
      coordinates: '34.1526° N, 77.5771° E',
      activeSurveillance: 'High-Altitude 14th Corps Optical Post',
      alertSummary: 'Routine perimeter reconnaissance clear; low cloud ceiling impacting drones.'
    },
    {
      id: 'odisha',
      name: 'Odisha',
      topPct: 55,
      leftPct: 64,
      reportsCount: 10,
      threats: 2,
      incidents: 2,
      status: 'Low',
      coordinates: '20.9517° N, 85.0985° E',
      activeSurveillance: 'Eastern Seaboard Radar Link',
      alertSummary: 'All coastal radar telemetry operational; naval liaison synchronized.'
    },
    {
      id: 'delhi',
      name: 'Delhi HQ',
      topPct: 34,
      leftPct: 41,
      reportsCount: 24,
      threats: 9,
      incidents: 4,
      status: 'High',
      coordinates: '28.6139° N, 77.2090° E',
      activeSurveillance: 'Tri-Services Central Cyber Defense Node',
      alertSummary: 'High volume packet inspection active; nodal routing secured.'
    }
  ];

  const [selectedSector, setSelectedSector] = useState<SectorIntel>(sectors[0]);
  const [layers, setLayers] = useState({
    radar: true,
    thermal: true,
    satellite: true
  });

  const handleFilterBySector = () => {
    onSelectRegion(selectedSector.name);
    onShowToast(`Filtered reports dashboard to ${selectedSector.name}`);
    onClose();
  };

  const handleDownloadSectorIntel = () => {
    const intelData = {
      sector_id: selectedSector.id,
      sector_name: selectedSector.name,
      geo_coordinates: selectedSector.coordinates,
      timestamp: new Date().toISOString(),
      threat_level: selectedSector.status,
      total_active_reports: selectedSector.reportsCount,
      threat_incidents: selectedSector.threats,
      incident_reports: selectedSector.incidents,
      active_surveillance_assets: selectedSector.activeSurveillance,
      tactical_summary: selectedSector.alertSummary,
      ai_threat_forecast: 'Elevated monitoring recommended across night operational cycle.'
    };

    downloadFile(
      `VAJRA_Sector_Intel_${selectedSector.id.toUpperCase()}.json`,
      JSON.stringify(intelData, null, 2),
      'application/json'
    );
    onShowToast(`Geospatial Intel Pack for ${selectedSector.name} downloaded (.json)`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-5xl bg-[#020b1c] border border-cyan-500/60 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.35)] overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Header */}
        <div className="p-4 bg-[#031533] border-b border-cyan-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/90 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-tech font-bold text-white tracking-wider flex items-center gap-2">
                <span>BHARAT CYBER TACTICAL RECONNAISSANCE MAP</span>
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-[9px] font-mono-code text-cyan-300">
                  LIVE TELEMETRY
                </span>
              </h3>
              <p className="text-[10px] font-mono-code text-cyan-400">
                MULTI-SECTOR SURVEILLANCE & REGIONAL THREAT DENSITY
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tactical Telemetry HUD Bar */}
        <div className="px-4 py-2 bg-[#020e24] border-b border-slate-800 flex flex-wrap items-center justify-between text-[10px] font-mono-code gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span>ACTIVE SECTOR: <strong className="text-cyan-300">{selectedSector.name}</strong></span>
            <span>COORDS: <strong className="text-white">{selectedSector.coordinates}</strong></span>
            <span>REPORTS: <strong className="text-amber-300">{selectedSector.reportsCount}</strong></span>
          </div>

          {/* Layer toggles */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">LAYERS:</span>
            <button
              onClick={() => setLayers(l => ({ ...l, radar: !l.radar }))}
              className={`px-2 py-0.5 rounded text-[9px] font-bold border transition cursor-pointer ${
                layers.radar
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              Radar Sweep
            </button>
            <button
              onClick={() => setLayers(l => ({ ...l, thermal: !l.thermal }))}
              className={`px-2 py-0.5 rounded text-[9px] font-bold border transition cursor-pointer ${
                layers.thermal
                  ? 'bg-orange-950 border-orange-400 text-orange-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              Thermal Heatmap
            </button>
            <button
              onClick={() => setLayers(l => ({ ...l, satellite: !l.satellite }))}
              className={`px-2 py-0.5 rounded text-[9px] font-bold border transition cursor-pointer ${
                layers.satellite
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              Satellite Lock
            </button>
          </div>
        </div>

        {/* Main Content: Map Visual (Left) + Sector Detail Panel (Right) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[380px]">
          {/* Map Interactive Canvas */}
          <div className="relative flex-1 bg-[#010814] flex items-center justify-center p-4 overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#031533_1px,transparent_1px),linear-gradient(to_bottom,#031533_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

            {/* Radar Circular Overlay if active */}
            {layers.radar && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[320px] h-[320px] rounded-full border border-cyan-400 animate-spin duration-[8s]" />
              </div>
            )}

            {/* Glowing Map of India */}
            <div className="relative w-full max-w-md h-[340px] sm:h-[400px] flex items-center justify-center">
              <img
                src={indiaNeuralMap}
                alt="Bharat Tactical Cyber Map"
                className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(6,182,212,0.45)]"
                referrerPolicy="no-referrer"
              />

              {/* Interactive Sector Hotspot Nodes */}
              {sectors.map((sector) => {
                const isSelected = selectedSector.id === sector.id;
                const isCritical = sector.status === 'Critical';
                const isHigh = sector.status === 'High';

                return (
                  <button
                    key={sector.id}
                    onClick={() => setSelectedSector(sector)}
                    style={{ top: `${sector.topPct}%`, left: `${sector.leftPct}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer p-1.5 focus:outline-none"
                  >
                    {/* Pulsing ring */}
                    <span
                      className={`w-6 h-6 rounded-full absolute -top-0.5 -left-0.5 animate-ping opacity-75 ${
                        isCritical ? 'bg-red-500' : isHigh ? 'bg-orange-500' : 'bg-cyan-400'
                      }`}
                    />

                    {/* Core node dot */}
                    <div
                      className={`relative w-4 h-4 rounded-full border flex items-center justify-center transition-transform group-hover:scale-125 ${
                        isSelected
                          ? 'ring-4 ring-cyan-400/50 scale-125'
                          : ''
                      } ${
                        isCritical
                          ? 'bg-red-500 border-red-200 shadow-[0_0_12px_#ef4444]'
                          : isHigh
                          ? 'bg-orange-500 border-orange-200 shadow-[0_0_12px_#f97316]'
                          : 'bg-cyan-400 border-cyan-100 shadow-[0_0_12px_#22d3ee]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Sector Tooltip on hover/select */}
                    <div
                      className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded-lg border text-[10px] font-mono-code font-bold transition z-20 pointer-events-none ${
                        isSelected
                          ? 'bg-black/90 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                          : 'bg-black/75 border-slate-700 text-slate-300 group-hover:border-slate-500'
                      }`}
                    >
                      {sector.name} ({sector.reportsCount})
                    </div>
                  </button>
                );
              })}

              {/* Compass Rose */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 opacity-60 pointer-events-none text-cyan-400 font-mono-code text-[10px]">
                <Compass className="w-5 h-5" />
                <span>BHARAT CYBER GRID</span>
              </div>
            </div>
          </div>

          {/* Sector Detail Panel (Right) */}
          <div className="w-full lg:w-80 p-4 bg-[#020e24] border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-3.5 text-xs font-mono-code">
              {/* Sector Header */}
              <div className="pb-3 border-b border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                    TARGET SECTOR
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[8.5px] font-bold ${
                      selectedSector.status === 'Critical'
                        ? 'bg-red-950 border border-red-500 text-red-400 animate-pulse'
                        : selectedSector.status === 'High'
                        ? 'bg-orange-950 border border-orange-500 text-orange-400'
                        : 'bg-cyan-950 border border-cyan-500 text-cyan-300'
                    }`}
                  >
                    {selectedSector.status} Alert
                  </span>
                </div>
                <h4 className="text-base font-tech font-bold text-white">
                  {selectedSector.name}
                </h4>
                <p className="text-[10px] text-cyan-400 mt-0.5">
                  Coordinates: {selectedSector.coordinates}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-xl bg-[#031533] border border-slate-800">
                  <span className="block text-[9px] text-slate-400 uppercase">Total Reports</span>
                  <span className="text-base font-tech font-bold text-white">{selectedSector.reportsCount}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#031533] border border-slate-800">
                  <span className="block text-[9px] text-slate-400 uppercase">Threat Detections</span>
                  <span className="text-base font-tech font-bold text-red-400">{selectedSector.threats}</span>
                </div>
              </div>

              {/* Active Surveillance Asset */}
              <div>
                <span className="text-[10px] text-slate-400 block mb-1 uppercase tracking-wider">
                  SURVEILLANCE ASSET LOCK
                </span>
                <div className="p-2.5 rounded-xl bg-[#031533] border border-cyan-500/30 text-[11px] text-cyan-200 flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{selectedSector.activeSurveillance}</span>
                </div>
              </div>

              {/* Tactical Summary */}
              <div>
                <span className="text-[10px] text-slate-400 block mb-1 uppercase tracking-wider">
                  TACTICAL SUMMARY
                </span>
                <p className="p-2.5 rounded-xl bg-[#031533] border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                  {selectedSector.alertSummary}
                </p>
              </div>

              {/* Quick Sector Select List */}
              <div>
                <span className="text-[10px] text-slate-400 block mb-1 uppercase tracking-wider">
                  SWITCH SECTOR
                </span>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  {sectors.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSector(s)}
                      className={`p-1.5 rounded-lg border text-left transition cursor-pointer truncate ${
                        selectedSector.id === s.id
                          ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-[#031533] border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 space-y-2 mt-4">
              <button
                onClick={handleFilterBySector}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-tech font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filter Reports by {selectedSector.name}</span>
              </button>

              <button
                onClick={handleDownloadSectorIntel}
                className="w-full py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400 text-cyan-300 font-mono-code font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sector Intel (.json)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
