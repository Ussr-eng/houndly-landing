// Global indexing switch. Off until launch (L5): every page is noindex and robots.txt disallows all.
// Pure helpers only; the env value is read in site.ts and scripts/check-dist.ts.

export function parseAllowIndexing(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === 'true';
}

export function robotsTxt(options: { allowIndexing: boolean; sitemapUrl: string }): string {
  if (!options.allowIndexing) return 'User-agent: *\nDisallow: /\n';
  return `User-agent: *\nAllow: /\n\nSitemap: ${options.sitemapUrl}\n`;
}

/**
 * Pages that are noindex regardless of the global switch (status pages after forms, 404).
 * Used by the pages themselves, the sitemap filter and scripts/check-dist.ts.
 */
export const NOINDEX_PATHS = [
  '/404/',
  '/incident-kit/check-email/',
  '/incident-kit/confirmed/',
  '/pricing/thanks/',
  '/pricing/confirmed/',
  '/form-error/invalid/',
  '/form-error/verification/',
  '/form-error/unavailable/',
] as const;

export function isNoindexByDesign(path: string): boolean {
  return (NOINDEX_PATHS as readonly string[]).includes(path);
}
