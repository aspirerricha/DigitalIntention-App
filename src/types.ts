export type ScreenType = 'dashboard' | 'prompt' | 'confirm' | 'pause' | 'settings';

export interface FlowItem {
  id: string;
  title: string;
  subtitle: string;
  timeDelta: string;
  type: 'session' | 'redirect';
  timestamp: number;
}

export interface GuardedSite {
  id: string;
  name: string;
  domain: string;
  enabled: boolean;
  icon?: string;
  category: 'social' | 'video' | 'news' | 'shopping' | 'other';
}

export type AccentColor = 'sage' | 'eucalyptus' | 'matcha' | 'sand' | 'lavender' | 'slate';

export interface AccentColorConfig {
  id: AccentColor;
  name: string;
  primary: string; // e.g. #8aa89b
  dark: string;
  light: string;
  bgTint: string;
  textDark: string;
}

export interface AppSettings {
  guardedSitesEnabled: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  accentColor: AccentColor;
  soundEnabled: boolean;
  sites: GuardedSite[];
}

export interface ActiveSession {
  intention: string;
  siteName: string;
  startTime: number;
  durationMinutes: number;
}
