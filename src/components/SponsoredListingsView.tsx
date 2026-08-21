import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import {
  Megaphone,
  Sparkles,
  Search,
  Building2,
  TrendingUp,
  Eye,
  MousePointerClick,
  DollarSign,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Pause,
  Play,
  Settings,
  ExternalLink,
  ShieldCheck,
  Star,
  Tag,
  Filter,
  BarChart3,
  Layers,
  Award,
  Globe,
  Anchor,
  Zap,
  ArrowUpRight,
  Edit,
  Trash2,
  X
} from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onSelectView?: (view: string) => void;
}

interface Campaign {
  id: string;
  companyName: string;
  category: string;
  headline: string;
  description: string;
  placementZone: 'Search Top Banner' | 'Directory Spotlight' | 'Tool Sidebar' | 'Marketplace Top';
  pricingModel: 'CPC ($1.80)' | 'CPM ($15.00)';
  dailyBudget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number; // %
  status: 'Active' | 'Paused' | 'Pending Review';
  badge: string;
  logoBg: string;
  website: string;
}

export const SponsoredListingsView: React.FC<Props> = ({
  userPlan = 'student',
  onOpenPricing,
  onSelectView,
}) => {
  const [activeTab, setActiveTab] = useState<'directory_preview' | 'admin_console' | 'analytics'>('directory_preview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Initial Campaigns Data
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 'cmp-01',
      companyName: 'Wärtsilä Marine Solutions',
      category: 'Propulsion & Green Fuels',
      headline: 'Next-Gen Dual-Fuel Ammonia & Hydrogen Engines',
      description: 'Zero-emission marine engine solutions complying with IMO CII and FuelEU targets.',
      placementZone: 'Search Top Banner',
      pricingModel: 'CPM ($15.00)',
      dailyBudget: 250,
      spent: 3420,
      impressions: 228000,
      clicks: 9810,
      ctr: 4.3,
      status: 'Active',
      badge: 'Featured Green Pioneer',
      logoBg: 'from-blue-600 to-cyan-600',
      website: 'https://wartsila.com'
    },
    {
      id: 'cmp-02',
      companyName: 'Damen Shipyards Group',
      category: 'Shipbuilding & Repair',
      headline: 'Eco-Tugs & Electric Workboats Ready for Delivery',
      description: 'Standardized modular vessel designs with fast delivery schedules and integrated batteries.',
      placementZone: 'Directory Spotlight',
      pricingModel: 'CPC ($1.80)',
      dailyBudget: 150,
      spent: 2180,
      impressions: 145000,
      clicks: 6520,
      ctr: 4.5,
      status: 'Active',
      badge: 'Verified Shipyard Leader',
      logoBg: 'from-amber-500 to-orange-600',
      website: 'https://damen.com'
    },
    {
      id: 'cmp-03',
      companyName: 'DNV Classification Society',
      category: 'Class & Certification',
      headline: 'AI Cyber-Safety & SOLAS Autonomous Vessel Approval',
      description: 'Digital class approval guidelines for remote control bridges and cyber-resilient vessel networks.',
      placementZone: 'Tool Sidebar',
      pricingModel: 'CPM ($15.00)',
      dailyBudget: 300,
      spent: 4200,
      impressions: 280000,
      clicks: 11200,
      ctr: 4.0,
      status: 'Active',
      badge: 'Global Class Partner',
      logoBg: 'from-indigo-600 to-slate-800',
      website: 'https://dnv.com'
    },
    {
      id: 'cmp-04',
      companyName: 'Kongsberg Maritime',
      category: 'Autonomous Tech & Dynamic Positioning',
      headline: 'K-Pos Dynamic Positioning 3 & Autonomous Bridge Systems',
      description: 'Industry-standard DP systems for offshore wind installation vessels and uncrewed surface vessels.',
      placementZone: 'Directory Spotlight',
      pricingModel: 'CPC ($1.80)',
      dailyBudget: 200,
      spent: 1890,
      impressions: 112000,
      clicks: 4890,
      ctr: 4.36,
      status: 'Active',
      badge: 'DP & Autonomy Sponsor',
      logoBg: 'from-emerald-600 to-teal-800',
      website: 'https://kongsberg.com'
    }
  ]);

  // Form State for New Campaign
  const [newCmpName, setNewCmpName] = useState('');
  const [newCmpCategory, setNewCmpCategory] = useState('Propulsion & Green Fuels');
  const [newCmpHeadline, setNewCmpHeadline] = useState('');
  const [newCmpDesc, setNewCmpDesc] = useState('');
  const [newCmpZone, setNewCmpZone] = useState<'Search Top Banner' | 'Directory Spotlight' | 'Tool Sidebar' | 'Marketplace Top'>('Directory Spotlight');
  const [newCmpBudget, setNewCmpBudget] = useState(100);

  const categories = [
    'All',
    'Propulsion & Green Fuels',
    'Shipbuilding & Repair',
    'Class & Certification',
    'Autonomous Tech & Dynamic Positioning',
    'Port & Logistics Equipment',
    'Naval CAD & CFD Software'
  ];

  const handleToggleStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c
      )
    );
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCmpName || !newCmpHeadline) return;

    const newCmp: Campaign = {
      id: `cmp-${Date.now()}`,
      companyName: newCmpName,
      category: newCmpCategory,
      headline: newCmpHeadline,
      description: newCmpDesc || 'Promoted maritime service on AI Maritime Hub.',
      placementZone: newCmpZone,
      pricingModel: 'CPC ($1.80)',
      dailyBudget: newCmpBudget,
      spent: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      status: 'Pending Review',
      badge: 'Sponsored Enterprise',
      logoBg: 'from-violet-600 to-purple-800',
      website: 'https://maritimehub.ai'
    };

    setCampaigns([newCmp, ...campaigns]);
    setShowCreateModal(false);
    setNewCmpName('');
    setNewCmpHeadline('');
    setNewCmpDesc('');
  };

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      <SubscriptionBanner
        userPlan={userPlan}
        onOpenPricing={onOpenPricing}
        featureName="Sponsored Listings & Ad Campaign Manager (Feature #117)"
      />

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-amber-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Feature #117 Monetization
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              CPM & CPC High ROI Ads
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              Verified Partner Badging
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Megaphone className="w-9 h-9 text-amber-400" />
            Sponsored Listings & Campaign Engine
          </h1>
          <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
            Allow maritime shipyards, manufacturers, classification societies, and software vendors to highlight their products across directory searches, CAD tools, and global AI query results.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 relative z-10">
          <button
            onClick={() => onSelectView?.('admin')}
            className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-extrabold text-xs transition flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            Master Earnings Dashboard
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold text-xs shadow-lg shadow-amber-500/25 transition flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Launch Sponsored Campaign
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Active Sponsors</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">18 Companies</div>
          <p className="text-[10px] text-slate-400">Verified maritime leaders</p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Monthly Ad Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">$34,800 <span className="text-xs text-emerald-400 font-normal">/ mo</span></div>
          <p className="text-[10px] text-slate-400">Generated from CPC & CPM ads</p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Impressions Served</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">1,480,000</div>
          <p className="text-[10px] text-slate-400">Targeted marine engineers & executives</p>
        </div>

        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Avg Click-Through (CTR)</span>
            <MousePointerClick className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">4.28 %</div>
          <p className="text-[10px] text-slate-400">High engagement industry audience</p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs gap-1">
        <button
          onClick={() => setActiveTab('directory_preview')}
          className={`px-4 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 ${
            activeTab === 'directory_preview'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Search className="w-4 h-4" />
          Directory & Search Preview Mode
        </button>

        <button
          onClick={() => setActiveTab('admin_console')}
          className={`px-4 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 ${
            activeTab === 'admin_console'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Settings className="w-4 h-4" />
          Campaign Admin Console
        </button>
      </div>

      {/* TAB 1: DIRECTORY & SEARCH PREVIEW */}
      {activeTab === 'directory_preview' && (
        <div className="space-y-6">
          {/* Top Banner Advertisement Placement Preview */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-amber-500/40 relative shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold border border-amber-500/40 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Promoted Top Search Banner Placement
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center font-black text-white text-xl shadow-lg shrink-0">
                W
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  Featured Green Pioneer • Wärtsilä
                </span>
                <h3 className="text-lg font-extrabold text-white">Next-Gen Dual-Fuel Ammonia & Hydrogen Engines</h3>
                <p className="text-xs text-slate-300 max-w-2xl">
                  Zero-emission marine engine solutions complying with IMO CII and FuelEU targets. Request technical CAD specifications and payback models.
                </p>
              </div>
            </div>

            <a
              href="https://wartsila.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shrink-0 shadow-lg"
            >
              Visit Official Website <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Directory Search Filter & Cards */}
          <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sponsored companies, green fuels, shipyards, classification societies..."
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950 rounded-2xl border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sponsored Directory Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {filteredCampaigns.map((cmp) => (
                <div
                  key={cmp.id}
                  className="bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-amber-500/50 transition flex flex-col justify-between space-y-4 relative group shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-extrabold border border-amber-500/20 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {cmp.badge}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Zone: {cmp.placementZone}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cmp.logoBg} flex items-center justify-center font-black text-white text-lg shadow-md shrink-0`}>
                        {cmp.companyName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-white text-base group-hover:text-amber-300 transition">
                          {cmp.companyName}
                        </h3>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          {cmp.category}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-slate-200">{cmp.headline}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{cmp.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                      <span>👁️ {cmp.impressions.toLocaleString()} views</span>
                      <span>🖱️ {cmp.clicks.toLocaleString()} clicks</span>
                    </div>
                    <a
                      href={cmp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center gap-1"
                    >
                      Visit Profile <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADMIN CONSOLE */}
      {activeTab === 'admin_console' && (
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" /> Campaign Admin Management Dashboard
              </h2>
              <p className="text-xs text-slate-400">Monitor budgets, approve submissions, and toggle campaign status across global placements.</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shrink-0"
            >
              <PlusCircle className="w-4 h-4" /> Add Campaign
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">Company & Category</th>
                  <th className="p-3">Placement Zone</th>
                  <th className="p-3">Pricing Model</th>
                  <th className="p-3">Daily Budget</th>
                  <th className="p-3">Spent</th>
                  <th className="p-3">Impressions</th>
                  <th className="p-3">Clicks / CTR</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {campaigns.map((cmp) => (
                  <tr key={cmp.id} className="hover:bg-slate-850/60 transition">
                    <td className="p-3">
                      <div className="font-extrabold text-white">{cmp.companyName}</div>
                      <div className="text-[10px] text-slate-400">{cmp.category}</div>
                    </td>
                    <td className="p-3 font-semibold text-slate-300">{cmp.placementZone}</td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">{cmp.pricingModel}</td>
                    <td className="p-3 font-mono text-white font-bold">${cmp.dailyBudget} / day</td>
                    <td className="p-3 font-mono text-slate-300">${cmp.spent.toLocaleString()}</td>
                    <td className="p-3 font-mono text-slate-300">{cmp.impressions.toLocaleString()}</td>
                    <td className="p-3 font-mono">
                      <div className="text-amber-400 font-bold">{cmp.clicks.toLocaleString()} clicks</div>
                      <div className="text-[10px] text-slate-400">{cmp.ctr}% CTR</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                          cmp.status === 'Active'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : cmp.status === 'Paused'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                        }`}
                      >
                        {cmp.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(cmp.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[10px] transition"
                      >
                        {cmp.status === 'Active' ? 'Pause' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE CAMPAIGN MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Megaphone className="w-6 h-6 text-amber-400" /> Launch Sponsored Campaign
              </h2>
              <p className="text-xs text-slate-400">Reach over 150,000 naval architects, marine engineers, and shipowners.</p>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={newCmpName}
                  onChange={(e) => setNewCmpName(e.target.value)}
                  placeholder="e.g. Kongsberg Maritime"
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Category</label>
                <select
                  value={newCmpCategory}
                  onChange={(e) => setNewCmpCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                >
                  {categories.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Campaign Headline</label>
                <input
                  type="text"
                  required
                  value={newCmpHeadline}
                  onChange={(e) => setNewCmpHeadline(e.target.value)}
                  placeholder="e.g. Autonomous Navigation & Dynamic Positioning 3 Systems"
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Placement Zone</label>
                <select
                  value={newCmpZone}
                  onChange={(e) => setNewCmpZone(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Search Top Banner">Search Top Banner ($15 CPM)</option>
                  <option value="Directory Spotlight">Directory Spotlight ($1.80 CPC)</option>
                  <option value="Tool Sidebar">Tool Sidebar ($12 CPM)</option>
                  <option value="Marketplace Top">Marketplace Top ($2.20 CPC)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Daily Budget ($ USD)</label>
                <input
                  type="number"
                  min="50"
                  max="5000"
                  value={newCmpBudget}
                  onChange={(e) => setNewCmpBudget(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
