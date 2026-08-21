export interface AgentReview {
  id: string;
  author: string;
  avatar: string;
  role: string;
  company: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface MaritimeAgent {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'engineering' | 'academic' | 'regulations' | 'industry' | 'enterprise';
  categoryLabel: string;
  creator: {
    name: string;
    avatar: string;
    organization: string;
    verified: boolean;
    tier: 'Platinum Expert' | 'Class Certified' | 'Shipyard Partner' | 'Academic Fellow';
    totalSales: string;
  };
  iconName: string;
  iconBg: string;
  pricing: {
    type: 'free' | 'subscription' | 'one_time' | 'enterprise';
    amount: number;
    currency: string;
    period?: string;
  };
  stats: {
    installs: number;
    runsTotal: string;
    rating: number;
    reviewCount: number;
    avgLatency: string;
    successRate: string;
    contextTokens: string;
  };
  supportedModels: ('Gemini 2.5 Flash' | 'Gemini 3.0 Pro' | 'Claude 3.5 Sonnet' | 'GPT-4o' | 'DeepSeek-R1' | 'Llama-3.3 Maritime')[];
  capabilities: string[];
  toolsIntegrated: string[];
  samplePrompts: string[];
  knowledgeBases: string[];
  featured?: boolean;
  trending?: boolean;
  enterpriseReady?: boolean;
  systemPromptPreview: string;
  defaultSimulationResponse: string;
}

export const MARITIME_AGENTS: MaritimeAgent[] = [
  // 1. Engineering Agents
  {
    id: 'eng-ship-design',
    name: 'NavalCadence Ship Design AI',
    tagline: 'Parametric hull lines synthesis, principal dimension optimization & GA generation',
    description: 'Autonomous naval architecture agent for initial ship synthesis. Generates LBP, Beam, Draft, CB, displacement curves, and preliminary midship scantlings in compliance with IACS S11A rules.',
    category: 'engineering',
    categoryLabel: 'Engineering & Design',
    creator: {
      name: 'Dr. Henrik Lindqvist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      organization: 'Nordic Marine Design Lab',
      verified: true,
      tier: 'Platinum Expert',
      totalSales: '$42,800'
    },
    iconName: 'Ship',
    iconBg: 'from-cyan-500/20 to-blue-600/30 border-cyan-500/40 text-cyan-400',
    pricing: {
      type: 'subscription',
      amount: 49,
      currency: 'USD',
      period: 'mo'
    },
    stats: {
      installs: 3840,
      runsTotal: '142.5k',
      rating: 4.95,
      reviewCount: 312,
      avgLatency: '1.2s',
      successRate: '99.4%',
      contextTokens: '1M tokens'
    },
    supportedModels: ['Gemini 3.0 Pro', 'Claude 3.5 Sonnet', 'DeepSeek-R1'],
    capabilities: [
      'Parametric LBP/B/D estimation via Holtrop statistical database',
      'Preliminary General Arrangement (GA) compartment layout',
      'Cross-curves of stability generation & Bonjean curve derivation',
      'IACS UR S11A wave bending moment calculation',
      'Rhino Grasshopper Python script auto-export'
    ],
    toolsIntegrated: ['Hydrostatic Solver', 'Rhino 3D Bridge', 'IACS Formula Engine', 'GA Layout Compiler'],
    samplePrompts: [
      'Synthesize principal dimensions for a 15,000 DWT dual-fuel chemical tanker at 14 knots service speed.',
      'Generate initial transverse GM and curve of statical stability (GZ) for 12m draft condition.',
      'Provide midship section plating thickness recommendations under DNV Rules for 180m container ship.'
    ],
    knowledgeBases: ['IACS UR S11A Wave Loads (2024)', 'DNV Hull Structural Rules Pt.3', 'Principles of Naval Architecture (PNA 2020)', 'Holtrop-Mennen 1982/1984 Resistance Data'],
    featured: true,
    trending: true,
    enterpriseReady: true,
    systemPromptPreview: 'You are NavalCadence, a Senior Principal Naval Architect with 25+ years of design shipyard experience. You compute exact hydrostatic coefficients, verify IMO intact stability criteria (Resolution A.749), and generate verified Python CAD scripts.',
    defaultSimulationResponse: '### Preliminary Dimension Synthesis & Hydrostatic Estimate\n\n**Vessel Type:** 15,000 DWT Chemical Tanker (IMO II/III)\n- **Length Overall (LOA):** 144.50 m\n- **Length Between Perpendiculars (LBP):** 136.20 m\n- **Moulded Breadth (B):** 22.80 m\n- **Moulded Depth (D):** 12.20 m\n- **Design Draft (T):** 8.60 m\n- **Block Coefficient (Cb):** 0.772\n- **Displacement (Δ):** 19,850 tonnes @ ρ = 1.025 t/m³\n- **Prismatic Coefficient (Cp):** 0.785 | **Midship Section Coeff (Cm):** 0.983\n\n**Preliminary Powering (Holtrop-Mennen):**\n- $P_E$ (Effective Power @ 14.0 kn): ~3,420 kW\n- Propulsive Efficiency ($\eta_D$): 0.695\n- $MCR_{req}$ (with 15% sea margin): 5,850 kW @ 105 RPM (MAN B&W 5S50ME-C9.7-GI Dual Fuel)'
  },
  {
    id: 'eng-hydrostatics',
    name: 'HydroSim Simpson Engine',
    tagline: 'Instant Simpson 1st & 2nd Rule waterplane integration, transverse metacentric height (KMt)',
    description: 'Specialized numerical hydrostatics calculator agent. Ingests offset tables, station coordinate CSVs, or hull point clouds and instantly computes KB, BMt, BML, LCB, LCF, and moment to trim 1cm (MCTC).',
    category: 'engineering',
    categoryLabel: 'Engineering & Design',
    creator: {
      name: 'Prof. Callum Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      organization: 'Glasgow Marine Hydrodynamics Lab',
      verified: true,
      tier: 'Class Certified',
      totalSales: '$28,400'
    },
    iconName: 'Compass',
    iconBg: 'from-indigo-500/20 to-violet-600/30 border-indigo-500/40 text-indigo-400',
    pricing: {
      type: 'free',
      amount: 0,
      currency: 'USD'
    },
    stats: {
      installs: 8920,
      runsTotal: '390.1k',
      rating: 4.98,
      reviewCount: 740,
      avgLatency: '0.6s',
      successRate: '99.9%',
      contextTokens: '500k tokens'
    },
    supportedModels: ['Gemini 2.5 Flash', 'Gemini 3.0 Pro', 'GPT-4o'],
    capabilities: [
      'Simpson 1/3 and 3/8 Rule numerical integration',
      'Waterplane area ($A_{WP}$) and Longitudinal Center of Flotation ($LCF$)',
      'Second moment of area ($I_T$, $I_L$) for transverse and longitudinal BM',
      'MCTC derivation and trim correction after weight shifts',
      'Instant LaTeX formula generation and step-by-step mathematical proof'
    ],
    toolsIntegrated: ['Simpson Integration Library', 'Waterplane Solver', 'GZ Stability Curve Generator'],
    samplePrompts: [
      'Compute KB, BMt, and KMt for a vessel with given half-breadths across 11 stations at 7.0m draft.',
      'Show derivation of Metacentric Radius $BM = I_T / \\nabla$ step by step with numerical integration.',
      'Calculate change in forward and aft draft after loading 350 tonnes at LCG = +24.5m forward of midships.'
    ],
    knowledgeBases: ['Bhattacharyya Dynamics of Marine Vehicles', 'Rawson & Tupper Basic Ship Theory', 'IMO Resolution MSC.267(85) Intact Stability Code'],
    featured: true,
    trending: false,
    enterpriseReady: true,
    systemPromptPreview: 'You are HydroSim, a specialized numerical hydrodynamic solver. You perform deterministic numerical integrations using Simpson First and Second rules, outputting LaTeX equations, tabular station integration summaries, and precision checks.',
    defaultSimulationResponse: '### Hydrostatic Integration Result via Simpson 1st Rule (11 Stations, $\\Delta x = 12.0\\text{ m}$)\n\n$$\\text{Waterplane Area } A_{WP} = \\frac{2}{3} \\Delta x \\sum (f(y) \\times SM) = 2,418.60\\text{ m}^2$$\n$$\\text{Transverse Moment of Inertia } I_T = \\frac{2}{9} \\Delta x \\sum (y^3 \\times SM) = 54,820\\text{ m}^4$$\n$$\\text{Submerged Volume } \\nabla = 18,420\\text{ m}^3 \\quad (\\Delta = 18,880.5\\text{ tonnes in seawater})$$\n\n**Metacentric Characteristics:**\n- $KB = 0.53 \\times T = 4.558\\text{ m}$\n- $BM_T = \\frac{I_T}{\\nabla} = \\frac{54,820}{18,420} = 2.976\\text{ m}$\n- **Transverse Metacenter $KM_T = KB + BM_T = 7.534\\text{ m}$**\n- For assumed $KG = 6.450\\text{ m}$, the initial metacentric height **$GM_0 = 1.084\\text{ m}$** (Complies with IMO intact stability criteria > 0.15m).'
  },
  {
    id: 'eng-propeller-cfd',
    name: 'VortexBlade Propeller & CFD Agent',
    tagline: 'Wageningen B-Series & MP683 cavitation solver, blade pitch optimization & wake fraction analysis',
    description: 'Propulsion hydrodynamics specialist. Analyzes open water characteristics ($K_T$, $K_Q$, $\\eta_0$), Keller cavitation criteria, blade root stress, and wake field harmonics for contra-rotating and controllable pitch propellers.',
    category: 'engineering',
    categoryLabel: 'Engineering & Design',
    creator: {
      name: 'AeroMarine Propulsion GmbH',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
      organization: 'Hamburg Hydrodynamic Institute',
      verified: true,
      tier: 'Platinum Expert',
      totalSales: '$39,500'
    },
    iconName: 'Cpu',
    iconBg: 'from-amber-500/20 to-orange-600/30 border-amber-500/40 text-amber-400',
    pricing: {
      type: 'subscription',
      amount: 69,
      currency: 'USD',
      period: 'mo'
    },
    stats: {
      installs: 2650,
      runsTotal: '88.3k',
      rating: 4.92,
      reviewCount: 198,
      avgLatency: '1.4s',
      successRate: '98.8%',
      contextTokens: '2M tokens'
    },
    supportedModels: ['Gemini 3.0 Pro', 'Claude 3.5 Sonnet', 'DeepSeek-R1'],
    capabilities: [
      'Wageningen B-Series regression polynomial evaluation ($K_T$, $K_Q$, $\\eta_o$ vs $J$)',
      'Keller minimum expanded blade area ratio ($A_E/A_0$) formulation for cavitation avoidance',
      'Wake fraction ($w$) and thrust deduction ($t$) Taylor/Harvald regression',
      'Blade section pitch distribution ($P/D$) curve smoothing for non-uniform hull wake',
      'OpenFOAM snappyHexMesh and pimpleFoam script generation'
    ],
    toolsIntegrated: ['B-Series Mathematical Engine', 'Keller Cavitation Verifier', 'OpenFOAM CFD Generator'],
    samplePrompts: [
      'Optimize propeller diameter and P/D for a 4-blade propeller delivering 7,200 kW thrust at 95 RPM.',
      'Check Keller minimum blade area ratio for a twin-screw passenger ferry with 2.8m tip submergence.',
      'Generate OpenFOAM rotating reference frame (MRF) case folder configuration for Wageningen B4-70.'
    ],
    knowledgeBases: ['Carlton Marine Propellers & Propulsion 4th Ed', 'ITTC 1978 Performance Prediction Method', 'Wageningen B-Series Polynomial Coefficients'],
    featured: false,
    trending: true,
    enterpriseReady: true,
    systemPromptPreview: 'You are VortexBlade, a specialized marine propulsion and propeller hydrodynamic agent. You calculate optimum advance coefficient J_opt, evaluate cavitation margins, and formulate open-water efficiency charts.',
    defaultSimulationResponse: '### Propeller Optimum Sizing (Wageningen B4-70 Series)\n\n**Design Inputs:**\n- Delivered Power $P_D = 7,200\\text{ kW}$ | Rotational Speed $N = 95\\text{ RPM}$ | Speed of Advance $V_A = 12.8\\text{ knots} = 6.584\\text{ m/s}$\n\n**Hydrodynamic Optimization Output:**\n- **Optimum Propeller Diameter ($D$):** $6.20\\text{ m}$\n- **Pitch Ratio ($P/D$ @ 0.7R):** $0.842$\n- **Advance Ratio ($J$):** $J = \\frac{V_A}{n D} = \\frac{6.584}{1.583 \\times 6.20} = 0.671$\n- **Thrust Coefficient ($K_T$):** $0.184$ | **Torque Coefficient ($10 K_Q$):** $0.246$\n- **Open Water Efficiency ($\\eta_0$):** **$68.4\\%$**\n\n**Cavitation Assessment (Keller Formula):**\n- Required Minimum Blade Area Ratio: $\\left(\\frac{A_E}{A_0}\\right)_{min} = \\frac{(1.3 + 0.3 Z) T}{(p_0 - p_v) D^2} + K = 0.648$\n- Selected Blade Area Ratio: **$A_E/A_0 = 0.700$** $\\rightarrow$ **Cavitation Margin: $+8.0\\%$ Safe**.'
  },
  {
    id: 'eng-structural-fea',
    name: 'ScantlingPro CSR & FEA Auditor',
    tagline: 'IACS Common Structural Rules (CSR-BC&OT), plate buckling & yield stress verification',
    description: 'Naval structural specialist agent. Calculates required plating thickness, longitudinal stiffener section modulus, transverse web frame shear stress, and performs yield/buckling screening according to DNV-RU-SHIP and IACS CSR.',
    category: 'engineering',
    categoryLabel: 'Engineering & Design',
    creator: {
      name: 'Maritime StructAI BV',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      organization: 'Rotterdam Structural Engineering Group',
      verified: true,
      tier: 'Class Certified',
      totalSales: '$34,100'
    },
    iconName: 'ShieldCheck',
    iconBg: 'from-rose-500/20 to-pink-600/30 border-rose-500/40 text-rose-400',
    pricing: {
      type: 'subscription',
      amount: 59,
      currency: 'USD',
      period: 'mo'
    },
    stats: {
      installs: 2180,
      runsTotal: '64.2k',
      rating: 4.91,
      reviewCount: 164,
      avgLatency: '1.5s',
      successRate: '99.1%',
      contextTokens: '1M tokens'
    },
    supportedModels: ['Gemini 3.0 Pro', 'Claude 3.5 Sonnet', 'GPT-4o'],
    capabilities: [
      'IACS CSR Midship Section Modulus ($Z_{min}$) formulation',
      'Bottom plating and inner bottom thickness against slamming and hydrostatic head',
      'Longitudinal stiffener plastic and elastic section modulus ($Z_l$)',
      'Plate panel elastic buckling coefficient calculation ($k_b$, $\\sigma_{cr}$)',
      'Corrosion additions ($t_c$) and net scantling conversion'
    ],
    toolsIntegrated: ['Section Modulus Solver', 'Plate Buckling Engine', 'IACS CSR Database'],
    samplePrompts: [
      'Calculate required bottom shell plating thickness for a 200m bulk carrier under DNV Pt.3 Ch.6.',
      'Check longitudinal bulb flat stiffener 240x12 against lateral pressure of 145 kN/m².',
      'Evaluate buckling utilization factor for deck panel with aspect ratio 3.2 under compressive stress.'
    ],
    knowledgeBases: ['IACS Common Structural Rules for Bulk Carriers and Oil Tankers (CSR-BC&OT 2024)', 'DNV Rules for Classification: Ships Pt.3', 'Hughes & Paik Ship Structural Analysis and Design'],
    featured: false,
    trending: false,
    enterpriseReady: true,
    systemPromptPreview: 'You are ScantlingPro, a structural naval architect specialized in IACS CSR scantling derivation and finite element yield stress verification.',
    defaultSimulationResponse: '### Scantling Verification Report: Bottom Shell Plating (IACS CSR Pt 1 Ch 6 Sec 4)\n\n**Design Parameters:**\n- Plating Material: **AH36 High-Tensile Steel** ($R_{eH} = 355\\text{ N/mm}^2, k = 0.72$)\n- Stiffener Spacing ($s$): $800\\text{ mm}$ | Panel Span ($l$): $2,400\\text{ mm}$\n- Total Design Pressure at Baseline ($P_{tot} = P_{stat} + P_{dyn}$): $168.4\\text{ kN/m}^2$\n\n**Required Net Thickness Calculation:**\n$$t_{net} = 0.0158 \\cdot C_d \\cdot s \\cdot \\sqrt{\\frac{P_{tot}}{C_s \\cdot R_{eH}}} = 15.34\\text{ mm}$$\n- Corrosion Addition ($t_c$ for Ballast/Cargo Tank boundaries): $+2.50\\text{ mm}$\n- Total Gross Scantling Required: **$17.84\\text{ mm}$**\n- **Selected Plate Nominal Scantling:** **$18.50\\text{ mm}$** (Utilization: **$96.4\\%$** $\\rightarrow$ **APPROVED**).'
  },

  // 2. Regulation & Compliance Agents
  {
    id: 'reg-solas-expert',
    name: 'SOLAS & Fire Safety Compliance Agent',
    tagline: 'Instant chapter-by-chapter SOLAS 2024 audits, LSA & FSS Code regulatory verification',
    description: 'Authoritative maritime safety and regulation compliance copilot. Direct access to SOLAS Chapters I through XIV, Fire Safety Systems (FSS) Code, Life-Saving Appliances (LSA) Code, and Polar Code amendments.',
    category: 'regulations',
    categoryLabel: 'Regulations & Class Rules',
    creator: {
      name: 'Capt. Elias Thorne',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      organization: 'Maritime Regulatory Institute (London)',
      verified: true,
      tier: 'Class Certified',
      totalSales: '$52,100'
    },
    iconName: 'FileCheck',
    iconBg: 'from-emerald-500/20 to-teal-600/30 border-emerald-500/40 text-emerald-400',
    pricing: {
      type: 'subscription',
      amount: 39,
      currency: 'USD',
      period: 'mo'
    },
    stats: {
      installs: 6140,
      runsTotal: '210.4k',
      rating: 4.97,
      reviewCount: 488,
      avgLatency: '0.9s',
      successRate: '99.7%',
      contextTokens: '2M tokens'
    },
    supportedModels: ['Gemini 3.0 Pro', 'Claude 3.5 Sonnet', 'GPT-4o', 'DeepSeek-R1'],
    capabilities: [
      'SOLAS Chapter II-2 Fire integrity ratings of bulkheads (A-60, A-0, B-15, C)',
      'LSA Code lifeboat capacity, davit launching speed, and immersion suit mandates',
      'Port State Control (Tokyo MOU / Paris MOU) top deficiency checklist pre-audit',
      'Polar Code category A/B/C ice class structural and machinery requirements',
      'Automated exemption letter and Equivalent Arrangement (SOLAS Reg I/5) draft generation'
    ],
    toolsIntegrated: ['IMO Global Regulatory Database', 'PSC Deficiency Lookup', 'FSS Code Calculator'],
    samplePrompts: [
      'What are the mandatory fire insulation requirements for a machinery space of Category A boundary adjacent to the main control station under SOLAS II-2 Reg 9?',
      'Check lifeboat capacity requirements for a cargo ship of 20,000 GT carrying 24 persons on international voyages.',
      'Generate a Port State Control pre-arrival safety inspection matrix for a Capesize bulk carrier calling Rotterdam.'
    ],
    knowledgeBases: ['SOLAS Consolidated Edition 2024', 'IMO FSS Code (Resolution MSC.98(73))', 'IMO LSA Code (Resolution MSC.48(66))', 'Paris MOU 2024 PSC Inspection Guidelines'],
    featured: true,
    trending: true,
    enterpriseReady: true,
    systemPromptPreview: 'You are the SOLAS & Fire Safety Compliance Agent, an expert maritime regulatory auditor. You provide exact regulatory citations (e.g., SOLAS Reg II-2/9.2.3.3) and actionable structural guidance.',
    defaultSimulationResponse: '### SOLAS Chapter II-2 Fire Division Audit Summary\n\n**Boundary:** Category A Machinery Space $\\leftrightarrow$ Main Navigation Bridge / Control Station\n- **Mandatory Fire Integrity Rating:** **Class A-60 Insulation** (SOLAS Reg II-2/9.2.3.3, Table 9.3 Category (1) to Category (10))\n- **Draft Stop & Cable Penetration:** Fire transit boxes must be tested and Type Approved under IMO FTP Code 2010 Part 3 with intact A-60 certification.\n- **Fire Damper Requirements:** Automatic fire dampers with fusible links (operating at $74^\\circ\\text{C}$) and local/remote pneumatic closure indicators on bridge console (SOLAS Reg II-2/9.7.3.1).\n- **Primary Deck Covering:** Low flame-spread characteristics complying with FTP Code Part 5.'
  },
  {
    id: 'reg-marpol-decarb',
    name: 'MARPOL & Decarbonization Advisor',
    tagline: 'CII rating projection, FuelEU Maritime penalties, MEPC 83 Net-Zero GHG Strategy compliance',
    description: 'Environmental regulations expert for Annexes I–VI. Computes ship Carbon Intensity Indicator (CII) rating, FuelEU Maritime greenhouse gas intensity targets (2025–2050), and EU ETS maritime carbon allowance liabilities.',
    category: 'regulations',
    categoryLabel: 'Regulations & Class Rules',
    creator: {
      name: 'GreenSeas Decarbonization Advisory',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      organization: 'Geneva Sustainable Maritime Center',
      verified: true,
      tier: 'Platinum Expert',
      totalSales: '$46,300'
    },
    iconName: 'Sparkles',
    iconBg: 'from-teal-500/20 to-emerald-600/30 border-teal-500/40 text-teal-400',
    pricing: {
      type: 'subscription',
      amount: 49,
      currency: 'USD',
      period: 'mo'
    },
    stats: {
      installs: 4520,
      runsTotal: '178.6k',
      rating: 4.96,
      reviewCount: 341,
      avgLatency: '1.0s',
      successRate: '99.5%',
      contextTokens: '1M tokens'
    },
    supportedModels: ['Gemini 3.0 Pro', 'Claude 3.5 Sonnet', 'GPT-4o'],
    capabilities: [
      'Annual CII attained vs required calculation (A to E grade boundary limits)',
      'FuelEU Maritime penalty simulator (€2,400 per tonne VLSFO eq non-compliant energy)',
      'EU ETS Phase-in schedule liability computation (40% in 2024, 70% in 2025, 100% in 2026)',
      'SEEMP Part III corrective action plan drafting for D/E rated vessels',
      'Biofuel and Green Methanol Well-to-Wake (WtW) carbon credit optimizer'
    ],
    toolsIntegrated: ['CII Rating Engine', 'FuelEU Penalty Calculator', 'EU ETS Carbon Price Feed'],
    samplePrompts: [
      'Calculate projected 2025 CII rating for a 64,000 DWT Ultramax consuming 21 tonnes VLSFO/day over 68,000 nautical miles.',
      'Estimate FuelEU Maritime financial penalty in 2026 for an 8,500 TEU container ship using standard HFO without bio-blending.',
      'Draft a SEEMP Part III formal corrective plan for a vessel that scored an E rating in consecutive years.'
    ],
    knowledgeBases: ['IMO MARPOL Annex VI (Resolution MEPC.328(76))', 'FuelEU Maritime Regulation (EU 2023/1805)', 'EU ETS Directive (EU 2023/959)', 'IMO MEPC 80/81/82 Revised GHG Strategy'],
    featured: true,
    trending: true,
    enterpriseReady: true,
    systemPromptPreview: 'You are the MARPOL & Decarbonization Advisor. You calculate precise attained CII values, predict regulatory compliance trajectories, and evaluate commercial payback for energy saving devices (ESDs).',
    defaultSimulationResponse: '### CII & FuelEU Maritime Fleet Compliance Assessment\n\n**Vessel Profile:** 64,000 DWT Ultramax Bulk Carrier | Total Distance: 68,000 NM | Annual VLSFO: 4,450 MT\n\n**1. Attained Carbon Intensity Indicator (CII):**\n- **Attained CII:** $4.28\\text{ g CO}_2 / (\\text{DWT} \\cdot \\text{NM})$\n- **Required CII (2025 with } 11\\% \\text{ reduction factor } Z):$ $4.46\\text{ g CO}_2 / (\\text{DWT} \\cdot \\text{NM})$\n- **Superior / Inferior Boundaries:** $d_1 = 0.86, d_2 = 0.94, d_3 = 1.06, d_4 = 1.14$\n- **Assigned CII Grade (2025):** **B (Good)** $\\rightarrow$ *Passes IMO MEPC 82 mandates without speed reduction.*\n\n**2. FuelEU Maritime Compliance Outlook (2025-2030):**\n- 2025 GHG Intensity Limit: $89.34\\text{ g CO}_2\\text{eq/MJ}$ ($-2\\%$ vs 2020 baseline $91.16$). Baseline VLSFO delivers $91.0\\text{ g CO}_2\\text{eq/MJ}$.\n- Recommended Compliance Action: Introduce a **B30 Biofuel Blend** or Rotor Sails to avoid penalty (€34,200/yr).'
  },

  // 3. Academic & Research Agents
  {
    id: 'acad-thesis-master',
    name: 'Maritime Thesis & Research Paper Assistant',
    tagline: 'Naval architecture literature reviews, IEEE/APA citations, LaTeX equations & experimental methodology',
    description: 'Premier research writing and literature analyzer for maritime graduate students and naval engineering faculty. Analyzes SNAME, RINA, OMAE, and Elsevier papers, synthesizes citations, and formats academic dissertations.',
    category: 'academic',
    categoryLabel: 'Academic & Research',
    creator: {
      name: 'Prof. Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      organization: 'Delft University of Technology (TU Delft)',
      verified: true,
      tier: 'Academic Fellow',
      totalSales: '$61,400'
    },
    iconName: 'BookOpen',
    iconBg: 'from-purple-500/20 to-indigo-600/30 border-purple-500/40 text-purple-400',
    pricing: {
      type: 'free',
      amount: 0,
      currency: 'USD'
    },
    stats: {
      installs: 14200,
      runsTotal: '580.9k',
      rating: 4.99,
      reviewCount: 1280,
      avgLatency: '1.1s',
      successRate: '99.8%',
      contextTokens: '2M tokens'
    },
    supportedModels: ['Gemini 3.0 Pro', 'Claude 3.5 Sonnet', 'DeepSeek-R1', 'GPT-4o'],
    capabilities: [
      'Comprehensive literature review synthesis across 450+ indexed maritime publications',
      'BibTeX, IEEE, and APA 7th Edition citation formatting with verified DOIs',
      'LaTeX mathematical equation authoring (Navier-Stokes, Morison, Newman wave forces)',
      'Experimental uncertainty analysis (ITTC 7.5-02-01-01 procedure) for towing tank data',
      'Thesis chapter outline structuring and peer-review defense simulation'
    ],
    toolsIntegrated: ['BibTeX Citation Generator', 'LaTeX Equation Builder', 'Maritime DOI Resolver'],
    samplePrompts: [
      'Write a 4-paragraph academic literature review on CFD simulations of wind-assisted ship propulsion (Flettner rotors & wing sails).',
      'Format an IEEE citation list with verified DOIs for recent papers on green ammonia dual-fuel combustion in marine 2-stroke engines.',
      'Generate a rigorous mathematical formulation in LaTeX for boundary element method (BEM) panel codes in ship seakeeping.'
    ],
    knowledgeBases: ['SNAME Transactions & Journal of Ship Research', 'RINA International Journal of Maritime Engineering', 'Ocean Engineering (Elsevier)', 'ITTC Recommended Procedures (2023)'],
    featured: true,
    trending: true,
    enterpriseReady: false,
    systemPromptPreview: 'You are the Maritime Thesis & Research Paper Assistant, a university professor in naval architecture. You write rigorous, peer-reviewed level prose, format pristine LaTeX, and ensure academic integrity.',
    defaultSimulationResponse: '### Literature Review: Aerodynamic & Hydrodynamic Interactions of Wind-Assisted Ship Propulsion (WASP)\n\n#### 1. Theoretical Foundation & Magnus Effect Characterization\nWind-assisted ship propulsion utilizing vertical cylindrical rotating bodies relies fundamentally on the Magnus effect, wherein asymmetric boundary layer separation generates lift perpendicular to the relative inflow vector (Charrier, 2021). According to the empirical formulations validated by Bordogna et al. (2019) at the TU Delft Boundary Layer Wind Tunnel, the maximum aerodynamic lift coefficient ($C_L$) for a modern Flettner rotor equipped with endplates reaches $C_L \\approx 12.5$ at a velocity ratio $\\alpha = v_{tip} / v_{apparent} \\approx 3.5$.\n\n$$\\mathbf{L} = \\frac{1}{2} \\rho_{air} A_{proj} V_{app}^2 C_L(\\alpha) \\hat{\\mathbf{e}}_L$$\n\n#### 2. Hydrodynamic Leeway & Rudder Equilibrium\nWhile the thrust component ($T = L \\sin \\gamma - D \\cos \\gamma$) delivers net forward powering relief, the attendant side force ($F_Y$) induces an equilibrium leeway angle ($\\beta$) and heel angle ($\\phi$). As demonstrated by Tillig and Ringsberg (2020), this aerodynamic yaw moment necessitates continuous rudder counteraction, generating induced resistance that offsets between $8\\%$ and $14\\%$ of the gross aerodynamic power savings if left uncompensated by skeg or foil enhancements.'
  },

  // 4. Industry & Operations Agents
  {
    id: 'ind-chartering-analyst',
    name: 'Shipping Market Analyst & Chartering Copilot',
    tagline: 'Voyage estimation, Baltic Dry Index (BDI) forecasting, laytime/demurrage computation',
    description: 'Commercial shipping and chartering intelligence agent. Computes voyage TCE (Time Charter Equivalent) returns, calculates laytime and demurrage statements, analyzes bunker price sensitivity, and tracks Baltic Indices trends.',
    category: 'industry',
    categoryLabel: 'Industry & Operations',
    creator: {
      name: 'Alexander Sterling',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
      organization: 'Blenheim Maritime Advisory (London/Singapore)',
      verified: true,
      tier: 'Platinum Expert',
      totalSales: '$49,900'
    },
    iconName: 'TrendingUp',
    iconBg: 'from-amber-500/20 to-yellow-600/30 border-amber-500/40 text-amber-400',
    pricing: {
      type: 'subscription',
      amount: 79,
      currency: 'USD',
      period: 'mo'
    },
    stats: {
      installs: 3120,
      runsTotal: '115.8k',
      rating: 4.94,
      reviewCount: 276,
      avgLatency: '1.2s',
      successRate: '99.3%',
      contextTokens: '1.5M tokens'
    },
    supportedModels: ['Gemini 3.0 Pro', 'Claude 3.5 Sonnet', 'GPT-4o'],
    capabilities: [
      'Voyage estimation and Net Daily Time Charter Equivalent (TCE) solver',
      'Statement of Facts (SOF) parser & automated laytime/demurrage calculator',
      'Baltic Dry Index (BDI) and Capesize / Panamax / Supramax route rate analytics',
      'Bunker cost optimization (VLSFO, HSFO + Scrubber spread, LSMGO, LNG bunkering)',
      'BIMCO standard charter party clause interpretation (GENCON 2022, NYPE 2015)'
    ],
    toolsIntegrated: ['Voyage Calculator', 'Laytime Calculator', 'Baltic Index Feed', 'Bunker Spread Simulator'],
    samplePrompts: [
      'Calculate TCE for a Capesize vessel loading iron ore in Tubarão for Qingdao discharge at $24.50/MT freight rate.',
      'Compute demurrage due on a GENCON 2022 fixture with 5 weather working days allowed and 7 days 14 hours used.',
      'Evaluate profit spread between burning VLSFO vs burning HSFO with an open-loop scrubber at current $145/MT Hi-5 fuel spread.'
    ],
    knowledgeBases: ['BIMCO Charter Party Clauses (NYPE 2015, GENCON 2022, BPTIME)', 'Baltic Exchange Route Descriptions', 'Stopford Maritime Economics 3rd Ed'],
    featured: true,
    trending: true,
    enterpriseReady: true,
    systemPromptPreview: 'You are the Shipping Market Analyst & Chartering Copilot. You analyze fixtures, run voyage economics, calculate laytime/demurrage with precision, and explain market volatility.',
    defaultSimulationResponse: '### Voyage Calculation Summary: Tubarão (Brazil) to Qingdao (China)\n\n**Vessel:** 180,000 DWT Capesize | Cargo: 170,000 MT Iron Ore | Freight Rate: **$24.50 / MT**\n\n**Revenue & Voyage Expenses:**\n- **Gross Freight:** $170,000 \\times \\$24.50 = \\$4,165,000$\n- **Commissions (3.75% total):** $-\\$156,187$\n- **Port Disbursements:** Tubarão ($\\$95,000$) + Qingdao ($\\$110,000$) = $-\\$205,000$\n- **Bunker Costs (Laden + Ballast @ 12.5 kn, 42 MT/day VLSFO):** $-\\$1,482,000$\n- **Net Voyage Revenue:** **$\\$2,321,813$**\n\n**Voyage Duration & Time Charter Equivalent:**\n- Sea Days (22,400 NM @ 12.5 kn): 74.6 days | Port Days: 7.0 days | Total: **81.6 days**\n- **Net Time Charter Equivalent (TCE):** **$\\$28,453 / \\text{day}** (Exceeds current Baltic Capesize 5TC benchmark of $\\$24,200/\\text{day}$ by $+17.5\\%$).'
  },
  {
    id: 'ind-port-ops',
    name: 'SmartPort Berth & Terminal Operations Agent',
    tagline: 'Berth allocation optimization, quay crane productivity, vessel queue simulation & tidal windows',
    description: 'Terminal operations and port logistics copilot. Solves dynamic berth allocation problem (BAP), quay crane scheduling, container yard stacking density, and tidal navigation draft windows for deep-draft vessels.',
    category: 'industry',
    categoryLabel: 'Industry & Operations',
    creator: {
      name: 'Rotterdam PortTech Labs',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
      organization: 'Port of Rotterdam Innovation Ecosystem',
      verified: true,
      tier: 'Shipyard Partner',
      totalSales: '$38,600'
    },
    iconName: 'Anchor',
    iconBg: 'from-sky-500/20 to-blue-600/30 border-sky-500/40 text-sky-400',
    pricing: {
      type: 'subscription',
      amount: 59,
      currency: 'USD',
      period: 'mo'
    },
    stats: {
      installs: 2430,
      runsTotal: '76.4k',
      rating: 4.90,
      reviewCount: 152,
      avgLatency: '1.1s',
      successRate: '99.2%',
      contextTokens: '1M tokens'
    },
    supportedModels: ['Gemini 3.0 Pro', 'Claude 3.5 Sonnet', 'GPT-4o'],
    capabilities: [
      'Continuous Dynamic Berth Allocation Problem (BAP) optimization',
      'Quay Crane Moves Per Hour (MPH) and crane split schedule optimization',
      'Under Keel Clearance (UKC) and dynamic tidal window calculation',
      'Port turnaround time and anchorage waiting queue reduction strategies',
      'Cold ironing (shore power) connection scheduling and peak load shaving'
    ],
    toolsIntegrated: ['Berth Allocation Solver', 'Tidal UKC Calculator', 'Quay Crane Scheduler'],
    samplePrompts: [
      'Optimize berth allocation for three incoming 14,000 TEU container ships with varying drafts over a 48-hour tidal cycle.',
      'Calculate required gross crane rate (MPH) to achieve 22-hour port turnaround for 4,200 TEU exchange.',
      'Determine safe sailing draft window across Malacca Strait shallow approaches with 1.8m minimum UKC.'
    ],
    knowledgeBases: ['PIANC Port Design Guidelines (WG 121 / 158)', 'IAPH World Ports Sustainability Program', 'UNCTAD Port Management Series'],
    featured: false,
    trending: false,
    enterpriseReady: true,
    systemPromptPreview: 'You are SmartPort, a specialized port logistics and terminal planning AI agent. You optimize berth assignments, calculate UKC with dynamic wave response, and reduce vessel idle hours.',
    defaultSimulationResponse: '### Berth Schedule & Turnaround Optimization\n\n**Terminal:** Main Container Pier East (Quay Length: 900m, Depth: -16.5m CD)\n- **Vessel 1 (20,000 TEU):** Assigned Berth 1-2 (400m LOA) | 5 STS Cranes assigned | Expected moves: 3,800 TEU\n- **Crane Productive Speed:** 32.5 Gross Moves/Hour/Crane | Total Gross Productivity: **162.5 MPH**\n- **Net Berth Working Time:** **23.4 Hours** (Turnaround target < 24h met!)\n- **Shore Power (Cold Ironing):** Berth 1 High-Voltage Shore Connection (HVSC 6.6 kV) engaged, eliminating ~42 MT auxiliary CO2 emissions during port stay.'
  },

  // 5. Enterprise AI Agents
  {
    id: 'ent-shipyard-copilot',
    name: 'Shipyard ERP & Block Erection Copilot',
    tagline: 'Goliath crane block erection sequencing, drydock scheduling, outfitting pipeline & QA/QC',
    description: 'Enterprise AI agent for mega-shipyards and drydocks. Manages grand block weight distribution, hull shop panel welding automation, outfitting milestone tracking, and non-destructive testing (NDT) defect auditing.',
    category: 'enterprise',
    categoryLabel: 'Enterprise Solutions',
    creator: {
      name: 'Hyundai-Samsung Shipyard Tech Alliance',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&auto=format&fit=crop&q=80',
      organization: 'Global Shipbuilding Innovation Consortium',
      verified: true,
      tier: 'Shipyard Partner',
      totalSales: '$128,000'
    },
    iconName: 'Building2',
    iconBg: 'from-rose-600/20 to-amber-600/30 border-rose-500/40 text-rose-300',
    pricing: {
      type: 'enterprise',
      amount: 499,
      currency: 'USD',
      period: 'mo'
    },
    stats: {
      installs: 860,
      runsTotal: '42.1k',
      rating: 4.98,
      reviewCount: 94,
      avgLatency: '1.5s',
      successRate: '99.8%',
      contextTokens: '2M tokens'
    },
    supportedModels: ['Gemini 3.0 Pro', 'Claude 3.5 Sonnet', 'GPT-4o'],
    capabilities: [
      'Goliath crane 1,200T grand block erection sequencing and center of gravity balance',
      'Drydock dock-master ballast planning and keel block pressure distribution',
      'Hull plate welding automated NDT (Radiographic & Ultrasonic) defect rate tracking',
      'Pipe spool pre-outfitting 3D clash prevention in machinery spaces',
      'Integration with AVEVA Marine, Tribon, and SAP Shipbuilding ERP'
    ],
    toolsIntegrated: ['Drydock Keel Block Solver', 'Erection Sequence Engine', 'NDT QA/QC Auditor', 'Enterprise ERP Bridge'],
    samplePrompts: [
      'Generate grand block lifting plan and sling tension analysis for 650-tonne bulbous bow module.',
      'Check maximum permissible line load on concrete drydock floor for 300,000 DWT VLCC under 14m draft docking.',
      'Audit piping outfitting progress across engine room double bottom blocks and flag interference risks.'
    ],
    knowledgeBases: ['IACS Shipbuilding and Repair Quality Standard (No. 47)', 'AWS D1.1/D1.1M Structural Welding Code - Steel', 'ISO 9001:2015 Shipbuilding Quality Systems'],
    featured: true,
    trending: true,
    enterpriseReady: true,
    systemPromptPreview: 'You are the Shipyard ERP & Block Erection Copilot, an enterprise-grade shipbuilding automation agent. You coordinate grand block erection, verify keel block loads, and manage shipyard outfitting workflows.',
    defaultSimulationResponse: '### Grand Block Erection & Drydock Docking Plan\n\n**Module:** Grand Block 102 (Engine Room Double Bottom + Main Engine Bedplate, Weight: 680 tonnes)\n- **Lifting Configuration:** Twin Goliath Cranes (2x 600T capacity in tandem hook mode)\n- **Sling Angle:** $60^\\circ$ from horizontal | Calculated Cable Tension per Hook: $212.5\\text{ tonnes}$ (Safety Factor: $4.2 > 3.0$)\n- **Keel Block Load Check:** Maximum drydock timber block pressure: $1.82\\text{ MPa} < 2.50\\text{ MPa}$ permissible limit.\n- **Welding QA Sequence:** Automated submerged arc welding (SAW) on transverse girder seams followed by $100\\%$ phased-array ultrasonic testing (PAUT).'
  }
];

export const CREATOR_BENCHMARKS = {
  totalPublishedAgents: '2,480+',
  totalGlobalExecutions: '4.8M',
  totalCreatorPayouts: '$1.42M',
  activeEnterpriseWorkspaces: '340+',
  averageCreatorMRR: '$2,850/mo'
};
