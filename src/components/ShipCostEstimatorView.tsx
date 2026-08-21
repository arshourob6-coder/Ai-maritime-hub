import React, { useState } from 'react';
import {
  DollarSign,
  Calculator,
  Anchor,
  Wrench,
  BarChart2,
  PieChart,
  Layers,
  Sparkles,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const ShipCostEstimatorView: React.FC = () => {
  const [projectCategory, setProjectCategory] = useState<'newbuild' | 'drydock' | 'retrofit' | 'recycling'>('newbuild');
  const [vesselType, setVesselType] = useState('Container Ship');
  const [dwtTonnes, setDwtTonnes] = useState(50000);
  const [ldtTonnes, setLdtTonnes] = useState(12000);
  const [region, setRegion] = useState('East Asia (China/Korea/Japan)');

  // Calculations
  const scrapPricePerLDT = region.includes('South Asia') ? 520 : 480; // $/ton
  const recyclingScrapValueUSD = ldtTonnes * scrapPricePerLDT;

  const newbuildCostUSD = (dwtTonnes * 1150 * (vesselType.includes('LNG') ? 1.45 : 1.0)).toFixed(0);
  const drydockCostUSD = (ldtTonnes * 42 + 180000).toFixed(0);
  const retrofitCostUSD = (1200000 + ldtTonnes * 35).toFixed(0); // Scrubber + BWTS

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Maritime Financial & CAPEX Engineering Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Shipbuilding & Repair <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Cost Estimator</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Financial modeling for Newbuild Construction, Dry Docking Maintenance, BWTS/Scrubber Retrofitting, and LDT Vessel Scrap Recycling Value.
          </p>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'newbuild', label: 'Newbuild Construction CAPEX', icon: <Anchor className="w-4 h-4" /> },
          { id: 'drydock', label: 'Dry Dock & Special Survey', icon: <Wrench className="w-4 h-4" /> },
          { id: 'retrofit', label: 'BWTS & Scrubber Retrofit', icon: <Layers className="w-4 h-4" /> },
          { id: 'recycling', label: 'LDT Ship Recycling Valuation', icon: <DollarSign className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setProjectCategory(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              projectCategory === tab.id
                ? 'bg-emerald-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Form and Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Inputs */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-emerald-400" /> Vessel Parameters
          </h3>

          <div className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Vessel Type</label>
              <select
                value={vesselType}
                onChange={(e) => setVesselType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 font-bold outline-none focus:border-emerald-400"
              >
                <option>Container Ship</option>
                <option>Oil Tanker (Aframax / VLCC)</option>
                <option>Bulk Carrier (Panamax / Capesize)</option>
                <option>LNG Carrier (Dual Fuel)</option>
                <option>Chemical Tanker</option>
              </select>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300 font-bold">
                <span>Deadweight Tonnage (DWT)</span>
                <span className="text-emerald-400 font-mono">{dwtTonnes.toLocaleString()} DWT</span>
              </div>
              <input
                type="range"
                min="5000"
                max="300000"
                step="5000"
                value={dwtTonnes}
                onChange={(e) => {
                  const dwt = Number(e.target.value);
                  setDwtTonnes(dwt);
                  setLdtTonnes(Math.round(dwt * 0.24));
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300 font-bold">
                <span>Light Displacement Tonnage (LDT)</span>
                <span className="text-sky-400 font-mono">{ldtTonnes.toLocaleString()} LDT</span>
              </div>
              <input
                type="range"
                min="1000"
                max="60000"
                step="500"
                value={ldtTonnes}
                onChange={(e) => setLdtTonnes(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Shipyard / Yard Location</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 font-bold outline-none focus:border-emerald-400"
              >
                <option>East Asia (China/Korea/Japan)</option>
                <option>South Asia (India/Bangladesh/Pakistan - Scrap Yards)</option>
                <option>Europe / Turkey (Specialized / Cruise)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Right Financial Calculation Summary */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-emerald-400 block uppercase font-bold">Estimated Cost Output</span>
            <h3 className="text-3xl font-mono font-black text-white mt-1">
              {projectCategory === 'newbuild' && `$${Number(newbuildCostUSD).toLocaleString()} USD`}
              {projectCategory === 'drydock' && `$${Number(drydockCostUSD).toLocaleString()} USD`}
              {projectCategory === 'retrofit' && `$${Number(retrofitCostUSD).toLocaleString()} USD`}
              {projectCategory === 'recycling' && `$${recyclingScrapValueUSD.toLocaleString()} USD`}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {projectCategory === 'newbuild' && 'Estimated shipyard contract price including steel, main engine, & outfitting.'}
              {projectCategory === 'drydock' && 'Includes hull grit blasting, AF paint, tailshaft pull, sea valve overhaul & class fee.'}
              {projectCategory === 'retrofit' && 'Includes Alfa Laval / Wärtsilä BWTS + Open-Loop Scrubber hardware & installation.'}
              {projectCategory === 'recycling' && `Calculated at $${scrapPricePerLDT}/LDT for ${ldtTonnes.toLocaleString()} LDT.`}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Steel Structural Cost</span>
              <span className="font-mono font-bold text-white text-sm">38.5%</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Main Engine & Propulsion</span>
              <span className="font-mono font-bold text-white text-sm">28.0%</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Shipyard Labor & Profit</span>
              <span className="font-mono font-bold text-white text-sm">33.5%</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
