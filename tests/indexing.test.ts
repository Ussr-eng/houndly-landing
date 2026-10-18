import { describe, expect, it } from 'vitest';
import { parseAllowIndexing, robotsTxt } from '../src/config/indexing';

describe('parseAllowIndexing', () => {
  it.each([undefined, '', 'false', '0', '1', 'yes', 'on'])('treats %s as off', (value) => {
    expect(parseAllowIndexing(value)).toBe(false);
  });

  it.each(['true', 'TRUE', ' true '])('treats %s as on', (value) => {
    expect(parseAllowIndexing(value)).toBe(true);
  });
});

describe('robotsTxt', () => {
  const sitemapUrl = 'https://example.com/sitemap-index.xml';

  it('disallows all crawling and omits the sitemap while indexing is off', () => {
    expect(robotsTxt({ allowIndexing: false, sitemapUrl })).toBe('User-agent: *\nDisallow: /\n');
  });

  it('allows crawling and lists the sitemap while indexing is on', () => {
    expect(robotsTxt({ allowIndexing: true, sitemapUrl })).toBe(
      `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`,
    );
  });
});
