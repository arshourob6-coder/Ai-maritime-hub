import React, { useState } from 'react';
import { StatutoryCertificateItem } from './regTypes';
import {
  Award,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Shield,
  Layers,
  ChevronRight,
  Filter,
  Plus
} from 'lucide-react';

const INITIAL_CERTIFICATES: StatutoryCertificateItem[] = [
  {
    id: 'cert-1',
    certificateName: 'Cargo Ship Safety Construction Certificate (SAFCON)',
    convention: 'SOLAS 1974 Reg. I/12',
    issuingAuthority: 'Recognized Organization (Class DNV) on behalf of Flag',
    issueDate: '2022-04-10',
    expiryDate: '2027-04-09',
    annualSurveyWindow: 'January 10 to July 10 each year',
    surveyCycle: 'HSSC 5-Year Harmonized Cycle',
    status: 'Valid'
  },
  {
    id: 'cert-2',
    certificateName: 'Cargo Ship Safety Equipment Certificate (Form E)',
    convention: 'SOLAS 1974 Reg. I/12',
    issuingAuthority: 'Recognized Organization (Class DNV)',
    issueDate: '2022-04-10',
    expiryDate: '2027-04-09',
    annualSurveyWindow: 'January 10 to July 10 each year',
    surveyCycle: 'HSSC 5-Year Harmonized Cycle',
    status: 'Valid'
  },
  {
    id: 'cert-3',
    certificateName: 'Cargo Ship Safety Radio Certificate (Form R)',
    convention: 'SOLAS 1974 Reg. I/12',
    issuingAuthority: 'Recognized Organization (Class DNV)',
    issueDate: '2022-04-10',
    expiryDate: '2027-04-09',
    annualSurveyWindow: 'January 10 to July 10 each year',
    surveyCycle: 'HSSC 5-Year Harmonized Cycle',
    status: 'Valid'
  },
  {
    id: 'cert-4',
    certificateName: 'International Load Line Certificate (ILLC)',
    convention: 'Load Line Convention 1966/88',
    issuingAuthority: 'Recognized Organization (Class DNV)',
    issueDate: '2022-04-10',
    expiryDate: '2027-04-09',
    annualSurveyWindow: 'January 10 to July 10 each year',
    surveyCycle: 'HSSC 5-Year Harmonized Cycle',
    status: 'Valid'
  },
  {
    id: 'cert-5',
    certificateName: 'International Oil Pollution Prevention Certificate (IOPP Form A)',
    convention: 'MARPOL Annex I Reg. 7',
    issuingAuthority: 'Recognized Organization (Class DNV)',
    issueDate: '2022-04-10',
    expiryDate: '2027-04-09',
    annualSurveyWindow: 'January 10 to July 10 each year',
    surveyCycle: 'HSSC 5-Year Harmonized Cycle',
    status: 'Valid'
  },
  {
    id: 'cert-6',
    certificateName: 'International Air Pollution Prevention Certificate (IAPP)',
    convention: 'MARPOL Annex VI Reg. 6',
    issuingAuthority: 'Recognized Organization (Class DNV)',
    issueDate: '2022-04-10',
    expiryDate: '2027-04-09',
    annualSurveyWindow: 'January 10 to July 10 each year',
    surveyCycle: 'HSSC 5-Year Harmonized Cycle',
    status: 'Valid'
  },
  {
    id: 'cert-7',
    certificateName: 'Safety Management Certificate (SMC)',
    convention: 'ISM Code / SOLAS IX',
    issuingAuthority: 'Flag State Administration / RO',
    issueDate: '2023-08-15',
    expiryDate: '2028-08-14',
    annualSurveyWindow: 'Intermediate Audit between 2nd & 3rd Anniversary',
    surveyCycle: '5-Year Cycle (Intermediate Audit Required)',
    status: 'Valid'
  },
  {
    id: 'cert-8',
    certificateName: 'International Ship Security Certificate (ISSC)',
    convention: 'ISPS Code / SOLAS XI-2',
    issuingAuthority: 'Flag State Administration / RSO',
    issueDate: '2023-08-15',
    expiryDate: '2028-08-14',
    annualSurveyWindow: 'Intermediate Verification between 2nd & 3rd Anniversary',
    surveyCycle: '5-Year Cycle (Intermediate Verification Required)',
    status: 'Valid'
  },
  {
    id: 'cert-9',
    certificateName: 'Maritime Labour Certificate (MLC 2006)',
    convention: 'MLC 2006 Title 5 Reg. 5.1.3',
    issuingAuthority: 'Flag State Administration / RO',
    issueDate: '2023-08-15',
    expiryDate: '2028-08-14',
    annualSurveyWindow: 'Intermediate Inspection between 2nd & 3rd Anniversary',
    surveyCycle: '5-Year Cycle + DMLC Part I & Part II',
    status: 'Valid'
  }
];

export const CertificatesTrackerTab: React.FC = () => {
  const [certificates] = useState<StatutoryCertificateItem[]>(INITIAL_CERTIFICATES);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCerts = certificates.filter((c) =>
    c.certificateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.convention.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Statutory Certificate Registry
            </span>
            <span className="text-xs text-slate-400">Harmonized System of Survey & Certification (HSSC)</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Vessel Statutory & Class Certificates Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor 5-year survey cycles, annual endorsement windows (±3 months), intermediate verifications, and renewal dates.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search certificates..."
            className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-64"
          />
        </div>
      </div>

      {/* HSSC Architecture Explanation Card */}
      <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" /> IMO HSSC Harmonized Survey Framework
          </h3>
          <p className="text-xs text-slate-400">
            SOLAS, MARPOL, and Load Line certificates are synchronized to a shared 5-year expiry date. Annual surveys must be completed within ±3 months of the anniversary date to prevent certificate invalidation.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 shrink-0">
          Anniversary Date: 10 April (Annual ±3mo Window)
        </div>
      </div>

      {/* Certificate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-800 font-mono">
                  {cert.convention}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {cert.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white leading-snug">{cert.certificateName}</h4>

              <div className="text-xs text-slate-400 space-y-1">
                <div><strong>Issuer:</strong> {cert.issuingAuthority}</div>
                <div><strong>Survey Regime:</strong> {cert.surveyCycle}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Valid Until:</span>
                <strong className="text-emerald-400 font-mono">{cert.expiryDate}</strong>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Annual Survey Window</span>
                <span className="text-slate-200">{cert.annualSurveyWindow}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
