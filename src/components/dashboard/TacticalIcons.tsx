import React from 'react';

// Soldier / Military Personnel Icon (matches user uploaded combat soldier design with white accents)
export const SoldierIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Combat Helmet Dome */}
    <path
      d="M 24 5 C 16 5 13 10.5 13.5 18 C 13.5 19.5 12.2 20.8 11.5 21.8 C 12 22.8 13.5 23 15 22.5 C 19 21.5 29 21.5 33 22.5 C 34.5 23 36 22.8 36.5 21.8 C 35.8 20.8 34.5 19.5 34.5 18 C 35 10.5 32 5 24 5 Z"
      fill="currentColor"
    />

    {/* White Accent: Helmet Brim Dividing Stripe */}
    <path
      d="M 14.5 22.2 C 19.5 20.5 28.5 20.5 33.5 22.2"
      stroke="#FFFFFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Soldier Head / Face */}
    <circle cx="24" cy="25" r="7.5" fill="currentColor" />

    {/* Soldier Torso / Uniform Shoulders */}
    <path
      d="M 8 45 L 8 36 C 8 32 11.5 29.5 18 28 L 24 34 L 30 28 C 36.5 29.5 40 32 40 36 L 40 45 Z"
      fill="currentColor"
    />

    {/* White Accent: V-Collar Neck Cutout */}
    <path
      d="M 16.5 29 L 24 35.5 L 31.5 29"
      stroke="#FFFFFF"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* White Accent: Center Vertical Zipper / Placket Seam */}
    <line
      x1="24"
      y1="35.5"
      x2="24"
      y2="45"
      stroke="#FFFFFF"
      strokeWidth="2.4"
      strokeLinecap="round"
    />

    {/* White Accent: Left Shoulder Rank Epaulette */}
    <rect
      x="10"
      y="32.5"
      width="7.5"
      height="3.2"
      rx="0.8"
      transform="rotate(-28 13.75 34.1)"
      fill="#FFFFFF"
    />

    {/* White Accent: Right Shoulder Rank Epaulette */}
    <rect
      x="30.5"
      y="32.5"
      width="7.5"
      height="3.2"
      rx="0.8"
      transform="rotate(28 34.25 34.1)"
      fill="#FFFFFF"
    />
  </svg>
);

// Military Battle Tank Icon (matches FIRE TANKS card)
export const TankIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 28"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Long Gun Barrel */}
    <rect x="23" y="7" width="11" height="2.2" rx="0.8" />
    <circle cx="34.5" cy="8.1" r="1.2" />
    
    {/* Turret */}
    <path d="M12 6.5C12 5.2 13.2 4.2 15 4.2H21C22.8 4.2 24 5.2 24 6.5V10.5H12V6.5Z" />
    <rect x="15.5" y="2.8" width="3.5" height="1.6" rx="0.5" />
    
    {/* Chassis Hull */}
    <path d="M5.5 12C5.5 10.8 6.6 10 8.2 10H25.8C27.4 10 28.5 10.8 28.5 12L27.5 16H4.5L5.5 12Z" />
    
    {/* Continuous Tracks / Treads */}
    <rect x="2" y="16" width="30" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
    
    {/* Road Wheels */}
    <circle cx="6.5" cy="20" r="2.2" />
    <circle cx="12.2" cy="20" r="2.2" />
    <circle cx="17.9" cy="20" r="2.2" />
    <circle cx="23.6" cy="20" r="2.2" />
    <circle cx="28" cy="20" r="1.6" />
  </svg>
);

