import React from 'react';

interface VajraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  animated?: boolean;
  className?: string;
}

export const VajraLogo: React.FC<VajraLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  animated = false,
  className = ''
}) => {
  const sizeMap = {
    sm: { icon: 32, title: 'text-lg', sub: 'text-[10px]' },
    md: { icon: 44, title: 'text-2xl', sub: 'text-xs' },
    lg: { icon: 60, title: 'text-3xl', sub: 'text-sm' },
    xl: { icon: 84, title: 'text-5xl', sub: 'text-base' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="vajra-brand-identity">
      {/* Old Vajra Thunderbolt & Chakra Hexagonal Emblem */}
      <div className="relative flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={animated ? 'animate-float-subtle' : ''}
        >
          <defs>
            {/* Saffron to India Green to Cyan Gradients */}
            <linearGradient id="vajraSaffronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <linearGradient id="vajraCyanGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>

            <linearGradient id="vajraGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#138808" />
            </linearGradient>

            <radialGradient id="vajraCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#000080" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#050A14" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer Rotating/Pulsing Tactical Shield */}
          <polygon
            points="50,5 88,27 88,73 50,95 12,73 12,27"
            stroke="url(#vajraSaffronGrad)"
            strokeWidth="2.5"
            fill="none"
            opacity="0.85"
          />

          {/* Inner Secondary Hexagon Frame */}
          <polygon
            points="50,14 80,31 80,69 50,86 20,69 20,31"
            stroke="#22D3EE"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            fill="url(#vajraCoreGlow)"
            opacity="0.6"
          />

          {/* Tactical 24-Spoke Chakra Ring in Background */}
          <circle cx="50" cy="50" r="22" stroke="#000080" strokeWidth="1.5" strokeOpacity="0.7" />
          <circle cx="50" cy="50" r="16" stroke="#22D3EE" strokeWidth="0.8" strokeDasharray="2 2" />

          {/* Stylized Vajra (Thunderbolt / Dorje) Weapon Prongs */}
          {/* Vertical Diamond Axis */}
          <path
            d="M50 8 L54 30 L50 34 L46 30 Z"
            fill="url(#vajraSaffronGrad)"
          />
          <path
            d="M50 92 L54 70 L50 66 L46 70 Z"
            fill="url(#vajraGreenGrad)"
          />

          {/* Horizontal Prongs */}
          <path
            d="M8 50 L30 46 L34 50 L30 54 Z"
            fill="url(#vajraCyanGrad)"
          />
          <path
            d="M92 50 L70 46 L66 50 L70 54 Z"
            fill="url(#vajraCyanGrad)"
          />

          {/* Diagonal Thunderbolt Claws */}
          <path
            d="M20 20 L38 35 L33 40 L16 28 Z"
            fill="url(#vajraSaffronGrad)"
            opacity="0.9"
          />
          <path
            d="M80 20 L62 35 L67 40 L84 28 Z"
            fill="url(#vajraSaffronGrad)"
            opacity="0.9"
          />
          <path
            d="M20 80 L38 65 L33 60 L16 72 Z"
            fill="url(#vajraGreenGrad)"
            opacity="0.9"
          />
          <path
            d="M80 80 L62 65 L67 60 L84 72 Z"
            fill="url(#vajraGreenGrad)"
            opacity="0.9"
          />

          {/* Central Vajra Core Orb */}
          <circle cx="50" cy="50" r="7" fill="#0A1428" stroke="#FF9933" strokeWidth="1.8" />
          <circle cx="50" cy="50" r="3.5" fill="#22D3EE" />
        </svg>

        {/* Subtle decorative glow ring */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-md pointer-events-none -z-10" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-display font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-300 ${currentSize.title}`}>
            VAJRA
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        {showSubtitle && (
          <span className={`font-tech font-bold uppercase tracking-widest text-cyan-300/85 mt-0.5 ${currentSize.sub}`}>
            BHARAT COMMAND NETWORK
          </span>
        )}
      </div>
    </div>
  );
};
