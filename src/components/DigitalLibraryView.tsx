import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { BookOpen, Search, Download, Book, FileText, Bookmark } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const DigitalLibraryView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const books = [
    { title: 'Principles of Naval Architecture (PNA) - SNAME Vol I-III', category: 'Textbooks', author: 'E.V. Lewis', pages: '1,240' },
    { title: 'IMO SOLAS Consolidated Edition 2024', category: 'IMO Codes', author: 'International Maritime Organization', pages: '1,050' },
    { title: 'Hydrodynamics of Ship Propellers', category: 'Propulsion', author: 'J.P. Breslin & P. Andersen', pages: '560' },
    { title: 'Practical Ship Design (Elsevier Ocean Engineering)', category: 'Design', author: 'D.G.M. Watson', pages: '820' },
  ];

  const filtered = books.filter((b) => b.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="World Maritime Digital Library" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              Tool #66
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-amber-400" />
              World Maritime Digital Library & AI Reader
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Searchable digital archive containing 50,000+ textbooks, peer-reviewed journals, IMO conventions, SNAME papers, and RINA publications.
          </p>
        </div>
      </div>

      <div className="relative max-w-xl">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
        <input
          type="text"
          placeholder="Search by title, author, IMO publication code, or ISBN..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((b, idx) => (
          <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-bold border border-amber-500/20">
                {b.category}
              </span>
              <h3 className="font-bold text-sm text-white mt-2">{b.title}</h3>
              <span className="text-xs text-slate-400 block mt-1">Author: {b.author} • {b.pages} Pages</span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => onOpenPricing && onOpenPricing('student')}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold rounded-xl border border-amber-500/30 text-xs transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Read PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
