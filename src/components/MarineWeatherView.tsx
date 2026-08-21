import React, { useState } from 'react';
import {
  CloudRain,
  Wind,
  Waves,
  AlertTriangle,
  Compass,
  Thermometer,
  MapPin,
  Eye,
  Navigation,
  Globe,
  Radio,
  Search,
  CheckCircle2
} from 'lucide-react';

interface WeatherZone {
  id: string;
  name: string;
  coordinates: string;
  tempC: number;
  windSpeedKnots: number;
  windDir: string;
  waveHeightM: number;
  swellPeriodSec: number;
  seaState: string;
  cycloneAlert: boolean;
  tideHigh: string;
  tideLow: string;
}

const SAMPLE_WEATHER_ZONES: WeatherZone[] = [
  {
    id: 'malacca',
    name: 'Malacca Strait & Singapore Strait',
    coordinates: '01°15′N 103°50′E',
    tempC: 29.5,
    windSpeedKnots: 12,
    windDir: 'SW (220°)',
    waveHeightM: 1.2,
    swellPeriodSec: 6.5,
    seaState: 'Beaufort 3 (Gentle Breeze)',
    cycloneAlert: false,
    tideHigh: '14:20 (+2.8m)',
    tideLow: '20:45 (+0.4m)'
  },
  {
    id: 'english_channel',
    name: 'English Channel & Dover Strait',
    coordinates: '50°30′N 01°10′E',
    tempC: 16.2,
    windSpeedKnots: 28,
    windDir: 'NW (310°)',
    waveHeightM: 3.8,
    swellPeriodSec: 9.2,
    seaState: 'Beaufort 7 (Near Gale)',
    cycloneAlert: false,
    tideHigh: '16:05 (+6.1m)',
    tideLow: '22:30 (+1.2m)'
  },
  {
    id: 'suez',
    name: 'Red Sea & Suez Canal Approach',
    coordinates: '27°50′N 34°18′E',
    tempC: 34.0,
    windSpeedKnots: 18,
    windDir: 'NNE (025°)',
    waveHeightM: 1.8,
    swellPeriodSec: 7.0,
    seaState: 'Beaufort 5 (Fresh Breeze)',
    cycloneAlert: false,
    tideHigh: '11:40 (+1.2m)',
    tideLow: '18:15 (+0.3m)'
  },
  {
    id: 'north_atlantic',
    name: 'North Atlantic Ocean - Route EU-USA',
    coordinates: '46°10′N 32°40′W',
    tempC: 14.5,
    windSpeedKnots: 42,
    windDir: 'W (270°)',
    waveHeightM: 6.4,
    swellPeriodSec: 12.8,
    seaState: 'Beaufort 9 (Strong Gale)',
    cycloneAlert: true, // Storm warning
    tideHigh: '15:10 (+3.2m)',
    tideLow: '21:30 (+0.8m)'
  }
];

export const MarineWeatherView: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<WeatherZone>(SAMPLE_WEATHER_ZONES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredZones = SAMPLE_WEATHER_ZONES.filter(
    z => z.name.toLowerCase().includes(searchQuery.toLowerCase()) || z.coordinates.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-bold">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Live Meteorological & Oceanographic Feed
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Global Marine <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">Weather & Ocean Dynamics</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Real-time wave height, swell period, wind vectors, tidal windows, cyclone alerts, and optimal passage weather routing.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Maritime Location List */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" /> Key Maritime Routes
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">4 Active Zones</span>
          </div>

          <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2 text-xs">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter route or coordinates..."
              className="w-full bg-transparent text-white outline-none"
            />
          </div>

          <div className="space-y-2.5">
            {filteredZones.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold block">{zone.name}</span>
                    {zone.cycloneAlert && (
                      <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] rounded-full font-mono flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-400" /> STORM
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block mt-1">{zone.coordinates}</span>
                  
                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <span className="text-cyan-300">Wind: {zone.windSpeedKnots} kn</span>
                    <span className="text-emerald-300">Waves: {zone.waveHeightM}m</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Weather Telemetry Panel */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">{selectedZone.name}</h2>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                  {selectedZone.coordinates}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{selectedZone.seaState}</p>
            </div>

            {selectedZone.cycloneAlert && (
              <div className="p-2.5 bg-rose-500/15 border border-rose-500/40 rounded-2xl text-rose-300 text-xs flex items-center gap-2 shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-400 animate-bounce" />
                <span><strong>GALE WARNING:</strong> Wave Heights &gt;6.0m Expected</span>
              </div>
            )}
          </div>

          {/* Meteorological Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Significant Wave</span>
                <Waves className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-mono font-black text-cyan-400">{selectedZone.waveHeightM} <span className="text-xs font-sans text-slate-400">m</span></div>
              <span className="text-[10px] text-slate-400 font-mono block">Swell Period: {selectedZone.swellPeriodSec}s</span>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Wind Speed & Vector</span>
                <Wind className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-mono font-black text-amber-400">{selectedZone.windSpeedKnots} <span className="text-xs font-sans text-slate-400">knots</span></div>
              <span className="text-[10px] text-slate-400 font-mono block">Direction: {selectedZone.windDir}</span>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Sea Temp</span>
                <Thermometer className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-mono font-black text-rose-400">{selectedZone.tempC}°C</div>
              <span className="text-[10px] text-slate-400 font-mono block">Air Temp: {(selectedZone.tempC - 2.1).toFixed(1)}°C</span>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Tidal Table</span>
                <Compass className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xs font-mono font-bold text-emerald-400">{selectedZone.tideHigh}</div>
              <span className="text-[10px] text-slate-400 font-mono block">Low Tide: {selectedZone.tideLow}</span>
            </div>

          </div>

          {/* Passage Weather Advice */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-3xl space-y-2 text-xs">
            <span className="font-extrabold text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-sky-400" /> AI Weather Routing Advisory
            </span>
            <p className="text-slate-300 leading-relaxed">
              For vessel passage through <strong>{selectedZone.name}</strong>, current wave period of {selectedZone.swellPeriodSec}s presents low parametric rolling risk for vessels with beam &gt;32m. Recommended speed adjustment is maintain 15.0 knots to minimize slamming.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
