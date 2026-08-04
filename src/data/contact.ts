export interface SocialLink {
  id: string;
  // Platform names are brand names and stay untranslated.
  label: string;
  url: string;
}

// Placeholder contact details. Replace with the real address and profile URLs.
export const contactEmail = 'mail@example.com';

export const socialLinks: readonly SocialLink[] = [
  { id: 'github', label: 'GitHub', url: 'https://example.com' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://example.com' },
  { id: 'instagram', label: 'Instagram', url: 'https://example.com' },
];
