import { PlanType } from '../../types';

export interface VesselTwin {
  id: string;
  name: string;
  type: 'Container' | 'VLCC Tanker' | 'LNG Carrier' | 'Bulk Carrier' | 'Offshore Support' | 'Ro-Pax Ferry';
  imo: string;
  flag: string;
  builtYear: number;
  classSociety: 'DNV' | 'Lloyds Register' | 'ABS' | 'Bureau Veritas' | 'ClassNK';
  lengthBP: number; // m
  beam: number; // m
  draft: number; // m
  designSpeed: number; // knots
  deadweight: number; // DWT
  engineType: string;
  mcrPowerKW: number;
  currentStatus: 'Underway Sailing' | 'Maneuvering' | 'At Berth Loading' | 'Anchored' | 'Dry Dock';
  location: { lat: number; lon: number; port: string; destination: string; eta: string };
  telemetry: {
    engineLoadPct: number;
    rpm: number;
    speedSOG: number;
    speedSTW: number;
    fuelRateTonsDay: number;
    exhaustTempC: number;
    scavengePressBar: number;
    loTempC: number;
    loPressBar: number;
    vibrationRMS: number; // mm/s
    shaftPowerKW: number;
    trimMeters: number;
    heelDeg: number;
    draftFwd: number;
    draftAft: number;
    ciiRating: 'A' | 'B' | 'C' | 'D' | 'E';
    ciiGramsPerDwtNm: number;
    euEtsDailyCostUSD: number;
    bioFoulingPenaltyPct: number;
  };
  healthScores: {
    overall: number;
    mainEngine: number;
    auxEngines: number;
    propulsion: number;
    hullStructure: number;
    electrical: number;
    safetySystems: number;
  };
}

export interface OffshoreAssetTwin {
  id: string;
  name: string;
  type: 'Fixed Jacket Platform' | 'Deepwater FPSO' | 'Floating Wind Turbine (FOWT)' | 'Jack-up Rig' | 'Subsea Manifold';
  location: string;
  waterDepthM: number;
  operator: string;
  status: 'Normal Production' | 'Weather Standby' | 'Inspection Active' | 'Maintenance';
  waveHeightHs: number; // m
  wavePeriodTp: number; // s
  windSpeedKn: number;
  currentSpeedKn: number;
  mooringTensionKN: number[];
  maxAllowableTensionKN: number;
  fatigueDamageIndex: number; // 0.0 to 1.0 (Miner's sum)
  anodePotentialMV: number;
  productionRateBOPD?: number;
  powerOutputMW?: number;
  structuralHealthScore: number;
}

export interface PortTerminalTwin {
  id: string;
  name: string;
  country: string;
  berthsCount: number;
  activeVessels: number;
  tideHeightM: number;
  berthDepthM: number;
  craneProductivityMovesHr: number;
  shorePowerCapacityMW: number;
  shorePowerUtilizedMW: number;
  yardOccupancyPct: number;
  congestionIndex: 'Low' | 'Moderate' | 'High' | 'Severe';
  waitingVesselsQueue: number;
  co2SavedTonsDay: number;
}

