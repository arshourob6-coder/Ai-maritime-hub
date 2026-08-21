import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Building2, Calendar, Clock, CheckCircle2, Sliders, Users, AlertCircle } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const ShipyardManagementView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'workforce'>('schedule');

  const projects = [
    { name: 'S-1042 180,000 DWT Capesize Bulker Newbuilding', stage: 'Block Assembly', dock: 'Graving Dock #1', progress: 68, status: 'On Schedule' },
    { name: 'M/V Nordic Star 5,000 TEU Drydock Special Survey', stage: 'Blasting & Hull Painting', dock: 'Floating Dock #3', progress: 85, status: 'Ahead of Time' },
    { name: 'OFC-80 offshore Wind Installation Vessel Conversion', stage: 'Crane Foundation Fitting', dock: 'Outfitting Quay #2', progress: 42, status: 'Delay (Material Lead)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Shipyard ERP & Production Management" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              Tool #55
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Building2 className="w-7 h-7 text-cyan-400" />
              AI Shipyard Production & Dry Dock Scheduling
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Gantt production planning, hull block erection sequencing, steel cutting optimization, drydock slot allocation, and NDT quality control tracking.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((p, idx) => (
          <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-sm text-white">{p.name}</h3>
                <span className="text-xs text-slate-400">{p.dock} • Stage: <strong className="text-cyan-400">{p.stage}</strong></span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${p.status.includes('Delay') ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                {p.status}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Production Completion</span>
                <span className="font-bold text-cyan-300">{p.progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
