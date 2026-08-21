import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType, ViewMode } from '../types';
import {
  BookOpen,
  Search,
  Sparkles,
  FileText,
  Video,
  Database,
  Award,
  Bookmark,
  Share2,
  Download,
  GraduationCap,
  Layers,
  Cpu,
  Zap,
  Globe,
  Compass,
  CheckCircle2,
  ArrowRight,
  Filter,
  Eye,
  FileCode,
  Box,
  Volume2,
  List,
  ChevronRight,
  ExternalLink,
  Bot,
  HelpCircle,
  Copy,
  BookMarked,
  FolderPlus,
  BarChart2,
  TrendingUp,
  ShieldCheck,
  Star,
  Calculator,
  ShieldAlert,
  Play,
  BookmarkCheck,
  Languages,
  Building2,
  User,
  RefreshCw,
  X,
  MessageSquare,
  FileSpreadsheet,
  Terminal,
  Grid,
  Check,
  Tag
} from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onSelectView?: (view: ViewMode) => void;
}

// Data Interfaces
interface BookItem {
  id: string;
  title: string;
  authors: string;
  category: 'Naval Architecture' | 'Offshore Engineering' | 'Marine Engineering' | 'Ocean Engineering' | 'Shipbuilding' | 'Port Management' | 'Ship Recycling' | 'Logistics' | 'Maritime Law' | 'Marine Environment' | 'Renewable Energy';
  year: number;
  publisher: string;
  isbn: string;
  pages: number;
  rating: number;
  summary: string;
  tableOfContents: string[];
  coverColor: string;
}

interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  citations: number;
  keywords: string[];
  abstract: string;
  pdfUrl: string;
}

interface ImoStandard {
  id: string;
  code: string;
  title: string;
  category: 'SOLAS' | 'MARPOL' | 'STCW' | 'MLC' | 'COLREG' | 'ISM' | 'ISPS' | 'Hong Kong' | 'Basel' | 'BWM';
  amendment: string;
  status: 'In Force' | 'Updated 2025' | 'Mandatory';
  summary: string;
  shipboardImpact: string;
}

interface ClassSocietyRule {
  id: string;
  society: 'DNV' | 'ABS' | 'Lloyds Register' | 'Bureau Veritas' | 'RINA' | 'ClassNK' | 'IRS' | 'IACS';
  ruleCode: string;
  title: string;
  partSection: string;
  effectiveYear: number;
  description: string;
}

interface VideoLecture {
  id: string;
  title: string;
  speaker: string;
  institution: string;
  duration: string;
  category: string;
  views: number;
  thumbnailBg: string;
  chapters: string[];
  summary: string;
}

interface ThesisItem {
  id: string;
  title: string;
  author: string;
  degree: "Bachelor's" | "Master's" | 'PhD Dissertation';
  university: string;
  year: number;
  department: string;
  citations: number;
  abstract: string;
}

interface FormulaItem {
  id: string;
  name: string;
  category: string;
  latexFormula: string;
  variables: { symbol: string; name: string; unit: string }[];
  explanation: string;
  sampleInput: Record<string, number>;
  calcFunction: (inputs: Record<string, number>) => { result: number; unit: string; steps: string };
}

interface DrawingItem {
  id: string;
  title: string;
  shipType: string;
  drawingType: 'GA Plan' | 'Lines Plan' | 'Shell Expansion' | 'Structural Midship' | 'Piping P&ID' | 'Electrical One-Line' | '3D STEP Model';
  scale: string;
  designer: string;
  format: string;
  description: string;
}

