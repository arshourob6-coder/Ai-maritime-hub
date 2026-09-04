import { PlanType, Currency } from '../../types';

export type RegLegalType = 
  | 'Mandatory Statutory Requirement'
  | 'IMO Resolution / Code (Mandatory under SOLAS/MARPOL)'
  | 'IMO Recommendation / Circular (Non-Mandatory Guidance)'
  | 'IACS Unified Requirement (UR - Mandatory for IACS Members)'
  | 'IACS Unified Interpretation (UI)'
  | 'Classification Society Rule (Mandatory for Class Notation)'
  | 'Flag-State National Requirement / Circular'
  | 'Port State Control (PSC) Guidance / Directive';

export interface RegulatorySourceRef {
  source: 'IMO' | 'IACS' | 'DNV' | 'ABS' | 'LR' | 'BV' | 'ClassNK' | 'RINA' | 'CCS' | 'Flag State' | 'ILO / MLC' | 'Paris MoU' | 'USCG' | string;
  conventionOrCode: string;
  chapterOrPart: string;
  regulationOrSection: string;
  editionRevision: string;
  effectiveDate: string;
  inForceStatus: 'In Force' | 'Rev. In Force' | 'Adopted - Pending Entry into Force' | 'Superseded' | 'Under Review' | string;
  applicability: string;
  legalType: RegLegalType;
  confidenceScore: number;
}

export interface ImoConventionItem {
  id: string;
  code: string;
  title: string;
  fullName: string;
  adoptionYear: number;
  entryIntoForceDate: string;
  latestMajorRevision: string;
  category: 'Safety' | 'Marine Environment' | 'Seafarers & Manning' | 'Cargo & Special Ships' | 'Liability & Compensation' | 'Ship-Port Interface';
  summary: string;
  keyProtocols: string[];
  mandatoryCodes: string[];
  keyCertificates: string[];
  chaptersCount?: number;
  status: 'In Force' | 'Pending Entry' | 'Major Revision';
  iconName: string;
}

export interface SolasChapter {
  chapter: string;
  roman: string;
  title: string;
  description: string;
  keyRegulations: {
    regNumber: string;
    title: string;
    summary: string;
    applicability: string;
    requiredEquipmentOrDoc: string[];
    amendmentsHistory: string;
    legalType: RegLegalType;
  }[];
  certificatesAssociated: string[];
  checklistsCount: number;
}

export interface MarpolAnnex {
  annexNumber: number;
  roman: string;
  title: string;
  shortName: string;
  inForceDate: string;
  latestResolution: string;
  summary: string;
  dischargeCriteria: {
    area: string;
    substance: string;
    limitOrCondition: string;
    recordRequired: string;
  }[];
  mandatoryEquipment: string[];
  requiredCertificates: string[];
  requiredPlansAndRecords: string[];
  keyAmendments2024_2028: string[];
}

export interface StcwRequirement {
  id: string;
  chapter: string;
  chapterTitle: string;
  codeSection: string;
  title: string;
  rankDepartment: 'Deck' | 'Engine' | 'Radio' | 'Electro-Technical' | 'All Crew' | 'Special Cargo (Tanker/IGF/Polar)';
  competencyTable: string;
  mandatoryCertificates: string[];
  revalidationPeriodYears: number;
  restHoursMandate?: string;
  summary: string;
}

export interface ClassSocietyRuleItem {
  id: string;
  societyCode: 'DNV' | 'ABS' | 'LR' | 'BV' | 'ClassNK' | 'RINA' | 'CCS';
  societyName: string;
  country: string;
  flagEmoji: string;
  category: 'Hull Structural' | 'Machinery & Piping' | 'Electrical & Automation' | 'Materials & Welding' | 'Cyber Resilience' | 'Alternative Fuels & Green Notations' | 'Surveys & Certification';
  ruleDocRef: string;
  ruleTitle: string;
  summary: string;
  classNotationsSample: string[];
  latestUpdateYear: string;
}

export interface IacsItem {
  id: string;
  code: string;
  type: 'UR' | 'UI' | 'PR' | 'CSR';
  title: string;
  category: 'Hull Strength (UR S)' | 'Machinery (UR M)' | 'Electrical & Cyber (UR E)' | 'Materials (UR W)' | 'Survey & Testing (UR Z)' | 'Polar Class (UR I)' | 'Common Structural Rules (CSR)';
  adoptedDate: string;
  implementationDate: string;
  status: 'In Force' | 'Rev. In Force' | 'New Requirement';
  summary: string;
  impactOnDesign: string;
}

