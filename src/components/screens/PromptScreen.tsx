import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AccentColorConfig } from '../../types';
import { Footer } from '../Footer';

interface PromptScreenProps {
  initialGoal?: string;
  targetSite?: string;
  theme: AccentColorConfig;
  onSubmit: (goal: string) => void;
  onSelectJustBrowsing: () => void;
}

export const PromptScreen: React.FC<PromptScreenProps> = ({
  initialGoal = '',
  targetSite,
  theme,
  onSubmit,
  onSelectJustBrowsing,
}) => {
  const [goal, setGoal] = useState(initialGoal);

  const quickPills = [
    { label: 'Send a message', value: 'Send a message' },
    { label: 'Look something up', value: 'Look something up' },
    { label: 'Just browsing', value: '__just_browsing__' },
  ];

  const handlePillClick = (val: string) => {
    if (val === '__just_browsing__') {
      onSelectJustBrowsing();
    } else {
      setGoal(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) {
      // Default to "Send a message" if empty for quick flow
      onSubmit('Send a message');
    } else {
      onSubmit(goal.trim());
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-between items-center w-full max-w-md mx-auto px-5 py-8">
      <div className="w-full flex-1 flex flex-col justify-center my-auto">
        {/* Floating Intention Card */}
        <div className="w-full bg-[#161619] border border-zinc-800/80 rounded-3xl p-7 sm:p-8 shadow-2xl backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-[28px] sm:text-[30px] font-editorial text-zinc-100 font-normal tracking-wide leading-snug">
              What are you here to do?
            </h2>
            <p className="text-[15px] text-zinc-400 mt-2">
              Set a mindful intention before you begin.
            </p>
            {targetSite && (
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800/80 text-zinc-400">
                Opening {targetSite}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Input Field with Underline */}
            <div className="space-y-2">
              <label
                htmlFor="goal-input"
                className="block text-[13.5px] font-editorial text-zinc-300 italic"
              >
                Your Goal
              </label>
              <div className="relative">
                <input
                  id="goal-input"
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Type your intention here..."
                  className="w-full bg-transparent border-b border-zinc-600/80 focus:border-zinc-300 pb-2 text-[15.5px] text-zinc-100 placeholder-zinc-500/80 focus:outline-hidden transition-colors"
                  autoFocus
                />
              </div>
            </div>

            {/* Quick Pills */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {quickPills.map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => handlePillClick(pill.value)}
                  className={`px-4 py-2 rounded-full text-[13.5px] font-normal transition-all duration-200 border ${
                    goal === pill.value
                      ? 'bg-zinc-800 border-zinc-500 text-white shadow-xs'
                      : 'bg-[#1b1b1f] border-zinc-800/90 text-zinc-300 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <div className="pt-5 flex justify-center">
              <button
                type="submit"
                id="btn-prompt-continue"
                className="flex items-center justify-center gap-2.5 px-8 py-3 rounded-full text-[15px] font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-md"
                style={{
                  backgroundColor: theme.primary,
                  color: theme.textDark,
                }}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer variant="simple" />
    </div>
  );
};
