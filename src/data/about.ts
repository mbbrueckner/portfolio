import portrait from '../assets/portrait.webp';

import type { ContentImage, Localized } from './types';

export interface AboutStat {
  id: string;
  label: Localized;
  value: Localized;
}

// Draft - rewrite this in your own words.
export const aboutBio: Localized = {
  de: 'Informatikstudent in Jena, seit 2024. Mich interessiert, was unter der Oberfläche passiert: numerische Verfahren, systemnahe Programmierung und die Frage, wie man beides schnell bekommt. Am liebsten baue ich Dinge von Grund auf, statt eine fertige Bibliothek einzubinden. Ein Tsunami-Löser, der im Browser läuft, neuronale Netze in C++, kleine Werkzeuge für Probleme, die ich selbst habe.',
  en: 'Computer science student in Jena, since 2024. I care about what happens beneath the surface: numerical methods, systems programming, and how to make both fast. I would rather build something from the ground up than pull in a finished library. A tsunami solver that runs in the browser, neural networks in C++, small tools for problems I run into myself.',
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
