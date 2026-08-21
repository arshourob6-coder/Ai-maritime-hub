import { Course, DigitalProduct, JobListing, MarketplacePlugin, SeoArticle } from '../types';

export const SAMPLE_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Naval Architecture & Hydrostatics Fundamentals',
    category: 'Naval Architecture',
    instructor: 'Dr. Aris Thorne, FRINA (MIT & Lloyd’s Academy)',
    level: 'Beginner',
    duration: '14 Hours',
    rating: 4.9,
    enrolled: 2840,
    priceUSD: 49,
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    description: 'Master hull geometry, Simpson rules, block coefficient, GZ stability curves, trim calculation, and DNV classification rules.',
    modules: [
      {
        title: 'Module 1: Hull Geometry & Simpson’s First Rule',
        duration: '2h 15m',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        quizQuestions: [
          {
            question: 'What does Block Coefficient (Cb) measure?',
            options: [
              'The ratio of hull volume to a circumscribing block',
              'The engine fuel efficiency ratio',
              'The propeller pitch angle',
              'The windage area ratio'
            ],
            answerIndex: 0
          }
        ]
      },
      {
        title: 'Module 2: Transverse Metacentric Height (GM) & Intact Stability',
        duration: '3h 10m',
        quizQuestions: [
          {
            question: 'What happens if KG exceeds KM?',
            options: ['The ship gains positive stability', 'The ship has negative GM and will capsize', 'The vessel speeds up', 'Trim shifts to bow'],
            answerIndex: 1
          }
        ]
      },
      {
        title: 'Module 3: GZ Righting Arm Curves & IMO Intact Stability Code',
        duration: '4h 30m'
      }
    ]
  },
  {
    id: 'course-2',
    title: 'SOLAS & MARPOL 2026 Regulatory Mastery',
    category: 'IMO Regulations',
    instructor: 'Capt. Elena Vance, Senior Auditor @ IMO Secretariat',
    level: 'Intermediate',
    duration: '10 Hours',
    rating: 4.8,
    enrolled: 1950,
    priceUSD: 79,
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    description: 'In-depth breakdown of SOLAS Chapter II-1, II-2, MARPOL Annex VI CII & EEXI requirements, Life-Saving Appliances (LSA Code), and ISM audits.',
    modules: [
      {
        title: 'Module 1: MARPOL Annex VI Carbon Intensity Indicator (CII) & EEXI',
        duration: '3h 00m'
      },
      {
        title: 'Module 2: SOLAS Chapter II-2 Fire Safety Systems & LSA Code',
        duration: '3h 45m'
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Ship CFD & Hull Mesh Optimization with OpenFOAM & ANSYS',
    category: 'Naval Architecture',
    instructor: 'Prof. Hiroshi Tanaka, CFD Lead @ Mitsubishi Heavy Ind.',
    level: 'Advanced',
    duration: '18 Hours',
    rating: 5.0,
    enrolled: 1420,
    priceUSD: 120,
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Learn boundary layer meshing, VOF (Volume of Fluid) free surface modeling, wave resistance estimation, and automated hull optimization.',
    modules: [
      {
        title: 'Module 1: Mesh Generation & Boundary Layer y+ Setup',
        duration: '4h 00m'
      },
      {
        title: 'Module 2: Free Surface VOF & Wave Resistance Simulation',
        duration: '5h 30m'
      }
    ]
  },
  {
    id: 'course-4',
    title: 'Green Ship Recycling & HKC IHM Management',
    category: 'Marine Engineering',
    instructor: 'Eng. Lars Lindqvist, Ship Recycling Lead @ Maersk',
    level: 'Intermediate',
    duration: '8 Hours',
    rating: 4.7,
    enrolled: 890,
    priceUSD: 65,
    thumbnail: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    description: 'Compliance with Hong Kong International Convention (HKC) 2025 entry into force, EU SRR 1257/2013, hazardous material sampling, and yard certification.',
    modules: [
      {
        title: 'Module 1: IHM Part I Preparation & Onboard Sampling Methods',
        duration: '2h 30m'
      }
    ]
  }
];

export const SAMPLE_DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'prod-1',
    title: 'Container Ship 5000 TEU Maxsurf Hull Geometry Model',
    type: 'Maxsurf Template',
    author: 'NavalDesign Lab',
    priceUSD: 39,
    rating: 4.9,
    salesCount: 312,
    downloadSize: '42 MB',
    description: 'Fully parametric 3D Maxsurf Pro surface file including bulbous bow, transom stern, hydrostatics report, and offset tables.',
    tags: ['Maxsurf', 'Container Ship', '3D Model', 'Hydrostatics']
  },
  {
    id: 'prod-2',
    title: 'Master Ship Hydrostatics & GZ Curve Excel Suite v4.2',
    type: 'Excel Calculator',
    author: 'Eng. Marcus Vance',
    priceUSD: 29,
    rating: 4.8,
    salesCount: 840,
    downloadSize: '8.4 MB',
    description: 'VBA-powered Excel workbook calculating Simpson integration, LCB, VCB, GZ curve, KN tables, and IMO Intact Stability criteria checks.',
    tags: ['Excel', 'Hydrostatics', 'VBA', 'Stability']
  },
  {
    id: 'prod-3',
    title: 'OpenFOAM Ship Wave Resistance CFD Mesh & Case Setup',
    type: 'CFD Model',
    author: 'AeroMarine CFD',
    priceUSD: 49,
    rating: 5.0,
    salesCount: 195,
    downloadSize: '120 MB',
    description: 'Ready-to-run interFoam case setup for KCS container ship and KVT tanker hull wave resistance, boundary condition scripts, and ParaView state files.',
    tags: ['OpenFOAM', 'CFD', 'Resistance', 'KCS Ship']
  },
  {
    id: 'prod-4',
    title: 'SOLAS & MARPOL Audit Master Checklist & Prompt Pack',
    type: 'Prompt Pack',
    author: 'AI Maritime Hub Team',
    priceUSD: 19,
    rating: 4.9,
    salesCount: 1120,
    downloadSize: '2.1 MB',
    description: '150+ tested AI prompts for automated regulation searching, ISM non-conformity drafting, and IHM hazardous materials audit notes.',
    tags: ['AI Prompts', 'SOLAS', 'MARPOL', 'Audit']
  },
  {
    id: 'prod-5',
    title: '180K DWT Capesize Bulk Carrier AutoCAD Structural DWG Drawings',
    type: 'AutoCAD File',
    author: 'Global Marine CAD',
    priceUSD: 59,
    rating: 4.8,
    salesCount: 230,
    downloadSize: '85 MB',
    description: 'Full midship section, shell expansion, double bottom structural detailing, longitudinal bulkhead frames according to IACS CSR rules.',
    tags: ['AutoCAD', 'DWG', 'Bulk Carrier', 'Structure']
  }
];

