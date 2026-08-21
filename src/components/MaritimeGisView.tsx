import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Globe, Layers, Navigation, Shield, Compass, MapPin, Search } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const MaritimeGisView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [selectedLayer, setSelectedLayer] = useState<'routes' | 'eez' | 'traffic' | 'ports'>('routes');
  const [searchPort, setSearchPort] = useState('Rotterdam');

  const ports = [
    { name: 'Port of Rotterdam', country: 'Netherlands', lat: '51.95° N', lon: '4.14° E', status: 'Optimal (Congestion Low)' },
    { name: 'Port of Singapore', country: 'Singapore', lat: '1.28° N', lon: '103.85° E', status: 'High Traffic (Waiting 4h)' },
    { name: 'Port of Shanghai', country: 'China', lat: '31.23° N', lon: '121.47° E', status: 'Moderate Traffic' },
    { name: 'Port of Houston', country: 'United States', lat: '29.76° N', lon: '-95.36° E', status: 'Optimal' },
    { name: 'Port of Chittagong', country: 'Bangladesh', lat: '22.33° N', lon: '91.83° E', status: 'Heavy Anchored Fleet' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime GIS & Spatial Intelligence" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              Tool #34
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Globe className="w-7 h-7 text-cyan-400" />
              Maritime GIS & Ocean Spatial Mapping
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Global maritime GIS map layers, EEZ 200nm territorial maritime boundaries, shipping chokepoints (Suez, Panama, Malacca), and port congestion analytics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Layer Controls */}
        <div className="lg:col-span-4 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4" /> GIS Map Layers
          </h3>

          <div className="space-y-2 text-xs">
            {[
              { id: 'routes', label: 'Global Shipping Routes & Chokepoints', icon: <Navigation className="w-4 h-4" /> },
              { id: 'eez', label: 'EEZ Maritime Boundaries (200 NM)', icon: <Shield className="w-4 h-4" /> },
              { id: 'traffic', label: 'AIS Traffic Density Heatmap', icon: <Compass className="w-4 h-4" /> },
              { id: 'ports', label: 'Major World Ports & Terminals', icon: <MapPin className="w-4 h-4" /> }
            ].map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id as any)}
                className={`w-full text-left p-3 rounded-2xl border transition flex items-center gap-3 ${
                  selectedLayer === layer.id
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {layer.icon}
                <span>{layer.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="font-bold text-xs text-slate-400 uppercase">Port Quick Search</div>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchPort}
                onChange={(e) => setSearchPort(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* GIS Canvas Display */}
        <div className="lg:col-span-8 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div className="relative h-[360px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-[radial-gradient(#0891b220_1px,transparent_1px)] bg-[size:16px_16px]" />

            <div className="text-center space-y-4 relative z-10">
              <Globe className="w-16 h-16 text-cyan-400 mx-auto animate-pulse" />
              <div>
                <h4 className="text-base font-black text-white">Interactive World Ocean Layer</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Active GIS Mode: <span className="text-cyan-300 font-bold uppercase">{selectedLayer}</span>
                  . Displaying 14,200 nautical route waypoints & real-time bathymetry contours.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-300">
                <span className="px-3 py-1 bg-slate-900 rounded-full border border-slate-800">Suez Canal: Open (18.2 kts)</span>
                <span className="px-3 py-1 bg-slate-900 rounded-full border border-slate-800">Panama Locks: Slot Reserved</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {ports.slice(0, 3).map((p) => (
              <div key={p.name} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="font-bold text-white">{p.name}</div>
                <div className="text-[10px] text-slate-400">{p.lat}, {p.lon}</div>
                <div className="text-[10px] text-cyan-400 font-medium mt-1">{p.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
