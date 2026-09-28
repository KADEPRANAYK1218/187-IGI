import React, { useState, useEffect } from 'react';
import vajraCyberMap from '../../assets/images/vajra_india_cyber_map_1788188888561.jpg';
import { Radio, Map, Shield, Layers } from 'lucide-react';
import { LoginCard } from '../auth/LoginCard';
import { UserAccount } from '../../types';

interface VajraAuthLandingProps {
  onCredentialsVerified: (
    user: UserAccount,
    factorStatus: {
      serviceId: boolean;
      service: boolean;
      rank: boolean;
      password: boolean;
      pin: boolean;
    }
  ) => void;
  onAuthenticationFailed: (
    failedFactors: {
      serviceId: boolean;
      service: boolean;
      rank: boolean;
      password: boolean;
      pin: boolean;
    },
    reason: string
  ) => void;
}

export const VajraAuthLanding: React.FC<VajraAuthLandingProps> = ({
  onCredentialsVerified,
  onAuthenticationFailed
}) => {
  // Mobile View Mode Switcher: 'SPLIT' (both map and login), 'MAP' (full map preview), 'LOGIN' (login form only)
  const [mobileViewMode, setMobileViewMode] = useState<'SPLIT' | 'MAP' | 'LOGIN'>('SPLIT');

  useEffect(() => {
    // Clear any previous custom upload so the official cybernetic map is always 1:1 displayed
    try {
      localStorage.removeItem('vajra_custom_login_bg');
      localStorage.removeItem('vajra_active_preset');
    } catch {
      // ignore
    }
  }, []);

  return (
    <div 
      className="relative w-full min-h-[100dvh] md:h-screen md:min-h-screen bg-[#020617] text-slate-100 flex flex-col md:flex-row items-center justify-between overflow-x-hidden md:overflow-hidden select-none"
      id="vajra-auth-landing-screen"
    >
      {/* Ambient Radial Cyber Glow Atmosphere */}
      <div className="absolute inset-0 bg-radial from-cyan-950/20 via-[#030816]/75 to-[#020617] pointer-events-none z-0" />

      {/* Top Left Global Telemetry Status Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 border border-cyan-500/35 text-[10px] sm:text-[11px] font-mono-code text-cyan-400 backdrop-blur-md shadow-lg">
        <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>BHARAT GEOSPATIAL COMMAND MESH ACTIVE</span>
      </div>

      {/* Bottom Right Global Coordinates Badge (Visible on tablet and desktop) */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 border border-amber-500/30 text-[10px] font-mono-code text-amber-300 backdrop-blur-md shadow-lg">
        <span>COORDINATES: 8.4°N - 37.6°N | 68.7°E - 97.25°E</span>
      </div>

      {/* MOBILE ONLY: High-Tech View Switcher Bar (Hidden on md: 768px tablet & desktop) */}
      <div className="md:hidden z-30 w-full px-3 pt-14 pb-2 flex items-center justify-between">
        <div className="inline-flex items-center p-1 rounded-xl bg-slate-950/90 border border-cyan-500/30 shadow-lg mx-auto">
          <button
            type="button"
            onClick={() => setMobileViewMode('SPLIT')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-tech font-bold transition flex items-center gap-1.5 ${
              mobileViewMode === 'SPLIT'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>BOTH</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileViewMode('MAP')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-tech font-bold transition flex items-center gap-1.5 ${
              mobileViewMode === 'MAP'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Map className="w-3 h-3" />
            <span>MAP VIEW</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileViewMode('LOGIN')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-tech font-bold transition flex items-center gap-1.5 ${
              mobileViewMode === 'LOGIN'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>LOGIN</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. TABLET & DESKTOP LAYOUT (md: 768px and above) - SIDE-BY-SIDE GUARANTEE */}
      {/* ========================================================================= */}
      
      {/* Left Column: Login Card Container (Compact on Tablet, spacious on Desktop) */}
      <div className="hidden md:flex relative z-10 w-[330px] md:w-[350px] lg:w-[440px] xl:w-[480px] h-full max-h-screen flex-col justify-center pl-4 sm:pl-6 lg:pl-10 xl:pl-14 py-4 flex-shrink-0">
        <div className="max-h-[96vh] overflow-y-auto pr-1 py-2 custom-scrollbar">
          <LoginCard
            onCredentialsVerified={onCredentialsVerified}
            onAuthenticationFailed={onAuthenticationFailed}
          />
        </div>
      </div>

      {/* Right Column: India Cybernetic Map (Takes remaining width, never occluded) */}
      <div className="hidden md:flex relative z-0 flex-1 h-full min-h-0 items-center justify-center lg:justify-end pr-2 sm:pr-4 lg:pr-8 xl:pr-14 p-2 sm:p-4 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
          <img
            src={vajraCyberMap}
            alt="Bharat Tactical Command Cybernetic Geospatial Network"
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            className="w-full h-full object-contain object-center lg:object-right max-h-[94vh] pointer-events-none select-none transition-all duration-300 ease-out"
            id="india-map-desktop-view"
          />

          {/* Subtle Ambient Holographic Scan Line */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-24 w-full animate-radar-scan pointer-events-none" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE LAYOUT (< 768px) - CRYSTAL CLEAR DISPLAY OF BOTH MAP & LOGIN   */}
      {/* ========================================================================= */}
      <div className="md:hidden z-10 w-full flex-1 flex flex-col items-center px-3 pb-8">
        {/* MOBILE: MAP SECTION */}
        {(mobileViewMode === 'SPLIT' || mobileViewMode === 'MAP') && (
          <div 
            className={`w-full relative flex items-center justify-center rounded-2xl border border-cyan-500/25 bg-slate-950/75 p-2 shadow-2xl shadow-cyan-950/40 overflow-hidden transition-all duration-300 ${
              mobileViewMode === 'MAP' 
                ? 'h-[75vh] mb-3' 
                : 'h-[240px] sm:h-[280px] mb-4 flex-shrink-0'
            }`}
          >
            {/* Ambient map glow */}
            <div className="absolute inset-0 bg-radial from-cyan-950/30 via-[#030816]/70 to-[#020617] pointer-events-none" />
            
            <img
              src={vajraCyberMap}
              alt="Bharat Tactical Command Cybernetic Geospatial Network"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain object-center pointer-events-none select-none"
              id="india-map-mobile-view"
            />

            {/* Scanning radar line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-16 w-full animate-radar-scan pointer-events-none" />

            {/* Mobile Map Coordinates Watermark */}
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/90 border border-amber-500/30 text-[9px] font-mono-code text-amber-300 shadow">
              <span>8.4°N - 37.6°N | 68.7°E - 97.25°E</span>
            </div>

            {/* Return to Login CTA when in Map-only mode */}
            {mobileViewMode === 'MAP' && (
              <button
                type="button"
                onClick={() => setMobileViewMode('SPLIT')}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-cyan-600/90 text-white font-tech text-xs font-bold shadow-lg border border-cyan-400 flex items-center gap-1.5 cursor-pointer"
              >
                <span>PROCEED TO LOGIN</span>
                <span>→</span>
              </button>
            )}
          </div>
        )}

        {/* MOBILE: LOGIN CARD SECTION */}
        {(mobileViewMode === 'SPLIT' || mobileViewMode === 'LOGIN') && (
          <div className="w-full max-w-md mx-auto">
            <LoginCard
              onCredentialsVerified={onCredentialsVerified}
              onAuthenticationFailed={onAuthenticationFailed}
            />
          </div>
        )}
      </div>
    </div>
  );
};
