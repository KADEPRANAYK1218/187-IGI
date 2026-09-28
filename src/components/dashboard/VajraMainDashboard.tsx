import React, { useState, useEffect } from 'react';
import { 
  Home, Camera, AlertTriangle, Brain, FileText, 
  Layers, Settings, Shield, Bell, User as UserIcon, 
  LogOut, ChevronRight, Activity, Radio, Lock, Map as MapIcon,
  Cpu, Sun, Moon, Eye, ShieldAlert
} from 'lucide-react';
import { UserAccount } from '../../types';
import { VajraLogo } from '../branding/VajraLogo';
import { useSettings } from '../../context/SettingsContext';
import { MetricCardsRow } from './MetricCardsRow';
import { LiveOperationalMap } from './LiveOperationalMap';
import { RecentReportsWidget } from './RecentReportsWidget';
import { 
  RecentIncidentsWidget, 
  WeatherIntelligenceWidget, 
  MissionStatusGauges, 
  SoldierHealthGauges 
} from './RightColumnWidgets';
import { WeatherToastContainer } from '../weather/WeatherToastContainer';

// Lazy-loaded specialized views to keep the dashboard responsive and fast
const VajraAiAnalysisView = React.lazy(() => import('../analytics/VajraAiAnalysisView').then(m => ({ default: m.VajraAiAnalysisView })));
const VajraLiveFeedsView = React.lazy(() => import('../feeds/VajraLiveFeedsView').then(m => ({ default: m.VajraLiveFeedsView })));
const VajraSurveillanceView = React.lazy(() => import('../surveillance/VajraSurveillanceView').then(m => ({ default: m.VajraSurveillanceView })));
const VajraReportsView = React.lazy(() => import('../reports/VajraReportsView').then(m => ({ default: m.VajraReportsView })));
const VajraResourcesView = React.lazy(() => import('../resources/VajraResourcesView').then(m => ({ default: m.VajraResourcesView })));
const VajraThreatsView = React.lazy(() => import('../threats/VajraThreatsView').then(m => ({ default: m.VajraThreatsView })));
const VajraSettingsView = React.lazy(() => import('../settings/VajraSettingsView').then(m => ({ default: m.VajraSettingsView })));

import indiaCyberNeuralMap from '../../assets/images/india_neural_cyber_map_1788703459745.jpg';

const ViewLoadingFallback = () => (
  <div className="w-full flex-1 min-h-[300px] flex flex-col items-center justify-center p-8 text-cyan-400 select-none">
    <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin mb-3" />
    <span className="text-xs font-tech text-cyan-300 tracking-widest uppercase">LOADING TACTICAL MODULE...</span>
  </div>
);

interface VajraMainDashboardProps {
  user: UserAccount;
  onLogout: () => void;
}

