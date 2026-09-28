import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  Camera, 
  Radio, 
  Layers, 
  Calendar, 
  Clock, 
  Search, 
  Sliders, 
  Eye, 
  Crosshair, 
  Film, 
  Sparkles, 
  HardDrive, 
  Download, 
  ChevronRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { CctvCamera, CctvRecordingClip } from '../../types/surveillance';
import { SURVEILLANCE_CAMERAS, SURVEILLANCE_RECORDINGS } from '../../data/surveillanceData';
import { useSettings } from '../../context/SettingsContext';

interface CctvMonitoringViewProps {
  initialCameraId?: string;
  initialMode?: 'LIVE_GRID' | 'RECORDED';
  onNavigateToAlerts?: () => void;
}

// Individual CCTV Video Player Component
const CctvPlayerCard: React.FC<{
  camera: CctvCamera;
  isFocused?: boolean;
  onSelectFocus?: () => void;
  showAiOverlayDefault?: boolean;
  size?: 'small' | 'medium' | 'large';
}> = ({ camera, isFocused = false, onSelectFocus, showAiOverlayDefault = true, size = 'small' }) => {
  const { theme } = useSettings();
  const isLight = theme === 'Light';
  const isSmall = size === 'small';

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.8);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showAiOverlay, setShowAiOverlay] = useState<boolean>(showAiOverlayDefault);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Time formatting helper (MM:SS)
  const formatSecs = (sec: number) => {
    if (isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Video event handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Capture frame snapshot
  const handleSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 360;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const a = document.createElement('a');
      a.download = `cctv_snapshot_${camera.id}_${Date.now()}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative rounded-xl border flex flex-col overflow-hidden transition-all duration-200 ${
        isFocused 
          ? 'ring-2 ring-cyan-400 border-cyan-400 shadow-2xl' 
          : isLight 
            ? 'bg-white border-slate-300 shadow-sm' 
            : 'bg-[#020b1c]/95 border-cyan-500/40 shadow-lg'
      }`}
    >
      {/* Top Header of CCTV Window */}
      <div className={`border-b flex items-center justify-between font-mono-code font-bold backdrop-blur-md ${
        isSmall ? 'px-2 py-1 text-[11px]' : 'px-3 py-2 text-xs'
      } ${
        isLight ? 'bg-slate-100/90 border-slate-300 text-slate-900' : 'bg-[#031533]/90 border-cyan-500/30 text-white'
      }`}>
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="px-1.5 py-0.5 rounded bg-cyan-600/30 text-cyan-400 border border-cyan-500/50 text-[9px] shrink-0">
            {camera.id}
          </span>
          <span className={`font-tech font-bold tracking-wider truncate ${isSmall ? 'text-[11px]' : 'text-xs'}`}>
            {camera.name}
          </span>
          <span className={`text-[9.5px] text-slate-400 truncate ${isSmall ? 'hidden 2xl:inline' : 'hidden sm:inline'}`}>
            ({camera.location})
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Status indicators */}
          <div className="flex items-center gap-1 text-[8.5px]">
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isSmall ? 'LIVE' : 'ONLINE'}
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              REC
            </span>
          </div>

          {/* AI Overlay toggle button */}
          <button
            onClick={() => setShowAiOverlay(!showAiOverlay)}
            className={`p-1 rounded border text-[9px] flex items-center gap-1 transition cursor-pointer ${
              showAiOverlay 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold' 
                : isLight ? 'bg-slate-200 border-slate-300 text-slate-600' : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle AI Optical Analytics Bounding Overlays"
          >
            <Crosshair className="w-2.5 h-2.5" />
            <span className={isSmall ? "hidden" : "hidden md:inline"}>HUD</span>
          </button>
        </div>
      </div>

      {/* Main Video Screen Area */}
      <div className={`relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center group ${
        isSmall ? 'max-h-[220px]' : ''
      }`}>
        {/* ACTUAL PLAYABLE HTML5 CCTV VIDEO PLAYER */}
        <video
          ref={videoRef}
          src={camera.videoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={() => {
            if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) setDuration(videoRef.current.duration);
          }}
          className="w-full h-full object-cover"
        />

        {/* AI Analytics & Tactical Telemetry HUD Overlay */}
        {showAiOverlay && (
          <div className="absolute inset-0 pointer-events-none p-2 sm:p-2.5 flex flex-col justify-between select-none">
            {/* Top HUD Line */}
            <div className={`flex items-center justify-between font-mono-code text-cyan-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] ${
              isSmall ? 'text-[8.5px]' : 'text-[10px]'
            }`}>
              <div className="flex items-center gap-1.5 bg-black/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
                <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                <span>CH: {camera.id} | {camera.resolution}</span>
              </div>
              <div className="bg-black/60 px-1.5 py-0.5 rounded border border-cyan-500/30 hidden xs:block">
                <span>FPS: 25 | 18ms</span>
              </div>
            </div>

            {/* Center Crosshair or Scanlines effect */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

            {/* Bottom HUD Line */}
            <div className={`flex items-center justify-between font-mono-code text-cyan-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] z-10 ${
              isSmall ? 'text-[8.5px]' : 'text-[10px]'
            }`}>
              <div className="bg-black/70 px-1.5 py-0.5 rounded border border-cyan-500/30">
                <span>NODE: {camera.edgeNodeId.replace('EDGE-', '')}</span>
              </div>
              <div className="bg-black/70 px-1.5 py-0.5 rounded border border-cyan-500/30 text-amber-300">
                <span>DET: {camera.activeDetectionsCount}</span>
              </div>
            </div>
          </div>
        )}

        {/* Hover Big Play/Pause Toggle Indicator */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
        >
          <div className={`${isSmall ? 'p-2' : 'p-3.5'} rounded-full bg-cyan-600/80 backdrop-blur-md border border-cyan-300 shadow-xl hover:scale-110 transition-transform`}>
            {isPlaying ? (
              <Pause className={isSmall ? "w-4 h-4" : "w-6 h-6"} />
            ) : (
              <Play className={isSmall ? "w-4 h-4 ml-0.5" : "w-6 h-6 ml-0.5"} />
            )}
          </div>
        </button>

        {/* Prototype Demo Video Watermark Pill */}
        <div className="absolute top-1.5 left-1.5 pointer-events-none z-10">
          <span className={`px-1.5 py-0.5 rounded bg-black/75 border border-cyan-400/40 font-mono-code text-cyan-300 tracking-wider ${
            isSmall ? 'text-[8px]' : 'text-[9px]'
          }`}>
            FEED {camera.id}
          </span>
        </div>
      </div>

      {/* CCTV VIDEO CONTROLS BAR (Play, Pause, Timeline, Volume, Fullscreen, Speed) */}
      <div className={`border-t font-mono-code ${
        isSmall ? 'p-1.5 space-y-1 text-[11px]' : 'p-2.5 space-y-1.5 text-xs'
      } ${
        isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-[#020b1c] border-cyan-500/30 text-slate-200'
      }`}>
        {/* Timeline Scrubber */}
        <div className="flex items-center gap-1.5">
          <span className={`text-cyan-400 font-bold ${isSmall ? 'text-[9px] min-w-[28px]' : 'text-[10px] min-w-[36px]'}`}>
            {formatSecs(currentTime)}
          </span>
          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 12}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className={`w-full ${isSmall ? 'h-1' : 'h-1.5'} bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300`}
            />
          </div>
          <span className={`text-slate-400 text-right ${isSmall ? 'text-[9px] min-w-[28px]' : 'text-[10px] min-w-[36px]'}`}>
            {formatSecs(duration || 12)}
          </span>
        </div>

        {/* Button Controls Row */}
        <div className="flex items-center justify-between gap-1 flex-wrap">
          {/* Left: Play/Pause, Mute/Volume */}
          <div className="flex items-center gap-1">
            <button
              onClick={togglePlay}
              className={`rounded border text-white transition cursor-pointer ${isSmall ? 'p-1' : 'p-1.5 rounded-lg'} ${
                isPlaying 
                  ? 'bg-cyan-600 hover:bg-cyan-500 border-cyan-400' 
                  : 'bg-amber-600 hover:bg-amber-500 border-amber-400'
              }`}
              title={isPlaying ? 'Pause CCTV Video' : 'Play CCTV Video'}
            >
              {isPlaying ? <Pause className={isSmall ? "w-3 h-3" : "w-3.5 h-3.5"} /> : <Play className={isSmall ? "w-3 h-3" : "w-3.5 h-3.5"} />}
            </button>

            {/* Mute & Volume */}
            <div className="flex items-center gap-1">
              <button
                onClick={toggleMute}
                className={`rounded hover:bg-slate-700/40 text-slate-300 hover:text-white transition cursor-pointer ${isSmall ? 'p-1' : 'p-1.5 rounded-lg'}`}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className={isSmall ? "w-3 h-3 text-slate-400" : "w-3.5 h-3.5 text-slate-400"} /> : <Volume2 className={isSmall ? "w-3 h-3 text-cyan-400" : "w-3.5 h-3.5 text-cyan-400"} />}
              </button>
              {!isSmall && (
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 h-1 bg-slate-700 rounded appearance-none cursor-pointer accent-cyan-400 hidden sm:inline-block"
                />
              )}
            </div>
          </div>

          {/* Center: Playback Speed selector */}
          {!isSmall && (
            <div className="flex items-center gap-1 text-[10px]">
              <span className="text-slate-400 hidden lg:inline">SPEED:</span>
              {[0.5, 1, 1.5, 2].map(spd => (
                <button
                  key={spd}
                  onClick={() => handleSpeedChange(spd)}
                  className={`px-1.5 py-0.5 rounded border transition cursor-pointer ${
                    playbackSpeed === spd
                      ? 'bg-cyan-600 text-white border-cyan-400 font-bold'
                      : isLight 
                        ? 'bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-700' 
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          )}

          {/* Right: Snapshot, Focus & Fullscreen */}
          <div className="flex items-center gap-1">
            {isSmall && (
              <button
                onClick={() => handleSpeedChange(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
                className={`px-1 py-0.5 rounded border text-[9px] font-mono transition cursor-pointer ${
                  isLight ? 'bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-700 text-cyan-400'
                }`}
                title="Toggle Speed (1x / 1.5x / 2x)"
              >
                {playbackSpeed}x
              </button>
            )}

            <button
              onClick={handleSnapshot}
              className={`rounded hover:bg-slate-700/40 text-slate-300 hover:text-cyan-300 transition cursor-pointer ${isSmall ? 'p-1' : 'p-1.5 rounded-lg'}`}
              title="Capture High-Res Video Frame Snapshot"
            >
              <Camera className={isSmall ? "w-3 h-3" : "w-3.5 h-3.5"} />
            </button>

            {onSelectFocus && (
              <button
                onClick={onSelectFocus}
                className={`rounded bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/60 text-cyan-300 font-bold flex items-center gap-1 transition cursor-pointer ${
                  isSmall ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-1 rounded-lg text-[10px]'
                }`}
                title="Inspect in single camera mode"
              >
                <span>FOCUS</span>
              </button>
            )}

            <button
              onClick={toggleFullscreen}
              className={`rounded hover:bg-slate-700/40 text-slate-300 hover:text-white transition cursor-pointer ${isSmall ? 'p-1' : 'p-1.5 rounded-lg'}`}
              title="Toggle Fullscreen"
            >
              <Maximize2 className={isSmall ? "w-3 h-3" : "w-3.5 h-3.5"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CctvMonitoringView: React.FC<CctvMonitoringViewProps> = ({
  initialCameraId = 'C-01',
  initialMode = 'LIVE_GRID',
  onNavigateToAlerts
}) => {
  const { theme } = useSettings();
  const isLight = theme === 'Light';

  const [activeTab, setActiveTab] = useState<'LIVE_GRID' | 'RECORDED_ARCHIVE'>(
    initialMode === 'RECORDED' ? 'RECORDED_ARCHIVE' : 'LIVE_GRID'
  );
  const [selectedCameraId, setSelectedCameraId] = useState<string>(initialCameraId);
  const [selectedRecording, setSelectedRecording] = useState<CctvRecordingClip>(SURVEILLANCE_RECORDINGS[0]);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [videoSize, setVideoSize] = useState<'small' | 'medium' | 'large'>('small');
  const [feedCount, setFeedCount] = useState<number>(4);

  // Selected camera object
  const activeCamera = SURVEILLANCE_CAMERAS.find(c => c.id === selectedCameraId) || SURVEILLANCE_CAMERAS[0];

  // Recordings filtered
  const filteredRecordings = SURVEILLANCE_RECORDINGS.filter(rec => 
    rec.cameraName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    rec.timeRange.toLowerCase().includes(searchFilter.toLowerCase()) ||
    rec.tags.some(t => t.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="w-full space-y-4 font-tech">
      {/* Navigation Sub-Tabs: LIVE CCTV MONITORING vs RECORDED CCTV */}
      <div className={`p-2 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
        isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#020b1c]/90 border-cyan-500/40'
      }`}>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('LIVE_GRID')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-mono-code font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'LIVE_GRID'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md border border-cyan-400'
                : isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>LIVE CCTV MATRIX (24 CAMERAS)</span>
          </button>

          <button
            onClick={() => setActiveTab('RECORDED_ARCHIVE')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-mono-code font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'RECORDED_ARCHIVE'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md border border-amber-400'
                : isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Film className="w-4 h-4 text-amber-400" />
            <span>RECORDED CCTV VIDEO ARCHIVE</span>
          </button>
        </div>

        {/* Architecture Note */}
        <div className="flex items-center gap-2 text-[11px] font-mono-code text-cyan-400">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden md:inline">IP CCTV → RTSP/ONVIF → Edge Ingestion → AI Analytics → Video Player</span>
        </div>
      </div>

      {/* VIEW 1: LIVE CCTV MONITORING MATRIX */}
      {activeTab === 'LIVE_GRID' && (
        <div className="space-y-3">
          {/* Quick Matrix Controls & Size Selector */}
          <div className={`p-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-2.5 ${
            isLight ? 'bg-white border-slate-300 shadow-sm text-slate-900' : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-cyan-400">
                ACTIVE CCTV VIDEO WALL
              </span>
              <span className="text-[10px] font-mono-code text-slate-400 hidden sm:inline">
                ({feedCount} Streams Monitored Live)
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Size Selector: Small (Compact - Default), Medium, Large */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono-code text-slate-400 font-bold uppercase">Video Size:</span>
                <div className={`flex items-center rounded-lg border p-0.5 ${
                  isLight ? 'border-slate-300 bg-slate-100' : 'border-cyan-500/30 bg-black/40'
                }`}>
                  <button
                    onClick={() => setVideoSize('small')}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono-code font-bold transition cursor-pointer flex items-center gap-1 ${
                      videoSize === 'small'
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Small Compact Tile Size (4 across on desktop)"
                  >
                    <span>Small</span>
                    <span className="text-[8.5px] opacity-80">(Compact)</span>
                  </button>
                  <button
                    onClick={() => setVideoSize('medium')}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono-code font-bold transition cursor-pointer ${
                      videoSize === 'medium'
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Medium Tile Size (3 across on desktop)"
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setVideoSize('large')}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono-code font-bold transition cursor-pointer ${
                      videoSize === 'large'
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Large Size (2x2 grid)"
                  >
                    Large
                  </button>
                </div>
              </div>

              {/* Feed Count Toggle: 4 or 8 */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono-code text-slate-400 font-bold uppercase">Grid Feeds:</span>
                <div className={`flex items-center rounded-lg border p-0.5 ${
                  isLight ? 'border-slate-300 bg-slate-100' : 'border-cyan-500/30 bg-black/40'
                }`}>
                  <button
                    onClick={() => setFeedCount(4)}
                    className={`px-2 py-1 rounded text-[10px] font-mono-code font-bold transition cursor-pointer ${
                      feedCount === 4
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    4 Feeds
                  </button>
                  <button
                    onClick={() => setFeedCount(8)}
                    className={`px-2 py-1 rounded text-[10px] font-mono-code font-bold transition cursor-pointer ${
                      feedCount === 8
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    8 Feeds
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* The Active Video Players Grid */}
          <div className={`grid gap-3 transition-all duration-200 ${
            videoSize === 'small'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : videoSize === 'medium'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {SURVEILLANCE_CAMERAS.slice(0, feedCount).map(cam => (
              <CctvPlayerCard 
                key={cam.id} 
                camera={cam} 
                size={videoSize}
                isFocused={selectedCameraId === cam.id}
                onSelectFocus={() => setSelectedCameraId(cam.id)}
              />
            ))}
          </div>

          {/* Quick Camera Selector Bar for remaining perimeter cameras */}
          <div className={`p-3.5 rounded-xl border space-y-2.5 ${
            isLight ? 'bg-white border-slate-300 shadow-sm text-slate-900' : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                <span>Active Camera Fleet (24 Stream Feeds Monitored Online)</span>
              </span>
              <span className="text-[11px] font-mono-code text-slate-400">
                Click any camera to switch primary focus
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
              {SURVEILLANCE_CAMERAS.map(cam => {
                const isSelected = selectedCameraId === cam.id;
                return (
                  <button
                    key={cam.id}
                    onClick={() => setSelectedCameraId(cam.id)}
                    className={`p-2 rounded-lg border text-center transition cursor-pointer text-xs font-mono-code ${
                      isSelected
                        ? 'bg-cyan-600 text-white border-cyan-400 font-bold shadow-md'
                        : isLight 
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' 
                          : 'bg-[#031533] hover:bg-[#052252] border-cyan-500/30 text-cyan-300'
                    }`}
                  >
                    <div className="font-bold">{cam.id}</div>
                    <div className="text-[9px] text-emerald-400 font-bold mt-0.5">● LIVE</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: RECORDED CCTV VIDEO ARCHIVE */}
      {activeTab === 'RECORDED_ARCHIVE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column: Recording Clip Selector */}
          <div className={`lg:col-span-4 rounded-xl border p-4 flex flex-col space-y-3.5 ${
            isLight ? 'bg-white border-slate-300 shadow-sm text-slate-900' : 'bg-[#020b1c]/90 border-cyan-500/40 text-white'
          }`}>
            <div className="flex items-center justify-between border-b pb-2.5 border-slate-700/40">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-tech">
                  Historical CCTV Recordings
                </h3>
              </div>
              <span className="text-[10px] font-mono-code text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                EDGE BUFFER ACTIVE
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search camera ID, time, or event tags..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className={`w-full pl-9 pr-3 py-1.5 rounded-lg border text-xs font-mono-code outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500' 
                    : 'bg-slate-950 border-cyan-500/30 text-white focus:border-cyan-400'
                }`}
              />
            </div>

            {/* Recordings List */}
            <div className="space-y-2.5 overflow-y-auto max-h-[500px] pr-1">
              {filteredRecordings.map(rec => {
                const isSelected = selectedRecording.id === rec.id;
                return (
                  <div
                    key={rec.id}
                    onClick={() => setSelectedRecording(rec)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex flex-col space-y-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-950/60 to-orange-950/40 border-amber-400 shadow-lg text-white ring-1 ring-amber-400'
                        : isLight 
                          ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800' 
                          : 'bg-[#031533]/80 hover:bg-[#052252] border-cyan-500/30 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono-code font-bold">
                      <span className="text-amber-400">{rec.cameraId}</span>
                      <span className="text-[10px] text-slate-400">{rec.date}</span>
                    </div>

                    <div className="text-sm font-tech font-bold text-white">
                      {rec.cameraName}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono-code">
                      <span className="flex items-center gap-1 text-cyan-300 font-bold">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {rec.timeRange}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                        {rec.duration}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {rec.tags.map((t, idx) => (
                        <span key={idx} className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Actual Playable Video Player for Recorded Footage */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            {/* The Dedicated Recording Video Player */}
            <CctvPlayerCard 
              camera={{
                id: selectedRecording.cameraId,
                name: `${selectedRecording.cameraName} (RECORDING: ${selectedRecording.timeRange})`,
                location: `Archive Footage: ${selectedRecording.date} [Duration: ${selectedRecording.duration}]`,
                status: 'ONLINE',
                recordingStatus: 'RECORDING',
                videoSrc: selectedRecording.videoSrc,
                resolution: '1920x1080 @ 25 FPS',
                edgeNodeId: 'EDGE-ARCHIVE-STORE',
                fieldOfView: 'Historical Stored Video',
                activeDetectionsCount: selectedRecording.eventsCount,
                recordings: []
              }}
              size={videoSize}
              isFocused={true}
            />

            {/* Video Recording Metadata & Investigation Actions */}
            <div className={`p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono-code ${
              isLight ? 'bg-white border-slate-300 text-slate-900 shadow-sm' : 'bg-[#020b1c]/90 border-cyan-500/30 text-white'
            }`}>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Selected Archive:</span>
                <div className="text-sm font-tech font-bold text-amber-400 mt-0.5">{selectedRecording.id}</div>
                <div className="text-[11px] text-slate-300">{selectedRecording.timeRange}</div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase">Tamper Verification:</span>
                <div className="text-sm font-tech font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                  <span>SHA-256 VERIFIED</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">Hash: 8f4b1...e902d</div>
              </div>

              <div className="flex items-center sm:justify-end gap-2">
                <a
                  href={selectedRecording.videoSrc}
                  download={`recording_${selectedRecording.id}.mp4`}
                  className="px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT MP4</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
