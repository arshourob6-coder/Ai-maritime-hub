import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Smartphone, Download, QrCode, WifiOff, Bell, RefreshCw } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const MobileCompanionView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Mobile Companion App" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              Tool #60
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Smartphone className="w-7 h-7 text-indigo-400" />
              iOS & Android Maritime AI Mobile App
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Access offline hydrostatic calculators, voice assistance on deck, real-time push alerts for IMO regulations, and cloud project sync.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
          <WifiOff className="w-6 h-6 text-indigo-400" />
          <h3 className="font-bold text-sm text-white">100% Offline Mode</h3>
          <p className="text-xs text-slate-400">Run stability calculations, unit conversions, and formula lookups directly at sea without internet connection.</p>
        </div>

        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
          <Bell className="w-6 h-6 text-emerald-400" />
          <h3 className="font-bold text-sm text-white">Smart Push Alerts</h3>
          <p className="text-xs text-slate-400">Receive instant notifications for IMO MEPC circulars, class society rule updates, and port arrival weather alerts.</p>
        </div>

        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
          <RefreshCw className="w-6 h-6 text-sky-400" />
          <h3 className="font-bold text-sm text-white">Cloud Project Sync</h3>
          <p className="text-xs text-slate-400">Seamlesly sync your CAD drafts, survey reports, and thesis notes across desktop web and smartphone.</p>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
