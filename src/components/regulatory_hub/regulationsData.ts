import {
  ImoConventionItem,
  SolasChapter,
  MarpolAnnex,
  StcwRequirement,
  ClassSocietyRuleItem,
  IacsItem,
  FlagStateRequirement,
  RegulatoryAmendment,
  StatutoryCertificateItem,
  PscChecklistItem
} from './regTypes';

export const IMO_CONVENTIONS_DATA: ImoConventionItem[] = [
  {
    id: 'solas',
    code: 'SOLAS 1974',
    title: 'Safety of Life at Sea',
    fullName: 'International Convention for the Safety of Life at Sea, 1974, as amended',
    adoptionYear: 1974,
    entryIntoForceDate: '1980-05-25',
    latestMajorRevision: '2024-01-01 (MSC.474(102) & MSC.482(103))',
    category: 'Safety',
    summary: 'The cornerstone maritime safety treaty covering construction, watertight integrity, fire protection, life-saving appliances, radiocommunications, navigation safety, dangerous goods carriage, and safety management.',
    keyProtocols: ['1978 SOLAS Protocol (Tanker safety & pollution)', '1988 SOLAS Protocol (HSSC Harmonized System of Survey and Certification)'],
    mandatoryCodes: [
      'LSA Code (Life-Saving Appliances)',
      'FSS Code (Fire Safety Systems)',
      'FTP Code (Fire Test Procedures)',
      'ISM Code (Safety Management)',
      'ISPS Code (Ship & Port Security)',
      'Polar Code (Part I-A Safety)',
      'IGF Code (Low-Flashpoint Fuels)',
      'IGC Code (Liquefied Gases in Bulk)',
      'IBC Code (Chemicals in Bulk)',
      'IMSBC Code (Solid Bulk Cargoes)',
      'IMDG Code (Dangerous Goods)',
      'Grain Code (Safe Carriage of Grain)',
      'HSC Code 2000 (High-Speed Craft)',
      'ESP Code (Enhanced Survey Programme for Bulk Carriers & Oil Tankers)'
    ],
    keyCertificates: [
      'Passenger Ship Safety Certificate (PSSC)',
      'Cargo Ship Safety Construction Certificate (CSSC)',
      'Cargo Ship Safety Equipment Certificate (CSSE)',
      'Cargo Ship Safety Radio Certificate (CSSR)',
      'Safety Management Certificate (SMC / ISM)',
      'International Ship Security Certificate (ISSC / ISPS)'
    ],
    chaptersCount: 15,
    status: 'In Force',
    iconName: 'Shield'
  },
  {
    id: 'marpol',
    code: 'MARPOL 73/78',
    title: 'Marine Pollution Prevention',
    fullName: 'International Convention for the Prevention of Pollution from Ships, 1973, as modified by the Protocol of 1978 relating thereto',
    adoptionYear: 1973,
    entryIntoForceDate: '1983-10-02',
    latestMajorRevision: '2023-01-01 (EEXI & CII MEPC.328(76)) / 2024 Scrubber & BDN updates',
    category: 'Marine Environment',
    summary: 'The principal environmental convention governing the prevention of operational and accidental pollution by oil, noxious chemicals, packaged goods, sewage, garbage, and atmospheric emissions (GHG, SOx, NOx).',
    keyProtocols: ['1978 Protocol', '1997 Protocol (Adopted Annex VI - Air Pollution)'],
    mandatoryCodes: [
      'NOx Technical Code 2008',
      'IBC Code (Chemical Pollution Part)',
      'BCH Code',
      'Polar Code (Part II-A Pollution Prevention)',
      'Condition Assessment Scheme (CAS)'
    ],
    keyCertificates: [
      'International Oil Pollution Prevention Certificate (IOPP)',
      'International Pollution Prevention Certificate for the Carriage of Noxious Liquid Substances in Bulk (INLS)',
      'International Sewage Pollution Prevention Certificate (ISPP)',
      'International Air Pollution Prevention Certificate (IAPP)',
      'International Energy Efficiency Certificate (IEEC)',
      'Statement of Compliance for Fuel Oil Consumption Reporting & CII Rating'
    ],
    chaptersCount: 6,
    status: 'In Force',
    iconName: 'Waves'
  },
  {
    id: 'stcw',
    code: 'STCW 1978',
    title: 'Standards of Training, Certification & Watchkeeping',
    fullName: 'International Convention on Standards of Training, Certification and Watchkeeping for Seafarers, 1978, as amended (2010 Manila Amendments)',
    adoptionYear: 1978,
    entryIntoForceDate: '1984-04-28',
    latestMajorRevision: '2012-01-01 (2010 Manila Amendments) & Comprehensive Review 2026',
    category: 'Seafarers & Manning',
    summary: 'Establishes baseline international qualification standards for masters, officers, ratings, and electro-technical crew on seagoing merchant ships, including mandatory rest hour limits and simulator training.',
    keyProtocols: ['1991 Amendments', '1995 Major Revision (STCW Code Parts A & B)', '2010 Manila Amendments'],
    mandatoryCodes: [
      'STCW Code Part A (Mandatory Standards of Competence)',
      'STCW Code Part B (Recommended Guidance)'
    ],
    keyCertificates: [
      'Certificate of Competency (CoC)',
      'Certificate of Proficiency (CoP)',
      'Flag State STCW Endorsement of Recognition (CRA / Endorsement)',
      'Medical Fitness Certificate (STCW Reg. I/9)'
    ],
    chaptersCount: 8,
    status: 'In Force',
    iconName: 'Users'
  },
  {
    id: 'mlc',
    code: 'MLC 2006',
    title: 'Maritime Labour Convention',
    fullName: 'Maritime Labour Convention, 2006 (ILO Convention as amended)',
    adoptionYear: 2006,
    entryIntoForceDate: '2013-08-20',
    latestMajorRevision: '2022 Amendments (In Force Dec 2024 / 2025 updates for seafarer connectivity)',
    category: 'Seafarers & Manning',
    summary: 'The "Fourth Pillar" of international maritime law established by the ILO, guaranteeing minimum working and living conditions, seafarer employment agreements, wages, rest hours, food, accommodation, and repatriation.',
    keyProtocols: ['2014 Amendments (Abandonment & Financial Security)', '2018 Amendments (Piracy wages)', '2022 Amendments (Social connectivity, PPE fit, food)'],
    mandatoryCodes: ['MLC Regulations and Code (Part A Standards and Part B Guidelines)'],
    keyCertificates: [
      'Maritime Labour Certificate (MLC)',
      'Declaration of Maritime Labour Compliance (DMLC Part I & Part II)',
      'Financial Security Certificates (Regulation 2.5 Repatriation & Regulation 4.2 Shipowner Liability)'
    ],
    chaptersCount: 5,
    status: 'In Force',
    iconName: 'Award'
  },
  {
    id: 'loadlines',
    code: 'LL 1966',
    title: 'International Convention on Load Lines',
    fullName: 'International Convention on Load Lines, 1966, as modified by the 1988 Protocol',
    adoptionYear: 1966,
    entryIntoForceDate: '1968-07-21',
    latestMajorRevision: '1988 Protocol (HSSC System & 2003 revised calculation rules)',
    category: 'Safety',
    summary: 'Governs the minimum freeboard, reserve buoyancy, structural strength of hull enclosures, weather-tight hatch covers, freeing ports, and seasonal load lines (Tropical, Summer, Winter, Winter North Atlantic).',
    keyProtocols: ['1988 Protocol (HSSC & Stability Harmonization)'],
    mandatoryCodes: ['Damage Stability and Freeboard Formulation Rules'],
    keyCertificates: [
      'International Load Line Certificate (1966)',
      'International Load Line Exemption Certificate'
    ],
    chaptersCount: 4,
    status: 'In Force',
    iconName: 'Anchor'
  },
  {
    id: 'colreg',
    code: 'COLREG 1972',
    title: 'Collision Regulations',
    fullName: 'Convention on the International Regulations for Preventing Collisions at Sea, 1972',
    adoptionYear: 1972,
    entryIntoForceDate: '1977-07-15',
    latestMajorRevision: '2007 Amendments / MASS Autonomous Ship Navigation Guidance',
    category: 'Safety',
    summary: 'Contains the international "Rules of the Road" at sea: steering and sailing rules, conduct in restricted visibility, navigation lights and shapes, sound and light signals, and traffic separation schemes.',
    keyProtocols: ['Annex I-IV Technical Specifications for Navigation Lights & Sound Appliances'],
    mandatoryCodes: ['COLREG Part A-E and Annexes'],
    keyCertificates: ['Safety Equipment Certificate Verification of Lights/Shapes/Whistles'],
    chaptersCount: 5,
    status: 'In Force',
    iconName: 'Compass'
  },
  {
    id: 'bwm',
    code: 'BWM 2004',
    title: 'Ballast Water Management Convention',
    fullName: 'International Convention for the Control and Management of Ships’ Ballast Water and Sediments, 2004',
    adoptionYear: 2004,
    entryIntoForceDate: '2017-09-08',
    latestMajorRevision: '2024-09-08 (Mandatory D-2 Standard for all international trading vessels)',
    category: 'Marine Environment',
    summary: 'Prevents the spread of invasive aquatic organisms in ballast water by requiring approved Ballast Water Treatment Systems (BWMS - D-2 standard) and detailed Ballast Water Record Books.',
    keyProtocols: ['Code for Approval of Ballast Water Management Systems (BWMS Code - Res. MEPC.300(72))'],
    mandatoryCodes: ['BWMS Code', 'Guidelines G1 to G14'],
    keyCertificates: ['International Ballast Water Management Certificate (IBWMC)'],
    chaptersCount: 5,
    status: 'In Force',
    iconName: 'Droplet'
  },
  {
    id: 'tonnage',
    code: 'TONNAGE 1969',
    title: 'Tonnage Measurement of Ships',
    fullName: 'International Convention on Tonnage Measurement of Ships, 1969',
    adoptionYear: 1969,
    entryIntoForceDate: '1982-07-18',
    latestMajorRevision: 'TM.5/Circ.6 Guidance for enclosed spaces and machinery',
    category: 'Safety',
    summary: 'Standardized universal method for calculating Gross Tonnage (GT) and Net Tonnage (NT) used for international port dues, safety regulation thresholds, pilotage, and canal tolls (Suez/Panama).',
    keyProtocols: ['TM.5 Circulars'],
    mandatoryCodes: ['Regulations for Determining Gross and Net Tonnages of Ships'],
    keyCertificates: ['International Tonnage Certificate (1969)'],
    chaptersCount: 2,
    status: 'In Force',
    iconName: 'Maximize'
  },
  {
    id: 'hongkong',
    code: 'HKC 2009',
    title: 'Hong Kong Ship Recycling Convention',
    fullName: 'Hong Kong International Convention for the Safe and Environmentally Sound Recycling of Ships, 2009',
    adoptionYear: 2009,
    entryIntoForceDate: '2025-06-26 (Ratified & In-Force)',
    latestMajorRevision: '2025-06-26 Implementation',
    category: 'Marine Environment',
    summary: 'Mandates an Inventory of Hazardous Materials (IHM Part I) on all operational ships ≥500 GT, prohibits hazardous substances (Asbestos, ODS, PCB), and sets authorized Ship Recycling Facility standards.',
    keyProtocols: ['MEPC.379(80) 2023 Guidelines for IHM Development'],
    mandatoryCodes: ['Ship Recycling Facility Plan Guidelines', 'IHM Guidelines'],
    keyCertificates: [
      'International Certificate on Inventory of Hazardous Materials (ICIHM)',
      'International Ready for Recycling Certificate (IRRC)'
    ],
    chaptersCount: 4,
    status: 'In Force',
    iconName: 'Recycle'
  }
];

