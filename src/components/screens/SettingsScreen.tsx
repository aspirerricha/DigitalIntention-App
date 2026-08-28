import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Globe,
  Clock,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';
import { AppSettings, GuardedSite, AccentColor, AccentColorConfig } from '../../types';
import { ACCENT_THEMES } from '../../utils/audio';
import { Header } from '../Header';
import { Footer } from '../Footer';

interface SettingsScreenProps {
  settings: AppSettings;
  theme: AccentColorConfig;
  onBack: () => void;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onToggleSite: (siteId: string) => void;
  onAddSite: (name: string, domain: string) => void;
  onDeleteSite: (siteId: string) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  theme,
  onBack,
  onUpdateSettings,
  onToggleSite,
  onAddSite,
  onDeleteSite,
}) => {
  const [expandedSection, setExpandedSection] = useState<'sites' | 'quiet' | 'colors' | null>(null);
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteDomain, setNewSiteDomain] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddNewSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteDomain.trim()) return;
    const name = newSiteName.trim() || newSiteDomain.replace(/^(https?:\/\/)?(www\.)?/, '').split('.')[0];
    onAddSite(name, newSiteDomain.trim().toLowerCase());
    setNewSiteName('');
    setNewSiteDomain('');
    setShowAddForm(false);
  };

  return (
    <div className="min-h-full flex flex-col justify-between w-full max-w-md mx-auto text-zinc-100 pb-8">
      {/* Header with back button & Serif Settings title */}
      <Header onBack={onBack} showBack={true} title="Settings" theme={theme} />

      {/* Main Settings Card */}
      <main className="px-6 flex-1 flex flex-col gap-6 pt-4">
        <div className="bg-[#161619] border border-zinc-800/70 rounded-3xl overflow-hidden shadow-xl divide-y divide-zinc-800/80">
          {/* Row 1: Guarded sites/apps */}
          <div className="p-6 transition-colors">
            <div className="flex items-center justify-between gap-4">
              <div
                className="flex-1 cursor-pointer select-none"
                onClick={() =>
                  setExpandedSection(expandedSection === 'sites' ? null : 'sites')
                }
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-[17px] font-editorial text-zinc-100 leading-snug">
                    Guarded sites/apps
                  </h3>
                  {expandedSection === 'sites' ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </div>
                <p className="text-[13.5px] text-zinc-400 mt-1">
                  Manage what Intent-Guard monitors.
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={settings.guardedSitesEnabled}
                id="toggle-guarded-sites"
                onClick={() =>
                  onUpdateSettings({
                    guardedSitesEnabled: !settings.guardedSitesEnabled,
                  })
                }
                className="w-13 h-7.5 rounded-full relative transition-colors duration-200 focus:outline-hidden p-0.5 shrink-0"
                style={{
                  backgroundColor: settings.guardedSitesEnabled
                    ? theme.primary
                    : '#2e2e34',
                }}
              >
                <span
                  className={`block w-6.5 h-6.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                    settings.guardedSitesEnabled ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Expandable Sites Manager */}
            {expandedSection === 'sites' && (
              <div className="mt-5 pt-4 border-t border-zinc-800/80 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-medium pb-1">
                  <span>ACTIVE RULES ({settings.sites.filter((s) => s.enabled).length} ACTIVE)</span>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="text-xs flex items-center gap-1 hover:text-white transition-colors"
                    style={{ color: theme.primary }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Website</span>
                  </button>
                </div>

                {showAddForm && (
                  <form
                    onSubmit={handleAddNewSite}
                    className="p-3 bg-[#111113] rounded-xl border border-zinc-800 space-y-2 mb-3"
                  >
                    <input
                      type="text"
                      placeholder="Domain (e.g. reddit.com)"
                      value={newSiteDomain}
                      onChange={(e) => setNewSiteDomain(e.target.value)}
                      className="w-full text-xs bg-zinc-900 border border-zinc-700/80 rounded-lg px-3 py-2 text-white focus:outline-hidden focus:border-zinc-500"
                    />
                    <input
                      type="text"
                      placeholder="Display Name (optional)"
                      value={newSiteName}
                      onChange={(e) => setNewSiteName(e.target.value)}
                      className="w-full text-xs bg-zinc-900 border border-zinc-700/80 rounded-lg px-3 py-2 text-white focus:outline-hidden focus:border-zinc-500"
                    />
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="text-xs px-2.5 py-1 text-zinc-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-xs px-3 py-1 rounded-md font-medium text-zinc-950"
                        style={{ backgroundColor: theme.primary }}
                      >
                        Add Site
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {settings.sites.map((site) => (
                    <div
                      key={site.id}
                      className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-[#1a1a1d] hover:bg-[#202024] transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Globe className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <div className="truncate">
                          <p className="text-[13px] text-zinc-200 font-medium truncate">
                            {site.name}
                          </p>
                          <p className="text-[11px] text-zinc-500 truncate">
                            {site.domain}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onToggleSite(site.id)}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                            site.enabled ? 'bg-emerald-600/80' : 'bg-zinc-700'
                          }`}
                        >
                          <span
                            className={`block w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform ${
                              site.enabled ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => onDeleteSite(site.id)}
                          className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                          aria-label="Remove site"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Quiet hours */}
          <div className="p-6 transition-colors">
            <div className="flex items-center justify-between gap-4">
              <div
                className="flex-1 cursor-pointer select-none"
                onClick={() =>
                  setExpandedSection(expandedSection === 'quiet' ? null : 'quiet')
                }
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-[17px] font-editorial text-zinc-100 leading-snug">
                    Quiet hours
                  </h3>
                  {expandedSection === 'quiet' ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </div>
                <p className="text-[13.5px] text-zinc-400 mt-1">
                  Pause notifications and monitoring.
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={settings.quietHoursEnabled}
                id="toggle-quiet-hours"
                onClick={() =>
                  onUpdateSettings({
                    quietHoursEnabled: !settings.quietHoursEnabled,
                  })
                }
                className="w-13 h-7.5 rounded-full relative transition-colors duration-200 focus:outline-hidden p-0.5 shrink-0"
                style={{
                  backgroundColor: settings.quietHoursEnabled
                    ? theme.primary
                    : '#2e2e34',
                }}
              >
                <span
                  className={`block w-6.5 h-6.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                    settings.quietHoursEnabled ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Expandable Quiet Hours Window */}
            {expandedSection === 'quiet' && (
              <div className="mt-4 pt-4 border-t border-zinc-800/80 animate-in fade-in duration-200">
                <p className="text-xs text-zinc-400 mb-3">
                  During quiet hours, mindfulness prompts are paused so you can browse freely.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-400 font-medium block mb-1">
                      START TIME
                    </label>
                    <input
                      type="time"
                      value={settings.quietHoursStart}
                      onChange={(e) =>
                        onUpdateSettings({ quietHoursStart: e.target.value })
                      }
                      className="w-full bg-[#1b1b1f] border border-zinc-700/80 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 font-medium block mb-1">
                      END TIME
                    </label>
                    <input
                      type="time"
                      value={settings.quietHoursEnd}
                      onChange={(e) =>
                        onUpdateSettings({ quietHoursEnd: e.target.value })
                      }
                      className="w-full bg-[#1b1b1f] border border-zinc-700/80 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Accent color */}
          <div className="p-6 transition-colors">
            <div className="flex items-center justify-between gap-4">
              <div
                className="flex-1 cursor-pointer select-none"
                onClick={() =>
                  setExpandedSection(expandedSection === 'colors' ? null : 'colors')
                }
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-[17px] font-editorial text-zinc-100 leading-snug">
                    Accent color
                  </h3>
                  {expandedSection === 'colors' ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </div>
                <p className="text-[13.5px] text-zinc-400 mt-1">
                  Customize the app's appearance.
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={true}
                id="toggle-accent-color"
                onClick={() =>
                  setExpandedSection(expandedSection === 'colors' ? null : 'colors')
                }
                className="w-13 h-7.5 rounded-full relative transition-colors duration-200 focus:outline-hidden p-0.5 shrink-0"
                style={{
                  backgroundColor: theme.primary,
                }}
              >
                <span className="block w-6.5 h-6.5 rounded-full bg-white shadow-md transform transition-transform duration-200 translate-x-5.5" />
              </button>
            </div>

            {/* Expandable Palette Selector */}
            {expandedSection === 'colors' && (
              <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-3 animate-in fade-in duration-200">
                <span className="text-xs text-zinc-400 font-medium block mb-2">
                  SELECT MINDFUL PALETTE
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {(Object.keys(ACCENT_THEMES) as AccentColor[]).map((cKey) => {
                    const cTheme = ACCENT_THEMES[cKey];
                    const isSelected = settings.accentColor === cKey;
                    return (
                      <button
                        key={cKey}
                        onClick={() => onUpdateSettings({ accentColor: cKey })}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#222228] border-zinc-500 shadow-xs'
                            : 'bg-[#1a1a1d] border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full shrink-0 border border-white/20"
                          style={{ backgroundColor: cTheme.primary }}
                        />
                        <span className="text-xs text-zinc-200 font-medium truncate">
                          {cTheme.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sound & Chimes Toggle */}
          <div className="p-6 transition-colors flex items-center justify-between">
            <div>
              <h3 className="text-[17px] font-editorial text-zinc-100 leading-snug">
                Mindful Chime
              </h3>
              <p className="text-[13.5px] text-zinc-400 mt-1">
                Play acoustic Tibetan bell upon intention unlock.
              </p>
            </div>
            <button
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`p-2.5 rounded-full border transition-colors ${
                settings.soundEnabled
                  ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500'
              }`}
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4" style={{ color: theme.primary }} />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer variant="full" />
    </div>
  );
};
