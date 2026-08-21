import React, { useState } from 'react';
import {
  Database,
  Lock,
  Radio,
  Server,
  Activity,
  CheckCircle2,
  Cpu,
  RotateCw,
  ShieldCheck,
  Zap,
  Download,
  Copy,
  Layers
} from 'lucide-react';
import { VesselTwin } from './digitalTwinData';

interface DataIntegrationProps {
  vessel: VesselTwin;
  isDarkMode?: boolean;
}

export const DataIntegrationBlockchain: React.FC<DataIntegrationProps> = ({
  vessel,
  isDarkMode = true
}) => {
  const [selectedProtocol, setSelectedProtocol] = useState<'nmea2000' | 'mqtt' | 'modbus' | 'starlink'>('nmea2000');
  const [copiedHash, setCopiedHash] = useState(false);

  const blockchainBlocks = [
    {
      blockHeight: 842109,
      timestamp: '2026-08-20 22:15:30 UTC',
      hash: '0x8f4d92a1c0b39e8174df529c812a4b087e1f73629410cb234918e9508bcde491',
      recordsCount: 450,
      verifier: 'DNV Maritime VeriSustain Smart Contract',
      status: 'Class Verified'
    },
    {
      blockHeight: 842108,
      timestamp: '2026-08-20 22:10:00 UTC',
      hash: '0x4a18e390c9b10982df41562b7190ca54e12984b0198caef019284bd098aef019',
      recordsCount: 450,
      verifier: "Lloyd's Register Digital Twin Credit Hub",
      status: 'Class Verified'
    },
    {
      blockHeight: 842107,
      timestamp: '2026-08-20 22:05:00 UTC',
      hash: '0x992ab1048fe019245bcda019842ef8910cb40918ae901248beaf01984710bc4e',
      recordsCount: 450,
      verifier: 'EU MRV & IMO DCS Regulatory Portal',
      status: 'Class Verified'
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div id="data-integration-blockchain-root" className="space-y-6">
      
      {/* IoT Protocol Gateway Toolbar */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-black border border-sky-500/30">
                MULTI-PROTOCOL IOT INGESTION
              </span>
              <span className="text-xs text-slate-400">450+ Streaming Telemetry Sensors</span>
            </div>
            <h3 className="font-black text-lg text-white mt-1">
              Vessel Edge IoT Gateway & Sensor Bus
            </h3>
          </div>

          {/* Protocol Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
            {[
              { id: 'nmea2000', label: 'NMEA 2000 (CAN Bus)' },
              { id: 'mqtt', label: 'MQTT Cloud Broker' },
              { id: 'modbus', label: 'Modbus TCP (PLC)' },
              { id: 'starlink', label: 'Starlink Satcom LEO' }
            ].map((proto) => (
              <button
                key={proto.id}
                onClick={() => setSelectedProtocol(proto.id as any)}
                className={`px-3 py-1.5 rounded-xl transition ${
                  selectedProtocol === proto.id
                    ? 'bg-sky-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {proto.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Packet Raw Feed */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold border-b border-slate-900 pb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> Live Telemetry Packet Stream (10 Hz)
            </span>
            <span>Broker: v-edge.maritime-ai.hub:8883</span>
          </div>

          <div className="space-y-1 text-[11px] text-slate-300 leading-relaxed overflow-x-auto">
            <div>[PGN 127488] Engine Rapid: RPM=74.2 | Pmax=184.2 bar | ExhTemp=365.1°C | Torque=52.4 kNm</div>
            <div>[PGN 128259] Speed Water: STW=19.8 kn | SOG=19.4 kn | Drift=0.4 kn @ 285°</div>
            <div>[PGN 129026] COG & SOG Rapid: HDG=064.2° True | ROT=+0.2°/min | Rate=0.8 kn</div>
            <div>[PGN 130306] Wind Data: AWS=24.8 kn | AWA=042° Port | Barometer=1018.4 hPa</div>
          </div>
        </div>
      </div>

      {/* Blockchain Immutability & Class Society Audit Trail */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-xs font-black border border-violet-500/30 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                IMMUTABLE AUDIT TRAIL
              </span>
              <span className="text-xs text-slate-400">Zero-Tamper Class Verification</span>
            </div>
            <h3 className="font-black text-lg text-white mt-1">
              Class Society Blockchain Verification & Regulatory Ledger
            </h3>
          </div>

          <button
            onClick={() => alert('Certificate of Digital Twin Immutability downloaded in PDF format with SHA-256 signature!')}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md shadow-violet-600/30 transition flex items-center gap-1.5 self-start sm:self-center"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Class Certificate</span>
          </button>
        </div>

        {/* Blocks Table */}
        <div className="space-y-3">
          {blockchainBlocks.map((block) => (
            <div
              key={block.blockHeight}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white">Block #{block.blockHeight}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{block.timestamp}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    {block.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                  <span className="truncate max-w-[280px] sm:max-w-md">{block.hash}</span>
                  <button
                    onClick={() => handleCopy(block.hash)}
                    className="p-1 hover:text-white transition"
                    title="Copy SHA-256 Hash"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {copiedHash && <span className="text-emerald-400 text-[10px]">Copied!</span>}
                </div>
              </div>

              <div className="text-left md:text-right shrink-0">
                <span className="text-slate-300 font-medium block">{block.verifier}</span>
                <span className="text-[10px] text-slate-500 font-mono">{block.recordsCount} Telemetry Signals Anchored</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
