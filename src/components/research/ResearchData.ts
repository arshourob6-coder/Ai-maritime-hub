export interface ResearchTopic {
  id: string;
  field: string;
  title: string;
  category: 'Naval Architecture' | 'Marine Engineering' | 'Offshore Engineering' | 'Port & Logistics' | 'Shipbuilding' | 'Maritime AI' | 'Renewable Energy' | 'Ship Recycling' | 'Autonomous Ships' | 'Blue Economy';
  gapDescription: string;
  noveltyScore: number;
  complexity: 'High' | 'Medium' | 'Extreme';
  potentialJournals: string[];
  trendingKeywords: string[];
  suggestedMethodology: string;
  trlLevel: number;
}

export interface PaperIntelligenceItem {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  citations: number;
  abstract: string;
  keyFindings: string[];
  methodology: string;
  limitations: string[];
  futureWork: string[];
  category: string;
}

export interface JournalInfo {
  id: string;
  name: string;
  publisher: 'Elsevier' | 'IEEE' | 'Springer' | 'Wiley' | 'Taylor & Francis' | 'MDPI' | 'RINA' | 'SNAME';
  impactFactor: number;
  citeScore: number;
  acceptanceRate: string;
  reviewSpeedWeeks: number;
  openAccessOption: boolean;
  aimsAndScope: string;
  topTopics: string[];
  issn: string;
}

export interface ConferenceInfo {
  id: string;
  name: string;
  organizer: 'OMAE (ASME)' | 'SNAME' | 'RINA' | 'IEEE Oceans' | 'FAST' | 'MARSIM' | 'ISOPE';
  location: string;
  submissionDeadline: string;
  conferenceDate: string;
  acceptanceRate: string;
  proceedingsIndexedIn: string[];
  topics: string[];
}

export interface FundingOpportunity {
  id: string;
  title: string;
  sponsor: string;
  amountMaxUSD: number;
  deadline: string;
  targetFields: string[];
  eligibleRoles: ('PhD Student' | 'Postdoc' | 'Faculty' | 'Industry R&D' | 'Maritime SME')[];
  description: string;
  matchScorePct: number;
  applicationLink: string;
}

export interface MaritimePatentItem {
  id: string;
  patentNumber: string;
  title: string;
  applicant: string;
  filingDate: string;
  jurisdiction: 'WIPO' | 'USPTO' | 'EPO' | 'JPO' | 'CNIPA';
  cpcCode: string;
  abstract: string;
  trl: number;
  commercialPotential: 'Very High' | 'High' | 'Moderate';
}

export interface DatasetItem {
  id: string;
  name: string;
  category: 'AIS' | 'Hull CFD' | 'Weather & Metocean' | 'Engine Telemetry' | 'Emissions' | 'Port Operations' | 'Recycling HazMat' | 'Offshore Mooring';
  recordsCount: string;
  fileSize: string;
  format: 'CSV' | 'NetCDF' | 'HDF5' | 'JSON' | 'Parquet' | 'SQL';
  doi: string;
  license: 'Open Access CC-BY 4.0' | 'Academic Only' | 'Commercial License';
  priceUSD: number;
  description: string;
}

