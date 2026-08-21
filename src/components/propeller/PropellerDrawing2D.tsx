import React, { useState } from 'react';
import { RadialSectionGeometry, PropellerType } from '../../types/propeller';
import { Download, FileText, Image, Grid, Compass, Layers } from 'lucide-react';

interface PropellerDrawing2DProps {
  numBlades: number;
  diameterM: number;
  pitchRatio: number;
  expandedAreaRatio: number;
  radialGeometry: RadialSectionGeometry[];
  propellerType: PropellerType;
}

export const PropellerDrawing2D: React.FC<PropellerDrawing2DProps> = ({
  numBlades,
  diameterM,
  pitchRatio,
  expandedAreaRatio,
  radialGeometry,
  propellerType,
}) => {
  const [activeTab, setActiveTab] = useState<'ga' | 'blade_sections' | 'distributions' | 'hub_detail'>('ga');

  const R_mm = (diameterM * 1000) / 2;
  const hubR_mm = R_mm * (propellerType === 'CPP' ? 0.28 : propellerType === 'Ducted_Kort' ? 0.22 : 0.18);

  // SVG Export Trigger
  const handleExportSvg = () => {
    const svgElem = document.getElementById('propeller-svg-drawing');
    if (!svgElem) return;
    const svgData = new XMLSerializer().serializeToString(svgElem);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `Propeller_${diameterM}m_${numBlades}B_GA_Drawing.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6 text-slate-200">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            2D Manufacturing Drawings & GA Diagrams
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            ISO 484-1 Class S Production Drawings, Radial Blade Sections & Shaft Keyway Specifications.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('ga')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                activeTab === 'ga' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              General Arrangement
            </button>
            <button
              onClick={() => setActiveTab('blade_sections')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                activeTab === 'blade_sections' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Blade Sections (0.2R–1.0R)
            </button>
            <button
              onClick={() => setActiveTab('distributions')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                activeTab === 'distributions' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pitch/Chord Curves
            </button>
            <button
              onClick={() => setActiveTab('hub_detail')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                activeTab === 'hub_detail' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Hub & Keyway Detail
            </button>
          </div>

          <button
            onClick={handleExportSvg}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
          >
            <Download className="w-4 h-4" />
            Export SVG / DXF
          </button>
        </div>
      </div>

      {/* Drawing Viewport Container */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto">
        <svg
          id="propeller-svg-drawing"
          viewBox="0 0 1000 600"
          className="w-full h-auto min-w-[750px] bg-slate-950 rounded-xl"
        >
          {/* CAD Blueprint Grid Background */}
          <defs>
            <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1000" height="600" fill="url(#cadGrid)" />

          {/* Title Block */}
          <g transform="translate(680, 480)">
            <rect x="0" y="0" width="300" height="110" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="6" />
            <line x1="0" y1="30" x2="300" y2="30" stroke="#38bdf8" strokeWidth="1" />
            <line x1="0" y1="60" x2="300" y2="60" stroke="#38bdf8" strokeWidth="1" />
            <text x="10" y="20" fill="#38bdf8" fontSize="12" fontWeight="bold">
              PROPEL DESIGN - GENERAL ARRANGEMENT
            </text>
            <text x="10" y="48" fill="#e2e8f0" fontSize="10">
              D = {diameterM.toFixed(2)} m | Z = {numBlades} | P/D = {pitchRatio.toFixed(2)} | EAR = {expandedAreaRatio.toFixed(2)}
            </text>
            <text x="10" y="78" fill="#94a3b8" fontSize="9">
              CLASS: ISO 484-1 CLASS S | SCALE: 1:25
            </text>
            <text x="10" y="98" fill="#f59e0b" fontSize="9" fontWeight="bold">
              TYPE: {propellerType.replace('_', ' ')}
            </text>
          </g>

          {activeTab === 'ga' && (
            <g>
              {/* FRONT ELEVATION VIEW */}
              <g transform="translate(250, 280)">
                {/* Concentric radial reference circles */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((rRatio) => (
                  <circle
                    key={rRatio}
                    cx="0"
                    cy="0"
                    r={rRatio * 180}
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Hub Circle */}
                <circle cx="0" cy="0" r={hubR_mm * 0.2} fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="0" cy="0" r={hubR_mm * 0.12} fill="none" stroke="#f59e0b" strokeWidth="1.5" />

                {/* Blades (Z) */}
                {Array.from({ length: numBlades }).map((_, i) => {
                  const angle = (i * 360) / numBlades;
                  return (
                    <g key={i} transform={`rotate(${angle})`}>
                      {/* Blade Outline */}
                      <path
                        d="M 0 -35 Q 40 -110 25 -180 Q 0 -195 -25 -180 Q -40 -110 0 -35 Z"
                        fill="#0284c7"
                        fillOpacity="0.25"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                      {/* Centerline */}
                      <line x1="0" y1="-35" x2="0" y2="-180" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                    </g>
                  );
                })}

                {/* Dimension Line D */}
                <line x1="-180" y1="210" x2="180" y2="210" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="-180" y1="190" x2="-180" y2="225" stroke="#f59e0b" strokeWidth="1" />
                <line x1="180" y1="190" x2="180" y2="225" stroke="#f59e0b" strokeWidth="1" />
                <text x="0" y="230" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">
                  PROPELLER DIAMETER D = {(diameterM * 1000).toFixed(0)} mm
                </text>
              </g>

              {/* SIDE PROFILE ELEVATION VIEW */}
              <g transform="translate(560, 280)">
                <text x="0" y="-220" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                  SIDE PROFILE (RAKE & HUB CONE)
                </text>

                {/* Hub Cylindrical Profile */}
                <rect x="-30" y="-36" width="60" height="72" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                {/* Cone */}
                <polygon points="30,-36 30,36 65,0" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

                {/* Upper Blade Side Rake Profile */}
                <path
                  d="M -10 -36 L 25 -180 L 45 -180 L 15 -36 Z"
                  fill="#0284c7"
                  fillOpacity="0.3"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                {/* Lower Blade Side Rake Profile */}
                <path
                  d="M -10 36 L 25 180 L 45 180 L 15 36 Z"
                  fill="#0284c7"
                  fillOpacity="0.3"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />

                {/* Shaft Centerline */}
                <line x1="-80" y1="0" x2="100" y2="0" stroke="#ef4444" strokeWidth="1" strokeDasharray="6 4" />
              </g>
            </g>
          )}

          {activeTab === 'blade_sections' && (
            <g transform="translate(60, 40)">
              <text x="0" y="20" fill="#38bdf8" fontSize="14" fontWeight="bold">
                RADIAL HYDROFOIL BLADE SECTIONS (0.2R TO 1.0R TIP)
              </text>

              {radialGeometry.map((sec, idx) => {
                const yPos = 70 + idx * 55;
                return (
                  <g key={sec.rRatio} transform={`translate(0, ${yPos})`}>
                    <text x="0" y="15" fill="#f59e0b" fontSize="12" fontWeight="bold">
                      r/R = {sec.rRatio.toFixed(1)}
                    </text>
                    <text x="90" y="15" fill="#94a3b8" fontSize="11">
                      Chord: {sec.chordMm} mm | Thickness: {sec.thicknessMm} mm | Twist: {sec.twistDeg}°
                    </text>

                    {/* Hydrofoil Section Contour */}
                    <path
                      d={`M 280 15 Q ${280 + sec.chordMm * 0.35} ${15 - sec.thicknessMm * 0.6} ${280 + sec.chordMm} 15 Q ${
                        280 + sec.chordMm * 0.35
                      } ${15 + sec.thicknessMm * 0.4} 280 15 Z`}
                      fill="#0284c7"
                      fillOpacity="0.35"
                      stroke="#38bdf8"
                      strokeWidth="1.8"
                    />

                    <line x1="260" y1="15" x2={290 + sec.chordMm} y2="15" stroke="#475569" strokeWidth="0.8" strokeDasharray="3 3" />
                  </g>
                );
              })}
            </g>
          )}

          {activeTab === 'distributions' && (
            <g transform="translate(80, 60)">
              <text x="0" y="20" fill="#38bdf8" fontSize="14" fontWeight="bold">
                RADIAL PARAMETER DISTRIBUTIONS (0.2R TO 1.0R)
              </text>

              {/* Pitch & Chord Chart axes */}
              <g transform="translate(40, 60)">
                <rect x="0" y="0" width="400" height="220" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <text x="200" y="-10" fill="#e2e8f0" fontSize="12" textAnchor="middle" fontWeight="bold">
                  Chord Length Distribution (mm)
                </text>
                {/* Radial Curve */}
                <path
                  d={`M ${radialGeometry.map((s) => `${(s.rRatio - 0.2) * 500}, ${200 - s.chordMm * 0.3}`).join(' L ')}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />
              </g>

              {/* Thickness Chart */}
              <g transform="translate(480, 60)">
                <rect x="0" y="0" width="400" height="220" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <text x="200" y="-10" fill="#e2e8f0" fontSize="12" textAnchor="middle" fontWeight="bold">
                  Maximum Blade Thickness Distribution (mm)
                </text>
                <path
                  d={`M ${radialGeometry.map((s) => `${(s.rRatio - 0.2) * 500}, ${200 - s.thicknessMm * 1.5}`).join(' L ')}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                />
              </g>
            </g>
          )}

          {activeTab === 'hub_detail' && (
            <g transform="translate(120, 80)">
              <text x="0" y="20" fill="#38bdf8" fontSize="14" fontWeight="bold">
                PROPELLER HUB & SHAFT KEYWAY CONNECTION DETAIL
              </text>

              {/* Hub Cutaway view */}
              <g transform="translate(200, 180)">
                <circle cx="0" cy="0" r="120" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="65" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />

                {/* Keyway Notch */}
                <rect x="-12" y="-78" width="24" height="20" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />

                <text x="0" y="5" fill="#e2e8f0" fontSize="11" textAnchor="middle">
                  SHAFT BORE Ø{(diameterM * 110).toFixed(0)} mm
                </text>
                <text x="0" y="-88" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">
                  ISO 3912 KEYWAY
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
