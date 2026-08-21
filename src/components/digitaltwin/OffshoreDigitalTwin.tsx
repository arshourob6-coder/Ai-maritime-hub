import React, { useState } from 'react';
import {
  Waves,
  Wind,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Layers,
  Zap,
  CheckCircle2,
  Anchor,
  Compass,
  Sliders,
  RotateCw,
  Search,
  Eye
} from 'lucide-react';
import { OFFSHORE_ASSETS, OffshoreAssetTwin } from './digitalTwinData';

interface OffshoreDigitalTwinProps {
  isDarkMode?: boolean;
}

export const OffshoreDigitalTwin: React.FC<OffshoreDigitalTwinProps> = ({
  isDarkMode = true
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>('offshore-1');
  const [simulatedHs, setSimulatedHs] = useState<number>(3.4); // m
  const [simulatedWindKnots, setSimulatedWindKnots] = useState<number>(24);

  const currentAsset = OFFSHORE_ASSETS.find((a) => a.id === selectedAssetId) || OFFSHORE_ASSETS[0];

  // Dynamic Mooring line calculations based on Hs & wind
  const dynamicTensionMultiplier = 1 + (simulatedHs - 2.0) * 0.12 + (simulatedWindKnots - 15) * 0.008;
  const currentTensions = currentAsset.mooringTensionKN.map((base) =>
    Math.round(base * Math.max(1, dynamicTensionMultiplier))
  );

  return (
    <div id="offshore-digital-twin-root" className="space-y-6">
      
      {/* Asset Selector Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {OFFSHORE_ASSETS.map((asset) => {
          const isSelected = selectedAssetId === asset.id;
          return (
            <button
              key={asset.id}
              onClick={() => {
                setSelectedAssetId(asset.id);
                setSimulatedHs(asset.waveHeightHs);
                setSimulatedWindKnots(asset.windSpeedKn);
              }}
              className={`p-5 rounded-3xl border text-left transition flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-sky-950/60 border-sky-500 ring-1 ring-sky-500/50 shadow-xl'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400">
                  {asset.type}
                </span>
                <span className={`text-xs font-mono font-black ${asset.structuralHealthScore > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {asset.structuralHealthScore}% HEALTH
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white">{asset.name}</h4>
                <p className="text-xs text-slate-400 truncate">{asset.location}</p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/60 font-mono">
                <span>Depth: {asset.waterDepthM}m</span>
                <span className="text-emerald-400 font-bold">{asset.status}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Metocean Environmental Simulator Slider */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <Waves className="w-5 h-5 text-sky-400" />
          <div>
            <span className="font-bold text-white block">Metocean Load Simulator:</span>
            <span className="text-slate-400 text-[11px]">Morison Equation Hydrodynamic Wave & Current Inertia Force</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-slate-400 text-[11px] font-mono">Wave Hs:</span>
            <input
              type="range"
              min="1.0"
              max="12.0"
              step="0.2"
              value={simulatedHs}
              onChange={(e) => setSimulatedHs(Number(e.target.value))}
              className="w-28 accent-sky-500 cursor-pointer"
            />
            <span className="text-sky-400 font-mono font-bold w-12">{simulatedHs}m</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-slate-400 text-[11px] font-mono">Wind:</span>
            <input
              type="range"
              min="10"
              max="65"
              step="1"
              value={simulatedWindKnots}
              onChange={(e) => setSimulatedWindKnots(Number(e.target.value))}
              className="w-28 accent-amber-500 cursor-pointer"
            />
            <span className="text-amber-400 font-mono font-bold w-12">{simulatedWindKnots} kn</span>
          </div>
        </div>
      </div>

      {/* Main Offshore Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mooring System Catenary Line Tensions */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Anchor className="w-4 h-4 text-sky-400" />
              Dynamic Mooring Lines & Fairlead Tensions
            </h4>
            <span className="text-xs font-mono text-slate-400">
              Max Allowable: {currentAsset.maxAllowableTensionKN.toLocaleString()} kN
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currentTensions.map((tension, idx) => {
              const utilPct = currentAsset.maxAllowableTensionKN > 0 ? (tension / currentAsset.maxAllowableTensionKN) * 100 : 0;
              const isHigh = utilPct > 70;
              return (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>LINE #{idx + 1}</span>
                    <span className={isHigh ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                      {utilPct.toFixed(0)}% MBL
                    </span>
                  </div>
                  <div className="text-lg font-mono font-black text-white">{tension.toLocaleString()} <span className="text-xs font-sans text-slate-400">kN</span></div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isHigh ? 'bg-amber-500' : 'bg-sky-500'}`}
                      style={{ width: `${utilPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subsea & Structural Health Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] font-mono">MINER'S FATIGUE DAMAGE (D)</span>
              <span className="text-base font-mono font-black text-amber-400">D = {currentAsset.fatigueDamageIndex}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">S-N Hotspot Curve (Limit 1.0)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] font-mono">ANODE CATHODIC PROTECTION</span>
              <span className="text-base font-mono font-black text-emerald-400">{currentAsset.anodePotentialMV} mV</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Ag/AgCl Reference (Target &lt;-850mV)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] font-mono">SUBSEA RISER STRESS</span>
              <span className="text-base font-mono font-black text-sky-400">118.2 MPa</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">VIV Damping Active</span>
            </div>
          </div>
        </div>

        {/* Offshore Inspection & Autonomous Drone Ops */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Subsea ROV & Drone Inspection Twin
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Virtual survey twin synchronized with subsea acoustic positioning (USBL) and autonomous tetherless ROV scans.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Turret Bearing NDT Survey</span>
                  <span className="text-[10px] text-slate-400">Acoustic Emission Log</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  PASSED
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Splash Zone Pitting Corrosion</span>
                  <span className="text-[10px] text-slate-400">Laser 3D Photogrammetry</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-bold">
                  0.12 mm/yr
                </span>
              </div>
            </div>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            <span>Launch Subsea Digital Twin Viewer</span>
          </button>
        </div>

      </div>
    </div>
  );
};
