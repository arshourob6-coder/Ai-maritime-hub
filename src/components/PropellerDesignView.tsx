import React, { useState, useMemo } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import {
  ShipParticulars,
  PropellerType,
  ClassificationSociety,
  PropellerDatabaseEntry,
} from '../types/propeller';
import {
  DEFAULT_SHIP_PARTICULARS,
  PROPELLER_MATERIALS,
  generateWageningenCurves,
  runPropellerDesignSteps,
  generateBladeOffsetTable,
} from '../utils/propellerMath';
import { Propeller3DCanvas } from './propeller/Propeller3DCanvas';
import { PropellerDrawing2D } from './propeller/PropellerDrawing2D';
import { BladePerformanceAnalysis } from './propeller/BladePerformanceAnalysis';
import { PropellerCalculationsLatex } from './propeller/PropellerCalculationsLatex';
import { PropellerOffsetTable } from './propeller/PropellerOffsetTable';
import { PropellerVoiceAssistant } from './propeller/PropellerVoiceAssistant';
import { PropellerDatabaseModal } from './propeller/PropellerDatabaseModal';

import {
  Disc,
  Sliders,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Database,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  RotateCw,
  Box,
  Flame,
  Globe,
  DollarSign,
  Compass,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PropellerDesignViewProps {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const PropellerDesignView: React.FC<PropellerDesignViewProps> = ({
  userPlan = 'student',
  onOpenPricing,
}) => {
  // Primary State
  const [ship, setShip] = useState<ShipParticulars>(DEFAULT_SHIP_PARTICULARS);
  const [numBlades, setNumBlades] = useState<number>(4);
  const [propellerType, setPropellerType] = useState<PropellerType>('Wageningen_B');
  const [pitchRatioOverride, setPitchRatioOverride] = useState<number | undefined>(undefined);
  const [earOverride, setEarOverride] = useState<number | undefined>(undefined);
  const [diameterOverride, setDiameterOverride] = useState<number | undefined>(undefined);

  // Active View Tab
  const [activeTab, setActiveTab] = useState<
    | '3d_cad'
    | '2d_drawings'
    | 'blade_performance'
    | 'openwater_curves'
    | 'cavitation'
    | 'offsets_cnc'
    | 'formulas_latex'
    | 'materials_strength'
    | 'ai_assistant'
    | 'pricing_tiers'
  >('3d_cad');

  // Modals
  const [showDbModal, setShowDbModal] = useState(false);
  const [showShipInputs, setShowShipInputs] = useState(false);

  // Run Step-by-Step Propeller Calculation Engine
  const designResults = useMemo(() => {
    return runPropellerDesignSteps(ship, {
      numBlades,
      propellerType,
      pitchRatioOverride,
      earOverride,
      diameterOverride,
    });
  }, [ship, numBlades, propellerType, pitchRatioOverride, earOverride, diameterOverride]);

  // Generate Wageningen Open Water Curves
  const openWaterCurves = useMemo(() => {
    return generateWageningenCurves(
      designResults.optimumPitchRatio,
      designResults.optimumEAR,
      numBlades
    );
  }, [designResults.optimumPitchRatio, designResults.optimumEAR, numBlades]);

  // Generate Blade CNC Offset Table
  const offsetRows = useMemo(() => {
    return generateBladeOffsetTable(designResults.optimumDiameterM, designResults.radialGeometry);
  }, [designResults.optimumDiameterM, designResults.radialGeometry]);

  const activeMaterial =
    PROPELLER_MATERIALS.find((m) => m.id === ship.bladeMaterial) || PROPELLER_MATERIALS[0];

  // Preset Selection Handler
  const handleSelectPreset = (preset: PropellerDatabaseEntry) => {
    setNumBlades(preset.numBlades);
    setPropellerType(preset.type);
    setPitchRatioOverride(preset.pitchRatio);
    setEarOverride(preset.expandedAreaRatio);
    setDiameterOverride(preset.diameterM);
  };

  // Download Comprehensive Engineering Report
  const handleDownloadReport = () => {
    const reportText = `
====================================================================
PROPEL DESIGN - WORLD CLASS PROPULSION ENGINEERING REPORT
====================================================================
Generated At: ${new Date().toISOString()}
Vessel Operating Area: ${ship.operatingArea}
Classification Society: ${ship.classificationSociety}

1. SHIP PARTICULAR INPUTS
--------------------------------------------------------------------
LOA: ${ship.loa} m | Draft: ${ship.draft} m | Displacement: ${ship.displacement} t
Service Speed: ${ship.serviceSpeedKnots} knots | Resistance: ${ship.totalResistanceKn} kN
Delivered Power: ${ship.deliveredPowerKw} kW | Shaft RPM: ${ship.shaftRpm} RPM

2. OPTIMIZED PROPELLER GEOMETRY
--------------------------------------------------------------------
Propeller Type: ${propellerType}
Optimum Diameter (D): ${designResults.optimumDiameterM} m
Number of Blades (Z): ${numBlades}
Pitch-to-Diameter Ratio (P/D): ${designResults.optimumPitchRatio}
Expanded Area Ratio (EAR): ${designResults.optimumEAR}
Hub Ratio (d/D): ${propellerType === 'CPP' ? '0.28' : '0.18'}
Material: ${activeMaterial.name}

3. HYDRODYNAMIC PERFORMANCE & EFFICIENCY
--------------------------------------------------------------------
Open Water Efficiency (eta0): ${designResults.openWaterEfficiency}%
Keller Cavitation Criterion: ${
      designResults.cavitationAnalysis.kellerSatisfied ? 'SATISFIED' : 'WARNING (Increase EAR)'
    }
Cavitation Number (sigma): ${designResults.cavitationAnalysis.cavitationNumberSigma}

4. 16-STEP CALCULATIONS SUMMARY
--------------------------------------------------------------------
${designResults.steps.map((s) => `Step ${s.stepNumber} [${s.title}]: ${s.value} ${s.unit}`).join('\n')}

====================================================================
`;
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Propeller_Design_Report_${designResults.optimumDiameterM}m_${numBlades}B.txt`;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100 font-sans">
      {/* Top Banner */}
      <SubscriptionBanner
        userPlan={userPlan}
        onOpenPricing={onOpenPricing}
        featureName="AI Propeller Design & Optimization Center"
      />

      {/* Main Title & Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/30">
              Module #227 • SaaS Production Grade
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
              ITTC / ISO 484-1 Verified
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5 pt-1">
            <Disc className="w-8 h-8 text-cyan-400 animate-spin-slow" />
            AI Ship Propeller Design, Optimization & 3D Manufacturing Platform
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-3xl">
            Complete Marine Propulsion Engineering Platform for Wageningen B-Series, Kaplan, Kort Nozzle, CPP, High-Speed Gawn Series, 3D CAD, CFD Cavitation Prediction, and CNC Blade Offsets.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowDbModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs border border-slate-700 transition"
          >
            <Database className="w-4 h-4 text-cyan-400" />
            10,000+ Propeller Database
          </button>

          <button
            onClick={() => setShowShipInputs(!showShipInputs)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/30 transition"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            Ship Particulars ({ship.serviceSpeedKnots} kn / {ship.deliveredPowerKw} kW)
          </button>

          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition"
          >
            <Download className="w-4 h-4" />
            Export Full Report
          </button>
        </div>
      </div>

      {/* Ship Particulars Input Drawer (Expandable) */}
      {showShipInputs && (
        <div className="bg-slate-900/95 p-6 rounded-3xl border border-cyan-500/30 space-y-4 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4" /> Ship Hydrodynamic Inputs & Operating Envelope
            </h3>
            <button
              onClick={() => setShip(DEFAULT_SHIP_PARTICULARS)}
              className="text-xs text-slate-400 hover:text-cyan-400 font-semibold"
            >
              Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Service Speed (knots)</label>
              <input
                type="number"
                value={ship.serviceSpeedKnots}
                onChange={(e) => setShip({ ...ship, serviceSpeedKnots: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-bold"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Delivered Power (kW)</label>
              <input
                type="number"
                value={ship.deliveredPowerKw}
                onChange={(e) => setShip({ ...ship, deliveredPowerKw: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-bold"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Target Shaft Speed (RPM)</label>
              <input
                type="number"
                value={ship.requiredPropRpm}
                onChange={(e) => setShip({ ...ship, requiredPropRpm: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-bold"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Max Diameter Limit (m)</label>
              <input
                type="number"
                step="0.1"
                value={ship.maxDiameterLimitM}
                onChange={(e) => setShip({ ...ship, maxDiameterLimitM: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-bold"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Wake Fraction (w)</label>
              <input
                type="number"
                step="0.01"
                value={ship.wakeFraction}
                onChange={(e) => setShip({ ...ship, wakeFraction: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-bold"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Thrust Deduction (t)</label>
              <input
                type="number"
                step="0.01"
                value={ship.thrustDeduction}
                onChange={(e) => setShip({ ...ship, thrustDeduction: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-bold"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Grid Layout: Geometry Controls + Key Metrics Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Geometry Controls */}
        <div className="lg:col-span-5 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4" /> Geometry & Propeller Series
            </h3>
            <span className="text-[11px] font-bold text-slate-400">ISO 484 Class S</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Propeller Type Select */}
            <div>
              <label className="text-slate-300 font-bold block mb-1">Propeller Series / Type</label>
              <select
                value={propellerType}
                onChange={(e) => setPropellerType(e.target.value as PropellerType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-bold focus:outline-none focus:border-cyan-500"
              >
                <option value="Wageningen_B">Wageningen B-Series (Standard Ships)</option>
                <option value="FPP">Fixed Pitch Propeller (FPP)</option>
                <option value="CPP">Controllable Pitch Propeller (CPP)</option>
                <option value="Ducted_Kort">Kaplan in Kort Nozzle (Tugs/Pusher)</option>
                <option value="Gawn_Series">Gawn Series (High Speed Crafts)</option>
                <option value="Ice_Class">Ice Class Propeller (Heavy Duty)</option>
                <option value="Azimuth_Thruster">Azimuth Thruster (Steerable Pod)</option>
                <option value="Contra_Rotating">Contra-Rotating Dual Set (CRP)</option>
                <option value="Waterjet_Impeller">Waterjet Impeller</option>
              </select>
            </div>

            {/* Blades Range */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Number of Blades (Z)</span>
                <span className="text-cyan-400 font-black">{numBlades} Blades</span>
              </div>
              <input
                type="range"
                min="3"
                max="7"
                value={numBlades}
                onChange={(e) => setNumBlades(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            {/* Pitch Ratio Slider */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Face Pitch Ratio (P/D)</span>
                <span className="text-cyan-400 font-black">{designResults.optimumPitchRatio}</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.4"
                step="0.02"
                value={designResults.optimumPitchRatio}
                onChange={(e) => setPitchRatioOverride(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            {/* Expanded Area Ratio Slider */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Expanded Area Ratio (A_E / A_0)</span>
                <span className="text-cyan-400 font-black">{designResults.optimumEAR}</span>
              </div>
              <input
                type="range"
                min="0.35"
                max="1.1"
                step="0.02"
                value={designResults.optimumEAR}
                onChange={(e) => setEarOverride(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            {/* Blade Material Dropdown */}
            <div>
              <label className="text-slate-300 font-bold block mb-1">Blade Material Selection</label>
              <select
                value={ship.bladeMaterial}
                onChange={(e) => setShip({ ...ship, bladeMaterial: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-white font-bold focus:outline-none focus:border-cyan-500"
              >
                {PROPELLER_MATERIALS.map((mat) => (
                  <option key={mat.id} value={mat.id}>
                    {mat.name} (${mat.costPerKgUSD}/kg)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Hydrodynamic Performance Summary Dashboard */}
        <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Key Hydrodynamic Metrics
            </h3>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> ITTC 1978 Standard Output
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-slate-400 text-[11px] font-bold uppercase block">Open Water Efficiency</span>
              <div className="text-2xl font-black text-cyan-400 mt-1">{designResults.openWaterEfficiency}%</div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Peak η0 Efficiency</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-slate-400 text-[11px] font-bold uppercase block">Optimum Diameter</span>
              <div className="text-2xl font-black text-amber-400 mt-1">{designResults.optimumDiameterM} m</div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Max Limit: {ship.maxDiameterLimitM}m</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-slate-400 text-[11px] font-bold uppercase block">Keller Cavitation Check</span>
              <div
                className={`text-xs font-black mt-2 px-2 py-1 rounded-xl border ${
                  designResults.cavitationAnalysis.kellerSatisfied
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}
              >
                {designResults.cavitationAnalysis.kellerSatisfied ? 'Keller Satisfied' : 'Risk: Increase EAR'}
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">
                Min EAR: {designResults.cavitationAnalysis.kellerMinAreaRatio}
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-slate-400 text-[11px] font-bold uppercase block">Cavitation Number (σ)</span>
              <div className="text-2xl font-black text-indigo-400 mt-1">
                {designResults.cavitationAnalysis.cavitationNumberSigma}
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Incipient Cavitation</span>
            </div>
          </div>

          {/* AI Optimization Banner */}
          <div className="bg-gradient-to-r from-cyan-950/60 to-slate-950 p-4 rounded-2xl border border-cyan-800/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">AI Hydrodynamic Optimization Recommendation</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  {designResults.cavitationAnalysis.recommendations[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('3d_cad')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === '3d_cad' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Box className="w-4 h-4" /> 3D CAD & CFD Simulation
        </button>

        <button
          onClick={() => setActiveTab('2d_drawings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === '2d_drawings' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" /> 2D GA & Manufacturing Drawings
        </button>

        <button
          onClick={() => setActiveTab('blade_performance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === 'blade_performance' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" /> Blade Performance Analysis
        </button>

        <button
          onClick={() => setActiveTab('openwater_curves')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === 'openwater_curves' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" /> Wageningen Open-Water Curves
        </button>

        <button
          onClick={() => setActiveTab('cavitation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === 'cavitation' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4" /> Cavitation Analysis
        </button>

        <button
          onClick={() => setActiveTab('offsets_cnc')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === 'offsets_cnc' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" /> CNC Blade Offsets
        </button>

        <button
          onClick={() => setActiveTab('formulas_latex')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === 'formulas_latex' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" /> Formulas & Derivations
        </button>

        <button
          onClick={() => setActiveTab('materials_strength')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === 'materials_strength' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Materials & Class Rules
        </button>

        <button
          onClick={() => setActiveTab('ai_assistant')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === 'ai_assistant' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" /> AI Voice Assistant
        </button>

        <button
          onClick={() => setActiveTab('pricing_tiers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === 'pricing_tiers' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-amber-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" /> Subscription Tiers
        </button>
      </div>

      {/* Tab Content Views */}
      <div className="space-y-6">
        {/* 1. 3D CAD Canvas View */}
        {activeTab === '3d_cad' && (
          <Propeller3DCanvas
            numBlades={numBlades}
            diameterM={designResults.optimumDiameterM}
            pitchRatio={designResults.optimumPitchRatio}
            expandedAreaRatio={designResults.optimumEAR}
            radialGeometry={designResults.radialGeometry}
            propellerType={propellerType}
            materialName={activeMaterial.name}
            onPropellerTypeChange={setPropellerType}
          />
        )}

        {/* 2. 2D Drawings View */}
        {activeTab === '2d_drawings' && (
          <PropellerDrawing2D
            numBlades={numBlades}
            diameterM={designResults.optimumDiameterM}
            pitchRatio={designResults.optimumPitchRatio}
            expandedAreaRatio={designResults.optimumEAR}
            radialGeometry={designResults.radialGeometry}
            propellerType={propellerType}
          />
        )}

        {/* Blade Performance Analysis Tab */}
        {activeTab === 'blade_performance' && (
          <BladePerformanceAnalysis
            ship={ship}
            numBlades={numBlades}
            diameterM={designResults.optimumDiameterM}
            pitchRatio={designResults.optimumPitchRatio}
            expandedAreaRatio={designResults.optimumEAR}
            propellerType={propellerType}
            radialGeometry={designResults.radialGeometry}
          />
        )}

        {/* 3. Open Water Curves View (Recharts) */}
        {activeTab === 'openwater_curves' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Wageningen B-Series Open Water Characteristic Diagram (K_T, 10·K_Q, η_0 vs J)
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Nondimensional hydrodynamic propulsion curves for P/D = {designResults.optimumPitchRatio}, EAR = {designResults.optimumEAR}, Z = {numBlades}
                </p>
              </div>
            </div>

            <div className="h-[420px] bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={openWaterCurves} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="J" stroke="#94a3b8" label={{ value: 'Advance Ratio J', position: 'insideBottom', offset: -10, fill: '#94a3b8' }} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line type="monotone" dataKey="KT" name="Thrust Coeff K_T" stroke="#38bdf8" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="KQ10" name="10 × Torque Coeff (10·K_Q)" stroke="#f59e0b" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="eta0" name="Efficiency η_0 (%)" stroke="#10b981" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 4. Cavitation Analysis View */}
        {activeTab === 'cavitation' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-400" />
                  CFD Hydrodynamic Cavitation Breakdown & Risk Map
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Incipient cavitation prediction according to Keller criterion, tip vortex breakdown, and erosion risk index.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300">Sheet Cavitation Risk</span>
                <div className="text-2xl font-black text-amber-400">
                  {designResults.cavitationAnalysis.sheetCavitationRiskPercent}%
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${designResults.cavitationAnalysis.sheetCavitationRiskPercent}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300">Bubble Cavitation Risk</span>
                <div className="text-2xl font-black text-cyan-400">
                  {designResults.cavitationAnalysis.bubbleCavitationRiskPercent}%
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full"
                    style={{ width: `${designResults.cavitationAnalysis.bubbleCavitationRiskPercent}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300">Tip Vortex Cavitation</span>
                <div className="text-2xl font-black text-emerald-400">
                  {designResults.cavitationAnalysis.tipCavitation ? 'Detected (High Speed)' : 'Low Risk'}
                </div>
                <p className="text-[11px] text-slate-400">Tip loading reduced via high skew</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300">Cloud & Root Cavitation</span>
                <div className="text-2xl font-black text-indigo-400">
                  {designResults.cavitationAnalysis.cloudCavitationRiskPercent}%
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full"
                    style={{ width: `${designResults.cavitationAnalysis.cloudCavitationRiskPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. CNC Blade Offsets View */}
        {activeTab === 'offsets_cnc' && (
          <PropellerOffsetTable
            offsetRows={offsetRows}
            radialGeometry={designResults.radialGeometry}
            diameterM={designResults.optimumDiameterM}
          />
        )}

        {/* 6. Formulas & Derivations View */}
        {activeTab === 'formulas_latex' && (
          <PropellerCalculationsLatex
            shipParticulars={ship}
            stepResults={designResults.steps}
          />
        )}

        {/* 7. Materials & Class Rules View */}
        {activeTab === 'materials_strength' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  Blade Material Properties & Classification Society Strength Rules
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Compliant with DNV, ABS, Lloyds Register (LR), Bureau Veritas (BV), RINA, and IACS UR M33 rules.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROPELLER_MATERIALS.map((mat) => (
                <div
                  key={mat.id}
                  onClick={() => setShip({ ...ship, bladeMaterial: mat.id })}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    ship.bladeMaterial === mat.id
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="font-bold text-xs text-white">{mat.name}</span>
                      {ship.bladeMaterial === mat.id && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <div className="text-[11px] text-slate-400 space-y-1">
                      <div>Yield Strength: <span className="text-white font-bold">{mat.yieldStrengthMpa} MPa</span></div>
                      <div>Tensile Strength: <span className="text-white font-bold">{mat.tensileStrengthMpa} MPa</span></div>
                      <div>Fatigue Limit: <span className="text-amber-400 font-bold">{mat.fatigueLimitMpa} MPa</span></div>
                      <div>Density: <span className="text-slate-300">{mat.densityKgM3} kg/m³</span></div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 mt-3 text-[10px] text-slate-400 flex justify-between">
                    <span>{mat.corrosionRating}</span>
                    <span className="font-bold text-cyan-300">${mat.costPerKgUSD}/kg</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. AI Voice & Engineering Assistant View */}
        {activeTab === 'ai_assistant' && (
          <PropellerVoiceAssistant
            shipParticulars={ship}
            openWaterEfficiency={designResults.openWaterEfficiency}
          />
        )}

        {/* 9. Subscription Tiers View */}
        {activeTab === 'pricing_tiers' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h3 className="text-2xl font-black text-white">SaaS Subscription & Licensing Tiers</h3>
              <p className="text-slate-400 text-xs">
                Empower your shipyard, consultancy, or university with AI-powered propeller design and 3D CAD manufacturing workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <span className="font-bold text-slate-400 uppercase">Free Tier</span>
                <div className="text-2xl font-black text-white">$0</div>
                <p className="text-slate-400">Basic Wageningen B-Series sizing & watermarked drawings.</p>
                <button
                  onClick={() => onOpenPricing?.('free')}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition"
                >
                  Current Plan
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/40 space-y-3 relative">
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-bold absolute top-3 right-3">
                  Academic
                </span>
                <span className="font-bold text-cyan-400 uppercase">Student</span>
                <div className="text-2xl font-black text-white">$29 <span className="text-xs font-normal text-slate-400">/mo</span></div>
                <p className="text-slate-400">Unlimited academic projects, 2D GA drawings, LaTeX formulas & AI explanations.</p>
                <button
                  onClick={() => onOpenPricing?.('student')}
                  className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition"
                >
                  Upgrade to Student
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/50 space-y-3 relative shadow-xl">
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold absolute top-3 right-3">
                  Popular
                </span>
                <span className="font-bold text-amber-400 uppercase">Professional</span>
                <div className="text-2xl font-black text-white">$199 <span className="text-xs font-normal text-slate-400">/mo</span></div>
                <p className="text-slate-400">Commercial projects, 3D CAD STL/STEP export, CFD cavitation maps & CNC offsets.</p>
                <button
                  onClick={() => onOpenPricing?.('professional')}
                  className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition"
                >
                  Upgrade to Pro
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-500/40 space-y-3">
                <span className="font-bold text-indigo-400 uppercase">Enterprise</span>
                <div className="text-2xl font-black text-white">$1,499 <span className="text-xs font-normal text-slate-400">/mo</span></div>
                <p className="text-slate-400">Unlimited users, Digital Twin API integration, ERP/PLM integration & white-label.</p>
                <button
                  onClick={() => onOpenPricing?.('enterprise')}
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 10,000+ Propeller Database Modal */}
      {showDbModal && (
        <PropellerDatabaseModal
          onSelectPreset={handleSelectPreset}
          onClose={() => setShowDbModal(false)}
        />
      )}
    </div>
  );
};
