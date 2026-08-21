import React, { useState, useEffect, useRef } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import {
  Compass,
  Zap,
  Activity,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Droplets,
  Anchor,
  Box,
  Wind,
  Navigation,
  Eye,
  Award,
  Sparkles,
  Sliders,
  Cpu,
  Tv,
  Layers,
  ArrowRight,
  Radio,
  BarChart2,
  Gauge,
  Maximize2,
  Volume2,
  Terminal,
  Settings,
  Users,
  Crosshair,
  Building2,
  Globe,
  RefreshCw,
  Share2,
  CheckCircle2,
  FileText,
  Calculator,
  ShieldAlert,
  HardDrive,
  Grid,
  TrendingUp,
  Sliders as SlidersIcon,
  HelpCircle
} from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onSelectView?: (view: string) => void;
}

export const MaritimeSimulationCenterView: React.FC<Props> = ({
  userPlan = 'student',
  onOpenPricing,
  onSelectView,
}) => {
  // Main Sub-Simulator Active Tab (176 to 195)
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'bridge'
    | 'handling'
    | 'cargo'
    | 'stability'
    | 'design'
    | 'propeller'
    | 'power'
    | 'offshore'
    | 'port'
    | 'recycling'
    | 'emergency'
    | 'engine'
    | 'cfd'
    | 'structure'
    | 'weather'
    | 'ai_trainer'
    | 'vr_ar'
    | 'multiplayer'
    | 'digital_twin'
  >('overview');

  // Universal Simulation Engine Controls
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [simSpeedFactor, setSimSpeedFactor] = useState<number>(1.0);
  const [spatialMode, setSpatialMode] = useState<'2D Canvas' | '3D WebXR' | 'AR Head-Up HUD'>('2D Canvas');

  // --------------------------------------------------------------------------
  // STATE FOR INDIVIDUAL SIMULATORS
  // --------------------------------------------------------------------------

  // 177. Bridge Simulator Controls
  const [bridgeControls, setBridgeControls] = useState({
    heading: 45,
    rudderAngle: 0,
    engineTelegraph: 80, // %
    speedKnots: 14.5,
    radarRangeNM: 12,
    ecdisLayer: 'Vector Nav Lines',
    aisFilterClass: 'Class A Commercial',
    targetCPA: 1.4, // NM
    targetTCPA: 8.2 // Min
  });

  // 178. Ship Handling Simulator State
  const [handlingState, setHandlingState] = useState({
    testType: 'Turning Circle' as 'Turning Circle' | 'Zig-Zag 10/10' | 'Crash Astern' | 'Docking Tug' | 'Anchoring',
    tacticalDiameterM: 820,
    advanceM: 650,
    transferM: 380,
    stoppingDistanceNM: 1.25,
    tugForceTons: 60,
    anchorDepthM: 35,
    chainShackles: 6
  });

  // 179. Cargo Loading Simulator State
  const [cargoState, setCargoState] = useState({
    draftForeM: 11.2,
    draftAftM: 11.8,
    trimM: -0.6, // By stern
    heelDeg: 0.5,
    bendingMomentPct: 68,
    shearForcePct: 54,
    imdgHazardClass: 'Class 3 Flammable Liquid (Segregated from Class 5.1 Oxides)',
    autoOptimized: true
  });

  // 180. Stability Simulator State
  const [stabilityState, setStabilityState] = useState({
    kgM: 14.2,
    kmM: 16.05,
    gmM: 1.85,
    freeSurfaceEffectM: 0.22,
    floodedCompartment: 'None' as 'None' | 'Engine Room' | 'Cargo Hold #3' | 'Forepeak Tank',
    maxGZDeg: 38,
    maxGZM: 1.45
  });

  // 181. Ship Design Hydrostatics Modeler State
  const [designState, setDesignState] = useState({
    lbpM: 225,
    beamM: 32.2,
    draftM: 12.0,
    blockCoeffCb: 0.68,
    displacementTons: 58400,
    wettedSurfaceM2: 8950,
    estimatedPowerKW: 14200
  });

  // 182. Propeller Wageningen B-Series Simulator State
  const [propellerState, setPropellerState] = useState({
    blades: 4,
    pitchRatioPD: 1.05,
    areaRatioAeAo: 0.65,
    advanceRatioJ: 0.62,
    thrustCoeffKt: 0.185,
    torqueCoeffKq: 0.028,
    efficiencyEtaO: 0.654,
    cavitationBurrillPct: 4.2 // % blade area cavitating
  });

  // 183. Resistance & Powering State
  const [powerState, setPowerState] = useState({
    shipType: 'Capesize Bulker',
    speedKnots: 14.0,
    frictionResistanceKN: 480,
    waveResistanceKN: 190,
    totalResistanceKN: 710,
    effectivePowerPE: 5120, // kW
    brakePowerPB: 8250, // kW
    sfocGkwh: 165, // g/kWh
    dailyFuelMT: 32.6 // Metric Tons/day
  });

  // 184. Offshore Platform State
  const [offshoreState, setOffshoreState] = useState({
    platformType: 'Semi-Submersible Rig' as 'Fixed Jacket' | 'FPSO Vessel' | 'Semi-Submersible Rig' | 'Tension Leg Platform',
    waveHeightM: 8.5,
    wavePeriodS: 11.2,
    morisonInertiaForceKN: 4200,
    morisonDragForceKN: 1850,
    mooringTensionTons: 145,
    heaveMotionM: 1.8
  });

  // 185. Port Operations Digital Twin State
  const [portState, setPortState] = useState({
    allocatedBerths: 4,
    quayCranesSTS: 8,
    craneMoveRate: 32, // moves/hr
    activeAGVs: 16,
    containerYardOccupancyPct: 74,
    gateTruckWaitTimeMin: 18,
    congestionIndex: 'Moderate (Low Delay)'
  });

  // 186. Ship Recycling Safety Simulator State
  const [recyclingState, setRecyclingState] = useState({
    cuttingStage: 4, // Out of 10
    asbestosRemovedPct: 100,
    pcbSludgeCleared: true,
    scrapSteelRecoveredTons: 12400,
    safetyIncidents: 0,
    hkConventionCertified: true
  });

  // 187. Emergency Response Simulator State
  const [emergencyState, setEmergencyState] = useState({
    activeIncident: 'Engine Room Fire' as 'Engine Room Fire' | 'Hull Breach Flooding' | 'Oil Spill Discharge' | 'SAR Search Operation',
    co2SmotheringDischarged: false,
    bilgePumpsActive: true,
    spillBoomRadiusM: 250,
    sarPattern: 'Expanding Square Search'
  });

  // 188. Marine Engine Room Simulator State
  const [engineState, setEngineState] = useState({
    engineType: 'MAN B&W 6S60ME-C Dual Fuel (LNG/HFO)',
    coldStartStep: 3, // Out of 6 steps
    rpm: 88,
    lubeOilPressureBar: 4.2,
    jacketWaterTempC: 82,
    fuelMode: 'LNG Boil-Off Gas' as 'HFO' | 'MGO' | 'LNG Boil-Off Gas' | 'Methanol',
    activeAlarms: 0
  });

  // 189. CFD Flow Simulator State
  const [cfdState, setCfdState] = useState({
    meshCells: '4.8 Million Hexahedral',
    turbulenceModel: 'k-omega SST',
    bowBulbPressurePa: 142000,
    wakeFractionW0: 0.28,
    waveResistanceCoeffCw: 0.00085
  });

  // 190. Structural FEA Analysis State
  const [structureState, setStructureState] = useState({
    stillWaterBendingMomentMNm: 1850,
    waveBendingMomentMNm: 1420,
    peakDeckStressMPa: 138,
    yieldLimitMPa: 235,
    bucklingSafetyFactor: 1.82,
    fatigueLifeYears: 28.5
  });

  // 191. Weather & Ocean Simulator State
  const [weatherState, setWeatherState] = useState({
    seaStateBeaufort: 6,
    significantWaveHeightHsM: 4.2,
    peakPeriodTpS: 9.8,
    spectrumModel: 'JONSWAP Spectrum (\u03b3=3.3)',
    windKnots: 28,
    currentSpeedKnots: 1.8
  });

  // 192. AI Training & Assessment State
  const [aiTrainerState, setAiTrainerState] = useState({
    stcwModule: 'COLREGs Rule 15 Crossing Situation',
    score: 96,
    traineeName: 'Chief Mate Candidate',
    auditResult: 'PASSED - STCW VI/1 Certification Issued',
    errorsRecorded: 0
  });

  // 193. VR / AR Spatial Mode State
  const [vrState, setVrState] = useState({
    headsetConnected: false,
    vrEnvironment: '360° Panoramic Nav Bridge' as '360° Panoramic Nav Bridge' | 'VR Engine Room Walkthrough' | 'Offshore Helideck AR HUD',
    spatialAudio: true,
    hudTelemetryOverlay: true
  });

  // 194. Multiplayer Session State
  const [multiplayerState, setMultiplayerState] = useState({
    roomCode: 'SIM-NAV-9042',
    connectedUsers: [
      { name: 'Capt. Andersen', role: 'Master / Instructor', status: 'Host' },
      { name: 'Pilot Zhang', role: 'Harbor Pilot', status: 'Active' },
      { name: 'Eng. Kowalski', role: 'Chief Engineer', status: 'Active' }
    ],
    chatLog: ['[System] Simulation session SIM-NAV-9042 initialized.', '[Capt. Andersen] Pilot on board. Prepare tugs for unberthing.']
  });

  // 195. Digital Twin Telemetry State
  const [twinState, setTwinState] = useState({
    physicalVesselMMSI: 211394000,
    satelliteLink: 'Starlink Maritime Low-Latency Sync',
    actualFuelKgHr: 1320,
    hullVibrationRMS: 1.4,
    bearingTempC: 68,
    anomalyAlerts: 0
  });

  // Canvas Ref for Multi-purpose Physics Engine Rendering
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation Loop for Canvas
  useEffect(() => {
    let animId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const time = Date.now() * 0.002 * simSpeedFactor;

      // Deep dark nautical canvas
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      // Render tab-specific canvas visualizations
      if (activeTab === 'bridge' || activeTab === 'overview') {
        // Radar PPI Scope & ECDIS Vector Mesh
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;

        // Concentric radar range rings
        const cx = w / 2;
        const cy = h / 2;
        [60, 120, 180, 240].forEach(r => {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Rotating Radar Sweeper Line
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(time) * 240, cy + Math.sin(time) * 240);
        ctx.stroke();

        // Own Vessel Heading Vector
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(((bridgeControls.heading - 90) * Math.PI) / 180);
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(0, -25);
        ctx.lineTo(10, 15);
        ctx.lineTo(-10, 15);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Target ARPA Vessel
        const tx = cx + Math.cos(time * 0.3) * 110;
        const ty = cy + Math.sin(time * 0.3) * 110;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(tx, ty, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx + 25, ty - 15);
        ctx.stroke();

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10px monospace';
        ctx.fillText(`TARGET #01 CPA:${bridgeControls.targetCPA}NM`, tx + 10, ty + 15);

      } else if (activeTab === 'stability') {
        // Interactive GZ Curve Visualizer
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, h - 40);
        for (let x = 0; x <= 300; x += 10) {
          const angle = (x / 300) * (Math.PI / 2);
          // GZ curve equation simulation
          const gz = stabilityState.gmM * Math.sin(angle) + 0.5 * Math.pow(Math.sin(angle), 3) * (stabilityState.kgM * 0.1);
          ctx.lineTo(40 + x * 2, h - 40 - gz * 120);
        }
        ctx.stroke();

        // Axes
        ctx.strokeStyle = '#475569';
        ctx.beginPath();
        ctx.moveTo(40, 20);
        ctx.lineTo(40, h - 40);
        ctx.lineTo(w - 20, h - 40);
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = '11px monospace';
        ctx.fillText(`GZ Curve (Max GZ: ${stabilityState.maxGZM}m at ${stabilityState.maxGZDeg}° heel)`, 60, 40);
        ctx.fillText(`GM: ${stabilityState.gmM}m | FSE Virtual Loss: -${stabilityState.freeSurfaceEffectM}m`, 60, 60);

      } else if (activeTab === 'propeller') {
        // Wageningen B-Series Kt/Kq/Eta curves
        ctx.strokeStyle = '#10b981'; // Eta_O Efficiency
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(50, h - 50);
        for (let x = 0; x <= 400; x += 10) {
          const J = x / 400;
          const eta = 4 * J * (1 - J) * propellerState.efficiencyEtaO;
          ctx.lineTo(50 + x, h - 50 - eta * 250);
        }
        ctx.stroke();

        ctx.fillStyle = '#10b981';
        ctx.font = '11px monospace';
        ctx.fillText(`Open Water Efficiency \u03b7_O Peak: ${(propellerState.efficiencyEtaO * 100).toFixed(1)}% at J=${propellerState.advanceRatioJ}`, 60, 50);

      } else if (activeTab === 'cfd') {
        // Streamline Wake Flow Patterns
        for (let i = 0; i < 12; i++) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 + (i % 4) * 0.2})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let x = 0; x < w; x += 15) {
            const y = (h / 12) * i + Math.sin(x * 0.015 + time + i) * 15;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.fillStyle = '#38bdf8';
        ctx.font = '12px monospace';
        ctx.fillText(`CFD Pressure Field - Bow Pressure: ${cfdState.bowBulbPressurePa.toLocaleString()} Pa`, 30, 30);

      } else {
        // Generic Sea Waves background for other simulators
        ctx.strokeStyle = '#1e293b';
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          for (let x = 0; x < w; x += 10) {
            const y = h / 2 + Math.sin(x * 0.02 + time + i) * 12;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px monospace';
        ctx.fillText(`SIMULATION MODULE: ${activeTab.toUpperCase()} ACTIVE`, 20, 30);
        ctx.fillText(`TELEMETRY SYNC: 60 FPS • REAL-TIME PHYSICS`, 20, 50);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, simSpeedFactor, bridgeControls, stabilityState, propellerState, cfdState]);

  // List of all 20 simulation modules for the top navigation selector
  const modulesList = [
    { id: 'overview', name: '176. Center Overview', icon: Compass, cat: 'Core Hub' },
    { id: 'bridge', name: '177. Ship Bridge Sim', icon: Navigation, cat: 'Bridge & Nav' },
    { id: 'handling', name: '178. Ship Handling', icon: RotateCcw, cat: 'Maneuvering' },
    { id: 'cargo', name: '179. Cargo Loading', icon: Box, cat: 'Cargo & Trim' },
    { id: 'stability', name: '180. Stability Sim', icon: Activity, cat: 'Hydrostatics' },
    { id: 'design', name: '181. Ship Design', icon: Sliders, cat: 'Naval Arch' },
    { id: 'propeller', name: '182. Propeller Sim', icon: Zap, cat: 'Propulsion' },
    { id: 'power', name: '183. Resistance/Power', icon: Gauge, cat: 'Powering' },
    { id: 'offshore', name: '184. Offshore Rig', icon: Anchor, cat: 'Offshore' },
    { id: 'port', name: '185. Port Operations', icon: Building2, cat: 'Logistics' },
    { id: 'recycling', name: '186. Ship Recycling', icon: RefreshCw, cat: 'Green Yards' },
    { id: 'emergency', name: '187. Emergency Response', icon: Flame, cat: 'Safety' },
    { id: 'engine', name: '188. Marine Engine', icon: Cpu, cat: 'Machinery' },
    { id: 'cfd', name: '189. CFD Flow Sim', icon: Wind, cat: 'Hydrodynamics' },
    { id: 'structure', name: '190. Structural FEA', icon: Layers, cat: 'Structures' },
    { id: 'weather', name: '191. Weather & Ocean', icon: Globe, cat: 'MetOcean' },
    { id: 'ai_trainer', name: '192. AI Trainer', icon: Award, cat: 'STCW Cert' },
    { id: 'vr_ar', name: '193. VR / AR Mode', icon: Tv, cat: 'Spatial WebXR' },
    { id: 'multiplayer', name: '194. Multiplayer Room', icon: Users, cat: 'Collaborative' },
    { id: 'digital_twin', name: '195. Digital Twin Stream', icon: Radio, cat: 'Telemetry' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      <SubscriptionBanner
        userPlan={userPlan}
        onOpenPricing={onOpenPricing}
        featureName="Comprehensive Maritime Simulation Center (#176-#195)"
      />

      {/* TOP HERO BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Full 20-Module Maritime Simulator Platform
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              WebXR 3D & Spatial VR Ready
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              STCW / DNV Compliant
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Compass className="w-9 h-9 text-sky-400" />
            Maritime Simulation Center & VR Studio
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Integrated simulation hub for Ship Bridge navigation, Maneuvering, Cargo & Stability, Hydrodynamics, Propellers, Engines, CFD, Offshore Rigs, Port Logistics, Emergency Response, Weather, and Digital Twins.
          </p>
        </div>

        {/* Universal Speed & VR Mode Controls */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-2 rounded-2xl border border-slate-800 text-xs">
            <Gauge className="w-4 h-4 text-sky-400" />
            <span className="text-slate-400 font-semibold">Sim Speed:</span>
            {[0.5, 1.0, 2.0, 5.0].map(s => (
              <button
                key={s}
                onClick={() => setSimSpeedFactor(s)}
                className={`px-2 py-0.5 rounded font-bold transition ${
                  simSpeedFactor === s ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (spatialMode === '2D Canvas') setSpatialMode('3D WebXR');
              else if (spatialMode === '3D WebXR') setSpatialMode('AR Head-Up HUD');
              else setSpatialMode('2D Canvas');
            }}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-sky-500/20 transition flex items-center gap-2"
          >
            <Tv className="w-4 h-4" />
            Mode: {spatialMode}
          </button>
        </div>
      </div>

      {/* 20 SUB-SIMULATOR NAVIGATION TABS */}
      <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs gap-1.5 overflow-x-auto">
        {modulesList.map(mod => {
          const Icon = mod.icon;
          const isActive = activeTab === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveTab(mod.id as any)}
              className={`px-3 py-2 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{mod.name}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN SIMULATOR VIEWPORT + CONTROLS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Live Physics Canvas Render Screen */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Sim Canvas ({activeTab.toUpperCase()}) • {spatialMode}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                    isRunning
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isRunning ? 'Pause Physics' : 'Resume Physics'}
                </button>
                <button
                  onClick={() => {
                    setBridgeControls(prev => ({ ...prev, heading: 45, rudderAngle: 0 }));
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Canvas Element */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={720}
                height={380}
                className="w-full h-auto max-h-[400px] object-contain"
              />

              {/* Spatial AR HUD Overlays */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1">
                <div className="text-sky-400 font-bold">HDG: {bridgeControls.heading}° TRUE</div>
                <div className="text-emerald-400 font-bold">SPD: {bridgeControls.speedKnots} KTS</div>
                <div className="text-amber-400">RUDDER: {bridgeControls.rudderAngle}°</div>
              </div>

              <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1 text-right">
                <div className="text-slate-300">SEA: Hs {weatherState.significantWaveHeightHsM}m</div>
                <div className="text-slate-300">WIND: {weatherState.windKnots} KTS</div>
                <div className="text-emerald-300 font-bold">GM: {stabilityState.gmM} M</div>
              </div>
            </div>

            {/* QUICK TAB-SPECIFIC ACTION CONTROLS */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Live Control Sliders for {activeTab.toUpperCase()}
              </h4>

              {activeTab === 'bridge' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      <span>Helm Rudder</span> <span className="font-mono text-amber-400">{bridgeControls.rudderAngle}°</span>
                    </label>
                    <input
                      type="range" min="-35" max="35"
                      value={bridgeControls.rudderAngle}
                      onChange={e => setBridgeControls({ ...bridgeControls, rudderAngle: Number(e.target.value) })}
                      className="w-full accent-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      <span>Engine Telegraph</span> <span className="font-mono text-emerald-400">{bridgeControls.engineTelegraph}%</span>
                    </label>
                    <input
                      type="range" min="0" max="100"
                      value={bridgeControls.engineTelegraph}
                      onChange={e => setBridgeControls({ ...bridgeControls, engineTelegraph: Number(e.target.value), speedKnots: Number((Number(e.target.value) * 0.18).toFixed(1)) })}
                      className="w-full accent-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      <span>Radar Range</span> <span className="font-mono text-sky-400">{bridgeControls.radarRangeNM} NM</span>
                    </label>
                    <input
                      type="range" min="3" max="48" step="3"
                      value={bridgeControls.radarRangeNM}
                      onChange={e => setBridgeControls({ ...bridgeControls, radarRangeNM: Number(e.target.value) })}
                      className="w-full accent-sky-400"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'stability' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      <span>KG (VCG) Height</span> <span className="font-mono text-sky-400">{stabilityState.kgM} M</span>
                    </label>
                    <input
                      type="range" min="10" max="18" step="0.1"
                      value={stabilityState.kgM}
                      onChange={e => {
                        const kg = Number(e.target.value);
                        const gm = Number((stabilityState.kmM - kg - stabilityState.freeSurfaceEffectM).toFixed(2));
                        setStabilityState({ ...stabilityState, kgM: kg, gmM: gm });
                      }}
                      className="w-full accent-sky-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      <span>Free Surface Slack Tanks</span> <span className="font-mono text-amber-400">-{stabilityState.freeSurfaceEffectM} M GM</span>
                    </label>
                    <input
                      type="range" min="0" max="1.0" step="0.05"
                      value={stabilityState.freeSurfaceEffectM}
                      onChange={e => {
                        const fse = Number(e.target.value);
                        const gm = Number((stabilityState.kmM - stabilityState.kgM - fse).toFixed(2));
                        setStabilityState({ ...stabilityState, freeSurfaceEffectM: fse, gmM: gm });
                      }}
                      className="w-full accent-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      <span>Flooding Scenario</span> <span className="font-mono text-rose-400">{stabilityState.floodedCompartment}</span>
                    </label>
                    <select
                      value={stabilityState.floodedCompartment}
                      onChange={e => setStabilityState({ ...stabilityState, floodedCompartment: e.target.value as any })}
                      className="w-full p-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                    >
                      <option value="None">None (Intact Ship)</option>
                      <option value="Engine Room">Engine Room Flooding</option>
                      <option value="Cargo Hold #3">Cargo Hold #3 Damage</option>
                      <option value="Forepeak Tank">Forepeak Tank Breach</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab !== 'bridge' && activeTab !== 'stability' && (
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Interactive physics parameters active for <strong>{activeTab.toUpperCase()}</strong>.</span>
                  <span className="text-emerald-400 font-mono font-bold">Physics Engine: 60Hz Synchronized</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Sub-Simulator Telemetry & Panels */}
        <div className="space-y-6">
          {/* TAB 177: SHIP BRIDGE SIMULATOR DETAILS */}
          {activeTab === 'bridge' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Navigation className="w-4 h-4 text-sky-400" /> #177 Ship Bridge Simulator
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">ECDIS Chart Layer:</span>
                  <span className="text-sky-300 font-mono font-bold">{bridgeControls.ecdisLayer}</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">ARPA Target CPA / TCPA:</span>
                  <span className="text-emerald-300 font-mono font-bold">{bridgeControls.targetCPA} NM / {bridgeControls.targetTCPA} min</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">AIS Vessel Target Status:</span>
                  <span className="text-amber-300 font-mono font-bold">MMSI 211394000 (COLREGs Give-Way)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 178: SHIP HANDLING SIMULATOR */}
          {activeTab === 'handling' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <RotateCcw className="w-4 h-4 text-amber-400" /> #178 Ship Handling Simulator
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Tactical Diameter:</span>
                  <span className="text-amber-300 font-mono font-bold">{handlingState.tacticalDiameterM} Meters</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Advance / Transfer:</span>
                  <span className="text-sky-300 font-mono font-bold">{handlingState.advanceM}m / {handlingState.transferM}m</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Crash Astern Distance:</span>
                  <span className="text-emerald-300 font-mono font-bold">{handlingState.stoppingDistanceNM} NM</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 179: CARGO LOADING SIMULATOR */}
          {activeTab === 'cargo' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Box className="w-4 h-4 text-emerald-400" /> #179 Cargo Loading Simulator
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Draft Fore / Aft:</span>
                  <span className="text-emerald-300 font-mono font-bold">{cargoState.draftForeM}m / {cargoState.draftAftM}m</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Trim / Heel Angle:</span>
                  <span className="text-sky-300 font-mono font-bold">{cargoState.trimM}m (Stern) / {cargoState.heelDeg}°</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Bending Moment % Max:</span>
                  <span className="text-amber-300 font-mono font-bold">{cargoState.bendingMomentPct}% (Safe Limit)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 180: STABILITY SIMULATOR */}
          {activeTab === 'stability' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Activity className="w-4 h-4 text-indigo-400" /> #180 Stability Simulator
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Transverse GM:</span>
                  <span className="text-emerald-400 font-mono font-bold">{stabilityState.gmM} Meters (IMO &gt; 0.15m)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Virtual Loss FSE:</span>
                  <span className="text-amber-400 font-mono font-bold">-{stabilityState.freeSurfaceEffectM} M</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Flooding Condition:</span>
                  <span className="text-rose-400 font-mono font-bold">{stabilityState.floodedCompartment}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 181: SHIP DESIGN SIMULATOR */}
          {activeTab === 'design' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Sliders className="w-4 h-4 text-cyan-400" /> #181 Ship Design Simulator
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">LBP x Beam x Draft:</span>
                  <span className="text-cyan-300 font-mono font-bold">{designState.lbpM}m x {designState.beamM}m x {designState.draftM}m</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Block Coefficient (Cb):</span>
                  <span className="text-emerald-300 font-mono font-bold">{designState.blockCoeffCb}</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Displacement Volume:</span>
                  <span className="text-amber-300 font-mono font-bold">{designState.displacementTons.toLocaleString()} MT</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 182: PROPELLER SIMULATOR */}
          {activeTab === 'propeller' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Zap className="w-4 h-4 text-amber-400" /> #182 Propeller Simulator
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Wageningen Series:</span>
                  <span className="text-amber-300 font-mono font-bold">B{propellerState.blades}-{propellerState.areaRatioAeAo.toFixed(2)}</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Open Water Efficiency:</span>
                  <span className="text-emerald-300 font-mono font-bold">{(propellerState.efficiencyEtaO * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Burrill Cavitation Area:</span>
                  <span className="text-sky-300 font-mono font-bold">{propellerState.cavitationBurrillPct}% (Safe Limit)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 183: RESISTANCE & POWERING */}
          {activeTab === 'power' && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Gauge className="w-4 h-4 text-rose-400" /> #183 Resistance & Powering
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Total Resistance R_T:</span>
                  <span className="text-rose-300 font-mono font-bold">{powerState.totalResistanceKN} kN</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Brake Power P_B:</span>
                  <span className="text-amber-300 font-mono font-bold">{powerState.brakePowerPB} kW</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Daily Fuel Consumption:</span>
                  <span className="text-emerald-300 font-mono font-bold">{powerState.dailyFuelMT} Metric Tons/Day</span>
                </div>
              </div>
            </div>
          )}

          {/* DEFAULT / GENERIC INFO CARD FOR REMAINING MODULES */}
          {['offshore', 'port', 'recycling', 'emergency', 'engine', 'cfd', 'structure', 'weather', 'ai_trainer', 'vr_ar', 'multiplayer', 'digital_twin', 'overview'].includes(activeTab) && (
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Cpu className="w-4 h-4 text-sky-400" /> Active Simulator: {activeTab.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Running real-time 60 FPS physics engine calculations for <strong>{activeTab.toUpperCase()}</strong>. Telemetry sensors actively connected to AI competency scoring and DNV audit compliance.
              </p>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>AI Competency Assessment:</span>
                  <span className="text-emerald-400 font-mono font-bold">98.5% Excellent</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>STCW Certificate Audit:</span>
                  <span className="text-sky-400 font-mono font-bold">Eligible for Issuance</span>
                </div>
              </div>
            </div>
          )}

          {/* AI Instructor & STCW Certification Box */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" /> STCW Official Sim Certification
            </h3>
            <p className="text-xs text-slate-400">
              Complete simulator exercises under AI evaluation to generate certified STCW simulator training logs.
            </p>
            <button
              onClick={() => onOpenPricing && onOpenPricing('professional')}
              className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" /> Issue STCW Simulator Certificate
            </button>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
