import React from 'react';
import { AccentColorConfig } from '../../types';

interface PauseScreenProps {
  theme: AccentColorConfig;
  onContinue: () => void;
  onCloseRedirect: () => void;
}

export const PauseScreen: React.FC<PauseScreenProps> = ({
  theme,
  onContinue,
  onCloseRedirect,
}) => {
  return (
    <div className="min-h-full flex flex-col justify-center items-center w-full max-w-md mx-auto px-6 py-12 text-center">
      <div className="flex-1 flex flex-col items-center justify-center my-auto w-full max-w-xs">
        {/* Title */}
        <h2 className="text-[32px] sm:text-[34px] font-normal text-zinc-100 tracking-tight leading-tight mb-4">
          Still want to?
        </h2>

        {/* Subtitle */}
        <p className="text-[17.5px] text-zinc-300 font-normal leading-relaxed mb-16">
          Take a moment. There is no rush.
        </p>

        {/* Buttons Stack */}
        <div className="w-full flex flex-col gap-3.5">
          {/* Yes, continue button */}
          <button
            onClick={onContinue}
            id="btn-pause-continue"
            className="w-full py-3.5 px-6 rounded-full text-[15.5px] font-normal text-zinc-200 bg-[#212126] hover:bg-[#2a2a30] border border-zinc-800/80 transition-all duration-200 active:scale-[0.98]"
          >
            Yes, continue
          </button>

          {/* Not really, close this button */}
          <button
            onClick={onCloseRedirect}
            id="btn-pause-close"
            className="w-full py-3.5 px-6 rounded-full text-[15.5px] font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-lg"
            style={{
              backgroundColor: theme.primary,
              color: theme.textDark,
            }}
          >
            Not really, close this
          </button>
        </div>
      </div>
    </div>
  );
};
