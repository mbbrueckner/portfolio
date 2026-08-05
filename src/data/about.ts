import portrait from '../assets/portrait.webp';

import type { ContentImage, Localized } from './types';

export interface AboutStat {
  id: string;
  label: Localized;
  value: Localized;
}

// One entry per paragraph.
export const aboutBio: readonly Localized[] = [
  {
    de: 'Ich studiere Informatik in Jena und kann selten etwas einfach so hinnehmen, ohne zu wissen, wie es eine Ebene tiefer funktioniert. Besonders reizen mich Probleme, bei denen man Rechenzeit gegen Genauigkeit abwägen muss – dieser ständige Kompromiss zwischen ‚schnell genug‘ und ‚genau genug‘ fasziniert mich einfach.',
    en: 'I study computer science in Jena, and I can rarely take something at face value without knowing how it works one layer further down. I am drawn to problems where you have to weigh compute time against accuracy – that constant compromise between ‘fast enough’ and ‘accurate enough’ is what fascinates me.',
  },
  {
    de: 'Den Ausgleich dazu finde ich draußen: auf dem Rad, zu Fuß, einfach in Bewegung und ohne Bildschirm.',
    en: 'My counterweight to that is being outdoors: on the bike, on foot, simply moving and away from a screen.',
  },
];

export const aboutPortrait: ContentImage | null = {
  src: portrait,
  width: 700,
  height: 907,
  alt: {
    de: 'Porträt von Mika Brückner',
    en: 'Portrait of Mika Brückner',
  },
};

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
