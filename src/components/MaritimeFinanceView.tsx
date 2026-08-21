import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { DollarSign, TrendingUp, Calculator, ShieldCheck, PieChart, Landmark } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const MaritimeFinanceView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [vesselPrice, setVesselPrice] = useState(45000000);
  const [debtRatio, setDebtRatio] = useState(70);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenorYears, setTenorYears] = useState(12);

  const debtAmount = (vesselPrice * debtRatio) / 100;
  const equityAmount = vesselPrice - debtAmount;
  const annualInterest = (debtAmount * interestRate) / 100;
  const annualPrincipal = debtAmount / tenorYears;
  const totalAnnualDebtService = annualPrincipal + annualInterest;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime Finance Hub" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Tool #86
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Landmark className="w-7 h-7 text-emerald-400" />
              Maritime Finance, Vessel Valuation & Loan Calculator
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Ship leasing structures, loan amortization schedules, IRR/NPV modeling, charter-backed debt financing, and Poseidon Principles alignment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" /> Ship Acquisition Debt Structuring
          </h3>

          <div>
            <label className="text-xs text-slate-400 flex justify-between">
              <span>Vessel Capital Cost (USD)</span>
              <span className="font-mono text-emerald-300 font-bold">${(vesselPrice / 1e6).toFixed(1)}M</span>
            </label>
            <input
              type="range"
              min="10000000"
              max="150000000"
              step="1000000"
              value={vesselPrice}
              onChange={(e) => setVesselPrice(Number(e.target.value))}
              className="w-full accent-emerald-400 mt-1"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 flex justify-between">
              <span>Senior Loan Leverage (%)</span>
              <span className="font-mono text-emerald-300 font-bold">{debtRatio}%</span>
            </label>
            <input
              type="range"
              min="30"
              max="85"
              value={debtRatio}
              onChange={(e) => setDebtRatio(Number(e.target.value))}
              className="w-full accent-emerald-400 mt-1"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 flex justify-between">
              <span>SOFR + Margin Interest Rate (%)</span>
              <span className="font-mono text-emerald-300 font-bold">{interestRate}%</span>
            </label>
            <input
              type="range"
              min="3"
              max="12"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-emerald-400 mt-1"
            />
          </div>
        </div>

        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 lg:col-span-2">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-400" /> Capital Structure & Debt Service Output
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
              <span className="text-slate-400 block">Senior Debt</span>
              <span className="text-base font-black font-mono text-emerald-400">${(debtAmount / 1e6).toFixed(2)}M</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
              <span className="text-slate-400 block">Equity Check</span>
              <span className="text-base font-black font-mono text-sky-400">${(equityAmount / 1e6).toFixed(2)}M</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
              <span className="text-slate-400 block">Annual Debt Service</span>
              <span className="text-base font-black font-mono text-amber-400">${(totalAnnualDebtService / 1e6).toFixed(2)}M / yr</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
              <span className="text-slate-400 block">Breakeven Time Charter</span>
              <span className="text-base font-black font-mono text-emerald-300">${Math.round(totalAnnualDebtService / 360)} / day</span>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