export const INITIAL_RESEARCH_TOPICS: ResearchTopic[] = [
  {
    id: 'rt-1',
    field: 'Naval Architecture',
    category: 'Naval Architecture',
    title: 'Physics-Informed Neural Networks (PINN) for Real-Time Transverse Wave Resistance Slicing in Extreme Sea States',
    gapDescription: 'Existing RANSE CFD is too computationally expensive for onboard voyage optimization; classical potential flow fails to capture steep wave breaking nonlinearities.',
    noveltyScore: 94,
    complexity: 'High',
    potentialJournals: ['Ocean Engineering', 'Applied Ocean Research', 'Journal of Ship Research'],
    trendingKeywords: ['PINN', 'Wave Drag', 'Nonlinear Hydrodynamics', 'Holtrop-Mennen Physics', 'DeepONet'],
    suggestedMethodology: 'Combine boundary element method (BEM) training grids with physics loss penalty enforcing Navier-Stokes continuity and free-surface boundary conditions.',
    trlLevel: 3
  },
  {
    id: 'rt-2',
    field: 'Maritime AI',
    category: 'Autonomous Ships',
    title: 'COLREGS-Compliant Cooperative Multi-Agent Reinforcement Learning for MASS Grade 4 Vessel Swarms in Confined Straits',
    gapDescription: 'Single-vessel collision avoidance algorithms do not scale when multiple autonomous ships encounter congested chokepoints (Malacca / Dover) simultaneously.',
    noveltyScore: 97,
    complexity: 'Extreme',
    potentialJournals: ['IEEE Journal of Oceanic Engineering', 'Ocean Engineering', 'Transportation Research Part C'],
    trendingKeywords: ['COLREGS Rule 8 & 15', 'MARL', 'MASS Grade 4', 'Vessel Swarm Coordination', 'VTS Teleoperation'],
    suggestedMethodology: 'Decentralized Partially Observable Markov Decision Process (Dec-POMDP) with hierarchical safety shields and AIS trajectory arbitration.',
    trlLevel: 4
  },
  {
    id: 'rt-3',
    field: 'Renewable Energy',
    category: 'Renewable Energy',
    title: 'Aero-Hydro-Servo-Elastic Coupled Dynamic Modeling of 20MW Floating Offshore Wind Turbines under Rogue Wave Impact',
    gapDescription: 'Nonlinear catenary mooring snatch loads under second-order wave drift forces remain poorly predicted for 15MW-20MW next-gen spar and semi-submersible platforms.',
    noveltyScore: 92,
    complexity: 'High',
    potentialJournals: ['Renewable Energy', 'Marine Structures', 'Wind Energy Science'],
    trendingKeywords: ['FOWT 20MW', 'Semi-submersible Spar', 'Coupled Aero-Hydro', 'Metocean Extreme Loads', 'Fatigue Life Miner Rule'],
    suggestedMethodology: 'Coupled OpenFAST and AQWA hydrodynamic time-domain simulations validated against 1:50 scale towing tank wave basin experimental measurements.',
    trlLevel: 4
  },
  {
    id: 'rt-4',
    field: 'Marine Engineering',
    category: 'Marine Engineering',
    title: 'Dual-Fuel Ammonia/Hydrogen Combustion Kinetics and NOx/N2O Mitigation Strategies in Two-Stroke Marine Engines',
    gapDescription: 'Ammonia combustion leads to high unburnt NH3 slip and potent greenhouse gas N2O formation that negates carbon reduction benefits if not catalytic reduced.',
    noveltyScore: 95,
    complexity: 'Extreme',
    potentialJournals: ['Fuel', 'Applied Energy', 'International Journal of Engine Research'],
    trendingKeywords: ['Green Ammonia Slip', 'N2O Global Warming Factor', 'SCR Catalyst', 'Two-Stroke MAN ME-LGIA', 'Zero-Carbon Fuel'],
    suggestedMethodology: 'Chemical kinetic modeling (GRI-Mech adapted) with CFD turbulent combustion in OpenFOAM paired with optical combustion chamber spray laser diagnostics.',
    trlLevel: 3
  },
  {
    id: 'rt-5',
    field: 'Port & Logistics',
    category: 'Port & Logistics',
    title: 'Dynamic Shore-to-Ship Cold Ironing Microgrid Energy Management with Offshore Wave-Solar Hybrid Generation',
    gapDescription: 'High-voltage shore connection (HVSC) creates massive peak power demand spikes on municipal port grids during simultaneous berthing of mega-container vessels.',
    noveltyScore: 89,
    complexity: 'Medium',
    potentialJournals: ['IEEE Transactions on Smart Grid', 'Maritime Policy & Management', 'Cleaner Logistics and Supply Chain'],
    trendingKeywords: ['Cold Ironing', 'HVSC 11kV', 'Microgrid BESS', 'Port Decarbonization', 'Peak Shaving'],
    suggestedMethodology: 'Mixed-Integer Linear Programming (MILP) optimization with Battery Energy Storage Systems (BESS) and stochastic ship arrival modeling.',
    trlLevel: 5
  },
  {
    id: 'rt-6',
    field: 'Ship Recycling',
    category: 'Ship Recycling',
    title: 'Automated IHM Material Classification via Hyperspectral Imaging and Robotic HazMat Extraction for Green Yard Compliance',
    gapDescription: 'Manual Inventory of Hazardous Materials (IHM) surveys under the Hong Kong Convention are slow, subjective, and pose toxic exposure risks to yard workers.',
    noveltyScore: 91,
    complexity: 'Medium',
    potentialJournals: ['Journal of Cleaner Production', 'Resources, Conservation & Recycling', 'Marine Pollution Bulletin'],
    trendingKeywords: ['Hong Kong Convention', 'IHM Part I-III', 'Hyperspectral AI', 'HazMat Asbestos Detection', 'Circular Steel Scrap'],
    suggestedMethodology: 'ResNet-50 computer vision classifier trained on 15,000 maritime alloy/coating spectral reflectance signatures integrated with ROS robotic cutter.',
    trlLevel: 4
  }
];

