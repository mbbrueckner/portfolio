import type { Project } from '../types';

const project: Project = {
  id: 'project-3',
  order: 3,
  title: 'Project Three',
  year: '2025',
  url: 'https://example.com',
  stack: ['Tool', 'Library', 'Language'],
  tags: {
    de: 'Kategorie',
    en: 'Category',
  },
  description: {
    de: 'Platzhalterbeschreibung. Hier folgt eine ausführlichere Beschreibung des Projekts.',
    en: 'Placeholder description. A longer project description goes here.',
  },
};

export default project;
