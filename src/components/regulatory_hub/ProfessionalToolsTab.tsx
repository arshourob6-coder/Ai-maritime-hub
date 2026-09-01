import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Shield,
  Clock,
  Sparkles,
  Download,
  Flame,
  Waves,
  Award,
  Zap,
  CreditCard,
  Globe,
  Sliders
} from 'lucide-react';

export const ProfessionalToolsTab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'calculator' | 'pscChecklist' | 'subscription'>('calculator');

  // EEXI & CII Calculator state
  const [vesselDwt, setVesselDwt] = useState<number>(64000);
  const [annualDistanceNm, setAnnualDistanceNm] = useState<number>(48000);
  const [annualFuelConsTons, setAnnualFuelConsTons] = useState<number>(3850);
  const [fuelTypeCarbonFactor, setFuelTypeCarbonFactor] = useState<number>(3.114); // VLSFO (t-CO2 / t-fuel)

  // Rest Hour Validator state
  const [restHours24h, setRestHours24h] = useState<number>(11);
  const [restHours7d, setRestHours7d] = useState<number>(84);
  const [longestRestBlock, setLongestRestBlock] = useState<number>(7);

  // Currency & Billing state
  const [currency, setCurrency] = useState<'USD' | 'BDT' | 'EUR' | 'GBP' | 'SGD'>('USD');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // Calculations
  const totalCo2Tons = annualFuelConsTons * fuelTypeCarbonFactor;
  const attainedCii = (totalCo2Tons * 1_000_000) / (vesselDwt * annualDistanceNm);
  const baselineCii = 4.5; // g-CO2 / dwt-nm
  const ciiRatio = attainedCii / baselineCii;

  let ciiRating = 'C';
  let ciiColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  if (ciiRatio < 0.85) {
    ciiRating = 'A';
    ciiColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  } else if (ciiRatio < 0.95) {
    ciiRating = 'B';
    ciiColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
  } else if (ciiRatio < 1.05) {
    ciiRating = 'C';
    ciiColor = 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
  } else if (ciiRatio < 1.15) {
    ciiRating = 'D';
    ciiColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  } else {
    ciiRating = 'E';
    ciiColor = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  }

  // Rest hour validation
  const rest24hValid = restHours24h >= 10;
  const rest7dValid = restHours7d >= 77;
  const longestBlockValid = longestRestBlock >= 6;
  const isStcwCompliant = rest24hValid && rest7dValid && longestBlockValid;

  // PSC Checklist items
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'psc-1': true,
    'psc-2': true,
    'psc-3': true,
    'psc-4': false,
    'psc-5': true
  });

  const pscItems = [
    { id: 'psc-1', title: 'Emergency Fire Pump & Isolating Valves Operational (SOLAS II-2/10)' },
    { id: 'psc-2', title: 'Lifeboat On-Load Release Hook Servicing & Hydrostatic Interlocks (SOLAS III/20)' },
    { id: 'psc-3', title: '15 ppm OWS Auto-Stop 3-Way Valve Functional Test & Alarm (MARPOL Annex I/14)' },
    { id: 'psc-4', title: 'ECDIS Electronic Navigational Charts (ENCs) Up-to-Date with Notice to Mariners (SOLAS V/19)' },
    { id: 'psc-5', title: 'Quick Closing Fuel Tank Emergency Shut-Off Valves Tested (SOLAS II-2/4)' },
    { id: 'psc-6', title: 'Magnetic Compass Deviation Card & Gyro Compass Repeater Synchronization (SOLAS V/19)' },
    { id: 'psc-7', title: 'Emergency Generator Auto-Start & On-Load Breaker within 45 Seconds (SOLAS II-1/43)' },
    { id: 'psc-8', title: 'DMLC Part I & Part II and Valid Seafarer Employment Agreements (MLC 2006)' }
  ];

  const togglePsc = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getPrice = (monthlyUsd: number) => {
    const annualMultiplier = billingCycle === 'yearly' ? 10 : 1; // 2 months free on yearly
    let rate = 1;
    let symbol = '$';

    if (currency === 'BDT') {
      rate = 120;
      symbol = '৳';
    } else if (currency === 'EUR') {
      rate = 0.92;
      symbol = '€';
    } else if (currency === 'GBP') {
      rate = 0.79;
      symbol = '£';
    } else if (currency === 'SGD') {
      rate = 1.34;
      symbol = 'S$';
    }

    const price = Math.round(monthlyUsd * rate * annualMultiplier);
    return `${symbol}${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Professional Suite
            </span>
            <span className="text-xs text-slate-400">Technical Calculation & Audit Verification</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Regulatory Engineering Calculators & Pre-PSC Tools</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            CII Decarbonization Calculator, STCW Rest Hours Validator, Pre-PSC Inspection Checklists, and Global Scalable Subscription Plans.
          </p>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTool('calculator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTool === 'calculator' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculators</span>
          </button>
          <button
            onClick={() => setActiveTool('pscChecklist')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTool === 'pscChecklist' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>PSC Inspector</span>
          </button>
          <button
            onClick={() => setActiveTool('subscription')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTool === 'subscription' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Subscription</span>
          </button>
        </div>
      </div>

      {/* Tool 1: Interactive Calculators */}
      {activeTool === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MARPOL CII Decarbonization Calculator */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">MARPOL Annex VI Reg. 28</span>
                <h3 className="text-base font-bold text-white mt-0.5">Carbon Intensity Indicator (CII) Rating Engine</h3>
              </div>
              <div className={`px-4 py-1.5 rounded-xl border text-base font-bold font-mono ${ciiColor}`}>
                Rating: Grade {ciiRating}
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Deadweight Tonnage (DWT)</label>
                  <input
                    type="number"
                    value={vesselDwt}
                    onChange={(e) => setVesselDwt(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Annual Distance (NM)</label>
                  <input
                    type="number"
                    value={annualDistanceNm}
                    onChange={(e) => setAnnualDistanceNm(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Annual Fuel Consumed (MT)</label>
                  <input
                    type="number"
                    value={annualFuelConsTons}
                    onChange={(e) => setAnnualFuelConsTons(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Fuel Carbon Factor (Cf)</label>
                  <select
                    value={fuelTypeCarbonFactor}
                    onChange={(e) => setFuelTypeCarbonFactor(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value={3.114}>VLSFO / HFO (3.114)</option>
                    <option value={3.206}>MGO / LSMGO (3.206)</option>
                    <option value={2.75}>LNG Dual-Fuel (2.750)</option>
                    <option value={1.375}>Methanol (1.375)</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Total Annual CO₂ Emitted:</span>
                  <strong className="text-white font-mono">{totalCo2Tons.toLocaleString()} MT CO₂</strong>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Attained Operational CII:</span>
                  <strong className="text-cyan-400 font-mono">{attainedCii.toFixed(3)} g CO₂ / (dwt · nm)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* STCW Rest Hours Compliance Validator */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">STCW Section A-VIII/1 & MLC 2006</span>
                <h3 className="text-base font-bold text-white mt-0.5">Seafarer Rest Hours Statutory Validator</h3>
              </div>
              <div className={`px-4 py-1.5 rounded-xl border text-xs font-bold font-mono ${
                isStcwCompliant
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}>
                {isStcwCompliant ? 'STCW / MLC Compliant' : 'Violation Detected'}
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Total Hours of Rest in Last 24-Hour Period (Min 10 hrs)</label>
                <input
                  type="number"
                  value={restHours24h}
                  onChange={(e) => setRestHours24h(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Total Hours of Rest in Last 7-Day Period (Min 77 hrs)</label>
                <input
                  type="number"
                  value={restHours7d}
                  onChange={(e) => setRestHours7d(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Longest Single Uninterrupted Rest Period (Min 6 hrs)</label>
                <input
                  type="number"
                  value={longestRestBlock}
                  onChange={(e) => setLongestRestBlock(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>24-Hour Rest Condition (≥10 hrs):</span>
                  <span className={rest24hValid ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {rest24hValid ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>7-Day Rest Condition (≥77 hrs):</span>
                  <span className={rest7dValid ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {rest7dValid ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Primary Rest Block (≥6 hrs uninterrupted):</span>
                  <span className={longestBlockValid ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {longestBlockValid ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tool 2: PSC Inspection Prep */}
      {activeTool === 'pscChecklist' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" /> Pre-Port State Control (PSC) High-Risk Verification Checklist
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Targets Tokyo MoU, Paris MoU, and USCG top 10 grounds for immediate vessel detention.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              {Object.values(checkedItems).filter(Boolean).length} / {pscItems.length} Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {pscItems.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => togglePsc(item.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-emerald-500 mt-0.5 shrink-0"
                  />
                  <span className="text-xs font-medium leading-relaxed">{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tool 3: Global Scalable Subscription Plans */}
      {activeTool === 'subscription' && (
        <div className="space-y-6">
          {/* Currency & Billing Controls */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Select Currency:</span>
              <div className="flex gap-1">
                {(['USD', 'BDT', 'EUR', 'GBP', 'SGD'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      currency === c
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Billing:</span>
              <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex gap-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    billingCycle === 'monthly' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                    billingCycle === 'yearly' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Yearly</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-400 text-slate-950 font-bold">2 Months Free</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student & Cadet Tier */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cadet & Student</span>
                <h4 className="text-lg font-bold text-white">Maritime Academic</h4>
                <div className="text-2xl font-black text-white font-mono">
                  {getPrice(5)} <span className="text-xs text-slate-400 font-normal">/ {billingCycle}</span>
                </div>
                <p className="text-xs text-slate-400">Essential regulatory database access for maritime academy students and deck/engine cadets.</p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Full IMO, SOLAS & MARPOL access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> STCW competency tables
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100 RAG AI queries per month
                  </li>
                </ul>
              </div>

              <button className="w-full py-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-white font-bold text-xs rounded-xl transition">
                Select Academic
              </button>
            </div>

            {/* Professional Seafarer & Surveyor */}
            <div className="bg-emerald-950/30 rounded-2xl border-2 border-emerald-500 p-6 space-y-4 flex flex-col justify-between shadow-xl shadow-emerald-500/10 relative">
              <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950">
                Most Popular
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Officers & Surveyors</span>
                <h4 className="text-lg font-bold text-white">Professional Pro</h4>
                <div className="text-2xl font-black text-white font-mono">
                  {getPrice(19)} <span className="text-xs text-slate-400 font-normal">/ {billingCycle}</span>
                </div>
                <p className="text-xs text-slate-300">Complete regulatory intelligence for Captains, Chief Engineers, DPA, and Class Surveyors.</p>

                <ul className="text-xs text-slate-200 space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Unlimited AI Regulatory Search & RAG
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Ship-Specific Compliance Matrix Generator
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Pre-PSC Inspection Checklists
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> IACS URs & Class Notations Cross-Reference
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Export PDF Statutory Compliance Dossiers
                  </li>
                </ul>
              </div>

              <button className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-md shadow-emerald-500/20">
                Subscribe to Pro
              </button>
            </div>

            {/* Enterprise Fleet Tier */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Fleet Managers & Yards</span>
                <h4 className="text-lg font-bold text-white">Fleet & Shipyard Enterprise</h4>
                <div className="text-2xl font-black text-white font-mono">
                  {getPrice(99)} <span className="text-xs text-slate-400 font-normal">/ {billingCycle}</span>
                </div>
                <p className="text-xs text-slate-400">Enterprise multi-vessel compliance dashboard with automated API integration and Flag circular alerts.</p>

                <ul className="text-xs text-slate-300 space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Multi-Vessel Fleet Compliance Dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Automated HSSC Survey Expiry Alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Dedicated Technical Account Lead
                  </li>
                </ul>
              </div>

              <button className="w-full py-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-white font-bold text-xs rounded-xl transition">
                Contact Enterprise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
