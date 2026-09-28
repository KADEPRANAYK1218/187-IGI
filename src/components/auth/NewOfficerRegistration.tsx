import React, { useState, useId } from 'react';
import { Shield, Check, AlertCircle, Eye, EyeOff, KeyRound, Lock, UserCheck, Sparkles, RefreshCw, Edit3 } from 'lucide-react';
import { ServiceType, UserAccount } from '../../types';
import { SERVICES_DATA, SERVICE_PREFIX_MAP } from '../../data/services';
import { getRanksForService } from '../../data/ranks';
import { COMMAND_ROLES } from '../../data/roles';
import { generateSyntheticServiceId, validateServiceIdFormat } from '../../lib/auth/id-generator';
import { getStoredOfficers, saveOfficer } from '../../data/users';

interface NewOfficerRegistrationProps {
  onRegistrationSuccess: (registeredServiceId: string) => void;
}

export const NewOfficerRegistration: React.FC<NewOfficerRegistrationProps> = ({
  onRegistrationSuccess
}) => {
  const [selectedService, setSelectedService] = useState<ServiceType>('Indian Army');
  const [selectedRank, setSelectedRank] = useState<string>('Lieutenant');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('role-geospatial-commander');
  const [fullName, setFullName] = useState<string>('');
  const [sector, setSector] = useState<string>('Northern Command Sector');

  // Generated Synthetic Service ID
  const [generatedServiceId, setGeneratedServiceId] = useState<string>(() => {
    const existing = getStoredOfficers().map(o => o.serviceId);
    return generateSyntheticServiceId('Indian Army', existing);
  });

  // Manual Custom ID Option
  const [useManualId, setUseManualId] = useState<boolean>(false);
  const [manualServiceId, setManualServiceId] = useState<string>('');
  const [finalAssignedId, setFinalAssignedId] = useState<string>('');

  // Password & PIN
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [securityPin, setSecurityPin] = useState<string>('');
  const [biometricConsent, setBiometricConsent] = useState<boolean>(false);

  // Status & Error States
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const availableRanks = getRanksForService(selectedService);

  // Handle Service Change
  const handleServiceChange = (service: ServiceType) => {
    setSelectedService(service);
    const ranks = getRanksForService(service);
    if (ranks.length > 0) {
      setSelectedRank(ranks[0].name);
    }
    const existing = getStoredOfficers().map(o => o.serviceId);
    setGeneratedServiceId(generateSyntheticServiceId(service, existing));
    
    // Auto-update prefix for manual ID if currently active
    const prefix = SERVICE_PREFIX_MAP[service] || 'IC';
    setManualServiceId(`${prefix}-`);
  };

  const handleRegenerateId = () => {
    const existing = getStoredOfficers().map(o => o.serviceId);
    setGeneratedServiceId(generateSyntheticServiceId(selectedService, existing));
  };

  // Password validation criteria
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasSpecial;
  const isPasswordMatching = password === confirmPassword && confirmPassword.length > 0;
  const isPinValid = /^\d{6}$/.test(securityPin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Full Name of Officer is required.');
      return;
    }

    // Determine active Service ID (Manual or Synthetic)
    let effectiveServiceId = generatedServiceId;
    if (useManualId) {
      if (!manualServiceId.trim()) {
        setErrorMsg('Please enter your custom Manual Service ID or uncheck manual mode.');
        return;
      }
      effectiveServiceId = manualServiceId.trim().toUpperCase();
      const validation = validateServiceIdFormat(effectiveServiceId, selectedService);
      if (!validation.valid) {
        setErrorMsg(validation.error || 'Invalid Manual Service ID format. Must follow PREFIX-XXXXXX (e.g. IC-7K42P9).');
        return;
      }
    }

    // Check duplicate Service ID in storage
    const existingOfficers = getStoredOfficers();
    if (existingOfficers.some(o => o.serviceId.toUpperCase() === effectiveServiceId.toUpperCase())) {
      setErrorMsg(`Service ID ${effectiveServiceId} is already registered. Please choose a different ID.`);
      return;
    }

    if (!isPasswordValid) {
      setErrorMsg('Password must be at least 8 characters with 1 uppercase letter and 1 special character.');
      return;
    }

    if (!isPasswordMatching) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!isPinValid) {
      setErrorMsg('Security PIN must be exactly 6 numeric digits.');
      return;
    }

    if (!biometricConsent) {
      setErrorMsg('Biometric consent is mandatory for military command echelon enrollment.');
      return;
    }

    const selectedRole = COMMAND_ROLES.find(r => r.id === selectedRoleId) || COMMAND_ROLES[0];

    const newOfficer: UserAccount = {
      id: `usr-${Date.now().toString(36)}`,
      serviceId: effectiveServiceId,
      fullName: fullName.trim(),
      service: selectedService,
      rank: selectedRank,
      roleId: selectedRole.id,
      roleTitle: selectedRole.title,
      passwordHash: password, // Stored for frontend simulation verification
      securityPin,
      biometricConsent: true,
      clearanceLevel: selectedRole.clearanceLevel,
      sector,
      registeredAt: new Date().toISOString(),
      isActive: true
    };

    const saveResult = saveOfficer(newOfficer);
    if (!saveResult.success) {
      setErrorMsg(saveResult.error || 'Registration failed.');
      return;
    }

    setFinalAssignedId(effectiveServiceId);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-6 space-y-4 animate-fade-in" id="registration-success-view">
        <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <UserCheck className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-display font-bold text-white tracking-wide">
          REGISTRATION COMPLETE
        </h3>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-left max-w-sm mx-auto space-y-2">
          <div className="text-[11px] font-tech text-slate-400">ASSIGNED SERVICE ID:</div>
          <div className="text-lg font-mono-code font-bold text-cyan-300 bg-cyan-950/40 p-2 rounded border border-cyan-500/40 text-center tracking-widest">
            {finalAssignedId || generatedServiceId}
          </div>
          <div className="text-xs text-slate-300 pt-1">
            <strong>OFFICER:</strong> {selectedRank} {fullName} ({selectedService})
          </div>
          <div className="text-xs text-slate-400">
            <strong>SECURITY PIN:</strong> •••••• (6-digit registered)
          </div>
        </div>

        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          Your identity record has been indexed into the central VAJRA directory. Please proceed to login with your Service ID, Password, PIN, and complete multi-factor biometric authorization.
        </p>

        <button
          type="button"
          onClick={() => onRegistrationSuccess(finalAssignedId || generatedServiceId)}
          className="w-full py-3 px-6 rounded-xl text-xs font-bold tracking-widest text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
          id="continue-to-login-btn"
        >
          <span>CONTINUE TO EXISTING OFFICER LOGIN</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="new-officer-registration-form">
      {errorMsg && (
        <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 1. SELECT SERVICE */}
      <div>
        <label className="block text-xs font-tech text-cyan-300 mb-1.5 uppercase">
          1. Select Armed Forces Service
        </label>
        <div className="grid grid-cols-3 gap-2">
          {SERVICES_DATA.map(s => {
            const isSelected = selectedService === s.type;
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
                <span className="text-[9px] text-amber-400/90 font-mono-code">[{s.prefix}-]</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. OFFICER NAME & RANK */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-tech text-slate-300 mb-1">
            Officer Full Name
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="e.g. Vikramaditya Rawat"
            className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            id="reg-fullname-input"
          />
        </div>

        <div>
          <label className="block text-xs font-tech text-slate-300 mb-1">
            Select Echelon Rank
          </label>
          <select
            value={selectedRank}
            onChange={e => setSelectedRank(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            id="reg-rank-select"
          >
            {availableRanks.map(r => (
              <option key={r.id} value={r.name} className="bg-slate-900 text-white">
                {r.name} ({r.abbreviation})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. COMMAND ROLE & SECTOR */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-tech text-slate-300 mb-1">
            Assigned Command Role
          </label>
          <select
            value={selectedRoleId}
            onChange={e => setSelectedRoleId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            id="reg-role-select"
          >
            {COMMAND_ROLES.map(role => (
              <option key={role.id} value={role.id} className="bg-slate-900 text-white">
                {role.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-tech text-slate-300 mb-1">
            Operational Sector
          </label>
          <input
            type="text"
            value={sector}
            onChange={e => setSector(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            id="reg-sector-input"
          />
        </div>
      </div>

      {/* 4. SERVICE ID (SYNTHETIC + MANUAL OPTION) */}
      <div className="space-y-2">
        {/* Synthetic ID Display */}
        <div className={`p-3 rounded-lg border transition-all ${
          !useManualId
            ? 'bg-slate-950/90 border-cyan-500/40 shadow-sm shadow-cyan-500/10'
            : 'bg-slate-950/40 border-slate-800 opacity-80'
        } flex items-center justify-between`}>
          <div>
            <div className="text-[10px] font-tech text-slate-400">GENERATED SYNTHETIC SERVICE ID:</div>
            <div className="text-sm font-mono-code font-bold text-cyan-300 tracking-wider">
              {generatedServiceId}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!useManualId && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-tech font-bold">
                ACTIVE
              </span>
            )}
            <button
              type="button"
              onClick={handleRegenerateId}
              className="p-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs flex items-center gap-1 transition cursor-pointer"
              title="Regenerate unique ID"
              id="regenerate-id-btn"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-[10px]">NEW ID</span>
            </button>
          </div>
        </div>

        {/* Manual ID Option Box */}
        <div className={`p-3 rounded-lg border transition-all ${
          useManualId
            ? 'bg-slate-950/95 border-amber-500/50 shadow-md shadow-amber-500/15'
            : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
        }`}>
          <div className="flex items-center justify-between">
            <label
              htmlFor="toggle-manual-id"
              className="flex items-center gap-2 text-xs font-tech text-slate-300 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                id="toggle-manual-id"
                checked={useManualId}
                onChange={e => {
                  const checked = e.target.checked;
                  setUseManualId(checked);
                  if (checked && (!manualServiceId || !manualServiceId.startsWith(SERVICE_PREFIX_MAP[selectedService]))) {
                    setManualServiceId(`${SERVICE_PREFIX_MAP[selectedService]}-`);
                  }
                }}
                className="rounded border-slate-700 text-amber-500 focus:ring-amber-400 cursor-pointer"
              />
              <span className={`font-bold flex items-center gap-1.5 ${useManualId ? 'text-amber-300' : 'text-slate-400'}`}>
                <Edit3 className="w-3.5 h-3.5" />
                ENTER MANUAL / CUSTOM SERVICE ID
              </span>
            </label>
            {useManualId && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-tech font-bold">
                MANUAL MODE
              </span>
            )}
          </div>

          {useManualId && (
            <div className="space-y-1.5 animate-fade-in pt-2.5 mt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={manualServiceId}
                  onChange={e => setManualServiceId(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ''))}
                  placeholder={`e.g. ${SERVICE_PREFIX_MAP[selectedService]}-8X9Y2Z`}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-amber-500/40 text-xs font-mono-code font-bold tracking-wider text-amber-200 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  id="manual-serviceid-input"
                />
                <button
                  type="button"
                  onClick={() => setUseManualId(false)}
                  className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-tech transition whitespace-nowrap cursor-pointer"
                  title="Switch back to generated synthetic ID"
                >
                  Use Auto
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400">
                <span>Format: {SERVICE_PREFIX_MAP[selectedService]}-XXXXXX (6 alphanumeric chars)</span>
                {manualServiceId && validateServiceIdFormat(manualServiceId, selectedService).valid ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    ✓ Valid ID
                  </span>
                ) : (
                  <span className="text-amber-400/90">
                    Required prefix: [{SERVICE_PREFIX_MAP[selectedService]}-]
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. PASSWORD & CONFIRMATION */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-tech text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 pr-8 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                id="reg-password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-tech text-slate-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              id="reg-confirmpass-input"
            />
          </div>
        </div>

        {/* Live Password Requirement Checklist */}
        <div className="flex flex-wrap gap-2 text-[10px] font-tech text-slate-400">
          <span className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-400' : 'text-slate-500'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            Min 8 Chars
          </span>
          <span className={`flex items-center gap-1 ${hasUppercase ? 'text-emerald-400' : 'text-slate-500'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            1 Uppercase
          </span>
          <span className={`flex items-center gap-1 ${hasSpecial ? 'text-emerald-400' : 'text-slate-500'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            1 Special Char
          </span>
          <span className={`flex items-center gap-1 ${isPasswordMatching ? 'text-emerald-400' : 'text-slate-500'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            Passwords Match
          </span>
        </div>
      </div>

      {/* 6. SECURITY PIN */}
      <div>
        <label className="block text-xs font-tech text-slate-300 mb-1">
          6-Digit Numeric Security PIN (Masked)
        </label>
        <input
          type="password"
          maxLength={6}
          required
          value={securityPin}
          onChange={e => setSecurityPin(e.target.value.replace(/\D/g, ''))}
          placeholder="••••••"
          className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-sm font-mono-code text-center tracking-widest text-cyan-300 focus:outline-none focus:border-cyan-400"
          id="reg-pin-input"
        />
        <div className="text-[10px] text-slate-500 mt-1">
          Exactly 6 numeric digits required for secondary cryptographic handshake.
        </div>
      </div>

      {/* 7. BIOMETRIC CONSENT */}
      <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 flex items-start gap-2.5">
        <input
          type="checkbox"
          id="biometric-consent-checkbox"
          checked={biometricConsent}
          onChange={e => setBiometricConsent(e.target.checked)}
          className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-cyan-400"
        />
        <label htmlFor="biometric-consent-checkbox" className="text-[11px] text-slate-300 leading-tight select-none">
          I consent to multi-factor optical iris matching, 3D facial depth vectoring, and acoustic passphrase verification upon each login session.
        </label>
      </div>

      {/* Submit Registration Button */}
      <button
        type="submit"
        className="w-full py-3 px-4 rounded-xl text-xs font-bold tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
        id="submit-officer-registration-btn"
      >
        <Shield className="w-4 h-4 text-slate-950" />
        <span>COMPLETE REGISTRATION & REGISTER IDENTIFIER</span>
      </button>
    </form>
  );
};
