import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Video, Radio, Eye, Crosshair, Maximize2, 
  AlertTriangle, Shield, CheckCircle2, CloudRain, 
  Wind, Lock, ArrowRight, Plane, Anchor, Building2, 
  Sliders, RefreshCw, Download, Check, Volume2, Sparkles,
  Layers, ChevronRight, X, Compass, MapPin, Navigation,
  Gauge, Thermometer, Cloud, Sun, CloudSun, CloudLightning,
  FileText, ExternalLink, Image as ImageIcon, Send, Play,
  Trash2, ZoomIn
} from 'lucide-react';
import { LiveOperationalMap } from '../dashboard/LiveOperationalMap';
import { DroneIcon, CctvIcon } from '../dashboard/TacticalIcons';
import { useWeatherLocation } from '../../context/WeatherLocationContext';

// Images for Feeds
import patrolInfiltrationImg from '../../assets/images/patrol_infiltration_valley_1788709882772.jpg';
import locDroneRoadImg from '../../assets/images/loc_road_feed_1790584997627.jpg';
import thermalFlirImg from '../../assets/images/thermal_flir_punjab_1788709390279.jpg';
import navalPortImg from '../../assets/images/naval_base_port_1790585007381.jpg';
import citySurveillanceImg from '../../assets/images/city_surveillance_1789542296084.jpg';
import droneReconImg from '../../assets/images/drone_surveillance_jk_1788709366761.jpg';
import quadcopterImg from '../../assets/images/ai_drone_quadcopter_sky_1788709922432.jpg';

export interface LiveFeedItem {
  id: string;
  category: 'CCTV' | 'DRONE' | 'THERMAL' | 'SATELLITE' | 'CITY' | 'PORT';
  filterTag: 'CCTV' | 'Drone' | 'Satellite' | 'Ground Sensor' | 'Social';
  title: string;
  badge: 'LIVE';
  badgeColor: 'red' | 'green';
  camId: string;
  timeOffset: number; // seconds ago
  imageSrc: string;
  icon: React.ElementType;
  telemetry?: {
    alt?: string;
    spd?: string;
    zoom?: string;
  };
  hasThermalScale?: boolean;
  boundingBoxes: Array<{
    top: string;
    left: string;
    width: string;
    height: string;
    label: string;
    color: 'red' | 'cyan' | 'emerald';
  }>;
}

export interface SavedSnapshotItem {
  id: string;
  camId: string;
  title: string;
  dataUrl: string;
  timestamp: string;
  locationName: string;
  coordinates: string;
}

interface VajraLiveFeedsViewProps {
  onNavigateToThreats?: () => void;
}

const INITIAL_LIVE_FEEDS: LiveFeedItem[] = [
  {
    id: 'feed-1',
    category: 'CCTV',
    filterTag: 'CCTV',
    title: 'Border Sector 7 (Forward Patrol) – CCTV',
    badge: 'LIVE',
    badgeColor: 'red',
    camId: 'J&K-07',
    timeOffset: 0,
    imageSrc: patrolInfiltrationImg,
    icon: Video,
    boundingBoxes: [
      { top: '48%', left: '38%', width: '12%', height: '38%', label: 'PERSONNEL 01', color: 'cyan' },
      { top: '50%', left: '52%', width: '10%', height: '34%', label: 'PERSONNEL 02', color: 'cyan' }
    ]
  },
  {
    id: 'feed-2',
    category: 'DRONE',
    filterTag: 'Drone',
    title: 'LOC Road – Drone Recon Feed',
    badge: 'LIVE',
    badgeColor: 'red',
    camId: 'DRN-12',
    timeOffset: 4,
    imageSrc: locDroneRoadImg,
    icon: Plane,
    telemetry: {
      alt: '6,450 FT MSL',
      spd: '112 KTS (207 km/h)',
      zoom: '28.5x (FOV 6.2°)'
    },
    boundingBoxes: [
      { top: '44%', left: '46%', width: '14%', height: '18%', label: 'TGT 01 - TRACKED VEHICLE', color: 'red' }
    ]
  },
  {
    id: 'feed-3',
    category: 'THERMAL',
    filterTag: 'Ground Sensor',
    title: 'High Altitude Pass – FLIR Thermal',
    badge: 'LIVE',
    badgeColor: 'red',
    camId: 'THM-12',
    timeOffset: 7,
    imageSrc: thermalFlirImg,
    icon: Crosshair,
    hasThermalScale: true,
    boundingBoxes: [
      { top: '42%', left: '26%', width: '14%', height: '35%', label: '37.1°C', color: 'red' },
      { top: '38%', left: '52%', width: '16%', height: '42%', label: '36.9°C', color: 'red' }
    ]
  },
  {
    id: 'feed-4',
    category: 'PORT',
    filterTag: 'CCTV',
    title: 'Naval Base – Littoral Port View',
    badge: 'LIVE',
    badgeColor: 'green',
    camId: 'NAV-01',
    timeOffset: 1,
    imageSrc: navalPortImg,
    icon: Anchor,
    boundingBoxes: [
      { top: '46%', left: '18%', width: '36%', height: '24%', label: 'INS TASKFORCE - SECURE', color: 'emerald' },
      { top: '60%', left: '48%', width: '24%', height: '26%', label: 'NAVAL DOCKYARD BASIN', color: 'emerald' }
    ]
  },
  {
    id: 'feed-5',
    category: 'SATELLITE',
    filterTag: 'Satellite',
    title: 'Satellite Feed – Northern Sector Ridge',
    badge: 'LIVE',
    badgeColor: 'green',
    camId: 'SAT-02',
    timeOffset: 12,
    imageSrc: '/satellite_feed_sector4.jpg',
    icon: Radio,
    boundingBoxes: [
      { top: '25%', left: '32%', width: '36%', height: '38%', label: 'HIGH-ALTITUDE PASS 14,800 FT', color: 'cyan' }
    ]
  },
  {
    id: 'feed-6',
    category: 'CITY',
    filterTag: 'Social',
    title: 'Urban Grid Surveillance – Capital Sector',
    badge: 'LIVE',
    badgeColor: 'green',
    camId: 'CITY-05',
    timeOffset: 14,
    imageSrc: citySurveillanceImg,
    icon: Building2,
    boundingBoxes: [
      { top: '48%', left: '30%', width: '16%', height: '20%', label: 'TRANSIT BUS', color: 'cyan' },
      { top: '58%', left: '50%', width: '14%', height: '16%', label: 'AUTO-RICKSHAW', color: 'cyan' },
      { top: '64%', left: '22%', width: '8%', height: '14%', label: 'PEDESTRIAN', color: 'cyan' }
    ]
  }
];