export const VESSEL_TWIN_FLEET: VesselTwin[] = [
  {
    id: 'vessel-1',
    name: 'MV Polaris Enterprise',
    type: 'Container',
    imo: 'IMO 9845214',
    flag: 'Panama 🇵🇦',
    builtYear: 2022,
    classSociety: 'DNV',
    lengthBP: 366.0,
    beam: 51.2,
    draft: 15.5,
    designSpeed: 22.0,
    deadweight: 152000,
    engineType: 'MAN B&W 11G95ME-C9.5-GI (Dual Fuel LNG)',
    mcrPowerKW: 68640,
    currentStatus: 'Underway Sailing',
    location: { lat: 24.81, lon: 54.32, port: 'Arabian Sea', destination: 'Rotterdam (NLRTM)', eta: '2026-08-28 14:00 UTC' },
    telemetry: {
      engineLoadPct: 78,
      rpm: 74,
      speedSOG: 19.4,
      speedSTW: 19.8,
      fuelRateTonsDay: 112.4,
      exhaustTempC: 365,
      scavengePressBar: 2.85,
      loTempC: 44.2,
      loPressBar: 4.3,
      vibrationRMS: 1.45,
      shaftPowerKW: 52400,
      trimMeters: 0.35,
      heelDeg: 0.8,
      draftFwd: 14.8,
      draftAft: 15.15,
      ciiRating: 'A',
      ciiGramsPerDwtNm: 4.12,
      euEtsDailyCostUSD: 4250,
      bioFoulingPenaltyPct: 3.4
    },
    healthScores: {
      overall: 96,
      mainEngine: 97,
      auxEngines: 95,
      propulsion: 98,
      hullStructure: 94,
      electrical: 98,
      safetySystems: 99
    }
  },
  {
    id: 'vessel-2',
    name: 'MT Neptune Titan',
    type: 'VLCC Tanker',
    imo: 'IMO 9784120',
    flag: 'Liberia 🇱🇷',
    builtYear: 2020,
    classSociety: 'ABS',
    lengthBP: 333.0,
    beam: 60.0,
    draft: 21.5,
    designSpeed: 15.5,
    deadweight: 318000,
    engineType: 'WinGD 7X82DF (Dual-Fuel Crude)',
    mcrPowerKW: 29540,
    currentStatus: 'Underway Sailing',
    location: { lat: 1.25, lon: 104.15, port: 'Malacca Strait', destination: 'Ningbo (CNNGB)', eta: '2026-08-25 08:30 UTC' },
    telemetry: {
      engineLoadPct: 82,
      rpm: 68,
      speedSOG: 14.8,
      speedSTW: 15.1,
      fuelRateTonsDay: 58.2,
      exhaustTempC: 382,
      scavengePressBar: 2.65,
      loTempC: 46.8,
      loPressBar: 4.1,
      vibrationRMS: 2.1,
      shaftPowerKW: 24200,
      trimMeters: 0.85,
      heelDeg: 0.4,
      draftFwd: 20.6,
      draftAft: 21.45,
      ciiRating: 'B',
      ciiGramsPerDwtNm: 2.85,
      euEtsDailyCostUSD: 2980,
      bioFoulingPenaltyPct: 5.1
    },
    healthScores: {
      overall: 92,
      mainEngine: 91,
      auxEngines: 94,
      propulsion: 93,
      hullStructure: 90,
      electrical: 95,
      safetySystems: 98
    }
  },
  {
    id: 'vessel-3',
    name: 'SS Arctic Aurora',
    type: 'LNG Carrier',
    imo: 'IMO 9821456',
    flag: 'Marshall Islands 🇲🇭',
    builtYear: 2023,
    classSociety: 'Lloyds Register',
    lengthBP: 299.0,
    beam: 46.4,
    draft: 12.5,
    designSpeed: 19.5,
    deadweight: 96000,
    engineType: 'MAN B&W 5G70ME-C9.5-GI + Reliquefaction Unit',
    mcrPowerKW: 33400,
    currentStatus: 'Maneuvering',
    location: { lat: 25.28, lon: 51.53, port: 'Ras Laffan (QARLF)', destination: 'Tokyo Bay (JPTYO)', eta: '2026-09-02 18:00 UTC' },
    telemetry: {
      engineLoadPct: 65,
      rpm: 62,
      speedSOG: 16.2,
      speedSTW: 16.0,
      fuelRateTonsDay: 48.0,
      exhaustTempC: 348,
      scavengePressBar: 2.3,
      loTempC: 43.1,
      loPressBar: 4.5,
      vibrationRMS: 0.95,
      shaftPowerKW: 21700,
      trimMeters: 0.1,
      heelDeg: 0.2,
      draftFwd: 12.4,
      draftAft: 12.5,
      ciiRating: 'A',
      ciiGramsPerDwtNm: 3.45,
      euEtsDailyCostUSD: 1850,
      bioFoulingPenaltyPct: 1.8
    },
    healthScores: {
      overall: 98,
      mainEngine: 99,
      auxEngines: 98,
      propulsion: 98,
      hullStructure: 97,
      electrical: 99,
      safetySystems: 100
    }
  },
  {
    id: 'vessel-4',
    name: 'MV Pacific Pioneer',
    type: 'Bulk Carrier',
    imo: 'IMO 9645890',
    flag: 'Singapore 🇸🇬',
    builtYear: 2018,
    classSociety: 'ClassNK',
    lengthBP: 292.0,
    beam: 45.0,
    draft: 18.2,
    designSpeed: 14.5,
    deadweight: 180000,
    engineType: 'Hyundai-MAN B&W 6S70ME-C8.2',
    mcrPowerKW: 18600,
    currentStatus: 'Underway Sailing',
    location: { lat: -20.32, lon: 118.57, port: 'Port Hedland (AUPHE)', destination: 'Qingdao (CNTAO)', eta: '2026-08-30 06:00 UTC' },
    telemetry: {
      engineLoadPct: 85,
      rpm: 78,
      speedSOG: 13.6,
      speedSTW: 13.9,
      fuelRateTonsDay: 44.5,
      exhaustTempC: 395,
      scavengePressBar: 2.5,
      loTempC: 48.0,
      loPressBar: 3.9,
      vibrationRMS: 2.65,
      shaftPowerKW: 15800,
      trimMeters: 1.2,
      heelDeg: 1.1,
      draftFwd: 17.0,
      draftAft: 18.2,
      ciiRating: 'C',
      ciiGramsPerDwtNm: 3.98,
      euEtsDailyCostUSD: 3620,
      bioFoulingPenaltyPct: 6.8
    },
    healthScores: {
      overall: 87,
      mainEngine: 85,
      auxEngines: 89,
      propulsion: 86,
      hullStructure: 88,
      electrical: 91,
      safetySystems: 96
    }
  }
];

