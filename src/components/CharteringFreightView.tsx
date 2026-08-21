import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Anchor, Calculator, ArrowUpRight, ShieldCheck, Ship, Navigation } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const CharteringFreightView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [cargoTons, setCargoTons] = useState(65000);
  const [freightRate, setFreightRate] = useState(24.5);
  const [bunkersPrice, setBunkersPrice] = useState(620);
  const [seaDays, setSeaDays] = useState(18);

  const grossFreight = cargoTons * freightRate;
  const fuelConsumptionPerDay = 32; // MT/day
  const totalFuelCost = seaDays * fuelConsumptionPerDay * bunkersPrice;
  const portCosts = 45000;
  const netProfit = grossFreight - totalFuelCost - portCosts;
  const tce = Math.round(netProfit / seaDays);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Chartering & Freight AI" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              Tool #87
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Anchor className="w-7 h-7 text-cyan-400" />
              Chartering Voyage Estimator & Freight AI
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Calculate Time Charter Equivalent (TCE), spot vs time charter economics, Baltic Dry Index predictions, and laytime/demurrage risk.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-cyan-400" /> Voyage Inputs
          </h3>

          <div>
            <label className="text-xs text-slate-400 flex justify-between">
              <span>Cargo Quantity (MT)</span>
              <span className="font-mono text-cyan-300 font-bold">{cargoTons.toLocaleString()} MT</span>
            </label>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={cargoTons}
              onChange={(e) => setCargoTons(Number(e.target.value))}
              className="w-full accent-cyan-400 mt-1"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 flex justify-between">
              <span>Freight Rate ($ / MT)</span>
              <span className="font-mono text-cyan-300 font-bold">${freightRate} / MT</span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="0.5"
              value={freightRate}
              onChange={(e) => setFreightRate(Number(e.target.value))}
              className="w-full accent-cyan-400 mt-1"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 flex justify-between">
              <span>VLSFO Bunker Price ($ / MT)</span>
              <span className="font-mono text-cyan-300 font-bold">${bunkersPrice} / MT</span>
            </label>
            <input
              type="range"
              min="300"
              max="1100"
              step="10"
              value={bunkersPrice}
              onChange={(e) => setBunkersPrice(Number(e.target.value))}
              className="w-full accent-cyan-400 mt-1"
            />
          </div>
        </div>

        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 lg:col-span-2">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Ship className="w-4 h-4 text-cyan-400" /> Voyage Earnings & TCE Metrics
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
              <span className="text-slate-400 block">Gross Freight</span>
              <span className="text-base font-black font-mono text-white">${grossFreight.toLocaleString()}</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
              <span className="text-slate-400 block">Bunker Expense</span>
              <span className="text-base font-black font-mono text-rose-400">${totalFuelCost.toLocaleString()}</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
              <span className="text-slate-400 block">Net Voyage Margin</span>
              <span className="text-base font-black font-mono text-emerald-400">${netProfit.toLocaleString()}</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
              <span className="text-slate-400 block">Net TCE Rate</span>
              <span className="text-base font-black font-mono text-cyan-300">${tce.toLocaleString()} / day</span>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
