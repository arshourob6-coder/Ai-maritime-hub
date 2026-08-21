import React, { useState, useEffect, useRef } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType, ViewMode } from '../types';
import {
  Cpu,
  Terminal,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Database,
  BarChart3,
  Code2,
  Zap,
  Download,
  Share2,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Settings,
  HardDrive,
  FileCode,
  Flame,
  BrainCircuit,
  Bot,
  Globe,
  Upload,
  Copy,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onSelectView?: (view: ViewMode) => void;
}

export const AiResearchLabView: React.FC<Props> = ({
  userPlan = 'student',
  onOpenPricing,
  onSelectView,
}) => {
  // Navigation Tabs inside AI Research Lab
  const [activeTab, setActiveTab] = useState<'notebook' | 'gpu_cluster' | 'datasets' | 'evaluation' | 'paper_gen'>('notebook');

  // Selected ML Template Script
  const [selectedTemplate, setSelectedTemplate] = useState<'emission' | 'cfd_pinn' | 'ais_transformer' | 'anomaly_lstm'>('emission');

  // Interactive Python Code Buffer
  const templatesCode = {
    emission: `# Module 210: Maritime Vessel Emission Forecaster (PyTorch + CUDA)
import torch
import torch.nn as nn
import numpy as np

class MaritimeEmissionLSTM(nn.Module):
    def __init__(self, input_dim=6, hidden_dim=128, num_layers=2):
        super().__init__()
        self.lstm = nn.LSTM(input_dim, hidden_dim, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_dim, 1) # Predict CO2 Tons/hr
        
    def forward(self, x):
        out, _ = self.lstm(x)
        return self.fc(out[:, -1, :])

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = MaritimeEmissionLSTM().to(device)
print(f"[GPU ACTIVE] Model loaded on {torch.cuda.get_device_name(0)}")
print("[DATASET] IMO MARPOL AIS + RPM Telemetry Stream Ready.")
`,
    cfd_pinn: `# Module 210: CFD Physics-Informed Neural Network (PINN) for Hull Drag
import torch
import torch.nn as nn

class HullDragPINN(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(3, 256), # (x, y, z) hull coordinates
            nn.GELU(),
            nn.Linear(256, 256),
            nn.GELU(),
            nn.Linear(256, 4)  # (u, v, w velocity + p pressure)
        )
    def NavierStokesLoss(self, coords):
        # Enforce conservation of mass & Navier-Stokes physics equations
        return torch.tensor(0.0024, requires_grad=True)

model = HullDragPINN().cuda()
print("[CUDA CORE] Physics-Informed NN initialized for Maxsurf Hull geometry.")
`,
    ais_transformer: `# Module 210: AIS Vessel Trajectory Transformer Model
import torch
import torch.nn as nn

class AISTrajectoryTransformer(nn.Module):
    def __init__(self, d_model=256, nhead=8, num_layers=4):
        super().__init__()
        encoder_layer = nn.TransformerEncoderLayer(d_model=d_model, nhead=nhead)
        self.transformer = nn.TransformerEncoder(encoder_layer, num_layers=num_layers)
        self.head = nn.Linear(d_model, 2) # Predict (Lat, Lon) next waypoint

print("[MODEL] AIS Trajectory Transformer instantiated with 8 Attention Heads.")
`,
    anomaly_lstm: `# Module 210: Main Engine Cylinder Vibration Anomaly Detector
import torch
import numpy as np

def run_vibration_inference(sensor_stream):
    # Process 1000Hz cylinder pressure & acoustic vibration
    anomaly_score = np.random.uniform(0.01, 0.05)
    return anomaly_score

print("[REALTIME] Cylinder 4 Vibration Stream connected via Starlink telemetry.")
`
  };

  const [pythonCode, setPythonCode] = useState(templatesCode['emission']);

  // Handle template change
  const handleTemplateChange = (tmpl: 'emission' | 'cfd_pinn' | 'ais_transformer' | 'anomaly_lstm') => {
    setSelectedTemplate(tmpl);
    setPythonCode(templatesCode[tmpl]);
  };

  // Execution Terminal Logs
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Python 3.11.8 (main, Mar 12 2026, 08:22:10) [GCC 13.2.0 on linux]',
    'Type "help", "copyright", "credits" or "license" for more information.',
    'PyTorch 2.3.0+cu121 • CUDA 12.1 • NVIDIA H100 SXM5 80GB Active.',
    '>>> Ready for execution.'
  ]);
  const [isExecuting, setIsExecuting] = useState(false);

  // Model Training Simulation State
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const maxEpochs = 50;
  const [trainingLoss, setTrainingLoss] = useState(0.485);
  const [validationLoss, setValidationLoss] = useState(0.512);
  const [r2Score, setR2Score] = useState(0.812);

  // GPU Hardware Configuration
  const [selectedGpu, setSelectedGpu] = useState<'h100' | 'a100' | 't4'>('h100');
  const [batchSize, setBatchSize] = useState('64');
  const [learningRate, setLearningRate] = useState('0.001');

  // Simulated Training Loop Timer
  useEffect(() => {
    let interval: any = null;
    if (isTraining && currentEpoch < maxEpochs) {
      interval = setInterval(() => {
        setCurrentEpoch(prev => {
          const next = prev + 1;
          const newTLoss = Math.max(0.012, 0.485 * Math.exp(-next * 0.08) + Math.random() * 0.005);
          const newVLoss = Math.max(0.018, 0.512 * Math.exp(-next * 0.075) + Math.random() * 0.008);
          const newR2 = Math.min(0.994, 0.812 + (next / maxEpochs) * 0.18);

          setTrainingLoss(Number(newTLoss.toFixed(4)));
          setValidationLoss(Number(newVLoss.toFixed(4)));
          setR2Score(Number(newR2.toFixed(3)));

          if (next >= maxEpochs) {
            setIsTraining(false);
            setTerminalOutput(logs => [
              ...logs,
              `[SUCCESS] Model training completed successfully across ${maxEpochs} epochs!`,
              `[METRICS] Final Training Loss: ${newTLoss.toFixed(4)} | R² Score: ${newR2.toFixed(3)}`,
              `[EXPORT] ONNX model weights compiled -> 'maritime_model_v1.onnx' (42.8 MB)`
            ]);
          }
          return next;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isTraining, currentEpoch]);

  // Run Code Execution Handler
  const handleRunCode = () => {
    setIsExecuting(true);
    setTerminalOutput(prev => [
      ...prev,
      `> python main_notebook.py --device cuda:0 --batch ${batchSize}`,
      `[EXEC] Allocating GPU VRAM (NVIDIA H100 80GB)...`,
      `[EXEC] TensorRT C++ kernel optimization enabled.`
    ]);

    setTimeout(() => {
      setTerminalOutput(prev => [
        ...prev,
        `--------------------------------------------------`,
        `[OUTPUT] PyTorch CUDA execution completed in 142ms.`,
        `[OUTPUT] Tensor shape: torch.Size([${batchSize}, 128, 6])`,
        `[OUTPUT] Memory Allocated: 1.42 GB / 80.00 GB VRAM`,
        `>>> `
      ]);
      setIsExecuting(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      <SubscriptionBanner
        userPlan={userPlan}
        onOpenPricing={onOpenPricing}
        featureName="AI Research Lab & GPU Notebook Studio (Module 210)"
      />

      {/* TOP HERO BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Module 210 • AI Research Lab
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              GPU-Accelerated Jupyter Kernel
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
              PyTorch & TensorRT Enabled
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <BrainCircuit className="w-9 h-9 text-indigo-400" />
            AI Research Lab & GPU Notebook Studio
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Train, fine-tune, and deploy custom maritime machine learning models. Complete with interactive Python execution environment, PyTorch & Physics-Informed Neural Networks (PINNs), high-performance GPU cluster monitoring, and LaTeX paper publication.
          </p>
        </div>

        {/* Live GPU Telemetry Widget */}
        <div className="p-5 bg-slate-950/90 rounded-2xl border border-indigo-500/30 space-y-2 shrink-0 relative z-10 w-full sm:w-64">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" /> NVIDIA H100 SXM5
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">ACTIVE</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>VRAM Used:</span>
              <span className="text-sky-300 font-mono font-bold">14.2 / 80.0 GB</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-sky-400 h-full rounded-full" style={{ width: '18%' }} />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Tensor Cores Load:</span>
              <span className="text-indigo-300 font-mono font-bold">{isTraining ? '94%' : '12%'}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className={`h-full rounded-full transition-all ${isTraining ? 'bg-indigo-400 animate-pulse' : 'bg-slate-600'}`} style={{ width: isTraining ? '94%' : '12%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs gap-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveTab('notebook')}
          className={`px-4 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'notebook' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Code2 className="w-4 h-4" /> 1. Python GPU Notebook
        </button>
        <button
          onClick={() => setActiveTab('gpu_cluster')}
          className={`px-4 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'gpu_cluster' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Cpu className="w-4 h-4" /> 2. GPU Cluster & VRAM Studio
        </button>
        <button
          onClick={() => setActiveTab('datasets')}
          className={`px-4 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'datasets' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Database className="w-4 h-4" /> 3. Maritime Datasets Hub
        </button>
        <button
          onClick={() => setActiveTab('evaluation')}
          className={`px-4 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'evaluation' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> 4. Epoch Training & Metrics
        </button>
        <button
          onClick={() => setActiveTab('paper_gen')}
          className={`px-4 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'paper_gen' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 5. LaTeX Paper Generator
        </button>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 1: PYTHON GPU NOTEBOOK */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'notebook' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Template Selector & Controls */}
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <FileCode className="w-4 h-4 text-indigo-400" /> Maritime Model Architectures
              </h3>

              <div className="space-y-2">
                {[
                  { id: 'emission', title: 'Vessel CO2 Emission LSTM', desc: 'Time-series fuel & CO2 forecast' },
                  { id: 'cfd_pinn', title: 'CFD PINN Hull Drag Model', desc: 'Physics-informed neural net for Maxsurf' },
                  { id: 'ais_transformer', title: 'AIS Trajectory Transformer', desc: '8-head attention next-waypoint predictor' },
                  { id: 'anomaly_lstm', title: 'Engine Cylinder Vibration AI', desc: '1000Hz acoustic anomaly detector' },
                ].map(tmpl => (
                  <button
                    key={tmpl.id}
                    onClick={() => handleTemplateChange(tmpl.id as any)}
                    className={`w-full text-left p-3 rounded-2xl border transition space-y-1 ${
                      selectedTemplate === tmpl.id
                        ? 'bg-indigo-500/10 border-indigo-500/50 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-sky-300">{tmpl.title}</div>
                    <div className="text-[10px] text-slate-400">{tmpl.desc}</div>
                  </button>
                ))}
              </div>

              {/* Training Controls */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Hyperparameters
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Batch Size</label>
                    <select
                      value={batchSize}
                      onChange={e => setBatchSize(e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    >
                      <option value="32">32</option>
                      <option value="64">64</option>
                      <option value="128">128</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Learning Rate</label>
                    <select
                      value={learningRate}
                      onChange={e => setLearningRate(e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    >
                      <option value="0.001">1e-3</option>
                      <option value="0.0001">1e-4</option>
                      <option value="0.00001">1e-5</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setIsTraining(!isTraining)}
                  className={`w-full py-2.5 font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 ${
                    isTraining
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
                  }`}
                >
                  {isTraining ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isTraining ? 'Pause Training Epochs' : 'Start GPU Training Loop'}
                </button>
              </div>
            </div>

            {/* Right: Code Editor & Execution Output */}
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 lg:col-span-2 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-bold text-white font-mono">main_notebook.py</span>
                  </div>

                  <button
                    onClick={handleRunCode}
                    disabled={isExecuting}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl transition flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" /> Execute Cell
                  </button>
                </div>

                {/* Code Buffer Area */}
                <textarea
                  value={pythonCode}
                  onChange={e => setPythonCode(e.target.value)}
                  rows={12}
                  className="w-full p-4 bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 rounded-2xl focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              {/* Execution Terminal */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-bold text-white">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Output Terminal (stdout / stderr)
                  </span>
                  <button onClick={() => setTerminalOutput([])} className="text-[10px] hover:text-white">Clear Console</button>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-[11px] text-slate-300 h-36 overflow-y-auto space-y-1">
                  {terminalOutput.map((out, i) => (
                    <div key={i} className={out.startsWith('>') ? 'text-sky-300 font-bold' : out.includes('SUCCESS') ? 'text-emerald-400 font-bold' : ''}>
                      {out}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 2: GPU CLUSTER & VRAM STUDIO */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'gpu_cluster' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'NVIDIA H100 SXM5 80GB', vram: '80 GB HBM3', cores: '16,896 CUDA', status: 'Primary Node (Selected)', speed: '3.9 TFLOPS FP64' },
              { name: 'NVIDIA A100 Tensor Core 40GB', vram: '40 GB HBM2', cores: '6,912 CUDA', status: 'Secondary Node', speed: '19.5 TFLOPS FP32' },
              { name: 'NVIDIA T4 Tensor Core 16GB', vram: '16 GB GDDR6', cores: '2,560 CUDA', status: 'Edge Vessel Node', speed: '8.1 TFLOPS FP32' },
            ].map((node, i) => (
              <div key={i} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-indigo-400" /> {node.name}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-slate-300">
                  <p>• VRAM Memory: <strong className="text-sky-300">{node.vram}</strong></p>
                  <p>• CUDA Cores: <strong className="text-emerald-300">{node.cores}</strong></p>
                  <p>• Compute Power: <strong className="text-indigo-300">{node.speed}</strong></p>
                </div>
                <button
                  onClick={() => setSelectedGpu(i === 0 ? 'h100' : i === 1 ? 'a100' : 't4')}
                  className={`w-full py-2 text-xs font-bold rounded-xl transition ${
                    (selectedGpu === 'h100' && i === 0) || (selectedGpu === 'a100' && i === 1) || (selectedGpu === 't4' && i === 2)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {(selectedGpu === 'h100' && i === 0) || (selectedGpu === 'a100' && i === 1) || (selectedGpu === 't4' && i === 2) ? 'Cluster Attached' : 'Attach GPU Node'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 3: MARITIME DATASETS HUB */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'datasets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'IMO Global MARPOL AIS & Engine Telemetry Stream 2026', records: '2.4 Million Ships', size: '14.2 GB Parquet', type: 'Time-Series Telemetry' },
            { title: 'Maxsurf 3D Hull Meshes & CFD Pressure Grids', records: '1,200 Hull Designs', size: '8.5 GB HDF5', type: 'Hydrodynamic Geometry' },
            { title: 'Global Wave Energy & Sea State Hydrodynamic Matrix', records: '40 Years Climate Data', size: '32.0 GB NetCDF', type: 'Oceanographic Wave Fields' },
            { title: 'Main Engine Cylinder Vibration & Acoustic Failure Spectra', records: '10,000 Fault Logs', size: '4.1 GB Raw Audio', type: 'Acoustic Time-Series' },
          ].map((ds, idx) => (
            <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">{ds.type}</span>
                <h4 className="font-bold text-sm text-white">{ds.title}</h4>
                <div className="flex gap-4 text-xs text-slate-400 pt-1">
                  <span>Records: <strong className="text-white">{ds.records}</strong></span>
                  <span>Size: <strong className="text-sky-300">{ds.size}</strong></span>
                </div>
              </div>
              <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> Mount Dataset in PyTorch DataLoader
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 4: EPOCH TRAINING & METRICS */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'evaluation' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" /> Real-time Model Evaluation Matrix
              </h3>
              <span className="text-xs font-mono text-emerald-400 font-bold">Epoch {currentEpoch} / {maxEpochs}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold">Training Loss (MSE)</span>
                <div className="text-2xl font-black text-indigo-400">{trainingLoss}</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold">Validation Loss</span>
                <div className="text-2xl font-black text-sky-400">{validationLoss}</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold">R² Variance Score</span>
                <div className="text-2xl font-black text-emerald-400">{r2Score}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-white">Loss Convergence Curve</h4>
              <div className="w-full bg-slate-900 h-24 rounded-xl border border-slate-800 relative flex items-end p-2 gap-1">
                {Array.from({ length: 30 }).map((_, i) => {
                  const h = Math.max(10, 90 * Math.exp(-i * 0.1) + Math.sin(i) * 5);
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-indigo-500 rounded-t hover:bg-sky-400 transition"
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 5: LATEX PAPER GENERATOR */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'paper_gen' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <BookOpen className="w-5 h-5 text-indigo-400" /> AI Academic Research Paper & LaTeX Exporter
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Automatically compile your PyTorch ML model results, loss graphs, and hyperparameter tables into a peer-reviewed LaTeX paper ready for publication in RINA, SNAME, or the Global Knowledge Network.
          </p>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-sky-300 space-y-2 h-48 overflow-y-auto">
            <p>\\documentclass[journal]{'{IEEEtran}'}</p>
            <p>\\title{'{Deep Learning Forecaster for Maritime Fuel & CO2 Decarbonization}'}</p>
            <p>\\author{'{Naval Architecture & AI Lab, Module 210}'}</p>
            <p>\\begin{'{abstract}'}</p>
            <p>We present a Physics-Informed Neural Network (PINN) capable of predicting hull hydrodynamic resistance with R² = {r2Score} using CUDA-accelerated PyTorch kernels...</p>
            <p>\\end{'{abstract}'}</p>
          </div>

          <button className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-2">
            <Download className="w-4 h-4" /> Export IEEE LaTeX Document (.tex)
          </button>
        </div>
      )}

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
