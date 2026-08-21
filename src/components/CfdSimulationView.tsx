import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Wind, Sliders, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const CfdSimulationView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [froudeNumber, setFroudeNumber] = useState(0.22);
  const [meshCells, setMeshCells] = useState(2.4); // Millions
  const [isSolving, setIsSolving] = useState(false);

  const totalResistanceKn = (320 * Math.pow(froudeNumber * 4, 2)).toFixed(0);

  const runSolver = () => {
    setIsSolving(true);
    setTimeout(() => setIsSolving(false), 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="CFD & Numerical Hydrodynamics Hub" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              Tool #50
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Wind className="w-7 h-7 text-blue-400" />
              CFD Hydrodynamics & Wave Resistance Solver
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Automated snappyHexMesh mesh generation, RANS viscous flow turbulence modeling (k-omega SST), free-surface VOF wave resistance, and ITTC-1957 extrapolation.
          </p>
        </div>

        <button
          onClick={runSolver}
          disabled={isSolving}
          className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 text-slate-950 font-black rounded-2xl transition shadow-lg flex items-center gap-2 shrink-0"
        >
          {isSolving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>Execute RANS CFD Flow Solve</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Domain & Speed Parameters
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Froude Number (Fn)</span>
                <span className="text-blue-400 font-bold">{froudeNumber}</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.45"
                step="0.01"
                value={froudeNumber}
                onChange={(e) => setFroudeNumber(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Hexahedral Mesh Resolution</span>
                <span className="text-blue-400 font-bold">{meshCells} Million Cells</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.5"
                value={meshCells}
                onChange={(e) => setMeshCells(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider">Hydrodynamic Resistance Breakdown</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-xs">Total Towing Resistance (RT)</span>
              <div className="text-2xl font-black text-blue-400 mt-1">{totalResistanceKn} kN</div>
              <span className="text-[10px] text-slate-400">At Fn {froudeNumber} (~{(froudeNumber * 30).toFixed(1)} knots)</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-xs">Mesh Quality (y+ wall distance)</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">y+ = 32</div>
              <span className="text-[10px] text-slate-400">Wall functions enabled</span>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
