export interface SocialLink {
  id: string;
  // Platform names are brand names and stay untranslated.
  label: string;
  url: string;
}

export const contactEmail = 'mikabenbrueckner@icloud.com';

export const socialLinks = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/mbbrueckner' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mika-brueckner',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/mikab3n/',
  },
] as const satisfies readonly SocialLink[];
