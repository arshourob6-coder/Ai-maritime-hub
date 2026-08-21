import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Radio,
  X,
  Compass,
  Zap,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { ViewMode } from '../types';

interface AIVoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView?: (view: ViewMode) => void;
}

export const AIVoiceAssistantModal: React.FC<AIVoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigateView
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantReply, setAssistantReply] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartVoice = () => {
    setIsListening(true);
    setTranscript('Listening for bridge voice command...');
    setAssistantReply(null);

    setTimeout(() => {
      const sampleCommands = [
        "Check vessel GM metacentric height for MV Polaris Enterprise",
        "Show live marine weather forecast for Malacca Strait",
        "Generate EEXI and CII decarbonization report",
        "Track AIS vessel EVER ALIVEN IMO 9823412"
      ];
      const spoken = sampleCommands[Math.floor(Math.random() * sampleCommands.length)];
      setTranscript(`"${spoken}"`);

      setTimeout(() => {
        setIsListening(false);
        setAssistantReply(`Voice Command Recognized: ${spoken}. Processing calculations and updating digital twin parameters.`);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full text-xs font-bold">
            <Volume2 className="w-3.5 h-3.5 text-sky-400" /> Multilingual Maritime Voice Bridge
          </div>
          <h3 className="text-xl font-black text-white">AI Voice Assistant</h3>
          <p className="text-xs text-slate-300">Hands-free bridge navigation, hydrodynamic calculations, and live AIS tracking.</p>
        </div>

        {/* Mic Pulse Button */}
        <div className="flex flex-col items-center justify-center space-y-4 my-6">
          <button
            onClick={handleStartVoice}
            disabled={isListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/50 ring-8 ring-rose-500/20'
                : 'bg-gradient-to-tr from-sky-500 to-indigo-500 text-slate-950 hover:scale-105 shadow-xl shadow-sky-500/30'
            }`}
          >
            {isListening ? <Mic className="w-10 h-10 animate-bounce" /> : <Mic className="w-10 h-10" />}
          </button>
          <span className="text-xs font-mono text-slate-400">
            {isListening ? 'Speak into microphone...' : 'Click mic to issue speech command'}
          </span>
        </div>

        {transcript && (
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-2 text-xs">
            <span className="font-mono text-sky-400 block">{transcript}</span>
            {assistantReply && (
              <p className="text-emerald-300 font-bold border-t border-slate-800 pt-2">{assistantReply}</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
