import type { Project } from '../types';

const project: Project = {
  id: 'aeolus',
  order: 4,
  title: 'Aeolus',
  year: '2026',
  url: 'https://aeolus.mbrueckner.dev/',
  stack: ['Python', 'FastAPI', 'React', 'Leaflet'],
  tags: {
    de: 'Radwetter',
    en: 'Cycling Weather',
  },
  description: {
    de: 'Wetter entlang einer Radroute, zu den Zeiten, an denen man wirklich dort ist. Aus einer GPX-Datei wird eine Karte mit der Vorhersage darüber: Regen als Feld, Wind als Pfeile, die Route selbst eingefärbt danach, wo der Wind von vorne kommt. Ein Slider spielt den ganzen Tag in Viertelstundenschritten ab, mit Startzeit und Durchschnittstempo auch die eigene Position darin. Geprüft an 60 aufgezeichneten Fahrten mit Leistungsmesser, bei denen das Rad selbst als Windsensor dient: Ist der Luftwiderstand des Fahrers bekannt, lässt sich die Leistungsbilanz nach der tatsächlich erfahrenen Anströmung auflösen.',
    en: 'Weather along a cycling route, at the times you will actually be there. A GPX file turns into a map with the forecast laid over it: rain as a field, wind as arrows, the route itself coloured by where the wind will hit you. A slider plays the whole day in quarter-hour steps, and with a departure time and average speed it also marks where you would be. Validated against 60 recorded rides with a power meter, using the bike itself as a wind sensor: with the rider\'s drag coefficients known, the power balance solves for the air speed actually experienced.',
  },
};

export default project;
