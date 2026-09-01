import React, { useState } from 'react';
import { PlanType } from '../types';
import { SubscriptionBanner } from './SubscriptionBanner';
import {
  Bot,
  Sparkles,
  Search,
  Compass,
  BookOpen,
  FileCheck,
  TrendingUp,
  Building2,
  DollarSign,
  ShieldCheck,
  Zap,
  ArrowRight,
  Star,
  Download,
  Tag
} from 'lucide-react';

interface MaritimeAiMarketplaceProps {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onNavigateView?: (view: any) => void;
  isDarkMode?: boolean;
}

interface AgentItem {
  id: string;
  name: string;
  category: 'engineering' | 'regulations' | 'academic' | 'operations';
  tagline: string;
  description: string;
  rating: number;
  runs: string;
  badge?: string;
  price: string;
}

const AI_AGENT_ITEMS: AgentItem[] = [
  {
    id: 'agent-01',
    name: 'Holtrop Resistance & Powering Copilot',
    category: 'engineering',
    tagline: 'Automated bare-hull resistance, form factor, and NCR power solver',
    description: 'Calculates total calm-water resistance Rf, wave resistance Rw, and delivered power Pd using the Holtrop-Mennen empirical formulation.',
    rating: 4.9,
    runs: '18.4k runs',
    badge: 'Popular',
    price: 'Free'
  },
  {
    id: 'agent-02',
    name: 'SOLAS & MARPOL Compliance Auditor',
    category: 'regulations',
    tagline: 'Instant IMO statutory rule checks and fire safety audits',
    description: 'Audits vessel general arrangement against SOLAS Chapter II-1 damage stability and MARPOL Annex VI emissions regulations.',
    rating: 4.95,
    runs: '24.1k runs',
    badge: 'IMO Verified',
    price: 'Pro'
  },
  {
    id: 'agent-03',
    name: 'IACS CSR Section Scantlings Optimizer',
    category: 'engineering',
    tagline: 'Common Structural Rules web frame & stiffener designer',
    description: 'Generates minimum rule thickness, web frame spacing, and plate bucking assessments according to IACS CSR requirements.',
    rating: 4.88,
    runs: '12.8k runs',
    badge: 'IACS Class',
    price: 'Pro'
  },
  {
    id: 'agent-04',
    name: 'CII & EEXI Carbon Rating Forecaster',
    category: 'operations',
    tagline: 'Annual operational carbon intensity indicator prediction',
    description: 'Evaluates required vs attained CII rating grades (A through E), simulating slow-steaming speed reductions and rotor sail retrofits.',
    rating: 4.92,
    runs: '15.6k runs',
    badge: 'Decarbonization',
    price: 'Pro'
  },
  {
    id: 'agent-05',
    name: 'Wageningen B-Series Propeller Designer',
    category: 'engineering',
    tagline: 'Optimum propeller pitch ratio and cavitation margin solver',
    description: 'Solves Kt-Kq open-water curves and Burrill cavitation limit curves for 3, 4, 5, and 6-bladed marine screw propellers.',
    rating: 4.85,
    runs: '9.4k runs',
    price: 'Free'
  },
  {
    id: 'agent-06',
    name: 'Marine Thesis & Paper Literature Reviewer',
    category: 'academic',
    tagline: 'Academic R&D citations, bibliographies, and paper synthesizer',
    description: 'Synthesizes SNAME, RINA, and IEEE Oceans conference papers with standard Harvard and IEEE bibliographic citations.',
    rating: 4.91,
    runs: '11.2k runs',
    badge: 'Academic',
    price: 'Free'
  }
];

export const MaritimeAiMarketplaceView: React.FC<MaritimeAiMarketplaceProps> = ({
  userPlan = 'student',
  onOpenPricing,
  onNavigateView,
  isDarkMode = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<AgentItem | null>(null);

  const filteredAgents = AI_AGENT_ITEMS.filter((ag) => {
    const matchesCat = selectedCategory === 'all' || ag.category === selectedCategory;
    const matchesSearch =
      ag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleLaunchAgent = (ag: AgentItem) => {
    if (ag.price === 'Pro' && userPlan === 'student') {
      if (onOpenPricing) onOpenPricing('professional');
    } else {
      alert(`Agent "${ag.name}" loaded successfully into active workspace!`);
    }
  };

  return (
    <div className={`min-h-screen pb-20 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Subscription Notice Banner */}
        <SubscriptionBanner
          userPlan={userPlan}
          onOpenPricing={onOpenPricing}
          featureName="Maritime AI Agent Marketplace"
        />

        {/* Global Hero Header */}
        <div className="relative rounded-3xl overflow-hidden p-8 bg-gradient-to-r from-violet-950/80 via-slate-900 to-indigo-950/80 border border-violet-800/40 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-black border border-violet-500/30 flex items-center gap-1.5 shadow-sm">
                  <Bot className="w-4 h-4 text-violet-400" />
                  MARITIME AI AGENTS & TOOLS
                </span>
                <span className="text-xs text-slate-400 font-medium">Verified Naval Architecture & Operations Tools</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Maritime AI Agent Marketplace
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Discover specialized AI agents for ship design, hydrostatics, SOLAS compliance, CII decarbonization, and marine engineering calculations.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agents by naval architecture formulas, SOLAS rules, CFD, hydrostatics..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Agents', icon: <Bot className="w-3.5 h-3.5" /> },
              { id: 'engineering', label: 'Engineering & Design', icon: <Compass className="w-3.5 h-3.5" /> },
              { id: 'regulations', label: 'Regulations & Class', icon: <FileCheck className="w-3.5 h-3.5" /> },
              { id: 'academic', label: 'Academic & R&D', icon: <BookOpen className="w-3.5 h-3.5" /> },
              { id: 'operations', label: 'Operations & Fleet', icon: <TrendingUp className="w-3.5 h-3.5" /> }
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 border ${
                  selectedCategory === c.id
                    ? 'bg-violet-600/20 text-violet-300 border-violet-500'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {c.icon}
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((ag) => (
            <div
              key={ag.id}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/50 transition duration-200 flex flex-col justify-between space-y-4 shadow-lg group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  {ag.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      {ag.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition">
                    {ag.name}
                  </h3>
                  <p className="text-xs text-violet-400 font-medium mt-0.5">{ag.tagline}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {ag.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {ag.rating}
                  </span>
                  <span>•</span>
                  <span>{ag.runs}</span>
                </div>

                <button
                  onClick={() => handleLaunchAgent(ag)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
                    ag.price === 'Free'
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-violet-600 hover:bg-violet-500 text-white shadow'
                  }`}
                >
                  <span>{ag.price === 'Free' ? 'Launch' : 'Use Pro'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
      </div>
    </div>
  );
};
