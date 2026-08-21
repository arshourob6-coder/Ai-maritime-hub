import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Users, Star, ShieldCheck, Calendar, DollarSign } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const ConsultancyMarketplaceView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const consultants = [
    { name: 'Dr. Aris Thorne, CEng CMarEng', role: 'Principal Hydrodynamicist & CFD Specialist', exp: '22 Years Exp (Ex-MARIN)', rate: '$180 / hr', rating: '5.0 (42 reviews)' },
    { name: 'Capt. Elena Rostova', role: 'Marine Surveyor & ISM/ISPS Lead Auditor', exp: '18 Years Exp (Ex-Lloyds Register)', rate: '$150 / hr', rating: '4.9 (29 reviews)' },
    { name: 'Prof. Marcus Vance', role: 'Ship Structural Integrity & FEA Consultant', exp: '25 Years Exp (NTNU Professor)', rate: '$200 / hr', rating: '5.0 (58 reviews)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime Consultancy Marketplace" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              Tool #77
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Users className="w-7 h-7 text-indigo-400" />
              Verified Maritime Consultancy & Expert Network
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Book 1-on-1 consultations with chartered naval architects, principal marine engineers, class surveyors, and maritime lawyers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {consultants.map((c, idx) => (
          <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Chartered Expert
                </span>
                <span className="text-xs font-bold text-indigo-300">{c.rate}</span>
              </div>
              <h3 className="font-bold text-sm text-white">{c.name}</h3>
              <p className="text-xs text-indigo-300 font-semibold">{c.role}</p>
              <span className="text-[10px] text-slate-400 block">{c.exp}</span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-amber-400 flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400" /> {c.rating}</span>
              <button
                onClick={() => onOpenPricing && onOpenPricing('professional')}
                className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-bold rounded-xl border border-indigo-500/30 text-xs transition"
              >
                Schedule Session
              </button>
            </div>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
