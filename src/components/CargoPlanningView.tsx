import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Package, ShieldAlert, CheckCircle2, Sliders, Anchor } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const CargoPlanningView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Smart Cargo Planning" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              Tool #88
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Package className="w-7 h-7 text-amber-400" />
              Intelligent Cargo Stowage & IMDG Dangerous Goods Planner
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Automated container bay plan optimization, IMDG segregation checks, grain loading stability calculations, and lashing force calculations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-amber-400 uppercase">IMDG Code Segregation Check</span>
          <h3 className="font-bold text-sm text-white">Class 3 (Flammable Liquids) vs Class 5.1 (Oxidizing Agents)</h3>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <ShieldAlert className="w-4 h-4" /> Segregation Rule: Away From (Minimum 3 meters distance required)
            </div>
            <p className="text-slate-400">Bay 14 Row 02 Tier 82 is clear of dangerous goods interference.</p>
          </div>
        </div>

        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Grain Loading Trim & Shear Force</span>
          <h3 className="font-bold text-sm text-white">Hold No. 3 Heeling Moment Verification</h3>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" /> Grain Heeling Moment &lt; Allowable Limit (Ratio: 0.62)
            </div>
            <p className="text-slate-400">Complies with IMO International Grain Code Chapter 4.</p>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
