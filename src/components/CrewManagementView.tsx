import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Users, ShieldCheck, Award, Clock, FileText } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const CrewManagementView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Crew Management System" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              Tool #93
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Users className="w-7 h-7 text-indigo-400" />
              Seafarer Crew Management & MLC 2006 Compliance
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Track crew matrix contracts, STCW certification expiry dates, rest hour logs (STCW Table A-VIII/1), and payroll sign-off.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-indigo-400 uppercase">STCW Rest Hours Audit</span>
          <h3 className="font-bold text-sm text-white">2nd Officer Rest Hours Compliance</h3>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="text-emerald-400 font-bold">Passed MLC 2006 Standard</div>
            <p className="text-slate-400">Total Rest in 24h period: 11.5 hours (Minimum required: 10 hours).</p>
          </div>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-amber-400 uppercase">Certificate Expiry Alert</span>
          <h3 className="font-bold text-sm text-white">Chief Engineer Medical Certificate</h3>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="text-amber-400 font-bold">Expires in 28 Days</div>
            <p className="text-slate-400">Renewal appointment scheduled at Port of Singapore Clinic on Aug 12.</p>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
