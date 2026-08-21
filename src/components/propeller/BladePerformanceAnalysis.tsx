import React, { useState, useMemo } from 'react';
import {
  ShipParticulars,
  PropellerType,
  RadialSectionGeometry,
} from '../../types/propeller';
import { calculateWageningenKTKQ } from '../../utils/propellerMath';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';
import {
  Activity,
  Sliders,
  Zap,
  TrendingUp,
  RotateCw,
  Download,
  Info,
  Layers,
  Compass,
  Gauge,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface BladePerformanceAnalysisProps {
  ship: ShipParticulars;
  numBlades: number;
  diameterM: number;
  pitchRatio: number;
  expandedAreaRatio: number;
  propellerType: PropellerType;
  radialGeometry: RadialSectionGeometry[];
}

export const BladePerformanceAnalysis: React.FC<BladePerformanceAnalysisProps> = ({
  ship,
  numBlades: initialBlades,
  diameterM: initialDiameter,
  pitchRatio: initialPitchRatio,
  expandedAreaRatio: initialEAR,
  propellerType,
  radialGeometry,
}) => {
  // Interactive Tunable State Parameters
  const [pitchRatio, setPitchRatio] = useState<number>(initialPitchRatio);
  const [expandedAreaRatio, setExpandedAreaRatio] = useState<number>(initialEAR);
  const [numBlades, setNumBlades] = useState<number>(initialBlades);
  const [diameterM, setDiameterM] = useState<number>(initialDiameter);
  const [shaftRpm, setShaftRpm] = useState<number>(ship.shaftRpm || 105);
  const [serviceSpeedKnots, setServiceSpeedKnots] = useState<number>(ship.serviceSpeedKnots || 18.5);
  const [wakeFraction, setWakeFraction] = useState<number>(ship.wakeFraction || 0.22);

  // Active Chart View
  const [activeChartView, setActiveChartView] = useState<
    'openwater_kt_kq' | 'dimensional_power' | 'radial_thrust_distribution' | 'slip_attack_angle'
  >('openwater_kt_kq');

  // Selected Advance Ratio for detailed operating point inspection
  const [selectedJ, setSelectedJ] = useState<number | null>(null);

  // Calculate Advance Speed Va (m/s)
  const V_ms = serviceSpeedKnots * 0.514444;
  const Va_ms = V_ms * (1 - wakeFraction);
  const n_rps = shaftRpm / 60;
  const rho = ship.waterDensity || 1025;

  // Real Operating Advance Ratio J_op
  const J_operating = useMemo(() => {
    if (n_rps <= 0 || diameterM <= 0) return 0.6;
    return Number((Va_ms / (n_rps * diameterM)).toFixed(3));
  }, [Va_ms, n_rps, diameterM]);

  // Current inspected J (defaults to J_operating if null)
  const activeJ = selectedJ !== null ? selectedJ : J_operating;

  // Generate Open Water Characteristic Curves data (J = 0 to 1.3)
  const openWaterData = useMemo(() => {
    const points = [];
    const stepCount = 26;
    const maxJ = Math.min(1.4, Math.max(1.1, pitchRatio * 1.25));

    for (let i = 0; i <= stepCount; i++) {
      const J = Number(((maxJ * i) / stepCount).toFixed(3));
      const { KT, KQ, eta0 } = calculateWageningenKTKQ(J, pitchRatio, expandedAreaRatio, numBlades);

      // Hydrodynamic thrust and torque calculation
      const thrust_N = KT * rho * Math.pow(n_rps, 2) * Math.pow(diameterM, 4);
      const torque_Nm = KQ * rho * Math.pow(n_rps, 2) * Math.pow(diameterM, 5);
      const thrust_kN = Number((thrust_N / 1000).toFixed(2));
      const torque_kNm = Number((torque_Nm / 1000).toFixed(2));
      const power_kW = Number(((2 * Math.PI * n_rps * torque_Nm) / 1000).toFixed(1));

      // Apparent slip ratio (%)
      const slipPercent = pitchRatio > 0 ? Number((((pitchRatio - J) / pitchRatio) * 100).toFixed(1)) : 0;

      // Hydrodynamic Pitch angle at 0.7R (deg)
      const beta07_rad = Math.atan(J / (Math.PI * 0.7));
      const beta07_deg = Number(((beta07_rad * 180) / Math.PI).toFixed(1));

      // Geometric Pitch angle at 0.7R (deg)
      const phi07_rad = Math.atan(pitchRatio / (Math.PI * 0.7));
      const phi07_deg = Number(((phi07_rad * 180) / Math.PI).toFixed(1));
      const alpha07_deg = Number((phi07_deg - beta07_deg).toFixed(1));

      points.push({
        J,
        KT: Number(KT.toFixed(4)),
        KQ: Number(KQ.toFixed(5)),
        KQ10: Number((10 * KQ).toFixed(4)),
        eta0Percent: Number((eta0 * 100).toFixed(1)),
        thrust_kN: Math.max(0, thrust_kN),
        torque_kNm: Math.max(0, torque_kNm),
        power_kW: Math.max(0, power_kW),
        slipPercent: Math.max(-20, Math.min(100, slipPercent)),
        beta07_deg,
        alpha07_deg,
      });
    }
    return points;
  }, [pitchRatio, expandedAreaRatio, numBlades, diameterM, n_rps, rho]);

  // Find Peak Efficiency Point
  const peakEfficiencyPoint = useMemo(() => {
    let maxEta = 0;
    let bestPoint = openWaterData[0];
    openWaterData.forEach((pt) => {
      if (pt.eta0Percent > maxEta) {
        maxEta = pt.eta0Percent;
        bestPoint = pt;
      }
    });
    return bestPoint;
  }, [openWaterData]);

  // Performance at Active J
  const activePerformance = useMemo(() => {
    const { KT, KQ, eta0 } = calculateWageningenKTKQ(activeJ, pitchRatio, expandedAreaRatio, numBlades);
    const thrust_N = KT * rho * Math.pow(n_rps, 2) * Math.pow(diameterM, 4);
    const torque_Nm = KQ * rho * Math.pow(n_rps, 2) * Math.pow(diameterM, 5);
    const power_kW = (2 * Math.PI * n_rps * torque_Nm) / 1000;
    const slipPercent = pitchRatio > 0 ? ((pitchRatio - activeJ) / pitchRatio) * 100 : 0;

    return {
      J: activeJ,
      KT: Number(KT.toFixed(4)),
      KQ: Number(KQ.toFixed(5)),
      eta0Percent: Number((eta0 * 100).toFixed(1)),
      thrust_kN: Number((thrust_N / 1000).toFixed(1)),
      torque_kNm: Number((torque_Nm / 1000).toFixed(2)),
      power_kW: Number(power_kW.toFixed(1)),
      slipPercent: Number(slipPercent.toFixed(1)),
    };
  }, [activeJ, pitchRatio, expandedAreaRatio, numBlades, diameterM, n_rps, rho]);

  // Radial Thrust Distribution Data across stations 0.2R to 1.0R
  const radialLoadingData = useMemo(() => {
    return radialGeometry.map((sec) => {
      const r_R = sec.radiusFraction;
      const localJ = activeJ * (r_R / 0.7);
      const localChord = (Math.PI * diameterM * expandedAreaRatio) / (numBlades * 1.5) * (1 - Math.pow(r_R - 0.7, 2));
      
      // Sectional dKT/dr approximation
      const dKT_dr = 4 * activePerformance.KT * r_R * Math.pow(1 - r_R, 0.5);
      const dKQ_dr = 4 * activePerformance.KQ * r_R * Math.pow(1 - r_R, 0.5);

      const localBetaDeg = (Math.atan(activeJ / (Math.PI * Math.max(0.1, r_R))) * 180) / Math.PI;
      const localPitchDeg = (Math.atan(pitchRatio / (Math.PI * Math.max(0.1, r_R))) * 180) / Math.PI;
      const localAlphaDeg = localPitchDeg - localBetaDeg;

      return {
        r_R: Number(r_R.toFixed(2)),
        radiusM: Number((sec.radiusFraction * (diameterM / 2)).toFixed(3)),
        chordM: Number(localChord.toFixed(3)),
        dKT_dr: Number(dKT_dr.toFixed(3)),
        dKQ_dr: Number((dKQ_dr * 10).toFixed(3)),
        localAlphaDeg: Number(localAlphaDeg.toFixed(1)),
        localBetaDeg: Number(localBetaDeg.toFixed(1)),
      };
    });
  }, [radialGeometry, activeJ, pitchRatio, diameterM, expandedAreaRatio, numBlades, activePerformance]);

  // Reset parameters to initial design values
  const handleResetParameters = () => {
    setPitchRatio(initialPitchRatio);
    setExpandedAreaRatio(initialEAR);
    setNumBlades(initialBlades);
    setDiameterM(initialDiameter);
    setShaftRpm(ship.shaftRpm || 105);
    setServiceSpeedKnots(ship.serviceSpeedKnots || 18.5);
    setWakeFraction(ship.wakeFraction || 0.22);
    setSelectedJ(null);
  };

  // CSV Export
  const handleExportCSV = () => {
    let csv = 'Advance_Ratio_J,Thrust_Coeff_KT,Torque_Coeff_KQ,10_KQ,Efficiency_eta0_pct,Thrust_kN,Torque_kNm,Delivered_Power_kW,Slip_pct\n';
    openWaterData.forEach((row) => {
      csv += `${row.J},${row.KT},${row.KQ},${row.KQ10},${row.eta0Percent},${row.thrust_kN},${row.torque_kNm},${row.power_kW},${row.slipPercent}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Blade_Performance_KT_KQ_J_${diameterM.toFixed(2)}m_P${pitchRatio}.csv`;
    link.click();
  };

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              Hydrodynamic Performance Analyzer
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-semibold border border-slate-700">
              Wageningen B-Series & ITTC 1978 Standard
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5 pt-1.5">
            <Activity className="w-6 h-6 text-cyan-400" />
            Blade Hydrodynamic Performance Analysis (K_T, K_Q, η_0 vs J)
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Interactive open water characteristic curves, dimensional power metrics, and sectional radial thrust distribution.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleResetParameters}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700"
            title="Reset to optimized design defaults"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            Reset Design
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-cyan-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Metric Highlights Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[11px] font-medium block">Advance Ratio (J)</span>
          <div className="text-lg font-black text-cyan-400 flex items-center gap-1.5">
            {activePerformance.J.toFixed(3)}
            {Math.abs(activePerformance.J - J_operating) < 0.01 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                SERVICE
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-500 block">J = V_a / (n · D)</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[11px] font-medium block">Thrust Coeff (K_T)</span>
          <div className="text-lg font-black text-sky-400">
            {activePerformance.KT.toFixed(4)}
          </div>
          <span className="text-[10px] text-slate-500 block">T / (ρ · n² · D⁴)</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[11px] font-medium block">Torque Coeff (10·K_Q)</span>
          <div className="text-lg font-black text-amber-400">
            {(activePerformance.KQ * 10).toFixed(4)}
          </div>
          <span className="text-[10px] text-slate-500 block">K_Q = {activePerformance.KQ.toFixed(5)}</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[11px] font-medium block">Efficiency (η_0)</span>
          <div className="text-lg font-black text-emerald-400 flex items-center gap-1">
            {activePerformance.eta0Percent}%
            <span className="text-[10px] text-slate-400 font-normal">(Max: {peakEfficiencyPoint.eta0Percent}%)</span>
          </div>
          <span className="text-[10px] text-slate-500 block">η_0 = J·K_T / (2π·K_Q)</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[11px] font-medium block">Developed Thrust</span>
          <div className="text-lg font-black text-indigo-400">
            {activePerformance.thrust_kN} <span className="text-xs font-semibold">kN</span>
          </div>
          <span className="text-[10px] text-slate-500 block">Torque: {activePerformance.torque_kNm} kNm</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[11px] font-medium block">Delivered Power</span>
          <div className="text-lg font-black text-rose-400">
            {activePerformance.power_kW} <span className="text-xs font-semibold">kW</span>
          </div>
          <span className="text-[10px] text-slate-500 block">Apparent Slip: {activePerformance.slipPercent}%</span>
        </div>
      </div>

      {/* Preset Operating Conditions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-2.5 rounded-2xl border border-slate-800 text-xs">
        <span className="text-slate-400 font-bold px-2 flex items-center gap-1.5">
          <Gauge className="w-4 h-4 text-cyan-400" />
          Operating Condition Presets:
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedJ(J_operating)}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              selectedJ === J_operating || selectedJ === null
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Service Speed (J = {J_operating})
          </button>
          <button
            onClick={() => setSelectedJ(0.0)}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              selectedJ === 0.0
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Bollard Pull (J = 0.0)
          </button>
          <button
            onClick={() => setSelectedJ(Number((J_operating * 0.55).toFixed(2)))}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              selectedJ === Number((J_operating * 0.55).toFixed(2))
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Heavy Towing / Trawling (J = {(J_operating * 0.55).toFixed(2)})
          </button>
          <button
            onClick={() => setSelectedJ(peakEfficiencyPoint.J)}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              selectedJ === peakEfficiencyPoint.J
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Peak Efficiency Point (J = {peakEfficiencyPoint.J})
          </button>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        {/* Chart View Selector Sub-Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveChartView('openwater_kt_kq')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeChartView === 'openwater_kt_kq'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Open Water Curves (K_T, 10·K_Q, η_0)
            </button>

            <button
              onClick={() => setActiveChartView('dimensional_power')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeChartView === 'dimensional_power'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Dimensional Thrust & Power (kN, kW)
            </button>

            <button
              onClick={() => setActiveChartView('radial_thrust_distribution')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeChartView === 'radial_thrust_distribution'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Radial Load Distribution (dK_T/dr)
            </button>

            <button
              onClick={() => setActiveChartView('slip_attack_angle')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeChartView === 'slip_attack_angle'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Slip & Hydrodynamic Angles
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-semibold bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
            Selected J = <strong className="text-cyan-400">{activeJ.toFixed(2)}</strong>
          </div>
        </div>

        {/* 1. Open Water Characteristic Diagram (KT, 10*KQ, eta0 vs J) */}
        {activeChartView === 'openwater_kt_kq' && (
          <div className="space-y-2">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={openWaterData} margin={{ top: 20, right: 30, left: 10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="J"
                    stroke="#94a3b8"
                    label={{ value: 'Advance Ratio J = Va / (n · D)', position: 'insideBottom', offset: -15, fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#94a3b8"
                    label={{ value: 'Coefficients K_T, 10·K_Q', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#10b981"
                    domain={[0, 100]}
                    label={{ value: 'Open Water Efficiency η_0 (%)', angle: 90, position: 'insideRight', fill: '#10b981', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(val: any, name: string) => {
                      if (name.includes('Efficiency')) return [`${val}%`, name];
                      return [val, name];
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />

                  {/* Reference line for Service Speed operating point */}
                  <ReferenceLine
                    x={J_operating}
                    stroke="#06b6d4"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    yAxisId="left"
                    label={{ value: `Service J=${J_operating}`, fill: '#06b6d4', position: 'top', fontSize: 10 }}
                  />

                  {/* Reference line for Peak Efficiency */}
                  <ReferenceLine
                    x={peakEfficiencyPoint.J}
                    stroke="#10b981"
                    strokeDasharray="3 3"
                    yAxisId="left"
                    label={{ value: `Peak η=${peakEfficiencyPoint.eta0Percent}%`, fill: '#10b981', position: 'insideTopLeft', fontSize: 10 }}
                  />

                  <Line yAxisId="left" type="monotone" dataKey="KT" name="Thrust Coeff K_T" stroke="#38bdf8" strokeWidth={3} dot={{ r: 3 }} />
                  <Line yAxisId="left" type="monotone" dataKey="KQ10" name="10 × Torque Coeff (10·K_Q)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 3 }} />
                  <Line yAxisId="right" type="monotone" dataKey="eta0Percent" name="Open Water Efficiency η_0 (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              Click on points or use the sliders below to inspect specific advance ratios and fine-tune blade parameters.
            </p>
          </div>
        )}

        {/* 2. Dimensional Power & Thrust Chart */}
        {activeChartView === 'dimensional_power' && (
          <div className="space-y-2">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={openWaterData} margin={{ top: 20, right: 30, left: 10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="J"
                    stroke="#94a3b8"
                    label={{ value: 'Advance Ratio J', position: 'insideBottom', offset: -15, fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis yAxisId="left" stroke="#38bdf8" label={{ value: 'Thrust (kN)', angle: -90, position: 'insideLeft', fill: '#38bdf8', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" label={{ value: 'Delivered Power (kW)', angle: 90, position: 'insideRight', fill: '#f43f5e', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />

                  <ReferenceLine x={J_operating} stroke="#06b6d4" strokeDasharray="4 4" yAxisId="left" label={{ value: `Service J`, fill: '#06b6d4', position: 'top', fontSize: 10 }} />

                  <Area yAxisId="left" type="monotone" dataKey="thrust_kN" name="Developed Thrust T (kN)" fill="#0284c7" fillOpacity={0.2} stroke="#38bdf8" strokeWidth={3} />
                  <Area yAxisId="right" type="monotone" dataKey="power_kW" name="Delivered Power P_D (kW)" fill="#be123c" fillOpacity={0.2} stroke="#f43f5e" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-300 pt-1">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span>Bollard Pull Thrust (J=0):</span>
                <strong className="text-cyan-400">{openWaterData[0]?.thrust_kN} kN</strong>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span>Bollard Power Requirement (J=0):</span>
                <strong className="text-rose-400">{openWaterData[0]?.power_kW} kW</strong>
              </div>
            </div>
          </div>
        )}

        {/* 3. Radial Thrust Distribution Across Stations */}
        {activeChartView === 'radial_thrust_distribution' && (
          <div className="space-y-2">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={radialLoadingData} margin={{ top: 20, right: 30, left: 10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="r_R"
                    stroke="#94a3b8"
                    label={{ value: 'Normalized Radial Station (r/R)', position: 'insideBottom', offset: -15, fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis stroke="#94a3b8" label={{ value: 'Sectional Loading Density', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="dKT_dr" name="Thrust Distribution dK_T/d(r/R)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="dKQ_dr" name="10 × Torque Distribution 10·dK_Q/d(r/R)" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              Peak hydrodynamic blade loading typically occurs near 0.70R to 0.75R.
            </p>
          </div>
        )}

        {/* 4. Slip & Angle of Attack Profile */}
        {activeChartView === 'slip_attack_angle' && (
          <div className="space-y-2">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={openWaterData} margin={{ top: 20, right: 30, left: 10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="J"
                    stroke="#94a3b8"
                    label={{ value: 'Advance Ratio J', position: 'insideBottom', offset: -15, fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis yAxisId="left" stroke="#10b981" label={{ value: 'Apparent Slip S (%)', angle: -90, position: 'insideLeft', fill: '#10b981', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" label={{ value: 'Angle of Attack α (deg)', angle: 90, position: 'insideRight', fill: '#f59e0b', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line yAxisId="left" type="monotone" dataKey="slipPercent" name="Apparent Slip Ratio S (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} />
                  <Line yAxisId="right" type="monotone" dataKey="alpha07_deg" name="Angle of Attack at 0.7R α (deg)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls & Tuning Sliders */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            Dynamic Hydrodynamic Parameter Tuning
          </h3>
          <span className="text-[11px] text-slate-400">
            Real-time Wageningen B-Series recalculation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          {/* Pitch Ratio Slider */}
          <div className="space-y-1.5 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between font-bold text-slate-200">
              <span>Pitch-to-Diameter Ratio (P/D)</span>
              <span className="text-cyan-400">{pitchRatio.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.50"
              max="1.50"
              step="0.02"
              value={pitchRatio}
              onChange={(e) => setPitchRatio(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0.50 (Low Pitch)</span>
              <span>1.00</span>
              <span>1.50 (High Pitch)</span>
            </div>
          </div>

          {/* Expanded Area Ratio Slider */}
          <div className="space-y-1.5 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between font-bold text-slate-200">
              <span>Expanded Area Ratio (EAR)</span>
              <span className="text-amber-400">{expandedAreaRatio.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.30"
              max="1.10"
              step="0.02"
              value={expandedAreaRatio}
              onChange={(e) => setExpandedAreaRatio(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0.30 (Narrow)</span>
              <span>0.70</span>
              <span>1.10 (Wide Blade)</span>
            </div>
          </div>

          {/* Number of Blades */}
          <div className="space-y-1.5 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between font-bold text-slate-200">
              <span>Number of Blades (Z)</span>
              <span className="text-emerald-400">{numBlades} Blades</span>
            </div>
            <div className="flex gap-1.5 pt-1">
              {[3, 4, 5, 6, 7].map((z) => (
                <button
                  key={z}
                  onClick={() => setNumBlades(z)}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition ${
                    numBlades === z
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {z}B
                </button>
              ))}
            </div>
          </div>

          {/* Propeller Diameter Slider */}
          <div className="space-y-1.5 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between font-bold text-slate-200">
              <span>Propeller Diameter (D)</span>
              <span className="text-cyan-400">{diameterM.toFixed(2)} m</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.10"
              value={diameterM}
              onChange={(e) => setDiameterM(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1.0 m</span>
              <span>5.0 m</span>
              <span>10.0 m</span>
            </div>
          </div>

          {/* Shaft Speed RPM Slider */}
          <div className="space-y-1.5 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between font-bold text-slate-200">
              <span>Shaft RPM (n)</span>
              <span className="text-indigo-400">{shaftRpm} RPM</span>
            </div>
            <input
              type="range"
              min="50"
              max="1500"
              step="10"
              value={shaftRpm}
              onChange={(e) => setShaftRpm(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>50 RPM</span>
              <span>500 RPM</span>
              <span>1500 RPM</span>
            </div>
          </div>

          {/* Service Speed Slider */}
          <div className="space-y-1.5 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between font-bold text-slate-200">
              <span>Ship Service Speed (Vs)</span>
              <span className="text-rose-400">{serviceSpeedKnots.toFixed(1)} knots</span>
            </div>
            <input
              type="range"
              min="5.0"
              max="35.0"
              step="0.5"
              value={serviceSpeedKnots}
              onChange={(e) => setServiceSpeedKnots(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>5 kts</span>
              <span>20 kts</span>
              <span>35 kts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