export const TOP_JOURNALS: JournalInfo[] = [
  {
    id: 'j-1',
    name: 'Ocean Engineering',
    publisher: 'Elsevier',
    impactFactor: 4.8,
    citeScore: 7.9,
    acceptanceRate: '21%',
    reviewSpeedWeeks: 6.2,
    openAccessOption: true,
    aimsAndScope: 'Hydrodynamics, structural mechanics, floating wind, wave-body interactions, underwater acoustics, and naval architecture research.',
    topTopics: ['CFD Hydrodynamics', 'Mooring Dynamics', 'Wave Energy', 'Autonomous Vessels', 'Ship Resistance'],
    issn: '0029-8018'
  },
  {
    id: 'j-2',
    name: 'Applied Ocean Research',
    publisher: 'Elsevier',
    impactFactor: 4.3,
    citeScore: 7.2,
    acceptanceRate: '24%',
    reviewSpeedWeeks: 7.5,
    openAccessOption: true,
    aimsAndScope: 'Applied research in oceanography, coastal structures, offshore platforms, ship hydrodynamics, and marine robotics.',
    topTopics: ['Nonlinear Waves', 'Hydroelasticity', 'Subsea Pipelines', 'AUV Navigation', 'Towing Tank Experiments'],
    issn: '0141-1187'
  },
  {
    id: 'j-3',
    name: 'Marine Structures',
    publisher: 'Elsevier',
    impactFactor: 4.6,
    citeScore: 8.1,
    acceptanceRate: '19%',
    reviewSpeedWeeks: 8.0,
    openAccessOption: true,
    aimsAndScope: 'Structural design, stress analysis, fatigue life, ultimate strength, collision impact, and composites for ships and offshore assets.',
    topTopics: ['FEA Buckling', 'Fatigue Life Prediction', 'Corrosion Degradation', 'Ice-Ship Impact', 'Class Rules Scantlings'],
    issn: '0951-8339'
  },
  {
    id: 'j-4',
    name: 'IEEE Journal of Oceanic Engineering',
    publisher: 'IEEE',
    impactFactor: 4.2,
    citeScore: 6.8,
    acceptanceRate: '26%',
    reviewSpeedWeeks: 9.1,
    openAccessOption: true,
    aimsAndScope: 'All aspects of science and engineering applied to the ocean environment, with emphasis on acoustics, robotics, instrumentation, and control.',
    topTopics: ['Underwater Acoustic Comms', 'MASS Path Planning', 'Sonar Processing', 'ROV Control', 'Marine Edge AI'],
    issn: '0364-9059'
  },
  {
    id: 'j-5',
    name: 'International Journal of Naval Architecture and Ocean Engineering',
    publisher: 'Elsevier',
    impactFactor: 3.2,
    citeScore: 5.4,
    acceptanceRate: '32%',
    reviewSpeedWeeks: 5.8,
    openAccessOption: true,
    aimsAndScope: 'Official journal of SNAK (Society of Naval Architects of Korea) covering hull lines, propulsion, maneuvering, stability, and smart yards.',
    topTopics: ['Container Ship Hydrodynamics', 'Propeller Cavitation', 'Smart Shipyard Digital Twin', 'EEXI/CII Optimization'],
    issn: '2092-6782'
  },
  {
    id: 'j-6',
    name: 'Journal of Marine Science and Technology',
    publisher: 'Springer',
    impactFactor: 2.8,
    citeScore: 4.9,
    acceptanceRate: '35%',
    reviewSpeedWeeks: 8.4,
    openAccessOption: true,
    aimsAndScope: 'Co-published with JASNAOE covering broad marine engineering, ship powerplants, maneuvering, safety, and marine environment.',
    topTopics: ['Ship Maneuverability', 'Dual Fuel Combustion', 'Seakeeping in Waves', 'Bulbous Bow Optimization'],
    issn: '0948-4280'
  }
];

