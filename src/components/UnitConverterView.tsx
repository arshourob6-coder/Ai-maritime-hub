import React, { useState } from 'react';
import {
  Calculator,
  ArrowRightLeft,
  Gauge,
  Zap,
  CheckCircle2,
  Sliders,
  Flame,
  Scale
} from 'lucide-react';

export const UnitConverterView: React.FC = () => {
  const [speedKnots, setSpeedKnots] = useState(18.5);
  const [powerKw, setPowerKw] = useState(12000);
  const [pressureBar, setPressureBar] = useState(180);
  const [weightDwt, setWeightDwt] = useState(50000);

  // Speed Conversions
  const speedMps = (speedKnots * 0.514444).toFixed(2);
  const speedKmh = (speedKnots * 1.852).toFixed(2);

  // Power Conversions
  const powerBhp = (powerKw * 1.34102).toFixed(0);
  const powerMw = (powerKw / 1000).toFixed(2);

  // Pressure Conversions
  const pressureKpa = (pressureBar * 100).toFixed(0);
  const pressurePsi = (pressureBar * 14.5038).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold">
            <Calculator className="w-3.5 h-3.5 text-indigo-400" /> Maritime & Offshore Engineering Utilities
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">Engineering Unit Converter</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Instant unit conversions for maritime speed (knots, m/s), shaft power (kW, BHP, MW), cylinder pressure (bar, psi, kPa), viscosity (cSt), and vessel tonnage (DWT, GT, LDT, TEU).
          </p>
        </div>
      </div>

      {/* Grid of Converters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Speed Converter */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Gauge className="w-5 h-5 text-sky-400" /> Ship Speed Conversion
            </h3>
            <span className="text-xs font-mono text-sky-400">Hydrodynamics</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Speed in Knots (kn)</label>
              <input
                type="number"
                value={speedKnots}
                onChange={(e) => setSpeedKnots(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 font-mono text-sm font-bold outline-none focus:border-sky-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Meters / Second (m/s)</span>
                <span className="text-lg font-bold text-emerald-400">{speedMps} m/s</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Kilometers / Hour (km/h)</span>
                <span className="text-lg font-bold text-sky-400">{speedKmh} km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shaft Power Converter */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" /> Main Engine Shaft Power
            </h3>
            <span className="text-xs font-mono text-amber-400">Thermodynamics</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Power in Kilowatts (kW)</label>
              <input
                type="number"
                value={powerKw}
                onChange={(e) => setPowerKw(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 font-mono text-sm font-bold outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Brake Horsepower (BHP)</span>
                <span className="text-lg font-bold text-amber-400">{Number(powerBhp).toLocaleString()} BHP</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Megawatts (MW)</span>
                <span className="text-lg font-bold text-emerald-400">{powerMw} MW</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
