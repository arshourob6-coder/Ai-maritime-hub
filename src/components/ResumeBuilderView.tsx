import React, { useState } from 'react';
import {
  FileText,
  User,
  Award,
  Sparkles,
  Download,
  CheckCircle2,
  Sliders,
  Send,
  Ship
} from 'lucide-react';

export const ResumeBuilderView: React.FC = () => {
  const [fullName, setFullName] = useState('Captain Alex Vance');
  const [targetRole, setTargetRole] = useState('Master Mariner / Chief Mate');
  const [seaTimeYears, setSeaTimeYears] = useState(8);
  const [stcwCerts, setStcwCerts] = useState('STCW II/2 Master Unlimited, ECDIS, GMDSS, ARPA, Advanced Oil Tanker');
  const [generatedCv, setGeneratedCv] = useState<string | null>(null);

  const handleGenerateCv = () => {
    setGeneratedCv(`
# ${fullName.toUpperCase()}
**TARGET POSITION:** ${targetRole}  
**LOCATION:** Rotterdam, Netherlands / Global Relocation  
**STCW ENDORSEMENTS:** ${stcwCerts}  
**SEA TIME LOG:** ${seaTimeYears} Years Onboard Unlimited Tonnage Vessels  

---

## PROFESSIONAL SUMMARY
Dedicated and safety-driven **${targetRole}** with over **${seaTimeYears} years** of sea-going experience on LNG Carriers, VLCCs, and Container vessels. Expert in passage planning, ISM Code Safety Management Systems, ECDIS navigation, and port state control (PSC) audits with 100% zero-deficiency track record.

---

## SEA SERVICE LOG & EXPERIENCE
* **Chief Officer | MV Polaris Enterprise (8,500 TEU Container)**  
  *Jan 2024 – Present (18 Months Sea Time)*  
  - Supervised cargo stowage, stability calculations, and dangerous goods (IMDG Code) ballast water management.
  - Led a multicultural crew of 22 seafarers during trans-Pacific passages.

* **Second Mate | MT Neptune Star (VLCC 300,000 DWT)**  
  *Jun 2021 – Dec 2023 (24 Months Sea Time)*  
  - Managed bridge navigation watches, GMDSS radio communications, and chart maintenance.

---

## CERTIFICATIONS & TRAINING
* **Master Mariner STCW II/2 Unlimited** – Netherlands Flag State
* **Advanced Chemical & Tanker Cargo Operations** – DNV Academy
* **DP Dynamic Positioning Operator License** – Nautical Institute
    `);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-sky-400" /> AI Seafarer & Naval Architect Resume Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Maritime <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">CV & Cover Letter Builder</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            ATS-optimized maritime resume builder with integrated sea time logs, STCW endorsements, flag state licenses, and vessel rank templates.
          </p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-xs">
          <h3 className="font-extrabold text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-400" /> Seafarer Profile Details
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-slate-300 font-bold block mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Target Rank / Job Role</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 font-bold outline-none focus:border-sky-400"
              >
                <option>Master Mariner / Chief Mate</option>
                <option>Chief Engineer / 2nd Engineer</option>
                <option>Senior Naval Architect</option>
                <option>Port Operations Superintendent</option>
                <option>Offshore DP Operator</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Total Sea Time (Years)</label>
              <input
                type="number"
                value={seaTimeYears}
                onChange={(e) => setSeaTimeYears(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-sky-400 font-mono"
              />
            </div>

            <button
              onClick={handleGenerateCv}
              className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl transition shadow flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Build ATS Maritime CV</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" /> Generated Resume Preview
          </h3>

          {generatedCv ? (
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 font-mono space-y-2 overflow-y-auto max-h-[500px]">
              <pre className="whitespace-pre-wrap font-sans">{generatedCv}</pre>
            </div>
          ) : (
            <div className="p-8 border border-dashed border-slate-800 rounded-2xl text-center text-slate-400 text-xs">
              Fill details on the left and click "Build ATS Maritime CV".
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
