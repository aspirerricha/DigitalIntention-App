import React from 'react';
import { Smartphone, Monitor, RotateCcw, Sparkles } from 'lucide-react';
import { ScreenType, AccentColorConfig } from '../types';

interface ScreenNavToolbarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  isFrameMode: boolean;
  onToggleFrameMode: () => void;
  onResetData: () => void;
  theme: AccentColorConfig;
}

export const ScreenNavToolbar: React.FC<ScreenNavToolbarProps> = ({
  currentScreen,
  onSelectScreen,
  isFrameMode,
  onToggleFrameMode,
  onResetData,
  theme,
}) => {
  const screens: { id: ScreenType; label: string; number: number }[] = [
    { id: 'dashboard', label: '1. Dashboard', number: 1 },
    { id: 'prompt', label: '2. Intention Prompt', number: 2 },
    { id: 'confirm', label: '3. Unlocked', number: 3 },
    { id: 'pause', label: '4. Pause Intercept', number: 4 },
    { id: 'settings', label: '5. Settings', number: 5 },
  ];

  return (
    <nav aria-label="Screen Navigation" className="w-full bg-[#141417]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs z-40 sticky top-0">
      {/* Screen Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
        <span className="text-zinc-500 text-[11px] font-medium uppercase tracking-wider mr-1 hidden sm:inline">
          Screens:
        </span>
        {screens.map((sc) => {
          const isActive = currentScreen === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => onSelectScreen(sc.id)}
              className={`px-3 py-1.5 rounded-full font-medium transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? 'text-zinc-950 shadow-xs'
                  : 'bg-[#1b1b20] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
              style={{
                backgroundColor: isActive ? theme.primary : undefined,
              }}
            >
              <span className="sm:hidden">{sc.number}</span>
              <span className="hidden sm:inline">{sc.label}</span>
            </button>
          );
        })}
      </div>

      {/* Frame Mode & Reset Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onToggleFrameMode}
          title={isFrameMode ? 'Switch to Full Width' : 'Switch to Phone View Frame'}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#1b1b20] hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors border border-zinc-800"
        >
          {isFrameMode ? (
            <>
              <Smartphone className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span className="hidden md:inline">Phone Frame</span>
            </>
          ) : (
            <>
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Full Width</span>
            </>
          )}
        </button>

        <button
          onClick={onResetData}
          title="Reset to default screenshot values"
          className="p-1.5 rounded-full bg-[#1b1b20] hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors border border-zinc-800"
          aria-label="Reset stats"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>
  );
};
