import type { SupportedLanguage } from '../i18n';

export type Localized = Record<SupportedLanguage, string>;

// `width` and `height` are required: cards animate their height, and an image
// without known dimensions would resize the card mid-animation.
export interface ContentImage {
  src: string;
  width: number;
  height: number;
  alt: Localized;
}
