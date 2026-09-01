import React, { useState, useRef } from 'react';
import { PlanType, Currency } from '../../types';
import { ConversionFormatOption, DocumentJobItem, ConversionCategory } from './docTypes';
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  Layers,
  Scissors,
  Minimize2,
  RotateCw,
  Eye,
  Lock,
  Unlock,
  Code,
  FileCode,
  FileCheck,
  UploadCloud,
  CheckCircle2,
  Clock,
  Download,
  Trash2,
  RefreshCw,
  Sparkles,
  Zap,
  ShieldCheck,
  AlertCircle,
  File,
  HardDrive,
  Settings2,
  Check
} from 'lucide-react';

interface ConverterToolTabProps {
  userPlan: PlanType;
  currency: Currency;
  onOpenPricing: () => void;
  onJobCompleted: (job: DocumentJobItem) => void;
}

export const CONVERSION_FORMATS: ConversionFormatOption[] = [
  {
    id: 'pdf_to_word',
    name: 'PDF to Word',
    sourceExt: ['.pdf'],
    targetExt: '.docx',
    category: 'pdf_to_office',
    description: 'Convert PDF documents to editable Microsoft Word files with layout preservation.',
    iconName: 'FileText',
    isPopular: true,
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'pdf_to_excel',
    name: 'PDF to Excel',
    sourceExt: ['.pdf'],
    targetExt: '.xlsx',
    category: 'pdf_to_office',
    description: 'Extract tables, financial sheets, and vessel logs directly into spreadsheet columns.',
    iconName: 'FileSpreadsheet',
    isPopular: true,
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'pdf_to_ppt',
    name: 'PDF to PowerPoint',
    sourceExt: ['.pdf'],
    targetExt: '.pptx',
    category: 'pdf_to_office',
    description: 'Transform presentation slides, conference papers, and brochures into editable PPTX.',
    iconName: 'Presentation',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'word_to_pdf',
    name: 'Word to PDF',
    sourceExt: ['.docx', '.doc'],
    targetExt: '.pdf',
    category: 'office_to_pdf',
    description: 'Convert DOC/DOCX to pristine, publication-grade PDF documents with font embedding.',
    iconName: 'FileText',
    isPopular: true,
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'excel_to_pdf',
    name: 'Excel to PDF',
    sourceExt: ['.xlsx', '.xls'],
    targetExt: '.pdf',
    category: 'office_to_pdf',
    description: 'Convert hydrostatics, stability calculators, and bunker logs into clean PDF tables.',
    iconName: 'FileSpreadsheet',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'ppt_to_pdf',
    name: 'PowerPoint to PDF',
    sourceExt: ['.pptx', '.ppt'],
    targetExt: '.pdf',
    category: 'office_to_pdf',
    description: 'Export naval architecture lecture slides and company pitch decks to vector PDF.',
    iconName: 'Presentation',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'image_to_pdf',
    name: 'JPG/PNG to PDF',
    sourceExt: ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'],
    targetExt: '.pdf',
    category: 'image_pdf',
    description: 'Combine ship drawings, inspection photos, and hull certificates into a single PDF.',
    iconName: 'ImageIcon',
    isPopular: true,
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'pdf_to_image',
    name: 'PDF to JPG/PNG',
    sourceExt: ['.pdf'],
    targetExt: '.png',
    category: 'image_pdf',
    description: 'Extract every page of a PDF document as high-resolution 300 DPI PNG or JPG images.',
    iconName: 'ImageIcon',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'pdf_merge',
    name: 'PDF Merge',
    sourceExt: ['.pdf'],
    targetExt: '.pdf',
    category: 'pdf_management',
    description: 'Combine multiple class certificates, surveyor memos, and ship drawings into one PDF.',
    iconName: 'Layers',
    isPopular: true,
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'pdf_split',
    name: 'PDF Split',
    sourceExt: ['.pdf'],
    targetExt: '.pdf',
    category: 'pdf_management',
    description: 'Split large books, trim & stability books, or extract individual pages from PDFs.',
    iconName: 'Scissors',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'pdf_compress',
    name: 'PDF Compress',
    sourceExt: ['.pdf'],
    targetExt: '.pdf',
    category: 'compression',
    description: 'Reduce PDF file size up to 85% without sacrificing technical drawing readability.',
    iconName: 'Minimize2',
    isPopular: true,
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'pdf_rotate',
    name: 'PDF Rotate',
    sourceExt: ['.pdf'],
    targetExt: '.pdf',
    category: 'pdf_management',
    description: 'Rotate upside-down ship lines plans, scanned surveys 90°, 180°, or 270° permanently.',
    iconName: 'RotateCw',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'pdf_ocr',
    name: 'PDF OCR (Searchable)',
    sourceExt: ['.pdf'],
    targetExt: '.pdf',
    category: 'text_data',
    description: 'Make scanned maritime circulars, old class books, and drydock logs searchable & selectable.',
    iconName: 'Eye',
    isPro: true,
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'pdf_protect',
    name: 'PDF Password Protect',
    sourceExt: ['.pdf'],
    targetExt: '.pdf',
    category: 'pdf_management',
    description: 'Apply bank-grade AES-256 encryption with password protection to confidential naval designs.',
    iconName: 'Lock',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'pdf_unlock',
    name: 'Remove PDF Password',
    sourceExt: ['.pdf'],
    targetExt: '.pdf',
    category: 'pdf_management',
    description: 'Unlock and remove security restrictions from authorized PDF files.',
    iconName: 'Unlock',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'html_to_pdf',
    name: 'HTML to PDF',
    sourceExt: ['.html', '.htm'],
    targetExt: '.pdf',
    category: 'office_to_pdf',
    description: 'Convert live web pages, vessel reports, and HTML telemetry logs into print-ready PDF.',
    iconName: 'Code',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'txt_to_pdf',
    name: 'TXT to PDF',
    sourceExt: ['.txt', '.log'],
    targetExt: '.pdf',
    category: 'office_to_pdf',
    description: 'Format raw NMEA sentences, engine datalogs, and text files into formatted PDF documents.',
    iconName: 'FileText',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'csv_to_excel_pdf',
    name: 'CSV to Excel/PDF',
    sourceExt: ['.csv'],
    targetExt: '.xlsx',
    category: 'text_data',
    description: 'Parse comma-separated CFD mesh coordinates, sensor datasets, and voyage logs into XLSX/PDF.',
    iconName: 'FileSpreadsheet',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'markdown_to_pdf',
    name: 'Markdown to PDF',
    sourceExt: ['.md', '.markdown'],
    targetExt: '.pdf',
    category: 'office_to_pdf',
    description: 'Render LaTeX formulas, technical documentation, and GitHub maritime READMEs to styled PDF.',
    iconName: 'FileCode',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'image_compression',
    name: 'Image Compression',
    sourceExt: ['.jpg', '.jpeg', '.png', '.webp'],
    targetExt: '.webp',
    category: 'compression',
    description: 'Lossless & high-efficiency compression for marine survey photos, hull scans, and schematics.',
    iconName: 'ImageIcon',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  },
  {
    id: 'document_compression',
    name: 'Document Compression',
    sourceExt: ['.docx', '.xlsx', '.pptx', '.pdf'],
    targetExt: '.zip',
    category: 'compression',
    description: 'Compress entire engineering project dossiers into lightweight email-ready packages.',
    iconName: 'Minimize2',
    maxSizeMB: { free: 10, student: 50, professional: 100, pro_plus: 500, enterprise: 2000 }
  }
];

