import { describe, expect, it } from 'vitest';
import { guideSchema } from '../src/content/guide-schema';
import { publishedGuides } from '../src/lib/guides';

// Placeholder data only: no legal facts.
const fixture = {
  title: 'Fixture guide',
  description: 'A fixture used by tests.',
  slug: 'fixture-guide',
  regimes: ['NIS2'],
  datePublished: '2026-10-01',
  dateModified: '2026-10-10',
  lastVerified: null,
  sources: [{ title: 'Example', url: 'https://eur-lex.europa.eu/', publisher: 'EUR-Lex' }],
  related: ['other-one', 'other-two'],
};

describe('guide schema', () => {
  it('accepts a valid guide and applies defaults', () => {
    const g = guideSchema.parse(fixture);
    expect(g.locale).toBe('en');
    expect(g.draft).toBe(false);
    expect(g.datePublished).toBeInstanceOf(Date);
    expect(g.lastVerified).toBeNull();
  });

  it.each([
    ['title over 60 chars', { title: 'a'.repeat(61) }],
    ['description over 155 chars', { description: 'a'.repeat(156) }],
    ['uppercase slug', { slug: 'Fixture' }],
    ['slug with spaces', { slug: 'fixture guide' }],
    ['unknown regime', { regimes: ['DORA'] }],
    ['no regimes', { regimes: [] }],
    ['no sources', { sources: [] }],
    ['http source', { sources: [{ title: 'x', url: 'http://example.com/', publisher: 'Other' }] }],
    ['one related guide', { related: ['other-one'] }],
    ['four related guides', { related: ['a', 'b', 'c', 'd'] }],
    ['related to itself', { related: ['fixture-guide', 'other-one'] }],
    ['dateModified before datePublished', { dateModified: '2026-09-01' }],
    ['missing lastVerified', { lastVerified: undefined }],
  ])('rejects %s', (_name, patch) => {
    expect(guideSchema.safeParse({ ...fixture, ...patch }).success).toBe(false);
  });
});

describe('publishedGuides', () => {
  const g = (slug: string, related: string[], draft = false) => ({
    id: slug,
    data: { slug, related, draft },
  });

  it('drops drafts', () => {
    const out = publishedGuides([
      g('a', ['b', 'c']),
      g('b', ['a', 'c']),
      g('c', ['a', 'b']),
      g('d', ['a', 'b'], true),
    ]);
    expect(out.map((x) => x.id)).toEqual(['a', 'b', 'c']);
  });

  it('throws when a related guide is missing or a draft', () => {
    expect(() =>
      publishedGuides([g('a', ['b', 'c']), g('b', ['a', 'c']), g('c', ['a', 'b'], true)]),
    ).toThrow(/missing related guides: c/);
  });
});
