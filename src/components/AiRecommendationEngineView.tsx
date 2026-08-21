import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Sparkles, BookOpen, Briefcase, Award, ArrowRight } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const AiRecommendationEngineView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const recommendations = [
    { type: 'Course', title: 'Advanced CFD Mesh Generation with OpenFOAM & SnappyHexMesh', match: '98% Match', tag: 'Hydrodynamics' },
    { type: 'Research Paper', title: 'AI-Driven Hull Form Optimization using Generative Adversarial Networks (GANs)', match: '95% Match', tag: 'Ship Design' },
    { type: 'Job Opening', title: 'Senior Hydrodynamicist at DNV Maritime Research Lab (Oslo)', match: '92% Match', tag: 'Career' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="AI Personalized Recommendation Engine" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Tool #64
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-emerald-400" />
              AI Adaptive Maritime Learning & Career Feed
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Tailored recommendations for naval architecture courses, research papers, job openings, and AI tools based on your active usage profile.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{rec.type}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-bold border border-emerald-500/20">
                  {rec.match}
                </span>
              </div>
              <h3 className="font-bold text-sm text-white leading-snug">{rec.title}</h3>
            </div>

            <button className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl border border-slate-800 transition flex items-center justify-center gap-2">
              <span>Explore Recommendation</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
