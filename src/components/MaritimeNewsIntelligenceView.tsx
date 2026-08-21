import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Newspaper,
  TrendingUp,
  ShieldCheck,
  Building2,
  Anchor,
  Globe,
  Bell,
  Sparkles,
  Search,
  Filter,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  FileText,
  Download,
  Mail,
  Zap,
  BarChart3,
  Layers,
  Compass,
  Cpu,
  Ship,
  Wind,
  Droplet,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  Sliders,
  Award,
  Crown,
  Lock,
  Flame,
  Radio,
  Eye,
  Send,
  Printer,
  Copy,
  Check,
  X,
  Plus
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { PlanType, ViewMode } from '../types';
import { SubscriptionBanner } from './SubscriptionBanner';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (tier?: string) => void;
  onNavigateView?: (view: ViewMode) => void;
  isDarkMode?: boolean;
}

// User Roles for personalized intelligence
type UserRole = 
  | 'All Roles'
  | 'Naval Architect'
  | 'Marine Engineer'
  | 'Shipowner & Operator'
  | 'Port Manager'
  | 'Maritime Researcher'
  | 'Maritime Student'
  | 'Maritime Investor & Financier';

// News Categories
type NewsCategory =
  | 'all'
  | 'shipping'
  | 'shipbuilding'
  | 'ports'
  | 'offshore'
  | 'tech'
  | 'environment'
  | 'regulations'
  | 'safety';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  fullContent?: string;
  category: NewsCategory;
  categoryLabel: string;
  source: string;
  sourceType: 'IMO' | 'IACS' | 'Class' | 'Industry Wire' | 'Port Authority' | 'Academic' | 'Maritime News';
  publishedAt: string;
  timestamp: number;
  readTime: string;
  impactLevel: 'High Impact' | 'Medium' | 'Regulatory Alert' | 'Market Shift';
  targetRoles: string[];
  vesselTypes: string[];
  keyDataPoints: { label: string; value: string }[];
  aiSummary: string;
  aiIndustryImpact: string;
  aiOpportunities: string[];
  aiHistoricalPrecedent: string;
  marketTrendPrediction: string;
  tags: string[];
  imagePlaceholderColor: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  bookmarked?: boolean;
}

interface MarketTickerItem {
  id: string;
  name: string;
  code: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  description: string;
}

interface RegulationItem {
  id: string;
  body: 'IMO' | 'IACS' | 'DNV' | 'ABS' | 'EU Maritime' | 'USCG';
  code: string;
  title: string;
  status: 'In Force' | 'Adopted (Pending 2026/2027)' | 'Draft / In Review';
  effectiveDate: string;
  applicableVessels: string;
  summary: string;
  complianceImpact: string;
  penaltiesOrConsequences: string;
  keyRequirements: string[];
  severity: 'Critical' | 'Major' | 'Advisory';
}

interface PortMetric {
  id: string;
  portName: string;
  country: string;
  region: string;
  congestionStatus: 'Severe' | 'Moderate' | 'Normal' | 'Smooth';
  avgBerthWaitingHours: number;
  vesselsAtAnchor: number;
  throughputTeuYtd: string;
  throughputGrowth: string;
  automationLevel: string;
  keyAlert: string;
}

interface CompanyProfile {
  id: string;
  name: string;
  type: 'Carrier / Liner' | 'Shipbuilder' | 'Class Society' | 'Equipment / OEM' | 'Energy / Trader';
  hq: string;
  marketCapOrRevenue: string;
  fleetCountOrOrderbook: string;
  ciiRatingAvg: string;
  alternativeFuelShare: string;
  recentHeadlines: string[];
  financialOutlook: 'Strong Buy / Bullish' | 'Neutral / Stable' | 'Cautious';
  swotHighlight: string;
}

interface CustomAlertRule {
  id: string;
  title: string;
  category: string;
  condition: string;
  channel: 'In-App + Email' | 'In-App Only' | 'SMS + Urgent Push';
  enabled: boolean;
  triggeredCount: number;
}

// ----------------------------------------------------
// Mock Dataset for Market Tickers
// ----------------------------------------------------
const MARKET_TICKERS: MarketTickerItem[] = [
  { id: 'bdi', name: 'Baltic Dry Index', code: 'BDI', value: '1,942 pts', change: '+3.4%', isPositive: true, period: 'Daily', description: 'Capesize & Panamax bulk freight benchmark' },
  { id: 'scfi', name: 'Shanghai Containerized Index', code: 'SCFI', value: '$2,215 / TEU', change: '+5.1%', isPositive: true, period: 'Weekly', description: 'Spot rates Asia to Europe & US West Coast' },
  { id: 'vlsfo_sin', name: 'VLSFO Bunker (Singapore)', code: 'VLSFO-SIN', value: '$612.50 / MT', change: '-1.2%', isPositive: false, period: 'Real-Time', description: '0.5% Low Sulphur Fuel Oil' },
  { id: 'lng_spot', name: 'LNG Carrier Spot Rate (MEGI)', code: 'LNG-174k', value: '$84,000 / day', change: '+8.2%', isPositive: true, period: 'Daily', description: 'Modern 174,000 cbm 2-stroke spot charter' },
  { id: 'eu_ets', name: 'EU ETS Maritime Carbon Allowance', code: 'EUA-MAR', value: '€74.80 / tCO2e', change: '+2.1%', isPositive: true, period: 'Daily', description: 'Surrender allowance for voyages into EU ports' },
  { id: 'demo_ind', name: 'Subcontinent Demolition Price', code: 'DEMO-BD', value: '$535 / LDT', change: '-0.8%', isPositive: false, period: 'Weekly', description: 'Chittagong / Alang scrap steel pricing' },
  { id: 'bdti', name: 'Baltic Dirty Tanker Index', code: 'BDTI', value: '1,128 pts', change: '+1.7%', isPositive: true, period: 'Daily', description: 'Crude oil VLCC / Suezmax freight benchmark' }
];

