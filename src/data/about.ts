import type { ContentImage, Localized } from './types';

export interface AboutStat {
  id: string;
  label: Localized;
  value: string;
}

// Placeholder copy. Replace the bio and the stat values with real data.
export const aboutBio: Localized = {
  de: 'Platzhaltertext. Hier folgt eine kurze Beschreibung.',
  en: 'Placeholder text. A short description goes here.',
};

// To add a portrait, drop the file in `src/assets/` and import it:
//   import portrait from '../assets/portrait.webp';
// then replace `null` with:
//   { src: portrait, width: 800, height: 1000, alt: { de: '...', en: '...' } }
export const aboutPortrait: ContentImage | null = null;

export const aboutStats: readonly AboutStat[] = [
  {
    id: 'studies',
    label: { de: 'Studium', en: 'Studies' },
    value: 'Placeholder',
  },
  {
    id: 'stack',
    label: { de: 'Stack', en: 'Stack' },
    value: 'Placeholder',
  },
  {
    id: 'pb',
    label: { de: '5k Bestzeit', en: '5k personal best' },
    value: 'Placeholder',
  },
  {
    id: 'location',
    label: { de: 'Standort', en: 'Location' },
    value: 'Placeholder',
  },
];