export const SOLAS_CHAPTERS_DATA: SolasChapter[] = [
  {
    chapter: 'Chapter I',
    roman: 'I',
    title: 'General Provisions',
    description: 'Statutory survey regimes, issuance of safety certificates, control of ships by Port State authorities, and casualty investigation requirements.',
    certificatesAssociated: ['Cargo Ship Safety Construction', 'Cargo Ship Safety Equipment', 'Cargo Ship Safety Radio', 'Passenger Ship Safety Certificate'],
    checklistsCount: 18,
    keyRegulations: [
      {
        regNumber: 'Reg. I/6 - I/10',
        title: 'Surveys and Certification under HSSC',
        summary: 'Specifies mandatory initial, annual, intermediate, periodical, and renewal surveys for hull, machinery, safety equipment, and radio installations within ±3 months of anniversary date.',
        applicability: 'All passenger ships & cargo ships ≥500 GT on international voyages',
        requiredEquipmentOrDoc: ['Approved Survey Records', 'Class Society Survey Statements', 'Harmonized Certificates'],
        amendmentsHistory: 'Adopted under 1988 Protocol; updated 2024',
        legalType: 'Mandatory Statutory Requirement'
      },
      {
        regNumber: 'Reg. I/19',
        title: 'Port State Control (PSC)',
        summary: 'Empowers authorized Port State Control officers to inspect statutory certificates and, where clear grounds exist, carry out more detailed inspections and detain sub-standard vessels.',
        applicability: 'Foreign ships in port of another contracting government',
        requiredEquipmentOrDoc: ['Original Statutory Certificates', 'Official Logbooks', 'Crew Rest Hour Records'],
        amendmentsHistory: 'Ongoing IMO PSC Procedures Res. A.1155(32)',
        legalType: 'Mandatory Statutory Requirement'
      }
    ]
  },
  {
    chapter: 'Chapter II-1',
    roman: 'II-1',
    title: 'Construction – Structure, Subdivision, Stability, Machinery & Electrical',
    description: 'Subdivision rules, probabilistic damage stability, double bottoms, watertight bulkheads, steering gear redundancies, bilge pumping, and emergency electrical generators.',
    certificatesAssociated: ['Cargo Ship Safety Construction Certificate (CSSC)', 'Passenger Ship Safety Certificate'],
    checklistsCount: 34,
    keyRegulations: [
      {
        regNumber: 'Reg. II-1/3-1 & 3-8',
        title: 'Structural, Mechanical & Towing/Mooring Arrangements',
        summary: 'Ships must be designed, constructed, and maintained in compliance with recognized Classification Society rules. Reg 3-8 mandates safe mooring equipment design and inspection regimes (In-force Jan 2024).',
        applicability: 'All newbuilds & existing ships undergoing mooring inspection',
        requiredEquipmentOrDoc: ['Class Approved Scantling Plans', 'Mooring System Management Plan (MSMP)', 'Towing and Mooring Inspection Register'],
        amendmentsHistory: 'Mooring updates mandatory under MSC.474(102) effective 1 Jan 2024',
        legalType: 'Mandatory Statutory Requirement'
      },
      {
        regNumber: 'Reg. II-1/6 to 8-1',
        title: 'Subdivision and Damage Stability (Probabilistic Method)',
        summary: 'Calculates the required subdivision index R and attained index A to ensure vessel survivability after hull breach in various loading conditions.',
        applicability: 'Passenger ships & cargo ships ≥80m in length (L)',
        requiredEquipmentOrDoc: ['Approved Intact & Damage Stability Booklet', 'Onboard Class-Approved Stability Computer with Damage Calculation module'],
        amendmentsHistory: 'Revised 2008 IS Code & MSC.421(98) updates',
        legalType: 'Mandatory Statutory Requirement'
      },
      {
        regNumber: 'Reg. II-1/29 & 30',
        title: 'Steering Gear Systems & Emergency Redundancy',
        summary: 'Main steering gear must be capable of putting rudder over from 35° on one side to 30° on the other in 28 seconds at max service speed. Auxiliary steering must activate within 60 seconds.',
        applicability: 'All cargo ships ≥500 GT and passenger ships',
        requiredEquipmentOrDoc: ['Alternative Power Supply (Emergency Generator)', 'Rudder Angle Indicators on Bridge', 'Emergency Steering Drill Log'],
        amendmentsHistory: 'IACS UR M42 aligned',
        legalType: 'Mandatory Statutory Requirement'
      },
      {
        regNumber: 'Reg. II-1/42 & 43',
        title: 'Emergency Source of Electrical Power',
        summary: 'Emergency generator must start automatically within 45 seconds of main power blackout and supply emergency lighting, navigation aids, fire pumps, and steering gear for 18h (cargo) / 36h (passenger).',
        applicability: 'All passenger ships & cargo ships ≥500 GT',
        requiredEquipmentOrDoc: ['Emergency Switchboard with Automatic Bus Tie', 'Cold-Start Battery / Air Accumulator Bank', 'Weekly Auto-Start Test Log'],
        amendmentsHistory: 'Harmonized with IACS UR E13',
        legalType: 'Mandatory Statutory Requirement'
      }
    ]
  },
  {
    chapter: 'Chapter II-2',
    roman: 'II-2',
    title: 'Construction – Fire Protection, Detection & Extinction',
    description: 'Structural fire integrity (A, B, C class divisions), inert gas systems for tankers, fixed CO2/foam/water-mist firefighting systems, fire detection loops, EEBDs, and firefighter outfits.',
    certificatesAssociated: ['Cargo Ship Safety Equipment Certificate (CSSE)', 'Passenger Ship Safety Certificate'],
    checklistsCount: 42,
    keyRegulations: [
      {
        regNumber: 'Reg. II-2/4 & 4.5.5',
        title: 'Inert Gas Systems (IGS) for Tankers',
        summary: 'Mandatory IGS for all crude oil and chemical tankers ≥8,000 DWT to maintain oxygen levels in cargo tanks below 8% by volume and positive inert gas pressure.',
        applicability: 'Oil & chemical tankers ≥8,000 DWT constructed on or after 1 Jan 2016',
        requiredEquipmentOrDoc: ['FSS Code Ch. 15 Compliant Inert Gas Plant', 'Oxygen Analyzer Calibration Records', 'Pressure/Vacuum PV Breakers'],
        amendmentsHistory: 'Threshold lowered from 20,000 DWT to 8,000 DWT by MSC.365(93)',
        legalType: 'Mandatory Statutory Requirement'
      },
      {
        regNumber: 'Reg. II-2/10',
        title: 'Fire Fighting Appliances and Main/Emergency Fire Pumps',
        summary: 'Requires independently driven emergency fire pump located outside machinery spaces, capable of delivering two jets of water at minimum 0.27 N/mm² pressure.',
        applicability: 'All passenger ships and cargo ships ≥500 GT',
        requiredEquipmentOrDoc: ['Emergency Fire Pump with Dedicated Fuel Tank (3 hours run time)', 'International Shore Connection', 'Fire Hoses, Nozzles, and Hydrants'],
        amendmentsHistory: 'Tested during all PSC safety inspections',
        legalType: 'Mandatory Statutory Requirement'
      },
      {
        regNumber: 'Reg. II-2/13',
        title: 'Means of Escape and Emergency Escape Breathing Devices (EEBD)',
        summary: 'Continuous fire-sheltered escape trunks with self-closing A-60 doors from engine rooms. Minimum 2 EEBDs per accommodation zone and at least 2 in machinery spaces plus spares.',
        applicability: 'All vessels',
        requiredEquipmentOrDoc: ['SOLAS-approved 15-minute EEBD units', 'Photoluminescent Low-Location Lighting (LLL) in passenger corridors', 'Escape Route Signage'],
        amendmentsHistory: 'FSS Code Chapter 3',
        legalType: 'Mandatory Statutory Requirement'
      }
    ]
  },
  {
    chapter: 'Chapter III',
    roman: 'III',
    title: 'Life-Saving Appliances and Arrangements',
    description: 'Totally enclosed lifeboats, free-fall lifeboats, rescue boats, marine evacuation systems (MES), immersion suits, lifejackets, EPIRBs, SARTs, and mandatory monthly abandon ship drills.',
    certificatesAssociated: ['Cargo Ship Safety Equipment Certificate (CSSE)', 'Passenger Ship Safety Certificate'],
    checklistsCount: 38,
    keyRegulations: [
      {
        regNumber: 'Reg. III/20 & 36',
        title: 'Operational Readiness, Maintenance & Inspection of LSA',
        summary: 'Weekly and monthly inspections of lifeboats and falls. Mandatory 5-yearly dynamic overload test and overhaul of release mechanisms by authorized service providers (Res. MSC.402(96)).',
        applicability: 'All ships on international voyages',
        requiredEquipmentOrDoc: ['LSA Maintenance Logbook', 'On-load Release Mechanism Service Certificates', 'Monthly Launching and Maneuvering Drill Records'],
        amendmentsHistory: 'MSC.402(96) mandatory service provider authorization since Jan 2020',
        legalType: 'Mandatory Statutory Requirement'
      },
      {
        regNumber: 'Reg. III/31',
        title: 'Survival Craft and Rescue Boats on Cargo Ships',
        summary: 'Cargo ships must carry totally enclosed lifeboats on each side capable of accommodating 100% of persons onboard, or a single free-fall lifeboat at the stern accommodating 100% plus 100% liferaft capacity on each side.',
        applicability: 'All cargo ships ≥500 GT',
        requiredEquipmentOrDoc: ['LSA Code Type-Approved Lifeboats', 'Fast Rescue Boat (FRB) / Rescue Boat with 4-hour search endurance', 'Hydrostatic Release Units (HRU) for liferafts'],
        amendmentsHistory: 'LSA Code revisions for lifejacket sizing and release hooks',
        legalType: 'Mandatory Statutory Requirement'
      },
      {
        regNumber: 'Reg. III/32',
        title: 'Immersion Suits and Thermal Protective Aids',
        summary: 'An approved immersion suit for every person onboard, plus additional suits at remotely located watch/workstations (bridge, engine control room, bow lookout).',
        applicability: 'All cargo ships unless operating exclusively in warm tropical zones as exempted by Flag',
        requiredEquipmentOrDoc: ['SOLAS Insulated Immersion Suits with Lights and Whistles', 'Monthly Visual Inspection Records', '3-yearly Air Pressure Leak Test'],
        amendmentsHistory: 'MSC.1/Circ.1114 air pressure testing guidelines',
        legalType: 'Mandatory Statutory Requirement'
      }
    ]
  },
  {
    chapter: 'Chapter IV',
    roman: 'IV',
    title: 'Radiocommunications (GMDSS)',
    description: 'Global Maritime Distress and Safety System (GMDSS) provisions by sea area (A1, A2, A3, A4), VHF DSC, MF/HF DSC, Inmarsat/Iridium terminals, NAVTEX, SARTs, and EPIRBs.',
    certificatesAssociated: ['Cargo Ship Safety Radio Certificate (CSSR)'],
    checklistsCount: 22,
    keyRegulations: [
      {
        regNumber: 'Reg. IV/7 to 11',
        title: 'GMDSS Equipment by Sea Area (A1 to A4)',
        summary: 'Mandatory radio installations based on operational area. Sea Area A3 modernised to include recognized mobile satellite services (Inmarsat-C and Iridium GMDSS).',
        applicability: 'All cargo ships ≥300 GT and all passenger ships',
        requiredEquipmentOrDoc: ['VHF with DSC (Ch. 70) and Watch Receiver', 'MF/HF with DSC and Radiotelex', '406 MHz COSPAS-SARSAT Float-Free EPIRB', 'Dual Radar SARTs or AIS-SARTs'],
        amendmentsHistory: 'GMDSS Modernization amendments entered into force 1 Jan 2024 (MSC.496(105))',
        legalType: 'Mandatory Statutory Requirement'
      }
    ]
  },
  {
    chapter: 'Chapter V',
    roman: 'V',
    title: 'Safety of Navigation',
    description: 'Mandatory navigation bridge equipment (ECDIS, Radar/ARPA, AIS, VDR/S-VDR, BNWAS, Gyrocompass, Speed Log, Echo Sounder), voyage planning, passage monitoring, and distress response.',
    certificatesAssociated: ['Cargo Ship Safety Equipment Certificate (CSSE)'],
    checklistsCount: 30,
    keyRegulations: [
      {
        regNumber: 'Reg. V/19',
        title: 'Carriage Requirements for Shipborne Navigational Systems',
        summary: 'Mandates dual Electronic Chart Display and Information Systems (ECDIS) with approved backup, AIS Class A, BNWAS, VDR (with annual performance test APT), and 9 GHz / 3 GHz Radars with ARPA.',
        applicability: 'All ships regardless of size for general navigation aids; ECDIS mandatory for all commercial ships',
        requiredEquipmentOrDoc: ['Type-Approved ECDIS with Latest IHO Standards (S-52/S-63/S-100 ready)', 'Voyage Data Recorder (VDR) with Annual Performance Test Certificate', 'Bridge Navigational Watch Alarm System (BNWAS)'],
        amendmentsHistory: 'IHO Presentation Library 4.0 update; S-100 migration timeline 2026-2029',
        legalType: 'Mandatory Statutory Requirement'
      },
      {
        regNumber: 'Reg. V/34',
        title: 'Safe Navigation and Avoidance of Dangerous Situations (Passage Planning)',
        summary: 'Master must ensure the intended voyage is planned using appropriate nautical charts and publications from berth-to-berth (Appraisal, Planning, Execution, Monitoring).',
        applicability: 'All ships setting to sea',
        requiredEquipmentOrDoc: ['Approved Comprehensive Passage Plan', 'Up-to-date Electronic Navigational Charts (ENC)', 'Admiralty Sailing Directions and Notices to Mariners (NtM)'],
        amendmentsHistory: 'IMO Res. A.893(21) Guidelines for Voyage Planning',
        legalType: 'Mandatory Statutory Requirement'
      }
    ]
  },
  {
    chapter: 'Chapter IX',
    roman: 'IX',
    title: 'Management for the Safe Operation of Ships (ISM Code)',
    description: 'Mandatory implementation of the International Safety Management (ISM) Code, requiring a structured Safety Management System (SMS), Designated Person Ashore (DPA), and safety audits.',
    certificatesAssociated: ['Document of Compliance (DOC - Company)', 'Safety Management Certificate (SMC - Ship)'],
    checklistsCount: 25,
    keyRegulations: [
      {
        regNumber: 'Reg. IX/3 & 4',
        title: 'Safety Management System (SMS) & Certification',
        summary: 'Every ship operating company must develop, implement, and maintain a documented SMS that ensures compliance with mandatory rules and codes. Company holds DOC; vessel holds SMC.',
        applicability: 'All passenger ships, tankers, bulk carriers, gas carriers, and other cargo ships ≥500 GT',
        requiredEquipmentOrDoc: ['Company Safety Management Manual', 'Valid DOC issued by Flag/RO', 'Valid SMC with Intermediate Audit Endorsement (between 2nd and 3rd year)'],
        amendmentsHistory: 'Continuous updates, including Resolution MSC.428(98) Maritime Cyber Risk Management in SMS',
        legalType: 'Mandatory Statutory Requirement'
      }
    ]
  },
  {
    chapter: 'Chapter XI-1 & XI-2',
    roman: 'XI-1 / XI-2',
    title: 'Special Measures to Enhance Maritime Safety & Security (ISPS Code)',
    description: 'Ship Identification Numbers (IMO Number), Continuous Synopsis Record (CSR), Ship Security Plan (SSP), Ship Security Officer (SSO), Ship Security Alert System (SSAS), and Security Levels 1, 2, 3.',
    certificatesAssociated: ['International Ship Security Certificate (ISSC)', 'Continuous Synopsis Record (CSR)'],
    checklistsCount: 28,
    keyRegulations: [
      {
        regNumber: 'Reg. XI-2/4 to 9',
        title: 'International Ship and Port Facility Security (ISPS) Code',
        summary: 'Requires an approved Ship Security Plan (SSP), Company Security Officer (CSO), Ship Security Officer (SSO), access control procedures, and covert Ship Security Alert System (SSAS) activation buttons.',
        applicability: 'All passenger ships and cargo ships ≥500 GT on international voyages',
        requiredEquipmentOrDoc: ['Class/Flag Approved Ship Security Plan (SSP)', 'International Ship Security Certificate (ISSC)', 'Functional SSAS with tested distress transmission paths'],
        amendmentsHistory: 'Adopted Dec 2002; enhanced cyber security threat management integrations',
        legalType: 'Mandatory Statutory Requirement'
      }
    ]
  },
  {
    chapter: 'Chapter XIV & XV',
    roman: 'XIV / XV',
    title: 'Safety Measures for Polar Waters (Polar Code) & Industrial Personnel (IP Code)',
    description: 'Mandatory safety and structural requirements for ships navigating in Arctic and Antarctic ice-covered waters (Polar Code), and safety standards for transporting offshore industrial personnel (IP Code).',
    certificatesAssociated: ['Polar Ship Certificate', 'Industrial Personnel Safety Certificate (IPSC)'],
    checklistsCount: 16,
    keyRegulations: [
      {
        regNumber: 'Reg. XIV/2 (Polar Code)',
        title: 'Polar Code Safety Measures (Part I-A)',
        summary: 'Specifies ice-strengthening categories (Category A, B, C), de-icing systems, cold-environment survival gear, ice navigators (STCW V/4), and Polar Water Operational Manual (PWOM).',
        applicability: 'All ships operating in Arctic or Antarctic defined polar waters',
        requiredEquipmentOrDoc: ['Polar Ship Certificate', 'Approved Polar Water Operational Manual (PWOM)', 'Cold-Climate Survival Suits & Group Survival Kits'],
        amendmentsHistory: 'In force 1 Jan 2017; extended to non-SOLAS fishing and pleasure vessels 2024-2026',
        legalType: 'Mandatory Statutory Requirement'
      },
      {
        regNumber: 'Reg. XV/1-3 (IP Code)',
        title: 'International Code of Safety for Ships Carrying Industrial Personnel (IP Code)',
        summary: 'Regulates safe transport of offshore wind and oil/gas technicians on specialized support craft, covering dynamic positioning stability, transfer equipment, and life-saving provisions.',
        applicability: 'Cargo ships and high-speed craft carrying >12 industrial personnel',
        requiredEquipmentOrDoc: ['Industrial Personnel Safety Certificate', 'Offshore Walk-to-Work Gangway Certification', 'Specialized Passenger Briefing Records'],
        amendmentsHistory: 'Adopted by MSC.527(106), mandatory entry into force 1 July 2024',
        legalType: 'Mandatory Statutory Requirement'
      }
    ]
  }
];