// ----------------------------------------------------
// Mock Dataset for Global Maritime News Items
// ----------------------------------------------------
const MARITIME_NEWS_DATABASE: NewsItem[] = [
  {
    id: 'news-01',
    title: 'IMO MEPC 83 Formulates Mandatory Carbon Intensity Target Trajectories & Net-Zero 2050 Fuel Standard',
    summary: 'The Marine Environment Protection Committee has finalized the mid-term greenhouse gas reduction framework, establishing the Global Maritime Fuel Standard with progressive GHG intensity limits from 2027.',
    category: 'regulations',
    categoryLabel: 'IMO & Regulations',
    source: 'IMO Press Briefing / MEPC',
    sourceType: 'IMO',
    publishedAt: '20 mins ago',
    timestamp: Date.now() - 1000 * 60 * 20,
    readTime: '4 min read',
    impactLevel: 'Regulatory Alert',
    targetRoles: ['Shipowner & Operator', 'Naval Architect', 'Marine Engineer', 'Maritime Researcher', 'Maritime Investor & Financier'],
    vesselTypes: ['Container Ship', 'Crude Tanker', 'Bulk Carrier', 'Gas Carrier', 'Ro-Pax'],
    keyDataPoints: [
      { label: 'Target Year', value: '2027 Inception' },
      { label: 'Fuel GHG Red.', value: '-65% by 2035' },
      { label: 'Carbon Levy Base', value: '$100-$150 / tCO2e (Draft)' },
      { label: 'Global Compliance Scope', value: '5,000+ GT Vessels' }
    ],
    aiSummary: 'IMO MEPC 83 transitions decarbonization from voluntary goals into binding technical and economic measures. The newly solidified Global Fuel Standard mandates strict well-to-wake GHG reductions for all deep-sea vessels starting 2027, backed by a structured GHG pricing mechanism.',
    aiIndustryImpact: 'Shipowners operating conventional heavy fuel oil assets without dual-fuel readiness face steep compliance penalties. Demands for ammonia and green methanol newbuilds will surge by ~38% across major shipyards over the next 24 months.',
    aiOpportunities: [
      'Accelerated retrofitting for onboard carbon capture and storage (OCCS) systems.',
      'Investment in green methanol and bio-LNG bunkering corridor infrastructure.',
      'Software optimization contracts for real-time voyage and CII compliance routing.'
    ],
    aiHistoricalPrecedent: 'Mirrors the 2020 IMO 0.50% Global Sulphur Cap rollout, but with 4x greater capital expenditure implications across fleet propulsions.',
    marketTrendPrediction: 'Accelerates phase-out of tier-1 older tonnage; second-hand values for 15+ year-old non-compliant vessels projected to soften by 12-18%.',
    tags: ['IMO', 'MEPC 83', 'Decarbonization', 'Fuel Standard', 'Carbon Levy', 'CII'],
    imagePlaceholderColor: 'from-emerald-950 via-teal-900 to-slate-900',
    isBreaking: true,
    isFeatured: true
  },
  {
    id: 'news-02',
    title: 'HD Hyundai Heavy Industries Bags $1.8B Order for 12 Ultra-Large 16,000 TEU Methanol Dual-Fuel Boxships',
    summary: 'South Korea’s premier shipbuilder cements its leadership with a major European liner order, integrating next-generation wing sails and waste heat recovery generators.',
    category: 'shipbuilding',
    categoryLabel: 'Shipbuilding & Yards',
    source: 'Korea Shipbuilding & Offshore Engineering (KSOE)',
    sourceType: 'Industry Wire',
    publishedAt: '1 hour ago',
    timestamp: Date.now() - 1000 * 60 * 65,
    readTime: '3 min read',
    impactLevel: 'Market Shift',
    targetRoles: ['Naval Architect', 'Shipowner & Operator', 'Maritime Investor & Financier'],
    vesselTypes: ['Container Ship'],
    keyDataPoints: [
      { label: 'Total Contract', value: '$1.84 Billion USD' },
      { label: 'Per Vessel Price', value: '$153.3M USD' },
      { label: 'Delivery Window', value: 'Q1 2027 – Q4 2028' },
      { label: 'Propulsion', value: 'MAN B&W 2-Stroke Dual Fuel' }
    ],
    aiSummary: 'HD Hyundai secures a 12-ship container series showcasing record slot pricing and green fuel adoption. The hull form incorporates optimized bulbous bow configurations tailored specifically for low-speed eco-cruising.',
    aiIndustryImpact: 'Top-tier Asian shipyard berths are now almost fully booked through late 2028, pushing new container build delivery dates into 2029 and supporting high newbuild asset values.',
    aiOpportunities: [
      'Supply contracts for cryogenic fuel gas supply systems (FGSS) and methanol tanks.',
      'Class society verification tenders for dual-fuel safety systems (DNV / ABS).'
    ],
    aiHistoricalPrecedent: 'Comparable to the 2021-2022 megaship order spree, but focused heavily on green-fuel readiness rather than pure capacity expansion.',
    marketTrendPrediction: 'Containership newbuilding price index expected to remain elevated above 190 points through 2026.',
    tags: ['HD Hyundai', 'Methanol', 'Dual Fuel', 'Orderbook', 'Container Ships', 'KSOE'],
    imagePlaceholderColor: 'from-cyan-950 via-blue-900 to-slate-900',
    isFeatured: true
  },
  {
    id: 'news-03',
    title: 'Red Sea Re-Routing Drives Global Ton-Mile Demand Up 9.8%, Fueling Sustained Freight Volatility',
    summary: 'Continued transit diversions around the Cape of Good Hope absorb nearly 7% of global container and tanker fleet capacity, keeping bunker fuel expenditure at historic regional highs.',
    category: 'shipping',
    categoryLabel: 'Global Shipping',
    source: 'Clarksons Research & Lloyd’s List Intelligence',
    sourceType: 'Maritime News',
    publishedAt: '3 hours ago',
    timestamp: Date.now() - 1000 * 60 * 180,
    readTime: '5 min read',
    impactLevel: 'High Impact',
    targetRoles: ['Shipowner & Operator', 'Port Manager', 'Maritime Investor & Financier'],
    vesselTypes: ['Container Ship', 'Product Tanker', 'Chemical Tanker', 'LNG Carrier'],
    keyDataPoints: [
      { label: 'Cape Voyage Addition', value: '+10 to 14 Days' },
      { label: 'Ton-Mile Increase', value: '+9.8% YoY' },
      { label: 'Extra Bunker / Trip', value: '~$920,000 USD' },
      { label: 'Suez Transit Drop', value: '-62% vs 2023' }
    ],
    aiSummary: 'Geopolitical avoidance of the Bab-el-Mandeb strait continues to absorb substantial global vessel capacity, preventing what analysts previously anticipated would be massive container fleet oversupply.',
    aiIndustryImpact: 'Higher vessel speeds needed to maintain weekly schedule integrity are causing accelerated machinery wear, higher lubricating oil consumption, and an increased overall carbon footprint.',
    aiOpportunities: [
      'Increased demand for South African and West African bunkering hubs (Durban, Port Louis, Walvis Bay).',
      'High-yield dry dock hull coating retrofits (silicone foul-release) to reduce propulsion fuel burn during longer passages.'
    ],
    aiHistoricalPrecedent: 'Longest sustained closure/avoidance since the 8-year Suez Canal shutdown between 1967 and 1975.',
    marketTrendPrediction: 'Charter rates for Panamax and Post-Panamax tonnage to remain robust with low idle fleet numbers under 0.8%.',
    tags: ['Red Sea', 'Suez', 'Ton-Mile', 'Cape of Good Hope', 'Freight Rates', 'Bunkering'],
    imagePlaceholderColor: 'from-amber-950 via-red-900 to-slate-900',
    isBreaking: true
  },
  {
    id: 'news-04',
    title: 'Port of Singapore Achieves Record 41.2M TEU Throughput While Deploying 100% Automated Tuas Port Phase 2',
    summary: 'The Maritime and Port Authority of Singapore (MPA) reports record annual transshipment volumes, powered by 5G automated guided vehicles (AGVs) and AI-driven predictive vessel traffic management.',
    category: 'ports',
    categoryLabel: 'Port Developments',
    source: 'Maritime and Port Authority of Singapore (MPA)',
    sourceType: 'Port Authority',
    publishedAt: '4 hours ago',
    timestamp: Date.now() - 1000 * 60 * 240,
    readTime: '4 min read',
    impactLevel: 'Market Shift',
    targetRoles: ['Port Manager', 'Shipowner & Operator', 'Naval Architect'],
    vesselTypes: ['Container Ship', 'Feeder Vessel'],
    keyDataPoints: [
      { label: 'Annual Throughput', value: '41.2 Million TEU' },
      { label: 'Turnaround Time', value: '18.4 hrs (-12%)' },
      { label: 'Electric AGV Fleet', value: '220 Units' },
      { label: 'Tuas Full Capacity', value: '65M TEU (Target 2040)' }
    ],
    aiSummary: 'Singapore’s multi-billion dollar mega Tuas port initiative sets a new world benchmark for green, automated port infrastructure, cutting average container turnaround time by 12% despite regional peak-season congestion.',
    aiIndustryImpact: 'Accelerates competitive automation pushes at rival hubs like Shanghai, Ningbo, Busan, and Rotterdam, intensifying pressure on mid-sized ports to modernize shore power and digital clearance.',
    aiOpportunities: [
      'Port automation software, AI digital twin terminal licensing, and shore-power cold ironing hardware tenders.'
    ],
    aiHistoricalPrecedent: 'Similar to the transformative impact of the first fully automated Maasvlakte II terminal in Rotterdam a decade ago.',
    marketTrendPrediction: 'Transshipment hubs with integrated green bunkering (ammonia/methanol) will capture over 60% of tier-1 liner network calls by 2030.',
    tags: ['Singapore', 'Tuas Port', 'Automation', 'Port Performance', 'MPA', 'Smart Port'],
    imagePlaceholderColor: 'from-blue-950 via-indigo-900 to-slate-900'
  },
  {
    id: 'news-05',
    title: 'DNV Releases Updated Class Guidelines for Ammonia-Fueled Vessels & Toxicity Zone Management',
    summary: 'New comprehensive rules address crew safety, boil-off gas dispersion models, double-barrier piping systems, and emergency release scrubbers for next-gen zero-carbon carriers.',
    category: 'regulations',
    categoryLabel: 'Classification Societies',
    source: 'DNV Maritime Rules & Standards',
    sourceType: 'Class',
    publishedAt: '5 hours ago',
    timestamp: Date.now() - 1000 * 60 * 300,
    readTime: '6 min read',
    impactLevel: 'Regulatory Alert',
    targetRoles: ['Naval Architect', 'Marine Engineer', 'Maritime Researcher', 'Shipowner & Operator'],
    vesselTypes: ['Ammonia Carrier', 'Bulk Carrier', 'Gas Carrier'],
    keyDataPoints: [
      { label: 'Toxicity Perimeter', value: 'Hazard Zone 0/1/2 Rules' },
      { label: 'Double Barrier', value: 'Mandatory on Fuel Gas Lines' },
      { label: 'Vent Mast Discharge', value: '<25 ppm at Deck level' },
      { label: 'Class Notation', value: 'Ammonia(Ready) v3.2' }
    ],
    aiSummary: 'DNV establishes definitive prescriptive safety guidelines for handling ammonia toxicity and stress corrosion cracking (SCC) risks in cryogenic fuel fuel tanks and machinery spaces.',
    aiIndustryImpact: 'Naval architects can now finalize lines, general arrangements, and ventilation ducting on live ammonia-fuel ship projects with regulatory certainty, unblocking billions in pending shipbuilding contracts.',
    aiOpportunities: [
      'Design verification engineering services for ammonia dispersion CFD modeling.',
      'Specialized crew safety simulation and STCW training module development.'
    ],
    aiHistoricalPrecedent: 'Parallels the creation of the IGF Code for LNG fuel in 2015, which paved the way for modern LNG dual-fuel commercial adoption.',
    marketTrendPrediction: 'First commercial deep-sea ammonia-fueled bulk carriers and tankers scheduled to enter active commercial service by late 2026.',
    tags: ['DNV', 'Ammonia', 'Class Rules', 'Safety', 'Naval Architecture', 'IGF Code'],
    imagePlaceholderColor: 'from-purple-950 via-slate-900 to-slate-900'
  },
  {
    id: 'news-06',
    title: 'Offshore Floating Wind Boom: 15GW+ Deepwater Leases Awarded Across North Sea & Asia-Pacific',
    summary: 'Floating foundation technology accelerates with semi-submersible and spar designs capturing massive multi-billion EPCI tenders for offshore energy majors.',
    category: 'offshore',
    categoryLabel: 'Offshore Energy',
    source: 'Offshore Wind Journal & Renewable Energy Institute',
    sourceType: 'Industry Wire',
    publishedAt: '6 hours ago',
    timestamp: Date.now() - 1000 * 60 * 360,
    readTime: '4 min read',
    impactLevel: 'Market Shift',
    targetRoles: ['Naval Architect', 'Marine Engineer', 'Maritime Investor & Financier'],
    vesselTypes: ['Wind Turbine Installation Vessel (WTIV)', 'Cable Laying Vessel', 'Offshore CTV'],
    keyDataPoints: [
      { label: 'Total Capacity', value: '15.4 GW Awarded' },
      { label: 'Turbine Rating', value: '15MW to 20MW Units' },
      { label: 'Water Depth Range', value: '80m to 450m' },
      { label: 'WTIV Day Rates', value: '$340,000 / day (+15%)' }
    ],
    aiSummary: 'Deepwater offshore wind ventures are creating massive new demand for heavy lift installation vessels, dynamic positioning (DP3) cable layers, and naval architectural floating foundation mooring analyses.',
    aiIndustryImpact: 'Subsea mooring engineering, synthetic mooring lines, and anchor handling tug supply (AHTS) vessels are experiencing severe supply crunches across European and Japanese waters.',
    aiOpportunities: [
      'Engineering design of serial modular floating steel & concrete substructures.',
      'Shipyard fabrication contracts for next-gen 3,000-tonne crane WTIVs.'
    ],
    aiHistoricalPrecedent: 'Echoes the rapid boom of deepwater offshore oil & gas semi-submersibles in the early 2000s, now repurposed for clean maritime power.',
    marketTrendPrediction: 'Offshore installation vessel supply deficit projected to peak between 2027 and 2030, keeping vessel day rates near record highs.',
    tags: ['Floating Wind', 'Offshore', 'WTIV', 'Renewables', 'Mooring', 'North Sea'],
    imagePlaceholderColor: 'from-sky-950 via-teal-900 to-slate-900'
  },
  {
    id: 'news-07',
    title: 'Autonomous Navigation Milestone: 120nm Commercial Cargo Voyage Completed with Level 4 AI Copilot',
    summary: 'A 5,000 DWT general cargo vessel successfully navigates complex coastal waterways in Norway without human intervention on the bridge, verified by ClassNK & DNV.',
    category: 'tech',
    categoryLabel: 'Maritime Technology',
    source: 'Autonomous Maritime Systems Consortium',
    sourceType: 'Academic',
    publishedAt: '8 hours ago',
    timestamp: Date.now() - 1000 * 60 * 480,
    readTime: '3 min read',
    impactLevel: 'High Impact',
    targetRoles: ['Marine Engineer', 'Naval Architect', 'Maritime Researcher', 'Maritime Student'],
    vesselTypes: ['General Cargo', 'Short Sea Feeder', 'Autonomous Vessel'],
    keyDataPoints: [
      { label: 'Voyage Distance', value: '120 Nautical Miles' },
      { label: 'COLREGs Events', value: '18 Autonomous Encounters' },
      { label: 'Sensor Fusion', value: 'LiDAR + HD Thermal + Radar + AIS' },
      { label: 'Safety Margin', value: 'Zero Incident / 100% Adherence' }
    ],
    aiSummary: 'Demonstrates successful real-world execution of automated collision avoidance (COLREGs Rule 8 & 14) using deep reinforcement learning and edge-computed sensor fusion.',
    aiIndustryImpact: 'Proves the feasibility of lean-crewed coastal shipping, reducing operational expenditure by an estimated 22-30% while opening pathways to unmanned night navigation.',
    aiOpportunities: [
      'Shore control center (SCC) software integrations and high-bandwidth satellite link equipment.',
      'Cybersecurity hardening conforming to IACS Unified Requirement E26/E27.'
    ],
    aiHistoricalPrecedent: 'Marks the maritime equivalent of automotive Level 4 highway autonomy validation.',
    marketTrendPrediction: 'Short-sea and tug operations will lead autonomous adoption, with over 150 commercial autonomous vessels expected by 2029.',
    tags: ['Autonomous Ships', 'COLREGs', 'AI Copilot', 'Sensor Fusion', 'Maritime Tech'],
    imagePlaceholderColor: 'from-indigo-950 via-purple-900 to-slate-900'
  },
  {
    id: 'news-08',
    title: 'IACS Enforces Mandatory Cyber Resilience Unified Requirements (UR E26 & E27) for All New Contracts',
    summary: 'International Association of Classification Societies mandates end-to-end operational technology (OT) cyber security on all onboard industrial control systems.',
    category: 'regulations',
    categoryLabel: 'IACS & Class Rules',
    source: 'IACS Secretariat & Technical Committee',
    sourceType: 'IACS',
    publishedAt: '12 hours ago',
    timestamp: Date.now() - 1000 * 60 * 720,
    readTime: '5 min read',
    impactLevel: 'Regulatory Alert',
    targetRoles: ['Marine Engineer', 'Naval Architect', 'Shipowner & Operator'],
    vesselTypes: ['All Commercial Vessels contracted after Jan 2024'],
    keyDataPoints: [
      { label: 'Scope', value: 'UR E26 (Shipboard) & E27 (OEM Systems)' },
      { label: 'Enforcement', value: 'Mandatory for Class Approval' },
      { label: 'Systems Covered', value: 'ECDIS, Engine Control, Power Mgmt, Cargo' },
      { label: 'Audit Cycle', value: 'Annual Cyber Survey' }
    ],
    aiSummary: 'IACS UR E26 and E27 establish rigorous cyber resilience requirements across vessel design, construction, commissioning, and operational lifecycle, compelling OEMs to secure programmable logic controllers (PLCs).',
    aiIndustryImpact: 'Shipyards must implement secure network zoning, intrusion detection, and cryptographic access control before sea trials, adding ~0.5-1% to electrical engineering project hours.',
    aiOpportunities: [
      'Maritime OT cybersecurity consulting and penetration testing services.',
      'Certified Class-approved secure gateway hardware.'
    ],
    aiHistoricalPrecedent: 'The most comprehensive mandatory cybersecurity standard since IMO ISM Code Cyber Risk Resolution MSC.428(98).',
    marketTrendPrediction: 'Non-compliant legacy vessels face increased vetting scrutiny by major energy charterers (OCIMF SIRE 2.0).',
    tags: ['IACS', 'UR E26', 'UR E27', 'Cybersecurity', 'OT Security', 'Classification'],
    imagePlaceholderColor: 'from-slate-950 via-slate-900 to-rose-950'
  }
];

