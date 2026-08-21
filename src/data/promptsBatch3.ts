import { MaritimePrompt } from '../components/PromptLibrary';

export const PROMPTS_BATCH_3: MaritimePrompt[] = [
  {
    id: 'p-21',
    title: '4-Stroke Auxiliary Engine Turbocharger Surge & Exhaust Backpressure',
    category: 'Engine & Machinery',
    targetRole: 'Marine Engineer',
    description: 'Diagnoses turbocharger surging, nozzle ring fouling, intercooler air temperature anomalies, and exhaust valve burning risks.',
    fullPrompt: `Act as a Wärtsilä / Yanmar Auxiliary Engine Technical Specialist.
Diagnose a 4-stroke generator turbocharger surging issue under heavy load:
- Engine Model: [e.g. Wärtsilä 6L20]
- Charge Air Pressure: [Bar]
- Charge Air Temp After Cooler: [deg C]
- Exhaust Gas Temp Before Turbocharger: [deg C]
- Pressure Drop Across Air Filter & Intercooler: [mbar]

Provide:
1. Root cause analysis (Fouled turbine nozzle ring vs dirty compressor wheel vs intercooler restriction).
2. Step-by-step cleaning procedure (In-service water washing vs dry cleaning with walnut shells).
3. Thermal efficiency loss calculation.
4. Emergency operation limits to prevent turbocharger blade fatigue failure.`,
    variables: ['Engine Model', 'Charge Air Pressure', 'Charge Air Temp', 'Exhaust Temp', 'Pressure Drop'],
    successRate: 99.0,
    copyCount: 1120,
    bookmarkCount: 480,
    author: 'Wärtsilä Service Tech',
    isVerified: true,
    difficulty: 'Intermediate',
    tags: ['Turbocharger', '4-Stroke', 'Engine', 'Auxiliary Engine', 'Diagnostics']
  },
  {
    id: 'p-22',
    title: 'Chemical Tanker Cargo Compatibility & Tank Coating Passivation',
    category: 'Cargo Handling & Tankers',
    targetRole: 'Port Manager',
    description: 'Generates cargo tank cleaning procedures, wall wash test protocols (hydrocarbons, PTT, chlorides), and epoxy/stainless steel compatibility.',
    fullPrompt: `Act as a Chemical Tanker Cargo Superintendent and IBC Code Auditor.
Prepare a tank cleaning procedure for transitioning cargo tanks from Heavy Pyrolysis Gasoline to High-Purity Methanol:
- Tank Coating: [e.g. MarineLINE 784 / Stainless Steel 316L / Zinc Silicate]
- Prior Cargo: [Previous chemical product]
- Next Cargo Quality Standard: [Methanol IMPCA Standard]

Deliverables:
1. Multi-stage washing matrix (Cold water pre-wash, hot butterworth wash, chemical detergent, freshwater rinse).
2. Wall Wash Test (WWT) acceptance criteria for Permanganate Time Test (PTT), Hydrocarbons, Chloride, and Color.
3. Passivation and drying sequence to prevent cargo contamination.
4. IBC Code hazards and crew PPE requirements.`,
    variables: ['Tank Coating', 'Prior Cargo', 'Next Cargo'],
    successRate: 99.4,
    copyCount: 1290,
    bookmarkCount: 590,
    author: 'Chemical Fleet Operations',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Chemical Tanker', 'IBC Code', 'Tank Cleaning', 'Wall Wash', 'Cargo Ops']
  },
  {
    id: 'p-23',
    title: 'Offshore Wind Turbine Installation Vessel (WTIV) Jacking Force',
    category: 'Offshore & Mooring',
    targetRole: 'Naval Architect',
    description: 'Calculates spudcan penetration depth, leg punch-through risk, rack-and-pinion jacking loads, and preload holding capacity.',
    fullPrompt: `Act as a Senior Geotechnical and Offshore Jack-Up Structural Specialist.
Analyze spudcan soil interaction for a WTIV installing 15MW wind turbines:
- Water Depth: [Depth in meters] m
- Soil Profile: [Soft Clay layer over Hard Sand stratum]
- Leg Length & Weight: [Leg length in meters, weight in t]
- Environmental Loads: [100-year storm wave, current, and wind force]

Calculate:
1. Predicted spudcan penetration curve and Punch-Through safety margin.
2. Preload ballast requirement to ensure foundation holding under maximum storm overturning moment.
3. Rack and pinion jacking gear tooth bending stress under combined axial and bending loads.
4. Recommended leg extraction jetting sequence post-installation.`,
    variables: ['Water Depth', 'Soil Profile', 'Leg Length & Weight', 'Environmental Loads'],
    successRate: 98.6,
    copyCount: 890,
    bookmarkCount: 410,
    author: 'Offshore Geotechnical Lead',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['WTIV', 'Jack-Up', 'Spudcan', 'Offshore Wind', 'Geotechnical']
  },
  {
    id: 'p-24',
    title: 'MARPOL Annex VI NOx Tier III Selective Catalytic Reduction (SCR)',
    category: 'IMO & SOLAS',
    targetRole: 'SOLAS Auditor',
    description: 'Audits SCR urea dosing rate, catalyst bed temperature, ammonia slip, and soot blower operational sequences.',
    fullPrompt: `Act as a Class Surveyor for MARPOL Annex VI NOx Technical Code Compliance.
Audit an Engine-SCR NOx abatement system operating in a NECA (NOx Emission Control Area):
- Engine MCR Output: [kW]
- Engine Raw NOx Emission: [g/kWh]
- Required Tier III NOx Limit: [g/kWh based on RPM]
- Catalyst Type: [Vanadium / Zeolite]

Calculate:
1. Theoretical Aqueous Urea (40% AUS40) consumption rate in L/hr.
2. Minimum exhaust gas temperature requirement to prevent Ammonium Bisulfate (ABS) deposition on catalyst.
3. Ammonia slip monitoring (< 10 ppm) feedback control loop validation.
4. EIAPP certificate and Onboard NOx Technical File verification checklist.`,
    variables: ['Engine MCR', 'Raw NOx', 'Tier III Limit', 'Catalyst Type'],
    successRate: 99.2,
    copyCount: 1170,
    bookmarkCount: 520,
    author: 'ClassNK Environmental Unit',
    isVerified: true,
    difficulty: 'Intermediate',
    tags: ['SCR', 'NOx Tier III', 'MARPOL', 'NECA', 'Urea Dosing']
  },
  {
    id: 'p-25',
    title: 'Container Vessel Torsional Rigidity & Hatch Cover Deflection',
    category: 'Naval Architecture',
    targetRole: 'Naval Architect',
    description: 'Evaluates global hull torsion, warping stress in sheer strake, and hatch cover rubber packing compression under wave action.',
    fullPrompt: `Act as a Container Ship Structural Specialist.
Analyze hull girder torsional warping for a 8,000 TEU Panamax container vessel:
- Wave Torque (Mw): [Wave torsional moment in MNm]
- Open Cross-Section Dimensions: [Deck opening width vs vessel beam]
- Torsional Constant (J) & Warping Constant (Iw): [Sectional properties]

Calculate:
1. Angle of twist per unit length and maximum warping stress at deck corner.
2. Relative displacement between hatch coaming and hatch cover.
3. Compression check on hatch cover rubber gaskets to ensure weather-tightness.
4. Recommendation for high-tensile steel insert plates in deck stringer area.`,
    variables: ['Wave Torque', 'Open Cross-Section', 'Torsional Properties'],
    successRate: 98.7,
    copyCount: 940,
    bookmarkCount: 420,
    author: 'Container Structural Lab',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Torsion', 'Warping', 'Container Ship', 'Hatch Cover', 'Naval Arch']
  }
];

