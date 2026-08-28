import React from 'react';
import { Settings, ArrowLeft } from 'lucide-react';
import { AccentColorConfig } from '../types';

interface HeaderProps {
  onOpenSettings?: () => void;
  onBack?: () => void;
  showBack?: boolean;
  title?: string;
  theme: AccentColorConfig;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  onBack,
  showBack = false,
  title,
  theme,
}) => {
  if (showBack) {
    return (
      <header className="flex items-center justify-between px-6 pt-8 pb-4 w-full">
        <button
          onClick={onBack}
          id="header-back-btn"
          className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800/50"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-zinc-300 stroke-[2.2]" />
        </button>
        {title && (
          <h1 className="text-3xl font-editorial text-zinc-100 font-normal tracking-wide text-center flex-1 pr-7">
            {title}
          </h1>
        )}
        <div className="w-5" />
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-6 pt-8 pb-6 w-full">
      <div className="flex items-center gap-2.5">
        {/* Lotus / sprout brand icon */}
        <div className="w-6 h-6 flex items-center justify-center" style={{ color: theme.primary }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            {/* Mindful leaf / sprout icon matching screenshot */}
            <path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9Z" opacity="0.2" />
            <path d="M12 7c-2.76 0-5 2.24-5 5 0 3.87 5 9 5 9s5-5.13 5-9c0-2.76-2.24-5-5-5Z" />
            <path d="M12 12c-1.1 0-2 .9-2 2 0 1.5 2 4 2 4s2-2.5 2-4c0-1.1-.9-2-2-2Z" fill="currentColor" fillOpacity="0.25" />
          </svg>
        </div>
        <span className="text-[21px] font-semibold tracking-tight text-white">
          Intent-Guard
        </span>
      </div>

      {onOpenSettings && (
        <button
          onClick={onOpenSettings}
          id="header-settings-btn"
          className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors rounded-full hover:bg-zinc-800/40"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 stroke-[1.8]" />
        </button>
      )}
    </header>
  );
};