export const MARPOL_ANNEXES_DATA: MarpolAnnex[] = [
  {
    annexNumber: 1,
    roman: 'Annex I',
    title: 'Prevention of Pollution by Oil',
    shortName: 'Oil Pollution & Fuel Systems',
    inForceDate: '1983-10-02',
    latestResolution: 'MEPC.343(78) / MEPC.329(76) HFO Arctic Ban',
    summary: 'Controls the operational discharge of oily bilges, ballast water, and tank washings. Mandates 15 ppm Oily Water Separators (OWS), Oil Discharge Monitoring and Control Systems (ODMCS), double hulls for oil tankers, and Oil Record Books Part I & II.',
    dischargeCriteria: [
      {
        area: 'Outside Special Areas (>12 NM from land)',
        substance: 'Machinery space bilges',
        limitOrCondition: 'Oil content <15 ppm through approved OWS with automatic 15 ppm alarm & stopping device, en route, no dilution.',
        recordRequired: 'Oil Record Book (ORB) Part I (Machinery Space Operations)'
      },
      {
        area: 'Inside Special Areas (Baltic, Mediterranean, Black Sea, Red Sea, Gulfs, Antarctic, Arctic)',
        substance: 'Machinery space bilges',
        limitOrCondition: 'Oil content <15 ppm via OWS with auto-stopping device; zero discharge in Antarctic waters.',
        recordRequired: 'Oil Record Book Part I'
      },
      {
        area: 'Cargo tank washings (Tankers) Outside Special Areas',
        substance: 'Oily mixture from cargo tanks',
        limitOrCondition: 'Vessel is proceeding en route; instantaneous rate of discharge of oil content ≤30 liters per nautical mile; total quantity discharged does not exceed 1/30,000 of the total cargo; vessel is >50 NM from nearest land; ODMCS operating.',
        recordRequired: 'Oil Record Book Part II (Cargo/Ballast Operations)'
      }
    ],
    mandatoryEquipment: [
      '15 ppm Bilge Separator (Res. MEPC.107(49) certified)',
      '15 ppm Bilge Alarm (Oil Content Meter) with tamper-proof data logger',
      'Automatic 3-Way Stopping Valve',
      'Dedicated Sludge Tank (Standard Discharge Connection Reg. 13)',
      'Oil Discharge Monitoring and Control System (ODMCS) for tankers',
      'Double Hull and Double Bottom for Oil Tankers (Reg. 19)'
    ],
    requiredCertificates: ['International Oil Pollution Prevention Certificate (IOPP) with Form A/B'],
    requiredPlansAndRecords: [
      'Shipboard Oil Pollution Emergency Plan (SOPEP Reg. 37)',
      'Oil Record Book Part I (Machinery)',
      'Oil Record Book Part II (Cargo/Ballast - Tankers)',
      'Sludge Piping Layout Diagram'
    ],
    keyAmendments2024_2028: [
      'Arctic Heavy Fuel Oil (HFO) Carriage and Use Ban (Reg. 43A - In force 1 July 2024)',
      'Electronic Record Books (ERB) approval guidelines update'
    ]
  },
  {
    annexNumber: 2,
    roman: 'Annex II',
    title: 'Control of Pollution by Noxious Liquid Substances (NLS) in Bulk',
    shortName: 'Chemical Tankers & NLS Cargoes',
    inForceDate: '1987-04-06',
    latestResolution: 'MEPC.315(74) High-Viscosity Persistent Floating NLS',
    summary: 'Classifies chemical cargoes into Categories X (major hazard), Y (hazard), Z (minor hazard), and OS (Other Substances). Sets strict tank pre-wash, stripping residue limits (≤75 liters per tank), and discharge requirements.',
    dischargeCriteria: [
      {
        area: 'Outside / Inside Special Areas',
        substance: 'Category X Residues',
        limitOrCondition: 'Mandatory pre-wash in port; effluent discharged to shore reception facility until concentration ≤0.1% by weight; remaining tank washings discharged en route >12 NM from land, depth >25m, under-waterline outlet.',
        recordRequired: 'Cargo Record Book (CRB) with Port Surveyor Endorsement'
      },
      {
        area: 'Special Areas (North-West European waters, Baltic Sea, Western European waters)',
        substance: 'High-Viscosity / Solidifying Category Y substances (Vegetable oils, paraffin wax)',
        limitOrCondition: 'Mandatory pre-wash with shore disposal under MEPC.315(74).',
        recordRequired: 'Cargo Record Book'
      }
    ],
    mandatoryEquipment: [
      'Efficient Stripping System (max residue ≤75 liters per tank)',
      'Underwater Discharge Outlet',
      'P&A Gauging and Temperature Monitoring Systems'
    ],
    requiredCertificates: [
      'International Pollution Prevention Certificate for the Carriage of Noxious Liquid Substances in Bulk (INLS Certificate)',
      'Certificate of Fitness for the Carriage of Dangerous Chemicals in Bulk (IBC/BCH Code)'
    ],
    requiredPlansAndRecords: [
      'Procedures and Arrangements Manual (P&A Manual)',
      'Cargo Record Book (CRB)',
      'Shipboard Marine Pollution Emergency Plan for NLS (SMPEP Reg. 17)'
    ],
    keyAmendments2024_2028: ['Persistent floaters pre-wash verification during PSC chemical audits']
  },
  {
    annexNumber: 3,
    roman: 'Annex III',
    title: 'Prevention of Pollution by Harmful Substances in Packaged Form',
    shortName: 'Packaged Dangerous Goods (IMDG)',
    inForceDate: '1992-07-01',
    latestResolution: 'IMDG Code Amendment 41-22 & 42-24',
    summary: 'Regulates marking, labelling, packaging, documentation, stowage, and segregation of packaged hazardous goods and marine pollutants to prevent jettisoning and lost containers.',
    dischargeCriteria: [
      {
        area: 'All Sea Areas',
        substance: 'Packaged Marine Pollutants (Identified with Marine Pollutant Mark / P)',
        limitOrCondition: 'Jettisoning of packaged harmful substances is strictly prohibited, except where necessary for the safety of ship or saving life at sea.',
        recordRequired: 'Special Dangerous Goods Manifest / Stowage Plan'
      }
    ],
    mandatoryEquipment: ['IMDG Approved Cargo Securing Gear', 'Dangerous Goods Spillage Cleanup Kits'],
    requiredCertificates: ['Document of Compliance for Ships Carrying Dangerous Goods (SOLAS II-2/19 & IMDG)'],
    requiredPlansAndRecords: ['Dangerous Goods Manifest', 'Cargo Securing Manual (CSM)'],
    keyAmendments2024_2028: ['Mandatory container weight verification (VGM) cross-check with IMDG segregation']
  },
  {
    annexNumber: 4,
    roman: 'Annex IV',
    title: 'Prevention of Pollution by Sewage from Ships',
    shortName: 'Sewage & Wastewater Management',
    inForceDate: '2003-09-27',
    latestResolution: 'MEPC.227(64) with Section 4.2 Baltic Special Area Nitrogen/Phosphorus removal',
    summary: 'Controls the discharge of blackwater (toilets, urinals, medical premises) into the sea. Mandates approved Sewage Treatment Plants (STP), comminuting/disinfecting systems, or sewage holding tanks.',
    dischargeCriteria: [
      {
        area: 'Outside Special Areas (>12 NM from land)',
        substance: 'Raw untreated sewage from holding tank',
        limitOrCondition: 'Discharged en route at moderate speed (≥4 knots) through approved rate of discharge calculator; distance >12 NM from nearest land.',
        recordRequired: 'Sewage Discharge Record Log'
      },
      {
        area: 'Between 3 NM and 12 NM from land',
        substance: 'Comminuted and disinfected sewage',
        limitOrCondition: 'Passed through approved comminuting and chlorination system; distance >3 NM from land.',
        recordRequired: 'Sewage Discharge Record Log'
      },
      {
        area: 'Anywhere (including in port and within 3 NM)',
        substance: 'Effluent from Type-Approved Sewage Treatment Plant',
        limitOrCondition: 'Effluent produced by MEPC.227(64) certified STP with no visible floating solids and zero discoloration.',
        recordRequired: 'Sewage Treatment Plant Operational Log'
      },
      {
        area: 'Baltic Sea Special Area (Passenger Ships)',
        substance: 'Sewage effluent on passenger ships',
        limitOrCondition: 'Must meet nutrient removal standards (Phosphorus <1.0 mg/l, Total Nitrogen <20 mg/l) or hold onboard and discharge to shore reception facilities.',
        recordRequired: 'ISPP Certificate Form B Endorsement'
      }
    ],
    mandatoryEquipment: [
      'Type-Approved Sewage Treatment Plant (MEPC.227(64) / MEPC.159(55))',
      'Sewage Comminuting and Disinfecting System with holding tank',
      'Standard Discharge Connection (Flange dimensions Reg. 10)'
    ],
    requiredCertificates: ['International Sewage Pollution Prevention Certificate (ISPP)'],
    requiredPlansAndRecords: ['Sewage Management System Operating Manual', 'Sewage Discharge Logbook'],
    keyAmendments2024_2028: ['Red Sea and Gulf of Aden proposed designation as Sewage Special Areas']
  },
  {
    annexNumber: 5,
    roman: 'Annex V',
    title: 'Prevention of Pollution by Garbage from Ships',
    shortName: 'Garbage Management & Total Plastics Ban',
    inForceDate: '1988-12-31',
    latestResolution: 'MEPC.360(79) Mandatory Garbage Record Books for ships ≥100 GT',
    summary: 'Imposes a TOTAL PROHIBITION on discharging plastics, synthetic ropes, and cooking oil anywhere into the sea. Establishes strict rules for food waste, cargo residues, and cleaning agents.',
    dischargeCriteria: [
      {
        area: 'Outside Special Areas (>12 NM from land)',
        substance: 'Food waste (uncomminuted)',
        limitOrCondition: 'En route, minimum distance >12 NM from nearest land.',
        recordRequired: 'Garbage Record Book (GRB) Part I'
      },
      {
        area: 'Outside Special Areas (>3 NM from land)',
        substance: 'Food waste comminuted / ground (capable of passing through 25mm screen)',
        limitOrCondition: 'En route, minimum distance >3 NM from nearest land.',
        recordRequired: 'Garbage Record Book Part I'
      },
      {
        area: 'Inside Special Areas (Mediterranean, Baltic, Black Sea, Red Sea, Gulfs, North Sea, Antarctic, Wider Caribbean)',
        substance: 'Food waste comminuted / ground',
        limitOrCondition: 'En route, minimum distance >12 NM from nearest land or ice shelf.',
        recordRequired: 'Garbage Record Book Part I'
      },
      {
        area: 'All Sea Areas Worldwide',
        substance: 'Plastics, Synthetic Ropes, Incinerator Ash, Cooking Oil, Hazardous Garbage',
        limitOrCondition: 'ABSOLUTE TOTAL BAN ON DISCHARGE AT SEA. Must be retained onboard and discharged to port reception facilities.',
        recordRequired: 'Garbage Record Book Part I (Discharge to Shore Receipts)'
      },
      {
        area: 'Non-HME (Not Harmful to Marine Environment) Cargo Residues',
        substance: 'Dry bulk cargo hold washing water',
        limitOrCondition: 'Only if non-HME declared by shipper; >12 NM outside special areas, or inside special area if no port reception at departure and destination.',
        recordRequired: 'Garbage Record Book Part II (Cargo Residues)'
      }
    ],
    mandatoryEquipment: [
      'Food Waste Macerator / Grinder (25mm screen)',
      'Garbage Compactor and Storage Receptacles',
      'Marine Incinerator (MEPC.244(66) compliant - optional for onboard burning)',
      'Prominently Displayed Garbage Disposal Placards (Working language & English)'
    ],
    requiredCertificates: ['Garbage Management Compliance Statement'],
    requiredPlansAndRecords: [
      'Garbage Management Plan (GMP - Mandatory for ships ≥100 GT or carrying ≥15 persons)',
      'Garbage Record Book Part I & Part II (Mandatory for ships ≥100 GT since 1 May 2024 - MEPC.360(79))'
    ],
    keyAmendments2024_2028: [
      'Threshold for mandatory Garbage Record Book lowered from 400 GT to 100 GT (Effective 1 May 2024)',
      'Electronic Garbage Record Book guidelines'
    ]
  },
  {
    annexNumber: 6,
    roman: 'Annex VI',
    title: 'Prevention of Air Pollution from Ships & Carbon Intensity',
    shortName: 'Decarbonization, SOx, NOx, EEXI & CII',
    inForceDate: '2005-05-19',
    latestResolution: 'MEPC.328(76) Revised Annex VI / MEPC.377(80) 2023 IMO GHG Strategy',
    summary: 'Regulates SOx fuel sulfur limits (0.50% global / 0.10% ECA), NOx Tier I/II/III limits, Ozone Depleting Substances (ODS), Exhaust Gas Cleaning Systems (EGCS / Scrubbers), and short-term GHG measures (EEDI, EEXI, and annual CII ratings A to E).',
    dischargeCriteria: [
      {
        area: 'Global Ocean (Outside ECAs)',
        substance: 'Fuel Oil Sulfur Content (SOx)',
        limitOrCondition: 'Maximum 0.50% m/m (VLSFO) or equivalent compliance via approved Scrubber / EGCS (Res. MEPC.340(77)).',
        recordRequired: 'Bunker Delivery Notes (BDNs) retained for 3 years + MARPOL Fuel Oil Samples'
      },
      {
        area: 'Emission Control Areas (ECAs: Baltic Sea, North Sea, North American, US Caribbean, Mediterranean ECA from May 2025)',
        substance: 'Fuel Oil Sulfur Content (SOx)',
        limitOrCondition: 'Maximum 0.10% m/m (ULSFO / MGO) or open/closed-loop Scrubber operating within washwater discharge criteria.',
        recordRequired: 'Fuel Oil Changeover Logbook & BDN'
      },
      {
        area: 'NOx Emission Control Areas (NECA)',
        substance: 'Marine Diesel Engine NOx Emissions (Tier III)',
        limitOrCondition: 'Tier III standard (80% NOx reduction vs Tier I, ~2.0-3.4 g/kWh) for engines installed on ships built after NECA effective date, using SCR or EGR or LNG.',
        recordRequired: 'Engine International Air Pollution Prevention (EIAPP) Certificate & Technical File'
      }
    ],
    mandatoryEquipment: [
      'Approved Marine Diesel Engines with EIAPP Certificates and NOx Technical Files',
      'Exhaust Gas Cleaning System (EGCS - Scrubber with continuous washwater pH, PAH, and turbidity loggers) where applicable',
      'Shaft Power Limitation (SHaPoLi) or Engine Power Limitation (EPL) for EEXI compliance where installed',
      'Fuel Oil Sample Storage Locker (sealed MARPOL samples held until consumed, min 12 months)'
    ],
    requiredCertificates: [
      'International Air Pollution Prevention Certificate (IAPP)',
      'Engine International Air Pollution Prevention Certificate (EIAPP)',
      'International Energy Efficiency Certificate (IEEC - EEDI / EEXI verified)',
      'Statement of Compliance for Fuel Oil Data Collection (DCS) and Carbon Intensity Indicator (CII Rating A, B, C, D, or E)'
    ],
    requiredPlansAndRecords: [
      'Ship Energy Efficiency Management Plan (SEEMP Part I - Operational Energy Efficiency)',
      'SEEMP Part II - Fuel Oil Consumption Data Collection Plan (DCS for ships ≥5,000 GT)',
      'SEEMP Part III - Ship Operational Carbon Intensity Plan with 3-year implementation schedule & Corrective Action Plan if rated D for 3 consecutive years or E for 1 year',
      'Ozone Depleting Substances (ODS) Record Book',
      'Bunker Delivery Notes (BDNs - 3 years retention)'
    ],
    keyAmendments2024_2028: [
      'Mediterranean Sea SOx-ECA entry into force 1 May 2025 (0.10% sulfur limit)',
      'Canadian Arctic and Norwegian Sea new ECAs designated by MEPC 81 (effective 2026/2027)',
      'Review of short-term CII & EEXI measures by 1 January 2026',
      '2023 IMO GHG Strategy Mid-Term Measures (Global Fuel Standard & GHG Pricing Mechanism targeted for 2027)'
    ]
  }
];

