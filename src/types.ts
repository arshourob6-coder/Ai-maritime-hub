export type ViewMode = 
  // Top-Level SaaS Navigation 11 Hubs
  | 'home'
  | 'ai_copilot'
  | 'engineering_tools'
  | 'simulation_center'
  | 'knowledge_hub'
  | 'learning_academy'
  | 'research_lab'
  | 'maritime_industry'
  | 'landing'
  | 'ai_chat'
  | 'thesis_gen'
  | 'prompt_library'
  | 'newsletter'
  | 'maritime_news'
  | 'maritime_news_intelligence'
  | 'calculators'
  | 'learning'
  | 'marketplace'
  | 'jobs'
  | 'community'
  | 'dashboard'
  | 'admin'
  | 'affiliate'
  | 'seo'
  | 'digital_products'
  // Prompts 26-45 Global Maritime Suite
  | 'ship_design_studio' // 26
  | 'digital_twin'       // 27
  | 'weather'            // 28
  | 'maritime_regulations'// 29
  | 'marine_survey'      // 30
  | 'predictive_maint'   // 31
  | 'carbon_emissions'   // 32
  | 'fleet_mgmt'         // 33
  | 'maritime_gis'       // 34
  | 'report_gen'         // 35
  | 'certifications'     // 36
  | 'maritime_events'    // 37
  | 'ai_translator'      // 38
  | 'knowledge_graph'    // 39
  | 'collaboration_ws'   // 40
  | 'startup_hub'        // 41
  | 'procurement_mkt'    // 42
  | 'resume_builder'     // 43
  | 'cybersecurity'      // 44
  | 'api_sdk'            // 45
  // Prompts 46-65 Extended AI Maritime Suite
  | 'naval_arch_lab'     // 46
  | 'offshore_renewables'// 47
  | 'ship_structural'    // 48
  | 'propeller_design'   // 49
  | 'cfd_hub'            // 50
  | 'ship_resistance'    // 50.1 Advanced Ship Resistance & Powering Platform
  | 'maritime_data_center'// 51
  | 'dataset_marketplace'// 52
  | 'formula_library'    // 54
  | 'shipyard_mgmt'      // 55
  | 'marine_insurance'   // 56
  | 'ai_marketplace'     // 58
  | 'ai_agent_marketplace' // AI Agent Marketplace & Creation Studio
  | 'mobile_companion'   // 60
  | 'video_learning'     // 61
  | 'smart_notifications'// 62
  | 'google_forms'
  | 'cloud_workspace'    // 63
  | 'recommendation_engine'// 64
  | 'global_directory'   // 65
  // Prompts 66-85 Comprehensive Maritime Ecosystem
  | 'digital_library'    // 66
  | 'ai_exam_prep'       // 67
  | 'company_intelligence'// 70
  | 'interactive_ship_db'// 72
  | 'marine_equipment_db'// 73
  | 'maritime_innovation_hub'// 74
  | 'consultancy_marketplace'// 77
  | 'marine_simulators'  // 78
  | 'ai_design_review'   // 79
  | 'ai_maritime_search' // 81
  | 'ai_productivity_suite'// 84
  | 'maritime_super_app' // 85
  // Prompts 86-105 Enterprise & Operational Modules
  | 'maritime_finance'   // 86
  | 'chartering_freight' // 87
  | 'cargo_planning'     // 88
  | 'ballast_water'      // 89
  | 'environmental_hub'  // 90
  | 'autonomous_shipping'// 91
  | 'crew_management'    // 93
  | 'maritime_medical'   // 94
  | 'voyage_planning'    // 95
  | 'marine_fuel'        // 97
  | 'smart_ship'         // 99
  | 'naval_defense'      // 101
  | 'blue_economy'       // 102
  | 'innovation_challenge'// 103
  | 'workflow_automation'// 104
  | 'executive_dashboard'// 105
  // Prompts 106-125 Income & Monetization
  | 'monetization_suite'   // 106-125 Income & Monetization Suite
  | 'ai_credit_marketplace'// 107
  | 'maritime_marketplace' // 108
  | 'premium_courses'      // 109
  | 'digital_downloads'    // 110
  | 'job_portal'          // 112
  | 'api_monetization'     // 115
  | 'enterprise_licensing' // 114
  // Prompts 126-145 Advanced Income Modules
  | 'prompt_store'         // 126
  | 'template_store'       // 127
  | 'maritime_bookstore'   // 128
  | 'ai_resume_service'    // 131
  | 'tender_subscription'  // 134
  | 'industry_reports'     // 135
  | 'saas_app_store'       // Future SaaS
  | 'dtaas_platform'       // DTaaS
  | 'sponsored_listings'   // 117
  // Additional tools
  | 'ais_tracking'
  | 'compliance'
  | 'class_society'
  | 'cost_estimator'
  | 'dry_dock'
  | 'risk_assessment'
  | 'doc_library'
  | 'unit_converter'
  | 'scholarships'
  | 'universities'
  | 'internships'
  | 'voice_assistant'
  | 'maritime_digital_library'
  | 'maritime_simulation_center'
  | 'offshore_wind_dashboard'
  | 'super_ecosystem'
  | 'ai_career_path_planner'
  | 'ai_research_lab'
  | 'smart_shipyard'
  | 'maritime_commerce'
  | 'ai_assistant_builder'
  | 'maritime_data_exchange'
  | 'maritime_innovation_marketplace'
  | 'smart_ocean_platform'
  | 'autonomous_vessel_hub'
  | 'marine_robotics_center'
  | 'maritime_gis_platform'
  | 'maritime_investment_platform'
  | 'ai_procurement_platform'
  | 'global_maritime_directory'
  | 'maritime_social_network'
  | 'maritime_streaming_platform'
  | 'saas_billing'
  | 'pricing'
  | 'maritime_publishing_platform'
  | 'ai_business_intelligence'
  | 'maritime_super_wallet'
  | 'global_partnership_hub'
  | 'maritime_metaverse'
  | 'saas_billing';

