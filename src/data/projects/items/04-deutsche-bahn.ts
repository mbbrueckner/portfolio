import type { Project } from '../types';

const project: Project = {
  id: 'deutsche-bahn',
  title: 'deutsche-bahn',
  year: '2026',
  url: 'https://pypi.org/project/deutsche-bahn-py/',
  stack: ['Python', 'uv'],
  tags: {
    de: 'API-Client',
    en: 'API Client',
  },
  description: {
    de: 'Eine Python-Bibliothek für die APIs der Deutschen Bahn, veröffentlicht auf PyPI. Unterstützt derzeit die Timetables-API und die StaDa-Stationsdaten-API.',
    en: 'A Python library for the Deutsche Bahn APIs, published on PyPI. Currently supports the Timetables API and the StaDa station data API.',
  },
};

export default project;
