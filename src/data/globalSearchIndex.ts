import { ViewMode } from '../types';
import { SAMPLE_BLOG_ARTICLES } from './blogAndAdsData';
import { SAMPLE_COURSES, SAMPLE_DIGITAL_PRODUCTS, SAMPLE_JOBS, SAMPLE_PLUGINS } from './maritimeData';
import { ALL_MARITIME_PROMPTS } from './maritimePromptsData';

export interface GlobalSearchItem {
  id: string;
  type: 'calculator' | 'blog' | 'course' | 'prompt' | 'marketplace' | 'job' | 'section';
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  tags?: string[];
  targetView: ViewMode;
  badgeText?: string;
  actionPayload?: string; // e.g. prompt text for AI Chat
  priceUSD?: number;
  readTime?: string;
}

export const CALCULATORS_SEARCH_DATA: GlobalSearchItem[] = [
  {
    id: 'calc-hydrostatics',
    type: 'calculator',
    title: 'Hydrostatics & Ship Displacement Calculator',
    subtitle: 'Hull Geometry, Displacement, LCB, VCB, Transverse KM & GM Metacentric Height',
    description: 'Calculate displacement tonnes, wetted surface area, transverse KM, and metacentric height GM using Simpson rules and sea water density.',
    category: 'Calculators & Engineering',
    tags: ['Hydrostatics', 'Displacement', 'GM', 'KM', 'Simpson Rules', 'Draft', 'Beam', 'Naval Architecture'],
    targetView: 'calculators',
    badgeText: 'Engineering Calc'
  },
  {
    id: 'calc-resistance',
    type: 'calculator',
    title: 'Holtrop & Mennen Resistance & Shaft Power Calculator',
    subtitle: 'Froude Number, Reynolds Number, Cf, Cr, Effective Power (PE) & Shaft Power (PS)',
    description: 'Estimate bare hull frictional resistance, residual wave resistance, effective power in kW, and required engine shaft power for ocean vessels.',
    category: 'Calculators & Engineering',
    tags: ['Resistance', 'Holtrop Mennen', 'Froude Number', 'Shaft Power', 'Effective Power', 'Engine', 'Propulsion'],
    targetView: 'calculators',
    badgeText: 'Propulsion Calc'
  },
  {
    id: 'calc-stability',
    type: 'calculator',
    title: 'Intact Stability & GZ Righting Arm Curve Calculator',
    subtitle: 'IMO Intact Stability Code 2008, GZ Curve, Heeling Moment & Capsize Angle',
    description: 'Plot GZ righting arm curves against heel angle, verify IMO 2008 intact stability criteria (area under GZ, maximum GZ angle, initial GM).',
    category: 'Calculators & Engineering',
    tags: ['Stability', 'GZ Curve', 'Righting Arm', 'Capsize', 'IMO Intact Stability', 'Heel Angle'],
    targetView: 'calculators',
    badgeText: 'Safety Calc'
  },
  {
    id: 'calc-ihm',
    type: 'calculator',
    title: 'IHM Hazardous Materials Inventory Form (HKC 2025)',
    subtitle: 'Hong Kong Convention 2025 & EU SRR Hazardous Materials Inventory Part I, II, III',
    description: 'Generate standardized Inventory of Hazardous Materials (IHM) documentation for asbestos, ODS, PCBs, and heavy metals prior to ship recycling.',
    category: 'Calculators & Engineering',
    tags: ['IHM', 'Ship Recycling', 'HKC 2025', 'Asbestos', 'Hazardous Materials', 'Green Ship'],
    targetView: 'calculators',
    badgeText: 'Green Tech Form'
  },
  {
    id: 'calc-weather-route',
    type: 'calculator',
    title: 'Ocean Weather Routing & Fuel Optimization Simulator',
    subtitle: 'Wave Height Resistance Delay, Fuel Consumption Reduction & ETA Optimizer',
    description: 'Analyze ocean voyage routes, calculate added wave resistance penalty, fuel savings from speed reduction, and optimal weather routing.',
    category: 'Calculators & Engineering',
    tags: ['Weather Routing', 'Fuel Optimizer', 'Wave Height', 'ETA', 'Voyage', 'CII Rating'],
    targetView: 'calculators',
    badgeText: 'Routing Simulator'
  },
  {
    id: 'calc-port-congestion',
    type: 'calculator',
    title: 'Port Congestion & Container Terminal Queue Simulator',
    subtitle: 'Container Quay Crane Allocation, M/M/c Queueing Model, Waiting Days & Berth Utilization',
    description: 'Simulate container vessel queueing, berth traffic ratio, crane productivity, yard density bottlenecks, and 7-day wait time forecasts.',
    category: 'Calculators & Engineering',
    tags: ['Port Congestion', 'Quay Crane', 'Container Terminal', 'Queueing', 'Berth Utilization', 'Wait Time'],
    targetView: 'calculators',
    badgeText: 'Terminal Queue'
  }
];

