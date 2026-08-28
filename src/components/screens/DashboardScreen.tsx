import React from 'react';
import { Clock, CornerUpRight, Sparkles, ShieldAlert, Plus } from 'lucide-react';
import { FlowItem, AccentColorConfig } from '../../types';
import { Header } from '../Header';
import { Footer } from '../Footer';

interface DashboardScreenProps {
  timeSaved: string;
  intentsCount: number;
  redirectsCount: number;
  flowItems: FlowItem[];
  theme: AccentColorConfig;
  onOpenSettings: () => void;
  onStartIntentionPrompt: () => void;
  onSimulateGuardInterception: (siteName?: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  timeSaved,
  intentsCount,
  redirectsCount,
  flowItems,
  theme,
  onOpenSettings,
  onStartIntentionPrompt,
  onSimulateGuardInterception,
}) => {
  return (
    <div className="min-h-full flex flex-col justify-between w-full max-w-md mx-auto text-zinc-100 pb-8">
      {/* Header */}
      <Header onOpenSettings={onOpenSettings} theme={theme} />

      {/* Main Content */}
      <main className="px-6 flex-1 flex flex-col gap-6">
        {/* Welcome Text */}
        <section className="pt-2 pb-1">
          <h2 className="text-[32px] font-bold text-white tracking-tight leading-tight">
            Welcome back.
          </h2>
          <p className="text-[17px] text-zinc-400 mt-2 font-normal leading-snug">
            Here is a summary of your digital intentions this week.
          </p>
        </section>

        {/* Card 1: Time Saved This Week */}
        <div
          id="card-time-saved"
          className="bg-[#161619] border border-zinc-800/60 rounded-3xl p-6 relative overflow-hidden transition-all hover:border-zinc-700/60 shadow-lg"
        >
          <div className="flex items-center gap-2.5 text-zinc-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Clock className="w-4 h-4 stroke-[2.2] text-zinc-400" />
            <span>TIME SAVED THIS WEEK</span>
          </div>

          <div
            className="text-[44px] font-bold tracking-tight mb-2 transition-colors duration-300"
            style={{ color: theme.primary }}
          >
            {timeSaved}
          </div>

          <p className="text-[15px] text-zinc-400 font-normal">
            Reclaimed from mindless browsing.
          </p>
        </div>

        {/* Card 2: Intents vs Redirects */}
        <div
          id="card-intents-redirects"
          className="bg-[#161619] border border-zinc-800/60 rounded-3xl p-6 relative overflow-hidden transition-all hover:border-zinc-700/60 shadow-lg"
        >
          <div className="flex items-center gap-2.5 text-zinc-400 text-xs font-semibold tracking-wider uppercase mb-5">
            {/* Custom diamond turn / redirect icon */}
            <div className="w-4 h-4 flex items-center justify-center">
              <CornerUpRight className="w-4 h-4 stroke-[2.4] text-zinc-400" />
            </div>
            <span>INTENTS VS REDIRECTS</span>
          </div>

          <div className="flex items-baseline gap-4 mb-2">
            <div className="flex items-baseline">
              <span
                className="text-[44px] font-bold tracking-tight"
                style={{ color: theme.primary }}
              >
                {intentsCount}
              </span>
              <span className="text-zinc-600 text-3xl font-light mx-3">/</span>
              <span className="text-[44px] font-bold text-zinc-100 tracking-tight">
                {redirectsCount}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-[14px] text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span>Followed</span>
            </div>
            <div className="flex items-center gap-1.5 ml-3">
              <span>Redirected</span>
            </div>
          </div>
        </div>

        {/* Quick Actions / Simulation Bar */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={onStartIntentionPrompt}
            id="btn-set-intention"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#1c1c20] hover:bg-[#242429] border border-zinc-800 text-sm font-medium text-zinc-200 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" style={{ color: theme.primary }} />
            <span>Set Intention</span>
          </button>
          <button
            onClick={() => onSimulateGuardInterception('Instagram')}
            id="btn-simulate-guard"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#1c1c20] hover:bg-[#242429] border border-zinc-800 text-sm font-medium text-zinc-200 transition-all active:scale-[0.98]"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400/90" />
            <span>Test Intercept</span>
          </button>
        </div>

        {/* Section: Recent Flow */}
        <section className="pt-3">
          <h3 className="text-[21px] font-semibold text-zinc-100 mb-4 tracking-tight">
            Recent Flow
          </h3>

          <div className="bg-[#161619] border border-zinc-800/60 rounded-3xl overflow-hidden divide-y divide-zinc-800/70 shadow-lg">
            {flowItems.map((item) => (
              <div
                key={item.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-zinc-800/20 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <h4 className="text-[15px] font-medium text-zinc-200 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[13px] text-zinc-500 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
                <span className="text-[14.5px] font-medium text-zinc-300 whitespace-nowrap">
                  {item.timeDelta}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer variant="full" />
    </div>
  );
};
