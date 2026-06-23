export interface AboutStat {
  id: string;
  value: string;
}

// Placeholder stats. Replace values with real data; labels are translated
// in the i18n `about.stats.<id>` namespace.
export const aboutStats = [
  { id: 'studies', value: 'Placeholder' },
  { id: 'stack', value: 'Placeholder' },
  { id: 'pb', value: 'Placeholder' },
  { id: 'location', value: 'Placeholder' },
] as const satisfies readonly AboutStat[];
