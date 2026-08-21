export interface NewsletterTopicCategory {
  categoryName: string;
  topics: string[];
}

export const ALL_NEWSLETTER_TOPICS: NewsletterTopicCategory[] = [
  {
    categoryName: "IMO & Environmental Regulations",
    topics: [
      "IMO SOLAS & MARPOL Regulatory Updates",
      "EEXI & CII Compliance Math Strategies",
      "IMO Net-Zero GHG Strategy & Carbon Tax Timelines",
      "EU Emissions Trading System (ETS) Maritime Rules",
      "FuelEU Maritime Intensity Reduction Targets",
      "Ballast Water Management System (BWMS) Troubleshooting",
      "Underwater Radiated Noise (URN) Guidelines",
      "MARPOL Annex VI NOx Tier III Compliance",
      "Black Carbon Regulations in Arctic Waters",
      "Biofouling Management & Hull Cleaning Standards"
    ]
  },
  {
    categoryName: "Green Shipping & Decarbonization",
    topics: [
      "Dual-Fuel Engine Performance (Methanol vs LNG vs Ammonia)",
      "Ammonia Toxicity Safety & Bunkering Protocols",
      "Methanol Bunkering Infrastructure & Retrofits",
      "Liquid Hydrogen Fuel Cell System Integration",
      "Wind-Assisted Propulsion Systems (Rotor Sails, Kites, Rigid Wings)",
      "Onboard Carbon Capture & Storage (OCCS) Technologies",
      "Battery-Electric & Hybrid Vessel Power Grids",
      "Nuclear Propulsion for Commercial Shipping",
      "Biofuels & Hydrotreated Vegetable Oil (HVO) Blends",
      "Cold Ironing & Shore-Power Grid Synchronization"
    ]
  },
  {
    categoryName: "Naval Architecture & Hydrodynamics",
    topics: [
      "Holtrop & Mennen Resistance Empirical Calculations",
      "OpenFOAM CFD Hull Mesh & Resistance Simulation",
      "Intact Stability Criteria & GZ Curve Analysis (IS Code 2008)",
      "Damage Stability & Probabilistic Index R Optimization",
      "Structural FEA Stress Analysis for Heavy Lift Cargo",
      "Seakeeping & RAO (Response Amplitude Operator) Analysis",
      "Container Vessel Torsional Rigidity & Hatch Cover Deflection",
      "Parametric Rolling Mitigation in Rough Seas",
      "Propeller Hydrodynamics & Cavitation Inception Noise",
      "Bulbous Bow Retrofitting for Slow Steaming Optimization"
    ]
  },
  {
    categoryName: "Engine & Machinery Engineering",
    topics: [
      "2-Stroke Engine Cylinder Lubrication & Scrubbing",
      "4-Stroke Medium-Speed Generator Diagnostics",
      "Vibration Analysis & Bearing Fault AI Detection",
      "Scrubber Water Wash Quality & PAH Sensor Calibration",
      "Boiler Water Treatment & Scaling Prevention",
      "Shaft Power Metering & SFOC Calculation",
      "Turbocharger Overhaul & Surge Protection",
      "Purifier Sludge Reduction & Centrifuge Maintenance",
      "Fuel Oil Viscosity & Density Control Loops",
      "Exhaust Gas Recirculation (EGR) Thermal Management"
    ]
  },
  {
    categoryName: "Port Operations & Logistics AI",
    topics: [
      "Automated Quay Crane (STS) Scheduling & Queueing Theory",
      "AGV Fleet Dispatching in Smart Container Terminals",
      "Berth Allocation Problem (BAP) Optimization Models",
      "Just-In-Time (JIT) Vessel Arrival & Anchorage Dwell Reduction",
      "Port Cyber Resilience & OT Security Protocols",
      "Port Shore Power Load Management & Microgrids",
      "Smart Tugboat Dispatching & Escort Towing Dynamics",
      "Dry Bulk Terminal Conveyor Efficiency & Dust Suppression",
      "Tank Farm Inventory & Pipeline Automated Blending",
      "Customs AI Document Parsing & Automated Clearance"
    ]
  },
  {
    categoryName: "Offshore, Wind & Subsea Engineering",
    topics: [
      "Floating Offshore Wind Turbine (FOWT) Mooring Design",
      "Dynamic Positioning (DP2/DP3) Footprint & Capability Curves",
      "Subsea Pipeline Free-Span & On-Bottom Stability",
      "ROV & AUV Inspection of Deepwater Assets",
      "Heavy Lift Vessel Motion Monitoring during Crane Ops",
      "JACK-UP Leg Loading & Spudcan Penetration Analysis",
      "FPSO Turret Mooring & Swivel Stack Overhaul",
      "Offshore Supply Vessel (OSV) Motion Compensation Gangways",
      "Wave & Current Load Calculations on Subsea Jackets",
      "Decommissioning & Subsea Well Plugging AI Planning"
    ]
  },
  {
    categoryName: "Ship Recycling & IHM (HazMat)",
    topics: [
      "Inventory of Hazardous Materials (IHM) Part I Preparation",
      "Hong Kong Convention (HKC) Ratification & Class Audits",
      "EU Ship Recycling Regulation (EU SRR) Approved Yards",
      "Asbestos Sampling & Abatement Protocols Onboard",
      "Heavy Metal & PCB Testing in Hull Paint Coatings",
      "Green Ship Recycling Yard Safety Standards",
      "Light Displacement Tonnage (LDT) Estimation Models",
      "Demolition Steel Quality & Scrap Value Forecasting",
      "Gas-Freeing & Hot Work Certification Sequences",
      "HazMat Visual and Sampling Check Plan (VSCP) AI Tools"
    ]
  },
  {
    categoryName: "Autonomous Vessels & Digital Twins",
    topics: [
      "MASS (Maritime Autonomous Surface Ships) Degrees 1-4 Rules",
      "AI Computer Vision for Automated Collision Avoidance (COLREGs)",
      "Digital Twin Hydrodynamics for Real-Time Fuel Optimization",
      "Predictive Machinery Maintenance via IoT Sensors",
      "Unmanned Engine Room (UMS) Remote Monitoring Standards",
      "Satellite Low-Earth-Orbit (Starlink/LEO) Fleet Telemetry",
      "Cyber Attacks on ECDIS & GPS Spoofing Mitigation",
      "Automated Docking & Mooring Robot Control Loops",
      "Remote Class Surveys & Drone Hull Inspection Protocols",
      "Blockchain Bill of Lading & Smart Contracts in Shipping"
    ]
  },
  {
    categoryName: "Cargo Handling & Tanker Operations",
    topics: [
      "Container Stowage Planning & Lashing Force Calculations",
      "LNG Carrier Boil-Off Gas (BOG) Reliquefaction Plant Ops",
      "Chemical Tanker Cargo Tank Coating Compatibility & Washing",
      "Reefer Container Cold Chain Monitoring & Power Demand",
      "Grain Stability & Loading Computer Shear Force Verification",
      "VLCC Ship-to-Ship (STS) Transfer Safety Checklist",
      "Dangerous Goods (IMDG Code) Segregation Matrix",
      "Car Carrier (PCTC) Deck Load Capacity & Fire Safety",
      "Inert Gas System (IGS) Dew Point & Oxygen Level Controls",
      "Static Electricity Hazard Prevention in Cargo Pumps"
    ]
  },
  {
    categoryName: "Maritime AI & System Prompt Engineering",
    topics: [
      "AI Prompts for SOLAS Code Clause Search & Citations",
      "LLM Prompts for Class Survey Report Automated Summaries",
      "Prompts for Generating Custom Python Hydrostatics Scripts",
      "Prompts for Technical English Marine Incident Analysis",
      "AI System Prompts for Automated Engine Alarm Triage",
      "Prompts for Ship Repair Yard Workspec Tender Creation",
      "AI Prompts for Maritime Insurance Claim Evidence Reviews",
      "Prompts for Vessel Charterparty Clause Drafting (BIMCO)",
      "Prompts for Drydocking Budgeting & Variance Benchmarks",
      "AI Prompts for Marine Crew Training Quiz Generation"
    ]
  }
];

export const FLAT_TOPICS_LIST = ALL_NEWSLETTER_TOPICS.flatMap(c => c.topics);
