import React, { useState } from 'react';
import { Shield, Key, UserPlus, Lock } from 'lucide-react';
import { VajraLogo } from '../branding/VajraLogo';
import { ExistingOfficerLogin } from './ExistingOfficerLogin';
import { NewOfficerRegistration } from './NewOfficerRegistration';
import { UserAccount } from '../../types';

interface LoginCardProps {
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

export const LoginCard: React.FC<LoginCardProps> = ({
  onCredentialsVerified,
  onAuthenticationFailed
}) => {
  const [activeTab, setActiveTab] = useState<'EXISTING' | 'REGISTER'>('EXISTING');
  const [prefilledServiceId, setPrefilledServiceId] = useState<string>('');

  const handleRegistrationSuccess = (newServiceId: string) => {
    setPrefilledServiceId(newServiceId);
    setActiveTab('EXISTING');
  };

  return (
    <div
      className="vajra-panel-elevated relative z-10 w-full rounded-2xl p-4 sm:p-6 md:p-5 lg:p-6 border border-cyan-500/35 bg-slate-950/90 backdrop-blur-xl shadow-2xl shadow-cyan-950/60 transition-all duration-300"
      id="vajra-auth-card"
    >
      {/* Top Atmospheric Indian Glow Strip */}
      <div className="absolute -top-px left-8 right-8 h-1 bg-gradient-to-r from-amber-500 via-white to-emerald-500 rounded-full shadow-lg" />

      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
        <VajraLogo size="lg" showSubtitle={true} animated={false} />

        <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[10px] sm:text-[11px] font-tech text-cyan-300 tracking-wider shadow-sm">
          <Lock className="w-3 h-3 text-amber-400" />
          <span>AUTHORIZED PERSONNEL ACCESS ONLY</span>
        </div>
      </div>

      {/* Tabs: EXISTING OFFICER / NEW REGISTRATION */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-950/80 border border-cyan-500/20 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('EXISTING')}
          className={`py-2.5 px-4 rounded-lg text-xs font-tech font-bold tracking-wider transition flex items-center justify-center gap-2 ${
            activeTab === 'EXISTING'
              ? 'bg-gradient-to-r from-cyan-600 to-indigo-700 text-white shadow-md shadow-cyan-500/25 border border-cyan-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
          id="tab-existing-officer"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>EXISTING OFFICER</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('REGISTER')}
          className={`py-2.5 px-4 rounded-lg text-xs font-tech font-bold tracking-wider transition flex items-center justify-center gap-2 ${
            activeTab === 'REGISTER'
              ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-md shadow-amber-500/25 border border-amber-400/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
          id="tab-new-registration"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>NEW REGISTRATION</span>
        </button>
      </div>

      {/* Form View Body */}
      {activeTab === 'EXISTING' ? (
        <ExistingOfficerLogin
          initialServiceId={prefilledServiceId}
          onCredentialsVerified={onCredentialsVerified}
          onAuthenticationFailed={onAuthenticationFailed}
        />
      ) : (
        <NewOfficerRegistration onRegistrationSuccess={handleRegistrationSuccess} />
      )}

    </div>
  );
};
