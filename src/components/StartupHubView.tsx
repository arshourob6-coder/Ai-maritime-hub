import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Rocket, DollarSign, Award, Building, ExternalLink, Sparkles } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const StartupHubView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const startups = [
    { name: 'HydroSail Tech', focus: 'Wind-Assisted Rigid Rotor Sails', funding: '$2.4M Seed', stage: 'Series A' },
    { name: 'OceanAI Autonomy', focus: 'USV Swarm Navigation Software', funding: '$5.0M Grant', stage: 'Early Stage' },
    { name: 'BioFuel Marine', focus: 'Algae-based Zero Carbon MGO Fuel', funding: '$12M Series A', stage: 'Growth' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime Startup & VC Hub" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              Tool #41
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Rocket className="w-7 h-7 text-rose-400" />
              Maritime Startup Ecosystem & VC Portal
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Connect maritime tech startups with maritime VC funds, incubators, innovation grant programs, and pitch competitions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {startups.map((s) => (
          <div key={s.name} className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-3">
            <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-full border border-rose-500/30">
              {s.stage}
            </span>
            <h3 className="text-lg font-black text-white">{s.name}</h3>
            <p className="text-xs text-slate-300">{s.focus}</p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-400">
              <span>Funding Raised:</span>
              <span className="text-rose-400 font-bold">{s.funding}</span>
            </div>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
