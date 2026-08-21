import { MaritimePrompt } from '../components/PromptLibrary';

export const PROMPTS_BATCH_2: MaritimePrompt[] = [
  {
    id: 'p-11',
    title: 'Dual-Fuel Methanol Engine Methane Slip & SFOC Optimization',
    category: 'Engine & Machinery',
    targetRole: 'Marine Engineer',
    description: 'Optimizes pilot fuel injection timing, exhaust gas recirculation, and specific fuel oil consumption for dual-fuel methanol engines.',
    fullPrompt: `Act as a Senior Engine Research Engineer for MAN Energy Solutions or WinGD.
Analyze dual-fuel methanol engine combustion data:
- Engine: [e.g. MAN B&W 7G80ME-C10.5-LGIM]
- Fuel Blend Ratio: [Methanol % vs MGO Pilot Fuel %]
- Exhaust Gas Temperature: [Temp in deg C]
- Cylinder Peak Pressure (Pmax): [Bar]

Deliverables:
1. Specific Energy Consumption (SEC in kJ/kWh) comparison between Methanol mode and Fuel Oil mode.
2. Pilot injection timing tuning to minimize NOx and unburnt methanol emissions.
3. Explosion proof purging sequence for methanol fuel supply lines (LFSS).
4. Recommended maintenance interval for high-pressure fuel injectors.`,
    variables: ['Engine Model', 'Fuel Blend Ratio', 'Exhaust Temp', 'Pmax'],
    successRate: 98.9,
    copyCount: 1350,
    bookmarkCount: 610,
    author: 'Engine Tech Institute',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Methanol', 'Dual Fuel', 'SFOC', 'Engine', 'Green Shipping']
  },
  {
    id: 'p-12',
    title: 'Scrubber Wash Water Polycyclic Aromatic Hydrocarbons (PAH) Audit',
    category: 'IMO & SOLAS',
    targetRole: 'SOLAS Auditor',
    description: 'Evaluates EGCS wash water turbidity, pH, PAH, and nitrate discharge limits under IMO Resolution MEPC.340(77).',
    fullPrompt: `Act as an Environmental Compliance Inspector and Port State Control Auditor.
Audit an Exhaust Gas Cleaning System (EGCS) wash water monitoring system:
- Scrubber Type: [Open Loop / Closed Loop / Hybrid]
- Wash Water Flow Rate: [m3/hr]
- PAH Concentration (ppb): [PAH in ppb]
- Discharge pH at Overboard: [pH value]

Tasks:
1. Compare measured PAH and Turbidity against MEPC.340(77) limits (corrected for dilution).
2. Calculate pH credit requirement for 4-meter distance from discharge point.
3. Review Onboard Monitoring Manual (OMM) sensor calibration logs.
4. Issue PSC compliance certificate or non-conformity report.`,
    variables: ['Scrubber Type', 'Wash Water Flow Rate', 'PAH Concentration', 'Discharge pH'],
    successRate: 99.3,
    copyCount: 1180,
    bookmarkCount: 490,
    author: 'MARPOL Annex VI Guild',
    isVerified: true,
    difficulty: 'Intermediate',
    tags: ['Scrubber', 'EGCS', 'PAH', 'MARPOL', 'Wash Water', 'SOLAS']
  },
  {
    id: 'p-13',
    title: 'Rotor Sail Wind-Assisted Propulsion Force & Fuel Savings Model',
    category: 'Naval Architecture',
    targetRole: 'Naval Architect',
    description: 'Calculates Magnus effect lift/drag forces, apparent wind angle thrust vectors, and net annual fuel savings for Flettner rotors.',
    fullPrompt: `Act as a Wind-Assisted Propulsion System (WAPS) Hydrodynamics Specialist.
Model thrust generation for 2x Flettner Rotor Sails installed on a 62,000 DWT Ultramax Bulk Carrier:
- Rotor Height (H): [Height in meters, e.g. 30m]
- Rotor Diameter (D): [Diameter in meters, e.g. 5m]
- Maximum Spin Speed (RPM): [RPM, e.g. 250 RPM]
- True Wind Speed & Angle: [Wind Speed in knots, True Wind Angle in deg]
- Vessel Speed: [Vessel Speed in knots]

Calculate:
1. Velocity ratio (spin speed u / wind speed v) and Lift/Drag coefficients (Cl, Cd).
2. Forward thrust force component along vessel heading vector.
3. Aerodynamic side force and heel moment impact on vessel stability.
4. Predicted percentage fuel savings and CII score improvement on North Atlantic trade route.`,
    variables: ['Rotor Height', 'Rotor Diameter', 'Spin Speed RPM', 'True Wind Speed & Angle', 'Vessel Speed'],
    successRate: 99.0,
    copyCount: 1490,
    bookmarkCount: 710,
    author: 'Green Naval Arch Lab',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Rotor Sail', 'Wind Propulsion', 'Magnus Effect', 'CII', 'Naval Arch']
  },
  {
    id: 'p-14',
    title: 'Smart Quay Crane Berth Allocation Queueing Theory Model',
    category: 'Port Operations',
    targetRole: 'Port Manager',
    description: 'Applies M/M/c queueing theory and integer linear programming to minimize vessel turnaround time and anchorage waiting costs.',
    fullPrompt: `Act as a Chief Port Logistics Operations Researcher.
Formulate a mathematical optimization model for Berth Allocation and Quay Crane Assignment:
- Number of Berths (M): [Number of berths]
- Arriving Vessel Schedule: [List of vessel arrival times, LOA, draft, and required move count]
- Available Ship-to-Shore (STS) Cranes: [Total STS cranes]
- Crane Productivity: [Moves per hour per crane]

Output:
1. Objective function minimizing total turnaround time + demurrage cost + crane repositioning cost.
2. Constraints for draft limits, minimum crane clearance, and worker shift schedules.
3. Python SciPy/PuLP optimization script snippet to solve berth schedule.
4. Expected reduction in port anchorage queueing time.`,
    variables: ['Number of Berths', 'Arriving Schedule', 'STS Cranes', 'Crane Productivity'],
    successRate: 98.4,
    copyCount: 1020,
    bookmarkCount: 460,
    author: 'Port Analytics AI',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Port Operations', 'Queueing Theory', 'STS Crane', 'Optimization', 'Logistics']
  },
  {
    id: 'p-15',
    title: 'LNG Carrier Boil-Off Gas (BOG) & Reliquefaction System Balance',
    category: 'Cargo Handling & Tankers',
    targetRole: 'Marine Engineer',
    description: 'Calculates daily boil-off rate (BOR), tank pressure build-up, and sub-cooling nitrogen reliquefaction power consumption.',
    fullPrompt: `Act as a Chief Engineer on a 174,000 m3 LNG Carrier with Mark III Membrane Tanks.
Calculate boil-off gas thermal dynamics during a laden voyage:
- Cargo Volume: [Volume in m3] m3 of LNG at [Temperature in deg C]
- Boil-Off Rate (BOR): [e.g. 0.085% per day]
- Fuel Gas Compressor Capacity: [kg/hr]
- Reliquefaction Plant Type: [Reverse Brayton Nitrogen Cycle]

Perform:
1. Daily BOG mass calculation in metric tonnes per day.
2. Heat ingress rate (kW) through tank insulation layers.
3. Power consumption (kW) for full reliquefaction vs burning BOG in Dual-Fuel boilers/engines.
4. Cargo tank pressure equilibrium forecast over a 18-day trans-Pacific transit.`,
    variables: ['Cargo Volume', 'Boil-Off Rate', 'Compressor Capacity', 'Reliquefaction Plant Type'],
    successRate: 99.5,
    copyCount: 1260,
    bookmarkCount: 580,
    author: 'LNG Gas Fleet Lead',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['LNG', 'BOG', 'Reliquefaction', 'Tanker', 'Thermal']
  },
  {
    id: 'p-16',
    title: 'Ballast Water Management System (BWMS) Electrolysis & Filter Audit',
    category: 'IMO & SOLAS',
    targetRole: 'SOLAS Auditor',
    description: 'Audits BWMS electro-chlorination total residual oxidant (TRO) dosing, neutralization, and filter backwash differential pressure.',
    fullPrompt: `Act as a Flag State Inspector and Ballast Water D-2 Compliance Inspector.
Audit a full electro-chlorination Ballast Water Management System (BWMS):
- Treatment Capacity: [m3/hr]
- Water Salinity & Temperature: [PSU, Temp deg C]
- TRO Dosing Concentration: [mg/L TRO]
- Filter Differential Pressure (\Delta P): [Bar]

Deliverables:
1. Verification of D-2 discharge standard compliance (viable organisms < 10 per m3 for \ge 50\mu m).
2. Neutralization agent (Sodium Thiosulfate) dosing feedback loop check before overboard discharge.
3. Troubleshooting guide for high filter \Delta P during muddy river water ballast intake.
4. Logbook entry template for Ballast Water Record Book (BWRB) Part I.`,
    variables: ['Treatment Capacity', 'Salinity & Temp', 'TRO Dosing', 'Filter Delta P'],
    successRate: 99.1,
    copyCount: 1090,
    bookmarkCount: 420,
    author: 'Environmental Class Inspector',
    isVerified: true,
    difficulty: 'Intermediate',
    tags: ['BWMS', 'D-2 Standard', 'Ballast Water', 'TRO', 'SOLAS']
  },
  {
    id: 'p-17',
    title: 'Dynamic Positioning DP2 Failure Modes and Effects Analysis (FMEA)',
    category: 'Offshore & Mooring',
    targetRole: 'Naval Architect',
    description: 'Generates a DP2 redundancy audit, worst-case failure design intent (WCFDI), and position keeping capability plot.',
    fullPrompt: `Act as a Class DP Specialist and IMCA DP Auditor.
Perform a Failure Modes and Effects Analysis (FMEA) for a DP2 Offshore Support Vessel:
- Thruster Configuration: [2x Stern Azimuths, 2x Bow Tunnel Thrusters, 1x Drop-down Retractable]
- Power Plant Setup: [4x Main Diesel Generators in 2 Split Switchboard Busbars]
- Position Reference Systems: [DGPS, CyScan Laser, Hydroacoustic USBL]

Output:
1. Identification of Worst Case Failure Design Intent (WCFDI).
2. Single-point failure analysis on switchboard bus tie, fuel supply headers, and cooling loops.
3. Thruster allocation logic when one generator trips under 95th percentile wind/current forces.
4. DP Capability Plot polar diagram simulation requirements.`,
    variables: ['Thruster Configuration', 'Power Plant Setup', 'Position Reference Systems'],
    successRate: 98.8,
    copyCount: 1140,
    bookmarkCount: 530,
    author: 'Offshore DP Guild',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['Dynamic Positioning', 'DP2', 'FMEA', 'Offshore', 'Thruster']
  },
  {
    id: 'p-18',
    title: 'Ship Structural Finite Element Analysis (FEA) Hatch Corner Stress',
    category: 'Naval Architecture',
    targetRole: 'Naval Architect',
    description: 'Calculates stress concentration factors (SCF) and fatigue usage factors at container ship hatch corners under torsional wave bending.',
    fullPrompt: `Act as a Senior Structural Engineer specializing in Ship Finite Element Analysis (FEA).
Analyze stress concentrations at a container vessel hatch corner:
- Global Hull Girder Torque (Mw): [Wave Torsional Moment in kNm]
- Hatch Corner Geometry: [Elliptical / Double Curvature Radius in mm]
- Plating Thickness (t): [Thickness in mm]
- Steel Grade: [e.g. AH36 / EH40 High Tensile Steel]

Tasks:
1. Determine Von Mises stress peak and Stress Concentration Factor (K_t).
2. Calculate permissible stress limits according to IACS UR S11A.
3. Fatigue damage evaluation using S-N curves under Palmgren-Miner linear cumulative rule.
4. Recommend insert plate thickness upgrade or radius enlargement geometry.`,
    variables: ['Wave Torsional Moment', 'Hatch Corner Geometry', 'Plating Thickness', 'Steel Grade'],
    successRate: 98.6,
    copyCount: 970,
    bookmarkCount: 410,
    author: 'IACS FEA Specialist',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['FEA', 'Structural', 'Hatch Corner', 'Fatigue', 'IACS']
  },
  {
    id: 'p-19',
    title: 'Autonomous Ship (MASS) COLREGs Collision Avoidance Path Planner',
    category: 'Autonomous Vessels & Digital Twins',
    targetRole: 'Academic Researcher',
    description: 'PRO MASTER BLUEPRINT: Implements COLREGs Rules 13-17 path planning algorithms for autonomous vessel maneuvering in congested waters.',
    fullPrompt: `Act as an AI Robotics Engineer specializing in Autonomous Surface Vessels (MASS).
Develop a COLREGs-compliant obstacle avoidance trajectory algorithm:
- Own Ship State: [Position, Heading, Speed]
- Target Vessel 1 (Head-On, Rule 14): [CPA, TCPA, Bearing]
- Target Vessel 2 (Crossing from Starboard, Rule 15): [CPA, TCPA, Bearing]

Output:
1. Mathematical cost function incorporating COLREGs compliance penalties (Rule 16 Give-Way vs Rule 17 Stand-On).
2. Velocity Obstacle (VO) or Dynamic Window Approach (DWA) state space formulation.
3. Python script snippet computing altered course and speed vector to maintain minimum CPA > 1.5 NM.
4. Fail-safe reversion protocol if target vessel fails to take action under Rule 17(a)(ii).`,
    variables: ['Own Ship State', 'Target Vessel 1', 'Target Vessel 2'],
    successRate: 99.7,
    copyCount: 1890,
    bookmarkCount: 940,
    author: 'Maritime AI Research Lab',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['MASS', 'COLREGs', 'Autonomous', 'Collision Avoidance', 'Pro Master'],
    isPro: true
  },
  {
    id: 'p-20',
    title: 'FPSO Turret Swivel & Disconnect System Hydrodynamic Safety',
    category: 'Offshore & Mooring',
    targetRole: 'Naval Architect',
    description: 'Evaluates internal/external FPSO turret swivel seal pressures, quick disconnect/reconnect (QDRS) sequences for typhoon evasion.',
    fullPrompt: `Act as an Offshore Floating Production Systems Specialist.
Analyze the safety parameters for an FPSO Internal Turret Disconnect System:
- Sea State: [Significant Wave Height Hs in meters, Peak Period Tp in sec]
- Water Depth: [Depth in meters]
- Riser & Umbilical Configuration: [Number of Flexible Risers and Umbilicals]
- Disconnect Time Window: [Maximum allowable disconnect duration in hours]

Provide:
1. Hydrodynamic pull-in and release tension limits for the Buoy Turret System (BTS).
2. Emergency Shut Down (ESD-2) valve closure and pipeline depressurization protocol.
3. Post-disconnect buoy submerged equilibrium depth calculation to avoid wave action fatigue.
4. Class approval checklist under ABS / DNV Floating Production Rules.`,
    variables: ['Sea State', 'Water Depth', 'Riser Configuration', 'Disconnect Duration'],
    successRate: 98.3,
    copyCount: 840,
    bookmarkCount: 360,
    author: 'FPSO Offshore Guild',
    isVerified: true,
    difficulty: 'Expert',
    tags: ['FPSO', 'Turret', 'Offshore', 'Mooring', 'Safety']
  }
];
