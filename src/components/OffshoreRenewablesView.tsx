import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Wind, Zap, Sun, Droplets, Sliders, Sparkles, ShieldCheck } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const OffshoreRenewablesView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [turbineCap, setTurbineCap] = useState(15);
  const [waterDepth, setWaterDepth] = useState(85);
  const [techType, setTechType] = useState('Floating Offshore Wind (Semi-Submersible)');

  const annualMwh = (turbineCap * 8760 * 0.48).toFixed(0);
  const co2SavedMt = (Number(annualMwh) * 0.0007).toFixed(0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Offshore Renewable Energy AI" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Tool #47
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Wind className="w-7 h-7 text-emerald-400" />
              Offshore Renewable Energy & Green Hydrogen
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Design floating offshore wind platforms, wave energy converters, tidal stream turbines, floating solar (FPV), and offshore green hydrogen synthesis hubs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4" /> System Configuration
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Offshore Technology</label>
              <select
                value={techType}
                onChange={(e) => setTechType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
              >
                <option value="Floating Offshore Wind (Semi-Submersible)">Floating Wind (Semi-Submersible)</option>
                <option value="Fixed Monopile Wind Turbine">Fixed Monopile Wind (Max 45m Depth)</option>
                <option value="Tidal Stream Hydrokinetic Turbine">Tidal Stream Hydrokinetic Turbine</option>
                <option value="Offshore Green Hydrogen Electrolyzer Barge">Offshore Green H2 Electrolyzer Barge</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Turbine / Unit Rating</span>
                <span className="text-emerald-400 font-bold">{turbineCap} MW</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                value={turbineCap}
                onChange={(e) => setTurbineCap(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Water Depth</span>
                <span className="text-emerald-400 font-bold">{waterDepth} m</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                value={waterDepth}
                onChange={(e) => setWaterDepth(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider">Energy & Environmental Yield</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-xs">Annual Clean Generation</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">{Number(annualMwh).toLocaleString()} MWh</div>
              <span className="text-[10px] text-slate-400">At 48% offshore capacity factor</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-xs">CO2 Abatement</span>
              <div className="text-2xl font-black text-sky-400 mt-1">{Number(co2SavedMt).toLocaleString()} MT / yr</div>
              <span className="text-[10px] text-slate-400">Equivalent to 14,000 diesel cars</span>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