export const ConverterToolTab: React.FC<ConverterToolTabProps> = ({
  userPlan,
  currency,
  onOpenPricing,
  onJobCompleted
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ConversionFormatOption>(CONVERSION_FORMATS[0]);
  const [activeCategory, setActiveCategory] = useState<ConversionCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [filesQueue, setFilesQueue] = useState<File[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<'recommended' | 'extreme' | 'low'>('recommended');
  const [pdfPassword, setPdfPassword] = useState('');
  const [pdfRotation, setPdfRotation] = useState<90 | 180 | 270>(90);
  const [batchJobs, setBatchJobs] = useState<DocumentJobItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter formats
  const filteredFormats = CONVERSION_FORMATS.filter(fmt => {
    const matchesCategory = activeCategory === 'all' || fmt.category === activeCategory;
    const matchesQuery = fmt.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          fmt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fmt.sourceExt.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesSelected(Array.from(e.target.files));
    }
  };

  const handleFilesSelected = (newFiles: File[]) => {
    // Check file size limits based on userPlan
    const planLimitMB = selectedFormat.maxSizeMB[userPlan] || 10;
    const oversizedFiles = newFiles.filter(f => f.size > planLimitMB * 1024 * 1024);

    if (oversizedFiles.length > 0) {
      alert(`File "${oversizedFiles[0].name}" exceeds the ${planLimitMB} MB limit for ${userPlan.toUpperCase()} plan. Please upgrade to Pro+ for up to 500 MB.`);
    }

    setFilesQueue(prev => [...prev, ...newFiles]);
  };

  const handleRemoveQueuedFile = (index: number) => {
    setFilesQueue(prev => prev.filter((_, i) => i !== index));
  };

  const startConversion = () => {
    if (filesQueue.length === 0) return;
    setIsProcessing(true);

    const newJobs: DocumentJobItem[] = filesQueue.map(file => {
      const isWatermark = userPlan === 'free';
      const targetName = file.name.replace(/\.[^/.]+$/, "") + selectedFormat.targetExt;
      const reductionRatio = selectedFormat.id === 'pdf_compress' ? (compressionLevel === 'extreme' ? 0.25 : 0.45) : 0.85;
      const convertedSize = Math.round(file.size * reductionRatio);

      return {
        id: 'job-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        fileName: targetName,
        originalSize: file.size,
        convertedSize: convertedSize,
        sourceFormat: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        targetFormat: selectedFormat.targetExt.replace('.', '').toUpperCase(),
        status: 'uploading',
        progress: 15,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        downloadUrl: '#',
        autoDeleteInHours: 24,
        watermarked: isWatermark,
        categoryTag: selectedFormat.name
      };
    });

    setBatchJobs(prev => [...newJobs, ...prev]);
    setFilesQueue([]);

    // Simulate multi-stage conversion pipeline with realistic timers
    newJobs.forEach((job) => {
      setTimeout(() => {
        setBatchJobs(current => current.map(j => j.id === job.id ? { ...j, status: 'processing', progress: 55 } : j));
      }, 700);

      setTimeout(() => {
        setBatchJobs(current => current.map(j => j.id === job.id ? { ...j, status: 'ocr_scanning', progress: 85 } : j));
      }, 1400);

      setTimeout(() => {
        const completedJob: DocumentJobItem = {
          ...job,
          status: 'completed',
          progress: 100,
          downloadUrl: `data:application/octet-stream;charset=utf-8,${encodeURIComponent('AI Maritime Hub Converted Document: ' + job.fileName)}`
        };
        setBatchJobs(current => current.map(j => j.id === job.id ? completedJob : j));
        onJobCompleted(completedJob);
        setIsProcessing(false);
      }, 2200);
    });
  };

  const getFormatIcon = (id: string) => {
    switch (id) {
      case 'pdf_to_excel':
      case 'excel_to_pdf':
      case 'csv_to_excel_pdf':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      case 'pdf_to_ppt':
      case 'ppt_to_pdf':
        return <Presentation className="w-5 h-5 text-amber-400" />;
      case 'image_to_pdf':
      case 'pdf_to_image':
      case 'image_compression':
        return <ImageIcon className="w-5 h-5 text-sky-400" />;
      case 'pdf_merge':
        return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'pdf_split':
        return <Scissors className="w-5 h-5 text-rose-400" />;
      case 'pdf_compress':
      case 'document_compression':
        return <Minimize2 className="w-5 h-5 text-cyan-400" />;
      case 'pdf_rotate':
        return <RotateCw className="w-5 h-5 text-teal-400" />;
      case 'pdf_ocr':
        return <Eye className="w-5 h-5 text-purple-400" />;
      case 'pdf_protect':
        return <Lock className="w-5 h-5 text-blue-400" />;
      case 'pdf_unlock':
        return <Unlock className="w-5 h-5 text-lime-400" />;
      default:
        return <FileText className="w-5 h-5 text-sky-400" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Limits Reminder */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl text-cyan-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Universal Document Converter</h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {userPlan} Tier
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Convert 20+ maritime formats, CAD PDFs, ship certificates, and spreadsheets with high fidelity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 block">Max file size</span>
            <span className="text-xs font-mono font-bold text-white">
              {selectedFormat.maxSizeMB[userPlan] || 10} MB / file
            </span>
          </div>
          {userPlan === 'free' && (
            <button
              onClick={onOpenPricing}
              className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlock 500 MB (Pro+)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Drag & Drop Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload & Configuration (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center min-h-[260px] cursor-pointer ${
              dragActive
                ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
                : 'border-slate-700/80 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-600'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileInputChange}
            />
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-cyan-400 mb-3 shadow-inner">
              <UploadCloud className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">
              Drag & Drop files here, or <span className="text-cyan-400 hover:underline">browse</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-md mb-3">
              Selected tool: <strong className="text-slate-200">{selectedFormat.name}</strong> ({selectedFormat.sourceExt.join(', ')} → {selectedFormat.targetExt})
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> AES-256 Encrypted
              </span>
              <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Auto-deleted after 24h
              </span>
              <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                <HardDrive className="w-3.5 h-3.5 text-sky-400" /> Max {selectedFormat.maxSizeMB[userPlan]} MB
              </span>
            </div>
          </div>

          {/* Queued Files List & Action Controls */}
          {filesQueue.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <File className="w-4 h-4 text-cyan-400" />
                  Files to Convert ({filesQueue.length})
                </span>
                <button
                  onClick={() => setFilesQueue([])}
                  className="text-[11px] text-rose-400 hover:underline"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {filesQueue.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-slate-800/70 border border-slate-700/60 rounded-xl text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate max-w-[70%]">
                      <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-white truncate font-medium">{file.name}</span>
                      <span className="text-slate-400 text-[10px] font-mono">({formatFileSize(file.size)})</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveQueuedFile(idx);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Specific Tool Settings */}
              {selectedFormat.id === 'pdf_compress' && (
                <div className="pt-2 border-t border-slate-800">
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">Compression Level:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'low', label: 'Low (90% Quality)' },
                      { id: 'recommended', label: 'Recommended (Balanced)' },
                      { id: 'extreme', label: 'Extreme (Max Savings)' }
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        onClick={() => setCompressionLevel(lvl.id as any)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                          compressionLevel === lvl.id
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedFormat.id === 'pdf_protect' && (
                <div className="pt-2 border-t border-slate-800">
                  <label className="text-xs text-slate-300 font-medium block mb-1">Set Password (AES-256):</label>
                  <input
                    type="password"
                    placeholder="Enter document password"
                    value={pdfPassword}
                    onChange={(e) => setPdfPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              {selectedFormat.id === 'pdf_rotate' && (
                <div className="pt-2 border-t border-slate-800">
                  <label className="text-xs text-slate-300 font-medium block mb-1.5">Rotation Angle:</label>
                  <div className="flex gap-2">
                    {[90, 180, 270].map((deg) => (
                      <button
                        key={deg}
                        onClick={() => setPdfRotation(deg as any)}
                        className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${
                          pdfRotation === deg
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        Rotate {deg}°
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Start Conversion Button */}
              <button
                onClick={startConversion}
                disabled={isProcessing}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing {filesQueue.length} Document(s)...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Convert Now to {selectedFormat.targetExt.toUpperCase()}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Format Selector Grid & Active Processing (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Choose Tool</h3>
              <span className="text-[11px] text-cyan-400 font-mono">{filteredFormats.length} Available</span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
              {[
                { id: 'all', label: 'All (20+)' },
                { id: 'pdf_to_office', label: 'PDF to Office' },
                { id: 'office_to_pdf', label: 'Office to PDF' },
                { id: 'image_pdf', label: 'Image ↔ PDF' },
                { id: 'pdf_management', label: 'PDF Tools' },
                { id: 'compression', label: 'Compress' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Formats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredFormats.map((fmt) => {
                const isSelected = selectedFormat.id === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-800/50 border-slate-750 hover:bg-slate-800 hover:border-slate-600 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="p-1.5 bg-slate-900/80 rounded-lg border border-slate-700/50 mb-1.5">
                        {getFormatIcon(fmt.id)}
                      </div>
                      {fmt.isPopular && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          HOT
                        </span>
                      )}
                      {fmt.isPro && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          PRO
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-bold block">{fmt.name}</span>
                      <span className="text-[10px] text-slate-400 block line-clamp-1 mt-0.5">
                        {fmt.sourceExt[0]} → {fmt.targetExt}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Batch Processing & Converted Files Card */}
      {batchJobs.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Active Conversions ({batchJobs.length})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Download your processed documents immediately. Files are cached locally and purged after 24h.
              </p>
            </div>
            <button
              onClick={() => {
                // Batch download trigger simulation
                alert(`Preparing batch ZIP download for ${batchJobs.length} documents.`);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download All (ZIP)</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {batchJobs.map((job) => (
              <div
                key={job.id}
                className="p-3 bg-slate-800/60 border border-slate-750 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 truncate max-w-md">
                  <div className="p-2 bg-slate-900 rounded-lg text-cyan-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white truncate">{job.fileName}</span>
                      {job.watermarked && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Watermarked
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
                      <span>{formatFileSize(job.originalSize)}</span>
                      {job.convertedSize && (
                        <>
                          <span>→</span>
                          <span className="text-emerald-400 font-semibold">{formatFileSize(job.convertedSize)}</span>
                          <span className="text-slate-500">
                            (-{Math.round((1 - job.convertedSize / job.originalSize) * 100)}%)
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {job.status === 'completed' ? (
                    <a
                      href={job.downloadUrl}
                      download={job.fileName}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-cyan-400 font-mono">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>{job.status === 'uploading' ? 'Uploading...' : job.status === 'ocr_scanning' ? 'OCR Engine...' : 'Converting...'} ({job.progress}%)</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
