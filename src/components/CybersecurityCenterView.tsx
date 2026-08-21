import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { ShieldCheck, ShieldAlert, Cpu, Lock, CheckCircle, AlertOctagon, RefreshCw } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const CybersecurityCenterView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime Cybersecurity Center" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold border border-red-500/30">
              Tool #44
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <ShieldAlert className="w-7 h-7 text-red-400" />
              IMO Cyber Risk Management & Threat Center
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Ensure compliance with IMO Resolution MSC.428(98), audit vessel IT/OT bridge networks, GPS spoofing detection, and incident response.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400">
            <ShieldAlert className="w-4 h-4" /> GPS / GNSS Spoofing Alerts
          </div>
          <div className="text-2xl font-black text-white">0 Threats Detected</div>
          <p className="text-xs text-slate-400">Black Sea & Strait of Hormuz active monitoring active.</p>
        </div>

        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> OT ECDIS Network Isolation
          </div>
          <div className="text-2xl font-black text-emerald-300">100% Compliant</div>
          <p className="text-xs text-slate-400">Air-gapped bridge network verified under DNV Cyber Secure rules.</p>
        </div>

        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
            <Lock className="w-4 h-4" /> Crew Security Awareness
          </div>
          <div className="text-2xl font-black text-white">Level 4 Certified</div>
          <p className="text-xs text-slate-400">Monthly phishing simulations completed by all officers.</p>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