export interface FlagStateRequirement {
  id: string;
  flagCountry: string;
  countryCode: string;
  flagEmoji: string;
  administrationName: string;
  fleetRankGT: number;
  authorizedROs: string[];
  specialNotices: {
    noticeNumber: string;
    subject: string;
    dateIssued: string;
    requirementSummary: string;
  }[];
  minSafeManningOverview: string;
  nationalExemptionPolicy: string;
}

export interface RegulatoryAmendment {
  id: string;
  conventionOrBody: 'SOLAS' | 'MARPOL' | 'STCW' | 'IACS' | 'DNV' | 'ABS' | 'Flag State' | 'Polar Code' | 'BWM' | string;
  resolutionNumber: string;
  title: string;
  adoptedDate: string;
  entryIntoForceDate: string;
  status: 'In Force' | 'Coming Soon 2026' | 'Adopted (2027/2028)' | 'Draft / In Committee' | string;
  affectedShipTypes: string[];
  impactLevel: 'High' | 'Medium' | 'Low' | 'Critical';
  summary: string;
  actionRequired: string[];
  keyReferences: string;
}

export interface StatutoryCertificateItem {
  id: string;
  code?: string;
  fullName?: string;
  certificateName?: string;
  convention?: string;
  governingConvention?: string;
  issuingAuthority: string;
  validityYears?: number;
  surveyRegime?: string;
  windowMonths?: string;
  applicableShipTypes?: string[];
  minimumGTLimit?: number;
  requiredPlansOrManuals?: string[];
  consequencesOfInvalidity?: string;
  issueDate?: string;
  expiryDate?: string;
  annualSurveyWindow?: string;
  surveyCycle?: string;
  status?: 'Valid' | 'Survey Due (60 Days)' | 'Expired' | string;
}

export interface ShipComplianceProfile {
  vesselName?: string;
  imoNumber?: string;
  shipType: 'Bulk Carrier' | 'Oil Tanker' | 'Chemical Tanker' | 'Container Ship' | 'Gas Carrier (LNG/LPG)' | 'General Cargo' | 'Passenger / Cruise' | 'Offshore Support Vessel' | 'Tug / Workboat' | string;
  grossTonnage: number;
  deadweightTonnage?: number;
  flagState: string;
  classSociety?: string;
  yearBuilt: number;
  keelLaidDate?: string;
  cargoType: string;
  tradingArea: 'Worldwide (Unrestricted)' | 'Polar Waters (Arctic/Antarctic)' | 'ECA Zones (Baltic / North Sea / US-Canada)' | 'Coastal / Domestic' | 'Inland Waterways' | string;
  propulsionType: '2-Stroke Diesel' | '4-Stroke Medium Speed' | 'Dual-Fuel LNG' | 'Methanol Fuelled' | 'Battery Hybrid' | 'Diesel-Electric' | string;
  hasScrubberEGCS?: boolean;
  hasBWTS?: boolean;
  hasShaftPowerLimitation?: boolean;
}

export interface RegItemMatrix {
  id: string;
  category?: string;
  convention: string;
  chapterOrAnnex?: string;
  regulationNumber?: string;
  regulationRef?: string;
  title: string;
  applicability?: string;
  mandatoryEquipmentOrPlan?: string;
  inspectionVerificationDoc?: string;
  complianceProof?: string;
  notes?: string;
  status: 'Compliant' | 'Pending Verification' | 'Action Required' | 'Not Applicable' | string;
}

export interface ComplianceCheckResult {
  totalApplicableRules: number;
  mandatoryConventions: string[];
  mandatoryCertificates: string[];
  keyEquipmentRequired: string[];
  energyEfficiencyProfile: {
    eediPhase?: string;
    eexiRequirement: string;
    ciiApplicability: string;
    seempRequirement: string;
  };
  specialAreaRequirements: string[];
  pscRiskIndexScore: number;
  complianceReadinessPercent: number;
  deficiencyRisks: {
    area: string;
    level: 'High' | 'Medium' | 'Low';
    description: string;
    mitigation: string;
  }[];
}

export interface PscChecklistItem {
  id: string;
  category: 'Fire Safety' | 'Life Saving Appliances' | 'MARPOL Pollution' | 'Navigation Safety' | 'Propulsion & Steering' | 'Structural / Hull' | 'Certificates & Documents' | 'MLC Living & Working Conditions' | 'ISM & Emergency Drills';
  itemTitle: string;
  regulationRef: string;
  checkProcedure: string;
  commonDeficiencyCode: string;
  highDetainableRisk: boolean;
  actionIfDefective: string;
}
