import React, { useState } from 'react';
import { PlanType, Currency } from '../../types';
import {
  GraduationCap,
  BookOpen,
  FileCode,
  FileSpreadsheet,
  Ship,
  ShieldAlert,
  Compass,
  Download,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Zap,
  CheckCircle2,
  FileText,
  Bookmark,
  Layers,
  ArrowRight
} from 'lucide-react';

interface MaritimeResearchTabProps {
  userPlan: PlanType;
  currency: Currency;
  onOpenPricing: () => void;
}

export const MaritimeResearchTab: React.FC<MaritimeResearchTabProps> = ({
  userPlan,
  currency,
  onOpenPricing
}) => {
  const [activeResearchTool, setActiveResearchTool] = useState<
    | 'thesis'
    | 'journal_paper'
    | 'imo_processor'
    | 'technical_report'
    | 'drawing_organizer'
    | 'regulations_audit'
    | 'engineering_report'
    | 'bibtex_extractor'
  >('thesis');

  const [thesisTitle, setThesisTitle] = useState('Hydrodynamic Optimization of Hull Form and Bulbous Bow for 8,500 TEU Container Vessel in Parametric Waves');
  const [authorName, setAuthorName] = useState('Md. Arifur Rahman');
  const [degreeLevel, setDegreeLevel] = useState<'BSc' | 'MSc' | 'PhD'>('MSc');
  const [targetJournal, setTargetJournal] = useState('Elsevier Ocean Engineering');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedOutput(null);

    setTimeout(() => {
      setIsGenerating(false);
      switch (activeResearchTool) {
        case 'thesis':
          setGeneratedOutput(`\\documentclass[12pt,a4paper,oneside]{report}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{cite}
\\usepackage{hyperref}

\\title{${thesisTitle}}
\\author{${authorName}}
\\date{Department of Naval Architecture and Marine Engineering \\\\ Bangladesh University of Engineering and Technology (BUET) \\\\ August 2026}

\\begin{document}
\\maketitle

\\begin{abstract}
This ${degreeLevel} thesis presents a comprehensive numerical and experimental investigation into the wave-making resistance and powering optimization of an 8,500 TEU container ship. Utilizing OpenFOAM Reynolds-Averaged Navier-Stokes (RANS) solver coupled with Volume of Fluid (VoF) free-surface tracking, parametric bulbous bow geometries were evaluated at design Froude number Fn = 0.24. Results demonstrate a 6.8\\% reduction in total calm-water resistance and compliance with IMO EEXI Phase 3 mandates.
\\end{abstract}

\\tableofcontents
\\listoffigures
\\listoftables

\\chapter{Introduction and Regulatory Context}
\\section{Background and IMO MEPC Decarbonization Directives}
International shipping accounts for nearly 3\\% of anthropogenic greenhouse gas emissions...
\\end{document}`);
          break;

        case 'journal_paper':
          setGeneratedOutput(`### Formatted Manuscript for ${targetJournal}
**Article Type:** Original Research Paper | **Double-Blind Review Ready**

**Title:** High-Order Verification and Validation of Viscous Flow Around a Twin-Screw Surface Combatant
**Keywords:** CFD; Hydrodynamics; ITTC Grid Convergence Index (GCI); Form Factor (1+k); Form Resistance

**Abstract:** 
In this study, turbulent flow past a 1:50 scale model of a twin-screw surface vessel is resolved using the SST k-omega turbulence closure. Numerical verification is performed across three geometrically similar unstructured meshes with a refinement ratio r = sqrt(2). The calculated Grid Convergence Index (GCI) for total resistance coefficient C_T is 1.14%, indicating asymptotic convergence.

**1. Nomenclature & ITTC Coordinates**
* L_PP: Length between perpendiculars (m)
* C_T: Total resistance coefficient = R_T / (0.5 * rho * S * V^2)
* Fn: Froude number = V / sqrt(g * L_PP)`);
          break;

        case 'imo_processor':
          setGeneratedOutput(`### IMO Resolution & Circular Summary Dossier
* **Source Resolution:** IMO Res. MEPC.328(76) / Res. MSC.474(102)
* **Status:** Statutory Mandatory Amendment in force
* **Key Compliance Checklist:**
  1. [x] EEXI Technical File approved by Recognized Organization (RO).
  2. [x] In-service Shaft Power Limitation (ShaPoLi) tamper-proof recording seal.
  3. [x] Annual SEEMP Part III carbon intensity operational reporting verified.
  4. [x] Minimum Propulsion Power in Adverse Weather (MEPC.1/Circ.850/Rev.3) assessment.`);
          break;

        case 'bibtex_extractor':
          setGeneratedOutput(`@article{rahman2026hydrodynamic,
  title={Hydrodynamic Optimization of Hull Form and Bulbous Bow for Container Vessels in Waves},
  author={Rahman, Md. Arifur and Vance, David and Nielsen, Henrik},
  journal={Elsevier Ocean Engineering},
  volume={312},
  pages={118402},
  year={2026},
  publisher={Elsevier},
  doi={10.1016/j.oceaneng.2026.118402}
}

@standard{imo_mepc328_76,
  title={Resolution MEPC.328(76) Amendments to MARPOL Annex VI},
  organization={International Maritime Organization (IMO)},
  year={2021},
  address={London, UK}
}`);
          break;

        case 'technical_report':
          setGeneratedOutput(`### Shipyard Drydocking & NDT Hull Survey Technical Report
**Yard Slot:** Chittagong Drydock Ltd. (CDDL) / Dock #1 | **Class:** DNV
**Vessel:** M/T Bengal Pioneer | **Deadweight:** 47,500 DWT

1. **Sea Chests & Anodes:** 48 Zinc sacrificial anodes replaced (net weight 840 kg).
2. **Propeller Polish:** 4-bladed Ni-Al-Bronze propeller polished to Rupert Scale Grade A.
3. **Tailshaft Clearance:** Forward bearing 1.42 mm, Aft bearing 1.88 mm (Allowable: 2.50 mm).
4. **Sea Valves Overhaul:** 24 King valves pressure tested to 1.5x design pressure.`);
          break;

        case 'drawing_organizer':
          setGeneratedOutput(`### Ship Drawings Metadata & Indexing Manifest
1. **DWG-GA-001:** General Arrangement Profile & Decks (Scale 1:200, Rev D, Approved by DNV)
2. **DWG-LP-002:** Lines Plan & Body Plan Offsets (Scale 1:100, 21 Transverse Stations)
3. **DWG-MS-003:** Midship Section & Longitudinal Scantlings (Rule Scantlings verified per Part 3 Ch 1)
4. **DWG-CP-004:** Capacity Plan & Tank Hydrostatic Sounding Tables (HFO, MGO, Ballast Tanks 1-6)`);
          break;

        case 'regulations_audit':
          setGeneratedOutput(`### Maritime Statutory Regulation Cross-Reference Audit
* **SOLAS Chapter II-1 (Subdivision & Stability):** COMPLIANT (Probabilistic Index A > R)
* **SOLAS Chapter II-2 (Fire Protection):** COMPLIANT (A-60 Bulkheads in Machinery Space)
* **MARPOL Annex I (Oil Pollution):** COMPLIANT (15 ppm Oily Water Separator with Alarm)
* **MARPOL Annex VI (Air Pollution):** COMPLIANT (Scrubber / 0.50% VLSFO in ECA Zones)
* **MLC 2006 (Seafarers Accommodation):** COMPLIANT (Headroom >= 203 cm, Noise <= 60 dBA)`);
          break;

        case 'engineering_report':
          setGeneratedOutput(`### Towing Tank Model Resistance Experiment Report
**Facility:** National Maritime Hydrodynamics Laboratory
**Model Scale:** lambda = 32.5 | **Water Temperature:** 18.4°C | **Density:** 998.5 kg/m³

* **Measured Total Resistance (Model):** R_Tm = 14.82 N at V_m = 1.42 m/s
* **Frictional Line:** ITTC 1957 Correlation Line (C_Fm = 0.075 / (log10(Re) - 2)^2)
* **Form Factor (1+k):** 1.185 (Prohaska plot extrapolation at low Fn)
* **Predicted Full-Scale Effective Power (P_E):** 18,450 kW at 22.0 knots.`);
          break;
      }
    }, 1200);
  };

  const handleCopy = () => {
    if (!generatedOutput) return;
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-500/30 rounded-xl text-sky-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Maritime Research & Publication Engineering Suite</h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold uppercase bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Academic & Class Standard
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Generate formatted BSc/MSc theses, journal manuscripts (Elsevier, IEEE, SNAME, RINA), IMO resolution summaries, and BibTeX citations.
            </p>
          </div>
        </div>
      </div>

      {/* Specialized Tool Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { id: 'thesis', label: 'Thesis Formatter', desc: 'BSc, MSc, PhD LaTeX / Word', icon: <GraduationCap className="w-4 h-4 text-purple-400" /> },
          { id: 'journal_paper', label: 'Journal Formatter', desc: 'Elsevier, IEEE, SNAME, RINA', icon: <BookOpen className="w-4 h-4 text-sky-400" /> },
          { id: 'imo_processor', label: 'IMO Doc Processor', desc: 'MEPC, MSC, FAL resolutions', icon: <ShieldAlert className="w-4 h-4 text-emerald-400" /> },
          { id: 'technical_report', label: 'Drydock Specs', desc: 'Shipyard overhaul & NDT', icon: <Ship className="w-4 h-4 text-amber-400" /> },
          { id: 'drawing_organizer', label: 'Ship Drawings Index', desc: 'GA, Lines, Midship metadata', icon: <Layers className="w-4 h-4 text-indigo-400" /> },
          { id: 'regulations_audit', label: 'Regulations Audit', desc: 'SOLAS, MARPOL cross-check', icon: <Compass className="w-4 h-4 text-cyan-400" /> },
          { id: 'engineering_report', label: 'Towing Tank & CFD', desc: 'Model test & GCI reports', icon: <FileSpreadsheet className="w-4 h-4 text-pink-400" /> },
          { id: 'bibtex_extractor', label: 'BibTeX Citation Tool', desc: 'Auto citation generator', icon: <Bookmark className="w-4 h-4 text-teal-400" /> }
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              setActiveResearchTool(tool.id as any);
              setGeneratedOutput(null);
            }}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeResearchTool === tool.id
                ? 'bg-sky-500/15 border-sky-500 text-white shadow-md'
                : 'bg-slate-900 border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {tool.icon}
              <span className="text-xs font-bold truncate">{tool.label}</span>
            </div>
            <span className="text-[10px] text-slate-400 block truncate">{tool.desc}</span>
          </button>
        ))}
      </div>

      {/* Main Workspace Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form & Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          {activeResearchTool === 'thesis' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-white block mb-1">Degree Level:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['BSc', 'MSc', 'PhD'] as const).map((deg) => (
                    <button
                      key={deg}
                      onClick={() => setDegreeLevel(deg)}
                      className={`py-1.5 text-xs rounded-xl font-bold transition-all ${
                        degreeLevel === deg
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {deg} Thesis
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-white block mb-1">Thesis / Dissertation Title:</label>
                <input
                  type="text"
                  value={thesisTitle}
                  onChange={(e) => setThesisTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white block mb-1">Author Name & Affiliation:</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          )}

          {activeResearchTool === 'journal_paper' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-white block mb-1">Target Maritime Journal:</label>
                <select
                  value={targetJournal}
                  onChange={(e) => setTargetJournal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option>Elsevier Ocean Engineering</option>
                  <option>IEEE Journal of Oceanic Engineering</option>
                  <option>Applied Ocean Research</option>
                  <option>SNAME Journal of Ship Production & Design</option>
                  <option>RINA International Journal of Maritime Engineering (IJME)</option>
                  <option>MDPI Journal of Marine Science and Engineering (JMSE)</option>
                </select>
              </div>
            </div>
          )}

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
            <span className="font-bold text-slate-200 block">Standard Features Included:</span>
            <p>✓ LaTeX source files & Overleaf sync</p>
            <p>✓ Compliant with ITTC Recommended Procedures</p>
            <p>✓ Auto-generated preliminary pages & nomenclature</p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Formatting & Assembling Document...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Generate {activeResearchTool.replace('_', ' ').toUpperCase()}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Code & Markdown Output (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-white">Generated Academic & Engineering Output</span>
              </div>
              <div className="flex items-center gap-2">
                {generatedOutput && (
                  <>
                    <button
                      onClick={handleCopy}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => alert('Downloading LaTeX/PDF package...')}
                      className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Bundle</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
              {generatedOutput || '// Select options on the left and click "Generate" to compile formatted LaTeX, BibTeX, or technical memos.'}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Verified with SNAME & IMO Resolution style guides
            </span>
            <span>Overleaf & Mendeley Compatible</span>
          </div>
        </div>
      </div>
    </div>
  );
};
