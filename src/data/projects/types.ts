import type { ContentImage, Localized } from '../types';

export interface Project {
  id: string;
  title: string;
  year: string;
  url: string;
  stack: readonly string[];
  tags: Localized;
  description: Localized;
  image?: ContentImage;
}
