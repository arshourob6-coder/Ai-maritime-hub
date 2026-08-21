import React, { useEffect, useRef, useState } from 'react';
import {
  Layers,
  Activity,
  Zap,
  Eye,
  Sliders,
  RotateCw,
  Compass,
  Thermometer,
  ShieldCheck,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Info,
  Flame,
  Waves,
  Gauge
} from 'lucide-react';
import { VesselTwin } from './digitalTwinData';

interface ShipDigitalTwin3DProps {
  vessel: VesselTwin;
  isDarkMode?: boolean;
}

export type ViewLayerMode = 'isometric_solid' | 'fea_stress' | 'thermal_machinery' | 'cfd_streamlines' | 'sensor_nodes' | 'compartments';

export const ShipDigitalTwin3D: React.FC<ShipDigitalTwin3DProps> = ({
  vessel,
  isDarkMode = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [layerMode, setLayerMode] = useState<ViewLayerMode>('fea_stress');
  const [rotation, setRotation] = useState({ rx: 22, ry: 48 });
  const [zoom, setZoom] = useState(1.1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [animateWaves, setAnimateWaves] = useState(true);
  const [selectedStation, setSelectedStation] = useState<number>(10); // Station 0 to 20
  const [activeProbe, setActiveProbe] = useState<{ name: string; value: string; status: string; detail: string } | null>({
    name: 'Midship Hold #4 Lower Hopper',
    value: '148.4 MPa',
    status: 'Safe (Limit 180 MPa)',
    detail: 'Dynamic wave bending moment stress during Bft 4 wave encounter.'
  });

  // Calculate FEA metrics
  const maxStressMPa = (135 + vessel.telemetry.engineLoadPct * 0.2 + (vessel.telemetry.draftFwd > 15 ? 12 : 0)).toFixed(1);
  const shearForceMN = (42.5 + vessel.telemetry.engineLoadPct * 0.08).toFixed(1);
  const midshipBendingMomentMNm = (3850 + vessel.telemetry.engineLoadPct * 14.5).toFixed(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.035;
      const w = (canvas.width = canvas.parentElement?.clientWidth || 700);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 420);

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2 + 15;

      const baseScale = (Math.min(w, h) / 360) * zoom;
      const radX = (rotation.rx * Math.PI) / 180;
      const radY = ((rotation.ry + (animateWaves ? Math.sin(t * 0.8) * 1.5 : 0)) * Math.PI) / 180;

      // 3D Point Projection Helper
      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        const x1 = x * Math.cos(radY) - z * Math.sin(radY);
        const z1 = x * Math.sin(radY) + z * Math.cos(radY);
        // Rotate X
        const y2 = y * Math.cos(radX) - z1 * Math.sin(radX);
        const z2 = y * Math.sin(radX) + z1 * Math.cos(radX);

        const fov = 480;
        const scaleP = fov / (fov + z2);

        return {
          px: cx + x1 * baseScale * scaleP,
          py: cy - y2 * baseScale * scaleP,
          z: z2,
          scaleP
        };
      };

      // 1. Waterplane Grid
      ctx.strokeStyle = isDarkMode ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.15)';
      ctx.lineWidth = 1;
      const gridSize = 180;
      for (let g = -gridSize; g <= gridSize; g += 30) {
        const waveOffset = animateWaves ? Math.sin(t + g * 0.05) * 3 : 0;
        const p1 = project(g, -18 + waveOffset, -gridSize);
        const p2 = project(g, -18 + waveOffset, gridSize);
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();

        const p3 = project(-gridSize, -18 + waveOffset, g);
        const p4 = project(gridSize, -18 + waveOffset, g);
        ctx.beginPath();
        ctx.moveTo(p3.px, p3.py);
        ctx.lineTo(p4.px, p4.py);
        ctx.stroke();
      }

      // Hull Dimensions
      const L = 160;
      const B = 46;
      const D = 28;

      // 2. CFD Streamlines (if active)
      if (layerMode === 'cfd_streamlines') {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1.5;
        for (let s = -3; s <= 3; s++) {
          ctx.beginPath();
          for (let step = -L; step <= L + 40; step += 15) {
            const flowOffset = Math.sin(t * 2 + step * 0.05 + s) * 4;
            const pt = project(step, -16 + flowOffset + s * 3, s * (B * 0.35) + Math.sin(step * 0.02) * 8);
            if (step === -L) ctx.moveTo(pt.px, pt.py);
            else ctx.lineTo(pt.px, pt.py);
          }
          ctx.stroke();
        }
      }

      // 3. Hull Wireframe & Solid Shading
      // Station slices
      const numStations = 14;
      for (let i = 0; i <= numStations; i++) {
        const frac = i / numStations;
        const x = -L + frac * (2 * L);

        // Section fullness factor (0 at bow/stern, 1 at midship)
        const fullness = Math.sin(frac * Math.PI);
        const stB = (B / 2) * Math.pow(fullness, 0.45);
        const stD = D * (0.6 + 0.4 * fullness);

        const pKeel = project(x, -stD, 0);
        const pPortDeck = project(x, 12, stB);
        const pStbdDeck = project(x, 12, -stB);
        const pPortBottom = project(x, -stD * 0.8, stB * 0.85);
        const pStbdBottom = project(x, -stD * 0.8, -stB * 0.85);

        // Color coding depending on layer mode
        if (layerMode === 'fea_stress') {
          // Stress gradient: high at midship (frac 0.4 - 0.6)
          const midDist = Math.abs(frac - 0.5);
          if (midDist < 0.15) {
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.85)'; // Amber hotspot
            ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
          } else if (midDist < 0.28) {
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
            ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
          } else {
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.7)'; // Emerald safe
            ctx.fillStyle = 'rgba(16, 185, 129, 0.05)';
          }
        } else if (layerMode === 'thermal_machinery') {
          // Hot in engine room (aft frac 0.15 - 0.35)
          if (frac > 0.15 && frac < 0.35) {
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.85)'; // Rose thermal
            ctx.fillStyle = 'rgba(244, 63, 94, 0.18)';
          } else {
            ctx.strokeStyle = 'rgba(71, 85, 105, 0.5)';
            ctx.fillStyle = 'rgba(30, 41, 59, 0.1)';
          }
        } else {
          ctx.strokeStyle = isDarkMode ? 'rgba(148, 163, 184, 0.6)' : 'rgba(71, 85, 105, 0.8)';
          ctx.fillStyle = isDarkMode ? 'rgba(30, 41, 59, 0.25)' : 'rgba(226, 232, 240, 0.35)';
        }

        ctx.lineWidth = i === selectedStation ? 2.5 : 1.2;

        // Draw Transverse Section Outline
        ctx.beginPath();
        ctx.moveTo(pPortDeck.px, pPortDeck.py);
        ctx.lineTo(pPortBottom.px, pPortBottom.py);
        ctx.lineTo(pKeel.px, pKeel.py);
        ctx.lineTo(pStbdBottom.px, pStbdBottom.py);
        ctx.lineTo(pStbdDeck.px, pStbdDeck.py);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Highlight selected station
        if (i === selectedStation) {
          ctx.strokeStyle = '#38bdf8';
          ctx.stroke();
        }
      }

      // Longitudinal Lines (Sheer, Deck, Keel, Bilge)
      ctx.strokeStyle = isDarkMode ? 'rgba(56, 189, 248, 0.6)' : 'rgba(2, 132, 199, 0.7)';
      ctx.lineWidth = 1.5;

      const drawLongitudinal = (yFrac: number, zSide: number) => {
        ctx.beginPath();
        for (let i = 0; i <= numStations; i++) {
          const frac = i / numStations;
          const x = -L + frac * (2 * L);
          const fullness = Math.sin(frac * Math.PI);
          const stB = (B / 2) * Math.pow(fullness, 0.45) * zSide;
          const stD = D * (0.6 + 0.4 * fullness) * yFrac;
          const pt = project(x, yFrac > 0 ? 12 : -stD, stB);
          if (i === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.stroke();
      };

      drawLongitudinal(1, 1);   // Port deck edge
      drawLongitudinal(1, -1);  // Stbd deck edge
      drawLongitudinal(-1, 0);  // Keel
      drawLongitudinal(-0.8, 0.85); // Port bilge turn
      drawLongitudinal(-0.8, -0.85); // Stbd bilge turn

      // 4. Superstructure & Bridge Deckhouse (Aft)
      const pBridgeBase1 = project(-L * 0.5, 12, -B * 0.3);
      const pBridgeBase2 = project(-L * 0.5, 12, B * 0.3);
      const pBridgeBase3 = project(-L * 0.25, 12, B * 0.3);
      const pBridgeBase4 = project(-L * 0.25, 12, -B * 0.3);

      const pBridgeTop1 = project(-L * 0.5, 34, -B * 0.26);
      const pBridgeTop2 = project(-L * 0.5, 34, B * 0.26);
      const pBridgeTop3 = project(-L * 0.25, 34, B * 0.26);
      const pBridgeTop4 = project(-L * 0.25, 34, -B * 0.26);

      ctx.fillStyle = isDarkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(203, 213, 225, 0.6)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      ctx.moveTo(pBridgeTop1.px, pBridgeTop1.py);
      ctx.lineTo(pBridgeTop2.px, pBridgeTop2.py);
      ctx.lineTo(pBridgeTop3.px, pBridgeTop3.py);
      ctx.lineTo(pBridgeTop4.px, pBridgeTop4.py);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Funnel & Radar Mast
      const pMastBase = project(-L * 0.35, 34, 0);
      const pMastTop = project(-L * 0.35, 52, 0);
      ctx.beginPath();
      ctx.moveTo(pMastBase.px, pMastBase.py);
      ctx.lineTo(pMastTop.px, pMastTop.py);
      ctx.stroke();

      // Radar dish rotation animation
      const pRadarLeft = project(-L * 0.35 + Math.sin(t * 3) * 6, 50, Math.cos(t * 3) * 6);
      const pRadarRight = project(-L * 0.35 - Math.sin(t * 3) * 6, 50, -Math.cos(t * 3) * 6);
      ctx.beginPath();
      ctx.moveTo(pRadarLeft.px, pRadarLeft.py);
      ctx.lineTo(pRadarRight.px, pRadarRight.py);
      ctx.stroke();

      // 5. Container Cargo Bays / Hatch Covers
      if (layerMode === 'isometric_solid' || layerMode === 'fea_stress') {
        const bays = [
          { x1: -L * 0.2, x2: L * 0.1, color: 'rgba(59, 130, 246, 0.4)' },
          { x1: L * 0.15, x2: L * 0.45, color: 'rgba(16, 185, 129, 0.4)' },
          { x1: L * 0.5, x2: L * 0.75, color: 'rgba(245, 158, 11, 0.4)' }
        ];

        bays.forEach((bay) => {
          const pt1 = project(bay.x1, 12, -B * 0.28);
          const pt2 = project(bay.x1, 12, B * 0.28);
          const pt3 = project(bay.x2, 12, B * 0.28);
          const pt4 = project(bay.x2, 12, -B * 0.28);
          const ptTop1 = project(bay.x1, 24, -B * 0.26);
          const ptTop2 = project(bay.x1, 24, B * 0.26);
          const ptTop3 = project(bay.x2, 24, B * 0.26);
          const ptTop4 = project(bay.x2, 24, -B * 0.26);

          ctx.fillStyle = bay.color;
          ctx.beginPath();
          ctx.moveTo(ptTop1.px, ptTop1.py);
          ctx.lineTo(ptTop2.px, ptTop2.py);
          ctx.lineTo(ptTop3.px, ptTop3.py);
          ctx.lineTo(ptTop4.px, ptTop4.py);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        });
      }

      // 6. Sensor Nodes Overlay (if active)
      if (layerMode === 'sensor_nodes') {
        const sensorPoints = [
          { x: -L * 0.4, y: -10, z: 0, label: 'Main Engine Crankcase Sensor #1', val: '44.8°C' },
          { x: -L * 0.7, y: -18, z: 0, label: 'Stern Tube Aft Bearing Temp', val: '52.1°C' },
          { x: 0, y: 12, z: B * 0.3, label: 'Midship Hold #4 Strain Gauge', val: '148.4 MPa' },
          { x: L * 0.85, y: -5, z: 0, label: 'Bulbous Bow Slamming Transducer', val: '64.0 kPa' },
          { x: -L * 0.35, y: 34, z: 0, label: 'Starlink Maritime LEO Antenna', val: '185 Mbps' },
          { x: L * 0.3, y: -15, z: -B * 0.2, label: 'Ballast Tank #2 Starboard Sounding', val: '84.2%' }
        ];

        sensorPoints.forEach((sp, idx) => {
          const pt = project(sp.x, sp.y, sp.z);
          // Ping animation
          ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.beginPath();
          ctx.arc(pt.px, pt.py, 10 + Math.sin(t * 3 + idx) * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(pt.px, pt.py, 4.5, 0, Math.PI * 2);
          ctx.fill();

          // Text label
          ctx.fillStyle = isDarkMode ? '#ffffff' : '#0f172a';
          ctx.font = 'bold 9px sans-serif';
          ctx.fillText(sp.val, pt.px + 7, pt.py - 5);
        });
      }

      // 7. Interactive Stress Hotspot Pins
      if (layerMode === 'fea_stress') {
        const hotSpot = project(0, 12, B * 0.28);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.beginPath();
        ctx.arc(hotSpot.px, hotSpot.py, 12 + Math.sin(t * 4) * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(hotSpot.px, hotSpot.py, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('⚡ 148.4 MPa', hotSpot.px + 8, hotSpot.py - 6);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [rotation, zoom, animateWaves, layerMode, isDarkMode, selectedStation, vessel]);

  // Drag interaction
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotation((prev) => ({
      rx: Math.max(-10, Math.min(80, prev.rx - dy * 0.4)),
      ry: (prev.ry + dx * 0.4) % 360
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div id="ship-digital-twin-3d-root" className="space-y-4">
      {/* 3D Canvas Box */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
        {/* Layer Mode Selector Toolbar */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-lg">
          {[
            { id: 'fea_stress', label: 'FEA Stress Hotspots', icon: <Layers className="w-3.5 h-3.5 text-amber-400" /> },
            { id: 'thermal_machinery', label: 'Thermal Machinery', icon: <Flame className="w-3.5 h-3.5 text-rose-400" /> },
            { id: 'cfd_streamlines', label: 'CFD Streamlines', icon: <Waves className="w-3.5 h-3.5 text-sky-400" /> },
            { id: 'sensor_nodes', label: 'IoT Sensor Nodes', icon: <Activity className="w-3.5 h-3.5 text-emerald-400" /> },
            { id: 'isometric_solid', label: 'Solid Hull Wireframe', icon: <Eye className="w-3.5 h-3.5 text-violet-400" /> }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setLayerMode(mode.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                layerMode === mode.id
                  ? 'bg-sky-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {mode.icon}
              <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Top Right HUD Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-lg text-xs">
          <button
            onClick={() => setZoom((z) => Math.min(2.0, z + 0.15))}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setRotation({ rx: 22, ry: 48 })}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition"
            title="Reset View"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setAnimateWaves(!animateWaves)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
              animateWaves ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {animateWaves ? 'Waves On' : 'Frozen'}
          </button>
        </div>

        {/* Live 3D Canvas */}
        <div className="w-full h-[440px] sm:h-[480px] cursor-grab active:cursor-grabbing">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="w-full h-full block"
          />
        </div>

        {/* Bottom Left Floating Legend / Stress Bar */}
        <div className="absolute bottom-4 left-4 z-20 bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-slate-800 shadow-xl max-w-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              FEA Stress Scale
            </span>
            <span className="text-[10px] text-amber-400 font-mono">Max: {maxStressMPa} MPa</span>
          </div>

          <div className="w-full h-2 rounded-full bg-gradient-to-r from-emerald-500 via-sky-400 via-amber-400 to-rose-500" />

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0 MPa (Zero)</span>
            <span>120 MPa</span>
            <span className="text-rose-400 font-bold">180 MPa (Limit)</span>
          </div>
        </div>

        {/* Bottom Right Station Slicer HUD */}
        <div className="absolute bottom-4 right-4 z-20 bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-3 text-xs">
          <span className="text-slate-400 font-medium">Station Slice:</span>
          <input
            type="range"
            min="0"
            max="14"
            value={selectedStation}
            onChange={(e) => setSelectedStation(Number(e.target.value))}
            className="w-28 accent-sky-500 cursor-pointer"
          />
          <span className="font-mono text-sky-400 font-bold w-12">
            St {selectedStation}
          </span>
        </div>
      </div>

      {/* Real-time Structural Telemetry Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-medium">Midship Bending Moment</span>
          <div className="text-xl font-mono font-black text-white">{midshipBendingMomentMNm} <span className="text-xs font-sans text-slate-400">MN·m</span></div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
            <ShieldCheck className="w-3 h-3" /> 68.2% of DNV Max Limit
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-medium">Hull Shear Force</span>
          <div className="text-xl font-mono font-black text-sky-400">{shearForceMN} <span className="text-xs font-sans text-slate-400">MN</span></div>
          <span className="text-[10px] text-slate-400 font-mono">Frame 84 (Hold 2/3 Bulkhead)</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-medium">Torsional Angle</span>
          <div className="text-xl font-mono font-black text-amber-400">0.42° <span className="text-xs font-sans text-slate-400">Twist</span></div>
          <span className="text-[10px] text-slate-400 font-mono">Diagonal wave encounter</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-medium">Bio-Fouling Drag Penalty</span>
          <div className="text-xl font-mono font-black text-rose-400">+{vessel.telemetry.bioFoulingPenaltyPct}% <span className="text-xs font-sans text-slate-400">Resistance</span></div>
          <span className="text-[10px] text-slate-400 font-mono">Hull Grooming in 45 Days</span>
        </div>
      </div>
    </div>
  );
};
