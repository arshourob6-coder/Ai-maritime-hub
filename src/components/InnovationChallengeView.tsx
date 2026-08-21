import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Sparkles, Trophy, Rocket, Users, Award } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const InnovationChallengeView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime Innovation Challenge" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              Tool #103
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Trophy className="w-7 h-7 text-amber-400" />
              Global Maritime Hackathons & Startup Innovation Challenges
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Participate in global engineering design competitions, decarbonization hackathons, seed grant funding calls, and accelerator pitching.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-bold border border-amber-500/20">
            $100,000 Prize Pool
          </span>
          <h3 className="font-bold text-sm text-white">Global Zero-Emission Ship Propulsion Challenge 2026</h3>
          <p className="text-xs text-slate-400">Design a retrofittable wind-assisted or hydrogen fuel cell system for 50,000 DWT bulk carriers.</p>
          <button
            onClick={() => onOpenPricing && onOpenPricing('student')}
            className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl transition"
          >
            Submit Proposal
          </button>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold border border-cyan-500/20">
            Accelerator Program
          </span>
          <h3 className="font-bold text-sm text-white">Maritime AI & Autonomous Systems Incubator</h3>
          <p className="text-xs text-slate-400">3-month mentorship with naval architects, Class Society leads, and maritime venture capitalists.</p>
          <button
            onClick={() => onOpenPricing && onOpenPricing('professional')}
            className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-cyan-300 font-bold text-xs rounded-xl border border-slate-800 transition"
          >
            Apply for Cohort
          </button>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
