import React, { useState } from 'react';
import { 
  UserCheck, 
  Truck, 
  ScanFace, 
  Scan, 
  ShieldAlert, 
  Eye, 
  Moon, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Radio, 
  Crosshair, 
  Clock, 
  Zap, 
  Info 
} from 'lucide-react';
import { 
  HUMAN_DETECTIONS, 
  VEHICLE_ANALYTICS, 
  FACE_DETECTIONS, 
  ANPR_MATCHES, 
  VIRTUAL_FENCE_DATA, 
  SUSPICIOUS_ACTIVITIES, 
  NIGHT_MOVEMENTS 
} from '../../data/surveillanceData';
import { AiDetectionSubCategory } from '../../types/surveillance';
import { useSettings } from '../../context/SettingsContext';

interface AiDetectionHubViewProps {
  initialCategory?: AiDetectionSubCategory;
  onSelectCameraClip?: (cameraId: string) => void;
}

export const AiDetectionHubView: React.FC<AiDetectionHubViewProps> = ({
  initialCategory = 'HUMAN',
  onSelectCameraClip
}) => {
  const { theme } = useSettings();
  const isLight = theme === 'Light';

  const [activeCategory, setActiveCategory] = useState<AiDetectionSubCategory>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [vehicleFilter, setVehicleFilter] = useState<string>('ALL');

  const categories = [
    { id: 'HUMAN', label: 'Human Detection & Tracking', count: HUMAN_DETECTIONS.length, icon: UserCheck, color: 'text-cyan-400' },
    { id: 'VEHICLE', label: 'Vehicle Analytics', count: VEHICLE_ANALYTICS.length, icon: Truck, color: 'text-blue-400' },
    { id: 'FACE', label: 'Face Detection (Biometric)', count: FACE_DETECTIONS.length, icon: ScanFace, color: 'text-purple-400' },
    { id: 'ANPR', label: 'ANPR License Plate Recognition', count: ANPR_MATCHES.length, icon: Scan, color: 'text-amber-400' },
    { id: 'VIRTUAL_FENCE', label: 'Virtual Fence & Perimeter', count: VIRTUAL_FENCE_DATA.length, icon: ShieldAlert, color: 'text-red-400' },
    { id: 'SUSPICIOUS', label: 'Suspicious Activity Detection', count: SUSPICIOUS_ACTIVITIES.length, icon: Eye, color: 'text-rose-400' },
    { id: 'NIGHT_MOVEMENT', label: 'Night Movement & Thermal', count: NIGHT_MOVEMENTS.length, icon: Moon, color: 'text-emerald-400' }
  ];

  return (
    <div className="w-full space-y-4 font-tech">
      {/* Category Navigation Pills */}
      <div className={`p-2 rounded-xl border flex items-center gap-1.5 overflow-x-auto ${
        isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#020b1c]/90 border-cyan-500/40'
      }`}>
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as AiDetectionSubCategory);
                setSearchTerm('');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-mono-code font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white shadow-md border border-cyan-400'
                  : isLight 
                    ? 'text-slate-700 hover:bg-slate-100' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : cat.color}`} />
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive ? 'bg-white/20 text-white' : 'bg-black/30 text-slate-300 border border-white/10'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* AI Simulation Disclaimer Banner */}
      <div className={`px-3 py-2 rounded-lg border flex items-center justify-between text-xs font-mono-code ${
        isLight ? 'bg-cyan-50 border-cyan-200 text-cyan-900' : 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300'
      }`}>
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>AI DETECTION ENGINE:</strong> Neural object detection (YOLOv8 + ByteTrack & DeepSORT) processing edge CCTV video streams. Biometric & high-risk models operate under strict authorized command protocols.
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-black/40 text-[9px] font-bold tracking-widest text-cyan-300 border border-cyan-400/40">
          PROTOTYPE / SIMULATION ACTIVE
        </span>
      </div>

      {/* ======================= SECTION 1: HUMAN DETECTION & TRACKING ======================= */}
      {activeCategory === 'HUMAN' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {HUMAN_DETECTIONS.map(item => (
              <div 
                key={item.id}
                className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 transition hover:scale-[1.01] ${
                  isLight ? 'bg-white border-slate-300 shadow-sm text-slate-900' : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
                }`}
              >
                <div className="flex items-center justify-between border-b pb-2 border-slate-700/40">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-bold font-tech text-cyan-300">
                      {item.objectId}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono-code font-bold animate-pulse">
                    {item.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs font-mono-code">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Camera:</span>
                    <span className="font-bold text-slate-200">{item.cameraName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Zone:</span>
                    <span className="text-slate-300 truncate max-w-[140px]">{item.zone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Confidence:</span>
                    <span className="font-bold text-emerald-400">{item.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dwell Time:</span>
                    <span className="text-cyan-300">{item.dwellTimeSeconds}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Timestamp:</span>
                    <span className="text-slate-300">{item.timestamp}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] font-mono-code">
                  <span className="text-amber-400/80">PROTOTYPE SIMULATION</span>
                  <button
                    onClick={() => onSelectCameraClip && onSelectCameraClip(item.cameraId)}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>VIEW FEED</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= SECTION 2: VEHICLE ANALYTICS ======================= */}
      {activeCategory === 'VEHICLE' && (
        <div className="space-y-3">
          {/* Classification breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {['Car', 'Truck', 'Bus', 'Motorcycle', 'Unknown'].map(cat => {
              const count = VEHICLE_ANALYTICS.filter(v => v.category === cat).length;
              return (
                <div 
                  key={cat}
                  className={`p-3 rounded-xl border text-center ${
                    isLight ? 'bg-white border-slate-300' : 'bg-[#020b1c] border-cyan-500/30'
                  }`}
                >
                  <div className="text-[10px] font-mono-code text-slate-400 uppercase">{cat}</div>
                  <div className="text-2xl font-black font-tech text-blue-400">{count}</div>
                </div>
              );
            })}
          </div>

          {/* Vehicle Table */}
          <div className={`rounded-xl border overflow-hidden ${
            isLight ? 'bg-white border-slate-300 text-slate-900 shadow-sm' : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
          }`}>
            <table className="w-full text-left border-collapse text-xs font-mono-code">
              <thead>
                <tr className={isLight ? 'bg-slate-100 border-b border-slate-300 text-slate-700' : 'bg-slate-900 border-b border-slate-800 text-cyan-300'}>
                  <th className="p-3">Vehicle ID</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">License Plate</th>
                  <th className="p-3">Camera</th>
                  <th className="p-3">Speed Estimate</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {VEHICLE_ANALYTICS.map(veh => (
                  <tr key={veh.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-3 font-bold text-blue-400">{veh.vehicleId}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                        {veh.category}
                      </span>
                    </td>
                    <td className="p-3 font-tech font-bold text-amber-300">{veh.licensePlate || 'N/A'}</td>
                    <td className="p-3 text-slate-300">{veh.cameraName}</td>
                    <td className="p-3 text-cyan-300">{veh.speedKmh} km/h</td>
                    <td className="p-3 text-emerald-400 font-bold">{veh.confidence}%</td>
                    <td className="p-3 text-slate-400">{veh.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================= SECTION 3: FACE DETECTION ======================= */}
      {activeCategory === 'FACE' && (
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-mono-code text-amber-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>CONFIDENTIAL BIOMETRIC ENGINE — STRICT AUDIT MODE ONLY. PROTOTYPE / SIMULATION.</span>
            </span>
            <span className="font-bold">3 SENSORS ENGAGED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {FACE_DETECTIONS.map(face => (
              <div 
                key={face.id}
                className={`p-4 rounded-xl border flex flex-col space-y-3 ${
                  isLight ? 'bg-white border-slate-300' : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
                }`}
              >
                <div className="flex items-center justify-between border-b pb-2 border-slate-700/40">
                  <div className="flex items-center gap-2">
                    <ScanFace className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-bold font-tech text-white">
                      {face.personTag}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                    face.recognitionStatus === 'IDENTIFIED_WATCHLIST'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {face.recognitionStatus.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-mono-code">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Camera Source:</span>
                    <span className="text-slate-200">{face.cameraName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Match Confidence:</span>
                    <span className="text-emerald-400 font-bold">{face.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Faces in Scene:</span>
                    <span className="text-cyan-300">{face.detectionCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Capture Time:</span>
                    <span className="text-slate-300">{face.timestamp}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/40 text-[10px] font-mono-code text-slate-400">
                  <span>VECTOR HASH: 7e81...09a • PROTOTYPE / SIMULATION</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= SECTION 4: ANPR ======================= */}
      {activeCategory === 'ANPR' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ANPR_MATCHES.map(anpr => (
              <div 
                key={anpr.id}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                  anpr.watchlistStatus === 'WATCHLIST_MATCH'
                    ? 'bg-red-950/40 border-red-500/50 shadow-lg text-white'
                    : isLight 
                      ? 'bg-white border-slate-300' 
                      : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b pb-2 border-slate-700/40">
                    <span className="text-xs font-mono-code text-slate-400">PLATE RECOGNITION</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                      anpr.watchlistStatus === 'WATCHLIST_MATCH'
                        ? 'bg-red-600 text-white animate-pulse'
                        : anpr.watchlistStatus === 'FLAGGED_ALERT'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {anpr.watchlistStatus.replace('_', ' ')}
                    </span>
                  </div>

                  {/* High Visibility Plate Display */}
                  <div className="my-3 px-3 py-2 rounded-lg bg-amber-400 text-black font-black font-mono-code text-center text-lg tracking-widest border-2 border-amber-500 shadow-md">
                    {anpr.plate}
                  </div>

                  <div className="space-y-1 text-xs font-mono-code">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type:</span>
                      <span className="text-slate-200">{anpr.vehicleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Camera:</span>
                      <span className="text-slate-200">{anpr.camera}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Confidence:</span>
                      <span className="text-emerald-400 font-bold">{anpr.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Time:</span>
                      <span className="text-slate-300">{anpr.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded bg-black/40 border border-white/10 text-[11px] font-mono-code text-slate-300">
                  {anpr.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= SECTION 5: VIRTUAL FENCE ======================= */}
      {activeCategory === 'VIRTUAL_FENCE' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VIRTUAL_FENCE_DATA.map(vf => (
              <div 
                key={vf.id}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                  vf.fenceStatus === 'TRIPPED'
                    ? 'bg-red-950/40 border-red-500/60 shadow-lg text-white'
                    : isLight 
                      ? 'bg-white border-slate-300' 
                      : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b pb-2 border-slate-700/40">
                    <span className="text-sm font-bold font-tech text-white">{vf.areaName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                      vf.fenceStatus === 'TRIPPED'
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {vf.fenceStatus === 'TRIPPED' ? 'INTRUSION DETECTED' : 'VIRTUAL FENCE ACTIVE'}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1 text-xs font-mono-code">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Boundary:</span>
                      <span className="text-slate-200">{vf.virtualBoundary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Camera Sensor:</span>
                      <span className="text-cyan-400 font-bold">{vf.camera}</span>
                    </div>
                  </div>

                  {/* Intrusion Events */}
                  <div className="mt-3 space-y-1.5">
                    <span className="text-[11px] font-mono-code font-bold text-slate-300">
                      Recent Intrusion Events:
                    </span>
                    {vf.intrusionEvents.length > 0 ? (
                      vf.intrusionEvents.map(evt => (
                        <div key={evt.eventId} className="p-2 rounded bg-black/50 border border-red-500/40 text-xs font-mono-code space-y-0.5">
                          <div className="flex justify-between text-red-400 font-bold">
                            <span>{evt.eventId}</span>
                            <span>{evt.severity}</span>
                          </div>
                          <div className="text-slate-200">{evt.targetType} ({evt.confidence}%)</div>
                          <div className="text-[10px] text-slate-400">{evt.timestamp}</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 rounded bg-black/30 text-slate-400 text-xs font-mono-code">
                        No active fence violations detected in current shift.
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/40 text-[10px] font-mono-code text-cyan-400 flex justify-between items-center">
                  <span>LASER TRIPWIRE + OPTICAL MESH</span>
                  <span>STATUS: 100% ARMED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= SECTION 6: SUSPICIOUS ACTIVITY ======================= */}
      {activeCategory === 'SUSPICIOUS' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUSPICIOUS_ACTIVITIES.map(sus => (
              <div 
                key={sus.id}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                  sus.severity === 'CRITICAL'
                    ? 'bg-red-950/30 border-red-500/50 text-white'
                    : isLight 
                      ? 'bg-white border-slate-300' 
                      : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b pb-2 border-slate-700/40">
                    <span className="text-xs font-mono-code font-bold text-rose-400">{sus.eventId}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                      sus.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {sus.severity}
                    </span>
                  </div>

                  <div className="my-2">
                    <span className="text-sm font-bold font-tech text-white">
                      {sus.category}
                    </span>
                    <p className="text-xs font-mono-code text-slate-300 mt-1 leading-relaxed">
                      {sus.description}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs font-mono-code">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Camera:</span>
                      <span className="text-slate-200">{sus.camera}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">AI Confidence:</span>
                      <span className="text-emerald-400 font-bold">{sus.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timestamp:</span>
                      <span className="text-slate-300">{sus.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/40 flex justify-between items-center text-xs font-mono-code">
                  <span className="text-amber-400 font-bold">{sus.status}</span>
                  <span className="text-[10px] text-slate-400">EDGE CLASSIFICATION</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================= SECTION 7: NIGHT MOVEMENT ======================= */}
      {activeCategory === 'NIGHT_MOVEMENT' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {NIGHT_MOVEMENTS.map(nm => (
              <div 
                key={nm.id}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                  isLight ? 'bg-white border-slate-300' : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b pb-2 border-slate-700/40">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-bold font-tech text-white">
                        {nm.objectType}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-mono-code font-bold">
                      {nm.alertStatus}
                    </span>
                  </div>

                  <div className="my-2 space-y-1 text-xs font-mono-code">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Camera Sensor:</span>
                      <span className="text-cyan-400 font-bold">{nm.camera}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Thermal Signature:</span>
                      <span className="text-emerald-300">{nm.thermalIntensity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Confidence:</span>
                      <span className="text-emerald-400 font-bold">{nm.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timestamp:</span>
                      <span className="text-slate-300">{nm.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded bg-black/40 border border-white/10 text-[10px] font-mono-code text-cyan-300 flex justify-between">
                  <span>FLIR LWIR SENSOR UNCOOLED</span>
                  <span>LOW-LIGHT ENHANCED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
