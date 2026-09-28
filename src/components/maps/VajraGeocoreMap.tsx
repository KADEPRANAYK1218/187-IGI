import React, { useEffect, useRef, useState, useMemo } from 'react';
import { 
  Compass, Crosshair, Layers, ZoomIn, ZoomOut, RotateCcw, 
  MapPin, Eye, Radio, Shield, AlertTriangle, CloudRain, 
  Navigation, Search, Maximize2, Activity, Video, Sparkles
} from 'lucide-react';
import { GeoLocationItem, SensorData, TacticalAlert, PersonnelTelemetry } from '../../types';
import { STRATEGIC_LOCATIONS } from '../../data/locations';
import { SENSORS_DATA } from '../../data/sensors';
import { TACTICAL_ALERTS } from '../../data/alerts';

interface VajraGeocoreMapProps {
  selectedLocation: GeoLocationItem | null;
  onSelectLocation: (loc: GeoLocationItem | null) => void;
  onSelectAlert?: (alert: TacticalAlert) => void;
  activeLayerFilters: {
    strategicCommands: boolean;
    airBases: boolean;
    navalDockyards: boolean;
    radarsAndSensors: boolean;
    tacticalAlerts: boolean;
    weatherOverlay: boolean;
    radarRings: boolean;
  };
  simulationActive: boolean;
}

