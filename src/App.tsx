import React, { useState, useEffect } from 'react';
import { ScreenType, FlowItem, AppSettings, AccentColor } from './types';
import { INITIAL_FLOW_ITEMS, INITIAL_SETTINGS } from './data/initialData';
import { ACCENT_THEMES, playMindfulChime } from './utils/audio';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { PromptScreen } from './components/screens/PromptScreen';
import { ConfirmScreen } from './components/screens/ConfirmScreen';
import { PauseScreen } from './components/screens/PauseScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { ScreenNavToolbar } from './components/ScreenNavToolbar';
import { SimulatedSiteModal } from './components/SimulatedSiteModal';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [isFrameMode, setIsFrameMode] = useState(true);

  // Intent-Guard Metrics State (persisted in localStorage)
  const [timeSavedMinutes, setTimeSavedMinutes] = useState<number>(() => {
    const saved = localStorage.getItem('intent_guard_time_saved');
    return saved ? parseInt(saved, 10) : 255; // 4h 15m = 255 minutes
  });

  const [intentsCount, setIntentsCount] = useState<number>(() => {
    const saved = localStorage.getItem('intent_guard_intents');
    return saved ? parseInt(saved, 10) : 24;
  });

  const [redirectsCount, setRedirectsCount] = useState<number>(() => {
    const saved = localStorage.getItem('intent_guard_redirects');
    return saved ? parseInt(saved, 10) : 6;
  });

  const [flowItems, setFlowItems] = useState<FlowItem[]>(() => {
    const saved = localStorage.getItem('intent_guard_flow');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_FLOW_ITEMS;
      }
    }
    return INITIAL_FLOW_ITEMS;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('intent_guard_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });

  // Active intention flow session state
  const [currentGoal, setCurrentGoal] = useState<string>('Send a message');
  const [targetSite, setTargetSite] = useState<string>('Instagram');
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('intent_guard_time_saved', timeSavedMinutes.toString());
  }, [timeSavedMinutes]);

  useEffect(() => {
    localStorage.setItem('intent_guard_intents', intentsCount.toString());
  }, [intentsCount]);

  useEffect(() => {
    localStorage.setItem('intent_guard_redirects', redirectsCount.toString());
  }, [redirectsCount]);

  useEffect(() => {
    localStorage.setItem('intent_guard_flow', JSON.stringify(flowItems));
  }, [flowItems]);

  useEffect(() => {
    localStorage.setItem('intent_guard_settings', JSON.stringify(settings));
  }, [settings]);

  // Active Accent Theme
  const currentTheme = ACCENT_THEMES[settings.accentColor] || ACCENT_THEMES.sage;

  // Format total minutes to "4h 15m"
  const formatTimeSaved = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Flow handlers
  const handleStartIntentionPrompt = (siteName: string = 'Instagram') => {
    setTargetSite(siteName);
    setCurrentScreen('prompt');
  };

  const handleSimulateGuardInterception = (siteName: string = 'Instagram') => {
    setTargetSite(siteName);
    // Directly show the Mindful Pause Intercept ("Still want to?")
    setCurrentScreen('pause');
  };

  const handlePromptSubmit = (goal: string) => {
    setCurrentGoal(goal);
    if (settings.soundEnabled) {
      playMindfulChime('unlock');
    }
    setCurrentScreen('confirm');
  };

  const handleSelectJustBrowsing = () => {
    // When "Just browsing" is selected, trigger the Mindful Pause screen!
    setCurrentScreen('pause');
  };

  const handlePauseContinue = () => {
    // User decided to continue, show prompt to set a concrete intention
    setCurrentScreen('prompt');
  };

  const handlePauseCloseRedirect = () => {
    // User chose "Not really, close this"
    if (settings.soundEnabled) {
      playMindfulChime('redirect');
    }

    // Add 20m saved time and increment redirects
    setTimeSavedMinutes((prev) => prev + 20);
    setRedirectsCount((prev) => prev + 1);

    // Add to recent flow items
    const newFlowItem: FlowItem = {
      id: `redirect-${Date.now()}`,
      title: `Redirected from ${targetSite || 'Social Media'}`,
      subtitle: 'Just now',
      timeDelta: '+ 20m',
      type: 'redirect',
      timestamp: Date.now(),
    };
    setFlowItems((prev) => [newFlowItem, ...prev.slice(0, 9)]);

    showToast('✨ 20 minutes reclaimed from mindless browsing!');
    setCurrentScreen('dashboard');
  };

  const handleConfirmContinueToSite = () => {
    // Increment followed intents
    setIntentsCount((prev) => prev + 1);
    setIsSessionActive(true);
  };

  const handleFinishSiteTask = (durationMinutes: number) => {
    setIsSessionActive(false);
    // Add completed intention to recent flow
    const newFlowItem: FlowItem = {
      id: `intent-${Date.now()}`,
      title: currentGoal || 'Deep Work Session',
      subtitle: 'Just now',
      timeDelta: `+ ${durationMinutes}m`,
      type: 'session',
      timestamp: Date.now(),
    };
    setFlowItems((prev) => [newFlowItem, ...prev.slice(0, 9)]);
    showToast(`🎯 Intention completed: "${currentGoal}"`);
    setCurrentScreen('dashboard');
  };

  // Settings Handlers
  const handleUpdateSettings = (newPartial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newPartial }));
  };

  const handleToggleSite = (siteId: string) => {
    setSettings((prev) => ({
      ...prev,
      sites: prev.sites.map((s) =>
        s.id === siteId ? { ...s, enabled: !s.enabled } : s
      ),
    }));
  };

  const handleAddSite = (name: string, domain: string) => {
    const newSite = {
      id: `custom-site-${Date.now()}`,
      name,
      domain,
      enabled: true,
      category: 'other' as const,
    };
    setSettings((prev) => ({
      ...prev,
      sites: [newSite, ...prev.sites],
    }));
  };

  const handleDeleteSite = (siteId: string) => {
    setSettings((prev) => ({
      ...prev,
      sites: prev.sites.filter((s) => s.id !== siteId),
    }));
  };

  const handleResetData = () => {
    setTimeSavedMinutes(255);
    setIntentsCount(24);
    setRedirectsCount(6);
    setFlowItems(INITIAL_FLOW_ITEMS);
    setSettings(INITIAL_SETTINGS);
    setCurrentGoal('Send a message');
    showToast('Reset to original screenshot metrics.');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-[#8aa89b]/30">
      {/* Top Floating Screen Navigation Bar */}
      <ScreenNavToolbar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          setIsSessionActive(false);
          setCurrentScreen(screen);
        }}
        isFrameMode={isFrameMode}
        onToggleFrameMode={() => setIsFrameMode(!isFrameMode)}
        onResetData={handleResetData}
        theme={currentTheme}
      />

      {/* Main View Container */}
      <div className="flex-1 flex items-center justify-center p-0 sm:p-6 lg:p-10 overflow-y-auto">
        <div
          className={`w-full transition-all duration-300 ${
            isFrameMode
              ? 'max-w-[425px] min-h-[760px] sm:min-h-[840px] bg-[#0e0e11] sm:rounded-[44px] sm:border-[9px] sm:border-[#222228] sm:shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col relative overflow-hidden'
              : 'max-w-xl min-h-screen sm:min-h-0 bg-[#0e0e11] flex flex-col'
          }`}
        >
          {/* Subtle Phone Notch / Speaker for Frame Mode */}
          {isFrameMode && (
            <div className="hidden sm:flex justify-center pt-2 pb-1 bg-[#0e0e11] shrink-0">
              <div className="w-20 h-4 bg-zinc-900 rounded-full border border-zinc-800/80 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-950/80 mr-3 border border-zinc-800" />
                <div className="w-8 h-1 bg-zinc-800 rounded-full" />
              </div>
            </div>
          )}

          {/* Active Screen Rendering */}
          <div className="flex-1 flex flex-col w-full">
            {currentScreen === 'dashboard' && (
              <DashboardScreen
                timeSaved={formatTimeSaved(timeSavedMinutes)}
                intentsCount={intentsCount}
                redirectsCount={redirectsCount}
                flowItems={flowItems}
                theme={currentTheme}
                onOpenSettings={() => setCurrentScreen('settings')}
                onStartIntentionPrompt={() => handleStartIntentionPrompt('Instagram')}
                onSimulateGuardInterception={handleSimulateGuardInterception}
              />
            )}

            {currentScreen === 'prompt' && (
              <PromptScreen
                initialGoal={currentGoal}
                targetSite={targetSite}
                theme={currentTheme}
                onSubmit={handlePromptSubmit}
                onSelectJustBrowsing={handleSelectJustBrowsing}
              />
            )}

            {currentScreen === 'confirm' && (
              <ConfirmScreen
                intentionText={currentGoal}
                theme={currentTheme}
                onContinueToSite={handleConfirmContinueToSite}
              />
            )}

            {currentScreen === 'pause' && (
              <PauseScreen
                theme={currentTheme}
                onContinue={handlePauseContinue}
                onCloseRedirect={handlePauseCloseRedirect}
              />
            )}

            {currentScreen === 'settings' && (
              <SettingsScreen
                settings={settings}
                theme={currentTheme}
                onBack={() => setCurrentScreen('dashboard')}
                onUpdateSettings={handleUpdateSettings}
                onToggleSite={handleToggleSite}
                onAddSite={handleAddSite}
                onDeleteSite={handleDeleteSite}
              />
            )}
          </div>
        </div>
      </div>

      {/* Simulated Unlocked Browser Modal */}
      {isSessionActive && (
        <SimulatedSiteModal
          siteName={targetSite}
          intention={currentGoal}
          theme={currentTheme}
          onFinishTask={handleFinishSiteTask}
          onClose={() => setIsSessionActive(false)}
        />
      )}

      {/* Mindful Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#1b1b20] border border-zinc-700/80 shadow-2xl rounded-2xl px-5 py-3.5 flex items-center gap-3 text-sm text-zinc-100 backdrop-blur-md">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: currentTheme.primary }}
            />
            <p className="font-normal">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