export type PlanType = 'free' | 'student' | 'professional' | 'enterprise' | 'university';

export type UserRole =
  | 'Guest'
  | 'Free User'
  | 'Student'
  | 'Professional'
  | 'Researcher'
  | 'Instructor'
  | 'Company User'
  | 'University Admin'
  | 'Enterprise Admin'
  | 'Super Admin';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'NOK' | 'SGD' | 'BDT' | 'JPY';

export type PaymentGatewayType =
  | 'stripe'
  | 'paypal'
  | 'sslcommerz'
  | 'bkash'
  | 'nagad'
  | 'apple_pay'
  | 'google_pay';

export interface SessionDevice {
  id: string;
  deviceName: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  trusted: boolean;
}

export interface LoginHistoryItem {
  id: string;
  timestamp: string;
  ipAddress: string;
  location: string;
  device: string;
  status: 'success' | 'failed' | 'blocked' | '2fa_challenge';
  authMethod: 'password' | 'google' | 'microsoft' | 'github' | 'apple' | 'magic_link';
}

export interface SecurityAlertItem {
  id: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  ipAddress?: string;
  resolved: boolean;
}

export interface SubscriptionPlanDetails {
  id: PlanType;
  name: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  priceMonthlyUSD: number;
  priceYearlyUSD: number; // Discounted
  monthlyTokens: number; // AI tokens / credits
  features: string[];
  restrictedFeatures: string[];
  maxTeamSeats: number;
  storageGB: number;
  supportLevel: string;
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  planName: string;
  billingPeriod: 'monthly' | 'yearly';
  amountUSD: number;
  taxUSD: number;
  totalUSD: number;
  status: 'paid' | 'pending' | 'refunded' | 'failed';
  paymentGateway: PaymentGatewayType;
  pdfDownloadUrl?: string;
  customerName: string;
  customerCompany?: string;
  customerVatId?: string;
}

export interface CouponCode {
  code: string;
  discountPercent: number;
  discountFixedUSD?: number;
  validPlans: PlanType[];
  expiresAt: string;
  usageCount: number;
  maxUsage: number;
  description: string;
}

export interface AIUsageBreakdown {
  totalTokensUsed: number;
  monthlyQuota: number;
  creditsRemaining: number;
  queriesCount: number;
  breakdownByModel: {
    geminiFlash: number;
    geminiPro: number;
    gpt4o: number;
    claudeSonnet: number;
    deepseekR1: number;
  };
  breakdownByFeature: {
    chat: number;
    thesis: number;
    cfdSimulation: number;
    reportGen: number;
    codeGen: number;
  };
  dailyTrend: { date: string; tokens: number }[];
}

export interface ApiKeyItem {
  id: string;
  name: string;
  keyPrefix: string;
  fullKey?: string;
  scopes: ('read' | 'write' | 'cfd_exec' | 'billing' | 'admin')[];
  createdAt: string;
  lastUsedAt: string;
  rateLimitPerMin: number;
  status: 'active' | 'revoked';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: UserRole;
  action: string;
  resource: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'danger';
  details: string;
}

export interface BackupSnapshot {
  id: string;
  createdAt: string;
  sizeMB: number;
  type: 'automated_daily' | 'manual' | 'pre_migration';
  status: 'completed' | 'in_progress';
  downloadUrl?: string;
}

export interface PaymentTransaction {
  id: string;
  transactionId: string;
  timestamp: string;
  customerEmail: string;
  customerName: string;
  amountUSD: number;
  currency: Currency;
  gateway: PaymentGatewayType;
  planId: PlanType;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  couponApplied?: string;
  ipCountry: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'engineer' | 'naval_architect' | 'port_manager' | 'admin';
  plan: PlanType;
  avatarUrl: string;
  joinedDate: string;
  savedProjectsCount: number;
  certificatesEarned: number;
  apiTokensUsed: number;
  affiliateEarnings: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  assistantType?: string;
  sources?: { title: string; url: string }[];
  isThinking?: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: 'Naval Architecture' | 'Marine Engineering' | 'IMO Regulations' | 'Port Logistics' | 'Offshore';
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  enrolled: number;
  priceUSD: number;
  thumbnail: string;
  description: string;
  modules: {
    title: string;
    duration: string;
    videoUrl?: string;
    quizQuestions?: { question: string; options: string[]; answerIndex: number }[];
  }[];
}