// ----------------------------------------------------
// Regulatory Hub Data
// ----------------------------------------------------
const REGULATORY_INTELLIGENCE: RegulationItem[] = [
  {
    id: 'reg-01',
    body: 'IMO',
    code: 'SOLAS Ch. II-2 / MSC.107',
    title: 'Enhanced Fire Safety Requirements for Vehicle, Special Category and Ro-Ro Spaces',
    status: 'Adopted (Pending 2026/2027)',
    effectiveDate: 'January 1, 2026',
    applicableVessels: 'Passenger Ships, Pure Car & Truck Carriers (PCTC), Ro-Pax',
    summary: 'Mandatory linear heat and smoke detection, video monitoring with AI analytics, and fixed water-based fire-extinguishing systems on open weather decks carrying alternative fuel vehicles (EVs).',
    complianceImpact: 'High - Existing fleets must undergo safety audits; newbuildings require upgraded foam/deluge system capacities.',
    penaltiesOrConsequences: 'Detention under Port State Control (PSC) and class notation suspension.',
    keyRequirements: [
      'Fixed CCTV coverage of all cargo vehicle decks with 24/7 bridge display.',
      'Independent thermal detection systems with sub-2 minute alarm triggers.',
      'High-expansion foam or water-mist systems rated for lithium-ion battery runaway events.'
    ],
    severity: 'Critical'
  },
  {
    id: 'reg-02',
    body: 'EU Maritime',
    code: 'FuelEU Maritime 2025/2026',
    title: 'Regulation (EU) 2023/1805 on the Use of Renewable & Low-Carbon Fuels in Maritime Transport',
    status: 'In Force',
    effectiveDate: 'January 1, 2025 (Tiered to 2050)',
    applicableVessels: 'All vessels >5,000 GT calling at EU/EEA ports (100% intra-EU, 50% extra-EU)',
    summary: 'Limits the greenhouse gas (GHG) intensity of energy used on board by 2% from 2025, ramping up to 6% in 2030, 31% in 2040, and 80% in 2050.',
    complianceImpact: 'Critical - Direct financial penalties calculated per gigajoule of non-compliant energy consumed on board.',
    penaltiesOrConsequences: '€2,400 per tonne of VLSFO energy equivalent deficit, compounded exponentially annually.',
    keyRequirements: [
      'Mandatory accredited monitoring plan submitted under EU THETIS-MRV.',
      'Connection to Onshore Power Supply (OPS) at major EU ports for container & passenger ships by 2030.',
      'Direct well-to-wake emissions calculation accounting for methane and N2O slip.'
    ],
    severity: 'Critical'
  },
  {
    id: 'reg-03',
    body: 'IMO',
    code: 'MARPOL Annex VI Reg 28',
    title: 'Carbon Intensity Indicator (CII) Formal Review & Revision Framework',
    status: 'In Force',
    effectiveDate: 'Formal MEPC 83 Review in Progress',
    applicableVessels: 'Bulk Carriers, Tankers, Container Ships, Gas Carriers >5,000 GT',
    summary: 'IMO review of CII correction factors for port waiting time, adverse weather, short voyages, and refrigerated cargo consumption to eliminate distortion.',
    complianceImpact: 'Major - Vessels rated D for 3 consecutive years or E for 1 year must develop and submit approved Corrective Action Plans (SEEMP Part III).',
    penaltiesOrConsequences: 'Loss of charterability, increased marine insurance risk premiums, and potential trading constraints.',
    keyRequirements: [
      'Annual calculation of attained annual operational CII vs required CII benchmark.',
      'Enforced implementation of SEEMP Part III energy efficiency operational measures.',
      'Mandatory voyage fuel log audits by authorized Recognized Organizations (ROs).'
    ],
    severity: 'Major'
  },
  {
    id: 'reg-04',
    body: 'IACS',
    code: 'UR S11A (Rev 2)',
    title: 'Longitudinal Strength of Hull Girder & Wave Load Exceedance Criteria',
    status: 'In Force',
    effectiveDate: 'July 1, 2025',
    applicableVessels: 'Bulk Carriers, Ore Carriers, Container Ships >150m in length',
    summary: 'Updated non-linear wave bending moment coefficients accounting for extreme whipping and springing hydroelastic phenomena in large container vessels.',
    complianceImpact: 'Major - Increases minimum deck and bottom plating thickness in ultra-large container newbuild designs.',
    penaltiesOrConsequences: 'Rejection of structural hull FEA and class approval drawings by classification societies.',
    keyRequirements: [
      'Mandatory hydro-structural whipping analysis for vessels >10,000 TEU.',
      'Revised fatigue design factor (DFF) of 3.0 applied to upper deck hatch corners.',
      'Direct calculation of combined vertical and horizontal wave bending moments.'
    ],
    severity: 'Major'
  }
];

