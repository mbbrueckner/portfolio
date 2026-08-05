import portrait from '../assets/portrait.webp';

import type { ContentImage, Localized } from './types';

export interface AboutStat {
  id: string;
  label: Localized;
  value: Localized;
}

export const aboutBio: Localized = {
  de: 'Ich studiere Informatik in Jena und will meistens wissen, wie etwas eine Ebene tiefer funktioniert. Deshalb schreibe ich Dinge lieber selbst, als eine fertige Bibliothek einzubinden: Es dauert länger, aber danach weiß ich, warum etwas schnell ist oder eben nicht. Besonders reizen mich Aufgaben, bei denen Rechenzeit und Genauigkeit gegeneinander stehen. Den Ausgleich dazu finde ich im Sport, wo dieselbe Geduld zählt und der Fortschritt sich schlechter wegdiskutieren lässt.',
  en: 'I study computer science in Jena, and I usually want to know how something works one layer further down. That is why I would rather write things myself than pull in a finished library: it takes longer, but afterwards I know why something is fast, or why it is not. I am drawn to problems where compute time and accuracy pull against each other. Sport is my counterweight, where the same patience counts and progress is harder to argue away.',
};

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
