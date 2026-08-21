import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Droplet, ShieldCheck, CheckCircle2, FileText, Activity } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const BallastWaterView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Ballast Water Management" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              Tool #89
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Droplet className="w-7 h-7 text-blue-400" />
              Ballast Water Management & BWM Convention D-2 Calculator
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Automated Ballast Water Record Book logging, UV/Electro-chlorination treatment monitoring, and USCG/IMO bio-fouling compliance checks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-blue-400 uppercase">BWTS Operational Log</span>
          <h3 className="font-bold text-sm text-white">Ballast Tank 2P De-Ballasting Operation</h3>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1 font-mono">
            <div>Volume: <span className="text-blue-300 font-bold">1,850 m3</span></div>
            <div>UV Intensity: <span className="text-emerald-400 font-bold">98.4 W/m2 (Target &gt; 80)</span></div>
            <div>D-2 Biological Compliance: <span className="text-emerald-400 font-bold">PASSED (&lt; 10 orgs / m3)</span></div>
          </div>
        </div>

        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Automated BWRB Entry</span>
          <h3 className="font-bold text-sm text-white">Formatted IMO Ballast Water Record Book Entry</h3>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1 text-slate-300">
            <p>Code (A): Ballasting taken at Port of Yokohama on 2026-07-25 08:30 LT.</p>
            <p>Code (B): Treated via Alfa Laval PureBallast 3.2 during intake.</p>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