// ----------------------------------------------------
// Global Ports Dataset
// ----------------------------------------------------
const GLOBAL_PORTS_DATA: PortMetric[] = [
  {
    id: 'port-sin',
    portName: 'Port of Singapore',
    country: 'Singapore',
    region: 'Southeast Asia',
    congestionStatus: 'Normal',
    avgBerthWaitingHours: 16.2,
    vesselsAtAnchor: 48,
    throughputTeuYtd: '41.2M TEU',
    throughputGrowth: '+4.8%',
    automationLevel: '94% (Tuas Automated AGV/Cranes)',
    keyAlert: 'Tuas Phase 2 berth expansions fully active with zero bunkering delays reported.'
  },
  {
    id: 'port-sha',
    portName: 'Shanghai (Yangshan)',
    country: 'China',
    region: 'East Asia',
    congestionStatus: 'Moderate',
    avgBerthWaitingHours: 32.5,
    vesselsAtAnchor: 92,
    throughputTeuYtd: '49.1M TEU',
    throughputGrowth: '+3.9%',
    automationLevel: '98% (World Largest Automated Terminal)',
    keyAlert: 'Seasonal fog and high export cargo volumes creating minor 24-48h anchorage queues.'
  },
  {
    id: 'port-rot',
    portName: 'Port of Rotterdam',
    country: 'Netherlands',
    region: 'Northern Europe',
    congestionStatus: 'Normal',
    avgBerthWaitingHours: 22.0,
    vesselsAtAnchor: 24,
    throughputTeuYtd: '14.8M TEU',
    throughputGrowth: '+2.1%',
    automationLevel: '90% (Maasvlakte II Deepsea Automated)',
    keyAlert: 'Expanded shore-power cold ironing mandatory for all scheduled liner calls.'
  },
  {
    id: 'port-lax',
    portName: 'Port of Los Angeles / Long Beach',
    country: 'USA',
    region: 'North America West Coast',
    congestionStatus: 'Normal',
    avgBerthWaitingHours: 19.5,
    vesselsAtAnchor: 16,
    throughputTeuYtd: '18.9M TEU',
    throughputGrowth: '+6.2%',
    automationLevel: '72% (Pier 400 & Long Beach Container Terminal)',
    keyAlert: 'Rail dwell times reduced to 3.2 days; zero offshore vessel gridlock.'
  },
  {
    id: 'port-bus',
    portName: 'Busan New Port',
    country: 'South Korea',
    region: 'East Asia',
    congestionStatus: 'Smooth',
    avgBerthWaitingHours: 14.8,
    vesselsAtAnchor: 19,
    throughputTeuYtd: '23.4M TEU',
    throughputGrowth: '+4.5%',
    automationLevel: '88% (Remote Quay Crane Operations)',
    keyAlert: 'High-speed transshipment operations running at 99.4% scheduled reliability.'
  },
  {
    id: 'port-pan',
    portName: 'Panama Canal Transit Hub',
    country: 'Panama',
    region: 'Central America',
    congestionStatus: 'Moderate',
    avgBerthWaitingHours: 42.0,
    vesselsAtAnchor: 58,
    throughputTeuYtd: '510M PC/UMS Tons',
    throughputGrowth: '+12.4%',
    automationLevel: '50% (Lock Dispatch Optimization)',
    keyAlert: 'Gatun Lake water levels normalized; daily transit slots restored to 36 vessels/day.'
  }
];