export const VajraMainDashboard: React.FC<VajraMainDashboardProps> = ({ user, onLogout }) => {
  const { 
    theme, 
    setTheme,
    formatDate, 
    formatTime, 
    dateFormat, 
    timeFormat, 
    dashboardLayout 
  } = useSettings();

  const isLight = theme === 'Light';

  // Default to 'DASHBOARD' so the officer lands on the main Command Dashboard first
  const [activeNav, setActiveNav] = useState<'DASHBOARD' | 'FEEDS' | 'SURVEILLANCE' | 'THREATS' | 'AI' | 'REPORTS' | 'RESOURCES' | 'SETTINGS'>('DASHBOARD');
  const [liveClock, setLiveClock] = useState<string>(() => formatTime(new Date()));
  const [liveDate, setLiveDate] = useState<string>(() => formatDate(new Date()));
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  // Live real-time clock synced with user's selected time and date formats
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveClock(formatTime(now));
      setLiveDate(formatDate(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [formatDate, formatTime, dateFormat, timeFormat]);

  const navItems = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: Home, count: null },
    { id: 'FEEDS', label: 'Live Feeds', icon: Camera, count: null },
    { id: 'SURVEILLANCE', label: 'Intelligent Surveillance', icon: ShieldAlert, count: '03' },
    { id: 'THREATS', label: 'Threats & Incidents', icon: AlertTriangle, count: null },
    { id: 'AI', label: 'AI Analysis', icon: Brain, count: null },
    { id: 'REPORTS', label: 'Reports', icon: FileText, count: null },
    { id: 'RESOURCES', label: 'Resources', icon: Layers, count: null },
    { id: 'SETTINGS', label: 'Settings', icon: Settings, count: null }
  ];

  const layoutPadding = dashboardLayout === 'Compact' 
    ? 'p-2 sm:p-2.5 space-y-2.5' 
    : dashboardLayout === 'Expanded' 
    ? 'p-5 sm:p-6 space-y-5' 
    : 'p-3 sm:p-4 space-y-3.5';

  return (
    <div 
      className={`relative w-full h-full min-h-screen ${isLight ? 'bg-[#f1f5f9] text-slate-900' : 'bg-[#010614] text-slate-100'} flex flex-col overflow-x-hidden font-tech select-none transition-colors duration-200`} 
      id="vajra-main-dashboard"
    >
      {/* Background Ambience / Subtle Grid */}
      <div className={`fixed inset-0 ${isLight ? 'bg-[radial-gradient(#94a3b8_0.75px,transparent_0.75px)] opacity-20' : 'bg-[radial-gradient(#0055ff_0.75px,transparent_0.75px)] opacity-10'} [background-size:24px_24px] pointer-events-none`} />

      {/* Floating Tactical Weather Notifications */}
      <WeatherToastContainer />

      {/* ======================= TOP HEADER BAR ======================= */}
      <header className={`relative z-30 w-full h-16 ${isLight ? 'bg-white border-b border-slate-300 shadow-sm' : 'bg-[#02091b]/95 border-b border-[#0055ff]/40'} px-3 sm:px-6 flex items-center justify-between backdrop-blur-xl shrink-0 transition-colors duration-200`}>
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <VajraLogo size="sm" showSubtitle={false} animated={false} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 font-serif">
                VAJRA
              </span>
            </div>
            <div className={`text-[9px] sm:text-[10px] font-mono-code font-bold tracking-widest ${isLight ? 'text-cyan-800' : 'text-cyan-400'} uppercase leading-none`}>
              AI DEFENSE COMMAND & DECISION SUPPORT SYSTEM
            </div>
          </div>
        </div>

        {/* Center: BHARAT COMMAND NETWORK pill */}
        <div className={`hidden md:flex items-center gap-2.5 px-4 py-1.5 rounded-full ${
          isLight 
            ? 'bg-slate-100 border border-slate-300 shadow-sm' 
            : 'bg-[#02132d]/90 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
        }`}>
          <div className={`w-5 h-5 rounded-full ${isLight ? 'bg-amber-100 border border-amber-400 text-amber-700' : 'bg-amber-500/20 border border-amber-400/60 text-amber-300'} flex items-center justify-center`}>
            <Lock className="w-3 h-3" />
          </div>
          <div className="text-center">
            <div className={`text-xs font-tech font-bold ${isLight ? 'text-cyan-900' : 'text-cyan-300'} tracking-wider`}>
              BHARAT COMMAND NETWORK
            </div>
            <div className={`text-[8.5px] font-mono-code font-bold tracking-widest ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              SECURE | INTEGRATED | INTELLIGENT
            </div>
          </div>
        </div>

        {/* Right: Clock, Status, Theme Quick Switcher & User Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Live Date and Time */}
          <div className="text-right hidden lg:block">
            <div className={`text-[10.5px] font-mono-code ${isLight ? 'text-slate-600 font-bold' : 'text-slate-300 font-medium'} leading-none`}>
              {liveDate}
            </div>
            <div className={`text-sm font-tech font-bold ${isLight ? 'text-cyan-800' : 'text-cyan-300'} tracking-wider leading-tight mt-0.5`}>
              {liveClock}
            </div>
            <div className={`flex items-center justify-end gap-1 text-[9.5px] font-mono-code ${isLight ? 'text-emerald-700' : 'text-emerald-400'} font-bold leading-none mt-0.5`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-emerald-600' : 'bg-emerald-400 animate-pulse'}`} />
              <span>System Online</span>
            </div>
          </div>

          {/* Quick Theme Switcher Button */}
          <button
            type="button"
            onClick={() => setTheme(isLight ? 'Dark' : 'Light')}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-tech font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
              isLight
                ? 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-950 font-extrabold shadow-amber-500/15'
                : 'bg-[#031533] hover:bg-[#041d47] border-cyan-500/40 text-cyan-300'
            }`}
            title={isLight ? 'Switch to Tactical Dark Mode' : 'Switch to Daylight Optical Light Mode'}
            id="dashboard-header-theme-toggle"
          >
            {isLight ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-900" />
                <span className="hidden sm:inline">DARK MODE</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">LIGHT MODE</span>
              </>
            )}
          </button>

          {/* Officer Profile Card */}
          <div className="relative">
            <div 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-2.5 px-2.5 py-1 rounded-xl ${
                isLight 
                  ? 'bg-slate-100 border border-slate-300 hover:bg-slate-200' 
                  : 'bg-[#031533] border border-cyan-500/50 hover:border-cyan-300'
              } transition cursor-pointer shadow-sm`}
            >
              <div className={`w-8 h-8 rounded-lg ${
                isLight ? 'bg-white border-slate-300 text-cyan-700' : 'bg-cyan-950/80 border border-cyan-400/50 text-cyan-400'
              } border flex items-center justify-center shrink-0 shadow-inner`}>
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="text-left leading-none pr-1">
                <div className={`text-[11px] font-tech font-bold ${isLight ? 'text-slate-900' : 'text-white'} leading-tight`}>
                  {user.fullName || 'Major IC-7K42P9'}
                </div>
                <div className={`text-[9px] font-mono-code font-bold ${isLight ? 'text-cyan-800' : 'text-cyan-400'} leading-tight`}>
                  {user.service || 'Indian Army'}
                </div>
                <div className={`text-[8.5px] font-mono-code ${isLight ? 'text-slate-500' : 'text-slate-400'} leading-tight`}>
                  {user.rank || 'Command Level'}
                </div>
              </div>
            </div>

            {/* Dropdown Logout Menu */}
            {showUserMenu && (
              <div className={`absolute right-0 mt-2 w-64 ${
                isLight ? 'bg-white border-slate-300 text-slate-900 shadow-2xl' : 'bg-slate-950 border-cyan-500/40 text-white shadow-2xl'
              } border rounded-xl p-3 z-50 animate-fade-in`}>
                <div className={`text-xs font-tech font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {user.fullName || 'Major IC-7K42P9'}
                </div>
                <div className={`text-[10px] font-mono-code ${isLight ? 'text-cyan-800 font-bold' : 'text-cyan-400'} mt-0.5`}>
                  {user.service || 'Indian Army'} • {user.rank || 'Command Level'}
                </div>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="mt-2 w-full py-1.5 px-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-mono-code font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Secure Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setActiveNav('SETTINGS')}
            className={`p-2 rounded-xl ${
              isLight 
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-950' 
                : 'bg-[#031533] hover:bg-[#041d47] border border-cyan-500/40 text-cyan-400 hover:text-white'
            } border transition cursor-pointer`}
            title="System Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ======================= MAIN BODY: SIDEBAR + CONTENT ======================= */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className={`w-56 xl:w-60 ${isLight ? 'bg-white border-r border-slate-300 shadow-sm' : 'bg-[#020a1c]/95 border-r border-[#0055ff]/30'} flex flex-col justify-between p-3 shrink-0 backdrop-blur-xl transition-colors duration-200`}>
          {/* Nav Items */}
          <div className="space-y-1.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-tech font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/50'
                      : isLight
                      ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-transparent'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${item.id === 'THREATS' ? 'text-red-500' : isActive ? 'text-white' : isLight ? 'text-slate-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.count !== null && (
                    <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-mono-code font-bold flex items-center justify-center shadow-xs">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Sidebar Box: Holographic India Map & Encrypted Badge */}
          <div className={`space-y-2.5 pt-3 border-t ${isLight ? 'border-slate-200' : 'border-[#0055ff]/30'}`}>
            {/* Holographic Glowing India Neural Network Cyber Map */}
            <div className={`relative w-full h-40 ${isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#010816] border-cyan-500/40 shadow-[0_0_15px_rgba(0,180,255,0.2)]'} rounded-xl border overflow-hidden flex items-center justify-center p-1 group`}>
              <img
                src={indiaCyberNeuralMap}
                alt="Bharat Holographic Neural Mesh"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.45)] transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Tactical Scanning Line Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none animate-pulse" />

              {/* Status Pill */}
              <div className={`absolute top-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded ${isLight ? 'bg-white/90 border-slate-300 text-cyan-800' : 'bg-[#020b1c]/80 border-cyan-500/50 text-cyan-300'} border backdrop-blur-sm`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[8px] font-mono-code font-bold tracking-wider">
                  NEURAL MESH
                </span>
              </div>
            </div>

            {/* Secure • Encrypted VAJRA Badge */}
            <div className={`flex items-center gap-2.5 p-2 rounded-xl ${isLight ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-[#02132d] border-cyan-500/30 text-white'} border`}>
              <div className={`w-7 h-7 rounded-lg ${isLight ? 'bg-white border-slate-300 text-cyan-700' : 'bg-cyan-950 border-cyan-400/50 text-cyan-400'} border flex items-center justify-center shrink-0`}>
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className={`text-[9px] font-mono-code font-bold ${isLight ? 'text-cyan-800' : 'text-cyan-300'} truncate`}>
                  Secure • Encrypted
                </div>
                <div className={`text-xs font-tech font-bold ${isLight ? 'text-slate-900' : 'text-white'} leading-none`}>
                  VAJRA
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className={`flex-1 flex flex-col ${layoutPadding} overflow-y-auto`}>
          <React.Suspense fallback={<ViewLoadingFallback />}>
            {/* Render AI Analysis View when activeNav === 'AI' */}
            {activeNav === 'AI' && (
              <VajraAiAnalysisView />
            )}

            {/* Render Dashboard View */}
            {activeNav === 'DASHBOARD' && (
              <>
                {/* Row 1: 7 Metric KPI Cards */}
                <MetricCardsRow />

                {/* Row 2: Main Grid Split (Center Map & Widgets + Right Column) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 flex-1">
                  {/* Center / Left 8 Columns */}
                  <div className="lg:col-span-8 flex flex-col space-y-3.5 sm:space-y-4">
                    {/* Dominant Live Operational Map */}
                    <LiveOperationalMap />

                    {/* Bottom Panel: Recent Reports */}
                    <div className="w-full">
                      <RecentReportsWidget onNavigateToReports={() => setActiveNav('REPORTS')} />
                    </div>
                  </div>

                  {/* Right 4 Columns: 4 Panels */}
                  <div className="lg:col-span-4 flex flex-col space-y-3.5 sm:space-y-4">
                    <RecentIncidentsWidget />
                    <WeatherIntelligenceWidget />
                    <MissionStatusGauges />
                    <SoldierHealthGauges />
                  </div>
                </div>
              </>
            )}

            {/* Sub-Views for Other Sidebar Tabs */}
            {activeNav === 'FEEDS' && (
              <VajraLiveFeedsView onNavigateToThreats={() => setActiveNav('THREATS')} />
            )}

            {activeNav === 'SURVEILLANCE' && (
              <div className="relative w-full flex-1">
                <VajraSurveillanceView />
              </div>
            )}

            {activeNav === 'THREATS' && (
              <div className="relative w-full flex-1">
                <VajraThreatsView onNavigate={(nav) => setActiveNav(nav)} />
              </div>
            )}

            {activeNav === 'REPORTS' && (
              <div className="relative w-full flex-1">
                <VajraReportsView />
              </div>
            )}

            {activeNav === 'RESOURCES' && (
              <div className="relative w-full flex-1">
                <VajraResourcesView />
              </div>
            )}

            {activeNav === 'SETTINGS' && (
              <VajraSettingsView user={user} onLogout={onLogout} />
            )}
          </React.Suspense>

          {/* ======================= BOTTOM ECG / PULSE TACTICAL FOOTER (Only when not in SETTINGS, which has its own footer) ======================= */}
          {activeNav !== 'SETTINGS' && (
            <footer className="mt-auto py-2.5 px-4 rounded-xl bg-[#020b1c]/90 border border-[#0055ff]/35 text-center flex items-center justify-center gap-4 backdrop-blur-md">
              {/* Left ECG Wave */}
              <div className="hidden sm:flex items-center h-4 w-28 overflow-hidden opacity-80">
                <svg viewBox="0 0 100 20" className="w-full h-full">
                  <path d="M 0 10 L 30 10 L 38 2 L 44 18 L 50 4 L 56 14 L 62 10 L 100 10" fill="none" stroke="#00ffff" strokeWidth="1.5" />
                </svg>
              </div>

              <span className="text-[11px] sm:text-xs font-tech font-bold tracking-[0.25em] text-cyan-400 uppercase">
                VAJRA • UNIFIED AI COMMAND • SECURITY • INTELLIGENCE • BORDER SAFETY • STRONGER NATION
              </span>

              {/* Right ECG Wave */}
              <div className="hidden sm:flex items-center h-4 w-28 overflow-hidden opacity-80">
                <svg viewBox="0 0 100 20" className="w-full h-full">
                  <path d="M 0 10 L 30 10 L 38 2 L 44 18 L 50 4 L 56 14 L 62 10 L 100 10" fill="none" stroke="#00ffff" strokeWidth="1.5" />
                </svg>
              </div>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
};

