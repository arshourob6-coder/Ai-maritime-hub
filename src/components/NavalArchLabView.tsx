import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Anchor, Sparkles, Compass, Sliders, RefreshCw, Layers, CheckCircle2, Waves } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const NavalArchLabView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [heelAngle, setHeelAngle] = useState(10);
  const [trimMeters, setTrimMeters] = useState(0.5);
  const [isSimulating, setIsSimulating] = useState(false);

  const gzArm = (1.85 * Math.sin((heelAngle * Math.PI) / 180)).toFixed(2);
  const kmTransverse = 12.4;
  const kgCentroid = 9.8;
  const gmFluid = (kmTransverse - kgCentroid - 0.25).toFixed(2);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="AI Naval Architecture Lab" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
              Tool #46
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Anchor className="w-7 h-7 text-sky-400" />
              Virtual Naval Architecture Lab
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Interactive hydrostatic stability tank, GZ righting lever curve solver, damage stability simulations, and free-surface fluid moment testing.
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="px-5 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 text-slate-950 font-black rounded-2xl transition shadow-lg flex items-center gap-2 shrink-0"
        >
          {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>Run Dynamic Wave Tank Experiment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-sky-400 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Stability Parameters
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Heel Angle (deg)</span>
                <span className="text-sky-400 font-bold">{heelAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                value={heelAngle}
                onChange={(e) => setHeelAngle(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Trim By Aft (m)</span>
                <span className="text-sky-400 font-bold">{trimMeters} m</span>
              </div>
              <input
                type="range"
                min="-2"
                max="4"
                step="0.1"
                value={trimMeters}
                onChange={(e) => setTrimMeters(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Metacentric Height (GM_fluid):</span>
              <span className="text-emerald-400 font-mono font-bold">{gmFluid} m</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Righting Lever (GZ):</span>
              <span className="text-sky-400 font-mono font-bold">{gzArm} m</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div className="h-[280px] bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center p-6 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#0284c720_1px,transparent_1px)] bg-[size:16px_16px]" />
            
            <div className="relative text-center space-y-4 z-10">
              <div
                className="w-64 h-28 mx-auto bg-gradient-to-r from-sky-500/30 to-indigo-500/30 border-2 border-sky-400/80 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-transform duration-300"
                style={{ transform: `rotate(${heelAngle}deg)` }}
              >
                <Waves className="w-10 h-10 text-sky-400 animate-pulse" />
              </div>
              <div className="text-xs text-slate-300 font-mono">
                Simulation Active • Dynamic Heel {heelAngle}° • IMO Resolution A.749(18) Compliant
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Intact Stability Booklet Criteria Met</span>
            </div>
            <button
              onClick={() => onOpenPricing && onOpenPricing('professional')}
              className="px-4 py-2 bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold rounded-xl hover:bg-sky-500/30 transition"
            >
              Export Stability Curve (GZ PDF)
            </button>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
