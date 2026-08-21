import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Zap, Flame, DollarSign, Activity, TrendingDown } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const MarineFuelView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Marine Fuel Intelligence" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              Tool #97
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Flame className="w-7 h-7 text-amber-400" />
              Marine Fuel Bunkering Price Tracker & Alternative Fuel Analytics
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Global bunker prices (VLSFO, MGO, HSFO, LNG, Green Methanol, Ammonia) across major bunkering hubs with ISO 8217 quality testing records.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <span className="text-slate-400 block">VLSFO (Singapore)</span>
          <span className="text-lg font-black font-mono text-amber-400">$618 / MT</span>
        </div>
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <span className="text-slate-400 block">MGO (Rotterdam)</span>
          <span className="text-lg font-black font-mono text-amber-300">$785 / MT</span>
        </div>
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <span className="text-slate-400 block">LNG Bunkering (Fujairah)</span>
          <span className="text-lg font-black font-mono text-cyan-400">$720 / MT</span>
        </div>
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
          <span className="text-slate-400 block">Green Methanol</span>
          <span className="text-lg font-black font-mono text-emerald-400">$940 / MT</span>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
