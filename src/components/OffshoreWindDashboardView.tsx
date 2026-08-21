import React, { useState, useEffect } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType, ViewMode } from '../types';
import {
  Wind,
  Zap,
  Activity,
  Compass,
  AlertTriangle,
  Wrench,
  CheckCircle2,
  RefreshCw,
  Sliders,
  TrendingUp,
  BarChart3,
  Layers,
  Thermometer,
  Waves,
  ShieldAlert,
  Ship,
  Clock,
  ExternalLink,
  ChevronRight,
  Info,
  Radio,
  Sparkles,
  ArrowUpRight,
  Power,
  SlidersHorizontal,
  X,
  Play
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ComposedChart
} from 'recharts';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onSelectView?: (view: ViewMode) => void;
}

interface WindTurbineData {
  id: string;
  name: string;
  model: string;
  status: 'online' | 'curtailed' | 'maintenance' | 'warning' | 'offline';
  powerMW: number;
  capacityMW: number;
  windSpeedMs: number;
  rotorRpm: number;
  yawAngleDeg: number;
  pitchAngleDeg: number;
  gearboxTempC: number;
  vibrationMms: number;
  capacityFactorPct: number;
  healthScore: number; // 0 - 100
  location: string;
}

interface MaintenanceTask {
  id: string;
  turbineId: string;
  taskName: string;
  type: 'Preventive' | 'Corrective' | 'Inspection' | 'Upgrade';
  assignedVessel: string;
  crewCount: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  weatherWindow: 'Safe' | 'Marginal' | 'Unsafe';
  scheduledDate: string;
  status: 'In Progress' | 'Scheduled' | 'Pending Vessel' | 'Completed';
  progressPct: number;
}

interface ScadaAlarm {
  id: string;
  timestamp: string;
  turbineId: string;
  severity: 'Critical' | 'Warning' | 'Advisory';
  code: string;
  message: string;
  acknowledged: boolean;
}

