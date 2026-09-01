import React, { useState } from 'react';
import { PlanType, Currency } from '../../types';
import { DocHubTab, DocumentJobItem } from './docTypes';
import { ConverterToolTab } from './ConverterToolTab';
import { AiDocToolsTab } from './AiDocToolsTab';
import { PdfPowerToolsTab } from './PdfPowerToolsTab';
import { OcrEngineTab } from './OcrEngineTab';
import { MaritimeResearchTab } from './MaritimeResearchTab';
import { HistoryStorageTab } from './HistoryStorageTab';
import { PricingTiersTab } from './PricingTiersTab';
import { AdminDocDashboardTab } from './AdminDocDashboardTab';
import {
  FileText,
  Sparkles,
  Layers,
  Scan,
  GraduationCap,
  Clock,
  CreditCard,
  BarChart3,
  HelpCircle,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronRight,
  Plus
} from 'lucide-react';

interface DocumentHubViewProps {
  userPlan: PlanType;
  currency: Currency;
  onSetCurrency: (c: Currency) => void;
  onOpenCheckoutModal: (plan?: PlanType) => void;
}

export const DocumentHubView: React.FC<DocumentHubViewProps> = ({
  userPlan,
  currency,
  onSetCurrency,
  onOpenCheckoutModal
}) => {
  const [activeTab, setActiveTab] = useState<DocHubTab>('convert');
  const [historyJobs, setHistoryJobs] = useState<DocumentJobItem[]>([
    {
      id: 'job-101',
      fileName: 'IMO_MEPC_328_Annex_VI_Regulation.pdf',
      originalSize: 4200000,
      convertedSize: 1850000,
      sourceFormat: 'PDF',
      targetFormat: 'DOCX',
      status: 'completed',
      progress: 100,
      timestamp: 'Today at 09:42 AM',
      downloadUrl: '#'
    },
    {
      id: 'job-102',
      fileName: 'Stability_Sounding_Hydrostatic_Tables.pdf',
      originalSize: 8900000,
      convertedSize: 420000,
      sourceFormat: 'PDF',
      targetFormat: 'XLSX',
      status: 'completed',
      progress: 100,
      timestamp: 'Today at 08:15 AM',
      downloadUrl: '#'
    },
    {
      id: 'job-103',
      fileName: 'Shipyard_Drydock_Survey_Log_Scanned.png',
      originalSize: 12400000,
      convertedSize: 1100000,
      sourceFormat: 'PNG',
      targetFormat: 'PDF (OCR)',
      status: 'completed',
      progress: 100,
      timestamp: 'Yesterday at 04:30 PM',
      downloadUrl: '#'
    }
  ]);

  const handleJobCreated = (newJob: DocumentJobItem) => {
    setHistoryJobs(prev => [newJob, ...prev]);
  };

  const handleDeleteJob = (id: string) => {
    setHistoryJobs(prev => prev.filter(j => j.id !== id));
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to purge all converted document files immediately?')) {
      setHistoryJobs([]);
    }
  };

  const handleSelectPlan = (plan: PlanType) => {
    onOpenCheckoutModal(plan);
  };

  const handleBuyCreditPack = (title: string, priceUSD: number) => {
    onOpenCheckoutModal('pro_plus');
  };

  const navTabs: Array<{ id: DocHubTab; label: string; icon: any; badge?: string }> = [
    { id: 'convert', label: 'Document Converter', icon: <FileText className="w-4 h-4" /> },
    { id: 'ai_tools', label: 'AI Document Tools', icon: <Sparkles className="w-4 h-4 text-cyan-400" />, badge: 'AI' },
    { id: 'pdf_tools', label: 'PDF Operations', icon: <Layers className="w-4 h-4" /> },
    { id: 'ocr', label: 'Neural OCR', icon: <Scan className="w-4 h-4" /> },
    { id: 'research', label: 'Maritime Research', icon: <GraduationCap className="w-4 h-4 text-indigo-400" />, badge: 'ACADEMIC' },
    { id: 'history', label: 'History & Storage', icon: <Clock className="w-4 h-4" /> },
    { id: 'pricing', label: 'Plans & Pricing', icon: <CreditCard className="w-4 h-4 text-emerald-400" /> },
    { id: 'admin', label: 'Admin Telemetry', icon: <BarChart3 className="w-4 h-4 text-purple-400" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 px-2.5 py-0.5 rounded-full">
              AI Maritime Hub • Document Processing
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
              {userPlan.toUpperCase()} TIER
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            Document Converter & AI Processing Suite
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            20+ format converters, high-accuracy neural OCR, AI document summarization, thesis formatting, and IMO regulatory tools.
          </p>
        </div>

        {/* Plan Upgrade Pill & Quick stats */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-right hidden sm:block">
            <span className="text-[10px] text-slate-400 block font-mono">CONVERSIONS THIS MONTH</span>
            <span className="text-xs font-bold text-cyan-400 font-mono">
              {userPlan === 'free' ? '3 / 5 used' : userPlan === 'student' ? '14 / 50 used' : 'Unlimited'}
            </span>
          </div>

          <button
            onClick={() => setActiveTab('pricing')}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Upgrade Plan</span>
          </button>
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800/80">
        {navTabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap relative ${
                isSelected
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab View Body */}
      <div>
        {activeTab === 'convert' && (
          <ConverterToolTab
            userPlan={userPlan}
            currency={currency}
            onOpenPricing={() => setActiveTab('pricing')}
            onJobComplete={handleJobCreated}
          />
        )}

        {activeTab === 'ai_tools' && (
          <AiDocToolsTab
            userPlan={userPlan}
            currency={currency}
            onOpenPricing={() => setActiveTab('pricing')}
          />
        )}

        {activeTab === 'pdf_tools' && (
          <PdfPowerToolsTab
            userPlan={userPlan}
            currency={currency}
            onOpenPricing={() => setActiveTab('pricing')}
          />
        )}

        {activeTab === 'ocr' && (
          <OcrEngineTab
            userPlan={userPlan}
            currency={currency}
            onOpenPricing={() => setActiveTab('pricing')}
          />
        )}

        {activeTab === 'research' && (
          <MaritimeResearchTab
            userPlan={userPlan}
            currency={currency}
            onOpenPricing={() => setActiveTab('pricing')}
          />
        )}

        {activeTab === 'history' && (
          <HistoryStorageTab
            userPlan={userPlan}
            historyJobs={historyJobs}
            onDeleteJob={handleDeleteJob}
            onClearAll={handleClearAllHistory}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingTiersTab
            currentPlan={userPlan}
            currency={currency}
            onSetCurrency={onSetCurrency}
            onSelectPlan={handleSelectPlan}
            onBuyCreditPack={handleBuyCreditPack}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDocDashboardTab
            userPlan={userPlan}
            currency={currency}
          />
        )}
      </div>
    </div>
  );
};