export const SAMPLE_JOBS: JobListing[] = [
  {
    id: 'job-1',
    title: 'Senior Naval Architect (Hull & Hydrodynamics)',
    company: 'DNV Maritime Solutions',
    location: 'Oslo, Norway (Hybrid)',
    type: 'Full-time',
    salaryRange: '$110,000 - $145,000 / yr',
    postedDate: '2 days ago',
    sponsored: true,
    description: 'Lead hydrodynamic analysis, CFD resistance studies, and class approval for next-generation dual-fuel methanol container vessels.',
    requirements: ['B.Sc / M.Sc in Naval Architecture', '5+ years experience in Maxsurf / ANSYS CFD', 'Proficiency in DNV Class Rules']
  },
  {
    id: 'job-2',
    title: 'Marine Engineer - Decarbonization & Alternative Fuels',
    company: 'Maersk Fleet Management',
    location: 'Copenhagen, Denmark / Singapore',
    type: 'Full-time',
    salaryRange: '$95,000 - $130,000 / yr',
    postedDate: '1 day ago',
    sponsored: true,
    description: 'Design and oversee engine retrofits for ammonia and green methanol fuel cells across ocean-going fleet.',
    requirements: ['Degree in Marine Engineering', 'Experience with SFOC optimization & CII Compliance', 'Chief Engineer License preferred']
  },
  {
    id: 'job-3',
    title: 'Offshore Structural Engineer',
    company: 'Subsea7',
    location: 'Houston, TX / Aberdeen, UK',
    type: 'Full-time',
    salaryRange: '$105,000 - $140,000 / yr',
    postedDate: '3 days ago',
    description: 'Perform Finite Element Analysis (FEA) on floating wind turbine mooring lines and jacket foundations using OrcaFlex and SACS.',
    requirements: ['M.Sc in Offshore Structures', 'OrcaFlex & ANSYS FEA experience', '3+ years subsea industry experience']
  },
  {
    id: 'job-4',
    title: 'Port Operations & Digital Twin Analyst',
    company: 'PSA International',
    location: 'Singapore Terminal',
    type: 'Full-time',
    salaryRange: '$85,000 - $115,000 / yr',
    postedDate: 'Just now',
    description: 'Optimize automated quay crane allocation and AIS container vessel scheduling using AI optimization algorithms.',
    requirements: ['Degree in Industrial Engineering or Maritime Operations', 'Python / SQL data analytics skills', 'Familiarity with TOS (Navis N4)']
  },
  {
    id: 'job-5',
    title: 'Naval Architecture Graduate Intern',
    company: 'Lloyd’s Register',
    location: 'London, UK / Remote',
    type: 'Internship',
    salaryRange: '£3,200 / month',
    postedDate: '4 days ago',
    description: '6-month research internship analyzing AI hydrostatics calculation models and structural fatigue criteria.',
    requirements: ['Enrolled in Naval Architecture / Marine Engineering degree', 'Passion for AI and digital ships']
  }
];