// Mission Gun Target Reticle Icon (matches user uploaded gun sight reticle with 4 corner brackets and white accents)
export const ArtilleryGunIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 4 Corner Viewfinder Brackets */}
    {/* Top-Left Bracket */}
    <path
      d="M 6 15 L 6 6 L 15 6"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Top-Right Bracket */}
    <path
      d="M 33 6 L 42 6 L 42 15"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Bottom-Left Bracket */}
    <path
      d="M 6 33 L 6 42 L 15 42"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Bottom-Right Bracket */}
    <path
      d="M 33 42 L 42 42 L 42 33"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* 4 Crosshair Stems extending from center ring */}
    {/* Top Crosshair */}
    <line x1="24" y1="4" x2="24" y2="18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Bottom Crosshair */}
    <line x1="24" y1="30" x2="24" y2="44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Left Crosshair */}
    <line x1="4" y1="24" x2="18" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Right Crosshair */}
    <line x1="30" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

    {/* Center Target Circular Hub */}
    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="3" fill="none" />

    {/* White Color Accents (matches user request) */}
    {/* Center Optical Dot / Reticle Bead (Crisp White) */}
    <circle cx="24" cy="24" r="2.8" fill="#FFFFFF" />

    {/* Precision White Range Ticks on 4 Crosshairs */}
    <line x1="24" y1="10" x2="24" y2="14" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="24" y1="34" x2="24" y2="38" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="10" y1="24" x2="14" y2="24" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="34" y1="24" x2="38" y2="24" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />

    {/* Subtle White Corner Aiming Points */}
    <circle cx="9" cy="9" r="1.2" fill="#FFFFFF" />
    <circle cx="39" cy="9" r="1.2" fill="#FFFFFF" />
    <circle cx="9" cy="39" r="1.2" fill="#FFFFFF" />
    <circle cx="39" cy="39" r="1.2" fill="#FFFFFF" />
  </svg>
);

