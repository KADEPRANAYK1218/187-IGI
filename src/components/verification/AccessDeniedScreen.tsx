import React, { useEffect } from 'react';
import { ShieldX, AlertTriangle, RotateCcw, LogOut, Lock } from 'lucide-react';
import { AuthFactorStatus } from '../../types';
import { VajraLogo } from '../branding/VajraLogo';
import { announceAccessDenied } from '../../utils/speechAnnouncer';

interface AccessDeniedScreenProps {
  factors: AuthFactorStatus;
  failureReason?: string;
  onRetry: () => void;
  onReturnToLogin: () => void;
}

export const AccessDeniedScreen: React.FC<AccessDeniedScreenProps> = ({
  factors,
  failureReason,
  onRetry,
  onReturnToLogin
}) => {
  useEffect(() => {
    // If the failure reason is not already fake person (which has its own vocal announcement)
    if (!failureReason?.includes('FAKE PERSON') && !failureReason?.includes('GLASSES')) {
      announceAccessDenied();
    }
  }, [failureReason]);

  const factorRows = [
    { label: 'SERVICE ID', status: factors.serviceId },
    { label: 'SERVICE', status: factors.service },
    { label: 'RANK', status: factors.rank },
    { label: 'PASSWORD', status: factors.password },
    { label: 'PIN', status: factors.pin },
    { label: 'IRIS', status: factors.iris },
    { label: 'FACE', status: factors.face },
    { label: 'VOICE', status: factors.voice },
    { label: 'PERMISSIONS', status: factors.permissions }
  ];

  const failedCount = factorRows.filter(f => !f.status).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050A14] overflow-hidden" id="access-denied-screen">
      {/* Background Red Warning Pulses */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,10,20,0.85)_0%,rgba(5,10,20,0.98)_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-rose-500/15 animate-radar pointer-events-none" />

      {/* Main Alert Card */}
      <div className="vajra-panel-alert relative z-10 max-w-lg w-full rounded-2xl p-7 border border-rose-500/50 shadow-2xl">
        {/* Brand & Danger Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="p-3.5 rounded-full bg-rose-950/80 border border-rose-500/60 text-rose-400 mb-3 shadow-lg shadow-rose-500/20">
            <ShieldX className="w-10 h-10 animate-pulse" />
          </div>

          <h1 className="text-2xl font-display font-black text-white tracking-wider text-rose-200">
            ACCESS DENIED
          </h1>
          <p className="text-xs font-tech font-bold text-rose-400/90 tracking-widest mt-1">
            MULTI-FACTOR VERIFICATION FAILED
          </p>
        </div>

        {/* Tactical Failure Reason Message */}
        {failureReason && (
          <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/30 text-xs text-rose-200 font-mono-code mb-5 leading-relaxed">
            <span className="font-bold text-rose-400">ERROR LOG: </span>
            {failureReason}
          </div>
        )}

        {/* 9-Factor Verification Status Matrix */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 mb-6">
          <div className="text-[11px] font-tech text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>AUTHENTICATION FACTOR AUDIT MATRIX</span>
            <span className="text-rose-400 font-bold">{failedCount} FAILED</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {factorRows.map(item => (
              <div
                key={item.label}
                className={`p-2 rounded-lg border text-center flex items-center justify-between px-2.5 ${
                  item.status
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-950/60 border-rose-500/60 text-rose-300 font-bold shadow-inner'
                }`}
              >
                <span className="text-[11px] font-tech">{item.label}</span>
                <span className="font-mono-code text-sm">
                  {item.status ? '✓' : '✕'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Strict Security Policy Notice */}
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 mb-6">
          <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span>
            Strict zero-trust enforcement: All mandatory factors must match simultaneously. Partial credentials are rejected.
          </span>
        </div>

        {/* Mandatory Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onReturnToLogin}
            className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition border border-slate-700 flex items-center justify-center gap-2"
            id="return-to-login-btn"
          >
            <LogOut className="w-4 h-4" />
            <span>RETURN TO LOGIN</span>
          </button>

          <button
            type="button"
            onClick={onRetry}
            className="w-full py-2.5 px-4 rounded-lg text-xs font-bold tracking-wider text-white bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 transition shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
            id="retry-verification-btn"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RETRY FAILED VERIFICATION</span>
          </button>
        </div>
      </div>
    </div>
  );
};
