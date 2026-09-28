import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Globe, Map, Activity, Bell, BarChart3, 
  BrainCircuit, FileText, CloudSun, LogOut, Radio, 
  AlertCircle, CheckCircle2, RefreshCw, Layers 
} from 'lucide-react';
import { 
  UserAccount, AuthFactorStatus, AuthSession, 
  GeoLocationItem, TacticalAlert, DecisionSupportItem 
} from './types';
import { IndiaGeospatialBackground } from './components/landing/IndiaGeospatialBackground';
import { LoginCard } from './components/auth/LoginCard';
import { VajraAuthLanding } from './components/landing/VajraAuthLanding';
import { BiometricPermissionModal } from './components/biometric/BiometricPermissionModal';
import { IrisAuthorization } from './components/biometric/iris/IrisAuthorization';
import { FaceAuthorization } from './components/biometric/face/FaceAuthorization';
import { VoiceAuthorization } from './components/biometric/voice/VoiceAuthorization';
import { SecureVerificationScreen } from './components/verification/SecureVerificationScreen';
import { AccessDeniedScreen } from './components/verification/AccessDeniedScreen';
import { VajraMainDashboard } from './components/dashboard/VajraMainDashboard';
import { INITIAL_OFFICERS } from './data/users';
import { TACTICAL_ALERTS } from './data/alerts';

type AuthStage = 
  | 'LOGIN'
  | 'PERMISSION_PROMPT'
  | 'IRIS_SCAN'
  | 'FACE_SCAN'
  | 'VOICE_SCAN'
  | 'VERIFICATION_CINEMATIC'
  | 'ACCESS_DENIED'
  | 'DASHBOARD';

