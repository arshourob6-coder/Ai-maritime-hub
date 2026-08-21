import React from 'react';
import { PlanType } from '../types';
import { Lock, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';

interface SubscriptionWallProps {
  moduleName: string;
  requiredPlan: PlanType;
  currentPlan: PlanType;
  features?: string[];
  onUpgrade: (plan: PlanType) => void;
  previewImage?: string;
}

export const SubscriptionWall: React.FC<SubscriptionWallProps> = ({
  moduleName,
  requiredPlan,
  currentPlan,
  features = [
    '3D Interactive Visualization Engine & CAD Mesh Export',
    'Physics-guided AI Calculation Model (Holtrop / DNV / ABS Compliant)',
    'Automated Technical PDF Report & DXF/STEP Drawing Export',
    'Real-time Cloud Simulation & Multi-Core CFD Solver Integration',
  ],
  onUpgrade,
}) => {
  return (
    <div className="max-w-4xl mx-auto my-8 p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6 text-center md:text-left">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
          <Lock className="w-4 h-4 text-amber-400" />
          <span>{requiredPlan.toUpperCase()} TIER REQUIRED</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Unlock {moduleName}
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl">
            This professional engineering module is locked for your current{' '}
            <span className="text-slate-200 font-bold uppercase">{currentPlan}</span> plan. Upgrade to the{' '}
            <span className="text-sky-400 font-bold uppercase">{requiredPlan}</span> plan to gain unlimited instant access to calculations, 3D simulations, and export tools.
          </p>
        </div>

        {/* Feature Preview Box */}
        <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800/80 space-y-4">
          <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Included in {requiredPlan.toUpperCase()} Access:</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-200">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-semibold">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            onClick={() => onUpgrade(requiredPlan)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-slate-950 font-black text-sm hover:brightness-110 transition shadow-xl shadow-sky-500/20 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Upgrade to {requiredPlan.toUpperCase()} Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Instant Activation • Cancel Anytime • 14-Day Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
