export interface MaritimeSearchResult {
  id: string;
  title: string;
  category: 
    | 'digital_library'
    | 'research_papers'
    | 'imo_regulations'
    | 'class_rules'
    | 'engineering_standards'
    | 'ship_designs'
    | 'calculators'
    | 'simulations'
    | 'courses'
    | 'videos'
    | 'news'
    | 'jobs'
    | 'companies'
    | 'marketplace'
    | 'datasets'
    | 'ai_agents';
  source: string;
  publisherOrOrg: string;
  year: number;
  shipType?: string[];
  engineeringField: string[];
  classSociety?: string;
  regulation?: string;
  summary: string;
  keyPoints: string[];
  formulas?: { name: string; latex: string; explanation: string }[];
  citations?: number;
  doiOrRef?: string;
  badge?: string;
  authorOrEntity?: string;
  linkAction?: { label: string; viewTarget?: string; url?: string };
  relevanceScore: number;
  tier: 'free' | 'pro' | 'enterprise';
}

export interface SearchFilterState {
  category: string;
  shipType: string;
  engineeringField: string;
  classSociety: string;
  regulation: string;
  yearRange: string;
  academicJournal: string;
  methodology: string;
  minCitations: number;
  tier: string;
}

export const INITIAL_SEARCH_FILTERS: SearchFilterState = {
  category: 'all',
  shipType: 'all',
  engineeringField: 'all',
  classSociety: 'all',
  regulation: 'all',
  yearRange: 'all',
  academicJournal: 'all',
  methodology: 'all',
  minCitations: 0,
  tier: 'all',
};