export const PLATFORM_SECTIONS_SEARCH_DATA: GlobalSearchItem[] = [
  {
    id: 'sec-ai-chat',
    type: 'section',
    title: 'AI Chat Assistant (Maritime Neural Model)',
    subtitle: 'Ask questions on SOLAS, MARPOL, Naval Architecture, CFD, and Engine Troubleshooting',
    description: 'Interactive AI assistant trained on IMO conventions, DNV class rules, naval architecture formulas, and chief engineer operational manuals.',
    category: 'Platform Navigation',
    tags: ['AI Chat', 'Assistant', 'Copilot', 'SOLAS', 'MARPOL', 'Naval Architecture'],
    targetView: 'ai_chat',
    badgeText: 'Pro AI'
  },
  {
    id: 'sec-prompt-library',
    type: 'section',
    title: 'Maritime AI Prompt Library (100 Prompts)',
    subtitle: '100+ Tested Prompts for Naval Architecture, Engine Retrofits, & IMO Audits',
    description: 'Curated library of copyable AI prompts with variable fills for Holtrop analysis, GZ stability, SOLAS audits, CFD mesh generation, and CII reduction.',
    category: 'Platform Navigation',
    tags: ['Prompts', 'Prompt Library', '100 Prompts', 'Naval Architect', 'Engine Retrofit'],
    targetView: 'prompt_library',
    badgeText: '100 Prompts'
  },
  {
    id: 'sec-thesis-gen',
    type: 'section',
    title: 'AI Thesis & Technical Paper Generator',
    subtitle: 'Generate University Maritime Theses, Research Papers, & Industry Reports',
    description: 'Automated research generator producing complete structured maritime academic papers with citations, formulas, and abstract breakdowns.',
    category: 'Platform Navigation',
    tags: ['Thesis', 'Academic Paper', 'Research', 'Generator', 'University', 'Report'],
    targetView: 'thesis_gen',
    badgeText: 'Academic AI'
  },
  {
    id: 'sec-newsletter',
    type: 'section',
    title: 'Maritime AI Weekly Newsletter & Industry Briefings',
    subtitle: '15,000+ Verified Subscribers • Weekly Decarbonization & Tech Analysis',
    description: 'Subscribe to weekly research briefings covering IMO SOLAS 2026, dual-fuel engine developments, autonomous shipping, and AI maritime startup news.',
    category: 'Platform Navigation',
    tags: ['Newsletter', 'Weekly Briefing', 'IMO 2026', 'Decarbonization', 'Industry News'],
    targetView: 'newsletter',
    badgeText: 'Newsletter'
  },
  {
    id: 'sec-seo-blog',
    type: 'section',
    title: 'SEO Technical Blog & IMO Regulation Manuals',
    subtitle: 'Google Indexed Manuals, SOLAS 2026, Green Hydrodynamics, & OpenFOAM Guides',
    description: 'Deep-dive technical publications with Schema.org JSON-LD data, keyword density breakdowns, and downloadable compliance checklists.',
    category: 'Platform Navigation',
    tags: ['SEO Blog', 'Blog Articles', 'SOLAS 2026', 'Methanol', 'Ammonia', 'OpenFOAM', 'HKC'],
    targetView: 'seo',
    badgeText: 'Technical Articles'
  },
  {
    id: 'sec-affiliate',
    type: 'section',
    title: 'Affiliate Partner & Referral Network',
    subtitle: 'Earn 10% Lifetime Recurring Commission on Every Referral',
    description: 'Partner with Maritime AI Hub, generate custom trackable UTM links, download promotional banners, and withdraw monthly earnings via Stripe/PayPal/Wire.',
    category: 'Platform Navigation',
    tags: ['Affiliate', 'Referral', 'Commission', 'Partner', 'Earnings', 'Payout'],
    targetView: 'affiliate',
    badgeText: '10% Commission'
  },
  {
    id: 'sec-learning',
    type: 'section',
    title: 'Learning Hub & Certified Academy Courses',
    subtitle: 'Masterclasses in Naval Architecture, SOLAS/MARPOL, CFD, and Green Shipping',
    description: 'Interactive courses with video lectures, quiz modules, and university certificates accredited by Lloyd’s Academy & DNV standards.',
    category: 'Platform Navigation',
    tags: ['Learning Hub', 'Courses', 'Academy', 'Masterclass', 'Certificates', 'Naval Architecture'],
    targetView: 'learning',
    badgeText: 'Academy'
  },
  {
    id: 'sec-marketplace',
    type: 'section',
    title: 'Digital Products & Plugin Marketplace',
    subtitle: 'Maxsurf Models, Excel Calculation Suites, AutoCAD DWGs, & AI Plugins',
    description: 'Buy and sell professional naval architecture templates, VBA Excel workbooks, OpenFOAM CFD setups, and Holtrop-Mennen API plugins.',
    category: 'Platform Navigation',
    tags: ['Marketplace', 'Maxsurf', 'Excel', 'AutoCAD', 'CFD Setup', 'Plugins'],
    targetView: 'marketplace',
    badgeText: 'Digital Shop'
  },
  {
    id: 'sec-jobs',
    type: 'section',
    title: 'Maritime Career & Job Board',
    subtitle: 'Naval Architect, Marine Engineer, & Offshore Structural Roles Worldwide',
    description: 'Browse verified career opportunities at DNV, Maersk, Subsea7, PSA International, and Lloyd’s Register.',
    category: 'Platform Navigation',
    tags: ['Jobs', 'Careers', 'Naval Architect Job', 'Marine Engineer Job', 'DNV', 'Maersk'],
    targetView: 'jobs',
    badgeText: 'Job Board'
  },
  {
    id: 'sec-community',
    type: 'section',
    title: 'Community Forum & Peer Discussion',
    subtitle: 'Connect with 35,000+ Naval Architects, Engineers, & Cadets',
    description: 'Share CFD meshing tips, SOLAS audit advice, stability calculation troubleshooting, and dual-fuel engine retrofitting experiences.',
    category: 'Platform Navigation',
    tags: ['Community', 'Forum', 'Discussion', 'Naval Architects', 'Cadets', 'Engineers'],
    targetView: 'community',
    badgeText: 'Forum'
  },
  {
    id: 'sec-dashboard',
    type: 'section',
    title: 'User Analytics & Project Dashboard',
    subtitle: 'Track Saved Projects, Certificates, API Token Usage, & Subscription Plan',
    description: 'Manage your profile, view earned certificates, track API usage quotas, and upgrade your student/pro/enterprise membership.',
    category: 'Platform Navigation',
    tags: ['Dashboard', 'User Profile', 'Certificates', 'API Tokens', 'Subscription'],
    targetView: 'dashboard',
    badgeText: 'User Portal'
  }
];

