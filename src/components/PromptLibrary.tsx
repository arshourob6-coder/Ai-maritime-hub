import React, { useState, useEffect } from 'react';
import {
  BookMarked,
  Search,
  Filter,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Star,
  Users,
  Terminal,
  Zap,
  Bookmark,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  SlidersHorizontal,
  Ship,
  Info,
  ArrowRight,
  TrendingUp,
  Award,
  Lock,
  Crown,
  CreditCard
} from 'lucide-react';
import { ViewMode, Currency, PlanType } from '../types';
import { CheckoutModal } from './CheckoutModal';
import { ALL_MARITIME_PROMPTS } from '../data/maritimePromptsData';

export interface MaritimePrompt {
  id: string;
  title: string;
  category: 'Naval Architecture' | 'IMO & SOLAS' | 'Port Operations' | 'Engine & Machinery' | 'Offshore & Mooring' | 'Ship Recycling & IHM' | 'Maritime Research' | 'Cargo Handling & Tankers' | 'Autonomous Vessels & Digital Twins';
  targetRole: 'Naval Architect' | 'Marine Engineer' | 'Port Manager' | 'SOLAS Auditor' | 'Academic Researcher';
  description: string;
  fullPrompt: string;
  variables: string[];
  successRate: number;
  copyCount: number;
  bookmarkCount: number;
  author: string;
  isVerified: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  tags: string[];
  isPro?: boolean;
}

