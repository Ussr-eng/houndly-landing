// Brand and site identity. "Houndly" is a working codename: rename it here only.

import { parseAllowIndexing } from './indexing';

/**
 * Fallback origin when PUBLIC_SITE_URL is not set. Deliberately invalid (.invalid TLD):
 * scripts/check-dist.ts refuses an indexable build that still uses it.
 * The real value will be https://<project>.pages.dev, set as PUBLIC_SITE_URL.
 */
export const PLACEHOLDER_SITE_URL = 'https://site-url-not-set.invalid';

export const site = {
  name: 'Houndly',
  tagline: 'EU incident reporting deadlines, calculated',
  defaultDescription:
    'Calculate CRA, NIS2 and GDPR incident reporting deadlines in your time zone. Free, no sign-up.',
  defaultOgImage: '/og/default.png',
  ogImageAlt: 'Houndly — EU incident reporting deadlines',
  twitterHandle: null as string | null,
  // Shown in Article JSON-LD on guides.
  author: { name: 'Dmytro Slobodin', url: null as string | null },
  analytics: {
    // Provider is swappable: see src/lib/analytics.ts and src/components/Analytics.astro.
    // TODO(verify): Umami Cloud EU hosting and free-tier limits.
    provider: 'umami',
    scriptSrc: 'https://cloud.umami.is/script.js',
  },
} as const;

export function siteUrl(): string {
  const fromEnv = import.meta.env?.PUBLIC_SITE_URL as string | undefined;
  return (fromEnv || PLACEHOLDER_SITE_URL).replace(/\/+$/, '');
}

/** PUBLIC_ALLOW_INDEXING=true turns indexing on (launch, L5). Anything else means off. */
export function allowIndexing(): boolean {
  return parseAllowIndexing(import.meta.env?.PUBLIC_ALLOW_INDEXING as string | undefined);
}
