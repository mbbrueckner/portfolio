import { useTranslation } from 'react-i18next';

import { supportedLanguages, type SupportedLanguage } from '../i18n';

const FALLBACK: SupportedLanguage = 'de';

// Resolves i18next's current language to one of the languages content files
// actually provide, so localized fields can be indexed safely.
export function useLocale(): SupportedLanguage {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;
  return supportedLanguages.includes(current as SupportedLanguage)
    ? (current as SupportedLanguage)
    : FALLBACK;
}