export const UPCOMING_CONFERENCES: ConferenceInfo[] = [
  {
    id: 'conf-1',
    name: 'OMAE 2026 - 45th International Conference on Ocean, Offshore & Arctic Engineering',
    organizer: 'OMAE (ASME)',
    location: 'Hamburg, Germany',
    submissionDeadline: 'October 15, 2026',
    conferenceDate: 'June 7 - 12, 2027',
    acceptanceRate: '68%',
    proceedingsIndexedIn: ['Scopus', 'Web of Science', 'EI Compendex'],
    topics: ['Offshore Wind', 'Hydrodynamics', 'Arctic Engineering', 'CFD Validation', 'Pipelines & Risers']
  },
  {
    id: 'conf-2',
    name: 'SNAME Maritime Convention (SMC 2026)',
    organizer: 'SNAME',
    location: 'Houston, Texas, USA',
    submissionDeadline: 'November 30, 2026',
    conferenceDate: 'October 18 - 22, 2027',
    acceptanceRate: '55%',
    proceedingsIndexedIn: ['Scopus', 'OnePetro', 'IEEE Xplore'],
    topics: ['Ship Design', 'Naval Vessels', 'Decarbonization Fuels', 'Shipbuilding Technology', 'Intact Stability']
  },
  {
    id: 'conf-3',
    name: 'IEEE OCEANS 2026',
    organizer: 'IEEE Oceans',
    location: 'Singapore',
    submissionDeadline: 'December 10, 2026',
    conferenceDate: 'May 24 - 28, 2027',
    acceptanceRate: '62%',
    proceedingsIndexedIn: ['IEEE Xplore', 'Scopus', 'Google Scholar'],
    topics: ['Autonomous Underwater Vehicles', 'Marine IoT', 'Ocean Sensor Networks', 'Acoustic Positioning']
  },
  {
    id: 'conf-4',
    name: 'RINA International Conference on Smart Ships & Autonomous Technologies',
    organizer: 'RINA',
    location: 'London, United Kingdom',
    submissionDeadline: 'January 15, 2027',
    conferenceDate: 'March 14 - 15, 2027',
    acceptanceRate: '48%',
    proceedingsIndexedIn: ['RINA Publications', 'Scopus'],
    topics: ['MASS Regulatory Code', 'Situational Awareness LiDAR', 'Cybersecurity on Bridge', 'Digital Twins']
  }
];

export const FUNDING_DATABASE: FundingOpportunity[] = [
  {
    id: 'fund-1',
    title: 'Horizon Europe: Next-Gen Ultra-Low Emission Zero-Carbon Waterborne Transport',
    sponsor: 'European Commission (CINEA)',
    amountMaxUSD: 4500000,
    deadline: 'April 28, 2027',
    targetFields: ['Marine Engineering', 'Renewable Energy', 'Naval Architecture'],
    eligibleRoles: ['Faculty', 'Postdoc', 'Industry R&D', 'Maritime SME'],
    description: 'Funding multi-partner European and international consortia developing scalable hydrogen/ammonia propulsion systems and wind-assisted ship propulsion (WASP).',
    matchScorePct: 96,
    applicationLink: 'https://ec.europa.eu/info/funding-tenders/'
  },
  {
    id: 'fund-2',
    title: 'ONR Global Research Grant: Advanced Hydrodynamic Acoustic Signature Reduction',
    sponsor: 'Office of Naval Research (ONR Global)',
    amountMaxUSD: 850000,
    deadline: 'Rolling Submissions',
    targetFields: ['Naval Architecture', 'Maritime AI', 'Marine Engineering'],
    eligibleRoles: ['PhD Student', 'Postdoc', 'Faculty'],
    description: 'Basic and applied research into cavitation suppression, metamaterial hull coatings, and deep learning inverse acoustic scattering.',
    matchScorePct: 91,
    applicationLink: 'https://www.nre.navy.mil/work-with-us/funding-opportunities'
  },
  {
    id: 'fund-3',
    title: 'SNAME Graduate Scholarship in Naval Architecture and Marine Engineering',
    sponsor: 'Society of Naval Architects and Marine Engineers',
    amountMaxUSD: 24000,
    deadline: 'February 1, 2027',
    targetFields: ['Naval Architecture', 'Marine Engineering', 'Offshore Engineering'],
    eligibleRoles: ['PhD Student'],
    description: 'Annual scholarship program for outstanding graduate students pursuing MS/PhD theses in ship design, hydrodynamics, and marine robotics.',
    matchScorePct: 98,
    applicationLink: 'https://www.sname.org/scholarships'
  },
  {
    id: 'fund-4',
    title: 'Singapore Maritime Institute (SMI) R&D Grant: Smart Port Logistics & MASS AI',
    sponsor: 'Singapore Maritime Institute / MPA Singapore',
    amountMaxUSD: 1200000,
    deadline: 'June 30, 2027',
    targetFields: ['Port & Logistics', 'Maritime AI', 'Autonomous Ships'],
    eligibleRoles: ['Faculty', 'Postdoc', 'Industry R&D'],
    description: 'Funding research into Tuas Mega Port automated guided vehicles, digital bunkering blockchain, and coastal MASS testbed management.',
    matchScorePct: 88,
    applicationLink: 'https://www.maritimeinstitute.sg/'
  }
];