export const MARITIME_SEARCH_DATABASE: MaritimeSearchResult[] = [
  // 1. IMO Regulations
  {
    id: 'imo-solas-ii1-stab',
    title: 'IMO Resolution MSC.536(107) - Amendments to SOLAS Chapter II-1 (Intact & Damage Stability)',
    category: 'imo_regulations',
    source: 'International Maritime Organization (IMO)',
    publisherOrOrg: 'IMO Maritime Safety Committee',
    year: 2024,
    shipType: ['Passenger Ships', 'Ro-Ro', 'Container Ships', 'Bulk Carriers'],
    engineeringField: ['Stability', 'Hydrodynamics', 'Safety & Life-Saving'],
    regulation: 'SOLAS',
    summary: 'Comprehensive mandatory revisions to probabilistic damage stability index R, cross-flooding arrangements, watertight bulkhead penetrations, and safe return to port (SRtP) verification rules.',
    keyPoints: [
      'Attained Subdivision Index A must strictly exceed Required Index R for all passenger ships with Ls ≥ 80m.',
      'Harmonized cross-flooding duct calculations under revised IMO Res. A.265 standard.',
      'Mandatory computerized onboard stability instruments for all Ro-Pax vessels built after Jan 2026.',
      'Critical requirements for intermediate stages of progressive flooding during side shell breach.'
    ],
    formulas: [
      {
        name: 'Required Subdivision Index R (Passenger Ships)',
        latex: 'R = 1 - \\frac{5000}{L_s + 2.5 \\cdot N + 15225}',
        explanation: 'Where Ls is the subdivision length and N is the total number of persons certified to carry.'
      },
      {
        name: 'Attained Subdivision Index A',
        latex: 'A = \\sum p_i \\cdot s_i \\ge R',
        explanation: 'pi represents the probability of compartment i flooding, and si represents survival probability.'
      }
    ],
    citations: 1420,
    doiOrRef: 'IMO Res. MSC.536(107) / SOLAS II-1/6',
    badge: 'Mandatory 2026',
    authorOrEntity: 'IMO MSC Technical Secretariat',
    linkAction: { label: 'Explore IMO Regs', viewTarget: 'maritime_regulations' },
    relevanceScore: 99,
    tier: 'free'
  },
  {
    id: 'imo-marpol-annex-vi-cii',
    title: 'IMO MEPC.377(80) - Operational Carbon Intensity Indicator (CII) & EEXI Verification Guidelines',
    category: 'imo_regulations',
    source: 'Marine Environment Protection Committee (MEPC)',
    publisherOrOrg: 'IMO MEPC Secretariat',
    year: 2025,
    shipType: ['Bulk Carriers', 'Tankers', 'Container Ships', 'LNG Carriers', 'Ro-Ro'],
    engineeringField: ['Decarbonization', 'Energy Efficiency', 'Marine Machinery'],
    regulation: 'MARPOL Annex VI',
    summary: 'Updated correction factors, voyage exclusions, and penalty rating curves (A, B, C, D, E) for annual CII reporting under MARPOL Annex VI Regulation 28.',
    keyPoints: [
      'Annual reduction factor Z increases progressively from 11% (2024) to 28% (2030) baseline.',
      'Incorporation of correction factors (fc, fi, fm) for ice-class operations and STS tanker lightering.',
      'Mandatory Corrective Action Plan (SEEMP Part III) for vessels rated D for 3 consecutive years or E for 1 year.',
      'FuelEU Maritime cross-crediting and IMO Net-Zero 2050 framework harmonization.'
    ],
    formulas: [
      {
        name: 'Attained Annual Operational CII',
        latex: 'CII_{\\text{attained}} = \\frac{\\sum_{j} (FC_j \\cdot C_{F,j})}{\\text{Capacity} \\cdot D_t}',
        explanation: 'FCj is mass of fuel j consumed, CF,j is CO2 carbon conversion factor, Capacity is DWT/GT, Dt is total nautical distance sailed.'
      }
    ],
    citations: 2890,
    doiOrRef: 'MEPC 80/17/Add.1 / MEPC.377(80)',
    badge: 'IMO MEPC 82',
    authorOrEntity: 'IMO Marine Environment Committee',
    linkAction: { label: 'Open Carbon & CII Tool', viewTarget: 'carbon_emissions' },
    relevanceScore: 98,
    tier: 'free'
  },
  {
    id: 'imo-hkc-2025-hazmat',
    title: 'Hong Kong International Convention for the Safe and Environmentally Sound Recycling of Ships (HKC 2025 Entry Into Force)',
    category: 'imo_regulations',
    source: 'International Maritime Organization (IMO)',
    publisherOrOrg: 'IMO Legal Affairs Directorate',
    year: 2025,
    shipType: ['All Commercial Vessels ≥ 500 GT'],
    engineeringField: ['Ship Recycling', 'Environmental', 'Compliance'],
    regulation: 'Hong Kong Convention (HKC)',
    summary: 'Full entry-into-force rules requiring an approved Inventory of Hazardous Materials (IHM) Part I on all active merchant vessels and International Ready for Recycling Certificate (IRRC).',
    keyPoints: [
      'Mandatory IHM Part I identifying Asbestos, Ozone Depleting Substances, PCBs, Organotin compounds, and heavy metals.',
      'Applies to both new builds and existing merchant vessels over 500 GT calling at signatory ports.',
      'Mandatory Ship Recycling Facility Plan (SRFP) auditing for green yard accreditation in South Asia.'
    ],
    citations: 640,
    doiOrRef: 'IMO SR/CONF/45',
    badge: 'Active 2025',
    authorOrEntity: 'IMO Marine Environmental Division',
    linkAction: { label: 'Generate IHM Part I', viewTarget: 'environmental_hub' },
    relevanceScore: 94,
    tier: 'free'
  },

  // 2. Class Rules (DNV, ABS, LR, BV, ClassNK)
  {
    id: 'dnv-rules-pt3-ch1-hull',
    title: 'DNV Rules for Classification of Ships - Pt.3 Ch.1: Hull Structural Design & Scantling Assessment',
    category: 'class_rules',
    source: 'DNV Maritime Rulebook',
    publisherOrOrg: 'Det Norske Veritas (DNV AS)',
    year: 2025,
    shipType: ['Bulk Carriers', 'Oil Tankers', 'Container Ships', 'LNG Carriers'],
    engineeringField: ['Structural FEA', 'Hull Scantlings', 'Fatigue Assessment'],
    classSociety: 'DNV',
    regulation: 'IACS CSR-BC&OT',
    summary: 'Definitive structural rules for minimum midship section modulus, yield criteria, wave-induced bending moments, bottom slamming pressures, and finite element cargo hold modeling.',
    keyPoints: [
      'Rule calculation of vertical wave bending moments (Mw,v) for sagging and hogging conditions.',
      'PULS buckling code formulation for stiffened curved and flat panels under combined biaxial stress.',
      'Explicit fatigue life assessment (FLA) required for critical details with design fatigue factor (DFF) = 2.0.'
    ],
    formulas: [
      {
        name: 'Minimum Midship Section Modulus (DNV Pt.3 Ch.1 Sec.4)',
        latex: 'Z_{\\text{min}} = c \\cdot L^2 \\cdot B \\cdot (C_b + 0.7) \\cdot k \\quad [\\text{cm}^3]',
        explanation: 'Where c is wave coefficient, L is rule length, B is breadth, Cb is block coefficient, k is material factor (1.0 for NV-36 high tensile steel k=0.72).'
      },
      {
        name: 'Sagging Wave Bending Moment (Mw,v)',
        latex: 'M_{w,v} = -0.11 \\cdot f_r \\cdot C_w \\cdot L^2 \\cdot B \\cdot (C_b + 0.7) \\quad [\\text{kNm}]',
        explanation: 'Calculated at midship section under severe North Atlantic wave probability of 10^-8.'
      }
    ],
    citations: 5120,
    doiOrRef: 'DNV-RU-SHIP Pt.3 Ch.1 Ed. 2025-01',
    badge: 'Class Rulebook',
    authorOrEntity: 'DNV Maritime Technology & Rules',
    linkAction: { label: 'Launch Midship Scantling FEA', viewTarget: 'ship_structural' },
    relevanceScore: 99,
    tier: 'pro'
  },
  {
    id: 'abs-rules-mvr-corrosion-buckling',
    title: 'ABS Rules for Building and Classing Marine Vessels - Part 3: Hull Construction and Equipment',
    category: 'class_rules',
    source: 'American Bureau of Shipping (ABS)',
    publisherOrOrg: 'ABS Americas & Global Engineering',
    year: 2024,
    shipType: ['Tankers', 'Bulk Carriers', 'Container Vessels', 'Offshore Support'],
    engineeringField: ['Structural FEA', 'Corrosion Margins', 'Weldments'],
    classSociety: 'ABS',
    regulation: 'IACS Common Structural Rules',
    summary: 'ABS comprehensive requirements for net scantling approach, corrosion additions (tc), panel ultimate limit state (ULS), and total strength assessment (TSA) under dynamic wave loads.',
    keyPoints: [
      'Strict net thickness formulation stripping 0.5 to 2.5 mm corrosion additions before FEA stress checks.',
      'Comparison criteria against DNV and LR on allowable Von Mises stress (σ_vm ≤ 0.85 σ_yield).',
      'Special reinforcement standards for high-tensile steel (HT36 / HT40) bracket geometries.'
    ],
    citations: 3410,
    doiOrRef: 'ABS MVR-2024 Pt.3',
    badge: 'IACS CSR',
    authorOrEntity: 'ABS Engineering Directorate',
    linkAction: { label: 'Compare DNV vs ABS Rules', viewTarget: 'class_society' },
    relevanceScore: 96,
    tier: 'pro'
  },
  {
    id: 'lr-rules-wind-propulsion-rotor',
    title: 'Lloyd’s Register Guidance Notes for Wind Assisted Propulsion Systems (WAPS & Flettner Rotors)',
    category: 'class_rules',
    source: 'Lloyd\'s Register (LR)',
    publisherOrOrg: 'LR Marine & Offshore',
    year: 2024,
    shipType: ['Bulk Carriers', 'Tankers', 'General Cargo'],
    engineeringField: ['Wind-Assisted Propulsion', 'Hydrodynamics', 'Aerodynamics'],
    classSociety: 'LR',
    regulation: 'IMO MEPC Circ. 896',
    summary: 'Certification guidelines covering aerodynamic lift/drag verification, mast deck foundation structural loading, emergency feathering, and visibility / COLREGs compliance for mechanical sails.',
    keyPoints: [
      'Deck foundation heel and trimming moments under maximum gust condition (60 m/s wind speed).',
      'Aero-hydrodynamic cross-coupling calculations for leeway angle and rudder compensation drag.',
      'Navigation bridge forward arc of visibility clearance requirements under SOLAS V/22.'
    ],
    citations: 880,
    doiOrRef: 'LR-WAPS-GUIDE-2024',
    badge: 'Green Tech Class',
    authorOrEntity: 'Lloyd’s Register Decarbonization Hub',
    linkAction: { label: 'Launch Propeller & Rotor Sim', viewTarget: 'propeller_design' },
    relevanceScore: 93,
    tier: 'pro'
  },

  // 3. Research Papers
  {
    id: 'sname-holtrop-mennen-powering',
    title: 'An Approximate Power Prediction Method for Conventional Ship Types - Holtrop & Mennen Method Extended',
    category: 'research_papers',
    source: 'International Shipbuilding Progress / SNAME Transactions',
    publisherOrOrg: 'SNAME / IOS Press',
    year: 2023,
    shipType: ['All Displacement Vessels', 'Bulk Carriers', 'Tankers', 'Container Ships'],
    engineeringField: ['Hydrodynamics', 'Ship Resistance', 'Powering'],
    summary: 'The benchmark semi-empirical formulation for estimating total calm-water hull resistance (RT), form factor (1+k1), wave-making resistance (Rw), bulbous bow resistance, and stern transom immersion effects.',
    keyPoints: [
      'Frictional resistance RF calculated via ITTC 1957 model-ship correlation line.',
      'Wave resistance parameterization across Froude numbers Fn from 0.05 up to 0.45.',
      'Form factor (1+k1) derived from L/B, B/T, length of run Lr, and prismatic coefficient Cp.'
    ],
    formulas: [
      {
        name: 'Total Calm Water Resistance',
        latex: 'R_T = R_F (1 + k_1) + R_W + R_B + R_{TR} + R_A',
        explanation: 'RF is skin friction, (1+k1) is form factor, RW is wave resistance, RB is bulbous bow drag, RTR is transom drag, RA is correlation allowance.'
      },
      {
        name: 'ITTC 1957 Friction Coefficient',
        latex: 'C_F = \\frac{0.075}{(\\log_{10}(Re) - 2)^2}',
        explanation: 'Where Re is Reynolds number based on waterline length: Re = (V * LWL) / ν.'
      }
    ],
    citations: 18450,
    doiOrRef: '10.3233/ISP-1984-3135901',
    badge: 'Classic Citation',
    authorOrEntity: 'J. Holtrop & G.G.J. Mennen (MARIN)',
    linkAction: { label: 'Run Resistance Calculator', viewTarget: 'ship_resistance' },
    relevanceScore: 99,
    tier: 'free'
  },
  {
    id: 'rina-cfd-wave-drag-kcs',
    title: 'High-Fidelity URANS and LES Towing Tank CFD Validation for the KRISO Container Ship (KCS)',
    category: 'research_papers',
    source: 'RINA International Journal of Maritime Engineering (IJME)',
    publisherOrOrg: 'Royal Institution of Naval Architects',
    year: 2024,
    shipType: ['Container Ships', 'High-Speed Vessels'],
    engineeringField: ['CFD Hydrodynamics', 'Seakeeping', 'Wake Fraction'],
    summary: 'State-of-the-art OpenFOAM and Star-CCM+ simulation results benchmarked against Gothenburg 2020 towing tank data for sinkage, trim, free-surface wave elevation, and nominal wake field.',
    keyPoints: [
      'VOF (Volume of Fluid) interface compression capturing Kelvin wave pattern with 0.8% error margin.',
      'Mesh independence study with 14.2M polyhedral cells and y+ < 1.0 prism layers on the hull skin.',
      'Detailed axial and tangential wake velocity contour slices at the propeller disk plane.'
    ],
    citations: 920,
    doiOrRef: '10.3940/rina.ijme.2024.a2.712',
    badge: 'Peer-Reviewed',
    authorOrEntity: 'Dr. Marcus Lindqvist, Prof. H. Kim (NTNU / TU Delft)',
    linkAction: { label: 'Open CFD Hydrodynamics Hub', viewTarget: 'cfd_hub' },
    relevanceScore: 95,
    tier: 'free'
  },
  {
    id: 'elsevier-parametric-roll-containership',
    title: 'Nonlinear Dynamic Modeling and Avoidance of Parametric Rolling in Post-Panamax Container Ships in Head Seas',
    category: 'research_papers',
    source: 'Ocean Engineering (Elsevier)',
    publisherOrOrg: 'Elsevier Science',
    year: 2025,
    shipType: ['Container Ships', 'Ro-Ro Vessels'],
    engineeringField: ['Stability', 'Seakeeping', 'Safety & Life-Saving'],
    summary: 'Mathematical formulation of Mathieu-type parametric instability when encounter frequency is twice the natural roll frequency (ωe ≈ 2ωn) with GZ curve time-varying fluctuations.',
    keyPoints: [
      'Derivation of critical wave threshold height (Hw,crit) triggering sudden 35° roll amplitudes.',
      'Real-time Doppler radar and onboard motion telemetry guidance to alter course and speed before bifurcation.',
      'IMO Second Generation Intact Stability Criteria (SGISC) level 2 vulnerability check equations.'
    ],
    citations: 1140,
    doiOrRef: '10.1016/j.oceaneng.2024.118942',
    badge: 'Elsevier Top-10',
    authorOrEntity: 'Naval Architecture Dept, Univ of Strathclyde & MIT',
    linkAction: { label: 'Test Stability Simulator', viewTarget: 'naval_arch_lab' },
    relevanceScore: 97,
    tier: 'pro'
  },

  // 4. Digital Library & Textbooks
  {
    id: 'book-principles-naval-arch-sname',
    title: 'Principles of Naval Architecture (PNA) Series - Vol. 1: Stability & Vol. 2: Resistance & Propulsion',
    category: 'digital_library',
    source: 'SNAME Digital Library',
    publisherOrOrg: 'Society of Naval Architects and Marine Engineers (SNAME)',
    year: 2023,
    shipType: ['All Ship Types'],
    engineeringField: ['Naval Architecture Core', 'Hydrostatics', 'Propulsion'],
    summary: 'The world standard naval architecture textbook covering intact/damage hydrostatics, Simpson rule integrations, Bonjean curves, Froude scaling, propeller cavitation, and lines plan development.',
    keyPoints: [
      'Comprehensive mathematical derivations for metacentric height GM = KB + BM - KG.',
      'Trochoidal and irregular wave formulations for ship seakeeping response spectra.',
      'Wageningen B-Series propeller design diagrams and open water efficiency (η0) charts.'
    ],
    formulas: [
      {
        name: 'Transverse Metacentric Radius (BM)',
        latex: 'BM_T = \\frac{I_T}{\\nabla} = \\frac{\\int y^2 dx}{\\nabla}',
        explanation: 'IT is transverse moment of inertia of the waterplane area, and ∇ is the volumetric displacement.'
      },
      {
        name: 'Righting Arm (GZ)',
        latex: 'GZ = GM \\cdot \\sin(\\theta) + \\frac{1}{2} BM \\cdot \\tan^2(\\theta) \\cdot \\sin(\\theta)',
        explanation: 'Wall-sided formula for small to moderate heel angles θ.'
      }
    ],
    citations: 38900,
    doiOrRef: 'ISBN 978-0-939773-67-0',
    badge: 'Foundational Text',
    authorOrEntity: 'J. Randolph Paulling, Edward V. Lewis (Editor)',
    linkAction: { label: 'Open Digital Library Reader', viewTarget: 'maritime_digital_library' },
    relevanceScore: 100,
    tier: 'free'
  },
  {
    id: 'book-practical-ship-hydrodynamics-bertram',
    title: 'Practical Ship Hydrodynamics (3rd Edition) - Volker Bertram',
    category: 'digital_library',
    source: 'Butterworth-Heinemann / Elsevier',
    publisherOrOrg: 'Elsevier Marine Engineering Series',
    year: 2024,
    shipType: ['All Marine Vehicles', 'High Speed Crafts', 'SWATH'],
    engineeringField: ['CFD Hydrodynamics', 'Seakeeping', 'Maneuvering'],
    summary: 'Modern, code-ready guide covering boundary element methods (BEM), panel codes, Reynolds-Averaged Navier-Stokes solvers, propeller-hull interaction, and rudder maneuvering derivatives.',
    keyPoints: [
      'Step-by-step implementation of Rankine source panel methods for wave resistance.',
      'Derivation of Norrbin and Abkowitz maneuvering equations for turning circles and zig-zag trials.',
      'Full-scale power prediction extrapolations from towing tank resistance tests.'
    ],
    citations: 8740,
    doiOrRef: 'ISBN 978-0-08-102483-6',
    badge: 'Industry Standard',
    authorOrEntity: 'Prof. Dr.-Ing. Volker Bertram (World Maritime Univ)',
    linkAction: { label: 'Explore Formula Database', viewTarget: 'formula_library' },
    relevanceScore: 98,
    tier: 'pro'
  },

  // 5. Engineering Standards
  {
    id: 'iso-15016-speed-power-trial',
    title: 'ISO 15016:2015 / ITTC 2021 - Guidelines for the Assessment of Speed and Power Performance by Analysis of Speed Trials',
    category: 'engineering_standards',
    source: 'International Organization for Standardization (ISO)',
    publisherOrOrg: 'ISO/TC 8/SC 1 Ships and Marine Technology',
    year: 2023,
    shipType: ['All Merchant Vessels'],
    engineeringField: ['Sea Trials', 'EEDI Verification', 'Hydrodynamics'],
    summary: 'The globally accepted international standard for correcting measured sea trial speed and power data for wind, waves, current, shallow water, water temperature, and salt density.',
    keyPoints: [
      'Wind correction using Fujiwara or Blendermann aerodynamic drag coefficient models.',
      'Wave resistance correction in short and long crested irregular sea states (STAWAVE-1 and STAWAVE-2).',
      'Shallow water speed loss correction via Lackenby formula.'
    ],
    citations: 2100,
    doiOrRef: 'ISO 15016:2015(E)',
    badge: 'ISO Standard',
    authorOrEntity: 'ISO Technical Committee 8',
    linkAction: { label: 'Run Sea Trial Analyzer', viewTarget: 'calculators' },
    relevanceScore: 96,
    tier: 'pro'
  },
  {
    id: 'iacs-ur-s11-longitudinal-strength',
    title: 'IACS Unified Requirements S11 - Longitudinal Strength Standard for Hull Girders',
    category: 'engineering_standards',
    source: 'International Association of Classification Societies (IACS)',
    publisherOrOrg: 'IACS Permanent Secretariat',
    year: 2024,
    shipType: ['Bulk Carriers', 'Tankers', 'Container Ships'],
    engineeringField: ['Structural FEA', 'Hull Scantlings', 'IACS Standards'],
    summary: 'Unified rule minimums binding upon all 12 IACS member classification societies (DNV, ABS, LR, BV, ClassNK, etc.) for hull girder section modulus and moment of inertia.',
    keyPoints: [
      'Minimum section modulus formula Zmin = c * L^2 * B * (Cb + 0.7) * k.',
      'Permissible still water bending moment (Ms) envelope along ship length from 0 to L.',
      'Shearing force distribution and deck/bottom plate buckling safety coefficients.'
    ],
    citations: 4670,
    doiOrRef: 'IACS UR S11 Rev.10',
    badge: 'IACS Unified',
    authorOrEntity: 'IACS Hull Panel',
    linkAction: { label: 'Check IACS Compliance', viewTarget: 'compliance' },
    relevanceScore: 97,
    tier: 'free'
  },

  // 6. Ship Designs & 3D CAD
  {
    id: 'design-ultramax-64k-bulker',
    title: 'Ultramax 64,000 DWT Eco-Bulker Design Package (Lines Plan, GA Drawing & Hydrostatic Tables)',
    category: 'ship_designs',
    source: 'Maritime Design Repository',
    publisherOrOrg: 'AI Maritime Engineering Hub',
    year: 2024,
    shipType: ['Bulk Carriers'],
    engineeringField: ['Ship Design', 'Naval Architecture', '3D Hull CAD'],
    summary: 'Complete engineering package for a 199.9m Ultramax geared bulk carrier with 5 cargo holds, 4x30t deck cranes, Tier III MAN 5S50ME engine, and optimized twisted bulbous bow.',
    keyPoints: [
      'Loa: 199.90m, B: 32.26m, D: 18.50m, Design Draft: 11.30m, Scantling Draft: 13.30m.',
      'Service Speed: 14.0 knots at 85% MCR with daily SFOC of 18.2 tons/day.',
      'Includes Rhino 3D .3dm, IGES offsets, Bonjean table, and NAPA hydrostatic model.'
    ],
    citations: 340,
    doiOrRef: 'CAD-DESIGN-ULTRA64K',
    badge: '3D CAD Model',
    authorOrEntity: 'SDARI / AI Maritime Design Lab',
    linkAction: { label: 'Open 3D Ship Design Studio', viewTarget: 'ship_design_studio' },
    relevanceScore: 95,
    tier: 'pro'
  },
  {
    id: 'design-neopanamax-15k-container',
    title: 'Neo-Panamax 15,000 TEU LNG Dual-Fuel Container Vessel Structural GA & Machinery Layout',
    category: 'ship_designs',
    source: 'Damen / HD KSOE Design Archives',
    publisherOrOrg: 'AI Maritime 3D Studio',
    year: 2025,
    shipType: ['Container Ships', 'LNG Dual Fuel'],
    engineeringField: ['Structural FEA', 'Ship Design', 'Cryogenic Fuel'],
    summary: 'Advanced twin-island general arrangement with 12,000 m³ Type-B membrane LNG fuel tank located under the accommodation block and 2,000 reefer plug positions.',
    keyPoints: [
      'Loa: 366.0m, B: 51.2m, Draft: 16.0m, Capacity: 15,300 TEU (14t homogeneous: 11,200 TEU).',
      'Dual fuel WinGD 12X92DF main engine delivering 63,840 kW at 80 RPM.',
      'Complete torsion box, hatch cover corner FEA scantling diagrams, and parametric roll dampers.'
    ],
    citations: 510,
    doiOrRef: 'CAD-DESIGN-15K-LNG',
    badge: 'Dual-Fuel CAD',
    authorOrEntity: 'HD Hyundai Heavy Industries Design Center',
    linkAction: { label: 'View in 3D Studio', viewTarget: 'ship_design_studio' },
    relevanceScore: 94,
    tier: 'enterprise'
  },

  // 7. Calculators
  {
    id: 'calc-hydrostatics-bonjean',
    title: 'Simpson Rule Hydrostatics & Cross Curves of Stability (KN / GZ Calculator)',
    category: 'calculators',
    source: 'AI Maritime Tools Hub',
    publisherOrOrg: 'Engineering Calculator Suite #16',
    year: 2025,
    shipType: ['All Displacement Ships'],
    engineeringField: ['Stability', 'Hydrostatics', 'Simpson Integration'],
    summary: 'Instant automated derivation of displacement (Δ), LCB, VCB, LCF, KMT, KML, and righting arms (GZ) across heel angles from 0° to 90° for arbitrary offset stations.',
    keyPoints: [
      'Computes Simpson 1st, 2nd, and 3/8th rule numerical integrations on station waterplanes.',
      'Outputs automated IMO Res A.749 intact stability pass/fail criteria checklist.',
      'Instant export to PDF calculation memo, Excel sheets, and CSV vectors.'
    ],
    citations: 12400,
    badge: 'Interactive Calc',
    authorOrEntity: 'AI Maritime Systems Engineering',
    linkAction: { label: 'Launch Calculator', viewTarget: 'calculators' },
    relevanceScore: 99,
    tier: 'free'
  },
  {
    id: 'calc-propeller-b-series-opt',
    title: 'Wageningen B-Series Propeller Optimization & Cavitation Burrill Check Solver',
    category: 'calculators',
    source: 'Propeller & Propulsion Lab',
    publisherOrOrg: 'Naval Architecture Tool Suite #49',
    year: 2025,
    shipType: ['All Marine Propulsion Vessels'],
    engineeringField: ['Propeller Design', 'Cavitation', 'Efficiency'],
    summary: 'Solves optimum propeller diameter (D), pitch ratio (P/D), blade area ratio (AE/A0), thrust coefficient (KT), torque coefficient (KQ), and open water efficiency (η0) using polynomial regression.',
    keyPoints: [
      'Integrates Burrill cavitation criterion ensuring back cavitation percent stays below 5% for naval and 10% for commercial.',
      'Calculates delivered power PD, thrust deduction fraction t, and wake fraction w.',
      'Generates 3D blade coordinates and section camber distributions.'
    ],
    citations: 8600,
    badge: 'Propeller Solver',
    authorOrEntity: 'Prof. J. Kuiper / AI Maritime Lab',
    linkAction: { label: 'Design Propeller', viewTarget: 'propeller_design' },
    relevanceScore: 96,
    tier: 'free'
  },

  // 8. Simulations
  {
    id: 'sim-bridge-radar-colregs',
    title: 'Full Mission Navigational Bridge Simulator with Dynamic Radar Arpa & COLREGs AI',
    category: 'simulations',
    source: 'AI Maritime Simulation Center',
    publisherOrOrg: 'Simulation Center Tool #78',
    year: 2025,
    shipType: ['All Vessels'],
    engineeringField: ['Bridge Operations', 'COLREGs Navigation', 'Safety'],
    summary: 'Real-time 3D maritime simulator featuring realistic wave hydrodynamic response, shallow water suction, bank effect, squat, and dynamic vessel encounters in Singapore Strait and Dover Strait.',
    keyPoints: [
      'Interactive radar ARPA targets with CPA (Closest Point of Approach) and TCPA alarms.',
      'Simulates Rule 13 (Overtaking), Rule 14 (Head-on), and Rule 15 (Crossing situation) avoidance maneuvers.',
      'Weather engine: Beaufort 0-12 storm conditions, dense fog, and tidal stream currents.'
    ],
    citations: 4200,
    badge: '3D Simulation',
    authorOrEntity: 'AI Maritime Simulation Lab',
    linkAction: { label: 'Enter Simulation Center', viewTarget: 'maritime_simulation_center' },
    relevanceScore: 97,
    tier: 'pro'
  },

  // 9. Datasets & AIS
  {
    id: 'dataset-ais-capesize-telemetry',
    title: 'Global Capesize Bulker 12-Month High-Frequency AIS & Engine Telemetry Dataset (1.2M Records)',
    category: 'datasets',
    source: 'Research Dataset Marketplace',
    publisherOrOrg: 'Maritime Big Data Center #52',
    year: 2025,
    shipType: ['Capesize Bulk Carriers'],
    engineeringField: ['Machine Learning', 'Big Data', 'Decarbonization'],
    summary: 'High-frequency telemetry data including GPS coordinates, SOG, STW, main engine RPM, shaft power, fuel mass flow rate, sea state significant wave height Hs, wind speed, and ocean current vectors.',
    keyPoints: [
      'Cleaned, anonymized, and synchronized at 10-minute intervals for ML speed-fuel modeling.',
      'Benchmark dataset for training digital twin neural networks and CII prediction models.',
      'Includes CSV, Parquet, and Python PyTorch loading scripts.'
    ],
    citations: 780,
    doiOrRef: 'DATA-CAPESIZE-2025-01',
    badge: 'Open Dataset',
    authorOrEntity: 'Global Maritime Data Consortium',
    linkAction: { label: 'Download from Dataset Mkt', viewTarget: 'dataset_marketplace' },
    relevanceScore: 93,
    tier: 'free'
  },

  // 10. AI Agents & Prompt Library
  {
    id: 'agent-naval-arch-copilot',
    title: 'Naval Architecture Copilot Pro (Specialized Multi-Model Engineering Agent)',
    category: 'ai_agents',
    source: 'AI Agents & Prompt Library',
    publisherOrOrg: 'AI Maritime Hub Intelligence Engine',
    year: 2026,
    shipType: ['All Ship Categories'],
    engineeringField: ['All Engineering Disciplines', 'Regulations', 'Math Derivations'],
    summary: 'Autonomous AI agent equipped with 100,000+ maritime rulebooks, hydrodynamics textbooks, and IACS unified interpretations capable of generating full calculations, code scripts, and compliance reports.',
    keyPoints: [
      'Solves complex stability derivations, structural FEA stiffener sizing, and Holtrop drag formulas.',
      'Generates automated Python (SciPy/NumPy) and Rhino Grasshopper parametric scripts.',
      'Provides verifiable citations for every regulation and mathematical equation.'
    ],
    citations: 15400,
    badge: 'Flagship Copilot',
    authorOrEntity: 'DeepMind / AI Maritime Hub',
    linkAction: { label: 'Chat with AI Copilot', viewTarget: 'ai_chat' },
    relevanceScore: 100,
    tier: 'free'
  },

  // 11. Maritime Industry (Jobs & Companies)
  {
    id: 'job-principal-naval-architect-dnv',
    title: 'Principal Naval Architect - Green Ship Technology & Hull Optimization (DNV Oslo / Hamburg)',
    category: 'jobs',
    source: 'Maritime Jobs & Careers Portal',
    publisherOrOrg: 'DNV Maritime Group',
    year: 2026,
    shipType: ['Alternative Fuel Ships', 'Hydrogen / Ammonia', 'Wind Assist'],
    engineeringField: ['Ship Design', 'Decarbonization', 'Class Certification'],
    summary: 'DNV is hiring a Senior Principal Naval Architect to lead advisory projects on alternative fuel vessel design, hydrodynamics CFD verification, and wind-assisted propulsion system approvals.',
    keyPoints: [
      'Experience: 8+ years in naval architecture, shipyard design office, or class society.',
      'Salary Range: €95,000 - €125,000 + Relocation package + Pension.',
      'Location: Hamburg, Germany or Høvik (Oslo), Norway.'
    ],
    badge: 'Verified Hiring',
    authorOrEntity: 'DNV Global Talent Acquisition',
    linkAction: { label: 'Apply on Job Board', viewTarget: 'jobs' },
    relevanceScore: 89,
    tier: 'free'
  },
  {
    id: 'company-hd-ksoe-shipbuilding',
    title: 'HD Korea Shipbuilding & Offshore Engineering (HD KSOE / Hyundai Heavy Industries)',
    category: 'companies',
    source: 'Global Maritime Directory #65',
    publisherOrOrg: 'Company Intelligence Hub',
    year: 2026,
    shipType: ['LNG Carriers', 'VLCC Tankers', 'Container Mega-Vessels', 'Offshore Platforms'],
    engineeringField: ['Shipbuilding & Drydock', 'Propulsion', 'Offshore EPC'],
    summary: 'The world’s largest shipbuilding group operating Ulsan, Gunsan, and Samho shipyards with over 45,000 employees, pioneering autonomous navigation (Avikus) and ammonia-fueled propulsion.',
    keyPoints: [
      'Annual Order Book: $22.4 Billion (68% LNG & Green Fleet vessels).',
      'Drydock Capacity: 9 Mega-Docks capable of building up to 400m vessels simultaneously.',
      'R&D Centers in Pangyo, Seoul, and Houston.'
    ],
    badge: 'Tier 1 Shipyard',
    authorOrEntity: 'HD Hyundai Global Corporate',
    linkAction: { label: 'View Company Intelligence', viewTarget: 'company_intelligence' },
    relevanceScore: 92,
    tier: 'free'
  }
];

