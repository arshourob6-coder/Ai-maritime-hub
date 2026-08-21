import React, { useEffect, useRef, useState } from 'react';
import { Play, RefreshCw, Anchor, Compass, ShieldCheck } from 'lucide-react';

interface Ship3DCanvasProps {
  lengthBP?: number;
  beam?: number;
  draft?: number;
  trim?: number; // degrees or meters
  heel?: number; // degrees
}

export const Ship3DCanvas: React.FC<Ship3DCanvasProps> = ({
  lengthBP = 200,
  beam = 32,
  draft = 11,
  trim = 0,
  heel = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ rx: 20, ry: 45 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [animateWave, setAnimateWave] = useState(true);

  // Computed metrics
  const blockCoeff = 0.68;
  const displacement = Math.round(lengthBP * beam * draft * blockCoeff * 1.025);
  const wettedArea = Math.round(1.025 * lengthBP * (2 * draft + beam));
  const PeKW = Math.round(0.0035 * Math.pow(lengthBP, 1.8) * Math.pow(19.5, 2.8));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      const w = (canvas.width = canvas.parentElement?.clientWidth || 600);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 400);

      ctx.clearRect(0, 0, w, h);

      // Center of canvas
      const cx = w / 2;
      const cy = h / 2 + 20;

      // Scale factors for visualization
      const scale = Math.min(w, h) / 320;
      const radX = (rotation.rx * Math.PI) / 180;
      const radY = ((rotation.ry + (animateWave ? Math.sin(t) * 2 : 0)) * Math.PI) / 180;

      // Helper function to project 3D point (x, y, z) to 2D
      const project = (x: number, y: number, z: number) => {
        // Rotate around Y
        const x1 = x * Math.cos(radY) - z * Math.sin(radY);
        const z1 = x * Math.sin(radY) + z * Math.cos(radY);

        // Rotate around X
        const y2 = y * Math.cos(radX) - z1 * Math.sin(radX);
        const z2 = y * Math.sin(radX) + z1 * Math.cos(radX);

        // Perspective
        const fov = 400;
        const scalePerspective = fov / (fov + z2);

        return {
          px: cx + x1 * scale * scalePerspective,
          py: cy - y2 * scale * scalePerspective,
          z: z2,
        };
      };

      // Draw Grid / Water Plane
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1;
      const gridSize = 160;
      for (let g = -gridSize; g <= gridSize; g += 40) {
        const p1 = project(g, -draft * 5, -gridSize);
        const p2 = project(g, -draft * 5, gridSize);
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();

        const p3 = project(-gridSize, -draft * 5, g);
        const p4 = project(gridSize, -draft * 5, g);
        ctx.beginPath();
        ctx.moveTo(p3.px, p3.py);
        ctx.lineTo(p4.px, p4.py);
        ctx.stroke();
      }

      // Draw Ship Hull 3D Wireframe / Solid
      const L = lengthBP * 0.6;
      const B = beam * 1.2;
      const D = draft * 1.8;

      // Key Hull Points
      const bow = { x: L / 2, y: D / 2, z: 0 };
      const bulb = { x: L / 2 + 15, y: -D / 2, z: 0 };
      const sternMid = { x: -L / 2, y: D / 2, z: 0 };

      // Deck corners
      const deckPort = { x: 0, y: D / 2, z: -B / 2 };
      const deckStbd = { x: 0, y: D / 2, z: B / 2 };
      const sternPort = { x: -L / 2, y: D / 2, z: -B / 3 };
      const sternStbd = { x: -L / 2, y: D / 2, z: B / 3 };

      // Keel corners
      const keelMidPort = { x: 0, y: -D / 2, z: -B / 2.5 };
      const keelMidStbd = { x: 0, y: -D / 2, z: B / 2.5 };
      const keelAft = { x: -L / 2, y: -D / 2.2, z: 0 };

      // Hull Sections
      const hullPolys = [
        // Starboard Bow Side
        [bow, deckStbd, keelMidStbd, bulb],
        // Port Bow Side
        [bow, deckPort, keelMidPort, bulb],
        // Midship Starboard Side
        [deckStbd, sternStbd, keelAft, keelMidStbd],
        // Midship Port Side
        [deckPort, sternPort, keelAft, keelMidPort],
      ];

      // Draw Filled Hull Panels
      hullPolys.forEach((poly, idx) => {
        const projected = poly.map((pt) => project(pt.x, pt.y, pt.z));
        ctx.beginPath();
        ctx.moveTo(projected[0].px, projected[0].py);
        for (let i = 1; i < projected.length; i++) {
          ctx.lineTo(projected[i].px, projected[i].py);
        }
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, w, h);
        if (idx % 2 === 0) {
          grad.addColorStop(0, 'rgba(14, 165, 233, 0.4)');
          grad.addColorStop(1, 'rgba(3, 105, 161, 0.7)');
        } else {
          grad.addColorStop(0, 'rgba(2, 132, 199, 0.5)');
          grad.addColorStop(1, 'rgba(12, 74, 110, 0.8)');
        }
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Waterline Ring
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      const wlPts = [
        project(L / 2 + 5, 0, 0),
        project(L / 4, 0, B / 2),
        project(-L / 4, 0, B / 2),
        project(-L / 2, 0, 0),
        project(-L / 4, 0, -B / 2),
        project(L / 4, 0, -B / 2),
      ];
      ctx.moveTo(wlPts[0].px, wlPts[0].py);
      for (let i = 1; i < wlPts.length; i++) {
        ctx.lineTo(wlPts[i].px, wlPts[i].py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      // Waterline Label
      const wlLabel = project(L / 2 + 10, 0, 0);
      ctx.fillStyle = '#22d3ee';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Design Waterline T = ${draft}m`, wlLabel.px + 5, wlLabel.py);

      // Wave Pattern behind/around ship
      if (animateWave) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5;
        for (let waveX = -L / 2 - 40; waveX > -L * 1.5; waveX -= 25) {
          const waveR = project(waveX, -draft * 5, Math.sin(t * 3 + waveX) * 20);
          ctx.beginPath();
          ctx.arc(waveR.px, waveR.py, Math.abs(waveX) * 0.1, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [rotation, animateWave, lengthBP, beam, draft, trim, heel]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotation((prev) => ({
      rx: Math.max(-80, Math.min(80, prev.rx - dy * 0.5)),
      ry: (prev.ry + dx * 0.5) % 360,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="relative w-full h-80 md:h-[420px] bg-slate-900/80 rounded-2xl border border-sky-500/20 overflow-hidden shadow-2xl backdrop-blur-md flex flex-col justify-between">
      {/* Canvas view */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Floating Telemetry Overlay */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-950/80 border border-sky-500/30 px-3 py-1.5 rounded-xl backdrop-blur-md text-xs text-sky-200">
          <Anchor className="w-4 h-4 text-sky-400 animate-pulse" />
          <span className="font-semibold text-white">Interactive 3D Hull Simulator</span>
          <span className="bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30 text-[10px]">
            DNV Hydrostatics v2.4
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setAnimateWave(!animateWave)}
            className="px-2.5 py-1 text-xs bg-sky-950/80 hover:bg-sky-900 text-sky-300 rounded-lg border border-sky-500/30 transition flex items-center gap-1.5"
          >
            <Play className={`w-3.5 h-3.5 ${animateWave ? 'text-emerald-400' : 'text-slate-400'}`} />
            {animateWave ? 'Pause Sea Motion' : 'Simulate Waves'}
          </button>
          <button
            onClick={() => setRotation({ rx: 20, ry: 45 })}
            className="p-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-600/30 transition"
            title="Reset View"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 border border-sky-500/30 p-3 rounded-xl backdrop-blur-lg grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <div className="text-slate-400">Length BP / Beam / Draft</div>
          <div className="text-sky-300 font-mono font-bold">
            {lengthBP}m × {beam}m × {draft}m
          </div>
        </div>
        <div>
          <div className="text-slate-400">Displacement (Δ)</div>
          <div className="text-emerald-400 font-mono font-bold">{displacement.toLocaleString()} tonnes</div>
        </div>
        <div>
          <div className="text-slate-400">Wetted Surface Area</div>
          <div className="text-cyan-300 font-mono font-bold">{wettedArea.toLocaleString()} m²</div>
        </div>
        <div>
          <div className="text-slate-400">Predict Power @ 19.5 kts</div>
          <div className="text-amber-300 font-mono font-bold">{PeKW.toLocaleString()} kW (PE)</div>
        </div>
      </div>
    </div>
  );
};