const INITIAL_PROMPTS: MaritimePrompt[] = ALL_MARITIME_PROMPTS;
/* LEGACY ITEMS UNUSED */
/*
  {
    id: 'p-1',
    title: 'Holtrop & Mennen Resistance & Effective Power Calculation',
    category: 'Naval Architecture',
    targetRole: 'Naval Architect',
    description: 'Generates step-by-step Holtrop & Mennen empirical method equations for ship resistance, Froude number, form factor (1+k), and required shaft power.',
    fullPrompt: `You are an expert Naval Architect specializing in hydrodynamics and ship resistance.
Perform a Holtrop & Mennen resistance analysis for a ship with the following parameters:
- Vessel Type: [Vessel Type, e.g. Container Vessel / Bulk Carrier]
- Length Between Perpendiculars (LBP): [Length BP in meters] m
- Beam (B): [Beam in meters] m
- Draft (T): [Draft in meters] m
- Displacement (D): [Displacement in tonnes] t
- Service Speed (V): [Speed in knots] knots
- Block Coefficient (Cb): [Block Coefficient]

Output:
1. Speed conversion to m/s and Froude Number (Fn).
2. Frictional resistance coefficient (Cf) according to ITTC 1957 line.
3. Form factor (1+k1) estimation based on hull geometry ratio (B/T, L/B).
4. Wave-making resistance coefficient (Cw) and Total Resistance (Rt) in kN.
5. Effective Power (PE in kW) and required Shaft Power (PS in kW) assuming propulsive efficiency (eta_d = 0.68).
Provide clear mathematical steps and verification against standard DNV/GL benchmarks.`,
    variables: ['Vessel Type', 'Length BP', 'Beam', 'Draft', 'Displacement', 'Speed'],
    successRate: 99.2,
    copyCount: 1420,
    bookmarkCount: 680,
    author: 'DNV Hydrodynamics Guild',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Holtrop', 'Resistance', 'Powering', 'CFD', 'Naval Arch']
  },
  {
    id: 'p-2',
    title: 'GZ Curve & Intact Stability Assessment (IMO IS Code 2008)',
    category: 'Naval Architecture',
    targetRole: 'Naval Architect',
    description: 'Evaluates intact stability criteria against IMO 2008 IS Code Resolution MSC.267(85) including area under GZ curve, initial GM, and maximum GZ angle.',
    fullPrompt: `Act as a Senior Marine Surveyor and Naval Architect. Evaluate the intact stability for a vessel under IMO 2008 IS Code (Resolution MSC.267(85) Part A Chapter 2).

Input Data:
- Ship Name/ID: [Ship Name / IMO Number]
- Lightship KG: [KG in meters] m
- Displacement: [Displacement in tonnes] t
- Initial GM (Metacentric Height): [GM in meters] m
- GZ values at angles [10°, 20°, 30°, 40°, 50°, 60°]: [List GZ values in meters]

Task:
1. Verify if Area under GZ curve up to 30° >= 0.055 m-rad.
2. Verify Area under GZ curve up to 40° >= 0.090 m-rad.
3. Verify Area between 30° and 40° >= 0.030 m-rad.
4. Verify Maximum GZ occurs at angle >= 25° and Maximum GZ >= 0.20 m.
5. Check Initial GM_0 >= 0.15 m.
Format output as an official Class Approval Summary Table with PASS/FAIL status for each criterion.`,
    variables: ['Ship Name', 'Lightship KG', 'Displacement', 'Initial GM', 'GZ Values'],
    successRate: 98.7,
    copyCount: 1150,
    bookmarkCount: 520,
    author: 'IMO Technical Working Group',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['IMO IS Code', 'GZ Curve', 'Stability', 'SOLAS', 'Surveyor']
  },
  {
    id: 'p-3',
    title: 'EEXI & CII Fleet Decarbonization Optimization Plan',
    category: 'IMO & SOLAS',
    targetRole: 'SOLAS Auditor',
    description: 'Formulates an actionable Energy Efficiency Existing Ship Index (EEXI) and Carbon Intensity Indicator (CII) rating improvement plan for commercial fleets.',
    fullPrompt: `You are an IMO Decarbonization Consultant & Marine Energy Specialist.
Create an EEXI and CII compliance and improvement strategy for:
- Vessel Name: [Vessel Name]
- Vessel Type: [Container / Bulk / Tanker]
- DWT / GT: [Deadweight Tonnage or Gross Tonnage]
- Main Engine MCR: [Main Engine Power in kW] kW
- Current Attained EEXI: [Current EEXI value] gCO2/t-nm
- Required EEXI: [Required EEXI value] gCO2/t-nm
- Current CII Annual Rating: [Current Rating A/B/C/D/E]

Analyze and recommend:
1. Engine Power Limitation (EPL) / Shaft Power Limitation (SHaPoLi) requirements in % MCR reduction.
2. Energy Efficiency Technologies (EETs) suitability (e.g., ALS Air Lubrication, Flettner Rotors, ESD Duct, Hull Silicone Coating).
3. Operational speed reduction impact on annual CII trajectory through 2030.
4. Estimated CAPEX, OPEX reduction, and fuel savings per nautical mile.`,
    variables: ['Vessel Name', 'Vessel Type', 'DWT/GT', 'Engine MCR', 'Attained EEXI', 'Required EEXI'],
    successRate: 99.5,
    copyCount: 1890,
    bookmarkCount: 940,
    author: 'Global Maritime Energy Council',
    isVerified: true,
    difficulty: 'Intermediate',
    tags: ['EEXI', 'CII', 'MARPOL', 'Decarbonization', 'IMO 2030']
  },
  {
    id: 'p-4',
    title: 'SOLAS Ch II-2 Battery-Hybrid Vessel Fire Risk Assessment',
    category: 'IMO & SOLAS',
    targetRole: 'SOLAS Auditor',
    description: 'Conducts a detailed hazard and operability (HAZID) audit for lithium-ion battery energy storage systems (BESS) installed on hybrid vessels.',
    fullPrompt: `You are a Chief SOLAS Fire Safety Auditor and Class Inspector.
Conduct a SOLAS Chapter II-2 hazard analysis for a vessel installing a Lithium-ion Battery Energy Storage System (BESS):
- Battery Capacity: [Capacity in kWh/MWh] MWh
- Battery Chemistry: [NMC / LFP]
- Location on Board: [Battery Room Location]

Tasks:
1. Thermal Runaway Mitigation: Review off-gas detection (CO / H2 sensors) and early warning protocols.
2. Fire Extinguishing System Assessment: Compare Novec 1230 / FK-5-1-12 gas flooding vs high-pressure water mist for battery space inerting and cooling.
3. Structural Fire Protection (A-60 insulation) boundaries adjacent to accommodation and machinery spaces.
4. ISM Emergency Response Procedures and crew training guidelines.`,
    variables: ['Battery Capacity', 'Battery Chemistry', 'Location on Board'],
    successRate: 97.9,
    copyCount: 880,
    bookmarkCount: 410,
    author: 'Lloyds Register Safety Panel',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['SOLAS', 'BESS', 'Fire Safety', 'Hybrid Ship', 'Class Rules']
  },
  {
    id: 'p-5',
    title: 'Quay Crane Allocation & Container Terminal Queueing Optimization',
    category: 'Port Operations',
    targetRole: 'Port Manager',
    description: 'Applies operations research and queueing theory to optimize berth allocation, quay crane intensity (QCs per vessel), and container turn-around times.',
    fullPrompt: `Act as a Senior Container Terminal Logistics & Port Operations Director.
Optimize quay crane allocation and vessel turnaround for an incoming container vessel:
- Vessel Name: [Vessel Name]
- Vessel Capacity: [TEU Capacity] TEU
- Inbound Move Count (Discharge/Load): [Total Container Moves] moves
- Target Window / ETA-ETD: [Turnaround hours] hours
- Available Quay Cranes (QC): [Total QCs available at berth]

Provide:
1. Optimal Quay Crane Split (Gross Moves Per Hour per crane, e.g. 28-32 mph).
2. Yard Truck / AGV requirement ratio per Quay Crane to eliminate crane waiting time.
3. Yard Block Stacking Strategy (Import/Export separation to avoid re-handling).
4. Contingency mitigation for berth congestion and vessel arrival delays.`,
    variables: ['Vessel Name', 'TEU Capacity', 'Total Moves', 'Turnaround Hours', 'Available QCs'],
    successRate: 98.4,
    copyCount: 1040,
    bookmarkCount: 490,
    author: 'Port Analytics Institute',
    isVerified: true,
    difficulty: 'Intermediate',
    tags: ['Port Operations', 'Quay Crane', 'Container Yard', 'Queueing', 'Logistics']
  },
  {
    id: 'p-6',
    title: '2-Stroke Dual-Fuel Engine Methane Slip & Combustion Analysis',
    category: 'Engine & Machinery',
    targetRole: 'Marine Engineer',
    description: 'Diagnoses low-pressure dual-fuel (Otto cycle) engine combustion anomalies, methane slip formation, and exhaust gas recirculation (EGR) tuning.',
    fullPrompt: `You are a Chief Marine Engineer and MAN Energy Solutions / WinGD Engine Specialist.
Analyze performance parameters for a 2-stroke low-pressure dual-fuel LNG main engine:
- Engine Model: [e.g. MAN B&W ME-GI or WinGD X-DF]
- Load Percentage: [Engine Load %] % MCR
- LNG Pilot Diesel Injection Timing: [Angle relative to TDC]
- Exhaust Gas Temperature Range: [Temperature in °C] °C
- Observed Methane Slip Level: [g/kWh]

Formulate:
1. Root cause analysis for elevated methane slip or unburned hydrocarbon (THC) emissions.
2. Fuel gas injection pressure and pilot fuel ratio adjustments.
3. Scavenge air pressure & temperature optimization to eliminate knock/pre-ignition.
4. Maintenance checklist for gas admission valves (GAV) and igniters.`,
    variables: ['Engine Model', 'Load %', 'Pilot Injection Angle', 'Exhaust Temp', 'Methane Slip'],
    successRate: 99.1,
    copyCount: 1210,
    bookmarkCount: 580,
    author: 'Chief Engineers Guild',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Dual Fuel', 'LNG Engine', 'Methane Slip', 'Marine Machinery', 'WinGD']
  },
  {
    id: 'p-7',
    title: 'CALM Buoy Mooring Line Tension & Catenary Line Calculation',
    category: 'Offshore & Mooring',
    targetRole: 'Naval Architect',
    description: 'Calculates catenary line profile, touchdown point, horizontal tension, and maximum line load for Catenary Anchor Leg Mooring (CALM) buoys.',
    fullPrompt: `You are a Senior Offshore Mooring Engineer specializing in FPSO and CALM Buoy SPM systems.
Calculate catenary mooring dynamics for a single anchor line:
- Mooring Line Type: [Studless Chain / Polyester Wire]
- Water Depth (d): [Depth in meters] m
- Pre-tension (Th): [Horizontal Pretension in kN] kN
- Unit Mass of Line in Water (w): [kg/m or kN/m]
- Design Environmental Loads: [100-year Wave Height Hs, Wind Speed, Current]

Outputs required:
1. Total line length required to avoid uplift at the anchor.
2. Touchdown point location relative to the buoy center.
3. Maximum line tension at the fairlead (Tmax) under extreme offset.
4. Safety factors verification against API RP 2SK guidelines.`,
    variables: ['Mooring Line Type', 'Water Depth', 'Pre-tension', 'Line Unit Mass', 'Design Loads'],
    successRate: 98.2,
    copyCount: 760,
    bookmarkCount: 380,
    author: 'Offshore Technology Conference',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Offshore', 'CALM Buoy', 'Mooring', 'Catenary', 'API RP 2SK']
  },
  {
    id: 'p-8',
    title: 'Ship Recycling Inventory of Hazardous Materials (IHM) Audit',
    category: 'Ship Recycling & IHM',
    targetRole: 'SOLAS Auditor',
    description: 'Guides HazMat experts through Hong Kong Convention & EU Ship Recycling Regulation (EU SRR) Part I, II, and III IHM sampling and documentation.',
    fullPrompt: `Act as an IMO Certified IHM HazMat Expert and Ship Recycling Auditor.
Prepare an Inventory of Hazardous Materials (IHM) inspection protocol for:
- Vessel Name: [Vessel Name]
- Year Built: [Year Built]
- Shipyard of Origin: [Shipyard Name & Country]

Outline:
1. Sampling plan for Asbestos, Ozone Depleting Substances (ODS), PCB, TBT antifouling paints, and Heavy Metals.
2. Visual / Sampling Check Plan (VSCP) preparation for machinery spaces and pipe insulation.
3. Formulating the Material Declaration (MD) and Supplier's Declaration of Conformity (SDoC).
4. Generating the final IHM Part I report for Class Statement of Compliance.`,
    variables: ['Vessel Name', 'Year Built', 'Shipyard Name'],
    successRate: 99.0,
    copyCount: 620,
    bookmarkCount: 290,
    author: 'Green Recycling Association',
    isVerified: true,
    difficulty: 'Intermediate',
    tags: ['IHM', 'Hong Kong Convention', 'EU SRR', 'HazMat', 'Ship Recycling']
  },
  {
    id: 'p-9',
    title: 'Master Hydrodynamic Hull Mesh & CFD OpenFOAM Case Setup',
    category: 'Naval Architecture',
    targetRole: 'Naval Architect',
    description: 'PRO MASTER BLUEPRINT: Automated OpenFOAM boundary conditions, snappyHexMesh dict generation, and y+ boundary layer thickness calculation.',
    fullPrompt: `Act as a Senior Hydrodynamic CFD Specialist and OpenFOAM Engineer.
Generate an automated OpenFOAM case structure and mesh configuration for ship hull resistance:
- Hull Surface File: [IGES / STL geometry name]
- Design Velocity: [Velocity in m/s] m/s
- Desired Wall Y+ Target: [Target Y+ e.g. 30 or 1.0]

Output:
1. First cell height calculation (y_1) based on ITTC skin friction line and Reynolds Number.
2. Complete snappyHexMeshDict refinement surface and feature edge specifications.
3. fvSchemes & fvSolution settings for interFoam VOF solver with wave damping boundary conditions.
4. Shell script to execute blockMesh, surfaceFeatureExtract, snappyHexMesh, and potentialFoam initialization.`,
    variables: ['STL File Name', 'Design Velocity', 'Target Y+'],
    successRate: 99.8,
    copyCount: 2150,
    bookmarkCount: 1040,
    author: 'DNV Hydrodynamics Guild',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['CFD', 'OpenFOAM', 'Hull Mesh', 'Hydrodynamics', 'Pro Master'],
    isPro: true
  },
  {
    id: 'p-10',
    title: 'Deep SOLAS Ch II-2 Hazardous Gas & Ammonia Bunkering Audit Matrix',
    category: 'IMO & SOLAS',
    targetRole: 'SOLAS Auditor',
    description: 'PRO MASTER BLUEPRINT: Comprehensive IGF Code audit protocol for ammonia, methanol, and liquid hydrogen bunkering systems.',
    fullPrompt: `Act as an IMO IGF Code Lead Inspector and Class Certification Director.
Prepare a complete safety audit matrix for an alternative fuel bunkering manifold:
- Fuel Type: [Ammonia / Methanol / Hydrogen]
- Bunkering Rate: [m3/hr]
- ESD (Emergency Shut Down) System Protocols: [IGF Code Sec 11]

Deliverables:
1. Hazardous zone classification (Zone 0, Zone 1, Zone 2) surrounding bunkering manifold & vent mast.
2. Gas detection sensor placement matrix, double-walled piping leakage alarm response, and inert purging sequence.
3. Fire fighting medium requirements (Water spray curtain, dry chemical powder, CO2 total flooding).
4. Class Compliance Audit Certificate checklist format.`,
    variables: ['Fuel Type', 'Bunkering Rate', 'ESD System Protocols'],
    successRate: 99.6,
    copyCount: 1780,
    bookmarkCount: 890,
    author: 'IMO IGF Code Bureau',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['SOLAS', 'IGF Code', 'Ammonia Bunkering', 'HazMat', 'Pro Master'],
    isPro: true
  }
];
*/

