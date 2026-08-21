import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { LayoutDashboard, TrendingUp, Ship, DollarSign, Shield, Activity, Award } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const ExecutiveDashboardView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Executive Decision Dashboard" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              Tool #105
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <LayoutDashboard className="w-7 h-7 text-cyan-400" />
              C-Suite Executive Decision & Fleet Performance Dashboard
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            High-level executive KPIs: total fleet EBIT margin, CII carbon intensity compliance, drydock OPEX budget variance, and AI strategic recommendations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <span className="text-slate-400 block">Fleet Utilization</span>
          <span className="text-xl font-black font-mono text-emerald-400">98.4%</span>
        </div>
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <span className="text-slate-400 block">Average Fleet TCE</span>
          <span className="text-xl font-black font-mono text-cyan-300">$28,450 / day</span>
        </div>
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <span className="text-slate-400 block">CII Rating Compliance</span>
          <span className="text-xl font-black font-mono text-emerald-300">Grade A (92% Fleet)</span>
        </div>
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <span className="text-slate-400 block">OPEX Budget Variance</span>
          <span className="text-xl font-black font-mono text-amber-400">-1.8% Under Budget</span>
        </div>
      </div>

      <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" /> AI Strategic Recommendations
        </h3>
        <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
          <li>Accelerate rotor sail retrofit on 2 Capesize bulkers to offset projected EU ETS carbon tax increases in Q4.</li>
          <li>Re-negotiate VLSFO supply contracts in Singapore to lock in current $618/MT rate ahead of seasonal demand surge.</li>
          <li>Schedule M/T Ocean Star drydock in Zhoushan Shipyard (saving $140,000 vs Dubai dockyards).</li>
        </ul>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
