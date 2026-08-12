import type { Project } from '../types';

const project: Project = {
  id: 'axon',
  title: 'Axon',
  year: '2026',
  url: 'https://github.com/mbbrueckner/axon',
  stack: ['C++', 'CMake'],
  tags: {
    de: 'Neuronale Netze',
    en: 'Neural Networks',
  },
  description: {
    de: 'In Arbeit. Eine Bibliothek für neuronale Netze, von Grund auf in C++ geschrieben. Parallelisierung über OpenMP und Metal ist geplant.',
    en: 'Work in progress. A neural network library written from scratch in C++. Parallelisation via OpenMP and Metal is planned.',
  },
};

export default project;
