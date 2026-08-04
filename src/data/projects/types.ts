import type { Localized } from '../types';

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