// Tactical Quadcopter Drone Icon (matches user uploaded quadcopter drone reference with white accents)
export const DroneIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 4 Diagonal Tapered Rotor Arms extending from fuselage */}
    {/* Top-Left Arm */}
    <path d="M 24.5 24 L 14.5 15.5 L 12.5 18 L 24 28 Z" fill="currentColor" />
    {/* Top-Right Arm */}
    <path d="M 39.5 24 L 49.5 15.5 L 51.5 18 L 40 28 Z" fill="currentColor" />
    {/* Bottom-Left Arm */}
    <path d="M 24 36 L 12.5 46 L 14.5 48.5 L 24.5 40 Z" fill="currentColor" />
    {/* Bottom-Right Arm */}
    <path d="M 40 36 L 51.5 46 L 49.5 48.5 L 39.5 40 Z" fill="currentColor" />

    {/* Central Fuselage Body */}
    {/* Front Camera Gimbal Nose Bump */}
    <rect x="29" y="13.5" width="6" height="3" rx="1.5" fill="currentColor" />
    
    {/* Main Capsule Fuselage */}
    <path
      d="M 26 19 C 26 16.5 38 16.5 38 19 L 39.5 38 C 39.5 44 35.5 47 32 47 C 28.5 47 24.5 44 24.5 38 Z"
      fill="currentColor"
    />

    {/* White Body Accents (matches reference image) */}
    {/* Upper Panel Display/Hatch Border (Crisp White) */}
    <rect
      x="27"
      y="20"
      width="10"
      height="7"
      rx="2"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      fill="none"
    />

    {/* Lower Tail Contour Accent Notch (Crisp White) */}
    <path
      d="M 28 47 L 28 44 C 28 42.5 29.5 42 32 42 C 34.5 42 36 42.5 36 44 L 36 47"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* 4 Motor Pods & Propellers */}
    {/* 1. TOP-LEFT MOTOR (13, 16.5) */}
    <g transform="translate(13, 16.5)">
      {/* Propeller Blade 1: Pointing Up-Left (swept outward) */}
      <path
        d="M 0 0 C -2 -4 -6 -8 -11 -13 C -10 -15 -8 -15 -6 -13 C -2 -9 1 -4 0 0 Z"
        fill="currentColor"
      />
      {/* Propeller Blade 2: Pointing Up-Right (swept toward top) */}
      <path
        d="M 0 0 C 2 -4 5 -8 7 -13 C 9 -14 10 -13 9 -11 C 7 -7 3 -3 0 0 Z"
        fill="currentColor"
      />
      {/* Motor Bell Housing */}
      <circle cx="0" cy="0" r="3.5" fill="currentColor" />
      {/* Motor Concentric Ring (White) */}
      <circle cx="0" cy="0" r="2.2" stroke="#FFFFFF" strokeWidth="1" />
      {/* Motor Axle Center Dot (White) */}
      <circle cx="0" cy="0" r="1" fill="#FFFFFF" />
    </g>

    {/* 2. TOP-RIGHT MOTOR (51, 16.5) */}
    <g transform="translate(51, 16.5)">
      {/* Propeller Blade 1: Pointing Up-Right (swept outward) */}
      <path
        d="M 0 0 C 2 -4 6 -8 11 -13 C 10 -15 8 -15 6 -13 C 2 -9 -1 -4 0 0 Z"
        fill="currentColor"
      />
      {/* Propeller Blade 2: Pointing Up-Left (swept toward top) */}
      <path
        d="M 0 0 C -2 -4 -5 -8 -7 -13 C -9 -14 -10 -13 -9 -11 C -7 -7 -3 -3 0 0 Z"
        fill="currentColor"
      />
      {/* Motor Bell Housing */}
      <circle cx="0" cy="0" r="3.5" fill="currentColor" />
      {/* Motor Concentric Ring (White) */}
      <circle cx="0" cy="0" r="2.2" stroke="#FFFFFF" strokeWidth="1" />
      {/* Motor Axle Center Dot (White) */}
      <circle cx="0" cy="0" r="1" fill="#FFFFFF" />
    </g>

    {/* 3. BOTTOM-LEFT MOTOR (13, 47.5) */}
    <g transform="translate(13, 47.5)">
      {/* Propeller Blade 1: Pointing Down-Left (swept outward) */}
      <path
        d="M 0 0 C -2 4 -6 8 -11 13 C -10 15 -8 15 -6 13 C -2 9 1 4 0 0 Z"
        fill="currentColor"
      />
      {/* Propeller Blade 2: Pointing Down-Right (swept toward bottom) */}
      <path
        d="M 0 0 C 2 4 5 8 7 13 C 9 14 10 13 9 11 C 7 7 3 3 0 0 Z"
        fill="currentColor"
      />
      {/* Motor Bell Housing */}
      <circle cx="0" cy="0" r="3.5" fill="currentColor" />
      {/* Motor Concentric Ring (White) */}
      <circle cx="0" cy="0" r="2.2" stroke="#FFFFFF" strokeWidth="1" />
      {/* Motor Axle Center Dot (White) */}
      <circle cx="0" cy="0" r="1" fill="#FFFFFF" />
    </g>

    {/* 4. BOTTOM-RIGHT MOTOR (51, 47.5) */}
    <g transform="translate(51, 47.5)">
      {/* Propeller Blade 1: Pointing Down-Right (swept outward) */}
      <path
        d="M 0 0 C 2 4 6 8 11 13 C 10 15 8 15 6 13 C 2 9 -1 4 0 0 Z"
        fill="currentColor"
      />
      {/* Propeller Blade 2: Pointing Down-Left (swept toward bottom) */}
      <path
        d="M 0 0 C -2 4 -5 8 -7 13 C -9 14 -10 13 -9 11 C -7 7 -3 3 0 0 Z"
        fill="currentColor"
      />
      {/* Motor Bell Housing */}
      <circle cx="0" cy="0" r="3.5" fill="currentColor" />
      {/* Motor Concentric Ring (White) */}
      <circle cx="0" cy="0" r="2.2" stroke="#FFFFFF" strokeWidth="1" />
      {/* Motor Axle Center Dot (White) */}
      <circle cx="0" cy="0" r="1" fill="#FFFFFF" />
    </g>
  </svg>
);

