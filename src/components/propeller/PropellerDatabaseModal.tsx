import React, { useState } from 'react';
import { PropellerDatabaseEntry, PropellerType } from '../../types/propeller';
import { PROPELLER_DATABASE_PRESETS } from '../../utils/propellerMath';
import { Database, Search, ArrowRight, Check, X, Shield, Cpu, Activity } from 'lucide-react';

interface PropellerDatabaseModalProps {
  onSelectPreset: (preset: PropellerDatabaseEntry) => void;
  onClose: () => void;
}

export const PropellerDatabaseModal: React.FC<PropellerDatabaseModalProps> = ({
  onSelectPreset,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [comparedIds, setComparedIds] = useState<string[]>([]);

  const filteredPresets = PROPELLER_DATABASE_PRESETS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.application.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleToggleCompare = (id: string) => {
    if (comparedIds.includes(id)) {
      setComparedIds(comparedIds.filter((item) => item !== id));
    } else {
      if (comparedIds.length >= 3) {
        alert('You can compare up to 3 propellers side by side.');
        return;
      }
      setComparedIds([...comparedIds, id]);
    }
  };

  const comparedItems = PROPELLER_DATABASE_PRESETS.filter((item) => comparedIds.includes(item.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-3xl p-6 space-y-6 max-h-[90vh] overflow-y-auto text-slate-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">10,000+ Propeller Model & Empirical Series Database</h2>
              <p className="text-slate-400 text-xs">
                Wageningen B-Series, Kaplan Kort Nozzles, Gawn Series, CPP, and Commercial Marine Propulsion Database
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by series, vessel type, manufacturer (e.g., 'Wageningen B4-70', 'Tug', 'Icebreaker')..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Series Types</option>
              <option value="Wageningen_B">Wageningen B-Series</option>
              <option value="Ducted_Kort">Kaplan / Kort Nozzle</option>
              <option value="Gawn_Series">Gawn Series (High Speed)</option>
              <option value="CPP">Controllable Pitch (CPP)</option>
              <option value="Ice_Class">Ice Class Propellers</option>
              <option value="Azimuth_Thruster">Azimuth Thruster</option>
              <option value="Contra_Rotating">Contra-Rotating (CRP)</option>
              <option value="Waterjet_Impeller">Waterjet Impeller</option>
            </select>
          </div>
        </div>

        {/* Comparison Drawer if items selected */}
        {comparedItems.length > 0 && (
          <div className="bg-slate-950 p-4 rounded-2xl border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-cyan-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> Side-by-Side Propeller Comparison Mode ({comparedItems.length}/3)
              </span>
              <button
                onClick={() => setComparedIds([])}
                className="text-[11px] text-slate-400 hover:text-rose-400 font-semibold"
              >
                Clear Comparison
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {comparedItems.map((item) => (
                <div key={item.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-xs truncate">{item.name}</div>
                  <div className="text-[11px] text-cyan-300">
                    D = {item.diameterM}m | Z = {item.numBlades} | P/D = {item.pitchRatio}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-bold">Efficiency: {item.openWaterEfficiency}%</div>
                  <button
                    onClick={() => {
                      onSelectPreset(item);
                      onClose();
                    }}
                    className="w-full mt-2 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
                  >
                    Apply to Workspace
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Database Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPresets.map((item) => {
            const isCompared = comparedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-white">{item.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20 shrink-0">
                      {item.type}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs">
                    Application: <span className="text-slate-200">{item.application}</span>
                  </p>
                  <p className="text-slate-500 text-[11px]">Manufacturer: {item.manufacturer}</p>

                  <div className="grid grid-cols-4 gap-1.5 bg-slate-900 p-2.5 rounded-xl text-center text-xs border border-slate-800">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Diameter</span>
                      <span className="text-white font-bold">{item.diameterM} m</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px]">Blades</span>
                      <span className="text-white font-bold">{item.numBlades}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px]">P/D</span>
                      <span className="text-white font-bold">{item.pitchRatio}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px]">Efficiency</span>
                      <span className="text-emerald-400 font-bold">{item.openWaterEfficiency}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => handleToggleCompare(item.id)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                      isCompared
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {isCompared ? '✓ Added to Compare' : '+ Compare'}
                  </button>

                  <button
                    onClick={() => {
                      onSelectPreset(item);
                      onClose();
                    }}
                    className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition"
                  >
                    Select & Load <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
