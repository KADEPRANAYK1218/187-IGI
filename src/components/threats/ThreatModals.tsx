import React, { useState } from 'react';
import {
  X,
  Shield,
  AlertTriangle,
  Radio,
  Send,
  Download,
  CheckCircle2,
  Share2,
  FileText,
  Target,
  Maximize2,
  Plane,
  Crosshair,
  MapPin,
  Clock,
  Compass
} from 'lucide-react';

export interface ThreatItem {
  id: string;
  time: string;
  type: string;
  location: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'Active' | 'Investigating' | 'Contained' | 'Tracking' | 'Monitoring' | 'Resolved';
  source: string;
  altitude?: string;
  speed?: string;
  lat: number;
  lng: number;
  coordsText: string;
  alertText: string;
  details: string;
}

interface IncidentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: ThreatItem;
}

export const IncidentReportModal: React.FC<IncidentReportModalProps> = ({ isOpen, onClose, incident }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-950 border border-cyan-500/50 p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/60 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-base font-tech font-bold text-white tracking-wide">
                TACTICAL INCIDENT DOSSIER: {incident.id}
              </h2>
              <p className="text-xs font-mono-code text-cyan-400">
                BHARAT COMMAND NETWORK • CLASSIFICATION: SECRET // REL TO VAJRA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="my-5 space-y-4 text-xs font-mono-code">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-slate-400">STATUS</div>
              <div className="text-red-400 font-bold mt-1 uppercase">{incident.status}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-slate-400">SEVERITY</div>
              <div className="text-amber-400 font-bold mt-1 uppercase">{incident.severity}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-slate-400">SECTOR / LOC</div>
              <div className="text-cyan-300 font-bold mt-1">{incident.location}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-slate-400">TIMESTAMP</div>
              <div className="text-white font-bold mt-1">{incident.time} IST</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 space-y-2">
            <div className="text-cyan-400 font-bold flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-cyan-300" />
              TELEMETRIC TARGET SPECIFICATION
            </div>
            <div className="grid grid-cols-2 gap-y-1.5 text-slate-300">
              <div>Source Type: <span className="text-white">{incident.source}</span></div>
              <div>Geo-Coordinates: <span className="text-cyan-300">{incident.coordsText}</span></div>
              <div>Estimated Altitude: <span className="text-white">{incident.altitude || 'Surface level'}</span></div>
              <div>Radar Vector Velocity: <span className="text-white">{incident.speed || 'Static / Sub-sonic'}</span></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30">
            <div className="text-red-400 font-bold flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4" />
              COMMAND INTELLIGENCE ASSESSMENT
            </div>
            <p className="text-slate-200 leading-relaxed">
              {incident.alertText}. Cross-verified by radar sweeps and thermal imaging sensors. Ground intercept units and counter-UAS batteries in Northern Sector alerted.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-cyan-500/30">
          <div className="text-[11px] text-slate-500 font-mono-code">
            RECORD AUTHENTICATED BY VAJRA NEURAL CORE
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/50 rounded-lg text-xs font-tech font-bold text-cyan-200 flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              {downloaded ? 'DOSSIER EXPORTED' : 'DOWNLOAD DOSSIER (PDF)'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-tech text-white"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DroneSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  location?: string;
}

export const DroneSupportModal: React.FC<DroneSupportModalProps> = ({ isOpen, onClose, location = 'J&K Sector' }) => {
  const [dispatched, setDispatched] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState<'NAGASTRA' | 'HERON_MK2' | 'NETRA_V4'>('HERON_MK2');

  if (!isOpen) return null;

  const handleDispatch = () => {
    setDispatched(true);
    setTimeout(() => {
      setDispatched(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-950 border border-cyan-500/60 p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)]">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-tech font-bold text-white tracking-wide">
              DISPATCH TACTICAL DRONE SUPPORT
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-4 space-y-3 font-mono-code text-xs">
          <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-lg text-cyan-300">
            Target Operation Sector: <span className="font-bold text-white">{location}</span>
          </div>

          <div className="space-y-2">
            <div className="text-slate-400">SELECT SQUADRON ASSET:</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedDrone('HERON_MK2')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedDrone === 'HERON_MK2'
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-bold font-tech text-white">HERON MK-II</div>
                <div className="text-[10px] mt-1 text-slate-400">MALE Recon • 36h Endurance</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedDrone('NAGASTRA')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedDrone === 'NAGASTRA'
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-bold font-tech text-white">NAGASTRA-1</div>
                <div className="text-[10px] mt-1 text-slate-400">Loitering Munition • Precision</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedDrone('NETRA_V4')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedDrone === 'NETRA_V4'
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-bold font-tech text-white">NETRA V4+</div>
                <div className="text-[10px] mt-1 text-slate-400">Thermal Quad • Rapid Deploy</div>
              </button>
            </div>
          </div>

          <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Flight Route:</span>
              <span className="text-cyan-300">Vector Alpha-9 (Secure Corridor)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated On-Station:</span>
              <span className="text-emerald-400 font-bold">4.2 Minutes</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-cyan-500/30">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono-code text-slate-300"
          >
            CANCEL
          </button>
          <button
            onClick={handleDispatch}
            disabled={dispatched}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 border border-cyan-400 text-xs font-tech font-bold text-white flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            {dispatched ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                SQUADRON AIRBORNE!
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                CONFIRM DISPATCH
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface ShareIntelModalProps {
  isOpen: boolean;
  onClose: () => void;
  incidentTitle: string;
}

export const ShareIntelModal: React.FC<ShareIntelModalProps> = ({ isOpen, onClose, incidentTitle }) => {
  const [shared, setShared] = useState(false);

  if (!isOpen) return null;

  const handleShare = () => {
    setShared(true);
    setTimeout(() => {
      setShared(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-950 border border-cyan-500/60 p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)]">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-tech font-bold text-white tracking-wide">
              SHARE TACTICAL INTEL
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-4 space-y-3 font-mono-code text-xs">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
            <div className="text-slate-400">DISPATCH PACKAGE:</div>
            <div className="text-cyan-300 font-bold mt-0.5">{incidentTitle}</div>
          </div>

          <div>
            <div className="text-slate-400 mb-1.5">TRANSMIT TO RECIPIENTS:</div>
            <div className="space-y-1.5">
              {[
                { name: 'Northern Command HQ (Udhampur)', checked: true },
                { name: 'Air Operations Center (Western Air Command)', checked: true },
                { name: 'National Security Council Secretariat (NSCS)', checked: true },
                { name: 'Border Security Force (Special Operations)', checked: false }
              ].map((rec, i) => (
                <label key={i} className="flex items-center gap-2 p-2 bg-slate-900/60 border border-slate-800/80 rounded cursor-pointer">
                  <input type="checkbox" defaultChecked={rec.checked} className="accent-cyan-400 rounded" />
                  <span className="text-slate-300">{rec.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-cyan-500/30">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-xs font-mono-code text-slate-300"
          >
            CANCEL
          </button>
          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-tech font-bold text-white flex items-center gap-2"
          >
            {shared ? 'ENCRYPTED DISPATCH SENT' : 'TRANSMIT INTEL'}
          </button>
        </div>
      </div>
    </div>
  );
};
