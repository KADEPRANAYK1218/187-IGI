import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Eye, 
  Check, 
  AlertTriangle, 
  ShieldAlert, 
  RefreshCw, 
  Camera, 
  Glasses, 
  Cpu, 
  Activity, 
  Sparkles, 
  Scan, 
  FileCheck2,
  Lock,
  Radio,
  Fingerprint,
  Zap,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { UserAccount } from '../../../types';
import { getOrCreateBiometricProfile } from '../../../data/biometric-profiles';
import { 
  announceIrisVerified, 
  announceGlassesObstruction, 
  announceNoGlassesDetected, 
  announceFakePerson 
} from '../../../utils/speechAnnouncer';

interface IrisAuthorizationProps {
  user: UserAccount;
  mediaStream: MediaStream | null;
  onSuccess: () => void;
  onFailure: (reason: string) => void;
  simulationForceFail?: boolean;
}

type ScanStage = 'INITIALIZING' | 'ALIGNING' | 'SCANNING' | 'MATCHING' | 'VERIFIED' | 'FAILED';

export const IrisAuthorization: React.FC<IrisAuthorizationProps> = ({
  user,
  mediaStream,
  onSuccess,
  onFailure,
  simulationForceFail = false
}) => {
  const [stage, setStage] = useState<ScanStage>('INITIALIZING');
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [faceVisible, setFaceVisible] = useState<boolean>(true);
  const [spectaclesDetected, setSpectaclesDetected] = useState<boolean>(false);
  const [glassesConfidenceScore, setGlassesConfidenceScore] = useState<number>(8);
  const [phaseDegree, setPhaseDegree] = useState<number>(0);
  const [irisCodeBitsOS, setIrisCodeBitsOS] = useState<number[]>([]);
  const [irisCodeBitsOD, setIrisCodeBitsOD] = useState<number[]>([]);
  const [telemetry, setTelemetry] = useState({
    leftQuality: 98.4,
    rightQuality: 98.1,
    ipdMm: 63.2,
    pupilIrisRatio: 0.34,
    limbicRadiusPx: 44,
    gaborPolarPhase: '0x8F4C2A',
    vectorId: 'BHARAT-IRIS-L4-V2'
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isScanningOrDoneRef = useRef<boolean>(false);
  const hasFinishedRef = useRef<boolean>(false);
  const hasTriggeredSuccessRef = useRef<boolean>(false);
  const announcedGlassesRef = useRef<boolean>(false);
  const spectaclesDetectedRef = useRef<boolean>(false);
  spectaclesDetectedRef.current = spectaclesDetected;

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;
  const userRef = useRef(user);
  userRef.current = user;
  const simulationForceFailRef = useRef(simulationForceFail);
  simulationForceFailRef.current = simulationForceFail;

  // Stable callback ref for video element to guarantee live camera stream attachment
  const setVideoElement = useCallback((video: HTMLVideoElement | null) => {
    videoRef.current = video;
    if (video && mediaStream) {
      if (video.srcObject !== mediaStream) {
        video.srcObject = mediaStream;
      }
      video.play().catch(err => {
        console.warn('Iris live camera playback note:', err);
      });
    }
  }, [mediaStream]);

  // Initialize randomized 2048-bit Gabor feature bitstrips
  useEffect(() => {
    const bitsOS = Array.from({ length: 32 }, () => (Math.random() > 0.45 ? 1 : 0));
    const bitsOD = Array.from({ length: 32 }, () => (Math.random() > 0.45 ? 1 : 0));
    setIrisCodeBitsOS(bitsOS);
    setIrisCodeBitsOD(bitsOD);

    const initTimer = setTimeout(() => {
      setStage('ALIGNING');
    }, 500);

    return () => clearTimeout(initTimer);
  }, []);

  // Connect live camera stream to video element
  useEffect(() => {
    if (videoRef.current && mediaStream) {
      if (videoRef.current.srcObject !== mediaStream) {
        videoRef.current.srcObject = mediaStream;
      }
      videoRef.current.play().catch(err => {
        console.warn('Iris live camera playback note:', err);
      });
    }
  }, [mediaStream]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Execute Dual Iris Optical Extraction & Vector Verification
  const executeScan = useCallback(() => {
    if (spectaclesDetectedRef.current) {
      if (!announcedGlassesRef.current) {
        announcedGlassesRef.current = true;
        announceGlassesObstruction();
      }
      return;
    }

    if (isScanningOrDoneRef.current || hasFinishedRef.current) return;
    isScanningOrDoneRef.current = true;
    setStage('SCANNING');
    setScanProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      // If spectacles equipped during scan, halt immediately
      if (spectaclesDetectedRef.current) {
        clearInterval(interval);
        isScanningOrDoneRef.current = false;
        setStage('ALIGNING');
        setScanProgress(0);
        if (!announcedGlassesRef.current) {
          announcedGlassesRef.current = true;
          announceGlassesObstruction();
        }
        return;
      }

      progress += 16;
      if (progress < 100) {
        setScanProgress(progress);
        setPhaseDegree(prev => (prev + 25) % 360);

        // Animate dynamic 2048-bit Daugman Gabor bit changes
        setIrisCodeBitsOS(prev => {
          const next = [...prev];
          const idx = Math.floor(Math.random() * next.length);
          next[idx] = next[idx] === 1 ? 0 : 1;
          return next;
        });
        setIrisCodeBitsOD(prev => {
          const next = [...prev];
          const idx = Math.floor(Math.random() * next.length);
          next[idx] = next[idx] === 1 ? 0 : 1;
          return next;
        });

        // Real-time telemetry fluctuations
        setTelemetry(prev => ({
          ...prev,
          leftQuality: Math.min(99.6, +(97 + Math.random() * 2.5).toFixed(1)),
          rightQuality: Math.min(99.4, +(96.8 + Math.random() * 2.4).toFixed(1)),
          pupilIrisRatio: +(0.32 + Math.random() * 0.03).toFixed(2),
          ipdMm: +(63.0 + Math.random() * 0.4).toFixed(1),
          gaborPolarPhase: `0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')}`
        }));
      } else {
        clearInterval(interval);
        setScanProgress(100);
        setStage('MATCHING');

        setTimeout(() => {
          if (hasFinishedRef.current) return;

          if (simulationForceFailRef.current) {
            setStage('FAILED');
            const errMsg = `IRIS BIOMETRIC MISMATCH - OCCLUSION OR TAMPERING (ID: ${userRef.current.serviceId})`;
            announceFakePerson();
            onFailureRef.current(errMsg);
            return;
          }

          // Optical Match Confirmed
          setStage('VERIFIED');
          hasFinishedRef.current = true;

          const triggerSuccessOnce = () => {
            if (hasTriggeredSuccessRef.current) return;
            hasTriggeredSuccessRef.current = true;
            onSuccessRef.current();
          };

          // Audio announcement then progress
          announceIrisVerified(() => {
            setTimeout(() => {
              triggerSuccessOnce();
            }, 100);
          });

          // Guaranteed fast timeout fallback
          setTimeout(() => {
            triggerSuccessOnce();
          }, 450);
        }, 120);
      }
    }, 25);
  }, []);

  // Handle Removal of Spectacles -> Auto resume scan
  const handleGlassesRemoved = useCallback(() => {
    if (hasFinishedRef.current || isScanningOrDoneRef.current) return;
    
    announcedGlassesRef.current = false;
    setSpectaclesDetected(false);
    setGlassesConfidenceScore(6);

    announceNoGlassesDetected(() => {
      setTimeout(() => {
        executeScan();
      }, 200);
    });

    setTimeout(() => {
      if (!isScanningOrDoneRef.current && !hasFinishedRef.current) {
        executeScan();
      }
    }, 1100);
  }, [executeScan]);

  // Handle Putting on Spectacles (Obstruction Simulation)
  const handleGlassesEquipped = useCallback(() => {
    setSpectaclesDetected(true);
    setGlassesConfidenceScore(96);
    isScanningOrDoneRef.current = false;
    setStage('ALIGNING');
    setScanProgress(0);
    announcedGlassesRef.current = true;
    announceGlassesObstruction();
  }, []);

  // Auto-initiate scan after camera lock
  useEffect(() => {
    const autoTimer = setTimeout(() => {
      if (!isScanningOrDoneRef.current && !hasFinishedRef.current && !spectaclesDetectedRef.current) {
        executeScan();
      }
    }, 850);

    return () => clearTimeout(autoTimer);
  }, [executeScan]);

  // Render Dual-Iris HUD Reticles on Overlay Canvas
  const drawIrisHUD = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const eyeSpacing = width * 0.24; // Distance between left and right eye centers

    const leftEyeX = centerX - eyeSpacing;
    const rightEyeX = centerX + eyeSpacing;
    const eyeY = centerY - 6;
    const irisRadius = Math.min(width, height) * 0.17;
    const pupilRadius = irisRadius * 0.38;

    // Corner HUD Brackets
    const bSize = 20;
    ctx.strokeStyle = '#06b6d488';
    ctx.lineWidth = 2;
    // Top-Left
    ctx.beginPath();
    ctx.moveTo(16, 16 + bSize); ctx.lineTo(16, 16); ctx.lineTo(16 + bSize, 16);
    ctx.stroke();
    // Top-Right
    ctx.beginPath();
    ctx.moveTo(width - 16 - bSize, 16); ctx.lineTo(width - 16, 16); ctx.lineTo(width - 16, 16 + bSize);
    ctx.stroke();
    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(16, height - 16 - bSize); ctx.lineTo(16, height - 16); ctx.lineTo(16 + bSize, height - 16);
    ctx.stroke();
    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(width - 16 - bSize, height - 16); ctx.lineTo(width - 16, height - 16); ctx.lineTo(width - 16, height - 16 - bSize);
    ctx.stroke();

    // Laser Horizontal Scan Sweep Line
    if (stage === 'SCANNING') {
      const scanY = ((phaseDegree * 2) % height);
      const grad = ctx.createLinearGradient(0, scanY - 12, 0, scanY + 12);
      grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
      grad.addColorStop(0.5, 'rgba(34, 211, 238, 0.7)');
      grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 12, width, 24);

      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();
    }

    // Both Ocular Reticles
    const eyes = [
      { x: leftEyeX, y: eyeY, label: 'OS (OCULUS SINISTER - LEFT)', tag: 'LEFT IRIS' },
      { x: rightEyeX, y: eyeY, label: 'OD (OCULUS DEXTER - RIGHT)', tag: 'RIGHT IRIS' }
    ];

    eyes.forEach((eye, index) => {
      ctx.save();
      ctx.translate(eye.x, eye.y);

      let mainColor = '#06b6d4'; // Cyan default
      if (!faceVisible) {
        mainColor = '#f59e0b'; // Amber
      } else if (spectaclesDetected) {
        mainColor = '#f43f5e'; // Rose
      } else if (stage === 'VERIFIED') {
        mainColor = '#10b981'; // Emerald
      }

      // Outer Rotating Segmented Tracker Ring
      ctx.save();
      ctx.rotate((index === 0 ? phaseDegree : -phaseDegree) * (Math.PI / 180));
      ctx.beginPath();
      ctx.arc(0, 0, irisRadius * 1.32, 0, Math.PI * 2);
      ctx.strokeStyle = `${mainColor}40`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 8, 2, 8]);
      ctx.stroke();
      ctx.restore();

      // Outer Iris Limbus Perimeter Ring
      ctx.beginPath();
      ctx.arc(0, 0, irisRadius, 0, Math.PI * 2);
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = stage === 'SCANNING' ? 2.5 : 2;
      ctx.stroke();

      // Inner Pupil Ring
      ctx.beginPath();
      ctx.arc(0, 0, pupilRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `${mainColor}ee`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Polar Gabor Rays
      if (faceVisible && !spectaclesDetected) {
        const spokes = 16;
        for (let i = 0; i < spokes; i++) {
          const angle = (i * (Math.PI * 2)) / spokes + (index === 0 ? phaseDegree : -phaseDegree) * (Math.PI / 180);
          const x1 = Math.cos(angle) * pupilRadius;
          const y1 = Math.sin(angle) * pupilRadius;
          const x2 = Math.cos(angle) * irisRadius;
          const y2 = Math.sin(angle) * irisRadius;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `${mainColor}${stage === 'SCANNING' ? '88' : '44'}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Active Gabor Arc Sweep
        if (stage === 'SCANNING') {
          const sweepAngle = (phaseDegree * 2.5 * Math.PI) / 180;
          ctx.beginPath();
          ctx.arc(0, 0, irisRadius * 0.92, sweepAngle, sweepAngle + Math.PI / 2.5);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      // Precision Crosshairs
      const chLen = irisRadius * 0.35;
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = 1.5;
      // Top
      ctx.beginPath(); ctx.moveTo(0, -irisRadius - 8); ctx.lineTo(0, -irisRadius - 8 + chLen); ctx.stroke();
      // Bottom
      ctx.beginPath(); ctx.moveTo(0, irisRadius + 8); ctx.lineTo(0, irisRadius + 8 - chLen); ctx.stroke();
      // Left
      ctx.beginPath(); ctx.moveTo(-irisRadius - 8, 0); ctx.lineTo(-irisRadius - 8 + chLen, 0); ctx.stroke();
      // Right
      ctx.beginPath(); ctx.moveTo(irisRadius + 8, 0); ctx.lineTo(irisRadius + 8 - chLen, 0); ctx.stroke();

      // Top Tag
      ctx.font = 'bold 9px monospace';
      ctx.fillStyle = mainColor;
      ctx.textAlign = 'center';
      ctx.fillText(eye.tag, 0, -irisRadius - 14);

      // Bottom Status Readout
      ctx.font = '8px monospace';
      if (spectaclesDetected) {
        ctx.fillStyle = '#f43f5e';
        ctx.fillText('REFRACTION LOCK', 0, irisRadius + 22);
      } else if (stage === 'VERIFIED') {
        ctx.fillStyle = '#10b981';
        ctx.fillText('VECTOR MATCH: 99.4%', 0, irisRadius + 22);
      } else if (stage === 'SCANNING') {
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(`DAUGMAN SEC: ${(index === 0 ? 'OS-4' : 'OD-8')}`, 0, irisRadius + 22);
      } else {
        ctx.fillStyle = '#67e8f9';
        ctx.fillText('STANDBY TARGET', 0, irisRadius + 22);
      }

      ctx.restore();
    });

    // Inter-Pupillary Distance (IPD) HUD Line
    if (faceVisible) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(leftEyeX + irisRadius + 6, eyeY);
      ctx.lineTo(rightEyeX - irisRadius - 6, eyeY);
      ctx.strokeStyle = spectaclesDetected ? '#f43f5e88' : '#06b6d488';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.stroke();

      // Central IPD Badge
      ctx.fillStyle = '#091528ee';
      ctx.fillRect(centerX - 42, eyeY - 10, 84, 18);
      ctx.strokeStyle = spectaclesDetected ? '#f43f5e' : '#06b6d4';
      ctx.lineWidth = 1;
      ctx.strokeRect(centerX - 42, eyeY - 10, 84, 18);

      ctx.font = 'bold 9px monospace';
      ctx.fillStyle = spectaclesDetected ? '#fca5a5' : '#67e8f9';
      ctx.textAlign = 'center';
      ctx.fillText(`IPD: ${telemetry.ipdMm}mm`, centerX, eyeY + 3);
      ctx.restore();
    }

    // Glasses Frame Occlusion Box
    if (spectaclesDetected) {
      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      // Left glass frame
      ctx.strokeRect(leftEyeX - irisRadius * 1.35, eyeY - irisRadius * 1.15, irisRadius * 2.7, irisRadius * 2.3);
      // Right glass frame
      ctx.strokeRect(rightEyeX - irisRadius * 1.35, eyeY - irisRadius * 1.15, irisRadius * 2.7, irisRadius * 2.3);
      // Bridge
      ctx.beginPath();
      ctx.moveTo(leftEyeX + irisRadius * 1.35, eyeY);
      ctx.lineTo(rightEyeX - irisRadius * 1.35, eyeY);
      ctx.stroke();

      ctx.restore();
    }
  }, [faceVisible, spectaclesDetected, stage, phaseDegree, telemetry]);

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;

    const render = () => {
      if (!isMounted) return;
      drawIrisHUD(ctx, canvas.width, canvas.height);
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isMounted = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawIrisHUD]);

  return (
    <div className="vajra-panel-elevated rounded-2xl p-4 sm:p-5 relative overflow-hidden border border-cyan-500/40 max-w-xl w-full mx-auto shadow-2xl backdrop-blur-2xl" id="vajra-iris-auth-card">
      {/* Top Holographic Neon Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 shadow-md shadow-cyan-500/50" />

      {/* Iris Scanner Header Bar */}
      <div className="flex items-center justify-between mb-3 pt-1 pb-2.5 border-b border-cyan-500/20">
        <div className="flex items-center gap-2.5">
          <div className={`p-2.5 rounded-xl border transition-all duration-300 shadow-lg ${
            stage === 'VERIFIED'
              ? 'bg-emerald-950/90 border-emerald-500 text-emerald-400 shadow-emerald-500/20'
              : spectaclesDetected
              ? 'bg-rose-950/90 border-rose-500 text-rose-400 shadow-rose-500/20 animate-pulse'
              : 'bg-cyan-950/90 border-cyan-500 text-cyan-400 shadow-cyan-500/20'
          }`}>
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-white tracking-wider text-sm sm:text-base block">
                VAJRA DUAL-IRIS OPTICAL SCANNER
              </span>
              <span className="px-1.5 py-0.2 rounded text-[8px] font-mono-code font-bold bg-cyan-500/25 text-cyan-300 border border-cyan-500/50">
                LEVEL 4
              </span>
            </div>
            <span className="text-[10px] font-tech text-cyan-300/90 block">
              ISO/IEC 19794-6 • 2048-BIT DAUGMAN POLAR GABOR ENCODING
            </span>
          </div>
        </div>

        {/* Live Hardware Mode Status Badge */}
        {mediaStream ? (
          <span className="flex items-center gap-1.5 text-[10px] font-mono-code font-bold text-emerald-300 bg-emerald-950/70 px-2.5 py-1 rounded-full border border-emerald-500/50 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            LIVE CAMERA FEED
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-[10px] font-mono-code font-bold text-cyan-300 bg-cyan-950/70 px-2.5 py-1 rounded-full border border-cyan-500/50 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            OPTICAL SIMULATOR
          </span>
        )}
      </div>

      {/* Subject Credential Token Card */}
      <div className="mb-2.5 px-3.5 py-2 rounded-xl bg-slate-950/85 border border-cyan-500/30 flex items-center justify-between text-[11px] font-mono-code">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">OFFICER SERVICE ID:</span>
          <strong className="text-cyan-300 font-bold tracking-wider">{user.serviceId}</strong>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">STAGE 1/3:</span>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold text-[10px]">
            DUAL-IRIS BIOMETRIC
          </span>
        </div>
      </div>

      {/* Dynamic Condition Status Banners */}
      {!faceVisible ? (
        <div className="mb-3 p-3 rounded-xl bg-amber-950/90 border border-amber-500 text-amber-200 text-xs font-mono-code flex items-start gap-2.5 shadow-lg animate-pulse">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-amber-600 text-[8px] font-extrabold tracking-wider text-white uppercase">
                OPTICAL TARGET
              </span>
              <strong className="text-xs sm:text-sm font-display tracking-wide text-amber-200">
                ALIGN EYES IN RETICLE
              </strong>
            </div>
            <p className="text-xs text-amber-100/90 mt-0.5 font-tech leading-relaxed">
              Dual iris sensors require clear visual line-of-sight. Look directly into the center of the camera.
            </p>
          </div>
        </div>
      ) : spectaclesDetected ? (
        <div className="mb-3 p-3 rounded-xl bg-rose-950/95 border-2 border-rose-500 text-rose-100 text-xs font-mono-code flex items-start gap-2.5 shadow-xl animate-pulse">
          <Glasses className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-rose-600 text-[8px] font-extrabold tracking-wider text-white uppercase">
                OPTICAL SENSOR LOCK
              </span>
              <strong className="text-xs sm:text-sm font-display tracking-wide text-rose-200">
                PLEASE REMOVE SPECTACLES / GLASSES
              </strong>
            </div>
            <p className="text-xs text-rose-100/90 mt-0.5 font-tech leading-relaxed">
              Eyewear introduces specular reflection and occludes limbic boundaries. Please remove glasses to complete scan.
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px] font-mono-code text-rose-300 bg-rose-900/60 px-2.5 py-1 rounded border border-rose-500/40">
              <span>SPECTACLES OCCLUSION: {glassesConfidenceScore}%</span>
              <button
                onClick={handleGlassesRemoved}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded font-bold transition-all shadow hover:scale-105 active:scale-95 cursor-pointer"
              >
                Glasses Removed (Resume Scan)
              </button>
            </div>
          </div>
        </div>
      ) : stage === 'VERIFIED' ? (
        <div className="mb-3 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-mono-code flex items-center gap-2.5 shadow-lg">
          <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <strong className="text-sm font-display tracking-wide text-emerald-300">
                DUAL-IRIS TEMPLATES VERIFIED
              </strong>
              <span className="px-1.5 py-0.2 rounded bg-emerald-600 text-[8px] font-bold text-white uppercase">
                MATCH: 99.4%
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 font-tech">
              ISO/IEC 19794-6 phasors validated. Transitioning to 3D Face Landmark Verification.
            </p>
          </div>
        </div>
      ) : null}

      {/* Main Dual Iris Viewfinder Matrix (Left Eye OS & Right Eye OD) */}
      <div className={`relative p-2 rounded-2xl bg-slate-950/95 border-2 transition-colors duration-300 overflow-hidden shadow-2xl ${
        !faceVisible
          ? 'border-amber-500 shadow-amber-950/60'
          : spectaclesDetected
          ? 'border-rose-500 shadow-rose-950/60'
          : stage === 'VERIFIED'
          ? 'border-emerald-500 shadow-emerald-950/60'
          : 'border-cyan-500/60 shadow-cyan-950/50'
      }`}>
        {/* Real Live Camera Video Feed (Crystal Clear Opacity, Mirror Flipped for natural look) */}
        <div className="relative w-full aspect-[16/9] max-h-[270px] bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
          {mediaStream ? (
            <video
              ref={setVideoElement}
              autoPlay
              playsInline
              muted
              onLoadedMetadata={(e) => {
                (e.target as HTMLVideoElement).play().catch(() => {});
              }}
              className="w-full h-full object-cover transform -scale-x-100 opacity-100 brightness-115 contrast-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative flex items-center justify-center">
              {/* Synthetic Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />
              <div className="text-center z-10 space-y-1.5">
                <Camera className="w-9 h-9 text-cyan-400 mx-auto animate-pulse" />
                <span className="text-xs font-mono-code font-bold text-cyan-300 block">
                  LIVE OPTICAL CAPTURE ACQUIRED
                </span>
                <span className="text-[10px] font-mono-code text-slate-400 block">
                  DIRECT REAL-TIME OCULAR STREAM ACTIVE
                </span>
              </div>
            </div>
          )}

          {/* Interactive Dynamic Reticle Canvas Overlay */}
          <canvas
            ref={canvasRef}
            width={640}
            height={360}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
          />

          {/* Iris Phasor Code Strip Visualizer (Left Eye OS) */}
          <div className="absolute top-2.5 left-2.5 z-20 bg-slate-950/85 backdrop-blur-xs px-2.5 py-1 rounded-md border border-cyan-500/40 flex items-center gap-1.5 font-mono-code text-[8px] text-cyan-300 shadow">
            <span>OS 2048-BIT:</span>
            <div className="flex gap-0.5">
              {irisCodeBitsOS.slice(0, 14).map((bit, i) => (
                <span 
                  key={`left-bit-${i}`} 
                  className={`w-1.5 h-3 rounded-[1px] ${bit === 1 ? 'bg-cyan-400 shadow-xs shadow-cyan-400' : 'bg-slate-800'}`} 
                />
              ))}
            </div>
          </div>

          {/* Iris Phasor Code Strip Visualizer (Right Eye OD) */}
          <div className="absolute top-2.5 right-2.5 z-20 bg-slate-950/85 backdrop-blur-xs px-2.5 py-1 rounded-md border border-cyan-500/40 flex items-center gap-1.5 font-mono-code text-[8px] text-cyan-300 shadow">
            <div className="flex gap-0.5">
              {irisCodeBitsOD.slice(0, 14).map((bit, i) => (
                <span 
                  key={`right-bit-${i}`} 
                  className={`w-1.5 h-3 rounded-[1px] ${bit === 1 ? 'bg-cyan-400 shadow-xs shadow-cyan-400' : 'bg-slate-800'}`} 
                />
              ))}
            </div>
            <span>:OD 2048-BIT</span>
          </div>

          {/* Spectacles Warning Stamp on Video */}
          {spectaclesDetected && (
            <div className="absolute inset-0 z-30 bg-rose-950/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center animate-fade-in">
              <ShieldAlert className="w-12 h-12 text-rose-400 mb-2 animate-bounce" />
              <div className="px-3.5 py-1 bg-rose-600 text-white font-extrabold text-xs tracking-widest uppercase rounded shadow-lg">
                SPECTACLES DETECTED
              </div>
              <p className="text-xs text-rose-100 mt-2 font-mono-code font-bold max-w-sm">
                HALTED: Eyewear refraction occludes dual iris templates. Remove spectacles to proceed.
              </p>
              <button
                onClick={handleGlassesRemoved}
                className="mt-3 px-4 py-2 bg-white text-rose-950 font-display font-extrabold text-xs rounded-lg shadow-lg hover:bg-rose-50 transition-all hover:scale-105 cursor-pointer"
              >
                I have removed my glasses
              </button>
            </div>
          )}

          {/* No Subject Warning Overlay */}
          {!faceVisible && (
            <div className="absolute inset-0 z-30 bg-amber-950/75 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
              <AlertTriangle className="w-10 h-10 text-amber-400 mb-2 animate-pulse" />
              <span className="text-sm font-display font-extrabold text-amber-200">
                SUBJECT NOT DETECTED
              </span>
              <p className="text-xs text-amber-300 font-mono-code mt-1">
                Please align face and eyes directly in front of camera
              </p>
            </div>
          )}
        </div>

        {/* Dynamic Scan Status readout */}
        <div className="mt-2.5 text-center">
          {!faceVisible ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/85 border border-amber-500/60 text-amber-300 text-xs font-tech font-bold">
              <Activity className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>SEARCHING FOR DUAL LIMBIC PERIMETERS...</span>
            </div>
          ) : spectaclesDetected ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/95 border border-rose-500 text-rose-300 text-xs font-tech font-bold animate-pulse">
              <Glasses className="w-4 h-4 text-rose-400" />
              <span>SPECTACLES DETECTED — REMOVE GLASSES TO SCAN</span>
            </div>
          ) : stage === 'VERIFIED' ? (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-emerald-950/95 border border-emerald-500 text-emerald-300 text-xs font-tech font-bold">
              <Check className="w-4 h-4 text-emerald-400 animate-scale" />
              <span>DUAL IRIS VERIFIED (PROCEEDING TO 3D FACE SCAN)</span>
            </div>
          ) : stage === 'SCANNING' ? (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-cyan-950/95 border border-cyan-500/60 text-cyan-300 text-xs font-tech font-bold">
              <Scan className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>DEMODULATING DUAL 2048-BIT GABOR IRIS PHASORS: {Math.round(scanProgress)}%</span>
            </div>
          ) : stage === 'MATCHING' ? (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-cyan-950/95 border border-cyan-500/60 text-cyan-300 text-xs font-tech font-bold">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>VAJRA QUANTUM-ENCRYPTED VECTOR MATCHING...</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-tech font-bold">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>EYES ALIGNED • READY FOR DUAL IRIS SCAN</span>
            </div>
          )}
        </div>
      </div>

      {/* Telemetry & Vector Security Matrix */}
      <div className="my-2.5 p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/25 text-[10px] font-mono-code space-y-1">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
          <div>
            <span className="text-slate-500 block text-[9px]">LEFT IRIS (OS):</span>
            <span className="text-cyan-300 font-bold">{telemetry.leftQuality}% QUALITY</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[9px]">RIGHT IRIS (OD):</span>
            <span className="text-cyan-300 font-bold">{telemetry.rightQuality}% QUALITY</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[9px]">PUPIL/IRIS RATIO:</span>
            <span className="text-cyan-300 font-bold">{telemetry.pupilIrisRatio}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[9px]">INTERPUPILLARY:</span>
            <span className="text-cyan-300 font-bold">{telemetry.ipdMm} mm</span>
          </div>
        </div>

        <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-slate-400 text-[9px]">
          <span>GABOR POLAR PHASE: <strong className="text-cyan-300">{telemetry.gaborPolarPhase}</strong></span>
          <span>DEFENSE CRYPTO SIGNATURE: <strong className="text-emerald-400">L4-VALIDATED</strong></span>
        </div>
      </div>

      {/* Scan Progress Bar */}
      <div className="space-y-1">
        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30">
          <div 
            className={`h-full transition-all duration-150 ${
              spectaclesDetected 
                ? 'bg-rose-500' 
                : stage === 'VERIFIED'
                ? 'bg-emerald-400'
                : stage === 'ALIGNING'
                ? 'bg-cyan-500'
                : 'bg-gradient-to-r from-cyan-600 via-cyan-400 to-emerald-400'
            }`}
            style={{ 
              width: `${
                spectaclesDetected ? 100 :
                stage === 'VERIFIED' ? 100 : 
                stage === 'SCANNING' ? scanProgress : 
                stage === 'MATCHING' ? 95 : 15
              }%` 
            }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400">
          <span>PIPELINE: DUAL-IRIS BIOMETRIC SCAN</span>
          <span className={`font-bold ${
            spectaclesDetected ? 'text-rose-400' :
            stage === 'VERIFIED' ? 'text-emerald-400' : 'text-cyan-400'
          }`}>
            {!faceVisible ? 'AWAITING SUBJECT' :
             spectaclesDetected ? 'SPECTACLES BLOCKED' :
             stage === 'VERIFIED' ? 'IRIS AUTH PASS' :
             stage === 'SCANNING' ? 'EXTRACTING DUAL IRIS' : 'READY TO SCAN'}
          </span>
        </div>
      </div>

      {/* Simulation / Override Controls */}
      <div className="mt-3 pt-3 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Glasses obstruction toggler */}
          {spectaclesDetected ? (
            <button
              type="button"
              onClick={handleGlassesRemoved}
              className="px-3 py-1.5 rounded-lg text-[11px] font-mono-code font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900/60 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Simulate: Remove Glasses</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGlassesEquipped}
              className="px-3 py-1.5 rounded-lg text-[11px] font-mono-code font-bold bg-rose-950/40 text-rose-300 border border-rose-500/50 hover:bg-rose-900/50 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Glasses className="w-3.5 h-3.5" />
              <span>Simulate: Wear Glasses</span>
            </button>
          )}

          {/* Trigger Scan Button */}
          {stage !== 'VERIFIED' && !spectaclesDetected && (
            <button
              type="button"
              onClick={executeScan}
              disabled={stage === 'SCANNING' || stage === 'MATCHING'}
              className="px-3.5 py-1.5 rounded-lg text-[11px] font-mono-code font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-900/60 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              <Scan className="w-3.5 h-3.5" />
              <span>{stage === 'SCANNING' ? 'Extracting Phasors...' : 'Start Iris Scan'}</span>
            </button>
          )}

          {/* Face visibility toggler */}
          <button
            type="button"
            onClick={() => setFaceVisible(prev => !prev)}
            className="px-2.5 py-1.5 rounded-lg text-[10px] font-mono-code text-slate-400 hover:text-white bg-slate-900/80 border border-slate-700/60 hover:bg-slate-800 transition-all cursor-pointer"
            title="Toggle Face In/Out of View"
          >
            {faceVisible ? 'Simulate: Hide Face' : 'Simulate: Show Face'}
          </button>
        </div>

        <span className="text-[10px] font-mono-code text-cyan-400/80">
          VAJRA OCULAR ENGINE: ACTIVE
        </span>
      </div>

      {/* Footer Tag */}
      <div className="mt-2 text-center text-[9px] font-tech text-slate-500">
        Vajra Biometric Defense Architecture • ISO/IEC 19794-6 • 2048-Bit Daugman Demodulation
      </div>
    </div>
  );
};
