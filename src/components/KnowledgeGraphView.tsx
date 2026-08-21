import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Network, Share2, Sparkles, BookOpen, Layers, Search, Cpu } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const KnowledgeGraphView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [activeNode, setActiveNode] = useState('Holtrop & Mennen Method');

  const nodes = [
    { name: 'Holtrop & Mennen Method', category: 'Empirical Formula', relatesTo: ['Ship Resistance', 'ITTC 1957', 'Froude Number'], summary: 'Regression analysis method for predicting power & resistance of displacement ships.' },
    { name: 'Froude Number (Fn)', category: 'Hydrodynamics', relatesTo: ['Holtrop & Mennen Method', 'Wave Making Resistance'], summary: 'Dimensionless number defined as ratio of flow inertia to gravity field.' },
    { name: 'MARPOL Annex VI', category: 'IMO Regulation', relatesTo: ['EEXI / CII', 'NOx Tier III', 'DNV Class Rules'], summary: 'Rules governing prevention of air pollution from ships.' },
    { name: 'DNV Class Rules', category: 'Classification Society', relatesTo: ['MARPOL Annex VI', 'Structural FEA'], summary: 'Technical standards for design, construction and structural integrity.' }
  ];

  const current = nodes.find((n) => n.name === activeNode) || nodes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime Knowledge Graph" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
              Tool #39
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Network className="w-7 h-7 text-teal-400" />
              Interconnected Maritime Knowledge Graph
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Semantic neural graph linking hydrodynamics, IMO codes, class rules, engineering formulas, and research papers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph Display Area */}
        <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="h-[340px] bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center p-6 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#14b8a620_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative z-10 grid grid-cols-2 gap-6 w-full max-w-md">
              {nodes.map((n) => (
                <button
                  key={n.name}
                  onClick={() => setActiveNode(n.name)}
                  className={`p-4 rounded-2xl border text-left transition transform hover:scale-105 ${
                    activeNode === n.name
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.3)]'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-bold text-teal-400 uppercase">{n.category}</span>
                  <h4 className="text-xs font-black text-white mt-1">{n.name}</h4>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Node Detail Inspector */}
        <div className="lg:col-span-5 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <span className="px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">
            {current.category}
          </span>

          <h3 className="text-xl font-black text-white">{current.name}</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{current.summary}</p>

          <div className="pt-3 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase">Linked Knowledge Nodes:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {current.relatesTo.map((rel) => (
                <span key={rel} className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-teal-300 font-medium">
                  → {rel}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => onOpenPricing && onOpenPricing('professional')}
            className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-black rounded-xl text-xs shadow hover:opacity-90 transition mt-4"
          >
            Explore Complete 50,000 Node Knowledge Mesh
          </button>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
