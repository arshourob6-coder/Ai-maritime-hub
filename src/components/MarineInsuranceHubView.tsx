import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { ShieldAlert, FileText, DollarSign, CheckCircle2, Sliders, AlertTriangle } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const MarineInsuranceHubView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [insuredValue, setInsuredValue] = useState(45); // Millions USD
  const [tradingZone, setTradingZone] = useState('Worldwide (Excl. High Risk)');

  const annualPremiumEst = (insuredValue * 1000000 * 0.0035).toFixed(0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Marine Insurance & Risk Analytics" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              Tool #56
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <ShieldAlert className="w-7 h-7 text-blue-400" />
              Marine Hull & Machinery (H&M) & P&I Insurance AI
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Automated P&I Club loss prevention, Hull & Machinery policy comparison, War Risk premium evaluation, and AI maritime claims generator.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Vessel Underwriting Inputs
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Hull Insured Agreed Value (USD)</span>
                <span className="text-blue-400 font-bold">${insuredValue}M</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                value={insuredValue}
                onChange={(e) => setInsuredValue(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Trading Navigation Warranty</label>
              <select
                value={tradingZone}
                onChange={(e) => setTradingZone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
              >
                <option value="Worldwide (Excl. High Risk)">Worldwide (Excl. Joint War Committee Listed Areas)</option>
                <option value="Red Sea / Bab el-Mandeb (War Risk Active)">Red Sea / Bab el-Mandeb (+0.4% War Breach)</option>
                <option value="Arctic Northern Sea Route">Arctic Northern Sea Route (Ice Warranty)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider">Estimated Underwriting Quotes</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-xs">Est. Annual H&M Premium</span>
              <div className="text-2xl font-black text-blue-400 mt-1">${Number(annualPremiumEst).toLocaleString()}</div>
              <span className="text-[10px] text-slate-400">Based on Gard / Skuld rate benchmarks</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-slate-400 text-xs">P&I Club Entry Status</span>
              <div className="text-sm font-bold text-emerald-400 mt-2">Classed & Approved (IG P&I)</div>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
