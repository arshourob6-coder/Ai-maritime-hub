import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Download,
  FileText,
  Filter,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface MaritimeDoc {
  id: string;
  title: string;
  category: 'IMO Circular' | 'Class Rule' | 'ISO Standard' | 'Research Paper' | 'Technical Manual';
  organization: string;
  year: number;
  fileSize: string;
  description: string;
}

const SAMPLE_DOCS: MaritimeDoc[] = [
  {
    id: 'doc-1',
    title: 'MSC.1/Circ.1621 - Revised Interim Guidelines for the Safety of Ships Using Methyl/Ethyl Alcohol as Fuel',
    category: 'IMO Circular',
    organization: 'IMO Maritime Safety Committee',
    year: 2024,
    fileSize: '2.4 MB PDF',
    description: 'Safety requirements for fuel tanks, piping, explosion prevention, and firefighting systems for Methanol powered vessels.'
  },
  {
    id: 'doc-2',
    title: 'ISO 8217:2024 - Petroleum Products - Fuels (class F) - Specifications of Marine Fuels',
    category: 'ISO Standard',
    organization: 'ISO Technical Committee 28',
    year: 2024,
    fileSize: '1.8 MB PDF',
    description: 'Updated marine distillate and residual fuel specs including biofuels (VLSFO, ULSFO, RMA, RMB, RME, RMK).'
  },
  {
    id: 'doc-3',
    title: 'DNV-CG-0149 Hull Structural Design and Finite Element Analysis for Container Carriers',
    category: 'Class Rule',
    organization: 'DNV Classification',
    year: 2025,
    fileSize: '5.1 MB PDF',
    description: 'Comprehensive guidelines for FEA global hull girder modeling, hatch corner stress concentrations, and fatigue life estimation.'
  },
  {
    id: 'doc-4',
    title: 'CFD Hydrodynamic Optimization of Energy Saving Devices (ESD) for 15,000 TEU Ships',
    category: 'Research Paper',
    organization: 'SNAME / Journal of Ship Research',
    year: 2026,
    fileSize: '3.9 MB PDF',
    description: 'Numerical analysis of pre-swirl stators, Mewis ducts, and boss cap fins with propeller interaction in turbulent flow.'
  }
];

export const DocumentLibraryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredDocs = SAMPLE_DOCS.filter(d => {
    const matchesCat = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesQuery = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleDownloadDoc = (title: string, size: string) => {
    const blob = new Blob([`Simulated document download for: ${title}\nSize: ${size}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.slice(0, 30).replaceAll(' ', '_')}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-sky-400" /> Digital Knowledge Repository
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Maritime Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">Document Library</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Searchable library for IMO circulars, ISO standards, Class Guidelines, technical manuals, CFD research papers, and CAD specifications.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'IMO Circular', 'Class Rule', 'ISO Standard', 'Research Paper', 'Technical Manual'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2 text-xs w-full sm:w-64 shrink-0">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars or manuals..."
            className="w-full bg-transparent text-white outline-none"
          />
        </div>
      </div>

      {/* Document List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-sky-400">{doc.category}</span>
                <span className="text-slate-400">{doc.organization} • {doc.year}</span>
              </div>

              <h3 className="font-bold text-sm text-white leading-snug">{doc.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{doc.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px]">{doc.fileSize}</span>
              <button
                onClick={() => handleDownloadDoc(doc.title, doc.fileSize)}
                className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
