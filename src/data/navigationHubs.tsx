import React from 'react';
import { ViewMode } from '../types';
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
  Compass,
  DollarSign,
  FileCode2,
  Sparkles,
  BookMarked,
  Mail,
  BookOpen,
  Globe,
  FileSpreadsheet,
  CheckCircle2,
  Award,
  Bell,
  Newspaper,
  FileText,
  Anchor,
  Layers,
  Cpu,
  Wind,
  Navigation,
  Radio,
  Activity,
  Database,
  LifeBuoy,
  Zap,
  Cloud,
  ShieldCheck,
  Scale,
  Gauge,
  HardHat,
  Wrench,
  Share2,
  Settings,
  CreditCard
} from 'lucide-react';

export interface NavItem {
  id: ViewMode;
  label: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
  highlight?: boolean;
}

export interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

export interface NavHub {
  id: string;
  title: string;
  view: ViewMode;
  tagline: string;
  icon: React.ReactNode;
  groups: NavGroup[];
}

export const PRIMARY_NAVIGATION_HUBS: NavHub[] = [
  {
    id: 'ai_copilot',
    title: 'AI Copilot',
    view: 'ai_copilot',
    tagline: 'Multi-Model Maritime LLMs, Autonomous Agents & Research Solvers',
    icon: <Bot className="w-4 h-4 text-cyan-400" />,
    groups: [
      {
        groupTitle: 'Conversational & Agent AI',
        items: [
          { id: 'ai_chat', label: 'AI Maritime Copilot Pro', desc: 'Multi-model naval engineering assistant with reasoning', badge: 'PRO', icon: <Bot className="w-4 h-4 text-cyan-400" /> },
          { id: 'ai_agent_marketplace', label: 'AI Agent Marketplace', desc: 'Browse, run & monetize 2,400+ maritime AI agents', badge: 'STORE', icon: <Cpu className="w-4 h-4 text-violet-400" /> },
          { id: 'maritime_super_app', label: 'Maritime AI Super-App', desc: 'Comprehensive multi-tool naval architecture suite', badge: 'SUITE', icon: <Sparkles className="w-4 h-4 text-sky-400" /> },
          { id: 'ai_maritime_search', label: 'AI Maritime Search', desc: 'Semantic RAG maritime search & IMO indexer', badge: 'RAG', icon: <Globe className="w-4 h-4 text-teal-400" /> },
          { id: 'prompt_library', label: 'AI Prompt Library', desc: '100+ Pre-engineered naval engineering prompts', icon: <BookMarked className="w-4 h-4 text-indigo-400" /> },
          { id: 'ai_translator', label: 'AI Technical Translator', desc: 'Multi-lingual maritime technical translator', icon: <Share2 className="w-4 h-4 text-amber-400" /> },
          { id: 'recommendation_engine', label: 'AI Recommendation Engine', desc: 'Personalized tools, research & course suggestions', icon: <Zap className="w-4 h-4 text-pink-400" /> }
        ]
      },
      {
        groupTitle: 'Document & Research Intelligence',
        items: [
          { id: 'document_hub', label: 'Document Converter & Hub', desc: '20+ format converter, OCR & AI summarizer suite', badge: 'POPULAR', icon: <FileText className="w-4 h-4 text-emerald-400" /> },
          { id: 'report_gen', label: 'AI Report & Survey Generator', desc: 'Automated survey, class & IHM audit reports', icon: <FileSpreadsheet className="w-4 h-4 text-amber-400" /> },
          { id: 'thesis_gen', label: 'AI Thesis & Dissertation', desc: 'Dissertation outlines, lit review & APA/IEEE citations', icon: <FileCode2 className="w-4 h-4 text-purple-400" /> },
          { id: 'ai_productivity_suite', label: 'AI Productivity Suite', desc: 'Maritime office automation & smart workflows', icon: <LayoutDashboard className="w-4 h-4 text-blue-400" /> },
          { id: 'ai_research_lab', label: 'AI Research Lab', desc: 'Citations, BibTeX, APA 7 & LaTeX paper authoring', icon: <BookOpen className="w-4 h-4 text-rose-400" /> }
        ]
      }
    ]
  },
  {
    id: 'engineering_tools',
    title: 'Naval Engineering',
    view: 'engineering_tools',
    tagline: 'Parametric Hull Modeling, Hydrostatics, Propulsion & FEA',
    icon: <Calculator className="w-4 h-4 text-indigo-400" />,
    groups: [
      {
        groupTitle: 'Hydrodynamics & Hull Form',
        items: [
          { id: 'ship_design_studio', label: '3D Ship Design Studio', desc: 'Parametric hull modeling, wireframes & lines plan', badge: '3D', icon: <Ship className="w-4 h-4 text-sky-400" /> },
          { id: 'naval_arch_lab', label: 'Naval Architecture Lab', desc: 'Hydrostatics, Bonjean curves & Simpson integration', icon: <Compass className="w-4 h-4 text-cyan-400" /> },
          { id: 'ship_resistance', label: 'Ship Resistance & Powering', desc: 'Holtrop-Mennen, ITTC 1957 line & sea margins', icon: <Gauge className="w-4 h-4 text-amber-400" /> },
          { id: 'propeller_design', label: 'Propeller & Propulsion', desc: 'B-Series cavitation, pitch & open-water charts', icon: <Anchor className="w-4 h-4 text-emerald-400" /> },
          { id: 'cfd_hub', label: 'CFD Hydrodynamics Solver', desc: 'Wave patterns, resistance mesh & flow analysis', badge: 'CFD', icon: <Wind className="w-4 h-4 text-blue-400" /> }
        ]
      },
      {
        groupTitle: 'Structures, Machinery & Solvers',
        items: [
          { id: 'ship_structural', label: 'Ship Structural FEA', desc: 'Midship section modulus & DNV/ABS class scantlings', icon: <Layers className="w-4 h-4 text-indigo-400" /> },
          { id: 'predictive_maint', label: 'Predictive Machinery Maint', desc: '2-Stroke/DF telemetry & condition diagnostics', icon: <Wrench className="w-4 h-4 text-teal-400" /> },
          { id: 'calculators', label: 'Engineering Calculators', desc: '100+ formulas with instant derivation & plots', icon: <Calculator className="w-4 h-4 text-purple-400" /> },
          { id: 'formula_library', label: 'Maritime Formula Database', desc: '500+ formulas with step-by-step proofs', icon: <BookMarked className="w-4 h-4 text-pink-400" /> },
          { id: 'unit_converter', label: 'Maritime Unit Converter', desc: 'Nautical, hydrodynamic, thermal & imperial units', icon: <Scale className="w-4 h-4 text-lime-400" /> },
          { id: 'cost_estimator', label: 'Shipbuilding Cost Estimator', desc: 'Shipyard CAPEX, steel tonnage & refit costs', icon: <DollarSign className="w-4 h-4 text-emerald-400" /> }
        ]
      }
    ]
  },
  {
    id: 'fleet_operations',
    title: 'Fleet Operations',
    view: 'fleet_mgmt',
    tagline: 'Global AIS Tracking, Voyage Planning, Bunker & Ship Operations',
    icon: <Navigation className="w-4 h-4 text-sky-400" />,
    groups: [
      {
        groupTitle: 'Navigation & Fleet Tracking',
        items: [
          { id: 'voyage_planning', label: 'Voyage & Weather Planning', desc: 'Great circle routing, fuel savings & ETA optimizer', icon: <Navigation className="w-4 h-4 text-sky-400" /> },
          { id: 'ais_tracking', label: 'Live AIS Vessel Tracking', desc: 'Global vessel satellite tracking & route history', badge: 'LIVE', icon: <Radio className="w-4 h-4 text-rose-400" /> },
          { id: 'fleet_mgmt', label: 'Fleet Management & OEE', desc: 'Vessel status, telemetry, OEE & maintenance schedules', icon: <Activity className="w-4 h-4 text-emerald-400" /> },
          { id: 'maritime_gis', label: 'Maritime GIS & Port Analytics', desc: 'Port congestion heatmaps, bathymetry & berths', icon: <Globe className="w-4 h-4 text-cyan-400" /> },
          { id: 'weather', label: 'Maritime Weather Forecasting', desc: 'High-seas wave spectra, wind & typhoon tracking', icon: <Wind className="w-4 h-4 text-teal-400" /> }
        ]
      },
      {
        groupTitle: 'Shipboard Operations & Safety',
        items: [
          { id: 'cargo_planning', label: 'Cargo Planning & Stowage', desc: 'Bulk, tanker & container stress & stability', icon: <FileSpreadsheet className="w-4 h-4 text-amber-400" /> },
          { id: 'marine_fuel', label: 'Marine Fuel & Bunker Desk', desc: 'Fuel testing, ISO 8217 & bunker price indices', icon: <Gauge className="w-4 h-4 text-rose-400" /> },
          { id: 'ballast_water', label: 'Ballast Water Treatment', desc: 'D-2 standards, BWM plan & discharge logging', icon: <Layers className="w-4 h-4 text-blue-400" /> },
          { id: 'dry_dock', label: 'Dry Dock & Repair Planner', desc: 'Docking schedule, tender specs & yard overhaul', icon: <HardHat className="w-4 h-4 text-amber-400" /> },
          { id: 'marine_survey', label: 'Marine Survey & Audits', desc: 'Class checklist, condition survey & vetting inspections', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
          { id: 'risk_assessment', label: 'Operational Risk Assessment', desc: 'HAZID, HAZOP & maritime safety management', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> }
        ]
      }
    ]
  },
  {
    id: 'simulation_center',
    title: 'Simulation & 3D',
    view: 'simulation_center',
    tagline: 'Hydrodynamic 3D Simulators, SCADA Twins & Spatial Training',
    icon: <Compass className="w-4 h-4 text-emerald-400" />,
    groups: [
      {
        groupTitle: 'Mission & Training Simulators',
        items: [
          { id: 'maritime_simulation_center', label: '3D Bridge & Ship Simulator', desc: '6-DOF hydrodynamic motion & COLREGs radar', badge: '3D', icon: <Ship className="w-4 h-4 text-sky-400" /> },
          { id: 'marine_simulators', label: 'Marine Simulators Lab', desc: 'Engine room SCADA, stability & cargo simulators', icon: <Compass className="w-4 h-4 text-emerald-400" /> },
          { id: 'maritime_metaverse', label: 'Maritime Metaverse & VR', desc: 'Spatial 3D inspection & immersive safety drills', badge: 'VR', icon: <Sparkles className="w-4 h-4 text-purple-400" /> }
        ]
      },
      {
        groupTitle: 'Digital Twin & Advanced Systems',
        items: [
          { id: 'digital_twin', label: 'Digital Twin & IoT Sensors', desc: 'Real-time SCADA telemetry & predictive sensor twins', icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
          { id: 'autonomous_shipping', label: 'Autonomous Shipping & MASS', desc: 'Unmanned vessel situational awareness protocols', icon: <Bot className="w-4 h-4 text-violet-400" /> },
          { id: 'smart_ship', label: 'Smart Ship Systems', desc: 'Integrated bridge, ethernet bus & edge controllers', icon: <Zap className="w-4 h-4 text-amber-400" /> },
          { id: 'offshore_wind_dashboard', label: 'Offshore Wind Farm Hub', desc: 'Turbine array SCADA, wake loss & floating wind', icon: <Wind className="w-4 h-4 text-teal-400" /> },
          { id: 'offshore_renewables', label: 'Offshore Renewables', desc: 'Wave, tidal energy & floating offshore structures', icon: <Layers className="w-4 h-4 text-blue-400" /> }
        ]
      }
    ]
  },
  {
    id: 'regulations_green',
    title: 'Regulations & Green',
    view: 'maritime_regulations',
    tagline: 'Statutory Conventions, Classification Rules & Net-Zero Transition',
    icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
    groups: [
      {
        groupTitle: 'Classification & Statutory Codes',
        items: [
          { id: 'maritime_regulations', label: 'IMO Regulations Library', desc: 'Full SOLAS, MARPOL, STCW conventions & codes', badge: 'IMO', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
          { id: 'regulatory_hub', label: 'Global Regulatory Hub', desc: 'Real-time regulatory updates & compliance tracker', icon: <Scale className="w-4 h-4 text-indigo-400" /> },
          { id: 'class_society', label: 'Classification Society Rules', desc: 'DNV, ABS, Lloyd’s Register, Bureau Veritas & ClassNK', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
          { id: 'compliance', label: 'Marine Compliance Standards', desc: 'ISO, IACS Unified Requirements & ASTM standards', icon: <CheckCircle2 className="w-4 h-4 text-cyan-400" /> },
          { id: 'cybersecurity', label: 'Maritime Cybersecurity', desc: 'IMO MSC.428(98) cyber risk management & audits', icon: <Cpu className="w-4 h-4 text-violet-400" /> },
          { id: 'marine_insurance', label: 'Marine Insurance & P&I', desc: 'Hull & machinery underwriting, loss prevention & P&I', icon: <DollarSign className="w-4 h-4 text-amber-400" /> }
        ]
      },
      {
        groupTitle: 'Decarbonization & Clean Ocean',
        items: [
          { id: 'environmental_hub', label: 'Environmental Hub & HKC', desc: 'Hong Kong Convention 2025 IHM HazMat audit', badge: 'HKC', icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
          { id: 'carbon_emissions', label: 'Carbon Emissions & CII', desc: 'IMO MEPC 82 CII ratings, EEXI & EU ETS metrics', icon: <Activity className="w-4 h-4 text-teal-400" /> },
          { id: 'blue_economy', label: 'Blue Economy & Ocean Science', desc: 'Sustainable marine biodiversity & ocean planning', icon: <Globe className="w-4 h-4 text-sky-400" /> }
        ]
      }
    ]
  },
  {
    id: 'academy_research',
    title: 'Academy & Research',
    view: 'learning_academy',
    tagline: 'Accredited Maritime Courses, CPD Certifications & Literature',
    icon: <GraduationCap className="w-4 h-4 text-purple-400" />,
    groups: [
      {
        groupTitle: 'Education & Professional Qualifications',
        items: [
          { id: 'learning', label: 'Accredited Marine Courses', desc: 'Naval architecture, STCW & hydrodynamics courses', icon: <GraduationCap className="w-4 h-4 text-purple-400" /> },
          { id: 'certifications', label: 'Blockchain Certifications', desc: 'CPD accredited verifiable digital credentials', badge: 'QR CERT', icon: <Award className="w-4 h-4 text-amber-400" /> },
          { id: 'ai_career_path_planner', label: 'AI Career Path Planner', desc: 'Cadet to Chief Architect guided career milestones', icon: <Compass className="w-4 h-4 text-cyan-400" /> },
          { id: 'ai_exam_prep', label: 'AI Exam Prep & Mock Tests', desc: '1,500+ MCQs & Class surveyor mock exams', icon: <Calculator className="w-4 h-4 text-emerald-400" /> },
          { id: 'universities', label: 'University Portal & Academies', desc: '65+ Global maritime universities & faculty tools', icon: <BookOpen className="w-4 h-4 text-indigo-400" /> },
          { id: 'scholarships', label: 'Scholarships & Grants', desc: 'Maritime student funding, bursaries & fellowships', icon: <Award className="w-4 h-4 text-rose-400" /> },
          { id: 'internships', label: 'Maritime Internships', desc: 'Cadet training berths & shipyard apprenticeships', icon: <Briefcase className="w-4 h-4 text-teal-400" /> }
        ]
      },
      {
        groupTitle: 'Academic Research & Media',
        items: [
          { id: 'maritime_digital_library', label: 'Maritime Digital Library', desc: '10,000+ textbooks, technical codes & manuals', icon: <BookMarked className="w-4 h-4 text-sky-400" /> },
          { id: 'video_learning', label: 'Video Learning Academy', desc: '4K engineering masterclasses & teardowns', icon: <Sparkles className="w-4 h-4 text-pink-400" /> },
          { id: 'maritime_publishing_platform', label: 'Maritime Publishing Platform', desc: '450+ peer-reviewed maritime journal papers', icon: <BookOpen className="w-4 h-4 text-amber-400" /> }
        ]
      }
    ]
  },
  {
    id: 'commercial_shipping',
    title: 'Commercial & Jobs',
    view: 'maritime_industry',
    tagline: 'Market Intelligence, Freight Markets, Shipyards & Global Careers',
    icon: <Briefcase className="w-4 h-4 text-blue-400" />,
    groups: [
      {
        groupTitle: 'Industry Intelligence & Trade',
        items: [
          { id: 'maritime_news_intelligence', label: 'AI News & Intelligence', desc: 'Bloomberg-grade live shipping feed & analysis', badge: 'LIVE', icon: <Newspaper className="w-4 h-4 text-cyan-400" /> },
          { id: 'maritime_finance', label: 'Maritime Finance Desk', desc: 'Ship finance, Baltic Dry Index & cash flow models', icon: <DollarSign className="w-4 h-4 text-emerald-400" /> },
          { id: 'chartering_freight', label: 'Chartering & Freight Desk', desc: 'Fixtures, laytime calculations & CP agreements', icon: <FileSpreadsheet className="w-4 h-4 text-amber-400" /> },
          { id: 'company_intelligence', label: 'Verified Company Directory', desc: '4,200+ global shipping & offshore enterprises', icon: <Users className="w-4 h-4 text-blue-400" /> },
          { id: 'shipyard_mgmt', label: 'Global Shipyards Directory', desc: 'Drydock capacity, newbuild slots & repair yards', icon: <Ship className="w-4 h-4 text-indigo-400" /> },
          { id: 'startup_hub', label: 'Maritime Startup Incubator', desc: 'Ocean tech venture capital & startup accelerator', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
          { id: 'global_directory', label: 'Global Maritime Directory', desc: 'Comprehensive search of worldwide maritime entities', icon: <Globe className="w-4 h-4 text-teal-400" /> }
        ]
      },
      {
        groupTitle: 'Careers & Community Network',
        items: [
          { id: 'jobs', label: 'Maritime Jobs & Careers', desc: 'Global naval architecture, shipyard & seafaring hiring', icon: <Briefcase className="w-4 h-4 text-blue-400" /> },
          { id: 'crew_management', label: 'Crew Management & STCW', desc: 'Crew roster, STCW licenses, rest hours & payroll', icon: <Users className="w-4 h-4 text-emerald-400" /> },
          { id: 'maritime_medical', label: 'Maritime Telemedicine', desc: 'At-sea medical guidance, trauma kits & clinical consults', icon: <LifeBuoy className="w-4 h-4 text-rose-400" /> },
          { id: 'resume_builder', label: 'Maritime Resume Builder', desc: 'Seafarer CV generator & sea-time calculator', icon: <FileText className="w-4 h-4 text-cyan-400" /> },
          { id: 'community', label: 'Community & Tech Forums', desc: '32 Technical engineering forums & peer reviews', icon: <Users className="w-4 h-4 text-lime-400" /> },
          { id: 'maritime_events', label: 'Global Maritime Events', desc: 'SNAME, RINA, Posidonia & Nor-Shipping summits', icon: <Sparkles className="w-4 h-4 text-amber-400" /> }
        ]
      }
    ]
  },
  {
    id: 'marketplace_workspace',
    title: 'Marketplace & Tools',
    view: 'marketplace',
    tagline: 'Maritime App Store, Datasets, CAD Models & Enterprise SaaS',
    icon: <Store className="w-4 h-4 text-teal-400" />,
    groups: [
      {
        groupTitle: 'Marketplace & Datasets',
        items: [
          { id: 'ai_agent_marketplace', label: 'AI Agent Store', desc: 'Autonomous maritime bot agents & creator studio', badge: 'AI STORE', icon: <Bot className="w-4 h-4 text-violet-400" /> },
          { id: 'marketplace', label: 'Engineering Marketplace', desc: 'CAD models, calculations, Excel sheets & templates', icon: <Store className="w-4 h-4 text-teal-400" /> },
          { id: 'dataset_marketplace', label: 'Maritime Datasets', desc: 'AIS vessel tracks, CFD mesh & sea wave spectra', icon: <Database className="w-4 h-4 text-cyan-400" /> },
          { id: 'marine_equipment_db', label: 'Marine Equipment Catalog', desc: '5,000+ OEM machinery specifications & cut-sheets', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
          { id: 'interactive_ship_db', label: 'Interactive Ship Database', desc: '12,000+ vessel specifications, GA plans & models', icon: <Ship className="w-4 h-4 text-sky-400" /> },
          { id: 'procurement_mkt', label: 'Marine Procurement', desc: 'Ship spares, consumables & shipyard tender bidding', icon: <DollarSign className="w-4 h-4 text-amber-400" /> }
        ]
      },
      {
        groupTitle: 'SaaS, Workspace & Admin',
        items: [
          { id: 'monetization_suite', label: 'Monetization & Products', desc: 'Maritime digital goods, prompt store & downloads', icon: <Store className="w-4 h-4 text-indigo-400" /> },
          { id: 'saas_billing', label: 'SaaS Subscriptions & Billing', desc: '5 Flexible plans, team licenses & invoices', badge: 'PRO', icon: <CreditCard className="w-4 h-4 text-emerald-400" /> },
          { id: 'cloud_workspace', label: 'Cloud Workspace & CAD', desc: 'Encrypted CAD models & simulation cloud storage', icon: <Cloud className="w-4 h-4 text-sky-400" /> },
          { id: 'google_forms', label: 'Google Forms Hub', desc: 'Ship inspections, feedback surveys & crew forms', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> },
          { id: 'collaboration_ws', label: 'Collaboration Workspace', desc: 'Multi-user project markup & shared documents', icon: <Users className="w-4 h-4 text-purple-400" /> },
          { id: 'workflow_automation', label: 'Workflow Automation', desc: 'Trigger-based alerts, webhooks & automated ops', icon: <Zap className="w-4 h-4 text-amber-400" /> },
          { id: 'executive_dashboard', label: 'Executive Dashboard & BI', desc: 'Fleet analytics, corporate KPIs & executive reports', icon: <LayoutDashboard className="w-4 h-4 text-rose-400" /> },
          { id: 'api_sdk', label: 'Developer API & Webhooks', desc: 'REST API, Python SDK & webhook integrations', icon: <FileCode2 className="w-4 h-4 text-blue-400" /> },
          { id: 'affiliate', label: 'Affiliate Partner Program', desc: 'Partner dashboard, referral tracking & payouts', icon: <Share2 className="w-4 h-4 text-lime-400" /> },
          { id: 'admin', label: 'System Admin & Portal', desc: 'User administration, telemetry & server health', icon: <Settings className="w-4 h-4 text-slate-400" /> },
          { id: 'seo', label: 'SEO & Portal Indexing', desc: 'Metadata management & search indexing', icon: <Globe className="w-4 h-4 text-cyan-400" /> }
        ]
      }
    ]
  }
];
