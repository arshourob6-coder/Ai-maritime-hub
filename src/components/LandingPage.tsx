import React, { useState } from 'react';
import { ViewMode, PlanType, Currency } from '../types';
import { Ship3DCanvas } from './Ship3DCanvas';
import { NewsletterModule } from './NewsletterModule';
import {
  Ship,
  Bot,
  Calculator,
  FileCode2,
  GraduationCap,
  Store,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Globe,
  Award,
  BookOpen,
  Anchor,
  TrendingUp,
  Users,
  Search,
  Check,
  X
} from 'lucide-react';

interface LandingPageProps {
  setView: (v: ViewMode) => void;
  onSelectPlan: (plan: PlanType) => void;
  currency: Currency;
  isDarkMode?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  setView,
  onSelectPlan,
  currency,
  isDarkMode = true,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [quickPrompt, setQuickPrompt] = useState('');

  // Currency rates
  const rates: Record<Currency, { symbol: string; mult: number }> = {
    USD: { symbol: '$', mult: 1 },
    EUR: { symbol: '€', mult: 0.92 },
    GBP: { symbol: '£', mult: 0.78 },
    NOK: { symbol: 'kr', mult: 10.8 },
    SGD: { symbol: 'S$', mult: 1.34 },
    BDT: { symbol: '৳', mult: 118 },
    JPY: { symbol: '¥', mult: 155 },
  };

  const c = rates[currency];