export const VajraGeocoreMap: React.FC<VajraGeocoreMapProps> = ({
  selectedLocation,
  onSelectLocation,
  onSelectAlert,
  activeLayerFilters,
  simulationActive
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Map viewport state: center coordinates [lat, lng], zoom level
  // Bharat default: Lat ~22.5° N, Lng ~82.0° E, Zoom = 5.2
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 22.8, lng: 82.5 });
  const [zoom, setZoom] = useState<number>(5.2);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState<{ lat: number; lng: number; mgrs: string }>({
    lat: 22.8,
    lng: 82.5,
    mgrs: '43R EK 49201 82910'
  });

  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredEntity, setHoveredEntity] = useState<any | null>(null);

  // Coordinates Converter (Equirectangular / Mercator projection to canvas pixel coordinates)
  const projectGeoToPixel = (
    lat: number,
    lng: number,
    width: number,
    height: number,
    cLat: number,
    cLng: number,
    z: number
  ) => {
    // 1 zoom unit = 2x scale
    const scale = Math.pow(2, z) * 16;
    const x = width / 2 + (lng - cLng) * (scale / 360) * Math.cos((cLat * Math.PI) / 180);
    const y = height / 2 - (lat - cLat) * (scale / 360);
    return { x, y };
  };

  const projectPixelToGeo = (
    px: number,
    py: number,
    width: number,
    height: number,
    cLat: number,
    cLng: number,
    z: number
  ) => {
    const scale = Math.pow(2, z) * 16;
    const cosLat = Math.cos((cLat * Math.PI) / 180) || 1;
    const lng = cLng + ((px - width / 2) / ((scale / 360) * cosLat));
    const lat = cLat - ((py - height / 2) / (scale / 360));
    return { lat, lng };
  };

  // Convert Lat/Lng to Synthetic MGRS for Coordinate Inspector
  const getMgrsString = (lat: number, lng: number) => {
    const zone = Math.floor((lng + 180) / 6) + 1;
    const band = lat > 32 ? 'S' : lat > 24 ? 'R' : lat > 16 ? 'Q' : 'P';
    const e = Math.abs(Math.floor((lng * 1000) % 100000)).toString().padStart(5, '0');
    const n = Math.abs(Math.floor((lat * 1000) % 100000)).toString().padStart(5, '0');
    return `${zone}${band} ${e.slice(0, 2)} ${e} ${n}`;
  };

  // Handle Zoom In / Out
  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(12, Math.max(2, prev + delta)));
  };

  // Reset / Bharat Focus
  const triggerBharatFocus = () => {
    setCenter({ lat: 22.8, lng: 82.5 });
    setZoom(5.2);
    onSelectLocation(null);
  };

  // Pan Map Mouse Events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const geo = projectPixelToGeo(px, py, canvas.width, canvas.height, center.lat, center.lng, zoom);
    setCursorPos({
      lat: parseFloat(geo.lat.toFixed(4)),
      lng: parseFloat(geo.lng.toFixed(4)),
      mgrs: getMgrsString(geo.lat, geo.lng)
    });

    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      const scale = Math.pow(2, zoom) * 16;
      const cosLat = Math.cos((center.lat * Math.PI) / 180) || 1;

      const dLng = -(dx / ((scale / 360) * cosLat));
      const dLat = (dy / (scale / 360));

      setCenter(prev => ({
        lat: Math.max(-80, Math.min(80, prev.lat + dLat)),
        lng: ((prev.lng + dLng + 180) % 360) - 180
      }));

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Canvas Drawing Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let sweepAngle = 0;

    const updateCanvasSize = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // India simplified coastline/border polyline [lat, lng]
    const indiaGeoBorder: [number, number][] = [
      [35.6, 76.8], [34.5, 78.5], [32.5, 79.0], [30.4, 80.8], [28.6, 81.2],
      [27.8, 88.2], [27.3, 89.0], [28.2, 94.5], [28.0, 96.5], [26.5, 96.0],
      [24.5, 94.0], [22.8, 92.5], [21.8, 89.0], [19.8, 86.0], [17.5, 83.2],
      [15.8, 80.3], [13.1, 80.3], [10.8, 79.8], [8.08, 77.55], // Kanyakumari
      [9.5, 76.3], [12.9, 74.8], [15.5, 73.8], [18.9, 72.8], [20.8, 72.7],
      [22.8, 69.5], [23.8, 68.2], [24.5, 71.0], [26.5, 70.5], [28.5, 70.0],
      [31.2, 74.5], [32.8, 74.8], [34.5, 74.0], [35.6, 76.8]
    ];

    // Neighbor continents simplified landmass lines for world context
    const worldLandmasses: [number, number][][] = [
      // Eurasian landmass anchor
      [[35, 60], [45, 65], [55, 80], [50, 110], [40, 120], [30, 110], [25, 100], [20, 100]],
      // African Horn & Arabian Peninsula
      [[12, 45], [20, 38], [28, 35], [30, 48], [24, 58], [16, 54], [12, 45]],
      // South East Asia & Malacca
      [[20, 98], [15, 101], [7, 100], [2, 103], [5, 106], [12, 108], [20, 106]],
      // Sri Lanka
      [[9.8, 80.2], [8.5, 81.2], [6.0, 80.5], [7.0, 79.8], [9.8, 80.2]]
    ];

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);

      // Deep Midnight Ocean Canvas
      ctx.fillStyle = '#050A14';
      ctx.fillRect(0, 0, w, h);

      // World Latitude/Longitude Tactical Grid Lines
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);

      // Latitudes every 10 deg
      for (let lat = -80; lat <= 80; lat += 10) {
        const pt1 = projectGeoToPixel(lat, -180, w, h, center.lat, center.lng, zoom);
        const pt2 = projectGeoToPixel(lat, 180, w, h, center.lat, center.lng, zoom);
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.stroke();
      }

      // Longitudes every 10 deg
      for (let lng = -180; lng <= 180; lng += 10) {
        const pt1 = projectGeoToPixel(-85, lng, w, h, center.lat, center.lng, zoom);
        const pt2 = projectGeoToPixel(85, lng, w, h, center.lat, center.lng, zoom);
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw Neighbor Continents
      worldLandmasses.forEach(mass => {
        ctx.beginPath();
        mass.forEach((coord, idx) => {
          const pt = projectGeoToPixel(coord[0], coord[1], w, h, center.lat, center.lng, zoom);
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.fillStyle = 'rgba(17, 28, 61, 0.45)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw Bharat (India) Landmass with Atmospheric Saffron/White/Green Glow
      const projectedIndia = indiaGeoBorder.map(([lat, lng]) =>
        projectGeoToPixel(lat, lng, w, h, center.lat, center.lng, zoom)
      );

      ctx.beginPath();
      projectedIndia.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();

      // Atmospheric Tricolor Fill for Bharat
      const indiaCenterPt = projectGeoToPixel(22.8, 82.5, w, h, center.lat, center.lng, zoom);
      const indiaGrad = ctx.createRadialGradient(
        indiaCenterPt.x, indiaCenterPt.y, 20,
        indiaCenterPt.x, indiaCenterPt.y, 400
      );
      indiaGrad.addColorStop(0, 'rgba(17, 34, 85, 0.95)');
      indiaGrad.addColorStop(0.3, 'rgba(255, 153, 51, 0.12)'); // Saffron
      indiaGrad.addColorStop(0.7, 'rgba(34, 211, 238, 0.1)'); // Chakra Blue/Cyan
      indiaGrad.addColorStop(1, 'rgba(19, 136, 8, 0.15)'); // India Green
      ctx.fillStyle = indiaGrad;
      ctx.fill();

      // Glowing Neon Frontier Outline
      ctx.strokeStyle = '#22D3EE';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#22D3EE';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Exclusive Economic Zone (EEZ) Maritime Perimeter Line
      ctx.beginPath();
      projectedIndia.forEach((pt, idx) => {
        const distFromCenter = Math.hypot(pt.x - indiaCenterPt.x, pt.y - indiaCenterPt.y);
        const factor = 1.15;
        const eezX = indiaCenterPt.x + (pt.x - indiaCenterPt.x) * factor;
        const eezY = indiaCenterPt.y + (pt.y - indiaCenterPt.y) * factor;
        if (idx === 0) ctx.moveTo(eezX, eezY);
        else ctx.lineTo(eezX, eezY);
      });
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0, 180, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Radar Sweep Rings
      if (activeLayerFilters.radarRings) {
        SENSORS_DATA.forEach(sensor => {
          const sPt = projectGeoToPixel(sensor.coordinates[0], sensor.coordinates[1], w, h, center.lat, center.lng, zoom);
          const pxRadius = (sensor.coverageRadiusKm / 111) * ((Math.pow(2, zoom) * 16) / 360);

          // Radar circle
          ctx.beginPath();
          ctx.arc(sPt.x, sPt.y, pxRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Radar Rotating Beam
          ctx.save();
          ctx.translate(sPt.x, sPt.y);
          ctx.rotate(sweepAngle);
          const rGrad = ctx.createLinearGradient(0, 0, pxRadius, 0);
          rGrad.addColorStop(0, 'rgba(34, 211, 238, 0.35)');
          rGrad.addColorStop(1, 'rgba(34, 211, 238, 0)');
          ctx.fillStyle = rGrad;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, pxRadius, -0.15, 0.15);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
      }

      // Weather Overlays (Cyclones / Clouds)
      if (activeLayerFilters.weatherOverlay) {
        const cycloneCoord = [14.2189, 86.4190]; // Bay of Bengal
        const cyPt = projectGeoToPixel(cycloneCoord[0], cycloneCoord[1], w, h, center.lat, center.lng, zoom);
        
        ctx.save();
        ctx.translate(cyPt.x, cyPt.y);
        ctx.rotate(-sweepAngle * 1.5);
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.arc(0, 0, 35 + i * 15, i * 1.5, i * 1.5 + Math.PI);
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.35)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Draw Tactical Alert Points
      if (activeLayerFilters.tacticalAlerts) {
        TACTICAL_ALERTS.forEach(alert => {
          const aPt = projectGeoToPixel(alert.coordinates[0], alert.coordinates[1], w, h, center.lat, center.lng, zoom);

          // Alert Pulsing Hexagon
          ctx.beginPath();
          ctx.arc(aPt.x, aPt.y, 10 + Math.sin(sweepAngle * 4) * 4, 0, Math.PI * 2);
          ctx.strokeStyle = alert.priority === 'CRITICAL' ? '#F43F5E' : '#F59E0B';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(aPt.x, aPt.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = alert.priority === 'CRITICAL' ? '#F43F5E' : '#F59E0B';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Alert Label
          ctx.font = '10px "Chakra Petch", sans-serif';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(`[!] ${alert.title.slice(0, 22)}...`, aPt.x + 14, aPt.y + 4);
        });
      }

      // Draw Strategic Commands & Bases
      STRATEGIC_LOCATIONS.forEach(loc => {
        const isShown =
          (loc.category === 'Strategic Command' && activeLayerFilters.strategicCommands) ||
          (loc.category === 'Air Base' && activeLayerFilters.airBases) ||
          (loc.category === 'Naval Dockyard' && activeLayerFilters.navalDockyards) ||
          (activeLayerFilters.strategicCommands);

        if (!isShown) return;

        const locPt = projectGeoToPixel(loc.coordinates[0], loc.coordinates[1], w, h, center.lat, center.lng, zoom);
        const isSelected = selectedLocation?.id === loc.id;

        // Selection Target Ring
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(locPt.x, locPt.y, 18, 0, Math.PI * 2);
          ctx.strokeStyle = '#FF9933';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Marker Base Dot
        ctx.beginPath();
        ctx.arc(locPt.x, locPt.y, isSelected ? 6 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = loc.category.includes('Naval')
          ? '#22D3EE'
          : loc.category.includes('Air')
          ? '#38BDF8'
          : loc.category.includes('Outpost')
          ? '#F43F5E'
          : '#FF9933';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        if (zoom > 4.5 || isSelected) {
          ctx.font = isSelected ? 'bold 11px "Chakra Petch", sans-serif' : '10px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = isSelected ? '#FF9933' : '#E2E8F0';
          ctx.fillText(loc.name.split('—')[0], locPt.x + 10, locPt.y + 3);
        }
      });

      sweepAngle += 0.02;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animId);
    };
  }, [center, zoom, selectedLocation, activeLayerFilters]);

  // Click on map to select strategic location or alert
  const handleMapClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check hit test on Strategic Locations
    for (const loc of STRATEGIC_LOCATIONS) {
      const pt = projectGeoToPixel(loc.coordinates[0], loc.coordinates[1], canvas.width, canvas.height, center.lat, center.lng, zoom);
      const dist = Math.hypot(clickX - pt.x, clickY - pt.y);
      if (dist <= 18) {
        onSelectLocation(loc);
        return;
      }
    }

    // Check hit test on Alerts
    if (onSelectAlert) {
      for (const alert of TACTICAL_ALERTS) {
        const pt = projectGeoToPixel(alert.coordinates[0], alert.coordinates[1], canvas.width, canvas.height, center.lat, center.lng, zoom);
        const dist = Math.hypot(clickX - pt.x, clickY - pt.y);
        if (dist <= 18) {
          onSelectAlert(alert);
          return;
        }
      }
    }

    onSelectLocation(null);
  };

  // Filtered search results
  const filteredSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return STRATEGIC_LOCATIONS.filter(
      l => l.name.toLowerCase().includes(q) || l.state.toLowerCase().includes(q) || l.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[600px] flex-1 bg-[#050A14] overflow-hidden select-none" id="vajra-geocore-viewport">
      {/* Primary Geospatial Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleMapClick}
        className={`w-full h-full cursor-crosshair ${isDragging ? 'cursor-grabbing' : ''}`}
        id="geocore-interactive-map-canvas"
      />

      {/* Top Floating Search & Tactical Coordinate Bar */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-3">
        {/* Quick Search */}
        <div className="relative">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white backdrop-blur-md shadow-xl w-64 md:w-80">
            <Search className="w-4 h-4 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Sector, Base, or Outpost..."
              className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full font-tech"
              id="geocore-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {filteredSearchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-xl bg-slate-950/95 border border-cyan-500/40 p-1.5 shadow-2xl backdrop-blur-xl max-h-60 overflow-y-auto z-30">
              {filteredSearchResults.map(res => (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => {
                    setCenter({ lat: res.coordinates[0], lng: res.coordinates[1] });
                    setZoom(7.5);
                    onSelectLocation(res);
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-cyan-950/60 transition flex items-center justify-between text-xs group"
                >
                  <div>
                    <div className="font-semibold text-cyan-200 group-hover:text-cyan-100">{res.name}</div>
                    <div className="text-[10px] text-slate-400 font-tech">{res.category} • {res.state}</div>
                  </div>
                  <span className="text-[10px] font-mono-code text-amber-400 font-bold">{res.readinessScore}% READY</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bharat Focus Fast Action Button */}
        <button
          type="button"
          onClick={triggerBharatFocus}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600/90 via-slate-900 to-emerald-700/90 hover:from-amber-500 hover:to-emerald-600 border border-amber-400/50 text-xs font-display font-bold tracking-wider text-white shadow-xl shadow-amber-500/15 flex items-center gap-2 transition"
          id="btn-bharat-focus"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>BHARAT FOCUS</span>
        </button>

        {/* Live / Simulation Status Tag */}
        <div className={`px-3 py-2 rounded-xl backdrop-blur-md border text-xs font-tech font-bold flex items-center gap-2 ${
          simulationActive
            ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
            : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
        }`}>
          <div className={`w-2 h-2 rounded-full ${simulationActive ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
          <span>{simulationActive ? 'SIMULATION DATA ENGINE' : 'LIVE NAVIC / RADAR LINK'}</span>
        </div>
      </div>

      {/* Right Map Navigation & Zoom Controls */}
      <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
        <div className="vajra-panel rounded-xl p-1 flex flex-col gap-1 border border-cyan-500/30 backdrop-blur-md">
          <button
            type="button"
            onClick={() => handleZoom(1)}
            className="p-2 rounded-lg bg-slate-900/60 hover:bg-cyan-950 text-cyan-300 hover:text-white transition"
            title="Zoom In"
            id="map-zoom-in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleZoom(-1)}
            className="p-2 rounded-lg bg-slate-900/60 hover:bg-cyan-950 text-cyan-300 hover:text-white transition"
            title="Zoom Out"
            id="map-zoom-out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={triggerBharatFocus}
            className="p-2 rounded-lg bg-slate-900/60 hover:bg-cyan-950 text-cyan-300 hover:text-white transition"
            title="Reset to Bharat View"
            id="map-reset-view"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Tactical Coordinate & MGRS Inspector HUD */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
        <div className="pointer-events-auto px-4 py-2 rounded-xl bg-slate-950/85 border border-cyan-500/30 text-cyan-300 backdrop-blur-md shadow-xl flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 font-tech">GEO:</span>
            <span>{cursorPos.lat}° N, {cursorPos.lng}° E</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 border-l border-slate-800 pl-3">
            <span className="text-slate-400 font-tech">MGRS:</span>
            <span className="text-emerald-300">{cursorPos.mgrs}</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 border-l border-slate-800 pl-3">
            <span className="text-slate-400 font-tech">ZOOM:</span>
            <span className="text-cyan-200">{zoom.toFixed(1)}x</span>
          </div>
        </div>

        <div className="pointer-events-auto px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-tech text-slate-400 backdrop-blur-md">
          VAJRA GEOCORE v4.8 • OPEN GEOSPATIAL MATRIX
        </div>
      </div>

      {/* Selected Location Tactical Inspector Card */}
      {selectedLocation && (
        <div className="absolute bottom-16 right-4 z-20 max-w-sm w-full vajra-panel-elevated rounded-xl p-4 border border-cyan-500/40 shadow-2xl backdrop-blur-xl animate-fade-in" id="location-inspector-card">
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="font-display font-bold text-white text-sm tracking-wide">
                {selectedLocation.category.toUpperCase()}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSelectLocation(null)}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>

          <h4 className="text-base font-bold text-cyan-200 mb-1">{selectedLocation.name}</h4>
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">{selectedLocation.description}</p>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-code mb-3">
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <div className="text-slate-500 font-tech">COORDINATES</div>
              <div className="text-cyan-300">{selectedLocation.coordinates[0]}°N, {selectedLocation.coordinates[1]}°E</div>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <div className="text-slate-500 font-tech">ELEVATION</div>
              <div className="text-emerald-300">{selectedLocation.elevation} METERS</div>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <div className="text-slate-500 font-tech">MGRS GRID</div>
              <div className="text-amber-300 text-[10px]">{selectedLocation.mgrs}</div>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <div className="text-slate-500 font-tech">READINESS INDEX</div>
              <div className="text-emerald-400 font-bold">{selectedLocation.readinessScore}% / 100</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
            <span className="text-slate-400 font-tech">STATE: {selectedLocation.state}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {selectedLocation.status}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
