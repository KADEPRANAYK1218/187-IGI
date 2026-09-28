import React, { useEffect } from 'react';
import vajraCyberMap from '../../assets/images/vajra_india_cyber_map_1788188888561.jpg';
import { Radio } from 'lucide-react';

interface IndiaGeospatialBackgroundProps {
  showBadges?: boolean;
}

export const IndiaGeospatialBackground: React.FC<IndiaGeospatialBackgroundProps> = ({
  showBadges = true,
}) => {
  useEffect(() => {
    // Clear any temporary user upload to guarantee the exact reference pic is displayed
    try {
      localStorage.removeItem('vajra_custom_login_bg');
      localStorage.removeItem('vajra_active_preset');
    } catch {
      // ignore
    }
  }, []);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#020617] flex items-center justify-center select-none"
      id="india-tactical-background"
    >
      {/* Ambient Radial Cyber Glow Atmosphere */}
      <div className="absolute inset-0 bg-radial from-cyan-950/25 via-[#030816]/70 to-[#020617] pointer-events-none" />

      {/* Primary Cybernetic India Map - Exact 1:1 Rendering without alteration */}
      <div className="relative w-full h-full flex items-center justify-center lg:justify-end pr-2 sm:pr-4 lg:pr-8 xl:pr-16 p-2 sm:p-4">
        <img
          src={vajraCyberMap}
          alt="Bharat Tactical Command Cybernetic Geospatial Network"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain object-center lg:object-right max-w-[96vw] lg:max-w-[68vw] xl:max-w-[72vw] max-h-[94vh] pointer-events-none select-none transition-all duration-300 ease-out"
          id="india-map-bg-image"
        />

        {/* Subtle Ambient Holographic Scan Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-24 w-full animate-radar-scan pointer-events-none" />

        {showBadges && (
          <>
            {/* Tactical Corner Watermark - Top Left Status Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 border border-cyan-500/35 text-[10px] sm:text-[11px] font-mono-code text-cyan-400 backdrop-blur-md shadow-lg">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>BHARAT GEOSPATIAL COMMAND MESH ACTIVE</span>
            </div>

            {/* Tactical Corner Watermark - Bottom Right */}
            <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 border border-amber-500/30 text-[10px] font-mono-code text-amber-300 backdrop-blur-md shadow-lg">
              <span>COORDINATES: 8.4°N - 37.6°N | 68.7°E - 97.25°E</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