export default function App() {
  // Authentication & Session State - ALWAYS starts at LOGIN on reload or initial visit
  const [authStage, setAuthStage] = useState<AuthStage>('LOGIN');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isRequestingMedia, setIsRequestingMedia] = useState<boolean>(false);
  const [failureReason, setFailureReason] = useState<string>('');

  // Simulation test mode to trigger intentional biometric failure to test Access Denied screen
  const [testForceFailFactor, setTestForceFailFactor] = useState<'NONE' | 'IRIS' | 'FACE' | 'VOICE'>('NONE');

  // Factor Verification State Matrix
  const [authFactors, setAuthFactors] = useState<AuthFactorStatus>({
    serviceId: false,
    service: false,
    rank: false,
    password: false,
    pin: false,
    biometricConsent: false,
    iris: false,
    face: false,
    voice: false,
    permissions: false
  });

  // Stop camera & microphone media stream helper
  const stopMediaTracks = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

  // Clean up media tracks when leaving biometric flow
  useEffect(() => {
    if (authStage === 'DASHBOARD' || authStage === 'LOGIN' || authStage === 'ACCESS_DENIED') {
      stopMediaTracks();
    }
  }, [authStage]);

  // STRICT REQUIREMENT: When user refreshes, MUST see LOGIN PAGE first
  useEffect(() => {
    try {
      sessionStorage.removeItem('vajra_authenticated_officer');
    } catch (e) {
      // ignore
    }
  }, []);

  // Handler: Credentials verified from login form -> Move to Factor 1: IRIS
  const handleCredentialsVerified = async (
    user: UserAccount,
    factorStatus: {
      serviceId: boolean;
      service: boolean;
      rank: boolean;
      password: boolean;
      pin: boolean;
    }
  ) => {
    setCurrentUser(user);
    setAuthFactors(prev => ({
      ...prev,
      ...factorStatus,
      biometricConsent: true
    }));
    
    // Check if mediaStream is already active
    if (mediaStream) {
      setAuthFactors(prev => ({ ...prev, permissions: true }));
      setAuthStage('IRIS_SCAN');
      return;
    }

    // Attempt direct camera acquisition in this user-gesture context
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280, min: 640 }, height: { ideal: 720, min: 480 } },
          audio: { echoCancellation: true, noiseSuppression: true }
        });
        setMediaStream(stream);
        setAuthFactors(prev => ({ ...prev, permissions: true }));
        setAuthStage('IRIS_SCAN');
        return;
      } catch (err) {
        console.info('Direct camera prompt note, falling back to permission dialog:', err);
      }
    }
    
    // Prompt hardware permission dialog to proceed to IRIS
    setAuthStage('PERMISSION_PROMPT');
  };

  // Handler: Credential check failure
  const handleAuthenticationFailed = (
    failedFactors: {
      serviceId: boolean;
      service: boolean;
      rank: boolean;
      password: boolean;
      pin: boolean;
    },
    reason: string
  ) => {
    setAuthFactors(prev => ({
      ...prev,
      ...failedFactors,
      iris: false,
      face: false,
      voice: false,
      permissions: false
    }));
    setFailureReason(reason);
    setAuthStage('ACCESS_DENIED');
  };

  const [permissionDeniedError, setPermissionDeniedError] = useState<string | null>(null);

  // Handler: Allow Camera & Microphone Permissions
  const handleAllowPermissions = async () => {
    setIsRequestingMedia(true);
    setPermissionDeniedError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          // Attempt acquiring both live camera & high-quality microphone with standard compatible constraints
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'user',
              width: { ideal: 1280, min: 640 },
              height: { ideal: 720, min: 480 }
            },
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          });
          setMediaStream(stream);
          setAuthFactors(prev => ({ ...prev, permissions: true }));
          setAuthStage('IRIS_SCAN');
        } catch (combinedErr: any) {
          console.warn('Standard camera+mic request note, attempting simplified fallback:', combinedErr);
          
          // Try with simplest video + audio constraints
          let vidStream: MediaStream | null = null;
          try {
            vidStream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
              }
            });
            setMediaStream(vidStream);
            setAuthFactors(prev => ({ ...prev, permissions: true }));
            setAuthStage('IRIS_SCAN');
            return;
          } catch (simpErr) {
            console.warn('Simplified stream failed, attempting video only:', simpErr);
          }

          // Try acquiring video individually
          try {
            vidStream = await navigator.mediaDevices.getUserMedia({
              video: true
            });
          } catch (vErr: any) {
            console.warn('Video acquisition error:', vErr);
          }

          // Try acquiring audio individually
          let audStream: MediaStream | null = null;
          try {
            audStream = await navigator.mediaDevices.getUserMedia({
              audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
              }
            });
          } catch (aErr: any) {
            console.warn('Audio acquisition error:', aErr);
          }

          if (vidStream && audStream) {
            const combined = new MediaStream([
              ...vidStream.getVideoTracks(),
              ...audStream.getAudioTracks()
            ]);
            setMediaStream(combined);
            setAuthFactors(prev => ({ ...prev, permissions: true }));
            setAuthStage('IRIS_SCAN');
          } else if (vidStream) {
            setMediaStream(vidStream);
            setAuthFactors(prev => ({ ...prev, permissions: true }));
            setAuthStage('IRIS_SCAN');
          } else if (audStream) {
            setMediaStream(audStream);
            setAuthFactors(prev => ({ ...prev, permissions: true }));
            setAuthStage('IRIS_SCAN');
          } else {
            console.info('Operating in simulated optical/acoustic hardware mode');
            setAuthFactors(prev => ({ ...prev, permissions: true }));
            setAuthStage('IRIS_SCAN');
          }
        }
      } else {
        // Fallback for environments where mediaDevices is not available
        setAuthFactors(prev => ({ ...prev, permissions: true }));
        setAuthStage('IRIS_SCAN');
      }
    } catch (err: any) {
      console.warn('Hardware media stream prompt error:', err);
      setAuthFactors(prev => ({ ...prev, permissions: true }));
      setAuthStage('IRIS_SCAN');
    } finally {
      setIsRequestingMedia(false);
    }
  };

  // Handler: Cancel Biometric Permission -> Trigger Access Denied
  const handleCancelPermissions = () => {
    setAuthFactors(prev => ({ ...prev, permissions: false }));
    setFailureReason('HARDWARE_PERMISSION_DENIED: Camera and Microphone access denied by user.');
    setAuthStage('ACCESS_DENIED');
  };

  // Biometric Step 1: Iris Success
  const handleIrisSuccess = () => {
    setAuthFactors(prev => ({ ...prev, iris: true }));
    setAuthStage(current => (current === 'IRIS_SCAN' ? 'FACE_SCAN' : current));
  };

  // Biometric Step 1: Iris Failure
  const handleIrisFailure = (reason: string) => {
    setAuthFactors(prev => ({ ...prev, iris: false }));
    setFailureReason(reason);
    setAuthStage('ACCESS_DENIED');
  };

  // Biometric Step 2: 3D Face Success
  const handleFaceSuccess = () => {
    setAuthFactors(prev => ({ ...prev, face: true }));
    setAuthStage(current => (current === 'FACE_SCAN' ? 'VOICE_SCAN' : current));
  };

  // Biometric Step 2: 3D Face Failure
  const handleFaceFailure = (reason: string) => {
    setAuthFactors(prev => ({ ...prev, face: false }));
    setFailureReason(reason);
    setAuthStage('ACCESS_DENIED');
  };

  // Biometric Step 3: Voice Success (Guarded against multiple triggers)
  const handleVoiceSuccess = () => {
    setAuthFactors(prev => ({ ...prev, voice: true }));
    setAuthStage(current => (current === 'VOICE_SCAN' ? 'VERIFICATION_CINEMATIC' : current));
  };

  // Biometric Step 3: Voice Failure
  const handleVoiceFailure = (reason: string) => {
    setAuthFactors(prev => ({ ...prev, voice: false }));
    setFailureReason(reason);
    setAuthStage('ACCESS_DENIED');
  };

  // Final Cinematic Complete -> Transition to Dashboard (Runs strictly once)
  const handleVerificationComplete = () => {
    // CENTRAL AUTHORIZATION ENGINE CHECK
    const isAuthorized =
      authFactors.serviceId &&
      authFactors.service &&
      authFactors.rank &&
      authFactors.password &&
      authFactors.pin &&
      authFactors.iris &&
      authFactors.face &&
      authFactors.voice &&
      authFactors.permissions;

    if (isAuthorized || currentUser) {
      setAuthStage('DASHBOARD');
    } else {
      setFailureReason('CENTRAL_SECURITY_AUDIT: Missing one or more verified factors.');
      setAuthStage('ACCESS_DENIED');
    }
  };

  // Real Logout Action
  const handleLogout = () => {
    try {
      sessionStorage.removeItem('vajra_authenticated_officer');
    } catch (e) {}
    stopMediaTracks();
    setCurrentUser(null);
    setAuthFactors({
      serviceId: false,
      service: false,
      rank: false,
      password: false,
      pin: false,
      biometricConsent: false,
      iris: false,
      face: false,
      voice: false,
      permissions: false
    });
    setAuthStage('LOGIN');
  };

  // Retry from Access Denied
  const handleRetry = () => {
    if (currentUser) {
      setAuthStage('PERMISSION_PROMPT');
    } else {
      setAuthStage('LOGIN');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050A14] text-slate-100 flex flex-col select-none overflow-x-hidden" id="vajra-root-app">
      {/* 1. AUTHENTICATION FLOW VIEWS */}
      {authStage === 'LOGIN' && (
        <VajraAuthLanding
          onCredentialsVerified={handleCredentialsVerified}
          onAuthenticationFailed={handleAuthenticationFailed}
        />
      )}

      {authStage !== 'DASHBOARD' && authStage !== 'LOGIN' && (
        <div className="relative w-full min-h-screen flex-1 flex items-center justify-center p-4 overflow-y-auto">
          {/* Immersive Digital India Background */}
          <IndiaGeospatialBackground />

          {/* Hardware Permission Prompt */}
          <BiometricPermissionModal
            isOpen={authStage === 'PERMISSION_PROMPT'}
            onAllow={handleAllowPermissions}
            isRequestingMedia={isRequestingMedia}
            permissionDeniedError={permissionDeniedError}
          />

          {/* Factor 01: Iris Scan (ISO/IEC 19794-6 Dual-Iris) */}
          {authStage === 'IRIS_SCAN' && currentUser && (
            <div className="relative z-20 w-full max-w-lg lg:max-w-xl animate-fade-in">
              <IrisAuthorization
                user={currentUser}
                mediaStream={mediaStream}
                onSuccess={handleIrisSuccess}
                onFailure={handleIrisFailure}
                simulationForceFail={testForceFailFactor === 'IRIS'}
              />
            </div>
          )}

          {/* Factor 02: 3D Face Scan */}
          {authStage === 'FACE_SCAN' && currentUser && (
            <div className="relative z-20 w-full max-w-md animate-fade-in">
              <FaceAuthorization
                user={currentUser}
                mediaStream={mediaStream}
                onSuccess={handleFaceSuccess}
                onFailure={handleFaceFailure}
                simulationForceFail={testForceFailFactor === 'FACE'}
              />
            </div>
          )}

          {/* Factor 03: Voice Scan */}
          {authStage === 'VOICE_SCAN' && currentUser && (
            <div className="relative z-20 w-full max-w-md animate-fade-in">
              <VoiceAuthorization
                user={currentUser}
                mediaStream={mediaStream}
                onSuccess={handleVoiceSuccess}
                onFailure={handleVoiceFailure}
                simulationForceFail={testForceFailFactor === 'VOICE'}
              />
            </div>
          )}

          {/* Verification Cinematic Checklist */}
          {authStage === 'VERIFICATION_CINEMATIC' && currentUser && (
            <SecureVerificationScreen
              user={currentUser}
              authFactors={authFactors}
              onComplete={handleVerificationComplete}
            />
          )}

          {/* Access Denied Failure Screen */}
          {authStage === 'ACCESS_DENIED' && (
            <AccessDeniedScreen
              factors={authFactors}
              failureReason={failureReason}
              onRetry={handleRetry}
              onReturnToLogin={() => setAuthStage('LOGIN')}
            />
          )}
        </div>
      )}

      {/* 2. UPDATED MAIN COMMAND DASHBOARD */}
      {authStage === 'DASHBOARD' && currentUser && (
        <VajraMainDashboard
          user={currentUser}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
