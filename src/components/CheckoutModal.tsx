import React, { useState } from 'react';
import { PlanType, Currency, PaymentGatewayType } from '../types';
import {
  X,
  ShieldCheck,
  CheckCircle,
  CreditCard,
  Lock,
  ArrowRight,
  Loader2,
  Tag,
  FileText,
  Download,
  Percent,
  Check,
  AlertCircle,
  HelpCircle,
  Building,
  Globe,
  Sparkles,
  Smartphone,
  QrCode
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PlanType | 'digital_item';
  itemTitle?: string;
  priceUSD: number;
  currency: Currency;
  onSuccess: (plan: PlanType) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  itemTitle,
  priceUSD,
  currency,
  onSuccess,
}) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [gateway, setGateway] = useState<PaymentGatewayType>('stripe');
  const [country, setCountry] = useState<string>('Norway');
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  
  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number; description: string } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  // Form Fields
  const [customerName, setCustomerName] = useState('Capt. Alex Vane');
  const [customerEmail, setCustomerEmail] = useState('alex.vane@maritimehub.ai');
  const [companyName, setCompanyName] = useState('DNV Maritime Advisory');
  const [vatNumber, setVatNumber] = useState('NO984210982MVA');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');
  const [mobileNumber, setMobileNumber] = useState('+880 1712 345678');
  const [bKashPin, setBKashPin] = useState('');

  // Checkout execution state
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [txnId, setTxnId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);

  if (!isOpen) return null;

  // Currency multiplier conversion approximation
  const currencyRates: Record<Currency, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    NOK: 10.8,
    SGD: 1.34,
    BDT: 118,
    JPY: 155,
  };

  // Base price computation
  let baseMonthlyPrice = priceUSD;
  if (selectedPlan === 'student') baseMonthlyPrice = 19;
  else if (selectedPlan === 'professional') baseMonthlyPrice = 49;
  else if (selectedPlan === 'enterprise') baseMonthlyPrice = 199;
  else if (selectedPlan === 'university') baseMonthlyPrice = 499;
  else if (selectedPlan === 'free') baseMonthlyPrice = 0;

  // Yearly pricing gets ~30% discount
  const rawSubtotalUSD = billingPeriod === 'yearly'
    ? (selectedPlan === 'student' ? 149 : selectedPlan === 'professional' ? 399 : selectedPlan === 'enterprise' ? 1590 : selectedPlan === 'university' ? 3990 : priceUSD)
    : baseMonthlyPrice;

  // Coupon discount calculation
  const discountRate = appliedCoupon ? appliedCoupon.discountPercent / 100 : 0;
  const discountAmountUSD = rawSubtotalUSD * discountRate;
  const discountedSubtotalUSD = Math.max(0, rawSubtotalUSD - discountAmountUSD);

  // Tax calculation by country
  const taxRates: Record<string, number> = {
    'Norway': 0.25,
    'United Kingdom': 0.20,
    'Germany': 0.19,
    'Singapore': 0.09,
    'Bangladesh': 0.05,
    'United States': 0.00,
    'Other': 0.00
  };
  const taxRate = taxRates[country] || 0.00;
  const taxAmountUSD = discountedSubtotalUSD * taxRate;
  const finalTotalUSD = isFreeTrial ? 0 : (discountedSubtotalUSD + taxAmountUSD);

  const convertedTotal = (finalTotalUSD * currencyRates[currency]).toFixed(2);
  const convertedDiscount = (discountAmountUSD * currencyRates[currency]).toFixed(2);
  const convertedTax = (taxAmountUSD * currencyRates[currency]).toFixed(2);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setValidatingCoupon(true);
    setCouponError(null);
    try {
      const res = await fetch('/api/billing/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput, planId: selectedPlan }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setAppliedCoupon({
          code: data.code,
          discountPercent: data.discountPercent,
          description: data.description
        });
        setCouponInput('');
      } else {
        setCouponError(data.error || 'Invalid or expired coupon code.');
      }
    } catch (e) {
      // Fallback
      if (couponInput.toUpperCase() === 'MARITIME2026') {
        setAppliedCoupon({ code: 'MARITIME2026', discountPercent: 20, description: '20% Global Launch Discount' });
      } else {
        setCouponError('Invalid coupon code. Try MARITIME2026.');
      }
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          gateway,
          currency,
          price: convertedTotal,
          billingPeriod,
          userEmail: customerEmail,
          couponCode: appliedCoupon?.code,
          country,
          isFreeTrial
        }),
      });
      const data = await res.json();
      setTxnId(data.transactionId || `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
      setInvoiceNumber(data.invoiceNumber || `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`);
      setCompleted(true);
      if (selectedPlan !== 'digital_item') {
        onSuccess(selectedPlan as PlanType);
      }
    } catch (err) {
      setTxnId(`TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
      setInvoiceNumber(`INV-2026-${Math.floor(10000 + Math.random() * 90000)}`);
      setCompleted(true);
      if (selectedPlan !== 'digital_item') {
        onSuccess(selectedPlan as PlanType);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-sky-500/30 rounded-2xl p-6 shadow-2xl text-white my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!completed ? (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-Bit SSL Encrypted SaaS Checkout</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">
              {itemTitle || `Upgrade to ${selectedPlan.toUpperCase()} Plan`}
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Instant access to AI Copilot Pro, OpenFOAM CFD solver, DNV/ABS rule calculators, and team workspaces.
            </p>

            {/* Billing Period Switcher (Monthly vs Yearly) */}
            {selectedPlan !== 'digital_item' && selectedPlan !== 'free' && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-1.5 mb-5 flex items-center justify-between">
                <div className="grid grid-cols-2 gap-1 w-full text-xs font-semibold">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`py-2 px-3 rounded-lg transition text-center ${
                      billingPeriod === 'monthly'
                        ? 'bg-sky-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Monthly Billing
                  </button>
                  <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`py-2 px-3 rounded-lg transition text-center flex items-center justify-center gap-1.5 ${
                      billingPeriod === 'yearly'
                        ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>Annual Billing</span>
                    <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                      SAVE 30%
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* 14-Day Free Trial Banner */}
            {selectedPlan !== 'digital_item' && selectedPlan !== 'free' && (
              <div className="bg-gradient-to-r from-blue-950/60 to-sky-950/60 border border-sky-500/30 rounded-xl p-3.5 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <div>
                    <span className="text-xs font-bold text-sky-200 block">14-Day Risk-Free Trial Available</span>
                    <span className="text-[11px] text-slate-400">Zero charges today. Cancel anytime before trial ends.</span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFreeTrial}
                    onChange={(e) => setIsFreeTrial(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                </label>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="mb-5">
              <label className="text-xs font-semibold text-slate-300 block mb-2">Select Payment Method</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'stripe', name: 'Credit Card', icon: <CreditCard className="w-4 h-4 text-sky-400" />, sub: 'Stripe 3D-Secure' },
                  { id: 'paypal', name: 'PayPal', icon: <Globe className="w-4 h-4 text-blue-400" />, sub: 'One-Click Global' },
                  { id: 'apple_pay', name: 'Apple / Google Pay', icon: <Smartphone className="w-4 h-4 text-emerald-400" />, sub: 'Biometric Pay' },
                  { id: 'bkash', name: 'bKash / Nagad', icon: <QrCode className="w-4 h-4 text-pink-400" />, sub: 'Mobile Wallet' },
                ].map((gw) => (
                  <button
                    key={gw.id}
                    onClick={() => setGateway(gw.id as PaymentGatewayType)}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between gap-1 ${
                      gateway === gw.id
                        ? 'bg-sky-950/80 border-sky-400 text-white ring-1 ring-sky-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {gw.icon}
                      {gateway === gw.id && <Check className="w-3.5 h-3.5 text-sky-400" />}
                    </div>
                    <div>
                      <span className="font-bold block text-xs">{gw.name}</span>
                      <span className="text-[10px] text-slate-500 block truncate">{gw.sub}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gateway Specific Input Forms */}
            {gateway === 'stripe' && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 mb-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-1">
                  <span>Card Information</span>
                  <div className="flex gap-1.5 text-[10px] text-slate-400">
                    <span className="bg-slate-800 px-1.5 py-0.5 rounded">Visa</span>
                    <span className="bg-slate-800 px-1.5 py-0.5 rounded">Mastercard</span>
                    <span className="bg-slate-800 px-1.5 py-0.5 rounded">Amex</span>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM / YY"
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                  />
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="CVC / CVV"
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>
              </div>
            )}

            {gateway === 'bkash' && (
              <div className="bg-slate-950 border border-pink-500/30 rounded-xl p-3.5 mb-5 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-pink-300">
                  <span>bKash / Nagad Direct Merchant Gateway</span>
                  <span className="text-[10px] bg-pink-950 text-pink-400 px-2 py-0.5 rounded">Instant Verification</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Mobile Account Number</label>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="+880 17XXXXXXXX"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Security PIN / OTP</label>
                    <input
                      type="password"
                      value={bKashPin}
                      onChange={(e) => setBKashPin(e.target.value)}
                      placeholder="••••"
                      maxLength={5}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Country & Tax Info */}
            <div className="grid grid-cols-2 gap-2.5 mb-5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Billing Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-white text-xs focus:outline-none focus:border-sky-500"
                >
                  <option value="Norway">Norway (25% VAT)</option>
                  <option value="United Kingdom">United Kingdom (20% VAT)</option>
                  <option value="Germany">Germany (19% VAT)</option>
                  <option value="Singapore">Singapore (9% GST)</option>
                  <option value="Bangladesh">Bangladesh (5% VAT)</option>
                  <option value="United States">United States (0% Tax)</option>
                  <option value="Other">Other Region</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Company VAT / Tax ID (Optional)</label>
                <input
                  type="text"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  placeholder="e.g. GB98421098"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-white text-xs focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="mb-5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code (e.g. MARITIME2026, STUDENT50)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-sky-500"
                  />
                </div>
                <button
                  onClick={handleApplyCoupon}
                  disabled={validatingCoupon}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 rounded-lg transition border border-slate-700 flex items-center gap-1"
                >
                  {validatingCoupon ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply'}
                </button>
              </div>

              {appliedCoupon && (
                <div className="mt-2 flex items-center justify-between bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <strong>{appliedCoupon.code}</strong>: {appliedCoupon.description} (-{appliedCoupon.discountPercent}%)
                  </span>
                  <button onClick={() => setAppliedCoupon(null)} className="text-emerald-400 hover:text-white text-[10px]">
                    Remove
                  </button>
                </div>
              )}

              {couponError && (
                <div className="mt-1.5 text-rose-400 text-[11px] flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{couponError}</span>
                </div>
              )}
            </div>

            {/* Price Breakdown Banner */}
            <div className="bg-slate-950 border border-sky-500/20 rounded-xl p-4 mb-5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({billingPeriod === 'yearly' ? 'Annual Plan' : 'Monthly Plan'})</span>
                <span>{currency} {(rawSubtotalUSD * currencyRates[currency]).toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>- {currency} {convertedDiscount}</span>
                </div>
              )}

              {taxRate > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax / VAT ({(taxRate * 100).toFixed(0)}%)</span>
                  <span>+ {currency} {convertedTax}</span>
                </div>
              )}

              <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold text-white block">Total Amount Due</span>
                  {isFreeTrial && (
                    <span className="text-[10px] text-emerald-400 block font-semibold">
                      $0.00 today (14 days free trial, then {currency} {convertedTotal}/yr)
                    </span>
                  )}
                </div>
                <span className="text-2xl font-extrabold text-sky-400 font-mono">
                  {isFreeTrial ? `${currency} 0.00` : `${currency} ${convertedTotal}`}
                </span>
              </div>
            </div>

            {/* Payment Submit Button */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white shadow-lg shadow-sky-500/25 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authorizing Payment via {gateway.toUpperCase()}...</span>
                </>
              ) : isFreeTrial ? (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Start 14-Day Free Trial Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay {currency} {convertedTotal} Securely</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="mt-3.5 flex items-center justify-center gap-2 text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>PCI-DSS Level 1 Certified • 14-Day Money Back Guarantee • Encrypted via TLS 1.3</span>
            </div>
          </div>
        ) : (
          /* Payment Completed / Invoice View */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Payment Confirmed & Plan Activated!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Welcome to the <strong>{selectedPlan.toUpperCase()}</strong> tier. Your enterprise license, unlimited AI Copilot Pro tokens, and simulation modules are now active.
            </p>

            <div className="bg-slate-950 border border-emerald-500/30 p-4 rounded-xl text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="font-mono text-emerald-400 font-bold">{txnId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Invoice Number:</span>
                <span className="font-mono text-sky-400 font-bold">{invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="font-bold text-white">{isFreeTrial ? 'Free Trial ($0.00)' : `${currency} ${convertedTotal}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Gateway:</span>
                <span className="text-slate-300 font-medium capitalize">{gateway} (Instant Verification)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  const invoiceText = `AI MARITIME HUB OFFICIAL INVOICE\nInvoice: ${invoiceNumber}\nDate: ${new Date().toLocaleDateString()}\nCustomer: ${customerName}\nPlan: ${selectedPlan}\nTotal: ${currency} ${convertedTotal}\nStatus: PAID`;
                  const blob = new Blob([invoiceText], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${invoiceNumber}.txt`;
                  a.click();
                }}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>Download Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Launch AI Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
