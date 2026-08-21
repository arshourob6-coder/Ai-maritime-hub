import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Sparkles, Cpu, Radio, Shield, Anchor, Bot, Wind } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const MaritimeInnovationHubView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const innovations = [
    { title: 'Autonomous Unmanned Surface Vessels (MASS Level 4)', desc: 'AI situational awareness, COLREGs automated collision avoidance, and remote land-based bridge control.', tech: 'Robotics & AI' },
    { title: 'Green Methanol & Ammonia Fuel Cell Propulsion', desc: 'Zero-emission Solid Oxide Fuel Cell (SOFC) marine auxiliary power units.', tech: 'Clean Energy' },
    { title: 'Suction Sail & Rigid Rotor Wind-Assisted Propulsion', desc: 'Boundary layer suction sails providing up to 25% fuel savings on trans-oceanic routes.', tech: 'Aerodynamics' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime Innovation Hub" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Tool #74
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-emerald-400" />
              Maritime DeepTech & Future Shipping Innovation Hub
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Showcasing breakthrough maritime technologies: autonomous ships, rotor sails, AI navigation, marine robotics, and green hydrogen synthesis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {innovations.map((item, idx) => (
          <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-bold border border-emerald-500/20">
                {item.tech}
              </span>
              <h3 className="font-bold text-sm text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>

            <button
              onClick={() => onOpenPricing && onOpenPricing('professional')}
              className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-emerald-300 font-bold text-xs rounded-xl border border-slate-800 transition"
            >
              Explore Tech Brief
            </button>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