export const MaritimeDigitalLibraryView: React.FC<Props> = ({
  userPlan = 'student',
  onOpenPricing,
  onSelectView,
}) => {
  // Main Tab Navigation
  const [activeTab, setActiveTab] = useState<
    'ai_hub' | 'books' | 'papers' | 'imo' | 'class_rules' | 'videos' | 'theses' | 'formulas' | 'drawings' | 'my_bookshelf'
  >('ai_hub');

  // Language & Filter States
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'ES' | 'ZH' | 'DE' | 'FR' | 'JA'>('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookCategory, setBookCategory] = useState<string>('All');
  const [selectedClassSociety, setSelectedClassSociety] = useState<string>('All');
  const [selectedImoCategory, setSelectedImoCategory] = useState<string>('All');
  const [savedBooks, setSavedBooks] = useState<string[]>(['book-1', 'paper-1', 'imo-1']);
  const [userNotes, setUserNotes] = useState<Record<string, string>>({
    'book-1': 'Critical chapter 4 formula for ITTC-1957 friction line extrapolation.'
  });

  // AI Knowledge Hub Query State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiAnswers, setAiAnswers] = useState<
    { question: string; answer: string; citations: string[]; confidence: number }[]
  >([
    {
      question: 'What are the mandatory CII compliance formulas for LNG carriers under MEPC.378(80)?',
      answer:
        'Under IMO Resolution MEPC.378(80), the Carbon Intensity Indicator (CII) for LNG carriers calculates attained CO2 per capacity-mile using the formula:\n\n' +
        '$$CII_{attained} = \\frac{\\sum_{j} (FC_j \\times C_{f,j})}{D \\times Capacity}$$\n\n' +
        'Key provisions for LNG dual-fuel engines include:\n' +
        '1. Fuel carbon factor ($C_f$) for boil-off gas (BOG) methane is $2.750 \\text{ gCO}_2/\\text{g fuel}$.\n' +
        '2. Deductions are allowed for shore power (OPS) connected time and cargo boil-off re-liquefaction plant electrical loads.\n' +
        '3. Annual reduction factor ($Z$) increases by 2.0 percentage points yearly from 2023 through 2026.',
      citations: [
        'IMO MEPC.378(80) Guidelines on Operational Carbon Intensity (2023)',
        'DNV Rules for Classification: Ships Part 6 Ch 2 - Decarbonization Systems',
        'Principles of Marine Engineering & Decarbonization (SNAME, 2024)'
      ],
      confidence: 98.4
    }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Active Reader / Preview Modals
  const [activeBookModal, setActiveBookModal] = useState<BookItem | null>(null);
  const [activePaperModal, setActivePaperModal] = useState<ResearchPaper | null>(null);
  const [activeFormulaModal, setActiveFormulaModal] = useState<FormulaItem | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<VideoLecture | null>(null);
  const [activeDrawingModal, setActiveDrawingModal] = useState<DrawingItem | null>(null);

  // Interactive Calculator State
  const [calcInputs, setCalcInputs] = useState<Record<string, number>>({
    rho: 1025,
    S: 4500,
    V: 10.5,
    CT: 0.0028
  });
  const [copiedCitationId, setCopiedCitationId] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // SAMPLE DATASETS (Millions simulated across categories)
  // --------------------------------------------------------------------------

  // 167. Maritime Books
  const books: BookItem[] = [
    {
      id: 'book-1',
      title: 'Principles of Naval Architecture: Resistance, Propulsion & Hydrodynamics',
      authors: 'Prof. Edward V. Lewis, Dr. Jens H. Sørensen',
      category: 'Naval Architecture',
      year: 2024,
      publisher: 'SNAME / AI Maritime Press',
      isbn: '978-0-939773-98-1',
      pages: 680,
      rating: 4.9,
      coverColor: 'from-blue-700 to-indigo-900',
      summary: 'The ultimate reference handbook for naval architects. Covers ITTC-1957 friction line, boundary layer CFD, wave resistance polynomials, and ducted propeller design.',
      tableOfContents: [
        'Ch 1. Fluid Kinematics & Viscous Resistance',
        'Ch 2. Wave-Making Resistance & Model Scale Testing',
        'Ch 3. Propeller Open Water Curves (Kt, Kq, Eta_O)',
        'Ch 4. Cavitation Inception & Blade Pressure Fluctuations',
        'Ch 5. Energy Saving Devices (ESD) & Duct Optimization'
      ]
    },
    {
      id: 'book-2',
      title: 'Offshore Engineering & Subsea Structural Design',
      authors: 'Dr. Alistair Vance, Prof. M. K. Chakrabarti',
      category: 'Offshore Engineering',
      year: 2025,
      publisher: 'Elsevier Ocean Engineering Series',
      isbn: '978-0-12-822405-2',
      pages: 820,
      rating: 4.8,
      coverColor: 'from-teal-700 to-emerald-900',
      summary: 'Design of fixed jackets, tension leg platforms (TLP), spars, and floating wind turbine foundations (Spar, Semi-submersible, Tension Leg) under Morison wave loads.',
      tableOfContents: [
        'Ch 1. Wave Hydrodynamics & Morison Equation',
        'Ch 2. Fixed Jacket Steel Tubular Joint Fatigue',
        'Ch 3. Floating Offshore Wind Turbine (FOWT) Mooring',
        'Ch 4. Subsea Pipeline On-Bottom Stability & Buckling',
        'Ch 5. Dynamic Positioning (DP3) Hydrodynamics'
      ]
    },
    {
      id: 'book-3',
      title: 'Dual-Fuel Marine Engines & Green Ammonia / Hydrogen Decarbonization',
      authors: 'Wärtsilä R&D Team, MAN Energy Solutions',
      category: 'Marine Engineering',
      year: 2025,
      publisher: 'Marine Power Technical Books',
      isbn: '978-3-030-91122-3',
      pages: 510,
      rating: 4.9,
      coverColor: 'from-amber-600 to-orange-900',
      summary: 'Comprehensive engineering guide to pilot fuel injection, SCR NOx abatement, double-walled fuel supply systems, and N2O slip mitigation for NH3 and Methanol engines.',
      tableOfContents: [
        'Ch 1. Thermodynamics of Ammonia & Methanol Combustion',
        'Ch 2. High-Pressure Injection & Pilot Fuel Timing',
        'Ch 3. Exhaust Gas Recirculation (EGR) & SCR Reactors',
        'Ch 4. Safety Architecture for Toxic Fuel Storage & Bunkering'
      ]
    },
    {
      id: 'book-4',
      title: 'Port Management & Container Terminal Automation Systems',
      authors: 'Prof. Theo Notteboom, Dr. Jean-Paul Rodrigue',
      category: 'Port Management',
      year: 2024,
      publisher: 'Routledge Maritime Logistics',
      isbn: '978-1-138-34821-0',
      pages: 440,
      rating: 4.7,
      coverColor: 'from-purple-700 to-slate-900',
      summary: 'Automated Guided Vehicles (AGV), Automated Stacking Cranes (ASC), quay crane berth allocation algorithms, and Port Community System (PCS) digital twins.',
      tableOfContents: [
        'Ch 1. Global Container Shipping Network Dynamics',
        'Ch 2. Quay Crane Scheduling & Berth Allocation (BAP)',
        'Ch 3. Yard Automation & Electric AGV Fleet Dispatching',
        'Ch 4. Port Decarbonization & Cold Ironing (OPS)'
      ]
    },
    {
      id: 'book-5',
      title: 'Green Ship Recycling & Hong Kong Convention Compliance',
      authors: 'Dr. Nikos Mikelis, IMO Circular Working Group',
      category: 'Ship Recycling',
      year: 2023,
      publisher: 'IMO Maritime Environment Press',
      isbn: '978-92-801-1678-2',
      pages: 320,
      rating: 4.8,
      coverColor: 'from-emerald-700 to-cyan-900',
      summary: 'Inventory of Hazardous Materials (IHM) Part I-III preparation, asbestos abatement, toxic sludge handling, and dry dock yards certification under the 2009 Hong Kong Convention.',
      tableOfContents: [
        'Ch 1. IHM Part I Preparation During Vessel Construction',
        'Ch 2. Hazardous Materials Sampling Methodology',
        'Ch 3. Safe Ship Recycling Facility Plan (SRFP)',
        'Ch 4. Downstream Hazardous Waste Treatment Protocols'
      ]
    },
    {
      id: 'book-6',
      title: 'International Maritime Law & Charterparty Disputes',
      authors: 'Sir Richard Aikens, Michael Bills QC',
      category: 'Maritime Law',
      year: 2024,
      publisher: 'Informa Law from Routledge',
      isbn: '978-0-367-45812-1',
      pages: 940,
      rating: 4.9,
      coverColor: 'from-rose-800 to-slate-900',
      summary: 'Comprehensive legal commentary on NYPE charterparties, Hague-Visby Rules, Rotterdam Rules, demurrage claims, laytime calculation, and maritime arbitration in London & Singapore.',
      tableOfContents: [
        'Ch 1. Bareboat, Time & Voyage Charterparty Contracts',
        'Ch 2. Seaworthiness & Due Diligence under Hague-Visby',
        'Ch 3. Laytime, Demurrage & Despatch Calculations',
        'Ch 4. General Average & York-Antwerp Rules 2016'
      ]
    }
  ];

  // 168. Research Papers
  const papers: ResearchPaper[] = [
    {
      id: 'paper-1',
      title: 'COLREGs-Compliant Deep Reinforcement Learning for Autonomous Surface Vessels in Congested Straits',
      authors: 'Dr. Elena Rostova, Prof. Marcus Thorne, Dr. Jin-Soo Park',
      journal: 'IEEE Journal of Oceanic Engineering',
      year: 2025,
      doi: '10.1109/JOE.2025.3412990',
      citations: 412,
      keywords: ['Autonomous Ships', 'COLREGs Rule 15', 'Reinforcement Learning', 'Sensor Fusion', 'MASS'],
      abstract: 'Presents an end-to-end multi-agent RL framework enforcing Rules 13, 14, 15, and 18 of COLREGs in congested strait navigation with radar/LiDAR sensor fusion.',
      pdfUrl: '#'
    },
    {
      id: 'paper-2',
      title: 'Parametric Roll Instability & Dynamic Anti-Roll Fin Stabilization in 24,000 TEU Container Ships',
      authors: 'Dr. Alistair Vance, Prof. K. Y. Shin',
      journal: 'Journal of Marine Science & Technology',
      year: 2024,
      doi: '10.1007/s00773-024-09821-w',
      citations: 680,
      keywords: ['Parametric Roll', 'Seakeeping', 'GZ Curve', 'Head Sea Resonance', 'Ultra-Large Container Ship'],
      abstract: 'Experimental basin tests and non-linear Mathieu equation modeling of head-sea parametric roll resonance in 24,000 TEU container ships in extreme sea states.',
      pdfUrl: '#'
    },
    {
      id: 'paper-3',
      title: 'Hydrodynamic Optimization of Flettner Rotor Rigid Wingsails for Wind-Assisted Bulker Propulsion',
      authors: 'Dr. Lars Lindqvist, Dr. Maria Santos',
      journal: 'Ocean Engineering (Elsevier)',
      year: 2025,
      doi: '10.1016/j.oceaneng.2025.118902',
      citations: 290,
      keywords: ['WASP', 'Flettner Rotor', 'Magnus Effect', 'CII Reduction', 'CFD Wingsail'],
      abstract: '3D Unsteady RANS simulations evaluating lift-to-drag coefficients of spinning Flettner rotors at spin ratios between 1.5 and 4.0 on a 180,000 DWT Capesize bulk carrier.',
      pdfUrl: '#'
    }
  ];

  // 169. IMO Standards
  const imoStandards: ImoStandard[] = [
    {
      id: 'imo-1',
      code: 'SOLAS Ch II-1',
      title: 'SOLAS Chapter II-1: Construction - Structure, Subdivision and Stability, Machinery and Electrical',
      category: 'SOLAS',
      amendment: 'Res. MSC.474(102) Mandatory 2024',
      status: 'Mandatory',
      summary: 'Mandatory probabilistic damage stability calculations (Index R vs Index Attained A) for passenger and cargo ships over 80m.',
      shipboardImpact: 'Requires damage stability computer with direct link to tank level gauging systems for real-time KG/GM verification.'
    },
    {
      id: 'imo-2',
      code: 'MARPOL Annex VI',
      title: 'MARPOL Annex VI: Regulations for the Prevention of Air Pollution from Ships',
      category: 'MARPOL',
      amendment: 'MEPC.328(75) EEXI & CII Controls',
      status: 'Updated 2025',
      summary: 'Strict limit on fuel sulfur content (0.50% global, 0.10% ECA) alongside compulsory EEXI technical baseline and annual CII carbon ratings.',
      shipboardImpact: 'Mandatory SEEMP Part III plan onboard with log of fuel oil consumption data (DCS) verified by classification society.'
    },
    {
      id: 'imo-3',
      code: 'STCW Code A-VI/1',
      title: 'STCW Code Section A-VI/1: Mandatory Minimum Requirements for Safety Indoctrination and Training',
      category: 'STCW',
      amendment: '2010 Manila Amendments + 2024 IGF Addendum',
      status: 'In Force',
      summary: 'Basic and advanced safety training standards for all seafarers, including specialized endorsements for ships subject to the IGF Code (LNG/Ammonia fuel).',
      shipboardImpact: 'Seafarers must revalidate Certificates of Competency (CoC) every 5 years with simulator sea time records.'
    },
    {
      id: 'imo-4',
      code: 'COLREG Rule 15',
      title: 'COLREG 1972 Rule 15: Crossing Situation',
      category: 'COLREG',
      amendment: '1972 Convention as Amended',
      status: 'Mandatory',
      summary: 'When two power-driven vessels are crossing so as to involve risk of collision, the vessel which has the other on her own starboard side shall keep out of the way.',
      shipboardImpact: 'Obligates give-way vessel to take early and substantial action to keep well clear, altering course to starboard.'
    }
  ];

  // 170. Classification Society Rules
  const classRules: ClassSocietyRule[] = [
    {
      id: 'class-1',
      society: 'DNV',
      ruleCode: 'DNV-RU-SHIP Pt.3 Ch.2',
      title: 'DNV Hull Structural Design - General Cargo & Tanker Scantling Requirements',
      partSection: 'Part 3 Chapter 2 Sec 4',
      effectiveYear: 2025,
      description: 'Finite element yield and buckling criteria for midship primary longitudinal strength members and stiffener section modulus.'
    },
    {
      id: 'class-2',
      society: 'ABS',
      ruleCode: 'ABS Steel Vessel Rules 4-8-3',
      title: 'ABS Rules for Building and Classing Steel Vessels: Electrical Systems & Automation',
      partSection: 'Part 4 Section 8',
      effectiveYear: 2024,
      description: 'Requirements for main switchboard short-circuit withstand rating, emergency generator auto-start within 45s, and high-voltage (6.6kV) insulation tests.'
    },
    {
      id: 'class-3',
      society: 'Lloyds Register',
      ruleCode: 'LR Rules Pt 5 Ch 10',
      title: 'Lloyds Register Rules for Ship Piping Systems & Cryogenic Fuel Storage',
      partSection: 'Part 5 Chapter 10 Sec 2',
      effectiveYear: 2025,
      description: 'Design pressure, stress analysis, expansion loops, and thermal insulation rules for LNG (-162°C) and Liquid Ammonia fuel piping.'
    },
    {
      id: 'class-4',
      society: 'IACS',
      ruleCode: 'IACS UR M81',
      title: 'IACS Unified Requirement M81: Cyber Resilience Onboard Ships',
      partSection: 'UR M81 Rev 1',
      effectiveYear: 2024,
      description: 'Mandatory network segmentation between Operational Technology (OT) bridge systems and IT networks with firewalls and intrusion detection.'
    }
  ];

  // 171. Video Learning Library
  const videos: VideoLecture[] = [
    {
      id: 'vid-1',
      title: 'Advanced CFD Mesh Generation & Hull Hydrodynamics Masterclass',
      speaker: 'Prof. Heinrich Weber',
      institution: 'Hamburg University of Technology (TUHH)',
      duration: '1h 45m',
      category: 'Naval Architecture',
      views: 18400,
      thumbnailBg: 'bg-indigo-950',
      summary: 'Step-by-step tutorial on generating structured hex-meshes for ship bows, boundary layer y+ selection for k-omega SST turbulence models, and wave drag validation.',
      chapters: ['00:00 Introduction', '12:30 Boundary Layer y+ Math', '34:10 Overset Grid Refinement', '1:12:00 Wave Resistance Validation']
    },
    {
      id: 'vid-2',
      title: 'Dual-Fuel Engine Overhaul & LNG Fuel Gas Supply System (FGSS) Maintenance',
      speaker: 'Chief Engineer Thomas Berg',
      institution: 'Wärtsilä Land & Sea Academy',
      duration: '2h 10m',
      category: 'Marine Engineering',
      views: 32100,
      thumbnailBg: 'bg-slate-950',
      summary: 'Practical engine room walk-through detailing high-pressure gas valve unit (GVU) testing, cryogenic pump seal replacement, and purge sequence protocol.',
      chapters: ['00:00 FGSS Overview', '25:10 Cryogenic Tank Cold Start', '1:05:00 GVU Pressure Hold Test', '1:45:00 Nitrogen Purging']
    },
    {
      id: 'vid-3',
      title: 'COLREGs in Action: Bridge Simulator Case Studies & Near-Miss Analysis',
      speaker: 'Capt. David Henderson',
      institution: 'World Maritime University (WMU)',
      duration: '58m',
      category: 'Maritime Navigation',
      views: 24900,
      thumbnailBg: 'bg-teal-950',
      summary: 'Analysis of real AIS tracking data from radar logs in Malacca and Dover Straits demonstrating give-way vessel obligations under COLREG Rules 14 and 15.',
      chapters: ['00:00 Dover Strait Traffic Analysis', '18:20 Rule 15 Crossing Errors', '38:00 Arpa Radar Vector Interpretation']
    }
  ];

  // 172. Theses & Dissertations
  const theses: ThesisItem[] = [
    {
      id: 'thesis-1',
      title: 'Hydrodynamic Performance of Floating Offshore Wind Turbine Spar Buoys in Extreme Wave-Current Interaction',
      author: 'Dr. Astrid Lindemann',
      degree: 'PhD Dissertation',
      university: 'NTNU Trondheim (Norwegian University of Science & Technology)',
      year: 2024,
      department: 'Department of Marine Technology',
      citations: 88,
      abstract: 'Numerical and experimental investigation into second-order sum-frequency and difference-frequency wave forces acting on spar buoy floating offshore wind turbines.'
    },
    {
      id: 'thesis-2',
      title: 'Optimization of Wind Assisted Ship Propulsion (WASP) Arrays Using Physics-Informed Neural Networks',
      author: 'Marco Rossi, M.Sc.',
      degree: "Master's",
      university: 'TU Delft (Delft University of Technology)',
      year: 2025,
      department: 'Ship Hydromechanics & Structures',
      citations: 42,
      abstract: 'Coupled CFD-neural network model optimizing tilt angles and rpm speeds of 4-rotor Flettner setups to maximize net thrust without compromising transverse stability.'
    }
  ];

  // 173. Engineering Formula Library
  const formulas: FormulaItem[] = [
    {
      id: 'form-1',
      name: 'ITTC-1957 Friction Resistance Coefficient Line',
      category: 'Naval Architecture',
      latexFormula: 'C_F = \\frac{0.075}{(\\log_{10} Re - 2)^2}',
      variables: [
        { symbol: 'Re', name: 'Reynolds Number (V * L / nu)', unit: 'dimensionless' },
        { symbol: 'C_F', name: 'Frictional Resistance Coefficient', unit: 'dimensionless' }
      ],
      explanation: 'Standard International Towing Tank Conference (ITTC 1957) model-ship correlation line used worldwide to calculate skin friction drag of ship hulls.',
      sampleInput: { Re: 1e9 },
      calcFunction: (inputs) => {
        const Re = inputs.Re || 1e9;
        const cf = 0.075 / Math.pow(Math.log10(Re) - 2, 2);
        return {
          result: Number(cf.toFixed(6)),
          unit: 'C_F',
          steps: `1. Log10(${Re.toExponential(2)}) = ${Math.log10(Re).toFixed(3)}\n2. (Log10 - 2)^2 = ${Math.pow(Math.log10(Re) - 2, 2).toFixed(3)}\n3. C_F = 0.075 / ${Math.pow(Math.log10(Re) - 2, 2).toFixed(3)} = ${cf.toFixed(6)}`
        };
      }
    },
    {
      id: 'form-2',
      name: 'Total Ship Resistance Force (R_T)',
      category: 'Naval Architecture',
      latexFormula: 'R_T = \\frac{1}{2} \\cdot \\rho \\cdot S \\cdot V^2 \\cdot C_T',
      variables: [
        { symbol: 'rho', name: 'Seawater Density', unit: 'kg/m³' },
        { symbol: 'S', name: 'Wetted Surface Area', unit: 'm²' },
        { symbol: 'V', name: 'Ship Speed', unit: 'm/s' },
        { symbol: 'C_T', name: 'Total Resistance Coefficient', unit: 'dimensionless' }
      ],
      explanation: 'Calculates the total hydrodynamic towline resistance force in Newtons required to propel a ship hull through seawater.',
      sampleInput: { rho: 1025, S: 4500, V: 10.28, CT: 0.0028 },
      calcFunction: (inputs) => {
        const rho = inputs.rho || 1025;
        const S = inputs.S || 4500;
        const V = inputs.V || 10.28;
        const CT = inputs.CT || 0.0028;
        const RT = 0.5 * rho * S * Math.pow(V, 2) * CT;
        const kwPower = (RT * V) / 1000;
        return {
          result: Math.round(RT),
          unit: 'N (Newtons)',
          steps: `1. Dynamic Pressure = 0.5 * ${rho} * (${V.toFixed(2)})² = ${(0.5 * rho * V * V).toFixed(1)} Pa\n2. R_T = Dynamic Pressure * ${S} * ${CT} = ${Math.round(RT).toLocaleString()} N\n3. Towing Effective Power (PE) = ${(kwPower).toFixed(1)} kW (${(kwPower / 0.7355).toFixed(1)} HP)`
        };
      }
    },
    {
      id: 'form-3',
      name: 'Propeller Advance Ratio (J)',
      category: 'Marine Engineering',
      latexFormula: 'J = \\frac{V_A}{n \\cdot D}',
      variables: [
        { symbol: 'V_A', name: 'Speed of Advance (V_ship * (1 - w))', unit: 'm/s' },
        { symbol: 'n', name: 'Propeller Shaft Speed', unit: 'rev/s (RPS)' },
        { symbol: 'D', name: 'Propeller Diameter', unit: 'meters' }
      ],
      explanation: 'Dimensionless advance coefficient governing propeller open-water performance charts (Kt, Kq, Eta_O).',
      sampleInput: { V_A: 8.5, n: 1.8, D: 7.2 },
      calcFunction: (inputs) => {
        const VA = inputs.V_A || 8.5;
        const n = inputs.n || 1.8;
        const D = inputs.D || 7.2;
        const J = VA / (n * D);
        return {
          result: Number(J.toFixed(4)),
          unit: 'J (Advance Ratio)',
          steps: `1. n * D = ${n} * ${D} = ${(n * D).toFixed(2)} m/s\n2. J = ${VA} / ${(n * D).toFixed(2)} = ${J.toFixed(4)}`
        };
      }
    }
  ];

  // 174. Ship Design Drawings
  const drawings: DrawingItem[] = [
    {
      id: 'dwg-1',
      title: 'General Arrangement (GA) Plan - 15,000 TEU Dual-Fuel LNG Container Ship',
      shipType: 'Container Vessel',
      drawingType: 'GA Plan',
      scale: '1:200',
      designer: 'HD Hyundai Heavy Industries Naval Yard',
      format: 'DWG / STEP / Vector PDF',
      description: 'Complete profile, deck plan views (Nav Bridge, A-E Decks, Tank Top), cargo hold arrangement, and 2,000 m³ Type C LNG fuel tank placement.'
    },
    {
      id: 'dwg-2',
      title: 'Lines Plan & Table of Offsets - 180,000 DWT Capesize Bulk Carrier',
      shipType: 'Bulker',
      drawingType: 'Lines Plan',
      scale: '1:100',
      designer: 'SNAME Hydrodynamics Committee',
      format: 'IGES / STEP / DXF',
      description: '21 station sections, waterlines at 1m intervals, buttock lines, and bow bulb profile with IGES CAD point cloud.'
    },
    {
      id: 'dwg-3',
      title: 'Midship Structural Section & Shell Expansion - 115,000 DWT Aframax Tanker',
      shipType: 'Oil Tanker',
      drawingType: 'Structural Midship',
      scale: '1:50',
      designer: 'DNV Hull Design Bureau',
      format: 'AutoCAD DWG / PDF',
      description: 'Scantling dimensions, plate thicknesses (bottom shell, side shell, deck plating), longitudinal stiffeners (HP 300x12), and hopper tank girders.'
    }
  ];

  // --------------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------------

  const handleAskAiHub = () => {
    if (!aiPrompt.trim()) return;
    setIsAiThinking(true);

    setTimeout(() => {
      const newAnswer = {
        question: aiPrompt,
        answer:
          `**AI Knowledge Hub Response:**\n\n` +
          `Addressing your query regarding "${aiPrompt}":\n\n` +
          `1. **Core Physics & Engineering Principle**: Maritime engineering standards require strict adherence to hydrodynamic principles and IMO/Classification society rules.\n` +
          `2. **Formula Application**: Mathematical modeling uses $R_T = 0.5 \\rho S V^2 C_T$ for Towline Resistance and $CII_{attained}$ for Operational Carbon Intensity.\n` +
          `3. **Regulatory Context**: Complies with SOLAS Ch II-1 probabilistic stability and MARPOL Annex VI MEPC.378(80) regulations.`,
        citations: [
          'Principles of Naval Architecture (Lewis & Sørensen, 2024)',
          'IMO SOLAS Consolidated Edition 2024 Chapter II-1',
          'DNV Rules for Ships Part 3 Hull Structural Design'
        ],
        confidence: 97.8
      };

      setAiAnswers(prev => [newAnswer, ...prev]);
      setAiPrompt('');
      setIsAiThinking(false);
    }, 1200);
  };

  const toggleSaveBook = (id: string) => {
    setSavedBooks(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const copyCitation = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitationId(id);
    setTimeout(() => setCopiedCitationId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      <SubscriptionBanner
        userPlan={userPlan}
        onOpenPricing={onOpenPricing}
        featureName="Global Maritime Digital Library & AI Knowledge Hub"
      />

      {/* TOP HERO HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              World's Largest Digital Maritime Library
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Millions of Publications & Drawings
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              AI Semantic Neural Index #166-#175
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-9 h-9 text-indigo-400" />
            Global Maritime Digital Library & Knowledge Hub
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Instant AI semantic search across Naval Architecture textbooks, peer-reviewed journals, IMO conventions, Class Society rules, PhD dissertations, engineering formulas, GA ship drawings, and video lectures.
          </p>
        </div>

        {/* Multilingual Switcher & Bookshelf Badge */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-2 rounded-2xl border border-slate-800 text-xs">
            <Languages className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-400 font-semibold">Lang:</span>
            {(['EN', 'ES', 'ZH', 'DE', 'FR', 'JA'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2 py-0.5 rounded font-bold transition ${
                  selectedLanguage === lang ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('my_bookshelf')}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 transition flex items-center gap-2"
          >
            <BookMarked className="w-4 h-4" />
            My Bookshelf ({savedBooks.length})
          </button>
        </div>
      </div>

      {/* TOP SUB-SYSTEM TABS (10 Specialized Sub-Libraries) */}
      <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs gap-1.5 overflow-x-auto">
        {[
          { id: 'ai_hub', label: '175. AI Knowledge Hub', icon: Bot, color: 'text-indigo-400' },
          { id: 'books', label: '167. Books Collection', icon: BookOpen, color: 'text-cyan-400' },
          { id: 'papers', label: '168. Research Papers', icon: FileText, color: 'text-emerald-400' },
          { id: 'imo', label: '169. IMO Standards', icon: ShieldCheck, color: 'text-amber-400' },
          { id: 'class_rules', label: '170. Class Rules', icon: Building2, color: 'text-purple-400' },
          { id: 'videos', label: '171. Video Library', icon: Video, color: 'text-rose-400' },
          { id: 'theses', label: '172. Theses Repository', icon: GraduationCap, color: 'text-teal-400' },
          { id: 'formulas', label: '173. Formula Library', icon: Calculator, color: 'text-blue-400' },
          { id: 'drawings', label: '174. Ship Drawings', icon: Box, color: 'text-orange-400' },
          { id: 'my_bookshelf', label: 'My Bookshelf & Notes', icon: Bookmark, color: 'text-indigo-300' }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==================================================================== */}
      // TAB 1: 175. AI KNOWLEDGE HUB
      // ====================================================================
      {activeTab === 'ai_hub' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-indigo-500/30 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 flex items-center gap-1.5 w-fit">
                <Bot className="w-4 h-4 text-indigo-400" /> Feature #175 AI Knowledge Engine
              </span>
              <h2 className="text-2xl font-black text-white">Ask AI Neural Search Across All Maritime Libraries</h2>
              <p className="text-slate-300 text-xs sm:text-sm">
                Ask any complex technical question regarding naval architecture, SOLAS regulations, DNV scantlings, dual-fuel thermodynamics, or COLREGs navigation.
              </p>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <textarea
                  value={aiPrompt}
                  onChange={e => setAiPrompt(e.target.value)}
                  placeholder="e.g., Explain how to calculate the EEXI required baseline for a 115,000 DWT tanker and list DNV class rules for cryogenic fuel piping..."
                  className="w-full p-4 pr-32 bg-slate-950 rounded-2xl border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 h-28 resize-none font-medium placeholder:text-slate-500"
                />
                <button
                  onClick={handleAskAiHub}
                  disabled={isAiThinking}
                  className="absolute right-3 bottom-4 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2"
                >
                  {isAiThinking ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Neural Querying...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" /> Query AI Engine
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Popular Prompts:</span>
                {[
                  'Explain ITTC-1957 friction line derivation',
                  'What are the SOLAS Ch II-1 damage stability requirements?',
                  'Compare Flettner rotor WASP efficiency vs rigid wingsails',
                  'List DNV rules for high-voltage shore power (OPS)'
                ].map(p => (
                  <button
                    key={p}
                    onClick={() => setAiPrompt(p)}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] transition"
                  >
                    "{p}"
                  </button>
                ))}
              </div>
            </div>

            {/* Answer Feed */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" /> Answer Stream & Verified Citations
              </h3>

              {aiAnswers.map((ans, idx) => (
                <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start gap-4 border-b border-slate-800/80 pb-3">
                    <h4 className="font-bold text-white text-base flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                      {ans.question}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 shrink-0">
                      {ans.confidence}% Confidence
                    </span>
                  </div>

                  <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                    {ans.answer}
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-indigo-500/20 space-y-1.5">
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">
                      Cited Library Publications:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300 font-mono">
                      {ans.citations.map((c, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      // TAB 2: 167. MARITIME BOOKS COLLECTION
      // ====================================================================
      {activeTab === 'books' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  Categorized Maritime Book Collection (#167)
                </h3>
                <p className="text-xs text-slate-400">
                  Naval Architecture, Offshore, Marine Engineering, Port Management, Law, Environment, and Renewable Energy.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto text-xs">
                <span className="text-slate-400 font-semibold shrink-0">Category:</span>
                {[
                  'All',
                  'Naval Architecture',
                  'Offshore Engineering',
                  'Marine Engineering',
                  'Port Management',
                  'Ship Recycling',
                  'Maritime Law'
                ].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setBookCategory(cat)}
                    className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition ${
                      bookCategory === cat
                        ? 'bg-cyan-600 text-white shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Book Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books
                .filter(b => bookCategory === 'All' || b.category === bookCategory)
                .map(b => (
                  <div
                    key={b.id}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition space-y-4 flex flex-col justify-between group shadow-lg"
                  >
                    <div className="space-y-3">
                      {/* Fake Book Spine / Cover Mockup */}
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${b.coverColor} border border-white/10 space-y-2 shadow-inner`}>
                        <span className="px-2 py-0.5 rounded bg-black/40 text-cyan-300 text-[10px] font-mono font-bold uppercase">
                          {b.category}
                        </span>
                        <h4 className="font-black text-white text-sm line-clamp-2 leading-snug">{b.title}</h4>
                        <p className="text-[11px] text-slate-300 font-mono">{b.authors}</p>
                      </div>

                      <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                        <span>{b.publisher} ({b.year})</span>
                        <span className="flex items-center gap-1 text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> {b.rating}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{b.summary}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleSaveBook(b.id)}
                        className={`p-2 rounded-xl border transition ${
                          savedBooks.includes(b.id)
                            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                        title="Bookmark to Personal Bookshelf"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setActiveBookModal(b)}
                        className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow"
                      >
                        <Eye className="w-3.5 h-3.5" /> Table of Contents & Reader
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      // TAB 3: 168. RESEARCH PAPERS
      // ====================================================================
      {activeTab === 'papers' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  Peer-Reviewed Maritime Research Paper Repository (#168)
                </h3>
                <p className="text-xs text-slate-400">
                  Searchable articles with DOI export, IEEE/APA citation tools, and AI executive summaries.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {papers.map(p => (
                <div key={p.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-400 font-mono">{p.journal} ({p.year})</span>
                    <span className="text-[11px] font-mono text-slate-400">DOI: {p.doi} • Citations: {p.citations}</span>
                  </div>

                  <h4 className="font-bold text-white text-base hover:text-emerald-300 transition cursor-pointer" onClick={() => setActivePaperModal(p)}>
                    {p.title}
                  </h4>

                  <p className="text-xs text-slate-400 font-medium">{p.authors}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.abstract}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.keywords.map(kw => (
                      <span key={kw} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800">
                        #{kw}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyCitation(p.id, `${p.authors} (${p.year}). "${p.title}." ${p.journal}. DOI: ${p.doi}`)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedCitationId === p.id ? 'Copied APA!' : 'Cite (APA/IEEE)'}
                      </button>
                    </div>

                    <button
                      onClick={() => setActivePaperModal(p)}
                      className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Read Full Text
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      // TAB 4: 169. IMO & INTERNATIONAL STANDARDS
      // ====================================================================
      {activeTab === 'imo' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  IMO Conventions & Regulatory Library (#169)
                </h3>
                <p className="text-xs text-slate-400">
                  SOLAS, MARPOL, STCW, MLC, COLREG, ISM, ISPS, Hong Kong Convention & BWM standards.
                </p>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto text-xs">
                {['All', 'SOLAS', 'MARPOL', 'STCW', 'COLREG'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedImoCategory(cat)}
                    className={`px-3 py-1 rounded-xl font-bold transition ${
                      selectedImoCategory === cat
                        ? 'bg-amber-600 text-white shadow'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {imoStandards
                .filter(i => selectedImoCategory === 'All' || i.category === selectedImoCategory)
                .map(imo => (
                  <div key={imo.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                        {imo.code}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{imo.amendment}</span>
                    </div>

                    <h4 className="font-bold text-white text-base">{imo.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{imo.summary}</p>

                    <div className="p-3 bg-amber-950/20 rounded-xl border border-amber-500/30 text-xs space-y-1">
                      <span className="font-bold text-amber-300 block">Shipboard Operational Impact:</span>
                      <p className="text-slate-300 text-[11px]">{imo.shipboardImpact}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      // TAB 5: 170. CLASSIFICATION SOCIETY LIBRARY
      // ====================================================================
      {activeTab === 'class_rules' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-400" />
                  Classification Society Rulebooks (#170)
                </h3>
                <p className="text-xs text-slate-400">
                  DNV, ABS, Lloyd's Register, Bureau Veritas, RINA, ClassNK, IRS, and IACS Unified Requirements.
                </p>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto text-xs">
                {['All', 'DNV', 'ABS', 'Lloyds Register', 'IACS'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedClassSociety(s)}
                    className={`px-3 py-1 rounded-xl font-bold transition ${
                      selectedClassSociety === s
                        ? 'bg-purple-600 text-white shadow'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classRules
                .filter(c => selectedClassSociety === 'All' || c.society === selectedClassSociety)
                .map(rule => (
                  <div key={rule.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/30">
                        {rule.society} • {rule.ruleCode}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Eff: {rule.effectiveYear}</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">{rule.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{rule.description}</p>
                    <span className="text-[10px] text-slate-500 font-mono block">Section: {rule.partSection}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      // TAB 6: 171. VIDEO LEARNING LIBRARY
      // ====================================================================
      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-400" />
                Maritime Lecture & Video Learning Library (#171)
              </h3>
              <p className="text-xs text-slate-400">
                Lectures, webinars, documentaries, and bridge/engine room walkthrough tutorials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map(v => (
                <div key={v.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className={`${v.thumbnailBg} h-36 rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden group cursor-pointer`} onClick={() => setActiveVideoModal(v)}>
                      <Play className="w-10 h-10 text-white fill-white/80 group-hover:scale-110 transition" />
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-mono rounded">
                        {v.duration}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm hover:text-rose-300 transition cursor-pointer" onClick={() => setActiveVideoModal(v)}>
                      {v.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">{v.speaker} • {v.institution}</p>
                    <p className="text-xs text-slate-300 line-clamp-2">{v.summary}</p>
                  </div>

                  <button
                    onClick={() => setActiveVideoModal(v)}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 mt-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Watch Lecture
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      // TAB 7: 172. THESES & DISSERTATIONS
      // ====================================================================
      {activeTab === 'theses' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-teal-400" />
                Global Maritime Thesis & PhD Dissertation Library (#172)
              </h3>
              <p className="text-xs text-slate-400">
                Academic dissertations from WMU, MIT, NTNU, TU Delft, and Plymouth University.
              </p>
            </div>

            <div className="space-y-4">
              {theses.map(t => (
                <div key={t.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-teal-300">
                    <span>{t.degree} • {t.university} ({t.year})</span>
                    <span>Citations: {t.citations}</span>
                  </div>

                  <h4 className="font-bold text-white text-base">{t.title}</h4>
                  <p className="text-xs text-slate-400 font-medium">By {t.author} — {t.department}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{t.abstract}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      // TAB 8: 173. ENGINEERING FORMULA LIBRARY & CALCULATOR
      // ====================================================================
      {activeTab === 'formulas' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-400" />
                Maritime Engineering Formula Database & Solved Calculators (#173)
              </h3>
              <p className="text-xs text-slate-400">
                Interactive derivations and live execution solvers for towline resistance, advance ratio, and stability.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Formula List */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Formula Index:</h4>
                {formulas.map(f => (
                  <div
                    key={f.id}
                    onClick={() => {
                      setActiveFormulaModal(f);
                      setCalcInputs(f.sampleInput);
                    }}
                    className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                      activeFormulaModal?.id === f.id
                        ? 'bg-blue-950/40 border-blue-500'
                        : 'bg-slate-950 border-slate-800 hover:border-blue-500/40'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">{f.name}</span>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono">
                        {f.category}
                      </span>
                    </div>

                    <p className="text-xs font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-blue-300">
                      {f.latexFormula}
                    </p>
                  </div>
                ))}
              </div>

              {/* Interactive Calculator Workspace */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Calculator className="w-4 h-4 text-blue-400" />
                  Live Interactive Formula Solver: {activeFormulaModal ? activeFormulaModal.name : formulas[1].name}
                </h4>

                {(() => {
                  const targetForm = activeFormulaModal || formulas[1];
                  const calcResult = targetForm.calcFunction(calcInputs);

                  return (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <span className="text-xs font-bold text-slate-400 block">Input Variables:</span>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          {targetForm.variables.map(v => (
                            <div key={v.symbol} className="space-y-1">
                              <label className="text-slate-400 font-mono text-[11px] block">
                                {v.symbol} ({v.name}):
                              </label>
                              <input
                                type="number"
                                value={calcInputs[v.symbol] ?? ''}
                                onChange={e =>
                                  setCalcInputs(prev => ({
                                    ...prev,
                                    [v.symbol]: parseFloat(e.target.value) || 0
                                  }))
                                }
                                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-blue-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-blue-950/30 rounded-xl border border-blue-500/30 space-y-2">
                        <span className="text-xs font-bold text-blue-300 block">Calculated Result:</span>
                        <span className="text-2xl font-black font-mono text-white">
                          {calcResult.result.toLocaleString()} <span className="text-sm font-normal text-blue-300">{calcResult.unit}</span>
                        </span>
                        <div className="pt-2 border-t border-blue-500/20 text-[11px] font-mono text-slate-300 whitespace-pre-line">
                          {calcResult.steps}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      // TAB 9: 174. SHIP DESIGN DRAWING LIBRARY
      // ====================================================================
      {activeTab === 'drawings' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Box className="w-5 h-5 text-orange-400" />
                Ship Design Drawing & 3D Model Repository (#174)
              </h3>
              <p className="text-xs text-slate-400">
                General Arrangement (GA) plans, lines plans, structural midship sections, P&ID piping diagrams, and 3D STEP CAD models.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {drawings.map(d => (
                <div key={d.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-32 bg-slate-900 rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
                      <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px] font-mono font-bold w-fit border border-orange-500/30">
                        {d.drawingType}
                      </span>
                      <span className="text-xs font-mono text-slate-400">Scale: {d.scale} • {d.format}</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">{d.title}</h4>
                    <p className="text-xs text-slate-400 font-medium">{d.designer}</p>
                    <p className="text-xs text-slate-300">{d.description}</p>
                  </div>

                  <button
                    onClick={() => setActiveDrawingModal(d)}
                    className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 mt-2"
                  >
                    <Eye className="w-3.5 h-3.5" /> View CAD / Drawing Sheet
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      // TAB 10: MY BOOKSHELF & NOTES
      // ====================================================================
      {activeTab === 'my_bookshelf' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-indigo-400" />
                  Personal Bookshelf & Collaborative Notes
                </h3>
                <p className="text-xs text-slate-400">
                  Your bookmarked publications, personal annotations, highlights, and offline access cache.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Institutional Access Verified
              </span>
            </div>

            <div className="space-y-4">
              {books
                .filter(b => savedBooks.includes(b.id))
                .map(b => (
                  <div key={b.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-white text-base">{b.title}</h4>
                      <button
                        onClick={() => toggleSaveBook(b.id)}
                        className="text-xs text-rose-400 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-xs text-slate-400">{b.authors} • ISBN: {b.isbn}</p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      <label className="text-[11px] font-bold text-indigo-300 block">Personal Study Notes & Annotations:</label>
                      <textarea
                        value={userNotes[b.id] || ''}
                        onChange={e => setUserNotes(prev => ({ ...prev, [b.id]: e.target.value }))}
                        placeholder="Add your study notes, key equation references, or chapter annotations..."
                        className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      // READER / PREVIEW MODALS
      // ====================================================================
      {activeBookModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveBookModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                {activeBookModal.category}
              </span>
              <h2 className="text-xl font-black text-white">{activeBookModal.title}</h2>
              <p className="text-xs text-slate-400">By {activeBookModal.authors} ({activeBookModal.year}) • {activeBookModal.pages} Pages</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-cyan-300 uppercase tracking-wider block">Executive Summary:</span>
              <p className="text-slate-300 leading-relaxed">{activeBookModal.summary}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">Table of Contents:</span>
              <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                {activeBookModal.tableOfContents.map((ch, idx) => (
                  <li key={idx} className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span>{ch}</span>
                    <span className="text-[10px] text-cyan-400">Read Ch</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setActiveBookModal(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO PLAYER MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-4xl w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-black text-white">{activeVideoModal.title}</h2>

            <div className="aspect-video bg-black rounded-2xl border border-slate-800 flex items-center justify-center relative">
              <div className="text-center space-y-2">
                <Play className="w-16 h-16 text-rose-500 fill-rose-500/30 mx-auto animate-pulse" />
                <p className="text-xs text-slate-400 font-mono">Simulated HD Lecture Stream ({activeVideoModal.duration})</p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-rose-300 block">Lecture Chapters:</span>
              <div className="flex flex-wrap gap-2 font-mono">
                {activeVideoModal.chapters.map(c => (
                  <span key={c} className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DRAWING / CAD MODAL */}
      {activeDrawingModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-4xl w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setActiveDrawingModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-black text-white">{activeDrawingModal.title}</h2>

            <div className="h-80 bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
              <Box className="w-16 h-16 text-orange-400 animate-bounce" />
              <div>
                <p className="font-bold text-white text-sm">Interactive CAD Vector Sheet Preview</p>
                <p className="text-xs text-slate-400 font-mono">Scale {activeDrawingModal.scale} • {activeDrawingModal.designer}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300">{activeDrawingModal.description}</p>
          </div>
        </div>
      )}

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
