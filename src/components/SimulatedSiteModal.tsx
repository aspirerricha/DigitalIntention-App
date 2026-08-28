import React, { useState, useEffect } from 'react';
import { CheckCircle, X, ExternalLink, ShieldCheck, Sparkles, Clock, Globe } from 'lucide-react';
import { AccentColorConfig } from '../types';

interface SimulatedSiteModalProps {
  siteName: string;
  intention: string;
  theme: AccentColorConfig;
  onFinishTask: (durationMinutes: number) => void;
  onClose: () => void;
}

export const SimulatedSiteModal: React.FC<SimulatedSiteModalProps> = ({
  siteName,
  intention,
  theme,
  onFinishTask,
  onClose,
}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e11] flex flex-col animate-in fade-in duration-300">
      {/* Simulated Browser Bar */}
      <div className="bg-[#18181c] border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-amber-500/60" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
        </div>

        <div className="flex items-center gap-2 bg-[#101013] border border-zinc-800 rounded-full px-4 py-1 text-xs text-zinc-300 max-w-sm w-full mx-4 justify-center">
          <Globe className="w-3.5 h-3.5 text-zinc-500" />
          <span>https://{siteName.toLowerCase().replace(/\s+/g, '')}.com</span>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Simulated Page Content */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center relative bg-radial from-zinc-900 to-[#0e0e11]">
        <div className="max-w-md w-full bg-[#161619]/90 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 flex items-center justify-center mx-auto" style={{ color: theme.primary }}>
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
              UNLOCKED INTENTION SESSION
            </span>
            <h2 className="text-2xl font-editorial text-zinc-100 mt-1">
              {siteName} is Unlocked
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              Focus on: <span className="text-white font-medium italic">"{intention}"</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-[#1f1f24] border border-zinc-800">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span className="text-xl font-bold font-mono text-zinc-100">
              {formatTimer(seconds)}
            </span>
            <span className="text-xs text-zinc-500">elapsed</span>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed">
            Intent-Guard is keeping you grounded. When you have finished your task, click below to log your mindful session.
          </p>

          <button
            onClick={() => onFinishTask(Math.max(1, Math.round(seconds / 60) || 15))}
            className="w-full py-3.5 rounded-full font-medium text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
            style={{
              backgroundColor: theme.primary,
              color: theme.textDark,
            }}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Complete Intention & Log Time</span>
          </button>
        </div>
      </div>

      {/* Floating Bottom Badge */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-[#1b1b20]/95 backdrop-blur-md border border-zinc-700/80 rounded-full px-5 py-2.5 shadow-2xl flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }} />
            <span className="text-zinc-300 font-medium">Intention: {intention}</span>
          </div>
          <button
            onClick={() => onFinishTask(15)}
            className="px-3 py-1 rounded-full text-zinc-900 font-semibold hover:opacity-90"
            style={{ backgroundColor: theme.primary }}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};
