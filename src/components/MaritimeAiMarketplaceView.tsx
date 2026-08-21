import React, { useState } from 'react';
import { PlanType } from '../types';
import { SubscriptionBanner } from './SubscriptionBanner';
import { MARITIME_AGENTS, MaritimeAgent, CREATOR_BENCHMARKS } from '../data/maritimeAgentsData';
import { AgentCard } from './marketplace/AgentCard';
import { AgentDetailModal } from './marketplace/AgentDetailModal';
import { AgentCreationStudio } from './marketplace/AgentCreationStudio';
import { CreatorEconomicsDashboard } from './marketplace/CreatorEconomicsDashboard';
import { EnterpriseAgentsSuite } from './marketplace/EnterpriseAgentsSuite';
import {
  Bot,
  Sparkles,
  Search,
  Plus,
  Compass,
  BookOpen,
  FileCheck,
  TrendingUp,
  Building2,
  SlidersHorizontal,
  DollarSign,
  Users,
  ShieldCheck,
  Cpu,
  Layers,
  Zap,
  ArrowRight
} from 'lucide-react';

interface MaritimeAiMarketplaceProps {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onNavigateView?: (view: any) => void;
  isDarkMode?: boolean;
}

export const MaritimeAiMarketplaceView: React.FC<MaritimeAiMarketplaceProps> = ({
  userPlan = 'student',
  onOpenPricing,
  onNavigateView,
  isDarkMode = true
}) => {
  const [activeTab, setActiveTab] = useState<'store' | 'studio' | 'creator' | 'enterprise'>('store');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pricingFilter, setPricingFilter] = useState<'all' | 'free' | 'subscription' | 'enterprise'>('all');
  const [selectedAgent, setSelectedAgent] = useState<MaritimeAgent | null>(null);
  const [agentsList, setAgentsList] = useState<MaritimeAgent[]>(MARITIME_AGENTS);

  // Filter logic
  const filteredAgents = agentsList.filter((ag) => {
    const matchesCat = selectedCategory === 'all' || ag.category === selectedCategory;
    const matchesSearch =
      ag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.capabilities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPricing = pricingFilter === 'all' || ag.pricing.type === pricingFilter;

    return matchesCat && matchesSearch && matchesPricing;
  });

  const handleAgentCreated = (newAgent: MaritimeAgent) => {
    setAgentsList([newAgent, ...agentsList]);
  };

  const handleDeployAgent = (agent: MaritimeAgent) => {
    if (agent.pricing.type !== 'free' && userPlan === 'student') {
      if (onOpenPricing) onOpenPricing('professional');
    } else {
      alert(`Agent "${agent.name}" successfully added to your workspace active copilot sidebar!`);
      setSelectedAgent(null);
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
                  APP STORE FOR MARITIME INTELLIGENCE
                </span>
                <span className="text-xs text-slate-400 font-medium">Over 2,400+ Verified Engineering Assistants</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Maritime AI Agent Marketplace
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Discover, test, create, and monetize specialized AI agents for ship design, hydrostatics, SOLAS compliance, CII decarbonization, chartering, and shipyard operations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setActiveTab('studio')}
                className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-violet-600/30 transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Custom Agent</span>
              </button>
              <button
                onClick={() => setActiveTab('creator')}
                className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Creator Monetization</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80 text-center sm:text-left">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">{CREATOR_BENCHMARKS.totalPublishedAgents}</div>
              <div className="text-xs text-slate-400">Published AI Agents</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">{CREATOR_BENCHMARKS.totalGlobalExecutions}</div>
              <div className="text-xs text-slate-400">Total Global Runs</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-violet-400">{CREATOR_BENCHMARKS.totalCreatorPayouts}</div>
              <div className="text-xs text-slate-400">Paid to Creators</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-sky-400">{CREATOR_BENCHMARKS.averageCreatorMRR}</div>
              <div className="text-xs text-slate-400">Avg Creator MRR</div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 overflow-x-auto gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('store')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'store'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Browse Agent Store</span>
            </button>
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'studio'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>No-Code Agent Studio</span>
            </button>
            <button
              onClick={() => setActiveTab('creator')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'creator'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Creator Economy & Earnings</span>
            </button>
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'enterprise'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Enterprise & Shipyard Suite</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Agent Store */}
        {activeTab === 'store' && (
          <div className="space-y-6">
            {/* Search & Category Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search agents by naval architecture formulas, SOLAS rules, CFD, hydrostatics, creators..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              {/* Pricing Filter */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-slate-400 font-medium">Pricing:</span>
                <select
                  value={pricingFilter}
                  onChange={(e) => setPricingFilter(e.target.value as any)}
                  className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="all">All Pricing</option>
                  <option value="free">Free Only</option>
                  <option value="subscription">Subscription ($/mo)</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Agents', icon: <Bot className="w-3.5 h-3.5" /> },
                { id: 'engineering', label: 'Engineering & Design', icon: <Compass className="w-3.5 h-3.5" /> },
                { id: 'regulations', label: 'Regulations & Class Rules', icon: <FileCheck className="w-3.5 h-3.5" /> },
                { id: 'academic', label: 'Academic & Research', icon: <BookOpen className="w-3.5 h-3.5" /> },
                { id: 'industry', label: 'Industry & Operations', icon: <TrendingUp className="w-3.5 h-3.5" /> },
                { id: 'enterprise', label: 'Enterprise & Shipyards', icon: <Building2 className="w-3.5 h-3.5" /> }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 border ${
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

            {/* Agent Cards Grid */}
            {filteredAgents.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 text-slate-400 space-y-3">
                <Bot className="w-12 h-12 mx-auto text-slate-600" />
                <h3 className="text-base font-bold text-slate-200">No AI agents found</h3>
                <p className="text-xs max-w-sm mx-auto">
                  Try adjusting your search query or reset the category filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPricingFilter('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((ag) => (
                  <AgentCard
                    key={ag.id}
                    agent={ag}
                    onSelect={(agent) => setSelectedAgent(agent)}
                    onRunSimulation={(agent) => setSelectedAgent(agent)}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Agent Creation Studio */}
        {activeTab === 'studio' && (
          <AgentCreationStudio onAgentCreated={handleAgentCreated} isDarkMode={isDarkMode} />
        )}

        {/* Tab 3: Creator Economics Dashboard */}
        {activeTab === 'creator' && (
          <CreatorEconomicsDashboard isDarkMode={isDarkMode} />
        )}

        {/* Tab 4: Enterprise Suite */}
        {activeTab === 'enterprise' && (
          <EnterpriseAgentsSuite userPlan={userPlan} onOpenPricing={onOpenPricing} isDarkMode={isDarkMode} />
        )}

        {/* Live Interactive Detail / Playground Modal */}
        <AgentDetailModal
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
          onDeploy={handleDeployAgent}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};
