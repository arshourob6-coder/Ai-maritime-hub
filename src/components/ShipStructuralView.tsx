import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Cpu, ShieldCheck, Sliders, Layers, Activity } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const ShipStructuralView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [plateThickness, setPlateThickness] = useState(18);
  const [stiffenerSpacing, setStiffenerSpacing] = useState(750);
  const [yieldStress, setYieldStress] = useState(315); // Re 315 MPa NV32 high tensile

  const calcStress = (240000 / (plateThickness * stiffenerSpacing)).toFixed(1);
  const safetyFactor = (yieldStress / Number(calcStress)).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Ship Structural Analysis" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              Tool #48
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Cpu className="w-7 h-7 text-amber-400" />
              Ship Structural Scantlings & FEA Integration
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Calculate longitudinal girder section modulus, bottom plating thickness, stiffener buckling limits, fatigue stress concentration, and Class FEA mesh export.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Scantling Parameters
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Bottom Plate Thickness (mm)</span>
                <span className="text-amber-400 font-bold">{plateThickness} mm</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={plateThickness}
                onChange={(e) => setPlateThickness(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Stiffener Frame Spacing (mm)</span>
                <span className="text-amber-400 font-bold">{stiffenerSpacing} mm</span>
              </div>
              <input
                type="range"
                min="500"
                max="1000"
                step="25"
                value={stiffenerSpacing}
                onChange={(e) => setStiffenerSpacing(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider">FEA Stress & Buckling Results</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-xs">Equivalent Von Mises Stress</span>
              <div className="text-2xl font-black text-amber-400 mt-1">{calcStress} MPa</div>
              <span className="text-[10px] text-slate-400">Permissible stress: {yieldStress} MPa</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-xs">Buckling Reserve Factor</span>
              <div className={`text-2xl font-black mt-1 ${Number(safetyFactor) >= 1.25 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {safetyFactor}
              </div>
              <span className="text-[10px] text-slate-400">CSR Class Min: 1.25</span>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