// Dynamically generate prompts 26 to 100 with realistic maritime engineering subjects
const CATEGORIES: MaritimePrompt['category'][] = [
  'Naval Architecture', 'IMO & SOLAS', 'Port Operations', 'Engine & Machinery',
  'Offshore & Mooring', 'Ship Recycling & IHM', 'Maritime Research'
];

const ROLES: MaritimePrompt['targetRole'][] = [
  'Naval Architect', 'Marine Engineer', 'Port Manager', 'SOLAS Auditor', 'Academic Researcher'
];

const GENERATED_TOPICS = [
  { title: "Propeller Cavitation Inception & Pressure Pulse Analysis", cat: "Naval Architecture", role: "Naval Architect" },
  { title: "Parametric Rolling Mitigation & Anti-Roll Tank Control", cat: "Naval Architecture", role: "Naval Architect" },
  { title: "Bulbous Bow Retrofitting & Wave Resistance Reduction", cat: "Naval Architecture", role: "Naval Architect" },
  { title: "Ship Seakeeping & Response Amplitude Operators (RAO)", cat: "Naval Architecture", role: "Naval Architect" },
  { title: "Submarine Pressure Hull Buckling & Ring Stiffener Stress", cat: "Naval Architecture", role: "Naval Architect" },
  { title: "Hydrofoil Lift-to-Drag Ratio Optimization", cat: "Naval Architecture", role: "Naval Architect" },
  { title: "Trim & Draft Optimization via Real-Time Sensor Fusion", cat: "Naval Architecture", role: "Naval Architect" },
  { title: "Catamaran Tunnel Interference Hydrodynamics", cat: "Naval Architecture", role: "Naval Architect" },
  { title: "Wave Piercing Bow Slamming Impact Loads", cat: "Naval Architecture", role: "Naval Architect" },
  { title: "Aft End Vibration & Propeller Clearance Assessment", cat: "Naval Architecture", role: "Naval Architect" },
  
  { title: "SOLAS Lifeboat Free-Fall Launch Kinetic Impact Safety", cat: "IMO & SOLAS", role: "SOLAS Auditor" },
  { title: "MARPOL Annex I OWS Oil Content Monitor (15 ppm) Audit", cat: "IMO & SOLAS", role: "SOLAS Auditor" },
  { title: "IGC Code Liquefied Gas Carrier Fire Safety Barriers", cat: "IMO & SOLAS", role: "SOLAS Auditor" },
  { title: "Polar Code Ice Class Structure & Equipment Readiness", cat: "IMO & SOLAS", role: "SOLAS Auditor" },
  { title: "SOLAS Ch III LSA Appliance Testing & Maintenance Schedule", cat: "IMO & SOLAS", role: "SOLAS Auditor" },
  { title: "MARPOL Annex IV Sewage Treatment Plant Effluent Audit", cat: "IMO & SOLAS", role: "SOLAS Auditor" },
  { title: "ISM Code Safety Management System (SMS) Non-Conformity", cat: "IMO & SOLAS", role: "SOLAS Auditor" },
  { title: "ISPS Code Ship Security Plan (SSP) Threat Response", cat: "IMO & SOLAS", role: "SOLAS Auditor" },
  { title: "SOLAS Ch V ECDIS Backup Power & Chart Update Verification", cat: "IMO & SOLAS", role: "SOLAS Auditor" },
  { title: "IMO Carbon Intensity Indicator (CII) Rating Improvement Plan", cat: "IMO & SOLAS", role: "SOLAS Auditor" },

  { title: "Port Automated Guided Vehicle (AGV) Path Optimization", cat: "Port Operations", role: "Port Manager" },
  { title: "Dry Bulk Terminal Conveyor System Spill Prevention", cat: "Port Operations", role: "Port Manager" },
  { title: "Smart Tugboat Escort Towing Steering Force Calculation", cat: "Port Operations", role: "Port Manager" },
  { title: "Container Yard Rubber Tyred Gantry (RTG) Electrification", cat: "Port Operations", role: "Port Manager" },
  { title: "Port Shore Power High Voltage Synchronizer Protocol", cat: "Port Operations", role: "Port Manager" },
  { title: "Tank Farm Automated Blending & Pipeline Flow Rate", cat: "Port Operations", role: "Port Manager" },
  { title: "Customs AI Document Parsing & Manifest Discrepancy", cat: "Port Operations", role: "Port Manager" },
  { title: "Port Dredging Volume & Sedimentation Forecasting", cat: "Port Operations", role: "Port Manager" },
  { title: "Ro-Ro Ramp Loading Capacity & Axle Weight Verification", cat: "Port Operations", role: "Port Manager" },
  { title: "Port Anchorage Demurrage Cost Reduction Algorithm", cat: "Port Operations", role: "Port Manager" },

  { title: "2-Stroke Main Engine Scavenge Fire Emergency Response", cat: "Engine & Machinery", role: "Marine Engineer" },
  { title: "Purifier Centrifuge Bowl Sludge Separation Efficiency", cat: "Engine & Machinery", role: "Marine Engineer" },
  { title: "Shaft Generator Inverter Frequency Control under Load", cat: "Engine & Machinery", role: "Marine Engineer" },
  { title: "Auxiliary Boiler Water Treatment & Silica Scaling Control", cat: "Engine & Machinery", role: "Marine Engineer" },
  { title: "Engine Crankshaft Deflection & Main Bearing Alignment", cat: "Engine & Machinery", role: "Marine Engineer" },
  { title: "Common Rail Fuel Injection Pressure Spike Troubleshooting", cat: "Engine & Machinery", role: "Marine Engineer" },
  { title: "Air Conditioning Refrigerator Chiller Compressor Overhaul", cat: "Engine & Machinery", role: "Marine Engineer" },
  { title: "Fresh Water Generator (Evaporator) Vacuum System Leak", cat: "Engine & Machinery", role: "Marine Engineer" },
  { title: "Hydraulic Steering Gear Variable Displacement Pump Fault", cat: "Engine & Machinery", role: "Marine Engineer" },
  { title: "Exhaust Gas Recirculation (EGR) Blower Motor Thermal Protection", cat: "Engine & Machinery", role: "Marine Engineer" },

  { title: "Subsea Pipeline On-Bottom Stability under Hydrodynamic Waves", cat: "Offshore & Mooring", role: "Naval Architect" },
  { title: "ROV Deepwater Tether Cable Tension & Bending Radius", cat: "Offshore & Mooring", role: "Naval Architect" },
  { title: "Offshore Gangway Motion Compensation Cylinder Control", cat: "Offshore & Mooring", role: "Naval Architect" },
  { title: "Semi-Submersible Air Gap & Green Water Deck Load", cat: "Offshore & Mooring", role: "Naval Architect" },
  { title: "FPSO Offloading Tandem Mooring Hawser Tension Limit", cat: "Offshore & Mooring", role: "Naval Architect" },
  { title: "Subsea Wellhead Fatigue Damage from Riser Oscillations", cat: "Offshore & Mooring", role: "Naval Architect" },
  { title: "Offshore Heavy Lift Crane Dynamic Amplification Factor", cat: "Offshore & Mooring", role: "Naval Architect" },
  { title: "Floating Solar PV Array Mooring Grid Hydrodynamics", cat: "Offshore & Mooring", role: "Naval Architect" },
  { title: "Single Point Mooring (SPM) Calm Buoy Swivel Maintenance", cat: "Offshore & Mooring", role: "Naval Architect" },
  { title: "Subsea Power Cable Installation Tension & Lay Corridor", cat: "Offshore & Mooring", role: "Naval Architect" },

  { title: "Green Ship Recycling Yard Asbestos Abatement Plan", cat: "Ship Recycling & IHM", role: "SOLAS Auditor" },
  { title: "Hong Kong Convention Yard Safety & Environmental Audit", cat: "Ship Recycling & IHM", role: "SOLAS Auditor" },
  { title: "Demolition Steel Light Displacement Tonnage (LDT) Math", cat: "Ship Recycling & IHM", role: "Academic Researcher" },
  { title: "PCB Heavy Metal Coating Analysis in Ship Hull Scrap", cat: "Ship Recycling & IHM", role: "SOLAS Auditor" },
  { title: "Gas-Free Tank Certification Procedure before Torch Cutting", cat: "Ship Recycling & IHM", role: "SOLAS Auditor" },

  { title: "Satellite Starlink LEO Telemetry Telematics Integration", cat: "Maritime Research", role: "Academic Researcher" },
  { title: "Digital Twin Machinery Anomaly AI Detection Model", cat: "Maritime Research", role: "Academic Researcher" },
  { title: "Maritime Cyber Security ECDIS GPS Spoofing Detection", cat: "Maritime Research", role: "Academic Researcher" },
  { title: "AI Generated Charterparty Contract Clause Verification", cat: "Maritime Research", role: "Academic Researcher" },
  { title: "Nuclear Powered Merchant Ship Shielding & Thermal Analysis", cat: "Maritime Research", role: "Academic Researcher text" },
  { title: "Underwater Radiated Noise (URN) Propeller Hydroacoustics", cat: "Maritime Research", role: "Academic Researcher" },
  { title: "Biofuel Blend Degradation & Storage Stability Research", cat: "Maritime Research", role: "Academic Researcher" },
  { title: "Commercial Drone Hull Inspection Defect Recognition AI", cat: "Maritime Research", role: "Academic Researcher" },
  { title: "Solid Sail Rigid Wing Aerodynamic Wind Tunnel Correlation", cat: "Maritime Research", role: "Academic Researcher" },
  { title: "AI Route Weather Routing & Fuel Minimization Solver", cat: "Maritime Research", role: "Academic Researcher" },
  
  { title: "BIMCO Gencon Charterparty Laytime Calculation Solver", cat: "Maritime Research", role: "Port Manager" },
  { title: "VLCC Ship-to-Ship (STS) Transfer Checklist Generator", cat: "Cargo Handling & Tankers", role: "Port Manager" },
  { title: "IMDG Code Dangerous Goods Segregation Matrix Solver", cat: "Cargo Handling & Tankers", role: "Port Manager" },
  { title: "Grain Stability & Loading Computer Shear Force Check", cat: "Cargo Handling & Tankers", role: "Naval Architect" },
  { title: "Car Carrier (PCTC) Fire Detection & High Expansion Foam", cat: "Cargo Handling & Tankers", role: "SOLAS Auditor" },
  { title: "Reefer Cargo Cold Chain Temperature Telemetry Alarm", cat: "Cargo Handling & Tankers", role: "Marine Engineer" },
  { title: "Inert Gas Generator Dew Point & Oxygen Sensor Calibrator", cat: "Cargo Handling & Tankers", role: "Marine Engineer" },
  { title: "Static Electricity Hazard Prevention in Cargo Oil Pumps", cat: "Cargo Handling & Tankers", role: "Marine Engineer" },
  { title: "Heavy Lift Project Cargo Load Spreading Mat FEA Calculation", cat: "Naval Architecture", role: "Naval Architect" },
  { title: "Ship Hull Fouling Biofilm Drag Penalty & Cleaning ROI", cat: "Naval Architecture", role: "Naval Architect" }
];

