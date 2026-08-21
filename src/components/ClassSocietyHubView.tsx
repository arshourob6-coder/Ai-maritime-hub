import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Search,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Shield,
  Layers,
  Send,
  Loader2
} from 'lucide-react';

interface ClassSociety {
  id: string;
  code: string;
  name: string;
  country: string;
  flagEmoji: string;
  logoColor: string;
  hullNotation: string;
  machineryNotation: string;
  keyRuleDoc: string;
}

const CLASS_SOCIETIES: ClassSociety[] = [
  {
    id: 'dnv',
    code: 'DNV',
    name: 'Det Norske Veritas',
    country: 'Norway',
    flagEmoji: '🇳🇴',
    logoColor: 'text-sky-400',
    hullNotation: '1A Container Ship BIS BWM-T Cleanship',
    machineryNotation: 'MC E0 NAUT-OC',
    keyRuleDoc: 'DNV-RU-SHIP Pt.3 Hull Structural Design'
  },
  {
    id: 'abs',
    code: 'ABS',
    name: 'American Bureau of Shipping',
    country: 'United States',
    flagEmoji: '🇺🇸',
    logoColor: 'text-indigo-400',
    hullNotation: '✠ A1 Container Carrier Ⓢ ✠ AMS',
    machineryNotation: '✠ ACCU SH-DLA',
    keyRuleDoc: 'ABS Rules for Building and Classing Steel Vessels (2026)'
  },
  {
    id: 'lr',
    code: 'LR',
    name: "Lloyd's Register",
    country: 'United Kingdom',
    flagEmoji: '🇬🇧',
    logoColor: 'text-amber-400',
    hullNotation: '✠ 100A1 Container Ship ShipRight(SDA, FDA)',
    machineryNotation: '✠ LMC UMSC',
    keyRuleDoc: "LR Rules and Regulations for Classification of Ships"
  },
  {
    id: 'bv',
    code: 'BV',
    name: 'Bureau Veritas',
    country: 'France',
    flagEmoji: '🇫🇷',
    logoColor: 'text-rose-400',
    hullNotation: 'I ✠ Hull ✠ Mach Container Ship Unrestricted Navigation',
    machineryNotation: 'AUT-UMS CLEANSHIP',
    keyRuleDoc: 'BV NR467 Rules for Steel Ships'
  },
  {
    id: 'classnk',
    code: 'ClassNK',
    name: 'Nippon Kaiji Kyokai',
    country: 'Japan',
    flagEmoji: '🇯🇵',
    logoColor: 'text-emerald-400',
    hullNotation: 'NS* Container Carrier MNS*',
    machineryNotation: 'M0 PS-CM',
    keyRuleDoc: 'NK Rules for the Survey and Construction of Steel Ships'
  },
  {
    id: 'rina',
    code: 'RINA',
    name: 'Registro Italiano Navale',
    country: 'Italy',
    flagEmoji: '🇮🇹',
    logoColor: 'text-cyan-400',
    hullNotation: 'C ✠ HULL ✠ MACH Container Ship Green Plus',
    machineryNotation: 'AUT-UMS AVM-APS',
    keyRuleDoc: 'RINA Rules for Classification of Ships'
  },
  {
    id: 'ccs',
    code: 'CCS',
    name: 'China Classification Society',
    country: 'China',
    flagEmoji: '🇨🇳',
    logoColor: 'text-red-400',
    hullNotation: '★ CSA Container Ship ★ CSM',
    machineryNotation: 'AUT-0 Green Ship I',
    keyRuleDoc: 'CCS Rules for Classification of Sea-Going Steel Ships'
  }
];

export const ClassSocietyHubView: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<ClassSociety>(CLASS_SOCIETIES[0]);
  const [userQuestion, setUserQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  const handleAskRuleAssistant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    setIsAsking(true);
    setAiAnswer(null);

    setTimeout(() => {
      setIsAsking(false);
      setAiAnswer(`
### ${selectedClass.code} Class Rule Analysis

Regarding your query: **"${userQuestion}"**

Under **${selectedClass.keyRuleDoc}**:
1. **Min Hull Girder Section Modulus ($W_{\\min}$):**
   Calculated according to Pt.3 Ch.6 Sec.2:
   $$ W_{\\min} = C_w \\cdot L^2 \\cdot B \\cdot (C_b + 0.7) \\quad [\\text{cm}^3] $$
2. **Corrosion Margin ($t_k$):**
   Requires a minimum $+1.5\\text{ mm}$ to $+2.5\\text{ mm}$ addition on bottom shell plating and inner bottom plates.
3. **Class Notation Compliance:**
   Equivalent notation for **${selectedClass.code}** is \`${selectedClass.hullNotation}\`.
      `);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-amber-400" /> IACS Member Classification Societies
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Classification Society <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-sky-300 to-emerald-400">Rules & Notation Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Searchable class rules, structural hull notation equivalencies, and AI Rule Assistant for DNV, ABS, Lloyd's Register, BV, ClassNK, RINA, and CCS.
          </p>
        </div>
      </div>

      {/* Class Society Cards Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {CLASS_SOCIETIES.map((cls) => {
          const isSelected = selectedClass.id === cls.id;
          return (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls)}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 text-white font-bold shadow-lg scale-105'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-xl">{cls.flagEmoji}</span>
              <span className={`font-black text-sm ${cls.logoColor}`}>{cls.code}</span>
              <span className="text-[10px] text-slate-400 truncate w-full">{cls.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Class Details & AI Rule Query */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Class Info */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="text-3xl">{selectedClass.flagEmoji}</span>
            <div>
              <h3 className="text-lg font-black text-white">{selectedClass.name} ({selectedClass.code})</h3>
              <p className="text-xs text-slate-400">{selectedClass.keyRuleDoc}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-amber-400 font-bold block uppercase">Hull Class Notation</span>
              <span className="font-mono text-white font-bold block">{selectedClass.hullNotation}</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-sky-400 font-bold block uppercase">Machinery & Automation Notation</span>
              <span className="font-mono text-white font-bold block">{selectedClass.machineryNotation}</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold block uppercase">Headquarters Location</span>
              <span className="text-slate-300 font-medium block">{selectedClass.country} • IACS Member</span>
            </div>
          </div>
        </div>

        {/* Right AI Class Rule Assistant */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-amber-400" /> AI {selectedClass.code} Class Rule Assistant
            </h3>
            <p className="text-xs text-slate-300 mt-2">
              Ask any rule question regarding plate thickness, minimum section modulus, ice class notations, or engine automation.
            </p>
          </div>

          {aiAnswer && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 font-mono space-y-2 overflow-y-auto max-h-[300px]">
              <pre className="whitespace-pre-wrap font-sans">{aiAnswer}</pre>
            </div>
          )}

          <form onSubmit={handleAskRuleAssistant} className="flex gap-2">
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder={`Ask a question about ${selectedClass.code} rules (e.g. minimum bottom plate thickness)...`}
              className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-xs font-medium outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={isAsking}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow transition flex items-center gap-1.5 shrink-0"
            >
              {isAsking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Ask</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
