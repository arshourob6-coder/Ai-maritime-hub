import React, { useState } from 'react';
import { SAMPLE_DIGITAL_PRODUCTS, SAMPLE_PLUGINS } from '../data/maritimeData';
import { DigitalProduct, MarketplacePlugin, Currency } from '../types';
import {
  Store,
  Download,
  Star,
  Tag,
  Code2,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Plus
} from 'lucide-react';

interface MarketplaceViewProps {
  onBuyItem: (title: string, priceUSD: number) => void;
  currency: Currency;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onBuyItem, currency }) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'developer_apis'>('templates');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Maxsurf Template', 'Excel Calculator', 'CFD Model', 'Prompt Pack', 'AutoCAD File'];

  const filteredProducts = SAMPLE_DIGITAL_PRODUCTS.filter((p) =>
    categoryFilter === 'All' ? true : p.type === categoryFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
            <Store className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Maritime Digital Store & AI API Marketplace</h2>
            <p className="text-xs text-slate-400">Buy & Sell Maxsurf files, AutoCAD templates, Excel hydrostatics suites, and Developer AI APIs</p>
          </div>
        </div>

        <button
          onClick={() => alert("Upload plugin modal: Developers can monetize AI models, datasets, and calculators.")}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Sell Digital Product / API</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'templates', label: '1. Engineering Templates & Files', icon: <ShoppingBag className="w-4 h-4" /> },
          { id: 'developer_apis', label: '2. Developer AI API Marketplace', icon: <Code2 className="w-4 h-4" /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === t.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* TEMPLATES TAB */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          {/* Categories Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  categoryFilter === cat
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-purple-400/50 p-6 rounded-2xl shadow-xl transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/30">
                      {prod.type}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{prod.downloadSize}</span>
                  </div>

                  <h3 className="font-bold text-sm text-white">{prod.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{prod.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {prod.tags.map((tg) => (
                      <span key={tg} className="text-[9px] bg-slate-950 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
                        #{tg}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-sky-400 font-mono">${prod.priceUSD}</span>
                    <span className="text-[10px] text-slate-500 block">{prod.salesCount} Downloads</span>
                  </div>

                  <button
                    onClick={() => onBuyItem(prod.title, prod.priceUSD)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Purchase & Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DEVELOPER APIS TAB */}
      {activeTab === 'developer_apis' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_PLUGINS.map((plug) => (
            <div
              key={plug.id}
              className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {plug.category}
                  </span>
                  <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" /> {plug.rating}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white">{plug.name}</h3>
                <p className="text-xs text-slate-400">{plug.description}</p>
                <div className="p-2 bg-slate-950 rounded-lg font-mono text-[10px] text-sky-300 truncate border border-slate-800">
                  {plug.endpointUrl}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-sm font-extrabold text-emerald-400 font-mono">
                  ${plug.priceMonthlyUSD} / mo
                </span>
                <button
                  onClick={() => onBuyItem(plug.name + " API Subscription", plug.priceMonthlyUSD)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1"
                >
                  <span>Subscribe API</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