export const SAMPLE_PLUGINS: MarketplacePlugin[] = [
  {
    id: 'plug-1',
    name: 'Holtrop-Mennen Power Prediction API',
    developer: 'HydroData Systems',
    category: 'API Service',
    priceMonthlyUSD: 19,
    rating: 4.9,
    activeInstalls: 640,
    description: 'REST API service calculating wave-making resistance, bulbous bow influence, stern form factor, and delivered shaft power in 50ms.',
    endpointUrl: 'https://api.maritimehub.ai/v1/power-predict'
  },
  {
    id: 'plug-2',
    name: 'SOLAS & MARPOL RAG Vector Dataset',
    developer: 'RegTech Maritime',
    category: 'Dataset',
    priceMonthlyUSD: 29,
    rating: 4.8,
    activeInstalls: 410,
    description: 'Over 25,000 embedded chunks of IMO resolutions, SOLAS 2024 amendments, and MSC circulars formatted for LLM vector search.',
    endpointUrl: 'https://api.maritimehub.ai/v1/reg-vectors'
  },
  {
    id: 'plug-3',
    name: 'AIS Vessel Route & Weather Predictor AI',
    developer: 'SeaTrack AI',
    category: 'AI Model',
    priceMonthlyUSD: 49,
    rating: 5.0,
    activeInstalls: 890,
    description: 'Fine-tuned Gemini AI agent predicting fuel consumption and wave slamming risks for oceanic routes.',
    endpointUrl: 'https://api.maritimehub.ai/v1/ais-weather'
  }
];