// ----------------------------------------------------
// Company Intelligence Profiles
// ----------------------------------------------------
const COMPANY_PROFILES: CompanyProfile[] = [
  {
    id: 'comp-maersk',
    name: 'A.P. Moller - Maersk',
    type: 'Carrier / Liner',
    hq: 'Copenhagen, Denmark',
    marketCapOrRevenue: '$51.2B USD Revenue',
    fleetCountOrOrderbook: '710 Vessels (4.3M TEU)',
    ciiRatingAvg: 'A / B (Top Decarbonization Leader)',
    alternativeFuelShare: '24% of fleet on order (Green Methanol)',
    recentHeadlines: [
      'First 18 large green methanol dual-fuel vessels in active global rotation.',
      'Expanded integrated logistics contract with European automotive majors.',
      'Investing $1.2B in dedicated clean methanol supply chain agreements.'
    ],
    financialOutlook: 'Strong Buy / Bullish',
    swotHighlight: 'Leader in end-to-end green supply chain; exposure to ocean rate cyclicals offset by logistics segment.'
  },
  {
    id: 'comp-hhi',
    name: 'HD Hyundai (KSOE)',
    type: 'Shipbuilder',
    hq: 'Ulsan / Seoul, South Korea',
    marketCapOrRevenue: '$16.8B USD Market Cap',
    fleetCountOrOrderbook: '178 Vessels on Orderbook ($34B Backlog)',
    ciiRatingAvg: 'Tier-1 Eco-Design Benchmark',
    alternativeFuelShare: '82% of Orderbook (LNG, Methanol, Ammonia, LPG)',
    recentHeadlines: [
      'Commercialized Hi-NAS 2.0 AI autonomous navigation suite on 20+ newbuilds.',
      'Secured world’s first full-scale ammonia dual-fuel gas carrier contracts.',
      'Shipyard drydocks fully booked through Q4 2028.'
    ],
    financialOutlook: 'Strong Buy / Bullish',
    swotHighlight: 'Dominates high-value LNG/Methanol dual-fuel segment; potential headwind from rising steel plate costs.'
  },
  {
    id: 'comp-dnv',
    name: 'DNV Maritime',
    type: 'Class Society',
    hq: 'Oslo, Norway',
    marketCapOrRevenue: '€3.1B Group Revenue',
    fleetCountOrOrderbook: '12,500+ Ships & Mobile Units in Class (265M GT)',
    ciiRatingAvg: 'Standard Setter',
    alternativeFuelShare: 'Over 65% of global dual-fuel newbuilds classed by DNV',
    recentHeadlines: [
      'Published Maritime Forecast to 2050 with carbon neutrality roadmaps.',
      'Launched Veracity cloud data integration platform for automated EU MRV/ETS.',
      'Pioneering Class guidelines for onboard hydrogen fuel cell installations.'
    ],
    financialOutlook: 'Neutral / Stable',
    swotHighlight: 'Unrivaled technical authority in maritime decarbonization and digital twin verifications.'
  },
  {
    id: 'comp-msc',
    name: 'Mediterranean Shipping Company (MSC)',
    type: 'Carrier / Liner',
    hq: 'Geneva, Switzerland',
    marketCapOrRevenue: 'Privately Held (~$85B+ Asset Base)',
    fleetCountOrOrderbook: '840+ Vessels (6.0M TEU, World No.1)',
    ciiRatingAvg: 'B / C (Massive Modernization Underway)',
    alternativeFuelShare: '130+ dual-fuel LNG & Bio-methane vessels in pipeline',
    recentHeadlines: [
      'Expanded market share dominance to 20.2% of global ocean container capacity.',
      'Aggressive acquisition of second-hand mid-size container tonnage.',
      'Scaling dedicated air cargo and terminal investments across Mediterranean.'
    ],
    financialOutlook: 'Strong Buy / Bullish',
    swotHighlight: 'Massive economies of scale and standalone network independence; large legacy fleet requires ongoing retrofits.'
  }
];

// ----------------------------------------------------
// Market Chart Data (6-Month Trends)
// ----------------------------------------------------
const FREIGHT_TRENDS_DATA = [
  { month: 'Oct 25', bdi: 1640, scfi: 1820, bdti: 980 },
  { month: 'Nov 25', bdi: 1780, scfi: 1950, bdti: 1040 },
  { month: 'Dec 25', bdi: 1890, scfi: 2150, bdti: 1110 },
  { month: 'Jan 26', bdi: 2050, scfi: 2380, bdti: 1180 },
  { month: 'Feb 26', bdi: 1880, scfi: 2120, bdti: 1090 },
  { month: 'Mar 26', bdi: 1942, scfi: 2215, bdti: 1128 }
];

const ORDERBOOK_FUEL_DATA = [
  { name: 'LNG Dual Fuel', value: 42, color: '#38bdf8' },
  { name: 'Green Methanol', value: 26, color: '#34d399' },
  { name: 'Ammonia / LPG Ready', value: 12, color: '#a78bfa' },
  { name: 'Battery / Hybrid', value: 6, color: '#facc15' },
  { name: 'Conventional (HFO+Scrubber)', value: 14, color: '#f87171' }
];

const FLEET_GROWTH_DATA = [
  { year: '2022', deliveries: 32.5, demolitions: 4.8, netGrowth: 3.2 },
  { year: '2023', deliveries: 38.2, demolitions: 5.4, netGrowth: 3.8 },
  { year: '2024', deliveries: 46.1, demolitions: 6.9, netGrowth: 4.6 },
  { year: '2025', deliveries: 54.8, demolitions: 8.2, netGrowth: 5.1 },
  { year: '2026 (F)', deliveries: 51.2, demolitions: 11.4, netGrowth: 3.9 }
];

