import { describe, expect, it } from 'vitest';
import { buildSeo, SeoError, type SeoInput } from '../src/lib/seo/build';

const base: SeoInput = {
  title: 'EU incident reporting deadline calculator',
  description: 'Calculate reporting deadlines.',
  path: '/',
  origin: 'https://example.com/',
  ogImage: '/og/default.png',
  ogImageAlt: 'alt',
  ogLocale: 'en_GB',
  siteName: 'Within24',
};

describe('buildSeo', () => {
  it('resolves canonical and OG image as absolute URLs', () => {
    const seo = buildSeo({ ...base, path: '/guides/x/' });
    expect(seo.canonical).toBe('https://example.com/guides/x/');
    expect(seo.ogImage).toBe('https://example.com/og/default.png');
    expect(seo.ogType).toBe('website');
    expect(seo.robots).toBeNull();
  });

  it('keeps an absolute OG image URL unchanged', () => {
    expect(buildSeo({ ...base, ogImage: 'https://cdn.example/x.png' }).ogImage).toBe(
      'https://cdn.example/x.png',
    );
  });

  it('accepts a 60-char title and a 155-char description', () => {
    expect(() =>
      buildSeo({ ...base, title: 'a'.repeat(60), description: 'b'.repeat(155) }),
    ).not.toThrow();
  });

  it('rejects a title over 60 chars', () => {
    expect(() => buildSeo({ ...base, title: 'a'.repeat(61) })).toThrow(SeoError);
  });

  it('rejects a description over 155 chars', () => {
    expect(() => buildSeo({ ...base, description: 'b'.repeat(156) })).toThrow(SeoError);
  });

  it('rejects empty title or description', () => {
    expect(() => buildSeo({ ...base, title: '  ' })).toThrow(SeoError);
    expect(() => buildSeo({ ...base, description: '' })).toThrow(SeoError);
  });

  it.each(['/Guides/x/', '/guides/x', 'guides/x/'])('rejects non-canonical path %s', (path) => {
    expect(() => buildSeo({ ...base, path })).toThrow(SeoError);
  });

  it('emits no hreflang with one locale', () => {
    expect(buildSeo({ ...base, locales: ['en'] }).alternates).toEqual([]);
  });

  it('emits hreflang alternates with x-default once a second locale exists', () => {
    const seo = buildSeo({
      ...base,
      path: '/guides/x/',
      locales: ['en', 'de'],
      defaultLocale: 'en',
    });
    expect(seo.alternates).toEqual([
      { hreflang: 'en', href: 'https://example.com/guides/x/' },
      { hreflang: 'de', href: 'https://example.com/de/guides/x/' },
      { hreflang: 'x-default', href: 'https://example.com/guides/x/' },
    ]);
  });

  it('marks noindex pages and drops their alternates', () => {
    const seo = buildSeo({ ...base, noindex: true, locales: ['en', 'de'] });
    expect(seo.robots).toBe('noindex, nofollow');
    expect(seo.alternates).toEqual([]);
  });
});
