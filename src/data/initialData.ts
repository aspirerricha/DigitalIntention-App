import { FlowItem, GuardedSite, AppSettings } from '../types';

export const INITIAL_FLOW_ITEMS: FlowItem[] = [
  {
    id: 'flow-1',
    title: 'Deep Work Session',
    subtitle: '2 hours ago',
    timeDelta: '+ 45m',
    type: 'session',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
  },
  {
    id: 'flow-2',
    title: 'Redirected from Social Media',
    subtitle: 'Yesterday',
    timeDelta: '+ 20m',
    type: 'redirect',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
  },
  {
    id: 'flow-3',
    title: 'Reading Articles',
    subtitle: 'Yesterday',
    timeDelta: '+ 30m',
    type: 'session',
    timestamp: Date.now() - 28 * 60 * 60 * 1000,
  },
];

export const INITIAL_GUARDED_SITES: GuardedSite[] = [
  { id: 'site-1', name: 'Instagram', domain: 'instagram.com', enabled: true, category: 'social' },
  { id: 'site-2', name: 'X / Twitter', domain: 'x.com', enabled: true, category: 'social' },
  { id: 'site-3', name: 'YouTube', domain: 'youtube.com', enabled: true, category: 'video' },
  { id: 'site-4', name: 'Reddit', domain: 'reddit.com', enabled: true, category: 'social' },
  { id: 'site-5', name: 'TikTok', domain: 'tiktok.com', enabled: true, category: 'video' },
  { id: 'site-6', name: 'LinkedIn Feed', domain: 'linkedin.com/feed', enabled: false, category: 'social' },
  { id: 'site-7', name: 'Twitch', domain: 'twitch.tv', enabled: false, category: 'video' },
];

export const INITIAL_SETTINGS: AppSettings = {
  guardedSitesEnabled: true,
  quietHoursEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00',
  accentColor: 'sage',
  soundEnabled: true,
  sites: INITIAL_GUARDED_SITES,
};
