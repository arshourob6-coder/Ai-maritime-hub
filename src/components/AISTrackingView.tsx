import React, { useState } from 'react';
import {
  Ship,
  Search,
  MapPin,
  Compass,
  Clock,
  ArrowUpRight,
  Anchor,
  Radio,
  CheckCircle2,
  Navigation,
  Globe,
  Sliders,
  Layers
} from 'lucide-react';

interface VesselAIS {
  imo: string;
  mmsi: string;
  name: string;
  type: string;
  flag: string;
  flagEmoji: string;
  lat: number;
  lon: number;
  speedKnots: number;
  headingDeg: number;
  destination: string;
  eta: string;
  draughtM: number;
  lengthM: number;
  beamM: number;
  status: 'Underway Using Engine' | 'At Anchor' | 'Moored';
}

const SAMPLE_AIS_VESSELS: VesselAIS[] = [
  {
    imo: 'IMO 9823412',
    mmsi: '211893000',
    name: 'EVER ALIVEN',
    type: 'Container Ship (24,000 TEU)',
    flag: 'Panama',
    flagEmoji: '🇵🇦',
    lat: 1.283,
    lon: 103.851,
    speedKnots: 18.4,
    headingDeg: 245,
    destination: 'Rotterdam (NL RTM)',
    eta: 'Aug 04, 08:00 UTC',
    draughtM: 15.8,
    lengthM: 400,
    beamM: 61.5,
    status: 'Underway Using Engine'
  },
  {
    imo: 'IMO 9741299',
    mmsi: '636019280',
    name: 'TI OCEAN',
    type: 'ULCC Tanker (440,000 DWT)',
    flag: 'Liberia',
    flagEmoji: '🇱🇷',
    lat: 25.120,
    lon: 56.340,
    speedKnots: 12.1,
    headingDeg: 110,
    destination: 'Ningbo-Zhoushan (CN NGB)',
    eta: 'Aug 12, 14:30 UTC',
    draughtM: 21.2,
    lengthM: 380,
    beamM: 68.0,
    status: 'Underway Using Engine'
  },
  {
    imo: 'IMO 9618204',
    mmsi: '538004120',
    name: 'PACIFIC RUBY',
    type: 'Capesize Bulk Carrier',
    flag: 'Marshall Islands',
    flagEmoji: '🇲🇭',
    lat: -20.312,
    lon: 118.570,
    speedKnots: 0.1,
    headingDeg: 0,
    destination: 'Port Hedland (AU PHE)',
    eta: 'At Anchor',
    draughtM: 11.4,
    lengthM: 292,
    beamM: 45.0,
    status: 'At Anchor'
  },
  {
    imo: 'IMO 9901423',
    mmsi: '311000980',
    name: 'Q-MAX DOHA',
    type: 'LNG Carrier (266,000 m³)',
    flag: 'Bahamas',
    flagEmoji: '🇧🇸',
    lat: 29.980,
    lon: 32.560,
    speedKnots: 8.5,
    headingDeg: 355,
    destination: 'Suez Canal Transit',
    eta: 'Jul 26, 18:00 UTC',
    draughtM: 12.0,
    lengthM: 345,
    beamM: 53.8,
    status: 'Underway Using Engine'
  }
];

export const AISTrackingView: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState<VesselAIS>(SAMPLE_AIS_VESSELS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVessels = SAMPLE_AIS_VESSELS.filter(
    v => v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         v.imo.toLowerCase().includes(searchQuery.toLowerCase()) ||
         v.mmsi.includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full text-xs font-bold">
            <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" /> Satellite & Terrestrial AIS Feed
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">AIS Vessel Tracking</span> & Route Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Live AIS positioning, IMO/MMSI lookup, voyage history, heading vectors, draught readings, and AI ETA predictions.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Vessel Search List */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Ship className="w-5 h-5 text-sky-400" /> Vessel Search
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Live Sat Feed</span>
          </div>

          <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2 text-xs">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Ship Name, IMO, or MMSI..."
              className="w-full bg-transparent text-white outline-none"
            />
          </div>

          <div className="space-y-2.5">
            {filteredVessels.map((v) => {
              const isSelected = selectedVessel.imo === v.imo;
              return (
                <button
                  key={v.imo}
                  onClick={() => setSelectedVessel(v)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 text-white font-bold'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span>{v.flagEmoji}</span>
                      <span>{v.name}</span>
                    </span>
                    <span className="text-[10px] text-sky-400 font-mono">{v.speedKnots} kn</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block mt-1">{v.type} • {v.imo}</span>
                  <div className="mt-2 text-[11px] text-emerald-300 font-mono flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-emerald-400" /> Dest: {v.destination}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active AIS Map & Telemetry Panel */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedVessel.flagEmoji}</span>
                <h2 className="text-lg font-black text-white">{selectedVessel.name}</h2>
                <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                  {selectedVessel.imo}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{selectedVessel.type} • Flag: {selectedVessel.flag}</p>
            </div>

            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {selectedVessel.status}
            </div>
          </div>

          {/* Interactive Simulated Map Canvas */}
          <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            <div className="relative z-10 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center mx-auto animate-pulse">
                <Ship className="w-8 h-8 text-sky-400" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block">GPS Coords: {selectedVessel.lat.toFixed(3)}°N, {selectedVessel.lon.toFixed(3)}°E</span>
                <span className="text-sm font-bold text-white block mt-0.5">Heading Vector: {selectedVessel.headingDeg}° • Speed: {selectedVessel.speedKnots} kn</span>
              </div>
            </div>

            {/* Simulated Track Info Overlay */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Destination</span>
                <span className="font-bold text-white truncate block">{selectedVessel.destination}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">AI Predicted ETA</span>
                <span className="font-bold text-emerald-400 truncate block">{selectedVessel.eta}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Draught / LOA</span>
                <span className="font-bold text-sky-400 truncate block">{selectedVessel.draughtM}m / {selectedVessel.lengthM}m</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">MMSI Code</span>
                <span className="font-mono text-slate-300 truncate block">{selectedVessel.mmsi}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
