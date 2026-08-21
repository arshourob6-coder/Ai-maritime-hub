import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import {
  DollarSign,
  CreditCard,
  ShoppingBag,
  GraduationCap,
  Download,
  Briefcase,
  Users,
  Video,
  Building,
  Code,
  Share2,
  Megaphone,
  Layout,
  Mail,
  BookOpen,
  Award,
  FileText,
  Layers,
  Rocket,
  Heart,
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Calculator,
  Globe,
  Database,
  Ticket,
  Anchor,
  Package,
  Activity,
  FileCode,
  Brain,
  Box,
  HardDrive,
  Languages,
  Calendar,
  Target,
  Handshake,
  Server,
  BarChart,
  PieChart
} from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onSelectView?: (view: string) => void;
}

export const MonetizationSuiteView: React.FC<Props> = ({
  userPlan = 'student',
  onOpenPricing,
  onSelectView,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | '106-125' | '126-145' | 'future'>('all');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [creditPacksCount, setCreditPacksCount] = useState<number>(500);
  const [apiUsageTier, setApiUsageTier] = useState<'starter' | 'pro' | 'scale'>('pro');

  const incomeModules = [
    // --- Prompts 106 - 125 Core Income Suite ---
    {
      id: '106',
      title: 'Subscription Membership',
      category: 'Recurring SaaS',
      icon: CreditCard,
      badge: 'Core Revenue',
      color: 'from-emerald-500 to-teal-600',
      description: 'Free, Student ($19/m), Professional ($49/m), Enterprise ($199/m), and University Tier with monthly/annual billing toggles.',
      metrics: '78% of MRR • Automated Tier Feature Gating',
    },
    {
      id: '107',
      title: 'AI Credit Marketplace',
      category: 'Usage Revenue',
      icon: Zap,
      badge: 'Pay-as-you-go',
      color: 'from-amber-500 to-orange-600',
      description: 'Purchase top-up credits for heavy AI CFD simulations, 3D render renders, and automated stability checks.',
      metrics: '$0.02 / credit • Bulk 20% discount packs',
    },
    {
      id: '108',
      title: 'Maritime CAD & Prompt Marketplace',
      category: 'Transactional',
      icon: ShoppingBag,
      badge: '15-30% Commission',
      color: 'from-cyan-500 to-blue-600',
      description: 'Creators buy and sell vessel CAD models, hydrostatic Excel calculators, AI prompt packs, and IMO report templates.',
      metrics: '1,420 Active Creators • Auto Payouts',
    },
    {
      id: '109',
      title: 'Premium Maritime Courses',
      category: 'Education',
      icon: GraduationCap,
      badge: '70/30 Revenue Share',
      color: 'from-indigo-500 to-violet-600',
      description: 'Structured video courses on Hydrodynamics, IMO Decarbonization, and Naval CAD with instructor revenue sharing.',
      metrics: '34 Verified Courses • Accredited CPD',
    },
    {
      id: '110',
      title: 'Digital Downloads & Handbooks',
      category: 'Digital Products',
      icon: Download,
      badge: 'Instant Delivery',
      color: 'from-sky-500 to-indigo-600',
      description: 'Instant purchase for Naval Architecture handbooks, stability spreadsheets, and class survey cheat sheets.',
      metrics: '$15 - $149 per download bundle',
    },
    {
      id: '111',
      title: 'Maritime Freelancer Marketplace',
      category: 'Service Platform',
      icon: Briefcase,
      badge: '10% Platform Fee',
      color: 'from-purple-500 to-pink-600',
      description: 'Hire verified Naval Architects, Marine Engineers, and CFD specialists for bespoke vessel design and audit projects.',
      metrics: '2,800+ Verified Maritime Freelancers',
    },
    {
      id: '112',
      title: 'Maritime Job & Career Portal',
      category: 'Recruitment',
      icon: Users,
      badge: '$299 / Job Post',
      color: 'from-blue-500 to-cyan-600',
      description: 'Shipyards, Class Societies, and Tech Startups post featured job openings, cadet internships, and executive roles.',
      metrics: 'Featured Placement + Newsletter Blast',
    },
    {
      id: '113',
      title: 'Expert Consultation Platform',
      category: 'Expert Network',
      icon: Video,
      badge: '20% Platform Cut',
      color: 'from-rose-500 to-red-600',
      description: 'Book 1-on-1 video calls with Senior Naval Architects, Marine Surveyors, and Maritime Lawyers.',
      metrics: '$150 - $400 / hour expert rates',
    },
    {
      id: '114',
      title: 'Enterprise & University Licensing',
      category: 'B2B / Institution',
      icon: Building,
      badge: 'Custom Contracts',
      color: 'from-slate-600 to-slate-800',
      description: 'Organization-wide multi-seat access for universities (MIT, Webb, DTU), ports, classification societies, and navies.',
      metrics: '$5,000 - $50,000 Annual Contracts',
    },
    {
      id: '115',
      title: 'Paid API Access',
      category: 'Developer API',
      icon: Code,
      badge: 'Usage Billing',
      color: 'from-teal-500 to-emerald-600',
      description: 'REST and GraphQL endpoints for vessel stability math engines, AIS tracking feeds, and GHG CII calculator APIs.',
      metrics: 'Rate limited key management portal',
    },
    {
      id: '116',
      title: 'Maritime Affiliate Program',
      category: 'Affiliate Marketing',
      icon: Share2,
      badge: '5 - 15% Commission',
      color: 'from-green-500 to-emerald-700',
      description: 'Earn referral rewards linking marine hardware, nautical textbooks, software tools, and professional certifications.',
      metrics: 'Auto tracking links & payouts',
    },
    {
      id: '117',
      title: 'Sponsored Listings & Banners',
      category: 'Advertising',
      icon: Megaphone,
      badge: '$500 / month slot',
      color: 'from-amber-600 to-yellow-500',
      description: 'Equipment manufacturers and shipyards feature their products directly inside calculation tools and search directories.',
      metrics: 'High intent B2B maritime traffic',
    },
    {
      id: '118',
      title: 'Display Ad Network System',
      category: 'Ad Monetization',
      icon: Layout,
      badge: 'Google AdSense + Direct',
      color: 'from-orange-500 to-rose-500',
      description: 'Unobtrusive, domain-relevant ad placements for non-paying free tier users.',
      metrics: 'Opt-out for Pro/Enterprise users',
    },
    {
      id: '119',
      title: 'Newsletter Sponsorships',
      category: 'Media & Publishing',
      icon: Mail,
      badge: '45,000 Subscribers',
      color: 'from-fuchsia-500 to-purple-600',
      description: 'Weekly "Maritime AI Insider" email newsletter with dedicated sponsor slots and job spotlights.',
      metrics: '$850 per newsletter sponsorship',
    },
    {
      id: '120',
      title: 'Research & Literature Library',
      category: 'Knowledge Hub',
      icon: BookOpen,
      badge: 'Pay-per-Paper',
      color: 'from-sky-600 to-blue-700',
      description: 'Access peer-reviewed naval architecture papers, benchmark datasets, and decarbonization research briefs.',
      metrics: '$29 / paper or Unlimited Pro Pass',
    },
    {
      id: '121',
      title: 'Certification & Digital Badges',
      category: 'Credentials',
      icon: Award,
      badge: 'Verified Certificates',
      color: 'from-amber-500 to-teal-600',
      description: 'Proctored online examinations for "Certified Maritime AI Specialist" and "IMO CII Auditor" with LinkedIn badge verification.',
      metrics: '$99 / exam attempt',
    },
    {
      id: '122',
      title: 'AI Report & Dossier Generator',
      category: 'On-Demand AI',
      icon: FileText,
      badge: 'Pay-Per-Report',
      color: 'from-indigo-600 to-cyan-600',
      description: 'Generate 40-page PDF feasibility reports, EEDI compliance dossiers, and vessel appraisal documents instantly.',
      metrics: '$49 / comprehensive report',
    },
    {
      id: '123',
      title: 'White-Label SaaS License',
      category: 'Enterprise SaaS',
      icon: Layers,
      badge: 'Custom Branding',
      color: 'from-emerald-600 to-cyan-700',
      description: 'Deploy AI Maritime Hub under custom domain & branding for ship management companies or maritime academies.',
      metrics: '$12,000 / year white-label instance',
    },
    {
      id: '124',
      title: 'Investor & Maritime Startup Hub',
      category: 'Venture Network',
      icon: Rocket,
      badge: 'Matchmaking Fee',
      color: 'from-violet-600 to-fuchsia-600',
      description: 'Maritime tech startups pitch clean-tech innovations to specialized maritime venture funds (Blue Ocean VC, Ocean Impact).',
      metrics: 'Curated deal flow for investors',
    },
    {
      id: '125',
      title: 'Community Supporter & Patreon Tiers',
      category: 'Crowdfunding',
      icon: Heart,
      badge: 'Supporter Badges',
      color: 'from-rose-500 to-pink-600',
      description: 'Patreon-style monthly supporter tiers for open-source maritime research and student scholarship funding.',
      metrics: '$5 / $15 / $50 monthly tiers',
    },

    // --- Prompts 126 - 145 Advanced Income Modules ---
    {
      id: '126',
      title: 'AI Prompt Store',
      category: 'Prompt Marketplace',
      icon: Sparkles,
      badge: '70% Author Share',
      color: 'from-purple-500 to-indigo-600',
      description: 'Buy & sell specialized maritime AI prompts for CFD setup, hydrostatics, IMO CII compliance, and charterparty drafting.',
      metrics: '$4.99 - $29.99 per prompt pack',
    },
    {
      id: '127',
      title: 'Engineering Template Store',
      category: 'Digital Assets',
      icon: FileCode,
      badge: 'Instant Download',
      color: 'from-blue-600 to-indigo-700',
      description: 'Premium Excel calculators, AutoCAD hull lines, Maxsurf models, OrcaFlex scripts, and Python hydrodynamics code.',
      metrics: '$49 - $299 per engineering bundle',
    },
    {
      id: '128',
      title: 'Maritime Digital Bookstore',
      category: 'Publishing',
      icon: BookOpen,
      badge: 'Global Rights',
      color: 'from-amber-600 to-orange-600',
      description: 'Digital bookstore with naval architecture eBooks, lecture notes, classification rules handbooks, and sea trial manuals.',
      metrics: '$19.99 - $89.99 per digital book',
    },
    {
      id: '129',
      title: 'Premium AI Models Hub',
      category: 'AI Model Tier',
      icon: Brain,
      badge: 'Multi-LLM Engine',
      color: 'from-emerald-500 to-teal-700',
      description: 'Access flagship LLMs (GPT-5.5, Claude 3.5 Sonnet, Gemini 1.5 Pro, DeepSeek V3) optimized for marine engineering tasks.',
      metrics: 'Included in Pro/Enterprise or Credit Top-up',
    },
    {
      id: '130',
      title: 'Maritime Software Store',
      category: 'Affiliate & Licenses',
      icon: Box,
      badge: '10-20% Affiliate',
      color: 'from-cyan-500 to-blue-700',
      description: 'Buy verified licenses for Maxsurf, OrcaFlex, ANSYS Fluent, AutoCAD, Rhino, and SolidWorks with exclusive discounts.',
      metrics: 'Partnered with top naval software vendors',
    },
    {
      id: '131',
      title: 'AI Resume & CV Service',
      category: 'Career Tools',
      icon: FileText,
      badge: '$19 - $49 / Service',
      color: 'from-rose-500 to-pink-600',
      description: 'AI-generated maritime resumes, STCW certificate tracking, LinkedIn optimization, and sea-time portfolio formatting.',
      metrics: '94% Interview Callback Rate',
    },
    {
      id: '132',
      title: 'Premium Engineering Calculators',
      category: 'Tool Paywall',
      icon: Calculator,
      badge: 'Pro Unlocked',
      color: 'from-amber-500 to-yellow-600',
      description: 'Lock high-value hydrostatic, propeller blade stress, and wave bending moment calculators behind subscription tiers.',
      metrics: 'Unlimited calculations for Pro users',
    },
    {
      id: '133',
      title: 'Research Publication Service',
      category: 'Academic Services',
      icon: FileText,
      badge: '$149 / Paper Review',
      color: 'from-indigo-500 to-purple-600',
      description: 'Paid manuscript editing, journal formatting for RINA/SNAME/IEEE, plagiarism screening, and peer-review acceleration.',
      metrics: '3-Day Turnaround Guarantee',
    },
    {
      id: '134',
      title: 'Maritime Tenders & Procurement Feed',
      category: 'B2B Intelligence',
      icon: Target,
      badge: '$199 / mo Feed',
      color: 'from-blue-600 to-cyan-600',
      description: 'Aggregated real-time feed of naval defense contracts, port expansion tenders, shipyard RFQs, and offshore energy bids.',
      metrics: 'Over 12,000 Live Maritime Tenders',
    },
    {
      id: '135',
      title: 'Exclusive Industry Reports',
      category: 'Market Research',
      icon: PieChart,
      badge: '$499 / Report',
      color: 'from-slate-700 to-slate-900',
      description: 'In-depth market intelligence on green shipping fuels, LNG bunkering trends, offshore wind vessel demand, and shipyard capacity.',
      metrics: 'Quarterly Executive Dossiers',
    },
    {
      id: '136',
      title: 'Company Analytics Dashboard',
      category: 'Enterprise SaaS',
      icon: BarChart,
      badge: 'B2B Business Intel',
      color: 'from-teal-600 to-emerald-700',
      description: 'Custom analytics dashboards for ports, shipyards, logistics providers, and classification societies with API feeds.',
      metrics: '$800 - $3,500 / month per organization',
    },
    {
      id: '137',
      title: 'Maritime Data API Service',
      category: 'Developer Platform',
      icon: Database,
      badge: 'Usage API Keys',
      color: 'from-violet-600 to-indigo-800',
      description: 'Programmatic REST endpoints for ship particulars database, port congestion metrics, AIS telemetry, and wave spectra data.',
      metrics: '$0.001 per API request • Enterprise SLAs',
    },
    {
      id: '138',
      title: 'AI Design & Hydrodynamic Audit',
      category: 'Automated Audit',
      icon: ShieldCheck,
      badge: '$99 / Audit',
      color: 'from-cyan-600 to-blue-800',
      description: 'Upload 3D STEP or IGES hull files for instant AI hydrodynamics, wave resistance, and SOLAS stability compliance audit.',
      metrics: 'Automated PDF Audit Certificate',
    },
    {
      id: '139',
      title: 'Premium Cloud Engineering Storage',
      category: 'Cloud Storage',
      icon: HardDrive,
      badge: '$15 / 100GB Add-on',
      color: 'from-sky-500 to-blue-600',
      description: 'Secure, encrypted cloud storage tailored for massive CFD mesh datasets, 3D CAD files, and multi-gigabyte point clouds.',
      metrics: 'Version history & instant CAD viewer',
    },
    {
      id: '140',
      title: 'AI Technical Translation Engine',
      category: 'Language AI',
      icon: Languages,
      badge: '$0.05 / Page',
      color: 'from-orange-500 to-amber-600',
      description: 'Instant technical translation of SOLAS rules, Class guidelines, sea trial manuals, and vessel drawings across 30 languages.',
      metrics: 'Preserves technical marine nomenclature',
    },
    {
      id: '141',
      title: 'Maritime Events & Webinars Ticketing',
      category: 'Event Platform',
      icon: Ticket,
      badge: '10% Ticketing Fee',
      color: 'from-fuchsia-600 to-purple-700',
      description: 'Host and sell tickets for maritime AI summits, naval CAD bootcamps, IMO CII workshops, and CPD masterclasses.',
      metrics: 'Integrated Zoom & Certificate issuance',
    },
    {
      id: '142',
      title: 'Sponsored Research & Student Challenges',
      category: 'Innovation Grants',
      icon: Award,
      badge: '$2,500+ Sponsorships',
      color: 'from-emerald-600 to-teal-800',
      description: 'Corporations (Maersk, Wärtsilä, Damen) sponsor student naval design hackathons and decarbonization research awards.',
      metrics: 'Connects talent with maritime leaders',
    },
    {
      id: '143',
      title: 'Maritime Equipment Marketplace',
      category: 'B2B Equipment',
      icon: Anchor,
      badge: '3-8% Transaction Fee',
      color: 'from-blue-700 to-slate-800',
      description: 'Direct B2B marketplace for marine engines, thrusters, AIS transponders, ballast water treatment, and spare parts.',
      metrics: 'Verified Suppliers & Escrow Protection',
    },
    {
      id: '144',
      title: 'Franchise & Training Partner Program',
      category: 'Partner Network',
      icon: Handshake,
      badge: '$5,000 Annual Fee',
      color: 'from-violet-500 to-purple-700',
      description: 'Accredit regional maritime academies, simulation centers, and training hubs to deliver certified AI Maritime Hub courses.',
      metrics: 'Global Partner Reseller Portal',
    },
    {
      id: '145',
      title: 'Executive AI Business Intelligence',
      category: 'Executive Dashboard',
      icon: Server,
      badge: '$1,999 / mo',
      color: 'from-slate-800 to-black',
      description: 'Predictive analytics, fleet CII risk modeling, fuel price hedging indicators, and executive C-suite KPI dashboards.',
      metrics: 'Tailored for Shipowners & Managers',
    },
  ];

  const futureModules = [
    { name: 'Maritime SaaS App Store', badge: 'App Store', desc: 'Third-party developer ecosystem with revenue sharing.' },
    { name: 'AI Agent Marketplace', badge: 'AI Agents', desc: 'Autonomous maritime AI agents for chartering, fuel & maintenance.' },
    { name: 'Maritime Dataset Exchange', badge: 'Data Mon', desc: 'Tokenized marketplace for anonymized vessel telemetry datasets.' },
    { name: 'Digital Twin as a Service (DTaaS)', badge: 'DTaaS', desc: 'Real-time cloud digital twins for hull strain and fuel tracking.' },
    { name: 'Simulation as a Service (SIMaaS)', badge: 'SIMaaS', desc: 'High-performance cloud CFD/FEA hydrodynamics solver.' },
    { name: 'Engineering-as-a-Service (EaaS)', badge: 'EaaS', desc: 'On-demand AI + human naval architecture engineering services.' },
    { name: 'Research-as-a-Service (RaaS)', badge: 'RaaS', desc: 'Bespoke AI-powered literature review and patent analysis.' },
    { name: 'Compliance-as-a-Service (CaaS)', badge: 'CaaS', desc: 'Automated EU ETS, IMO CII, and FuelEU Maritime auditing.' },
    { name: 'Port Analytics as a Service (PaaS)', badge: 'PaaS', desc: 'Smart port berth prediction, crane usage, and logistics optimization.' },
    { name: 'Fleet Intelligence Platform', badge: 'Fleet Intel', desc: 'Enterprise multi-vessel decarbonization & route optimization.' },
  ];

  const filteredModules = incomeModules.filter((mod) => {
    if (activeTab === '106-125') return Number(mod.id) >= 106 && Number(mod.id) <= 125;
    if (activeTab === '126-145') return Number(mod.id) >= 126 && Number(mod.id) <= 145;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Monetization & Commercialization Hub" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Prompts #106 – #145
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              40 Commercial Revenue Streams
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              High-ROI Enterprise B2B
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <DollarSign className="w-9 h-9 text-emerald-400" />
            AI Maritime Commercialization & Monetization Suite
          </h1>
          <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
            40 comprehensive revenue engines + 10 enterprise SaaS services turning AI Maritime Hub into a global multi-million dollar maritime technology ecosystem.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onOpenPricing && onOpenPricing('professional')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Upgrade Plan (Tool #106)
          </button>
        </div>
      </div>

      {/* Key Revenue Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>SaaS Subscriptions</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">$218,400 <span className="text-xs text-emerald-400 font-normal">/ mo</span></div>
          <p className="text-[10px] text-slate-400">Recurring MRR from 3,850 paid seats</p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Marketplace & Downloads</span>
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">$78,500 <span className="text-xs text-cyan-400 font-normal">/ mo</span></div>
          <p className="text-[10px] text-slate-400">CAD models, prompt packs, courses</p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Enterprise & API</span>
            <Building className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">$142,000 <span className="text-xs text-violet-400 font-normal">/ mo</span></div>
          <p className="text-[10px] text-slate-400">Universities, DTaaS, SIMaaS & APIs</p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>B2B Services & Tenders</span>
            <Briefcase className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">$64,200 <span className="text-xs text-amber-400 font-normal">/ mo</span></div>
          <p className="text-[10px] text-slate-400">Jobs, tenders, equipment & BI</p>
        </div>
      </div>

      {/* Interactive Feature Demos section */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" /> Interactive Monetization Tools Playground
            </h2>
            <p className="text-xs text-slate-400">Test live calculators for AI Credits (#107), Subscription Plans (#106), and API Pricing (#115 / #137).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tool 106 Preview */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Tool #106: Tier Billing Calculator</span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Billing Frequency</span>
              <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-[10px]">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-2 py-0.5 rounded ${billingCycle === 'monthly' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400'}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-2 py-0.5 rounded ${billingCycle === 'yearly' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400'}`}
                >
                  Yearly (-20%)
                </button>
              </div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300 font-bold">Professional Plan:</span>
                <span className="text-emerald-300 font-mono font-bold">
                  ${billingCycle === 'yearly' ? '39' : '49'} / month
                </span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Student Plan:</span>
                <span className="font-mono">${billingCycle === 'yearly' ? '15' : '19'} / mo</span>
              </div>
            </div>
            <button
              onClick={() => onOpenPricing && onOpenPricing('professional')}
              className="w-full py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs rounded-xl border border-emerald-500/40 transition flex items-center justify-center gap-1"
            >
              Configure Plan <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tool 107 Preview */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Tool #107: AI Credit Top-Up</span>
            <div>
              <label className="text-xs text-slate-400 flex justify-between">
                <span>Credits Quantity</span>
                <span className="font-mono text-amber-300 font-bold">{creditPacksCount} Credits</span>
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={creditPacksCount}
                onChange={(e) => setCreditPacksCount(Number(e.target.value))}
                className="w-full accent-amber-400 mt-2"
              />
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300 font-bold">Total Cost:</span>
                <span className="text-amber-300 font-mono font-bold">${(creditPacksCount * 0.02 * (creditPacksCount >= 1000 ? 0.8 : 1)).toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-slate-400">
                {creditPacksCount >= 1000 ? '🎉 20% Bulk Discount Applied!' : 'Order 1,000+ for 20% bulk savings.'}
              </p>
            </div>
            <button className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/40 transition">
              Purchase AI Credits
            </button>
          </div>

          {/* Tool 115 Preview */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">Tool #115 & #137: API Access Tiers</span>
            <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg text-[10px] text-center font-bold">
              <button
                onClick={() => setApiUsageTier('starter')}
                className={`py-1 rounded ${apiUsageTier === 'starter' ? 'bg-teal-500 text-black' : 'text-slate-400'}`}
              >
                Starter
              </button>
              <button
                onClick={() => setApiUsageTier('pro')}
                className={`py-1 rounded ${apiUsageTier === 'pro' ? 'bg-teal-500 text-black' : 'text-slate-400'}`}
              >
                Pro
              </button>
              <button
                onClick={() => setApiUsageTier('scale')}
                className={`py-1 rounded ${apiUsageTier === 'scale' ? 'bg-teal-500 text-black' : 'text-slate-400'}`}
              >
                Scale
              </button>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1 text-xs font-mono">
              <div className="text-teal-300 font-bold">
                {apiUsageTier === 'starter' ? '$99 / mo (10,000 requests)' : apiUsageTier === 'pro' ? '$299 / mo (50,000 requests)' : '$999 / mo (250,000 requests)'}
              </div>
              <p className="text-[10px] font-sans text-slate-400">REST & WebSocket access for stability & CII engines.</p>
            </div>
            <button className="w-full py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-bold text-xs rounded-xl border border-teal-500/40 transition">
              Generate API Key
            </button>
          </div>
        </div>
      </div>

      {/* Grid Filter Tabs & Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" /> Complete 40-Module Income Suite (106–145)
          </h2>
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${activeTab === 'all' ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              All (40 Modules)
            </button>
            <button
              onClick={() => setActiveTab('106-125')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${activeTab === '106-125' ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              106–125 Core
            </button>
            <button
              onClick={() => setActiveTab('126-145')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${activeTab === '126-145' ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              126–145 Income
            </button>
            <button
              onClick={() => setActiveTab('future')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${activeTab === 'future' ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Future SaaS (Highest ROI)
            </button>
          </div>
        </div>

        {activeTab !== 'future' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="group relative bg-slate-900/90 hover:bg-slate-850 p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition duration-200 flex flex-col justify-between space-y-4 shadow-lg hover:shadow-2xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-slate-950 text-slate-300 text-[10px] font-bold border border-slate-800">
                        Tool #{item.id}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-bold border border-emerald-500/20">
                        {item.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition">
                          {item.title}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                      {item.metrics}
                    </span>
                    <button
                      onClick={() => {
                        if (item.id === '106') onOpenPricing && onOpenPricing();
                        else if (item.id === '108' && onSelectView) onSelectView('maritime_marketplace');
                        else if (item.id === '109' && onSelectView) onSelectView('premium_courses');
                        else if (item.id === '112' && onSelectView) onSelectView('job_portal');
                        else if (item.id === '115' && onSelectView) onSelectView('api_monetization');
                        else if (onOpenPricing) onOpenPricing('professional');
                      }}
                      className="text-slate-400 hover:text-white font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition"
                    >
                      Manage <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Future Premium Revenue Modules (Highest ROI) */}
        {(activeTab === 'all' || activeTab === 'future') && (
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Rocket className="w-5 h-5 text-amber-400" /> 💰 Future Premium Revenue Modules (Highest ROI)
              </h3>
              <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Enterprise B2B Scalers
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {futureModules.map((item, idx) => (
                <div
                  key={`future_${idx}_${item.name}`}
                  className="bg-slate-900/80 hover:bg-slate-850 p-4 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 text-[9px] font-extrabold rounded uppercase border border-amber-500/20">
                      {item.badge}
                    </span>
                    <h4 className="font-bold text-white text-xs mt-1">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 leading-normal">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => onOpenPricing && onOpenPricing('enterprise')}
                    className="w-full py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold text-[10px] rounded-lg border border-amber-500/30 transition text-center mt-2"
                  >
                    Enterprise Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};

