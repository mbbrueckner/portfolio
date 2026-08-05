import type { Project } from '../types';

// To add a screenshot, drop the file in `src/assets/projects/` and import it:
//   import cover from '../../../assets/projects/riptide.webp';
// then set:
//   image: { src: cover, width: 1600, height: 1000, alt: { de: '...', en: '...' } },
const project: Project = {
  id: 'riptide',
  order: 1,
  title: 'Riptide',
  year: '2026',
  url: 'https://squadcommit.github.io/Riptide/',
  stack: ['C++', 'WebAssembly', 'WebGL2', 'React'],
  tags: {
    de: 'Tsunami-Simulation',
    en: 'Tsunami Simulation',
  },
  description: {
    de: 'Interaktive Tsunami-Simulation im Browser: Der Finite-Volumen-Löser (FWave) läuft als WebAssembly auf pthreads, das Rendering übernimmt WebGL2, die Oberfläche React. Subduktionszone auf der Weltkarte wählen, ein Erdbeben mit echter USGS-Slab2-Bruchgeometrie setzen und die Welle live über GEBCO-Bathymetrie laufen sehen.',
    en: 'Interactive tsunami simulation in the browser: the finite-volume solver (FWave) runs as WebAssembly on pthreads, rendering is WebGL2, the UI is React. Pick a subduction zone on the world map, place an earthquake with real USGS Slab2 fault geometry, and watch the wave propagate live over GEBCO bathymetry.',
  },
};

export default project;
