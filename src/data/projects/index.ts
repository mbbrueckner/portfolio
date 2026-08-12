import type { Project } from './types';

// Every file in `items/` is picked up at build time. Adding a project means
// adding a file there - no registration anywhere else. The numeric filename
// prefix decides the display order.
const modules = import.meta.glob<{ default: Project }>('./items/*.ts', {
  eager: true,
});

export const projects: readonly Project[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, module]) => module.default);

export type { Project } from './types';