interface PromptLibraryProps {
  isAdminView?: boolean;
  onSelectPromptForChat?: (promptText: string) => void;
  onNavigateView?: (view: ViewMode) => void;
  currency?: Currency;
}

export const PromptLibrary: React.FC<PromptLibraryProps> = ({
  isAdminView = false,
  onSelectPromptForChat,
  onNavigateView,
  currency = 'USD'
}) => {
  const [prompts, setPrompts] = useState<MaritimePrompt[]>(() => {
    const saved = localStorage.getItem('maritime_prompt_library');
    return saved ? JSON.parse(saved) : INITIAL_PROMPTS;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('maritime_bookmarked_prompts');
    return saved ? JSON.parse(saved) : ['p-1', 'p-3', 'p-9'];
  });

  // Pro Pass unlock state
  const [isProUnlocked, setIsProUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('prompt_library_pro_unlocked') === 'true';
  });

  // Checkout modal state for Prompt Library
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutItemTitle, setCheckoutItemTitle] = useState('Prompt Library Pro Access Pass ($12/mo)');
  const [checkoutPrice, setCheckoutPrice] = useState(12);

  const triggerProCheckout = (title?: string, price?: number) => {
    setCheckoutItemTitle(title || 'Prompt Library Pro Access Pass ($12/mo)');
    setCheckoutPrice(price || 12);
    setCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setIsProUnlocked(true);
    localStorage.setItem('prompt_library_pro_unlocked', 'true');
    setCheckoutOpen(false);
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);

  const [activePromptModal, setActivePromptModal] = useState<MaritimePrompt | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [paramValues, setParamValues] = useState<{ [key: string]: string }>({});

  // Admin Modal state for adding a new prompt
  const [showAddPromptModal, setShowAddPromptModal] = useState(false);
  const [newPromptTitle, setNewPromptTitle] = useState('');
  const [newPromptCategory, setNewPromptCategory] = useState<MaritimePrompt['category']>('Naval Architecture');
  const [newPromptRole, setNewPromptRole] = useState<MaritimePrompt['targetRole']>('Naval Architect');
  const [newPromptDesc, setNewPromptDesc] = useState('');
  const [newPromptText, setNewPromptText] = useState('');
  const [newPromptVars, setNewPromptVars] = useState('');
  const [newPromptDifficulty, setNewPromptDifficulty] = useState<MaritimePrompt['difficulty']>('Intermediate');

  useEffect(() => {
    localStorage.setItem('maritime_prompt_library', JSON.stringify(prompts));
  }, [prompts]);

  useEffect(() => {
    localStorage.setItem('maritime_bookmarked_prompts', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarks((prev) => {
      const isBookmarked = prev.includes(id);
      const updated = isBookmarked ? prev.filter((item) => item !== id) : [...prev, id];
      
      // Update bookmark count in state
      setPrompts((pList) =>
        pList.map((p) =>
          p.id === id ? { ...p, bookmarkCount: p.bookmarkCount + (isBookmarked ? -1 : 1) } : p
        )
      );
      return updated;
    });
  };

  const copyToClipboard = (text: string, promptId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(promptId);

    // Increment copy count
    setPrompts((prev) =>
      prev.map((p) => (p.id === promptId ? { ...p, copyCount: p.copyCount + 1 } : p))
    );

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleAddNewPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromptTitle.trim() || !newPromptText.trim()) return;

    const varsArray = newPromptVars
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    const newPrompt: MaritimePrompt = {
      id: `p-${Date.now()}`,
      title: newPromptTitle,
      category: newPromptCategory,
      targetRole: newPromptRole,
      description: newPromptDesc,
      fullPrompt: newPromptText,
      variables: varsArray.length > 0 ? varsArray : ['Vessel Name'],
      successRate: 99.0,
      copyCount: 0,
      bookmarkCount: 0,
      author: 'Admin Master Engineer',
      isVerified: true,
      difficulty: newPromptDifficulty,
      tags: [newPromptCategory, newPromptRole, 'Verified Prompt']
    };

    setPrompts([newPrompt, ...prompts]);
    setShowAddPromptModal(false);
    
    // Reset form
    setNewPromptTitle('');
    setNewPromptDesc('');
    setNewPromptText('');
    setNewPromptVars('');
  };

  const handleDeletePrompt = (id: string) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id));
    if (activePromptModal?.id === id) setActivePromptModal(null);
  };

  // Substitute variables in prompt template
  const getSubstitutedPrompt = (prompt: MaritimePrompt) => {
    let result = prompt.fullPrompt;
    prompt.variables.forEach((v) => {
      if (paramValues[v] && paramValues[v].trim()) {
        const regex = new RegExp(`\\[${v}[^\\]]*\\]`, 'gi');
        result = result.replace(regex, paramValues[v]);
      }
    });
    return result;
  };

  // Filter Prompts
  const filteredPrompts = prompts.filter((p) => {
    if (onlyBookmarks && !bookmarks.includes(p.id)) return false;
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedRole !== 'All' && p.targetRole !== selectedRole) return false;
    if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchContent = p.fullPrompt.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchContent && !matchTags) return false;
    }
    return true;
  });

  const categories = ['All', 'Naval Architecture', 'IMO & SOLAS', 'Port Operations', 'Engine & Machinery', 'Offshore & Mooring', 'Ship Recycling & IHM', 'Maritime Research'];
  const roles = ['All', 'Naval Architect', 'Marine Engineer', 'Port Manager', 'SOLAS Auditor', 'Academic Researcher'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Verified Engineering Prompt Library
              </span>
              {isAdminView && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  Admin Control Mode
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Maritime AI Prompt Gallery & Engineering Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Access 100+ peer-reviewed, Class-compliant AI system prompts optimized for Gemini 3.6 Flash. Instantly copy, customize variables, bookmark favorites, or launch directly into AI Chat.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isProUnlocked ? (
              <div className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5 shadow-lg">
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Pro Pass Active</span>
              </div>
            ) : (
              <button
                onClick={() => triggerProCheckout('Prompt Library Pro Access Pass ($12/mo)', 12)}
                className="px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 via-sky-500 to-blue-600 hover:from-amber-400 hover:to-blue-400 text-slate-950 shadow-lg shadow-amber-500/25 transition flex items-center gap-2 cursor-pointer"
              >
                <Crown className="w-4 h-4 text-slate-950" />
                <span>Unlock Pro Prompts ($12/mo)</span>
              </button>
            )}

            <button
              onClick={() => setOnlyBookmarks(!onlyBookmarks)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg border ${
                onlyBookmarks
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold'
                  : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:text-white hover:border-sky-500/50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${onlyBookmarks ? 'fill-slate-950' : 'text-amber-400'}`} />
              <span>Bookmarked ({bookmarks.length})</span>
            </button>

            {isAdminView && (
              <button
                onClick={() => setShowAddPromptModal(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 transition flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Prompt</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Analytics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20">
              <BookMarked className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Total Verified Prompts</span>
              <span className="font-bold text-white text-sm font-mono">{prompts.length} Prompts</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Avg Accuracy Score</span>
              <span className="font-bold text-emerald-400 text-sm font-mono">98.9% Success</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Community Copy Count</span>
              <span className="font-bold text-amber-300 text-sm font-mono">
                {prompts.reduce((acc, p) => acc + p.copyCount, 0).toLocaleString()} Copies
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Class Compliance</span>
              <span className="font-bold text-purple-300 text-sm font-mono">DNV / SOLAS / ABS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by keywords, Holtrop, GZ curve, EEXI, SOLAS, WinGD engine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="All">All Target Roles</option>
              {roles.filter((r) => r !== 'All').map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-sky-400" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition border ${
                selectedCategory === cat
                  ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Cards Grid */}
      {filteredPrompts.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 p-12 rounded-2xl text-center space-y-3">
          <Info className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No Maritime Prompts Found</h3>
          <p className="text-xs text-slate-400">Try adjusting your search query, clearing filters, or unchecking Bookmarks.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedRole('All');
              setOnlyBookmarks(false);
            }}
            className="px-4 py-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold rounded-xl hover:bg-sky-500/30 transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => {
            const isBookmarked = bookmarks.includes(prompt.id);
            const isJustCopied = copiedId === prompt.id;

            return (
              <div
                key={prompt.id}
                onClick={() => {
                  setActivePromptModal(prompt);
                  setParamValues({});
                }}
                className="bg-slate-900/90 border border-slate-800/90 hover:border-sky-500/50 rounded-2xl p-5 space-y-4 transition duration-200 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col justify-between cursor-pointer group relative"
              >
                <div className="space-y-3">
                  {/* Top Bar: Category & Bookmark */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-sky-500/15 text-sky-300 border border-sky-500/30">
                        {prompt.category}
                      </span>
                      {prompt.isPro && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                          <Crown className="w-3 h-3 text-amber-300" /> Pro Master
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {prompt.isVerified && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified
                        </span>
                      )}

                      <button
                        onClick={(e) => toggleBookmark(prompt.id, e)}
                        className={`p-1.5 rounded-lg border transition ${
                          isBookmarked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-amber-300'
                        }`}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Prompt'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-300' : ''}`} />
                      </button>

                      {isAdminView && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePrompt(prompt.id);
                          }}
                          className="p-1.5 rounded-lg bg-slate-950 text-slate-400 border border-slate-800 hover:text-rose-400 hover:border-rose-500/40 transition"
                          title="Delete Prompt (Admin)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition line-clamp-2">
                      {prompt.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {prompt.description}
                    </p>
                  </div>

                  {/* Parameters / Variables Pills */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      Customizable Variables ({prompt.variables.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {prompt.variables.map((v) => (
                        <span key={v} className="text-[10px] font-mono px-2 py-0.5 bg-slate-950 text-sky-400 rounded border border-slate-800">
                          [{v}]
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Row */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1 font-mono text-emerald-400 font-bold">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {prompt.successRate}%
                    </span>
                    <span className="font-mono text-slate-400">
                      {prompt.copyCount} copies
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => copyToClipboard(prompt.fullPrompt, prompt.id, e)}
                      className={`px-2.5 py-1.5 rounded-lg font-bold text-[11px] transition flex items-center gap-1.5 border ${
                        isJustCopied
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white hover:border-sky-500/50'
                      }`}
                    >
                      {isJustCopied ? (
                        <>
                          <Check className="w-3 h-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-sky-400" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PROMPT INSPECT & VARIABLE CUSTOMIZER MODAL */}
      {activePromptModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-sky-500/30 rounded-2xl max-w-3xl w-full p-6 space-y-6 shadow-2xl my-8 relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    {activePromptModal.category}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                    Target: {activePromptModal.targetRole}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">{activePromptModal.title}</h2>
                <p className="text-xs text-slate-400 mt-1">{activePromptModal.description}</p>
              </div>

              <button
                onClick={() => setActivePromptModal(null)}
                className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800 text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Variable Parameter Customizer Input Fields */}
            {activePromptModal.variables.length > 0 && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" /> Custom Input Parameters
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Fill in values below to dynamically auto-replace placeholders
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activePromptModal.variables.map((v) => (
                    <div key={v} className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-300 block">
                        {v}:
                      </label>
                      <input
                        type="text"
                        placeholder={`Enter ${v.toLowerCase()}...`}
                        value={paramValues[v] || ''}
                        onChange={(e) =>
                          setParamValues({ ...paramValues, [v]: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Prompt Display Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono flex items-center gap-1 text-slate-300 font-bold">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" /> Gemini System Prompt Template:
                </span>
                <span className="text-[10px] text-slate-500">
                  {getSubstitutedPrompt(activePromptModal).length} characters
                </span>
              </div>

              {activePromptModal.isPro && !isProUnlocked ? (
                <div className="bg-slate-950 border border-amber-500/40 rounded-xl p-6 text-center space-y-3 relative overflow-hidden">
                  <div className="w-10 h-10 bg-amber-500/20 text-amber-300 rounded-full flex items-center justify-center mx-auto border border-amber-400/40">
                    <Crown className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Pro Master Engineering Prompt Locked</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    This verified Class-compliant prompt includes specialized OpenFOAM CFD parameters & SOLAS IGF Code audit schemas. Unlock full access to all Pro Master prompts.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => triggerProCheckout(`Single License: ${activePromptModal.title}`, 5)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-xs transition"
                    >
                      Unlock Single Prompt ($5)
                    </button>
                    <button
                      onClick={() => triggerProCheckout('Prompt Library Pro Access Pass ($12/mo)', 12)}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 via-sky-500 to-blue-600 hover:from-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-lg transition flex items-center gap-1.5"
                    >
                      <Crown className="w-4 h-4 text-slate-950" /> Get Full Pro Access Pass ($12/mo)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed border-l-4 border-l-sky-500">
                  {getSubstitutedPrompt(activePromptModal)}
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {activePromptModal.successRate}% rating
                </span>
                <span>•</span>
                <span>Author: {activePromptModal.author}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => copyToClipboard(getSubstitutedPrompt(activePromptModal), activePromptModal.id)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition flex items-center justify-center gap-2"
                >
                  {copiedId === activePromptModal.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" /> Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-sky-400" /> Copy Formatted Prompt
                    </>
                  )}
                </button>

                {onNavigateView && (
                  <button
                    onClick={() => {
                      const finalPrompt = getSubstitutedPrompt(activePromptModal);
                      if (onSelectPromptForChat) {
                        onSelectPromptForChat(finalPrompt);
                      }
                      onNavigateView('ai_chat');
                      setActivePromptModal(null);
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Run Prompt in AI Chat</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ADMIN ADD PROMPT MODAL */}
      {showAddPromptModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                  <Plus className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Add Verified Engineering Prompt</h3>
              </div>
              <button
                onClick={() => setShowAddPromptModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold p-1"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleAddNewPrompt} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Prompt Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anchor Handling Tug Supply (AHTS) Bollard Pull Calculation"
                  value={newPromptTitle}
                  onChange={(e) => setNewPromptTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Category:</label>
                  <select
                    value={newPromptCategory}
                    onChange={(e) => setNewPromptCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Target Role:</label>
                  <select
                    value={newPromptRole}
                    onChange={(e) => setNewPromptRole(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    {roles.filter((r) => r !== 'All').map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Short Description:</label>
                <input
                  type="text"
                  required
                  placeholder="Brief summary of what this prompt calculates or audits..."
                  value={newPromptDesc}
                  onChange={(e) => setNewPromptDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">
                  Customizable Variable Placeholders (comma-separated):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ship Length, Draft, Engine Power, IMO Number"
                  value={newPromptVars}
                  onChange={(e) => setNewPromptVars(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Full System Prompt Content:</label>
                <textarea
                  rows={6}
                  required
                  placeholder="You are an expert... Instructions, equations, outputs..."
                  value={newPromptText}
                  onChange={(e) => setNewPromptText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono focus:outline-none focus:border-purple-500 leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPromptModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg transition"
                >
                  Publish Prompt to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL FOR PROMPT LIBRARY */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        selectedPlan="digital_item"
        itemTitle={checkoutItemTitle}
        priceUSD={checkoutPrice}
        currency={currency}
        onSuccess={handleCheckoutSuccess}
      />

    </div>
  );
};