export const OFFSHORE_ASSETS: OffshoreAssetTwin[] = [
  {
    id: 'offshore-1',
    name: 'PetroNova Deepwater FPSO',
    type: 'Deepwater FPSO',
    location: 'Santos Basin, Pre-Salt Brazil',
    waterDepthM: 2150,
    operator: 'PetroMaritime Global',
    status: 'Normal Production',
    waveHeightHs: 3.4,
    wavePeriodTp: 9.8,
    windSpeedKn: 24,
    currentSpeedKn: 1.8,
    mooringTensionKN: [4250, 4180, 4390, 4100, 4420, 4200, 4150, 4310],
    maxAllowableTensionKN: 8500,
    fatigueDamageIndex: 0.32,
    anodePotentialMV: -1020,
    productionRateBOPD: 145000,
    structuralHealthScore: 94
  },
  {
    id: 'offshore-2',
    name: 'NorthSea Horizon Hywind 15MW',
    type: 'Floating Wind Turbine (FOWT)',
    location: 'Dogger Bank, North Sea',
    waterDepthM: 85,
    operator: 'EquiOcean Renewables',
    status: 'Normal Production',
    waveHeightHs: 4.8,
    wavePeriodTp: 11.2,
    windSpeedKn: 38,
    currentSpeedKn: 2.1,
    mooringTensionKN: [1250, 1310, 1280],
    maxAllowableTensionKN: 3200,
    fatigueDamageIndex: 0.18,
    anodePotentialMV: -980,
    powerOutputMW: 14.8,
    structuralHealthScore: 98
  },
  {
    id: 'offshore-3',
    name: 'Triton Alpha Production Jacket',
    type: 'Fixed Jacket Platform',
    location: 'Gulf of Mexico, Block 412',
    waterDepthM: 160,
    operator: 'GulfEnergy Marine',
    status: 'Normal Production',
    waveHeightHs: 2.1,
    wavePeriodTp: 7.5,
    windSpeedKn: 16,
    currentSpeedKn: 0.9,
    mooringTensionKN: [0], // Fixed
    maxAllowableTensionKN: 0,
    fatigueDamageIndex: 0.54,
    anodePotentialMV: -940,
    productionRateBOPD: 48000,
    structuralHealthScore: 89
  }
];

