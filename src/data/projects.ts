export interface Project {
  id: string;
  title: string;
  year: string;
  url?: string;
}

// Placeholder entries. Replace title/year/url with real projects;
// translatable tags live in the i18n `projects.items.<id>` namespace.
export const projects = [
  { id: 'project-1', title: 'Project One', year: '2024' },
  { id: 'project-2', title: 'Project Two', year: '2025' },
  { id: 'project-3', title: 'Project Three', year: '2025' },
] as const satisfies readonly Project[];
