import { describe, expect, it } from 'vitest';
import { localizeHref, localizeLinks } from '../src/lib/i18n-links';

describe('localizeHref', () => {
  it.each([
    ['/pricing/', '/de/pricing/'],
    ['/', '/de/'],
    ['/early-access/?plan=team#early-access', '/de/early-access/?plan=team#early-access'],
    ['/on-call/#rotas', '/de/on-call/#rotas'],
  ])('%s -> %s', (href, expected) => {
    expect(localizeHref(href, 'de')).toBe(expected);
  });

  it.each([
    '/de/pricing/',
    '/api/subscribe',
    '/og/default.png',
    'https://eur-lex.europa.eu/',
    '//x/',
    '#top',
    'mailto:a@b.eu',
  ])('leaves %s alone', (href) => {
    expect(localizeHref(href, 'de')).toBeNull();
  });

  it('changes nothing in English', () => {
    expect(localizeHref('/pricing/', 'en')).toBeNull();
  });
});

describe('localizeLinks', () => {
  it('rewrites page links but not language links or opted-out ones', () => {
    const html =
      '<a href="/pricing/">P</a> <a class="x" href="/guides/a/" hreflang="en">EN</a> ' +
      '<a data-keep-locale href="/cra/">C</a> <link rel="canonical" href="/faq/"> ' +
      "<a href='/faq/'>F</a>";
    expect(localizeLinks(html, 'de')).toBe(
      '<a href="/de/pricing/">P</a> <a class="x" href="/guides/a/" hreflang="en">EN</a> ' +
        '<a data-keep-locale href="/cra/">C</a> <link rel="canonical" href="/faq/"> ' +
        '<a href="/de/faq/">F</a>',
    );
  });
});
