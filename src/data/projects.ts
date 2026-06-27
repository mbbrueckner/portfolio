export interface Project {
  id: string;
  title: string;
  year: string;
  url: string;
  stack: readonly string[];
}

// Placeholder entries. Replace title/year/url/stack with real projects;
// translatable tags and descriptions live in the i18n `projects.items.<id>` namespace.
export const projects = [
  {
    id: 'project-1',
    title: 'Project One',
    year: '2024',
    url: 'https://example.com',
    stack: ['Tool', 'Library', 'Language'],
  },
  {
    id: 'project-2',
    title: 'Project Two',
    year: '2025',
    url: 'https://example.com',
    stack: ['Tool', 'Library', 'Language'],
  },
  {
    id: 'project-3',
    title: 'Project Three',
    year: '2025',
    url: 'https://example.com',
    stack: ['Tool', 'Library', 'Language'],
  },
] as const satisfies readonly Project[];