  const handleQuickPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickPrompt) {
      setView('ai_chat');
    }
  };

  const featureTabs = [
    { title: 'AI Research & Thesis', icon: <FileCode2 className="w-4 h-4" />, desc: 'Literature review, IEEE/APA citations, thesis outline & equation derivation.' },
    { title: 'Naval Architecture AI', icon: <Ship className="w-4 h-4" />, desc: 'Hydrostatics, GZ stability curves, Holtrop resistance, CFD mesh assistant.' },
    { title: 'SOLAS & MARPOL Audit', icon: <ShieldCheck className="w-4 h-4" />, desc: 'Real-time IMO regulation search, CII carbon intensity, LSA code compliance.' },
    { title: 'Green Ship Recycling', icon: <Anchor className="w-4 h-4" />, desc: 'HKC 2025 IHM Part I HazMat generator, safe dismantling plans, EU SRR audit.' },
    { title: 'Port & AIS Logistics', icon: <Globe className="w-4 h-4" />, desc: 'Congestion prediction, quay crane queueing theory, weather routing optimization.' },
  ];

  const faqs = [
    {
      q: 'How does AI Maritime Hub assist Naval Architects & Marine Engineers?',
      a: 'The platform integrates physics-guided AI models with classical naval architecture formulas (Holtrop-Mennen, ITTC 1957, Simpson rules). It automates hydrostatics, GZ curves, CFD mesh setups, SOLAS compliance, and report generation in seconds.'
    },
    {
      q: 'Are the calculations compliant with DNV, ABS, and Lloyd’s Register rules?',
      a: 'Yes. All hydrostatics, intact stability, and resistance models are benchmarked against IMO Intact Stability Code and major classification society guidelines.'
    },
    {
      q: 'Can students and universities access discounts?',
      a: 'Our Student Plan is priced at just $8/month (or equivalent currency), providing unlimited AI chat, assignment generators, thesis assistance, and certificate courses.'
    },
    {
      q: 'How does the HKC Ship Recycling & IHM Generator work?',
      a: 'With HKC 2025 entry into force, shipowners must maintain an IHM (Inventory of Hazardous Materials). Our AI generates Part I HazMat sampling tables and yard compliance plans automatically.'
    }
  ];

  return (
    <div className="space-y-20 pb-16 relative z-10 text-white">
      
      {/* HERO SECTION */}
      <section className="pt-8 md:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              <span>Next-Gen Maritime Intelligence Platform v2.4</span>
              <span className="bg-sky-400 text-slate-950 font-extrabold text-[9px] px-1.5 py-0.2 rounded-full uppercase">NEW</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              The World's First Complete <br />
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                AI Platform for Maritime
              </span> Professionals
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              Empowering Naval Architects, Marine Engineers, Port Operators, IMO Auditors, and Maritime Researchers with physics-informed AI, instant hydrostatics, SOLAS/MARPOL compliance, and 3D ship hull optimization.
            </p>

            {/* AI Quick Query Input Bar */}
            <form onSubmit={handleQuickPromptSubmit} className="relative max-w-xl">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-sky-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Ask AI: 'Calculate Holtrop resistance for 180m bulk carrier' or 'Draft IHM report for HKC'..."
                  value={quickPrompt}
                  onChange={(e) => setQuickPrompt(e.target.value)}
                  className="w-full pl-11 pr-32 py-3.5 rounded-2xl bg-slate-900/90 border border-sky-500/40 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50 shadow-xl backdrop-blur-xl"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1"
                >
                  <span>Launch AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setView('ai_chat')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>Launch AI Maritime Copilot Pro</span>
              </button>

              <button
                onClick={() => setView('calculators')}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-sky-500/30 font-semibold text-sm transition flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-sky-400" />
                <span>Open Hydrostatics Calculators</span>
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-slate-400">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">14,200+</div>
                <div className="text-[11px]">Maritime Engineers</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-sky-400 font-mono">120+</div>
                <div className="text-[11px]">IMO & DNV Rules AI</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">99.4%</div>
                <div className="text-[11px]">Hydrostatics Accuracy</div>
              </div>
            </div>

          </div>

          {/* Right Interactive 3D Canvas */}
          <div className="lg:col-span-5">
            <Ship3DCanvas lengthBP={220} beam={34} draft={12} />
          </div>

        </div>
      </section>

      {/* TRUST BADGES & SPONSORS */}
      <section className="border-y border-slate-800/80 bg-slate-950/60 py-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            Engineered For Classification Societies, Universities & Shipping Enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-80 grayscale hover:grayscale-0 transition duration-300 text-slate-300 font-extrabold text-sm sm:text-base">
            <div className="flex items-center gap-2"><Award className="w-5 h-5 text-sky-400" /> DNV Classification</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-blue-400" /> ABS Marine</div>
            <div className="flex items-center gap-2"><Anchor className="w-5 h-5 text-emerald-400" /> Lloyd’s Register</div>
            <div className="flex items-center gap-2"><Globe className="w-5 h-5 text-cyan-400" /> IMO Secretariat</div>
            <div className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-amber-400" /> World Maritime Univ.</div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20">
            Comprehensive AI Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            30+ Specialized Maritime AI Tools in One Workspace
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            From undergraduate thesis literature reviews to CFD hull mesh setups, SOLAS auditing, and port terminal optimization.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'AI Maritime Chat Assistant',
              desc: 'Conversational assistant backed by SOLAS, MARPOL, DNV rules, and naval architecture principles.',
              icon: <Bot className="w-6 h-6 text-sky-400" />,
              action: () => setView('ai_chat'),
              badge: 'Multi-Persona'
            },
            {
              title: 'AI Thesis & Assignment Generator',
              desc: 'Generates structured research outlines, literature reviews, methodology equations, and IEEE/APA citations.',
              icon: <FileCode2 className="w-6 h-6 text-cyan-400" />,
              action: () => setView('thesis_gen'),
              badge: 'Academic'
            },
            {
              title: 'Hydrostatics & GZ Stability Calculator',
              desc: 'Calculates displacement, LCB, VCB, KM, and plots GZ righting arm curves according to IMO Intact Code.',
              icon: <Calculator className="w-6 h-6 text-emerald-400" />,
              action: () => setView('calculators'),
              badge: 'DNV Compliant'
            },
            {
              title: 'Holtrop Resistance & Power Prediction',
              desc: 'Predicts wave-making resistance, viscous friction (ITTC 1957), and required engine brake horsepower.',
              icon: <Zap className="w-6 h-6 text-amber-400" />,
              action: () => setView('calculators'),
              badge: 'CFD Benchmark'
            },
            {
              title: 'HKC Ship Recycling & IHM Generator',
              desc: 'Automates Inventory of Hazardous Materials (IHM) Part I reports, HazMat sampling plans, and EU SRR compliance.',
              icon: <Anchor className="w-6 h-6 text-purple-400" />,
              action: () => setView('calculators'),
              badge: 'Mandatory 2025'
            },
            {
              title: 'Port Congestion & Terminal AI',
              desc: 'Queueing model predicting quay crane productivity, container vessel turnaround, and berth allocation.',
              icon: <Globe className="w-6 h-6 text-blue-400" />,
              action: () => setView('calculators'),
              badge: 'Operations'
            },
          ].map((f, i) => (
            <div
              key={i}
              onClick={f.action}
              className="group bg-slate-900/80 border border-sky-500/20 hover:border-sky-400/60 p-6 rounded-2xl transition duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-sky-500/30 group-hover:scale-110 transition">
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/20">
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition mb-2">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-sky-400 group-hover:translate-x-1 transition">
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-900/50 rounded-3xl border border-sky-500/20">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-extrabold text-white">How AI Maritime Hub Works</h2>
          <p className="text-xs sm:text-sm text-slate-400">Seamless workflow from input to certified engineering reports</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Select Assistant', desc: 'Choose Naval Architecture, IMO Regulation, or Port Logistics persona.' },
            { step: '02', title: 'Input Ship Specs', desc: 'Provide hull parameters ($L, B, T, C_b$), voyage route, or research prompt.' },
            { step: '03', title: 'Physics-Guided AI', desc: 'AI executes hydrostatics integration, regulation matching, or CFD mesh scripts.' },
            { step: '04', title: 'Export & Share', desc: 'Download PDF engineering reports, CAD templates, or thesis drafts.' },
          ].map((s, i) => (
            <div key={i} className="relative p-5 bg-slate-950 border border-slate-800 rounded-2xl text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center font-mono font-extrabold text-sky-400 text-sm">
                {s.step}
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{s.title}</h4>
              <p className="text-xs text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING TIERS */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20">
            Flexible Subscription Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Choose Your Maritime Intelligence Tier
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            From free student exploration to full enterprise fleet API integrations. Prices displayed in <span className="text-sky-300 font-bold">{currency}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* FREE PLAN */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Free Tier</h3>
              <p className="text-xs text-slate-400 mb-4">For casual maritime enthusiasts and students.</p>
              <div className="text-3xl font-extrabold text-white font-mono mb-6">
                {c.symbol}0 <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> 10 AI Chat requests / day</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Basic Hydrostatics Calculator</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Access to Public Forum</li>
                <li className="flex items-center gap-2 text-slate-500"><X className="w-4 h-4 text-slate-600 shrink-0" /> Contains Ad Banners</li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('free')}
              className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
            >
              Start Free Plan
            </button>
          </div>

          {/* STUDENT PLAN */}
          <div className="bg-slate-900/90 border border-emerald-500/40 p-6 rounded-2xl flex flex-col justify-between relative shadow-xl">
            <div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-bold text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                Most Popular for Students
              </div>
              <h3 className="text-lg font-bold text-white mb-1 mt-2">Student Plan</h3>
              <p className="text-xs text-slate-400 mb-4">For maritime students, cadets & researchers.</p>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono mb-6">
                {c.symbol}{(8 * c.mult).toFixed(0)} <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Unlimited AI Chat & Thesis Assistant</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Assignment & Quiz Generator</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Certificate Courses Included</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Ad-Free Experience</li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('student')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
            >
              Upgrade to Student ($8)
            </button>
          </div>

          {/* PROFESSIONAL PLAN */}
          <div className="bg-slate-900/90 border border-sky-500/60 p-6 rounded-2xl flex flex-col justify-between relative shadow-2xl ring-1 ring-sky-400/50">
            <div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-slate-950 font-extrabold text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                Recommended for Engineers
              </div>
              <h3 className="text-lg font-bold text-white mb-1 mt-2">Professional</h3>
              <p className="text-xs text-slate-400 mb-4">For Naval Architects, Marine Engineers & Consultants.</p>
              <div className="text-3xl font-extrabold text-sky-400 font-mono mb-6">
                {c.symbol}{(25 * c.mult).toFixed(0)} <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-400 shrink-0" /> Everything in Student Plan</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-400 shrink-0" /> Unlimited Engineering Calculators</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-400 shrink-0" /> HKC IHM & SOLAS PDF Reports</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-400 shrink-0" /> Advanced AI Reasoning Models</li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('professional')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-sky-500/30 transition"
            >
              Get Professional ($25)
            </button>
          </div>

          {/* ENTERPRISE PLAN */}
          <div className="bg-slate-900/80 border border-purple-500/40 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Enterprise</h3>
              <p className="text-xs text-slate-400 mb-4">For Shipyards, Port Authorities & Classification Bodies.</p>
              <div className="text-3xl font-extrabold text-purple-400 font-mono mb-6">
                {c.symbol}{(99 * c.mult).toFixed(0)} <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Unlimited Team Workspaces</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Full Developer API Access</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Dedicated Account Manager</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Private Custom AI Fine-tuning</li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('enterprise')}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition"
            >
              Contact Enterprise ($99)
            </button>
          </div>

        </div>
      </section>

      {/* NATIVE SPONSORED ADS DEMO BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-amber-500/30 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  SPONSORED
                </span>
                <span className="text-xs font-bold text-white">World Maritime University M.Sc Admissions 2026</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Full IMO scholarship opportunities open for Maritime Safety & Environmental Administration.
              </p>
            </div>
          </div>
          <a
            href="https://www.wmu.se"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shrink-0 transition"
          >
            Apply Scholarship
          </a>
        </div>
      </section>

      {/* NEWSLETTER MODULE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterModule onNavigateView={setView} />
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400">Everything you need to know about AI Maritime Hub</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                {activeFaq === i ? <ChevronUp className="w-4 h-4 text-sky-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>
              {activeFaq === i && (
                <div className="px-5 pb-4 text-xs text-slate-300 border-t border-slate-800/80 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
