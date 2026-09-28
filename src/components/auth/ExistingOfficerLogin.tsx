import React, { useState, useEffect } from 'react';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { ServiceType, UserAccount } from '../../types';
import { SERVICES_DATA, SERVICE_PREFIX_MAP } from '../../data/services';
import { getRanksForService } from '../../data/ranks';
import { findOfficerByServiceId, getStoredOfficers, INITIAL_OFFICERS } from '../../data/users';
import { validateServiceIdFormat } from '../../lib/auth/id-generator';

interface ExistingOfficerLoginProps {
  initialServiceId?: string;
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

export const ExistingOfficerLogin: React.FC<ExistingOfficerLoginProps> = ({
  initialServiceId = '',
  onCredentialsVerified,
  onAuthenticationFailed
}) => {
  const [service, setService] = useState<ServiceType>('Indian Army');
  const [rank, setRank] = useState<string>('Brigadier');
  const [serviceId, setServiceId] = useState<string>(initialServiceId || 'IC-7K42P9');
  const [password, setPassword] = useState<string>('Vajra@2026');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [securityPin, setSecurityPin] = useState<string>('849201');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  // Sync when initialServiceId is provided
  useEffect(() => {
    if (initialServiceId) {
      const stored = getStoredOfficers();
      const found = stored.find(
        o => o.serviceId.toUpperCase() === initialServiceId.trim().toUpperCase()
      );
      if (found) {
        setService(found.service);
        setRank(found.rank);
        setServiceId(found.serviceId);
        setPassword(found.passwordHash || 'Vajra@2026');
        setSecurityPin(found.securityPin);
      } else {
        setServiceId(initialServiceId.trim().toUpperCase());
      }
    }
  }, [initialServiceId]);

  const availableRanks = getRanksForService(service);

  // Quick Demo Account Pre-fill
  const fillDemoAccount = (svc: ServiceType, rnk: string, id: string, pass: string, pin: string) => {
    setService(svc);
    setRank(rnk);
    setServiceId(id);
    setPassword(pass);
    setSecurityPin(pin);
    setErrorMsg(null);
  };

  // Switch service branch and dynamically update Service ID (IN-, IAF-, IC-), rank, and credentials
  const handleServiceChange = (newService: ServiceType) => {
    setService(newService);
    setErrorMsg(null);

    // Find registered officer matching this service branch from stored list or initial demo officers
    const stored = getStoredOfficers();
    const matchingOfficer = stored.find(o => o.service === newService) || 
      INITIAL_OFFICERS.find(o => o.service === newService);

    if (matchingOfficer) {
      setRank(matchingOfficer.rank);
      setServiceId(matchingOfficer.serviceId);
      setPassword(matchingOfficer.passwordHash || 'Vajra@2026');
      setSecurityPin(matchingOfficer.securityPin);
    } else {
      const ranks = getRanksForService(newService);
      if (ranks.length > 0) {
        setRank(ranks[0].name);
      }
      const prefix = SERVICE_PREFIX_MAP[newService] || 'IC';
      setServiceId(`${prefix}-`);
    }
  };

  // When rank changes, if a user exists with that specific service and rank, update credentials
  const handleRankChange = (newRank: string) => {
    setRank(newRank);
    const stored = getStoredOfficers();
    const matchingOfficer = stored.find(o => o.service === service && o.rank === newRank);
    if (matchingOfficer) {
      setServiceId(matchingOfficer.serviceId);
      setPassword(matchingOfficer.passwordHash || 'Vajra@2026');
      setSecurityPin(matchingOfficer.securityPin);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsValidating(true);

    setTimeout(() => {
      setIsValidating(false);

      // Validate Service ID format & prefix
      const idValidation = validateServiceIdFormat(serviceId, service);
      if (!idValidation.valid) {
        const factorMatrix = {
          serviceId: false,
          service: true,
          rank: true,
          password: false,
          pin: false
        };
        onAuthenticationFailed(factorMatrix, idValidation.error || 'INVALID_SERVICE_ID_FORMAT');
        return;
      }

      // Lookup officer in database
      const officer = findOfficerByServiceId(serviceId);
      if (!officer) {
        const factorMatrix = {
          serviceId: false,
          service: true,
          rank: true,
          password: false,
          pin: false
        };
        onAuthenticationFailed(factorMatrix, `UNKNOWN_SERVICE_ID: ${serviceId} not found in central registry.`);
        return;
      }

      // Check Service match
      const serviceMatch = officer.service === service;
      // Check Rank match
      const rankMatch = officer.rank === rank;
      // Check Password match
      const passwordMatch = officer.passwordHash === password;
      // Check PIN match
      const pinMatch = officer.securityPin === securityPin;

      const factors = {
        serviceId: true,
        service: serviceMatch,
        rank: rankMatch,
        password: passwordMatch,
        pin: pinMatch
      };

      if (!serviceMatch || !rankMatch || !passwordMatch || !pinMatch) {
        let failureText = 'CREDENTIAL_AUTHENTICATION_FAILURE: ';
        if (!serviceMatch) failureText += 'Service branch mismatch. ';
        if (!rankMatch) failureText += 'Echelon rank mismatch. ';
        if (!passwordMatch) failureText += 'Incorrect master credential. ';
        if (!pinMatch) failureText += 'Security PIN failure. ';

        onAuthenticationFailed(factors, failureText);
        return;
      }

      // All initial credentials match -> Proceed to Biometric sequence
      onCredentialsVerified(officer, factors);
    }, 40);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="existing-officer-login-form">
      {/* Demo Credentials Quick Switcher */}
      <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/25">
        <div className="text-[10px] font-tech text-cyan-300 mb-1.5 flex items-center justify-between">
          <span>QUICK SEED DEMO OFFICERS:</span>
          <span className="text-amber-400 font-bold">SYNTHETIC IDs</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => fillDemoAccount('Indian Army', 'Brigadier', 'IC-7K42P9', 'Vajra@2026', '849201')}
            className={`px-2 py-1 rounded text-[10px] font-tech border text-left transition truncate ${
              serviceId === 'IC-7K42P9'
                ? 'bg-amber-500/20 text-amber-200 border-amber-500/40 font-bold'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            ⚔️ Army: IC-7K42P9
          </button>
          <button
            type="button"
            onClick={() => fillDemoAccount('Indian Navy', 'Captain', 'IN-8P31XZ', 'Varuna#2026', '730194')}
            className={`px-2 py-1 rounded text-[10px] font-tech border text-left transition truncate ${
              serviceId === 'IN-8P31XZ'
                ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/40 font-bold'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            ⚓ Navy: IN-8P31XZ
          </button>
          <button
            type="button"
            onClick={() => fillDemoAccount('Indian Air Force', 'Group Captain', 'IAF-92LX5C', 'Garuda$2026', '492815')}
            className={`px-2 py-1 rounded text-[10px] font-tech border text-left transition truncate ${
              serviceId === 'IAF-92LX5C'
                ? 'bg-sky-500/20 text-sky-200 border-sky-500/40 font-bold'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            ✈️ Air: IAF-92LX5C
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 1. SERVICE SELECTION */}
      <div>
        <label className="block text-xs font-tech text-cyan-300 mb-1.5 uppercase">
          Service Branch
        </label>
        <div className="grid grid-cols-3 gap-2">
          {SERVICES_DATA.map(s => {
            const isSelected = service === s.type;
            return (
              <button
                type="button"
                key={s.type}
                onClick={() => handleServiceChange(s.type)}
                className={`py-2 px-2 rounded-lg text-xs font-tech font-bold border transition text-center flex flex-col items-center gap-1 ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{s.badgeSymbol}</span>
                <span className="text-[11px] leading-tight">{s.type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. RANK & SERVICE ID */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-tech text-slate-300 mb-1">
            Officer Echelon Rank
          </label>
          <select
            value={rank}
            onChange={e => handleRankChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            id="login-rank-select"
          >
            {availableRanks.map(r => (
              <option key={r.id} value={r.name} className="bg-slate-900 text-white">
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-tech text-slate-300 mb-1">
            SERVICE ID / OFFICER ID
          </label>
          <input
            type="text"
            required
            value={serviceId}
            onChange={e => setServiceId(e.target.value.toUpperCase())}
            placeholder={
              service === 'Indian Navy'
                ? 'e.g. IN-8P31XZ'
                : service === 'Indian Air Force'
                ? 'e.g. IAF-92LX5C'
                : 'e.g. IC-7K42P9'
            }
            className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-xs font-mono-code font-bold tracking-wider text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            id="login-serviceid-input"
          />
        </div>
      </div>

      {/* 3. PASSWORD */}
      <div>
        <label className="block text-xs font-tech text-slate-300 mb-1">
          Master Command Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 pr-10 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            id="login-password-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-200"
            id="toggle-password-btn"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 4. SECURITY PIN */}
      <div>
        <label className="block text-xs font-tech text-slate-300 mb-1">
          6-Digit Security PIN (Masked Input)
        </label>
        <input
          type="password"
          maxLength={6}
          required
          value={securityPin}
          onChange={e => setSecurityPin(e.target.value.replace(/\D/g, ''))}
          placeholder="••••••"
          className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-sm font-mono-code text-center tracking-widest text-cyan-300 focus:outline-none focus:border-cyan-400"
          id="login-pin-input"
        />
      </div>

      {/* Mandatory Multi-Factor Disclaimer */}
      <div className="text-[11px] text-slate-400 flex items-center gap-2 p-2 rounded bg-slate-900/40 border border-slate-800">
        <KeyRound className="w-4 h-4 text-cyan-400 flex-shrink-0" />
        <span>Submitting credentials initiates mandatory Iris, 3D Face, and Voice biometrics.</span>
      </div>

      {/* Submit Login Button */}
      <button
        type="submit"
        disabled={isValidating}
        className="w-full py-3 px-6 rounded-xl text-xs font-bold tracking-widest text-slate-950 bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
        id="login-submit-btn"
      >
        {isValidating ? (
          <>
            <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            <span>VALIDATING CREDENTIALS...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>VERIFY CREDENTIALS & INITIATE BIOMETRICS</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </>
        )}
      </button>
    </form>
  );
};