export const OffshoreWindDashboardView: React.FC<Props> = ({
  userPlan = 'student',
  onOpenPricing,
  onSelectView
}) => {
  // Selected Wind Farm
  const [selectedFarm, setSelectedFarm] = useState<'dogger' | 'hywind' | 'hornsea' | 'vineyard'>('dogger');
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [isLiveTelemetry, setIsLiveTelemetry] = useState(true);
  const [selectedTurbine, setSelectedTurbine] = useState<WindTurbineData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'turbines' | 'maintenance' | 'alarms'>('overview');
  const [curtailmentMW, setCurtailmentMW] = useState<number>(1200);

  // Farms Config
  const farmProfiles = {
    dogger: {
      name: 'Dogger Bank South Offshore Wind Farm',
      location: 'North Sea (130 km off Yorkshire, UK)',
      capacityMW: 1200,
      turbineCount: 80,
      turbineModel: 'GE Haliade-X 15MW Offshore',
      waterDepth: '28m - 36m (Monopile)',
      operator: 'Equinor & SSE Renewables',
      substationVoltage: '66kV / 220kV HVDC'
    },
    hywind: {
      name: 'Hywind Tampen Floating Wind Project',
      location: 'Norwegian North Sea (140 km offshore)',
      capacityMW: 95,
      turbineCount: 11,
      turbineModel: 'Siemens Gamesa SG 8.0-167 DD',
      waterDepth: '260m - 300m (Spar Buoy Floating)',
      operator: 'Equinor Energy AS',
      substationVoltage: '66kV Floating Array'
    },
    hornsea: {
      name: 'Hornsea Two Offshore Wind Farm',
      location: 'North Sea (89 km off East Riding of Yorkshire)',
      capacityMW: 1386,
      turbineCount: 165,
      turbineModel: 'Siemens Gamesa 8.0-167 DD',
      waterDepth: '30m - 40m (Monopile)',
      operator: 'Ørsted UK',
      substationVoltage: '400kV HVDC Offshore Reactive Substation'
    },
    vineyard: {
      name: 'Vineyard Wind 1 Offshore Project',
      location: 'Atlantic Ocean (24 km off Martha’s Vineyard, USA)',
      capacityMW: 800,
      turbineCount: 62,
      turbineModel: 'GE Haliade-X 13MW Offshore',
      waterDepth: '37m - 49.5m (Monopile)',
      operator: 'Avangrid & CIP',
      substationVoltage: '220kV AC Submarine Cable'
    }
  };

  const currentFarm = farmProfiles[selectedFarm];

  // Live Environmental Telemetry State
  const [envData, setEnvData] = useState({
    windSpeedMs: 14.8,
    windKnots: 28.7,
    windDirectionDeg: 235,
    waveHeightM: 2.4,
    wavePeriodS: 7.2,
    airTempC: 14.5,
    seaTempC: 11.2,
    gridFrequencyHz: 50.02,
    reactivePowerMvar: 42.1,
    arrayEfficiencyPct: 91.8
  });

  // Simulated Turbines (Sample fleet of 12 for high resolution UI)
  const initialTurbines: WindTurbineData[] = [
    { id: 'WTG-01', name: 'Turbine 01 (Alpha)', model: currentFarm.turbineModel, status: 'online', powerMW: 14.2, capacityMW: 15, windSpeedMs: 15.1, rotorRpm: 8.4, yawAngleDeg: 234, pitchAngleDeg: 4.1, gearboxTempC: 62.1, vibrationMms: 1.2, capacityFactorPct: 94.6, healthScore: 98, location: 'Sector A-1' },
    { id: 'WTG-02', name: 'Turbine 02 (Alpha)', model: currentFarm.turbineModel, status: 'online', powerMW: 14.8, capacityMW: 15, windSpeedMs: 15.4, rotorRpm: 8.6, yawAngleDeg: 235, pitchAngleDeg: 3.8, gearboxTempC: 64.5, vibrationMms: 1.4, capacityFactorPct: 98.6, healthScore: 96, location: 'Sector A-2' },
    { id: 'WTG-03', name: 'Turbine 03 (Alpha)', model: currentFarm.turbineModel, status: 'curtailed', powerMW: 10.0, capacityMW: 15, windSpeedMs: 15.0, rotorRpm: 7.1, yawAngleDeg: 236, pitchAngleDeg: 12.4, gearboxTempC: 58.2, vibrationMms: 1.1, capacityFactorPct: 66.6, healthScore: 95, location: 'Sector A-3' },
    { id: 'WTG-04', name: 'Turbine 04 (Beta)', model: currentFarm.turbineModel, status: 'warning', powerMW: 12.1, capacityMW: 15, windSpeedMs: 14.6, rotorRpm: 7.8, yawAngleDeg: 232, pitchAngleDeg: 6.2, gearboxTempC: 76.8, vibrationMms: 3.8, capacityFactorPct: 80.6, healthScore: 74, location: 'Sector B-1' },
    { id: 'WTG-05', name: 'Turbine 05 (Beta)', model: currentFarm.turbineModel, status: 'online', powerMW: 14.5, capacityMW: 15, windSpeedMs: 15.2, rotorRpm: 8.5, yawAngleDeg: 235, pitchAngleDeg: 4.0, gearboxTempC: 63.8, vibrationMms: 1.3, capacityFactorPct: 96.6, healthScore: 97, location: 'Sector B-2' },
    { id: 'WTG-06', name: 'Turbine 06 (Beta)', model: currentFarm.turbineModel, status: 'maintenance', powerMW: 0.0, capacityMW: 15, windSpeedMs: 14.5, rotorRpm: 0.0, yawAngleDeg: 90, pitchAngleDeg: 88.0, gearboxTempC: 34.1, vibrationMms: 0.1, capacityFactorPct: 0.0, healthScore: 82, location: 'Sector B-3' },
    { id: 'WTG-07', name: 'Turbine 07 (Gamma)', model: currentFarm.turbineModel, status: 'warning', powerMW: 13.0, capacityMW: 15, windSpeedMs: 14.9, rotorRpm: 8.1, yawAngleDeg: 234, pitchAngleDeg: 5.5, gearboxTempC: 78.4, vibrationMms: 4.2, capacityFactorPct: 86.6, healthScore: 68, location: 'Sector C-1' },
    { id: 'WTG-08', name: 'Turbine 08 (Gamma)', model: currentFarm.turbineModel, status: 'online', powerMW: 14.6, capacityMW: 15, windSpeedMs: 15.3, rotorRpm: 8.5, yawAngleDeg: 235, pitchAngleDeg: 3.9, gearboxTempC: 65.0, vibrationMms: 1.5, capacityFactorPct: 97.3, healthScore: 95, location: 'Sector C-2' },
    { id: 'WTG-09', name: 'Turbine 09 (Gamma)', model: currentFarm.turbineModel, status: 'online', powerMW: 14.1, capacityMW: 15, windSpeedMs: 14.8, rotorRpm: 8.3, yawAngleDeg: 235, pitchAngleDeg: 4.2, gearboxTempC: 61.9, vibrationMms: 1.2, capacityFactorPct: 94.0, healthScore: 99, location: 'Sector C-3' },
    { id: 'WTG-10', name: 'Turbine 10 (Delta)', model: currentFarm.turbineModel, status: 'online', powerMW: 14.7, capacityMW: 15, windSpeedMs: 15.2, rotorRpm: 8.6, yawAngleDeg: 236, pitchAngleDeg: 3.8, gearboxTempC: 63.2, vibrationMms: 1.4, capacityFactorPct: 98.0, healthScore: 96, location: 'Sector D-1' },
    { id: 'WTG-11', name: 'Turbine 11 (Delta)', model: currentFarm.turbineModel, status: 'offline', powerMW: 0.0, capacityMW: 15, windSpeedMs: 14.7, rotorRpm: 0.0, yawAngleDeg: 235, pitchAngleDeg: 90.0, gearboxTempC: 28.5, vibrationMms: 0.0, capacityFactorPct: 0.0, healthScore: 45, location: 'Sector D-2' },
    { id: 'WTG-12', name: 'Turbine 12 (Delta)', model: currentFarm.turbineModel, status: 'online', powerMW: 14.4, capacityMW: 15, windSpeedMs: 15.0, rotorRpm: 8.4, yawAngleDeg: 234, pitchAngleDeg: 4.1, gearboxTempC: 62.8, vibrationMms: 1.3, capacityFactorPct: 96.0, healthScore: 98, location: 'Sector D-3' },
  ];

  const [turbines, setTurbines] = useState<WindTurbineData[]>(initialTurbines);

  // Maintenance Work Orders
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([
    {
      id: 'WO-8821',
      turbineId: 'WTG-06',
      taskName: 'Gearbox Filter Replacement & Lidar Re-calibration',
      type: 'Preventive',
      assignedVessel: 'SOV Edda Wind',
      crewCount: 6,
      priority: 'Medium',
      weatherWindow: 'Safe',
      scheduledDate: '2026-07-30 14:00 UTC',
      status: 'In Progress',
      progressPct: 65
    },
    {
      id: 'WO-8824',
      turbineId: 'WTG-07',
      taskName: 'High-Temp Bearing Inspection & Hydraulic Flush',
      type: 'Corrective',
      assignedVessel: 'CTV Seacat Weatherly',
      crewCount: 4,
      priority: 'High',
      weatherWindow: 'Safe',
      scheduledDate: '2026-07-31 08:30 UTC',
      status: 'Scheduled',
      progressPct: 0
    },
    {
      id: 'WO-8829',
      turbineId: 'WTG-11',
      taskName: 'Blade Root Pitch Actuator Replacement (Crane Ops)',
      type: 'Corrective',
      assignedVessel: 'HLV Cadeler Wind Osprey',
      crewCount: 14,
      priority: 'Critical',
      weatherWindow: 'Marginal',
      scheduledDate: '2026-08-01 06:00 UTC',
      status: 'Pending Vessel',
      progressPct: 0
    },
    {
      id: 'WO-8818',
      turbineId: 'WTG-01',
      taskName: 'SCADA Gateway Firmware Upgrade (Over-The-Air)',
      type: 'Upgrade',
      assignedVessel: 'Remote Telemetry Center',
      crewCount: 0,
      priority: 'Low',
      weatherWindow: 'Safe',
      scheduledDate: '2026-07-29 22:00 UTC',
      status: 'Completed',
      progressPct: 100
    }
  ]);

  // SCADA Alarms
  const [alarms, setAlarms] = useState<ScadaAlarm[]>([
    {
      id: 'ALM-901',
      timestamp: '13:28:14 UTC',
      turbineId: 'WTG-07',
      severity: 'Warning',
      code: 'E-408',
      message: 'Gearbox High Temperature Alert: 78.4°C exceeds 75°C threshold',
      acknowledged: false
    },
    {
      id: 'ALM-902',
      timestamp: '12:45:02 UTC',
      turbineId: 'WTG-04',
      severity: 'Warning',
      code: 'V-201',
      message: 'Nacelle Lateral Vibration Amplitude: 3.8 mm/s elevated',
      acknowledged: true
    },
    {
      id: 'ALM-898',
      timestamp: '09:12:30 UTC',
      turbineId: 'WTG-11',
      severity: 'Critical',
      code: 'P-109',
      message: 'Pitch Hydraulics Loss of Pressure - Emergency Mechanical Feathered',
      acknowledged: true
    },
    {
      id: 'ALM-890',
      timestamp: '06:00:11 UTC',
      turbineId: 'Substation-01',
      severity: 'Advisory',
      code: 'G-002',
      message: 'Statcom Reactive Power Adjustment: +42.1 MVAR Synchronized',
      acknowledged: true
    }
  ]);

  // Live Auto-Refresh Effect
  useEffect(() => {
    if (!isLiveTelemetry) return;

    const interval = setInterval(() => {
      // Jitter wind & power outputs realistically
      setEnvData(prev => {
        const deltaWind = (Math.random() - 0.48) * 0.2;
        const newWind = Math.max(5, Math.min(24, prev.windSpeedMs + deltaWind));
        return {
          ...prev,
          windSpeedMs: Number(newWind.toFixed(1)),
          windKnots: Number((newWind * 1.94384).toFixed(1)),
          gridFrequencyHz: Number((50 + (Math.random() - 0.5) * 0.04).toFixed(2)),
          reactivePowerMvar: Number((42 + (Math.random() - 0.5) * 1.5).toFixed(1))
        };
      });

      setTurbines(prev =>
        prev.map(t => {
          if (t.status === 'offline' || t.status === 'maintenance') return t;
          const powerDelta = (Math.random() - 0.5) * 0.15;
          const newPower = Math.max(0, Math.min(t.capacityMW, t.powerMW + powerDelta));
          return {
            ...t,
            powerMW: Number(newPower.toFixed(2)),
            gearboxTempC: Number((t.gearboxTempC + (Math.random() - 0.5) * 0.1).toFixed(1))
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [isLiveTelemetry]);

  // Farm Calculations
  const totalInstalledMW = currentFarm.capacityMW;
  const activeTurbinesCount = turbines.filter(t => t.status === 'online' || t.status === 'curtailed').length;
  const currentTotalMW = turbines.reduce((sum, t) => sum + t.powerMW, 0) * (currentFarm.capacityMW / (turbines.length * 15));
  const scaledMW = Math.min(totalInstalledMW, Number(currentTotalMW.toFixed(1)));
  const capacityFactor = Number(((scaledMW / totalInstalledMW) * 100).toFixed(1));
  const dailyGwh = ((scaledMW * 24) / 1000).toFixed(2);
  const co2SavedTonnes = Math.round(scaledMW * 24 * 0.72);
  const homesPowered = Math.round(scaledMW * 850);

  // Chart Data Preparation
  const chart24hData = [
    { time: '00:00', windSpeedMs: 12.1, powerMW: 820, targetMW: 1200, waveM: 1.8 },
    { time: '03:00', windSpeedMs: 13.4, powerMW: 940, targetMW: 1200, waveM: 2.0 },
    { time: '06:00', windSpeedMs: 14.2, powerMW: 1010, targetMW: 1200, waveM: 2.2 },
    { time: '09:00', windSpeedMs: 15.0, powerMW: 1090, targetMW: 1200, waveM: 2.5 },
    { time: '12:00', windSpeedMs: 14.8, powerMW: 1048, targetMW: 1200, waveM: 2.4 },
    { time: '15:00', windSpeedMs: 15.6, powerMW: 1120, targetMW: 1200, waveM: 2.6 },
    { time: '18:00', windSpeedMs: 16.1, powerMW: 1180, targetMW: 1200, waveM: 2.8 },
    { time: '21:00', windSpeedMs: 14.5, powerMW: 1030, targetMW: 1200, waveM: 2.3 }
  ];

  // Betz Curve comparison data
  const powerCurveData = [
    { wind: 0, theoreticalMW: 0, actualMW: 0 },
    { wind: 3, theoreticalMW: 0.5, actualMW: 0.2 },
    { wind: 6, theoreticalMW: 2.8, actualMW: 2.1 },
    { wind: 9, theoreticalMW: 7.2, actualMW: 6.5 },
    { wind: 12, theoreticalMW: 13.5, actualMW: 12.8 },
    { wind: 15, theoreticalMW: 15.0, actualMW: 15.0 },
    { wind: 18, theoreticalMW: 15.0, actualMW: 15.0 },
    { wind: 21, theoreticalMW: 15.0, actualMW: 15.0 },
    { wind: 25, theoreticalMW: 0, actualMW: 0 } // Cut-out
  ];

  // Anomaly injector action
  const handleInjectAnomaly = () => {
    setTurbines(prev =>
      prev.map(t =>
        t.id === 'WTG-04'
          ? {
              ...t,
              status: 'warning',
              gearboxTempC: 84.2,
              vibrationMms: 5.4,
              healthScore: 58
            }
          : t
      )
    );

    const newAlarm: ScadaAlarm = {
      id: `ALM-${Math.floor(Math.random() * 900 + 100)}`,
      timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
      turbineId: 'WTG-04',
      severity: 'Critical',
      code: 'SYS-ERR-99',
      message: 'Simulated High Vibration & Gearbox Overtemp Triggered',
      acknowledged: false
    };

    setAlarms(prev => [newAlarm, ...prev]);
  };

  const handleAcknowledgeAlarm = (id: string) => {
    setAlarms(prev => prev.map(a => (a.id === id ? { ...a, acknowledged: true } : a)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner
        userPlan={userPlan}
        onOpenPricing={onOpenPricing}
        featureName="Offshore Wind SCADA Telemetry & AI Digital Twin"
      />

      {/* TOP HEADER BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center gap-1">
              <Wind className="w-3.5 h-3.5" /> Offshore Wind SCADA #118
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> LIVE TELEMETRY
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Wind className="w-8 h-8 text-cyan-400" />
            Offshore Wind Farm SCADA Telemetry & Maintenance Center
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-3xl">
            Real-time digital twin monitoring for offshore wind assets: sub-second SCADA metrics, Betz power curve analytics, gear temperature predictive anomalies, and CTV crew transfer logistics.
          </p>
        </div>

        {/* Quick Links & Simulator Toggle */}
        <div className="flex flex-wrap items-center gap-2 z-10">
          {onSelectView && (
            <button
              onClick={() => onSelectView('maritime_simulation_center')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition flex items-center gap-2 shadow"
            >
              <Compass className="w-4 h-4 text-teal-400" />
              Launch Bridge / Engine Simulators
            </button>
          )}

          <button
            onClick={() => setIsLiveTelemetry(!isLiveTelemetry)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 border shadow ${
              isLiveTelemetry
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLiveTelemetry ? 'animate-spin' : ''}`} />
            {isLiveTelemetry ? 'Live Feeds Active' : 'Feed Paused'}
          </button>
        </div>
      </div>

      {/* FARM SELECTOR & ENVIRONMENTAL STRIP */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">Select Asset Site</span>
              <select
                value={selectedFarm}
                onChange={e => setSelectedFarm(e.target.value as any)}
                className="bg-slate-950 border border-slate-700 font-bold text-white text-sm rounded-xl px-3.5 py-1.5 focus:outline-none focus:border-cyan-500"
              >
                <option value="dogger">Dogger Bank South (1,200 MW - GE Haliade-X 15MW)</option>
                <option value="hywind">Hywind Tampen Floating (95 MW - Siemens Gamesa)</option>
                <option value="hornsea">Hornsea Two (1,386 MW - Siemens Gamesa 8MW)</option>
                <option value="vineyard">Vineyard Wind 1 (800 MW - GE Haliade-X 13MW)</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-slate-400 space-y-0.5">
            <p className="font-semibold text-slate-200">{currentFarm.name}</p>
            <p className="font-mono text-[11px]">{currentFarm.location} • Depth: {currentFarm.waterDepth}</p>
          </div>
        </div>

        {/* Live Weather & SCADA Environmental Telemetry Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase flex items-center gap-1 font-mono">
              <Wind className="w-3 h-3 text-cyan-400" /> Wind Speed
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-base font-extrabold font-mono text-cyan-300">{envData.windSpeedMs} m/s</span>
              <span className="text-[11px] text-slate-400 font-mono">{envData.windKnots} kts</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase flex items-center gap-1 font-mono">
              <Compass className="w-3 h-3 text-teal-400" /> Wind Heading
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-base font-extrabold font-mono text-teal-300">{envData.windDirectionDeg}° SW</span>
              <span className="text-[11px] text-emerald-400 font-bold">Optimal</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase flex items-center gap-1 font-mono">
              <Waves className="w-3 h-3 text-sky-400" /> Wave Height (Hs)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-base font-extrabold font-mono text-sky-300">{envData.waveHeightM} m</span>
              <span className="text-[11px] text-slate-400 font-mono">Tp {envData.wavePeriodS}s</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase flex items-center gap-1 font-mono">
              <Thermometer className="w-3 h-3 text-amber-400" /> Sea / Air Temp
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-base font-extrabold font-mono text-amber-300">{envData.seaTempC}°C</span>
              <span className="text-[11px] text-slate-400 font-mono">{envData.airTempC}°C air</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase flex items-center gap-1 font-mono">
              <Zap className="w-3 h-3 text-purple-400" /> Substation Freq
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-base font-extrabold font-mono text-purple-300">{envData.gridFrequencyHz} Hz</span>
              <span className="text-[11px] text-purple-400 font-mono">{envData.reactivePowerMvar} MVAR</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase flex items-center gap-1 font-mono">
              <BarChart3 className="w-3 h-3 text-emerald-400" /> Array Efficiency
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-base font-extrabold font-mono text-emerald-300">{envData.arrayEfficiencyPct}%</span>
              <span className="text-[11px] text-emerald-400 font-bold">Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOP STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Instantaneous Output */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" /> Total Power Output
            </span>
            <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
              {capacityFactor}% Capacity
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono text-white">
              {scaledMW} <span className="text-sm font-normal text-slate-400">MW</span>
            </span>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> / {totalInstalledMW} MW
            </span>
          </div>
          <p className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
            Est. Daily Yield: <span className="text-white font-bold">{dailyGwh} GWh</span>
          </p>
        </div>

        {/* Fleet Availability */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fleet Availability
            </span>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              {activeTurbinesCount}/{turbines.length} Sync
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono text-white">
              {((activeTurbinesCount / turbines.length) * 100).toFixed(1)}%
            </span>
            <span className="text-xs text-slate-400 font-mono">1 Maint / 1 Offline</span>
          </div>
          <p className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
            SCADA Uptime: <span className="text-emerald-400 font-bold">99.4% YTD</span>
          </p>
        </div>

        {/* CO2 Emissions Saved */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Clean Energy Offset
            </span>
            <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
              Today
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono text-white">
              {co2SavedTonnes.toLocaleString()} <span className="text-xs text-slate-400 font-normal">tCO₂</span>
            </span>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-0.5">
              +12.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
            Powers approx. <span className="text-white font-bold">{homesPowered.toLocaleString()} homes</span>
          </p>
        </div>

        {/* Active SCADA Alarms */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Active SCADA Alarms
            </span>
            <button
              onClick={handleInjectAnomaly}
              className="text-[10px] font-mono bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 px-2 py-0.5 rounded border border-rose-500/30 transition"
              title="Inject simulated anomaly"
            >
              Simulate Alarm
            </button>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono text-rose-400">
              {alarms.filter(a => !a.acknowledged).length} <span className="text-xs text-slate-400 font-normal">Unacked</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">Total {alarms.length}</span>
          </div>
          <p className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
            Priority: <span className="text-amber-400 font-bold">1 High / 1 Warning</span>
          </p>
        </div>
      </div>

      {/* DASHBOARD TAB NAVIGATION */}
      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl transition flex items-center justify-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-cyan-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Farm Generation Telemetry</span>
        </button>

        <button
          onClick={() => setActiveTab('turbines')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl transition flex items-center justify-center gap-2 ${
            activeTab === 'turbines'
              ? 'bg-cyan-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Fleet Turbine Matrix ({turbines.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('maintenance')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl transition flex items-center justify-center gap-2 ${
            activeTab === 'maintenance'
              ? 'bg-cyan-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Maintenance & CTV Logistics ({maintenanceTasks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('alarms')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl transition flex items-center justify-center gap-2 ${
            activeTab === 'alarms'
              ? 'bg-cyan-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>SCADA Alarms ({alarms.filter(a => !a.acknowledged).length})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW CHARTS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart 1: 24h Generation & Wind Speed */}
            <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    24-Hour Farm Generation vs. Wind Speed Profile
                  </h3>
                  <p className="text-xs text-slate-400">
                    Real-time telemetry showing total megawatt generation alongside ambient wind speed & wave height
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
                  {(['1h', '24h', '7d', '30d'] as const).map(tr => (
                    <button
                      key={tr}
                      onClick={() => setTimeRange(tr)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition ${
                        timeRange === tr ? 'bg-slate-800 text-cyan-300' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tr.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chart24hData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="windPowerGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="windSpeedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}MW`} />
                    <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}m/s`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="powerMW"
                      name="Actual Output (MW)"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#windPowerGrad)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="windSpeedMs"
                      name="Wind Speed (m/s)"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Theoretical Betz Curve Comparison */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
              <div>
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    Turbine Betz Power Curve
                  </h3>
                  <p className="text-xs text-slate-400">
                    Actual aerodynamic power extraction vs. Betz limit (59.3%) theoretical max
                  </p>
                </div>

                <div className="h-56 w-full pt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={powerCurveData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="wind" stroke="#64748b" fontSize={10} tickFormatter={v => `${v}m/s`} />
                      <YAxis stroke="#64748b" fontSize={10} tickFormatter={v => `${v}MW`} />
                      <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '10px', fontSize: '11px' }} />
                      <Line type="monotone" dataKey="theoreticalMW" name="Betz Limit (MW)" stroke="#a855f7" strokeDasharray="4 4" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="actualMW" name="Actual WTG Output" stroke="#10b981" strokeWidth={2.5} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300 font-mono">
                  <span>Rated Cut-In Speed:</span>
                  <span className="font-bold text-emerald-400">3.0 m/s</span>
                </div>
                <div className="flex justify-between text-slate-300 font-mono">
                  <span>Rated Capacity Wind:</span>
                  <span className="font-bold text-cyan-400">14.0 m/s</span>
                </div>
                <div className="flex justify-between text-slate-300 font-mono">
                  <span>High Wind Cut-Out:</span>
                  <span className="font-bold text-rose-400">25.0 m/s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fleet Turbine Breakdown Bar Chart */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  Individual Turbine Output Breakdown (WTG-01 to WTG-12)
                </h3>
                <p className="text-xs text-slate-400">
                  Live power production per 15MW turbine unit with status color encoding
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-emerald-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Online</span>
                <span className="flex items-center gap-1 text-cyan-400"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Curtailed</span>
                <span className="flex items-center gap-1 text-amber-400"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Warning</span>
                <span className="flex items-center gap-1 text-rose-400"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Offline/Maint</span>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={turbines} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="id" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} tickFormatter={v => `${v}MW`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '10px', fontSize: '11px' }}
                  />
                  <Bar dataKey="powerMW" name="Power Output (MW)" radius={[4, 4, 0, 0]}>
                    {turbines.map((entry, index) => {
                      let color = '#10b981'; // online
                      if (entry.status === 'curtailed') color = '#06b6d4';
                      if (entry.status === 'warning') color = '#f59e0b';
                      if (entry.status === 'maintenance' || entry.status === 'offline') color = '#f43f5e';
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TURBINES FLEET MATRIX */}
      {activeTab === 'turbines' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-cyan-400" />
                  SCADA Turbine Health & Telemetry Grid
                </h3>
                <p className="text-xs text-slate-400">
                  Detailed sensor readings for all array units. Click any turbine row for deep diagnostic modal.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Total Units: <strong className="text-white">{turbines.length}</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {turbines.map(t => {
                const isWarning = t.status === 'warning';
                const isOffline = t.status === 'offline' || t.status === 'maintenance';
                const isCurtailed = t.status === 'curtailed';

                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTurbine(t)}
                    className={`p-4 rounded-2xl border transition cursor-pointer space-y-3 relative overflow-hidden group hover:scale-[1.01] ${
                      isWarning
                        ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                        : isOffline
                        ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-400'
                        : isCurtailed
                        ? 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-400'
                        : 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-white font-mono">{t.id}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{t.location}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 block">{t.name}</span>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          t.status === 'online'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : isCurtailed
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : isWarning
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>

                    {/* Sensor Telemetry Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800/80 font-mono">
                      <div>
                        <span className="text-slate-500 text-[10px] block">Power Output</span>
                        <span className="font-bold text-white">{t.powerMW} MW <span className="text-[10px] text-slate-400">/ {t.capacityMW}MW</span></span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">Rotor Speed</span>
                        <span className="font-bold text-cyan-300">{t.rotorRpm} RPM</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">Gearbox Temp</span>
                        <span className={`font-bold ${t.gearboxTempC > 75 ? 'text-rose-400 font-extrabold' : 'text-slate-200'}`}>
                          {t.gearboxTempC}°C
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">Pitch / Yaw</span>
                        <span className="font-bold text-slate-300">{t.pitchAngleDeg}° / {t.yawAngleDeg}°</span>
                      </div>
                    </div>

                    {/* Health score bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>AI Diagnostic Health</span>
                        <span className={t.healthScore < 70 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>{t.healthScore}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            t.healthScore >= 90
                              ? 'bg-emerald-500'
                              : t.healthScore >= 70
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${t.healthScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MAINTENANCE & CTV LOGISTICS */}
      {activeTab === 'maintenance' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-cyan-400" />
                  Offshore Maintenance Work Orders & Crew Transfer Vessels (CTV / SOV)
                </h3>
                <p className="text-xs text-slate-400">
                  Scheduled technician deployments, vessel weather window constraints, and offshore maintenance status
                </p>
              </div>

              <button
                onClick={() => {
                  const newWo: MaintenanceTask = {
                    id: `WO-${Math.floor(Math.random() * 9000 + 1000)}`,
                    turbineId: 'WTG-04',
                    taskName: 'Emergency Vibration Sensor Calibration & Gearbox Check',
                    type: 'Corrective',
                    assignedVessel: 'CTV Offshore Express',
                    crewCount: 4,
                    priority: 'High',
                    weatherWindow: 'Safe',
                    scheduledDate: 'Tomorrow 07:00 UTC',
                    status: 'Scheduled',
                    progressPct: 0
                  };
                  setMaintenanceTasks(prev => [newWo, ...prev]);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition flex items-center gap-2 shadow"
              >
                <Wrench className="w-3.5 h-3.5" />
                Schedule New Work Order
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80 uppercase font-mono tracking-wider">
                    <th className="py-3 px-4">WO ID</th>
                    <th className="py-3 px-4">Asset</th>
                    <th className="py-3 px-4">Task Scope</th>
                    <th className="py-3 px-4">Assigned Vessel</th>
                    <th className="py-3 px-4 text-center">Crew</th>
                    <th className="py-3 px-4 text-center">Weather Window</th>
                    <th className="py-3 px-4 text-center">Priority</th>
                    <th className="py-3 px-4 text-right">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {maintenanceTasks.map(wo => (
                    <tr key={wo.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">{wo.id}</td>
                      <td className="py-3.5 px-4 font-mono font-extrabold text-white">{wo.turbineId}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-200 block">{wo.taskName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{wo.type} • {wo.scheduledDate}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300 flex items-center gap-2">
                        <Ship className="w-3.5 h-3.5 text-sky-400" />
                        {wo.assignedVessel}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-300">{wo.crewCount} Techs</td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                            wo.weatherWindow === 'Safe'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : wo.weatherWindow === 'Marginal'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {wo.weatherWindow} (Hs ≤ 2.0m)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                            wo.priority === 'Critical'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : wo.priority === 'High'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {wo.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="space-y-1">
                          <span className="font-mono font-bold text-cyan-300">{wo.progressPct}%</span>
                          <div className="w-20 ml-auto bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-cyan-500 h-full" style={{ width: `${wo.progressPct}%` }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SCADA ALARMS & INCIDENTS */}
      {activeTab === 'alarms' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  SCADA Fault Log & Anomaly Notifications
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time error codes, temperature breaches, and mechanical sensor thresholds
                </p>
              </div>

              <button
                onClick={() => setAlarms(prev => prev.map(a => ({ ...a, acknowledged: true })))}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition"
              >
                Acknowledge All Alarms
              </button>
            </div>

            <div className="space-y-3">
              {alarms.map(alm => (
                <div
                  key={alm.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    alm.severity === 'Critical'
                      ? 'bg-rose-950/30 border-rose-500/40'
                      : alm.severity === 'Warning'
                      ? 'bg-amber-950/30 border-amber-500/40'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        alm.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-400'
                          : alm.severity === 'Warning'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <AlertTriangle className="w-5 h-5" />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 font-mono">
                        <span className="font-bold text-white">{alm.code}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-bold text-cyan-300">{alm.turbineId}</span>
                        <span className="text-slate-500 text-[10px]">{alm.timestamp}</span>
                      </div>
                      <p className="text-slate-200 font-medium">{alm.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {!alm.acknowledged ? (
                      <button
                        onClick={() => handleAcknowledgeAlarm(alm.id)}
                        className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] transition"
                      >
                        Acknowledge SCADA
                      </button>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Acked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL FOR SELECTED TURBINE */}
      {selectedTurbine && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedTurbine(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-black font-mono text-lg">
                {selectedTurbine.id}
              </div>
              <div>
                <h3 className="text-lg font-black text-white">{selectedTurbine.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedTurbine.model} • Location: {selectedTurbine.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Status</span>
                <span className="font-bold uppercase text-cyan-300">{selectedTurbine.status}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Power Output</span>
                <span className="font-bold text-white">{selectedTurbine.powerMW} MW</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Gearbox Temp</span>
                <span className={`font-bold ${selectedTurbine.gearboxTempC > 75 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {selectedTurbine.gearboxTempC}°C
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Nacelle Vibration</span>
                <span className="font-bold text-amber-300">{selectedTurbine.vibrationMms} mm/s</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Rotor Speed</span>
                <span className="font-bold text-cyan-300">{selectedTurbine.rotorRpm} RPM</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Capacity Factor</span>
                <span className="font-bold text-emerald-400">{selectedTurbine.capacityFactorPct}%</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" /> AI Diagnostic Summary
              </span>
              <p className="text-slate-400 leading-relaxed">
                {selectedTurbine.gearboxTempC > 75
                  ? 'High gearbox bearing thermal signature detected (+14.2°C over nominal). Recommended action: inspect lubrication filter and derate output to 80% capacity during high wave states.'
                  : 'All SCADA parameters operating within optimal envelope. Pitch drive actuators response time: 12ms. Grid harmonic distortion: < 0.8%.'}
              </p>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
              <button
                onClick={() => setSelectedTurbine(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs"
              >
                Close Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
