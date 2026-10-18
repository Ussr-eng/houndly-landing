import { describe, expect, it } from 'vitest';
import { isLocale, localizedPath, normalizePath } from '../src/i18n/config';
import { en } from '../src/i18n/en';

describe('normalizePath', () => {
  it.each([
    ['/', '/'],
    ['', '/'],
    ['/Pricing', '/pricing/'],
    ['guides/x', '/guides/x/'],
    ['/guides//x/', '/guides/x/'],
    ['/guides/x/?a=1#b', '/guides/x/'],
  ])('%s -> %s', (input, expected) => {
    expect(normalizePath(input)).toBe(expected);
  });
});

describe('localizedPath', () => {
  it('has no prefix for English', () => {
    expect(localizedPath('en', '/pricing/')).toBe('/pricing/');
    expect(localizedPath('en', '/')).toBe('/');
  });

  it('prefixes other locales', () => {
    expect(localizedPath('de', '/pricing/')).toBe('/de/pricing/');
    expect(localizedPath('de', '/')).toBe('/de/');
  });
});

describe('locales', () => {
  it('recognises configured locales only', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('de')).toBe(false);
  });

  it('has no empty UI strings', () => {
    const walk = (o: object): string[] =>
      Object.values(o).flatMap((v) => (typeof v === 'string' ? [v] : walk(v as object)));
    expect(walk(en).every((s) => s.trim().length > 0)).toBe(true);
  });
});
