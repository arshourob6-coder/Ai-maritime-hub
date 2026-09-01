import { PlanType, Currency } from '../../types';

export type DocHubTab = 
  | 'convert'
  | 'ai_tools'
  | 'pdf_tools'
  | 'ocr'
  | 'research'
  | 'history'
  | 'pricing'
  | 'admin';

export type ConversionCategory = 
  | 'all'
  | 'pdf_to_office'
  | 'office_to_pdf'
  | 'image_pdf'
  | 'pdf_management'
  | 'text_data'
  | 'compression';

export interface ConversionFormatOption {
  id: string;
  name: string;
  sourceExt: string[];
  targetExt: string;
  category: ConversionCategory;
  description: string;
  iconName: string;
  isPopular?: boolean;
  isPro?: boolean;
  maxSizeMB: {
    free: number;
    student: number;
    professional: number;
    pro_plus: number;
    enterprise: number;
  };
}

export interface DocumentJobItem {
  id: string;
  fileName: string;
  originalSize: number; // in bytes
  convertedSize?: number;
  sourceFormat: string;
  targetFormat: string;
  status: 'queued' | 'uploading' | 'processing' | 'ocr_scanning' | 'completed' | 'failed';
  progress: number;
  timestamp: string;
  downloadUrl?: string;
  previewSnippet?: string;
  extractedTablesCount?: number;
  ocrConfidence?: number;
  autoDeleteInHours: number;
  watermarked?: boolean;
  categoryTag?: string;
}

export interface PricingPlanDetail {
  id: PlanType;
  name: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  priceMonthlyBDT: number;
  priceAnnualBDT: number; // ~20% off
  priceMonthlyUSD: number;
  priceAnnualUSD: number; // ~20% off
  conversionsPerMonth: string;
  maxFileSizeMB: number;
  features: string[];
  restrictedFeatures?: string[];
  ctaLabel: string;
  buttonVariant: 'outline' | 'primary' | 'pro' | 'enterprise';
}

export interface DocHubStats {
  totalConversionsAllTime: number;
  activeToday: number;
  successRate: number;
  totalStorageSavedGB: number;
  monthlyRevenueBDT: number;
  monthlyRevenueUSD: number;
  activeSubscribers: number;
  bKashNagadTransactions: number;
  stripeTransactions: number;
}
