import React, { useState, useMemo, useEffect } from 'react';
import { ViewMode, PlanType, UserRole } from '../types';
import {
  LayoutDashboard,
  FolderGit2,
  Bot,
  Bookmark,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Ship,
  Calculator,
  Compass,
  BookOpen,
  GraduationCap,
  Store,
  Briefcase,
  Users,
  ShieldAlert,
  Activity,
  Layers,
  Sliders,
  UserCheck,
  FileText,
  Search,
  Star,
  Shield,
  Waves,
  Leaf,
  Radar,
  Wind,
  RotateCw,
  Anchor,
  Wrench,
  ClipboardCheck,
  Lock,
  ShieldCheck,
  Globe,
  Mic,
  Newspaper,
  Video,
  Share2,
  Award,
  TrendingUp,
  Map,
  Cpu,
  Radio,
  Database,
  Box,
  ShoppingBag,
  Rocket,
  Building2,
  FileSearch,
  HeartPulse,
  Calendar,
  DollarSign,
  Code2,
  CheckCircle2,
  Fuel,
  X,
  SlidersHorizontal,
  Command,
  Folder,
  FolderOpen
} from 'lucide-react';

export interface LeftSidebarWorkspaceProps {
  isOpen?: boolean;
  isCollapsed?: boolean;
  onToggle?: () => void;
  onToggleCollapse?: () => void;
  currentView: ViewMode;
  onNavigate?: (view: ViewMode) => void;
  onSelectView?: (view: ViewMode) => void;
  userPlan: PlanType;
  userRole?: UserRole;
  onOpenPricing: () => void;
  onOpenAuthModal?: () => void;
  onOpenSettings?: () => void;
  onOpenVoiceAssistant?: () => void;
  onOpenCommandPalette?: () => void;
}

export interface NavModuleItem {
  id: string;
  label: string;
  view: ViewMode;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  description?: string;
}

export interface NavSubCategory {
  id: string;
  title: string;
  icon?: React.ReactNode;
  items: NavModuleItem[];
}

export interface NavCategoryGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  badge?: string;
  items?: NavModuleItem[];
  subcategories?: NavSubCategory[];
}

