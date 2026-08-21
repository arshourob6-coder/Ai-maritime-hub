import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { ShoppingBag, Upload, Star, CheckCircle2, DollarSign, FileText } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const ResearchDatasetMarketplaceView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'sell'>('browse');

  const items = [
    { id: '1', name: 'Full-Scale Towing Tank Hydrodynamic Resistance Data (50 Hull Forms)', seller: 'Maritime Research Inst. Delft', price: '$149', rating: '4.9 (32 reviews)' },
    { id: '2', name: 'Deep-Sea Container Vessel Fuel & RPM Time-Series Dataset (3 Years)', seller: 'Dr. H. Larson, NTNU', price: '$299', rating: '5.0 (18 reviews)' },
    { id: '3', name: 'Underwater Noise Spectrum Dataset for Marine Mammal Impact Studies', seller: 'Oceanographic AI Lab', price: 'Free (CC-BY)', rating: '4.8 (45 reviews)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Research Dataset Marketplace" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Tool #52
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <ShoppingBag className="w-7 h-7 text-emerald-400" />
              Maritime Research Dataset Marketplace
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Publish, monetize, purchase, and license peer-reviewed maritime engineering datasets, towing tank runs, and engine telemetry.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'browse' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            Browse Datasets
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'sell' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            Publish Dataset
          </button>
        </div>
      </div>

      {activeTab === 'browse' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{item.seller}</span>
                <h3 className="font-bold text-sm text-white leading-snug">{item.name}</h3>
                <div className="flex items-center gap-1 text-xs text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-base font-black text-emerald-400">{item.price}</span>
                <button
                  onClick={() => onOpenPricing && onOpenPricing('professional')}
                  className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold rounded-xl border border-emerald-500/30 text-xs transition"
                >
                  Acquire License
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-4">
          <h3 className="font-bold text-base text-white">Monetize Your Research Dataset</h3>
          <p className="text-xs text-slate-400">Upload your CSV, NetCDF, or HDF5 datasets and set your pricing and academic license model.</p>
          
          <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center space-y-3">
            <Upload className="w-8 h-8 text-emerald-400 mx-auto" />
            <span className="text-xs text-slate-300 block">Drag & drop dataset files or click to browse</span>
            <button className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl">
              Select Dataset File
            </button>
          </div>
        </div>
      )}

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