export const STCW_REQUIREMENTS_DATA: StcwRequirement[] = [
  {
    id: 'stcw-ii-1',
    chapter: 'Chapter II',
    chapterTitle: 'Master and Deck Department',
    codeSection: 'Section A-II/1',
    title: 'Officer in Charge of a Navigational Watch (OOW / 2nd & 3rd Mate)',
    rankDepartment: 'Deck',
    competencyTable: 'Table A-II/1 (Navigation, Cargo Handling, Ship Stability, Emergency Response, Radiocommunications, Pollution Prevention)',
    mandatoryCertificates: [
      'Certificate of Competency (CoC) Reg. II/1',
      'GMDSS General Operator Certificate (GOC - Reg. IV/2)',
      'ECDIS Generic and Type-Specific Training',
      'Radar Navigation, Radar Plotting and Use of ARPA (Operational Level)',
      'Bridge Resource Management (BRM)',
      'Basic Safety Training (STCW VI/1: PST, FPFF, EFA, PSSR)',
      'Advanced Fire Fighting (STCW VI/3)',
      'Proficiency in Survival Craft and Rescue Boats (PSCRB - STCW VI/2-1)',
      'Medical First Aid (STCW VI/4-1)',
      'Security Awareness & Designated Security Duties (STCW VI/6)'
    ],
    revalidationPeriodYears: 5,
    summary: 'Minimum 12 months approved seagoing service including documented bridge watchkeeping under supervision of qualified officer, passing approved competency exam, and meeting medical fitness standard.'
  },
  {
    id: 'stcw-ii-2',
    chapter: 'Chapter II',
    chapterTitle: 'Master and Deck Department',
    codeSection: 'Section A-II/2',
    title: 'Master and Chief Mate on Ships of 3,000 GT or more (Management Level)',
    rankDepartment: 'Deck',
    competencyTable: 'Table A-II/2 (Voyage Planning, Command & Shiphandling, Ship Construction & Stability, Maritime Law, Contingency Management)',
    mandatoryCertificates: [
      'Certificate of Competency (CoC) Reg. II/2 (Master / Chief Mate)',
      'GMDSS GOC',
      'Bridge Resource Management & Leadership and Managerial Skills (LMR)',
      'Advanced ECDIS & Radar ARPA Management',
      'Proficiency in Medical Care onboard Ship (STCW VI/4-2)',
      'Advanced Fire Fighting (STCW VI/3)',
      'Ship Security Officer (SSO - STCW VI/5)'
    ],
    revalidationPeriodYears: 5,
    summary: 'Requires prerequisite OOW certification, minimum 12 to 36 months seagoing experience, advanced simulator training, and comprehensive oral/written examination before Flag State.'
  },
  {
    id: 'stcw-iii-1',
    chapter: 'Chapter III',
    chapterTitle: 'Engine Department',
    codeSection: 'Section A-III/1',
    title: 'Officer in Charge of an Engineering Watch (EOOW / 3rd & 4th Engineer)',
    rankDepartment: 'Engine',
    competencyTable: 'Table A-III/1 (Marine Engineering, Electrical/Electronic Control, Maintenance, Pollution Prevention, Pumping Operations)',
    mandatoryCertificates: [
      'Certificate of Competency (CoC) Reg. III/1 (≥750 kW)',
      'Engine Room Resource Management (ERM)',
      'High Voltage (HV) Safety Training (Operational Level)',
      'Basic Safety Training (VI/1)',
      'Advanced Fire Fighting (VI/3)',
      'PSCRB (VI/2-1)',
      'Medical First Aid (VI/4-1)'
    ],
    revalidationPeriodYears: 5,
    summary: 'Minimum 12 months combined workshop skills training and approved seagoing service in engine department with documented Training Record Book (TRB).'
  },
  {
    id: 'stcw-iii-2',
    chapter: 'Chapter III',
    chapterTitle: 'Engine Department',
    codeSection: 'Section A-III/2',
    title: 'Chief Engineer & Second Engineer on Ships of 3,000 kW or more (Management Level)',
    rankDepartment: 'Engine',
    competencyTable: 'Table A-III/2 (Power Plant Management, Automation Systems, Failure Mode Analysis, Drydocking & Hull Repairs, MARPOL/Class compliance)',
    mandatoryCertificates: [
      'CoC Reg. III/2 (Chief Engineer / 2nd Engineer)',
      'High Voltage (HV) Management Level',
      'Engine Room Resource Management & Leadership / Managerial Skills',
      'Advanced Fire Fighting (VI/3)',
      'PSCRB (VI/2-1)'
    ],
    revalidationPeriodYears: 5,
    summary: 'Responsible for total machinery operation, bunker management, class survey preparation, and emergency systems readiness.'
  },
  {
    id: 'stcw-iii-6',
    chapter: 'Chapter III',
    chapterTitle: 'Engine Department',
    codeSection: 'Section A-III/6',
    title: 'Electro-Technical Officer (ETO)',
    rankDepartment: 'Electro-Technical',
    competencyTable: 'Table A-III/6 (Electrical Generation & Distribution, Automation/PLC Systems, Navigation Electronics, High Voltage, Cyber Physical Systems)',
    mandatoryCertificates: [
      'Certificate of Competency (CoC) Reg. III/6 (ETO)',
      'High Voltage (HV) Safety Training',
      'Basic Safety (VI/1)',
      'Advanced Fire Fighting (VI/3)',
      'PSCRB (VI/2-1)'
    ],
    revalidationPeriodYears: 5,
    summary: 'Mandatory standard introduced in 2010 Manila Amendments for modern complex electrical propulsion, automation, and DP-equipped vessels.'
  },
  {
    id: 'stcw-v-1-1',
    chapter: 'Chapter V',
    chapterTitle: 'Special Training for Tankers & Low Flashpoint Ships',
    codeSection: 'Section A-V/1-1 & A-V/1-2',
    title: 'Advanced Training for Oil, Chemical & Liquefied Gas Tanker Cargo Operations',
    rankDepartment: 'Special Cargo (Tanker/IGF/Polar)',
    competencyTable: 'Tables A-V/1-1-1, A-V/1-1-2, A-V/1-2-1',
    mandatoryCertificates: [
      'Advanced Oil Tanker Cargo Operations Endorsement',
      'Advanced Chemical Tanker Cargo Operations Endorsement',
      'Advanced Gas Tanker Cargo Operations Endorsement'
    ],
    revalidationPeriodYears: 5,
    summary: 'Requires minimum 3 months qualifying sea service on relevant tanker type and approved advanced training course in physics, chemistry, inerting, gas freeing, and toxic hazards.'
  },
  {
    id: 'stcw-v-3',
    chapter: 'Chapter V',
    chapterTitle: 'Special Training for Ships subject to the IGF Code',
    codeSection: 'Section A-V/3',
    title: 'Basic & Advanced Training for Ships subject to the IGF Code (LNG/Methanol/Ammonia Fuelled)',
    rankDepartment: 'Special Cargo (Tanker/IGF/Polar)',
    competencyTable: 'Tables A-V/3-1 & A-V/3-2',
    mandatoryCertificates: [
      'Basic Training for IGF Code Ships (CoP)',
      'Advanced Training for IGF Code Ships with minimum 1 month sea service and 8 fuel bunkering operations'
    ],
    revalidationPeriodYears: 5,
    summary: 'Mandatory for all seafarers serving on vessels using low-flashpoint alternative fuels (LNG, methanol, LPG, hydrogen, ammonia).'
  },
  {
    id: 'stcw-viii-1',
    chapter: 'Chapter VIII',
    chapterTitle: 'Watchkeeping Standards & Rest Hours',
    codeSection: 'Section A-VIII/1 & MLC 2006 Reg. 2.3',
    title: 'Fitness for Duty, Prevention of Fatigue & Rest Hours Log',
    rankDepartment: 'All Crew',
    competencyTable: 'STCW Section A-VIII/1 + Table B-VIII/1',
    mandatoryCertificates: ['Daily Hours of Rest Software Record with Master & Seafarer Signatures'],
    revalidationPeriodYears: 0,
    restHoursMandate: 'Minimum 10 hours rest in any 24-hour period, and 77 hours in any 7-day period. Hours of rest may be divided into no more than two periods, one of which shall be at least 6 hours in length, and the interval between consecutive periods of rest shall not exceed 14 hours.',
    summary: 'Non-compliance with rest hours is a top primary cause for Port State Control detention under both STCW and MLC 2006.'
  }
];

