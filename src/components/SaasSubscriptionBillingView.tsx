import React, { useState, useEffect } from 'react';
import { PlanType, Currency, SubscriptionPlanDetails, InvoiceItem, AIUsageBreakdown, PaymentGatewayType } from '../types';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Sparkles,
  Bot,
  Building,
  GraduationCap,
  Users,
  Download,
  FileText,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Percent,
  Check,
  X,
  RefreshCw,
  Sliders,
  DollarSign,
  Lock,
  PieChart,
  Cpu,
  ChevronRight,
  Info
} from 'lucide-react';

interface SaasSubscriptionBillingViewProps {
  currentPlan: PlanType;
  currency: Currency;
  onOpenCheckout: (plan: PlanType) => void;
  onPlanChanged?: (plan: PlanType) => void;
}

export const SaasSubscriptionBillingView: React.FC<SaasSubscriptionBillingViewProps> = ({
  currentPlan,
  currency,
  onOpenCheckout,
  onPlanChanged
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [activeTab, setActiveTab] = useState<'plans' | 'usage' | 'invoices' | 'team_seats' | 'payment_methods'>('plans');
  
  // AI Usage tracking state
  const [usageStats, setUsageStats] = useState<AIUsageBreakdown>({
    totalTokensUsed: 784200,
    monthlyQuota: currentPlan === 'free' ? 50000 : currentPlan === 'student' ? 500000 : currentPlan === 'professional' ? 2500000 : 15000000,
    creditsRemaining: 1715800,
    queriesCount: 412,
    breakdownByModel: {
      geminiFlash: 340000,
      geminiPro: 210000,
      gpt4o: 142000,
      claudeSonnet: 64200,
      deepseekR1: 28000
    },
    breakdownByFeature: {
      chat: 320000,
      thesis: 180000,
      cfdSimulation: 140000,
      reportGen: 94200,
      codeGen: 50000
    },
    dailyTrend: [
      { date: 'Aug 14', tokens: 42000 },
      { date: 'Aug 15', tokens: 68000 },
      { date: 'Aug 16', tokens: 95000 },
      { date: 'Aug 17', tokens: 110000 },
      { date: 'Aug 18', tokens: 82000 },
      { date: 'Aug 19', tokens: 145000 },
      { date: 'Aug 20', tokens: 124000 }
    ]
  });

  // Invoices list state
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [autoRenew, setAutoRenew] = useState(true);

  // Currency multiplier conversion approximation
  const currencyRates: Record<Currency, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    NOK: 10.8,
    SGD: 1.34,
    BDT: 118,
    JPY: 155,
  };

  useEffect(() => {
    // Fetch live usage stats and invoices
    fetch('/api/ai/usage-stats')
      .then(res => res.json())
      .then(data => {
        if (data && data.totalTokensUsed) {
          setUsageStats(data);
        }
      })
      .catch(() => {});

    fetch('/api/billing/invoices')
      .then(res => res.json())
      .then(data => {
        if (data && data.invoices) {
          setInvoices(data.invoices);
        }
      })
      .catch(() => {});
  }, [currentPlan]);

  const plans: SubscriptionPlanDetails[] = [
    {
      id: 'free',
      name: 'Free Plan',
      tagline: 'Basic access for maritime students & ocean enthusiasts.',
      priceMonthlyUSD: 0,
      priceYearlyUSD: 0,
      monthlyTokens: 50000,
      maxTeamSeats: 1,
      storageGB: 2,
      supportLevel: 'Community Forum',
      features: [
        '50,000 AI tokens / month',
        'Basic Hydrostatic & Resistance Calculators',
        'Public Maritime Regulations (SOLAS/MARPOL)',
        'Standard LLM Response Speeds',
        'Community Forum Access'
      ],
      restrictedFeatures: [
        'No CFD OpenFOAM Solver',
        'No Shipyard PDF Report Generation',
        'No Commercial CAD export',
        'No API Keys'
      ]
    },
    {
      id: 'student',
      name: 'Student Plan',
      tagline: 'Empower your marine engineering & naval architecture studies.',
      badge: '50% Student Discount',
      priceMonthlyUSD: 19,
      priceYearlyUSD: 149,
      monthlyTokens: 500000,
      maxTeamSeats: 1,
      storageGB: 25,
      supportLevel: 'Academic Desk Support',
      features: [
        '500,000 AI tokens / month (~1,500 questions)',
        'AI Thesis & Dissertation Research Assistant',
        'Holtrop Resistance & GZ Stability Calculators',
        '100+ Pre-engineered Maritime Prompts',
        'Video Lecture Transcripts & Exam Prep Kits',
        'Verified Academic Certificate Badge'
      ],
      restrictedFeatures: [
        'Commercial Shipyard Reports',
        'Multi-seat Team Collaboration'
      ]
    },
    {
      id: 'professional',
      name: 'Professional Plan',
      tagline: 'The gold standard for Naval Architects & Marine Engineers.',
      badge: 'Most Popular',
      popular: true,
      priceMonthlyUSD: 49,
      priceYearlyUSD: 399,
      monthlyTokens: 2500000,
      maxTeamSeats: 3,
      storageGB: 150,
      supportLevel: 'Priority 24/7 Marine Desk',
      features: [
        '2,500,000 AI tokens / month (Gemini, GPT-4o, Claude 3.5, DeepSeek R1)',
        'Automated Shipyard Technical Reports (PDF & Word)',
        'OpenFOAM CFD Simulation & Hydrodynamics Engine',
        'Full Commercial Usage Rights (IACS & IMO Audits)',
        'Vessel Project AI Memory Vault',
        '5 Developer API Keys with 120 req/min',
        'Priority GPU Reasoning Queue'
      ],
      restrictedFeatures: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      tagline: 'Turnkey intelligence infrastructure for Shipyards & Class Societies.',
      badge: 'Enterprise SLA',
      priceMonthlyUSD: 199,
      priceYearlyUSD: 1590,
      monthlyTokens: 15000000,
      maxTeamSeats: 25,
      storageGB: 1000,
      supportLevel: 'Dedicated Naval Architect Account Manager',
      features: [
        '15,000,000 AI tokens / month on Dedicated GPU Cluster',
        'Private AI Knowledge Base (Trained on Company Fleet Data)',
        '25 Team Member Workspace with RBAC Roles',
        'Custom Maxsurf / ShipManager / ERP API Integrations',
        '99.99% Uptime SLA & SOC2 / ISO 27001 Compliance',
        'Direct Class Society Rule Consultation Workflows'
      ],
      restrictedFeatures: []
    },
    {
      id: 'university',
      name: 'University Campus Plan',
      tagline: 'Campus-wide licensing for Marine Academies & Naval Faculties.',
      badge: 'Campus License',
      priceMonthlyUSD: 499,
      priceYearlyUSD: 3990,
      monthlyTokens: 50000000,
      maxTeamSeats: 500,
      storageGB: 5000,
      supportLevel: 'Faculty Onboarding & Dedicated Support',
      features: [
        'Campus-Wide Access for up to 500 Students & Faculty',
        'LMS Integration (Canvas, Moodle, Blackboard)',
        'Faculty Analytics & AI Plagiarism Detection Dashboard',
        'Custom Co-Branded University Portal',
        'Standardized Naval Architecture Curriculum Packs'
      ],
      restrictedFeatures: []
    }
  ];

  const usagePercent = Math.min(100, Math.round((usageStats.totalTokensUsed / usageStats.monthlyQuota) * 100));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in text-white">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/70 to-slate-900 border border-sky-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Enterprise SaaS Billing & Subscriptions
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                Active Tier: {currentPlan.toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              SaaS Plans & AI Quota Management
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Transparent, flexible subscription tiers tailored for maritime cadets, consulting naval architects, classification societies, and international fleet operators.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onOpenCheckout(currentPlan === 'free' ? 'professional' : currentPlan)}
              className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/25 transition flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Upgrade Plan</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-8 border-t border-slate-800/80 pt-4">
          {[
            { id: 'plans', label: 'Subscription Plans', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'usage', label: 'AI Token & Quota Tracker', icon: <Cpu className="w-4 h-4" /> },
            { id: 'invoices', label: 'Billing Invoices & Receipts', icon: <FileText className="w-4 h-4" /> },
            { id: 'team_seats', label: 'Team & Campus Seats', icon: <Users className="w-4 h-4" /> },
            { id: 'payment_methods', label: 'Payment Methods & Gateways', icon: <Lock className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: SUBSCRIPTION PLANS */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          
          {/* Billing Switcher (Monthly vs Yearly) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-slate-900/60 border border-slate-800 p-2 rounded-2xl max-w-md mx-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition text-center ${
                billingCycle === 'monthly'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-lg shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                SAVE 30%
              </span>
            </button>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {plans.map((plan) => {
              const isCurrent = currentPlan === plan.id;
              const priceUSD = billingCycle === 'yearly' ? plan.priceYearlyUSD : plan.priceMonthlyUSD;
              const convertedPrice = (priceUSD * currencyRates[currency]).toFixed(0);

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between rounded-2xl p-5 border transition duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-b from-sky-950/60 to-slate-900 border-sky-400 shadow-xl shadow-sky-500/10'
                      : isCurrent
                      ? 'bg-slate-900 border-emerald-500/50'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      {isCurrent && (
                        <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[11px] text-slate-400 min-h-[34px] mb-4">
                      {plan.tagline}
                    </p>

                    {/* Price display */}
                    <div className="mb-4 bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-slate-400 font-medium">{currency}</span>
                        <span className="text-3xl font-extrabold text-white font-mono">
                          {convertedPrice}
                        </span>
                        <span className="text-xs text-slate-400">
                          /{billingCycle === 'yearly' ? 'yr' : 'mo'}
                        </span>
                      </div>
                      <span className="text-[10px] text-sky-400 block mt-1">
                        {(plan.monthlyTokens / 1000).toLocaleString()}k AI Tokens / mo
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Included Features
                      </span>
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}

                      {plan.restrictedFeatures.length > 0 && (
                        <div className="pt-2 space-y-1.5 border-t border-slate-800/60">
                          {plan.restrictedFeatures.map((rFeat, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-500">
                              <X className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                              <span>{rFeat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      if (!isCurrent) {
                        onOpenCheckout(plan.id);
                      }
                    }}
                    disabled={isCurrent}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                      isCurrent
                        ? 'bg-slate-800 text-slate-400 cursor-default border border-slate-700'
                        : plan.popular
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Active Subscription</span>
                      </>
                    ) : (
                      <>
                        <span>{plan.id === 'free' ? 'Downgrade' : 'Select Plan'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Money Back Guarantee & Security Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>14-Day Money-Back Guarantee:</strong> Cancel anytime within 14 days for a 100% full refund with zero questions asked.
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span>PCI-DSS Compliant</span>
              <span>•</span>
              <span>256-bit TLS Encryption</span>
              <span>•</span>
              <span>SOC2 Certified</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI TOKEN & USAGE TRACKER */}
      {activeTab === 'usage' && (
        <div className="space-y-6">
          
          {/* Main Meter Card */}
          <div className="bg-slate-900 border border-sky-500/30 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Monthly Token Consumption
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {usageStats.totalTokensUsed.toLocaleString()} / {usageStats.monthlyQuota.toLocaleString()} Tokens
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Quota resets on <strong>September 1, 2026</strong>. Token rate limits are automatically balanced across AI reasoning models.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenCheckout('professional')}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Add 1,000,000 Tokens ($15)</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-slate-950 rounded-full h-4 border border-slate-800 overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    usagePercent > 90
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                      : 'bg-gradient-to-r from-sky-500 to-cyan-400'
                  }`}
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Used: {usagePercent}%</span>
                <span>Remaining: {usageStats.creditsRemaining.toLocaleString()} tokens</span>
              </div>
            </div>
          </div>

          {/* Model Breakdown & Feature Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Model Usage Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Bot className="w-4 h-4 text-sky-400" />
                <span>Usage Breakdown by AI Engine</span>
              </h4>

              <div className="space-y-3">
                {[
                  { name: 'Gemini 3.6 Flash (Primary Engine)', used: usageStats.breakdownByModel.geminiFlash, color: 'bg-sky-400' },
                  { name: 'Gemini 3.6 Pro (Deep Logic)', used: usageStats.breakdownByModel.geminiPro, color: 'bg-blue-500' },
                  { name: 'OpenAI GPT-4o (Maritime Logic)', used: usageStats.breakdownByModel.gpt4o, color: 'bg-emerald-400' },
                  { name: 'Claude 3.5 Sonnet (Specs & Code)', used: usageStats.breakdownByModel.claudeSonnet, color: 'bg-amber-400' },
                  { name: 'DeepSeek R1 (Hydrodynamic Math)', used: usageStats.breakdownByModel.deepseekR1, color: 'bg-purple-400' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="font-mono text-slate-400">{item.used.toLocaleString()} tokens</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${Math.round((item.used / usageStats.totalTokensUsed) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Usage Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Usage by Maritime Feature</span>
              </h4>

              <div className="space-y-3">
                {[
                  { name: 'AI Copilot Pro Chat & Q&A', tokens: usageStats.breakdownByFeature.chat },
                  { name: 'AI Thesis & Academic Research Gen', tokens: usageStats.breakdownByFeature.thesis },
                  { name: 'OpenFOAM CFD & Hydrodynamics Sim', tokens: usageStats.breakdownByFeature.cfdSimulation },
                  { name: 'Shipyard Technical Memos & Reports', tokens: usageStats.breakdownByFeature.reportGen },
                  { name: 'Python SDK / Maxsurf Automation Scripts', tokens: usageStats.breakdownByFeature.codeGen },
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-300 font-medium">{feat.name}</span>
                    <span className="font-mono text-sky-400 font-bold">{feat.tokens.toLocaleString()} tokens</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INVOICES & RECEIPTS */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Payment & Invoice History</h4>
                <p className="text-xs text-slate-400">Download official tax-compliant invoices with VAT/GST breakdown.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3.5">Invoice #</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Plan / Description</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Gateway</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-800/50 transition">
                      <td className="p-3.5 font-mono text-sky-400 font-bold">{inv.invoiceNumber}</td>
                      <td className="p-3.5 text-slate-400">{inv.date}</td>
                      <td className="p-3.5 font-semibold text-white">{inv.planName}</td>
                      <td className="p-3.5 font-mono font-bold text-white">{currency} {(inv.totalUSD * currencyRates[currency]).toFixed(2)}</td>
                      <td className="p-3.5 capitalize">{inv.paymentGateway}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase">
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            const content = `AI MARITIME HUB OFFICIAL TAX INVOICE\n\nInvoice Number: ${inv.invoiceNumber}\nDate: ${inv.date}\nCustomer: ${inv.customerName}\nCompany: ${inv.customerCompany || 'N/A'}\nPlan: ${inv.planName}\nAmount: ${currency} ${(inv.totalUSD * currencyRates[currency]).toFixed(2)}\nStatus: PAID`;
                            const blob = new Blob([content], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${inv.invoiceNumber}.txt`;
                            a.click();
                          }}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 font-semibold rounded-lg transition inline-flex items-center gap-1 border border-slate-700 text-xs"
                        >
                          <Download className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TEAM & CAMPUS SEATS */}
      {activeTab === 'team_seats' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Team & Multi-Seat Workspace</h3>
              <p className="text-xs text-slate-400">
                Manage organization seats for naval architects, cad draughtsmen, students, and faculty.
              </p>
            </div>
            <button
              onClick={() => onOpenCheckout('enterprise')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow transition"
            >
              Add Enterprise Seats (+25)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Allocated Seats</span>
              <span className="text-2xl font-bold text-white">3 / 3 Seats Used</span>
              <span className="text-[10px] text-emerald-400 block mt-1">Professional Tier Allocation</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Single Sign-On (SSO)</span>
              <span className="text-sm font-bold text-white">SAML 2.0 / Okta Ready</span>
              <span className="text-[10px] text-sky-400 block mt-1">Active for @maritimehub.ai</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">RBAC Security Level</span>
              <span className="text-sm font-bold text-white">Strict Role Enforcement</span>
              <span className="text-[10px] text-slate-400 block mt-1">10 Distinct Roles Supported</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PAYMENT METHODS & GATEWAYS */}
      {activeTab === 'payment_methods' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Payment Methods & Auto-Renewal</h3>
            <p className="text-xs text-slate-400">Manage payment cards, PayPal, bKash, and auto-renewal settings.</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-sky-400" />
                <div>
                  <span className="font-bold text-white block">Visa ending in 4242</span>
                  <span className="text-slate-400 text-[11px]">Expires 12/28 • Default Payment Method</span>
                </div>
              </div>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                PRIMARY
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="font-bold text-white block">Automatic Subscription Renewal</span>
                <span className="text-slate-400 text-[11px]">Automatically renews annual billing cycle to prevent service interruption.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRenew}
                  onChange={(e) => setAutoRenew(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