export const MARITIME_PATENTS_DB: MaritimePatentItem[] = [
  {
    id: 'pat-1',
    patentNumber: 'WO2026/089421A1',
    title: 'Dynamic Air Lubrication System (ALS) with Variable Micro-Bubble Injector Array for Container Ships',
    applicant: 'Damen Shipyards / Delft University of Technology',
    filingDate: '2026-03-14',
    jurisdiction: 'WIPO',
    cpcCode: 'B63B 1/38 (Hydrodynamic boundary layer air reduction)',
    abstract: 'An automated feedback-controlled micro-bubble ejection array utilizing hull pressure sensors to dynamically modulate air volume fraction along flat bottom regions, achieving 8-12% frictional resistance reduction.',
    trl: 7,
    commercialPotential: 'Very High'
  },
  {
    id: 'pat-2',
    patentNumber: 'US12,489,102B2',
    title: 'Telescopic Wing-Sail Propulsion Assembly with Automated Stall Prevention and Force Measurement',
    applicant: 'Oceanbird Maritime AB',
    filingDate: '2025-11-20',
    jurisdiction: 'USPTO',
    cpcCode: 'B63H 9/06 (Wind power auxiliary propulsion)',
    abstract: 'A multi-segment rigid composite wing-sail equipped with distributed trailing edge flaps and dynamic angle of attack actuators linked to real-time apparent wind vector sensors.',
    trl: 8,
    commercialPotential: 'Very High'
  },
  {
    id: 'pat-3',
    patentNumber: 'EP4,192,801A1',
    title: 'Subsea Mooring Tensioner with Integrated Piezoelectric Energy Harvesting and Wireless Acoustic Telemetry',
    applicant: 'Equinor Energy AS / NTNU',
    filingDate: '2026-01-08',
    jurisdiction: 'EPO',
    cpcCode: 'B63B 21/50 (Anchoring arrangement for offshore floating structures)',
    abstract: 'A self-powered mooring line load monitoring shackle that converts cyclic wave-induced mechanical strain into electrical charge for continuous acoustic telemetry of fatigue damage.',
    trl: 6,
    commercialPotential: 'High'
  }
];

