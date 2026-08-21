import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Activity, AlertTriangle, Cpu, Wrench, CheckCircle, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const PredictiveMaintView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [selectedMachine, setSelectedMachine] = useState('Main Engine Cylinder 3');

  const machineryList = [
    { name: 'Main Engine Cylinder 3', health: 68, status: 'Warning', fault: 'Scavenge Air Pressure Drop / Ring Wear', rulDays: 14 },
    { name: 'Auxiliary Generator #1', health: 94, status: 'Normal', fault: 'None detected', rulDays: 180 },
    { name: 'Turbocharger T/C A', health: 82, status: 'Normal', fault: 'Vibration mild (Blade deposit)', rulDays: 60 },
    { name: 'Stern Tube Bearing', health: 91, status: 'Normal', fault: 'Lube oil temperature stable', rulDays: 240 },
    { name: 'Fuel Oil Purifier #2', health: 54, status: 'Critical', fault: 'High vibration & Seal ring erosion', rulDays: 3 }
  ];

  const current = machineryList.find((m) => m.name === selectedMachine) || machineryList[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Predictive Maintenance AI" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              Tool #31
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Activity className="w-7 h-7 text-amber-400" />
              Machinery Health & Predictive Maintenance AI
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Real-time IoT telemetry analysis, vibration spectral FFT, component remaining useful life (RUL), and automated spare parts order recommendations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Machinery List */}
        <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="font-bold text-sm text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4" /> Shipboard Machinery Telemetry
          </h3>

          <div className="space-y-2">
            {machineryList.map((m) => (
              <button
                key={m.name}
                onClick={() => setSelectedMachine(m.name)}
                className={`w-full text-left p-3 rounded-2xl border transition flex items-center justify-between ${
                  selectedMachine === m.name
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="font-bold text-sm">{m.name}</div>
                  <div className="text-[11px] text-slate-400">{m.fault}</div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xs font-black px-2 py-0.5 rounded ${
                      m.health > 80
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : m.health > 60
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {m.health}% Health
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">RUL: ~{m.rulDays} days</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Machine Analytics & Diagnosis */}
        <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-black text-white">{current.name}</h2>
              <p className="text-xs text-slate-400">Diagnosis Status: {current.status}</p>
            </div>
            <button
              onClick={() => onOpenPricing && onOpenPricing('professional')}
              className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold rounded-xl text-xs border border-amber-500/40"
            >
              Order OEM Spare Parts
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-xs font-bold">Vibration (RMS)</span>
              <div className="text-2xl font-black text-amber-400 mt-1">4.82 mm/s</div>
              <span className="text-[10px] text-amber-300/80">ISO 10816 Zone B (Marginal)</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-xs font-bold">Exhaust Temp Delta</span>
              <div className="text-2xl font-black text-sky-400 mt-1">+24 °C</div>
              <span className="text-[10px] text-slate-400">Above engine mean average</span>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> AI Root Cause & Recommendation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Vibration FFT spectrum indicates 2x rotational harmonic spike. High probability of Piston Ring #2 sticking due to heavy fuel oil carbon deposits. Recommend inspecting scavenge port during upcoming port stay (Singapore) and replacing piston crown seal rings.
            </p>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-sky-400" />
                <span className="text-slate-300 font-medium">MAN B&W Seal Ring Kit (Part #702-8812)</span>
              </div>
              <span className="text-sky-400 font-mono font-bold">$1,250 USD</span>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
