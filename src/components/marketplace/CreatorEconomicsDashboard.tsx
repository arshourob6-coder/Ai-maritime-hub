import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Users,
  Zap,
  Download,
  CreditCard,
  ArrowUpRight,
  ShieldCheck,
  Award,
  BarChart3,
  Calendar
} from 'lucide-react';

interface CreatorEconomicsProps {
  isDarkMode?: boolean;
}

export const CreatorEconomicsDashboard: React.FC<CreatorEconomicsProps> = ({
  isDarkMode = true
}) => {
  return (
    <div id="creator-economics-root" className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Creator Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">$14,850.00</div>
          <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+24.5% vs last month</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Monthly Recurring Revenue (MRR)</span>
            <Calendar className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-black text-violet-400">$3,420/mo</div>
          <div className="text-[11px] text-slate-400">84 Active Subscribers</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Agent Executions</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">128.4k</div>
          <div className="text-[11px] text-slate-400">99.8% Success Rate</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Creator Tier</span>
            <Award className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-black text-white">Platinum Master</div>
          <div className="text-[11px] text-sky-400 font-bold">75% Revenue Share</div>
        </div>
      </div>

      {/* Payout & Commission Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Published Agent Revenue Breakdown</h3>
            <span className="text-xs text-slate-400">Past 30 Days</span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'NavalCadence Ship Design AI', sub: 42, rev: '$1,549.80', rating: '4.95' },
              { name: 'SOLAS & Fire Safety Compliance Agent', sub: 28, rev: '$819.00', rating: '4.97' },
              { name: 'Shipping Market Analyst Copilot', sub: 14, rev: '$829.50', rating: '4.94' }
            ].map((agent, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white">{agent.name}</h4>
                  <span className="text-[10px] text-slate-400">{agent.sub} paying seats • ⭐ {agent.rating}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-400">{agent.rev}</span>
                  <span className="text-[10px] text-slate-500 block">Creator Net</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Settings */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              Automated Creator Payouts
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Monthly creator payouts are dispatched automatically on the 1st of every month via Stripe Connect or SWIFT.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Next Payout:</span>
              <strong className="text-white">1st of Next Month</strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Pending Balance:</span>
              <strong className="text-emerald-400 text-sm">$3,420.00</strong>
            </div>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition">
            Manage Payout Accounts (Stripe)
          </button>
        </div>
      </div>
    </div>
  );
};