export const GLOBAL_MARITIME_DATASETS: DatasetItem[] = [
  {
    id: 'ds-1',
    name: 'Global AIS Vessel Trajectories & Bunker Telemetry Benchmark (2024-2026)',
    category: 'AIS',
    recordsCount: '128,000,000 Waypoints',
    fileSize: '48.2 GB',
    format: 'Parquet',
    doi: '10.5281/zenodo.892140',
    license: 'Open Access CC-BY 4.0',
    priceUSD: 0,
    description: 'High-frequency 10-second AIS transponder feeds across 4,500 commercial vessels (Container, Bulk, Tanker) coupled with ECMWF ERA5 wave and wind hindcast.'
  },
  {
    id: 'ds-2',
    name: 'DTC-Container Ship & KVLCC2 Benchmark Hull RANSE CFD Pressure Fields',
    category: 'Hull CFD',
    recordsCount: '450 Full-Scale Simulations',
    fileSize: '180.5 GB',
    format: 'HDF5',
    doi: '10.5281/zenodo.773912',
    license: 'Academic Only',
    priceUSD: 0,
    description: 'Mesh-converged OpenFOAM and Star-CCM+ turbulent flow velocity vectors (u, v, w), volume of fluid (VOF) free surface elevation, and skin friction coefficients across Froude numbers Fn=0.10 to 0.30.'
  },
  {
    id: 'ds-3',
    name: 'Main Engine Cylinder In-Cylinder Pressure & Dynamic Heat Release Rate Database',
    category: 'Engine Telemetry',
    recordsCount: '2,400 Engine Running Hours',
    fileSize: '14.8 GB',
    format: 'CSV',
    doi: '10.5281/zenodo.901145',
    license: 'Open Access CC-BY 4.0',
    priceUSD: 0,
    description: 'High-speed crank-angle resolved (0.1 deg) cylinder pressure waveforms for MAN B&W 6S50ME and Wärtsilä X72 under standard MDO, Biofuel B30, and Methanol dual-fuel operations.'
  },
  {
    id: 'ds-4',
    name: 'North Sea & Gulf of Mexico Metocean Wave Buoy Directional Spectral Dataset (10-Year)',
    category: 'Weather & Metocean',
    recordsCount: '10-Year Continuous Time Series',
    fileSize: '8.4 GB',
    format: 'NetCDF',
    doi: '10.5281/zenodo.661902',
    license: 'Open Access CC-BY 4.0',
    priceUSD: 0,
    description: 'Significant wave height (Hs), peak period (Tp), mean zero-upcrossing period (Tz), directional spreading function, and surface ocean current velocities at 15 offshore floating wind test sites.'
  },
  {
    id: 'ds-5',
    name: 'Global Ship Recycling HazMat & IHM Component Assay Index (1,200 Scrapped Vessels)',
    category: 'Recycling HazMat',
    recordsCount: '1,200 Vessels / 85,000 Samples',
    fileSize: '2.1 GB',
    format: 'JSON',
    doi: '10.5281/zenodo.834019',
    license: 'Commercial License',
    priceUSD: 49,
    description: 'Hong Kong Convention Part I Material Inventories detailing heavy metals (lead, cadmium, hexavalent chromium), asbestos gaskets, PCB ballasts, and ODS refrigerants mapped to ship age, shipyard, and vessel class.'
  }
];

export const UNIVERSITY_RANKINGS = [
  { rank: 1, institution: 'Norwegian University of Science and Technology (NTNU)', country: 'Norway', hIndex: 142, publications: 1840, topField: 'Marine Technology & Hydrodynamics' },
  { rank: 2, institution: 'Delft University of Technology (TU Delft)', country: 'Netherlands', hIndex: 138, publications: 1720, topField: 'Ship Design & Coastal Engineering' },
  { rank: 3, institution: 'Seoul National University (SNU)', country: 'South Korea', hIndex: 131, publications: 1650, topField: 'Smart Shipbuilding & CFD' },
  { rank: 4, institution: 'University of Michigan (Ann Arbor)', country: 'USA', hIndex: 129, publications: 1490, topField: 'Naval Architecture & Marine Engineering' },
  { rank: 5, institution: 'Shanghai Jiao Tong University (SJTU)', country: 'China', hIndex: 127, publications: 2100, topField: 'Ocean Engineering & Offshore Structures' },
  { rank: 6, institution: 'University of Southampton', country: 'UK', hIndex: 122, publications: 1380, topField: 'Maritime Decarbonization & Ship Noise' },
  { rank: 7, institution: 'Technical University of Denmark (DTU)', country: 'Denmark', hIndex: 119, publications: 1240, topField: 'Floating Wind & Green Propulsion' },
  { rank: 8, institution: 'National University of Singapore (NUS)', country: 'Singapore', hIndex: 116, publications: 1310, topField: 'Smart Ports & MASS Navigation' }
];
