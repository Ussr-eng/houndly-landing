// Brand and site identity. Change the brand here only.

import { parseAllowIndexing } from './indexing.ts';

/**
 * Fallback origin when PUBLIC_SITE_URL is not set. Deliberately invalid (.invalid TLD):
 * scripts/check-dist.ts refuses an indexable build that still uses it.
 * The real value will be https://<project>.pages.dev, set as PUBLIC_SITE_URL.
 */
export const PLACEHOLDER_SITE_URL = 'https://site-url-not-set.invalid';

export const site = {
  name: 'Within24',
  tagline: 'EU incident reporting deadlines, calculated',
  defaultDescription:
    'Calculate CRA, NIS2 and GDPR incident reporting deadlines in your time zone. Free, no sign-up.',
  defaultOgImage: '/og/default.png',
  ogImageAlt: 'Within24: we take care of your CRA reporting',
  twitterHandle: null as string | null,
  // Shown in Article JSON-LD on guides.
  author: { name: 'Within24', url: null as string | null, type: 'Organization' as const },
  // Legal notice (/legal/). TODO(verify) before taking real payments: whether a postal
  // address and further details are required.
  operator: {
    // The company's legal name and country follow later; until then the legal notice uses
    // a general statement (en.legal.companyGeneral).
    name: null as string | null,
    country: null as string | null,
    email: 'hello@within24.app' as string | null,
  },
  analytics: {
    // Provider is swappable: see src/lib/analytics.ts and src/components/Analytics.astro.
    // TODO(verify): Umami Cloud EU hosting and free-tier limits.
    provider: 'umami',
    scriptSrc: 'https://cloud.umami.is/script.js',
    // Hosts the script sends data to, for the CSP connect-src.
    // TODO(verify): Umami Cloud's collect endpoint host (check the dashboard snippet).
    connectSrc: ['https://cloud.umami.is'],
  },
  turnstile: {
    scriptSrc: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
    origin: 'https://challenges.cloudflare.com',
  },
} as const;

export function siteUrl(): string {
  const fromEnv = import.meta.env?.PUBLIC_SITE_URL as string | undefined;
  return (fromEnv || PLACEHOLDER_SITE_URL).replace(/\/+$/, '');
}

/**
 * Origin of the backend API (houndly-backend), e.g. https://api.within24.app. The CRA check
 * chat appears on every page only when PUBLIC_API_URL is set; unset means no chat.
 */
export function apiOrigin(): string | null {
  const fromEnv = (import.meta.env?.PUBLIC_API_URL as string | undefined)?.trim();
  return fromEnv ? new URL(fromEnv).origin : null;
}

/** PUBLIC_ALLOW_INDEXING=true turns indexing on (launch, L5). Anything else means off. */
export function allowIndexing(): boolean {
  return parseAllowIndexing(import.meta.env?.PUBLIC_ALLOW_INDEXING as string | undefined);
}
