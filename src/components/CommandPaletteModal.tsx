import React, { useState, useEffect, useRef } from 'react';
import { ViewMode, PlanType } from '../types';
import {
  Search,
  Bot,
  Ship,
  Calculator,
  Compass,
  FileCode2,
  GraduationCap,
  Store,
  Briefcase,
  Users,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  X,
  BookOpen,
  Activity,
  Layers,
  Zap,
  Globe,
  Anchor,
  ShieldAlert,
  Settings,
  CreditCard,
  Flame,
  FileText,
  Newspaper
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode) => void;
  onOpenPricing?: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Hubs' | 'AI Tools' | 'Engineering' | 'Simulators' | 'Knowledge' | 'Academy' | 'Industry' | 'Account';
  view: ViewMode;
  icon: React.ReactNode;
  badge?: string;
  shortcut?: string;
  description: string;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenPricing
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandItems: CommandItem[] = [
    // 11 Main Hubs
    { id: 'hub_home', title: 'Home Hub', category: 'Hubs', view: 'landing', icon: <Globe className="w-4 h-4 text-sky-400" />, description: 'Overview, featured tools, news & trends' },
    { id: 'hub_copilot', title: 'AI Copilot Suite', category: 'Hubs', view: 'ai_copilot', icon: <Bot className="w-4 h-4 text-cyan-400" />, badge: 'AI Pro', description: 'Chat, agents, doc analysis, engineering assistant' },
    { id: 'hub_eng', title: 'Engineering Tools Hub', category: 'Hubs', view: 'engineering_tools', icon: <Calculator className="w-4 h-4 text-indigo-400" />, description: 'Ship design, hydrostatics, CFD, stability' },
    { id: 'hub_sim', title: 'Simulation Center', category: 'Hubs', view: 'simulation_center', icon: <Compass className="w-4 h-4 text-emerald-400" />, badge: '3D/VR', description: 'Bridge, engine room, stability, cargo simulators' },
    { id: 'hub_know', title: 'Knowledge Hub', category: 'Hubs', view: 'knowledge_hub', icon: <BookOpen className="w-4 h-4 text-amber-400" />, description: 'Digital library, IMO regulations, class rules, standards' },
    { id: 'hub_acad', title: 'Learning Academy', category: 'Hubs', view: 'learning_academy', icon: <GraduationCap className="w-4 h-4 text-purple-400" />, description: 'Courses, certifications, learning paths, AI tutor' },
    { id: 'hub_res', title: 'Research Lab', category: 'Hubs', view: 'research_lab', icon: <FileCode2 className="w-4 h-4 text-pink-400" />, description: 'Thesis assistant, literature review, journal finder' },
    { id: 'hub_mkt', title: 'Marketplace', category: 'Hubs', view: 'marketplace', icon: <Store className="w-4 h-4 text-teal-400" />, description: 'AI tools, CAD models, datasets, engineering templates' },
    { id: 'hub_ind', title: 'Maritime Industry Hub', category: 'Hubs', view: 'maritime_industry', icon: <Briefcase className="w-4 h-4 text-blue-400" />, description: 'Jobs, shipyards, ports, market intelligence' },
    { id: 'hub_comm', title: 'Community & Groups', category: 'Hubs', view: 'community', icon: <Users className="w-4 h-4 text-lime-400" />, description: 'Forums, peer review, student chapters, mentorship' },
    { id: 'hub_dash', title: 'User Dashboard', category: 'Hubs', view: 'dashboard', icon: <LayoutDashboard className="w-4 h-4 text-rose-400" />, description: 'Projects, AI usage, saved files, subscription' },

    // Top AI Tools
    { id: 'tool_doc_hub', title: 'Document Converter & Document Processing Hub', category: 'AI Tools', view: 'document_hub', icon: <FileText className="w-4 h-4 text-emerald-400" />, badge: '20+ Tools', description: 'PDF to Word/Excel/PPT, OCR, AI Summarizer, Thesis formatting & IMO processor' },
    { id: 'tool_agent_marketplace', title: 'Maritime AI Agent Marketplace & Store', category: 'AI Tools', view: 'ai_agent_marketplace', icon: <Bot className="w-4 h-4 text-violet-400" />, badge: 'App Store', description: 'Discover, create, customize, and monetize 2,400+ specialized maritime AI agents' },
    { id: 'tool_news_intelligence', title: 'AI Maritime News & Intelligence Platform', category: 'AI Tools', view: 'maritime_news_intelligence', icon: <Newspaper className="w-4 h-4 text-emerald-400" />, badge: 'Bloomberg+AI', description: 'Real-time global shipping wire, IMO regulations, BDI freight indices, and AI analyst memos' },
    { id: 'tool_maritime_search', title: 'AI Maritime Search Engine (Google for Maritime)', category: 'AI Tools', view: 'ai_maritime_search', icon: <Search className="w-4 h-4 text-cyan-400" />, badge: 'Flagship Search', description: 'Semantic search across IMO, DNV, SNAME, 3D CADs, calculators & datasets' },
    { id: 'tool_chat', title: 'AI Maritime Copilot Chat', category: 'AI Tools', view: 'ai_chat', icon: <Bot className="w-4 h-4 text-cyan-400" />, badge: 'Top Used', description: 'Real-time multi-model naval engineering conversation' },
    { id: 'tool_thesis', title: 'AI Thesis & Paper Generator', category: 'AI Tools', view: 'thesis_gen', icon: <FileCode2 className="w-4 h-4 text-purple-400" />, description: 'Write literature reviews, APA/IEEE citations & equations' },
    { id: 'tool_report', title: 'AI Survey & Report Generator', category: 'AI Tools', view: 'report_gen', icon: <FileText className="w-4 h-4 text-amber-400" />, description: 'Automated Class, IHM, and damage survey reports' },
    { id: 'tool_prompts', title: '100 AI Maritime Prompt Library', category: 'AI Tools', view: 'prompt_library', icon: <Sparkles className="w-4 h-4 text-sky-400" />, description: 'Pre-engineered prompts for naval architecture & operations' },
    { id: 'tool_translator', title: 'Maritime Technical Translator', category: 'AI Tools', view: 'ai_translator', icon: <Globe className="w-4 h-4 text-emerald-400" />, description: '50+ languages with maritime terminology index' },

    // Top Engineering Tools
    { id: 'eng_3d', title: '3D Ship Design Studio', category: 'Engineering', view: 'ship_design_studio', icon: <Ship className="w-4 h-4 text-sky-400" />, badge: '3D WebGL', description: 'Interactive hull parametric modeler & lines plan' },
    { id: 'eng_hydro', title: 'Naval Architecture Lab', category: 'Engineering', view: 'naval_arch_lab', icon: <Compass className="w-4 h-4 text-indigo-400" />, description: 'Hydrostatic curves, GZ stability, Bonjean curves' },
    { id: 'eng_cfd', title: 'CFD Hydrodynamics Solver', category: 'Engineering', view: 'cfd_hub', icon: <Activity className="w-4 h-4 text-cyan-400" />, description: 'OpenFOAM wave-making drag & pressure contour analysis' },
    { id: 'eng_res', title: 'Ship Resistance & Powering', category: 'Engineering', view: 'ship_resistance', icon: <Calculator className="w-4 h-4 text-amber-400" />, description: 'Holtrop-Mennen, ITTC 1957 line, Admiralty coefficient' },
    { id: 'eng_prop', title: 'Propeller & Blade Design', category: 'Engineering', view: 'propeller_design', icon: <Layers className="w-4 h-4 text-emerald-400" />, description: 'Wageningen B-Series cavitation & pitch optimization' },
    { id: 'eng_struct', title: 'Structural Analysis & FEA', category: 'Engineering', view: 'ship_structural', icon: <ShieldAlert className="w-4 h-4 text-rose-400" />, description: 'Midship section modulus & DNV rule scantlings' },
    { id: 'eng_calc', title: 'Calculators Hub (100+ formulas)', category: 'Engineering', view: 'calculators', icon: <Calculator className="w-4 h-4 text-teal-400" />, description: 'EEDI, CII, hydrostatics, bollard pull, GM fluid' },

    // Simulation Center
    { id: 'sim_all', title: 'Maritime Simulation Center', category: 'Simulators', view: 'maritime_simulation_center', icon: <Compass className="w-4 h-4 text-emerald-400" />, description: 'Bridge, engine room, dynamic stability, cargo loading' },
    { id: 'sim_twin', title: 'Vessel Digital Twin & IoT', category: 'Simulators', view: 'digital_twin', icon: <Zap className="w-4 h-4 text-cyan-400" />, description: 'Live engine telemetry, vibration SCADA, fuel consumption' },
    { id: 'sim_mass', title: 'Autonomous Vessel (MASS 3)', category: 'Simulators', view: 'autonomous_vessel_hub', icon: <Ship className="w-4 h-4 text-blue-400" />, description: 'COLREGs compliant route neural obstacle avoidance' },

    // Knowledge & Learning
    { id: 'know_lib', title: 'Digital Library & Research Repository', category: 'Knowledge', view: 'maritime_digital_library', icon: <BookOpen className="w-4 h-4 text-amber-400" />, description: '10,000+ maritime textbooks, papers, rules & manuals' },
    { id: 'know_regs', title: 'IMO & Class Regulations Search', category: 'Knowledge', view: 'maritime_regulations', icon: <ShieldAlert className="w-4 h-4 text-sky-400" />, description: 'SOLAS, MARPOL, MLC 2006, HKC 2025, DNV, ABS, LR' },
    { id: 'acad_hub', title: 'Maritime Learning Academy', category: 'Academy', view: 'learning', icon: <GraduationCap className="w-4 h-4 text-purple-400" />, description: 'STCW, naval architecture courses, quizzes, and certificates' },
    { id: 'acad_video', title: 'AI Video Masterclasses', category: 'Academy', view: 'video_learning', icon: <Sparkles className="w-4 h-4 text-pink-400" />, description: 'High-definition technical engineering lectures & 3D demos' },

    // Industry & Monetization
    { id: 'ind_jobs', title: 'Maritime Job Board & Careers', category: 'Industry', view: 'jobs', icon: <Briefcase className="w-4 h-4 text-blue-400" />, description: 'Worldwide shipyard, design office & offshore openings' },
    { id: 'ind_billing', title: 'SaaS Subscription & Billing', category: 'Account', view: 'saas_billing', icon: <CreditCard className="w-4 h-4 text-emerald-400" />, badge: 'Manage', description: '5 Plans, token allowances, invoices & team seats' }
  ];

  const filteredItems = commandItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelectItem(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelectItem = (item: CommandItem) => {
    onNavigate(item.view);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md transition-all">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all 11 Hubs, tools, calculators, IMO rules, or courses..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base outline-none focus:ring-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded-md mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono font-medium text-slate-400 bg-slate-800 border border-slate-700 rounded">
            ESC
          </span>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-950/30 border-b border-slate-800/60 overflow-x-auto text-xs scrollbar-none">
          <span className="text-slate-500 font-medium shrink-0">Quick Jumps:</span>
          {['Hubs', 'AI Tools', 'Engineering', 'Simulators', 'Knowledge', 'Academy', 'Industry'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchQuery(cat === 'Hubs' ? '' : cat)}
              className="px-2 py-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Compass className="w-10 h-10 mx-auto text-slate-600 mb-2 animate-spin" style={{ animationDuration: '8s' }} />
              <p className="text-sm font-medium text-slate-300">No maritime tools matching "{searchQuery}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "Ship Design", "Hydrostatics", "CFD", or "SOLAS"</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/60 to-slate-800 text-white border border-cyan-500/30 shadow-inner'
                      : 'hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-100 truncate">{item.title}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded">
                            {item.badge}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center text-xs text-cyan-400 font-medium">
                        Open <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">↑↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">↵</kbd> to select</span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">esc</kbd> to close</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">AI Maritime OS 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
