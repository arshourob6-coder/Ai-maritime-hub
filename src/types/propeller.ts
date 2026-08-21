export type PropellerType =
  | 'FPP'
  | 'CPP'
  | 'Ducted_Kort'
  | 'Kaplan'
  | 'Wageningen_B'
  | 'Gawn_Series'
  | 'Troost_Series'
  | 'High_Speed'
  | 'Surface_Piercing'
  | 'Ice_Class'
  | 'Naval'
  | 'Contra_Rotating'
  | 'Twin_Propeller'
  | 'Triple_Propeller'
  | 'Quad_Propeller'
  | 'Waterjet_Impeller'
  | 'Azimuth_Thruster'
  | 'Hybrid_Electric'
  | 'Custom';

export type ClassificationSociety = 'DNV' | 'ABS' | 'LR' | 'BV' | 'RINA' | 'IRS' | 'ClassNK' | 'CCS';

export interface ShipParticulars {
  loa: number; // m
  lbp: number; // m
  lwl: number; // m
  beam: number; // m
  draft: number; // m
  displacement: number; // tonnes
  serviceSpeedKnots: number; // knots
  maxSpeedKnots: number; // knots
  totalResistanceKn: number; // kN
  effectivePowerKw: number; // kW
  deliveredPowerKw: number; // kW
  brakePowerKw: number; // kW
  hullEfficiency: number;
  wakeFraction: number; // w
  thrustDeduction: number; // t
  waterDensity: number; // kg/m^3
  waterTempC: number; // deg C
  seaMarginPercent: number; // %
  engineRpm: number; // RPM
  gearRatio: number;
  shaftRpm: number; // RPM
  requiredPropRpm: number; // RPM
  maxDiameterLimitM: number; // m
  bladeMaterial: string;
  classificationSociety: ClassificationSociety;
  operatingArea: string;
}

export interface RadialSectionGeometry {
  rRatio: number; // r/R (0.2, 0.3, ... 1.0)
  pitchRatio: number; // P/D at this radius
  chordMm: number; // Chord length in mm
  thicknessMm: number; // Thickness in mm
  camberRatio: number; // Camber f/c
  skewDeg: number; // Skew angle in deg
  rakeMm: number; // Rake in mm
  twistDeg: number; // Twist angle deg
}

export interface StepCalculationResult {
  stepNumber: number;
  title: string;
  symbol: string;
  value: number;
  unit: string;
  formulaLatex: string;
  description: string;
  status: 'passed' | 'warning' | 'optimal';
}

export interface WageningenCurvePoint {
  J: number; // Advance ratio
  KT: number; // Thrust coefficient
  KQ10: number; // 10 * KQ
  eta0: number; // Open water efficiency
  cavitationRiskPercent: number;
}

export interface CavitationAnalysis {
  tipCavitation: boolean;
  hubCavitation: boolean;
  rootCavitation: boolean;
  sheetCavitationRiskPercent: number;
  bubbleCavitationRiskPercent: number;
  cloudCavitationRiskPercent: number;
  faceCavitationRiskPercent: number;
  backCavitationRiskPercent: number;
  kellerMinAreaRatio: number;
  actualAreaRatio: number;
  kellerSatisfied: boolean;
  cavitationNumberSigma: number;
  pressureMinPa: number;
  vaporPressurePa: number;
  recommendations: string[];
}

export interface BladeOffsetRow {
  rRatio: number;
  chordPercent: number; // 0% to 100%
  xMm: number;
  yFaceMm: number;
  zFaceMm: number;
  yBackMm: number;
  zBackMm: number;
}

export interface PropellerMaterial {
  id: string;
  name: string;
  densityKgM3: number;
  yieldStrengthMpa: number;
  tensileStrengthMpa: number;
  fatigueLimitMpa: number;
  corrosionRating: string;
  costPerKgUSD: number;
  elasticModulusGpa: number;
  poissonRatio: number;
}

export interface PropellerDatabaseEntry {
  id: string;
  name: string;
  type: PropellerType;
  diameterM: number;
  numBlades: number;
  pitchRatio: number;
  expandedAreaRatio: number;
  openWaterEfficiency: number;
  maxRpm: number;
  maxPowerKw: number;
  application: string;
  manufacturer: string;
  imageThumbnail: string;
}

export interface PropellerOptimizationRequest {
  shipParticulars: ShipParticulars;
  targetObjective: 'max_efficiency' | 'min_cavitation' | 'min_noise' | 'min_weight' | 'ice_strength';
  numBlades: number;
  propellerType: PropellerType;
}

export interface PropellerOptimizationResult {
  optimumDiameterM: number;
  optimumPitchRatio: number;
  optimumEAR: number;
  optimumBlades: number;
  predictedEfficiencyPercent: number;
  fuelSavingTonsPerYear: number;
  co2ReductionTonsPerYear: number;
  cavitationIndex: number;
  aiExplanation: string;
}
