import React, { useState, useRef, useEffect } from 'react';
import { ViewMode } from '../types';
import {
  PRIMARY_NAVIGATION_HUBS,
  NavHub,
  NavItem
} from '../data/navigationHubs';
import {
  LayoutGrid,
  ChevronDown,
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  SlidersHorizontal,
  X,
  Check
} from 'lucide-react';

interface RightNavModulesDropdownProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
  isDarkMode: boolean;
  onOpenCatalogModal?: () => void;
}

export const RightNavModulesDropdown: React.FC<RightNavModulesDropdownProps> = ({
  currentView,
  setView,
  isDarkMode,
  onOpenCatalogModal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHubId, setActiveHubId] = useState<string>(PRIMARY_NAVIGATION_HUBS[0].id);
  const [searchFilter, setSearchFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // When opening, find if current view belongs to a specific hub and select it
  useEffect(() => {
    if (isOpen) {
      const parentHub = PRIMARY_NAVIGATION_HUBS.find(
        (h) => h.view === currentView || h.groups.some((g) => g.items.some((i) => i.id === currentView))
      );
      if (parentHub) {
        setActiveHubId(parentHub.id);
      }
    }
  }, [isOpen, currentView]);

  const activeHub =
    PRIMARY_NAVIGATION_HUBS.find((h) => h.id === activeHubId) || PRIMARY_NAVIGATION_HUBS[0];

  // Calculate total modules
  const totalModules = PRIMARY_NAVIGATION_HUBS.reduce(
    (acc, hub) => acc + hub.groups.reduce((gAcc, g) => gAcc + g.items.length, 0),
    0
  );

  // Filtered items when user searches
  const filteredSearchResults = searchFilter.trim()
    ? PRIMARY_NAVIGATION_HUBS.flatMap((hub) =>
        hub.groups.flatMap((group) =>
          group.items.map((item) => ({
            ...item,
            hubTitle: hub.title,
            hubId: hub.id,
            groupTitle: group.groupTitle
          }))
        )
      ).filter(
        (item) =>
          item.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchFilter.toLowerCase()) ||
          item.hubTitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
          item.groupTitle.toLowerCase().includes(searchFilter.toLowerCase())
      )
    : [];

  const handleSelectModule = (viewId: ViewMode) => {
    setView(viewId);
    setIsOpen(false);
    setSearchFilter('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Right Navbar Dropdown Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
          }
        }}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm border ${
          isOpen
            ? 'bg-sky-500/25 border-sky-400 text-sky-300 ring-2 ring-sky-500/20'
            : isDarkMode
            ? 'bg-gradient-to-r from-sky-950/60 to-blue-950/60 hover:from-sky-900/60 hover:to-blue-900/60 border-sky-500/30 text-sky-300 hover:border-sky-400/60'
            : 'bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-700'
        }`}
        title="All Modules Dropdown - Categorized Naval Engineering Ecosystem"
        aria-expanded={isOpen}
      >
        <LayoutGrid className="w-4 h-4 text-sky-400 animate-pulse" />
        <span className="font-extrabold tracking-tight">Modules</span>
        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-sky-500/20 text-sky-300 font-mono font-black border border-sky-500/30">
          90+
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-sky-300 opacity-100' : ''
          }`}
        />
      </button>

      {/* Right-Aligned Categorized Mega-Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right w-[760px] max-w-[94vw]"
        >
          <div
            className={`rounded-2xl shadow-2xl border backdrop-blur-2xl p-4 space-y-3.5 ${
              isDarkMode
                ? 'bg-slate-950/98 border-slate-800 text-white'
                : 'bg-white/98 border-slate-200 text-slate-900 shadow-sky-950/10'
            }`}
          >
            {/* Header: Title, Live Search & Full Catalog Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm tracking-tight">
                      Maritime Modules Directory
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono font-bold border border-sky-500/30">
                      {totalModules} Tools
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Organized across 8 specialized naval architecture & maritime pillars
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                {onOpenCatalogModal && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenCatalogModal();
                    }}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" />
                    <span>Grid View</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Close Dropdown"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Instant Filter Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Instant filter 90+ modules (e.g. Hydrostatics, SOLAS, AIS, Propeller, CFD, CII)..."
                className={`w-full pl-9 pr-9 py-2 rounded-xl text-xs border outline-none transition ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                }`}
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Content Area: Search Mode vs Categorized 2-Panel Mode */}
            {searchFilter.trim() ? (
              /* Search Results View */
              <div className="max-h-[420px] overflow-y-auto pr-1 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 px-1">
                  <span>Found {filteredSearchResults.length} matching modules</span>
                  <span className="text-sky-400">Click to launch module</span>
                </div>

                {filteredSearchResults.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p className="text-sm font-semibold">No modules match "{searchFilter}"</p>
                    <p className="text-xs text-slate-500 mt-1">Try searching by topic, acronym, or regulation code</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredSearchResults.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectModule(item.id)}
                        className={`text-left p-2.5 rounded-xl border transition flex items-start gap-2.5 ${
                          currentView === item.id
                            ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                            : isDarkMode
                            ? 'bg-slate-900/70 border-slate-800 hover:bg-slate-800 text-slate-200'
                            : 'bg-slate-50 border-slate-200 hover:bg-sky-50 text-slate-800'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-xs truncate">{item.label}</span>
                            {item.badge && (
                              <span className="text-[8px] font-extrabold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] text-sky-400 font-semibold mt-0.5">
                            <span>{item.hubTitle}</span>
                            <span>•</span>
                            <span className="text-slate-400 truncate">{item.groupTitle}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Two-Panel Categorized Mega-Dropdown */
              <div className="grid grid-cols-12 gap-3 min-h-[380px] max-h-[440px]">
                {/* Left Panel: 8 Categorized Pillars Navigation */}
                <div className="col-span-4 border-r border-slate-800/80 pr-2 space-y-1 overflow-y-auto">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between">
                    <span>Pillars</span>
                    <span className="font-mono text-sky-400">8 Hubs</span>
                  </div>

                  {PRIMARY_NAVIGATION_HUBS.map((hub) => {
                    const isSelected = activeHubId === hub.id;
                    const hubItemCount = hub.groups.reduce((acc, g) => acc + g.items.length, 0);
                    const containsActiveView =
                      currentView === hub.view ||
                      hub.groups.some((g) => g.items.some((i) => i.id === currentView));

                    return (
                      <button
                        key={hub.id}
                        onMouseEnter={() => setActiveHubId(hub.id)}
                        onClick={() => setActiveHubId(hub.id)}
                        className={`w-full text-left px-2.5 py-2 rounded-xl transition flex items-center justify-between text-xs font-semibold ${
                          isSelected
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                            : containsActiveView
                            ? 'bg-slate-800/80 text-white border border-slate-700'
                            : isDarkMode
                            ? 'text-slate-300 hover:bg-slate-900/90 hover:text-white border border-transparent'
                            : 'text-slate-700 hover:bg-slate-100 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="shrink-0">{hub.icon}</span>
                          <span className="truncate">{hub.title}</span>
                        </div>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                            isSelected
                              ? 'bg-sky-500/30 text-sky-200'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {hubItemCount}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Panel: Selected Pillar's Categorized Groups & Modules */}
                <div className="col-span-8 pl-1 flex flex-col justify-between overflow-hidden">
                  <div className="overflow-y-auto space-y-3.5 pr-1 max-h-[380px]">
                    {/* Active Hub Banner */}
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                          {activeHub.icon}
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-white flex items-center gap-2">
                            <span>{activeHub.title} Hub</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                              {activeHub.groups.reduce((acc, g) => acc + g.items.length, 0)} Modules
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-1">
                            {activeHub.tagline}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectModule(activeHub.view)}
                        className="text-[10px] bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 px-2 py-1 rounded-lg font-bold transition flex items-center gap-1 shrink-0"
                      >
                        <span>Open Hub</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Categorized Sub-Groups for Active Hub */}
                    {activeHub.groups.map((group, gIdx) => (
                      <div key={gIdx} className="space-y-1.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400/90 px-1 flex items-center justify-between">
                          <span>{group.groupTitle}</span>
                          <span className="text-slate-500 font-mono text-[9px]">{group.items.length} items</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {group.items.map((item) => {
                            const isActive = currentView === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => handleSelectModule(item.id)}
                                className={`w-full text-left p-2 rounded-xl transition flex items-start gap-2 border ${
                                  isActive
                                    ? 'bg-sky-500/25 text-sky-300 border-sky-500/40 shadow-sm'
                                    : isDarkMode
                                    ? 'bg-slate-900/50 hover:bg-slate-850 border-slate-800/80 hover:border-slate-700 text-slate-200'
                                    : 'bg-slate-50 hover:bg-sky-50 border-slate-200 text-slate-800'
                                }`}
                              >
                                <div className="p-1 rounded-md bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                                  {item.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="font-bold text-xs truncate">
                                      {item.label}
                                    </span>
                                    {item.badge && (
                                      <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Footer Information */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 px-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>SOLAS, MARPOL, DNV & ABS Verified Solvers</span>
              </div>

              {onOpenCatalogModal && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCatalogModal();
                  }}
                  className="text-sky-400 hover:text-sky-300 font-bold transition flex items-center gap-1"
                >
                  <span>Explore All 90+ Modules Catalog</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
