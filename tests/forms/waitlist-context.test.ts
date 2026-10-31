import { describe, expect, it } from 'vitest';
import { interestFromQuery, sourceFromReferrer } from '../../src/scripts/waitlist-context';

describe('interestFromQuery', () => {
  it('reads a known interest', () => {
    expect(interestFromQuery('?interest=oncall')).toBe('oncall');
    expect(interestFromQuery('?plan=team&interest=cra')).toBe('cra');
  });

  it('ignores missing and unknown values', () => {
    expect(interestFromQuery('')).toBeNull();
    expect(interestFromQuery('?interest=logs')).toBeNull();
  });
});

describe('sourceFromReferrer', () => {
  const origin = 'https://within24.app';

  it('keeps the path of a page on this site', () => {
    expect(sourceFromReferrer('https://within24.app/on-call/', origin)).toBe('/on-call/');
    expect(sourceFromReferrer('https://within24.app/guides/opsgenie-migration/?x=1', origin)).toBe(
      '/guides/opsgenie-migration/',
    );
  });

  it('drops other sites, empty and odd referrers', () => {
    expect(sourceFromReferrer('https://example.com/on-call/', origin)).toBeNull();
    expect(sourceFromReferrer('', origin)).toBeNull();
    expect(sourceFromReferrer('not a url', origin)).toBeNull();
    expect(sourceFromReferrer('https://within24.app/Guides/', origin)).toBeNull();
  });
});