export const IACS_REQUIREMENTS_DATA: IacsItem[] = [
  {
    id: 'ur-e26',
    code: 'UR E26',
    type: 'UR',
    title: 'Cyber Resilience of Ships',
    category: 'Electrical & Cyber (UR E)',
    adoptedDate: '2022-04-01',
    implementationDate: '2024-07-01 (Mandatory for all new contracts signed on/after 1 July 2024)',
    status: 'Rev. In Force',
    summary: 'Establishes mandatory minimum requirements for cyber resilience of onboard Operational Technology (OT) systems during design, construction, commissioning, and operational lifespan.',
    impactOnDesign: 'Requires dedicated cyber security zones, encrypted network segmentation, multi-factor authentication for maintenance ports, hardware firewalls between IT and OT, and formal cyber vulnerability risk assessments.'
  },
  {
    id: 'ur-e27',
    code: 'UR E27',
    type: 'UR',
    title: 'Cyber Resilience of On-Board Systems and Equipment',
    category: 'Electrical & Cyber (UR E)',
    adoptedDate: '2022-04-01',
    implementationDate: '2024-07-01 (Mandatory for all suppliers of shipboard OT equipment)',
    status: 'Rev. In Force',
    summary: 'Targets equipment manufacturers and system integrators (propulsion controllers, navigation systems, steering, power management, cargo control) to build secure-by-design hardware and firmware.',
    impactOnDesign: 'Requires secure boot, cryptographic integrity checks for firmware updates, secure logging, role-based access control, and zero hard-coded credentials in PLCs.'
  },
  {
    id: 'ur-s11a',
    code: 'UR S11A',
    type: 'UR',
    title: 'Longitudinal Strength Standard for Container Ships',
    category: 'Hull Strength (UR S)',
    adoptedDate: '2015-06-01',
    implementationDate: '2016-07-01',
    status: 'In Force',
    summary: 'Formulates wave-induced vertical and horizontal bending moments, torsional moments, and whipping/springing fatigue assessments for ultra-large container vessels (ULCS).',
    impactOnDesign: 'Increases deck and bottom plating thickness, hatch corner radius reinforcing, and introduces nonlinear hydro-elastic whipping calculations.'
  },
  {
    id: 'ur-s21a',
    code: 'UR S21A',
    type: 'UR',
    title: 'Evaluation of Scantlings of Hatch Covers and Hatch Coamings',
    category: 'Hull Strength (UR S)',
    adoptedDate: '2012-05-01',
    implementationDate: '2013-01-01',
    status: 'In Force',
    summary: 'Prescribes design green-water wave pressure loads on weather deck hatch covers in forward regions (Hatch No. 1 and No. 2) to prevent structural collapse in extreme seas.',
    impactOnDesign: 'Thicker top plating and stiffeners for Hatch No. 1, high-tensile steel coaming brackets, and specialized cleating devices.'
  },
  {
    id: 'ur-m67',
    code: 'UR M67',
    type: 'UR',
    title: 'Type Approval of Internal Combustion Engines using Gas Fuels',
    category: 'Machinery (UR M)',
    adoptedDate: '2018-09-01',
    implementationDate: '2019-07-01',
    status: 'In Force',
    summary: 'Sets technical safety parameters for dual-fuel and pure gas engines, explosion relief valves on crankcases, and knock detection systems.',
    impactOnDesign: 'Double-wall fuel gas piping, automatic inert gas purging, rapid shutoff valves with response time <1 second.'
  },
  {
    id: 'ur-z10-1',
    code: 'UR Z10.1',
    type: 'UR',
    title: 'Hull Surveys of Oil Tankers (Enhanced Survey Programme - ESP)',
    category: 'Survey & Testing (UR Z)',
    adoptedDate: '2019-01-01',
    implementationDate: '2020-01-01',
    status: 'In Force',
    summary: 'Specifies close-up survey percentages, ultrasonic thickness measurements (UTM), tank testing pressures, and coating condition evaluation regimes at each 5-year Special Survey.',
    impactOnDesign: 'Requires Permanent Means of Access (PMA) inside cargo and ballast tanks to facilitate close-up survey inspections.'
  },
  {
    id: 'ui-sc249',
    code: 'UI SC249',
    type: 'UI',
    title: 'Implementation of SOLAS II-1 Mooring Equipment & Towing (Reg. II-1/3-8)',
    category: 'Common Structural Rules (CSR)',
    adoptedDate: '2020-12-01',
    implementationDate: '2024-01-01',
    status: 'In Force',
    summary: 'Provides unified interpretation on Safe Working Load (SWL), Ship Design Minimum Breaking Load (MBLsd), Line Design Breaking Load (LDBL), and inspection criteria.',
    impactOnDesign: 'All mooring winches, bollards, chocks, and pedestal fairleads must have verified MBL calculation certificates.'
  }
];

