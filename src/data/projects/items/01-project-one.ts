import type { Project } from '../types';

const project: Project = {
  id: 'project-1',
  order: 1,
  title: 'Project One',
  year: '2024',
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
