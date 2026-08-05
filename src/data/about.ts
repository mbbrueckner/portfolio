import portrait from '../assets/portrait.webp';

import type { ContentImage, Localized } from './types';

export interface AboutStat {
  id: string;
  label: Localized;
  value: Localized;
}

// Draft - rewrite this in your own words.
export const aboutBio: Localized = {
  de: 'Ich studiere Informatik in Jena und will eigentlich immer wissen, wie etwas eine Ebene tiefer funktioniert. Deshalb schreibe ich Dinge lieber selbst, als eine fertige Bibliothek einzubinden — einen Tsunami-Löser, der im Browser läuft, neuronale Netze in C++, einen API-Client für die Bahn. Die Projekte, die mir am meisten Spaß machen, entstehen aus eigenen Problemen: Aeolus zum Beispiel, weil ich vor der Ausfahrt wissen wollte, ob sich die Runde bei dem Wetter überhaupt lohnt.',
  en: 'I study computer science in Jena, and I usually want to know how something works one layer further down. That is why I would rather write things myself than pull in a finished library — a tsunami solver that runs in the browser, neural networks in C++, an API client for Deutsche Bahn. The projects I enjoy most come out of my own problems: Aeolus, for instance, because I wanted to know whether a ride was worth it in that weather.',
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
