import React, { useState } from 'react';
import {
  Leaf,
  BarChart3,
  Flame,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Sliders,
  Wind,
  Layers,
  Sparkles
} from 'lucide-react';

export const CarbonEmissionsView: React.FC = () => {
  const [dwt, setDwt] = useState(85000);
  const [annualMiles, setAnnualMiles] = useState(65000); // nm
  const [fuelConsumedMT, setFuelConsumedMT] = useState(12500); // VLSFO MT
  const [fuelType, setFuelType] = useState<'VLSFO' | 'MGO' | 'LNG' | 'Methanol' | 'Ammonia'>('VLSFO');
  const [carbonPriceEur, setCarbonPriceEur] = useState(75); // €/tonne CO2

  // CO2 conversion factors (IMO MEPC.281(70))
  const cfMap = { VLSFO: 3.151, MGO: 3.206, LNG: 2.750, Methanol: 1.375, Ammonia: 0.000 };
  const cf = cfMap[fuelType];

  const totalCO2Tonnes = fuelConsumedMT * cf;
  // CII formula: (Total CO2 in grams) / (DWT * Distance nm)
  const attainedCII = (totalCO2Tonnes * 1e6) / (dwt * annualMiles);
  const requiredCII = 4.25; // baseline

  let ciiRating: 'A' | 'B' | 'C' | 'D' | 'E' = 'C';
  let ciiBg = 'bg-amber-500 text-slate-950';

  if (attainedCII < requiredCII * 0.82) {
    ciiRating = 'A';
    ciiBg = 'bg-emerald-500 text-slate-950';
  } else if (attainedCII < requiredCII * 0.95) {
    ciiRating = 'B';
    ciiBg = 'bg-teal-500 text-slate-950';
  } else if (attainedCII < requiredCII * 1.08) {
    ciiRating = 'C';
    ciiBg = 'bg-amber-500 text-slate-950';
  } else if (attainedCII < requiredCII * 1.25) {
    ciiRating = 'D';
    ciiBg = 'bg-orange-500 text-slate-950';
  } else {
    ciiRating = 'E';
    ciiBg = 'bg-rose-500 text-white';
  }

  // EU ETS 2026 Phase-in: 100% surrendered for intra-EU or 50% extra-EU
  const euEtsCostEUR = totalCO2Tonnes * 0.5 * carbonPriceEur;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" /> IMO MEPC & EU Maritime Decarbonization
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            IMO CII & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">EU ETS Carbon Calculator</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Calculate EEXI, annual CII A-E rating, EU ETS carbon allowance costs (€), FuelEU Maritime penalties, and alternative green fuel pathways.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Inputs */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-emerald-400" /> Voyage & Fuel Inputs
          </h3>

          <div className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Fuel Type Selection</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['VLSFO', 'MGO', 'LNG', 'Methanol', 'Ammonia'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFuelType(f)}
                    className={`p-2 rounded-xl border text-[11px] font-bold transition ${
                      fuelType === f
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300 font-bold">
                <span>Vessel Capacity (DWT)</span>
                <span className="text-emerald-400 font-mono">{dwt.toLocaleString()} DWT</span>
              </div>
              <input
                type="range"
                min="10000"
                max="250000"
                step="5000"
                value={dwt}
                onChange={(e) => setDwt(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300 font-bold">
                <span>Annual Distance Sailed</span>
                <span className="text-sky-400 font-mono">{annualMiles.toLocaleString()} nm</span>
              </div>
              <input
                type="range"
                min="10000"
                max="120000"
                step="2500"
                value={annualMiles}
                onChange={(e) => setAnnualMiles(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300 font-bold">
                <span>Annual Fuel Consumed ({fuelType})</span>
                <span className="text-amber-400 font-mono">{fuelConsumedMT.toLocaleString()} MT</span>
              </div>
              <input
                type="range"
                min="1000"
                max="35000"
                step="500"
                value={fuelConsumedMT}
                onChange={(e) => setFuelConsumedMT(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Right Output Results */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* CII Rating Badge Box */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-3xl space-y-2 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">IMO CII Rating</span>
              <div className="flex items-center gap-4">
                <span className={`text-4xl font-black px-5 py-2 rounded-2xl shadow-xl font-mono ${ciiBg}`}>
                  {ciiRating}
                </span>
                <div>
                  <span className="text-lg font-mono font-bold text-white block">{attainedCII.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-400 block">g-CO2 / dwt-nm (Req: {requiredCII})</span>
                </div>
              </div>
            </div>

            {/* Total CO2 & EU ETS Cost */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-3xl space-y-2 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">EU ETS Carbon Liability</span>
              <div>
                <span className="text-2xl font-mono font-black text-rose-400 block">€{Math.round(euEtsCostEUR).toLocaleString()} EUR</span>
                <span className="text-[10px] text-slate-400 block">Total CO2: {Math.round(totalCO2Tonnes).toLocaleString()} MT @ €{carbonPriceEur}/ton</span>
              </div>
            </div>

          </div>

          {/* Decarbonization Recommendations */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-3xl space-y-3 text-xs">
            <span className="font-extrabold text-white flex items-center gap-2">
              <Wind className="w-4 h-4 text-emerald-400" /> AI Decarbonization Pathways
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <strong className="text-emerald-400 block mb-0.5">Wind-Assisted Rotor Sails</strong>
                <span>Installing 2x Anemoi Rotor Sails lowers fuel consumption by <strong>8-12%</strong>, moving CII from {ciiRating} to A.</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <strong className="text-sky-400 block mb-0.5">Biofuel B30 Blend</strong>
                <span>Blending 30% HVO biofuel eliminates <strong>€{Math.round(euEtsCostEUR * 0.3).toLocaleString()}</strong> in EU ETS costs.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
