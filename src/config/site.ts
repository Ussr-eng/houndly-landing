// Brand and site identity. "Houndly" is a working codename: rename it here only.

export const site = {
  name: 'Houndly',
  // TODO(decide): production domain. PUBLIC_SITE_URL overrides this at build time.
  url: 'https://houndly.pages.dev',
  tagline: 'EU incident reporting deadlines, calculated',
  defaultDescription:
    'Calculate CRA, NIS2 and GDPR incident reporting deadlines in your time zone. Free, no sign-up.',
  defaultOgImage: '/og/default.png',
  ogImageAlt: 'Houndly — EU incident reporting deadlines',
  twitterHandle: null as string | null,
  // TODO(decide): author shown in Article JSON-LD and guide bylines.
  author: { name: 'Houndly team', url: null as string | null },
  analytics: {
    // Plausible script origin; the domain to track comes from PUBLIC_ANALYTICS_DOMAIN.
    scriptSrc: 'https://plausible.io/js/script.js',
    origin: 'https://plausible.io',
  },
} as const;

export function siteUrl(): string {
  const fromEnv = import.meta.env?.PUBLIC_SITE_URL as string | undefined;
  return (fromEnv || site.url).replace(/\/+$/, '');
}
