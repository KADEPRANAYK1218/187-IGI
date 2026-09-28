import React, { useState } from 'react';
import { Camera, Mic, ShieldAlert, CheckCircle2, Lock, AlertTriangle } from 'lucide-react';

interface BiometricPermissionModalProps {
  isOpen: boolean;
  onAllow: () => void;
  isRequestingMedia?: boolean;
  permissionDeniedError?: string | null;
}

export const BiometricPermissionModal: React.FC<BiometricPermissionModalProps> = ({
  isOpen,
  onAllow,
  isRequestingMedia = false,
  permissionDeniedError = null
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" id="biometric-permission-dialog">
      <div className="vajra-panel-elevated max-w-lg w-full rounded-xl p-6 relative border border-cyan-500/40 overflow-hidden shadow-2xl">
        {/* Top Glow & Decorative Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-500" />

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-cyan-950/70 border border-cyan-500/50 text-cyan-400 shadow-md shadow-cyan-500/20">
            <ShieldAlert className="w-7 h-7 animate-pulse text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-display font-extrabold text-white tracking-wide">
                COMPULSORY HARDWARE ACCESS
              </h2>
              <span className="px-2 py-0.5 rounded text-[9px] font-tech font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                MANDATORY
              </span>
            </div>
            <p className="text-xs font-tech text-cyan-300/80">
              VAJRA MULTI-FACTOR LEVEL 4 AUTHENTICATION PROTOCOL
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Access to the Bharat Command Network requires mandatory live optical and acoustic hardware verification (Iris scanning, 3D face depth analysis, and voice passphrase validation). Camera and microphone access is strictly required to proceed.
        </p>

        {/* Compulsory Permission Item Cards */}
        <div className="space-y-2.5 mb-4">
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-cyan-500/15 text-cyan-300">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-wide">CAMERA ACCESS — COMPULSORY</div>
                <div className="text-[11px] text-slate-400">Required for Iris optical verification & 3D facial depth mapping</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-tech font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              REQUIRED
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/80 border border-emerald-500/30 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-emerald-500/15 text-emerald-300">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-wide">MICROPHONE ACCESS — COMPULSORY</div>
                <div className="text-[11px] text-slate-400">Required for acoustic voice passphrase frequency recognition</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-tech font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              REQUIRED
            </span>
          </div>
        </div>

        {/* Error notice if user/browser blocked permission */}
        {permissionDeniedError && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-950/70 border border-rose-500/60 mb-4 text-xs text-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="block font-bold text-rose-300 mb-0.5">PERMISSION BLOCKED / NOT GRANTED</strong>
              <span>{permissionDeniedError}</span>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/30 mb-5 text-[11px] text-blue-200/90">
          <Lock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <span>
            Biometric video and audio streams are processed locally in real-time and cleared immediately after verification.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-800 flex justify-center items-center">
          <button
            type="button"
            onClick={onAllow}
            disabled={isRequestingMedia}
            className="w-full py-3.5 px-5 rounded-lg text-xs font-extrabold tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            id="biometric-allow-btn"
          >
            {isRequestingMedia ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>PROMPTING BROWSER PERMISSIONS...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-slate-950" />
                <span>ALLOW CAMERA & MICROPHONE ACCESS</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

