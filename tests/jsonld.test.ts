import { describe, expect, it } from 'vitest';
import { article, breadcrumbList, serializeJsonLd, webApplication } from '../src/lib/seo/jsonld';

const articleInput = {
  headline: 'Guide',
  description: 'About it',
  url: 'https://example.com/guides/x/',
  image: 'https://example.com/og/default.png',
  datePublished: new Date('2026-10-01T00:00:00Z'),
  dateModified: new Date('2026-10-10T00:00:00Z'),
  author: { name: 'Houndly team' },
  publisher: { name: 'Houndly', url: 'https://example.com/' },
  inLanguage: 'en',
};

describe('JSON-LD builders', () => {
  it('builds WebApplication', () => {
    const ld = webApplication({
      name: 'Calc',
      url: 'https://example.com/',
      description: 'd',
      inLanguage: 'en',
    });
    expect(ld['@type']).toBe('WebApplication');
    expect(ld['@context']).toBe('https://schema.org');
  });

  it('builds Article with ISO dates and an organisation author when no URL is given', () => {
    const ld = article(articleInput);
    expect(ld['@type']).toBe('Article');
    expect(ld['datePublished']).toBe('2026-10-01T00:00:00.000Z');
    expect(ld['dateModified']).toBe('2026-10-10T00:00:00.000Z');
    expect(ld['author']).toEqual({ '@type': 'Organization', name: 'Houndly team' });
  });

  it('uses a Person author when a URL is given', () => {
    const ld = article({ ...articleInput, author: { name: 'A', url: 'https://a.example/' } });
    expect(ld['author']).toEqual({ '@type': 'Person', name: 'A', url: 'https://a.example/' });
  });

  it('rejects dateModified before datePublished', () => {
    expect(() =>
      article({ ...articleInput, dateModified: new Date('2026-09-01T00:00:00Z') }),
    ).toThrow();
  });

  it('numbers breadcrumb positions from 1', () => {
    const ld = breadcrumbList([
      { name: 'Home', url: 'https://example.com/' },
      { name: 'Guide', url: 'https://example.com/guides/x/' },
    ]);
    expect(ld['itemListElement']).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://example.com/' },
      { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://example.com/guides/x/' },
    ]);
  });

  it('serialises without a raw "<" so the script tag cannot be closed', () => {
    const out = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
    expect(out).not.toContain('<');
    expect(JSON.parse(out)).toEqual({ name: '</script><script>alert(1)</script>' });
  });
});