export const SMART_PORTS: PortTerminalTwin[] = [
  {
    id: 'port-1',
    name: 'Port of Rotterdam - Maasvlakte II Quay Twin',
    country: 'Netherlands 🇳🇱',
    berthsCount: 14,
    activeVessels: 11,
    tideHeightM: 2.4,
    berthDepthM: 20.0,
    craneProductivityMovesHr: 142,
    shorePowerCapacityMW: 45.0,
    shorePowerUtilizedMW: 32.4,
    yardOccupancyPct: 76,
    congestionIndex: 'Low',
    waitingVesselsQueue: 2,
    co2SavedTonsDay: 184.5
  },
  {
    id: 'port-2',
    name: 'PSA Singapore Tuas Mega Port Twin',
    country: 'Singapore 🇸🇬',
    berthsCount: 22,
    activeVessels: 19,
    tideHeightM: 1.8,
    berthDepthM: 21.0,
    craneProductivityMovesHr: 168,
    shorePowerCapacityMW: 60.0,
    shorePowerUtilizedMW: 48.0,
    yardOccupancyPct: 82,
    congestionIndex: 'Moderate',
    waitingVesselsQueue: 5,
    co2SavedTonsDay: 260.0
  }
];

export interface SystemSubcomponent {
  name: string;
  status: 'Normal' | 'Warning' | 'Critical';
  value: string;
  metric: string;
  healthPct: number;
  anomalyScore: number; // 0-100
  recommendation?: string;
}

export interface VesselSystemCategory {
  id: string;
  name: string;
  iconName: string;
  summaryStatus: 'Optimal' | 'Attention Required' | 'Critical Anomaly';
  healthScore: number;
  subcomponents: SystemSubcomponent[];
}

