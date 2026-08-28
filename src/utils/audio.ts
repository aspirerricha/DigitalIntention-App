import { AccentColor, AccentColorConfig } from '../types';

export const ACCENT_THEMES: Record<AccentColor, AccentColorConfig> = {
  sage: {
    id: 'sage',
    name: 'Sage Green (Default)',
    primary: '#8aa89b',
    dark: '#6e8e81',
    light: '#a8c2b6',
    bgTint: 'rgba(138, 168, 155, 0.15)',
    textDark: '#121e18',
  },
  eucalyptus: {
    id: 'eucalyptus',
    name: 'Eucalyptus',
    primary: '#769e94',
    dark: '#587e74',
    light: '#96bcba',
    bgTint: 'rgba(118, 158, 148, 0.15)',
    textDark: '#0e1d1a',
  },
  matcha: {
    id: 'matcha',
    name: 'Matcha Moss',
    primary: '#9ba885',
    dark: '#7e8c67',
    light: '#b6c2a2',
    bgTint: 'rgba(155, 168, 133, 0.15)',
    textDark: '#1a1f10',
  },
  sand: {
    id: 'sand',
    name: 'Warm Clay & Sand',
    primary: '#c2a88e',
    dark: '#9e846b',
    light: '#dbcaa9',
    bgTint: 'rgba(194, 168, 142, 0.15)',
    textDark: '#241a12',
  },
  lavender: {
    id: 'lavender',
    name: 'Calm Twilight',
    primary: '#9b9ec8',
    dark: '#7b7ea8',
    light: '#b7bae2',
    bgTint: 'rgba(155, 158, 200, 0.15)',
    textDark: '#171827',
  },
  slate: {
    id: 'slate',
    name: 'Nordic Slate',
    primary: '#88a2b5',
    dark: '#698396',
    light: '#a6bfd1',
    bgTint: 'rgba(136, 162, 181, 0.15)',
    textDark: '#101a22',
  },
};

export function playMindfulChime(type: 'unlock' | 'redirect' | 'click' = 'unlock') {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'unlock') {
      // Gentle dual-tone Tibetan bell harmonic
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(528, now); // Love/miracle tone 528Hz
      osc2.frequency.setValueAtTime(1056, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.8);
      osc2.stop(now + 1.8);
    } else if (type === 'redirect') {
      // Deep grounding calming tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, now); // 432 Hz natural frequency
      osc.frequency.exponentialRampToValueAtTime(324, now + 0.9);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.15, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.5);
    } else {
      // Soft haptic tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch {
    // Ignore audio context errors if blocked by browser policy
  }
}
