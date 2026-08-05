import type { Project } from '../types';

const project: Project = {
  id: 'aeolus',
  order: 4,
  title: 'Aeolus',
  year: '2026',
  url: 'https://github.com/mbbrueckner/aeolus',
  stack: ['Python'],
  tags: {
    de: 'Routenanalyse',
    en: 'Route Analysis',
  },
  description: {
    de: 'In Arbeit. Eine Python-Bibliothek, die GPS-Routen gegen Wettervorhersagen auswertet und die Bedingungen fürs Fahren bewertet. Aus GPX-Datei, Durchschnittsgeschwindigkeit und Startzeit holt sie Wetterdaten im 15-Minuten-Raster entlang der Strecke und liefert eine distanzgewichtete Bewertung von -1.0 (gefährlich) bis +1.0 (ideal). Eine Weboberfläche und ein regressionsbasiertes Bewertungssystem sind geplant.',
    en: 'Work in progress. A Python library that scores riding conditions by analysing GPS routes against weather forecasts. Given a GPX file, an average speed, and a departure time, it fetches weather data at 15-minute intervals along the route and returns a distance-weighted score from -1.0 (dangerous) to +1.0 (ideal). A web UI and a regression-based scoring system are planned.',
  },
};

export default project;