export const GET_SHIP_SYSTEMS = (vessel: VesselTwin): VesselSystemCategory[] => [
  {
    id: 'main_engine',
    name: 'Main Engine & Turbochargers',
    iconName: 'Cpu',
    summaryStatus: vessel.healthScores.mainEngine > 90 ? 'Optimal' : 'Attention Required',
    healthScore: vessel.healthScores.mainEngine,
    subcomponents: [
      { name: 'Cylinder #1-11 Pmax Balancing', status: 'Normal', value: '184.2 bar', metric: '±1.2% dev', healthPct: 98, anomalyScore: 2 },
      { name: 'Exhaust Gas Temps (Avg)', status: 'Normal', value: `${vessel.telemetry.exhaustTempC}°C`, metric: 'Max 480°C', healthPct: 95, anomalyScore: 4 },
      { name: 'Scavenge Air Pressure', status: 'Normal', value: `${vessel.telemetry.scavengePressBar} bar`, metric: 'Receiver clean', healthPct: 96, anomalyScore: 3 },
      { name: 'Turbocharger Bearing Vibration', status: 'Normal', value: `${vessel.telemetry.vibrationRMS} mm/s`, metric: 'ISO 10816-4', healthPct: 92, anomalyScore: 8 },
      { name: 'Cylinder #4 Liner Wear Gradient', status: 'Warning', value: '0.038 mm/1k hr', metric: 'Limit 0.05 mm', healthPct: 84, anomalyScore: 16, recommendation: 'Increase alpha lube cylinder oil injection rate by +8% at next bunker' }
    ]
  },
  {
    id: 'aux_engines',
    name: 'Auxiliary Gensets & Power Management',
    iconName: 'Zap',
    summaryStatus: 'Optimal',
    healthScore: vessel.healthScores.auxEngines,
    subcomponents: [
      { name: 'Genset #1 (1,800 kW 4-Stroke)', status: 'Normal', value: '1,240 kW (68%)', metric: '60.0 Hz / 440V', healthPct: 96, anomalyScore: 2 },
      { name: 'Genset #2 (1,800 kW 4-Stroke)', status: 'Normal', value: 'Standby Auto', metric: 'Ready to sync <12s', healthPct: 99, anomalyScore: 0 },
      { name: 'Power Factor cos φ', status: 'Normal', value: '0.89', metric: 'Ideal 0.85-0.92', healthPct: 97, anomalyScore: 1 },
      { name: 'Shaft Generator Inverter Bus', status: 'Normal', value: '2,400 kW Output', metric: 'Zero MGO consumed', healthPct: 98, anomalyScore: 1 }
    ]
  },
  {
    id: 'propulsion',
    name: 'Propulsion, Shaftline & Steering',
    iconName: 'Anchor',
    summaryStatus: 'Optimal',
    healthScore: vessel.healthScores.propulsion,
    subcomponents: [
      { name: 'Shaft Power Meter Torque', status: 'Normal', value: `${(vessel.telemetry.shaftPowerKW / 1000).toFixed(1)} MW`, metric: 'Torque Calibrated', healthPct: 97, anomalyScore: 2 },
      { name: 'Stern Tube Fwd/Aft Bearing Temp', status: 'Normal', value: '48.5°C / 52.1°C', metric: 'Limit 65°C', healthPct: 96, anomalyScore: 3 },
      { name: 'Shaft Earthing Voltage Drop', status: 'Normal', value: '18 mV', metric: 'Max limit 50 mV', healthPct: 99, anomalyScore: 1 },
      { name: 'Rotary Vane Steering Gear Angle', status: 'Normal', value: 'Port 1.2° / Neutral', metric: 'Hydraulic Press 185 bar', healthPct: 98, anomalyScore: 1 }
    ]
  },
  {
    id: 'navigation',
    name: 'Navigation Bridge & Autonomous Sensor Suite',
    iconName: 'Compass',
    summaryStatus: 'Optimal',
    healthScore: 99,
    subcomponents: [
      { name: 'Dual ECDIS & Radar ARPA Target Tracking', status: 'Normal', value: '48 Targets Tracked', metric: 'CPA/TCPA Guard Active', healthPct: 100, anomalyScore: 0 },
      { name: 'DGPS / GLONASS Multi-constellation', status: 'Normal', value: 'HDOP 0.65', metric: 'Sub-meter Accuracy', healthPct: 100, anomalyScore: 0 },
      { name: 'Echo Sounder Under Keel Clearance', status: 'Normal', value: '18.4m UKC', metric: 'Safe Water Depth', healthPct: 99, anomalyScore: 1 },
      { name: 'Starlink Maritime LEO Link', status: 'Normal', value: '185 Mbps / 32ms Latency', metric: 'Cloud Twin Stream Active', healthPct: 98, anomalyScore: 2 }
    ]
  },
  {
    id: 'electrical_hvac',
    name: 'Electrical 6.6kV Grid & Cargo Hold HVAC',
    iconName: 'Layers',
    summaryStatus: 'Optimal',
    healthScore: vessel.healthScores.electrical,
    subcomponents: [
      { name: 'High Voltage Switchboard 6.6 kV', status: 'Normal', value: 'Vacuum Breakers Armed', metric: 'Insulation >100 MΩ', healthPct: 98, anomalyScore: 1 },
      { name: 'Reefer Container Sockets (Hold 1-7)', status: 'Normal', value: '420 Active Sockets', metric: 'Hold Temp -22.0°C / +4.0°C', healthPct: 96, anomalyScore: 3 },
      { name: 'Engine Room Supply Fans (4x)', status: 'Normal', value: 'Differential Press +150 Pa', metric: 'VFD Modulated', healthPct: 97, anomalyScore: 2 }
    ]
  },
  {
    id: 'pumps_boilers_safety',
    name: 'Pumps, Steam Boilers & Safety Systems',
    iconName: 'ShieldCheck',
    summaryStatus: 'Optimal',
    healthScore: vessel.healthScores.safetySystems,
    subcomponents: [
      { name: 'Exhaust Gas Economizer Steam Drum', status: 'Normal', value: '7.2 bar saturated', metric: 'Steam rate 3.4 t/h', healthPct: 95, anomalyScore: 4 },
      { name: 'Ballast Water Treatment (BWT UV)', status: 'Normal', value: 'USCG & IMO D-2 Certified', metric: 'Dose 320 mJ/cm²', healthPct: 99, anomalyScore: 0 },
      { name: 'Bilge Water 15-PPM OWS Monitor', status: 'Normal', value: '2.4 PPM Discharge', metric: 'Marpol Annex I Zero Spill', healthPct: 100, anomalyScore: 0 },
      { name: 'Hi-Fog Water Mist Fire Loop', status: 'Normal', value: '140 bar Standby', metric: 'Zero Line Leakage', healthPct: 100, anomalyScore: 0 }
    ]
  }
];