export const CLASS_SOCIETIES_DATA: ClassSocietyRuleItem[] = [
  {
    id: 'dnv',
    societyCode: 'DNV',
    societyName: 'Det Norske Veritas',
    country: 'Norway',
    flagEmoji: '🇳🇴',
    category: 'Hull Structural',
    ruleDocRef: 'DNV-RU-SHIP Pt.3 Hull Structural Design (2026 Edition)',
    ruleTitle: 'DNV Rules for Classification of Ships - Hull & Materials',
    summary: 'Comprehensive rule framework covering hydrodynamic wave loads, finite element analysis (FEA), fatigue design, yielding, and ultimate buckling strength for all ship types.',
    classNotationsSample: [
      '1A Container Ship BIS BWM-T Cleanship',
      'Gas Fuelled (LNG/Methanol)',
      'Cyber Secure(Essential+)',
      'Silent(E)',
      'Battery(Power)'
    ],
    latestUpdateYear: '2026'
  },
  {
    id: 'abs',
    societyCode: 'ABS',
    societyName: 'American Bureau of Shipping',
    country: 'United States',
    flagEmoji: '🇺🇸',
    category: 'Hull Structural',
    ruleDocRef: 'ABS Rules for Building and Classing Marine Vessels (2026)',
    ruleTitle: 'ABS Marine Vessel Rules - Hull Structure and Dynamic Loading Approach',
    summary: 'Focuses on Total Strength Assessment (TSA), Dynamic Loading Approach (DLA), Spectral Fatigue Analysis (SFA), and SafeHull finite element modeling.',
    classNotationsSample: [
      '✠ A1 Oil Carrier Ⓢ ✠ AMS ✠ ACCU',
      'SH-DLA (SafeHull Dynamic Loading)',
      'ENVIRO+ (Environmental Protection)',
      'CYBER-SAFETY(v1.0)'
    ],
    latestUpdateYear: '2026'
  },
  {
    id: 'lr',
    societyCode: 'LR',
    societyName: "Lloyd's Register",
    country: 'United Kingdom',
    flagEmoji: '🇬🇧',
    category: 'Alternative Fuels & Green Notations',
    ruleDocRef: "LR Rules and Regulations for the Classification of Ships (2026)",
    ruleTitle: "LR ShipRight Structural & Machinery Integrity Rules",
    summary: "Integrates ShipRight procedures (SDA, FDA, CM), fuel transition notations (Methanol Ready, Ammonia Ready), and shaft alignment verification.",
    classNotationsSample: [
      '✠ 100A1 Bulk Carrier ShipRight(SDA, FDA, CM)',
      '✠ LMC UMSC',
      'Methanol Fuelled',
      'Digital Compliance(Level 3)'
    ],
    latestUpdateYear: '2026'
  },
  {
    id: 'bv',
    societyCode: 'BV',
    societyName: 'Bureau Veritas',
    country: 'France',
    flagEmoji: '🇫🇷',
    category: 'Electrical & Automation',
    ruleDocRef: 'BV NR467 Rules for the Classification of Steel Ships',
    ruleTitle: 'BV Steel Ships Rules - Autonomous & Cyber Notation Framework',
    summary: 'Leading standards for automated systems, autonomous navigation (AUT-NAV), electric propulsion, and smart ship technologies (SMART 1/2/3).',
    classNotationsSample: [
      'I ✠ HULL ✠ MACH Container Ship UNRESTRICTED',
      'AUT-UMS (Unattended Machinery)',
      'CYBER RESILIENT(E26)',
      'CLEANSHIP SUPER'
    ],
    latestUpdateYear: '2026'
  },
  {
    id: 'classnk',
    societyCode: 'ClassNK',
    societyName: 'Nippon Kaiji Kyokai (ClassNK)',
    country: 'Japan',
    flagEmoji: '🇯🇵',
    category: 'Hull Structural',
    ruleDocRef: 'ClassNK Rules for the Survey and Construction of Steel Ships (Part C/CS)',
    ruleTitle: 'ClassNK PrimeShip Structural Hull & Machinery Evaluation Rules',
    summary: 'Employs PrimeShip-HULL software for direct strength calculations, wave pressure simulations, and high-tensile steel crack propagation prevention.',
    classNotationsSample: [
      'NS*(BC-A) MNS* M0',
      'PrimeShip-HULL(G-PMA)',
      'EA-Green (Energy Audited)',
      'Cyber Resilience'
    ],
    latestUpdateYear: '2026'
  },
  {
    id: 'rina',
    societyCode: 'RINA',
    societyName: 'RINA Services',
    country: 'Italy',
    flagEmoji: '🇮🇹',
    category: 'Surveys & Certification',
    ruleDocRef: 'RINA Rules for the Classification of Ships (2026 Edition)',
    ruleTitle: 'RINA Marine Classification Rules - Passenger, Cruise & Superyacht Standards',
    summary: 'Global leader in passenger ship safety, Safe Return to Port (SRtP), comfort class (noise and vibration COMf-NOISE/VIB), and green yachting.',
    classNotationsSample: [
      'C ✠ HULL ✠ MACH Passenger Ship SRtP',
      'COMF-NOISE A, COMF-VIB A',
      'GREEN PLUS',
      'CYBER SECURE'
    ],
    latestUpdateYear: '2026'
  },
  {
    id: 'ccs',
    societyCode: 'CCS',
    societyName: 'China Classification Society',
    country: 'China',
    flagEmoji: '🇨🇳',
    category: 'Materials & Welding',
    ruleDocRef: 'CCS Rules for Classification of Sea-Going Steel Ships (2026)',
    ruleTitle: 'CCS Intelligent Ship & Alternative Fuel Rules',
    summary: 'Specialized notations for Intelligent Ships (i-Ship: N, M, E, I, C), battery power, inland-to-sea river vessels, and green methanol bunkering.',
    classNotationsSample: [
      '★ CSA Bulk Carrier ESP, CD',
      '★ CSM AUT-0',
      'i-Ship (N, M, E)',
      'Green Ship I'
    ],
    latestUpdateYear: '2026'
  }
];

export const FLAG_STATES_DATA: FlagStateRequirement[] = [
  {
    id: 'panama',
    flagCountry: 'Panama',
    countryCode: 'PAN',
    flagEmoji: '🇵🇦',
    administrationName: 'Panama Maritime Authority (AMP - Segumar)',
    fleetRankGT: 1,
    authorizedROs: ['DNV', 'ABS', 'LR', 'BV', 'ClassNK', 'RINA', 'CCS', 'Intermaritime', 'Panama Shipping Registrar'],
    specialNotices: [
      {
        noticeNumber: 'MMN-03/2024',
        subject: 'Mandatory Compliance with IACS UR E26/E27 Cyber Resilience',
        dateIssued: '2024-06-15',
        requirementSummary: 'All Panama-flagged vessels contracted after 1 July 2024 must obtain RO Cyber Resilience Statement before issuance of Safety Construction Certificate.'
      },
      {
        noticeNumber: 'MMC-359',
        subject: 'Electronic Oil Record Books and Electronic Logbooks Approval',
        dateIssued: '2023-11-20',
        requirementSummary: 'Guidelines for Flag State Declaration of Electronic Logbooks under MARPOL Annex I, II, V and VI.'
      }
    ],
    minSafeManningOverview: 'Minimum Safe Manning Certificate (MSMC) issued through Segumar portal based on STCW Manila Amendments and Resolution A.1047(27).',
    nationalExemptionPolicy: 'Statutory exemptions under SOLAS, MARPOL, and Load Line must be submitted via RO with technical risk assessment and formal Segumar approval letter.'
  },
  {
    id: 'liberia',
    flagCountry: 'Liberia',
    countryCode: 'LBR',
    flagEmoji: '🇱🇷',
    administrationName: 'Liberian International Ship & Corporate Registry (LISCR)',
    fleetRankGT: 2,
    authorizedROs: ['DNV', 'ABS', 'LR', 'BV', 'ClassNK', 'RINA', 'CCS', 'KR', 'IRS'],
    specialNotices: [
      {
        noticeNumber: 'Marine Advisory 08/2024',
        subject: 'CII Corrective Action Plans (CAP) Review and Flag Verification',
        dateIssued: '2024-04-10',
        requirementSummary: 'Vessels receiving a CII rating of D for three consecutive years or E for a single year must submit SEEMP Part III CAP to LISCR within 30 days.'
      },
      {
        noticeNumber: 'Marine Notice POL-012',
        subject: 'Biofuel Blends and Verification of NOx Technical Code Compliance',
        dateIssued: '2023-08-01',
        requirementSummary: 'Procedures for bunkering up to B30 and B100 biofuels without requiring re-certification of EIAPP where NOx criteria are met under MEPC.1/Circ.795.'
      }
    ],
    minSafeManningOverview: 'Digital MSMC issuance with automated seafarer endorsement verification via Liberian Seafarer Electronic System (e-Sea).',
    nationalExemptionPolicy: 'Expedited online dispensation mechanism for temporary equipment defect dispensations (e.g. gyrocompass, ECDIS backup) max 30-90 days.'
  },
  {
    id: 'marshall-islands',
    flagCountry: 'Marshall Islands',
    countryCode: 'MHL',
    flagEmoji: '🇲🇭',
    administrationName: 'International Registries, Inc. (IRI - Republic of the Marshall Islands Maritime Administrator)',
    fleetRankGT: 3,
    authorizedROs: ['DNV', 'ABS', 'LR', 'BV', 'ClassNK', 'RINA', 'CCS', 'KR'],
    specialNotices: [
      {
        noticeNumber: 'Marine Guideline MG-2-11-18',
        subject: 'Safe Mooring Operations under SOLAS II-1/3-8',
        dateIssued: '2023-12-01',
        requirementSummary: 'Requirements for Mooring System Management Plans (MSMP) and line retirement criteria for Marshall Islands vessels.'
      },
      {
        noticeNumber: 'Marine Notice 2-011-53',
        subject: 'Autonomous and Remote Controlled Vessel Safety Guidelines',
        dateIssued: '2024-02-14',
        requirementSummary: 'Framework for MASS trial approval, risk-based safety cases, and remote bridge watchkeeping.'
      }
    ],
    minSafeManningOverview: 'Strict adherence to Qualship 21 requirements; stringent safety records required for dual-fuel and chemical carrier manning levels.',
    nationalExemptionPolicy: 'Recognized by USCG with Qualship 21 and E-Zero flags; exemptions scrutinized with formal technical review boards.'
  },
  {
    id: 'bahamas',
    flagCountry: 'Bahamas',
    countryCode: 'BHS',
    flagEmoji: '🇧🇸',
    administrationName: 'Bahamas Maritime Authority (BMA)',
    fleetRankGT: 6,
    authorizedROs: ['DNV', 'ABS', 'LR', 'BV', 'ClassNK', 'RINA'],
    specialNotices: [
      {
        noticeNumber: 'BMA Information Bulletin No. 182',
        subject: 'Passenger Ship Safety Return to Port (SRtP) Audits and Maintenance',
        dateIssued: '2024-01-15',
        requirementSummary: 'Specific operational testing schedules for redundant propulsion, ventilation, and power circuits on cruise vessels.'
      }
    ],
    minSafeManningOverview: 'Specialized manning matrices for world cruise liners, high-speed passenger craft, and dynamic positioning drillships.',
    nationalExemptionPolicy: 'BMA Marine Circular series provide documented interpretations for SOLAS life-saving arrangements.'
  },
  {
    id: 'singapore',
    flagCountry: 'Singapore',
    countryCode: 'SGP',
    flagEmoji: '🇸🇬',
    administrationName: 'Maritime and Port Authority of Singapore (MPA)',
    fleetRankGT: 5,
    authorizedROs: ['DNV', 'ABS', 'LR', 'BV', 'ClassNK', 'RINA', 'CCS'],
    specialNotices: [
      {
        noticeNumber: 'Shipping Circular No. 04 of 2024',
        subject: 'Maritime Decarbonization and Singapore Green Ship Programme (GSP)',
        dateIssued: '2024-03-01',
        requirementSummary: 'Incentives and regulatory concessions for zero-emission and low-carbon fueled vessels (ammonia, methanol, hydrogen).'
      }
    ],
    minSafeManningOverview: 'Digital Certificate of Endorsement (COE) with biometrics integration for quick STCW revalidation.',
    nationalExemptionPolicy: 'High compliance threshold; zero tolerance for serious structural or pollution deficiencies.'
  },
  {
    id: 'bangladesh',
    flagCountry: 'Bangladesh',
    countryCode: 'BGD',
    flagEmoji: '🇧🇩',
    administrationName: 'Department of Shipping (DOS), Ministry of Shipping, Bangladesh',
    fleetRankGT: 48,
    authorizedROs: ['DNV', 'ABS', 'LR', 'BV', 'ClassNK', 'RINA', 'CCS', 'IRS'],
    specialNotices: [
      {
        noticeNumber: 'DOS Circular No. 02/2024',
        subject: 'Ratification and Implementation of Hong Kong Ship Recycling Convention (HKC)',
        dateIssued: '2023-09-12',
        requirementSummary: 'Mandates certified Ship Recycling Facilities and Inventory of Hazardous Materials (IHM) verification for all Bangladesh flag and calling vessels.'
      },
      {
        noticeNumber: 'DOS Circular No. 07/2023',
        subject: 'STCW CoC Revalidation and Online Seafarer Biometric Verification',
        dateIssued: '2023-05-18',
        requirementSummary: 'Digital verification system for Bangladeshi seafarers, continuous discharge certificates (CDC), and CoCs.'
      }
    ],
    minSafeManningOverview: 'Inland and coastal vessel rules combined with international merchant marine manning scale enforced by Mercantile Marine Office (MMO) Chattogram.',
    nationalExemptionPolicy: 'Exemptions for local coastal waters subject to Merchant Shipping Ordinance (MSO 1983) and Inland Shipping Ordinance (ISO).'
  }
];

