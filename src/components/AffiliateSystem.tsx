import React, { useState } from 'react';
import { SAMPLE_AFFILIATE_RECORDS, SAMPLE_PAYOUT_HISTORY, AffiliateRecord } from '../data/blogAndAdsData';
import { DollarSign, Copy, Check, Users, ArrowUpRight, Share2, QrCode, Link2, CreditCard, Download, Send, CheckCircle2, AlertCircle, Sparkles, TrendingUp, Layers } from 'lucide-react';

export const AffiliateSystem: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedBannerCode, setCopiedBannerCode] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  
  // Custom Link Builder State
  const [targetDestination, setTargetDestination] = useState('landing');
  const [utmSource, setUtmSource] = useState('linkedin');
  const [utmCampaign, setUtmCampaign] = useState('summer_2026');
  
  // Payout State
  const [payoutMethod, setPayoutMethod] = useState<'Stripe Direct' | 'PayPal' | 'Bank Wire (IBAN)' | 'USDT Crypto'>('Stripe Direct');
  const [requestPayoutOpen, setRequestPayoutOpen] = useState(false);
  const [payoutSubmitted, setPayoutSubmitted] = useState(false);

  // Generate dynamic referral URL
  const baseDomain = "https://maritimehub.ai";
  const partnerId = "ref_alex8921";
  const generatedLink = `${baseDomain}/${targetDestination === 'landing' ? '' : targetDestination}?ref=${partnerId}&utm_source=${utmSource}&utm_campaign=${utmCampaign}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyBannerCode = () => {
    const code = `<a href="${generatedLink}" target="_blank"><img src="https://maritimehub.ai/banners/leaderboard-728x90.png" alt="Maritime AI Hub - Naval Architecture & SOLAS AI Suite" /></a>`;
    navigator.clipboard.writeText(code);
    setCopiedBannerCode(true);
    setTimeout(() => setCopiedBannerCode(false), 2000);
  };

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutSubmitted(true);
    setTimeout(() => {
      setPayoutSubmitted(false);
      setRequestPayoutOpen(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 shadow-lg">
            <DollarSign className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Official Partner Network
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">10% Recurring Lifetime Commission</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Maritime Affiliate & Referral Hub</h1>
            <p className="text-xs text-slate-400 mt-1">Earn 10% monthly recurring income on every student, naval architect, shipowner, or shipyard you refer.</p>
          </div>
        </div>

        <button
          onClick={() => setRequestPayoutOpen(true)}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2 shrink-0"
        >
          <CreditCard className="w-4 h-4" />
          <span>Withdraw Balance ($92.00)</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Link Clicks & Traffic</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <span className="text-2xl font-extrabold text-white font-mono">420</span>
          <p className="text-[10px] text-emerald-400 font-semibold">↑ +14% this month</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Referred Accounts</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-2xl font-extrabold text-white font-mono">18</span>
          <p className="text-[10px] text-slate-400">5.8% Conversion Rate</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Monthly Recurring Commission</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-400 font-mono">$92.00/mo</span>
          <p className="text-[10px] text-emerald-400 font-semibold">10% of $920 total MRR</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Lifetime Payout Total</span>
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-extrabold text-white font-mono">$279.50</span>
          <p className="text-[10px] text-slate-400">3 Payouts Completed</p>
        </div>
      </div>

      {/* Section 1: Referral Link & Custom UTM Builder */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-extrabold text-white">Custom Tracking Link & UTM Generator</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Partner ID: <strong className="text-sky-300">{partnerId}</strong></span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Target App Destination</label>
            <select
              value={targetDestination}
              onChange={(e) => setTargetDestination(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="landing">Homepage / Landing</option>
              <option value="thesis_gen">AI Thesis Generator</option>
              <option value="prompt_library">Prompt Library (100 Prompts)</option>
              <option value="newsletter">Maritime Newsletter</option>
              <option value="learning">Course Hub</option>
              <option value="marketplace">Plugin Marketplace</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">UTM Source</label>
            <input
              type="text"
              value={utmSource}
              onChange={(e) => setUtmSource(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">UTM Campaign</label>
            <input
              type="text"
              value={utmCampaign}
              onChange={(e) => setUtmCampaign(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Output Generated Link Box */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
          <label className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">Your Generated Trackable Link</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              readOnly
              value={generatedLink}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-emerald-400 font-mono"
            />
            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
              </button>
              <button
                onClick={() => setShowQrModal(true)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-1.5"
              >
                <QrCode className="w-4 h-4 text-sky-400" />
                <span>QR Code</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Referred Leads Table */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-white">Referred Accounts & Commission Tracking</h3>
            <p className="text-xs text-slate-400">Live feed of active subscribers referred by your tracking code.</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
            18 Active Referrals
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-mono">
              <tr>
                <th className="p-3.5 rounded-l-xl">Referred Account</th>
                <th className="p-3.5">Plan Subscribed</th>
                <th className="p-3.5">Signup Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Monthly Fee</th>
                <th className="p-3.5 rounded-r-xl text-right">Your 10% Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {SAMPLE_AFFILIATE_RECORDS.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-bold text-white">
                    <div>{rec.referredUser}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{rec.emailMasked}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-400/20 font-semibold text-[11px]">
                      {rec.planName}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400">{rec.signupDate}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[10px]">
                      ● {rec.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">${rec.monthlySubscriptionUSD.toFixed(2)}/mo</td>
                  <td className="p-3.5 font-mono font-extrabold text-emerald-400 text-right text-sm">
                    +${rec.monthlyCommissionUSD.toFixed(2)}/mo
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Payout History & Withdrawal Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Payout History */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4 shadow-2xl">
          <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">Completed Payout History</h3>
          <div className="space-y-3">
            {SAMPLE_PAYOUT_HISTORY.map((p) => (
              <div key={p.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{p.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{p.payoutDate} via <strong className="text-slate-200">{p.payoutMethod}</strong></p>
                  <p className="text-[10px] text-slate-500 font-mono">Ref: {p.transactionReference}</p>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-base font-extrabold text-emerald-400 font-mono">${p.amountUSD.toFixed(2)}</span>
                  <button className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 justify-end underline cursor-pointer">
                    <Download className="w-3 h-3" />
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Creatives & Banners */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-2xl">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Promotional Banners</span>
          </h3>

          <p className="text-xs text-slate-400">Embed these responsive HTML graphics on your blog, university portal, or maritime forum.</p>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">HTML Leaderboard (728x90)</span>
              <button
                onClick={handleCopyBannerCode}
                className="text-xs text-sky-400 hover:text-sky-300 font-bold underline"
              >
                {copiedBannerCode ? 'Copied HTML!' : 'Copy Code'}
              </button>
            </div>
            <div className="h-12 bg-gradient-to-r from-sky-950 to-slate-900 border border-sky-500/30 rounded-xl flex items-center justify-center text-[10px] text-sky-300 font-mono">
              [ Banner Preview 728x90 ]
            </div>
          </div>
        </div>

      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-sky-400/40 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl text-white">
            <h3 className="text-base font-extrabold text-white">Your Partner QR Code</h3>
            <p className="text-xs text-slate-400">Scan to open your custom affiliate tracking URL.</p>
            
            <div className="w-48 h-48 bg-white p-4 rounded-2xl mx-auto flex items-center justify-center shadow-xl">
              {/* QR Code SVG Visual */}
              <div className="w-full h-full bg-slate-950 rounded-lg p-2 flex flex-col items-center justify-center text-white space-y-2">
                <QrCode className="w-24 h-24 text-sky-400" />
                <span className="text-[9px] font-mono text-emerald-400">{partnerId}</span>
              </div>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition"
            >
              Close QR Code
            </button>
          </div>
        </div>
      )}

      {/* Request Payout Modal */}
      {requestPayoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <span>Request Commission Payout</span>
              </h3>
              <button
                onClick={() => setRequestPayoutOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {payoutSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Payout Transfer Initiated!</h4>
                <p className="text-xs text-slate-300">
                  $92.00 is being transferred to your <strong>{payoutMethod}</strong> account. Estimated arrival within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestPayout} className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 block">Available Balance:</span>
                  <span className="text-2xl font-extrabold text-emerald-400 font-mono">$92.00</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">Select Payout Method *</label>
                  <select
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Stripe Direct">Stripe Direct Connect</option>
                    <option value="PayPal">PayPal Instant Transfer</option>
                    <option value="Bank Wire (IBAN)">Bank Wire (IBAN / SWIFT)</option>
                    <option value="USDT Crypto">Crypto USDT (TRC20 / ERC20)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm $92.00 Withdrawal</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