export interface PredictiveWorkOrder {
  id: string;
  component: string;
  system: string;
  criticality: 'Urgent' | 'High' | 'Medium' | 'Routine';
  predictedFailureHorizonHrs: number;
  confidenceScorePct: number;
  partNumber: string;
  estCostUSD: number;
  classSurveyItem: boolean;
  actionRequired: string;
}

export const PREDICTIVE_WORK_ORDERS: PredictiveWorkOrder[] = [
  {
    id: 'WO-8821',
    component: 'Turbocharger Rotor #1 Plain Journal Bearing',
    system: 'Main Engine',
    criticality: 'High',
    predictedFailureHorizonHrs: 450,
    confidenceScorePct: 94.2,
    partNumber: 'TCR-95-BRG-4421',
    estCostUSD: 14200,
    classSurveyItem: true,
    actionRequired: 'Replace rotor bearing shell during scheduled port turnaround in Rotterdam. Micro-vibration frequency spectrum indicates initial surface spalling on upper loaded half.'
  },
  {
    id: 'WO-8822',
    component: 'Main Engine Cylinder #4 Fuel Injector Nozzle',
    system: 'Fuel Injection System',
    criticality: 'Medium',
    predictedFailureHorizonHrs: 720,
    confidenceScorePct: 91.5,
    partNumber: 'ME-INJ-950-NOZ',
    estCostUSD: 3800,
    classSurveyItem: false,
    actionRequired: 'Test atomization spray pattern and crack pressure (target 380 bar). Minor thermal variance (+14°C exhaust) detected via neural telemetry model.'
  },
  {
    id: 'WO-8823',
    component: 'Stern Tube Aft Inflatable Seal Ring',
    system: 'Propulsion Shaftline',
    criticality: 'Medium',
    predictedFailureHorizonHrs: 1800,
    confidenceScorePct: 88.0,
    partNumber: 'STS-SEAL-850-VITON',
    estCostUSD: 8500,
    classSurveyItem: true,
    actionRequired: 'Inspect seal oil header tank consumption and water-in-oil sensor ppm. Schedule seal replacement during Q4 dry dock survey.'
  },
  {
    id: 'WO-8824',
    component: 'Auxiliary Boiler Burner Flame Scanner & Air Damper Servo',
    system: 'Steam Plant',
    criticality: 'Routine',
    predictedFailureHorizonHrs: 2400,
    confidenceScorePct: 85.4,
    partNumber: 'BLR-OPT-SCAN-02',
    estCostUSD: 1250,
    classSurveyItem: false,
    actionRequired: 'Clean optical lens and calibrate potentiometer positioning for dual-fuel combustion modulation.'
  }
];

export const DIGITAL_TWIN_AI_PROMPTS = [
  {
    category: 'Machinery Health & Anomaly',
    prompt: 'Explain the thermal anomaly on Cylinder #4 exhaust and calculate remaining time before thermal de-rating is triggered.',
    badge: 'ENGINEERING'
  },
  {
    category: 'Decarbonization & CII',
    prompt: 'Simulate speed reduction from 19.4 kn to 17.5 kn: calculate daily VLSFO savings, EU ETS cost delta, and CII grade impact.',
    badge: 'ENERGY'
  },
  {
    category: 'Stability & Intact Check',
    prompt: 'Verify IMO Intact Stability Criteria A.749(18) for current loading condition with 14.8m Fwd / 15.15m Aft draft in Beaufort 6 seas.',
    badge: 'SAFETY'
  },
  {
    category: 'Port Berth Synchronization',
    prompt: 'Optimize Rotterdam Quay 42 berth arrival with dynamic tidal window and 32 MW shore power connection schedule.',
    badge: 'SMART PORT'
  }
];
