import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Globe, Waves, Compass, Fish, Wind } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const BlueEconomyView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Blue Economy Hub" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
              Tool #102
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Waves className="w-7 h-7 text-teal-400" />
              Blue Economy Sustainable Ocean Technologies
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Offshore aquaculture design, wave & tidal ocean energy convertors, deep-sea seabed minerals sustainability, and coastal marine spatial planning.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-teal-400 uppercase">Offshore Open-Ocean Aquaculture</span>
          <h3 className="font-bold text-sm text-white">Submersible Salmon Pen Hydrodynamics</h3>
          <p className="text-slate-400">Mooring line fatigue tension under 100-year storm wave spectrum.</p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-sky-400 uppercase">Ocean Thermal Energy Conversion (OTEC)</span>
          <h3 className="font-bold text-sm text-white">10 MW Floating OTEC Power Barge</h3>
          <p className="text-slate-400">Deep cold seawater intake pipe hydroelastic stability analysis.</p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Blue Carbon Credit Verification</span>
          <h3 className="font-bold text-sm text-white">Seagrass & Mangrove Restoration</h3>
          <p className="text-slate-400">Satellite SAR imagery carbon sequestration measurement.</p>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
