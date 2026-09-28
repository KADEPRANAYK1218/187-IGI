import React from 'react';
import { Map, Shield, Navigation, Compass, Radio, CheckCircle2 } from 'lucide-react';
import { STRATEGIC_LOCATIONS } from '../../data/locations';
import { GeoLocationItem } from '../../types';

interface BharatDetailPanelProps {
  onClose?: () => void;
  onSelectSector: (loc: GeoLocationItem) => void;
}

export const BharatDetailPanel: React.FC<BharatDetailPanelProps> = ({
  onClose,
  onSelectSector
}) => {
  const theaterCommands = [
    {
      name: 'Northern Strategic Theater',
      hq: 'Udhampur HQ / Ladakh Frontier',
      role: 'High-Altitude Frontier & Air Defense',
      color: '#FF9933',
      locations: STRATEGIC_LOCATIONS.filter(l => l.state === 'Jammu & Kashmir' || l.state === 'Ladakh')
    },
    {
      name: 'Western Defense Corridor',
      hq: 'Mumbai / Jodhpur / Ambala',
      role: 'Armor Staging, Air Defense & Arabian Sea Navy',
      color: '#38BDF8',
      locations: STRATEGIC_LOCATIONS.filter(l => l.state === 'Maharashtra' || l.state === 'Rajasthan' || l.state === 'Haryana')
    },
    {
      name: 'Eastern Himalayan & Coastal Command',
      hq: 'Fort William Kolkata / Tezpur AFS / Vizag',
      role: 'Joint Border Security & Bay of Bengal Maritime',
      color: '#10B981',
      locations: STRATEGIC_LOCATIONS.filter(l => l.state === 'West Bengal' || l.state === 'Assam' || l.state === 'Andhra Pradesh')
    },
    {
      name: 'Southern Maritime & Island Theater',
      hq: 'Port Blair (ANC) / Thiruvananthapuram (SAC)',
      role: 'Indian Ocean Sea Lines of Communication (SLOC)',
      color: '#22D3EE',
      locations: STRATEGIC_LOCATIONS.filter(l => l.state === 'Andaman & Nicobar Islands' || l.state === 'Kerala')
    }
  ];

  return (
    <div className="vajra-panel-elevated rounded-2xl p-5 border border-cyan-500/35 max-w-4xl w-full backdrop-blur-2xl shadow-2xl animate-fade-in" id="bharat-detail-panel">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-400">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg tracking-wide">
              BHARAT STRATEGIC THEATER COMMAND NETWORK
            </h3>
            <p className="text-xs font-tech text-cyan-300/70">
              UNIFIED TRI-SERVICE GEOSPATIAL SECTOR GRID & STRATEGIC HUB DIRECTORY
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

      {/* Theater Command Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-1">
        {theaterCommands.map(theater => (
          <div
            key={theater.name}
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-900">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: theater.color }}
                />
                <h4 className="font-display font-bold text-white text-sm">{theater.name}</h4>
              </div>
              <span className="text-[10px] font-mono-code text-cyan-300">
                {theater.locations.length} BASES
              </span>
            </div>

            <div className="text-xs text-slate-300">
              <div className="text-[11px] font-tech text-slate-400">COMMAND HQ:</div>
              <div className="text-white font-semibold">{theater.hq}</div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-tech text-slate-400">SECTOR NODES:</div>
              {theater.locations.map(loc => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => onSelectSector(loc)}
                  className="w-full p-2 rounded-lg bg-slate-900/60 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-left transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-semibold text-cyan-200 group-hover:text-cyan-100">
                      {loc.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-tech">
                      {loc.category} • {loc.state}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-code text-emerald-400 font-bold">
                    {loc.readinessScore}% READY
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
