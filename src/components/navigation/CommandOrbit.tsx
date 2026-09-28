import React from 'react';
import { 
  Globe, Map, Users, CloudSun, Radar, Bell, 
  BarChart3, BrainCircuit, FileText, LogOut, ShieldCheck, User 
} from 'lucide-react';
import { UserAccount } from '../../types';
import { VajraLogo } from '../branding/VajraLogo';

export type ActiveCommandTab = 
  | 'MAP_OVERVIEW' 
  | 'BHARAT_DETAIL' 
  | 'PERSONNEL' 
  | 'ENVIRONMENT' 
  | 'SITUATIONAL' 
  | 'ALERTS' 
  | 'ANALYTICS' 
  | 'XAI' 
  | 'AUDIT';

interface CommandOrbitProps {
  user: UserAccount;
  activeTab: ActiveCommandTab;
  onTabChange: (tab: ActiveCommandTab) => void;
  unreadAlertCount: number;
  onLogout: () => void;
}

export const CommandOrbit: React.FC<CommandOrbitProps> = ({
  user,
  activeTab,
  onTabChange,
  unreadAlertCount,
  onLogout
}) => {
  const navItems: { id: ActiveCommandTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'MAP_OVERVIEW', label: 'OVERVIEW', icon: Globe },
    { id: 'BHARAT_DETAIL', label: 'BHARAT', icon: Map },
    { id: 'PERSONNEL', label: 'PERSONNEL', icon: Users },
    { id: 'ENVIRONMENT', label: 'ENVIRONMENT', icon: CloudSun },
    { id: 'SITUATIONAL', label: 'SITUATIONAL VIEW', icon: Radar },
    { id: 'ALERTS', label: 'ALERTS', icon: Bell },
    { id: 'ANALYTICS', label: 'ANALYTICS', icon: BarChart3 },
    { id: 'XAI', label: 'DECISION SUPPORT', icon: BrainCircuit },
    { id: 'AUDIT', label: 'AUDIT', icon: FileText }
  ];

  return (
    <header className="fixed top-3 left-3 right-3 z-40 pointer-events-none flex flex-col md:flex-row items-center justify-between gap-3" id="command-orbit-bar">
      {/* Brand Badge */}
      <div className="pointer-events-auto vajra-panel-elevated px-4 py-2 rounded-2xl border border-cyan-500/30 flex items-center gap-3 backdrop-blur-xl shadow-2xl">
        <VajraLogo size="sm" showSubtitle={false} animated={false} />
        <div className="h-6 w-px bg-slate-800" />
        <div className="hidden sm:block">
          <div className="text-[9px] font-tech text-cyan-400 font-bold uppercase tracking-widest">
            BHARAT COMMAND NETWORK
          </div>
          <div className="text-[11px] font-mono-code text-slate-300 font-semibold">
            {user.service.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Center Floating Command Orbit Navigation Capsule */}
      <nav className="pointer-events-auto vajra-panel-elevated px-2 py-1.5 rounded-2xl border border-cyan-500/35 flex items-center gap-1 backdrop-blur-2xl shadow-2xl overflow-x-auto max-w-full">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`relative px-3 py-1.5 rounded-xl text-xs font-tech font-bold tracking-wider transition whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/30 to-indigo-500/40 text-cyan-200 border border-cyan-400/50 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
              id={`nav-orbit-${item.id.toLowerCase()}`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
              <span className="text-[11px]">{item.label}</span>

              {item.id === 'ALERTS' && unreadAlertCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono-code font-bold bg-rose-500 text-white animate-pulse">
                  {unreadAlertCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right User Echelon Chip & Real Logout Button */}
      <div className="pointer-events-auto vajra-panel-elevated px-3 py-1.5 rounded-2xl border border-cyan-500/30 flex items-center gap-3 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-7 h-7 rounded-full bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-mono-code font-bold text-[11px]">
            {user.serviceId.slice(0, 2)}
          </div>
          <div className="hidden lg:block text-left">
            <div className="font-bold text-white leading-none text-xs">
              {user.rank} {user.fullName.split(' ')[0]}
            </div>
            <div className="text-[10px] font-mono-code text-cyan-300">
              {user.serviceId}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="p-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-rose-100 border border-rose-500/30 transition flex items-center gap-1 text-xs font-tech font-bold"
          title="Secure Logout & Media Stream Termination"
          id="orbit-logout-btn"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[10px]">LOGOUT</span>
        </button>
      </div>
    </header>
  );
};
