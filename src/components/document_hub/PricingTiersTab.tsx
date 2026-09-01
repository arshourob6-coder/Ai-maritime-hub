import React, { useState } from 'react';
import { PlanType, Currency } from '../../types';
import {
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  HelpCircle,
  Building,
  CreditCard,
  Smartphone,
  Globe,
  Coins,
  ArrowRight,
  Flame,
  AlertCircle
} from 'lucide-react';

interface PricingTiersTabProps {
  currentPlan: PlanType;
  currency: Currency;
  onSetCurrency: (c: Currency) => void;
  onSelectPlan: (plan: PlanType) => void;
  onBuyCreditPack: (title: string, priceUSD: number) => void;
}

export const PricingTiersTab: React.FC<PricingTiersTabProps> = ({
  currentPlan,
  currency,
  onSetCurrency,
  onSelectPlan,
  onBuyCreditPack
}) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

  // Bangladesh (BDT) vs International (USD) price data
  const isBDT = currency === 'BDT';

  const planTiers = [
    {
      id: 'free' as PlanType,
      name: 'Free Starter',
      tagline: 'Basic PDF tools and occasional document conversions',
      priceMonthlyBDT: 0,
      priceAnnualBDT: 0,
      priceMonthlyUSD: 0,
      priceAnnualUSD: 0,
      conversions: '5 conversions / month',
      fileLimit: '10 MB per file',
      features: [
        '5 conversions per month',
        'Max 10 MB file size limit',
        'Basic PDF merge & split tools',
        'Standard conversion speed',
        'Light watermark on outputs',
        '24-hour temporary cloud cache'
      ],
      restricted: [
        'No OCR text extraction',
        'No AI document summarizer',
        'No batch processing',
        'No API access'
      ],
      cta: 'Current Plan',
      isPopular: false
    },
    {
      id: 'student' as PlanType,
      name: 'Student & Cadet',
      tagline: 'Ideal for naval architecture students, cadets & researchers',
      priceMonthlyBDT: 299,
      priceAnnualBDT: 2870, // ~20% off
      priceMonthlyUSD: 4.99,
      priceAnnualUSD: 47.90, // ~20% off
      conversions: '50 conversions / month',
      fileLimit: '50 MB per file',
      badge: 'STUDENT DISCOUNT',
      features: [
        '50 conversions per month',
        '50 MB file size limit',
        'Optical Character Recognition (OCR)',
        'AI PDF Summarizer & Q&A',
        'Thesis & dissertation formatting',
        'Research paper generator',
        'No watermarks',
        'BibTeX citation extractor'
      ],
      cta: 'Upgrade to Student',
      isPopular: false
    },
    {
      id: 'professional' as PlanType,
      name: 'Professional',
      tagline: 'For practicing naval architects, surveyors & ship managers',
      priceMonthlyBDT: 699,
      priceAnnualBDT: 6710, // ~20% off
      priceMonthlyUSD: 9.99,
      priceAnnualUSD: 95.90, // ~20% off
      conversions: '200 conversions / month',
      fileLimit: '100 MB per file',
      badge: 'MOST POPULAR',
      features: [
        '200 conversions per month',
        '100 MB file size limit',
        'Advanced AI document suite',
        'Batch multi-file conversion',
        'Document visual & semantic compare',
        'Priority high-speed GPU queues',
        'Encrypted cloud storage (2 GB)',
        'IMO circular compliance parser',
        'Email & live chat support'
      ],
      cta: 'Upgrade to Professional',
      isPopular: true
    },
    {
      id: 'pro_plus' as PlanType,
      name: 'Pro+',
      tagline: 'High-volume engineering firms, shipyards & consultancies',
      priceMonthlyBDT: 1199,
      priceAnnualBDT: 11510, // ~20% off
      priceMonthlyUSD: 19.99,
      priceAnnualUSD: 191.90, // ~20% off
      conversions: 'Unlimited (2,000 fair-use)',
      fileLimit: '500 MB per file',
      badge: 'MAX POWER',
      features: [
        'Reasonable unlimited use (2,000/mo)',
        '500 MB max file size limit',
        'Deep neural OCR & multi-script',
        'Large CAD & GA drawing processing',
        'High-volume batch pipelines',
        'REST API developer access (10k req)',
        'Priority Gemini 3.6 Pro AI queue',
        'Direct phone & priority support'
      ],
      cta: 'Upgrade to Pro+',
      isPopular: false
    },
    {
      id: 'enterprise' as PlanType,
      name: 'Enterprise',
      tagline: 'Custom deployment for class societies, fleets & universities',
      priceMonthlyBDT: 4999,
      priceAnnualBDT: 47990,
      priceMonthlyUSD: 49.99,
      priceAnnualUSD: 479.90,
      conversions: 'Custom limits',
      fileLimit: '2,000 MB per file',
      features: [
        'Custom organization limits',
        'Unlimited team seat accounts',
        'Private VPC document processing',
        'Single Sign-On (SAML / SSO)',
        'Custom admin controls & audit logs',
        'Dedicated API endpoint & SLA',
        'Custom invoice & PO billing',
        'Dedicated account manager'
      ],
      cta: 'Contact Enterprise Sales',
      isPopular: false
    }
  ];

  const creditPacks = [
    { id: 'c1', title: '50 Conversion Credits', priceUSD: 3.99, priceBDT: 350, desc: 'Pay-per-use, no expiry' },
    { id: 'c2', title: '200 Conversion Credits', priceUSD: 9.99, priceBDT: 890, desc: 'Best for occasional batch jobs' },
    { id: 'c3', title: '100 AI Document Scans', priceUSD: 4.99, priceBDT: 450, desc: 'Deep document summarization & OCR' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Currency Switcher */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple, Affordable, Globally Scalable Pricing</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Choose the Perfect Document Plan
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Transparent regional pricing for Bangladesh and international maritime professionals with instant bKash, Nagad, SSLCommerz, and Stripe payments.
        </p>

        {/* Currency & Period Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => onSetCurrency('BDT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === 'BDT'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🇧🇩 BDT (৳)
            </button>
            <button
              onClick={() => onSetCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌐 USD ($)
            </button>
            <button
              onClick={() => onSetCurrency('EUR')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === 'EUR'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🇪🇺 EUR (€)
            </button>
          </div>

          {/* Monthly vs Annual Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingPeriod === 'annual'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Tier Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
        {planTiers.map((tier) => {
          const isCurrent = currentPlan === tier.id;
          const displayPrice = isBDT
            ? (billingPeriod === 'annual' ? tier.priceAnnualBDT : tier.priceMonthlyBDT)
            : (billingPeriod === 'annual' ? tier.priceAnnualUSD : tier.priceMonthlyUSD);
          
          const symbol = isBDT ? '৳' : currency === 'EUR' ? '€' : '$';

          return (
            <div
              key={tier.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all relative ${
                tier.isPopular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-cyan-950/40 border-cyan-500 shadow-xl shadow-cyan-950/50 scale-[1.02]'
                  : isCurrent
                  ? 'bg-slate-900 border-indigo-500/80 shadow-lg'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full font-mono text-[10px] font-extrabold uppercase bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="mb-3">
                  <h3 className="text-base font-bold text-white">{tier.name}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{tier.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="my-4 pb-4 border-b border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {tier.id === 'free' ? `${symbol}0` : `${symbol}${displayPrice}`}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      /{billingPeriod === 'annual' ? 'year' : 'month'}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] text-cyan-400 font-mono font-medium">
                    {tier.conversions}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {tier.fileLimit}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 text-xs">
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-tight">{feat}</span>
                    </div>
                  ))}
                  {tier.restricted?.map((restr, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-500">
                      <span className="w-3.5 h-3.5 text-slate-600 flex-shrink-0 text-center font-bold">✕</span>
                      <span className="text-[11px] leading-tight line-through">{restr}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectPlan(tier.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                    tier.isPopular
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white'
                      : isCurrent
                      ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 cursor-default'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {isCurrent ? 'Current Plan' : tier.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pay-Per-Use Credit Packs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              Pay-Per-Use Credit Packs (No Subscription Required)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Need to convert a single large project? Buy credit packs that never expire.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Instant delivery to wallet</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {creditPacks.map((pack) => (
            <div
              key={pack.id}
              className="p-4 bg-slate-800/60 border border-slate-750 rounded-xl flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-white block">{pack.title}</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">{pack.desc}</span>
                <span className="text-xs font-bold font-mono text-cyan-400 mt-1 block">
                  {isBDT ? `৳${pack.priceBDT}` : `$${pack.priceUSD}`}
                </span>
              </div>
              <button
                onClick={() => onBuyCreditPack(pack.title, pack.priceUSD)}
                className="px-3 py-1.5 bg-slate-700 hover:bg-cyan-600 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Buy Pack
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Payment Gateways Footer */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>PCI-DSS Level 1 Encrypted Payment Processing</span>
        </div>
        <div className="flex items-center gap-3 font-semibold text-slate-300">
          <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">bKash</span>
          <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">Nagad</span>
          <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">SSLCommerz</span>
          <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">Stripe</span>
          <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">PayPal</span>
        </div>
      </div>
    </div>
  );
};
