import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Anchor,
  Compass,
  Layers,
  ShieldCheck,
  Flame,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Gauge,
  Thermometer,
  RotateCw,
  Sliders,
  ChevronRight,
  Info
} from 'lucide-react';
import { VesselTwin, GET_SHIP_SYSTEMS, VesselSystemCategory, SystemSubcomponent } from './digitalTwinData';

interface ShipSystemsMonitorProps {
  vessel: VesselTwin;
  isDarkMode?: boolean;
}

export const ShipSystemsMonitor: React.FC<ShipSystemsMonitorProps> = ({
  vessel,
  isDarkMode = true
}) => {
  const systems = GET_SHIP_SYSTEMS(vessel);
  const [selectedSystemId, setSelectedSystemId] = useState<string>('main_engine');
  const [activeSubcomponent, setActiveSubcomponent] = useState<SystemSubcomponent | null>(
    systems[0]?.subcomponents[0] || null
  );

  const currentSystem = systems.find((s) => s.id === selectedSystemId) || systems[0];

  // Cylinder simulation data for Main Engine
  const cylinderPmax = [184.2, 183.9, 185.1, 182.4, 184.8, 183.5, 184.0, 185.3, 184.1, 183.7, 184.6];
  const cylinderExhTemps = [362, 365, 368, 382, 364, 361, 366, 369, 363, 365, 367];

  return (
    <div id="ship-systems-monitor-root" className="space-y-6">
      {/* Top System Tabs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {systems.map((sys) => {
          const isSelected = selectedSystemId === sys.id;
          return (
            <button
              key={sys.id}
              onClick={() => {
                setSelectedSystemId(sys.id);
                setActiveSubcomponent(sys.subcomponents[0]);
              }}
              className={`p-4 rounded-2xl border text-left transition relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-sky-950/60 border-sky-500 ring-1 ring-sky-500/50 shadow-lg shadow-sky-950/50'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">HEALTH</span>
                <span className={`text-xs font-black font-mono ${sys.healthScore > 92 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {sys.healthScore}%
                </span>
              </div>
              <h4 className="font-bold text-xs text-white mt-2 truncate">{sys.name}</h4>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full ${sys.healthScore > 92 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${sys.healthScore}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected System Deep Dive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Subcomponent Telemetry & Sensor Points */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-bold border border-sky-500/30">
                    REAL-TIME SENSOR STREAM
                  </span>
                  <span className="text-xs text-slate-400">Modbus TCP & NMEA 2000 Gateway</span>
                </div>
                <h3 className="font-black text-lg text-white mt-1">{currentSystem.name}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5 font-mono">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  Live Sync 100ms
                </span>
              </div>
            </div>

            {/* Subcomponents List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentSystem.subcomponents.map((sub, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveSubcomponent(sub)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                    activeSubcomponent?.name === sub.name
                      ? 'bg-slate-950 border-sky-500 ring-1 ring-sky-500/40 shadow-md'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 truncate max-w-[200px]">{sub.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      sub.status === 'Normal' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {sub.status}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-mono font-black text-white">{sub.value}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{sub.metric}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <span>Health: <strong className="text-white font-mono">{sub.healthPct}%</strong></span>
                    <span>Anomaly Risk: <strong className={sub.anomalyScore > 10 ? 'text-amber-400' : 'text-emerald-400'}>{sub.anomalyScore}%</strong></span>
                  </div>
                </div>
              ))}
            </div>

            {/* If Main Engine is selected: Show interactive 11-Cylinder Balancing Chart */}
            {selectedSystemId === 'main_engine' && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-sky-400" />
                    Cylinder-by-Cylinder Combustion Balancing (Units 1 - 11)
                  </h4>
                  <span className="text-slate-400 font-mono text-[11px]">Nominal Pmax: 185.0 bar</span>
                </div>

                <div className="grid grid-cols-11 gap-1.5 items-end h-28 pt-4">
                  {cylinderPmax.map((pmax, cIdx) => {
                    const isUnit4 = cIdx === 3;
                    const heightPct = ((pmax - 170) / (190 - 170)) * 100;
                    return (
                      <div key={cIdx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                        <span className={`text-[9px] font-mono font-bold ${isUnit4 ? 'text-amber-400' : 'text-slate-400'}`}>
                          {pmax}
                        </span>
                        <div className="w-full bg-slate-800 rounded-t-lg h-full max-h-20 flex items-end overflow-hidden">
                          <div
                            className={`w-full rounded-t-lg transition-all ${
                              isUnit4 ? 'bg-gradient-to-t from-amber-600 to-amber-400' : 'bg-gradient-to-t from-sky-600 to-sky-400'
                            }`}
                            style={{ height: `${heightPct}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-mono ${isUnit4 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                          #{cIdx + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Diagnostics & Telemetry Inspector */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              Digital Twin AI Component Inspector
            </h4>

            {activeSubcomponent ? (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] text-slate-400 block font-mono">SELECTED TELEMETRY NODE</span>
                  <div className="font-bold text-sm text-white">{activeSubcomponent.name}</div>
                  <div className="text-xl font-mono font-black text-sky-400">{activeSubcomponent.value}</div>
                  <div className="text-slate-400">{activeSubcomponent.metric}</div>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-400 font-medium block">Condition Analysis:</span>
                  <p className="text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {activeSubcomponent.recommendation ||
                      `Telemetry signals for ${activeSubcomponent.name} are behaving within the 99.7% Gaussian confidence interval. No sensor drift or mechanical cavitation detected.`}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-1">
                  <span className="font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ISO 13374 Condition Monitoring
                  </span>
                  <p className="text-[11px] text-emerald-400/90">
                    Continuous vibration and thermal trend logging verified. Data ready for Class Society digital survey credit.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 text-center py-8">
                Select a subcomponent to inspect telemetry and AI diagnostics.
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
            <h5 className="font-bold text-xs text-white">System Operations</h5>
            <button className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center justify-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-sky-400" />
              <span>Calibrate Sensor Baseline</span>
            </button>
            <button className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition flex items-center justify-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Run Automated Diagnostic Sweep</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