export const buildGlobalSearchIndex = (): GlobalSearchItem[] => {
  const items: GlobalSearchItem[] = [
    ...CALCULATORS_SEARCH_DATA,
    ...PLATFORM_SECTIONS_SEARCH_DATA,
  ];

  // Map Blog Articles
  SAMPLE_BLOG_ARTICLES.forEach((blog) => {
    items.push({
      id: `blog-${blog.id}`,
      type: 'blog',
      title: blog.title,
      subtitle: `${blog.category} • ${blog.readTime}`,
      description: blog.excerpt,
      category: 'SEO Blog Article',
      tags: [...blog.keywords, ...blog.targetKeywords, blog.category, 'Blog'],
      targetView: 'seo',
      badgeText: blog.category,
      readTime: blog.readTime,
      actionPayload: blog.slug
    });
  });

  // Map Courses
  SAMPLE_COURSES.forEach((course) => {
    items.push({
      id: `course-${course.id}`,
      type: 'course',
      title: course.title,
      subtitle: `By ${course.instructor} • ${course.duration} (${course.level})`,
      description: course.description,
      category: 'Academy Masterclass',
      tags: [course.category, course.level, 'Course', 'Masterclass', 'Certificate'],
      targetView: 'learning',
      badgeText: `${course.level} Course`,
      priceUSD: course.priceUSD
    });
  });

  // Map AI Prompts
  ALL_MARITIME_PROMPTS.forEach((prompt) => {
    items.push({
      id: `prompt-${prompt.id}`,
      type: 'prompt',
      title: prompt.title,
      subtitle: `${prompt.category} • Target: ${prompt.targetRole}`,
      description: prompt.description,
      category: 'AI Prompt Library',
      tags: [...(prompt.variables || []), prompt.category, prompt.targetRole, 'AI Prompt'],
      targetView: 'ai_chat',
      badgeText: 'AI Prompt',
      actionPayload: prompt.fullPrompt
    });
  });

  // Map Digital Products
  SAMPLE_DIGITAL_PRODUCTS.forEach((prod) => {
    items.push({
      id: `digital-${prod.id}`,
      type: 'marketplace',
      title: prod.title,
      subtitle: `${prod.type} by ${prod.author} • ${prod.downloadSize}`,
      description: prod.description,
      category: 'Digital Product',
      tags: [...prod.tags, prod.type, 'Marketplace', 'Template'],
      targetView: 'marketplace',
      badgeText: prod.type,
      priceUSD: prod.priceUSD
    });
  });

  // Map Jobs
  SAMPLE_JOBS.forEach((job) => {
    items.push({
      id: `job-${job.id}`,
      type: 'job',
      title: `${job.title} @ ${job.company}`,
      subtitle: `${job.location} • ${job.salaryRange}`,
      description: job.description,
      category: 'Job Listing',
      tags: [...job.requirements, job.type, job.company, 'Job', 'Career'],
      targetView: 'jobs',
      badgeText: job.type
    });
  });

  // Map Plugins
  SAMPLE_PLUGINS.forEach((plug) => {
    items.push({
      id: `plug-${plug.id}`,
      type: 'marketplace',
      title: plug.name,
      subtitle: `${plug.category} by ${plug.developer}`,
      description: plug.description,
      category: 'Marketplace Plugin',
      tags: [plug.category, plug.developer, 'Plugin', 'API'],
      targetView: 'marketplace',
      badgeText: plug.category,
      priceUSD: plug.priceMonthlyUSD
    });
  });

  // Map 20 Maritime Feature Suites (Prompts 26-45)
  const ECOSYSTEM_SEARCH_ITEMS: GlobalSearchItem[] = [
    {
      id: 'feature-digital-twin',
      type: 'section',
      title: 'Digital Twin Vessel & Port Dashboard',
      subtitle: 'IoT Sensor Streams, 3D Hull Hotspots & Port Berth Twin',
      description: 'Live RPM, exhaust temperature, vibration FFT, speed, and fuel rate telemetry with finite element hull stress hotspots and port berth twin.',
      category: 'Maritime Suite',
      tags: ['Digital Twin', 'IoT', 'Telemetry', 'Sensor', 'Hull Stress', 'FEA', 'Port Twin'],
      targetView: 'digital_twin',
      badgeText: 'Digital Twin'
    },
    {
      id: 'feature-report-gen',
      type: 'section',
      title: 'AI Report Generator',
      subtitle: 'Export Technical Reports in PDF, DOCX & PPTX',
      description: 'Generate publishable naval architecture feasibility reports, class survey audits, damage briefs, and CII plans with charts and citations.',
      category: 'Maritime Suite',
      tags: ['Report Generator', 'PDF', 'Word', 'PowerPoint', 'Citations', 'Audit', 'Class'],
      targetView: 'report_gen',
      badgeText: 'AI Report'
    },
    {
      id: 'feature-weather',
      type: 'section',
      title: 'Marine Weather & Ocean Dynamics',
      subtitle: 'Wave Heights, Wind Vectors, Tides & Cyclone Warnings',
      description: 'Real-time wave height, swell period, wind vector arrows, tide tables, gale warnings, and passage weather routing.',
      category: 'Maritime Suite',
      tags: ['Weather', 'Waves', 'Swell', 'Tides', 'Cyclone', 'Wind', 'Route Weather'],
      targetView: 'weather',
      badgeText: 'Weather'
    },
    {
      id: 'feature-ais-tracking',
      type: 'section',
      title: 'Satellite AIS Vessel Tracking',
      subtitle: 'Live Ship Search, IMO/MMSI Lookup & AI ETA Prediction',
      description: 'Global vessel tracking with IMO/MMSI search, destination ETAs, draught readings, and heading vectors.',
      category: 'Maritime Suite',
      tags: ['AIS', 'Vessel Tracking', 'IMO', 'MMSI', 'Ship Search', 'ETA', 'Map'],
      targetView: 'ais_tracking',
      badgeText: 'Live AIS'
    },
    {
      id: 'feature-compliance',
      type: 'section',
      title: 'Maritime Compliance & Audit Center',
      subtitle: 'SOLAS, MARPOL, STCW, MLC 2006, ISM/ISPS & HKC',
      description: 'Automated compliance audit checklists for international conventions with gap analysis and certificate expiration alerts.',
      category: 'Maritime Suite',
      tags: ['Compliance', 'SOLAS', 'MARPOL', 'STCW', 'MLC 2006', 'ISM Code', 'ISPS', 'Audit'],
      targetView: 'compliance',
      badgeText: 'Compliance'
    },
    {
      id: 'feature-class-society',
      type: 'section',
      title: 'Classification Society Hub',
      subtitle: 'DNV, ABS, Lloyd\'s Register, BV, ClassNK, RINA & CCS Rules',
      description: 'Searchable class rules, structural hull notation equivalencies, and AI Rule Assistant for all IACS member classification societies.',
      category: 'Maritime Suite',
      tags: ['DNV', 'ABS', 'Lloyds Register', 'Bureau Veritas', 'ClassNK', 'RINA', 'CCS', 'Class Rules'],
      targetView: 'class_society',
      badgeText: 'Class Hub'
    },
    {
      id: 'feature-cost-estimator',
      type: 'section',
      title: 'Shipbuilding & Repair Cost Estimator',
      subtitle: 'CAPEX/OPEX, Dry Docking, Retrofitting & LDT Scrap Value',
      description: 'Financial cost modeling for newbuild vessel construction, shipyard dry docking, scrubber/BWTS retrofits, and LDT scrap recycling.',
      category: 'Maritime Suite',
      tags: ['Cost Estimator', 'Shipbuilding', 'CAPEX', 'Dry Dock Cost', 'BWTS', 'Scrap Value', 'LDT'],
      targetView: 'cost_estimator',
      badgeText: 'Financial'
    },
    {
      id: 'feature-carbon-emissions',
      type: 'section',
      title: 'IMO CII & EU ETS Carbon Calculator',
      subtitle: 'EEXI, Annual CII Rating (A-E) & EU Carbon Allowance Cost',
      description: 'Calculate annual CII A-E rating, EU ETS carbon allowance costs in Euros, FuelEU Maritime penalties, and alternative fuel pathways.',
      category: 'Maritime Suite',
      tags: ['CII', 'EEXI', 'EU ETS', 'Carbon', 'Emissions', 'FuelEU Maritime', 'Decarbonization'],
      targetView: 'carbon_emissions',
      badgeText: 'Carbon AI'
    },
    {
      id: 'feature-fleet-mgmt',
      type: 'section',
      title: 'Fleet Management Dashboard',
      subtitle: 'Vessel Performance, Fuel Oil Consumption & EEOI KPIs',
      description: 'Fleet overview monitoring, fuel consumption analytics, EEOI efficiency, and scheduled maintenance class survey alerts.',
      category: 'Maritime Suite',
      tags: ['Fleet Management', 'Vessels', 'EEOI', 'Fuel Consumption', 'Downtime', 'Ship Manager'],
      targetView: 'fleet_mgmt',
      badgeText: 'Fleet Mgmt'
    },
    {
      id: 'feature-dry-dock',
      type: 'section',
      title: 'Dry Dock Planner & Work Breakdown',
      subtitle: 'Gantt Timelines, Class Survey Items & Budget Tracking',
      description: 'Shipyard maintenance scheduling, hull coating scopes, tailshaft pulls, sea valve overhauls, and contractor budget tracking.',
      category: 'Maritime Suite',
      tags: ['Dry Dock', 'Special Survey', 'Shipyard', 'Maintenance', 'Tailshaft', 'Hull Coating'],
      targetView: 'dry_dock',
      badgeText: 'Dry Dock'
    },
    {
      id: 'feature-marine-survey',
      type: 'section',
      title: 'AI Marine Survey Assistant',
      subtitle: 'Pre-Purchase, Casualty Damage & Draft Surveys',
      description: 'Pre-purchase vessel condition inspections, H&M casualty damage surveys, draft surveys, and automated report templates.',
      category: 'Maritime Suite',
      tags: ['Surveyor', 'Pre-Purchase', 'Damage Survey', 'Draft Survey', 'Condition', 'Inspection'],
      targetView: 'marine_survey',
      badgeText: 'Survey AI'
    },
    {
      id: 'feature-risk-assessment',
      type: 'section',
      title: 'HAZID / HAZOP & JSA Risk Assessment',
      subtitle: '5x5 Risk Matrix & Safety Barrier Control Planning',
      description: 'Job Safety Analysis (JSA) generation, HAZID hazard identification cards, 5x5 risk matrix evaluation, and mitigation controls.',
      category: 'Maritime Suite',
      tags: ['HAZID', 'HAZOP', 'JSA', 'Risk Matrix', 'Safety', 'SMS', 'Enclosed Space'],
      targetView: 'risk_assessment',
      badgeText: 'Risk AI'
    },
    {
      id: 'feature-doc-library',
      type: 'section',
      title: 'Maritime Technical Document Library',
      subtitle: 'IMO Circulars, ISO Standards & Technical Manuals',
      description: 'Searchable repository for IMO circulars, ISO standards, Class Guidelines, technical manuals, and CFD research papers.',
      category: 'Maritime Suite',
      tags: ['Document Library', 'IMO Circular', 'ISO Standard', 'Class Guidelines', 'Manuals', 'Research'],
      targetView: 'doc_library',
      badgeText: 'Doc Library'
    },
    {
      id: 'feature-unit-converter',
      type: 'section',
      title: 'Engineering Unit Converter',
      subtitle: 'Knots, kW, BHP, Bar, Psi, cSt & DWT Tonnage',
      description: 'Instant unit conversions for maritime speed, shaft power, cylinder pressure, viscosity, and vessel tonnage.',
      category: 'Maritime Suite',
      tags: ['Unit Converter', 'Knots', 'kW', 'BHP', 'Bar', 'Psi', 'Viscosity', 'DWT'],
      targetView: 'unit_converter',
      badgeText: 'Unit Converter'
    },
    {
      id: 'feature-resume-builder',
      type: 'section',
      title: 'AI Seafarer Resume & CV Builder',
      subtitle: 'ATS Optimization, Sea Time Logs & STCW Endorsements',
      description: 'ATS-optimized maritime resume builder with integrated sea time logs, STCW endorsements, and flag state licenses.',
      category: 'Maritime Suite',
      tags: ['Resume', 'CV', 'Seafarer', 'Sea Time', 'STCW', 'Master Mariner', 'Naval Architect'],
      targetView: 'resume_builder',
      badgeText: 'Resume AI'
    },
    {
      id: 'feature-scholarships',
      type: 'section',
      title: 'Global Maritime Scholarship Portal',
      subtitle: 'WMU, AMC, Solent & IMarEST Fellowships',
      description: 'Database of fully funded scholarships and fellowships at World Maritime University, AMC, Solent, and IMarEST with AI essay generator.',
      category: 'Maritime Suite',
      tags: ['Scholarship', 'WMU', 'Fellowship', 'Education', 'Financial Aid', 'AMC', 'IMarEST'],
      targetView: 'scholarships',
      badgeText: 'Scholarships'
    },
    {
      id: 'feature-universities',
      type: 'section',
      title: 'Global Maritime University Directory',
      subtitle: 'World-Leading Academies, Rankings & Admissions',
      description: 'Profiles of top maritime universities for Naval Architecture, Marine Engineering, Port Logistics, and Ocean Technology.',
      category: 'Maritime Suite',
      tags: ['Universities', 'Rankings', 'Naval Architecture', 'WMU', 'NTNU', 'Chalmers', 'AMC'],
      targetView: 'universities',
      badgeText: 'Universities'
    },
    {
      id: 'feature-internships',
      type: 'section',
      title: 'Maritime Internship & Cadet Portal',
      subtitle: 'Cadetships, Trainee Roles & 1-Click Applications',
      description: 'Apply to deck cadetships, naval architecture trainee programs, and port logistics internships with 1-click AI applications.',
      category: 'Maritime Suite',
      tags: ['Internship', 'Cadet', 'Cadetship', 'Trainee', 'Jobs', 'Students'],
      targetView: 'internships',
      badgeText: 'Internships'
    },
    {
      id: 'feature-certifications',
      type: 'section',
      title: 'Maritime Certification & Renewal Center',
      subtitle: 'STCW Endorsements, DNV/ABS Surveyor Licenses & Reminders',
      description: 'Track STCW certificates, Flag State endorsements, DNV/ABS surveyor licenses, and IMarEST Chartered Engineer renewals.',
      category: 'Maritime Suite',
      tags: ['Certifications', 'STCW', 'Flag State', 'DNV', 'ABS', 'Renewal', 'CPD'],
      targetView: 'certifications',
      badgeText: 'Certifications'
    },
    {
      id: 'feature-voice-assistant',
      type: 'section',
      title: 'AI Multilingual Voice Assistant',
      subtitle: 'Hands-Free Bridge Navigation & Voice Commands',
      description: 'Multilingual AI voice assistant for hands-free navigation, bridge speech calculations, learning, and technical support.',
      category: 'Maritime Suite',
      tags: ['Voice Assistant', 'Microphone', 'Speech', 'Bridge Voice', 'Navigation'],
      targetView: 'voice_assistant',
      badgeText: 'Voice AI'
    },
    {
      id: 'feature-prompt-store-126',
      type: 'section',
      title: '126. AI Prompt Store & Marketplace',
      subtitle: 'Buy and Sell Premium Maritime AI Prompts',
      description: 'Marketplace where users buy and sell specialized maritime AI prompts with ratings, reviews, and revenue sharing.',
      category: 'Commercial Suite',
      tags: ['Prompts', 'AI Prompt Store', 'Marketplace', 'Prompt Engineering', 'Revenue'],
      targetView: 'prompt_store',
      badgeText: 'Prompt Store'
    },
    {
      id: 'feature-template-store-127',
      type: 'section',
      title: '127. Engineering Template Store',
      subtitle: 'Excel Tools, CAD Drawings, Maxsurf & OrcaFlex Models',
      description: 'Sell and purchase premium Excel tools, AutoCAD drawings, Maxsurf projects, OrcaFlex models, MATLAB scripts, and Python hydrodynamics code.',
      category: 'Commercial Suite',
      tags: ['Templates', 'AutoCAD', 'Maxsurf', 'OrcaFlex', 'Excel Calculators', 'Python'],
      targetView: 'template_store',
      badgeText: 'Templates'
    },
    {
      id: 'feature-maritime-bookstore-128',
      type: 'section',
      title: '128. Maritime Digital Bookstore',
      subtitle: 'eBooks, Lecture Notes & Engineering Manuals',
      description: 'Digital bookstore with eBooks, naval architecture lecture notes, research books, and engineering manuals.',
      category: 'Commercial Suite',
      tags: ['Bookstore', 'eBooks', 'Lecture Notes', 'Naval Books', 'Manuals'],
      targetView: 'maritime_bookstore',
      badgeText: 'Bookstore'
    },
    {
      id: 'feature-ai-resume-131',
      type: 'section',
      title: '131. AI Maritime Resume & CV Service',
      subtitle: 'Resumes, Cover Letters, STCW & LinkedIn Optimization',
      description: 'AI-generated maritime resumes, CV reviews, cover letters, STCW certificate portfolios, and LinkedIn optimization.',
      category: 'Commercial Suite',
      tags: ['Resume', 'CV', 'STCW', 'Career', 'LinkedIn', 'Cadet Portfolio'],
      targetView: 'ai_resume_service',
      badgeText: 'AI Resume'
    },
    {
      id: 'feature-tender-subscription-134',
      type: 'section',
      title: '134. Maritime Tender & Procurement Feed',
      subtitle: 'Global Maritime Tenders, Defense Contracts & Bids',
      description: 'Premium subscription for global maritime tenders, naval contracts, shipyard RFQs, and port expansion opportunities.',
      category: 'Commercial Suite',
      tags: ['Tenders', 'Procurement', 'Contracts', 'RFQs', 'Bids', 'Naval Defense'],
      targetView: 'tender_subscription',
      badgeText: 'Tenders'
    },
    {
      id: 'feature-industry-reports-135',
      type: 'section',
      title: '135. Exclusive Maritime Industry Reports',
      subtitle: 'Market Research, Decarbonization & Shipyard Intelligence',
      description: 'Premium executive reports on shipping markets, green fuel bunkering, port expansion, offshore energy, and shipbuilding trends.',
      category: 'Commercial Suite',
      tags: ['Industry Reports', 'Market Research', 'Decarbonization', 'LNG', 'Shipyard'],
      targetView: 'industry_reports',
      badgeText: 'Reports'
    },
    {
      id: 'feature-saas-app-store',
      type: 'section',
      title: 'Maritime SaaS App Store & Marketplace',
      subtitle: 'Developer Ecosystem & Enterprise Third-Party Apps',
      description: 'SaaS App Store allowing third-party maritime software developers to build and monetize apps on AI Maritime Hub.',
      category: 'Commercial Suite',
      tags: ['App Store', 'SaaS', 'Plugins', 'Developer', 'Marketplace'],
      targetView: 'saas_app_store',
      badgeText: 'App Store'
    },
    {
      id: 'feature-dtaas-platform',
      type: 'section',
      title: 'Digital Twin as a Service (DTaaS)',
      subtitle: 'Real-Time Cloud Hull Strain & Fuel Analytics Digital Twins',
      description: 'Enterprise DTaaS providing real-time cloud digital twins for hull structural health, engine performance, and fuel monitoring.',
      category: 'Commercial Suite',
      tags: ['DTaaS', 'Digital Twin', 'Cloud Twin', 'IoT', 'Hull Strain', 'SIMaaS'],
      targetView: 'dtaas_platform',
      badgeText: 'DTaaS'
    },
    {
      id: 'feature-maritime-digital-library',
      type: 'section',
      title: 'AI Maritime Digital Library & Knowledge Center',
      subtitle: 'World\'s Largest Maritime Books, Journals, Regulations & CAD Datasets',
      description: 'Search 50,000+ maritime textbooks, IMO regulations, PhD theses, CAD models, and research papers with AI summaries and learning paths.',
      category: 'Knowledge Hub',
      tags: ['Digital Library', 'Books', 'Journals', 'IMO Rules', 'Thesis', 'CAD Datasets', 'Citations', 'Syllabus'],
      targetView: 'maritime_digital_library',
      badgeText: 'Library'
    },
    {
      id: 'feature-maritime-simulation-center',
      type: 'section',
      title: 'AI Maritime Simulation Center & VR Studio',
      subtitle: '2D/3D Physics, Bridge Navigation, Hydrodynamics & Emergency Drills',
      description: 'Browser-based 2D/3D, VR/AR, and Digital Twin simulations covering ship handling, COLREGs, CFD, engine room, and emergency response with live AI scoring.',
      category: 'Simulation Studio',
      tags: ['Simulation', 'VR', 'Bridge Navigation', 'COLREGs', 'CFD', 'Hydrodynamics', 'Engine Room', 'Emergency Drill'],
      targetView: 'maritime_simulation_center',
      badgeText: 'Simulation'
    },
    {
      id: 'feature-sponsored-listings',
      type: 'section',
      title: 'Sponsored Listings & Ad Campaign Engine (Feature #117)',
      subtitle: 'Highlight Maritime Services, Shipyards, & Green Propulsion Tech',
      description: 'Directory and search ad management module allowing maritime companies to launch CPM/CPC campaigns, feature profiles, and track click metrics.',
      category: 'Monetization & Ads',
      tags: ['Sponsored', 'Ads', 'Monetization', 'Directory', 'Campaign Manager', 'CPC', 'CPM', 'Ad Network'],
      targetView: 'sponsored_listings',
      badgeText: 'Ads #117'
    },
    {
      id: 'feature-offshore-wind-dashboard',
      type: 'section',
      title: 'Offshore Wind SCADA Telemetry & AI Digital Twin (Feature #118)',
      subtitle: 'Real-Time Wind Farm Telemetry, Betz Power Curves & CTV Logistics',
      description: 'Comprehensive offshore wind asset monitoring: turbine power output, Betz curves, SCADA vibration alarms, gearbox thermal analytics, and CTV maintenance logistics.',
      category: 'Offshore & Energy',
      tags: ['Offshore Wind', 'SCADA', 'Telemetry', 'Turbine Efficiency', 'Dogger Bank', 'Hywind', 'Maintenance', 'Betz Curve', 'CTV'],
      targetView: 'offshore_wind_dashboard',
      badgeText: 'Wind SCADA #118'
    },
    {
      id: 'feature-smart-shipyard-206',
      type: 'section',
      title: '🏗️ 206. Smart Shipyard Platform',
      subtitle: 'Laser 3D Hull Scanning, Welding QA AI, Fabrication & Assembly Line Telemetry',
      description: 'AI-assisted shipyard manufacturing control with automated ultrasonic weld defect detection, panel line robotic scheduling, and block alignment tolerance tracking.',
      category: 'Smart Ecosystem Modules',
      tags: ['Smart Shipyard', 'Welding QA', 'Laser 3D Scanning', 'Shipbuilding', 'Block Alignment', 'Assembly', 'Fabrication'],
      targetView: 'smart_shipyard',
      badgeText: '#206 Shipyard'
    },
    {
      id: 'feature-maritime-commerce-207',
      type: 'section',
      title: '🛒 207. Maritime Commerce Store',
      subtitle: 'Engine Spare Parts, OEM Valves, IMPA Code Catalog & B2B Inventory',
      description: 'Global B2B e-commerce marketplace for marine machinery, main engine components, turbochargers, pumps, filters, and IMPA-coded deck stores with instant RFQs.',
      category: 'Smart Ecosystem Modules',
      tags: ['Maritime Commerce', 'Spare Parts', 'IMPA Catalog', 'B2B Store', 'Engine Spares', 'E-commerce', 'Suppliers'],
      targetView: 'maritime_commerce',
      badgeText: '#207 Commerce'
    },
    {
      id: 'feature-ai-assistant-builder-208',
      type: 'section',
      title: '🤖 208. AI Assistant Builder',
      subtitle: 'No-Code AI Agent Studio, RAG Document Bases & Custom Maritime Bots',
      description: 'Build, train, and deploy specialized AI agents pre-loaded with custom vessel manuals, SOLAS rules, or port tariffs using drag-and-drop workflow nodes.',
      category: 'Smart Ecosystem Modules',
      tags: ['AI Assistant Builder', 'No-code Agent', 'RAG', 'Custom AI Bot', 'LLM Agents', 'Workflow', 'Prompt Builder'],
      targetView: 'ai_assistant_builder',
      badgeText: '#208 Agent AI'
    },
    {
      id: 'feature-maritime-data-exchange-209',
      type: 'section',
      title: '💾 209. Maritime Data Exchange',
      subtitle: 'Data Monetization, Live AIS Feeds, Weather APIs & Telemetry Streams',
      description: 'Monetize and query maritime data streams including raw satellite AIS logs, ocean wave time series, port turn-around times, and vessel fuel benchmarks.',
      category: 'Smart Ecosystem Modules',
      tags: ['Data Exchange', 'AIS Feeds', 'Data Monetization', 'APIs', 'Telemetry Streams', 'Ocean Data'],
      targetView: 'maritime_data_exchange',
      badgeText: '#209 Data Exchange'
    },
    {
      id: 'feature-ai-research-lab-210',
      type: 'section',
      title: '🔬 210. AI Research Lab & GPU Notebook',
      subtitle: 'Interactive PyTorch ML, OpenFOAM CFD Mesh & AI Fine-Tuning Studio',
      description: 'Run GPU-accelerated Jupyter notebooks for hydrodynamics ML, custom hull neural networks, OpenFOAM CFD automated meshing, and model evaluation.',
      category: 'Smart Ecosystem Modules',
      tags: ['AI Research Lab', 'PyTorch', 'GPU Notebook', 'OpenFOAM', 'CFD Mesh', 'Machine Learning', 'Model Fine-Tuning'],
      targetView: 'ai_research_lab',
      badgeText: '#210 AI Lab'
    },
    {
      id: 'feature-maritime-innovation-marketplace-211',
      type: 'section',
      title: '💡 211. Innovation Marketplace',
      subtitle: 'Patents, Green Tech IP Licensing & Maritime Startup Deals',
      description: 'Connect maritime technology inventors with global shipowners and venture funds for patent licensing, pilot trials, and Series A investments.',
      category: 'Smart Ecosystem Modules',
      tags: ['Innovation Marketplace', 'Patents', 'Green Tech IP', 'Startups', 'Venture Capital', 'Tech Licensing'],
      targetView: 'maritime_innovation_marketplace',
      badgeText: '#211 IP Market'
    },
    {
      id: 'feature-smart-ocean-platform-212',
      type: 'section',
      title: '🌊 212. Smart Ocean & Satellite Analytics',
      subtitle: 'Copernicus Marine Satellites, Sea Surface Temp (SST) & Algae Bloom Tracking',
      description: 'Process multi-spectral Copernicus and MODIS satellite feeds for ocean temperature anomalies, microplastic density, chlorophyll-a, and sea ice drift.',
      category: 'Smart Ecosystem Modules',
      tags: ['Smart Ocean', 'Satellite Analytics', 'Copernicus', 'SST', 'Oceanography', 'Chlorophyll', 'Plastic Tracking'],
      targetView: 'smart_ocean_platform',
      badgeText: '#212 Ocean AI'
    },
    {
      id: 'feature-autonomous-vessel-hub-213',
      type: 'section',
      title: '🧭 213. Autonomous Vessel (MASS) Hub',
      subtitle: 'MASS Level 1-4 Autonomy, COLREGs Evasion & Remote Shore Control Bridge',
      description: 'Simulate Maritime Autonomous Surface Ships (MASS Level 4), collision avoidance algorithms, LiDAR point-clouds, and remote shore control center telemetry.',
      category: 'Smart Ecosystem Modules',
      tags: ['Autonomous Vessel', 'MASS Level 4', 'COLREGs Evasion', 'LiDAR', 'Remote Bridge', 'Unmanned Ships'],
      targetView: 'autonomous_vessel_hub',
      badgeText: '#213 MASS'
    },
    {
      id: 'feature-marine-robotics-center-214',
      type: 'section',
      title: '⚓ 214. Marine Robotics & Subsea ROV',
      subtitle: 'AUV Swarms, Ultrasonic Hull Thickness & Subsea Pipe Inspection',
      description: 'Telemetry and mission planner for subsea Remote Operated Vehicles (ROVs), Autonomous Underwater Vehicles (AUVs), and magnetic hull-crawling cleaning robots.',
      category: 'Smart Ecosystem Modules',
      tags: ['Marine Robotics', 'Subsea ROV', 'AUV Swarm', 'Ultrasonic Thickness', 'Pipeline Inspection', 'Underwater Robotics'],
      targetView: 'marine_robotics_center',
      badgeText: '#214 Robotics'
    },
    {
      id: 'feature-maritime-gis-platform-215',
      type: 'section',
      title: '🗺️ 215. Spatial Maritime GIS Platform',
      subtitle: 'Bathymetry Depth Contours, EEZ Boundaries & Marine Protected Areas',
      description: 'Multi-layered GIS spatial engine with high-resolution bathymetric contours, Exclusive Economic Zone (EEZ) borders, ECA emission zone polygons, and AIS heatmaps.',
      category: 'Smart Ecosystem Modules',
      tags: ['Maritime GIS', 'Bathymetry', 'EEZ Boundaries', 'Spatial Layers', 'ECA Zones', 'AIS Heatmap', 'GIS Map'],
      targetView: 'maritime_gis_platform',
      badgeText: '#215 Spatial GIS'
    },
    {
      id: 'feature-maritime-investment-platform-216',
      type: 'section',
      title: '🪙 216. Green Maritime Investments',
      subtitle: 'Green Bonds, Poseidon Principles, EU Taxonomy & Decarbonization Loans',
      description: 'Evaluate maritime green bonds, Poseidon Principles climate alignment scores, EU Taxonomy compliance, and alternative fuel vessel syndicate loans.',
      category: 'Smart Ecosystem Modules',
      tags: ['Green Investment', 'Poseidon Principles', 'ESG', 'Green Bonds', 'EU Taxonomy', 'Decarbonization Finance'],
      targetView: 'maritime_investment_platform',
      badgeText: '#216 Green Invest'
    },
    {
      id: 'feature-ai-procurement-platform-217',
      type: 'section',
      title: '📑 217. AI Automated Procurement',
      subtitle: 'Automated Quotation Comparison, IMPA RFQs & Purchase Orders',
      description: 'Streamline ship chandler and spare parts procurement with AI bid parsing, commercial term comparisons, lead time scoring, and ERP integration.',
      category: 'Smart Ecosystem Modules',
      tags: ['Procurement', 'AI Quotations', 'RFQs', 'Ship Chandler', 'IMPA Bids', 'Purchase Orders'],
      targetView: 'ai_procurement_platform',
      badgeText: '#217 Procurement'
    },
    {
      id: 'feature-global-maritime-directory-218',
      type: 'section',
      title: '🔍 218. Global Verified Directory',
      subtitle: '50,000+ Shipyards, Ports, Class Societies & ISO Suppliers',
      description: 'Verified database of global shipyards, container terminals, bunker suppliers, classification offices, and marine equipment manufacturers with compliance badges.',
      category: 'Smart Ecosystem Modules',
      tags: ['Directory', 'Verified Shipyards', 'Ports', 'Class Offices', 'Suppliers', 'ISO Verification'],
      targetView: 'global_maritime_directory',
      badgeText: '#218 Directory'
    },
    {
      id: 'feature-maritime-social-network-219',
      type: 'section',
      title: '👥 219. Maritime Social Network',
      subtitle: 'Seafarer Professional Networking, Technical Feeds & Connections',
      description: 'Professional networking portal for mariners, naval architects, chief engineers, and port managers to exchange insights and career updates.',
      category: 'Smart Ecosystem Modules',
      tags: ['Social Network', 'Seafarer Community', 'Networking', 'Feeds', 'Technical Q&A'],
      targetView: 'maritime_social_network',
      badgeText: '#219 Network'
    },
    {
      id: 'feature-maritime-streaming-platform-220',
      type: 'section',
      title: '📺 220. Maritime Streaming 4K Video',
      subtitle: 'Live Port Cams, Ship Launches & Offshore Installation Feeds',
      description: 'Ultra-HD 4K live streaming network featuring port webcams, vessel launch ceremonies, dry dock operations, and offshore wind installation webcasts.',
      category: 'Smart Ecosystem Modules',
      tags: ['Maritime Streaming', '4K Cams', 'Port Webcams', 'Ship Launch', 'Dry Dock Live'],
      targetView: 'maritime_streaming_platform',
      badgeText: '#220 4K Stream'
    },
    {
      id: 'feature-maritime-publishing-platform-221',
      type: 'section',
      title: '📖 221. Maritime Publishing & Journals',
      subtitle: 'Open Access Papers, Peer-Reviewed Articles, DOIs & Citations',
      description: 'Academic publishing engine for naval architecture research, peer-reviewed open access journal submission, automated DOI assignment, and citation tracking.',
      category: 'Smart Ecosystem Modules',
      tags: ['Maritime Publishing', 'Academic Journals', 'Peer Review', 'Open Access', 'DOIs', 'Citations'],
      targetView: 'maritime_publishing_platform',
      badgeText: '#221 Journals'
    },
    {
      id: 'feature-ai-business-intelligence-222',
      type: 'section',
      title: '📈 222. C-Suite AI Business Intelligence',
      subtitle: 'Executive Market Dashboards, Baltic Dry Index & Charter Rate AI',
      description: 'Executive decision support dashboard tracking Baltic Dry Index (BDI), Clarksons freight indices, bunker fuel price spreads, and fleet earnings AI forecasts.',
      category: 'Smart Ecosystem Modules',
      tags: ['Business Intelligence', 'C-Suite Dashboard', 'Baltic Dry Index', 'Freight Rates', 'Chartering AI', 'Market Intelligence'],
      targetView: 'ai_business_intelligence',
      badgeText: '#222 C-Suite BI'
    },
    {
      id: 'feature-maritime-super-wallet-223',
      type: 'section',
      title: '💳 223. Maritime Super Wallet',
      subtitle: 'Seafarer Payroll, Escrow Settlement & Multi-Currency FX',
      description: 'Cross-border seafarer salary disbursements, multi-currency wallet, port fee escrow arrangements, and instant maritime supplier FX conversions.',
      category: 'Smart Ecosystem Modules',
      tags: ['Super Wallet', 'Seafarer Payroll', 'Escrow Payments', 'Fintech', 'Multi-Currency', 'FX Settlement'],
      targetView: 'maritime_super_wallet',
      badgeText: '#223 Wallet'
    },
    {
      id: 'feature-global-partnership-hub-224',
      type: 'section',
      title: '🤝 224. Global Strategic Partnerships',
      subtitle: 'MoUs, Joint Ventures, University Alliances & Government Grants',
      description: 'Platform for forming international maritime consortiums, research alliances between universities, class societies, and government blue economy grants.',
      category: 'Smart Ecosystem Modules',
      tags: ['Strategic Partnerships', 'MoU', 'Joint Venture', 'University Alliance', 'Government Grants'],
      targetView: 'global_partnership_hub',
      badgeText: '#224 Partnerships'
    },
    {
      id: 'feature-maritime-metaverse-225',
      type: 'section',
      title: '📦 225. Maritime Metaverse 3D Campus',
      subtitle: 'VR Bridge Simulator, Virtual Expo Booths & 3D Avatars',
      description: 'Immersive WebGL / WebXR 3D metaverse campus featuring virtual ship model walkthroughs, trade show expo booths, and multi-user bridge training.',
      category: 'Smart Ecosystem Modules',
      tags: ['Maritime Metaverse', '3D VR Campus', 'VR Bridge', 'Virtual Expo', '3D Walkthrough', 'Avatars'],
      targetView: 'maritime_metaverse',
      badgeText: '#225 Metaverse'
    },
    {
      id: 'feature-ai-career-path-planner',
      type: 'section',
      title: '🎯 AI Career Path Planner & Skill Matrix',
      subtitle: 'Naval Architect & Chief Engineer Career Growth Pipelines',
      description: 'AI-driven skill matrix analysis, certification roadmap generator, and competency gap mapping for seafarers and maritime executives.',
      category: 'Career & Skills',
      tags: ['Career Planner', 'Skill Matrix', 'Naval Architect Career', 'Chief Engineer', 'Certifications Roadmap'],
      targetView: 'ai_career_path_planner',
      badgeText: 'Career AI'
    },
    {
      id: 'feature-super-ecosystem-master',
      type: 'section',
      title: '🌐 196-205. Super Ecosystem & Master OS',
      subtitle: 'Unified System Architecture, Global API Gateway & Master Suite Control',
      description: 'Central management console and master operating environment connecting all 225 maritime AI modules, security controls, and cloud infrastructure.',
      category: 'System Operating System',
      tags: ['Super Ecosystem', 'Master OS', 'System Architecture', 'API Gateway', 'Unified Console', 'Platform Core'],
      targetView: 'super_ecosystem',
      badgeText: 'Master OS'
    }
  ];

  ECOSYSTEM_SEARCH_ITEMS.forEach(item => items.push(item));

  return items;
};
