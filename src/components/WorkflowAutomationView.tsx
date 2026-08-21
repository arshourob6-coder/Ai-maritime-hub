import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Sparkles, Zap, CheckCircle2, Sliders, Play } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const WorkflowAutomationView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="AI Maritime Workflow Automation" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              Tool #104
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Zap className="w-7 h-7 text-indigo-400" />
              AI Maritime Workflow & Webhook Automation
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Automate routine maritime tasks: automated daily noon-report ingestion, AIS geofence alert webhooks, class survey reminder workflows, and invoice processing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Active Workflow #1</span>
          <h3 className="font-bold text-sm text-white">Daily Noon-Report Email to Fleet ERP Ingestion</h3>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> 142 Noon Reports Auto-Parsed Today</div>
            <p className="text-slate-400">Zero manual typing required • Extracted fuel, position, weather, and RPM.</p>
          </div>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-indigo-400 uppercase">Active Workflow #2</span>
          <h3 className="font-bold text-sm text-white">ECA Zone Geofence Speed Reduction Trigger</h3>
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="text-indigo-300 font-bold flex items-center gap-1.5"><Play className="w-3.5 h-3.5" /> Auto Telegram & WhatsApp Alert</div>
            <p className="text-slate-400">Triggers bridge notification when 12 NM from North Sea ECA line.</p>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
