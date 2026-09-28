import React, { useState } from 'react';
import { 
  CloudRain, Wind, Eye, ArrowRight, CloudSun, Sun, Cloud, 
  CloudLightning, Compass, Radio, Bell, BellRing, RefreshCw, 
  Check, X, ChevronDown, ChevronUp, MapPin, ShieldCheck, AlertTriangle, 
  Thermometer, Gauge, Droplets, Layers, Shield, CheckCircle2,
  Activity, Clock, Send, Download
} from 'lucide-react';
import { useWeatherLocation, PRESET_SECTORS } from '../../context/WeatherLocationContext';

export interface TacticalWeatherSector {
  id: string;
  name: string;
  code: string;
  region: string;
  coordinates: string;
  commander: string;
  category: 'Optimal' | 'Monitored' | 'Precipitation' | 'Extreme';
  temp: number;
  feelsLike: number;
  condition: string;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressure: number;
  visibility: number;
  precipitation: number;
  flightReadiness: number;
  statusText: string;
  badgeStyle: string;
  uavEnvelope: string;
  uavStatus: 'CLEAR' | 'ADVISORY' | 'RESTRICTED';
  opticsStatus: string;
  ballisticsCorrection: string;
  groundTrafficability: string;
  commandUnit: string;
  phases: { name: string; time: string; completed: boolean }[];
}

