import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Cross, HeartPulse, ShieldCheck, PhoneCall, AlertCircle } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const MaritimeMedicalView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime Medical Center" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              Tool #94
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Cross className="w-7 h-7 text-rose-400" />
              Telemedical Maritime Assistance Service (TMAS) & Medical Chest
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Emergency medical triage protocols, WHO International Medical Guide for Ships, inventory tracking for Medical Chest Category A/B, and MEDEVAC coordination.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-rose-400 uppercase">Emergency TMAS Hotline</span>
          <h3 className="font-bold text-sm text-white">Radio Medical Advice Contact</h3>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5" /> CIRM Roma / TMAS Coast Guard Online</div>
            <p className="text-slate-400">Direct satellite voice link or encrypted telemetry dispatch.</p>
          </div>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-amber-400 uppercase">Medical Chest Inventory</span>
          <h3 className="font-bold text-sm text-white">Category A Medicine Chest Status</h3>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="text-white font-bold">100% Items In Stock & Verified Unexpired</div>
            <p className="text-slate-400">Next mandatory port health inspection due: Dec 2026.</p>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