export const SEARCH_CATEGORIES = [
  { id: 'all', label: 'All Knowledge & Tools', icon: 'Sparkles', count: '145,000+' },
  { id: 'imo_regulations', label: 'IMO Regulations (SOLAS/MARPOL)', icon: 'ShieldAlert', count: '1,840' },
  { id: 'class_rules', label: 'Class Rules (DNV/ABS/LR)', icon: 'BookMarked', count: '4,200' },
  { id: 'research_papers', label: 'Research Papers & SNAME', icon: 'BookOpen', count: '52,000+' },
  { id: 'digital_library', label: 'Digital Library & Textbooks', icon: 'Library', count: '10,500' },
  { id: 'engineering_standards', label: 'Engineering Standards (ISO/IACS)', icon: 'CheckCircle2', count: '890' },
  { id: 'ship_designs', label: 'Ship Designs & 3D CAD', icon: 'Ship', count: '1,450' },
  { id: 'calculators', label: 'Calculators & Formulas', icon: 'Calculator', count: '120+' },
  { id: 'simulations', label: 'Simulations & Virtual Labs', icon: 'Compass', count: '48' },
  { id: 'courses', label: 'Courses & Masterclasses', icon: 'GraduationCap', count: '260' },
  { id: 'datasets', label: 'Datasets & AIS Telemetry', icon: 'FileSpreadsheet', count: '380' },
  { id: 'ai_agents', label: 'AI Agents & Prompts', icon: 'Bot', count: '100+' },
  { id: 'jobs', label: 'Maritime Jobs & Hiring', icon: 'Briefcase', count: '2,800+' },
  { id: 'companies', label: 'Companies & Shipyards', icon: 'Building2', count: '4,200+' }
];