export const SAMPLE_SEO_ARTICLES: SeoArticle[] = [
  {
    slug: 'ship-design-ai',
    title: 'How AI is Transforming Ship Design and Hydrodynamics in 2026',
    category: 'Naval Architecture AI',
    excerpt: 'Explore how generative AI models and neural networks accelerate hull form optimization, CFD meshing, and structural weight reduction.',
    readTime: '6 min read',
    keywords: ['Ship Design AI', 'Naval Architecture AI', 'Hull Optimization', 'OpenFOAM AI'],
    contentMarkdown: `
# How AI is Transforming Ship Design and Hydrodynamics

Modern ship design traditionally required months of iterative CAD modeling, towing tank testing, and computational fluid dynamics (CFD) simulations. With the integration of **AI Maritime Hub's Ship Design Assistant**, naval architects can optimize hull lines in minutes.

## Key Advantages of Generative AI in Naval Architecture:
1. **Instant Resistance Estimation**: Neural networks trained on thousands of Holtrop-Mennen and towing tank datasets predict effective power ($P_E$) in seconds.
2. **Automated Parametric Hull Variation**: AI alters bulbous bow length, transom stern immersion, and entrance angle to minimize wave resistance.
3. **Class Society Rule Checking**: Instant verification against DNV, ABS, and Lloyd's Register structural thickness criteria.

### Practical Workflow:
Naval architects upload basic dimensions ($L_{BP}, B, T, C_b$), and the platform outputs 3D surface files, hydrostatics curves, and wave elevation contours.
`
  },
  {
    slug: 'solas-guide',
    title: 'Ultimate SOLAS 2026 Compliance Guide for Marine Engineers',
    category: 'IMO Regulations',
    excerpt: 'A complete breakdown of recent SOLAS Chapter II-1 and II-2 amendments, fire safety, life-saving appliances, and ISM audit checklists.',
    readTime: '8 min read',
    keywords: ['SOLAS Guide', 'IMO Regulations', 'Maritime Safety', 'ISM Code'],
    contentMarkdown: `
# Ultimate SOLAS 2026 Compliance Guide

The International Convention for the Safety of Life at Sea (**SOLAS**) is the cornerstone of maritime safety. Compliance is mandatory for all merchant ships operating internationally.

## Critical Chapters to Master:
- **Chapter II-1**: Construction – Subdivision, stability, machinery, and electrical installations.
- **Chapter II-2**: Fire protection, fire detection, and fire extinction.
- **Chapter III**: Life-saving appliances and arrangements (LSA Code).
- **Chapter V**: Safety of navigation (AIS, ECDIS, VDR requirements).

Use **AI Maritime Hub's SOLAS Assistant** to instantly search specific chapters, regulations, and MSC circulars with exact line citations.
`
  },
  {
    slug: 'hkc-ship-recycling',
    title: 'Hong Kong Convention (HKC) 2025/2026: IHM Compliance Checklist',
    category: 'Ship Recycling AI',
    excerpt: 'Prepare your vessel fleet for the mandatory Hong Kong International Convention for the Safe and Environmentally Sound Recycling of Ships.',
    readTime: '7 min read',
    keywords: ['HKC Guide', 'Ship Recycling AI', 'IHM Hazardous Materials', 'Green Shipyard'],
    contentMarkdown: `
# Hong Kong Convention (HKC) IHM Compliance Checklist

With the HKC entering into force globally, shipowners, managers, and recycling yards must maintain a certified **Inventory of Hazardous Materials (IHM) Part I**.

## Key Hazardous Materials Regulated:
1. **Asbestos**: Strictly prohibited in new installations.
2. **Ozone Depleting Substances (ODS)**: Freon, Halons, and CFCs.
3. **PCBs**: Found in older cable sheaths and gaskets.
4. **Organotin Compounds**: TBT antifouling paints.

Use our **AI IHM Generator** to draft official sampling plans, HazMat declaration tables, and ship recycling facility plans.
`
  }
];

export const FORMULA_LIBRARY = [
  { name: 'Displacement (Δ)', formula: 'Δ = L_BP × B × T × C_b × ρ_sw', unit: 'tonnes', desc: 'Total mass displacement of ship in sea water (ρ = 1.025 t/m³)' },
  { name: 'Initial Metacentric Height (GM)', formula: 'GM = KB + BM - KG', unit: 'meters', desc: 'Measure of initial static stability at small angles of heel' },
  { name: 'Transverse BM', formula: 'BM_T = I_x / ∇', unit: 'meters', desc: 'Distance between center of buoyancy (B) and transverse metacenter (M)' },
  { name: 'Froude Number (Fn)', formula: 'Fn = V / √(g × L)', unit: 'dimensionless', desc: 'Ratio of inertial forces to gravitational forces' },
  { name: 'Reynolds Number (Rn)', formula: 'Rn = (V × L) / ν', unit: 'dimensionless', desc: 'Ratio of inertial forces to viscous friction forces' },
  { name: 'Effective Power (PE)', formula: 'PE = R_T × V', unit: 'kW', desc: 'Power required to tow the hull at speed V through still water' }
];

export const MARITIME_DICTIONARY = [
  { term: 'Aft Peak Tank', definition: 'A ballast tank located furthest aft in the vessel, used to adjust trim and pitch motion.' },
  { term: 'Bulbous Bow', definition: 'A protruding bulb at the bow below the waterline that modifies water flow, reducing wave-making resistance.' },
  { term: 'Metacentric Height (GM)', definition: 'The distance between the center of gravity (G) and the metacenter (M). A positive GM ensures stable righting moments.' },
  { term: 'IHM (Inventory of Hazardous Materials)', definition: 'An official document listing hazardous substances aboard a vessel for HKC green recycling compliance.' },
  { term: 'TEU (Twenty-Foot Equivalent Unit)', definition: 'Standard inexact unit of cargo capacity used for container ships and terminals.' },
  { term: 'SFOC (Specific Fuel Oil Consumption)', definition: 'The measure of fuel efficiency of an engine per unit of power produced (g/kWh).' }
];