export const VajraLiveFeedsView: React.FC<VajraLiveFeedsViewProps> = ({ onNavigateToThreats }) => {
  // Weather & Live Location Context
  const { location, weather, requestLiveLocation, refreshWeather } = useWeatherLocation();

  // Feeds state
  const [feedsList, setFeedsList] = useState<LiveFeedItem[]>(INITIAL_LIVE_FEEDS);
  const [activeFilter, setActiveFilter] = useState<'All' | 'CCTV' | 'Drone' | 'Satellite' | 'Ground Sensor' | 'Social'>('All');
  const [selectedFeed, setSelectedFeed] = useState<LiveFeedItem | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('21:47:32');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAiBoxesActive, setIsAiBoxesActive] = useState<boolean>(true);

  // Quick Action Modal states
  const [showAllFeedsModal, setShowAllFeedsModal] = useState<boolean>(false);
  const [showDroneModal, setShowDroneModal] = useState<boolean>(false);
  const [showSnapshotsModal, setShowSnapshotsModal] = useState<boolean>(false);
  const [showWeatherIntelModal, setShowWeatherIntelModal] = useState<boolean>(false);
  const [savedSnapshots, setSavedSnapshots] = useState<SavedSnapshotItem[]>([]);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);

  // Drone Request Form State
  const [droneForm, setDroneForm] = useState({
    uavType: 'NETRA-V4 Quadcopter',
    sector: '',
    mission: 'Perimeter Sweep & Infiltration Recon',
    altitude: 450,
    speed: 65,
    payloadEO: true,
    payloadFLIR: true,
    payloadLaser: true
  });
  const [isLaunchingDrone, setIsLaunchingDrone] = useState<boolean>(false);

  // Sync clock seconds
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timePart = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(timePart);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Quick Action Notification helper
  const triggerQuickAction = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Filter feeds based on active tag
  const filteredFeeds = activeFilter === 'All' 
    ? feedsList 
    : feedsList.filter(f => f.filterTag === activeFilter);

  // Tactical weather icon helper
  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />;
    if (code <= 2) return <CloudSun className="w-5 h-5 text-amber-300" />;
    if (code === 3) return <Cloud className="w-5 h-5 text-slate-300" />;
    if (code >= 51 && code <= 67) return <CloudRain className="w-5 h-5 text-blue-400 animate-pulse" />;
    if (code >= 95) return <CloudLightning className="w-5 h-5 text-yellow-400 animate-bounce" />;
    return <CloudRain className="w-5 h-5 text-blue-400 animate-pulse" />;
  };

  // UAV Flight Envelope calculation from live weather
  const getUavFlightStatus = () => {
    if (weather.windSpeed > 35 || weather.weatherCode >= 95) {
      return { status: 'RESTRICTED', color: 'text-red-400', bg: 'bg-red-950/60 border-red-500/50', desc: 'High Wind / Storm Conditions' };
    }
    if (weather.windSpeed > 22 || (weather.weatherCode >= 51 && weather.weatherCode <= 67)) {
      return { status: 'ADVISORY', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-500/50', desc: 'Turbulence & Moisture Present' };
    }
    return { status: 'OPTIMAL', color: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-500/50', desc: 'Clear Flight Corridor' };
  };

  const uavFlight = getUavFlightStatus();

  // Optical vs FLIR Sensor Priority
  const isFlirPriority = weather.visibility < 6 || (weather.weatherCode >= 51 && weather.weatherCode <= 67);

  // Atmospheric Density Factor (kg/m³) derived from live pressure & temp
  const airDensity = (weather.pressure / (2.87 * (weather.temperature + 273.15))).toFixed(2);

  // --------------------------------------------------------------------------
  // QUICK ACTION 1: VIEW ALL FEEDS
  // --------------------------------------------------------------------------
  const handleViewAllFeeds = () => {
    setActiveFilter('All');
    setShowAllFeedsModal(true);
    triggerQuickAction(`TACTICAL VIDEO WALL ACTIVATED: ALL ${feedsList.length} FEEDS ONLINE`);
  };

  // --------------------------------------------------------------------------
  // QUICK ACTION 2: REQUEST DRONE
  // --------------------------------------------------------------------------
  const handleOpenDroneRequest = () => {
    setDroneForm(prev => ({
      ...prev,
      sector: prev.sector || `${location.shortName || location.name} Perimeter Sector`
    }));
    setShowDroneModal(true);
  };

  const handleLaunchDrone = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLaunchingDrone(true);

    setTimeout(() => {
      setIsLaunchingDrone(false);
      setShowDroneModal(false);

      const targetSector = droneForm.sector || `${location.shortName || location.name} Sector`;
      const isQuadcopter = droneForm.uavType.includes('Quadcopter');
      const newDroneId = `DRN-${Math.floor(100 + Math.random() * 900)}`;

      const newDroneFeed: LiveFeedItem = {
        id: `feed-drone-${Date.now()}`,
        category: 'DRONE',
        filterTag: 'Drone',
        title: `${droneForm.uavType} – ${targetSector}`,
        badge: 'LIVE',
        badgeColor: 'red',
        camId: newDroneId,
        timeOffset: 0,
        imageSrc: isQuadcopter ? quadcopterImg : droneReconImg,
        icon: Plane,
        telemetry: {
          alt: `${droneForm.altitude} m`,
          spd: `${droneForm.speed} km/h`,
          zoom: '4.2x'
        },
        boundingBoxes: [
          { top: '35%', left: '42%', width: '18%', height: '22%', label: 'TARGET SECTOR A-1', color: 'cyan' },
          { top: '60%', left: '28%', width: '12%', height: '16%', label: 'CONVOY PATH', color: 'emerald' }
        ]
      };

      setFeedsList(prev => [newDroneFeed, ...prev]);
      setSelectedFeed(newDroneFeed);
      triggerQuickAction(`UAV ${newDroneId} AIRBORNE OVER ${targetSector.toUpperCase()} — FEED LIVE`);
    }, 1200);
  };

  // --------------------------------------------------------------------------
  // QUICK ACTION 3: SAVE SNAPSHOT (WITH WATERMARK & AUTO-DOWNLOAD)
  // --------------------------------------------------------------------------
  const handleCaptureSnapshot = (targetFeed?: LiveFeedItem) => {
    const feed = targetFeed || selectedFeed || feedsList[0];
    if (!feed) return;

    // Trigger visual camera shutter flash
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 240);

    // Audio chirp using Web Audio API
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(350, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      }
    } catch {
      // AudioContext fallback
    }

    // Create high-res tactical canvas with military HUD overlay
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Draw image frame
      ctx.drawImage(img, 0, 0, 1280, 720);

      // Ambient HUD tint
      ctx.fillStyle = 'rgba(2, 11, 28, 0.22)';
      ctx.fillRect(0, 0, 1280, 720);

      // Top classification banner
      ctx.fillStyle = 'rgba(1, 8, 22, 0.85)';
      ctx.fillRect(0, 0, 1280, 46);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 46);
      ctx.lineTo(1280, 46);
      ctx.stroke();

      ctx.fillStyle = '#22d3ee';
      ctx.font = 'bold 15px monospace';
      ctx.fillText('VAJRA DEFENCE NETWORK // TACTICAL SURVEILLANCE SNAPSHOT', 24, 29);

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('CONFIDENTIAL // ARMED FORCES & INTEL COMMAND', 880, 29);

      // Targeting crosshair reticle in center
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(640, 360, 54, 0, Math.PI * 2);
      ctx.moveTo(640, 280);
      ctx.lineTo(640, 440);
      ctx.moveTo(560, 360);
      ctx.lineTo(720, 360);
      ctx.stroke();

      // Bottom telemetry bar
      ctx.fillStyle = 'rgba(1, 8, 22, 0.88)';
      ctx.fillRect(0, 656, 1280, 64);
      ctx.strokeStyle = '#06b6d4';
      ctx.beginPath();
      ctx.moveTo(0, 656);
      ctx.lineTo(1280, 656);
      ctx.stroke();

      const latStr = location.latitude ? `${location.latitude.toFixed(4)}°N` : '28.6139°N';
      const lonStr = location.longitude ? `${location.longitude.toFixed(4)}°E` : '77.2090°E';

      ctx.fillStyle = '#38bdf8';
      ctx.font = '12px monospace';
      ctx.fillText(`CAM ID: ${feed.camId} | TITLE: ${feed.title.toUpperCase()}`, 24, 680);
      ctx.fillText(`LIVE LOCATION: ${location.name.toUpperCase()} [${latStr}, ${lonStr}]`, 24, 702);

      const timeStr = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`TIMESTAMP: ${timeStr} | STATUS: AUDITED`, 820, 680);
      ctx.fillText(`CRYPTOGRAPHIC HASH: 0x${Math.random().toString(16).substring(2, 10).toUpperCase()} | SECURE`, 820, 702);

      // Convert to image URL
      const dataUrl = canvas.toDataURL('image/png');
      const filename = `Vajra_Snapshot_${feed.camId}_${Date.now()}.png`;

      // Trigger automatic download
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Save to snapshot gallery
      const newSnap: SavedSnapshotItem = {
        id: `snap-${Date.now()}`,
        camId: feed.camId,
        title: feed.title,
        dataUrl,
        timestamp: new Date().toLocaleTimeString(),
        locationName: location.name,
        coordinates: `${latStr}, ${lonStr}`
      };
      setSavedSnapshots(prev => [newSnap, ...prev]);

      triggerQuickAction(`SNAPSHOT CAPTURED & SAVED FOR ${feed.camId}`);
    };

    img.src = feed.imageSrc;
  };

  return (
    <div className="w-full flex flex-col space-y-3.5 sm:space-y-4 relative" id="vajra-live-feeds-view">
      {/* Fullscreen Shutter Flash on Snapshot Capture */}
      {isFlashing && (
        <div className="fixed inset-0 z-50 bg-white/40 pointer-events-none transition-opacity duration-200" />
      )}

      {/* Toast alert message */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2.5 rounded-xl bg-cyan-950/95 border border-cyan-400 text-cyan-300 text-xs font-mono-code shadow-2xl flex items-center gap-2 animate-fade-in backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main 12-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
        {/* ======================= LEFT 8 COLUMNS: LIVE FEEDS + MAP & THREATS ======================= */}
        <div className="lg:col-span-8 flex flex-col space-y-3.5 sm:space-y-4">
          {/* 1. TOP LIVE FEEDS CONTAINER */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/35 p-3.5 sm:p-4 backdrop-blur-xl shadow-2xl flex flex-col space-y-3.5">
            {/* Header: Title, Category Filter Pills, Live Badge, Maximize */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-cyan-500/25">
              {/* Left Title */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/90 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-tech font-bold text-white tracking-wider flex items-center gap-2">
                    <span>LIVE SURVEILLANCE FEEDS</span>
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  </h2>
                  <p className="text-[10.5px] font-mono-code text-cyan-400">
                    REAL-TIME MULTI-SPECTRUM SENSOR MATRIX • {feedsList.length} CHANNELS ONLINE
                  </p>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(['All', 'CCTV', 'Drone', 'Satellite', 'Ground Sensor', 'Social'] as const).map(filter => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-tech font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.5)] font-bold'
                          : 'bg-[#02132d] hover:bg-[#032047] text-slate-300 border border-cyan-500/30'
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAiBoxesActive(!isAiBoxesActive)}
                  title="Toggle AI Object Detections"
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono-code border transition cursor-pointer flex items-center gap-1.5 ${
                    isAiBoxesActive
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">AI BOXES</span>
                </button>

                <button
                  type="button"
                  onClick={handleViewAllFeeds}
                  title="Open Full Tactical Video Wall"
                  className="px-2.5 py-1 rounded-lg bg-cyan-900/60 hover:bg-cyan-800 border border-cyan-400 text-cyan-200 text-xs font-mono-code flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">MATRIX</span>
                </button>
              </div>
            </div>

            {/* 6 FEEDS GRID (2 rows x 3 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredFeeds.map(feed => {
                const FeedIcon = feed.icon;
                return (
                  <div
                    key={feed.id}
                    onClick={() => setSelectedFeed(feed)}
                    className="group relative rounded-xl bg-[#010816] border border-cyan-500/30 hover:border-cyan-400 overflow-hidden shadow-lg transition-all duration-200 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] cursor-pointer flex flex-col"
                  >
                    {/* Top Info Bar inside feed */}
                    <div className="px-2.5 py-1.5 bg-[#020d24] border-b border-cyan-500/20 flex items-center justify-between text-[11px] font-tech">
                      <div className="flex items-center gap-1.5 min-w-0 pr-1">
                        <FeedIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-white font-semibold truncate">
                          {feed.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`px-1.5 py-0.2 rounded text-[8.5px] font-mono-code font-bold uppercase ${
                          feed.badgeColor === 'red'
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-emerald-600 text-white'
                        }`}>
                          {feed.badge}
                        </span>
                      </div>
                    </div>

                    {/* Video / Snapshot Container */}
                    <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
                      <img
                        src={feed.imageSrc}
                        alt={feed.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Subtle Ambient Scanline */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent pointer-events-none animate-pulse" />

                      {/* Drone Telemetry Overlay */}
                      {feed.telemetry && (
                        <div className="absolute top-1.5 right-1.5 bg-black/70 border border-cyan-400/40 px-2 py-1 rounded text-[8.5px] font-mono-code text-cyan-300 leading-tight space-y-0.5 pointer-events-none backdrop-blur-xs">
                          <div>ALT: {feed.telemetry.alt}</div>
                          <div>SPD: {feed.telemetry.spd}</div>
                          <div>ZOOM: {feed.telemetry.zoom}</div>
                        </div>
                      )}

                      {/* Thermal Scale */}
                      {feed.hasThermalScale && (
                        <div className="absolute top-1.5 right-1.5 bottom-1.5 flex flex-col items-center justify-between text-[7px] font-mono-code text-white bg-black/70 px-1 py-0.5 rounded border border-red-500/40 pointer-events-none">
                          <span className="text-red-400 font-bold">Hot</span>
                          <div className="w-1.5 h-12 rounded bg-gradient-to-b from-red-600 via-amber-400 to-blue-900 my-0.5" />
                          <span className="text-blue-400 font-bold">Cold</span>
                        </div>
                      )}

                      {/* AI Detection Bounding Boxes */}
                      {isAiBoxesActive && feed.boundingBoxes.map((box, idx) => (
                        <div
                          key={idx}
                          style={{
                            top: box.top,
                            left: box.left,
                            width: box.width,
                            height: box.height
                          }}
                          className={`absolute border-2 pointer-events-none transition-all duration-300 ${
                            box.color === 'red'
                              ? 'border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]'
                              : box.color === 'emerald'
                              ? 'border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]'
                              : 'border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]'
                          }`}
                        >
                          <span className={`absolute -top-3.5 left-0 px-1 py-0.2 text-[7.5px] font-mono-code font-bold uppercase rounded ${
                            box.color === 'red'
                              ? 'bg-red-950 text-red-300 border border-red-500/50'
                              : box.color === 'emerald'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                              : 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                          }`}>
                            {box.label}
                          </span>
                        </div>
                      ))}

                      {/* Quick Snapshot Action Button on Hover */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCaptureSnapshot(feed);
                        }}
                        title="Instant Snapshot Frame"
                        className="absolute bottom-2 right-2 w-7 h-7 rounded-lg bg-black/75 hover:bg-cyan-950 border border-cyan-400/60 text-cyan-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>

                      {/* Hover Overlay Prompt */}
                      <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-tech font-bold text-white pointer-events-none">
                        <Maximize2 className="w-4 h-4 text-cyan-400" />
                        <span>INSPECT FEED</span>
                      </div>
                    </div>

                    {/* Bottom Status Bar of Feed Tile */}
                    <div className="px-2.5 py-1 bg-[#020b1c] border-t border-cyan-500/20 flex items-center justify-between text-[9.5px] font-mono-code text-slate-400">
                      <span className="text-cyan-400 font-semibold">
                        {currentTime}
                      </span>
                      <span className="text-slate-400">
                        Cam ID: <strong className="text-slate-200">{feed.camId}</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. BOTTOM SECTION: LIVE OPERATIONAL MAP & THREAT SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {/* Left: LIVE OPERATIONAL MAP */}
            <div className="w-full">
              <LiveOperationalMap />
            </div>

            {/* Right: THREAT SUMMARY WIDGET */}
            <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl flex flex-col justify-between" id="threat-summary-widget">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 fill-red-500/20" />
                    <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
                      THREAT SUMMARY
                    </h3>
                  </div>

                  <span className="text-[10px] font-mono-code text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    REAL-TIME INTEL
                  </span>
                </div>

                {/* Donut Chart and Breakdown */}
                <div className="flex items-center justify-around gap-3 bg-[#010816]/70 rounded-xl p-3 border border-cyan-500/20 mb-3">
                  {/* Donut Center */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="24" fill="none" stroke="#0f172a" strokeWidth="6" />
                      {/* High (Red) - 25% */}
                      <circle cx="30" cy="30" r="24" fill="none" stroke="#ef4444" strokeWidth="6" strokeDasharray="150.8" strokeDashoffset="113.1" />
                      {/* Medium (Amber) - 42% */}
                      <circle cx="30" cy="30" r="24" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="150.8" strokeDashoffset="75.4" className="rotate-[90deg] origin-center" />
                      {/* Low (Cyan) - 33% */}
                      <circle cx="30" cy="30" r="24" fill="none" stroke="#06b6d4" strokeWidth="6" strokeDasharray="150.8" strokeDashoffset="100.5" className="rotate-[240deg] origin-center" />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-lg font-display font-black text-white leading-none">12</span>
                      <span className="text-[7.5px] font-mono-code text-slate-400 uppercase leading-none mt-0.5">Active Threats</span>
                    </div>
                  </div>

                  {/* Threat Count Legend */}
                  <div className="space-y-1.5 text-xs font-tech">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-slate-300">High</span>
                      </div>
                      <span className="font-mono-code font-bold text-red-400">3</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="text-slate-300">Medium</span>
                      </div>
                      <span className="font-mono-code font-bold text-amber-300">5</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-slate-300">Low</span>
                      </div>
                      <span className="font-mono-code font-bold text-cyan-300">4</span>
                    </div>
                  </div>
                </div>

                {/* Top Threats List */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono-code text-cyan-400 font-bold tracking-wider uppercase mb-1">
                    TOP THREATS
                  </div>

                  {[
                    { id: 'T-01', desc: 'Infiltration Attempt – Sector 7', level: 'HIGH', badgeBg: 'bg-red-950 text-red-300 border-red-500/70', dist: '1.2 km away' },
                    { id: 'T-02', desc: 'UAV Swarm Tracked – LOC Road', level: 'HIGH', badgeBg: 'bg-red-950 text-red-300 border-red-500/70', dist: '4.8 km away' },
                    { id: 'T-03', desc: 'Suspicious Vehicle – NH 44 Checkpost', level: 'MED', badgeBg: 'bg-amber-950 text-amber-300 border-amber-500/70', dist: '8.4 km away' }
                  ].map(th => (
                    <div
                      key={th.id}
                      className="p-1.5 rounded-lg bg-[#01091a]/80 border border-slate-800 flex items-center justify-between text-xs font-tech hover:bg-[#02132d] transition"
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <span className="font-mono-code text-slate-400 font-bold text-[10px]">
                          {th.id}
                        </span>
                        <span className="text-slate-200 truncate">
                          {th.desc}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[9px] font-mono-code text-slate-400 hidden sm:inline">
                          {th.dist}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded border text-[9px] font-mono-code font-bold ${th.badgeBg}`}>
                          {th.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View All Threats Button */}
              <button
                type="button"
                onClick={onNavigateToThreats}
                className="w-full mt-3 py-2 px-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-tech font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>VIEW ALL THREATS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ======================= RIGHT 4 COLUMNS: 6 TACTICAL WIDGETS ======================= */}
        <div className="lg:col-span-4 flex flex-col space-y-3.5 sm:space-y-4">
          {/* Widget 1: SYSTEM CONTROLS */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-3">
              <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
                SYSTEM CONTROLS
              </h3>
              <span className="text-[10px] font-mono-code text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <div className="space-y-2">
              {[
                { label: 'AI Object Detection', desc: 'Real-time YOLOv8 bounding tracking', active: isAiBoxesActive, onToggle: () => setIsAiBoxesActive(!isAiBoxesActive) },
                { label: 'Auto Threat Classification', desc: 'Neural threat prioritization engine', active: true, onToggle: () => triggerQuickAction('THREAT CLASSIFIER CALIBRATED') },
                { label: 'Live GPS Weather Sync', desc: 'Direct IMD / Open-Meteo telemetry', active: location.isLiveGps, onToggle: () => requestLiveLocation() }
              ].map((ctrl, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-[#01091a]/80 border border-cyan-500/20 hover:bg-[#02132d] transition">
                  <div>
                    <div className="text-xs sm:text-sm font-tech font-bold text-slate-900 dark:text-slate-100">
                      {ctrl.label}
                    </div>
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-400">
                      {ctrl.desc}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-mono-code font-black tracking-wider shadow-xs ${
                      ctrl.active 
                        ? 'bg-emerald-100 text-emerald-950 border-2 border-emerald-600 dark:bg-emerald-500/25 dark:text-emerald-300 dark:border-emerald-400'
                        : 'bg-slate-200 text-slate-950 border-2 border-slate-400 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600'
                    }`}>
                      {ctrl.active ? 'ON' : 'OFF'}
                    </span>
                    <button
                      type="button"
                      onClick={ctrl.onToggle}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer border ${
                        ctrl.active ? 'bg-cyan-600 border-cyan-700 dark:bg-cyan-500 dark:border-cyan-400' : 'bg-slate-300 border-slate-400 dark:bg-slate-700 dark:border-slate-600'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                        ctrl.active ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 2: RECENT EVENTS */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-2.5">
              <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
                RECENT EVENTS
              </h3>
              <span className="text-[10px] font-mono-code text-cyan-400">SYNCED</span>
            </div>

            <div className="space-y-2">
              {[
                { time: '21:47:32', title: 'Drone detected – LOC Road', level: 'HIGH', badgeBg: 'bg-red-950 text-red-300 border-red-500/70', icon: Plane, iconColor: 'text-red-400' },
                { time: '21:46:18', title: 'Movement near Border Fence', level: 'MEDIUM', badgeBg: 'bg-amber-950 text-amber-300 border-amber-500/70', icon: Eye, iconColor: 'text-amber-400' },
                { time: '21:42:11', title: `Weather sync – ${location.shortName || 'Live Sector'}`, level: 'INFO', badgeBg: 'bg-blue-950 text-blue-300 border-blue-500/70', icon: CloudRain, iconColor: 'text-blue-400' },
                { time: '21:38:05', title: 'Vehicle spotted – NH 44', level: 'LOW', badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-500/70', icon: Crosshair, iconColor: 'text-emerald-400' },
                { time: '21:32:40', title: 'Unusual signal – Sector 7', level: 'MEDIUM', badgeBg: 'bg-amber-950 text-amber-300 border-amber-500/70', icon: Radio, iconColor: 'text-amber-400' }
              ].map((ev, idx) => {
                const EvIcon = ev.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-1.5 rounded-lg bg-[#01091a]/80 hover:bg-[#02132d] border border-slate-800 transition"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <EvIcon className={`w-3.5 h-3.5 shrink-0 ${ev.iconColor}`} />
                      <div className="min-w-0">
                        <div className="text-[11px] font-tech text-slate-200 truncate font-semibold">
                          {ev.title}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9.5px] font-mono-code text-slate-400">
                        {ev.time}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded border text-[8.5px] font-mono-code font-bold ${ev.badgeBg}`}>
                        {ev.level}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Widget 3: QUICK ACTIONS (EXACT 3 BUTTONS MATCHING USER IMAGE) */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-2.5">
              <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
                QUICK ACTIONS
              </h3>
              {savedSnapshots.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowSnapshotsModal(true)}
                  className="text-[10px] font-mono-code text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Gallery ({savedSnapshots.length})</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Action 1: View All Feeds */}
              <button
                type="button"
                onClick={handleViewAllFeeds}
                className="py-2.5 px-2 rounded-xl bg-[#021833] hover:bg-[#032852] border border-cyan-500/40 text-cyan-300 hover:text-white flex flex-col items-center justify-center gap-1 text-[10px] font-tech font-bold transition cursor-pointer group shadow-sm active:scale-95"
              >
                <Camera className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-center leading-tight">View All Feeds</span>
              </button>

              {/* Action 2: Request Drone */}
              <button
                type="button"
                onClick={handleOpenDroneRequest}
                className="py-2.5 px-2 rounded-xl bg-[#021833] hover:bg-[#032852] border border-cyan-500/40 text-cyan-300 hover:text-white flex flex-col items-center justify-center gap-1 text-[10px] font-tech font-bold transition cursor-pointer group shadow-sm active:scale-95"
              >
                <Plane className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-center leading-tight">Request Drone</span>
              </button>

              {/* Action 3: Save Snapshot */}
              <button
                type="button"
                onClick={() => handleCaptureSnapshot()}
                className="py-2.5 px-2 rounded-xl bg-[#021833] hover:bg-[#032852] border border-cyan-500/40 text-cyan-300 hover:text-white flex flex-col items-center justify-center gap-1 text-[10px] font-tech font-bold transition cursor-pointer group shadow-sm active:scale-95"
              >
                <Camera className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-center leading-tight">Save Snapshot</span>
              </button>
            </div>
          </div>

          {/* Widget 4: WEATHER & INTELLIGENCE (BASED STRICTLY ON LIVE LOCATION) */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-2.5">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
                  WEATHER & INTELLIGENCE
                </h3>
              </div>

              {/* Live Location Indicator */}
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-1 text-[10px] font-mono-code text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 font-bold max-w-[150px] truncate" title={location.name}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="truncate">{location.shortName || location.name}</span>
                </span>

                <button
                  type="button"
                  onClick={requestLiveLocation}
                  title="Re-acquire Live GPS Coordinates"
                  className="p-1 rounded bg-[#01142e] hover:bg-[#032657] border border-cyan-500/40 text-cyan-300 hover:text-white transition cursor-pointer"
                >
                  <Compass className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-400/40 flex items-center justify-center text-blue-400">
                  {getWeatherIcon(weather.weatherCode)}
                </div>
                <div>
                  <div className="text-xl font-display font-bold text-white leading-none">
                    {weather.temperature}°C
                  </div>
                  <div className="text-[10.5px] font-tech text-slate-300 mt-0.5">
                    {weather.condition}
                  </div>
                </div>
              </div>

              <div className="text-[10.5px] font-mono-code space-y-0.5 text-slate-300">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Humidity</span>
                  <span className="font-bold text-white">{weather.humidity}%</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Wind</span>
                  <span className="font-bold text-white">{weather.windSpeed} km/h</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Visibility</span>
                  <span className="font-bold text-white">{weather.visibility} km</span>
                </div>
              </div>
            </div>

            {/* Tactical Intelligence Analysis (Derived from Live Telemetry) */}
            <div className="mt-2.5 p-2 rounded-xl bg-[#010a1b]/90 border border-cyan-500/25 space-y-1.5 text-[10px] font-mono-code">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <Plane className="w-3 h-3 text-cyan-400" />
                  <span>UAV Flight Status:</span>
                </span>
                <span className={`px-1.5 py-0.2 rounded font-bold ${uavFlight.bg} ${uavFlight.color}`}>
                  {uavFlight.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-purple-400" />
                  <span>Optics Priority:</span>
                </span>
                <span className={`font-semibold ${isFlirPriority ? 'text-amber-300' : 'text-cyan-300'}`}>
                  {isFlirPriority ? 'FLIR Thermal IR' : 'Day 4K Optical'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-slate-400" />
                  <span>Air Density:</span>
                </span>
                <span className="text-slate-300 font-bold">
                  {airDensity} kg/m³ ({weather.pressure} hPa)
                </span>
              </div>
            </div>

            {/* Dynamic Advisories & Tactical Dossier Trigger */}
            <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-800">
              <div className="flex-1 py-1 px-1.5 rounded bg-blue-950/50 border border-blue-500/40 text-blue-300 text-[9px] font-mono-code flex items-center justify-center gap-1">
                <CloudRain className="w-3 h-3 text-blue-400" />
                <span className="truncate">
                  {weather.precipitation > 0 ? `Rain ${weather.precipitation}mm` : 'Clear Precip'}
                </span>
              </div>

              <div className="flex-1 py-1 px-1.5 rounded bg-amber-950/50 border border-amber-500/40 text-amber-300 text-[9px] font-mono-code flex items-center justify-center gap-1">
                <Wind className="w-3 h-3 text-amber-400" />
                <span className="truncate">
                  {weather.windSpeed > 25 ? 'High Wind' : 'Norm Wind'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowWeatherIntelModal(true)}
                className="flex-1 py-1 px-1.5 rounded bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-400 text-cyan-200 text-[9px] font-mono-code flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <FileText className="w-3 h-3 text-cyan-400" />
                <span className="truncate">Intel Dossier</span>
              </button>
            </div>
          </div>

          {/* Widget 5: MISSION STATUS */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase mb-2">
              MISSION STATUS
            </h3>

            <div className="flex items-center gap-4 bg-[#010816]/70 p-2.5 rounded-xl border border-cyan-500/20">
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="#0a192f" strokeWidth="4" />
                  <circle
                    cx="28"
                    cy="28"
                    r="22"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="4"
                    strokeDasharray="138.2"
                    strokeDashoffset="18"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-tech font-bold text-white">
                  87%
                </div>
              </div>

              <div className="space-y-1 text-xs font-tech">
                <div className="text-[11px] font-mono-code text-cyan-400 font-bold uppercase leading-none">
                  OPERATIONAL READINESS
                </div>
                <div className="text-[11px] text-slate-300">
                  MISSION : <strong className="text-white">OPERATION VAJRA SHIELD</strong>
                </div>
                <div className="text-[11px] text-slate-300">
                  STATUS : <span className="text-emerald-400 font-bold">ACTIVE DEPLOYMENT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 6: COMMUNICATIONS */}
          <div className="rounded-2xl bg-[#020b1c]/90 border border-cyan-500/30 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-2">
              <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
                COMMUNICATIONS
              </h3>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-tech font-bold text-white">QUANTUM-ENCRYPTED LINK</div>
                  <div className="text-[10px] font-mono-code text-slate-400">Freq: 842.15 MHz • High SNR</div>
                </div>
              </div>

              {/* Animated Audio Signal Wave */}
              <div className="w-24 h-6 flex items-center justify-end gap-0.5">
                {[4, 12, 8, 16, 22, 14, 26, 18, 10, 14, 20, 8, 5].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-1 bg-emerald-400/80 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: ALL LIVE FEEDS - TACTICAL VIDEO MATRIX WALL (QUICK ACTION)       */}
      {/* ========================================================================= */}
      {showAllFeedsModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#020c24] border border-cyan-500/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#031438] border-b border-cyan-500/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-400">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-tech font-bold text-white tracking-wider flex items-center gap-2">
                    <span>TACTICAL VIDEO WALL // ALL LIVE FEEDS MATRIX</span>
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono-code font-bold uppercase animate-pulse">
                      {feedsList.length} FEEDS ACTIVE
                    </span>
                  </h3>
                  <p className="text-xs font-mono-code text-cyan-400">
                    REAL-TIME MULTI-SPECTRUM STREAMS • UTC {currentTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAiBoxesActive(!isAiBoxesActive)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-code border transition cursor-pointer flex items-center gap-1.5 ${
                    isAiBoxesActive
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>AI Detections: {isAiBoxesActive ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAllFeedsModal(false)}
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Matrix Grid */}
            <div className="p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 bg-[#01091a]">
              {feedsList.map(feed => {
                const FeedIcon = feed.icon;
                return (
                  <div
                    key={feed.id}
                    className="group rounded-xl bg-[#020e29] border border-cyan-500/40 hover:border-cyan-400 overflow-hidden flex flex-col shadow-lg transition"
                  >
                    <div className="px-3 py-2 bg-[#03153b] border-b border-cyan-500/20 flex items-center justify-between text-xs font-tech">
                      <div className="flex items-center gap-2 min-w-0 pr-1">
                        <FeedIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-white font-bold truncate">
                          {feed.title}
                        </span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[8.5px] font-mono-code font-bold bg-red-600 text-white">
                        {feed.badge}
                      </span>
                    </div>

                    <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
                      <img
                        src={feed.imageSrc}
                        alt={feed.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />

                      {/* AI Bounding Boxes */}
                      {isAiBoxesActive && feed.boundingBoxes.map((box, idx) => (
                        <div
                          key={idx}
                          style={{
                            top: box.top,
                            left: box.left,
                            width: box.width,
                            height: box.height
                          }}
                          className="absolute border-2 border-cyan-400 pointer-events-none"
                        >
                          <span className="absolute -top-3.5 left-0 px-1 py-0.2 text-[7px] font-mono-code bg-cyan-950 text-cyan-300 border border-cyan-500 uppercase">
                            {box.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 bg-[#020c24] border-t border-cyan-500/20 flex items-center justify-between text-xs font-mono-code">
                      <span className="text-cyan-400 font-bold">{feed.camId}</span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCaptureSnapshot(feed)}
                          className="px-2 py-1 rounded bg-[#011b3d] hover:bg-cyan-900 border border-cyan-400/50 text-cyan-300 hover:text-white flex items-center gap-1 text-[10px] transition cursor-pointer"
                        >
                          <Camera className="w-3 h-3" />
                          <span>Snapshot</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowAllFeedsModal(false);
                            setSelectedFeed(feed);
                          }}
                          className="px-2 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center gap-1 text-[10px] transition cursor-pointer"
                        >
                          <ZoomIn className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-[#031438] border-t border-cyan-500/30 flex items-center justify-between text-xs font-mono-code text-slate-300 shrink-0">
              <div>
                STREAM HEALTH: <span className="text-emerald-400 font-bold">100% LATENCY &lt; 15MS</span> • ENCRYPTION: <span className="text-cyan-400 font-bold">AES-256 GCM</span>
              </div>
              <button
                type="button"
                onClick={() => setShowAllFeedsModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-tech font-bold transition cursor-pointer"
              >
                Close Matrix
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: REQUEST DRONE RECONNAISSANCE DISPATCH (QUICK ACTION)            */}
      {/* ========================================================================= */}
      {showDroneModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#020c24] border border-cyan-500/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 bg-[#031438] border-b border-cyan-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-tech font-bold text-white tracking-wider">
                    DRONE RECONNAISSANCE & AIR PATROL DISPATCH
                  </h3>
                  <p className="text-xs font-mono-code text-cyan-400">
                    INDIAN ARMED FORCES INTEGRATED UAV FLEET COMMAND
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDroneModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLaunchDrone} className="p-5 space-y-4 bg-[#01091a]">
              {/* UAV Platform Selection */}
              <div>
                <label className="block text-xs font-tech font-bold text-cyan-300 uppercase mb-1.5">
                  Select Tactical UAV Platform
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'NETRA-V4 Quadcopter', desc: 'Tactical Low-Altitude • 4K Optical/IR • 45 min loiter' },
                    { name: 'HERON-TP High Altitude UAV', desc: 'Strategic Range • Longwave FLIR • SAR Radar' },
                    { name: 'RUSTOM-II Combat UAV', desc: 'Medium Altitude MALE • Autonomous Infiltration' },
                    { name: 'NISHANT Battlefield UAV', desc: 'Tactical Recon & Forward Laser Designation' }
                  ].map(uav => (
                    <button
                      type="button"
                      key={uav.name}
                      onClick={() => setDroneForm(prev => ({ ...prev, uavType: uav.name }))}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                        droneForm.uavType === uav.name
                          ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                          : 'bg-[#020e29] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-tech font-bold text-cyan-400">{uav.name}</div>
                      <div className="text-[10px] font-mono-code text-slate-400 mt-0.5">{uav.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Operational Sector (Defaults to Live Location!) */}
              <div>
                <label className="block text-xs font-tech font-bold text-cyan-300 uppercase mb-1.5 flex items-center justify-between">
                  <span>Target Operational Sector</span>
                  <span className="text-[10px] font-mono-code text-emerald-400">
                    LIVE GPS: {location.name}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={droneForm.sector}
                    onChange={(e) => setDroneForm(prev => ({ ...prev, sector: e.target.value }))}
                    placeholder={`e.g., ${location.shortName || location.name} Perimeter Ridge`}
                    className="w-full px-3 py-2 rounded-xl bg-[#020e29] border border-cyan-500/40 text-white text-xs font-tech focus:border-cyan-400 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setDroneForm(prev => ({ ...prev, sector: `${location.shortName || location.name} Tactical Sector` }))}
                    className="absolute right-2 top-1.5 px-2 py-0.5 rounded bg-cyan-900/60 border border-cyan-400 text-[10px] font-mono-code text-cyan-300"
                  >
                    Use Live GPS
                  </button>
                </div>
              </div>

              {/* Mission Objective */}
              <div>
                <label className="block text-xs font-tech font-bold text-cyan-300 uppercase mb-1.5">
                  Mission Objective & Directives
                </label>
                <select
                  value={droneForm.mission}
                  onChange={(e) => setDroneForm(prev => ({ ...prev, mission: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-[#020e29] border border-cyan-500/40 text-white text-xs font-tech focus:border-cyan-400 focus:outline-none"
                >
                  <option value="Perimeter Sweep & Infiltration Recon">Perimeter Sweep & Infiltration Recon</option>
                  <option value="Autonomous FLIR Night Patrol">Autonomous FLIR Night Patrol</option>
                  <option value="High-Value Target Tracking">High-Value Target Tracking</option>
                  <option value="Search & Rescue Grid Sweep">Search & Rescue Grid Sweep</option>
                </select>
              </div>

              {/* Flight Altitude & Loiter Speed */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-tech text-slate-300 mb-1">
                    Operating Altitude: <strong className="text-cyan-400">{droneForm.altitude} m</strong>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    step="50"
                    value={droneForm.altitude}
                    onChange={(e) => setDroneForm(prev => ({ ...prev, altitude: parseInt(e.target.value) }))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-tech text-slate-300 mb-1">
                    Loiter Speed: <strong className="text-cyan-400">{droneForm.speed} km/h</strong>
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    step="5"
                    value={droneForm.speed}
                    onChange={(e) => setDroneForm(prev => ({ ...prev, speed: parseInt(e.target.value) }))}
                    className="w-full accent-cyan-400"
                  />
                </div>
              </div>

              {/* Sensor Payloads */}
              <div>
                <label className="block text-xs font-tech font-bold text-cyan-300 uppercase mb-1.5">
                  Sensor Payload Active Configuration
                </label>
                <div className="flex flex-wrap gap-2 text-xs font-mono-code">
                  <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#020e29] border border-cyan-500/30 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={droneForm.payloadEO}
                      onChange={(e) => setDroneForm(prev => ({ ...prev, payloadEO: e.target.checked }))}
                      className="accent-cyan-400"
                    />
                    <span>4K Electro-Optical</span>
                  </label>

                  <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#020e29] border border-cyan-500/30 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={droneForm.payloadFLIR}
                      onChange={(e) => setDroneForm(prev => ({ ...prev, payloadFLIR: e.target.checked }))}
                      className="accent-cyan-400"
                    />
                    <span>FLIR Thermal Imaging</span>
                  </label>

                  <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#020e29] border border-cyan-500/30 text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={droneForm.payloadLaser}
                      onChange={(e) => setDroneForm(prev => ({ ...prev, payloadLaser: e.target.checked }))}
                      className="accent-cyan-400"
                    />
                    <span>Laser Rangefinder</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-cyan-500/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDroneModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-tech font-bold transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLaunchingDrone}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-tech font-bold flex items-center gap-2 transition cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50"
                >
                  {isLaunchingDrone ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>ARMING ROTORS & LAUNCHING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>LAUNCH DRONE RECON MISSION</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: SAVED SNAPSHOTS GALLERY (QUICK ACTION)                          */}
      {/* ========================================================================= */}
      {showSnapshotsModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#020c24] border border-cyan-500/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="px-5 py-4 bg-[#031438] border-b border-cyan-500/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-400">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-tech font-bold text-white tracking-wider">
                    SAVED TACTICAL SNAPSHOTS GALLERY
                  </h3>
                  <p className="text-xs font-mono-code text-cyan-400">
                    {savedSnapshots.length} FRAMES CAPTURED & AUDITED
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSnapshotsModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#01091a]">
              {savedSnapshots.length === 0 ? (
                <div className="col-span-2 py-12 text-center text-slate-400 font-mono-code">
                  No snapshots captured yet. Click "Save Snapshot" on any feed to capture high-res surveillance frames.
                </div>
              ) : (
                savedSnapshots.map(snap => (
                  <div key={snap.id} className="rounded-xl bg-[#020e29] border border-cyan-500/30 overflow-hidden flex flex-col">
                    <div className="relative aspect-video bg-black">
                      <img src={snap.dataUrl} alt={snap.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 space-y-1 text-xs font-mono-code bg-[#020b1c]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-400">{snap.camId}</span>
                        <span className="text-slate-400">{snap.timestamp}</span>
                      </div>
                      <div className="text-slate-200 truncate">{snap.title}</div>
                      <div className="text-[10px] text-emerald-400">{snap.locationName}</div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                        <a
                          href={snap.dataUrl}
                          download={`Vajra_Snapshot_${snap.camId}.png`}
                          className="px-2.5 py-1 rounded bg-cyan-900/60 hover:bg-cyan-800 border border-cyan-400 text-cyan-200 flex items-center gap-1 text-[11px]"
                        >
                          <Download className="w-3 h-3" />
                          <span>Re-download</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setSavedSnapshots(prev => prev.filter(s => s.id !== snap.id))}
                          className="p-1 text-slate-400 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-5 py-3 bg-[#031438] border-t border-cyan-500/30 flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={() => setShowSnapshotsModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-tech font-bold text-xs"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: WEATHER & TACTICAL INTEL DOSSIER (LIVE LOCATION BASED)          */}
      {/* ========================================================================= */}
      {showWeatherIntelModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#020c24] border border-cyan-500/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="px-5 py-4 bg-[#031438] border-b border-cyan-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-400 flex items-center justify-center text-blue-400">
                  <CloudRain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-tech font-bold text-white tracking-wider flex items-center gap-2">
                    <span>TACTICAL WEATHER & ENVIRONMENTAL INTEL DOSSIER</span>
                  </h3>
                  <p className="text-xs font-mono-code text-cyan-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>OPERATIONAL THEATER: {location.name} [{location.latitude.toFixed(4)}°N, {location.longitude.toFixed(4)}°E]</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowWeatherIntelModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 bg-[#01091a] overflow-y-auto max-h-[75vh]">
              {/* Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#020e29] border border-cyan-500/30">
                  <div className="text-[10px] font-mono-code text-slate-400 uppercase">Surface Temperature</div>
                  <div className="text-xl font-display font-bold text-white mt-0.5">{weather.temperature}°C</div>
                  <div className="text-[9.5px] font-mono-code text-cyan-400">Feels like {weather.temperature + 1}°C</div>
                </div>

                <div className="p-3 rounded-xl bg-[#020e29] border border-cyan-500/30">
                  <div className="text-[10px] font-mono-code text-slate-400 uppercase">Surface Wind Speed</div>
                  <div className="text-xl font-display font-bold text-white mt-0.5">{weather.windSpeed} km/h</div>
                  <div className="text-[9.5px] font-mono-code text-cyan-400">Bearing {weather.windDirection}°</div>
                </div>

                <div className="p-3 rounded-xl bg-[#020e29] border border-cyan-500/30">
                  <div className="text-[10px] font-mono-code text-slate-400 uppercase">Atmospheric Visibility</div>
                  <div className="text-xl font-display font-bold text-white mt-0.5">{weather.visibility} km</div>
                  <div className="text-[9.5px] font-mono-code text-emerald-400">Optics Penetration: High</div>
                </div>

                <div className="p-3 rounded-xl bg-[#020e29] border border-cyan-500/30">
                  <div className="text-[10px] font-mono-code text-slate-400 uppercase">Barometric Pressure</div>
                  <div className="text-xl font-display font-bold text-white mt-0.5">{weather.pressure} hPa</div>
                  <div className="text-[9.5px] font-mono-code text-purple-400">Air Dens: {airDensity} kg/m³</div>
                </div>
              </div>

              {/* Combat Envelope Analysis */}
              <div className="p-4 rounded-xl bg-[#020e29] border border-cyan-500/30 space-y-3">
                <h4 className="text-xs font-tech font-bold text-cyan-300 uppercase tracking-wider">
                  Tactical Operations Assessment ({location.shortName || location.name})
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-tech">
                  <div className="p-2.5 rounded-lg bg-[#010a1c] border border-slate-800 space-y-1">
                    <div className="text-slate-400 font-bold">UAV Flight Corridor:</div>
                    <div className={`font-mono-code font-bold ${uavFlight.color}`}>{uavFlight.status} — {uavFlight.desc}</div>
                    <div className="text-[10px] text-slate-400">Wind gust threshold: 45 km/h max loiter</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#010a1c] border border-slate-800 space-y-1">
                    <div className="text-slate-400 font-bold">Surveillance Optics Strategy:</div>
                    <div className="font-mono-code text-cyan-300 font-bold">
                      {isFlirPriority ? 'FLIR Thermal LWIR Priority (High Moisture)' : '4K Optical EO Primary (Optimal Light)'}
                    </div>
                    <div className="text-[10px] text-slate-400">Sensor switch recommendation active</div>
                  </div>
                </div>
              </div>

              {/* Location Verification & Refresh */}
              <div className="p-3 rounded-xl bg-[#020e29] border border-emerald-500/30 flex items-center justify-between text-xs font-mono-code">
                <div className="flex items-center gap-2 text-slate-300">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>
                    Current Geographic Fix: <strong>{location.name}</strong> ({location.isLiveGps ? 'High-Precision GPS' : 'Detected Regional Grid'})
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    requestLiveLocation();
                    refreshWeather();
                    triggerQuickAction('LIVE GPS COORDINATES RE-ACQUIRED');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500/50 text-emerald-300 hover:text-white flex items-center gap-1.5 cursor-pointer font-tech font-bold"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh GPS Fix</span>
                </button>
              </div>
            </div>

            <div className="px-5 py-3 bg-[#031438] border-t border-cyan-500/30 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowWeatherIntelModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-tech font-bold text-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEED INSPECTION MODAL                                                    */}
      {/* ========================================================================= */}
      {selectedFeed && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#020c24] border border-cyan-500/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="px-4 py-3 bg-[#031438] border-b border-cyan-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <selectedFeed.icon className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-tech font-bold text-white tracking-wider">
                  {selectedFeed.title} — HIGH-RESOLUTION INSPECT
                </h3>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono-code font-bold uppercase">
                  {selectedFeed.badge}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAiBoxesActive(!isAiBoxesActive)}
                  className={`px-2.5 py-1 rounded text-xs font-mono-code border transition cursor-pointer ${
                    isAiBoxesActive
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  AI Bounding Boxes: {isAiBoxesActive ? 'ON' : 'OFF'}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFeed(null)}
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body Video Feed */}
            <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
              <img
                src={selectedFeed.imageSrc}
                alt={selectedFeed.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Tactical Crosshair Reticle in Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <div className="w-32 h-32 border border-cyan-400/50 rounded-full" />
                <div className="absolute w-48 h-px bg-cyan-400/40" />
                <div className="absolute h-48 w-px bg-cyan-400/40" />
              </div>

              {/* Bounding Boxes */}
              {isAiBoxesActive && selectedFeed.boundingBoxes.map((box, idx) => (
                <div
                  key={idx}
                  style={{
                    top: box.top,
                    left: box.left,
                    width: box.width,
                    height: box.height
                  }}
                  className={`absolute border-2 pointer-events-none ${
                    box.color === 'red'
                      ? 'border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                      : box.color === 'emerald'
                      ? 'border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
                      : 'border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]'
                  }`}
                >
                  <span className={`absolute -top-4 left-0 px-1.5 py-0.5 text-[8.5px] font-mono-code font-bold uppercase rounded ${
                    box.color === 'red'
                      ? 'bg-red-950 text-red-300 border border-red-500'
                      : box.color === 'emerald'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                      : 'bg-cyan-950 text-cyan-300 border border-cyan-500'
                  }`}>
                    {box.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Modal Footer Controls */}
            <div className="p-3 bg-[#020d26] border-t border-cyan-500/30 flex items-center justify-between text-xs font-mono-code">
              <div className="flex items-center gap-4 text-slate-300">
                <span>FPS: <strong className="text-emerald-400">60.0</strong></span>
                <span>Bitrate: <strong className="text-cyan-400">8.4 Mbps</strong></span>
                <span>Resolution: <strong className="text-white">3840x2160 UHD</strong></span>
                <span>Latency: <strong className="text-cyan-300">14 ms</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCaptureSnapshot(selectedFeed)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-900/80 hover:bg-cyan-800 border border-cyan-400 text-white font-tech font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Snapshot</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFeed(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-tech transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
