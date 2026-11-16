import { describe, expect, it } from 'vitest';
import { primaryLanguage, suggestLocale } from '../src/scripts/language';

const base = {
  browser: ['de-DE', 'en'],
  current: 'en',
  available: ['de'],
  stored: null,
  dismissed: false,
};

describe('primaryLanguage', () => {
  it.each([
    ['de-AT', 'de'],
    ['DE', 'de'],
    ['en', 'en'],
    ['', ''],
  ])('%s -> %s', (tag, expected) => {
    expect(primaryLanguage(tag)).toBe(expected);
  });
});

describe('suggestLocale', () => {
  it('offers the translation in the browser language', () => {
    expect(suggestLocale(base)).toBe('de');
  });

  it('treats Austrian and Swiss German as German', () => {
    expect(suggestLocale({ ...base, browser: ['de-CH'] })).toBe('de');
  });

  it('stays quiet when the browser prefers the language of this page', () => {
    expect(suggestLocale({ ...base, browser: ['en-GB', 'de'] })).toBeNull();
  });

  it('stays quiet once the person chose a language or closed the hint', () => {
    expect(suggestLocale({ ...base, stored: 'en' })).toBeNull();
    expect(suggestLocale({ ...base, dismissed: true })).toBeNull();
  });

  it('stays quiet when the page has no version in the browser languages', () => {
    expect(suggestLocale({ ...base, browser: ['fr-FR', 'it'] })).toBeNull();
    expect(suggestLocale({ ...base, available: [] })).toBeNull();
  });

  it('offers English on a German page to an English browser', () => {
    expect(suggestLocale({ ...base, browser: ['en-US'], current: 'de', available: ['en'] })).toBe(
      'en',
    );
  });
});
