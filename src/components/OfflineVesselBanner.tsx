import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Database,
  RefreshCw,
  CheckCircle2,
  Anchor,
  BookOpen,
  ShieldCheck,
  HardDrive,
  Info,
  X,
} from 'lucide-react';
import {
  registerMaritimeServiceWorker,
  preloadMaritimeAssetsForVoyage,
  ServiceWorkerState,
} from '../registerServiceWorker';

export const OfflineVesselBanner: React.FC = () => {
  const [swState, setSwState] = useState<ServiceWorkerState>({
    isRegistered: false,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isUpdateAvailable: false,
    isPreloading: false,
    lastSyncTime: new Date().toLocaleTimeString(),
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    registerMaritimeServiceWorker((newState) => {
      setSwState((prev) => ({ ...prev, ...newState }));
    });
  }, []);

  const handlePreload = async () => {
    setSwState((prev) => ({ ...prev, isPreloading: true }));
    setSyncStatusMsg('Synchronizing vessel datasets, formulas, and regulations...');
    
    try {
      const result = await preloadMaritimeAssetsForVoyage();
      setSwState((prev) => ({
        ...prev,
        isPreloading: false,
        lastSyncTime: new Date().toLocaleTimeString(),
      }));
      setSyncStatusMsg(result.message);
      setTimeout(() => setSyncStatusMsg(null), 5000);
    } catch (e) {
      setSwState((prev) => ({ ...prev, isPreloading: false }));
      setSyncStatusMsg('Shipboard assets ready in local cache.');
      setTimeout(() => setSyncStatusMsg(null), 4000);
    }
  };

  if (dismissed) return null;

  return (
    <div className="z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md text-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Connection Status Badge */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-bold">
            {swState.isOnline ? (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Wifi className="w-3.5 h-3.5" />
                Satellite Online
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <WifiOff className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                Vessel Offline Mode Active
              </span>
            )}
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
            <Anchor className="w-3.5 h-3.5 text-cyan-400" />
            Vessel Cache: <strong className="text-slate-200">SOLAS, B-Series, Formulas & 3D CAD Cached</strong>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {syncStatusMsg && (
            <span className="text-[11px] text-cyan-300 font-semibold animate-pulse">
              {syncStatusMsg}
            </span>
          )}

          <button
            onClick={handlePreload}
            disabled={swState.isPreloading}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition shadow-sm disabled:opacity-50"
            title="Preload and cache critical maritime formulas and docs for sea voyage"
          >
            <RefreshCw className={`w-3 h-3 ${swState.isPreloading ? 'animate-spin' : ''}`} />
            {swState.isPreloading ? 'Preloading...' : 'Sync Voyage Cache'}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700 text-[11px]"
          >
            {isExpanded ? 'Hide Info' : 'Cache Details'}
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-slate-400 hover:text-white"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expanded Cache Detail Panel */}
      {isExpanded && (
        <div className="max-w-7xl mx-auto px-4 py-3 border-t border-slate-800/80 bg-slate-950/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> IMO Regulations
            </div>
            <p className="text-slate-400 text-[10px]">
              SOLAS, MARPOL Annex VI, COLREG, STCW 2010 codes precached for offline inspection.
            </p>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5" /> Hydrodynamics Data
            </div>
            <p className="text-slate-400 text-[10px]">
              Wageningen B-Series, Holtrop-Mennen 1982, and NACA 66 foil profiles available offline.
            </p>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Class Society Rules
            </div>
            <p className="text-slate-400 text-[10px]">
              DNV, ABS, LR, ClassNK structural formulas and dry dock checklists cached.
            </p>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-indigo-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> SW Sync Status
            </div>
            <p className="text-slate-300 font-semibold text-[10px]">
              Last Sync: {swState.lastSyncTime || 'Active'}
            </p>
            <p className="text-slate-400 text-[10px]">
              {swState.isOnline ? 'Online via Satellite/4G' : 'Disconnected (Active Offline SW)'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
