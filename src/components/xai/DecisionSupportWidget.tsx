import React, { useState } from 'react';
import { BrainCircuit, CheckCircle2, ShieldAlert, Sparkles, UserCheck, AlertTriangle, Layers, ArrowRight } from 'lucide-react';
import { DecisionSupportItem, UserAccount } from '../../types';
import { DECISION_SUPPORT_ITEMS } from '../../data/events';

interface DecisionSupportWidgetProps {
  user: UserAccount;
  onClose?: () => void;
  onConfirmDecision?: (item: DecisionSupportItem) => void;
}

export const DecisionSupportWidget: React.FC<DecisionSupportWidgetProps> = ({
  user,
  onClose,
  onConfirmDecision
}) => {
  const [items, setItems] = useState<DecisionSupportItem[]>(DECISION_SUPPORT_ITEMS);
  const [selectedId, setSelectedId] = useState<string>(DECISION_SUPPORT_ITEMS[0].id);

  const activeItem = items.find(i => i.id === selectedId) || items[0];

  const handleSignOff = (status: 'CONFIRMED' | 'OVERRIDDEN' | 'ESCALATED') => {
    const updated = items.map(item => {
      if (item.id === activeItem.id) {
        return {
          ...item,
          humanReviewStatus: status,
          reviewedBy: `${user.rank} ${user.fullName} (${user.serviceId})`,
          reviewTimestamp: new Date().toISOString()
        };
      }
      return item;
    });

    setItems(updated);
    if (onConfirmDecision) {
      const match = updated.find(i => i.id === activeItem.id);
      if (match) onConfirmDecision(match);
    }
  };

  return (
    <div className="vajra-panel-elevated rounded-2xl p-5 border border-cyan-500/35 max-w-4xl w-full backdrop-blur-2xl shadow-2xl animate-fade-in" id="decision-support-panel">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-500/50 text-indigo-400">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg tracking-wide">
              XAI EXPLAINABLE DECISION SUPPORT
            </h3>
            <p className="text-xs font-tech text-cyan-300/70">
              TRANSPARENT EVIDENCE ENGINE • CONTRIBUTING FACTOR WEIGHT MATRIX • MANDATORY HUMAN REVIEW
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-tech font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            DECISION SUPPORT ONLY
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {items.map(item => {
          const isSelected = item.id === activeItem.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-tech font-bold transition flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-700 text-white border border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{item.title.split(':')[1] || item.title}</span>
              <span className="text-[10px] text-emerald-300 font-mono-code font-bold">
                [{item.confidence}% CONFIDENCE]
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Case Details Layout */}
      <div className="space-y-4">
        {/* Title & Tactical Impact */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white">{activeItem.title}</div>
            <div className="text-xs font-tech text-cyan-300">
              IMPACT LEVEL: <span className="font-bold text-amber-400">{activeItem.tacticalImpact}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-tech text-slate-400">MACHINE CONFIDENCE</div>
            <div className="text-lg font-mono-code font-bold text-emerald-400">
              {activeItem.confidence}%
            </div>
          </div>
        </div>

        {/* 1. Evidence List */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs font-tech text-cyan-300 font-bold mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>PRIMARY SENSOR & RADAR EVIDENCE LOG:</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {activeItem.evidence.map((ev, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono-code text-[11px] mt-0.5">[{idx + 1}]</span>
                <span>{ev}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Contributing Factors Weighted Breakdown */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs font-tech text-cyan-300 font-bold mb-2.5">
            EXPLAINABILITY: CONTRIBUTING FACTOR WEIGHTS
          </div>
          <div className="space-y-2">
            {activeItem.contributingFactors.map((cf, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-tech">
                  <span className="text-slate-300">{cf.factor}</span>
                  <span className="text-cyan-300 font-mono-code font-bold">{cf.weight}% WEIGHT</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                    style={{ width: `${cf.weight * 2.2}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 italic">{cf.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Recommended Response & Alternative Options */}
        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40">
          <div className="text-xs font-tech text-amber-300 font-bold mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI SYNTHESIZED PRIMARY RECOMMENDATION:</span>
          </div>
          <p className="text-xs text-slate-200 font-semibold mb-3 leading-relaxed">
            {activeItem.recommendedResponse}
          </p>

          <div className="pt-2 border-t border-indigo-900/60 text-[11px] text-slate-400 space-y-1">
            <div className="font-tech font-bold text-slate-300">ALTERNATIVE OPTIONS CONSIDERED:</div>
            {activeItem.alternativeOptions.map((opt, i) => (
              <div key={i} className="text-slate-400">{opt}</div>
            ))}
          </div>
        </div>

        {/* 4. Human Review Officer Sign-Off Status & Actions */}
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-tech text-slate-400">HUMAN REVIEW STATUS:</div>
            <div className="text-xs font-bold font-mono-code text-cyan-200">
              {activeItem.humanReviewStatus}
            </div>
            {activeItem.reviewedBy && (
              <div className="text-[10px] text-emerald-400 font-tech">
                Signed off by: {activeItem.reviewedBy} at {new Date(activeItem.reviewTimestamp || '').toLocaleTimeString()}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSignOff('OVERRIDDEN')}
              className="px-3 py-1.5 rounded-lg text-xs font-tech font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
            >
              OVERRIDE
            </button>

            <button
              type="button"
              onClick={() => handleSignOff('CONFIRMED')}
              className="px-4 py-1.5 rounded-lg text-xs font-tech font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>OFFICER SIGN-OFF & CONFIRM</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
