import { MaritimePrompt } from '../components/PromptLibrary';

export const PROMPTS_BATCH_1: MaritimePrompt[] = [
  {
    id: 'p-1',
    title: 'Holtrop & Mennen Resistance & Effective Power Calculation',
    category: 'Naval Architecture',
    targetRole: 'Naval Architect',
    description: 'Generates step-by-step Holtrop & Mennen empirical equations for ship resistance, Froude number, form factor (1+k), and required shaft power.',
    fullPrompt: `You are an expert Naval Architect specializing in hydrodynamics and ship resistance.
Perform a Holtrop & Mennen resistance analysis for a ship with the following parameters:
- Vessel Type: [Vessel Type, e.g. Container Vessel / Bulk Carrier]
- Length Between Perpendiculars (LBP): [Length BP in meters] m
- Breadth (B): [Breadth in meters] m
- Draft (T): [Draft in meters] m
- Displacement Volume (\nabla): [Volume in m3] m3
- Service Speed (V): [Speed in knots] knots
- Stern Type: [e.g. Normal section / Transom / Bulbous]

Calculate:
1. Froude Number (Fn) and Reynolds Number (Rn)
2. ITTC 1957 Friction Coefficient (Cf) and Form Factor (1+k)
3. Wave Resistance (Cw) and Bulbous Bow Resistance (Rb)
4. Total Bare Hull Resistance (Rt) and Effective Power (Pe in kW)
Provide step-by-step equations and LaTeX formatted output.`,
    variables: ['Vessel Type', 'Length BP', 'Breadth', 'Draft', 'Displacement', 'Service Speed', 'Stern Type'],
    successRate: 99.4,
    copyCount: 1840,
    bookmarkCount: 920,
    author: 'Chief Naval Architect AI',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Hydrodynamics', 'Holtrop-Mennen', 'Resistance', 'Powering', 'Naval Arch']
  },
  {
    id: 'p-2',
    title: 'IMO Resolution MEPC.335(76) Shaft Power Limitation (SHaPoLi)',
    category: 'IMO & SOLAS',
    targetRole: 'SOLAS Auditor',
    description: 'Generates compliance documentation and technical calculations for Engine/Shaft Power Limitation (EPL/SHaPoLi) under EEXI rules.',
    fullPrompt: `Act as a Class Surveyor and Marine Energy Efficiency Auditor.
Draft a Technical File for Shaft Power Limitation (SHaPoLi) installation under IMO MEPC.335(76):
- Vessel Name & IMO Number: [Vessel Name & IMO]
- MCR of Main Engine: [MCR in kW] kW at [RPM] RPM
- Required Limited Power (P_limited): [Limited Power in kW] kW
- Override System Type: [Mechanical Stop / Electronic Limit / Governor Override]

Output Requirements:
1. SHaPoLi Override Mechanism description complying with MEPC.335(76).
2. Unlocking and Emergency Power Release logging protocol.
3. Onboard Management Manual (OMM) outline for Class approval.
4. Calculation of percentage power reduction and predicted EEXI improvement.`,
    variables: ['Vessel Name & IMO', 'MCR of Main Engine', 'Required Limited Power', 'Override System Type'],
    successRate: 98.7,
    copyCount: 1420,
    bookmarkCount: 680,
    author: 'DNV Compliance Specialist',
    isVerified: true,
    difficulty: 'Intermediate',
    tags: ['IMO', 'MEPC', 'SHaPoLi', 'EEXI', 'EPL', 'MARPOL']
  },
  {
    id: 'p-3',
    title: 'Container Vessel Lashing & Stack Weight Optimization',
    category: 'Port Operations',
    targetRole: 'Port Manager',
    description: 'Optimizes container stowage plan lashing forces, transverse acceleration, and maximum stack weight under DNV/Lloyds register rules.',
    fullPrompt: `You are a Senior Port Cargo Operations Officer and Cargo Securing Specialist.
Analyze container lashing forces for a 14,000 TEU container ship under heavy sea conditions:
- Bay Location: [Bay Number, e.g. Bay 42 On-Deck]
- Stack Height: [Number of Tiers, e.g. 7 Tiers]
- Maximum Tier Weight Profile: [Weight per tier from top to bottom in metric tonnes]
- Metacentric Height (GM): [GM in meters] m
- Roll Angle & Period: [Roll angle in deg, Period in sec]

Tasks:
1. Compute racking force at lowest tier container corners.
2. Verify lashing rod tension against breaking load limit (BL).
3. Check corner post compression forces under combined gravity and inertial acceleration.
4. Recommend weight distribution adjustments to satisfy Class securing criteria.`,
    variables: ['Bay Number', 'Number of Tiers', 'Weight Profile', 'GM', 'Roll Angle & Period'],
    successRate: 97.9,
    copyCount: 1150,
    bookmarkCount: 510,
    author: 'Port Logistics Guild',
    isVerified: true,
    difficulty: 'Intermediate',
    tags: ['Container', 'Lashing', 'Stowage', 'Stack Weight', 'Cargo Ops']
  },
  {
    id: 'p-4',
    title: 'Main Engine Cylinder Wear & Lube Oil Feed Rate Diagnostics',
    category: 'Engine & Machinery',
    targetRole: 'Marine Engineer',
    description: 'Diagnoses 2-stroke diesel engine liner wear, scuffing risk, and cold corrosion using sweep test data and iron content in drain oil.',
    fullPrompt: `Act as a Technical Superintendent and MAN B&W / WinGD Engine Specialist.
Analyze the following scavenge drain oil analysis and liner measurement data:
- Engine Model: [Engine Model, e.g. MAN 6S60ME-C9.5]
- Running Hours: [Total Running Hours] hrs
- Cylinder Lube Oil BN: [Base Number, e.g. 40 BN / 100 BN]
- Drain Oil Fe Content (ppm): [Fe concentration in ppm]
- Residual Base Number (BN): [Residual BN in drain oil]
- Fuel Sulfur Content (%): [Sulfur percentage] %

Provide:
1. Diagnosis of liner condition (Cold corrosion vs mechanical abrasive wear vs scuffing).
2. Recommended BN lube oil adjustment and feed rate modification (g/kWh).
3. Recommended Alpha ACC / Load-dependent cylinder lubrication algorithm parameters.
4. Corrective maintenance action plan for Chief Engineer.`,
    variables: ['Engine Model', 'Total Running Hours', 'Cylinder Lube Oil BN', 'Fe Content ppm', 'Residual BN', 'Fuel Sulfur %'],
    successRate: 99.1,
    copyCount: 1630,
    bookmarkCount: 780,
    author: 'Lloyds Superintendent AI',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Engine', '2-Stroke', 'Lube Oil', 'Liner Wear', 'MAN B&W', 'Diagnostics']
  },
  {
    id: 'p-5',
    title: 'Deepwater Catenary Mooring Line Tension & Offset Analysis',
    category: 'Offshore & Mooring',
    targetRole: 'Naval Architect',
    description: 'Calculates catenary curve profile, touchdown point, horizontal tension, and maximum vessel offset for floating offshore structures.',
    fullPrompt: `You are an Offshore Hydrodynamics and Mooring Systems Engineer.
Perform a quasi-static catenary mooring line calculation for an FPSO/SPAR in 800m water depth:
- Water Depth (h): [Water depth in meters] m
- Line Composition: [Chain / Synthetic Rope / Wire Rope combination]
- Line Unit Weight in Water (w): [Weight in kN/m] kN/m
- Pre-tension at Fairlead (T0): [Pre-tension in kN] kN
- Environmental Horizontal Force (Fx): [Force in kN] kN

Determine:
1. Catenary parameter (a = H / w) and horizontal tension component (H).
2. Suspended line length (s) and grounded line length on seabed.
3. Maximum line tension at fairlead under maximum 100-year storm excursion.
4. Factor of Safety against API RP 2SK intact and damaged line criteria.`,
    variables: ['Water Depth', 'Line Composition', 'Line Unit Weight', 'Pre-tension', 'Environmental Force'],
    successRate: 98.2,
    copyCount: 980,
    bookmarkCount: 440,
    author: 'Offshore Tech Lead',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Mooring', 'Offshore', 'Catenary', 'FPSO', 'Deepwater', 'Tension']
  },
  {
    id: 'p-6',
    title: 'Inventory of Hazardous Materials (IHM) Part I Visual Check Plan',
    category: 'Ship Recycling & IHM',
    targetRole: 'SOLAS Auditor',
    description: 'Generates an IHM Visual and Sampling Check Plan (VSCP) in accordance with IMO Resolution MEPC.269(68) and EU SRR.',
    fullPrompt: `Act as a Certified IHM Auditor accredited by Class NK / RINA.
Draft a Visual and Sampling Check Plan (VSCP) for a ship undergoing IHM Part I certification:
- Vessel Type & Age: [Vessel Type & Year Built]
- Gross Tonnage: [GT]
- Key Equipment List: [Main engine, piping insulation, bulkheads, switchboards]

Output:
1. Sampling locations for Asbestos, PCBs, Ozone Depleting Substances (ODS), and Anti-Fouling Paint (TBT).
2. Safety precautions during material sampling on live systems.
3. Standardized IHM Part I Table A and Table B reporting template.
4. Laboratory analysis test protocols (e.g. PLM / SEM for Asbestos).`,
    variables: ['Vessel Type & Age', 'Gross Tonnage', 'Key Equipment List'],
    successRate: 99.0,
    copyCount: 890,
    bookmarkCount: 390,
    author: 'Green Recycling Bureau',
    isVerified: true,
    difficulty: 'Intermediate',
    tags: ['IHM', 'HazMat', 'Ship Recycling', 'HKC', 'EU SRR', 'Asbestos']
  },
  {
    id: 'p-7',
    title: 'OpenFOAM CFD Hull Hydrodynamic Resistance Case Setup',
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
    id: 'p-8',
    title: 'SOLAS Ch II-2 Hazardous Gas & Ammonia Bunkering Audit Matrix',
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
  },
  {
    id: 'p-9',
    title: 'Intact Stability & GZ Curve Analysis (IMO IS Code 2008)',
    category: 'Naval Architecture',
    targetRole: 'Naval Architect',
    description: 'Evaluates GZ curve properties, initial GM0, maximum GZ angle, and dynamic stability under IMO IS Code 2008 criteria.',
    fullPrompt: `Act as a Senior Naval Architect specializing in ship stability and hydrostatic safety.
Evaluate intact stability compliance under IMO IS Code 2008 Part A for the following vessel condition:
- Displacement (\Delta): [Displacement in tonnes] t
- KG (Vertical Center of Gravity): [KG in meters] m
- Hydrostatic Data: Cross curves of stability (KN values) at [10 deg, 20 deg, 30 deg, 40 deg, 50 deg, 60 deg]
- Free Surface Moment Correction (FSM): [FSM in t-m]

Calculate and check:
1. Corrected GM (GM_fluid) after free surface effect.
2. GZ values at each heel angle (GZ = KN - KG * sin(\theta)).
3. Area under GZ curve from 0 to 30 deg, 0 to 40 deg, and 30 to 40 deg.
4. Angle of maximum GZ and initial GM0 against IS Code criteria table.`,
    variables: ['Displacement', 'KG', 'KN Values', 'Free Surface Moment'],
    successRate: 99.2,
    copyCount: 1540,
    bookmarkCount: 720,
    author: 'Hydrostatics Lab',
    isVerified: true,
    difficulty: 'Intermediate',
    tags: ['Stability', 'GZ Curve', 'IMO IS Code', 'Hydrostatics', 'Naval Arch']
  },
  {
    id: 'p-10',
    title: 'Probabilistic Damage Stability Index R & Attained Index A',
    category: 'Naval Architecture',
    targetRole: 'Naval Architect',
    description: 'Calculates SOLAS Chapter II-1 probabilistic damage stability Required Index R and Attained Index A across loading conditions.',
    fullPrompt: `Act as a Lead Naval Architect for Passenger & Cargo Ship Safety.
Perform a SOLAS Ch II-1 Probabilistic Damage Stability calculation:
- Ship Type: [Passenger Ship / Dry Cargo Vessel]
- Subdivision Length (Ls): [Subdivision length in meters] m
- Number of Persons Onboard (N): [Total passengers + crew]
- Loading Conditions: Light Service Draft (dl), Partial Draft (dp), Deepest Subdivision Draft (ds)

Output:
1. Required Subdivision Index R calculation according to SOLAS II-1 Reg 6.
2. Calculation of factor p_i (probability of damage) and factor s_i (survival probability).
3. Attained Subdivision Index A = \sum (v_i * p_i * s_i) formula evaluation.
4. Verification if A \ge R with compliance margin summary.`,
    variables: ['Ship Type', 'Subdivision Length', 'Number of Persons', 'Draft Levels'],
    successRate: 98.5,
    copyCount: 1120,
    bookmarkCount: 530,
    author: 'SOLAS Hydrostatics Guild',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Damage Stability', 'SOLAS', 'Probabilistic', 'Subdivision', 'Naval Arch']
  }
];
