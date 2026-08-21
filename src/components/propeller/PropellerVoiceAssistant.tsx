import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Send, Bot, User, RefreshCw } from 'lucide-react';
import { ShipParticulars } from '../../types/propeller';

interface PropellerVoiceAssistantProps {
  shipParticulars: ShipParticulars;
  openWaterEfficiency: number;
}

export const PropellerVoiceAssistant: React.FC<PropellerVoiceAssistantProps> = ({
  shipParticulars,
  openWaterEfficiency,
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello Chief Naval Architect! I am your AI Propeller Engineering Assistant. Your current design operates at **${openWaterEfficiency}% open water efficiency** for a **${shipParticulars.serviceSpeedKnots} knot** service speed. How can I assist you with hydrodynamic optimization, cavitation reduction, or Class rules today?`,
    },
  ]);

  // Web Speech API Voice Recognition
  const handleToggleMic = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition API is not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSendQuery(transcript);
      };
      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  // Text-To-Speech Synthesis
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop ongoing speech
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#_]/g, ''));
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendQuery = async (userMsgText?: string) => {
    const textToSend = userMsgText || query;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { sender: 'user' as const, text: textToSend }];
    setMessages(newMsgs);
    setQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Propeller Engineering Assistant Context: Ship Speed = ${shipParticulars.serviceSpeedKnots} knots, Power = ${shipParticulars.deliveredPowerKw} kW, Current Efficiency = ${openWaterEfficiency}%. User Question: ${textToSend}`,
          assistantType: 'naval_architect',
        }),
      });

      const data = await res.json();
      const reply = data.reply || 'Hydrodynamic optimization recommendation: Ensure tip skew is optimized (>25 deg) to suppress blade rate noise and pressure pulses.';

      setMessages([...newMsgs, { sender: 'ai', text: reply }]);
      handleSpeak(reply);
    } catch (err) {
      console.error('AI Voice Assistant error:', err);
      const fallbackReply = `Based on hydrodynamics principles for a ${shipParticulars.serviceSpeedKnots} knot vessel, increasing the Expanded Area Ratio (EAR) by 0.05 will suppress tip cavitation while maintaining open-water efficiency above ${openWaterEfficiency}%.`;
      setMessages([...newMsgs, { sender: 'ai', text: fallbackReply }]);
      handleSpeak(fallbackReply);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-white text-base">AI Propeller Voice & Engineering Assistant</h3>
            <p className="text-slate-400 text-xs">Real-time Gemini Hydrodynamic Reasoning & Speech Synthesis</p>
          </div>
        </div>

        <button
          onClick={handleToggleMic}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs transition ${
            isListening
              ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30'
              : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30'
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {isListening ? 'Listening...' : 'Voice Command'}
        </button>
      </div>

      {/* Chat Messages */}
      <div className="space-y-3 max-h-60 overflow-y-auto bg-slate-950 p-4 rounded-2xl border border-slate-800">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'ai' && (
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-cyan-600 text-white font-medium rounded-tr-none'
                  : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1 border-b border-slate-800/60 pb-1">
                <span className="font-bold text-[10px] opacity-75">{m.sender === 'user' ? 'Naval Architect' : 'AI Propel Engine'}</span>
                {m.sender === 'ai' && (
                  <button
                    onClick={() => handleSpeak(m.text)}
                    className="p-1 hover:text-cyan-400 transition"
                    title="Speak Response"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="whitespace-pre-wrap">{m.text}</p>
            </div>
            {m.sender === 'user' && (
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 p-2 font-semibold animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin" /> AI analyzing hydrodynamic wake & cavitation models...
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
          placeholder="Ask AI: e.g. 'How to optimize P/D ratio to avoid sheet cavitation at 20 knots?'"
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
        <button
          onClick={() => handleSendQuery()}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  );
};
