import React, { useState } from 'react';
import { Brain, Database, Cog, Cpu, BarChart3, Lightbulb, ArrowRight, CheckCircle2, ChevronRight, X } from 'lucide-react';

export const AiDecisionSupportWidget: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const pipelineSteps = [
    {
      id: 1,
      name: 'Collect Data',
      sub: '(All Sources)',
      icon: Database,
      details: 'Aggregates multi-spectral sensor feeds, satellite imagery, radar Doppler signatures, and forward telemetry logs.'
    },
    {
      id: 2,
      name: 'Process',
      sub: '(Cleaning & Fusion)',
      icon: Cog,
      details: 'Noise attenuation, coordinate normalization (WGS84 to MGRS), and multi-domain sensor fusion across tri-service channels.'
    },
    {
      id: 3,
      name: 'Analyze',
      sub: '(AI/ML Models)',
      icon: Cpu,
      details: 'Deep neural anomaly detection, trajectory prediction, electronic warfare signature matching, and biometric pattern correlation.'
    },
    {
      id: 4,
      name: 'Recommend',
      sub: '(Threat & Impact)',
      icon: BarChart3,
      details: 'Dynamic threat score formulation, collateral risk assessment, and autonomous rule-of-engagement evaluation.'
    },
    {
      id: 5,
      name: 'Take Action',
      sub: '(Suggestions)',
      icon: Lightbulb,
      details: 'Command directives, QRT scrambled vectors, automated radar locking, and encrypted diplomatic/defense advisories.'
    }
  ];

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-cyan-500/25 p-4 sm:p-5 flex flex-col justify-between backdrop-blur-xl shadow-xl h-[165px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Brain className="w-4 h-4 text-cyan-300" />
          </div>
          <h3 className="text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
            AI DECISION SUPPORT
          </h3>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="text-xs font-mono-code text-cyan-400 hover:text-cyan-200 flex items-center gap-1 transition cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5-Step Pipeline Flow */}
      <div className="flex items-center justify-between gap-1 sm:gap-2 px-1 py-1">
        {pipelineSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <div
                onClick={() => setSelectedStep(step.id)}
                className="flex flex-col items-center text-center group cursor-pointer flex-1 min-w-0"
              >
                {/* Step Circle Icon */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cyan-950/80 border border-cyan-500/40 group-hover:border-cyan-400 group-hover:bg-cyan-900/60 flex items-center justify-center text-cyan-300 transition-all shadow-md group-hover:scale-110 mb-1.5">
                  <Icon className="w-4 h-4 text-cyan-400 group-hover:text-white" />
                </div>
                {/* Step Title */}
                <span className="text-[10px] sm:text-[11px] font-tech font-bold text-slate-200 truncate w-full group-hover:text-cyan-300">
                  {step.name}
                </span>
                {/* Subtitle */}
                <span className="text-[8.5px] sm:text-[9.5px] font-mono-code text-slate-400 truncate w-full">
                  {step.sub}
                </span>
              </div>

              {/* Arrow Connector between steps */}
              {idx < pipelineSteps.length - 1 && (
                <div className="text-cyan-500/60 shrink-0 pb-4">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Decision Support Details Modal */}
      {(showModal || selectedStep !== null) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedStep(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-cyan-400" />
              <div>
                <h3 className="text-lg font-tech font-bold text-white tracking-wide">
                  AI DECISION SUPPORT PIPELINE
                </h3>
                <p className="text-xs font-mono-code text-cyan-300">
                  Autonomous Tactical Evaluation & Decision Synthesis Engine
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {pipelineSteps.map(step => (
                <div
                  key={step.id}
                  className={`p-3 rounded-xl border transition ${
                    selectedStep === step.id
                      ? 'bg-cyan-950/60 border-cyan-400'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 font-tech font-bold text-sm text-cyan-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>
                      Phase 0{step.id}: {step.name} {step.sub}
                    </span>
                  </div>
                  <p className="text-xs font-mono-code text-slate-300 mt-1 pl-6">
                    {step.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
