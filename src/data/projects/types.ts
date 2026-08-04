import type { SupportedLanguage } from '../../i18n';

export type Localized = Record<SupportedLanguage, string>;

export interface Project {
  id: string;
  order: number;
  title: string;
  year: string;
  url: string;
  stack: readonly string[];
  tags: Localized;
  description: Localized;
}
