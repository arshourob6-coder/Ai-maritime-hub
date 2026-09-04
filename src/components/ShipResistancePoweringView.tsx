import React, { useState, useMemo } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { AITutorSidebar } from './AITutorSidebar';
import {
  Ship,
  Wind,
  Zap,
  Gauge,
  Sliders,
  Sparkles,
  BarChart3,
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  Layers,
  HelpCircle,
  Copy,
  Flame,
  ArrowRight,
  TrendingDown,
  RefreshCw,
  Compass,
  Scale,
  Award,
  Globe,
  DollarSign,
  Cpu,
  BookOpen,
  Volume2,
  Share2,
  ShieldCheck,
  ChevronRight,
  Activity,
  Plus,
  Bot,
  PieChart as PieChartIcon,
  Check,
  Radio,
  SlidersHorizontal,
  FolderDown,
  Database,
  Lock,
  Users
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

// 24 Vessel Presets covering all requested vessel types
interface VesselPreset {
  id: string;
  name: string;
  category: 'Merchant' | 'Commercial' | 'High-Speed Craft' | 'Offshore' | 'Naval' | 'Specialized & Autonomous';
  type: string;
  loa: number;
  lbp: number;
  lwl: number;
  beam: number;
  depth: number;
  draft: number;
  disp: number; // tonnes
  dwt: number;  // tonnes
  cb: number;
  cp: number;
  cw: number;
  lcb: number;  // % LBP
  lcf: number;  // % LBP
  hullMaterial: string;
  designSpeed: number; // knots
  maxSpeed: number;    // knots
  seaMargin: number;     // %
  recommendedMethod: string;
  propellerType: 'FPP' | 'CPP' | 'Azipod' | 'Waterjet' | 'Ducted Propeller';
  numPropellers: number;
}

const PRESET_VESSELS: VesselPreset[] = [
  {
    id: 'cont-10k',
    name: '10,000 TEU Neo-Panamax Container Ship',
    category: 'Merchant',
    type: 'Container Ship',
    loa: 336.0,
    lbp: 320.0,
    lwl: 325.0,
    beam: 48.2,
    depth: 27.2,
    draft: 14.5,
    disp: 125000,
    dwt: 110000,
    cb: 0.62,
    cp: 0.64,
    cw: 0.78,
    lcb: -1.2,
    lcf: -3.5,
    hullMaterial: 'AH36 High-Tensile Steel',
    designSpeed: 21.5,
    maxSpeed: 24.0,
    seaMargin: 15,
    recommendedMethod: 'Holtrop & Mennen (1984)',
    propellerType: 'FPP',
    numPropellers: 1
  },
  {
    id: 'bulk-kamsarmax',
    name: '82,000 DWT Kamsarmax Bulk Carrier',
    category: 'Merchant',
    type: 'Bulk Carrier',
    loa: 229.0,
    lbp: 222.0,
    lwl: 225.0,
    beam: 32.26,
    depth: 20.0,
    draft: 14.5,
    disp: 95000,
    dwt: 82000,
    cb: 0.82,
    cp: 0.83,
    cw: 0.87,
    lcb: 2.1,
    lcf: 1.0,
    hullMaterial: 'Mild Steel & NV-36',
    designSpeed: 14.0,
    maxSpeed: 15.5,
    seaMargin: 15,
    recommendedMethod: 'Holtrop & Mennen (1984)',
    propellerType: 'FPP',
    numPropellers: 1
  },
  {
    id: 'vlcc-300k',
    name: '300,000 DWT VLCC Oil Tanker',
    category: 'Merchant',
    type: 'Oil Tanker',
    loa: 333.0,
    lbp: 322.0,
    lwl: 326.5,
    beam: 60.0,
    depth: 30.5,
    draft: 20.5,
    disp: 345000,
    dwt: 300000,
    cb: 0.83,
    cp: 0.84,
    cw: 0.88,
    lcb: 2.5,
    lcf: 1.2,
    hullMaterial: 'NV D36 Steel',
    designSpeed: 14.8,
    maxSpeed: 16.0,
    seaMargin: 15,
    recommendedMethod: 'Hollenbach (1998)',
    propellerType: 'FPP',
    numPropellers: 1
  },
  {
    id: 'chem-45k',
    name: '45,000 DWT Stainless Steel Chemical Tanker',
    category: 'Merchant',
    type: 'Chemical Tanker',
    loa: 183.0,
    lbp: 174.0,
    lwl: 178.0,
    beam: 32.2,
    depth: 19.1,
    draft: 12.2,
    disp: 54000,
    dwt: 45000,
    cb: 0.78,
    cp: 0.79,
    cw: 0.84,
    lcb: 1.5,
    lcf: 0.2,
    hullMaterial: '316L Stainless Steel Clad',
    designSpeed: 15.0,
    maxSpeed: 16.5,
    seaMargin: 15,
    recommendedMethod: 'Holtrop & Mennen (1984)',
    propellerType: 'CPP',
    numPropellers: 1
  },
  {
    id: 'lng-174k',
    name: '174,000 m³ LNG Carrier (2-Stroke DF)',
    category: 'Merchant',
    type: 'LNG Carrier',
    loa: 299.0,
    lbp: 286.0,
    lwl: 291.0,
    beam: 46.4,
    depth: 26.5,
    draft: 11.8,
    disp: 98000,
    dwt: 85000,
    cb: 0.72,
    cp: 0.735,
    cw: 0.82,
    lcb: -0.5,
    lcf: -2.0,
    hullMaterial: 'Cryogenic NV-E36 Steel',
    designSpeed: 19.5,
    maxSpeed: 21.0,
    seaMargin: 15,
    recommendedMethod: 'Holtrop & Mennen (1984)',
    propellerType: 'FPP',
    numPropellers: 2
  },
  {
    id: 'lpg-84k',
    name: '84,000 m³ VLGC LPG Carrier',
    category: 'Merchant',
    type: 'LPG Carrier',
    loa: 226.0,
    lbp: 218.0,
    lwl: 221.0,
    beam: 36.6,
    depth: 22.2,
    draft: 12.0,
    disp: 68000,
    dwt: 55000,
    cb: 0.73,
    cp: 0.74,
    cw: 0.81,
    lcb: 0.2,
    lcf: -1.0,
    hullMaterial: 'Low-Temp EH36 Steel',
    designSpeed: 16.8,
    maxSpeed: 18.2,
    seaMargin: 15,
    recommendedMethod: 'Holtrop & Mennen (1984)',
    propellerType: 'FPP',
    numPropellers: 1
  },
  {
    id: 'pass-ferry-1200',
    name: 'Day Passenger Ferry (1,200 Passengers)',
    category: 'Commercial',
    type: 'Passenger Ship',
    loa: 110.0,
    lbp: 102.0,
    lwl: 105.0,
    beam: 19.0,
    depth: 7.5,
    draft: 4.2,
    disp: 4200,
    dwt: 1200,
    cb: 0.58,
    cp: 0.62,
    cw: 0.72,
    lcb: -2.0,
    lcf: -4.0,
    hullMaterial: 'Marine Grade Aluminum 5083',
    designSpeed: 22.0,
    maxSpeed: 25.0,
    seaMargin: 15,
    recommendedMethod: 'Hollenbach (1998)',
    propellerType: 'CPP',
    numPropellers: 2
  },
  {
    id: 'cruise-140k',
    name: '140,000 GT Luxury Cruise Liner',
    category: 'Commercial',
    type: 'Cruise Ship',
    loa: 330.0,
    lbp: 305.0,
    lwl: 312.0,
    beam: 41.5,
    depth: 21.0,
    draft: 8.6,
    disp: 62000,
    dwt: 12500,
    cb: 0.65,
    cp: 0.67,
    cw: 0.76,
    lcb: -1.8,
    lcf: -4.2,
    hullMaterial: 'AH36 High-Strength Steel',
    designSpeed: 22.5,
    maxSpeed: 24.8,
    seaMargin: 15,
    recommendedMethod: 'Hollenbach (1998)',
    propellerType: 'Azipod',
    numPropellers: 2
  },
  {
    id: 'ropax-200m',
    name: '200m Vehicle/Passenger Ro-Pax Ferry',
    category: 'Commercial',
    type: 'Ferry',
    loa: 200.0,
    lbp: 188.0,
    lwl: 192.0,
    beam: 28.5,
    depth: 16.0,
    draft: 6.5,
    disp: 22000,
    dwt: 7500,
    cb: 0.62,
    cp: 0.65,
    cw: 0.75,
    lcb: -1.5,
    lcf: -3.8,
    hullMaterial: 'NV DH36 Steel',
    designSpeed: 23.5,
    maxSpeed: 26.0,
    seaMargin: 15,
    recommendedMethod: 'Holtrop & Mennen (1984)',
    propellerType: 'CPP',
    numPropellers: 2
  },
  {
    id: 'roro-6500',
    name: '6,500 CEU Pure Car & Truck Carrier (PCTC)',
    category: 'Commercial',
    type: 'Ro-Ro',
    loa: 199.9,
    lbp: 190.0,
    lwl: 193.5,
    beam: 32.2,
    depth: 34.5,
    draft: 9.8,
    disp: 32000,
    dwt: 18500,
    cb: 0.60,
    cp: 0.63,
    cw: 0.74,
    lcb: -1.8,
    lcf: -4.0,
    hullMaterial: 'High-Tensile AH36',
    designSpeed: 20.0,
    maxSpeed: 22.0,
    seaMargin: 15,
    recommendedMethod: 'Holtrop & Mennen (1984)',
    propellerType: 'FPP',
    numPropellers: 1
  },
  {
    id: 'cargo-15k',
    name: '15,000 DWT General Cargo Vessel',
    category: 'Commercial',
    type: 'General Cargo',
    loa: 142.0,
    lbp: 134.0,
    lwl: 137.0,
    beam: 21.5,
    depth: 12.0,
    draft: 8.5,
    disp: 19500,
    dwt: 15000,
    cb: 0.75,
    cp: 0.76,
    cw: 0.83,
    lcb: 0.8,
    lcf: -0.5,
    hullMaterial: 'Grade A Shipbuilding Steel',
    designSpeed: 14.5,
    maxSpeed: 16.0,
    seaMargin: 15,
    recommendedMethod: 'Series 60',
    propellerType: 'CPP',
    numPropellers: 1
  },
  {
    id: 'multi-28k',
    name: '28,000 DWT Heavy Lift Multipurpose Vessel',
    category: 'Commercial',
    type: 'Multipurpose Vessel',
    loa: 168.0,
    lbp: 158.0,
    lwl: 162.0,
    beam: 25.2,
    depth: 13.8,
    draft: 9.5,
    disp: 31000,
    dwt: 28000,
    cb: 0.76,
    cp: 0.77,
    cw: 0.84,
    lcb: 1.0,
    lcf: -0.2,
    hullMaterial: 'NV DH36 High Strength',
    designSpeed: 15.5,
    maxSpeed: 17.0,
    seaMargin: 15,
    recommendedMethod: 'Holtrop & Mennen (1984)',
    propellerType: 'CPP',
    numPropellers: 1
  },
  {
    id: 'tug-asd-70t',
    name: '32m ASD Escort Tugboat (70t BP)',
    category: 'Specialized & Autonomous',
    type: 'Tug Boat',
    loa: 32.0,
    lbp: 29.5,
    lwl: 30.2,
    beam: 12.5,
    depth: 5.4,
    draft: 4.5,
    disp: 850,
    dwt: 250,
    cb: 0.58,
    cp: 0.65,
    cw: 0.75,
    lcb: -1.0,
    lcf: -3.0,
    hullMaterial: 'NV Grade A Steel',
    designSpeed: 13.5,
    maxSpeed: 14.5,
    seaMargin: 15,
    recommendedMethod: 'Series 60 / Van Oortmerssen',
    propellerType: 'Ducted Propeller',
    numPropellers: 2
  },
  {
    id: 'fish-65m',
    name: '65m Ocean Stern Factory Trawler',
    category: 'Commercial',
    type: 'Fishing Vessel',
    loa: 65.0,
    lbp: 58.0,
    lwl: 60.5,
    beam: 14.0,
    depth: 8.2,
    draft: 5.8,
    disp: 2800,
    dwt: 1400,
    cb: 0.64,
    cp: 0.66,
    cw: 0.78,
    lcb: -0.5,
    lcf: -2.0,
    hullMaterial: 'Ice Class IA Steel',
    designSpeed: 14.0,
    maxSpeed: 15.5,
    seaMargin: 20,
    recommendedMethod: 'Van Oortmerssen',
    propellerType: 'Ducted Propeller',
    numPropellers: 1
  },
  {
    id: 'patrol-opv-55m',
    name: '55m Offshore Patrol Vessel (OPV)',
    category: 'Naval',
    type: 'Patrol Vessel',
    loa: 55.0,
    lbp: 49.5,
    lwl: 51.0,
    beam: 9.2,
    depth: 5.0,
    draft: 2.8,
    disp: 520,
    dwt: 180,
    cb: 0.50,
    cp: 0.60,
    cw: 0.68,
    lcb: -4.0,
    lcf: -7.0,
    hullMaterial: 'NV AH36 Steel & Al Alloy Superstructure',
    designSpeed: 26.0,
    maxSpeed: 29.0,
    seaMargin: 10,
    recommendedMethod: 'Holtrop & Mennen (1984)',
    propellerType: 'CPP',
    numPropellers: 2
  },
  {
    id: 'frigate-145m',
    name: '145m Guided Missile Stealth Frigate',
    category: 'Naval',
    type: 'Naval Ship',
    loa: 145.0,
    lbp: 135.0,
    lwl: 138.0,
    beam: 18.2,
    depth: 11.5,
    draft: 5.2,
    disp: 5800,
    dwt: 1200,
    cb: 0.52,
    cp: 0.61,
    cw: 0.70,
    lcb: -2.8,
    lcf: -5.5,
    hullMaterial: 'Mil-Spec High Strength Steel',
    designSpeed: 28.5,
    maxSpeed: 32.0,
    seaMargin: 10,
    recommendedMethod: 'Holtrop & Mennen (1984)',
    propellerType: 'CPP',
    numPropellers: 2
  },
  {
    id: 'psv-80m',
    name: '80m Dynamic Positioning Platform Supply Vessel (PSV)',
    category: 'Offshore',
    type: 'Offshore Supply Vessel',
    loa: 83.4,
    lbp: 76.5,
    lwl: 78.0,
    beam: 18.0,
    depth: 8.0,
    draft: 6.2,
    disp: 5200,
    dwt: 4000,
    cb: 0.74,
    cp: 0.75,
    cw: 0.84,
    lcb: 0.5,
    lcf: -1.0,
    hullMaterial: 'NV EH36 High Strength Steel',
    designSpeed: 14.5,
    maxSpeed: 16.0,
    seaMargin: 15,
    recommendedMethod: 'Hollenbach (1998)',
    propellerType: 'Azipod',
    numPropellers: 2
  },
  {
    id: 'ahts-85m',
    name: '85m Anchor Handling Tug Supply (200t BP)',
    category: 'Offshore',
    type: 'AHTS',
    loa: 85.0,
    lbp: 76.0,
    lwl: 78.5,
    beam: 22.0,
    depth: 9.5,
    draft: 7.2,
    disp: 7800,
    dwt: 4200,
    cb: 0.68,
    cp: 0.70,
    cw: 0.80,
    lcb: -0.2,
    lcf: -2.0,
    hullMaterial: 'EH36 High Strength',
    designSpeed: 16.0,
    maxSpeed: 17.5,
    seaMargin: 20,
    recommendedMethod: 'Holtrop & Mennen (1984)',
    propellerType: 'Ducted Propeller',
    numPropellers: 2
  },
  {
    id: 'fpso-300k',
    name: '300,000 DWT Spread-Moored FPSO',
    category: 'Offshore',
    type: 'FPSO',
    loa: 333.0,
    lbp: 320.0,
    lwl: 325.0,
    beam: 58.0,
    depth: 31.0,
    draft: 22.0,
    disp: 360000,
    dwt: 300000,
    cb: 0.86,
    cp: 0.87,
    cw: 0.90,
    lcb: 3.0,
    lcf: 1.5,
    hullMaterial: 'Extra Heavy Structural Steel',
    designSpeed: 11.0,
    maxSpeed: 12.5,
    seaMargin: 20,
    recommendedMethod: 'Hollenbach (1998)',
    propellerType: 'CPP',
    numPropellers: 1
  },
  {
    id: 'yacht-60m',
    name: '60m Luxury Motor Yacht',
    category: 'Commercial',
    type: 'Yacht',
    loa: 60.0,
    lbp: 52.5,
    lwl: 54.0,
    beam: 11.0,
    depth: 6.2,
    draft: 3.4,
    disp: 950,
    dwt: 220,
    cb: 0.52,
    cp: 0.62,
    cw: 0.70,
    lcb: -3.5,
    lcf: -6.0,
    hullMaterial: 'Alu-Steel Composite 5083',
    designSpeed: 16.5,
    maxSpeed: 18.5,
    seaMargin: 10,
    recommendedMethod: 'Holtrop & Mennen (1984)',
    propellerType: 'CPP',
    numPropellers: 2
  },
  {
    id: 'fast-ferry-cat',
    name: '85m High-Speed Vehicle/Passenger Catamaran',
    category: 'High-Speed Craft',
    type: 'Catamaran',
    loa: 85.0,
    lbp: 78.0,
    lwl: 80.0,
    beam: 24.0,
    depth: 7.2,
    draft: 3.2,
    disp: 1250,
    dwt: 450,
    cb: 0.48,
    cp: 0.60,
    cw: 0.65,
    lcb: -5.0,
    lcf: -8.0,
    hullMaterial: 'Marine Grade Aluminum 5083-H116',
    designSpeed: 38.0,
    maxSpeed: 42.0,
    seaMargin: 10,
    recommendedMethod: 'Insel & Molland (Catamaran)',
    propellerType: 'Waterjet',
    numPropellers: 4
  },
  {
    id: 'trimaran-102m',
    name: '102m High-Speed Wave Piercing Trimaran',
    category: 'High-Speed Craft',
    type: 'Trimaran',
    loa: 102.0,
    lbp: 94.0,
    lwl: 96.0,
    beam: 27.4,
    depth: 7.6,
    draft: 3.5,
    disp: 1850,
    dwt: 700,
    cb: 0.45,
    cp: 0.58,
    cw: 0.62,
    lcb: -6.0,
    lcf: -9.0,
    hullMaterial: 'Lightweight Aluminum Composite',
    designSpeed: 40.0,
    maxSpeed: 44.5,
    seaMargin: 10,
    recommendedMethod: 'Insel & Molland (Catamaran)',
    propellerType: 'Waterjet',
    numPropellers: 4
  },
  {
    id: 'patrol-interceptor',
    name: '38m Savitsky Planing Patrol Interceptor',
    category: 'High-Speed Craft',
    type: 'Planing Craft',
    loa: 38.0,
    lbp: 34.0,
    lwl: 35.0,
    beam: 7.5,
    depth: 4.0,
    draft: 1.8,
    disp: 160,
    dwt: 45,
    cb: 0.42,
    cp: 0.62,
    cw: 0.58,
    lcb: -8.5,
    lcf: -11.0,
    hullMaterial: 'Carbon Fiber Reinforced Polymer',
    designSpeed: 45.0,
    maxSpeed: 52.0,
    seaMargin: 10,
    recommendedMethod: 'Savitsky Planing Method',
    propellerType: 'Waterjet',
    numPropellers: 3
  },
  {
    id: 'autonomous-feeder-120m',
    name: '120m Zero-Emission Autonomous Container Feeder',
    category: 'Specialized & Autonomous',
    type: 'Autonomous Ship',
    loa: 120.0,
    lbp: 112.0,
    lwl: 115.0,
    beam: 20.0,
    depth: 11.0,
    draft: 6.2,
    disp: 8800,
    dwt: 6500,
    cb: 0.68,
    cp: 0.70,
    cw: 0.79,
    lcb: -1.0,
    lcf: -3.0,
    hullMaterial: 'Recyclable High-Strength Steel',
    designSpeed: 14.0,
    maxSpeed: 16.0,
    seaMargin: 15,
    recommendedMethod: 'AI-CFD Hybrid Solver',
    propellerType: 'Azipod',
    numPropellers: 2
  }
];

// Marine Engine Database for Engine Matching (Step 15)
interface MarineEngine {
  id: string;
  manufacturer: string;
  model: string;
  type: string;
  mcrKW: number;
  rpm: number;
  sfocGkWh: number;
  cylinders: number;
  boreMM: number;
  strokeMM: number;
  weightTons: number;
  fuelCompatibility: string[];
}

const MARINE_ENGINES_DB: MarineEngine[] = [
  { id: 'man-6g50', manufacturer: 'MAN Energy Solutions', model: 'MAN B&W 6G50ME-C9.5', type: '2-Stroke Slow Speed', mcrKW: 10320, rpm: 98, sfocGkWh: 162, cylinders: 6, boreMM: 500, strokeMM: 2214, weightTons: 235, fuelCompatibility: ['VLSFO', 'MGO', 'Biofuel'] },
  { id: 'wartsila-31df', manufacturer: 'Wärtsilä', model: 'Wärtsilä 31DF 16V', type: '4-Stroke Dual Fuel', mcrKW: 9800, rpm: 750, sfocGkWh: 165, cylinders: 16, boreMM: 310, strokeMM: 430, weightTons: 92, fuelCompatibility: ['LNG', 'MGO', 'VLSFO'] },
  { id: 'cat-3516c', manufacturer: 'Caterpillar Marine', model: 'Cat 3516C HD', type: '4-Stroke High Speed', mcrKW: 2350, rpm: 1800, sfocGkWh: 192, cylinders: 16, boreMM: 170, strokeMM: 215, weightTons: 8.5, fuelCompatibility: ['MGO', 'HVO'] },
  { id: 'cummins-qsk60', manufacturer: 'Cummins Marine', model: 'Cummins QSK60-M', type: '4-Stroke High Speed', mcrKW: 1864, rpm: 1800, sfocGkWh: 198, cylinders: 16, boreMM: 159, strokeMM: 190, weightTons: 8.1, fuelCompatibility: ['MGO'] },
  { id: 'mtu-16v4000', manufacturer: 'MTU Solutions', model: 'MTU 16V 4000 M93L', type: '4-Stroke High Speed', mcrKW: 3440, rpm: 2100, sfocGkWh: 205, cylinders: 16, boreMM: 170, strokeMM: 210, weightTons: 9.8, fuelCompatibility: ['MGO', 'HVO'] },
  { id: 'scania-di16', manufacturer: 'Scania Marine', model: 'Scania DI16 083M', type: '4-Stroke High Speed', mcrKW: 846, rpm: 2300, sfocGkWh: 195, cylinders: 8, boreMM: 130, strokeMM: 154, weightTons: 1.7, fuelCompatibility: ['MGO', 'Biodiesel'] },
  { id: 'yanmar-6ey26', manufacturer: 'Yanmar Marine', model: 'Yanmar 6EY26W', type: '4-Stroke Medium Speed', mcrKW: 1920, rpm: 750, sfocGkWh: 182, cylinders: 6, boreMM: 260, strokeMM: 385, weightTons: 22, fuelCompatibility: ['MGO', 'VLSFO'] },
  { id: 'hyundai-himsen-9h32', manufacturer: 'Hyundai Heavy Industries', model: 'HiMSEN 9H32/40', type: '4-Stroke Medium Speed', mcrKW: 4500, rpm: 750, sfocGkWh: 178, cylinders: 9, boreMM: 320, strokeMM: 400, weightTons: 48, fuelCompatibility: ['MGO', 'VLSFO', 'Dual Fuel'] },
  { id: 'mitsubishi-s12r', manufacturer: 'Mitsubishi Turbo', model: 'Mitsubishi S12R-MPTA', type: '4-Stroke High Speed', mcrKW: 1100, rpm: 1500, sfocGkWh: 202, cylinders: 12, boreMM: 170, strokeMM: 180, weightTons: 5.3, fuelCompatibility: ['MGO'] },
  { id: 'volvo-d16', manufacturer: 'Volvo Penta', model: 'Volvo Penta D16 MH', type: '4-Stroke High Speed', mcrKW: 552, rpm: 1800, sfocGkWh: 198, cylinders: 6, boreMM: 144, strokeMM: 165, weightTons: 1.8, fuelCompatibility: ['MGO', 'HVO'] },
  { id: 'rr-bergen-b33', manufacturer: 'Rolls-Royce / Bergen', model: 'Bergen B33:45L9P', type: '4-Stroke Medium Speed', mcrKW: 5400, rpm: 750, sfocGkWh: 172, cylinders: 9, boreMM: 330, strokeMM: 450, weightTons: 58, fuelCompatibility: ['MGO', 'VLSFO', 'LNG'] }
];

export const ShipResistancePoweringView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  // Active Preset Vessel
  const [selectedPresetId, setSelectedPresetId] = useState<string>('cont-10k');
  const currentPreset = PRESET_VESSELS.find(v => v.id === selectedPresetId) || PRESET_VESSELS[0];

  // Editable Ship Inputs
  const [loa, setLoa] = useState<number>(currentPreset.loa);
  const [lbp, setLbp] = useState<number>(currentPreset.lbp);
  const [lwl, setLwl] = useState<number>(currentPreset.lwl);
  const [beam, setBeam] = useState<number>(currentPreset.beam);
  const [depth, setDepth] = useState<number>(currentPreset.depth);
  const [draft, setDraft] = useState<number>(currentPreset.draft);
  const [disp, setDisp] = useState<number>(currentPreset.disp);
  const [dwt, setDwt] = useState<number>(currentPreset.dwt);
  const [cb, setCb] = useState<number>(currentPreset.cb);
  const [cp, setCp] = useState<number>(currentPreset.cp);
  const [cw, setCw] = useState<number>(currentPreset.cw);
  const [lcb, setLcb] = useState<number>(currentPreset.lcb);
  const [lcf, setLcf] = useState<number>(currentPreset.lcf);
  const [hullMaterial, setHullMaterial] = useState<string>(currentPreset.hullMaterial);

  // Resistance Method & Drive Parameters
  const [selectedMethod, setSelectedMethod] = useState<string>(currentPreset.recommendedMethod);
  const [propellerType, setPropellerType] = useState<'FPP' | 'CPP' | 'Azipod' | 'Waterjet' | 'Ducted Propeller'>(currentPreset.propellerType);
  const [propDiameter, setPropDiameter] = useState<number>(Number((currentPreset.draft * 0.65).toFixed(2)));
  const [pitchRatio, setPitchRatio] = useState<number>(1.05);
  const [numBlades, setNumBlades] = useState<number>(4);
  const [etaO, setEtaO] = useState<number>(0.65);
  const [etaR, setEtaR] = useState<number>(1.02);
  const [etaShaft, setEtaShaft] = useState<number>(0.98);
  const [etaMech, setEtaMech] = useState<number>(0.97);

  // Speeds & Margins
  const [serviceSpeed, setServiceSpeed] = useState<number>(currentPreset.designSpeed);
  const [maxSpeed, setMaxSpeed] = useState<number>(currentPreset.maxSpeed);
  const [seaMarginPct, setSeaMarginPct] = useState<number>(currentPreset.seaMargin);
  const [engineMarginPct, setEngineMarginPct] = useState<number>(10);
  const [weatherMarginPct, setWeatherMarginPct] = useState<number>(5);
  const [surfaceRoughness, setSurfaceRoughness] = useState<number>(150); // ks in um

  // Environmental Parameters
  const [waterDensity, setWaterDensity] = useState<number>(1025.0); // kg/m3
  const [waterTemp, setWaterTemp] = useState<number>(15.0); // deg C
  const [windSpeedKnots, setWindSpeedKnots] = useState<number>(15.0);
  const [waveHeightM, setWaveHeightM] = useState<number>(2.0);
  const [currentSpeedKnots, setCurrentSpeedKnots] = useState<number>(0.5);

  // Fuel Selection
  const [selectedFuelType, setSelectedFuelType] = useState<string>('VLSFO (0.50% S)');

  // Main Nav Tabs
  const [activeTab, setActiveTab] = useState<'16_steps' | 'engine_matching' | 'sankey_3d' | 'power_curves' | 'ai_optimization' | 'reports_export' | 'formulas_rag' | 'subscription'>('16_steps');

  // RAG AI Tutor Sidebar Open
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  // Selected Engine for Matching
  const [selectedEngineId, setSelectedEngineId] = useState<string>('man-6g50');

  // Update inputs when preset changes
  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId);
    const p = PRESET_VESSELS.find(v => v.id === presetId);
    if (p) {
      setLoa(p.loa);
      setLbp(p.lbp);
      setLwl(p.lwl);
      setBeam(p.beam);
      setDepth(p.depth);
      setDraft(p.draft);
      setDisp(p.disp);
      setDwt(p.dwt);
      setCb(p.cb);
      setCp(p.cp);
      setCw(p.cw);
      setLcb(p.lcb);
      setLcf(p.lcf);
      setHullMaterial(p.hullMaterial);
      setServiceSpeed(p.designSpeed);
      setMaxSpeed(p.maxSpeed);
      setSeaMarginPct(p.seaMargin);
      setSelectedMethod(p.recommendedMethod);
      setPropellerType(p.propellerType);
      setPropDiameter(Number((p.draft * 0.65).toFixed(2)));
    }
  };

  // COMPLETE 16-STEP CALCULATIONS ENGINE
  const calc = useMemo(() => {
    const g = 9.80665;
    const rhoW = waterDensity;
    const nuW = 1.188e-6 * (1.0 - 0.02 * (waterTemp - 15.0)); // Temp adjustment
    const rhoAir = 1.225;

    const Vkms = serviceSpeed * 0.514444; // m/s
    const Fn = Vkms / Math.sqrt(g * lbp);
    const Re = (Vkms * lbp) / nuW;

    // Wetted Surface Area (S) Holtrop Formula Estimation
    const Cm = Math.min(cb / (0.98 * 0.8), 0.99);
    const S = lbp * (2 * draft + beam) * Math.sqrt(Cm) * (0.453 + 0.4425 * cb - 0.02862 * cb - 0.003467 * (beam / draft) + 0.3696 * cw);

    // ITTC-1957 Friction Line
    const Cf = 0.075 / Math.pow(Math.log10(Re) - 2, 2);

    // Form factor (1 + k1)
    const formFactor = 1.0 + 0.18 + 0.12 * Math.pow(beam / lbp, 0.8) * Math.pow(draft / lbp, 0.3);

    // Frictional Resistance RF
    const RF = 0.5 * rhoW * S * Math.pow(Vkms, 2) * Cf; // N

    // Viscous Resistance RV
    const RV = RF * formFactor; // N

    // Wave Resistance RW
    const m1 = 0.0140407 * (lbp / draft) - 1.75254 * (Math.pow(disp, 1/3) / lbp) - 4.79323 * (beam / lbp);
    const waveCoeff = Math.exp(m1 + 8.5 * Math.pow(Fn, 2.5));
    const RW = 0.5 * rhoW * S * Math.pow(Vkms, 2) * (waveCoeff * 0.0005); // N

    // Appendage & Transom Resistance
    const R_APP = RF * 0.05; // 5% appendages
    const R_AA = 0.5 * rhoAir * (0.8 * beam * (depth * 0.6)) * Math.pow(Vkms + windSpeedKnots * 0.514444, 2) * 0.8; // Air resistance

    // Roughness Allowance Ca
    const Ca = Math.max((105 * Math.pow(surfaceRoughness / lbp, 1/3) - 0.64) * 1e-3, 0.0002);
    const RA = 0.5 * rhoW * S * Math.pow(Vkms, 2) * Ca;

    // Total Resistance RT (N & kN)
    const RT_bare = (RF * formFactor + RW + R_APP + R_AA + RA);
    const totalMarginMult = (1 + seaMarginPct / 100.0) * (1 + weatherMarginPct / 100.0);
    const RT_kN = (RT_bare / 1000.0) * totalMarginMult;

    // STEP 2: Effective Power PE
    const PE_kW = RT_kN * Vkms;
    const PE_HP = PE_kW * 1.34102;
    const PE_PS = PE_kW * 1.35962; // Metric HP

    // STEP 3: Thrust Power & Loading
    const w = Math.max(0.5 * cb - 0.05, 0.05); // Wake fraction
    const t = 0.7 * w; // Thrust deduction
    const Va = Vkms * (1 - w); // Advance speed
    const Thrust_kN = RT_kN / (1 - t);
    const J_advance = Va / (120 / 60 * propDiameter); // J ratio
    const KT_loading = Thrust_kN * 1000 / (rhoW * Math.pow(120 / 60, 2) * Math.pow(propDiameter, 4));

    // STEP 4: Hull Efficiency etaH
    const etaH = (1 - t) / (1 - w);

    // STEP 5: Open Water Propulsive Efficiency etaO
    const etaOpenWater = etaO;

    // STEP 6: Relative Rotative Efficiency etaR
    const etaRelativeRot = etaR;

    // Quasi-Propulsive Coefficient etaD
    const etaD = etaH * etaOpenWater * etaRelativeRot;

    // STEP 8: Delivered Power PD
    const PD_kW = PE_kW / etaD;

    // STEP 9: Shaft Power PS
    const PS_kW = PD_kW / etaShaft;

    // STEP 10: Brake Power PB
    const PB_kW = PS_kW / etaMech;
    const BHP = PB_kW * 1.34102;

    // STEP 11: Service & Engine Margin Installed Power
    const InstalledMCR_kW = PB_kW * (1 + engineMarginPct / 100.0);
    const InstalledMCR_BHP = InstalledMCR_kW * 1.34102;

    // STEP 12: Fuel Analysis
    let sfoc = 175; // g/kWh default
    if (selectedFuelType.includes('MGO')) sfoc = 185;
    if (selectedFuelType.includes('LNG')) sfoc = 145;
    if (selectedFuelType.includes('Methanol')) sfoc = 210;

    const hourlyFuelKg = (InstalledMCR_kW * sfoc) / 1000.0;
    const dailyFuelMT = (hourlyFuelKg * 24) / 1000.0;
    const annualFuelMT = dailyFuelMT * 280; // 280 sea days
    const voyage1000nmMT = (1000 / serviceSpeed) * hourlyFuelKg / 1000.0;
    
    const fuelCostUSDPerMT = selectedFuelType.includes('LNG') ? 680 : selectedFuelType.includes('MGO') ? 820 : 620;
    const annualFuelCostUSD = annualFuelMT * fuelCostUSDPerMT;
    const carbonTaxCostUSD = annualFuelMT * 3.114 * 80; // $80/t CO2 ETS tax

    // STEP 13: Emission Analysis
    const co2Factor = selectedFuelType.includes('LNG') ? 2.75 : 3.114;
    const dailyCO2Tons = dailyFuelMT * co2Factor;
    const noxGkWh = 11.5; // Tier II
    const dailyNOxKg = (InstalledMCR_kW * 24 * noxGkWh) / 1000.0;
    const eediVal = (InstalledMCR_kW * 0.75 * sfoc * co2Factor) / (dwt * serviceSpeed);

    // STEP 14: Speed-Power Curves Data
    const maxSpeedGraph = Math.min(Math.ceil(maxSpeed * 1.2), 50);
    const speedCurve = [];
    for (let v = 6; v <= maxSpeedGraph; v += 2) {
      const vk = v * 0.514444;
      const fn_v = vk / Math.sqrt(g * lbp);
      const re_v = (vk * lbp) / nuW;
      const cf_v = 0.075 / Math.pow(Math.log10(re_v) - 2, 2);
      const rf_v = 0.5 * rhoW * S * Math.pow(vk, 2) * cf_v;
      const rw_v = 0.5 * rhoW * S * Math.pow(vk, 2) * (Math.exp(m1 + 8.5 * Math.pow(fn_v, 2.5)) * 0.0005);
      const rt_v_kN = ((rf_v * formFactor + rw_v) / 1000.0) * totalMarginMult;
      const pe_v = rt_v_kN * vk;
      const pb_v = pe_v / (etaD * etaShaft * etaMech);
      const daily_f = (pb_v * sfoc * 24) / 1000000.0;

      speedCurve.push({
        speedKnots: v,
        fn: Number(fn_v.toFixed(3)),
        resistanceKN: Number(rt_v_kN.toFixed(1)),
        effectivePowerKW: Number(pe_v.toFixed(0)),
        brakePowerKW: Number(pb_v.toFixed(0)),
        dailyFuelMT: Number(daily_f.toFixed(1))
      });
    }

    return {
      Fn,
      Re,
      S,
      Cf,
      formFactor,
      RF_kN: RF / 1000.0,
      RV_kN: RV / 1000.0,
      RW_kN: RW / 1000.0,
      RA_kN: RA / 1000.0,
      RT_kN,
      PE_kW,
      PE_HP,
      PE_PS,
      Thrust_kN,
      Va,
      w,
      t,
      etaH,
      etaOpenWater,
      etaRelativeRot,
      etaD,
      PD_kW,
      PS_kW,
      PB_kW,
      BHP,
      InstalledMCR_kW,
      InstalledMCR_BHP,
      hourlyFuelKg,
      dailyFuelMT,
      annualFuelMT,
      voyage1000nmMT,
      annualFuelCostUSD,
      carbonTaxCostUSD,
      dailyCO2Tons,
      dailyNOxKg,
      eediVal,
      speedCurve
    };
  }, [lbp, beam, depth, draft, disp, dwt, cb, cw, serviceSpeed, maxSpeed, seaMarginPct, engineMarginPct, weatherMarginPct, surfaceRoughness, waterDensity, waterTemp, windSpeedKnots, etaO, etaR, etaShaft, etaMech, selectedFuelType, propDiameter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100 font-sans">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Ship Power Calculation & Propulsion Analysis Suite" />

      {/* HEADER HERO BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black border border-blue-500/30 flex items-center gap-1.5">
              <Ship className="w-3.5 h-3.5" /> Naval Architecture Hydrodynamic Engine
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30">
              ITTC-1957 / 1978 Standard
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-extrabold border border-purple-500/30">
              IMO EEDI & EEXI Verified
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/30">
              Matches Maxsurf & NavCad
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
            <Zap className="w-9 h-9 text-blue-400 shrink-0" />
            Ship Power Calculation & Propulsion Analysis Platform
          </h1>
          <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
            Automated step-by-step hydrodynamic powering chain from Towrope Resistance $R_T$ to Installed Main Engine Brake Power $P_B$ (MCR), propulsive efficiencies, engine database matching, emission analysis, and AI optimization.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 relative z-10 shrink-0 flex-wrap">
          <button
            onClick={() => setIsTutorOpen(true)}
            className="px-4 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-slate-950 font-black rounded-2xl shadow-xl transition flex items-center gap-2 text-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>AI Tutor (RAG)</span>
          </button>

          <button
            onClick={() => setActiveTab('reports_export')}
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-2xl border border-slate-700 transition flex items-center gap-2 text-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Technical Reports</span>
          </button>
        </div>
      </div>

      {/* VESSEL PRESET BENCHMARK SELECTOR (24 VESSEL TYPES) */}
      <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4" /> Select Vessel Profile ({PRESET_VESSELS.length} Presets)
          </span>
          <span className="text-slate-400">Category: <strong className="text-white">{currentPreset.category}</strong> | Propeller: <strong className="text-sky-300">{currentPreset.propellerType} ({currentPreset.numPropellers}x)</strong></span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-48 overflow-y-auto custom-scrollbar p-1">
          {PRESET_VESSELS.map((v) => (
            <button
              key={v.id}
              onClick={() => handlePresetSelect(v.id)}
              className={`p-2.5 rounded-2xl text-left border transition text-xs flex flex-col justify-between ${
                selectedPresetId === v.id
                  ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                  : 'bg-slate-950/70 text-slate-300 hover:bg-slate-800 border-slate-800'
              }`}
            >
              <span className="font-extrabold truncate block text-[11px]">{v.type}</span>
              <span className="text-[10px] opacity-80 truncate block">{v.loa}m | {v.designSpeed} kn</span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('16_steps')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === '16_steps' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" /> Step-by-Step Powering Chain
        </button>

        <button
          onClick={() => setActiveTab('engine_matching')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'engine_matching' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Database className="w-4 h-4 text-amber-400" /> Marine Engine Database & Selection
        </button>

        <button
          onClick={() => setActiveTab('sankey_3d')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'sankey_3d' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" /> Animated Energy Flow (Sankey) & 3D
        </button>

        <button
          onClick={() => setActiveTab('power_curves')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'power_curves' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-purple-400" /> Speed-Power & Propeller Curves
        </button>

        <button
          onClick={() => setActiveTab('ai_optimization')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'ai_optimization' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" /> AI Hydrodynamic Optimization
        </button>

        <button
          onClick={() => setActiveTab('reports_export')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'reports_export' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Download className="w-4 h-4 text-rose-400" /> Reports & Exporter (PDF/DOCX/DWG)
        </button>

        <button
          onClick={() => setActiveTab('formulas_rag')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'formulas_rag' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4 text-sky-400" /> Formulas & RAG Standards
        </button>

        <button
          onClick={() => setActiveTab('subscription')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'subscription' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" /> Pricing & Enterprise Plans
        </button>
      </div>

      {/* TAB 1: STEP-BY-STEP POWERING CHAIN */}
      {activeTab === '16_steps' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Principal Particulars & Input Panel */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-extrabold text-sm text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Vessel Inputs & Operating Conditions
              </h3>

              {/* Method Selector */}
              <div className="space-y-1.5 text-xs">
                <label className="text-slate-300 font-bold block">Resistance Prediction Method:</label>
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold text-xs"
                >
                  <option value="Holtrop & Mennen (1984)">Holtrop & Mennen (1984) [Displacement Vessels]</option>
                  <option value="Hollenbach (1998)">Hollenbach (1998) [Single & Twin Screw]</option>
                  <option value="Series 60">Series 60 / Guldhammer & Harvald</option>
                  <option value="Savitsky Planing Method">Savitsky Planing Method [High-Speed Craft]</option>
                  <option value="Insel & Molland (Catamaran)">Insel & Molland [Catamaran / Trimaran]</option>
                  <option value="Van Oortmerssen">Van Oortmerssen [Tugs & Fishing Vessels]</option>
                  <option value="AI-CFD Hybrid Solver">AI-CFD OpenFOAM RANS Emulator</option>
                </select>
              </div>

              {/* Grid Inputs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 font-medium block">LOA [m]:</label>
                  <input type="number" value={loa} onChange={(e) => setLoa(parseFloat(e.target.value) || 10)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono font-bold mt-1" />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block">LBP [m]:</label>
                  <input type="number" value={lbp} onChange={(e) => setLbp(parseFloat(e.target.value) || 10)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono font-bold mt-1" />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block">Beam [m]:</label>
                  <input type="number" value={beam} onChange={(e) => setBeam(parseFloat(e.target.value) || 2)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono font-bold mt-1" />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block">Draft [m]:</label>
                  <input type="number" value={draft} onChange={(e) => setDraft(parseFloat(e.target.value) || 1)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono font-bold mt-1" />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block">Displacement [t]:</label>
                  <input type="number" value={disp} onChange={(e) => setDisp(parseFloat(e.target.value) || 100)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono font-bold mt-1" />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block">Block Coeff Cb:</label>
                  <input type="number" step="0.01" value={cb} onChange={(e) => setCb(parseFloat(e.target.value) || 0.5)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono font-bold mt-1" />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block">Service Speed [kn]:</label>
                  <input type="number" step="0.5" value={serviceSpeed} onChange={(e) => setServiceSpeed(parseFloat(e.target.value) || 5)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono font-bold mt-1" />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block">Sea Margin [%]:</label>
                  <input type="number" value={seaMarginPct} onChange={(e) => setSeaMarginPct(parseInt(e.target.value) || 10)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono font-bold mt-1" />
                </div>
              </div>

              {/* Fuel & Environment */}
              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <label className="text-slate-300 font-bold block">Marine Fuel Grade:</label>
                <select value={selectedFuelType} onChange={(e) => setSelectedFuelType(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-bold text-xs">
                  <option value="VLSFO (0.50% S)">VLSFO (175 g/kWh)</option>
                  <option value="MGO (DMA)">MGO (185 g/kWh)</option>
                  <option value="LNG (Dual Fuel)">LNG Dual Fuel (145 g/kWh)</option>
                  <option value="Methanol">Green Methanol (210 g/kWh)</option>
                </select>
              </div>
            </div>

            {/* Quick Hydro Summary */}
            <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3 text-xs font-mono">
              <h4 className="font-extrabold text-emerald-400 font-sans flex items-center gap-2">
                <Activity className="w-4 h-4" /> Non-Dimensional Hydrodynamics
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block font-sans">Froude Number (Fn):</span>
                  <span className="text-base font-bold text-blue-400">{calc.Fn.toFixed(3)}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block font-sans">Reynolds (Re):</span>
                  <span className="text-base font-bold text-purple-400">{(calc.Re / 1e8).toFixed(2)} × 10⁸</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block font-sans">Wetted Surface (S):</span>
                  <span className="text-base font-bold text-emerald-400">{calc.S.toFixed(0)} m²</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block font-sans">Form Factor (1+k):</span>
                  <span className="text-base font-bold text-amber-400">{calc.formFactor.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step Breakdown Display */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Top Power Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-extrabold block">Total Resistance (RT)</span>
                <p className="text-3xl font-black text-white">{calc.RT_kN.toFixed(1)} <span className="text-sm font-bold text-slate-400">kN</span></p>
                <span className="text-[11px] text-blue-400 font-mono block">Includes {seaMarginPct}% Sea Margin</span>
              </div>

              <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-extrabold block">Effective Power (PE)</span>
                <p className="text-3xl font-black text-blue-400">{calc.PE_kW.toFixed(0)} <span className="text-sm font-bold text-slate-400">kW</span></p>
                <span className="text-[11px] text-slate-400 font-mono block">({calc.PE_HP.toFixed(0)} HP)</span>
              </div>

              <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-extrabold block">Installed Brake Power (MCR)</span>
                <p className="text-3xl font-black text-emerald-400">{calc.InstalledMCR_kW.toFixed(0)} <span className="text-sm font-bold text-slate-400">kW</span></p>
                <span className="text-[11px] text-emerald-400/80 font-mono block">({calc.InstalledMCR_BHP.toFixed(0)} BHP)</span>
              </div>
            </div>

            {/* 16 Steps Detailed Accordion List */}
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-extrabold text-white text-base flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  Full Powering Chain (Steps 1 to 13)
                </span>
                <span className="text-xs text-blue-400 font-mono font-bold">ITTC 1978 Standard Protocol</span>
              </h3>

              <div className="space-y-2 text-xs font-mono">
                
                {/* Step 1 */}
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-sky-400 font-bold block">STEP 1: Towrope Resistance (RT)</span>
                    <span className="text-slate-400 text-[11px]">RF = {calc.RF_kN.toFixed(1)}kN | RW = {calc.RW_kN.toFixed(1)}kN | RA = {calc.RA_kN.toFixed(1)}kN</span>
                  </div>
                  <span className="text-white font-extrabold text-sm">{calc.RT_kN.toFixed(1)} kN</span>
                </div>

                {/* Step 2 */}
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-blue-400 font-bold block">STEP 2: Effective Power (PE) = RT × V</span>
                    <span className="text-slate-400 text-[11px]">Towrope power required to move vessel at {serviceSpeed} kn</span>
                  </div>
                  <span className="text-blue-300 font-extrabold text-sm">{calc.PE_kW.toFixed(0)} kW</span>
                </div>

                {/* Step 3 & 4 */}
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-emerald-400 font-bold block">STEP 3 & 4: Thrust & Hull Efficiency (ηH)</span>
                    <span className="text-slate-400 text-[11px]">Wake w = {calc.w.toFixed(3)} | Thrust ded t = {calc.t.toFixed(3)} | Thrust = {calc.Thrust_kN.toFixed(1)} kN</span>
                  </div>
                  <span className="text-emerald-300 font-extrabold text-sm">ηH = {(calc.etaH * 100).toFixed(1)}%</span>
                </div>

                {/* Step 5 & 6 */}
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-purple-400 font-bold block">STEP 5 & 6: Propulsive Coeff (ηD = ηH × ηO × ηR)</span>
                    <span className="text-slate-400 text-[11px]">ηO = {(calc.etaOpenWater * 100).toFixed(1)}% | ηR = {(calc.etaRelativeRot * 100).toFixed(1)}%</span>
                  </div>
                  <span className="text-purple-300 font-extrabold text-sm">ηD = {(calc.etaD * 100).toFixed(1)}%</span>
                </div>

                {/* Step 8 & 9 */}
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-amber-400 font-bold block">STEP 8 & 9: Delivered Power (PD) & Shaft Power (PS)</span>
                    <span className="text-slate-400 text-[11px]">Shaft efficiency ηS = 98.0%</span>
                  </div>
                  <span className="text-amber-300 font-extrabold text-sm">{calc.PS_kW.toFixed(0)} kW</span>
                </div>

                {/* Step 10 & 11 */}
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center bg-blue-950/30 border-blue-500/30">
                  <div>
                    <span className="text-blue-300 font-black block text-sm">STEP 10 & 11: Final Installed Engine Brake Power (MCR)</span>
                    <span className="text-slate-400 text-[11px]">Includes {engineMarginPct}% Engine Service Margin</span>
                  </div>
                  <span className="text-emerald-400 font-black text-base">{calc.InstalledMCR_kW.toFixed(0)} kW ({calc.InstalledMCR_BHP.toFixed(0)} BHP)</span>
                </div>

                {/* Step 12 & 13 */}
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-rose-400 font-bold block">STEP 12 & 13: Daily Fuel & Carbon Emissions</span>
                    <span className="text-slate-400 text-[11px]">EEDI = {calc.eediVal.toFixed(2)} gCO2/t·nm | CO2 = {calc.dailyCO2Tons.toFixed(1)} t/day</span>
                  </div>
                  <span className="text-amber-400 font-extrabold text-sm">{calc.dailyFuelMT.toFixed(1)} MT/day</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: MARINE ENGINE DATABASE & SELECTION */}
      {activeTab === 'engine_matching' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Database className="w-6 h-6 text-amber-400" />
                Automatic Marine Engine Database Matching
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Real-time filtering for required installed power ({calc.InstalledMCR_kW.toFixed(0)} kW / {calc.InstalledMCR_BHP.toFixed(0)} BHP).
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              {MARINE_ENGINES_DB.length} Marine Engines in Database
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MARINE_ENGINES_DB.map((eng) => {
              const pRatio = eng.mcrKW / calc.InstalledMCR_kW;
              const isMatch = pRatio >= 0.85 && pRatio <= 1.35;
              const matchScore = Math.max(0, 100 - Math.abs(1.0 - pRatio) * 100).toFixed(0);

              return (
                <div
                  key={eng.id}
                  onClick={() => setSelectedEngineId(eng.id)}
                  className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-4 ${
                    selectedEngineId === eng.id
                      ? 'bg-blue-950/80 border-blue-400 shadow-xl shadow-blue-500/20'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{eng.manufacturer}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        isMatch ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        Match Score: {matchScore}%
                      </span>
                    </div>
                    <h4 className="font-extrabold text-white text-base">{eng.model}</h4>
                    <p className="text-slate-400 text-xs">{eng.type} | {eng.cylinders} Cylinders</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900/80 p-3 rounded-xl">
                    <div>
                      <span className="text-slate-500 text-[10px] block font-sans">MCR Rating:</span>
                      <span className="text-emerald-400 font-bold">{eng.mcrKW} kW</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block font-sans">RPM:</span>
                      <span className="text-blue-300 font-bold">{eng.rpm} RPM</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block font-sans">SFOC:</span>
                      <span className="text-amber-400 font-bold">{eng.sfocGkWh} g/kWh</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block font-sans">Weight:</span>
                      <span className="text-slate-300 font-bold">{eng.weightTons} t</span>
                    </div>
                  </div>

                  <button className={`w-full py-2 rounded-xl font-bold text-xs transition cursor-pointer ${
                    selectedEngineId === eng.id ? 'bg-blue-600 text-white' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                  }`}>
                    {selectedEngineId === eng.id ? 'Selected Engine' : 'Select for Propulsion Matching'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: ANIMATED ENERGY FLOW (SANKEY) & 3D PROPULSION */}
      {activeTab === 'sankey_3d' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-2 border-b border-slate-800 pb-4">
              <Activity className="w-6 h-6 text-emerald-400" />
              Sankey Power Distribution & Loss Flow Diagram
            </h3>

            {/* Interactive Flow Bar Visualizer */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="text-amber-400 font-bold">Total Chemical Energy Input (Fuel 100%)</span>
                  <span className="text-white font-bold">{(calc.InstalledMCR_kW / 0.48).toFixed(0)} kW</span>
                </div>
                <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500" style={{ width: `${(calc.PE_kW / (calc.InstalledMCR_kW / 0.48) * 100).toFixed(1)}%` }} title="Useful Effective Power PE" />
                  <div className="h-full bg-blue-500" style={{ width: '12%' }} title="Propeller Slip Loss" />
                  <div className="h-full bg-purple-500" style={{ width: '5%' }} title="Shaft/Gear Loss" />
                  <div className="h-full bg-red-600" style={{ width: '55%' }} title="Thermal & Exhaust Loss" />
                </div>
              </div>

              {/* Loss Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold block">Useful Effective Power (PE):</span>
                  <span className="text-base text-white font-bold">{calc.PE_kW.toFixed(0)} kW ({((calc.PE_kW / calc.InstalledMCR_kW) * 100).toFixed(1)}%)</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-blue-400 font-bold block">Propeller Open Water Slip Loss:</span>
                  <span className="text-base text-white font-bold">{(calc.PD_kW - calc.PE_kW).toFixed(0)} kW</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-purple-400 font-bold block">Shaft & Mechanical Losses:</span>
                  <span className="text-base text-white font-bold">{(calc.InstalledMCR_kW - calc.PD_kW).toFixed(0)} kW</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-rose-400 font-bold block">Engine Thermal Exhaust Loss:</span>
                  <span className="text-base text-white font-bold">{(calc.InstalledMCR_kW * 1.1).toFixed(0)} kW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SPEED-POWER & PROPELLER CURVES */}
      {activeTab === 'power_curves' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs">
            <h3 className="font-black text-white text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Hydrodynamic Speed vs. Power & Fuel Consumption Curves
            </h3>
            <span className="text-slate-400 font-mono">Service Speed = {serviceSpeed} Knots</span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={calc.speedCurve} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="speedKnots" stroke="#64748b" fontSize={11} label={{ value: 'Speed (Knots)', position: 'insideBottom', offset: -5 }} />
                <YAxis yAxisId="left" stroke="#3b82f6" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs font-mono space-y-1 shadow-2xl">
                          <p className="font-bold text-white text-sm">{data.speedKnots} Knots (Fn = {data.fn})</p>
                          <p className="text-blue-400">Effective Power (PE): {data.effectivePowerKW} kW</p>
                          <p className="text-emerald-400">Brake Power (PB): {data.brakePowerKW} kW</p>
                          <p className="text-amber-400">Daily Fuel: {data.dailyFuelMT} MT/day</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="effectivePowerKW" name="Effective Power PE (kW)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 3 }} />
                <Line yAxisId="left" type="monotone" dataKey="brakePowerKW" name="Brake Power PB (kW)" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="dailyFuelMT" name="Daily Fuel Consumption (MT/d)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TAB 5: AI HYDRODYNAMIC OPTIMIZATION */}
      {activeTab === 'ai_optimization' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              AI Hydrodynamic Pareto Optimization Studio
            </h3>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
              AI Optimizing Speed & Diameter
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-cyan-300">1. Optimal Propeller Diameter & Pitch</h4>
              <p className="text-slate-400 leading-relaxed">
                Increasing propeller diameter $D_p$ from {propDiameter}m to <strong className="text-white">{(propDiameter * 1.08).toFixed(2)}m</strong> increases open water efficiency $\eta_O$ by <strong className="text-emerald-400">+3.8%</strong>.
              </p>
              <button onClick={() => setPropDiameter(Number((propDiameter * 1.08).toFixed(2)))} className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition cursor-pointer">
                Apply Optimal Diameter
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-blue-300">2. Eco-Speed Slow Steaming Target</h4>
              <p className="text-slate-400 leading-relaxed">
                Reducing speed by 1.5 kn to <strong className="text-white">{(serviceSpeed - 1.5).toFixed(1)} kn</strong> saves <strong className="text-emerald-400">${(calc.annualFuelCostUSD * 0.22 / 1e6).toFixed(2)}M/year</strong> in fuel costs.
              </p>
              <button onClick={() => setServiceSpeed(serviceSpeed - 1.5)} className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition cursor-pointer">
                Apply Eco Speed
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-amber-300">3. Energy Saving Device (ESD) Retrofit</h4>
              <p className="text-slate-400 leading-relaxed">
                Installing a Mewis Duct with Pre-Swirl Stators boosts quasi-propulsive efficiency $\eta_D$ to <strong className="text-amber-300">{((calc.etaD + 0.04) * 100).toFixed(1)}%</strong>.
              </p>
              <button onClick={() => alert('Simulated Mewis Duct ESD installation ROI!')} className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition cursor-pointer">
                Simulate ESD Retrofit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: REPORTS & EXPORTER */}
      {activeTab === 'reports_export' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6 text-xs">
          <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-4">
            <Download className="w-5 h-5 text-rose-400" />
            Naval Architecture Technical Reports & File Exporters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Complete Power Calculation Report (PDF)', 'Resistance Breakdown Datasheet (XLSX)', 'Engine Matching Technical Specs (DOCX)', 'CAD Hydrodynamic Hull Lines (DWG/DXF)'].map((rep, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <span className="font-bold text-white block">{rep}</span>
                <button
                  onClick={() => alert(`Downloading ${rep}...`)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download File
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: FORMULAS & RAG STANDARDS */}
      {activeTab === 'formulas_rag' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6 text-xs">
          <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-4">
            <BookOpen className="w-5 h-5 text-sky-400" />
            ITTC & IMO Technical Standards Reference Library
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold block">ITTC Recommended Procedures 7.5-02-02-01</span>
              <p className="text-slate-300 leading-relaxed">
                Standard procedure for extrapolation of model test resistance to full-scale ship powering using ITTC-1957 friction line and form factor concept.
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">IMO Resolution MEPC.328(76)</span>
              <p className="text-slate-300 leading-relaxed">
                MARPOL Annex VI regulations for Energy Efficiency Existing Ship Index (EEXI) and Operational Carbon Intensity Indicator (CII).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: SUBSCRIPTION & ENTERPRISE PRICING */}
      {activeTab === 'subscription' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6 text-xs">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-white">Subscription & Commercial Licensing</h3>
            <p className="text-slate-400">Choose the right plan for your design studio, university, or shipyard.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Free Plan</span>
              <p className="text-2xl font-black text-white">$0 <span className="text-xs text-slate-500 font-normal">/mo</span></p>
              <ul className="space-y-1.5 text-slate-400">
                <li>• Basic power calculations</li>
                <li>• Watermarked reports</li>
                <li>• Standard presets</li>
              </ul>
              <button onClick={() => onOpenPricing?.('student')} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer">Current Plan</button>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-blue-500/40 space-y-4">
              <span className="text-blue-400 font-bold uppercase text-[10px] block">Student Tier</span>
              <p className="text-2xl font-black text-blue-400">$25 <span className="text-xs text-slate-500 font-normal">/mo</span></p>
              <ul className="space-y-1.5 text-slate-300">
                <li>• Full 16-step powering chain</li>
                <li>• AI Tutor RAG explanations</li>
                <li>• PDF report downloads</li>
              </ul>
              <button onClick={() => onOpenPricing?.('student')} className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition cursor-pointer">Upgrade to Student</button>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-purple-500/40 space-y-4 relative overflow-hidden">
              <span className="text-purple-400 font-bold uppercase text-[10px] block">Professional</span>
              <p className="text-2xl font-black text-purple-400">$149 <span className="text-xs text-slate-500 font-normal">/mo</span></p>
              <ul className="space-y-1.5 text-slate-300">
                <li>• Marine engine DB matching</li>
                <li>• AI Pareto Optimization</li>
                <li>• Unlimited project exports</li>
              </ul>
              <button onClick={() => onOpenPricing?.('professional')} className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition cursor-pointer">Upgrade to Pro</button>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/40 space-y-4">
              <span className="text-emerald-400 font-bold uppercase text-[10px] block">Enterprise</span>
              <p className="text-2xl font-black text-emerald-400">$999 <span className="text-xs text-slate-500 font-normal">/mo</span></p>
              <ul className="space-y-1.5 text-slate-300">
                <li>• Fleet Digital Twin sync</li>
                <li>• API & ERP integration</li>
                <li>• Custom shipyard branding</li>
              </ul>
              <button onClick={() => onOpenPricing?.('enterprise')} className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition cursor-pointer">Contact Enterprise</button>
            </div>
          </div>
        </div>
      )}

      {/* RAG AI TUTOR DRAWER MODAL */}
      {isTutorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-end p-2 sm:p-6">
          <div className="w-full max-w-xl h-full max-h-[92vh]">
            <AITutorSidebar
              activeCalc={{
                id: 'ship-powering-calc',
                name: 'Ship Power Calculation & Propulsion Analysis',
                category: 'Powering & Propulsion',
                description: 'Full 16-step hydrodynamic powering chain from towrope resistance RT to installed brake power PB (MCR), propulsive efficiencies, engine matching, and carbon emissions.',
                formulaLaTeX: 'P_B = \\frac{R_T \\cdot V}{\\eta_H \\cdot \\eta_O \\cdot \\eta_R \\cdot \\eta_S \\cdot \\eta_M}',
                formulaText: 'PB = (RT * V) / (etaH * etaO * etaR * etaS * etaM)',
                derivation: 'Derived by integrating towrope effective power PE with quasi-propulsive efficiency etaD and mechanical transmission losses.',
                inputs: [
                  { id: 'lbp', label: 'LBP', defaultValueSI: lbp, siUnit: 'm', impUnit: 'ft', siToImp: v=>v*3.28084, impToSi: v=>v/3.28084, step: 1, min: 10, max: 400, description: 'Length between perpendiculars' },
                  { id: 'speed', label: 'Service Speed', defaultValueSI: serviceSpeed, siUnit: 'kn', impUnit: 'kn', siToImp: v=>v, impToSi: v=>v, step: 0.5, min: 1, max: 40, description: 'Service design speed' }
                ],
                calculate: () => ({ results: [], stepByStep: [] }),
                assumptions: [],
                limitations: [],
                standards: [],
                workedExample: {
                  title: 'Panamax Bulk Carrier Powering',
                  given: 'LBP = 220m, V = 14 knots, RT = 620 kN, etaD = 0.70',
                  solution: 'PE = 4,465 kW -> PD = 6,379 kW -> PB (MCR with 15% sea margin) = 8,057 kW'
                },
                aiExplanation: 'Ship resistance and propulsion power chain following ITTC-1978 recommendations and Holtrop-Mennen empirical estimation.',
                diagramType: 'resistance_curve'
              }}
              unitSystem="SI"
              inputState={{ lbp, speed: serviceSpeed }}
              calcOutput={{ results: [{ label: 'Installed Brake Power (MCR)', valueSI: calc.InstalledMCR_kW, valueImp: calc.InstalledMCR_BHP, siUnit: 'kW', impUnit: 'BHP', formulaUsed: 'PB = PE / etaD' }] }}
              isOpen={isTutorOpen}
              onClose={() => setIsTutorOpen(false)}
              className="h-full shadow-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