export interface DigitalProduct {
  id: string;
  title: string;
  type: 'Prompt Pack' | 'Excel Calculator' | 'Maxsurf Template' | 'AutoCAD File' | 'CFD Model' | 'Exam Note';
  author: string;
  priceUSD: number;
  rating: number;
  salesCount: number;
  previewUrl?: string;
  downloadSize: string;
  description: string;
  tags: string[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Internship' | 'Remote';
  salaryRange: string;
  postedDate: string;
  sponsored?: boolean;
  description: string;
  requirements: string[];
}

export interface MarketplacePlugin {
  id: string;
  name: string;
  developer: string;
  category: 'AI Model' | 'API Service' | 'Dataset' | 'Calculator Plugin';
  priceMonthlyUSD: number;
  rating: number;
  activeInstalls: number;
  description: string;
  endpointUrl: string;
}

export interface SeoArticle {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  keywords: string[];
  contentMarkdown: string;
}

export interface HydrostaticsInputs {
  lengthBP: number; // Length between perpendiculars (m)
  beam: number; // Beam (m)
  draft: number; // Draft (m)
  blockCoeff: number; // Block coefficient (Cb)
  waterplaneCoeff: number; // Waterplane area coefficient (Cw)
  waterDensity: number; // Sea water density kg/m3 (default 1025)
  verticalCG: number; // KG - Vertical Center of Gravity (m)
}

export interface HydrostaticsOutputs {
  displacementTonnes: number;
  wettedSurfaceArea: number;
  lcb: number; // LCB from midships
  vcb: number; // VCB from baseline
  transverseKM: number; // Metacentric height above keel
  metacentricHeightGM: number; // GM = KM - KG
  waterplaneArea: number;
}

export interface ResistanceInputs {
  shipSpeedKnots: number;
  lengthBP: number;
  displacementTonnes: number;
  wettedSurfaceM2: number;
  bulbousBowAreaM2: number;
  propellerEfficiency: number;
}

export interface ResistanceOutputs {
  speedMps: number;
  froudeNumber: number;
  reynoldsNumber: number;
  frictionalCoeffCf: number;
  residuaryCoeffCr: number;
  totalResistanceKN: number;
  effectivePowerKW: number;
  requiredShaftPowerKW: number;
}

export type CopilotModelEngine =
  | 'auto-route'
  | 'gemini-3.6-flash'
  | 'gpt-4o'
  | 'claude-3.5-sonnet'
  | 'deepseek-r1-maritime';

export type CopilotSpecialization =
  | 'naval_architect'
  | 'marine_engineer'
  | 'offshore_engineer'
  | 'solas_marpol'
  | 'researcher_academic'
  | 'student_mentor'
  | 'port_operations'
  | 'ship_recycling'
  | 'custom_agent';

export interface CopilotProjectMemory {
  id: string;
  name: string;
  vesselType: string;
  lengthBP: number;
  beam: number;
  draft: number;
  displacement: number;
  classificationSociety: 'DNV' | 'ABS' | 'LR' | 'BV' | 'ClassNK' | 'RINA';
  engineModel: string;
  operatingSpeedKnots: number;
  notes: string;
  lastUpdated: string;
}

export interface CopilotUploadedFile {
  id: string;
  name: string;
  size: string;
  type: 'PDF' | 'CAD/DXF' | 'Spreadsheet' | 'Stability Booklet' | 'Rulebook';
  uploadDate: string;
  status: 'Ready' | 'Audited' | 'Analyzed';
  findingsCount: number;
  summary: string;
  complianceScore: number;
}

export interface CopilotCalculationItem {
  id: string;
  title: string;
  category: 'Hydrostatics' | 'Resistance & Powering' | 'Structural Scantling' | 'Offshore Mooring' | 'Propulsion & Cavitation' | 'CII & Emissions';
  formulaLaTeX: string;
  ruleStandard: string;
  inputs: Record<string, number | string>;
  result: string;
  safetyMargin: string;
  isPassing: boolean;
}

export interface CopilotGeneratedReport {
  id: string;
  title: string;
  reportType: 'Class Approval Submittal' | 'Stability Assessment' | 'CII Carbon Audit' | 'Structural FEA Memo' | 'Offshore Mooring Design';
  vesselName: string;
  classSociety: string;
  date: string;
  wordCount: number;
  markdownContent: string;
}

export interface CopilotStudyMilestone {
  week: number;
  topic: string;
  standards: string[];
  keyFormula: string;
  practiceProblem: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

