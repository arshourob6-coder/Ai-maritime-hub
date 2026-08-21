import React, { useState } from 'react';
import {
  ClipboardCheck,
  Camera,
  AlertTriangle,
  FileText,
  Sparkles,
  CheckCircle2,
  Sliders,
  Send,
  Loader2
} from 'lucide-react';

export const MarineSurveyAssistantView: React.FC = () => {
  const [surveyType, setSurveyType] = useState('Pre-Purchase Condition Survey');
  const [vesselName, setVesselName] = useState('MV Ocean Mariner');
  const [hullCondition, setHullCondition] = useState('Good (Minor Localized Pitting)');
  const [machineryRating, setMachineryRating] = useState('9/10 (Overhauled Main Bearing)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [surveySummary, setSurveySummary] = useState<string | null>(null);

  const handleRunSurveyAi = () => {
    setIsGenerating(true);
    setSurveySummary(null);

    setTimeout(() => {
      setIsGenerating(false);
      setSurveySummary(`
### MARINE SURVEY REPORT SUMMARY
**SURVEY TYPE:** ${surveyType}  
**VESSEL:** ${vesselName}  
**INSPECTION LOCATION:** Jurong Shipyard, Singapore  

---

#### 1. HULL & STRUCTURAL CONDITION
* **Outer Bottom & Side Shell Plating:** ${hullCondition}. Ultrasonic Thickness (UT) measurements reveal average steel wastage of **3.8%** (Class limit: 15.0%).
* **Cargo Holds & Tank Top Plating:** No heavy indentations or buckle deformation noted. Anode depletion at **35%**.

---

#### 2. MAIN ENGINE & AUXILIARY MACHINERY
* **Condition Assessment:** ${machineryRating}.
* **Deficiencies & Recommendations:**
  - *Code B:* Renew auxiliary generator fuel injection pipe high-pressure shielding before departure.
  - *Code C:* Clean sea water strainer box on starboard side.

#### 3. VALUATION & RISK RATING
* **Current Estimated Market Value:** **$28,500,000 USD**
* **Insurability Grade:** **Low Risk (Class Standard)**
      `);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full text-xs font-bold">
            <ClipboardCheck className="w-3.5 h-3.5 text-sky-400" /> Marine Surveyor & Inspector Assistant
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            AI Marine <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">Survey & Condition Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Pre-Purchase Inspections, Hull & Machinery Damage Surveys, On-Hire / Off-Hire Bunkers, Draft Surveys, and Casualty Loss adjustor templates.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Inputs */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-sky-400" /> Survey Configuration
          </h3>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Survey Type</label>
              <select
                value={surveyType}
                onChange={(e) => setSurveyType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 font-bold outline-none focus:border-sky-400"
              >
                <option>Pre-Purchase Condition Survey</option>
                <option>Hull & Machinery (H&M) Casualty Damage Survey</option>
                <option>On-Hire / Off-Hire Bunker & Condition Survey</option>
                <option>Draft Survey & Displacement Calculation</option>
                <option>P&I Cargo Damage & Grain Hold Fitness Survey</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Vessel Name</label>
              <input
                type="text"
                value={vesselName}
                onChange={(e) => setVesselName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 font-medium outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold block">Hull Plating & Structural Finding</label>
              <input
                type="text"
                value={hullCondition}
                onChange={(e) => setHullCondition(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 font-medium outline-none focus:border-sky-400"
              />
            </div>

            <button
              onClick={handleRunSurveyAi}
              disabled={isGenerating}
              className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin text-slate-950" /> : <Sparkles className="w-4 h-4 text-slate-950" />}
              <span>Generate Survey Audit</span>
            </button>
          </div>
        </div>

        {/* Right Preview */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="w-5 h-5 text-emerald-400" /> Executive Survey Summary
          </h3>

          {surveySummary ? (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 font-mono space-y-2">
              <pre className="whitespace-pre-wrap font-sans">{surveySummary}</pre>
            </div>
          ) : (
            <div className="p-8 border border-dashed border-slate-800 rounded-2xl text-center text-slate-400 text-xs">
              Fill in survey findings and click "Generate Survey Audit".
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