export const REGULATORY_AMENDMENTS_DATA: RegulatoryAmendment[] = [
  {
    id: 'amend-2024-mooring',
    conventionOrBody: 'SOLAS',
    resolutionNumber: 'Res. MSC.474(102)',
    title: 'SOLAS Reg. II-1/3-8 Safe Mooring Equipment & Towing Design',
    adoptedDate: '2020-11-11',
    entryIntoForceDate: '2024-01-01',
    status: 'In Force',
    affectedShipTypes: ['All Ships (Newbuilds & Existing)'],
    impactLevel: 'High',
    summary: 'Requires all new ships to be designed with safe mooring arrangements (prevent snap-back zones). Existing ships must establish a documented Mooring System Management Plan (MSMP) with regular line inspection and retirement records.',
    actionRequired: [
      'Implement Mooring System Management Plan (MSMP) onboard',
      'Conduct line inspections and maintain Mooring Line Inspection Registers',
      'Verify bollard, chock, and fairlead safe working loads (SWL)'
    ],
    keyReferences: 'MSC.1/Circ.1619 & MSC.1/Circ.1620'
  },
  {
    id: 'amend-2024-gmdss',
    conventionOrBody: 'SOLAS',
    resolutionNumber: 'Res. MSC.496(105)',
    title: 'Modernization of the Global Maritime Distress & Safety System (GMDSS)',
    adoptedDate: '2022-04-28',
    entryIntoForceDate: '2024-01-01',
    status: 'In Force',
    affectedShipTypes: ['All Passenger & Cargo Ships ≥300 GT'],
    impactLevel: 'Medium',
    summary: 'Comprehensive overhaul of SOLAS Chapter IV and GMDSS equipment definitions. Removes obsolete narrow-band direct printing (NBDP) and accommodates multiple satellite providers (Inmarsat & Iridium).',
    actionRequired: [
      'Update radio survey checksheets and radio license documents',
      'Ensure bridge GMDSS radio log conforms to new Chapter IV definitions'
    ],
    keyReferences: 'MSC.1/Circ.1645'
  },
  {
    id: 'amend-2024-grb100',
    conventionOrBody: 'MARPOL',
    resolutionNumber: 'Res. MEPC.360(79)',
    title: 'Mandatory Garbage Record Books for Ships between 100 GT and 400 GT',
    adoptedDate: '2022-12-16',
    entryIntoForceDate: '2024-05-01',
    status: 'In Force',
    affectedShipTypes: ['All Ships ≥100 GT and <400 GT'],
    impactLevel: 'Medium',
    summary: 'Expands the mandatory requirement for holding and maintaining a formal Garbage Record Book Part I from ships ≥400 GT down to ships of 100 GT and above.',
    actionRequired: [
      'Provide approved Garbage Record Books to all vessels ≥100 GT',
      'Train crew in mandatory logging of every garbage incineration and shore disposal'
    ],
    keyReferences: 'MARPOL Annex V Reg. 10.3'
  },
  {
    id: 'amend-2024-iacs-cyber',
    conventionOrBody: 'IACS',
    resolutionNumber: 'IACS UR E26 & E27 Rev.1',
    title: 'Mandatory Cyber Resilience Rules for Ship Structures and OT Equipment',
    adoptedDate: '2023-11-30',
    entryIntoForceDate: '2024-07-01',
    status: 'In Force',
    affectedShipTypes: ['All Newbuilds contracted on or after 1 July 2024'],
    impactLevel: 'Critical',
    summary: 'Mandates built-in cybersecurity zones, network isolation between IT and OT, hardware firewalls, encrypted communications, and penetration testing before delivery.',
    actionRequired: [
      'Shipyards must prepare Cyber Security System Architecture Drawings',
      'Suppliers must deliver UR E27 compliant type-approval certificates',
      'Class societies must conduct on-site cyber commissioning tests'
    ],
    keyReferences: 'IACS UR E26 / UR E27'
  },
  {
    id: 'amend-2025-med-eca',
    conventionOrBody: 'MARPOL',
    resolutionNumber: 'Res. MEPC.361(79)',
    title: 'Mediterranean Sea Emission Control Area (SOx-ECA 0.10%)',
    adoptedDate: '2022-12-16',
    entryIntoForceDate: '2025-05-01',
    status: 'In Force',
    affectedShipTypes: ['All Ships entering or transiting Mediterranean Sea'],
    impactLevel: 'Critical',
    summary: 'Designates the entire Mediterranean Sea as an SOx Emission Control Area (ECA). Limits fuel sulfur content to maximum 0.10% m/m (or equivalent EGCS scrubber operation).',
    actionRequired: [
      'Update Fuel Oil Changeover Procedures for Med ECA entrance',
      'Ensure sufficient compliant ULSFO / MGO bunkers onboard',
      'Verify scrubber washwater discharge compliance'
    ],
    keyReferences: 'MARPOL Annex VI Reg. 14'
  },
  {
    id: 'amend-2025-hkc',
    conventionOrBody: 'MARPOL',
    resolutionNumber: 'Hong Kong Convention Entry into Force',
    title: 'Entry into Force of the Hong Kong Convention for Ship Recycling',
    adoptedDate: '2023-06-26 (Triggered)',
    entryIntoForceDate: '2025-06-26',
    status: 'In Force',
    affectedShipTypes: ['All Commercial Ships ≥500 GT'],
    impactLevel: 'High',
    summary: 'Requires every operating vessel ≥500 GT to have an approved Inventory of Hazardous Materials (IHM Part I) with International Certificate of IHM (ICIHM), verified by Class.',
    actionRequired: [
      'Complete onboard Hazardous Materials sampling and laboratory testing',
      'Obtain Class-approved IHM Part I and ICIHM Certificate',
      'Implement IHM maintenance procedure for all equipment purchases'
    ],
    keyReferences: 'Res. MEPC.379(80)'
  },
  {
    id: 'amend-2026-lifting-appliances',
    conventionOrBody: 'SOLAS',
    resolutionNumber: 'Res. MSC.532(107)',
    title: 'SOLAS Reg. II-1/3-13 Lifting Appliances and Anchor Handling Winches',
    adoptedDate: '2023-06-09',
    entryIntoForceDate: '2026-01-01',
    status: 'Coming Soon 2026',
    affectedShipTypes: ['All Ships fitted with Cranes, Derricks, Davits, Winches'],
    impactLevel: 'High',
    summary: 'Introduces new mandatory safety requirements for design, installation, load testing, thorough examination, and certification of shipboard cranes and lifting appliances.',
    actionRequired: [
      'Compile Register of Lifting Appliances and Cargo Handling Gear',
      'Conduct load testing with certified test weights before 1 Jan 2026',
      'Establish preventative maintenance and wire rope discard routines'
    ],
    keyReferences: 'MSC.1/Circ.1663'
  },
  {
    id: 'amend-2027-imo-ghg',
    conventionOrBody: 'MARPOL',
    resolutionNumber: 'IMO GHG Strategy Mid-Term Measures',
    title: 'Global Fuel Standard (GFS) and Universal Maritime GHG Emission Pricing',
    adoptedDate: '2025-10-01 (Anticipated MEPC 83)',
    entryIntoForceDate: '2027-05-01',
    status: 'Adopted (2027/2028)',
    affectedShipTypes: ['All Ships ≥5,000 GT'],
    impactLevel: 'Critical',
    summary: 'Technical goal mandating phased reduction in Well-to-Wake GHG intensity of marine fuels (e.g. -6% in 2027, -20% in 2030) paired with economic carbon pricing per ton of CO2eq.',
    actionRequired: [
      'Evaluate fleet dual-fuel retrofits (Methanol, Ammonia, Biofuels)',
      'Calculate carbon intensity fees under corporate ESG budgets',
      'Implement digital bunker mass flow metering'
    ],
    keyReferences: 'MEPC.377(80) 2023 IMO GHG Strategy'
  }
];