// Target / Total Missions Icon: Bullseye Target with Archery Arrow hitting center (matches user uploaded reference with white arrow accents)
export const TargetMissionIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Target Center: (19, 25) */}
    {/* Outer Arc Rings (Top-Left, Bottom-Left, Bottom-Right) */}
    <path
      d="M 19 8 A 17 17 0 0 0 5 19.5"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M 5 29 A 17 17 0 0 0 19 42"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M 25 41.5 A 17 17 0 0 0 36 29"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />

    {/* Middle Arc Rings */}
    <path
      d="M 19 14 A 11 11 0 0 0 8 25"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M 8 25 A 11 11 0 0 0 19 36"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M 19 36 A 11 11 0 0 0 30 25"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />

    {/* Crosshairs: Left, Right, Top, Bottom */}
    <line x1="2" y1="25" x2="8" y2="25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    <line x1="30" y1="25" x2="43" y2="25" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    <line x1="19" y1="3" x2="19" y2="14" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    <line x1="19" y1="36" x2="19" y2="45" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />

    {/* Inner Bullseye Circle Ring with opening for arrow */}
    <path
      d="M 23.2 20.8 A 6 6 0 1 0 24.8 26.5"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />

    {/* Arrow hitting dead center: Crisp White with Glowing Accents */}
    <g transform="translate(19, 25) rotate(-45)">
      {/* Arrow Shaft (White) */}
      <line
        x1="24"
        y1="0"
        x2="0"
        y2="0"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Arrow Flight Fletching (White fill with notched tail) */}
      <path
        d="M 16.5 0 L 22 -6.5 L 29 -6.5 L 25.5 0 L 29 6.5 L 22 6.5 Z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Fletching inner ridge slit */}
      <line x1="17" y1="0" x2="25" y2="0" stroke="#030d22" strokeWidth="1.2" />

      {/* Bullseye Impact Spark / Flash at center tip (White & Amber) */}
      <circle cx="0" cy="0" r="2.4" fill="#FFFFFF" />
      <circle cx="0" cy="0" r="4.5" stroke="#F59E0B" strokeWidth="1.2" opacity="0.8" />
    </g>
  </svg>
);

// Surveillance CCTV Camera Icon (matches user uploaded CCTV design with white accents)
export const CctvIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Wall Mount Vertical Plate on Left */}
    <rect x="2" y="27" width="3" height="18" rx="0.8" fill="currentColor" />

    {/* Wall Mount Bracket Arm with Elbow Joint curving up into camera base */}
    <path
      d="M 4.5 35.5 L 9 32.5 L 14 37 C 18.5 37.5 21 34.5 21 30.5 L 21 24.5 L 14.5 24.5 L 14.5 29 C 14.5 30.5 13 31.5 11 31.5 L 7.5 33.5 L 4.5 36.5 Z"
      fill="currentColor"
    />
    {/* Bracket Pivot Joint Accent Pin (White) */}
    <circle cx="17.5" cy="31" r="1.2" fill="#FFFFFF" />

    {/* Camera Lower Body Cylinder */}
    <path
      d="M 3.8 19.8 L 35 29.8 L 32.8 34.5 L 4.5 24.2 Z"
      fill="currentColor"
    />

    {/* Front Lens Barrel / Optical Housing */}
    <path
      d="M 35 29.8 L 40.5 24.5 L 37.8 21.8 L 32.2 27 Z"
      fill="currentColor"
    />

    {/* Front Lens Aperture Face (Angled down-right) */}
    <path
      d="M 36.5 22.5 L 41.5 25 L 39.2 31.5 L 34.2 29 Z"
      fill="currentColor"
    />

    {/* Front Lens Glass Core & Specular Reflection (White & Cyan) */}
    <ellipse cx="37.8" cy="26.8" rx="1.6" ry="3.2" transform="rotate(-26 37.8 26.8)" fill="#02132d" />
    <circle cx="37.8" cy="26.8" r="1.4" fill="#00f0ff" />
    <circle cx="38.5" cy="25.5" r="0.8" fill="#FFFFFF" />

    {/* Top Sun Visor / Shield (with sharp front overhang) */}
    <path
      d="M 6 8.5 L 45 20.8 L 36.5 24.5 L 2.5 15.2 Z"
      fill="currentColor"
    />

    {/* White Curved Dividing Contour Stripe between Top Visor and Lower Body */}
    <path
      d="M 3.2 16.8 C 12 19.5 24 23.2 36.5 24.2"
      stroke="#FFFFFF"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Top Rear Circular Bolt / Optical Sensor Dot (Crisp White as in image) */}
    <circle cx="10" cy="12.5" r="2" fill="#FFFFFF" />
  </svg>
);

// Tactical Clock Icon (matches clock indicator)
export const TacticalClockIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="12" />
    {/* Hour Hand at 11 o'clock */}
    <line x1="16" y1="16" x2="12" y2="10" strokeWidth="2.5" />
    {/* Minute Hand at 42 min / 8.5 o'clock */}
    <line x1="16" y1="16" x2="8.5" y2="20" strokeWidth="2" />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

