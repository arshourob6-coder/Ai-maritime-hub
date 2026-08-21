import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Bot, Radio, Navigation, ShieldCheck, Activity } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const AutonomousShippingView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Autonomous Shipping Lab" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              Tool #91
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Bot className="w-7 h-7 text-cyan-400" />
              Autonomous Shipping Lab & COLREGs AI Navigation Engine
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Simulate MASS (Maritime Autonomous Surface Ships) degrees 1-4, LiDAR/Radar sensor fusion, automated COLREGs rule 13/14/15 evasive maneuvers.
          </p>
        </div>
      </div>

      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-cyan-400 uppercase">COLREGs Rule 15: Crossing Situation Simulation</span>
          <span className="text-xs font-mono text-emerald-400">Autonomous Level 4 Active</span>
        </div>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-300">
            <span>Target Vessel Alpha (Bearing 045° Starboard)</span>
            <span className="font-mono text-rose-400 font-bold">CPA: 0.3 NM | TCPA: 4.2 mins</span>
          </div>
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-300">
            <strong>AI Evasive Action Executed:</strong> Altered course 25° Starboard (New Heading: 285°) to pass safely astern in full compliance with COLREG Rule 15.
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
