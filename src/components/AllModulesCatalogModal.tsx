import React, { useState, useMemo } from 'react';
import { ViewMode } from '../types';
import { PRIMARY_NAVIGATION_HUBS, NavItem } from '../data/navigationHubs';
import { Search, X, LayoutGrid, Sparkles, ArrowRight } from 'lucide-react';

interface AllModulesCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView: (view: ViewMode) => void;
  isDarkMode: boolean;
}

export const AllModulesCatalogModal: React.FC<AllModulesCatalogModalProps> = ({
  isOpen,
  onClose,
  onNavigateView,
  isDarkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHubId, setSelectedHubId] = useState<string>('all');

  // Flatten all items for search
  const allModules = useMemo(() => {
    const list: Array<NavItem & { hubId: string; hubTitle: string; groupTitle: string }> = [];
    PRIMARY_NAVIGATION_HUBS.forEach((hub) => {
      hub.groups.forEach((grp) => {
        grp.items.forEach((item) => {
          list.push({
            ...item,
            hubId: hub.id,
            hubTitle: hub.title,
            groupTitle: grp.groupTitle
          });
        });
      });
    });
    return list;
  }, []);

  const filteredHubs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return PRIMARY_NAVIGATION_HUBS.map((hub) => {
      if (selectedHubId !== 'all' && hub.id !== selectedHubId) {
        return null;
      }

      const matchingGroups = hub.groups.map((group) => {
        const matchingItems = group.items.filter((item) => {
          if (!q) return true;
          return (
            item.label.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            (item.badge && item.badge.toLowerCase().includes(q)) ||
            group.groupTitle.toLowerCase().includes(q) ||
            hub.title.toLowerCase().includes(q)
          );
        });
        return {
          ...group,
          items: matchingItems
        };
      }).filter((group) => group.items.length > 0);

      if (matchingGroups.length === 0) return null;

      return {
        ...hub,
        groups: matchingGroups
      };
    }).filter(Boolean);
  }, [searchQuery, selectedHubId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-5xl max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden transition-all ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between shrink-0 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                  Global Maritime Platform Modules Catalog
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {allModules.length} Modules
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Browse and access all naval architecture, fleet operations, simulation & intelligence suites
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Close Catalog (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="p-4 border-b border-slate-800/60 bg-slate-950/30 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 90+ modules (e.g. Hull, AIS, SOLAS, FEA, Propeller, Simulators, Broker)..."
              autoFocus
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium border outline-none transition ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-sky-500'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedHubId('all')}
              className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition ${
                selectedHubId === 'all'
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Pillars ({allModules.length})
            </button>
            {PRIMARY_NAVIGATION_HUBS.map((hub) => {
              const count = hub.groups.reduce((acc, g) => acc + g.items.length, 0);
              const isSelected = selectedHubId === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHubId(hub.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {hub.icon}
                  <span>{hub.title}</span>
                  <span className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                    isSelected ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {filteredHubs.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-slate-300">No modules match "{searchQuery}"</p>
              <p className="text-xs text-slate-500">Try searching for keywords like "Hull", "FEA", "AIS", "STCW", or "IMO"</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedHubId('all'); }}
                className="text-xs text-sky-400 hover:underline font-bold"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredHubs.map((hub: any) => (
              <div key={hub.id} className="space-y-3">
                {/* Pillar Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-slate-950 border border-slate-800">
                      {hub.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-sky-400 flex items-center gap-2">
                        {hub.title}
                        <span className="text-[10px] font-normal text-slate-400 hidden sm:inline">
                          — {hub.tagline}
                        </span>
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onNavigateView(hub.view);
                      onClose();
                    }}
                    className="text-xs text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 group transition"
                  >
                    <span>Open Hub</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </button>
                </div>

                {/* Sub-Groups Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hub.groups.map((group: any, gIdx: number) => (
                    <div key={gIdx} className="space-y-1.5 bg-slate-950/40 p-3 rounded-2xl border border-slate-800/60">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                        {group.groupTitle}
                      </h4>
                      <div className="space-y-1">
                        {group.items.map((item: NavItem) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              onNavigateView(item.id);
                              onClose();
                            }}
                            className={`w-full text-left p-2 rounded-xl transition flex items-start gap-2.5 group ${
                              isDarkMode
                                ? 'hover:bg-slate-800/80 border border-transparent hover:border-slate-700'
                                : 'hover:bg-slate-100 border border-transparent hover:border-slate-200'
                            }`}
                          >
                            <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5 group-hover:border-sky-500/40 transition">
                              {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="font-bold text-xs group-hover:text-sky-400 transition truncate">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 px-5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Lloyd's Register, IMO SOLAS/MARPOL & DNV Rules Synchronized</span>
          </div>
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
            Esc to close
          </kbd>
        </div>
      </div>
    </div>
  );
};
