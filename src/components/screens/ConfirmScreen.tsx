import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { AccentColorConfig } from '../../types';

interface ConfirmScreenProps {
  intentionText?: string;
  theme: AccentColorConfig;
  onContinueToSite: () => void;
}

export const ConfirmScreen: React.FC<ConfirmScreenProps> = ({
  intentionText = 'send that message',
  theme,
  onContinueToSite,
}) => {
  // Format intention text naturally for "Got it — go ..."
  const formatHeadline = (text: string) => {
    const clean = text.trim();
    if (!clean) return 'Got it — go send that message';
    if (clean.toLowerCase().startsWith('send')) return `Got it — go ${clean.toLowerCase()}`;
    if (clean.toLowerCase().startsWith('look')) return `Got it — go ${clean.toLowerCase()}`;
    if (clean.toLowerCase().startsWith('check')) return `Got it — go ${clean.toLowerCase()}`;
    return `Got it — go ${clean.toLowerCase()}`;
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center w-full max-w-md mx-auto px-6 py-12 text-center">
      <div className="flex-1 flex flex-col items-center justify-center my-auto max-w-sm">
        {/* Sage Checkmark Circle matching screenshot */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-8 border-[3px] transition-transform duration-500 scale-100 animate-in fade-in zoom-in-90"
          style={{
            borderColor: theme.primary,
            color: theme.primary,
          }}
        >
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        {/* Headline */}
        <h2 className="text-[20px] sm:text-[21px] font-normal text-zinc-100 leading-snug tracking-tight mb-3">
          {formatHeadline(intentionText)}
        </h2>

        {/* Subtext */}
        <p className="text-[17px] text-zinc-300 font-normal leading-relaxed mb-12 max-w-xs">
          Your intention is set. The site is now unlocked for your task.
        </p>

        {/* Action Button */}
        <button
          onClick={onContinueToSite}
          id="btn-confirm-continue"
          className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-[15.5px] font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-lg"
          style={{
            backgroundColor: theme.primary,
            color: theme.textDark,
          }}
        >
          <span>Continue to site</span>
          <ArrowRight className="w-4 h-4 stroke-[2.4]" />
        </button>
      </div>
    </div>
  );
};
