import React, { useState } from 'react';
import {
  Anchor,
  Zap,
  Activity,
  Ship,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Gauge
} from 'lucide-react';
import { SMART_PORTS, PortTerminalTwin } from './digitalTwinData';

interface SmartPortDigitalTwinProps {
  isDarkMode?: boolean;
}

export const SmartPortDigitalTwin: React.FC<SmartPortDigitalTwinProps> = ({
  isDarkMode = true
}) => {
  const [selectedPortId, setSelectedPortId] = useState<string>('port-1');
  const currentPort = SMART_PORTS.find((p) => p.id === selectedPortId) || SMART_PORTS[0];

  // Dynamic simulation states
  const [simulatedShorePowerMW, setSimulatedShorePowerMW] = useState<number>(currentPort.shorePowerUtilizedMW);

  const co2SavedTodayTons = (simulatedShorePowerMW * 5.7).toFixed(1);

  return (
    <div id="smart-port-digital-twin-root" className="space-y-6">
      
      {/* Port Terminal Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SMART_PORTS.map((port) => {
          const isSelected = selectedPortId === port.id;
          return (
            <button
              key={port.id}
              onClick={() => {
                setSelectedPortId(port.id);
                setSimulatedShorePowerMW(port.shorePowerUtilizedMW);
              }}
              className={`p-5 rounded-3xl border text-left transition flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-sky-950/60 border-sky-500 ring-1 ring-sky-500/50 shadow-xl'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">{port.country}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  {port.activeVessels} / {port.berthsCount} BERTHS OCCUPIED
                </span>
              </div>

              <div>
                <h4 className="font-bold text-base text-white">{port.name}</h4>
                <p className="text-xs text-slate-400">Automated Guided Vehicles (AGVs) & Shore Power Integrated</p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/60 font-mono">
                <span>STS Crane: {port.craneProductivityMovesHr} moves/hr</span>
                <span className="text-sky-400 font-bold">Congestion: {port.congestionIndex}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Real-time Port KPIs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-medium">Tidal Water Window</span>
          <div className="text-xl font-mono font-black text-white">+{currentPort.tideHeightM}m <span className="text-xs font-sans text-slate-400">High Tide</span></div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3" /> Max Draught: {currentPort.berthDepthM}m
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-medium">STS Crane Productivity</span>
          <div className="text-xl font-mono font-black text-sky-400">{currentPort.craneProductivityMovesHr} <span className="text-xs font-sans text-slate-400">moves/hr</span></div>
          <span className="text-[10px] text-slate-400 font-mono">Automated Dual-Trolley</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-medium">Yard Stacking Density</span>
          <div className="text-xl font-mono font-black text-amber-400">{currentPort.yardOccupancyPct}% <span className="text-xs font-sans text-slate-400">Capacity</span></div>
          <span className="text-[10px] text-slate-400 font-mono">Dwell Time: 3.2 Days</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-medium">Cold Ironing CO2 Saved</span>
          <div className="text-xl font-mono font-black text-emerald-400">{co2SavedTodayTons} <span className="text-xs font-sans text-slate-400">t CO2/day</span></div>
          <span className="text-[10px] text-emerald-400 font-mono">{simulatedShorePowerMW} MW Clean Grid</span>
        </div>
      </div>

      {/* Dynamic Berth Allocation & Cold Ironing Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Dynamic Berth Map & Vessel Queue */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Anchor className="w-4 h-4 text-sky-400" />
              Dynamic Berth Allocation & VTS Traffic Schedule
            </h4>
            <span className="text-xs font-mono text-emerald-400">
              {currentPort.waitingVesselsQueue} Vessels in Anchorage Queue
            </span>
          </div>

          {/* Simulated Berth Matrix */}
          <div className="space-y-3">
            {[
              { berth: 'Quay Berth 41', vessel: 'MV Polaris Enterprise (Container 15k TEU)', status: 'Discharging STS #1-4', etd: '18:40 UTC', power: '6.6 kV Shore Power Synced' },
              { berth: 'Quay Berth 42', vessel: 'CMA CGM Palais (Container 23k TEU)', status: 'Bunkering Bio-LNG', etd: '22:15 UTC', power: '11 kV High Voltage Active' },
              { berth: 'Quay Berth 43', vessel: 'MT Nordic Spirit (Crane Tanker)', status: 'Departing Maneuver', etd: '14:00 UTC', power: 'Disconnected' }
            ].map((b, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-sky-400 font-bold">{b.berth}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      {b.status}
                    </span>
                  </div>
                  <h5 className="font-bold text-xs text-white mt-1">{b.vessel}</h5>
                  <span className="text-[10px] text-slate-400 block">{b.power}</span>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-slate-300 block">ETD: {b.etd}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Tug Escort Reserved</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Shore Power & Port Energy Manager */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              High Voltage Shore Connection (HVSC)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time cold ironing microgrid load management. Supplying 6.6 kV / 11 kV clean green shore power to berthed ships with zero aux engine emissions.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Grid Capacity:</span>
                <strong className="text-white font-mono">{currentPort.shorePowerCapacityMW} MW</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Utilized Cold Ironing:</span>
                <strong className="text-emerald-400 font-mono text-sm">{simulatedShorePowerMW} MW</strong>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(simulatedShorePowerMW / currentPort.shorePowerCapacityMW) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition">
            Optimize Port Microgrid Energy
          </button>
        </div>

      </div>
    </div>
  );
};