export const LeftSidebarWorkspace: React.FC<LeftSidebarWorkspaceProps> = ({
  isOpen,
  isCollapsed,
  onToggle,
  onToggleCollapse,
  currentView,
  onNavigate,
  onSelectView,
  userPlan,
  userRole = 'Professional',
  onOpenPricing,
  onOpenAuthModal,
  onOpenSettings,
  onOpenVoiceAssistant,
  onOpenCommandPalette
}) => {
  const isExpanded = isOpen !== undefined ? isOpen : isCollapsed !== undefined ? !isCollapsed : true;
  const toggleSidebar = () => {
    if (onToggleCollapse) onToggleCollapse();
    else if (onToggle) onToggle();
  };

  const handleNavigate = (view: ViewMode) => {
    if (onSelectView) onSelectView(view);
    else if (onNavigate) onNavigate(view);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedViews, setPinnedViews] = useState<ViewMode[]>([
    'dashboard',
    'regulatory_hub',
    'document_hub',
    'ai_copilot',
    'ship_design_studio',
    'ais_tracking'
  ]);

  // Nested Hierarchical Structure with Engineering, Regulatory, Research, Operational, Industry, Platform
  const categoryGroups: NavCategoryGroup[] = useMemo(
    () => [
      {
        id: 'workspace_hub',
        title: 'Core Workspaces & Hubs',
        icon: <LayoutDashboard className="w-4 h-4 text-cyan-400" />,
        accentColor: 'border-cyan-500/30 text-cyan-400',
        badge: 'Core',
        items: [
          { id: 'dashboard', label: 'User Dashboard & Overview', view: 'dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />, badge: 'Main' },
          { id: 'regulatory_hub', label: 'IMO & Class Regulatory Hub', view: 'regulatory_hub', icon: <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />, badge: 'Statutory' },
          { id: 'document_hub', label: 'Document Converter & Processing', view: 'document_hub', icon: <FileText className="w-3.5 h-3.5 text-amber-400" />, badge: '20+ Tools' },
          { id: 'collaboration_ws', label: 'Collaboration Projects & CAD', view: 'collaboration_ws', icon: <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />, badge: '6 Active' },
          { id: 'maritime_super_app', label: 'Maritime Super App Portal', view: 'maritime_super_app', icon: <Ship className="w-3.5 h-3.5 text-indigo-400" /> },
          { id: 'executive_dashboard', label: 'Executive Intelligence & BI', view: 'executive_dashboard', icon: <Activity className="w-3.5 h-3.5 text-rose-400" /> }
        ]
      },
      {
        id: 'engineering',
        title: 'Engineering & Naval Arch',
        icon: <Ship className="w-4 h-4 text-indigo-400" />,
        accentColor: 'border-indigo-500/30 text-indigo-400',
        badge: 'CAD/FEA',
        subcategories: [
          {
            id: 'eng_cad_studio',
            title: 'CAD & Design Studio',
            icon: <Ship className="w-3.5 h-3.5 text-sky-400" />,
            items: [
              { id: 'ship_design_studio', label: 'Ship Design Studio 3D', view: 'ship_design_studio', icon: <Ship className="w-3.5 h-3.5 text-sky-400" />, badge: 'CAD 3D' },
              { id: 'digital_twin', label: '3D Digital Twin Simulation', view: 'digital_twin', icon: <Layers className="w-3.5 h-3.5 text-cyan-400" />, badge: 'IoT Live' },
              { id: 'engineering_tools', label: 'Engineering Tools Suite', view: 'engineering_tools', icon: <Calculator className="w-3.5 h-3.5 text-indigo-400" /> }
            ]
          },
          {
            id: 'eng_hydrodynamics',
            title: 'Hydrodynamics & Propulsion',
            icon: <RotateCw className="w-3.5 h-3.5 text-teal-400" />,
            items: [
              { id: 'ship_resistance', label: 'Ship Resistance & Powering', view: 'ship_resistance', icon: <Zap className="w-3.5 h-3.5 text-amber-400" />, badge: 'Holtrop' },
              { id: 'propeller_design', label: 'Propeller Design & Cavitation', view: 'propeller_design', icon: <RotateCw className="w-3.5 h-3.5 text-teal-400" />, badge: 'Wageningen' },
              { id: 'cfd_hub', label: 'CFD Hydro & Aerodynamics', view: 'cfd_hub', icon: <Wind className="w-3.5 h-3.5 text-blue-400" /> }
            ]
          },
          {
            id: 'eng_structures',
            title: 'Structures & Laboratory',
            icon: <Layers className="w-3.5 h-3.5 text-purple-400" />,
            items: [
              { id: 'ship_structural', label: 'Structural FEA & Scantlings', view: 'ship_structural', icon: <Layers className="w-3.5 h-3.5 text-purple-400" />, badge: 'IACS CSR' },
              { id: 'naval_arch_lab', label: 'Naval Architecture Lab', view: 'naval_arch_lab', icon: <Compass className="w-3.5 h-3.5 text-lime-400" /> }
            ]
          },
          {
            id: 'eng_calculators',
            title: 'Calculators & Formulas',
            icon: <Calculator className="w-3.5 h-3.5 text-emerald-400" />,
            items: [
              { id: 'calculators', label: 'Marine Engineering Calculators', view: 'calculators', icon: <Calculator className="w-3.5 h-3.5 text-emerald-400" />, badge: '100+ Formulas' },
              { id: 'unit_converter', label: 'Maritime Unit Converter', view: 'unit_converter', icon: <Sliders className="w-3.5 h-3.5 text-slate-400" /> }
            ]
          }
        ]
      },
      {
        id: 'regulatory',
        title: 'Regulatory & Compliance',
        icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
        accentColor: 'border-emerald-500/30 text-emerald-400',
        badge: 'IMO/IACS',
        subcategories: [
          {
            id: 'reg_statutory_hubs',
            title: 'IMO & Statutory Frameworks',
            icon: <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />,
            items: [
              { id: 'regulatory_hub_reg', label: 'IMO, SOLAS & MARPOL Hub', view: 'regulatory_hub', icon: <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />, badge: 'New Hub' },
              { id: 'compliance', label: 'Statutory Compliance Matrix', view: 'compliance', icon: <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> }
            ]
          },
          {
            id: 'reg_classification',
            title: 'Classification Societies (7 Class)',
            icon: <Award className="w-3.5 h-3.5 text-cyan-400" />,
            items: [
              { id: 'class_society', label: 'Classification Rules & Notations', view: 'class_society', icon: <Award className="w-3.5 h-3.5 text-cyan-400" /> }
            ]
          },
          {
            id: 'reg_surveys_psc',
            title: 'Surveys & PSC Audits',
            icon: <ClipboardCheck className="w-3.5 h-3.5 text-indigo-400" />,
            items: [
              { id: 'marine_survey', label: 'Marine Survey & PSC Checklist', view: 'marine_survey', icon: <ClipboardCheck className="w-3.5 h-3.5 text-indigo-400" /> },
              { id: 'risk_assessment', label: 'Maritime Risk Assessment', view: 'risk_assessment', icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> },
              { id: 'marine_insurance', label: 'Marine Insurance & Claims', view: 'marine_insurance', icon: <Shield className="w-3.5 h-3.5 text-sky-400" /> }
            ]
          },
          {
            id: 'reg_environment_decarb',
            title: 'Decarbonization & Green Marine',
            icon: <Leaf className="w-3.5 h-3.5 text-lime-400" />,
            items: [
              { id: 'carbon_emissions', label: 'CII / EEXI & EU ETS Decarb', view: 'carbon_emissions', icon: <Leaf className="w-3.5 h-3.5 text-emerald-400" />, badge: 'Decarb' },
              { id: 'environmental_hub', label: 'Environmental & Green Ship Hub', view: 'environmental_hub', icon: <Waves className="w-3.5 h-3.5 text-lime-400" /> },
              { id: 'ballast_water', label: 'Ballast Water Management (BWMS)', view: 'ballast_water', icon: <Waves className="w-3.5 h-3.5 text-teal-400" /> }
            ]
          },
          {
            id: 'reg_security_defense',
            title: 'Cyber Security & Defense',
            icon: <Lock className="w-3.5 h-3.5 text-purple-400" />,
            items: [
              { id: 'cybersecurity', label: 'Maritime Cyber Security UR E26', view: 'cybersecurity', icon: <Lock className="w-3.5 h-3.5 text-purple-400" /> },
              { id: 'naval_defense', label: 'Naval Defense & Security', view: 'naval_defense', icon: <ShieldCheck className="w-3.5 h-3.5 text-rose-400" /> }
            ]
          }
        ]
      },
      {
        id: 'research',
        title: 'Research & AI Intelligence',
        icon: <Bot className="w-4 h-4 text-cyan-400" />,
        accentColor: 'border-cyan-500/30 text-cyan-400',
        badge: 'AI RAG',
        subcategories: [
          {
            id: 'res_copilot_gen',
            title: 'AI Copilot & Generation',
            icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" />,
            items: [
              { id: 'ai_copilot', label: 'AI Copilot Suite Hub', view: 'ai_copilot', icon: <Bot className="w-3.5 h-3.5 text-cyan-400" />, badge: 'Pro AI' },
              { id: 'ai_chat', label: 'Maritime AI Chat Assistant', view: 'ai_chat', icon: <Sparkles className="w-3.5 h-3.5 text-blue-400" /> },
              { id: 'ai_assistant_builder', label: 'AI Agent Builder & Store', view: 'ai_assistant_builder', icon: <Bot className="w-3.5 h-3.5 text-violet-400" />, badge: '2.4k+ Bots' },
              { id: 'thesis_gen', label: 'AI Thesis & Research Gen', view: 'thesis_gen', icon: <BookOpen className="w-3.5 h-3.5 text-emerald-400" />, badge: 'IEEE/SNAME' },
              { id: 'report_gen', label: 'AI Engineering Report Gen', view: 'report_gen', icon: <FileText className="w-3.5 h-3.5 text-indigo-400" /> }
            ]
          },
          {
            id: 'res_search_kg',
            title: 'Search & Knowledge Graph',
            icon: <Search className="w-3.5 h-3.5 text-amber-400" />,
            items: [
              { id: 'ai_maritime_search', label: 'Maritime RAG Semantic Search', view: 'ai_maritime_search', icon: <Search className="w-3.5 h-3.5 text-amber-400" /> },
              { id: 'knowledge_graph', label: 'Maritime Knowledge Graph', view: 'knowledge_graph', icon: <Share2 className="w-3.5 h-3.5 text-blue-400" /> },
              { id: 'prompt_library', label: 'Naval Architecture Prompts', view: 'prompt_library', icon: <Bookmark className="w-3.5 h-3.5 text-teal-400" /> }
            ]
          },
          {
            id: 'res_library_academic',
            title: 'Digital Library & Academics',
            icon: <BookOpen className="w-3.5 h-3.5 text-purple-400" />,
            items: [
              { id: 'knowledge_hub', label: 'Knowledge Hub Overview', view: 'knowledge_hub', icon: <BookOpen className="w-3.5 h-3.5 text-purple-400" /> },
              { id: 'maritime_digital_library', label: 'Maritime Digital Library', view: 'maritime_digital_library', icon: <Bookmark className="w-3.5 h-3.5 text-amber-400" />, badge: '50k+ Docs' },
              { id: 'research_lab', label: 'Maritime Research Lab', view: 'research_lab', icon: <Activity className="w-3.5 h-3.5 text-rose-400" />, badge: 'Peer-Rev' },
              { id: 'universities', label: 'Global Maritime Universities', view: 'universities', icon: <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> },
              { id: 'scholarships', label: 'Scholarships Portal', view: 'scholarships', icon: <Award className="w-3.5 h-3.5 text-amber-400" /> }
            ]
          },
          {
            id: 'res_learning_certs',
            title: 'Academy & Certification',
            icon: <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />,
            items: [
              { id: 'learning_academy', label: 'Learning Academy Suite', view: 'learning_academy', icon: <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> },
              { id: 'ai_exam_prep', label: 'AI Exam Prep & CoC Certs', view: 'ai_exam_prep', icon: <Award className="w-3.5 h-3.5 text-teal-400" />, badge: 'Exam AI' },
              { id: 'video_learning', label: 'Masterclass Video Academy', view: 'video_learning', icon: <Video className="w-3.5 h-3.5 text-sky-400" /> },
              { id: 'ai_translator', label: 'Technical Translator (40+ Lang)', view: 'ai_translator', icon: <Globe className="w-3.5 h-3.5 text-emerald-400" /> }
            ]
          }
        ]
      },
      {
        id: 'operational',
        title: 'Operational & Fleet',
        icon: <Radar className="w-4 h-4 text-emerald-400" />,
        accentColor: 'border-emerald-500/30 text-emerald-400',
        badge: 'Live AIS',
        subcategories: [
          {
            id: 'ops_tracking_nav',
            title: 'AIS & Vessel Navigation',
            icon: <Radar className="w-3.5 h-3.5 text-emerald-400" />,
            items: [
              { id: 'ais_tracking', label: 'Real-Time AIS Vessel Radar', view: 'ais_tracking', icon: <Radar className="w-3.5 h-3.5 text-emerald-400" />, badge: 'Satellite' },
              { id: 'weather', label: 'Marine Weather & Sea State', view: 'weather', icon: <Waves className="w-3.5 h-3.5 text-sky-400" /> },
              { id: 'voyage_planning', label: 'Voyage Planning & Weather Routing', view: 'voyage_planning', icon: <Compass className="w-3.5 h-3.5 text-cyan-400" /> },
              { id: 'maritime_gis', label: 'Maritime GIS & Nav Charts', view: 'maritime_gis', icon: <Map className="w-3.5 h-3.5 text-emerald-400" /> }
            ]
          },
          {
            id: 'ops_fleet_cargo',
            title: 'Fleet & Cargo Management',
            icon: <Ship className="w-3.5 h-3.5 text-indigo-400" />,
            items: [
              { id: 'fleet_mgmt', label: 'Fleet Telemetry & Tracking', view: 'fleet_mgmt', icon: <Ship className="w-3.5 h-3.5 text-indigo-400" /> },
              { id: 'cargo_planning', label: 'Cargo Stowage & Stability', view: 'cargo_planning', icon: <Layers className="w-3.5 h-3.5 text-amber-400" /> },
              { id: 'marine_fuel', label: 'Bunker Optimization & Fuel EU', view: 'marine_fuel', icon: <Fuel className="w-3.5 h-3.5 text-orange-400" /> },
              { id: 'chartering_freight', label: 'Chartering & Freight Desk', view: 'chartering_freight', icon: <TrendingUp className="w-3.5 h-3.5 text-blue-400" /> }
            ]
          },
          {
            id: 'ops_maintenance',
            title: 'Machinery & Maintenance',
            icon: <Wrench className="w-3.5 h-3.5 text-blue-400" />,
            items: [
              { id: 'predictive_maint', label: 'Predictive Machinery Maint', view: 'predictive_maint', icon: <Wrench className="w-3.5 h-3.5 text-blue-400" /> },
              { id: 'dry_dock', label: 'Dry Dock & Repair Planner', view: 'dry_dock', icon: <Anchor className="w-3.5 h-3.5 text-amber-400" /> }
            ]
          },
          {
            id: 'ops_sim_oceantech',
            title: 'Simulators & Ocean Tech',
            icon: <Compass className="w-3.5 h-3.5 text-teal-400" />,
            items: [
              { id: 'simulation_center', label: 'Simulation Center Hub', view: 'simulation_center', icon: <Compass className="w-3.5 h-3.5 text-teal-400" /> },
              { id: 'maritime_simulation_center', label: 'Interactive Bridge Sim', view: 'maritime_simulation_center', icon: <Compass className="w-3.5 h-3.5 text-sky-400" />, badge: 'Sim 3D' },
              { id: 'marine_simulators', label: 'Marine Simulators Lab', view: 'marine_simulators', icon: <Sliders className="w-3.5 h-3.5 text-indigo-400" /> },
              { id: 'offshore_wind_dashboard', label: 'Offshore Wind Farm Hub', view: 'offshore_wind_dashboard', icon: <Wind className="w-3.5 h-3.5 text-emerald-400" />, badge: 'Offshore' },
              { id: 'offshore_renewables', label: 'Wave & Tidal Renewables', view: 'offshore_renewables', icon: <Zap className="w-3.5 h-3.5 text-cyan-400" /> },
              { id: 'autonomous_shipping', label: 'Autonomous Vessels & MASS', view: 'autonomous_shipping', icon: <Cpu className="w-3.5 h-3.5 text-purple-400" />, badge: 'MASS' },
              { id: 'smart_shipyard', label: 'Smart Shipyard & Robotics', view: 'smart_shipyard', icon: <Cpu className="w-3.5 h-3.5 text-blue-400" /> },
              { id: 'smart_ship', label: 'Smart Ship & Edge IoT Hub', view: 'smart_ship', icon: <Radio className="w-3.5 h-3.5 text-amber-400" /> },
              { id: 'blue_economy', label: 'Blue Economy & Ocean Science', view: 'blue_economy', icon: <Globe className="w-3.5 h-3.5 text-teal-400" /> }
            ]
          }
        ]
      },
      {
        id: 'industry_commerce',
        title: 'Industry & Commerce',
        icon: <Briefcase className="w-4 h-4 text-blue-400" />,
        accentColor: 'border-blue-500/30 text-blue-400',
        badge: 'Market',
        subcategories: [
          {
            id: 'ind_marketplace',
            title: 'Marketplace & Procurement',
            icon: <Store className="w-3.5 h-3.5 text-teal-400" />,
            items: [
              { id: 'marketplace', label: 'AI Agent Store & Marketplace', view: 'marketplace', icon: <Store className="w-3.5 h-3.5 text-teal-400" />, badge: 'App Store' },
              { id: 'interactive_ship_db', label: 'Interactive Ship Database', view: 'interactive_ship_db', icon: <Database className="w-3.5 h-3.5 text-indigo-400" /> },
              { id: 'marine_equipment_db', label: 'Marine Equipment Catalog', view: 'marine_equipment_db', icon: <Box className="w-3.5 h-3.5 text-amber-400" /> },
              { id: 'procurement_mkt', label: 'Ship Spares Procurement', view: 'procurement_mkt', icon: <ShoppingBag className="w-3.5 h-3.5 text-purple-400" /> }
            ]
          },
          {
            id: 'ind_jobs_crew',
            title: 'Jobs, Crew & Medical',
            icon: <Users className="w-3.5 h-3.5 text-emerald-400" />,
            items: [
              { id: 'jobs', label: 'Maritime Job Board & Crewing', view: 'jobs', icon: <Briefcase className="w-3.5 h-3.5 text-sky-400" /> },
              { id: 'crew_management', label: 'Crew Management & STCW', view: 'crew_management', icon: <Users className="w-3.5 h-3.5 text-emerald-400" /> },
              { id: 'maritime_medical', label: 'Maritime Telemedicine & Health', view: 'maritime_medical', icon: <HeartPulse className="w-3.5 h-3.5 text-rose-400" /> },
              { id: 'internships', label: 'Cadetships & Internships', view: 'internships', icon: <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> }
            ]
          },
          {
            id: 'ind_intel_community',
            title: 'News, Intel & Community',
            icon: <Newspaper className="w-3.5 h-3.5 text-emerald-400" />,
            items: [
              { id: 'maritime_industry', label: 'Maritime Industry Overview', view: 'maritime_industry', icon: <Briefcase className="w-3.5 h-3.5 text-blue-400" /> },
              { id: 'maritime_news_intelligence', label: 'Maritime News & Wire Intel', view: 'maritime_news_intelligence', icon: <Newspaper className="w-3.5 h-3.5 text-emerald-400" />, badge: 'Live Wire' },
              { id: 'company_intelligence', label: 'Company Due Diligence & Intel', view: 'company_intelligence', icon: <FileSearch className="w-3.5 h-3.5 text-lime-400" /> },
              { id: 'startup_hub', label: 'Maritime Startup Incubator', view: 'startup_hub', icon: <Rocket className="w-3.5 h-3.5 text-orange-400" /> },
              { id: 'global_directory', label: 'Global Maritime Directory', view: 'global_directory', icon: <Building2 className="w-3.5 h-3.5 text-cyan-400" /> },
              { id: 'community', label: 'Global Maritime Community', view: 'community', icon: <Users className="w-3.5 h-3.5 text-teal-400" /> },
              { id: 'maritime_events', label: 'Global Summits & Exhibitions', view: 'maritime_events', icon: <Calendar className="w-3.5 h-3.5 text-rose-400" /> }
            ]
          }
        ]
      },
      {
        id: 'platform_admin',
        title: 'Platform & Settings',
        icon: <DollarSign className="w-4 h-4 text-amber-400" />,
        accentColor: 'border-amber-500/30 text-amber-400',
        badge: 'SaaS',
        items: [
          { id: 'saas_billing', label: 'SaaS Subscription & Plans', view: 'saas_billing', icon: <CreditCard className="w-3.5 h-3.5 text-emerald-400" />, badge: 'Plans' },
          { id: 'monetization_suite', label: 'Platform Monetization Suite', view: 'monetization_suite', icon: <DollarSign className="w-3.5 h-3.5 text-amber-400" /> },
          { id: 'api_sdk', label: 'Public API & Webhooks SDK', view: 'api_sdk', icon: <Code2 className="w-3.5 h-3.5 text-cyan-400" />, badge: 'v2.4' },
          { id: 'admin', label: 'Admin & System Settings', view: 'admin', icon: <Settings className="w-3.5 h-3.5 text-slate-400" /> }
        ]
      }
    ],
    []
  );

  // Flattened mapping of view -> module item for quick lookups
  const allItemsMap = useMemo(() => {
    const map = new Map<ViewMode, NavModuleItem>();
    categoryGroups.forEach((cat) => {
      if (cat.items) {
        cat.items.forEach((item) => map.set(item.view, item));
      }
      if (cat.subcategories) {
        cat.subcategories.forEach((sub) => {
          sub.items.forEach((item) => map.set(item.view, item));
        });
      }
    });
    return map;
  }, [categoryGroups]);

  // Find active parent category ID and subcategory ID
  const { activeCatId, activeSubId } = useMemo(() => {
    for (const cat of categoryGroups) {
      if (cat.items?.some((i) => i.view === currentView)) {
        return { activeCatId: cat.id, activeSubId: null };
      }
      if (cat.subcategories) {
        for (const sub of cat.subcategories) {
          if (sub.items.some((i) => i.view === currentView)) {
            return { activeCatId: cat.id, activeSubId: sub.id };
          }
        }
      }
    }
    return { activeCatId: 'workspace_hub', activeSubId: null };
  }, [currentView, categoryGroups]);

  // Collapsed / Expanded state per Category
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    workspace_hub: true,
    engineering: true,
    regulatory: false,
    research: false,
    operational: false,
    industry_commerce: false,
    platform_admin: false
  });

  // Collapsed / Expanded state per Subcategory
  const [openSubcategories, setOpenSubcategories] = useState<Record<string, boolean>>({
    eng_cad_studio: true,
    eng_hydrodynamics: true,
    eng_structures: false,
    eng_calculators: false,
    reg_statutory_hubs: true,
    reg_classification: true,
    reg_surveys_psc: false,
    reg_environment_decarb: false,
    reg_security_defense: false,
    res_copilot_gen: true,
    res_search_kg: false,
    res_library_academic: false,
    res_learning_certs: false,
    ops_tracking_nav: true,
    ops_fleet_cargo: false,
    ops_maintenance: false,
    ops_sim_oceantech: false,
    ind_marketplace: true,
    ind_jobs_crew: false,
    ind_intel_community: false
  });

  // Auto-expand category and subcategory on view change
  useEffect(() => {
    if (activeCatId) {
      setOpenCategories((prev) => ({ ...prev, [activeCatId]: true }));
    }
    if (activeSubId) {
      setOpenSubcategories((prev) => ({ ...prev, [activeSubId]: true }));
    }
  }, [activeCatId, activeSubId]);

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  const toggleSubcategory = (subId: string) => {
    setOpenSubcategories((prev) => ({ ...prev, [subId]: !prev[subId] }));
  };

  const expandAll = () => {
    const allCats: Record<string, boolean> = {};
    const allSubs: Record<string, boolean> = {};
    categoryGroups.forEach((cat) => {
      allCats[cat.id] = true;
      if (cat.subcategories) {
        cat.subcategories.forEach((sub) => {
          allSubs[sub.id] = true;
        });
      }
    });
    setOpenCategories(allCats);
    setOpenSubcategories(allSubs);
  };

  const collapseAll = () => {
    const allCats: Record<string, boolean> = {};
    const allSubs: Record<string, boolean> = {};
    categoryGroups.forEach((cat) => {
      allCats[cat.id] = false;
      if (cat.subcategories) {
        cat.subcategories.forEach((sub) => {
          allSubs[sub.id] = false;
        });
      }
    });
    setOpenCategories(allCats);
    setOpenSubcategories(allSubs);
  };

  const areAllExpanded = useMemo(() => {
    return categoryGroups.every((g) => openCategories[g.id]);
  }, [openCategories, categoryGroups]);

  // Filter nested categories and subcategories based on search query
  const filteredCategoryGroups = useMemo(() => {
    if (!searchQuery.trim()) return categoryGroups;
    const q = searchQuery.toLowerCase();

    return categoryGroups
      .map((cat) => {
        // Filter direct items
        const matchingItems = cat.items?.filter(
          (item) =>
            item.label.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q) ||
            (item.badge && item.badge.toLowerCase().includes(q))
        );

        // Filter subcategories
        const matchingSubcategories = cat.subcategories
          ?.map((sub) => {
            const subMatchingItems = sub.items.filter(
              (item) =>
                item.label.toLowerCase().includes(q) ||
                item.id.toLowerCase().includes(q) ||
                sub.title.toLowerCase().includes(q) ||
                (item.badge && item.badge.toLowerCase().includes(q))
            );
            return { ...sub, items: subMatchingItems };
          })
          .filter((sub) => sub.items.length > 0);

        const hasDirectItems = matchingItems && matchingItems.length > 0;
        const hasSubcategories = matchingSubcategories && matchingSubcategories.length > 0;

        if (hasDirectItems || hasSubcategories) {
          return {
            ...cat,
            items: matchingItems || [],
            subcategories: matchingSubcategories || []
          };
        }
        return null;
      })
      .filter((cat): cat is NonNullable<typeof cat> => cat !== null);
  }, [categoryGroups, searchQuery]);

  const togglePin = (e: React.MouseEvent, view: ViewMode) => {
    e.stopPropagation();
    setPinnedViews((prev) =>
      prev.includes(view) ? prev.filter((v) => v !== view) : [...prev, view]
    );
  };

  // Render a Single Nav Module Link Item
  const renderNavItem = (item: NavModuleItem, isSubItem: boolean = false) => {
    const isActive = currentView === item.view;
    const isPinned = pinnedViews.includes(item.view);

    return (
      <div key={item.id} className="relative group/item flex items-center">
        <button
          onClick={() => handleNavigate(item.view)}
          className={`w-full flex items-center justify-between ${
            isSubItem ? 'pl-2.5 pr-8 py-1.5' : 'pl-3 pr-8 py-2'
          } rounded-lg text-xs transition ${
            isActive
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-inner'
              : 'text-slate-300 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className={isActive ? 'text-cyan-400 shrink-0' : 'text-slate-400 shrink-0'}>
              {item.icon}
            </span>
            <span className="truncate text-[11px] font-medium leading-tight">
              {item.label}
            </span>
          </div>

          {item.badge && (
            <span
              className={`px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0 ${
                isActive
                  ? 'bg-cyan-400 text-slate-950'
                  : 'bg-slate-900 text-cyan-400 border border-cyan-500/30'
              }`}
            >
              {item.badge}
            </span>
          )}
        </button>

        {/* Quick Pin Toggle Button */}
        <button
          onClick={(e) => togglePin(e, item.view)}
          title={isPinned ? 'Unpin from Quick Access' : 'Pin to Quick Access'}
          className={`absolute right-2 p-1 rounded-md transition ${
            isPinned
              ? 'text-amber-400 opacity-100'
              : 'text-slate-600 hover:text-slate-300 opacity-0 group-hover/item:opacity-100'
          }`}
        >
          <Star className={`w-3 h-3 ${isPinned ? 'fill-amber-400' : ''}`} />
        </button>
      </div>
    );
  };

  if (!isExpanded) {
    return (
      <aside className="hidden md:flex w-14 shrink-0 bg-slate-950/95 border-r border-slate-800/80 backdrop-blur-xl flex-col justify-between items-center py-4 z-40 transition-all duration-300">
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Logo & Expand trigger */}
          <button
            onClick={toggleSidebar}
            title="Expand Sidebar Navigation"
            className="p-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-cyan-400 transition hover:scale-105"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="w-8 h-[1px] bg-slate-800" />

          {/* Mini Pinned Quick Links */}
          <div className="flex flex-col items-center gap-2">
            {pinnedViews.slice(0, 7).map((view) => {
              const item = allItemsMap.get(view);
              if (!item) return null;
              const isActive = currentView === view;
              return (
                <button
                  key={view}
                  onClick={() => handleNavigate(view)}
                  title={item.label}
                  className={`p-2.5 rounded-xl transition ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {item.icon}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Quick Tools */}
        <div className="flex flex-col items-center gap-2">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              title="Command Palette (⌘K)"
              className="p-2 text-slate-400 hover:text-cyan-400 rounded-xl hover:bg-slate-900"
            >
              <Command className="w-4 h-4" />
            </button>
          )}
          {onOpenVoiceAssistant && (
            <button
              onClick={onOpenVoiceAssistant}
              title="AI Voice Assistant"
              className="p-2 text-slate-400 hover:text-emerald-400 rounded-xl hover:bg-slate-900"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onOpenPricing}
            title={`Plan: ${userPlan}`}
            className="p-2 text-amber-400 hover:text-amber-300 rounded-xl hover:bg-slate-900"
          >
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden md:flex w-72 shrink-0 bg-slate-950/95 border-r border-slate-800/90 backdrop-blur-xl flex-col justify-between z-40 transition-all duration-300 select-none shadow-2xl h-[calc(100vh-4rem)] sticky top-16">
      {/* Top Header & Search Area */}
      <div className="flex flex-col">
        {/* Header Bar */}
        <div className="px-4 py-3.5 border-b border-slate-800/90 flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 shadow-sm">
              <Ship className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight">Platform Modules</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Nested Dropdowns
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Role: {userRole}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={areAllExpanded ? collapseAll : expandAll}
              title={areAllExpanded ? 'Collapse All Categories' : 'Expand All Categories'}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition text-xs"
            >
              {areAllExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleSidebar}
              title="Collapse Sidebar"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Search & Filter Bar */}
        <div className="p-2.5 border-b border-slate-800/60 bg-slate-950/60">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Engineering, Regulatory, etc..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500/60 rounded-xl pl-8 pr-7 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-slate-500 hover:text-slate-300 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : onOpenCommandPalette ? (
              <button
                onClick={onOpenCommandPalette}
                title="Command Palette (⌘K)"
                className="absolute right-2 text-[10px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 hover:text-cyan-400 hover:border-cyan-500/40"
              >
                ⌘K
              </button>
            ) : null}
          </div>
        </div>

        {/* Pinned Quick Access (Favorites) Section */}
        {!searchQuery && pinnedViews.length > 0 && (
          <div className="px-2.5 py-2 border-b border-slate-800/40 bg-slate-900/20">
            <div className="flex items-center justify-between px-1.5 mb-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                Quick Access Pinned
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{pinnedViews.length}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {pinnedViews.map((view) => {
                const item = allItemsMap.get(view);
                if (!item) return null;
                const isActive = currentView === view;
                return (
                  <button
                    key={view}
                    onClick={() => handleNavigate(view)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-medium transition ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'bg-slate-900 border border-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                    <span className="truncate max-w-[120px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Accordion Nested Dropdown Modules List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        {filteredCategoryGroups.length === 0 ? (
          <div className="text-center py-8 px-4 space-y-2">
            <SlidersHorizontal className="w-6 h-6 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">No modules match "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-cyan-400 hover:underline font-semibold"
            >
              Clear Search Filter
            </button>
          </div>
        ) : (
          filteredCategoryGroups.map((cat) => {
            const isCatOpen = searchQuery.trim() ? true : !!openCategories[cat.id];
            const hasActiveChild =
              cat.items?.some((i) => i.view === currentView) ||
              cat.subcategories?.some((s) => s.items.some((i) => i.view === currentView));

            // Calculate total items count inside category
            const totalCount =
              (cat.items?.length || 0) +
              (cat.subcategories?.reduce((acc, s) => acc + s.items.length, 0) || 0);

            return (
              <div
                key={cat.id}
                className={`rounded-xl border transition-all duration-200 ${
                  hasActiveChild
                    ? 'bg-slate-900/70 border-slate-700/90 shadow-sm'
                    : 'bg-slate-950/40 border-slate-850 hover:border-slate-800'
                }`}
              >
                {/* Level 1 Category Header */}
                <button
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-left rounded-xl transition group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`p-1 rounded-lg bg-slate-900 border ${cat.accentColor}`}>
                      {cat.icon}
                    </div>
                    <span
                      className={`text-xs font-bold truncate transition ${
                        hasActiveChild ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {cat.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {cat.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-900 text-slate-400 border border-slate-800">
                        {cat.badge}
                      </span>
                    )}
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 text-slate-400 border border-slate-800">
                      {totalCount}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        isCatOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Level 1 Collapsible Content */}
                {isCatOpen && (
                  <div className="px-1.5 pb-2 pt-0.5 space-y-1 border-t border-slate-850">
                    {/* Direct Items (if any) */}
                    {cat.items && cat.items.length > 0 && (
                      <div className="space-y-0.5">
                        {cat.items.map((item) => renderNavItem(item, false))}
                      </div>
                    )}

                    {/* Level 2 Subcategories */}
                    {cat.subcategories &&
                      cat.subcategories.map((sub) => {
                        const isSubOpen = searchQuery.trim() ? true : !!openSubcategories[sub.id];
                        const hasActiveSubChild = sub.items.some((i) => i.view === currentView);

                        return (
                          <div
                            key={sub.id}
                            className={`rounded-lg border border-slate-800/80 bg-slate-900/40 overflow-hidden mt-1`}
                          >
                            {/* Level 2 Subcategory Header */}
                            <button
                              type="button"
                              onClick={() => toggleSubcategory(sub.id)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left text-xs transition ${
                                hasActiveSubChild
                                  ? 'bg-slate-850 text-cyan-300 font-semibold'
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/60'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                {isSubOpen ? (
                                  <FolderOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                ) : (
                                  <Folder className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                )}
                                <span className="truncate text-[11px] font-semibold">
                                  {sub.title}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-950 text-slate-400 border border-slate-800">
                                  {sub.items.length}
                                </span>
                                <ChevronDown
                                  className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${
                                    isSubOpen ? 'rotate-180 text-cyan-400' : ''
                                  }`}
                                />
                              </div>
                            </button>

                            {/* Level 2 Nested Items */}
                            {isSubOpen && (
                              <div className="px-1.5 py-1 space-y-0.5 border-t border-slate-800/60 bg-slate-950/60 pl-2 border-l-2 border-l-cyan-500/40 ml-1.5 mr-1 mb-1 rounded-r">
                                {sub.items.map((item) => renderNavItem(item, true))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Token Quota & Account Profile Widget */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 text-[11px] font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              AI Token Quota
            </span>
            <span className="text-cyan-400 font-mono text-[11px] font-bold">1.8M / 2.5M</span>
          </div>

          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-[72%]" />
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[11px]">
            <span className="text-slate-400 uppercase font-mono font-bold text-[10px] px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">
              {userPlan} Tier
            </span>
            <button
              onClick={onOpenPricing}
              className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline text-[11px] flex items-center gap-0.5"
            >
              Upgrade
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-2 gap-1.5 mt-2">
          {onOpenAuthModal && (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-[11px] text-slate-300 hover:text-white transition"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Roles & 2FA</span>
            </button>
          )}
          {onOpenVoiceAssistant && (
            <button
              onClick={onOpenVoiceAssistant}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-[11px] text-slate-300 hover:text-white transition"
            >
              <Mic className="w-3.5 h-3.5 text-cyan-400" />
              <span>Voice Copilot</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