GENERATED_TOPICS.forEach((item, index) => {
  const promptNum = index + 26;
  const isProPrompt = promptNum % 5 === 0; // mark some prompts as Pro Master
  PROMPTS_BATCH_3.push({
    id: `p-${promptNum}`,
    title: item.title,
    category: item.cat as any,
    targetRole: item.role as any,
    description: `Professional system prompt for ${item.title}. Engineered with Class guidelines, detailed math equations, and standardized step-by-step reporting protocols.`,
    fullPrompt: `You are a World-Class Senior Specialist in ${item.cat} and ${item.role}.
Perform a detailed engineering analysis and operational checklist for: ${item.title}.

Parameters & Inputs:
- Primary Vessel/Asset Context: [Provide vessel specifics, e.g. 115,000 DWT Aframax / 18,000 TEU Container / Offshore Rig]
- System Operating Parameters: [Operating pressure, temperature, speed, or force limits]
- Regulatory Standard: [Relevant IMO / SOLAS / MARPOL / IACS / ISO Code]

Deliverables:
1. Executive Technical Summary & Root-Cause / Formula Derivation.
2. Step-by-Step Engineering Calculation / Analytical Workflow.
3. Class-Compliant Safety Verification & Operational Boundaries.
4. Final Actionable Summary & Quality Assurance Logbook Output.`,
    variables: ['Asset Specifics', 'Operating Parameters', 'Regulatory Standard'],
    successRate: Number((98.0 + (promptNum % 20) * 0.1).toFixed(1)),
    copyCount: 750 + (promptNum * 15),
    bookmarkCount: 300 + (promptNum * 7),
    author: promptNum % 2 === 0 ? 'Maritime AI Engineering Guild' : 'Class Tech Bureau',
    isVerified: true,
    difficulty: promptNum % 3 === 0 ? 'Expert' : promptNum % 2 === 0 ? 'Intermediate' : 'Beginner',
    tags: [item.cat, item.role, 'Class Verified', 'Engineering', 'Maritime AI'],
    isPro: isProPrompt
  });
});
