import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType, ViewMode } from '../types';
import { Layers, Ship, Anchor, Calculator, BookOpen, Award, Users, Search, Smartphone, Shield, Globe, Cpu, ChevronRight } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onSelectView?: (view: ViewMode) => void;
}

export const MaritimeSuperAppView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing, onSelectView }) => {
  const pillars = [
    { name: 'Naval Arch & Engineering Suite', desc: 'Hydrodynamics, Stability, CFD, Structural FEA, Propeller Design', icon: Calculator, view: 'naval_arch_lab' as ViewMode },
    { name: 'AI Research & Digital Library', desc: '50,000+ IMO Books, Peer-Reviewed Papers & AI Search Engine', icon: BookOpen, view: 'digital_library' as ViewMode },
    { name: 'Interactive Ship & Equipment DB', desc: '120,000+ Ships, Engines, Machinery Specs & Class Rules', icon: Ship, view: 'interactive_ship_db' as ViewMode },
    { name: 'Career, Exams & Education', desc: 'STCW Officer Mock Tests, University Rankings & Job Portal', icon: Award, view: 'ai_exam_prep' as ViewMode },
    { name: 'Simulators & AI Review', desc: 'Browser 6-DOF Bridge Simulator, Automated Drawing Compliance', icon: Cpu, view: 'marine_simulators' as ViewMode },
    { name: 'Enterprise, Fleet & Compliance', desc: 'Emissions EU ETS/CII, Vessel AIS Tracking & Company Intelligence', icon: Shield, view: 'company_intelligence' as ViewMode },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="AI Maritime Super App" />

      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
          Tool #85 • All-In-One Unified Ecosystem
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          The Global <span className="text-cyan-400">AI Maritime Super App</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Unifying naval architecture engineering, maritime education, vessel intelligence, class compliance, career networking, and AI automation into one seamless operating system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((p, idx) => {
          const IconComponent = p.icon;
          return (
            <div
              key={idx}
              onClick={() => onSelectView && onSelectView(p.view)}
              className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">{p.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>

              <div className="flex items-center text-xs font-bold text-cyan-400 gap-1 pt-2 border-t border-slate-800">
                Launch Module <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
