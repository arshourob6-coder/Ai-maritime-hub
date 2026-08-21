import React, { useState, useEffect } from 'react';
import { PlanType } from '../types';
import {
  User,
  Lock,
  Mail,
  Smartphone,
  Globe,
  Building,
  GraduationCap,
  ShieldCheck,
  Key,
  QrCode,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  CreditCard,
  DollarSign,
  Share2,
  Copy,
  Check,
  Zap,
  Briefcase,
  Layers,
  Award,
  BookOpen,
  LogOut,
  RefreshCw,
  Cpu,
  FileText,
  Users,
  Settings,
  ShieldAlert,
  ArrowRight,
  Eye,
  EyeOff,
  ChevronRight,
  PhoneCall,
  Fingerprint,
  HardDrive
} from 'lucide-react';

export type UserRole =
  | 'Guest'
  | 'Student'
  | 'Researcher'
  | 'Professor'
  | 'Engineer'
  | 'Consultant'
  | 'Company'
  | 'Shipyard'
  | 'University'
  | 'Enterprise'
  | 'Administrator'
  | 'Super Administrator';

export interface UserAuthData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  country: string;
  university: string;
  company: string;
  department: string;
  profession: string;
  studentId?: string;
  role: UserRole;
  plan: PlanType;
  avatarUrl: string;
  coverPhotoUrl: string;
  bio: string;
  skills: string[];
  researchInterests: string[];
  isTwoFactorEnabled: boolean;
  isEmailVerified: boolean;
  isUniversityVerified: boolean;
  referralCode: string;
  referralEarningsUSD: number;
  activeSessionsCount: number;
  joinedDate: string;
}

interface AuthSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPlan: PlanType;
  onUpdatePlan: (plan: PlanType) => void;
  isDarkMode?: boolean;
  gateMessage?: string | null;
  initialTab?: 'login' | 'signup' | 'forgot' | 'profile' | 'security_2fa' | 'subscription' | 'referral' | 'admin_panel' | 'database_schema';
  onLoginSuccess?: (userData: UserAuthData) => void;
  onLogoutSuccess?: () => void;
  isLoggedIn?: boolean;
}

