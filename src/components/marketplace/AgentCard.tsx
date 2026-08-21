import React from 'react';
import { MaritimeAgent } from '../../data/maritimeAgentsData';
import {
  Star,
  Download,
  Zap,
  CheckCircle2,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Ship,
  Compass,
  FileCheck,
  BookOpen,
  TrendingUp,
  Anchor
} from 'lucide-react';

interface AgentCardProps {
  agent: MaritimeAgent;
  onSelect: (agent: MaritimeAgent) => void;
  onRunSimulation: (agent: MaritimeAgent) => void;
  isDarkMode?: boolean;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  onSelect,
  onRunSimulation,
  isDarkMode = true
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Ship': return <Ship className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Anchor': return <Anchor className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div
      id={`agent-card-${agent.id}`}
      className={`group relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border ${
        isDarkMode
          ? 'bg-slate-900/80 hover:bg-slate-900 border-slate-800/80 hover:border-violet-500/50 shadow-lg hover:shadow-violet-500/10'
          : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-violet-400 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Top row: Badges & Price */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center p-2.5 border shrink-0 ${agent.iconBg} shadow-inner`}>
              {getIcon(agent.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-black text-base leading-snug group-hover:text-violet-400 transition ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {agent.name}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-slate-400 truncate">{agent.creator.name}</span>
                {agent.creator.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" title="Verified Maritime Expert" />
                )}
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-medium shrink-0 border border-slate-700">
                  {agent.creator.tier}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Tag */}
          <div className="text-right shrink-0">
            {agent.pricing.type === 'free' ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30">
                FREE
              </span>
            ) : agent.pricing.type === 'enterprise' ? (
              <div className="flex flex-col items-end">
                <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-black border border-rose-500/30">
                  Enterprise
                </span>
                <span className="text-[10px] text-slate-400 font-bold mt-0.5">${agent.pricing.amount}/mo</span>
              </div>
            ) : (
              <div className="flex items-baseline gap-0.5 justify-end">
                <span className="text-lg font-black text-violet-400">${agent.pricing.amount}</span>
                <span className="text-xs text-slate-400 font-medium">/{agent.pricing.period}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tagline & Description */}
        <p className="text-xs font-semibold text-violet-300/90 mb-2 line-clamp-1">
          {agent.tagline}
        </p>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {agent.description}
        </p>

        {/* Supported Models Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {agent.supportedModels.slice(0, 3).map((m, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60"
            >
              {m}
            </span>
          ))}
          {agent.supportedModels.length > 3 && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-lg bg-slate-800/60 text-slate-400">
              +{agent.supportedModels.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Metrics & Actions */}
      <div>
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{agent.stats.rating.toFixed(2)}</span>
            <span className="text-slate-500 font-normal">({agent.stats.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>{agent.stats.installs.toLocaleString()} users</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 font-medium">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>{agent.stats.avgLatency}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            id={`btn-details-${agent.id}`}
            onClick={() => onSelect(agent)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
              isDarkMode
                ? 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >
            <span>Inspect & Specs</span>
          </button>
          <button
            id={`btn-run-${agent.id}`}
            onClick={() => onRunSimulation(agent)}
            className="px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-600/20"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Test Agent</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
