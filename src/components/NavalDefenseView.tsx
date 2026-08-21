import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Shield, ShieldAlert, Crosshair, Anchor, Radar } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const NavalDefenseView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Naval Defense & Security Module" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              Tool #101
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Shield className="w-7 h-7 text-rose-400" />
              Naval Architecture Defense & Patrol Vessel Systems
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Naval combat survivability, radar cross-section (RCS) minimization, stealth hull forms, weapon payload weight & margin analysis, and STANAG 4154 shock standards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-rose-400 uppercase">Stealth Hull Geometry</span>
          <h3 className="font-bold text-sm text-white">Radar Cross-Section (RCS) Evaluation</h3>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="text-emerald-400 font-bold">12 dB Radar Return Reduction</div>
            <p className="text-slate-400">Tumblehome superstructure angles optimize X-band radar deflection.</p>
          </div>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-amber-400 uppercase">Intact & Damaged Stability (NATO STANAG 4154)</span>
          <h3 className="font-bold text-sm text-white">2-Compartment Damage Survivability</h3>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="text-emerald-400 font-bold">PASSED Category A Military Standard</div>
            <p className="text-slate-400">Residual GM remains positive under asymmetric flooding conditions.</p>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