export const STATUTORY_CERTIFICATES_CATALOG: StatutoryCertificateItem[] = [
  {
    id: 'cssc',
    code: 'CSSC',
    fullName: 'Cargo Ship Safety Construction Certificate',
    governingConvention: 'SOLAS 1974 Reg. I/12 & 1988 Protocol',
    issuingAuthority: 'Flag Administration or Recognized Organization (RO / Class)',
    validityYears: 5,
    surveyRegime: 'Annual + Intermediate (Year 2/3) + Special/Renewal (Year 5)',
    windowMonths: '±3 months of anniversary date',
    applicableShipTypes: ['Bulk Carrier', 'Oil Tanker', 'Container Ship', 'Chemical Tanker', 'Gas Carrier', 'General Cargo'],
    minimumGTLimit: 500,
    requiredPlansOrManuals: ['Approved Scantling Plans', 'Stability Booklet', 'Loading Manual', 'Damage Control Plan', 'Mooring System Management Plan (MSMP)'],
    consequencesOfInvalidity: 'Immediate PSC detention and invalidation of vessel hull & machinery insurance.'
  },
  {
    id: 'csse',
    code: 'CSSE',
    fullName: 'Cargo Ship Safety Equipment Certificate',
    governingConvention: 'SOLAS 1974 Reg. I/12 & 1988 Protocol',
    issuingAuthority: 'Flag Administration or Recognized Organization (RO / Class)',
    validityYears: 5,
    surveyRegime: 'Annual + Periodical (Year 2/3) + Renewal (Year 5)',
    windowMonths: '±3 months of anniversary date',
    applicableShipTypes: ['All Cargo Ships'],
    minimumGTLimit: 500,
    requiredPlansOrManuals: ['Fire Safety Operational Booklet', 'Training Manual (SOLAS III/35)', 'LSA Maintenance Manual', 'Record of Equipment Form E'],
    consequencesOfInvalidity: 'High detainable deficiency by Paris MoU / Tokyo MoU / USCG.'
  },
  {
    id: 'cssr',
    code: 'CSSR',
    fullName: 'Cargo Ship Safety Radio Certificate',
    governingConvention: 'SOLAS 1974 Reg. I/12 & 1988 Protocol',
    issuingAuthority: 'Flag Administration or Recognized Organization (RO / Class)',
    validityYears: 5,
    surveyRegime: 'Annual Endorsement',
    windowMonths: '±3 months of anniversary date',
    applicableShipTypes: ['All Cargo Ships'],
    minimumGTLimit: 300,
    requiredPlansOrManuals: ['Record of Equipment Form R', 'GMDSS Radio Log', 'EPIRB Annual Test Report', 'AIS Annual Test Report'],
    consequencesOfInvalidity: 'Immediate detention; vessel prohibited from leaving berth without radio license.'
  },
  {
    id: 'iopp',
    code: 'IOPP',
    fullName: 'International Oil Pollution Prevention Certificate',
    governingConvention: 'MARPOL Annex I Reg. 7',
    issuingAuthority: 'Flag Administration or Recognized Organization (RO / Class)',
    validityYears: 5,
    surveyRegime: 'Annual + Intermediate (Year 2/3) + Special/Renewal (Year 5)',
    windowMonths: '±3 months of anniversary date',
    applicableShipTypes: ['All Ships (Form A) & Oil Tankers (Form B)'],
    minimumGTLimit: 400,
    requiredPlansOrManuals: ['SOPEP (Reg. 37)', 'Oil Record Book Part I', 'Oil Record Book Part II (Tankers)', 'ODMCS Manual (Tankers)', 'Clean Ballast Manual'],
    consequencesOfInvalidity: 'Heavy criminal environmental liability and PSC immediate arrest.'
  },
  {
    id: 'iapp',
    code: 'IAPP',
    fullName: 'International Air Pollution Prevention Certificate',
    governingConvention: 'MARPOL Annex VI Reg. 6',
    issuingAuthority: 'Flag Administration or Recognized Organization (RO / Class)',
    validityYears: 5,
    surveyRegime: 'Annual + Intermediate (Year 2/3) + Renewal (Year 5)',
    windowMonths: '±3 months of anniversary date',
    applicableShipTypes: ['All Ships'],
    minimumGTLimit: 400,
    requiredPlansOrManuals: ['EIAPP Certificates for each Engine', 'NOx Technical Files', 'SEEMP Part I/II/III', 'Fuel Oil Changeover Procedures', 'ODS Record Book'],
    consequencesOfInvalidity: 'Banned from ECA zones and subject to severe port authority fines.'
  },
  {
    id: 'ieec',
    code: 'IEEC',
    fullName: 'International Energy Efficiency Certificate',
    governingConvention: 'MARPOL Annex VI Reg. 5 & 6',
    issuingAuthority: 'Flag Administration or Recognized Organization (RO / Class)',
    validityYears: 99, // Issued once for ship's lifetime unless major conversion
    surveyRegime: 'Non-Expiring (Subject to Annual Audit)',
    windowMonths: 'Permanent with EEDI / EEXI Technical File verification',
    applicableShipTypes: ['All Ships'],
    minimumGTLimit: 400,
    requiredPlansOrManuals: ['EEDI Technical File', 'EEXI Technical File (with EPL/SHaPoLi Management Plan where fitted)', 'SEEMP Part I/II/III'],
    consequencesOfInvalidity: 'Loss of operational trading license.'
  },
  {
    id: 'smc',
    code: 'SMC',
    fullName: 'Safety Management Certificate (ISM Code)',
    governingConvention: 'SOLAS 1974 Reg. IX/4 & ISM Code',
    issuingAuthority: 'Flag Administration or Recognized Organization (RO / Class)',
    validityYears: 5,
    surveyRegime: 'Intermediate (between 2nd and 3rd year) + Renewal (Year 5)',
    windowMonths: 'Between 24 and 36 months from issue date',
    applicableShipTypes: ['All Commercial Ships'],
    minimumGTLimit: 500,
    requiredPlansOrManuals: ['Safety Management System (SMS) Manual', 'Company DOC Copy', 'Shipboard Contingency Plans', 'Internal Safety Audit Reports'],
    consequencesOfInvalidity: 'Invalidates all statutory certificates under SOLAS Chapter IX.'
  },
  {
    id: 'issc',
    code: 'ISSC',
    fullName: 'International Ship Security Certificate (ISPS Code)',
    governingConvention: 'SOLAS 1974 Reg. XI-2/9 & ISPS Code',
    issuingAuthority: 'Flag Administration or Recognized Organization (RO / Class)',
    validityYears: 5,
    surveyRegime: 'Intermediate (between 2nd and 3rd year) + Renewal (Year 5)',
    windowMonths: 'Between 24 and 36 months from issue date',
    applicableShipTypes: ['All Commercial Ships'],
    minimumGTLimit: 500,
    requiredPlansOrManuals: ['Approved Ship Security Plan (SSP)', 'Continuous Synopsis Record (CSR)', 'SSAS Test Records', 'Security Drill Logbook'],
    consequencesOfInvalidity: 'Denial of port entry by Coast Guard and maritime security enforcement.'
  },
  {
    id: 'mlc-cert',
    code: 'MLC',
    fullName: 'Maritime Labour Certificate',
    governingConvention: 'MLC 2006 Title 5 Reg. 5.1.3',
    issuingAuthority: 'Flag Administration or Recognized Organization (RO / Class)',
    validityYears: 5,
    surveyRegime: 'Intermediate (between 2nd and 3rd year) + Renewal (Year 5)',
    windowMonths: 'Between 24 and 36 months from issue date',
    applicableShipTypes: ['All Commercial Ships'],
    minimumGTLimit: 500,
    requiredPlansOrManuals: ['DMLC Part I (Flag) & DMLC Part II (Shipowner measures)', 'Financial Security Certificates (Repatriation & Abandonment)', 'Seafarer Employment Agreements (SEA)', 'Hours of Rest Records'],
    consequencesOfInvalidity: 'Instant PSC detention under Paris/Tokyo MoU and ITF boycott risk.'
  },
  {
    id: 'loadline',
    code: 'LLC',
    fullName: 'International Load Line Certificate',
    governingConvention: 'International Convention on Load Lines 1966/1988',
    issuingAuthority: 'Flag Administration or Recognized Organization (RO / Class)',
    validityYears: 5,
    surveyRegime: 'Annual Endorsement + Renewal (Year 5)',
    windowMonths: '±3 months of anniversary date',
    applicableShipTypes: ['All Ships'],
    minimumGTLimit: 100,
    requiredPlansOrManuals: ['Approved Freeboard Calculation', 'Conditions of Assignment of Freeboard', 'Hatch Cover Maintenance Plan'],
    consequencesOfInvalidity: 'Vessel deemed unseaworthy; immediate detention.'
  }
];

export const PSC_CHECKLIST_DATA: PscChecklistItem[] = [
  {
    id: 'psc-01',
    category: 'Fire Safety',
    itemTitle: 'Emergency Fire Pump Quick Start & Pressure Test',
    regulationRef: 'SOLAS Reg. II-2/10.2.2.3',
    checkProcedure: 'Isolate main fire pumps, open two remote fire hydrants (bridge wing & forecastle), start emergency fire pump in cold state within 2 minutes. Observe 0.27 N/mm² pressure at nozzles.',
    commonDeficiencyCode: '07113 - Fire pumps and its pipes',
    highDetainableRisk: true,
    actionIfDefective: 'Detainable item. Must repair fuel supply / primer or replace impeller before departure.'
  },
  {
    id: 'psc-02',
    category: 'Fire Safety',
    itemTitle: 'Quick-Closing Fuel Valves & Remote Dampers Operation',
    regulationRef: 'SOLAS Reg. II-2/4.2.2.3.4',
    checkProcedure: 'Test pneumatic or wire pull trip handles outside engine room for day/settling tank quick-closing valves. Test funnel fire dampers closing fully without gap.',
    commonDeficiencyCode: '07114 - Remote control valves & dampers',
    highDetainableRisk: true,
    actionIfDefective: 'Detainable if valves fail to seat or cables are jammed/seized.'
  },
  {
    id: 'psc-03',
    category: 'Life Saving Appliances',
    itemTitle: 'Lifeboat Engine Cold Start & On-Load Release Hook Reset',
    regulationRef: 'SOLAS Reg. III/20.6 & LSA Code 4.4.7',
    checkProcedure: 'Start lifeboat diesel engine using primary & secondary batteries within 2 minutes at ambient temperature. Verify forward and aft release hooks are fully reset with green indicator pins aligned.',
    commonDeficiencyCode: '11101 - Lifeboats',
    highDetainableRisk: true,
    actionIfDefective: 'Detainable if engine fails to start or hooks show defective interlocks.'
  },
  {
    id: 'psc-04',
    category: 'MARPOL Pollution',
    itemTitle: '15 ppm Oily Water Separator (OWS) 3-Way Valve Auto-Stop Test',
    regulationRef: 'MARPOL Annex I Reg. 14',
    checkProcedure: 'Supply clean water to 15 ppm monitor, inject sample or press test button, observe 3-way valve shifting discharge back to bilge holding tank within 20 seconds. Check ORB Part I entries match sounding logs.',
    commonDeficiencyCode: '14104 - Oil filtering equipment (OWS)',
    highDetainableRisk: true,
    actionIfDefective: 'Primary cause for criminal investigation & vessel arrest if bypass pipes or falsified records found.'
  },
  {
    id: 'psc-05',
    category: 'Navigation Safety',
    itemTitle: 'ECDIS Software Edition, Sensor Feeds & S-52 Presentation Library',
    regulationRef: 'SOLAS Reg. V/19.2.10 & MSC.1/Circ.1503',
    checkProcedure: 'Verify dual ECDIS running approved IHO Presentation Library (Edition 4.0). Check GPS-1/2, Gyrocompass, and Speed Log input sensors for active alarms. Verify official ENCs are up-to-date with active permits.',
    commonDeficiencyCode: '10111 - Charts / ECDIS',
    highDetainableRisk: true,
    actionIfDefective: 'Detainable if ECDIS display corrupt, unapproved ENCs used, or backup arrangement non-operational.'
  },
  {
    id: 'psc-06',
    category: 'Propulsion & Steering',
    itemTitle: 'Emergency Steering Gear Changeover & Heading Confirmation',
    regulationRef: 'SOLAS Reg. II-1/29 & Reg. V/26',
    checkProcedure: 'Conduct steering gear changeover from bridge to emergency steering room. Verify communication system between bridge and steering compartment. Test rudder movement using emergency power.',
    commonDeficiencyCode: '02108 - Steering gear',
    highDetainableRisk: true,
    actionIfDefective: 'Detainable if steering control fails to switch or rudder travel is delayed >60 seconds.'
  },
  {
    id: 'psc-07',
    category: 'Certificates & Documents',
    itemTitle: 'Hours of Rest Compliance & Fatigue Violations (STCW & MLC)',
    regulationRef: 'STCW Section A-VIII/1 & MLC 2006 Reg. 2.3',
    checkProcedure: 'Audit the last 30 days of rest hour records for Master, Chief Engineer, Watchkeeping Officers, and Deck Ratings. Cross-check logbooks for mooring operations and unrecorded port watches.',
    commonDeficiencyCode: '18408 - Records of rest hours',
    highDetainableRisk: false,
    actionIfDefective: 'Rectification required before departure; repeat systemic violations trigger ISM Code failure (Code 15150).'
  }
];
