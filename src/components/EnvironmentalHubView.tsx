import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Leaf, ShieldCheck, Activity, BarChart2, Globe } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const EnvironmentalHubView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Marine Environmental Hub" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Tool #90
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Leaf className="w-7 h-7 text-emerald-400" />
              Marine Environmental & MARPOL Annex I-VI Dashboard
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Real-time MARPOL Annex VI SEEMP III tracking, garbage record books, oil discharge monitoring systems (ODME), and biodiversity impact scoring.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-emerald-400 uppercase">MARPOL Annex VI SEEMP III</span>
          <h3 className="font-bold text-sm text-white">CII Fleet Rating: Grade B (0.88 Rating)</h3>
          <p className="text-xs text-slate-400">On track to maintain Grade A/B compliant status through 2028.</p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-sky-400 uppercase">ODME Discharge Log</span>
          <h3 className="font-bold text-sm text-white">12.4 L / Nautical Mile Discharge</h3>
          <p className="text-xs text-slate-400">Complies with MARPOL Annex I 30 L/NM maximum limit outside ECA zones.</p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-teal-400 uppercase">Underwater Radiated Noise (URN)</span>
          <h3 className="font-bold text-sm text-white">Quiet Vessel Class Notation</h3>
          <p className="text-xs text-slate-400">Low-frequency propeller tip vortex cavitation noise reduced by 4.2 dB.</p>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