export const WeatherIntelligenceWidget: React.FC = () => {
  const {
    location,
    weather,
    notificationsEnabled,
    notificationIntervalSec,
    notificationHistory,
    browserNotificationPermission,
    requestLiveLocation,
    selectPresetSector,
    refreshWeather,
    setNotificationsEnabled,
    setNotificationIntervalSec,
    requestBrowserNotifications,
    triggerTestNotification
  } = useWeatherLocation();

  const [showSectorMenu, setShowSectorMenu] = useState<boolean>(false);
  const [showNotifMenu, setShowNotifMenu] = useState<boolean>(false);
  const [showViewAllModal, setShowViewAllModal] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [advisorySentToast, setAdvisorySentToast] = useState<string | null>(null);

  // Modal State matching Mission Status format
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'ALL' | 'Optimal' | 'Monitored' | 'Precipitation' | 'Extreme'>('ALL');
  const [expandedSectorId, setExpandedSectorId] = useState<string | null>('sec-srinagar');
  const [sectorSearchQuery, setSectorSearchQuery] = useState<string>('');

  const handleManualRefresh = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsRefreshing(true);
    await refreshWeather();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleDispatchAdvisory = (sectorName: string) => {
    triggerTestNotification();
    setAdvisorySentToast(`Advisory dispatched to ${sectorName} tactical command!`);
    setTimeout(() => setAdvisorySentToast(null), 3500);
  };

  // Select dynamic weather icon
  const getWeatherIcon = (code: number, condition: string) => {
    if (code === 0) return <Sun className="w-5 h-5 text-amber-300 animate-spin-slow" />;
    if (code === 1 || code === 2) return <CloudSun className="w-5 h-5 text-amber-300" />;
    if (code === 3) return <Cloud className="w-5 h-5 text-slate-300" />;
    if (code >= 51 && code <= 67) return <CloudRain className="w-5 h-5 text-blue-400" />;
    if (code >= 80 && code <= 82) return <CloudRain className="w-5 h-5 text-cyan-400" />;
    if (code >= 95) return <CloudLightning className="w-5 h-5 text-yellow-400" />;
    if (code === 45 || code === 48) return <Eye className="w-5 h-5 text-indigo-300" />;
    return <CloudSun className="w-5 h-5 text-amber-300" />;
  };

  // Strategic Border Sectors Dataset matching Mission Status Format
  const tacticalSectors: TacticalWeatherSector[] = [
    {
      id: 'sec-live',
      name: location.isLiveGps ? `${location.name} (Live GPS Hub)` : `${location.name} (Current Theater)`,
      code: 'SEC-LIVE-00',
      region: location.stateOrRegion || 'Operational Theater',
      coordinates: `${location.latitude.toFixed(2)}°N ${location.longitude.toFixed(2)}°E`,
      commander: 'Col. R. S. Rathore, Theater HQ',
      category: weather.precipitation > 0 ? 'Precipitation' : weather.windSpeed > 35 ? 'Extreme' : weather.visibility < 5 ? 'Monitored' : 'Optimal',
      temp: weather.temperature,
      feelsLike: weather.temperature + 1,
      condition: weather.condition,
      weatherCode: weather.weatherCode,
      windSpeed: weather.windSpeed,
      windDirection: weather.windDirection,
      humidity: weather.humidity,
      pressure: weather.pressure,
      visibility: weather.visibility,
      precipitation: weather.precipitation,
      flightReadiness: weather.windSpeed > 30 ? 65 : weather.precipitation > 1 ? 75 : 94,
      statusText: weather.precipitation > 0 ? 'PRECIPITATION ADVISORY' : 'OPTIMAL FLIGHT ENVELOPE',
      badgeStyle: weather.precipitation > 0 ? 'text-blue-400 bg-blue-950/80 border-blue-500/50' : 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50',
      uavEnvelope: weather.windSpeed > 30 ? 'RESTRICTED (High Wind Gusts)' : 'CLEAR FOR DEPLOYMENT (Low Turbulence)',
      uavStatus: weather.windSpeed > 30 ? 'RESTRICTED' : 'CLEAR',
      opticsStatus: weather.visibility < 5 ? 'IR / THERMAL PRIORITY' : 'FULL OPTICAL SPECTRUM',
      ballisticsCorrection: `Air density computed: ${(weather.pressure / (2.87 * (weather.temperature + 273.15))).toFixed(2)} kg/m³`,
      groundTrafficability: weather.precipitation > 2 ? 'MUD BOGGING WARNING' : 'FIRM / HIGH MOBILITY',
      commandUnit: 'Integrated Tactical Command',
      phases: [
        { name: '06:00 - 12:00: Early Morning Atmospheric Calibration', time: '06:00', completed: true },
        { name: '12:00 - 18:00: Midday Thermal Stability & Radar Sweep', time: '12:00', completed: true },
        { name: '18:00 - 24:00: Evening Dew & Infrared Sensor Transition', time: '18:00', completed: false }
      ]
    },
    {
      id: 'sec-srinagar',
      name: 'Srinagar Strategic Command Hub',
      code: 'SEC-SRN-15',
      region: 'Jammu & Kashmir • HQ 15 Corps',
      coordinates: '34.08°N 74.80°E • Badami Bagh',
      commander: 'Lt. Gen. K. S. Raju, 15 Corps Commander',
      category: 'Optimal',
      temp: 18,
      feelsLike: 18,
      condition: 'Clear Skies & Light Alpine Breeze',
      weatherCode: 0,
      windSpeed: 8,
      windDirection: 210,
      humidity: 48,
      pressure: 1014,
      visibility: 10,
      precipitation: 0,
      flightReadiness: 96,
      statusText: 'OPTIMAL FLIGHT ENVELOPE',
      badgeStyle: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50',
      uavEnvelope: 'CLEAR FOR DEPLOYMENT — Low turbulence index',
      uavStatus: 'CLEAR',
      opticsStatus: 'FULL OPTICAL SPECTRUM — 100% Day/Night clarity',
      ballisticsCorrection: 'Air density: 1.20 kg/m³ • Zero wind deflection',
      groundTrafficability: 'FIRM DRY TERRAIN — 100% Motorized Mobility',
      commandUnit: '15 Corps Strike Wing',
      phases: [
        { name: '06:00 - 12:00: Valley Mist Clearing & UAV Launch', time: '06:00', completed: true },
        { name: '12:00 - 18:00: High-Altitude Tactical Patrol', time: '12:00', completed: true },
        { name: '18:00 - 24:00: Night Vision Sensor Calibration', time: '18:00', completed: false }
      ]
    },
    {
      id: 'sec-siachen',
      name: 'Siachen Glacier Command Post',
      code: 'SEC-SCN-84',
      region: 'Ladakh Sector • Highest Battlefield (19,800 ft)',
      coordinates: '35.50°N 77.00°E • Saltoro Ridge',
      commander: 'Col. K. N. Chewang, Ladakh Scouts',
      category: 'Extreme',
      temp: -28,
      feelsLike: -36,
      condition: 'Sub-Zero Blizzard & Ridge Gale',
      weatherCode: 95,
      windSpeed: 42,
      windDirection: 340,
      humidity: 82,
      pressure: 540,
      visibility: 1.5,
      precipitation: 4.2,
      flightReadiness: 34,
      statusText: 'HIGH ALTITUDE BLIZZARD HOLD',
      badgeStyle: 'text-red-400 bg-red-950/80 border-red-500/50',
      uavEnvelope: 'RESTRICTED — Severe icing & wind shear exceeds safety limits',
      uavStatus: 'RESTRICTED',
      opticsStatus: 'IR / CRYOGENIC THERMAL ONLY — Zero optical spectrum',
      ballisticsCorrection: 'Air density: 0.74 kg/m³ • Severe crosswind compensation',
      groundTrafficability: 'DEEP SNOW & CREVASSE RISK — Snowshoe/Cheetah air-drop only',
      commandUnit: 'High Altitude Warfare SFF',
      phases: [
        { name: '06:00 - 12:00: Cryo-Armor Pre-Heat & Oxygen Pod Verification', time: '06:00', completed: true },
        { name: '12:00 - 18:00: Ridge Sonar Acoustic Sweep in Blizzard', time: '12:00', completed: true },
        { name: '18:00 - 24:00: Avalanche Monitoring Corridor Alert', time: '18:00', completed: false }
      ]
    },
    {
      id: 'sec-jaisalmer',
      name: 'Thar Desert Armoured Battle Group',
      code: 'SEC-JSL-12',
      region: 'Rajasthan Border • Southern Command',
      coordinates: '26.92°N 70.91°E • Thar Outpost',
      commander: 'Brig. S. K. Rathore, 12 Armoured Brigade',
      category: 'Optimal',
      temp: 36,
      feelsLike: 38,
      condition: 'Intense Sunlight & Dry Heat Wave',
      weatherCode: 0,
      windSpeed: 14,
      windDirection: 180,
      humidity: 22,
      pressure: 1008,
      visibility: 12,
      precipitation: 0,
      flightReadiness: 92,
      statusText: 'HIGH THERMAL CLEAR AIR',
      badgeStyle: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50',
      uavEnvelope: 'CLEAR FOR DEPLOYMENT — Thermal updraft warning at noon',
      uavStatus: 'CLEAR',
      opticsStatus: 'FULL OPTICAL & FLIR ACTIVE — Mirages filtered by AI',
      ballisticsCorrection: 'Air density: 1.14 kg/m³ • Heat shimmer compensated',
      groundTrafficability: 'HARD DESERT CRUST & DUNE DRIFT — Tank tracks nominal',
      commandUnit: '10 Para SF & Armoured Column',
      phases: [
        { name: '06:00 - 12:00: Dawn Dune Recon Patrol & UAV Staging', time: '06:00', completed: true },
        { name: '12:00 - 18:00: High-Temperature Engine Cooling Protocol', time: '12:00', completed: true },
        { name: '18:00 - 24:00: Night Thermal Sentry Drone Scramble', time: '18:00', completed: false }
      ]
    },
    {
      id: 'sec-uri',
      name: 'Uri Forward Sector (Line of Control)',
      code: 'SEC-URI-07',
      region: 'Baramulla LoC • 19 Infantry Division',
      coordinates: '34.09°N 74.04°E • Forward Post',
      commander: 'Col. D. B. Rawat, Forward LoC Battlegroup',
      category: 'Monitored',
      temp: 16,
      feelsLike: 16,
      condition: 'Overcast & Low Mountain Fog',
      weatherCode: 45,
      windSpeed: 12,
      windDirection: 270,
      humidity: 74,
      pressure: 980,
      visibility: 4.5,
      precipitation: 0.2,
      flightReadiness: 78,
      statusText: 'MOUNTAIN RIDGE CONVECTION',
      badgeStyle: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/50',
      uavEnvelope: 'ADVISORY — Moderate mountain wave turbulence along cliffs',
      uavStatus: 'ADVISORY',
      opticsStatus: 'THERMAL FLIR RECOMMENDED — Low cloud veil',
      ballisticsCorrection: 'Air density: 1.16 kg/m³ • Angle-of-fire elevation set',
      groundTrafficability: 'DAMP ROCK & FOREST RIDGES — All-wheel drive essential',
      commandUnit: 'LoC Perimeter Task Force',
      phases: [
        { name: '06:00 - 12:00: Perimeter Infrared Tripwire Calibration', time: '06:00', completed: true },
        { name: '12:00 - 18:00: Fog Infiltration Radar Sweeps', time: '12:00', completed: true },
        { name: '18:00 - 24:00: Acoustic Sentry Listening Post Sync', time: '18:00', completed: false }
      ]
    },
    {
      id: 'sec-pathankot',
      name: 'Pathankot Tactical Air Command',
      code: 'SEC-PTK-24',
      region: 'Punjab Forward Axis • IAF Tactical Base',
      coordinates: '32.27°N 75.65°E • Forward Runway',
      commander: 'Air Commodore S. Malhotra, Air Defense Enclave',
      category: 'Precipitation',
      temp: 24,
      feelsLike: 25,
      condition: 'Scattered Rain Showers & Slick Runway',
      weatherCode: 61,
      windSpeed: 20,
      windDirection: 120,
      humidity: 86,
      pressure: 1004,
      visibility: 3.8,
      precipitation: 3.6,
      flightReadiness: 68,
      statusText: 'TACTICAL RAIN & RUNWAY SLICK',
      badgeStyle: 'text-amber-400 bg-amber-950/80 border-amber-500/50',
      uavEnvelope: 'ADVISORY — Rain shedding active, low crosswinds allowed',
      uavStatus: 'ADVISORY',
      opticsStatus: 'MULTI-SPECTRAL RADAR & IR — Water droplet filter engaged',
      ballisticsCorrection: 'Air density: 1.18 kg/m³ • Rain drag factor applied',
      groundTrafficability: 'WET TARMAC & RUNWAY DRAINAGE ACTIVE',
      commandUnit: 'Garud Special Forces & QRA Flight',
      phases: [
        { name: '06:00 - 12:00: Runway Friction Coefficient Test', time: '06:00', completed: true },
        { name: '12:00 - 18:00: Low-Altitude Rain Radar Interception', time: '12:00', completed: true },
        { name: '18:00 - 24:00: Anti-Drone Sensor Calibration under Drizzle', time: '18:00', completed: false }
      ]
    },
    {
      id: 'sec-delhi',
      name: 'New Delhi National Capital Command',
      code: 'SEC-DLH-01',
      region: 'National Capital Command • HQ IDS',
      coordinates: '28.61°N 77.21°E • South Block',
      commander: 'Air Marshal V. K. Sen, Integrated Defence Staff',
      category: 'Optimal',
      temp: 31,
      feelsLike: 33,
      condition: 'Stable Warm Skies & Clear Visibility',
      weatherCode: 1,
      windSpeed: 10,
      windDirection: 90,
      humidity: 42,
      pressure: 1010,
      visibility: 9,
      precipitation: 0,
      flightReadiness: 98,
      statusText: 'CLEAR AIRSPACE CORRIDOR',
      badgeStyle: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50',
      uavEnvelope: 'CLEAR FOR DEPLOYMENT — Unrestricted air space telemetry',
      uavStatus: 'CLEAR',
      opticsStatus: 'FULL OPTICAL SPECTRUM — 100% Target Identification',
      ballisticsCorrection: 'Air density: 1.16 kg/m³ • Standard standard atmosphere',
      groundTrafficability: 'PAVED SECURE TRANSPORT NETWORKS',
      commandUnit: 'IDS Joint Operations Enclave',
      phases: [
        { name: '06:00 - 12:00: Capital Air Defense Radar Uplink Verification', time: '06:00', completed: true },
        { name: '12:00 - 18:00: Theater Weather Forecast Satellite Aggregate', time: '12:00', completed: true },
        { name: '18:00 - 24:00: Tri-Service Joint Weather Briefing Upload', time: '18:00', completed: false }
      ]
    }
  ];

  // Filtering calculations matching Mission Status exactly
  const optimalCount = tacticalSectors.filter(s => s.category === 'Optimal').length;
  const monitoredCount = tacticalSectors.filter(s => s.category === 'Monitored').length;
  const precipitationCount = tacticalSectors.filter(s => s.category === 'Precipitation').length;
  const extremeCount = tacticalSectors.filter(s => s.category === 'Extreme').length;

  const filteredSectors = tacticalSectors.filter(s => {
    const matchesCategory = activeCategoryFilter === 'ALL' || s.category === activeCategoryFilter;
    const matchesSearch = sectorSearchQuery.trim() === '' || 
      s.name.toLowerCase().includes(sectorSearchQuery.toLowerCase()) ||
      s.region.toLowerCase().includes(sectorSearchQuery.toLowerCase()) ||
      s.condition.toLowerCase().includes(sectorSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openModal = (category: 'ALL' | 'Optimal' | 'Monitored' | 'Precipitation' | 'Extreme' = 'ALL') => {
    setActiveCategoryFilter(category);
    const firstMatch = category === 'ALL'
      ? tacticalSectors[0]
      : tacticalSectors.find(s => s.category === category);
    if (firstMatch) {
      setExpandedSectorId(firstMatch.id);
    }
    setShowViewAllModal(true);
  };

  const toggleSectorExpansion = (id: string) => {
    setExpandedSectorId(prev => (prev === id ? null : id));
  };

  const handleSelectSectorAsActive = (sec: TacticalWeatherSector) => {
    if (sec.id === 'sec-live') {
      requestLiveLocation();
    } else {
      const match = PRESET_SECTORS.find(p => sec.name.toLowerCase().includes(p.shortName.toLowerCase()));
      if (match) {
        selectPresetSector(match.id);
      }
    }
    setAdvisorySentToast(`Locked ${sec.name} as primary operational weather sector!`);
    setTimeout(() => setAdvisorySentToast(null), 3000);
  };

  return (
    <>
      {/* ===================== DASHBOARD COMPACT WIDGET ===================== */}
      <div 
        className="relative rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl transition-all cursor-pointer group hover:border-cyan-500/40" 
        id="weather-intelligence-widget"
        onClick={() => openModal('ALL')}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
              WEATHER INTELLIGENCE
            </h3>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Quick Live GPS Auto-Acquire button */}
            <button
              type="button"
              onClick={() => requestLiveLocation()}
              className={`p-1.5 rounded-lg border transition flex items-center gap-1 text-[9.5px] font-mono-code font-bold cursor-pointer ${
                location.isLiveGps
                  ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/60'
                  : 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60'
              }`}
              title="Auto-Detect Live Location via GPS"
            >
              <Radio className={`w-3.5 h-3.5 ${location.status === 'acquiring' ? 'animate-spin' : location.isLiveGps ? 'animate-pulse text-emerald-400' : 'text-cyan-400'}`} />
              <span className="hidden sm:inline">{location.status === 'acquiring' ? 'LOCATING...' : location.isLiveGps ? 'GPS LOCKED' : 'LIVE GPS'}</span>
            </button>

            {/* Real-time Notifications Popover Toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifMenu(!showNotifMenu);
                  setShowSectorMenu(false);
                }}
                className={`p-1.5 rounded-lg border transition relative cursor-pointer ${
                  notificationsEnabled
                    ? 'bg-blue-950/80 border-blue-500/60 text-blue-300 hover:bg-blue-900/80'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
                title="Weather Alert Notifications Config"
              >
                {notificationsEnabled ? (
                  <BellRing className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                ) : (
                  <Bell className="w-3.5 h-3.5 text-slate-400" />
                )}
                {notificationsEnabled && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
                )}
              </button>

              {/* Notification Menu Dropdown */}
              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-950/95 border border-cyan-500/50 rounded-xl shadow-2xl p-3 z-50 animate-fade-in backdrop-blur-2xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <BellRing className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-tech font-bold text-white uppercase">Weather Alerts</span>
                    </div>
                    <button
                      onClick={() => setShowNotifMenu(false)}
                      className="text-slate-400 hover:text-white p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2.5 mt-2.5">
                    {/* Toggle Notification */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono-code text-slate-300">Live Notifications</span>
                      <button
                        type="button"
                        onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                        className={`px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold cursor-pointer transition ${
                          notificationsEnabled
                            ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                            : 'bg-slate-800 border border-slate-600 text-slate-400'
                        }`}
                      >
                        {notificationsEnabled ? 'ENABLED' : 'DISABLED'}
                      </button>
                    </div>

                    {/* Native Desktop Notification Permission */}
                    {browserNotificationPermission !== 'granted' && (
                      <button
                        type="button"
                        onClick={async () => {
                          await requestBrowserNotifications();
                        }}
                        className="w-full py-1 rounded bg-cyan-950/80 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 text-[10px] font-mono-code font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Bell className="w-3 h-3" />
                        <span>Enable Desktop Push Alerts</span>
                      </button>
                    )}

                    {/* Test Notification Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        triggerTestNotification();
                      }}
                      className="w-full py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10.5px] font-tech font-bold tracking-wide transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Send Test Notification Now</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={handleManualRefresh}
              className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-700 hover:border-cyan-500/40 text-slate-300 hover:text-white transition cursor-pointer"
              title="Refresh Meteorological Feeds"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>

            {/* View All Button */}
            <button 
              type="button"
              id="weather-status-view-all-btn"
              onClick={(e) => {
                e.stopPropagation();
                openModal('ALL');
              }}
              className="text-xs font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
              title="Open Complete Weather Intelligence Grid (Mission Status Format)"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Circular Percentage Rings / Summary Matching Mission Status Look */}
        <div className="grid grid-cols-4 gap-2 pt-1 pb-2">
          {/* Ring 1: Optimal */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              openModal('Optimal');
            }}
            className="flex flex-col items-center text-center cursor-pointer group/ring"
          >
            <div className="relative w-12 h-12 flex items-center justify-center transition-transform group-hover/ring:scale-105">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" fill="none" stroke="#1E293B" strokeWidth="3.5" />
                <circle cx="28" cy="28" r="22" fill="none" stroke="#10B981" strokeWidth="3.5" strokeDasharray={138.2} strokeDashoffset={138.2 - (0.84 * 138.2)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-tech font-bold text-white">84%</div>
            </div>
            <span className="text-[10px] font-mono-code text-slate-300 mt-1 truncate max-w-full group-hover/ring:text-emerald-300">Optimal</span>
          </div>

          {/* Ring 2: Monitored */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              openModal('Monitored');
            }}
            className="flex flex-col items-center text-center cursor-pointer group/ring"
          >
            <div className="relative w-12 h-12 flex items-center justify-center transition-transform group-hover/ring:scale-105">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" fill="none" stroke="#1E293B" strokeWidth="3.5" />
                <circle cx="28" cy="28" r="22" fill="none" stroke="#06B6D4" strokeWidth="3.5" strokeDasharray={138.2} strokeDashoffset={138.2 - (0.12 * 138.2)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-tech font-bold text-white">12%</div>
            </div>
            <span className="text-[10px] font-mono-code text-slate-300 mt-1 truncate max-w-full group-hover/ring:text-cyan-300">Monitored</span>
          </div>

          {/* Ring 3: Precip */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              openModal('Precipitation');
            }}
            className="flex flex-col items-center text-center cursor-pointer group/ring"
          >
            <div className="relative w-12 h-12 flex items-center justify-center transition-transform group-hover/ring:scale-105">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" fill="none" stroke="#1E293B" strokeWidth="3.5" />
                <circle cx="28" cy="28" r="22" fill="none" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray={138.2} strokeDashoffset={138.2 - (0.03 * 138.2)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-tech font-bold text-white">3%</div>
            </div>
            <span className="text-[10px] font-mono-code text-slate-300 mt-1 truncate max-w-full group-hover/ring:text-amber-300">Precip</span>
          </div>

          {/* Ring 4: Extreme */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              openModal('Extreme');
            }}
            className="flex flex-col items-center text-center cursor-pointer group/ring"
          >
            <div className="relative w-12 h-12 flex items-center justify-center transition-transform group-hover/ring:scale-105">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" fill="none" stroke="#1E293B" strokeWidth="3.5" />
                <circle cx="28" cy="28" r="22" fill="none" stroke="#EF4444" strokeWidth="3.5" strokeDasharray={138.2} strokeDashoffset={138.2 - (0.01 * 138.2)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-tech font-bold text-white">1%</div>
            </div>
            <span className="text-[10px] font-mono-code text-slate-300 mt-1 truncate max-w-full group-hover/ring:text-red-300">Extreme</span>
          </div>
        </div>

        {/* Current Active Location & Live Metrics Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center shrink-0">
              {getWeatherIcon(weather.weatherCode, weather.condition)}
            </div>
            <div>
              <div className="text-xs font-tech font-bold text-white flex items-center gap-1.5">
                <span className="truncate max-w-[120px] sm:max-w-[150px]">{location.name}</span>
                <span className="text-cyan-400 font-mono-code text-[11px]">{weather.temperature}°C</span>
              </div>
              <div className="text-[9.5px] font-mono-code text-slate-400 truncate max-w-[140px] sm:max-w-[180px]">
                {weather.condition}
              </div>
            </div>
          </div>

          <div className="text-[9.5px] font-mono-code text-right text-slate-400">
            <div>Wind: <strong className="text-cyan-300">{weather.windSpeed} km/h</strong></div>
            <div>Vis: <strong className="text-emerald-300">{weather.visibility} km</strong></div>
          </div>
        </div>
      </div>

      {/* ======================= DETAILED MODAL IN MISSION STATUS FORMAT ======================= */}
      {showViewAllModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in"
          id="weather-intelligence-modal-overlay"
          onClick={() => setShowViewAllModal(false)}
        >
          <div 
            className="max-w-3xl w-full bg-[#020b1c] border border-cyan-500/50 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 animate-fade-in max-h-[92vh] overflow-y-auto"
            id="weather-intelligence-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shrink-0">
                  <CloudSun className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-tech font-bold text-white uppercase tracking-wider">
                    TACTICAL METEOROLOGICAL INTELLIGENCE & SENSOR STATUS
                  </h3>
                  <p className="text-[10px] sm:text-xs font-mono-code text-cyan-400">
                    REAL-TIME THEATER WEATHER GRID • 6 STRATEGIC BORDER SECTORS • ENCRYPTED SATELLITE TELEMETRY
                  </p>
                </div>
              </div>
              <button 
                type="button"
                id="close-weather-modal-btn"
                onClick={() => setShowViewAllModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono-code px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer flex items-center gap-1 shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>

            {/* Quick Toast Notification if Advisory Dispatched */}
            {advisorySentToast && (
              <div className="p-2.5 rounded-xl bg-cyan-950/90 border border-cyan-400 text-xs font-mono-code text-cyan-200 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{advisorySentToast}</span>
              </div>
            )}

            {/* Top 4 KPI Cards - Clicking Filters Immediately with Active Glow (Identical to Mission Status) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Card 1: Optimal */}
              <div 
                onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Optimal' ? 'ALL' : 'Optimal')}
                className={`p-2.5 rounded-xl border text-center cursor-pointer transition relative ${
                  activeCategoryFilter === 'Optimal' 
                    ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-950/50' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center justify-center gap-1">
                  <span>Optimal Skies</span>
                  {activeCategoryFilter === 'Optimal' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
                </div>
                <div className="text-xl font-tech font-bold text-emerald-400 mt-0.5">84%</div>
                <div className="text-[9.5px] font-mono-code text-emerald-300">{optimalCount} Sectors Clear</div>
              </div>

              {/* Card 2: Monitored */}
              <div 
                onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Monitored' ? 'ALL' : 'Monitored')}
                className={`p-2.5 rounded-xl border text-center cursor-pointer transition relative ${
                  activeCategoryFilter === 'Monitored' 
                    ? 'bg-cyan-950/70 border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-950/50' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center justify-center gap-1">
                  <span>Monitored / Fog</span>
                  {activeCategoryFilter === 'Monitored' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                </div>
                <div className="text-xl font-tech font-bold text-cyan-400 mt-0.5">12%</div>
                <div className="text-[9.5px] font-mono-code text-cyan-300">{monitoredCount} Thermal Priority</div>
              </div>

              {/* Card 3: Precip */}
              <div 
                onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Precipitation' ? 'ALL' : 'Precipitation')}
                className={`p-2.5 rounded-xl border text-center cursor-pointer transition relative ${
                  activeCategoryFilter === 'Precipitation' 
                    ? 'bg-amber-950/70 border-amber-400 ring-2 ring-amber-500/40 shadow-lg shadow-amber-950/50' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center justify-center gap-1">
                  <span>Precipitation</span>
                  {activeCategoryFilter === 'Precipitation' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                </div>
                <div className="text-xl font-tech font-bold text-amber-400 mt-0.5">3%</div>
                <div className="text-[9.5px] font-mono-code text-amber-300">{precipitationCount} Rain Advisory</div>
              </div>

              {/* Card 4: Extreme */}
              <div 
                onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Extreme' ? 'ALL' : 'Extreme')}
                className={`p-2.5 rounded-xl border text-center cursor-pointer transition relative ${
                  activeCategoryFilter === 'Extreme' 
                    ? 'bg-red-950/70 border-red-400 ring-2 ring-red-500/40 shadow-lg shadow-red-950/50' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-red-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="text-[10px] font-mono-code text-slate-400 uppercase flex items-center justify-center gap-1">
                  <span>Extreme / Cryo</span>
                  {activeCategoryFilter === 'Extreme' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />}
                </div>
                <div className="text-xl font-tech font-bold text-red-400 mt-0.5">1%</div>
                <div className="text-[9.5px] font-mono-code text-red-300">{extremeCount} Blizzard Hold</div>
              </div>
            </div>

            {/* Filter Pills / Tabs for High-Clarity Filtering */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-mono-code text-slate-400 mr-1 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>FILTER SECTOR STATUS:</span>
                </span>
                
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('ALL')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                    activeCategoryFilter === 'ALL'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  ALL SECTORS ({tacticalSectors.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('Optimal')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                    activeCategoryFilter === 'Optimal'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900 text-emerald-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  OPTIMAL ({optimalCount})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('Monitored')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                    activeCategoryFilter === 'Monitored'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-cyan-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  MONITORED ({monitoredCount})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('Precipitation')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                    activeCategoryFilter === 'Precipitation'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 text-amber-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  PRECIPITATION ({precipitationCount})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('Extreme')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer ${
                    activeCategoryFilter === 'Extreme'
                      ? 'bg-red-500 text-slate-950 shadow-md shadow-red-500/20'
                      : 'bg-slate-900 text-red-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  EXTREME ({extremeCount})
                </button>
              </div>

              {/* Search Box */}
              <div className="w-full sm:w-56">
                <input
                  type="text"
                  value={sectorSearchQuery}
                  onChange={(e) => setSectorSearchQuery(e.target.value)}
                  placeholder="Search sector, border..."
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-lg px-2.5 py-1 text-xs font-mono-code text-slate-200 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* List of Tactical Sector Cards Formatted EXACTLY like Mission Status Cards */}
            <div className="space-y-2.5">
              {filteredSectors.map((sec) => {
                const isExpanded = expandedSectorId === sec.id;
                const isCurrentActive = location.name.toLowerCase().includes(sec.name.toLowerCase().split(' ')[0]) || (sec.id === 'sec-live' && location.isLiveGps);

                return (
                  <div
                    key={sec.id}
                    className={`rounded-xl border transition-all overflow-hidden ${
                      isExpanded
                        ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    {/* Header Row (Clickable to Expand / Collapse) */}
                    <div 
                      onClick={() => toggleSectorExpansion(sec.id)}
                      className="p-3 sm:p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-900/50 transition select-none"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Status Icon Indicator */}
                        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                          {getWeatherIcon(sec.weatherCode, sec.condition)}
                        </div>

                        {/* Title & Metadata */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm font-tech font-bold text-white tracking-wide truncate">
                              {sec.name}
                            </span>
                            <span className={`text-[9.5px] font-mono-code font-bold px-2 py-0.5 rounded-full border ${sec.badgeStyle}`}>
                              {sec.statusText}
                            </span>
                            {isCurrentActive && (
                              <span className="text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 flex items-center gap-1">
                                <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                                ACTIVE SECTOR
                              </span>
                            )}
                          </div>
                          <div className="text-[10.5px] font-mono-code text-slate-400 flex items-center gap-2 mt-0.5">
                            <span className="text-cyan-400">{sec.code}</span>
                            <span>•</span>
                            <span className="text-slate-300">{sec.region}</span>
                            <span>•</span>
                            <span className="text-amber-300 font-bold">{sec.temp}°C</span>
                          </div>
                        </div>
                      </div>

                      {/* Flight Envelope Readiness Bar & Toggle Chevron */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden md:flex flex-col items-end text-right">
                          <div className="text-[10px] font-mono-code text-slate-400">Flight Envelope Readiness</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-20 sm:w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  sec.flightReadiness > 80 ? 'bg-emerald-400' : sec.flightReadiness > 50 ? 'bg-cyan-400' : 'bg-red-400'
                                }`} 
                                style={{ width: `${sec.flightReadiness}%` }}
                              />
                            </div>
                            <span className="text-xs font-tech font-bold text-white">{sec.flightReadiness}%</span>
                          </div>
                        </div>

                        <div className="p-1 rounded-lg bg-slate-800/80 text-slate-400">
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Detail Panel (Matching Mission Status Detail Format) */}
                    {isExpanded && (
                      <div className="px-3.5 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-3.5 text-xs font-mono-code animate-fade-in">
                        
                        {/* 4 Core Meteorological Metrics Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                              <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Temperature</span>
                            </div>
                            <div className="text-lg font-tech font-bold text-white mt-0.5">
                              {sec.temp}°C
                            </div>
                            <div className="text-[9.5px] text-cyan-300">Feels like {sec.feelsLike}°C</div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                              <Wind className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Wind Velocity</span>
                            </div>
                            <div className="text-lg font-tech font-bold text-white mt-0.5">
                              {sec.windSpeed} km/h
                            </div>
                            <div className="text-[9.5px] text-slate-400">Azimuth: {sec.windDirection}°</div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Humidity & Precip</span>
                            </div>
                            <div className="text-lg font-tech font-bold text-white mt-0.5">
                              {sec.humidity}%
                            </div>
                            <div className="text-[9.5px] text-slate-400">Precip: {sec.precipitation} mm</div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Pressure & Optics</span>
                            </div>
                            <div className="text-lg font-tech font-bold text-white mt-0.5">
                              {sec.pressure} hPa
                            </div>
                            <div className="text-[9.5px] text-emerald-300">Vis: {sec.visibility} km</div>
                          </div>
                        </div>

                        {/* Tactical Operational Impact Matrix */}
                        <div className="p-3 rounded-xl bg-[#02132d] border border-cyan-500/40 space-y-2">
                          <div className="text-xs font-tech font-bold text-cyan-300 uppercase flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>Operational Impact Assessment & Drone Envelope</span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                            <div className="p-2 rounded bg-slate-900/70 border border-slate-800">
                              <span className="text-slate-400">UAV Flight Envelope: </span>
                              <strong className={sec.uavStatus === 'CLEAR' ? 'text-emerald-400' : sec.uavStatus === 'ADVISORY' ? 'text-amber-400' : 'text-red-400'}>
                                {sec.uavEnvelope}
                              </strong>
                            </div>
                            <div className="p-2 rounded bg-slate-900/70 border border-slate-800">
                              <span className="text-slate-400">Optoelectronics / FLIR: </span>
                              <strong className="text-cyan-300">{sec.opticsStatus}</strong>
                            </div>
                            <div className="p-2 rounded bg-slate-900/70 border border-slate-800">
                              <span className="text-slate-400">Artillery Ballistics: </span>
                              <strong className="text-slate-200">{sec.ballisticsCorrection}</strong>
                            </div>
                            <div className="p-2 rounded bg-slate-900/70 border border-slate-800">
                              <span className="text-slate-400">Soil Trafficability: </span>
                              <strong className="text-emerald-300">{sec.groundTrafficability}</strong>
                            </div>
                          </div>
                        </div>

                        {/* 24-Hour Micro-Forecast Phases Checklist (Matching Mission Status Phases) */}
                        <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                          <div className="text-[11px] font-tech font-bold text-slate-300 uppercase flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>24-Hour Micro-Forecast Trajectory</span>
                          </div>

                          <div className="space-y-1.5">
                            {sec.phases.map((ph, idx) => (
                              <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800/80 text-[10.5px]">
                                <div className="flex items-center gap-2">
                                  {ph.completed ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  ) : (
                                    <div className="w-3.5 h-3.5 rounded-full border border-slate-600 flex items-center justify-center shrink-0">
                                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    </div>
                                  )}
                                  <span className={ph.completed ? 'text-slate-300' : 'text-cyan-300 font-bold'}>{ph.name}</span>
                                </div>
                                <span className="text-[9.5px] text-slate-400 font-mono-code">{ph.time} HRS</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Footer Buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800 flex-wrap gap-2">
                          <div className="text-[10px] text-slate-400">
                            Sector Commander: <strong className="text-white">{sec.commander}</strong>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Lock Sector Button */}
                            <button
                              type="button"
                              onClick={() => handleSelectSectorAsActive(sec)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-tech font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md ${
                                isCurrentActive
                                  ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                                  : 'bg-cyan-900/60 hover:bg-cyan-800 border border-cyan-500/60 text-cyan-200'
                              }`}
                            >
                              <Radio className="w-3.5 h-3.5" />
                              <span>{isCurrentActive ? 'Active Monitoring Locked' : 'Lock as Active Sector'}</span>
                            </button>

                            {/* Dispatch Advisory Button */}
                            <button
                              type="button"
                              onClick={() => handleDispatchAdvisory(sec.name)}
                              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-tech font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Dispatch Advisory</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Bottom Status Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20 text-xs font-mono-code text-slate-400 flex-wrap gap-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Satellite Doppler Radar Link: 100% Online • All 6 Sectors Monitored</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowViewAllModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-tech font-bold text-xs cursor-pointer shadow-md transition"
                >
                  Close Grid
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
