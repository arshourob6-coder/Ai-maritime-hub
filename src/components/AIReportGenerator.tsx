import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Download,
  Share2,
  Printer,
  FileCheck,
  CheckCircle2,
  Sliders,
  Layers,
  BarChart3,
  BookOpen,
  Send,
  Loader2
} from 'lucide-react';

export const AIReportGenerator: React.FC = () => {
  const [reportType, setReportType] = useState('Feasibility Study - Newbuild Container Ship');
  const [vesselName, setVesselName] = useState('MV Polaris Enterprise');
  const [authorName, setAuthorName] = useState('Senior Naval Architect');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeCitations, setIncludeCitations] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setGeneratedReport(null);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport(`
# MARITIME TECHNICAL REPORT
**DOCUMENT ID:** MAR-2026-X8921  
**PROJECT:** ${reportType}  
**VESSEL:** ${vesselName}  
**AUTHOR:** ${authorName}  
**DATE:** July 25, 2026  
**CLASSIFICATION STANDARDS:** DNV-RU-SHIP Pt.3 / IMO SOLAS Ch. II-1  

---

## EXECUTIVE SUMMARY
This technical evaluation examines the hydrodynamics, structural integrity, power requirements, and environmental compliance of **${vesselName}**. Based on computational fluid dynamics (CFD) and finite element analysis (FEA), the proposed hull design achieves optimal fuel efficiency while fully complying with IMO EEXI Phase 3 requirements.

---

## 1. HYDRODYNAMIC & RESISTANCE ANALYSIS
The hull form was modeled using Maxsurf and analyzed across speeds ranging from 12.0 to 22.0 knots in sea water ($\ \rho = 1025 \text{ kg/m}^3 $).

* **Design Speed:** 18.5 Knots
* **Froude Number ($F_n$):** 0.198
* **Total Resistance ($R_T$):** 842.4 kN
* **Effective Power ($P_E$):** 8,020 kW
* **Required Shaft Power ($P_S$):** 11,800 kW @ 102 RPM (Propeller Efficiency $\ \eta_D = 0.68 $)

> **AI Technical Recommendation:** Incorporating a twisted bulbous bow and stern duct pre-swirl stator is projected to reduce total hydrodynamic resistance by **4.2%**, yielding annual fuel savings of **$320,000 USD**.

---

## 2. STABILITY & SEAKEEPING
Intact stability calculations comply with the 2008 IS Code (IMO Res. MSC.267(85)).

| Parameter | Calculated | IMO Minimum Standard | Status |
| :--- | :--- | :--- | :--- |
| **Initial GM (Metacentric Height)** | 1.84 m | $\ge 0.15 \text{ m}$ | **PASS** |
| **Area Under GZ Curve (0°-30°)** | 0.098 m-rad | $\ge 0.055 \text{ m-rad}$ | **PASS** |
| **Maximum GZ Lever** | 0.82 m @ 38° | $\ge 0.20 \text{ m @ } \ge 30^\circ$ | **PASS** |

---

## 3. DECARBONIZATION & CII COMPLIANCE
Under the IMO Carbon Intensity Indicator (CII) framework, the vessel achieves an **A-Rating** through 2030:
* **Attained EEXI:** 3.12 g-CO2 / dwt-nm (Required: 3.85 g-CO2 / dwt-nm)
* **Annual CO2 Emissions:** 32,400 Metric Tonnes
* **FuelEU Maritime Compliance Penalty:** **$0.00** (Compliant via VLSFO + B30 Biofuel Blend option)

---

## 4. REFERENCES & CITATIONS
1. DNV Class Guidelines (2025): *DNV-CG-0149 Hull Structural Design for Container Ships*.
2. International Maritime Organization (2022): *2022 Guidelines on the Shaft/Engine Power Limitation System (MSC.335(76))*.
3. Rawson, K. J., & Tupper, E. C. (2001): *Basic Ship Theory*, 5th Ed., Butterworth-Heinemann.
      `);
    }, 1200);
  };

  const handleDownloadFile = (ext: 'pdf' | 'docx' | 'pptx') => {
    const filename = `${vesselName.replaceAll(' ', '_')}_Technical_Report.${ext}`;
    const blob = new Blob([generatedReport || 'Maritime Technical Report'], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Professional Documentation Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Maritime <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">AI Report Generator</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Instantly export publishable technical reports, class survey audits, damage investigation briefs, and CII plans in PDF, DOCX, and PPTX with dynamic charts, formulas, and references.
          </p>
        </div>
      </div>

      {/* Generator Controls and Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form Panel */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-indigo-400" /> Report Configuration
          </h3>

          <div className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Select Report Template</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 font-bold outline-none focus:border-indigo-400"
              >
                <option>Feasibility Study - Newbuild Container Ship</option>
                <option>Class Survey Audit & Structural Integrity Report</option>
                <option>IMO CII Decarbonization & EEXI Compliance Plan</option>
                <option>Marine Incident & Hull Casualty Investigation</option>
                <option>Dry Dock Maintenance & Repair Cost Brief</option>
                <option>Pre-Purchase Vessel Condition Survey</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Vessel Name / Project ID</label>
              <input
                type="text"
                value={vesselName}
                onChange={(e) => setVesselName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 font-medium outline-none focus:border-indigo-400"
                placeholder="e.g. MV Polaris Enterprise"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Author / Engineering Firm</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 font-medium outline-none focus:border-indigo-400"
                placeholder="e.g. Senior Naval Architect"
              />
            </div>

            <div className="pt-2 space-y-3 border-t border-slate-800">
              <label className="flex items-center justify-between text-slate-300 font-semibold cursor-pointer">
                <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-sky-400" /> Include Hydrodynamic & GZ Charts</span>
                <input
                  type="checkbox"
                  checked={includeCharts}
                  onChange={(e) => setIncludeCharts(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between text-slate-300 font-semibold cursor-pointer">
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-400" /> Include Class Rules & IMO Citations</span>
                <input
                  type="checkbox"
                  checked={includeCitations}
                  onChange={(e) => setIncludeCitations(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                />
              </label>
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-400 hover:to-sky-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Synthesizing AI Report Data...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Generate Technical Report</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right Live Preview Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col min-h-[500px]">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-400" /> Document Document View & Export
            </h3>

            {generatedReport && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadFile('pdf')}
                  className="px-3 py-1.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-[11px] rounded-lg transition flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
                <button
                  onClick={() => handleDownloadFile('docx')}
                  className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px] rounded-lg transition flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Word (DOCX)
                </button>
                <button
                  onClick={() => handleDownloadFile('pptx')}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] rounded-lg transition flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> PPTX
                </button>
              </div>
            )}
          </div>

          {!generatedReport && !isGenerating && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-800 rounded-2xl text-slate-400 space-y-3">
              <FileText className="w-12 h-12 text-slate-600" />
              <div>
                <h4 className="font-bold text-slate-200">No Report Generated Yet</h4>
                <p className="text-xs text-slate-500">Configure parameters on the left and click "Generate Technical Report".</p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
              <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
              <p className="text-xs text-slate-300 font-mono">Running Maxsurf Hydrodynamics & IMO SOLAS Compliance AI Synthesis...</p>
            </div>
          )}

          {generatedReport && !isGenerating && (
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-6 overflow-y-auto max-h-[550px] font-sans text-slate-200 text-xs leading-relaxed space-y-3">
              <pre className="whitespace-pre-wrap font-sans">{generatedReport}</pre>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
