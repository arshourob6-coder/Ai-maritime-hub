import React, { useState } from 'react';
import { PlanType, Currency } from '../../types';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  AlertTriangle,
  HardDrive,
  Cpu,
  Ticket,
  RotateCcw,
  Search,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw
} from 'lucide-react';

interface AdminDocDashboardTabProps {
  userPlan: PlanType;
  currency: Currency;
}

export const AdminDocDashboardTab: React.FC<AdminDocDashboardTabProps> = ({
  userPlan,
  currency
}) => {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'analytics' | 'users' | 'coupons' | 'refunds'>('analytics');
  const [couponsList, setCouponsList] = useState([
    { code: 'BUET2026', discount: '30%', maxUses: 500, used: 312, active: true },
    { code: 'DNVPROFESSIONAL', discount: '20%', maxUses: 200, used: 84, active: true },
    { code: 'MARITIMEFREE', discount: '100% 1-Mo', maxUses: 100, used: 100, active: false }
  ]);

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('25%');

  const handleAddCoupon = () => {
    if (!newCouponCode.trim()) return;
    setCouponsList(prev => [
      { code: newCouponCode.toUpperCase(), discount: newCouponDiscount, maxUses: 200, used: 0, active: true },
      ...prev
    ]);
    setNewCouponCode('');
  };

  return (
    <div className="space-y-6">
      {/* Top Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Total Conversions (All-Time)</span>
            <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">142,850</span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +18.4% this month
            </span>
          </div>
          <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl">
            <BarChart3 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Monthly Revenue (BDT / USD)</span>
            <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">৳845k / $12.4k</span>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">bKash: 62% | Stripe: 38%</span>
          </div>
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Active Paid Subscribers</span>
            <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">1,842</span>
            <span className="text-[10px] text-cyan-400 font-mono mt-1 block">Student: 1,120 | Pro: 722</span>
          </div>
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Conversion Success Rate</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5 block">99.92%</span>
            <span className="text-[10px] text-slate-400 font-mono mt-1 block">Failed queue: 0.08% (8 jobs)</span>
          </div>
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Admin Navigation Pills */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'analytics', label: 'Conversion & Format Analytics' },
          { id: 'users', label: 'User Subscriptions & Quotas' },
          { id: 'coupons', label: 'Coupons & Promo Codes' },
          { id: 'refunds', label: 'Refunds & Dispute Portal' }
        ].map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveAdminSubTab(sub.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeAdminSubTab === sub.id
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* Admin View Contents */}
      {activeAdminSubTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Popular Conversion Formats</h3>
            <div className="space-y-3 text-xs">
              {[
                { name: 'PDF → Word (.docx)', percentage: 38, count: '54,280 files' },
                { name: 'PDF → Excel (.xlsx)', percentage: 24, count: '34,110 files' },
                { name: 'PDF OCR (Searchable)', percentage: 18, count: '25,710 files' },
                { name: 'PDF Merge & Split', percentage: 12, count: '17,140 files' },
                { name: 'Thesis / Journal Formatter', percentage: 8, count: '11,610 files' }
              ].map((fmt, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300 font-medium">{fmt.name}</span>
                    <span className="text-slate-400 font-mono">{fmt.count} ({fmt.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full"
                      style={{ width: `${fmt.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">System Health & Storage Metrics</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-300 flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                  Total Storage Cached
                </span>
                <span className="text-white font-mono font-bold">142.4 GB / 1.0 TB</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-300 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  Gemini AI Tokens Processed (Month)
                </span>
                <span className="text-white font-mono font-bold">84.2M Tokens</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Oversized File Reject Logs
                </span>
                <span className="text-white font-mono font-bold">24 blocked (&gt;500MB)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeAdminSubTab === 'coupons' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Promotional Coupons & Discounts</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Manage promotional campaign vouchers for university and student discounts.</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="CODE e.g. RINA2026"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleAddCoupon}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Coupon</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="pb-2">Coupon Code</th>
                  <th className="pb-2">Discount</th>
                  <th className="pb-2">Redemptions</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {couponsList.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-800/40">
                    <td className="py-2.5 font-bold text-cyan-400">{c.code}</td>
                    <td className="py-2.5 text-white">{c.discount}</td>
                    <td className="py-2.5 text-slate-300">{c.used} / {c.maxUses}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                        {c.active ? 'ACTIVE' : 'EXPIRED'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeAdminSubTab === 'users' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Recent Subscribers</h3>
          <div className="space-y-2 text-xs">
            {[
              { email: 'cadet.tariq@marineacademy.edu.bd', plan: 'Student (৳299/mo)', region: 'Bangladesh (bKash)', conversionsThisMonth: 34 },
              { email: 'chief.eng@wilhelmsen.com', plan: 'Professional ($9.99/mo)', region: 'Norway (Stripe)', conversionsThisMonth: 142 },
              { email: 'prof.david@strath.ac.uk', plan: 'Pro+ ($19.99/mo)', region: 'UK (PayPal)', conversionsThisMonth: 410 }
            ].map((u, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{u.email}</span>
                  <span className="text-[11px] text-slate-400">{u.region} • {u.plan}</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400">{u.conversionsThisMonth} conversions used</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAdminSubTab === 'refunds' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Refunds & Billing Requests</h3>
          <p className="text-slate-400">Zero active disputes. 100% resolution within 24 hours.</p>
        </div>
      )}
    </div>
  );
};
