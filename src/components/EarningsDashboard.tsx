import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  ShoppingBag,
  Megaphone,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieIcon,
  BarChart3,
  Download,
  Filter,
  Sparkles,
  Zap,
  Globe,
  Building2,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Currency } from '../types';

interface EarningsDashboardProps {
  currency?: Currency;
}

export const EarningsDashboard: React.FC<EarningsDashboardProps> = ({ currency = 'USD' }) => {
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly' | 'yearly'>('monthly');
  const [selectedStream, setSelectedStream] = useState<'all' | 'subscriptions' | 'marketplace' | 'sponsored_listings'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Currency multiplier map
  const currencyRates: Record<Currency, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.78 },
    NOK: { symbol: 'kr ', rate: 10.8 },
    SGD: { symbol: 'S$', rate: 1.34 },
    BDT: { symbol: '৳', rate: 118 },
    JPY: { symbol: '¥', rate: 155 }
  };

  const curr = currencyRates[currency] || currencyRates.USD;

  const formatMoney = (valInUSD: number) => {
    const converted = valInUSD * curr.rate;
    if (converted >= 1000000) {
      return `${curr.symbol}${(converted / 1000000).toFixed(2)}M`;
    }
    if (converted >= 1000) {
      return `${curr.symbol}${(converted / 1000).toFixed(1)}k`;
    }
    return `${curr.symbol}${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  // DAILY DATA (Last 14 Days)
  const dailyData = [
    { label: 'Jul 14', subscriptions: 2850, marketplace: 720, sponsoredListings: 240, total: 3810 },
    { label: 'Jul 15', subscriptions: 2910, marketplace: 810, sponsoredListings: 280, total: 4000 },
    { label: 'Jul 16', subscriptions: 2980, marketplace: 690, sponsoredListings: 310, total: 3980 },
    { label: 'Jul 17', subscriptions: 3050, marketplace: 950, sponsoredListings: 330, total: 4330 },
    { label: 'Jul 18', subscriptions: 3120, marketplace: 880, sponsoredListings: 290, total: 4290 },
    { label: 'Jul 19', subscriptions: 3200, marketplace: 1040, sponsoredListings: 350, total: 4590 },
    { label: 'Jul 20', subscriptions: 3150, marketplace: 910, sponsoredListings: 320, total: 4380 },
    { label: 'Jul 21', subscriptions: 3280, marketplace: 1120, sponsoredListings: 390, total: 4790 },
    { label: 'Jul 22', subscriptions: 3340, marketplace: 1080, sponsoredListings: 410, total: 4830 },
    { label: 'Jul 23', subscriptions: 3410, marketplace: 1250, sponsoredListings: 430, total: 5090 },
    { label: 'Jul 24', subscriptions: 3480, marketplace: 1190, sponsoredListings: 460, total: 5130 },
    { label: 'Jul 25', subscriptions: 3550, marketplace: 1320, sponsoredListings: 480, total: 5350 },
    { label: 'Jul 26', subscriptions: 3620, marketplace: 1280, sponsoredListings: 510, total: 5410 },
    { label: 'Jul 27', subscriptions: 3700, marketplace: 1410, sponsoredListings: 540, total: 5650 },
  ];

  // MONTHLY DATA (12 Months)
  const monthlyData = [
    { label: 'Aug 2025', subscriptions: 42000, marketplace: 8200, sponsoredListings: 3100, total: 53300 },
    { label: 'Sep 2025', subscriptions: 46500, marketplace: 9500, sponsoredListings: 3400, total: 59400 },
    { label: 'Oct 2025', subscriptions: 51000, marketplace: 11200, sponsoredListings: 3900, total: 66100 },
    { label: 'Nov 2025', subscriptions: 55800, marketplace: 12800, sponsoredListings: 4200, total: 72800 },
    { label: 'Dec 2025', subscriptions: 60200, marketplace: 14100, sponsoredListings: 4600, total: 78900 },
    { label: 'Jan 2026', subscriptions: 64500, marketplace: 15400, sponsoredListings: 4900, total: 84800 },
    { label: 'Feb 2026', subscriptions: 68900, marketplace: 16200, sponsoredListings: 5300, total: 90400 },
    { label: 'Mar 2026', subscriptions: 72400, marketplace: 17100, sponsoredListings: 5600, total: 95100 },
    { label: 'Apr 2026', subscriptions: 76800, marketplace: 18000, sponsoredListings: 6000, total: 100800 },
    { label: 'May 2026', subscriptions: 80500, marketplace: 18800, sponsoredListings: 6300, total: 105600 },
    { label: 'Jun 2026', subscriptions: 84200, marketplace: 19300, sponsoredListings: 6600, total: 110100 },
    { label: 'Jul 2026', subscriptions: 87450, marketplace: 19800, sponsoredListings: 6900, total: 114150 },
  ];

  // YEARLY DATA (5 Years: 2023 - 2027 Projections)
  const yearlyData = [
    { label: '2023', subscriptions: 180000, marketplace: 28000, sponsoredListings: 12000, total: 220000 },
    { label: '2024', subscriptions: 390000, marketplace: 64000, sponsoredListings: 26000, total: 480000 },
    { label: '2025', subscriptions: 680000, marketplace: 124000, sponsoredListings: 48000, total: 852000 },
    { label: '2026 (Est)', subscriptions: 980000, marketplace: 210000, sponsoredListings: 78000, total: 1268000 },
    { label: '2027 (Proj)', subscriptions: 1450000, marketplace: 340000, sponsoredListings: 125000, total: 1915000 },
  ];

  const currentChartData = timeframe === 'daily' ? dailyData : timeframe === 'monthly' ? monthlyData : yearlyData;

  // Stream Totals for Current Month (Jul 2026)
  const currentMonth = monthlyData[monthlyData.length - 1];
  const totalRevenue = currentMonth.total;
  const subShare = Math.round((currentMonth.subscriptions / totalRevenue) * 100);
  const mktShare = Math.round((currentMonth.marketplace / totalRevenue) * 100);
  const adShare = Math.round((currentMonth.sponsoredListings / totalRevenue) * 100);

  const streamDistributionData = [
    { name: 'SaaS Subscriptions', value: currentMonth.subscriptions, color: '#10b981', share: subShare },
    { name: 'Marketplace Commissions', value: currentMonth.marketplace, color: '#38bdf8', share: mktShare },
    { name: 'Sponsored Listings & Ads', value: currentMonth.sponsoredListings, color: '#a855f7', share: adShare },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-slate-800 p-3.5 rounded-xl shadow-2xl text-xs space-y-1.5 backdrop-blur-md">
          <p className="font-bold text-sky-400 border-b border-slate-800 pb-1.5 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex justify-between items-center gap-5">
              <span className="flex items-center gap-1.5 font-medium" style={{ color: entry.color }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-white">
                {formatMoney(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Control Strip */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shadow-inner">
            <DollarSign className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Recurring Earnings Telemetry</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                LIVE REVENUE FEED
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Real-time visualization of Subscriptions, Marketplace Commissions & Sponsored Ad Listings
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe selector */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setTimeframe('daily')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                timeframe === 'daily'
                  ? 'bg-emerald-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Daily (DRR)</span>
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                timeframe === 'monthly'
                  ? 'bg-emerald-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Monthly (MRR)</span>
            </button>
            <button
              onClick={() => setTimeframe('yearly')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                timeframe === 'yearly'
                  ? 'bg-emerald-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Yearly (ARR)</span>
            </button>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 text-slate-300 transition"
            title="Refresh revenue metrics"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Primary KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total MRR Card */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition" />
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1.5 font-semibold">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              SaaS Subscriptions (MRR)
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              76.6% Share
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">
              {formatMoney(currentMonth.subscriptions)}
            </span>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.2%
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex justify-between border-t border-slate-800/80 pt-2">
            <span>Student ($8) + Pro ($25) + Enterprise ($99)</span>
          </div>
        </div>

        {/* Marketplace Cut Card */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl group-hover:bg-sky-500/10 transition" />
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1.5 font-semibold">
              <ShoppingBag className="w-3.5 h-3.5 text-sky-400" />
              Marketplace Commissions
            </span>
            <span className="text-[10px] text-sky-400 font-mono font-bold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              17.3% Share
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">
              {formatMoney(currentMonth.marketplace)}
            </span>
            <span className="text-xs text-sky-400 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +22.5%
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex justify-between border-t border-slate-800/80 pt-2">
            <span>20% Platform Cut on Templates & Prompts</span>
          </div>
        </div>

        {/* Sponsored Listings Card */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition" />
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1.5 font-semibold">
              <Megaphone className="w-3.5 h-3.5 text-purple-400" />
              Sponsored Ad Listings
            </span>
            <span className="text-[10px] text-purple-400 font-mono font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              6.1% Share
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">
              {formatMoney(currentMonth.sponsoredListings)}
            </span>
            <span className="text-xs text-purple-400 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +31.0%
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex justify-between border-t border-slate-800/80 pt-2">
            <span>48 Active CPC/CPM Merchant Campaigns</span>
          </div>
        </div>

        {/* Projected ARR Run-Rate Card */}
        <div className="bg-slate-900/80 border border-emerald-500/30 p-5 rounded-2xl space-y-2 shadow-lg relative overflow-hidden group bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Annualized Run Rate (ARR)
            </span>
            <span className="text-[10px] text-emerald-300 font-mono font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
              $1.37M TARGET
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              {formatMoney(currentMonth.total * 12)}
            </span>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-0.5">
              <Sparkles className="w-3.5 h-3.5" /> 12x Run-Rate
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex justify-between border-t border-slate-800/80 pt-2">
            <span>Gross Revenue Margin: ~88.4%</span>
          </div>
        </div>

      </div>

      {/* MAIN RECHARTS AREA: Stacked Area & Stream Filter */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                {timeframe === 'daily' ? '14-Day Daily Recurring Revenue (DRR)' : timeframe === 'monthly' ? '12-Month Recurring Revenue Trajectory (MRR)' : '5-Year Annual Revenue Horizon (ARR)'}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Visualizing combined income streams across Subscriptions, Digital Marketplace & Sponsored Ads
            </p>
          </div>

          {/* Stream filter buttons */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs self-start sm:self-auto">
            <button
              onClick={() => setSelectedStream('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                selectedStream === 'all' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Streams
            </button>
            <button
              onClick={() => setSelectedStream('subscriptions')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                selectedStream === 'subscriptions' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Subscriptions
            </button>
            <button
              onClick={() => setSelectedStream('marketplace')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                selectedStream === 'marketplace' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Marketplace
            </button>
            <button
              onClick={() => setSelectedStream('sponsored_listings')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                selectedStream === 'sponsored_listings' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sponsored Ads
            </button>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="earnSub" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="earnMkt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="earnAds" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => formatMoney(val)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />

              {(selectedStream === 'all' || selectedStream === 'subscriptions') && (
                <Area
                  type="monotone"
                  dataKey="subscriptions"
                  name="SaaS Subscriptions"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#earnSub)"
                  stackId={selectedStream === 'all' ? "1" : undefined}
                />
              )}

              {(selectedStream === 'all' || selectedStream === 'marketplace') && (
                <Area
                  type="monotone"
                  dataKey="marketplace"
                  name="Marketplace Cut"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#earnMkt)"
                  stackId={selectedStream === 'all' ? "1" : undefined}
                />
              )}

              {(selectedStream === 'all' || selectedStream === 'sponsored_listings') && (
                <Area
                  type="monotone"
                  dataKey="sponsoredListings"
                  name="Sponsored Ads & Directory"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#earnAds)"
                  stackId={selectedStream === 'all' ? "1" : undefined}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECONDARY SECTION: Revenue Stream Share & Tier Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Donut Chart: Stream Share */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Revenue Composition</h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Jul 2026 Run-Rate</span>
          </div>

          <div className="h-56 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={streamDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {streamDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest text-slate-400">Total MRR</span>
              <span className="text-lg font-extrabold text-white font-mono">{formatMoney(currentMonth.total)}</span>
            </div>
          </div>

          {/* Legend Table */}
          <div className="space-y-2 border-t border-slate-800 pt-3">
            {streamDistributionData.map((stream) => (
              <div key={stream.name} className="flex justify-between items-center text-xs p-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <span className="flex items-center gap-2 text-slate-300 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stream.color }} />
                  {stream.name}
                </span>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-400 text-[11px]">{stream.share}%</span>
                  <span className="font-bold text-white">{formatMoney(stream.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart: Unit Economics & ARPU */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Subscriber ARPU & LTV Unit Economics</h3>
            </div>
            <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
              LTV:CAC Ratio = 6.8x
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs mb-2">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Average ARPU</span>
              <span className="text-lg font-extrabold font-mono text-sky-400">{formatMoney(23.50)} / mo</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Customer LTV</span>
              <span className="text-lg font-extrabold font-mono text-emerald-400">{formatMoney(680.00)}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Customer CAC</span>
              <span className="text-lg font-extrabold font-mono text-purple-400">{formatMoney(98.00)}</span>
            </div>
          </div>

          {/* Bar chart comparison */}
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { category: 'Student ($8/m)', activeCount: 1830, revenueUSD: 14640 },
                  { category: 'Pro ($25/m)', activeCount: 1820, revenueUSD: 45500 },
                  { category: 'Enterprise ($99/m)', activeCount: 240, revenueUSD: 23760 },
                  { category: 'Marketplace Cut', activeCount: 4120, revenueUSD: 19800 },
                  { category: 'Sponsored Ads', activeCount: 48, revenueUSD: 6900 },
                ]}
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="category" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => formatMoney(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenueUSD" name="Monthly Yield" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* DETAILED LEDGER TABLE */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Granular Monetization Stream Ledger</h3>
              <p className="text-xs text-slate-400">Detailed performance audit across all active revenue mechanisms</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Stripe Auto-Payout Enabled
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80 uppercase tracking-wider font-mono">
                <th className="py-3 px-4">Revenue Channel</th>
                <th className="py-3 px-4">Billing Model</th>
                <th className="py-3 px-4 text-center">Active Entities</th>
                <th className="py-3 px-4 text-right">Avg Unit Yield</th>
                <th className="py-3 px-4 text-right">Jul 2026 Run-Rate</th>
                <th className="py-3 px-4 text-center">Growth (YoY)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Professional Engineer Tier
                </td>
                <td className="py-3.5 px-4 text-slate-300 font-mono">Subscription ($25/mo)</td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-sky-400">1,820 Engineers</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-300">{formatMoney(25)}</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">{formatMoney(45500)}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[10px]">
                    +34%
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Enterprise Shipping License
                </td>
                <td className="py-3.5 px-4 text-slate-300 font-mono">Enterprise ($99/mo)</td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-purple-400">240 Companies</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-300">{formatMoney(99)}</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">{formatMoney(23760)}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[10px]">
                    +48%
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-300" />
                  Student Maritime Pass
                </td>
                <td className="py-3.5 px-4 text-slate-300 font-mono">Subscription ($8/mo)</td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-300">1,830 Students</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-300">{formatMoney(8)}</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">{formatMoney(14640)}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[10px]">
                    +21%
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  Digital Downloads & Templates
                </td>
                <td className="py-3.5 px-4 text-slate-300 font-mono">20% Platform Cut</td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-300">2,840 Sales/mo</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-300">{formatMoney(6.90)} avg cut</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-sky-400">{formatMoney(12600)}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 font-mono font-bold text-[10px]">
                    +29%
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Prompt Store & AI Workflows
                </td>
                <td className="py-3.5 px-4 text-slate-300 font-mono">15% Creator Royalty</td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-300">1,280 Purchases</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-300">{formatMoney(5.62)} avg cut</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-sky-400">{formatMoney(7200)}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono font-bold text-[10px]">
                    +52%
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  Directory Sponsored Ads (#117)
                </td>
                <td className="py-3.5 px-4 text-slate-300 font-mono">CPC ($1.80) / CPM ($15)</td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-purple-400">48 Campaigns</td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-300">{formatMoney(143.75)} / campaign</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-purple-400">{formatMoney(6900)}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-mono font-bold text-[10px]">
                    +64%
                  </span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-slate-950 font-bold border-t-2 border-slate-800 text-white">
                <td className="py-4 px-4 font-extrabold text-sm" colSpan={4}>
                  TOTAL COMBINED RUN-RATE (JULY 2026)
                </td>
                <td className="py-4 px-4 text-right font-mono text-lg text-emerald-400 font-extrabold">
                  {formatMoney(currentMonth.total)}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold">
                    +38.5% YoY
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
};
