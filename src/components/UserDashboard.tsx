import React, { useState } from 'react';
import { PlanType } from '../types';
import {
  User,
  Award,
  Download,
  Key,
  FolderKanban,
  Copy,
  Check,
  Sparkles,
  Flame,
  Trophy,
  Zap,
  Gift,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Globe,
  Star,
  ShieldCheck,
  GraduationCap,
  Anchor,
  Compass,
  CheckCircle2,
  Clock,
  ShoppingBag,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  ShieldAlert,
  LogOut,
  RefreshCw,
  Trash2,
  Plus,
  HardDrive,
  Lock,
  AlertCircle
} from 'lucide-react';

interface UserDashboardProps {
  userPlan: PlanType;
  onUpgrade: () => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'engineering' | 'ai' | 'community' | 'learning';
  points: number;
  unlocked: boolean;
  unlockedDate?: string;
  progress: number; // 0 - 100
}

interface LeaderboardUser {
  rank: number;
  name: string;
  role: string;
  country: string;
  flag: string;
  points: number;
  streak: number;
  avatarBg: string;
  badgesCount: number;
  isCurrentUser?: boolean;
}

export interface DeviceSession {
  id: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'workstation';
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrentDevice: boolean;
  isTrusted: boolean;
  loginMethod: string;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ userPlan, onUpgrade }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'gamification' | 'api_analytics' | 'sessions'>('overview');
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [userPoints, setUserPoints] = useState(2450);
  const [claimedRewardId, setClaimedRewardId] = useState<string | null>(null);

  // Session Management State
  const [activeSessions, setActiveSessions] = useState<DeviceSession[]>([
    {
      id: 'sess-curr-1',
      deviceName: 'MacBook Pro 16″ (M3 Max)',
      deviceType: 'desktop',
      browser: 'Chrome 127.0 (64-bit)',
      os: 'macOS Sonoma 14.5',
      ipAddress: '84.212.19.44',
      location: 'Oslo, Norway 🇳🇴',
      lastActive: 'Active now (Current Session)',
      isCurrentDevice: true,
      isTrusted: true,
      loginMethod: 'Google Workspace SSO',
    },
    {
      id: 'sess-mob-2',
      deviceName: 'iPhone 15 Pro Max',
      deviceType: 'mobile',
      browser: 'AI Maritime Native iOS App v3.2',
      os: 'iOS 17.5.1',
      ipAddress: '188.113.88.12',
      location: 'Trondheim, Norway 🇳🇴',
      lastActive: '14 minutes ago',
      isCurrentDevice: false,
      isTrusted: true,
      loginMethod: 'Biometric Passkey',
    },
    {
      id: 'sess-work-3',
      deviceName: 'Shipyard CAD Workstation',
      deviceType: 'workstation',
      browser: 'Edge Enterprise 126.0',
      os: 'Windows 11 Pro Workstation',
      ipAddress: '145.130.22.10',
      location: 'Rotterdam, Netherlands 🇳🇱',
      lastActive: '2 hours ago',
      isCurrentDevice: false,
      isTrusted: true,
      loginMethod: 'Hardware Security Key (YubiKey)',
    },
    {
      id: 'sess-tab-4',
      deviceName: 'Port Authority iPad Air',
      deviceType: 'tablet',
      browser: 'Safari Mobile 17.4',
      os: 'iPadOS 17.4',
      ipAddress: '202.156.12.8',
      location: 'Singapore Port Office 🇸🇬',
      lastActive: 'Yesterday at 16:42',
      isCurrentDevice: false,
      isTrusted: false,
      loginMethod: 'SMS OTP Passcode',
    },
  ]);

  const [sessionNotice, setSessionNotice] = useState<{ type: 'success' | 'info'; text: string } | null>(null);
  const [emailLoginAlerts, setEmailLoginAlerts] = useState(true);
  const [require2FAOnNewDevice, setRequire2FAOnNewDevice] = useState(true);
  const [inactivityTimeout, setInactivityTimeout] = useState('24_hours');

  // Terminate a single remote device session
  const handleTerminateSession = (id: string, deviceName: string) => {
    setActiveSessions(prev => prev.filter(s => s.id !== id));
    setSessionNotice({
      type: 'success',
      text: `Session for "${deviceName}" terminated successfully. Device token invalidated.`,
    });
    setTimeout(() => setSessionNotice(null), 4000);
  };

  // Terminate all other remote sessions
  const handleTerminateAllOtherSessions = () => {
    setActiveSessions(prev => prev.filter(s => s.isCurrentDevice));
    setSessionNotice({
      type: 'success',
      text: 'Terminated all remote sessions across all other devices. Current session remains active.',
    });
    setTimeout(() => setSessionNotice(null), 4000);
  };

  // Refresh sessions
  const handleRefreshSessions = () => {
    setSessionNotice({
      type: 'info',
      text: 'Refreshed device tokens and active IP connections from AI Maritime Cloud Security Gateway.',
    });
    setTimeout(() => setSessionNotice(null), 3000);
  };

  // Simulate logging in a new remote device for demonstration
  const handleSimulateNewDevice = () => {
    const newId = `sess-sim-${Date.now()}`;
    const newDevice: DeviceSession = {
      id: newId,
      deviceName: 'Galaxy Tab S9 Ultra (Surveyor)',
      deviceType: 'tablet',
      browser: 'Chrome Mobile 126',
      os: 'Android 14',
      ipAddress: '103.24.18.99',
      location: 'Busan Dry Dock, South Korea 🇰🇷',
      lastActive: 'Just now',
      isCurrentDevice: false,
      isTrusted: false,
      loginMethod: 'Magic Link Sign-In',
    };
    setActiveSessions(prev => [newDevice, ...prev]);
    setSessionNotice({
      type: 'info',
      text: 'Simulated new login from Busan Dry Dock, South Korea! Device added to session list.',
    });
    setTimeout(() => setSessionNotice(null), 4000);
  };

  const generateApiKey = () => {
    setApiKey('mh_live_' + Math.random().toString(36).substring(2, 18) + Math.random().toString(36).substring(2, 18));
  };

  const achievements: Achievement[] = [
    {
      id: 'ach-1',
      title: 'Naval Arch Pioneer',
      description: 'Run 50+ hydrostatics or Holtrop resistance calculations in Calculators Hub.',
      icon: <Anchor className="w-5 h-5 text-sky-400" />,
      category: 'engineering',
      points: 500,
      unlocked: true,
      unlockedDate: 'July 18, 2026',
      progress: 100,
    },
    {
      id: 'ach-2',
      title: 'SOLAS 2026 Compliance Master',
      description: 'Query IMO SOLAS and MARPOL conventions 25 times via Maritime AI Chat.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      category: 'ai',
      points: 350,
      unlocked: true,
      unlockedDate: 'July 22, 2026',
      progress: 100,
    },
    {
      id: 'ach-3',
      title: 'Academy Honor Graduate',
      description: 'Complete 3 certified DNV/Lloyds courses in Learning Hub with >90% score.',
      icon: <GraduationCap className="w-5 h-5 text-amber-400" />,
      category: 'learning',
      points: 600,
      unlocked: true,
      unlockedDate: 'July 24, 2026',
      progress: 100,
    },
    {
      id: 'ach-4',
      title: '18-Day Learning Streak',
      description: 'Log into Maritime AI Hub and complete at least 1 task daily for 18 straight days.',
      icon: <Flame className="w-5 h-5 text-orange-400" />,
      category: 'learning',
      points: 400,
      unlocked: true,
      unlockedDate: 'Today',
      progress: 100,
    },
    {
      id: 'ach-5',
      title: 'Marketplace Creator',
      description: 'Publish your first Maxsurf hull DWG or VBA calculation template on Marketplace.',
      icon: <ShoppingBag className="w-5 h-5 text-purple-400" />,
      category: 'community',
      points: 500,
      unlocked: false,
      progress: 60,
    },
    {
      id: 'ach-6',
      title: 'Green Tech Advocate',
      description: 'Generate 10 Inventory of Hazardous Materials (IHM HKC 2025) compliance forms.',
      icon: <Compass className="w-5 h-5 text-teal-400" />,
      category: 'engineering',
      points: 300,
      unlocked: false,
      progress: 40,
    },
  ];

  const leaderboardUsers: LeaderboardUser[] = [
    {
      rank: 1,
      name: 'Dr. Henrik Lindqvist',
      role: 'Chief Hydrodynamicist @ DNV Oslo',
      country: 'Norway',
      flag: '🇳🇴',
      points: 12840,
      streak: 42,
      avatarBg: 'bg-emerald-600',
      badgesCount: 18,
    },
    {
      rank: 2,
      name: 'Capt. Thomas Moreau',
      role: 'Senior Marine Surveyor @ Bureau Veritas',
      country: 'France',
      flag: '🇫🇷',
      points: 11200,
      streak: 35,
      avatarBg: 'bg-blue-600',
      badgesCount: 15,
    },
    {
      rank: 3,
      name: 'Elena Rostova, Ph.D.',
      role: 'CFD Specialist @ Wärtsilä Marine',
      country: 'Finland',
      flag: '🇫🇮',
      points: 9850,
      streak: 29,
      avatarBg: 'bg-purple-600',
      badgesCount: 14,
    },
    {
      rank: 4,
      name: 'Capt. Alex Sterling (You)',
      role: 'Principal Naval Architect @ Maritime Design Lab',
      country: 'Singapore',
      flag: '🇸🇬',
      points: 8420,
      streak: 18,
      avatarBg: 'bg-sky-600',
      badgesCount: 12,
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: 'Kenji Takahashi',
      role: 'Hull Structural Engineer @ Mitsubishi Heavy Ind.',
      country: 'Japan',
      flag: '🇯🇵',
      points: 7920,
      streak: 21,
      avatarBg: 'bg-red-600',
      badgesCount: 10,
    },
    {
      rank: 6,
      name: 'Amara Okechukwu',
      role: 'Offshore Renewable Engineer @ Subsea7',
      country: 'United Kingdom',
      flag: '🇬🇧',
      points: 7350,
      streak: 14,
      avatarBg: 'bg-amber-600',
      badgesCount: 9,
    },
  ];

  const rewardStoreItems = [
    {
      id: 'rew-1',
      title: '500,000 Extra AI Tokens Quota',
      cost: 1000,
      description: 'Instantly add 500k AI tokens to your monthly allowance for complex CFD and SOLAS prompts.',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      badge: 'Popular'
    },
    {
      id: 'rew-2',
      title: '50% Off Annual Pro Membership Voucher',
      cost: 2000,
      description: 'Get a 50% discount on upgrading to the Professional or Enterprise annual plan.',
      icon: <Gift className="w-5 h-5 text-sky-400" />,
      badge: 'Best Value'
    },
    {
      id: 'rew-3',
      title: 'Maxsurf Hull Geometry Master Suite (DWG/IGES)',
      cost: 1500,
      description: 'Unlock 12 ready-to-run Maxsurf hull CAD geometry files for bulk carriers and LPG tankers.',
      icon: <Anchor className="w-5 h-5 text-purple-400" />,
      badge: 'Digital Goods'
    },
  ];

  const handleRedeemReward = (reward: typeof rewardStoreItems[0]) => {
    if (userPoints >= reward.cost) {
      setUserPoints(prev => prev - reward.cost);
      setClaimedRewardId(reward.id);
    } else {
      alert(`You need ${reward.cost - userPoints} more points to redeem this item! Complete daily tasks to earn points.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Top Profile Banner */}
      <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* User Info & Avatar */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-purple-600 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-bold text-sky-400 text-xl">
                <User className="w-8 h-8" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-extrabold text-slate-950 shadow">
              7
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-extrabold text-white">Capt. Alex Sterling, M.Sc</h2>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded uppercase bg-sky-500/20 text-sky-300 border border-sky-400/30">
                {userPlan} PLAN
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Star className="w-3 h-3 fill-current text-amber-400" /> LVL 7 MASTER NAVAL ARCH
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Principal Naval Architect @ Maritime Design Lab • Member #MH-8921 • Singapore 🇸🇬
            </p>

            {/* XP Level Bar */}
            <div className="mt-2.5 w-full max-w-md">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300 mb-1">
                <span>XP Progress: <strong className="text-sky-400">8,420 / 10,000 XP</strong></span>
                <span className="text-amber-400">Level 8 Unlocks in 1,580 XP</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 w-[84%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Gamification Chips & Action */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          
          {/* Streak Chip */}
          <div className="px-3 py-2 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-orange-300 uppercase font-extrabold block leading-tight">Daily Streak</span>
              <span className="text-sm font-black text-white font-mono">18 Days 🔥</span>
            </div>
          </div>

          {/* Reward Points Chip */}
          <div className="px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] text-amber-300 uppercase font-extrabold block leading-tight">Reward Points</span>
              <span className="text-sm font-black text-amber-300 font-mono">{userPoints.toLocaleString()} PTS</span>
            </div>
          </div>

          <button
            onClick={onUpgrade}
            className="px-4 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Subscription</span>
          </button>

        </div>

      </div>

      {/* View Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Dashboard & Projects</span>
        </button>

        <button
          onClick={() => setActiveTab('gamification')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'gamification'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Gamification & Rewards</span>
          <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px]">Leaderboard</span>
        </button>

        <button
          onClick={() => setActiveTab('api_analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'api_analytics'
              ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>API Tokens & Usage</span>
        </button>

        <button
          onClick={() => setActiveTab('sessions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'sessions'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <HardDrive className="w-4 h-4 text-emerald-400" />
          <span>Session & Devices</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-mono text-[10px] font-extrabold">
            {activeSessions.length} Active
          </span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & PROJECTS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <span className="text-slate-400 text-xs block font-medium">Saved Projects</span>
              <span className="text-2xl font-extrabold text-sky-400 font-mono">14</span>
              <span className="text-[10px] text-emerald-400 block mt-1">+2 this week</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <span className="text-slate-400 text-xs block font-medium">Certificates Earned</span>
              <span className="text-2xl font-extrabold text-amber-400 font-mono">3</span>
              <span className="text-[10px] text-amber-300 block mt-1">Lloyd’s & DNV Accredited</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <span className="text-slate-400 text-xs block font-medium">AI Tokens Consumed</span>
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">128.4K</span>
              <span className="text-[10px] text-slate-400 block mt-1">871.6K tokens remaining</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              <span className="text-slate-400 text-xs block font-medium">Affiliate Earnings</span>
              <span className="text-2xl font-extrabold text-purple-400 font-mono">$184.00</span>
              <span className="text-[10px] text-purple-300 block mt-1">3 active referrals</span>
            </div>
          </div>

          {/* Saved Files & Recent Calculations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Saved Hull Designs & Reports */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2">
                  <FolderKanban className="w-4 h-4" />
                  <span>Saved Projects & Reports</span>
                </h3>
                <span className="text-[11px] text-slate-400">14 total files</span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: '180m Bulk Carrier Hydrostatics Report.pdf', date: 'Yesterday', size: '2.4 MB', type: 'PDF' },
                  { name: 'HKC 2025 HazMat Sampling Plan - M/V Pacific.pdf', date: '3 days ago', size: '1.8 MB', type: 'IHM' },
                  { name: 'Container Feeder Holtrop Resistance Model.msf', date: '1 week ago', size: '14 MB', type: 'Maxsurf' },
                  { name: 'SOLAS Ch II-1 Damage Stability Calculations.xlsx', date: '2 weeks ago', size: '820 KB', type: 'Excel' },
                ].map((proj, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between hover:border-sky-500/40 transition">
                    <div>
                      <span className="font-bold text-white block">{proj.name}</span>
                      <span className="text-[10px] text-slate-500">{proj.date} • {proj.size} • <span className="text-sky-400">{proj.type}</span></span>
                    </div>
                    <button className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition" title="Download Asset">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Verified AI Certifications */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Issued Certificates & Badges</span>
                </h3>
                <span className="text-[11px] text-amber-400 font-semibold">Verified On-Chain</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { title: 'Naval Architecture & Hydrostatics Masterclass', issuer: 'DNV Academy', date: 'July 2026', certId: 'DNV-CERT-88412' },
                  { title: 'SOLAS & MARPOL Decarbonization Auditor', issuer: 'Lloyds Maritime Institute', date: 'June 2026', certId: 'LMI-AUD-99120' },
                  { title: 'OpenFOAM CFD Marine Hydrodynamics', issuer: 'Maritime AI Hub', date: 'May 2026', certId: 'MH-CFD-10294' },
                ].map((cert, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-amber-500/20 flex items-center justify-between">
                    <div className="flex items-start gap-2.5">
                      <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs text-white">{cert.title}</h4>
                        <p className="text-[10px] text-slate-400">{cert.issuer} • Issued {cert.date} • ID: <code className="text-amber-300">{cert.certId}</code></p>
                      </div>
                    </div>
                    <button className="px-2.5 py-1 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 rounded-lg text-[10px] font-bold transition flex items-center gap-1">
                      <Download className="w-3 h-3" /> PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: GAMIFICATION & LEADERBOARD */}
      {activeTab === 'gamification' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Gamification Grid Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Daily Streak Tracker Card */}
            <div className="bg-slate-900/90 border border-orange-500/30 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
                  <h3 className="font-extrabold text-white text-base">Daily Streak Tracker</h3>
                </div>
                <span className="text-xs font-black px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono">
                  18 Days
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Log in and run at least 1 calculation or query daily to keep your streak burning and earn +50 bonus XP per day!
              </p>

              {/* 7-Day Calendar Dots */}
              <div className="grid grid-cols-7 gap-2 pt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                  const isDone = idx < 6; // Mon-Sat done, Sun today
                  const isToday = idx === 5;
                  return (
                    <div key={day} className="text-center space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold">{day}</span>
                      <div className={`w-full aspect-square rounded-xl flex items-center justify-center text-xs font-black transition border ${
                        isDone
                          ? 'bg-orange-500/20 text-orange-300 border-orange-500/40 shadow-sm'
                          : 'bg-slate-950 text-slate-600 border-slate-800'
                      }`}>
                        {isDone ? <Check className="w-4 h-4 text-orange-400" /> : idx + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-amber-300 font-medium text-center">
                🔥 Next milestone: 20 Days (+500 Bonus Reward Points)
              </p>
            </div>

            {/* Global Leaderboard Snapshot */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <h3 className="font-extrabold text-white text-base">Global Maritime Leaderboard</h3>
                </div>
                <span className="text-xs text-slate-400">Updated Real-Time</span>
              </div>

              {/* Leaderboard Table */}
              <div className="space-y-2 text-xs">
                {leaderboardUsers.map((usr) => (
                  <div
                    key={usr.rank}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition ${
                      usr.isCurrentUser
                        ? 'bg-sky-500/15 border-sky-500/50 text-white font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-extrabold text-xs shrink-0 ${
                        usr.rank === 1 ? 'bg-amber-400 text-slate-950' :
                        usr.rank === 2 ? 'bg-slate-300 text-slate-950' :
                        usr.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        #{usr.rank}
                      </span>

                      <div className={`w-8 h-8 rounded-full ${usr.avatarBg} flex items-center justify-center font-bold text-white text-xs shrink-0`}>
                        {usr.name.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-white truncate">{usr.name}</span>
                          <span>{usr.flag}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{usr.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                      <div className="text-right">
                        <span className="text-amber-300 font-extrabold block">{usr.points.toLocaleString()} PTS</span>
                        <span className="text-[10px] text-orange-400 font-medium">{usr.streak}d streak 🔥</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Badges & Achievements Catalog */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <span>Badges & Achievements</span>
                </h3>
                <p className="text-xs text-slate-400">Unlock official maritime engineering achievements to gain XP and reward points.</p>
              </div>
              <span className="text-xs font-extrabold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                4 of 6 Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border transition relative overflow-hidden flex flex-col justify-between space-y-3 ${
                    ach.unlocked
                      ? 'bg-slate-900/90 border-slate-700/80 hover:border-amber-500/50'
                      : 'bg-slate-950/40 border-slate-900 opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      {ach.icon}
                    </div>
                    <span className="text-xs font-black font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
                      +{ach.points} PTS
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <span>{ach.title}</span>
                      {ach.unlocked && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ach.description}</p>
                  </div>

                  {ach.unlocked ? (
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-emerald-400 font-semibold">
                      <span>Unlocked {ach.unlockedDate}</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">COMPLETED</span>
                    </div>
                  ) : (
                    <div className="space-y-1 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                        <span>Progress</span>
                        <span>{ach.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `${ach.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reward Points Store */}
          <div className="bg-slate-900/90 border border-amber-500/30 p-6 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-400" />
                  <span>Points Redemption Store</span>
                </h3>
                <p className="text-xs text-slate-400">Trade your earned maritime reward points for AI token quotas, subscription discounts, and CAD suites.</p>
              </div>
              
              <div className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-300 font-extrabold text-sm font-mono flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>Your Balance: {userPoints.toLocaleString()} PTS</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rewardStoreItems.map((item) => {
                const isClaimed = claimedRewardId === item.id;
                const canAfford = userPoints >= item.cost;
                return (
                  <div
                    key={item.id}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                          {item.icon}
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="font-mono text-amber-300 font-extrabold text-sm">{item.cost} PTS</span>

                      {isClaimed ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Redeemed
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRedeemReward(item)}
                          disabled={!canAfford}
                          className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition ${
                            canAfford
                              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          Redeem Reward
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: DEVELOPER API & ANALYTICS */}
      {activeTab === 'api_analytics' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Developer API Key Generator */}
          <div className="bg-slate-900/90 border border-purple-500/30 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
              <Key className="w-4 h-4" />
              <span>Developer API Key Access</span>
            </h3>
            <p className="text-xs text-slate-400">
              Use your API key to programmatically query Holtrop resistance, SOLAS regulation chunks, or hydrostatics from your Python or C# apps.
            </p>

            {apiKey ? (
              <div className="space-y-2">
                <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/40 flex items-center justify-between font-mono text-xs text-purple-300">
                  <span className="truncate">{apiKey}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(apiKey);
                      setCopiedKey(true);
                      setTimeout(() => setCopiedKey(false), 2000);
                    }}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-emerald-400">Active • Rate Limit: 100 req/min</p>
              </div>
            ) : (
              <button
                onClick={generateApiKey}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition"
              >
                Generate Live API Key
              </button>
            )}
          </div>

          {/* Token Consumption Log Table */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Recent API & AI Token Activity</span>
              </h3>
              <span className="text-xs text-slate-400">Quota: 1,000,000 / month</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2 font-semibold">Timestamp</th>
                    <th className="pb-2 font-semibold">Module</th>
                    <th className="pb-2 font-semibold">Tokens</th>
                    <th className="pb-2 font-semibold">Model</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {[
                    { time: '10 mins ago', module: 'Holtrop Resistance Calc', tokens: '1,420', model: 'Gemini 2.5 Flash', status: 'Success 200' },
                    { time: '1 hour ago', module: 'SOLAS Ch II-1 Chat', tokens: '4,890', model: 'Gemini 2.5 Pro', status: 'Success 200' },
                    { time: '3 hours ago', module: 'IHM HazMat PDF Export', tokens: '820', model: 'PDF Engine v2', status: 'Success 200' },
                    { time: 'Yesterday', module: 'AI Thesis Outline Generator', tokens: '18,400', model: 'Gemini 2.5 Pro', status: 'Success 200' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/40 transition">
                      <td className="py-2.5 font-mono text-[11px] text-slate-400">{row.time}</td>
                      <td className="py-2.5 font-semibold text-white">{row.module}</td>
                      <td className="py-2.5 font-mono text-emerald-400">{row.tokens}</td>
                      <td className="py-2.5 text-slate-400">{row.model}</td>
                      <td className="py-2.5"><span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold">{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: SESSION & DEVICE MANAGEMENT */}
      {activeTab === 'sessions' && (
        <div className="space-y-6">
          
          {/* Notification Banner */}
          {sessionNotice && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between shadow-lg transition animate-fadeIn ${
                sessionNotice.type === 'success'
                  ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/40'
                  : 'bg-sky-950/90 text-sky-300 border border-sky-500/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{sessionNotice.text}</span>
              </div>
              <button
                onClick={() => setSessionNotice(null)}
                className="opacity-70 hover:opacity-100 text-sm font-bold px-2 py-0.5 rounded bg-slate-900/40"
              >
                ✕
              </button>
            </div>
          )}

          {/* Top Control Bar */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-emerald-400" />
                    <span>Active Devices & Multi-Session Control</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    SOC2 & OAuth 2.0 Invalidation
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Manage logged-in devices across web, iOS, Android, and shipyard workstations. Terminate individual sessions remotely or revoke all tokens.
                </p>
              </div>

              {/* Actions Header */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={handleRefreshSessions}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                  <span>Refresh Sessions</span>
                </button>

                <button
                  onClick={handleSimulateNewDevice}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Simulate Login</span>
                </button>

                {activeSessions.filter(s => !s.isCurrentDevice).length > 0 && (
                  <button
                    onClick={handleTerminateAllOtherSessions}
                    className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-red-500/10"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-400" />
                    <span>Terminate All Other Sessions ({activeSessions.length - 1})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Security Highlights Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>JWT Refresh Token Auto-Revocation</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                <span>IP & Geolocation Anomaly Detection</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>WebAuthn Passkey Hardware Binding</span>
              </div>
            </div>
          </div>

          {/* Active Devices Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <span>Active Signed-In Devices ({activeSessions.length})</span>
              </h4>
              <span className="text-xs text-slate-400">Showing all current valid sessions</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSessions.map((session) => {
                const getDeviceIcon = () => {
                  switch (session.deviceType) {
                    case 'mobile':
                      return <Smartphone className="w-6 h-6 text-sky-400" />;
                    case 'tablet':
                      return <Tablet className="w-6 h-6 text-purple-400" />;
                    case 'workstation':
                      return <Monitor className="w-6 h-6 text-amber-400" />;
                    default:
                      return <Laptop className="w-6 h-6 text-emerald-400" />;
                  }
                };

                return (
                  <div
                    key={session.id}
                    className={`p-5 rounded-2xl border transition relative flex flex-col justify-between gap-4 ${
                      session.isCurrentDevice
                        ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/5'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Device Header */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
                            session.isCurrentDevice
                              ? 'bg-emerald-500/20 border-emerald-500/30'
                              : 'bg-slate-950 border-slate-800'
                          }`}>
                            {getDeviceIcon()}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-black text-white">{session.deviceName}</h5>
                            </div>
                            <p className="text-xs text-slate-400 font-medium">
                              {session.browser} • {session.os}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        {session.isCurrentDevice ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Current Device
                          </span>
                        ) : session.isTrusted ? (
                          <span className="px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30 text-[10px] font-extrabold shrink-0">
                            Trusted Device
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold shrink-0">
                            Remote Session
                          </span>
                        )}
                      </div>

                      {/* Device Technical Specs List */}
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1.5 text-xs text-slate-300 font-mono">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-sans">IP Address & Location</span>
                          <span className="text-white font-bold">{session.ipAddress} ({session.location})</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-sans">Authentication</span>
                          <span className="text-sky-300 font-sans font-bold">{session.loginMethod}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-sans">Last Active</span>
                          <span className={session.isCurrentDevice ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                            {session.lastActive}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>AES-256 Encrypted Session Token</span>
                      </div>

                      {session.isCurrentDevice ? (
                        <button
                          disabled
                          className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs cursor-not-allowed opacity-60"
                        >
                          This Device (Active)
                        </button>
                      ) : (
                        <button
                          onClick={() => handleTerminateSession(session.id, session.deviceName)}
                          className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 font-bold text-xs transition flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          <span>Log Out / Terminate</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Session Inactivity Timeout & Security Alert Policy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Auto Inactivity Invalidation */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Automatic Inactivity Logout</h4>
                  <p className="text-xs text-slate-400">Revoke device session token after period of inactivity</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">Session Idle Duration</label>
                <select
                  value={inactivityTimeout}
                  onChange={(e) => {
                    setInactivityTimeout(e.target.value);
                    setSessionNotice({ type: 'success', text: 'Inactivity session timeout policy updated.' });
                    setTimeout(() => setSessionNotice(null), 3000);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 font-bold"
                >
                  <option value="15_mins">15 Minutes Inactivity (Strict Maritime Security)</option>
                  <option value="1_hour">1 Hour Inactivity</option>
                  <option value="8_hours">8 Hours (Standard Work Shift)</option>
                  <option value="24_hours">24 Hours (Default)</option>
                  <option value="7_days">7 Days (Remember Me)</option>
                </select>
              </div>

              <p className="text-[11px] text-slate-400">
                When the specified idle time passes without user interaction, the session token is destroyed and user is prompted for re-authentication.
              </p>
            </div>

            {/* Device Security Notification Settings */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Login Security Alerts</h4>
                  <p className="text-xs text-slate-400">Real-time alerts for unauthorized device logins</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                  <span className="font-bold text-slate-200">New Device Sign-in Email Alerts</span>
                  <input
                    type="checkbox"
                    checked={emailLoginAlerts}
                    onChange={(e) => setEmailLoginAlerts(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-sky-500 focus:ring-0 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                  <span className="font-bold text-slate-200">Force 2FA on Unrecognized IP Locations</span>
                  <input
                    type="checkbox"
                    checked={require2FAOnNewDevice}
                    onChange={(e) => setRequire2FAOnNewDevice(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-sky-500 focus:ring-0 w-4 h-4"
                  />
                </label>
              </div>
            </div>

          </div>

          {/* Audit Security Logs */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Recent Security & Session Audit History</span>
              </h4>
              <span className="text-xs text-slate-400 font-mono">Immutable Security Log</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2 font-semibold">Time</th>
                    <th className="pb-2 font-semibold">Event Description</th>
                    <th className="pb-2 font-semibold">IP Address</th>
                    <th className="pb-2 font-semibold">Location</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {[
                    { time: 'Active now', event: 'Current Session Active (macOS Chrome)', ip: '84.212.19.44', location: 'Oslo, Norway', status: 'Active Session' },
                    { time: '14 mins ago', event: 'Mobile App Sync (iPhone 15 Pro)', ip: '188.113.88.12', location: 'Trondheim, Norway', status: 'Authorized' },
                    { time: '2 hours ago', event: 'Hardware YubiKey 2FA Success', ip: '145.130.22.10', location: 'Rotterdam, Netherlands', status: '2FA Verified' },
                    { time: 'Yesterday 16:42', event: 'New Device Login (iPad Air)', ip: '202.156.12.8', location: 'Singapore Port', status: 'OTP Verified' },
                    { time: '3 days ago', event: 'Remote Session Terminated', ip: '91.240.118.2', location: 'London, UK', status: 'Revoked' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/40 transition">
                      <td className="py-2.5 font-mono text-[11px] text-slate-400">{row.time}</td>
                      <td className="py-2.5 font-semibold text-white">{row.event}</td>
                      <td className="py-2.5 font-mono text-sky-400">{row.ip}</td>
                      <td className="py-2.5 text-slate-300">{row.location}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'Active Session'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : row.status === 'Revoked'
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-sky-500/20 text-sky-300'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
