import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Cpu, Activity, AlertCircle, ShieldCheck, Gauge } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const SmartShipView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Smart Ship Telemetry" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold border border-violet-500/30">
              Tool #99
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Cpu className="w-7 h-7 text-violet-400" />
              Smart Ship IoT Telemetry & Engine Health Dashboard
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Real-time NMEA 2000 sensor ingestion, main engine scavenge air pressure, cylinder exhaust temperatures, vibration spectrum analysis, and AI anomaly detection.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-violet-400 uppercase">Cylinder 1-6 Exhaust Temp</span>
          <h3 className="font-bold text-sm text-white">385°C Avg (Normal Band)</h3>
          <p className="text-slate-400">Exhaust temperature deviation within ±3.2% across all units.</p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Turbocharger RPM</span>
          <h3 className="font-bold text-sm text-white">12,450 RPM (Scavenge Press 2.4 bar)</h3>
          <p className="text-slate-400">Air cooler efficiency 91.2% • Clean condition.</p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase">Shaft Power Meter</span>
          <h3 className="font-bold text-sm text-white">18,240 kW @ 78.2 RPM</h3>
          <p className="text-slate-400">Torque sensor calibrated • Zero slip anomaly.</p>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
