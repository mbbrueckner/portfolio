export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

// Placeholder contact details. Replace with the real address and profile URLs.
export const contactEmail = 'mail@example.com';

export const socialLinks = [
  { id: 'github', label: 'GitHub', url: 'https://example.com' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://example.com' },
  { id: 'instagram', label: 'Instagram', url: 'https://example.com' },
] as const satisfies readonly SocialLink[];
