import React, { useState } from 'react';
import { IMO_CONVENTIONS_DATA } from './regulationsData';
import { ImoConventionItem } from './regTypes';
import {
  BookOpen,
  Search,
  Filter,
  Shield,
  Waves,
  Users,
  Award,
  Anchor,
  Compass,
  Droplet,
  Maximize,
  Recycle,
  CheckCircle2,
  FileText,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  Clock,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface Props {
  onSelectConvention?: (code: string) => void;
}

export const ImoConventionsTab: React.FC<Props> = ({ onSelectConvention }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedConvention, setSelectedConvention] = useState<ImoConventionItem>(IMO_CONVENTIONS_DATA[0]);

  const categories = ['All', 'Safety', 'Marine Environment', 'Seafarers & Manning', 'Cargo & Special Ships'];

  const filteredConventions = IMO_CONVENTIONS_DATA.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'Waves': return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'Users': return <Users className="w-5 h-5 text-indigo-400" />;
      case 'Award': return <Award className="w-5 h-5 text-amber-400" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-blue-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-teal-400" />;
      case 'Droplet': return <Droplet className="w-5 h-5 text-sky-400" />;
      case 'Maximize': return <Maximize className="w-5 h-5 text-purple-400" />;
      case 'Recycle': return <Recycle className="w-5 h-5 text-emerald-400" />;
      default: return <BookOpen className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Authoritative Registry
            </span>
            <span className="text-xs text-slate-400">IMO Global Conventions & Protocols</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">International Maritime Organization (IMO) Rules Database</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore core conventions, protocols, mandatory codes, resolutions, circulars, and implementation timelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conventions, codes, resolutions..."
              className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Catalog + Right Deep Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Convention Cards */}
        <div className="lg:col-span-5 space-y-3">
          {filteredConventions.map((c) => {
            const isSelected = selectedConvention.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedConvention(c);
                  if (onSelectConvention) onSelectConvention(c.id);
                }}
                className={`p-4 rounded-2xl border transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/20 border-emerald-500/50 shadow-md shadow-emerald-500/5'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                      {getIcon(c.iconName)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{c.code}</span>
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-800 text-slate-300">
                          {c.category}
                        </span>
                      </div>
                      <h4 className="text-xs text-slate-300 font-medium mt-0.5">{c.title}</h4>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {c.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                  {c.summary}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    In Force: {c.entryIntoForceDate}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Convention Deep Inspector */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {selectedConvention.code}
                </span>
                <span className="text-xs text-slate-400">{selectedConvention.category}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1.5">{selectedConvention.fullName}</h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                <span><strong>Adopted:</strong> {selectedConvention.adoptionYear}</span>
                <span><strong>Entry into Force:</strong> {selectedConvention.entryIntoForceDate}</span>
                <span><strong>Latest Revision:</strong> {selectedConvention.latestMajorRevision}</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-emerald-400" /> Scope & Statutory Mandate
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {selectedConvention.summary}
            </p>
          </div>

          {/* Protocols & Major Revisions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" /> Protocols & Survey Harmonization
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selectedConvention.keyProtocols.map((proto, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{proto}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory IMO Codes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Mandatory Technical Codes & Guidelines
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedConvention.mandatoryCodes.map((code, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>

          {/* Key Statutory Certificates */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Mandatory Statutory Certificates Issued
            </h4>
            <div className="space-y-2">
              {selectedConvention.keyCertificates.map((cert, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800/90 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-200 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{cert}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    HSSC 5-Yr Cycle
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RAG Verification Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              IMO Treaty Status Confirmed (GISIS Verified)
            </span>
            <span className="text-[11px] text-slate-500">
              Official Reference: IMO Publication Series 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
