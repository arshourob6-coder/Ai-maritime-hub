import React, { useState } from 'react';
import { ViewMode, PlanType, Currency } from '../types';
import {
  Bot,
  Ship,
  Calculator,
  Compass,
  BookOpen,
  GraduationCap,
  FileCode2,
  Store,
  Briefcase,
  Users,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Zap,
  Activity,
  Layers,
  FileText,
  Globe,
  Anchor,
  Flame,
  Award,
  BookMarked,
  Cpu,
  RefreshCw,
  FolderLock,
  Download,
  Share2,
  ExternalLink,
  MessageSquare,
  Play
} from 'lucide-react';

interface UnifiedSaaSHubViewProps {
  hubId:
    | 'home'
    | 'ai_copilot'
    | 'engineering_tools'
    | 'simulation_center'
    | 'knowledge_hub'
    | 'learning_academy'
    | 'research_lab'
    | 'marketplace'
    | 'maritime_industry'
    | 'community'
    | 'dashboard';
  userPlan?: PlanType;
  currentPlan?: PlanType;
  currency?: Currency;
  onNavigateView?: (view: ViewMode) => void;
  onNavigate?: (view: ViewMode) => void;
  onOpenPricing?: (plan?: any) => void;
  isDarkMode?: boolean;
}

export const UnifiedSaaSHubView: React.FC<UnifiedSaaSHubViewProps> = ({
  hubId,
  userPlan = 'student',
  currentPlan,
  currency = 'USD',
  onNavigateView,
  onNavigate,
  onOpenPricing,
  isDarkMode = true,
}) => {
  const activePlan = currentPlan || userPlan;
  const navigate = onNavigateView || onNavigate || (() => {});
  // Hub Metadata & Config
  const hubConfigs = {
    home: {
      title: 'AI Maritime OS & Ecosystem',
      subtitle: 'The intelligent operating system for global naval architects, marine engineers & shipping executives.',
      badge: 'Main Hub',
      icon: <Globe className="w-6 h-6 text-sky-400" />,
      subTabs: [
        { id: 'overview', label: 'Hub Overview', count: '100+ Tools' },
        { id: 'featured_tools', label: 'Featured Tools', count: '18 Active' },
        { id: 'latest_news', label: 'Latest News', count: 'Real-time' },
        { id: 'trending_research', label: 'Trending Research', count: '450 Papers' },
        { id: 'community_highlights', label: 'Community Highlights', count: '14.2k Members' },
        { id: 'subscription_cta', label: 'SaaS Tiers & Upgrades', count: '5 Plans' }
      ]
    },
    ai_copilot: {
      title: 'Maritime AI Copilot Suite',
      subtitle: 'Multi-model naval engineering AI powered by Gemini 3.6 Pro, OpenFOAM CFD kernels & IMO regulatory embeddings.',
      badge: 'AI Core v4.2',
      icon: <Bot className="w-6 h-6 text-cyan-400" />,
      subTabs: [
        { id: 'maritime_search', label: 'AI Maritime Search Engine (Google for Maritime)', count: '145k+ Docs' },
        { id: 'ai_chat', label: 'AI Chat (Naval Arch)', count: '5 Models' },
        { id: 'maritime_ai_agents', label: 'Maritime AI Agents', count: '12 Agents' },
        { id: 'doc_analysis', label: 'Document & GA Analysis', count: 'PDF / DXF' },
        { id: 'engineering_assistant', label: 'Engineering Assistant', count: 'Physics-AI' },
        { id: 'research_assistant', label: 'Research Assistant', count: 'Citations' },
        { id: 'report_generator', label: 'Report & Survey Generator', count: 'Class Standard' },
        { id: 'ai_history', label: 'AI Prompt & Query History', count: 'Encrypted' }
      ]
    },
    engineering_tools: {
      title: 'Naval Architecture & Engineering Tools',
      subtitle: 'Integrated hydrostatic solvers, Holtrop powering lines, OpenFOAM CFD, and DNV/ABS structural code checks.',
      badge: '100+ Calculators',
      icon: <Calculator className="w-6 h-6 text-indigo-400" />,
      subTabs: [
        { id: 'ship_design', label: 'Ship Design (3D)', count: 'WebGL Studio' },
        { id: 'hydrostatics', label: 'Hydrostatics & Curves', count: 'Simpson Solver' },
        { id: 'resistance_power', label: 'Resistance & Powering', count: 'Holtrop / ITTC' },
        { id: 'propulsion', label: 'Propulsion & Blade FEA', count: 'B-Series' },
        { id: 'stability', label: 'Intact & Damage Stability', count: 'GZ / IMO Res A.749' },
        { id: 'structural_design', label: 'Structural Design & FEA', count: 'DNV-RU-SHIP' },
        { id: 'offshore_eng', label: 'Offshore & Wind Floating', count: 'Mooring / OWT' },
        { id: 'marine_machinery', label: 'Marine Machinery & SFOC', count: '2-Stroke / Dual' },
        { id: 'ship_recycling', label: 'Ship Recycling (HKC 2025)', count: 'IHM Part I' },
        { id: 'environmental_analysis', label: 'Environmental & CII', count: 'MEPC 82' },
        { id: 'engineering_calculators', label: 'Engineering Calculators', count: '100+ Formulas' }
      ]
    },
    simulation_center: {
      title: 'Maritime Simulation Center',
      subtitle: 'Physics-based multi-station simulators for bridge navigation, engine room SCADA, stability, and digital twins.',
      badge: 'STCW Compliant',
      icon: <Compass className="w-6 h-6 text-emerald-400" />,
      subTabs: [
        { id: 'ship_simulator', label: 'Ship Dynamics Simulator', count: '6-DOF Motion' },
        { id: 'bridge_simulator', label: 'Full Mission Bridge', count: 'COLREGs 3D' },
        { id: 'engine_room_simulator', label: 'Engine Room & Auxiliaries', count: 'MAN B&W 6S50ME' },
        { id: 'stability_simulator', label: 'Dynamic Stability Simulator', count: 'Parametric Roll' },
        { id: 'cargo_simulator', label: 'Cargo & Ballast Simulator', count: 'Tanker / Bulker' },
        { id: 'port_operations_simulator', label: 'Port Operations & Crane', count: 'TEU Dispatch' },
        { id: 'offshore_platform_simulator', label: 'Offshore Platform Simulator', count: 'FPSO / Semi-Sub' },
        { id: 'digital_twin', label: 'Vessel Digital Twin & IoT', count: 'Live SCADA' },
        { id: 'vr_ar_training', label: 'VR/AR Immersive Training', count: 'Spatial Audio' }
      ]
    },
    knowledge_hub: {
      title: 'Maritime Knowledge & Regulatory Hub',
      subtitle: 'Exhaustive repository of maritime textbooks, IMO conventions, classification rules, and formula databases.',
      badge: '10,000+ Records',
      icon: <BookOpen className="w-6 h-6 text-amber-400" />,
      subTabs: [
        { id: 'digital_library', label: 'Digital Library', count: '10k+ Volumes' },
        { id: 'research_papers', label: 'Peer-Reviewed Research', count: 'IEEE / SNAME' },
        { id: 'imo_regulations', label: 'IMO Regulations (SOLAS/MARPOL)', count: 'Full Text' },
        { id: 'class_rules', label: 'Class Society Rules', count: 'DNV/ABS/LR/BV' },
        { id: 'engineering_standards', label: 'Engineering Standards', count: 'ISO / IACS' },
        { id: 'thesis_repository', label: 'Naval Arch Thesis Archive', count: '1,200+ MSc/PhD' },
        { id: 'video_learning', label: 'Video Lecture Series', count: '4K Lectures' },
        { id: 'formula_database', label: 'Formula & Equation Database', count: '500+ Derivations' }
      ]
    },
    learning_academy: {
      title: 'Maritime Learning Academy & Certifications',
      subtitle: 'Professional maritime accredited courses, STCW certifications, AI tutor interactive guidance, and career pathways.',
      badge: 'Accredited',
      icon: <GraduationCap className="w-6 h-6 text-purple-400" />,
      subTabs: [
        { id: 'courses', label: 'Accredited Courses', count: '48 Courses' },
        { id: 'certifications', label: 'Class & CPD Certifications', count: 'Blockchain QR' },
        { id: 'learning_paths', label: 'Curated Learning Paths', count: 'Cadet to Chief' },
        { id: 'quizzes', label: 'Knowledge Quizzes & Exams', count: '1,500+ MCQs' },
        { id: 'ai_tutor', label: 'Interactive AI Tutor', count: '24/7 Voice/Text' },
        { id: 'student_progress', label: 'Student Progress & Badges', count: 'LMS Sync' },
        { id: 'instructor_dashboard', label: 'Instructor & University Portal', count: 'Faculty CMS' }
      ]
    },
    research_lab: {
      title: 'AI Maritime Research Lab',
      subtitle: 'Advanced academic workbench for literature reviews, computational hydrodynamics, citation management, and paper drafting.',
      badge: 'Academic Pro',
      icon: <FileCode2 className="w-6 h-6 text-pink-400" />,
      subTabs: [
        { id: 'literature_review', label: 'AI Literature Review', count: 'Cross-Ref Scopus' },
        { id: 'thesis_assistant', label: 'Thesis & Paper Assistant', count: 'LaTeX / Word' },
        { id: 'journal_finder', label: 'Journal & Conference Finder', count: 'Impact Factors' },
        { id: 'data_analysis', label: 'Hydrodynamic Data Analysis', count: 'Python / D3' },
        { id: 'citation_manager', label: 'Citation Manager (BibTeX)', count: 'APA / IEEE' },
        { id: 'research_collaboration', label: 'Research Collaboration Room', count: 'Multi-User' }
      ]
    },
    marketplace: {
      title: 'Global Maritime Marketplace & Exchange',
      subtitle: 'Trade vetted AI agents, parametric CAD ship models, OpenFOAM CFD meshes, operational datasets, and engineering templates.',
      badge: 'Decentralized',
      icon: <Store className="w-6 h-6 text-teal-400" />,
      subTabs: [
        { id: 'ai_tools', label: 'AI Tools & Agents', count: '85 Listed' },
        { id: 'engineering_templates', label: 'Engineering Spreadsheets', count: '120 Sheets' },
        { id: 'cad_files', label: 'Parametric CAD & IGES/STEP', count: '340 Models' },
        { id: 'reports', label: 'Technical Whitepapers & Reports', count: 'Market Data' },
        { id: 'datasets', label: 'Maritime Datasets (AIS/Sea State)', count: 'Open Data' },
        { id: 'courses_mkt', label: 'Specialist Masterclasses', count: 'Self-Paced' },
        { id: 'software', label: 'Naval Arch Software Addons', count: 'Rhino / Maxsurf' },
        { id: 'seller_dashboard', label: 'Merchant & Creator Console', count: 'Stripe Payouts' }
      ]
    },
    maritime_industry: {
      title: 'Maritime Industry & Commercial Intelligence',
      subtitle: 'Live vessel valuations, global shipyard drydock slots, port logistics indices, Baltic Dry Index, and executive hiring.',
      badge: 'Live Intelligence',
      icon: <Briefcase className="w-6 h-6 text-blue-400" />,
      subTabs: [
        { id: 'jobs', label: 'Maritime Job Board', count: '850+ Openings' },
        { id: 'companies', label: 'Company Intelligence Index', count: '4,200 Shipowners' },
        { id: 'shipyards', label: 'Global Shipyard & Drydock Hub', count: '520 Yards' },
        { id: 'ports', label: 'Port Congestion & AIS Tracker', count: '180 Global Ports' },
        { id: 'shipping_intelligence', label: 'Shipping Intelligence & Routes', count: 'Live AIS' },
        { id: 'maritime_news', label: 'Maritime Daily News Briefing', count: 'Updated Hourly' },
        { id: 'market_analytics', label: 'Market Analytics & BDI Ticker', count: 'Freight Indices' }
      ]
    },
    community: {
      title: 'Global Maritime Engineering Community',
      subtitle: 'Connect with over 14,000 naval architects, marine superintendents, classification surveyors, and university student chapters.',
      badge: '14,200+ Engineers',
      icon: <Users className="w-6 h-6 text-lime-400" />,
      subTabs: [
        { id: 'forums', label: 'Technical Discussion Forums', count: '32 Categories' },
        { id: 'groups', label: 'Special Interest Groups (SIGs)', count: 'CFD, Decarb, MASS' },
        { id: 'events', label: 'Webinars & Global Conferences', count: 'SNAME / RINA' },
        { id: 'mentorship', label: 'Senior Engineer Mentorship', count: '1-on-1 Sessions' },
        { id: 'student_chapters', label: 'University Student Chapters', count: '65 Universities' },
        { id: 'discussions', label: 'Live Q&A Peer Review', count: 'Verified Answers' }
      ]
    },
    dashboard: {
      title: 'Executive User Workspace & Telemetry',
      subtitle: 'Your customized mission control with active projects, remaining AI tokens, saved vessel calculations, and certificates.',
      badge: 'Secure Workspace',
      icon: <LayoutDashboard className="w-6 h-6 text-rose-400" />,
      subTabs: [
        { id: 'recent_projects', label: 'Recent Projects', count: '6 Active' },
        { id: 'ai_usage', label: 'AI Usage & Token Telemetry', count: 'Real-time Quota' },
        { id: 'saved_files', label: 'Saved Files & Cloud Storage', count: '12.4 GB' },
        { id: 'my_courses', label: 'Enrolled Courses & Progress', count: '3 In Progress' },
        { id: 'purchases', label: 'Purchases & Invoices', count: 'Tax Compliant' },
        { id: 'certificates', label: 'Issued Certificates & Badges', count: '2 Verified' },
        { id: 'subscription_status', label: 'Subscription & Team Seats', count: currentPlan.toUpperCase() }
      ]
    }
  };

  const config = hubConfigs[hubId] || hubConfigs.home;
  const [selectedSubTab, setSelectedSubTab] = useState(config.subTabs[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  // Mapping sub-tab selections to target component views when clicked directly
  const handleLaunchDeepTool = (toolId: string) => {
    switch (toolId) {
      // AI Copilot sub-tabs
      case 'maritime_search':
        onNavigate('ai_maritime_search');
        break;
      case 'ai_chat':
        onNavigate('ai_chat');
        break;
      case 'maritime_ai_agents':
        onNavigate('maritime_super_app');
        break;
      case 'doc_analysis':
        onNavigate('report_gen');
        break;
      case 'engineering_assistant':
        onNavigate('calculators');
        break;
      case 'research_assistant':
        onNavigate('thesis_gen');
        break;
      case 'report_generator':
        onNavigate('report_gen');
        break;
      case 'ai_history':
        onNavigate('prompt_library');
        break;

      // Engineering Tools
      case 'ship_design':
        onNavigate('ship_design_studio');
        break;
      case 'hydrostatics':
        onNavigate('naval_arch_lab');
        break;
      case 'resistance_power':
        onNavigate('ship_resistance');
        break;
      case 'propulsion':
        onNavigate('propeller_design');
        break;
      case 'stability':
        onNavigate('naval_arch_lab');
        break;
      case 'structural_design':
        onNavigate('ship_structural');
        break;
      case 'offshore_eng':
        onNavigate('offshore_renewables');
        break;
      case 'marine_machinery':
        onNavigate('predictive_maint');
        break;
      case 'ship_recycling':
        onNavigate('environmental_hub');
        break;
      case 'environmental_analysis':
        onNavigate('carbon_emissions');
        break;
      case 'engineering_calculators':
        onNavigate('calculators');
        break;

      // Simulation Center
      case 'ship_simulator':
      case 'bridge_simulator':
      case 'engine_room_simulator':
      case 'stability_simulator':
      case 'cargo_simulator':
      case 'port_operations_simulator':
      case 'offshore_platform_simulator':
      case 'vr_ar_training':
        onNavigate('maritime_simulation_center');
        break;
      case 'digital_twin':
        onNavigate('digital_twin');
        break;

      // Knowledge Hub
      case 'digital_library':
        navigate('maritime_digital_library');
        break;
      case 'research_papers':
        navigate('digital_library');
        break;
      case 'imo_regulations':
        navigate('maritime_regulations');
        break;
      case 'class_rules':
        navigate('class_society');
        break;
      case 'engineering_standards':
        navigate('compliance');
        break;
      case 'thesis_repository':
        navigate('digital_library');
        break;
      case 'video_learning':
        navigate('video_learning');
        break;
      case 'formula_database':
        navigate('formula_library');
        break;

      // Learning Academy
      case 'courses':
      case 'learning_paths':
      case 'quizzes':
      case 'student_progress':
        navigate('learning');
        break;
      case 'certifications':
        navigate('certifications');
        break;
      case 'ai_tutor':
        navigate('ai_exam_prep');
        break;
      case 'instructor_dashboard':
        navigate('universities');
        break;

      // Research Lab
      case 'literature_review':
      case 'thesis_assistant':
      case 'journal_finder':
      case 'data_analysis':
      case 'citation_manager':
      case 'research_collaboration':
        onNavigate('ai_research_lab');
        break;

      // Marketplace
      case 'ai_tools':
        onNavigate('ai_marketplace');
        break;
      case 'engineering_templates':
      case 'cad_files':
      case 'reports':
      case 'datasets':
      case 'courses_mkt':
      case 'software':
      case 'seller_dashboard':
        onNavigate('marketplace');
        break;

      // Maritime Industry
      case 'jobs':
        onNavigate('jobs');
        break;
      case 'companies':
        onNavigate('company_intelligence');
        break;
      case 'shipyards':
        onNavigate('shipyard_mgmt');
        break;
      case 'ports':
        onNavigate('maritime_gis');
        break;
      case 'shipping_intelligence':
        onNavigate('ais_tracking');
        break;
      case 'maritime_news':
        onNavigate('newsletter');
        break;
      case 'market_analytics':
        onNavigate('maritime_finance');
        break;

      // Community
      case 'forums':
      case 'groups':
      case 'discussions':
        onNavigate('community');
        break;
      case 'events':
        onNavigate('maritime_events');
        break;
      case 'mentorship':
      case 'student_chapters':
        onNavigate('scholarships');
        break;

      // Dashboard
      case 'recent_projects':
      case 'ai_usage':
      case 'saved_files':
      case 'my_courses':
      case 'purchases':
      case 'certificates':
        onNavigate('dashboard');
        break;
      case 'subscription_status':
        navigate('dashboard');
        break;

      default:
        break;
    }
  };

  return (
    <div className="min-h-screen pb-20 text-slate-100">
      {/* Header Banner with Maritime Aesthetic */}
      <div className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/40 to-transparent backdrop-blur-md pt-6 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400 shadow-lg shadow-cyan-500/10 shrink-0">
                {config.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {config.title}
                  </h1>
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full">
                    {config.badge}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                  {config.subtitle}
                </p>
              </div>
            </div>

            {/* Quick Actions in Header */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('ai_chat')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
              >
                <Bot className="w-4 h-4" />
                Launch AI Copilot
              </button>
              <button
                onClick={onOpenPricing}
                className="flex items-center gap-2 px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-xs sm:text-sm font-medium rounded-xl transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* Sub-tab Navigation Bar (Horizontal Scrollable) */}
          <div className="mt-8 border-t border-slate-800/80 pt-4 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2">
              {config.subTabs.map((subTab) => {
                const isActive = selectedSubTab === subTab.id;
                return (
                  <button
                    key={subTab.id}
                    onClick={() => setSelectedSubTab(subTab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{subTab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-slate-950/20 text-slate-900 font-bold'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {subTab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Sub-tab Interactive Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Dynamic Sub-tab Panel Showcase */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Active Module
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                {config.subTabs.find((s) => s.id === selectedSubTab)?.label}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter tools in this module..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 w-48 sm:w-64"
                />
              </div>
              <button
                onClick={() => handleLaunchDeepTool(selectedSubTab)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 rounded-xl text-xs font-semibold transition-all"
              >
                <span>Full Screen Tool</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {config.subTabs.map((item) => (
              <div
                key={item.id}
                onClick={() => handleLaunchDeepTool(item.id)}
                className={`group relative p-5 rounded-xl border transition-all cursor-pointer ${
                  selectedSubTab === item.id
                    ? 'bg-slate-850 border-cyan-500/50 shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/30'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-850/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-slate-800/80 border border-slate-700/60 rounded-xl text-cyan-400 group-hover:text-cyan-300 group-hover:scale-105 transition-all">
                    {config.icon}
                  </div>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded-md">
                    {item.count}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mt-4 group-hover:text-cyan-300 transition-colors">
                  {item.label}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  Enterprise-grade maritime algorithmic module with live parameter inputs, DNV/IMO validation, and instant export.
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">Status: Ready</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
                    Launch Module <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Info & Guidelines for the selected sub-tab */}
          <div className="mt-8 p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-slate-300">
                All algorithms in <strong className="text-white">{config.title}</strong> are strictly benchmarked against IMO SOLAS, MARPOL MEPC 82, and Class Rules (DNV, ABS, Lloyd's Register).
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleLaunchDeepTool(selectedSubTab)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-xs font-semibold hover:opacity-90 shadow-md transition-all"
              >
                Open {config.subTabs.find((s) => s.id === selectedSubTab)?.label}
              </button>
            </div>
          </div>
        </div>

        {/* Global Operational Quick Links Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('ai_chat')}
            className="p-4 bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-800/40 hover:border-cyan-500/60 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
              <Bot className="w-4 h-4" />
              Ask AI Copilot
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time engineering consultation & stability inquiries.
            </p>
          </div>

          <div
            onClick={() => onNavigate('calculators')}
            className="p-4 bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-800/40 hover:border-indigo-500/60 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">
              <Calculator className="w-4 h-4" />
              100+ Calculators
            </div>
            <p className="text-xs text-slate-400 mt-1">
              EEDI, CII, Holtrop resistance, and hydrostatics solver.
            </p>
          </div>

          <div
            onClick={() => onNavigate('maritime_simulation_center')}
            className="p-4 bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-800/40 hover:border-emerald-500/60 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
              <Compass className="w-4 h-4" />
              3D Simulators
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Bridge, engine room & vessel dynamics 3D physics.
            </p>
          </div>

          <div
            onClick={() => onNavigate('saas_billing')}
            className="p-4 bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-800/40 hover:border-purple-500/60 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              SaaS Subscriptions
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Manage enterprise tokens, seats & international invoices.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