// Location Map Pin & Ground Shadow Icon (matches user uploaded live location reference with white accents)
export const TacticalGpsPinIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-8 h-8', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ground Shadow Base Ellipse (underneath pin) */}
    <ellipse cx="24" cy="40" rx="17" ry="6.5" fill="currentColor" fillOpacity="0.85" />

    {/* Map Pin Teardrop Body */}
    <path
      d="M 24 43.5 C 22.8 41 11 25.8 11 17 C 11 9.8 16.8 4 24 4 C 31.2 4 37 9.8 37 17 C 37 25.8 25.2 41 24 43.5 Z"
      fill="currentColor"
    />

    {/* White Accent: Crisp White V-Border on Bottom Pin Tip separating it from ground shadow */}
    <path
      d="M 18 31 L 24 42.5 L 30 31"
      stroke="#FFFFFF"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* White Accent: Inner Circular Cutout / Satellite Sensor Core */}
    <circle cx="24" cy="17" r="6.5" fill="#FFFFFF" />

    {/* Center Core GPS Dot (Cyan / Theme accent inside white circle) */}
    <circle cx="24" cy="17" r="2.8" fill="currentColor" />

    {/* Subtle White Top Light Reflective Arc on Head */}
    <path
      d="M 17 8.5 C 19 6.5 21.5 5.5 24 5.5"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.9"
    />
  </svg>
);

// Tactical Compass Rose (top right of map)
export const CompassRose: React.FC<{ className?: string; size?: number }> = ({ className = 'w-12 h-12', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Circles */}
    <circle cx="32" cy="32" r="28" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 3" />
    <circle cx="32" cy="32" r="22" stroke="#06B6D4" strokeWidth="0.8" strokeOpacity="0.6" />
    {/* Crosshairs */}
    <line x1="32" y1="4" x2="32" y2="60" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="4" y1="32" x2="60" y2="32" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.5" />
    {/* North Arrow (Amber/Red) */}
    <polygon points="32,10 35.5,30 32,27" fill="#F59E0B" />
    <polygon points="32,10 28.5,30 32,27" fill="#D97706" />
    {/* South Arrow (Cyan) */}
    <polygon points="32,54 35.5,34 32,37" fill="#0891B2" />
    <polygon points="32,54 28.5,34 32,37" fill="#06B6D4" />
    {/* East Arrow */}
    <polygon points="54,32 34,35.5 37,32" fill="#0E7490" />
    <polygon points="54,32 34,28.5 37,32" fill="#06B6D4" />
    {/* West Arrow */}
    <polygon points="10,32 30,35.5 27,32" fill="#0E7490" />
    <polygon points="10,32 30,28.5 27,32" fill="#06B6D4" />
    {/* Compass Labels */}
    <text x="32" y="7.5" fill="#F59E0B" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">N</text>
    <text x="32" y="63" fill="#38BDF8" fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">S</text>
    <text x="61" y="33.5" fill="#38BDF8" fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">E</text>
    <text x="4" y="33.5" fill="#38BDF8" fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">W</text>
  </svg>
);

// Holographic Wireframe Rotating Globe (bottom left of map)
export const TacticalGlobe: React.FC<{ className?: string; size?: number }> = ({ className = 'w-16 h-16', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    className={`${className} animate-spin-slow`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Glow Circle */}
    <circle cx="40" cy="40" r="36" stroke="#06B6D4" strokeWidth="1.2" strokeOpacity="0.8" />
    <circle cx="40" cy="40" r="36" fill="#06B6D4" fillOpacity="0.05" />
    {/* Latitudes */}
    <ellipse cx="40" cy="40" rx="36" ry="12" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="3 2" />
    <ellipse cx="40" cy="40" rx="36" ry="24" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="3 2" />
    <line x1="4" y1="40" x2="76" y2="40" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.7" />
    {/* Longitudes */}
    <ellipse cx="40" cy="40" rx="12" ry="36" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="3 2" />
    <ellipse cx="40" cy="40" rx="24" ry="36" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="3 2" />
    <line x1="40" y1="4" x2="40" y2="76" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.7" />
    {/* India Coordinates Indicator Dot */}
    <circle cx="50" cy="30" r="2.5" fill="#F59E0B" className="animate-ping" />
    <circle cx="50" cy="30" r="1.5" fill="#FEF08A" />
  </svg>
);
