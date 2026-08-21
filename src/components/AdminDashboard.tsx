import React, { useEffect, useState } from 'react';
import {
  ShieldAlert,
  DollarSign,
  Users,
  Bot,
  TrendingUp,
  Settings,
  Tag,
  Loader2,
  BarChart3,
  Activity,
  PieChart as PieIcon,
  Zap,
  ArrowUpRight,
  Sparkles,
  Calendar,
  BookMarked,
  Terminal,
  ShieldCheck,
  CreditCard,
  UserCheck,
  UserX,
  RefreshCw,
  Search,
  Filter,
  Plus,
  Check,
  X,
  AlertTriangle,
  HardDrive,
  Download,
  Lock,
  Eye,
  Sliders
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
import { PlanType, UserRole, AuditLogItem, CouponCode, PaymentTransaction } from '../types';

export const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeAdminTab, setActiveAdminTab] = useState<
    'analytics' | 'users' | 'subscriptions' | 'ai_monitoring' | 'payments' | 'coupons' | 'security_audit'
  >('analytics');

  // Revenue & telemetry data
  const [stats, setStats] = useState<any>({
    totalUsers: 14280,
    activeSubscribers: 3890,
    monthlyRevenueUSD: 87450,
    aiRequestsToday: 124500,
    affiliatePayouts: 12400,
    digitalSalesThisMonth: 19800,
  });

  // User management state
  const [usersList, setUsersList] = useState<any[]>([
    {
      id: 'usr_001',
      name: 'Capt. Alex Vane',
      email: 'alex.vane@maritimehub.ai',
      role: 'Professional' as UserRole,
      plan: 'professional' as PlanType,
      status: 'active',
      is2FA: true,
      country: 'Norway',
      joinedDate: 'Jan 15, 2025',
      tokensUsed: 784200,
      lastLogin: '10 mins ago'
    },
    {
      id: 'usr_002',
      name: 'Prof. Henrik Larsson',
      email: 'larsson@ntnu.no',
      role: 'University Admin' as UserRole,
      plan: 'university' as PlanType,
      status: 'active',
      is2FA: true,
      country: 'Norway',
      joinedDate: 'Feb 02, 2025',
      tokensUsed: 4280000,
      lastLogin: '1 hour ago'
    },
    {
      id: 'usr_003',
      name: 'Elena Rostova',
      email: 'e.rostova@wartsila.com',
      role: 'Company User' as UserRole,
      plan: 'enterprise' as PlanType,
      status: 'active',
      is2FA: true,
      country: 'Finland',
      joinedDate: 'Mar 10, 2025',
      tokensUsed: 6920000,
      lastLogin: '3 hours ago'
    },
    {
      id: 'usr_004',
      name: 'Tariq Al-Mansoor',
      email: 'tariq@portofsalalah.com',
      role: 'Professional' as UserRole,
      plan: 'professional' as PlanType,
      status: 'active',
      is2FA: true,
      country: 'Oman',
      joinedDate: 'Apr 22, 2025',
      tokensUsed: 1240000,
      lastLogin: '5 hours ago'
    },
    {
      id: 'usr_005',
      name: 'Kazi Tanvir',
      email: 'tanvir@buet.ac.bd',
      role: 'Student' as UserRole,
      plan: 'student' as PlanType,
      status: 'active',
      is2FA: false,
      country: 'Bangladesh',
      joinedDate: 'May 04, 2025',
      tokensUsed: 395000,
      lastLogin: '1 day ago'
    },
    {
      id: 'usr_006',
      name: 'Dr. Marcus Vance',
      email: 'm.vance@mit.edu',
      role: 'Researcher' as UserRole,
      plan: 'professional' as PlanType,
      status: 'active',
      is2FA: true,
      country: 'United States',
      joinedDate: 'Jun 12, 2025',
      tokensUsed: 1850000,
      lastLogin: '2 days ago'
    }
  ]);

  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterPlan, setFilterPlan] = useState<string>('all');

  // Coupon state
  const [coupons, setCoupons] = useState<CouponCode[]>([
    {
      code: 'MARITIME2026',
      discountPercent: 20,
      validPlans: ['student', 'professional', 'enterprise'],
      expiresAt: '2026-12-31',
      usageCount: 1420,
      maxUsage: 5000,
      description: '20% Global Maritime Launch Discount'
    },
    {
      code: 'STUDENT50',
      discountPercent: 50,
      validPlans: ['student'],
      expiresAt: '2026-12-31',
      usageCount: 890,
      maxUsage: 2000,
      description: '50% Verified Student Scholarship Promo'
    },
    {
      code: 'IMO90',
      discountPercent: 25,
      validPlans: ['professional', 'enterprise', 'university'],
      expiresAt: '2026-10-30',
      usageCount: 310,
      maxUsage: 1000,
      description: 'Decarbonization Partner Special Discount'
    },
    {
      code: 'SHIPYARD20',
      discountPercent: 20,
      validPlans: ['enterprise', 'university'],
      expiresAt: '2026-12-31',
      usageCount: 184,
      maxUsage: 500,
      description: 'Commercial Shipyard Enterprise Promo'
    }
  ]);

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(20);
  const [newCouponDesc, setNewCouponDesc] = useState('');
  const [showAddCoupon, setShowAddCoupon] = useState(false);

  // Transactions list
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    {
      id: 'tx_984',
      transactionId: 'TXN-984210',
      timestamp: '2026-08-20 20:15 UTC',
      customerEmail: 'alex.vane@maritimehub.ai',
      customerName: 'Capt. Alex Vane',
      amountUSD: 399,
      currency: 'USD',
      gateway: 'stripe',
      planId: 'professional',
      status: 'completed',
      couponApplied: 'MARITIME2026',
      ipCountry: 'Norway'
    },
    {
      id: 'tx_983',
      transactionId: 'TXN-881204',
      timestamp: '2026-08-20 18:40 UTC',
      customerEmail: 'larsson@ntnu.no',
      customerName: 'Prof. Henrik Larsson',
      amountUSD: 3990,
      currency: 'USD',
      gateway: 'stripe',
      planId: 'university',
      status: 'completed',
      ipCountry: 'Norway'
    },
    {
      id: 'tx_982',
      transactionId: 'TXN-773412',
      timestamp: '2026-08-20 16:10 UTC',
      customerEmail: 'tanvir@buet.ac.bd',
      customerName: 'Kazi Tanvir',
      amountUSD: 149,
      currency: 'BDT',
      gateway: 'bkash',
      planId: 'student',
      status: 'completed',
      couponApplied: 'STUDENT50',
      ipCountry: 'Bangladesh'
    },
    {
      id: 'tx_981',
      transactionId: 'TXN-664190',
      timestamp: '2026-08-20 12:05 UTC',
      customerEmail: 'e.rostova@wartsila.com',
      customerName: 'Elena Rostova',
      amountUSD: 1590,
      currency: 'EUR',
      gateway: 'paypal',
      planId: 'enterprise',
      status: 'completed',
      ipCountry: 'Finland'
    }
  ]);

  // Audit logs
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([
    {
      id: 'aud_01',
      timestamp: '2026-08-20 21:10:04 UTC',
      actorEmail: 'superadmin@maritimehub.ai',
      actorRole: 'Super Admin',
      action: 'COUPON_CREATE',
      resource: 'COUPON/MARITIME2026',
      ipAddress: '194.126.14.88',
      status: 'success',
      details: 'Created 20% promotional discount coupon valid across all tiers.'
    },
    {
      id: 'aud_02',
      timestamp: '2026-08-20 18:45:12 UTC',
      actorEmail: 'admin@maritimehub.ai',
      actorRole: 'Enterprise Admin',
      action: 'TIER_UPGRADE',
      resource: 'USER/usr_001',
      ipAddress: '46.212.90.12',
      status: 'success',
      details: 'Upgraded user account to Professional Tier via Stripe.'
    },
    {
      id: 'aud_03',
      timestamp: '2026-08-20 14:02:30 UTC',
      actorEmail: 'security-bot@maritimehub.ai',
      actorRole: 'Super Admin',
      action: 'RATE_LIMIT_FLAG',
      resource: 'API/OpenFOAM_SIM',
      ipAddress: '185.220.101.5',
      status: 'warning',
      details: 'High frequency burst request throttled under rate-limiting rule.'
    },
    {
      id: 'aud_04',
      timestamp: '2026-08-20 09:15:00 UTC',
      actorEmail: 'backup-system@maritimehub.ai',
      actorRole: 'Super Admin',
      action: 'BACKUP_SNAPSHOT',
      resource: 'DB_DAILY_SNAPSHOT',
      ipAddress: '10.0.0.1',
      status: 'success',
      details: 'Automated AES-256 encrypted database snapshot created (4.8 GB).'
    }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data) setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // 12-Month Revenue Growth Data
  const revenueData = [
    { month: 'Mar', subscriptions: 48000, marketplace: 12000, enterprise: 24000, total: 84000 },
    { month: 'Apr', subscriptions: 56200, marketplace: 14100, enterprise: 28000, total: 98300 },
    { month: 'May', subscriptions: 64500, marketplace: 16500, enterprise: 32000, total: 113000 },
    { month: 'Jun', subscriptions: 72100, marketplace: 18200, enterprise: 36000, total: 126300 },
    { month: 'Jul', subscriptions: 79800, marketplace: 19800, enterprise: 40000, total: 139600 },
    { month: 'Aug', subscriptions: 87450, marketplace: 22400, enterprise: 45000, total: 154850 },
  ];

  // Subscription Tier Breakdown Data
  const tierPieData = [
    { name: 'University Campus ($499/mo)', value: 80, color: '#38bdf8' },
    { name: 'Enterprise ($199/mo)', value: 240, color: '#a855f7' },
    { name: 'Professional ($49/mo)', value: 1420, color: '#3b82f6' },
    { name: 'Student ($19/mo)', value: 2150, color: '#34d399' },
    { name: 'Free User', value: 10390, color: '#64748b' },
  ];

  // AI volume by engine
  const aiVolumeData = [
    { time: '00:00', geminiFlash: 12000, gpt4o: 4200, claudeSonnet: 3100, deepseekR1: 1800 },
    { time: '04:00', geminiFlash: 9500, gpt4o: 3100, claudeSonnet: 2400, deepseekR1: 1400 },
    { time: '08:00', geminiFlash: 28000, gpt4o: 14200, claudeSonnet: 8900, deepseekR1: 4200 },
    { time: '12:00', geminiFlash: 39000, gpt4o: 19500, claudeSonnet: 12400, deepseekR1: 6800 },
    { time: '16:00', geminiFlash: 34000, gpt4o: 16800, claudeSonnet: 10200, deepseekR1: 5900 },
    { time: '20:00', geminiFlash: 21000, gpt4o: 8900, claudeSonnet: 5800, deepseekR1: 3100 },
  ];

  const handleToggleUserBan = (userId: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'banned' : 'active';
        setNotification(`User ${u.name} status changed to ${nextStatus.toUpperCase()}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleChangeUserRole = (userId: string, newRole: UserRole) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        setNotification(`Updated ${u.name}'s role to ${newRole}`);
        return { ...u, role: newRole };
      }
      return u;
    }));
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const newC: CouponCode = {
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      validPlans: ['student', 'professional', 'enterprise', 'university'],
      expiresAt: '2026-12-31',
      usageCount: 0,
      maxUsage: 1000,
      description: newCouponDesc || `${newCouponDiscount}% Promotional Discount`
    };
    setCoupons([newC, ...coupons]);
    setNewCouponCode('');
    setNewCouponDesc('');
    setShowAddCoupon(false);
    setNotification(`Coupon ${newC.code} successfully created!`);
  };

  const handleIssueRefund = (txId: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === txId) {
        setNotification(`Refund processed for ${t.transactionId} ($${t.amountUSD})`);
        return { ...t, status: 'refunded' };
      }
      return t;
    }));
  };

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
                          u.country.toLowerCase().includes(searchUserQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    const matchesPlan = filterPlan === 'all' || u.plan === filterPlan;
    return matchesSearch && matchesRole && matchesPlan;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white animate-fade-in">
      
      {/* Header */}
      <div className="bg-slate-900 border border-purple-500/30 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shadow-inner">
            <ShieldAlert className="w-7 h-7 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[10px] font-bold uppercase tracking-wider">
                Enterprise Super Admin Console
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Node 194.126.14.88
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              AI Maritime Hub • Master Control Plane
            </h1>
            <p className="text-xs text-slate-400">
              Manage multi-tenant subscriptions, 10 user roles (RBAC), AI credit meters, revenue streams, and security audits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => {
              setNotification('AES-256 database snapshot generated and uploaded to secure cold storage.');
            }}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-2"
          >
            <HardDrive className="w-4 h-4 text-purple-400" />
            <span>Create Snapshot Backup</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-300 shadow-lg">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            {notification}
          </span>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'analytics', label: 'Financial & Revenue Analytics', icon: <DollarSign className="w-4 h-4" /> },
          { id: 'users', label: 'User & Role Management (RBAC)', icon: <Users className="w-4 h-4" /> },
          { id: 'subscriptions', label: 'SaaS Subscriptions & MRR', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'ai_monitoring', label: 'AI Token Consumption & Models', icon: <Bot className="w-4 h-4" /> },
          { id: 'payments', label: 'Payment Ledger & Refunds', icon: <CreditCard className="w-4 h-4" /> },
          { id: 'coupons', label: 'Pricing Plans & Coupon Engine', icon: <Tag className="w-4 h-4" /> },
          { id: 'security_audit', label: 'Security & Audit Logs', icon: <Lock className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
              activeAdminTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: FINANCIAL & REVENUE ANALYTICS */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-6">
          
          {/* Metric KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-xs font-semibold text-slate-400 block mb-1">Monthly Recurring Revenue (MRR)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono">$87,450</span>
                <span className="text-xs text-emerald-400 font-bold flex items-center">+28.4%</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-2">Annual Run Rate (ARR): $1,049,400</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-xs font-semibold text-slate-400 block mb-1">Active Paid Subscribers</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono">3,890</span>
                <span className="text-xs text-emerald-400 font-bold flex items-center">+340 this mo</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-2">Churn Rate: 1.2% (Industry Top Tier)</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-xs font-semibold text-slate-400 block mb-1">AI Tokens Processed Today</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-sky-400 font-mono">124,500</span>
                <span className="text-xs text-slate-400">queries</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-2">Avg Latency: 420ms across GPU nodes</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-xs font-semibold text-slate-400 block mb-1">Average Revenue Per User (ARPU)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-purple-400 font-mono">$22.48</span>
                <span className="text-xs text-emerald-400 font-bold">LTV: $540</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-2">Top Geographies: Norway, Singapore, USA</span>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
              <span>6-Month SaaS & Enterprise Revenue Trajectory</span>
              <span className="text-xs text-emerald-400 font-mono font-normal">Gross: $154,850/mo</span>
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEnt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem' }} />
                  <Legend />
                  <Area type="monotone" dataKey="subscriptions" name="SaaS Plans (Student/Pro)" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSub)" />
                  <Area type="monotone" dataKey="enterprise" name="Enterprise & University Contracts" stroke="#38bdf8" fillOpacity={1} fill="url(#colorEnt)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER & ROLE MANAGEMENT (RBAC) */}
      {activeAdminTab === 'users' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchUserQuery}
                onChange={(e) => setSearchUserQuery(e.target.value)}
                placeholder="Search by name, email, or country..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">All 10 Roles</option>
                <option value="Guest">Guest</option>
                <option value="Free User">Free User</option>
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
                <option value="Researcher">Researcher</option>
                <option value="Instructor">Instructor</option>
                <option value="Company User">Company User</option>
                <option value="University Admin">University Admin</option>
                <option value="Enterprise Admin">Enterprise Admin</option>
                <option value="Super Admin">Super Admin</option>
              </select>

              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Plans</option>
                <option value="free">Free</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
                <option value="university">University</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3.5">User Profile</th>
                    <th className="p-3.5">Assigned Role (RBAC)</th>
                    <th className="p-3.5">Plan Tier</th>
                    <th className="p-3.5">2FA / Security</th>
                    <th className="p-3.5">Tokens Used</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/50 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-white">{u.name}</div>
                        <div className="text-[11px] text-slate-400">{u.email} • {u.country}</div>
                      </td>
                      <td className="p-3.5">
                        <select
                          value={u.role}
                          onChange={(e) => handleChangeUserRole(u.id, e.target.value as UserRole)}
                          className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-purple-300 focus:outline-none focus:border-purple-500"
                        >
                          <option value="Guest">Guest</option>
                          <option value="Free User">Free User</option>
                          <option value="Student">Student</option>
                          <option value="Professional">Professional</option>
                          <option value="Researcher">Researcher</option>
                          <option value="Instructor">Instructor</option>
                          <option value="Company User">Company User</option>
                          <option value="University Admin">University Admin</option>
                          <option value="Enterprise Admin">Enterprise Admin</option>
                          <option value="Super Admin">Super Admin</option>
                        </select>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-md bg-sky-950 text-sky-400 border border-sky-500/30 text-[10px] font-bold uppercase">
                          {u.plan}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {u.is2FA ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-medium">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            2FA Enabled
                          </span>
                        ) : (
                          <span className="text-slate-500">2FA Disabled</span>
                        )}
                      </td>
                      <td className="p-3.5 font-mono text-slate-300 font-bold">
                        {u.tokensUsed.toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          u.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleToggleUserBan(u.id)}
                          className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition ${
                            u.status === 'active'
                              ? 'bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-400'
                              : 'bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-400'
                          }`}
                        >
                          {u.status === 'active' ? 'Suspend' : 'Unsuspend'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SAAS SUBSCRIPTIONS & MRR */}
      {activeAdminTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Plan Distribution Pie Chart */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">Subscriber Tier Distribution</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={tierPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {tierPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Retention & MRR Metrics */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white">SaaS Renewal & Health Indicators</h3>
              
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-white font-bold block">Annual vs Monthly Ratio</span>
                  <span className="text-slate-400 text-[11px]">68% on Annual Discount Plan</span>
                </div>
                <span className="text-emerald-400 font-bold font-mono">68% / 32%</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-white font-bold block">14-Day Free Trial Conversion</span>
                  <span className="text-slate-400 text-[11px]">Lead to Paid subscriber conversion</span>
                </div>
                <span className="text-sky-400 font-bold font-mono">41.8%</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-white font-bold block">Net Revenue Retention (NRR)</span>
                  <span className="text-slate-400 text-[11px]">Expansion from seat & token top-ups</span>
                </div>
                <span className="text-purple-400 font-bold font-mono">118.4%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AI TOKEN CONSUMPTION & MODELS */}
      {activeAdminTab === 'ai_monitoring' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">24-Hour AI Model Query Load</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aiVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem' }} />
                  <Legend />
                  <Bar dataKey="geminiFlash" name="Gemini 3.6 Flash" fill="#38bdf8" stackId="a" />
                  <Bar dataKey="gpt4o" name="GPT-4o Maritime" fill="#34d399" stackId="a" />
                  <Bar dataKey="claudeSonnet" name="Claude 3.5 Sonnet" fill="#f59e0b" stackId="a" />
                  <Bar dataKey="deepseekR1" name="DeepSeek R1 Math" fill="#a855f7" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PAYMENT LEDGER & REFUNDS */}
      {activeAdminTab === 'payments' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Live Transaction Ledger</h4>
                <p className="text-xs text-slate-400">Processed across Stripe, PayPal, SSLCommerz, bKash & Nagad.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3.5">Transaction ID</th>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Gateway</th>
                    <th className="p-3.5">Coupon</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/50 transition">
                      <td className="p-3.5 font-mono font-bold text-sky-400">{tx.transactionId}</td>
                      <td className="p-3.5 text-slate-400">{tx.timestamp}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-white">{tx.customerName}</div>
                        <div className="text-[11px] text-slate-400">{tx.customerEmail}</div>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-white">${tx.amountUSD}</td>
                      <td className="p-3.5 uppercase font-medium">{tx.gateway}</td>
                      <td className="p-3.5">
                        {tx.couponApplied ? (
                          <span className="bg-purple-950 text-purple-400 px-1.5 py-0.5 rounded text-[10px] font-mono">
                            {tx.couponApplied}
                          </span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          tx.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        {tx.status === 'completed' && (
                          <button
                            onClick={() => handleIssueRefund(tx.id)}
                            className="px-2.5 py-1 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-300 font-semibold text-[11px] rounded-lg transition"
                          >
                            Refund
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PRICING PLANS & COUPON ENGINE */}
      {activeAdminTab === 'coupons' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white">Promotional Coupon Management</h3>
              <p className="text-xs text-slate-400">Generate discount codes for universities, conferences, and partners.</p>
            </div>
            <button
              onClick={() => setShowAddCoupon(!showAddCoupon)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Coupon</span>
            </button>
          </div>

          {showAddCoupon && (
            <form onSubmit={handleCreateCoupon} className="bg-slate-900 border border-purple-500/40 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-white">Create New Promotional Code</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    placeholder="e.g. SNAME2026"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white uppercase focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Discount Percentage (%)</label>
                  <input
                    type="number"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    min={5}
                    max={100}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Campaign Description</label>
                  <input
                    type="text"
                    value={newCouponDesc}
                    onChange={(e) => setNewCouponDesc(e.target.value)}
                    placeholder="e.g. SNAME Annual Conference Special"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCoupon(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold"
                >
                  Publish Coupon
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {coupons.map((c, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-purple-400">{c.code}</span>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                      {c.discountPercent}% OFF
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{c.description}</p>
                  <span className="text-[10px] text-slate-500 block">
                    Redemptions: {c.usageCount} / {c.maxUsage} • Expires: {c.expiresAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: SECURITY & AUDIT LOGS */}
      {activeAdminTab === 'security_audit' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">System & Security Audit Trail</h4>
                <p className="text-xs text-slate-400">Real-time log of administrative actions, rate limiting, and database backups.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-800 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-800/40 transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        log.status === 'success' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`} />
                      <span className="font-mono font-bold text-white">{log.action}</span>
                      <span className="text-slate-500 font-mono text-[10px]">[{log.resource}]</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">{log.details}</p>
                  </div>
                  <div className="text-right sm:shrink-0 text-[10px] font-mono text-slate-400">
                    <div>{log.actorEmail} ({log.actorRole})</div>
                    <div>IP: {log.ipAddress} • {log.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
