import { describe, expect, it } from 'vitest';
import { decodeQuery, encodeQuery } from '../../src/lib/calculator/query';
import { EXAMPLE_STATE, type CalculatorState } from '../../src/lib/calculator/state';

const full: CalculatorState = {
  awareAt: '2026-10-01T09:00:00Z',
  country: 'DE',
  events: ['nis2.significant_incident', 'gdpr.personal_data_breach'],
  fixAvailableAt: '2026-10-05T12:00:00Z',
  notificationSubmittedAt: '2026-10-03T15:00:30Z',
};

describe('encodeQuery', () => {
  it('produces a short readable query without the display zone', () => {
    expect(encodeQuery(full, 'v1')).toBe(
      '?aware=2026-10-01T09:00Z&country=de&events=nis2.significant_incident,gdpr.personal_data_breach' +
        '&fix=2026-10-05T12:00Z&sub=2026-10-03T15:00:30Z&rules=v1',
    );
  });

  it('omits empty optional fields', () => {
    expect(encodeQuery(EXAMPLE_STATE, 'v1')).toBe(
      '?aware=2026-10-01T09:00Z&country=be&events=cra.actively_exploited_vulnerability&rules=v1',
    );
  });
});

describe('decodeQuery', () => {
  it('round-trips', () => {
    const decoded = decodeQuery(encodeQuery(full, 'v1'));
    expect(decoded.values).toEqual(full);
    expect(decoded.invalid).toEqual([]);
    expect(decoded.rulesVersion).toBe('v1');
  });

  it('reads percent-encoded values from URLSearchParams too', () => {
    const decoded = decodeQuery(
      '?aware=2026-10-01T09%3A00Z&events=gdpr.personal_data_breach%2Cnis2.significant_incident',
    );
    expect(decoded.values.awareAt).toBe('2026-10-01T09:00:00Z');
    expect(decoded.values.events).toEqual([
      'gdpr.personal_data_breach',
      'nis2.significant_incident',
    ]);
  });

  it('returns nothing for an empty query', () => {
    expect(decodeQuery('')).toEqual({ values: {}, invalid: [], rulesVersion: null });
  });

  it('skips unreadable values one by one', () => {
    const decoded = decodeQuery(
      '?aware=yesterday&country=us&events=nis2.significant_incident,foo.bar&fix=2026-02-30T10:00Z&rules=latest',
    );
    expect(decoded.values).toEqual({ events: ['nis2.significant_incident'] });
    expect(decoded.invalid.sort()).toEqual(['aware', 'country', 'events', 'fix']);
    expect(decoded.rulesVersion).toBeNull();
  });

  it('keeps known but unsupported pairs so the calculator can report them', () => {
    expect(decodeQuery('?events=cra.personal_data_breach').values.events).toEqual([
      'cra.personal_data_breach',
    ]);
  });

  it('deduplicates events and accepts upper-case country codes', () => {
    const decoded = decodeQuery(
      '?events=gdpr.personal_data_breach,gdpr.personal_data_breach&country=PT',
    );
    expect(decoded.values).toEqual({ events: ['gdpr.personal_data_breach'], country: 'PT' });
  });
});
