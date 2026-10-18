// Global indexing switch. Off until launch (L5): every page is noindex and robots.txt disallows all.
// Pure helpers only; the env value is read in site.ts and scripts/check-dist.ts.

export function parseAllowIndexing(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === 'true';
}

export function robotsTxt(options: { allowIndexing: boolean; sitemapUrl: string }): string {
  if (!options.allowIndexing) return 'User-agent: *\nDisallow: /\n';
  return `User-agent: *\nAllow: /\n\nSitemap: ${options.sitemapUrl}\n`;
}
