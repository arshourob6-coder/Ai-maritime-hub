import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Code, Key, Terminal, Copy, Check, Cpu, Zap } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const PublicApiSdkView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [apiKey] = useState('maritime_live_sk_9f82a138b0c2e4');
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Developer API & SDK Portal" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              Tool #45
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Code className="w-7 h-7 text-indigo-400" />
              Developer Portal & Maritime REST API
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Access programmatic REST APIs and Python/TypeScript SDKs for hydrostatic solvers, AIS vessel tracking, CII carbon rating, and weather routing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <Key className="w-4 h-4" /> Production API Secret Keys
          </h3>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Active Secret Key</div>
            <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
              <code className="text-xs text-indigo-300 font-mono">{apiKey}</code>
              <button onClick={copyKey} className="text-slate-400 hover:text-white">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Monthly API Tokens:</span>
              <span className="text-indigo-300 font-mono font-bold">1,000,000 / Month</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Rate Limit:</span>
              <span className="text-white font-mono font-bold">100 Req / Sec</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-4 h-4" /> Python SDK Quickstart
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-indigo-200 overflow-x-auto">
            <pre>{`from maritime_ai import MaritimeClient

client = MaritimeClient(api_key="${apiKey}")

# Calculate Hydrostatics & GM
result = client.hydrostatics.calculate(
    loa=250.0,
    beam=32.2,
    draft=11.5,
    cb=0.68
)

print(f"Displacement: {result.displacement_mt} MT")
print(f"Metacentric Height (GM): {result.gm_m} m")`}</pre>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
