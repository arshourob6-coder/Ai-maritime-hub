import React, { useState, useEffect } from 'react';
import { ViewMode, PlanType, Currency } from '../types';
import { useLanguage, MARITIME_LANGUAGES } from '../lib/i18n';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NavbarGlobalSearchBar } from './NavbarGlobalSearchBar';
import { LanguageAccessibilityModal } from './LanguageAccessibilityModal';
import {
  Ship,
  Bot,
  Calculator,
  GraduationCap,
  Store,
  Briefcase,
  Users,
  LayoutDashboard,
  ShieldAlert,
  Moon,
  Sun,
  Menu,
  X,
  Compass,
  DollarSign,
  FileCode2,
  Sparkles,
  BookMarked,
  Mail,
  BookOpen,
  Search,
  Globe,
  FileSpreadsheet,
  CheckCircle2,
  Award,
  Bell,
  Newspaper,
  FileText
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userPlan: PlanType;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenPricing: () => void;
  onOpenAuthModal?: () => void;
  onSelectPromptForChat?: (promptText: string) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setView,
  isDarkMode,
  toggleDarkMode,
  userPlan,
  currency,
  setCurrency,
  onOpenPricing,
  onOpenAuthModal,
  onSelectPromptForChat,
  isLoggedIn = false,
  onLogout,
  onToggleSidebar,
}) => {
  const { currentLanguage, setLanguage, languageInfo, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Global shortcut to open search modal (Cmd/Ctrl + K or /)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName) &&
        !(e.target as HTMLElement)?.isContentEditable
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // The 11 Core Navigation Structure with Sub-Tabs
  const primaryNavigationHubs = [
    {
      id: 'home',
      title: 'Home',
      view: 'landing' as ViewMode,
      icon: <Ship className="w-4 h-4 text-sky-400" />,
      items: [
        { id: 'landing', label: 'AI Maritime Hub Overview', desc: 'Main ecosystem & platform command center', icon: <Ship className="w-4 h-4 text-sky-400" /> },
        { id: 'maritime_news_intelligence', label: 'AI News & Intelligence', desc: 'Bloomberg-grade real-time news & analyst engine', badge: 'LIVE', icon: <Newspaper className="w-4 h-4 text-cyan-400" /> },
        { id: 'ai_super_app', label: 'Featured AI Tools', desc: 'Top naval architecture & commercial tools', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
        { id: 'newsletter', label: 'Latest News & Dispatches', desc: 'Real-time global shipping & technology', icon: <Mail className="w-4 h-4 text-emerald-400" /> },
        { id: 'maritime_publishing_platform', label: 'Trending Research', desc: '450+ Peer-reviewed maritime papers', icon: <BookOpen className="w-4 h-4 text-indigo-400" /> },
        { id: 'community', label: 'Community Highlights', desc: '14,200+ Naval architects & students', icon: <Users className="w-4 h-4 text-purple-400" /> },
        { id: 'saas_billing', label: 'Subscription CTA & Tiers', desc: '5 Flexible plans with 14-day trial', badge: 'PRO', icon: <DollarSign className="w-4 h-4 text-emerald-400" /> }
      ]
    },
    {
      id: 'ai_copilot',
      title: 'AI Copilot',
      view: 'ai_copilot' as ViewMode,
      icon: <Bot className="w-4 h-4 text-cyan-400" />,
      items: [
        { id: 'document_hub', label: 'Document Converter & Hub', desc: '20+ format converter, OCR & AI summarizer suite', badge: 'POPULAR', icon: <FileText className="w-4 h-4 text-emerald-400" /> },
        { id: 'ai_agent_marketplace', label: 'AI Agent Marketplace', desc: 'Browse, build & monetize 2,400+ maritime AI agents', badge: 'STORE', icon: <Bot className="w-4 h-4 text-violet-400" /> },
        { id: 'ai_chat', label: 'AI Chat (Naval Arch)', desc: 'Multi-model naval engineering conversation', badge: 'PRO', icon: <Bot className="w-4 h-4 text-cyan-400" /> },
        { id: 'maritime_super_app', label: 'Maritime AI Super-App', desc: 'Pre-configured specialized tools & solvers', icon: <Sparkles className="w-4 h-4 text-blue-400" /> },
        { id: 'report_gen', label: 'Document & GA Analysis', desc: 'Automated survey, class & IHM audit', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> },
        { id: 'calculators', label: 'Engineering Assistant', desc: 'Instant hydrostatics & formulas', icon: <Calculator className="w-4 h-4 text-indigo-400" /> },
        { id: 'thesis_gen', label: 'Research Assistant', desc: 'Thesis outline & APA/IEEE citations', icon: <FileCode2 className="w-4 h-4 text-purple-400" /> },
        { id: 'report_gen', label: 'Report Generator', desc: 'Class survey & technical memos', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
        { id: 'prompt_library', label: 'AI Prompt History & Library', desc: '100 Pre-engineered prompts', icon: <BookMarked className="w-4 h-4 text-sky-400" /> }
      ]
    },
    {
      id: 'engineering_tools',
      title: 'Engineering Tools',
      view: 'engineering_tools' as ViewMode,
      icon: <Calculator className="w-4 h-4 text-indigo-400" />,
      items: [
        { id: 'ship_design_studio', label: 'Ship Design (3D)', desc: 'Parametric hull modeling & lines plan', badge: '3D', icon: <Ship className="w-4 h-4 text-sky-400" /> },
        { id: 'naval_arch_lab', label: 'Hydrostatics & Bonjean', desc: 'Section curves & Simpson integration', icon: <Compass className="w-4 h-4 text-cyan-400" /> },
        { id: 'ship_resistance', label: 'Resistance & Power', desc: 'Holtrop-Mennen & ITTC 1957 line', icon: <Calculator className="w-4 h-4 text-amber-400" /> },
        { id: 'propeller_design', label: 'Propulsion & Blade FEA', desc: 'B-Series cavitation & pitch optimization', icon: <Compass className="w-4 h-4 text-emerald-400" /> },
        { id: 'naval_arch_lab', label: 'Stability & GZ Curves', desc: 'IMO Res A.749 intact & damage check', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
        { id: 'ship_structural', label: 'Structural Design & FEA', desc: 'Midship section modulus & DNV rules', icon: <ShieldAlert className="w-4 h-4 text-indigo-400" /> },
        { id: 'offshore_renewables', label: 'Offshore Engineering', desc: 'Floating wind turbines & mooring', icon: <Sparkles className="w-4 h-4 text-blue-400" /> },
        { id: 'predictive_maint', label: 'Marine Machinery & SFOC', desc: '2-Stroke & Dual Fuel engine telemetry', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
        { id: 'environmental_hub', label: 'Ship Recycling (HKC 2025)', desc: 'IHM Part I HazMat generator & audit', icon: <Compass className="w-4 h-4 text-emerald-400" /> },
        { id: 'carbon_emissions', label: 'Environmental & CII Rating', desc: 'IMO MEPC 82 carbon intensity metrics', icon: <Sparkles className="w-4 h-4 text-teal-400" /> },
        { id: 'calculators', label: 'Engineering Calculators', desc: '100+ formulas with instant derivation', icon: <Calculator className="w-4 h-4 text-teal-400" /> }
      ]
    },
    {
      id: 'simulation_center',
      title: 'Simulation Center',
      view: 'simulation_center' as ViewMode,
      icon: <Compass className="w-4 h-4 text-emerald-400" />,
      items: [
        { id: 'maritime_simulation_center', label: 'Ship Simulator', desc: '6-DOF hydrodynamic motion simulator', badge: '3D', icon: <Ship className="w-4 h-4 text-sky-400" /> },
        { id: 'maritime_simulation_center', label: 'Bridge Simulator', desc: 'Full-mission bridge with COLREGs radar', icon: <Compass className="w-4 h-4 text-cyan-400" /> },
        { id: 'maritime_simulation_center', label: 'Engine Room Simulator', desc: 'MAN B&W 6S50ME SCADA console', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
        { id: 'maritime_simulation_center', label: 'Stability Simulator', desc: 'Dynamic parametric roll & flooding', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
        { id: 'cargo_planning', label: 'Cargo Simulator', desc: 'Bulk / Tanker stability & stress loading', icon: <FileSpreadsheet className="w-4 h-4 text-indigo-400" /> },
        { id: 'maritime_gis', label: 'Port Operations Simulator', desc: 'Quay crane scheduling & TEU dispatch', icon: <Globe className="w-4 h-4 text-emerald-400" /> },
        { id: 'offshore_wind_dashboard', label: 'Offshore Platform Simulator', desc: 'FPSO & semi-submersible motions', icon: <Sparkles className="w-4 h-4 text-blue-400" /> },
        { id: 'digital_twin', label: 'Digital Twin & IoT', desc: 'Real-time telemetry & predictive sensors', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
        { id: 'maritime_metaverse', label: 'VR/AR Training', desc: 'Spatial 3D inspection & safety drills', icon: <Sparkles className="w-4 h-4 text-purple-400" /> }
      ]
    },
    {
      id: 'knowledge_hub',
      title: 'Knowledge Hub',
      view: 'knowledge_hub' as ViewMode,
      icon: <BookOpen className="w-4 h-4 text-amber-400" />,
      items: [
        { id: 'maritime_digital_library', label: 'Digital Library', desc: '10,000+ textbooks, manuals & rulebooks', icon: <BookMarked className="w-4 h-4 text-sky-400" /> },
        { id: 'maritime_publishing_platform', label: 'Research Papers', desc: 'IEEE, SNAME & RINA peer-reviewed index', icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
        { id: 'maritime_regulations', label: 'IMO Regulations (SOLAS/MARPOL)', desc: 'Full-text queryable conventions & codes', icon: <ShieldAlert className="w-4 h-4 text-emerald-400" /> },
        { id: 'class_society', label: 'Class Rules', desc: 'DNV, ABS, Lloyd’s Register & BV rules', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
        { id: 'compliance', label: 'Engineering Standards', desc: 'ISO, IACS & ASTM marine standards', icon: <CheckCircle2 className="w-4 h-4 text-cyan-400" /> },
        { id: 'digital_library', label: 'Thesis Repository', desc: '1,200+ MSc & PhD naval arch dissertations', icon: <FileCode2 className="w-4 h-4 text-purple-400" /> },
        { id: 'video_learning', label: 'Video Learning', desc: '4K video technical engineering masterclasses', icon: <Sparkles className="w-4 h-4 text-pink-400" /> },
        { id: 'formula_library', label: 'Formula Database', desc: '500+ formulas with mathematical steps', icon: <Calculator className="w-4 h-4 text-teal-400" /> }
      ]
    },
    {
      id: 'learning_academy',
      title: 'Learning Academy',
      view: 'learning_academy' as ViewMode,
      icon: <GraduationCap className="w-4 h-4 text-purple-400" />,
      items: [
        { id: 'learning', label: 'Accredited Courses', desc: 'Naval architecture, STCW & hydrodynamics', icon: <GraduationCap className="w-4 h-4 text-purple-400" /> },
        { id: 'certifications', label: 'Certifications', desc: 'CPD accredited blockchain verify certificates', badge: 'QR Cert', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
        { id: 'ai_career_path_planner', label: 'Learning Paths', desc: 'Structured cadet to chief architect pathways', icon: <Compass className="w-4 h-4 text-cyan-400" /> },
        { id: 'ai_exam_prep', label: 'Quizzes & Exam Prep', desc: '1,500+ MCQs & Class surveyor mock tests', icon: <Calculator className="w-4 h-4 text-emerald-400" /> },
        { id: 'ai_chat', label: 'AI Tutor', desc: '24/7 interactive voice & text engineering coach', icon: <Bot className="w-4 h-4 text-blue-400" /> },
        { id: 'learning', label: 'Student Progress', desc: 'Progress rings, badges & LMS sync', icon: <Users className="w-4 h-4 text-pink-400" /> },
        { id: 'university_portal', label: 'Instructor Dashboard', desc: 'Faculty grading & course management', icon: <BookOpen className="w-4 h-4 text-indigo-400" /> }
      ]
    },
    {
      id: 'research_lab',
      title: 'Research Lab',
      view: 'research_lab' as ViewMode,
      icon: <FileCode2 className="w-4 h-4 text-pink-400" />,
      items: [
        { id: 'document_hub', label: 'Document & Thesis Converter', desc: 'Convert, OCR & format theses, papers & IMO docs', badge: 'AI DOCS', icon: <FileText className="w-4 h-4 text-cyan-400" /> },
        { id: 'thesis_gen', label: 'Literature Review', desc: 'Automated synthesis across 50,000+ papers', icon: <FileCode2 className="w-4 h-4 text-purple-400" /> },
        { id: 'thesis_gen', label: 'Thesis Assistant', desc: 'Full dissertation generator & LaTeX export', icon: <FileSpreadsheet className="w-4 h-4 text-pink-400" /> },
        { id: 'maritime_publishing_platform', label: 'Journal Finder', desc: 'Match manuscript to Ocean Engineering journals', icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
        { id: 'maritime_data_center', label: 'Data Analysis', desc: 'Hydrodynamic towing tank & CFD data tools', icon: <Calculator className="w-4 h-4 text-cyan-400" /> },
        { id: 'ai_research_lab', label: 'Citation Manager', desc: 'BibTeX, APA 7, IEEE & Chicago formatting', icon: <BookMarked className="w-4 h-4 text-emerald-400" /> },
        { id: 'collaboration_ws', label: 'Research Collaboration', desc: 'Multi-author paper drafts & shared notes', icon: <Users className="w-4 h-4 text-blue-400" /> }
      ]
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      view: 'marketplace' as ViewMode,
      icon: <Store className="w-4 h-4 text-teal-400" />,
      items: [
        { id: 'ai_agent_marketplace', label: 'AI Agent Store & Creator Studio', desc: 'Discover, deploy & monetize 2,400+ maritime AI agents', badge: 'NEW', icon: <Bot className="w-4 h-4 text-violet-400" /> },
        { id: 'marketplace', label: 'Engineering Templates', desc: 'Excel, Mathcad & Python calculation sheets', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> },
        { id: 'marketplace', label: 'CAD Files & 3D Hulls', desc: 'IGES, STEP, Rhino & Maxsurf geometries', icon: <Ship className="w-4 h-4 text-sky-400" /> },
        { id: 'marketplace', label: 'Reports & Whitepapers', desc: 'Decarbonization & market forecast studies', icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
        { id: 'dataset_marketplace', label: 'Maritime Datasets', desc: 'AIS vessel tracks, wave spectra & wind', icon: <FileCode2 className="w-4 h-4 text-indigo-400" /> },
        { id: 'marketplace', label: 'Courses & Masterclasses', desc: 'Specialist shipyard & FEA video series', icon: <GraduationCap className="w-4 h-4 text-purple-400" /> },
        { id: 'api_sdk', label: 'Software & Plugins', desc: 'Rhino plugins & OpenFOAM mesh generators', icon: <Sparkles className="w-4 h-4 text-blue-400" /> },
        { id: 'marketplace', label: 'Seller Dashboard', desc: 'Creator store with instant Stripe payouts', icon: <DollarSign className="w-4 h-4 text-emerald-400" /> }
      ]
    },
    {
      id: 'maritime_industry',
      title: 'Maritime Industry',
      view: 'maritime_industry' as ViewMode,
      icon: <Briefcase className="w-4 h-4 text-blue-400" />,
      items: [
        { id: 'maritime_news_intelligence', label: 'AI News & Intelligence', desc: 'Real-time global news, IMO regulations & market insights', badge: 'PRO', icon: <Newspaper className="w-4 h-4 text-cyan-400" /> },
        { id: 'jobs', label: 'Jobs & Careers', desc: 'Ship design, class society & offshore hiring', icon: <Briefcase className="w-4 h-4 text-blue-400" /> },
        { id: 'company_intelligence', label: 'Companies & Fleet Owners', desc: '4,200 Verified maritime enterprises', icon: <Users className="w-4 h-4 text-cyan-400" /> },
        { id: 'shipyard_mgmt', label: 'Shipyards & Drydocks', desc: 'Global drydock capacity & retrofit slots', icon: <Ship className="w-4 h-4 text-emerald-400" /> },
        { id: 'maritime_gis', label: 'Ports & Terminals', desc: 'Berth allocation & congestion heatmaps', icon: <Globe className="w-4 h-4 text-amber-400" /> },
        { id: 'ais_tracking', label: 'Shipping Intelligence', desc: 'Live AIS vessel routes & speed profiles', icon: <Compass className="w-4 h-4 text-sky-400" /> },
        { id: 'newsletter', label: 'Maritime Daily News', desc: 'Curated IMO MEPC, shipping & market updates', icon: <Mail className="w-4 h-4 text-purple-400" /> },
        { id: 'maritime_finance', label: 'Market Analytics & BDI', desc: 'Baltic Dry Index & bunker fuel pricing', icon: <DollarSign className="w-4 h-4 text-emerald-400" /> }
      ]
    },
    {
      id: 'community',
      title: 'Community',
      view: 'community' as ViewMode,
      icon: <Users className="w-4 h-4 text-lime-400" />,
      items: [
        { id: 'community', label: 'Forums & Q&A', desc: '32 Technical engineering categories', icon: <Users className="w-4 h-4 text-lime-400" /> },
        { id: 'community', label: 'Special Interest Groups', desc: 'CFD, Decarbonization, Wind, Hydrofoils', icon: <Compass className="w-4 h-4 text-cyan-400" /> },
        { id: 'maritime_events', label: 'Events & Conferences', desc: 'SNAME, RINA & Posidonia meetups', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
        { id: 'scholarships', label: 'Mentorship Network', desc: '1-on-1 guidance with Chief Engineers', icon: <GraduationCap className="w-4 h-4 text-purple-400" /> },
        { id: 'scholarships', label: 'Student Chapters', desc: '65 Global maritime university branches', icon: <BookOpen className="w-4 h-4 text-indigo-400" /> },
        { id: 'community', label: 'Discussions & Peer Review', desc: 'Verify calculations & technical review', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> }
      ]
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      view: 'dashboard' as ViewMode,
      icon: <LayoutDashboard className="w-4 h-4 text-rose-400" />,
      items: [
        { id: 'dashboard', label: 'Recent Projects', desc: 'Active hull CFD & stability projects', icon: <Ship className="w-4 h-4 text-sky-400" /> },
        { id: 'dashboard', label: 'AI Usage & Token Telemetry', desc: 'Monthly quota & model analytics', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
        { id: 'maritime_digital_library', label: 'Saved Files & Cloud Storage', desc: '12.4 GB Encrypted CAD/mesh storage', icon: <BookMarked className="w-4 h-4 text-amber-400" /> },
        { id: 'learning', label: 'My Enrolled Courses', desc: 'Course progress & video bookmarks', icon: <GraduationCap className="w-4 h-4 text-purple-400" /> },
        { id: 'saas_billing', label: 'Purchases & Invoices', desc: 'Stripe/PayPal tax receipts & records', icon: <DollarSign className="w-4 h-4 text-emerald-400" /> },
        { id: 'certifications', label: 'Issued Certificates', desc: 'Verified CPD credentials & badges', icon: <Award className="w-4 h-4 text-blue-400" /> },
        { id: 'saas_billing', label: 'Subscription Status', desc: 'Manage 5 SaaS tiers & team seats', badge: 'Active', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> }
      ]
    }
  ];

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-950/90 border-slate-800/80 text-white' 
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-3">
        
        {/* Left: Sidebar Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className={`p-2 rounded-xl border transition hidden md:flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-500/40 hover:bg-slate-800' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-sky-600 hover:bg-slate-200'
              }`}
              title="Toggle Workspace Sidebar (Navigation & Telemetry)"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          <div 
            onClick={() => setView('landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Ship className="w-4.5 h-4.5 text-sky-400 group-hover:rotate-6 transition" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
                  AI MARITIME
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  HUB
                </span>
              </div>
              <p className="text-[9px] text-slate-400 -mt-0.5 font-medium hidden sm:block">
                Global Maritime OS & AI Copilot Pro
              </p>
            </div>
          </div>
        </div>

        {/* Center: Desktop Categorized 11-Hub Navigation */}
        <nav className="hidden 2xl:flex items-center gap-1 relative overflow-x-auto py-1 scrollbar-none">
          {primaryNavigationHubs.map((cat) => {
            const isOpen = activeDropdown === cat.id;
            const isCategoryActive = currentView === cat.view || cat.items.some((item) => item.id === currentView);

            return (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => {
                    setView(cat.view);
                    setActiveDropdown(null);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    isCategoryActive
                      ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm'
                      : isOpen
                      ? 'bg-slate-800 text-white'
                      : isDarkMode
                      ? 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.title}</span>
                  <span className="text-[9px] opacity-50">▾</span>
                </button>

                {/* Floating Dropdown Card */}
                {isOpen && (
                  <div className="absolute left-0 top-full pt-1.5 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-2 text-xs space-y-1">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          {cat.icon}
                          {cat.title} Hub
                        </span>
                        <button
                          onClick={() => {
                            setView(cat.view);
                            setActiveDropdown(null);
                          }}
                          className="text-[9px] bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 px-1.5 py-0.5 rounded font-medium transition"
                        >
                          Open Hub →
                        </button>
                      </div>

                      <div className="space-y-0.5 pt-1 max-h-80 overflow-y-auto">
                        {cat.items.map((item, idx) => {
                          const isActive = currentView === item.id;
                          return (
                            <button
                              key={`${item.id}_${idx}`}
                              onClick={() => {
                                setView(item.id as ViewMode);
                                setActiveDropdown(null);
                              }}
                              className={`w-full text-left p-2 rounded-xl transition flex items-start gap-2.5 ${
                                isActive
                                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                  : 'hover:bg-slate-800/80 text-slate-200'
                              }`}
                            >
                              <div className="p-1 rounded-lg bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-bold text-xs truncate">{item.label}</span>
                                  {item.badge && (
                                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Controls & Quick Actions */}
        <div className="flex items-center gap-2">
          
          {/* AI Copilot Highlighted Quick Action */}
          <button
            onClick={() => setView('ai_chat')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500/20 via-cyan-500/20 to-blue-500/20 hover:from-sky-500/30 hover:to-blue-500/30 border border-sky-400/40 text-sky-300 text-xs font-bold transition shadow-sm"
            title="Open AI Maritime Copilot Pro (Multi-Model Naval Architecture Assistant)"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden lg:inline">AI Copilot Pro</span>
          </button>

          {/* Global Search Bar in Navbar */}
          <NavbarGlobalSearchBar
            onNavigateView={setView}
            onSelectPromptForChat={onSelectPromptForChat}
            isDarkMode={isDarkMode}
            onOpenModal={() => setSearchOpen(true)}
          />

          {/* Search Trigger Shortcut Button (Ctrl+K) */}
          <button
            onClick={() => setSearchOpen(true)}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
              isDarkMode
                ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-sky-300 hover:border-sky-500/40'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title="Search Platform (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-sky-400" />
            <kbd className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1 py-0.5 rounded border border-slate-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Notifications Center */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`p-2 rounded-xl border transition relative ${
                isDarkMode
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Notifications Center"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-sky-400" />
                    Maritime Alerts
                  </span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-mono font-bold">
                    3 New
                  </span>
                </div>
                <div className="space-y-1.5 max-h-72 overflow-y-auto">
                  <div 
                    onClick={() => { setView('environmental_hub'); setNotificationsOpen(false); }}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sky-300 text-[11px]">IMO MEPC 82 Rule Update</span>
                      <span className="text-[9px] text-slate-500">10m ago</span>
                    </div>
                    <p className="text-[10px] text-slate-400">New CII carbon intensity calculation guidelines effective from Q1 2026.</p>
                  </div>
                  <div 
                    onClick={() => { setView('ai_chat'); setNotificationsOpen(false); }}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-300 text-[11px]">CFD Mesh Ready</span>
                      <span className="text-[9px] text-slate-500">1h ago</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Hull hydrodynamics mesh calculation completed with 0.02% error margin.</p>
                  </div>
                  <div 
                    onClick={() => { setView('certifications'); setNotificationsOpen(false); }}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-amber-300 text-[11px]">CPD Certificate Issued</span>
                      <span className="text-[9px] text-slate-500">4h ago</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Your Naval Architecture Hydrostatics certification is ready to download.</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 text-center">
                  <button 
                    onClick={() => { setView('dashboard'); setNotificationsOpen(false); }}
                    className="text-[10px] font-bold text-sky-400 hover:text-sky-300 transition"
                  >
                    View All in Dashboard →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Language Selector Dropdown */}
          <div className="hidden lg:flex items-center gap-1">
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value)}
              className={`text-xs font-bold rounded-xl px-2 py-1.5 border transition cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-700 text-sky-400 hover:border-sky-500/50'
                  : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
              title="Toggle App Language"
            >
              {MARITIME_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>

            <button
              onClick={() => setLangModalOpen(true)}
              className={`p-2 rounded-xl border transition flex items-center gap-1 text-xs font-semibold ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-700 text-sky-400 hover:border-sky-500/50 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
              title="50+ Languages & WCAG Accessibility"
            >
              <Globe className="w-4 h-4 text-sky-400" />
            </button>
          </div>

          {/* Currency Dropdown */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className={`hidden xl:block text-xs font-semibold rounded-xl px-2 py-1.5 border transition cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900 border-slate-700 text-sky-300 hover:border-sky-500/50'
                : 'bg-slate-100 border-slate-300 text-slate-800'
            }`}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="NOK">NOK (kr)</option>
            <option value="SGD">SGD ($)</option>
            <option value="BDT">BDT (৳)</option>
            <option value="JPY">JPY (¥)</option>
          </select>

          {/* Subscription Plan Badge / Upgrade Trigger */}
          <button
            onClick={onOpenPricing}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
              userPlan === 'enterprise'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                : userPlan === 'professional'
                ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white'
                : userPlan === 'student'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span className="capitalize">{userPlan}</span>
          </button>

          {/* Account & SSO Auth Trigger */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenAuthModal}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700"
                title="Sign In"
              >
                Sign In
              </button>
              <button
                onClick={onOpenAuthModal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 transition shadow-md shadow-sky-500/20"
                title="Create Account"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setView('dashboard')}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-extrabold bg-sky-500/20 text-sky-300 border border-sky-400/30 hover:bg-sky-500/30 transition"
                title="Open User Dashboard"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 text-slate-950 font-black text-[10px] flex items-center justify-center">
                  NA
                </div>
                <span className="hidden md:inline">Dashboard</span>
              </button>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition hidden sm:block"
                  title="Sign Out"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-xl border transition ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="2xl:hidden p-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`xl:hidden border-b px-4 py-3 space-y-1 transition-all ${
          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* Quick Search Button in Mobile Drawer */}
          <button
            onClick={() => {
              setSearchOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30 mb-2"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-sky-400" />
              <span>Global Search...</span>
            </div>
            <span className="text-xs px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
              Fuse.js
            </span>
          </button>

          {/* Home Option */}
          <button
            onClick={() => {
              setView('landing');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold ${
              currentView === 'landing'
                ? 'bg-sky-500/20 text-sky-400'
                : isDarkMode
                ? 'text-slate-300 hover:bg-slate-900'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Ship className="w-4 h-4 text-sky-400" />
            <span>Home</span>
          </button>

          {/* Categorized Dropdown Accordions for Mobile */}
          {primaryNavigationHubs.map((cat) => {
            const isCategoryActive = cat.items.some((item) => item.id === currentView) || currentView === cat.id;
            const isExpanded = activeDropdown === `mobile_${cat.id}`;

            return (
              <div key={cat.id} className="space-y-1">
                <button
                  onClick={() => setActiveDropdown(isExpanded ? null : `mobile_${cat.id}`)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition ${
                    isCategoryActive
                      ? 'bg-sky-500/15 text-sky-400'
                      : isDarkMode
                      ? 'text-slate-300 hover:bg-slate-900'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {cat.icon}
                    <span>{cat.title}</span>
                  </div>
                  <span className="text-xs opacity-60">{isExpanded ? '▲' : '▼'}</span>
                </button>

                {isExpanded && (
                  <div className="pl-4 space-y-1 py-1 border-l-2 border-sky-500/30 ml-3">
                    <button
                      onClick={() => {
                        setView(cat.id as ViewMode);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-lg text-xs font-bold text-sky-400 hover:bg-sky-500/10 flex items-center gap-2 mb-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Open {cat.title} Hub</span>
                    </button>
                    {cat.items.map((item) => {
                      const isActive = currentView === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setView(item.id as ViewMode);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                            isActive
                              ? 'bg-sky-500/20 text-sky-300'
                              : 'text-slate-300 hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon}
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Global Fuzzy Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigateView={(view) => {
          setView(view);
          setSearchOpen(false);
        }}
        onSelectPromptForChat={onSelectPromptForChat}
        isDarkMode={isDarkMode}
      />

      {/* 50+ Languages & WCAG Accessibility Modal */}
      <LanguageAccessibilityModal
        isOpen={langModalOpen}
        onClose={() => setLangModalOpen(false)}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        isDarkMode={isDarkMode}
      />
    </header>
  );
};
