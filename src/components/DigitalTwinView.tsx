import React, { useState } from 'react';
import { PlanType } from '../types';
import { SubscriptionBanner } from './SubscriptionBanner';
import {
  Activity,
  Cpu,
  Zap,
  RotateCw,
  Anchor,
  Radio,
  Sliders,
  CheckCircle2,
  TrendingUp,
  Layers,
  Thermometer,
  ShieldAlert,
  Compass,
  Ship,
  Waves,
  Gauge,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

interface DigitalTwinViewProps {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  isDarkMode?: boolean;
}

interface VesselProfile {
  id: string;
  name: string;
  type: string;
  loa: number;
  beam: number;
  draft: number;
  displacement: number;
  engine: string;
  mcrKw: number;
  nominalRpm: number;
  serviceSpeed: number;
}

const FLEET: VesselProfile[] = [
  {
    id: 'twin-01',
    name: 'MV Poseidon Enterprise',
    type: 'Ultra Large Container Vessel (15,500 TEU)',
    loa: 366.5,
    beam: 51.2,
    draft: 15.5,
    displacement: 165000,
    engine: 'MAN B&W 11G95ME-C9.5 (Tier III SCR)',
    mcrKw: 68640,
    nominalRpm: 80,
    serviceSpeed: 21.5
  },
  {
    id: 'twin-02',
    name: 'LNG Arctic Pioneer',
    type: 'LNG Carrier Membrane (174,000 m³)',
    loa: 299.0,
    beam: 46.4,
    draft: 12.0,
    displacement: 122000,
    engine: 'WinGD 2x 5X72DF Dual-Fuel (iCER)',
    mcrKw: 23600,
    nominalRpm: 89,
    serviceSpeed: 19.5
  },
  {
    id: 'twin-03',
    name: 'MT Ocean Titan',
    type: 'VLCC Crude Oil Tanker (318,000 DWT)',
    loa: 333.0,
    beam: 60.0,
    draft: 21.5,
    displacement: 362000,
    engine: 'HYUNDAI-MAN 7G80ME-C9.5',
    mcrKw: 27100,
    nominalRpm: 72,
    serviceSpeed: 14.5
  },
  {
    id: 'twin-04',
    name: 'MV Pacific Frontier',
    type: 'Capesize Bulk Carrier (180,000 DWT)',
    loa: 292.0,
    beam: 45.0,
    draft: 18.2,
    displacement: 205000,
    engine: 'MAN B&W 6S70ME-C8.5',
    mcrKw: 18660,
    nominalRpm: 84,
    serviceSpeed: 14.2
  }
];

export const DigitalTwinView: React.FC<DigitalTwinViewProps> = ({
  userPlan = 'student',
  onOpenPricing,
  isDarkMode = true
}) => {
  const [selectedVessel, setSelectedVessel] = useState<VesselProfile>(FLEET[0]);
  const [throttlePct, setThrottlePct] = useState<number>(80);
  const [seaStateBft, setSeaStateBft] = useState<number>(3);
  const [ballastCondition, setBallastCondition] = useState<'design' | 'scantling' | 'ballast'>('design');
  const [activeTab, setActiveTab] = useState<'hull_stress' | 'engine_telemetry' | 'cbm_alarms'>('hull_stress');

  // Dynamic live calculations
  const loadFactor = throttlePct / 100;
  const currentSpeed = Number((selectedVessel.serviceSpeed * Math.pow(loadFactor, 0.33) - seaStateBft * 0.25).toFixed(1));
  const currentPower = Math.round(selectedVessel.mcrKw * Math.pow(loadFactor, 3));
  const currentRpm = Math.round(selectedVessel.nominalRpm * Math.pow(loadFactor, 0.33));
  const fuelRateTonsDay = Number((currentPower * 0.165 * 24 / 1000 + seaStateBft * 1.2).toFixed(1));
  
  const midshipBendingMNm = Math.round((selectedVessel.displacement * 0.08) * (1 + (seaStateBft / 12)) * 10);
  const maxAllowableMNm = Math.round(midshipBendingMNm * 1.38);
  const stressRatioPct = Math.round((midshipBendingMNm / maxAllowableMNm) * 100);

  const draftFwd = ballastCondition === 'ballast' ? 7.2 : ballastCondition === 'scantling' ? selectedVessel.draft + 0.8 : selectedVessel.draft;
  const draftAft = ballastCondition === 'ballast' ? 9.5 : ballastCondition === 'scantling' ? selectedVessel.draft + 1.1 : selectedVessel.draft + 0.3;
  const trimMeters = Number((draftAft - draftFwd).toFixed(2));
  const gmtIntact = ballastCondition === 'ballast' ? 3.85 : 2.15;

  return (
    <div id="digital-twin-studio-root" className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      
      {/* Subscription Banner */}
      <SubscriptionBanner
        userPlan={userPlan}
        onOpenPricing={onOpenPricing}
        featureName="3D Digital Twin Vessel Telemetry"
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full text-xs font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-400" /> Real-Time Digital Twin Simulation
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> 10 Hz Telemetry Link
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Vessel Hull & Machinery <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">Digital Twin</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Virtual twin synchronized with onboard sensor telemetry, structural FEA bending moments, and hydrodynamic powering curves.
            </p>
          </div>

          {/* Vessel Selector */}
          <div className="flex items-center gap-3 shrink-0">
            <select
              value={selectedVessel.id}
              onChange={(e) => {
                const found = FLEET.find((v) => v.id === e.target.value);
                if (found) setSelectedVessel(found);
              }}
              className="bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-sky-400 shadow-inner"
            >
              {FLEET.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.type})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Real-Time Telemetry Control Board */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-bold text-white">Simulation Controls & Operational Conditions</h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Real-Time Telemetry Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Throttle slider */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold">Main Engine MCR Throttle</span>
              <span className="text-sky-400 font-mono font-bold">{throttlePct}% MCR</span>
            </div>
            <input
              type="range"
              min="40"
              max="105"
              step="1"
              value={throttlePct}
              onChange={(e) => setThrottlePct(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>40% (Dead Slow)</span>
              <span>85% (NCR)</span>
              <span>105% (Max)</span>
            </div>
          </div>

          {/* Sea State */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold">Wave & Sea State</span>
              <span className="text-cyan-400 font-mono font-bold">Beaufort {seaStateBft} (Hs {(seaStateBft * 0.6).toFixed(1)}m)</span>
            </div>
            <input
              type="range"
              min="0"
              max="9"
              step="1"
              value={seaStateBft}
              onChange={(e) => setSeaStateBft(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Bft 0 (Calm)</span>
              <span>Bft 5 (Moderate)</span>
              <span>Bft 9 (Severe Gale)</span>
            </div>
          </div>

          {/* Loading Condition */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold">Loading / Ballast State</span>
              <span className="text-purple-400 font-mono font-bold uppercase">{ballastCondition}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {(['design', 'scantling', 'ballast'] as const).map((cond) => (
                <button
                  key={cond}
                  onClick={() => setBallastCondition(cond)}
                  className={`py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                    ballastCondition === cond
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metric Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Speed Over Ground</span>
            <Ship className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">{currentSpeed} <span className="text-xs font-normal text-slate-400">knots</span></div>
          <p className="text-[11px] text-slate-400">Shaft RPM: <span className="text-sky-300 font-mono font-bold">{currentRpm} RPM</span></p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Shaft Power (BHP)</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{(currentPower / 1000).toFixed(1)} <span className="text-xs font-normal text-slate-400">MW</span></div>
          <p className="text-[11px] text-slate-400">Fuel Rate: <span className="text-amber-300 font-mono font-bold">{fuelRateTonsDay} MT/day</span></p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Midship Bending</span>
            <Activity className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">{midshipBendingMNm} <span className="text-xs font-normal text-slate-400">MN·m</span></div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full ${stressRatioPct > 85 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${stressRatioPct}%` }} />
            </div>
            <span className="text-slate-300 font-mono text-[10px]">{stressRatioPct}%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Draft & Stability</span>
            <Anchor className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">{draftAft}m <span className="text-xs font-normal text-slate-400">Aft</span></div>
          <p className="text-[11px] text-slate-400">Trim: <span className="text-cyan-300 font-mono font-bold">{trimMeters}m</span> • GMt: <span className="text-emerald-300 font-mono font-bold">{gmtIntact}m</span></p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'hull_stress', label: '1. Hull Girder Stress & Hydrostatics', icon: <Waves className="w-4 h-4" /> },
          { id: 'engine_telemetry', label: '2. Main Engine & Machinery Telemetry', icon: <Thermometer className="w-4 h-4" /> },
          { id: 'cbm_alarms', label: '3. Condition-Based Maintenance (CBM)', icon: <ShieldAlert className="w-4 h-4" /> }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === t.id
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Hull Girder Stress */}
      {activeTab === 'hull_stress' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Waves className="w-4 h-4 text-sky-400" />
              Wave Bending Moment Distribution (IACS S11)
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Sagging Bending Moment</span>
                <span className="font-mono font-bold text-sky-300">{midshipBendingMNm} MN·m</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Hogging Bending Moment</span>
                <span className="font-mono font-bold text-emerald-300">{Math.round(midshipBendingMNm * 0.92)} MN·m</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Rule Permissible Still Water BM</span>
                <span className="font-mono font-bold text-slate-200">{maxAllowableMNm} MN·m</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Hull Section Modulus (Zmin)</span>
                <span className="font-mono font-bold text-violet-300">{(selectedVessel.displacement * 0.00032).toFixed(2)} m³</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              Intact Stability & Hydrostatic Parameters
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Draft Forward (Tf)</span>
                <span className="font-mono font-bold text-cyan-300">{draftFwd} m</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Draft Aft (Ta)</span>
                <span className="font-mono font-bold text-cyan-300">{draftAft} m</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Transverse Metacentric Height (GMt)</span>
                <span className="font-mono font-bold text-emerald-300">{gmtIntact} m (IMO Min: 0.15 m)</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Block Coefficient (Cb)</span>
                <span className="font-mono font-bold text-slate-200">{(selectedVessel.displacement / (selectedVessel.loa * selectedVessel.beam * selectedVessel.draft * 1.025)).toFixed(3)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Engine Telemetry */}
      {activeTab === 'engine_telemetry' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Cylinder Exhaust Temps</h4>
            <div className="space-y-2 font-mono text-xs">
              {[1, 2, 3, 4, 5, 6].map((cyl) => (
                <div key={cyl} className="flex justify-between items-center p-2 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">Cylinder #{cyl}</span>
                  <span className="text-emerald-400 font-bold">{360 + cyl * 3 + Math.round(throttlePct * 0.4)}°C</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Scavenge Air & Turbo</h4>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg flex justify-between">
                <span className="text-slate-400">Scavenge Pressure</span>
                <span className="text-sky-300 font-bold">{(1.2 + (throttlePct / 100) * 1.8).toFixed(2)} bar</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg flex justify-between">
                <span className="text-slate-400">Turbocharger Speed</span>
                <span className="text-sky-300 font-bold">{Math.round(8500 + throttlePct * 75)} RPM</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg flex justify-between">
                <span className="text-slate-400">Air Cooler In/Out</span>
                <span className="text-sky-300 font-bold">185°C / 42°C</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg flex justify-between">
                <span className="text-slate-400">Lubricating Oil Press</span>
                <span className="text-emerald-400 font-bold">4.2 bar (Nominal)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Shaftline & Bearing Vibs</h4>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg flex justify-between">
                <span className="text-slate-400">Thrust Bearing Temp</span>
                <span className="text-slate-200 font-bold">58.4°C</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg flex justify-between">
                <span className="text-slate-400">Intermediate Bearing #1</span>
                <span className="text-slate-200 font-bold">52.1°C</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg flex justify-between">
                <span className="text-slate-400">Stern Tube Fwd/Aft</span>
                <span className="text-emerald-400 font-bold">48°C / 54°C</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg flex justify-between">
                <span className="text-slate-400">Vibration Overall RMS</span>
                <span className="text-emerald-400 font-bold">1.4 mm/s (Zone A)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: CBM Alarms */}
      {activeTab === 'cbm_alarms' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            ISO 13374 Condition-Based Monitoring Alarms & Diagnostics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <div className="flex items-center justify-between font-bold text-emerald-400">
                <span>Main Engine Fuel Injection Timing</span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">NORMAL</span>
              </div>
              <p className="text-slate-300">Pmax and Pcomp variance across all cylinders within ±1.8 bar limit.</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <div className="flex items-center justify-between font-bold text-emerald-400">
                <span>Hull Biofouling & Resistance Penalty</span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">CLEAN (+1.2%)</span>
              </div>
              <p className="text-slate-300">ISO 19030 hull speed loss indicates coating is in optimal condition.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span>Auxiliary Engine #2 Generator</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">STANDBY</span>
              </div>
              <p className="text-slate-400">Ready for automated load-sharing upon thruster demand.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span>Shaft Generator (PTO)</span>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded">ENGAGED (1,200 kW)</span>
              </div>
              <p className="text-slate-400">Powering shipboard hotel load directly from 2-stroke shaft.</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