export const MaritimeNewsIntelligenceView: React.FC<Props> = ({
  userPlan = 'free',
  onOpenPricing,
  onNavigateView,
  isDarkMode = true
}) => {
  // Navigation & Sub-Tab State
  type ActiveTab = 
    | 'feed'
    | 'regulations'
    | 'markets'
    | 'ports'
    | 'companies'
    | 'ai_reports'
    | 'alerts'
    | 'newsletter';

  const [activeTab, setActiveTab] = useState<ActiveTab>('feed');
  const [selectedRole, setSelectedRole] = useState<UserRole>('All Roles');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['news-01', 'news-05']);
  
  // AI Speech Audio Briefing State
  const [isPlayingAudioBriefing, setIsPlayingAudioBriefing] = useState(false);
  const [audioBriefingText, setAudioBriefingText] = useState<string>('');

  // AI Report Generator Studio State
  const [reportTopic, setReportTopic] = useState('Global Fleet Decarbonization & Alternative Fuels Outlook 2026-2030');
  const [reportType, setReportType] = useState<'Executive Brief' | 'Comprehensive Market Report' | 'Class Rule Technical Memo' | 'Competitor Dossier'>('Comprehensive Market Report');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [generatedReportContent, setGeneratedReportContent] = useState<string | null>(null);

  // Custom Alerts State
  const [alertRules, setAlertRules] = useState<CustomAlertRule[]>([
    { id: 'alt-1', title: 'IMO MEPC 83 Carbon Intensity & Fuel Standard Updates', category: 'Regulations', condition: 'Any publication with tag IMO / MEPC', channel: 'In-App + Email', enabled: true, triggeredCount: 14 },
    { id: 'alt-2', title: 'Baltic Dry Index (BDI) > 5% Daily Volatility', category: 'Market Data', condition: 'Daily shift ≥ 5.0%', channel: 'In-App + Email', enabled: true, triggeredCount: 28 },
    { id: 'alt-3', title: 'Port of Singapore / Ningbo Anchorage Waiting > 36 Hours', category: 'Port Congestion', condition: 'Waiting time > 36.0h', channel: 'SMS + Urgent Push', enabled: false, triggeredCount: 6 },
    { id: 'alt-4', title: 'Dual-Fuel Methanol & Ammonia Shipyard Orders', category: 'Shipbuilding', condition: 'Order announcement > $100M USD', channel: 'In-App Only', enabled: true, triggeredCount: 19 }
  ]);
  const [newAlertKeyword, setNewAlertKeyword] = useState('');

  // Newsletter Subscription State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedCadence, setSubscribedCadence] = useState<'Daily Briefing' | 'Weekly Intelligence' | 'Monthly Naval Tech Magazine'>('Daily Briefing');
  const [isSubscribedSuccess, setIsSubscribedSuccess] = useState(false);

  // Filtered News Items
  const filteredNews = useMemo(() => {
    return MARITIME_NEWS_DATABASE.filter((item) => {
      // Role Filter
      if (selectedRole !== 'All Roles' && !item.targetRoles.includes(selectedRole)) {
        return false;
      }
      // Category Filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search Query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchSummary = item.summary.toLowerCase().includes(q);
        const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
        const matchSource = item.source.toLowerCase().includes(q);
        if (!matchTitle && !matchSummary && !matchTags && !matchSource) {
          return false;
        }
      }
      return true;
    });
  }, [selectedRole, selectedCategory, searchQuery]);

  // Audio Speech Synthesis handler for daily briefing
  const handleToggleAudioBriefing = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudioBriefing) {
      window.speechSynthesis.cancel();
      setIsPlayingAudioBriefing(false);
      return;
    }

    const briefingSummary = `Welcome to the AI Maritime Hub Daily Intelligence Dispatch for ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. Top headline: IMO Marine Environment Protection Committee MEPC 83 has approved binding 2027 Global Fuel Standard frameworks, impacting all deep-sea assets. In shipbuilding, HD Hyundai secured a 1.84 billion dollar dual-fuel containership contract. Baltic Dry Index trades steady at 1,942 points, while the Port of Singapore achieved a record 41.2 million TEU throughput.`;

    const utterance = new SpeechSynthesisUtterance(briefingSummary);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsPlayingAudioBriefing(false);
    utterance.onerror = () => setIsPlayingAudioBriefing(false);

    setIsPlayingAudioBriefing(true);
    setAudioBriefingText(briefingSummary);
    window.speechSynthesis.speak(utterance);
  };

  // Toggle Bookmark
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Generate Custom AI Executive Report
  const handleGenerateCustomReport = () => {
    setIsGeneratingReport(true);
    setGeneratedReportContent(null);

    setTimeout(() => {
      setIsGeneratingReport(false);
      const generated = `# MARITIME INTELLIGENCE EXECUTIVE REPORT
**TOPIC:** ${reportTopic}
**DOCUMENT TYPE:** ${reportType}
**DATE OF GENERATION:** ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
**CLASSIFICATION:** AI Maritime Hub Certified Intelligence (Confidential)

---

### 1. EXECUTIVE SUMMARY & STRATEGIC CONTEXT
The global maritime industry is experiencing a generational structural realignment driven by dual vectors: binding IMO decarbonization mandates (MEPC 83 Global Fuel Standard) and geopolitical ton-mile expansion. Asset values for dual-fuel ready tonnage (Methanol, LNG, Ammonia) are trading at a 22-28% premium over conventional single-fuel peers.

### 2. CORE MARKET & REGULATORY METRICS
- **Freight Benchmark:** Baltic Dry Index (BDI) stands at 1,942 pts; SCFI container spot rates average $2,215/TEU.
- **Orderbook Composition:** 80% of new container and gas carrier orders placed in Asian yards feature alternative fuel capabilities.
- **Compliance Exposure:** FuelEU Maritime penalties (€2,400/t VLSFO energy deficit) require fleet operators to secure certified bio/e-fuel bunkering allocations prior to 2026.
- **Port Velocity:** Tuas (Singapore) and Yangshan (Shanghai) lead terminal automation with average turnaround times of 16-32 hours.

### 3. TECHNICAL & ENGINEERING IMPLICATIONS
1. **Naval Architecture & Hydrodynamics:** Increased retrofitting of wind-assisted propulsion systems (WAPS / Rotor Sails) providing 6-12% verifiable fuel savings.
2. **Propulsion & Machinery:** Stringent toxicity zone containment and double-barrier piping rules enforced under updated DNV & ABS ammonia class notations.
3. **Operational Compliance:** SEEMP Part III audits actively disqualifying vessels rated 'E' or continuous 'D' from tier-1 energy major charter fixtures.

### 4. STRATEGIC RECOMMENDATIONS & ACTION ITEMS
- **For Shipowners:** Lock in shipyard drydock slots for hull silicone coating and energy saving device (ESD) retrofits 18 months in advance.
- **For Naval Architects:** Adopt modular deck arrangements designed with designated footprint reserves for future Onboard Carbon Capture (OCCS) scrubbers.
- **For Financiers:** Prioritize green transition loan facilities tied directly to verified operational CII trajectories.

---
*Generated by AI Maritime Intelligence Engine v4.8 • Grounded in IMO, IACS, Clarksons & AIS Data Streams*`;
      setGeneratedReportContent(generated);
    }, 1400);
  };

  // Add custom alert
  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertKeyword.trim()) return;
    const newRule: CustomAlertRule = {
      id: `alt-${Date.now()}`,
      title: `Custom Trigger: ${newAlertKeyword}`,
      category: 'User Keyword',
      condition: `Mentions "${newAlertKeyword}"`,
      channel: 'In-App + Email',
      enabled: true,
      triggeredCount: 1
    };
    setAlertRules([newRule, ...alertRules]);
    setNewAlertKeyword('');
  };

  // Subscribe Newsletter
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setIsSubscribedSuccess(true);
    setTimeout(() => {
      setIsSubscribedSuccess(false);
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} pb-24`}>
      {/* Top Banner for Subscription Monetization */}
      <SubscriptionBanner
        userPlan={userPlan}
        onUpgrade={() => onOpenPricing && onOpenPricing('professional')}
        badge="MARITIME INTELLIGENCE 24/7"
        title="Bloomberg-Grade Global Maritime Intelligence Center"
        subtitle="Real-time news feeds, regulatory amendments, market freight analytics, port congestion telemetry, and automated AI analysis."
      />

      {/* ---------------------------------------------------- */}
      {/* Real-time Bloomberg-Style Maritime Ticker Ribbon     */}
      {/* ---------------------------------------------------- */}
      <div className="bg-slate-900/90 border-y border-slate-800/80 backdrop-blur-md sticky top-0 z-30 overflow-x-auto scrollbar-none py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 min-w-[920px]">
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" /> LIVE TELEMETRY
            </span>
          </div>

          <div className="flex items-center gap-6 divide-x divide-slate-800 text-xs">
            {MARKET_TICKERS.map((ticker) => (
              <div key={ticker.id} className="flex items-center gap-2.5 pl-6 first:pl-0 shrink-0">
                <div>
                  <div className="text-[10px] text-slate-400 font-mono font-medium">{ticker.name}</div>
                  <div className="font-extrabold text-slate-100 flex items-center gap-1.5">
                    <span>{ticker.value}</span>
                    <span className={`text-[11px] font-bold flex items-center ${ticker.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {ticker.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {ticker.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="shrink-0 pl-4 border-l border-slate-800">
            <button
              onClick={handleToggleAudioBriefing}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                isPlayingAudioBriefing
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}
              title="Listen to 60-second AI Executive Audio Briefing"
            >
              {isPlayingAudioBriefing ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{isPlayingAudioBriefing ? 'Stop Audio' : '60s AI Audio Brief'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

        {/* ---------------------------------------------------- */}
        {/* Header Title & Role Personalization Engine           */}
        {/* ---------------------------------------------------- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20 shadow-inner">
                <Newspaper className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    AI Maritime News & Intelligence Platform
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-cyan-500 to-blue-500 text-white uppercase tracking-wider">
                    v4.8 Analyst
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  The Bloomberg + Google News + AI Strategic Analyst for Naval Architects, Shipowners, and Global Maritime Leaders.
                </p>
              </div>
            </div>
          </div>

          {/* Role-Based Intelligence Switcher */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Role Feed:</span>
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="bg-slate-900 text-cyan-300 font-bold text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="All Roles">🌐 All Roles & General Shipping</option>
              <option value="Naval Architect">📐 Naval Architect & Hull Designer</option>
              <option value="Marine Engineer">⚙️ Marine Engineer & Machinery Specialist</option>
              <option value="Shipowner & Operator">🚢 Shipowner & Fleet Operator</option>
              <option value="Port Manager">⚓ Port & Terminal Authority</option>
              <option value="Maritime Researcher">🔬 Academic & SNAME Researcher</option>
              <option value="Maritime Student">🎓 Maritime Student & Cadet</option>
              <option value="Maritime Investor & Financier">💼 Maritime Investor & Financier</option>
            </select>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Navigation Tabs Bar                                 */}
        {/* ---------------------------------------------------- */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
          {[
            { id: 'feed', label: 'AI News Feed & Wire', icon: Newspaper, count: 'Live (25+)' },
            { id: 'regulations', label: 'Regulatory Radar', icon: ShieldCheck, count: 'IMO / Class' },
            { id: 'markets', label: 'Shipping & Freight Analytics', icon: TrendingUp, count: 'BDI / SCFI' },
            { id: 'ports', label: 'Global Port Congestion', icon: Anchor, count: '10 Hubs' },
            { id: 'companies', label: 'Company Intelligence', icon: Building2, count: 'Profiles' },
            { id: 'ai_reports', label: 'AI Executive Reports', icon: FileText, count: '1-Click' },
            { id: 'alerts', label: 'AI Alert Center', icon: Bell, count: 'Triggers' },
            { id: 'newsletter', label: 'Newsletter & Briefings', icon: Mail, count: 'Daily/Weekly' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${isActive ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: AI NEWS FEED & WIRE                           */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {/* Search & Category Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search shipping, shipbuilding, IMO rules, ports..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All News' },
                  { id: 'shipping', label: 'Shipping' },
                  { id: 'shipbuilding', label: 'Shipbuilding' },
                  { id: 'regulations', label: 'IMO & Class' },
                  { id: 'ports', label: 'Ports' },
                  { id: 'offshore', label: 'Offshore Wind' },
                  { id: 'tech', label: 'Autonomy & Tech' },
                  { id: 'safety', label: 'Safety & Incidents' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as NewsCategory)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-cyan-500 text-slate-950 font-extrabold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Top Breaking News Card */}
            {filteredNews.length > 0 && filteredNews[0].isFeatured && (
              <div
                onClick={() => setSelectedArticle(filteredNews[0])}
                className="group cursor-pointer relative bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-xl hover:shadow-cyan-500/10 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white flex items-center gap-1 animate-pulse">
                    <Flame className="w-3 h-3" /> BREAKING HEADLINE
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {filteredNews[0].categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" /> {filteredNews[0].publishedAt}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">• {filteredNews[0].source}</span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-cyan-300 transition leading-tight mb-3">
                  {filteredNews[0].title}
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                  {filteredNews[0].summary}
                </p>

                {/* AI Key Data Points Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 mb-4">
                  {filteredNews[0].keyDataPoints.map((dp, idx) => (
                    <div key={idx} className="border-l-2 border-cyan-500 pl-2.5">
                      <div className="text-[10px] text-slate-400 uppercase font-medium">{dp.label}</div>
                      <div className="text-xs sm:text-sm font-extrabold text-cyan-300 font-mono">{dp.value}</div>
                    </div>
                  ))}
                </div>

                {/* AI Impact Teaser */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2 text-cyan-400 font-medium">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-slate-300 font-bold">AI Strategic Impact:</span>
                    <span className="text-slate-400 line-clamp-1">{filteredNews[0].aiIndustryImpact}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => toggleBookmark(filteredNews[0].id, e)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Bookmark Article"
                    >
                      {bookmarkedIds.includes(filteredNews[0].id) ? <BookmarkCheck className="w-4 h-4 text-cyan-400" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                    <span className="text-cyan-400 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition">
                      Deep AI Analysis <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* News Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredNews.slice(filteredNews[0]?.isFeatured ? 1 : 0).map((article) => {
                const isBookmarked = bookmarkedIds.includes(article.id);
                return (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="group cursor-pointer flex flex-col justify-between bg-slate-900/70 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl p-5 transition shadow-lg hover:shadow-xl relative overflow-hidden"
                  >
                    <div>
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                            article.impactLevel === 'Regulatory Alert'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : article.impactLevel === 'Market Shift'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          }`}>
                            {article.categoryLabel}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{article.publishedAt}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-cyan-300 transition mb-2.5 line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">
                        {article.summary}
                      </p>
                    </div>

                    <div>
                      {/* Key Metric Highlight */}
                      {article.keyDataPoints.length > 0 && (
                        <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 mb-3 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">{article.keyDataPoints[0].label}:</span>
                          <span className="font-extrabold text-cyan-300 font-mono">{article.keyDataPoints[0].value}</span>
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
                        <span className="text-[11px] text-slate-500 font-medium truncate max-w-[150px]">
                          {article.source}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => toggleBookmark(article.id, e)}
                            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition"
                          >
                            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-cyan-400" /> : <Bookmark className="w-3.5 h-3.5" />}
                          </button>
                          <span className="text-cyan-400 font-bold text-[11px] flex items-center gap-1 group-hover:translate-x-0.5 transition">
                            Read AI Analysis <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: REGULATORY INTELLIGENCE RADAR                */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'regulations' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  IMO, Class Society & Environmental Regulatory Radar
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Track upcoming convention amendments, class rules (DNV, ABS, LR), FuelEU Maritime deadlines, and IACS UR enforcement.
                </p>
              </div>
              <button
                onClick={() => {
                  setReportTopic('Comprehensive IMO & EU Maritime Regulatory Compliance Matrix 2026-2030');
                  setReportType('Class Rule Technical Memo');
                  setActiveTab('ai_reports');
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs flex items-center gap-2 shrink-0 shadow-lg shadow-emerald-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Compliance Memo</span>
              </button>
            </div>

            {/* Regulatory List */}
            <div className="space-y-4">
              {REGULATORY_INTELLIGENCE.map((reg) => (
                <div
                  key={reg.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 hover:border-slate-700 transition space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                        {reg.body}
                      </span>
                      <span className="text-xs font-bold text-slate-300 font-mono">{reg.code}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                        reg.severity === 'Critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {reg.severity} Impact
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-400">Effective: <strong className="text-white font-mono">{reg.effectiveDate}</strong></span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                        {reg.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white mb-1.5">{reg.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">{reg.summary}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 text-xs mb-3">
                      <div>
                        <span className="text-slate-400 font-bold block mb-1">Applicable Fleet:</span>
                        <span className="text-slate-200">{reg.applicableVessels}</span>
                      </div>
                      <div>
                        <span className="text-rose-400 font-bold block mb-1">Non-Compliance Risk:</span>
                        <span className="text-slate-200">{reg.penaltiesOrConsequences}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider block">Key Compliance Mandates:</span>
                      {reg.keyRequirements.map((req, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: SHIPPING & FREIGHT ANALYTICS                 */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'markets' && (
          <div className="space-y-6">
            {/* Top Market Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MARKET_TICKERS.slice(0, 4).map((t) => (
                <div key={t.id} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">{t.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{t.code}</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono mb-1">{t.value}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-extrabold flex items-center ${t.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {t.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {t.change} ({t.period})
                    </span>
                    <span className="text-[10px] text-slate-500">{t.description}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Freight Trends Line Chart */}
              <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-cyan-400" />
                      Global Freight Rate Indices (6-Month Trend)
                    </h3>
                    <p className="text-xs text-slate-400">Baltic Dry Index (BDI) vs SCFI Container Spot</p>
                  </div>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={FREIGHT_TRENDS_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                      <Legend />
                      <Line type="monotone" dataKey="bdi" name="Baltic Dry Index (pts)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="scfi" name="SCFI ($/TEU)" stroke="#34d399" strokeWidth={3} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="bdti" name="BDTI Tanker (pts)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Orderbook Propulsion Fuel Pie Chart */}
              <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-emerald-400" />
                      Global Shipbuilding Orderbook Fuel Breakdown
                    </h3>
                    <p className="text-xs text-slate-400">% of GT on order across major Asian yards</p>
                  </div>
                </div>
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ORDERBOOK_FUEL_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {ORDERBOOK_FUEL_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Fleet Growth vs Scrapping Bar Chart */}
            <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                    <Ship className="w-4 h-4 text-purple-400" />
                    Global Commercial Fleet Growth vs Demolition Rates (M DWT)
                  </h3>
                  <p className="text-xs text-slate-400">Annual vessel deliveries vs scrap sales at South Asian demolition yards</p>
                </div>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={FLEET_GROWTH_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    <Legend />
                    <Bar dataKey="deliveries" name="New Deliveries (M DWT)" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="demolitions" name="Scrapped / Recycled (M DWT)" fill="#f87171" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 4: GLOBAL PORT CONGESTION & AIS TELEMETRY        */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'ports' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Anchor className="w-6 h-6 text-cyan-400" />
                  Global Port Performance, Waiting Times & Congestion Telemetry
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Live monitoring of top transshipment gateways, anchorage queues, TEU throughput, and terminal automation readiness.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {GLOBAL_PORTS_DATA.map((port) => (
                <div
                  key={port.id}
                  className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-white text-base">{port.portName}</h3>
                      <span className="text-xs text-slate-400">{port.country} • {port.region}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase ${
                      port.congestionStatus === 'Smooth' || port.congestionStatus === 'Normal'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {port.congestionStatus} Status
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Avg Berth Wait:</span>
                      <span className="font-extrabold text-cyan-300 font-mono text-sm">{port.avgBerthWaitingHours} hrs</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Anchorage Queue:</span>
                      <span className="font-extrabold text-amber-300 font-mono text-sm">{port.vesselsAtAnchor} vessels</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Throughput (YTD):</span>
                      <span className="font-extrabold text-slate-200 font-mono">{port.throughputTeuYtd}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">YoY Growth:</span>
                      <span className="font-extrabold text-emerald-400 font-mono">{port.throughputGrowth}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400">
                    <span className="font-bold text-slate-300">Automation:</span> {port.automationLevel}
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300 flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{port.keyAlert}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 5: COMPANY INTELLIGENCE PROFILES                 */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'companies' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-indigo-400" />
                  Maritime Corporate Intelligence & Competitor Analysis
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Fleet composition, decarbonization ratings, shipyard orderbooks, and financial trajectories of global maritime titans.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {COMPANY_PROFILES.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-lg font-black text-white">{comp.name}</h3>
                      <span className="text-xs text-slate-400">{comp.type} • HQ: {comp.hq}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {comp.financialOutlook}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Scale / Revenue</span>
                      <span className="font-extrabold text-white font-mono">{comp.marketCapOrRevenue}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Fleet / Orderbook</span>
                      <span className="font-extrabold text-cyan-300 font-mono">{comp.fleetCountOrOrderbook}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Green Fuel Share</span>
                      <span className="font-extrabold text-emerald-400 font-mono">{comp.alternativeFuelShare}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Recent Strategic Dispatches:</span>
                    <ul className="space-y-1.5">
                      {comp.recentHeadlines.map((h, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong className="text-cyan-400">Analyst SWOT Summary:</strong> {comp.swotHighlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 6: AI EXECUTIVE REPORT STUDIO                    */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'ai_reports' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-3xl border border-indigo-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">AI Executive Report & Memo Generator</h2>
                  <p className="text-xs text-slate-400">Generate executive-grade market briefings, technical memos, and competitor dossiers in seconds.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Configuration Column */}
              <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="font-extrabold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  Report Parameters
                </h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Document Type</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value as any)}
                    className="w-full bg-slate-950 text-xs text-white p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Comprehensive Market Report">📊 Comprehensive Market Report</option>
                    <option value="Executive Brief">⚡ 1-Page Executive Strategic Brief</option>
                    <option value="Class Rule Technical Memo">📐 Class Rule & Regulatory Technical Memo</option>
                    <option value="Competitor Dossier">🏢 Corporate & Competitor Dossier</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Topic / Inquiry Focus</label>
                  <textarea
                    value={reportTopic}
                    onChange={(e) => setReportTopic(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-950 text-xs text-white p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
                    placeholder="Enter custom topic or choose preset..."
                  />
                </div>

                {/* Preset Suggestions */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400 font-bold block">Quick Presets:</span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      'Global Fleet Decarbonization & Alternative Fuels Outlook 2026-2030',
                      'Red Sea Divergence & Ton-Mile Freight Volatility Impact',
                      'IMO MEPC 83 Global Fuel Standard Shipowner Readiness Audit',
                      'Asian Shipyard Capacity & Container Orderbook Pressure'
                    ].map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setReportTopic(preset)}
                        className="text-left text-[11px] p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition line-clamp-1"
                      >
                        • {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateCustomReport}
                  disabled={isGeneratingReport}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
                >
                  {isGeneratingReport ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Synthesizing Intelligence...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Executive Report</span>
                    </>
                  )}
                </button>
              </div>

              {/* Output Preview Column */}
              <div className="lg:col-span-2 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between min-h-[480px]">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="text-xs font-black uppercase text-cyan-400 flex items-center gap-1.5">
                      <FileText className="w-4 h-4" /> Live AI Report Output
                    </span>
                    {generatedReportContent && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(generatedReportContent);
                            alert('Report copied to clipboard!');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 transition"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Markdown</span>
                        </button>
                        <button
                          onClick={() => window.print()}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1 transition border border-cyan-500/30"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print / PDF</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {generatedReportContent ? (
                    <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed bg-slate-950 p-6 rounded-2xl border border-slate-800/80 max-h-[520px] overflow-y-auto">
                      {generatedReportContent}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-slate-500">
                        <FileText className="w-10 h-10 mx-auto text-slate-600" />
                      </div>
                      <p className="text-sm font-bold text-slate-300">Ready to synthesize intelligence</p>
                      <p className="text-xs text-slate-500 max-w-md">
                        Select a topic or preset on the left and click "Generate Executive Report" to produce an analyst brief.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 7: AI ALERT SYSTEM & CUSTOM TRIGGERS             */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Bell className="w-6 h-6 text-amber-400" />
                  AI Real-Time Maritime Alert Center
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Configure custom event triggers for regulation updates, BDI market movements, port congestions, and company dispatches.
                </p>
              </div>
            </div>

            {/* Create New Trigger Form */}
            <form onSubmit={handleAddAlert} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={newAlertKeyword}
                  onChange={(e) => setNewAlertKeyword(e.target.value)}
                  placeholder="Enter vessel name, company (e.g. Maersk), IMO rule, or port keyword..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Create Alert Rule</span>
              </button>
            </form>

            {/* Alert Rules List */}
            <div className="space-y-3">
              {alertRules.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-300 font-mono">
                        {rule.category}
                      </span>
                      <h4 className="font-extrabold text-white text-sm">{rule.title}</h4>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-3">
                      <span>Condition: <strong className="text-slate-300">{rule.condition}</strong></span>
                      <span>• Channel: <strong className="text-cyan-400">{rule.channel}</strong></span>
                      <span>• Triggered: <strong className="text-amber-400 font-mono">{rule.triggeredCount} times</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => {
                        setAlertRules(prev => prev.map(r => r.id === rule.id ? { ...r, enabled: !r.enabled } : r));
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        rule.enabled
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {rule.enabled ? 'Active' : 'Paused'}
                    </button>
                    <button
                      onClick={() => setAlertRules(prev => prev.filter(r => r.id !== rule.id))}
                      className="p-1.5 text-slate-500 hover:text-rose-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 8: NEWSLETTER & STRATEGIC BRIEFINGS              */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 p-8 rounded-3xl border border-blue-500/30 text-center max-w-3xl mx-auto space-y-4">
              <div className="w-12 h-12 bg-blue-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto border border-blue-500/30">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white">
                The AI Maritime Morning Executive Briefing
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
                Join 18,400+ naval architects, shipowners, and marine executives receiving our curated 3-minute morning brief covering overnight freight shifts, IMO regulatory filings, and shipyard deals.
              </p>

              {/* Cadence Selection */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {(['Daily Briefing', 'Weekly Intelligence', 'Monthly Naval Tech Magazine'] as const).map((cadence) => (
                  <button
                    key={cadence}
                    type="button"
                    onClick={() => setSubscribedCadence(cadence)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                      subscribedCadence === cadence
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cadence}
                  </button>
                ))}
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your corporate or academic email..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition shrink-0 shadow-lg shadow-cyan-500/20"
                >
                  Subscribe Free
                </button>
              </form>

              {isSubscribedSuccess && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Success! You are subscribed to the {subscribedCadence}.</span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ---------------------------------------------------- */}
      {/* ARTICLE DEEP AI ANALYSIS MODAL / DRAWER              */}
      {/* ---------------------------------------------------- */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute right-5 top-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge Meta */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {selectedArticle.categoryLabel}
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-slate-800 text-slate-300">
                {selectedArticle.source}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {selectedArticle.publishedAt} • {selectedArticle.readTime}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {selectedArticle.title}
            </h2>

            {/* Key Data Points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              {selectedArticle.keyDataPoints.map((dp, i) => (
                <div key={i} className="border-l-2 border-cyan-500 pl-2.5">
                  <div className="text-[10px] text-slate-400 uppercase font-medium">{dp.label}</div>
                  <div className="text-xs sm:text-sm font-extrabold text-cyan-300 font-mono">{dp.value}</div>
                </div>
              ))}
            </div>

            {/* Deep AI Analysis Cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                <h4 className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  AI Executive Synthesis
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedArticle.aiSummary}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Industry & Commercial Impact
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedArticle.aiIndustryImpact}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  Commercial Opportunities Identified
                </h4>
                <ul className="space-y-1.5">
                  {selectedArticle.aiOpportunities.map((op, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{op}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="font-bold text-slate-400 block mb-1">Historical Precedent:</span>
                  <p className="text-slate-300">{selectedArticle.aiHistoricalPrecedent}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="font-bold text-cyan-400 block mb-1">Market Trend Projection:</span>
                  <p className="text-slate-300">{selectedArticle.marketTrendPrediction}</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex flex-wrap gap-1.5">
                {selectedArticle.tags.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 font-mono">
                    #{t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const text = `${selectedArticle.title}\n\nAI Summary:\n${selectedArticle.aiSummary}\n\nImpact:\n${selectedArticle.aiIndustryImpact}`;
                    navigator.clipboard.writeText(text);
                    alert('Article AI Summary copied to clipboard!');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Summary</span>
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
export default MaritimeNewsIntelligenceView;
