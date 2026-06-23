import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import de from './de.json';
import en from './en.json';

export const defaultNS = 'translation';

export const resources = {
  de: { translation: de },
  en: { translation: en },
} as const;

export const supportedLanguages = ['de', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

i18n.use(initReactI18next).init({
  resources,
  lng: 'de',
  fallbackLng: 'en',
  supportedLngs: supportedLanguages,
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
