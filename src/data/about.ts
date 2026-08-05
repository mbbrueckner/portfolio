import type { ContentImage, Localized } from './types';

export interface AboutStat {
  id: string;
  label: Localized;
  value: Localized;
}

// Draft - rewrite this in your own words.
export const aboutBio: Localized = {
  de: 'Informatikstudent in Jena. Ich baue Dinge am liebsten von Grund auf: numerische Simulationen, Bibliotheken und Werkzeuge, die ich selbst brauche.',
  en: 'Computer science student in Jena. I like building things from the ground up: numerical simulations, libraries, and tools I need myself.',
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
    value: {
      de: 'B.Sc. Informatik, seit 2024',
      en: 'BSc Computer Science, since 2024',
    },
  },
  {
    id: 'stack',
    label: { de: 'Stack', en: 'Stack' },
    value: { de: 'C/C++, Python, Java', en: 'C/C++, Python, Java' },
  },
  {
    id: 'focus',
    label: { de: 'Fokus', en: 'Focus' },
    value: {
      de: 'ML/AI, Scientific Computing, Systemnahe Programmierung',
      en: 'ML/AI, scientific computing, systems programming',
    },
  },
  {
    id: 'location',
    label: { de: 'Standort', en: 'Location' },
    value: { de: 'Jena', en: 'Jena' },
  },
];