export const POPULAR_SEARCH_QUERIES = [
  'Show SOLAS requirements for lifeboats & davits',
  'Find ship stability papers for my thesis',
  'Compare DNV and ABS rules for hull buckling',
  'Holtrop-Mennen power calculation formula',
  'Find bulk carrier design examples with GA drawing',
  'IMO MEPC 82 CII carbon intensity reduction rate',
  'Hong Kong Convention 2025 IHM HazMat checklist',
  'Propeller B-series cavitation Burrill check equations',
  'Post-Panamax container ship parametric roll prevention',
  'ISO 15016 speed trial weather correction methods'
];

export const MARITIME_SEARCH_LANGUAGES = [
  { code: 'en', name: 'English (UK/US)', flag: '🇬🇧' },
  { code: 'zh', name: 'Mandarin (中文)', flag: '🇨🇳' },
  { code: 'el', name: 'Greek (Ελληνικά)', flag: '🇬🇷' },
  { code: 'ja', name: 'Japanese (日本語)', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean (한국어)', flag: '🇰🇷' },
  { code: 'no', name: 'Norwegian (Norsk)', flag: '🇳🇴' },
  { code: 'es', name: 'Spanish (Español)', flag: '🇪🇸' },
  { code: 'de', name: 'German (Deutsch)', flag: '🇩🇪' },
  { code: 'tl', name: 'Filipino / Tagalog', flag: '🇵🇭' },
  { code: 'id', name: 'Indonesian (Bahasa)', flag: '🇮🇩' },
  { code: 'fr', name: 'French (Français)', flag: '🇫🇷' },
  { code: 'pt', name: 'Portuguese (Português)', flag: '🇵🇹' }
];
