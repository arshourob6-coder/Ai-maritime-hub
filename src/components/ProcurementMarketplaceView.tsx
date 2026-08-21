import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { ShoppingBag, Search, Tag, ShieldCheck, Truck, Sparkles, Building2 } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const ProcurementMarketplaceView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const items = [
    { title: 'Alfa Laval Fuel Oil Purifier Separator Bowl', supplier: 'Alfa Laval OEM', price: '$14,500 USD', leadTime: '3 Days Ex-Stock' },
    { title: 'Kongsberg K-Pos Dynamic Positioning System Sensor', supplier: 'Kongsberg Maritime', price: '$28,000 USD', leadTime: '7 Days' },
    { title: 'Wärtsilä 31 Dual Fuel Injector Valve Assembly', supplier: 'Wärtsilä Direct', price: '$3,200 USD', leadTime: 'In Stock' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="B2B Maritime Procurement Marketplace" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Tool #42
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <ShoppingBag className="w-7 h-7 text-emerald-400" />
              B2B Marine Equipment & Spare Parts Marketplace
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Procure OEM marine spares, shipyard drydock slots, marine lubricants, and navigation electronics with instant RFQ matching.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((i) => (
          <div key={i.title} className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>{i.supplier}</span>
            </div>
            <h3 className="text-sm font-black text-white">{i.title}</h3>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-base font-black text-emerald-300">{i.price}</span>
              <span className="text-xs text-slate-400">{i.leadTime}</span>
            </div>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
