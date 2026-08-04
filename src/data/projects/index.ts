import type { Project } from './types';

// Every file in `items/` is picked up at build time. Adding a project means
// adding a file there - no registration anywhere else.
const modules = import.meta.glob<{ default: Project }>('./items/*.ts', {
  eager: true,
});

export const projects: readonly Project[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, module]) => module.default)
  .sort((a, b) => a.order - b.order);

export type { Project, Localized } from './types';