export const AuthSystemModal: React.FC<AuthSystemModalProps> = ({
  isOpen,
  onClose,
  userPlan,
  onUpdatePlan,
  isDarkMode = true,
  gateMessage,
  initialTab = 'login',
  onLoginSuccess,
  onLogoutSuccess,
  isLoggedIn: externalIsLoggedIn,
}) => {
  // Navigation tab within Auth Modal
  const [activeTab, setActiveTab] = useState<
    'login' | 'signup' | 'forgot' | 'profile' | 'security_2fa' | 'subscription' | 'referral' | 'admin_panel' | 'database_schema'
  >(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Authentication State
  const [isLoggedInState, setIsLoggedInState] = useState<boolean>(() => {
    return localStorage.getItem('mh_logged_in') === 'true';
  });

  const isLoggedIn = externalIsLoggedIn !== undefined ? externalIsLoggedIn : isLoggedInState;

  const [currentUser, setCurrentUser] = useState<UserAuthData>(() => {
    const saved = localStorage.getItem('mh_user_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      id: 'usr_882910',
      firstName: 'Capt. Alex',
      lastName: 'Vane',
      username: 'alex_vane_naval',
      email: 'alex.vane@maritimehub.ai',
      phone: '+1 (555) 234-8900',
      country: 'Norway',
      university: 'NTNU Trondheim Department of Marine Technology',
      company: 'DNV Maritime Advisory',
      department: 'Hydrodynamics & Scantlings',
      profession: 'Senior Naval Architect',
      studentId: 'NTNU-2024-88',
      role: 'Engineer',
      plan: userPlan || 'professional',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
      bio: 'Specializing in hull form optimization, Holtrop-Mennen wave resistance reduction, and SOLAS 2026 stability compliance.',
      skills: ['Hull Design', 'Holtrop Resistance', 'CFD Meshing', 'MARPOL CII', 'Scantling Calculations'],
      researchInterests: ['Green Methanol Propulsion', 'Autonomous RoRo Stability', 'Subsea Cable Dynamics'],
      isTwoFactorEnabled: true,
      isEmailVerified: true,
      isUniversityVerified: true,
      referralCode: 'MH-ALEX88',
      referralEarningsUSD: 420.50,
      activeSessionsCount: 3,
      joinedDate: 'Jan 2025'
    };
  });

  // Form Fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Fields
  const [signUpFirstName, setSignUpFirstName] = useState('');
  const [signUpLastName, setSignUpLastName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpCountry, setSignUpCountry] = useState('United States');
  const [signUpUniversity, setSignUpUniversity] = useState('');
  const [signUpCompany, setSignUpCompany] = useState('');
  const [signUpProfession, setSignUpProfession] = useState('Naval Architect');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpReferralCode, setSignUpReferralCode] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Magic Link / OTP / QR
  const [loginMethod, setLoginMethod] = useState<'standard' | 'magic_link' | 'otp' | 'qr'>('standard');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  // 2FA Verification modal
  const [requires2FA, setRequires2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  // Notifications / Feedback
  const [notificationMsg, setNotificationMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);

  // AI Profile Generator state
  const [isAiGeneratingProfile, setIsAiGeneratingProfile] = useState(false);

  // Save to LocalStorage whenever currentUser or isLoggedIn changes
  useEffect(() => {
    localStorage.setItem('mh_logged_in', isLoggedIn ? 'true' : 'false');
    localStorage.setItem('mh_user_data', JSON.stringify(currentUser));
  }, [isLoggedIn, currentUser]);

  if (!isOpen) return null;

  // Handle Password Strength
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const passStrengthScore = getPasswordStrength(signUpPassword);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setNotificationMsg({ type: 'error', text: 'Please enter your email or username.' });
      return;
    }

    if (currentUser.isTwoFactorEnabled && !requires2FA) {
      setRequires2FA(true);
      setNotificationMsg({ type: 'success', text: '2FA required! Enter the 6-digit code from Google Authenticator.' });
      return;
    }

    setIsLoggedInState(true);
    localStorage.setItem('mh_logged_in', 'true');
    localStorage.setItem('mh_user_data', JSON.stringify(currentUser));
    setRequires2FA(false);
    setActiveTab('profile');
    setNotificationMsg({ type: 'success', text: `Welcome back, ${currentUser.firstName}! Logged in successfully.` });
    if (onLoginSuccess) {
      onLoginSuccess(currentUser);
    }
  };

  // Handle Social SSO Login
  const handleSocialLogin = (provider: string) => {
    setIsLoggedInState(true);
    localStorage.setItem('mh_logged_in', 'true');
    localStorage.setItem('mh_user_data', JSON.stringify(currentUser));
    setActiveTab('profile');
    setNotificationMsg({ type: 'success', text: `Authenticated successfully via ${provider} Single Sign-On!` });
    if (onLoginSuccess) {
      onLoginSuccess(currentUser);
    }
  };

  // Handle Sign Up
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpPassword !== signUpConfirmPassword) {
      setNotificationMsg({ type: 'error', text: 'Passwords do not match!' });
      return;
    }
    if (!acceptTerms) {
      setNotificationMsg({ type: 'error', text: 'Please accept the Terms & Privacy Policy.' });
      return;
    }

    const newUser: UserAuthData = {
      id: `usr_${Date.now()}`,
      firstName: signUpFirstName || 'New',
      lastName: signUpLastName || 'Maritime Engineer',
      username: signUpUsername || signUpEmail.split('@')[0] || 'maritime_user',
      email: signUpEmail,
      phone: signUpPhone || '+1 (555) 019-2831',
      country: signUpCountry,
      university: signUpUniversity || 'World Maritime University',
      company: signUpCompany || 'Marine Technology Enterprise',
      department: 'Engineering',
      profession: signUpProfession,
      role: signUpUniversity ? 'Student' : 'Engineer',
      plan: 'free',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
      bio: `Professional ${signUpProfession} focused on sustainable shipping and digital twin hydrodynamics.`,
      skills: ['Naval Architecture', 'Ship Stability', 'MARPOL Compliance'],
      researchInterests: ['Green Fuels', 'AI Vessel Design'],
      isTwoFactorEnabled: false,
      isEmailVerified: true,
      isUniversityVerified: !!signUpUniversity,
      referralCode: `MH-${signUpFirstName.toUpperCase() || 'USER'}${Math.floor(Math.random() * 90 + 10)}`,
      referralEarningsUSD: 0,
      activeSessionsCount: 1,
      joinedDate: 'Just Now'
    };

    setCurrentUser(newUser);
    setIsLoggedInState(true);
    localStorage.setItem('mh_logged_in', 'true');
    localStorage.setItem('mh_user_data', JSON.stringify(newUser));
    setActiveTab('profile');
    setNotificationMsg({ type: 'success', text: 'Account created successfully! Welcome to AI Maritime Hub.' });
    if (onLoginSuccess) {
      onLoginSuccess(newUser);
    }
  };

  // AI Profile Skill & Bio Enhancer
  const handleAiProfileEnhance = () => {
    setIsAiGeneratingProfile(true);
    setTimeout(() => {
      setCurrentUser((prev) => ({
        ...prev,
        bio: `${prev.bio} [AI Verified Specialist]: Experienced in high-speed catamaran wave resistance, DNV Hull-3D FEM analysis, and SOLAS 2026 probabilistic damage stability.`,
        skills: Array.from(new Set([...prev.skills, 'IMO SOLAS 2026', 'OpenFOAM CFD', 'Propeller Blade FEA', 'CII Fleet Optimization'])),
        researchInterests: Array.from(new Set([...prev.researchInterests, 'Subsea Robotics', 'Autonomous Collision Avoidance'])),
      }));
      setIsAiGeneratingProfile(false);
      setNotificationMsg({ type: 'success', text: 'AI Copilot auto-enhanced your engineering profile & skills portfolio!' });
    }, 1200);
  };

  // Copy Referral Code
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://aimaritimehub.com/register?ref=${currentUser.referralCode}`);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white tracking-tight">AI Maritime Auth & Account Hub</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SSO & 2FA Active
                </span>
              </div>
              <p className="text-xs text-slate-400">Enterprise Authentication, Security, Subscriptions & AI Profile</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Auth Gateway Banner */}
        {gateMessage && (
          <div className="bg-gradient-to-r from-sky-950 via-blue-900 to-indigo-950 border-b border-sky-400/40 px-6 py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-sky-400 animate-pulse" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300 block">
                AUTHENTICATION REQUIRED GATEWAY
              </span>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                {gateMessage}
              </p>
            </div>
          </div>
        )}

        {/* Modal Navigation Bar */}
        <div className="bg-slate-950 px-6 py-2 border-b border-slate-800/80 overflow-x-auto flex items-center gap-2 text-xs font-bold scrollbar-none">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setActiveTab('login')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'login'
                    ? 'bg-sky-500 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Key className="w-4 h-4" /> Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'signup'
                    ? 'bg-sky-500 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <User className="w-4 h-4" /> Sign Up / Register
              </button>
              <button
                onClick={() => setActiveTab('forgot')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'forgot'
                    ? 'bg-sky-500 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Lock className="w-4 h-4" /> Forgot Password
              </button>
              <button
                onClick={() => setActiveTab('database_schema')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'database_schema'
                    ? 'bg-purple-500 text-white font-extrabold shadow-md'
                    : 'text-purple-400 hover:text-purple-300 hover:bg-purple-950/40 border border-purple-500/30'
                }`}
              >
                <HardDrive className="w-4 h-4" /> Database Schema
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'profile'
                    ? 'bg-sky-500 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <User className="w-4 h-4" /> User Profile & Portfolio
              </button>

              <button
                onClick={() => setActiveTab('security_2fa')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'security_2fa'
                    ? 'bg-sky-500 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security & 2FA
              </button>

              <button
                onClick={() => setActiveTab('subscription')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'subscription'
                    ? 'bg-sky-500 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-400" /> Subscription Plans
              </button>

              <button
                onClick={() => setActiveTab('referral')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'referral'
                    ? 'bg-sky-500 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Share2 className="w-4 h-4 text-purple-400" /> Referral Earnings
              </button>

              <button
                onClick={() => setActiveTab('admin_panel')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                  activeTab === 'admin_panel'
                    ? 'bg-sky-500 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Cpu className="w-4 h-4 text-red-400" /> Admin Control
              </button>

              <button
                onClick={() => {
                  setIsLoggedInState(false);
                  localStorage.removeItem('mh_logged_in');
                  localStorage.removeItem('mh_user_data');
                  setNotificationMsg({ type: 'success', text: 'You have been logged out securely.' });
                  setActiveTab('login');
                  if (onLogoutSuccess) {
                    onLogoutSuccess();
                  }
                }}
                className="ml-auto px-3 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 font-bold transition flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </>
          )}
        </div>

        {/* System Alert Notification Banner */}
        {notificationMsg && (
          <div
            className={`px-6 py-2.5 text-xs font-bold flex items-center justify-between ${
              notificationMsg.type === 'success'
                ? 'bg-emerald-950/80 text-emerald-300 border-b border-emerald-500/30'
                : 'bg-red-950/80 text-red-300 border-b border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-2">
              {notificationMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{notificationMsg.text}</span>
            </div>
            <button onClick={() => setNotificationMsg(null)} className="opacity-70 hover:opacity-100">
              ✕
            </button>
          </div>
        )}

        {/* Modal Main Content Container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* TAB 1: SIGN IN / LOGIN */}
          {activeTab === 'login' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Controls */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-xl font-black text-white">Welcome Back to AI Maritime Hub</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter your email, username, or single sign-on credentials to access your engineering projects.
                  </p>
                </div>

                {/* Login Method Picker */}
                <div className="grid grid-cols-3 gap-2 text-xs font-bold p-1 bg-slate-950 rounded-2xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('standard')}
                    className={`py-2 rounded-xl transition ${
                      loginMethod === 'standard' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('magic_link')}
                    className={`py-2 rounded-xl transition ${
                      loginMethod === 'magic_link' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Magic Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('otp')}
                    className={`py-2 rounded-xl transition ${
                      loginMethod === 'otp' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    SMS/Email OTP
                  </button>
                </div>

                {/* Standard Password Login Form */}
                {loginMethod === 'standard' && (
                  <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Email Address or Username</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="alex.vane@maritimehub.ai"
                          value={loginIdentifier}
                          onChange={(e) => setLoginIdentifier(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-slate-300 font-bold">Password</label>
                        <button
                          type="button"
                          onClick={() => setActiveTab('forgot')}
                          className="text-sky-400 hover:underline font-semibold"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-10 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {requires2FA && (
                      <div className="p-3 bg-emerald-950/40 rounded-2xl border border-emerald-500/40 space-y-2">
                        <label className="block text-emerald-300 font-bold">2FA Verification Code (Google Auth)</label>
                        <input
                          type="text"
                          placeholder="6-digit code e.g. 849201"
                          value={twoFactorCode}
                          onChange={(e) => setTwoFactorCode(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-center tracking-widest text-base focus:border-emerald-500"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-slate-400">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded bg-slate-950 border-slate-800 text-sky-500 focus:ring-0"
                        />
                        <span>Remember my session on this device</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/20 transition flex items-center justify-center gap-2"
                    >
                      <Key className="w-4 h-4" />
                      <span>{requires2FA ? 'Verify 2FA & Authenticate' : 'Sign In to Maritime Copilot'}</span>
                    </button>
                  </form>
                )}

                {/* Magic Link Login */}
                {loginMethod === 'magic_link' && (
                  <div className="space-y-4 text-xs">
                    <p className="text-slate-400">
                      We will send a passwordless, secure one-click sign-in link directly to your inbox.
                    </p>
                    <input
                      type="email"
                      placeholder="Enter registered email address..."
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                    />
                    <button
                      onClick={() => {
                        setMagicLinkSent(true);
                        setNotificationMsg({ type: 'success', text: 'Magic Link dispatched! Check your email.' });
                      }}
                      className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black"
                    >
                      Send Passwordless Magic Link
                    </button>
                    {magicLinkSent && (
                      <div className="p-3 bg-sky-950/40 border border-sky-500/30 rounded-xl text-sky-300">
                        ✓ Magic link sent to {loginIdentifier || 'your email'}. Valid for 15 minutes.
                      </div>
                    )}
                  </div>
                )}

                {/* OTP Login */}
                {loginMethod === 'otp' && (
                  <div className="space-y-4 text-xs">
                    <p className="text-slate-400">Receive a instant 6-digit passcode on your mobile phone via SMS or WhatsApp.</p>
                    <input
                      type="text"
                      placeholder="+1 (555) 234-8900"
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                    />
                    <button
                      onClick={() => {
                        setOtpSent(true);
                        setNotificationMsg({ type: 'success', text: '6-digit OTP passcode sent via SMS.' });
                      }}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
                    >
                      Send SMS OTP Passcode
                    </button>
                    {otpSent && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Enter 6-digit code..."
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-center font-mono text-base text-white"
                        />
                        <button
                          onClick={handleLoginSubmit}
                          className="w-full py-2.5 rounded-xl bg-sky-500 text-slate-950 font-black"
                        >
                          Verify OTP & Sign In
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Social Login / Enterprise SSO Buttons */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <span className="block text-[11px] text-center text-slate-500 uppercase font-extrabold tracking-wider">
                    Or Sign In With Enterprise SSO
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <button
                      onClick={() => handleSocialLogin('Google Workspace')}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-1.5"
                    >
                      <span>🌐</span> Google
                    </button>
                    <button
                      onClick={() => handleSocialLogin('Microsoft Entra ID')}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-1.5"
                    >
                      <span>🪟</span> Microsoft
                    </button>
                    <button
                      onClick={() => handleSocialLogin('GitHub OAuth')}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-1.5"
                    >
                      <span>💻</span> GitHub
                    </button>
                    <button
                      onClick={() => handleSocialLogin('LinkedIn Professional')}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-1.5"
                    >
                      <span>👔</span> LinkedIn
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <button
                      onClick={() => handleSocialLogin('University EduID Shibboleth SSO')}
                      className="p-2.5 rounded-xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 hover:border-purple-400 text-purple-200 font-bold flex items-center justify-center gap-2"
                    >
                      <GraduationCap className="w-4 h-4 text-purple-400" /> University EduID / Shibboleth
                    </button>
                    <button
                      onClick={() => handleSocialLogin('ORCID Researcher SSO')}
                      className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 hover:border-emerald-400 text-emerald-200 font-bold flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-400" /> ORCID iD for Researchers
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: QR Login & Security Perks */}
              <div className="lg:col-span-5 bg-slate-950 p-6 rounded-3xl border border-slate-800/80 space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center mx-auto text-sky-400">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Instant QR Code Companion Login</h4>
                  <p className="text-[11px] text-slate-400">
                    Scan with AI Maritime Companion iOS / Android app to log in instantly without passwords.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl max-w-[180px] mx-auto flex items-center justify-center shadow-2xl">
                  {/* Mock QR Canvas */}
                  <div className="w-32 h-32 bg-slate-950 rounded-xl flex flex-col items-center justify-center p-2 text-center text-[9px] text-sky-400 font-mono font-bold leading-none">
                    <QrCode className="w-16 h-16 text-white mb-1" />
                    <span>SCAN MH-AUTH</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>256-Bit AES & Argon2 Password Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>SOC2 Type II & GDPR Maritime Security</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Cloudflare Turnstile Zero-Bot Botnet Protection</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SIGN UP / REGISTER */}
          {activeTab === 'signup' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">Create Your AI Maritime Global Account</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Join 150,000+ Naval Architects, Marine Engineers, Classification Surveyors, and Students.
                </p>
              </div>

              <form onSubmit={handleSignUpSubmit} className="space-y-4 text-xs">
                {/* Personal Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">First Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Henrik"
                      value={signUpFirstName}
                      onChange={(e) => setSignUpFirstName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Last Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Lindqvist"
                      value={signUpLastName}
                      onChange={(e) => setSignUpLastName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Desired Username</label>
                    <input
                      type="text"
                      placeholder="e.g. henrik_naval"
                      value={signUpUsername}
                      onChange={(e) => setSignUpUsername(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="henrik@maritime.org"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+47 912 34 567"
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Country</label>
                    <select
                      value={signUpCountry}
                      onChange={(e) => setSignUpCountry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="United States">United States</option>
                      <option value="Norway">Norway</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Germany">Germany</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Japan">Japan</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>

                {/* Professional / Academic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Primary Profession / Role</label>
                    <select
                      value={signUpProfession}
                      onChange={(e) => setSignUpProfession(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="Naval Architect">Naval Architect</option>
                      <option value="Marine Engineer">Marine Engineer</option>
                      <option value="Shipyard Manager">Shipyard Manager</option>
                      <option value="Classification Surveyor">Classification Surveyor (DNV/ABS/LR)</option>
                      <option value="Port Logistics Specialist">Port Logistics Specialist</option>
                      <option value="Professor / Researcher">Professor / Researcher</option>
                      <option value="Maritime Student">Maritime Student</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">University / Institute (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. NTNU Trondheim / Chalmers / MIT"
                      value={signUpUniversity}
                      onChange={(e) => setSignUpUniversity(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. DNV Maritime / Damen Shipyards"
                      value={signUpCompany}
                      onChange={(e) => setSignUpCompany(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                {/* Password Grid with Strength Indicator */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="At least 8 characters..."
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      required
                    />
                    {/* Password Strength Meter */}
                    {signUpPassword && (
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                          <div className={`h-full flex-1 ${passStrengthScore >= 1 ? 'bg-red-500' : 'bg-transparent'}`} />
                          <div className={`h-full flex-1 ${passStrengthScore >= 2 ? 'bg-amber-500' : 'bg-transparent'}`} />
                          <div className={`h-full flex-1 ${passStrengthScore >= 3 ? 'bg-sky-500' : 'bg-transparent'}`} />
                          <div className={`h-full flex-1 ${passStrengthScore >= 4 ? 'bg-emerald-500' : 'bg-transparent'}`} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">
                          {passStrengthScore <= 1 ? 'Weak' : passStrengthScore <= 3 ? 'Medium' : 'Strong'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Re-enter password..."
                      value={signUpConfirmPassword}
                      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Referral Code (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. MH-ALEX88"
                    value={signUpReferralCode}
                    onChange={(e) => setSignUpReferralCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-800 text-sky-500"
                    />
                    <span>
                      I accept the <a href="#terms" className="text-sky-400 underline">Terms of Service</a> &{' '}
                      <a href="#privacy" className="text-sky-400 underline">Privacy Policy</a> (GDPR Compliant).
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-xl shadow-sky-500/20 transition flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Create Account & Claim Free AI Credits</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {activeTab === 'forgot' && (
            <div className="max-w-md mx-auto space-y-5 text-xs py-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-400 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Reset Account Password</h3>
              <p className="text-slate-400">
                Enter your registered email address and we will dispatch a secure tokenized password reset link.
              </p>

              <input
                type="email"
                placeholder="Enter registered email..."
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
              />

              <button
                onClick={() => {
                  setNotificationMsg({ type: 'success', text: 'Password reset link sent! Please check your inbox.' });
                  setActiveTab('login');
                }}
                className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black"
              >
                Dispatch Password Reset Email
              </button>
            </div>
          )}

          {/* TAB 4: USER PROFILE & PORTFOLIO */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* Profile Cover & Header Card */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={currentUser.coverPhotoUrl}
                  alt="Cover"
                  className="w-full h-32 sm:h-44 object-cover opacity-60"
                />
                
                <div className="p-6 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 sm:-mt-16">
                  <div className="flex items-end gap-4">
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.firstName}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-slate-900 object-cover shadow-2xl"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-white">
                          {currentUser.firstName} {currentUser.lastName}
                        </h3>
                        {currentUser.isUniversityVerified && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-sky-400" /> Verified Engineer
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-sky-400 font-bold">
                        {currentUser.profession} @ {currentUser.company}
                      </p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>📍 {currentUser.country}</span>
                        <span>•</span>
                        <span>🎓 {currentUser.university}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleAiProfileEnhance}
                      disabled={isAiGeneratingProfile}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg transition flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>{isAiGeneratingProfile ? 'Enhancing...' : 'AI Enhance Profile'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bio & Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left: Bio & Skills */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800/80 space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky-400" /> Executive Engineering Biography
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentUser.bio}</p>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800/80 space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" /> Verified Skills & Engineering Competencies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-sky-300"
                        >
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800/80 space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-400" /> Primary Research & Thesis Focus
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.researchInterests.map((r, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300"
                        >
                          🔬 {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Account Quick Stats & Plan Badge */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-5 rounded-3xl border border-sky-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Subscription</span>
                      <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {currentUser.plan} Plan
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">Account ID</span>
                        <span className="font-mono text-white font-bold">{currentUser.id}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">Role</span>
                        <span className="text-sky-300 font-bold">{currentUser.role}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800">
                        <span className="text-slate-400">2FA Protection</span>
                        <span className="text-emerald-400 font-bold">Enabled (Google Auth)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">Active Sessions</span>
                        <span className="text-white font-bold">{currentUser.activeSessionsCount} Devices</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('subscription')}
                      className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs transition"
                    >
                      Manage Subscription & Upgrades
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & 2FA */}
          {activeTab === 'security_2fa' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">Security & Multi-Factor Authentication</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage active sessions, Google Authenticator 2FA, passkeys, and JWT device revocation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 2FA Toggle Card */}
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Two-Factor Authentication (2FA)</h4>
                        <p className="text-[11px] text-slate-400">Google Authenticator or YubiKey Passkeys</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentUser((prev) => ({ ...prev, isTwoFactorEnabled: !prev.isTwoFactorEnabled }));
                        setNotificationMsg({
                          type: 'success',
                          text: `Two-Factor Authentication ${!currentUser.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}.`,
                        });
                      }}
                      className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition ${
                        currentUser.isTwoFactorEnabled
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {currentUser.isTwoFactorEnabled ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>

                  {currentUser.isTwoFactorEnabled && (
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 text-xs">
                      <span className="block font-bold text-sky-400">Scan QR Code in Google Authenticator</span>
                      <div className="w-28 h-28 bg-white p-2 rounded-xl mx-auto flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-slate-950" />
                      </div>
                      <p className="text-[10px] text-slate-400 text-center font-mono">
                        Secret Key: <span className="text-amber-300 font-bold">MH2A-9981-XK92-PL01</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Active Device Sessions Manager */}
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-sky-400" /> Active Sessions & Device Manager
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>💻 macOS Chrome (Current Session)</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-extrabold">Active Now</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">IP: 185.220.101.5 • Oslo, Norway</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-300">📱 iPhone 16 Pro (AI Maritime Companion)</div>
                        <p className="text-[10px] text-slate-400 mt-0.5">IP: 89.160.20.12 • Trondheim, Norway • 2 hours ago</p>
                      </div>
                      <button
                        onClick={() => setNotificationMsg({ type: 'success', text: 'Device session revoked.' })}
                        className="text-[10px] font-bold text-red-400 hover:underline"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setNotificationMsg({ type: 'success', text: 'Revoked all other active device tokens.' })}
                    className="w-full py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold text-xs border border-red-500/30 transition"
                  >
                    Logout From All Other Devices
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 6: SUBSCRIPTION PLANS & GATEWAYS */}
          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-black text-white">Select Enterprise Subscription Plan</h3>
                <p className="text-xs text-slate-400 max-w-xl mx-auto">
                  Unlock unlimited hydrostatics calculations, CFD simulations, AI thesis generator, and global digital library.
                </p>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Free */}
                <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Starter</span>
                    <h4 className="text-lg font-black text-white mt-1">Free Tier</h4>
                    <div className="text-2xl font-black text-sky-400 mt-2">$0 <span className="text-xs text-slate-500 font-normal">/ forever</span></div>
                    <ul className="space-y-2 text-xs text-slate-300 mt-4">
                      <li>✓ 5 AI Chat queries / day</li>
                      <li>✓ Basic Hydrostatics Calculator</li>
                      <li>✓ Public Community Access</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => onUpdatePlan('free')}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                  >
                    Current Plan
                  </button>
                </div>

                {/* Student */}
                <div className="bg-slate-950 p-5 rounded-3xl border border-emerald-500/40 space-y-4 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase">Academic</span>
                    <h4 className="text-lg font-black text-white mt-1">Student / Researcher</h4>
                    <div className="text-2xl font-black text-emerald-400 mt-2">$9 <span className="text-xs text-slate-500 font-normal">/ mo</span></div>
                    <ul className="space-y-2 text-xs text-slate-300 mt-4">
                      <li>✓ Unlimited AI Copilot Queries</li>
                      <li>✓ 150+ Maritime Engineering Calculators</li>
                      <li>✓ Digital Library & Citations</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      onUpdatePlan('student');
                      setNotificationMsg({ type: 'success', text: 'Upgraded to Student Plan!' });
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs"
                  >
                    Upgrade to Student
                  </button>
                </div>

                {/* Professional */}
                <div className="bg-gradient-to-b from-sky-950/80 to-slate-950 p-5 rounded-3xl border-2 border-sky-400 space-y-4 flex flex-col justify-between shadow-xl shadow-sky-500/10">
                  <div>
                    <span className="text-xs font-bold text-sky-400 uppercase">Most Popular</span>
                    <h4 className="text-lg font-black text-white mt-1">Professional Engineer</h4>
                    <div className="text-2xl font-black text-sky-400 mt-2">$29 <span className="text-xs text-slate-500 font-normal">/ mo</span></div>
                    <ul className="space-y-2 text-xs text-slate-300 mt-4">
                      <li>✓ All 150+ Calculators & CFD Engine</li>
                      <li>✓ DNV / SOLAS Survey Report Generator</li>
                      <li>✓ 3D Maxsurf & Ship CAD Export</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      onUpdatePlan('professional');
                      setNotificationMsg({ type: 'success', text: 'Upgraded to Professional Engineer Plan!' });
                    }}
                    className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs"
                  >
                    Upgrade to Pro
                  </button>
                </div>

                {/* Enterprise */}
                <div className="bg-slate-950 p-5 rounded-3xl border border-purple-500/40 space-y-4 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-purple-400 uppercase">Organization</span>
                    <h4 className="text-lg font-black text-white mt-1">Enterprise / Shipyard</h4>
                    <div className="text-2xl font-black text-purple-400 mt-2">$199 <span className="text-xs text-slate-500 font-normal">/ mo</span></div>
                    <ul className="space-y-2 text-xs text-slate-300 mt-4">
                      <li>✓ Multi-user Workspace & SSO</li>
                      <li>✓ Private Custom AI Models</li>
                      <li>✓ Dedicated API Keys & Support</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      onUpdatePlan('enterprise');
                      setNotificationMsg({ type: 'success', text: 'Upgraded to Enterprise Suite!' });
                    }}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs"
                  >
                    Contact Sales / Upgrade
                  </button>
                </div>
              </div>

              {/* Supported Payment Gateways Bar */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Supported Global & Regional Payment Gateways
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-300">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">💳 Stripe / Cards</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">🅿️ PayPal</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">🍎 Apple Pay</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">🌐 Google Pay</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">📱 bKash / Nagad</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">🪙 USDT / Crypto</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: REFERRAL EARNINGS */}
          {activeTab === 'referral' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">Referral Program & Affiliate Earnings</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Invite fellow maritime engineers, students, or shipyards and earn 25% recurring lifetime commission.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 p-6 rounded-3xl border border-emerald-500/40 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase">Unpaid Affiliate Commission</span>
                  <div className="text-3xl font-black text-white">${currentUser.referralEarningsUSD.toFixed(2)}</div>
                  <p className="text-[11px] text-slate-400">Available for instant payout to PayPal, Wise, or Bank Transfer.</p>
                  <button
                    onClick={() => setNotificationMsg({ type: 'success', text: 'Payout request of $' + currentUser.referralEarningsUSD + ' submitted!' })}
                    className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs"
                  >
                    Request Instant Payout
                  </button>
                </div>

                {/* Referral Link Box */}
                <div className="md:col-span-2 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-sky-400" /> Your Unique Referral Link
                  </h4>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`https://aimaritimehub.com/register?ref=${currentUser.referralCode}`}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sky-300 font-mono text-xs"
                    />
                    <button
                      onClick={handleCopyReferral}
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shrink-0 flex items-center gap-1.5"
                    >
                      {copiedReferral ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedReferral ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Share on LinkedIn, WhatsApp groups, or academic forums. Every user who signs up earns you 25% of their plan price monthly!
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 9: DATABASE SCHEMA & ARCHITECTURE */}
          {activeTab === 'database_schema' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-white">PostgreSQL & Firestore Database Schema Inspector</h3>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                    PRODUCTION SCHEMA
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Inspect the structured database schemas powering authentication, subscription tiers, project storage, and access permissions for AI Maritime Hub.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* 1. USERS TABLE */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-xs text-sky-400 font-mono">public.users</span>
                    <span className="text-[10px] text-slate-500 font-bold">11 Columns</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] font-mono">
                    <div className="flex justify-between text-slate-300"><span>id</span> <span className="text-amber-400">UUID PRIMARY KEY</span></div>
                    <div className="flex justify-between text-slate-300"><span>full_name</span> <span className="text-sky-300">VARCHAR(255)</span></div>
                    <div className="flex justify-between text-slate-300"><span>email</span> <span className="text-sky-300">VARCHAR(255) UNIQUE</span></div>
                    <div className="flex justify-between text-slate-300"><span>password_hash</span> <span className="text-purple-300">TEXT (Argon2id)</span></div>
                    <div className="flex justify-between text-slate-300"><span>country</span> <span className="text-sky-300">VARCHAR(100)</span></div>
                    <div className="flex justify-between text-slate-300"><span>user_type</span> <span className="text-emerald-300">ENUM(Student, Engineer...)</span></div>
                    <div className="flex justify-between text-slate-300"><span>profession</span> <span className="text-sky-300">VARCHAR(150)</span></div>
                    <div className="flex justify-between text-slate-300"><span>university_or_company</span> <span className="text-sky-300">VARCHAR(255)</span></div>
                    <div className="flex justify-between text-slate-300"><span>email_verified</span> <span className="text-emerald-400">BOOLEAN DEFAULT false</span></div>
                    <div className="flex justify-between text-slate-300"><span>role</span> <span className="text-amber-300">VARCHAR(50)</span></div>
                    <div className="flex justify-between text-slate-300"><span>created_at</span> <span className="text-slate-400">TIMESTAMPTZ</span></div>
                  </div>
                </div>

                {/* 2. SUBSCRIPTION TABLE */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-xs text-amber-400 font-mono">public.subscriptions</span>
                    <span className="text-[10px] text-slate-500 font-bold">9 Columns</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] font-mono">
                    <div className="flex justify-between text-slate-300"><span>id</span> <span className="text-amber-400">UUID PRIMARY KEY</span></div>
                    <div className="flex justify-between text-slate-300"><span>user_id</span> <span className="text-sky-400">UUID FK -&gt; users(id)</span></div>
                    <div className="flex justify-between text-slate-300"><span>plan_type</span> <span className="text-amber-300">ENUM(free, student, pro...)</span></div>
                    <div className="flex justify-between text-slate-300"><span>billing_cycle</span> <span className="text-sky-300">VARCHAR(20)</span></div>
                    <div className="flex justify-between text-slate-300"><span>price_paid</span> <span className="text-emerald-300">NUMERIC(10,2)</span></div>
                    <div className="flex justify-between text-slate-300"><span>status</span> <span className="text-emerald-400">VARCHAR(50)</span></div>
                    <div className="flex justify-between text-slate-300"><span>start_date</span> <span className="text-slate-400">TIMESTAMPTZ</span></div>
                    <div className="flex justify-between text-slate-300"><span>renewal_date</span> <span className="text-slate-400">TIMESTAMPTZ</span></div>
                    <div className="flex justify-between text-slate-300"><span>stripe_sub_id</span> <span className="text-purple-300">VARCHAR(255)</span></div>
                  </div>
                </div>

                {/* 3. PAYMENT TABLE */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-xs text-emerald-400 font-mono">public.payments</span>
                    <span className="text-[10px] text-slate-500 font-bold">8 Columns</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] font-mono">
                    <div className="flex justify-between text-slate-300"><span>id</span> <span className="text-amber-400">UUID PRIMARY KEY</span></div>
                    <div className="flex justify-between text-slate-300"><span>user_id</span> <span className="text-sky-400">UUID FK -&gt; users(id)</span></div>
                    <div className="flex justify-between text-slate-300"><span>amount</span> <span className="text-emerald-300">NUMERIC(10,2)</span></div>
                    <div className="flex justify-between text-slate-300"><span>currency</span> <span className="text-sky-300">VARCHAR(10)</span></div>
                    <div className="flex justify-between text-slate-300"><span>payment_method</span> <span className="text-purple-300">VARCHAR(50)</span></div>
                    <div className="flex justify-between text-slate-300"><span>transaction_status</span> <span className="text-emerald-400">VARCHAR(50)</span></div>
                    <div className="flex justify-between text-slate-300"><span>invoice_url</span> <span className="text-sky-300">TEXT</span></div>
                    <div className="flex justify-between text-slate-300"><span>created_at</span> <span className="text-slate-400">TIMESTAMPTZ</span></div>
                  </div>
                </div>

                {/* 4. ACCESS PERMISSION TABLE */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-xs text-purple-400 font-mono">public.access_permissions</span>
                    <span className="text-[10px] text-slate-500 font-bold">7 Columns</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] font-mono">
                    <div className="flex justify-between text-slate-300"><span>role</span> <span className="text-amber-400">VARCHAR(50) PK</span></div>
                    <div className="flex justify-between text-slate-300"><span>can_access_calculators</span> <span className="text-emerald-400">BOOLEAN</span></div>
                    <div className="flex justify-between text-slate-300"><span>can_access_simulators</span> <span className="text-emerald-400">BOOLEAN</span></div>
                    <div className="flex justify-between text-slate-300"><span>can_access_cad_tools</span> <span className="text-emerald-400">BOOLEAN</span></div>
                    <div className="flex justify-between text-slate-300"><span>can_export_reports</span> <span className="text-emerald-400">BOOLEAN</span></div>
                    <div className="flex justify-between text-slate-300"><span>daily_ai_token_limit</span> <span className="text-sky-300">INTEGER</span></div>
                    <div className="flex justify-between text-slate-300"><span>can_access_api</span> <span className="text-emerald-400">BOOLEAN</span></div>
                  </div>
                </div>

                {/* 5. PROJECT TABLE */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-xs text-blue-400 font-mono">public.projects</span>
                    <span className="text-[10px] text-slate-500 font-bold">7 Columns</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] font-mono">
                    <div className="flex justify-between text-slate-300"><span>id</span> <span className="text-amber-400">UUID PRIMARY KEY</span></div>
                    <div className="flex justify-between text-slate-300"><span>user_id</span> <span className="text-sky-400">UUID FK -&gt; users(id)</span></div>
                    <div className="flex justify-between text-slate-300"><span>project_name</span> <span className="text-sky-300">VARCHAR(255)</span></div>
                    <div className="flex justify-between text-slate-300"><span>module_type</span> <span className="text-amber-300">VARCHAR(100)</span></div>
                    <div className="flex justify-between text-slate-300"><span>hull_data_json</span> <span className="text-purple-300">JSONB</span></div>
                    <div className="flex justify-between text-slate-300"><span>created_at</span> <span className="text-slate-400">TIMESTAMPTZ</span></div>
                    <div className="flex justify-between text-slate-300"><span>last_modified</span> <span className="text-slate-400">TIMESTAMPTZ</span></div>
                  </div>
                </div>

                {/* 6. ACTIVITY HISTORY */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-xs text-teal-400 font-mono">public.activity_logs</span>
                    <span className="text-[10px] text-slate-500 font-bold">6 Columns</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] font-mono">
                    <div className="flex justify-between text-slate-300"><span>id</span> <span className="text-amber-400">UUID PRIMARY KEY</span></div>
                    <div className="flex justify-between text-slate-300"><span>user_id</span> <span className="text-sky-400">UUID FK -&gt; users(id)</span></div>
                    <div className="flex justify-between text-slate-300"><span>action_type</span> <span className="text-sky-300">VARCHAR(150)</span></div>
                    <div className="flex justify-between text-slate-300"><span>ip_address</span> <span className="text-purple-300">INET</span></div>
                    <div className="flex justify-between text-slate-300"><span>device_info</span> <span className="text-slate-300">TEXT</span></div>
                    <div className="flex justify-between text-slate-300"><span>timestamp</span> <span className="text-slate-400">TIMESTAMPTZ</span></div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 8: ADMIN CONTROL PANEL */}
          {activeTab === 'admin_panel' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">Administrator Command Center</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage global user registrations, university EduID approvals, security audit logs, and revenue metrics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Total Registered Users</span>
                  <div className="text-xl font-black text-white mt-1">154,290</div>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Active Monthly Subscriptions</span>
                  <div className="text-xl font-black text-emerald-400 mt-1">18,410</div>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Pending University Approvals</span>
                  <div className="text-xl font-black text-amber-400 mt-1">14 Universities</div>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Security Threats Blocked</span>
                  <div className="text-xl font-black text-sky-400 mt-1">0 Breach Incidents</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
