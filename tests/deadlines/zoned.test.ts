import { describe, expect, it } from 'vitest';
import { formatInstant, parseInstant } from '../../src/lib/deadlines/instant';
import { addMonthsOnWallClock, isKnownZone, wallClockToUtc } from '../../src/lib/deadlines/zoned';

const wall = (s: string) => {
  const [d = '', t = ''] = s.split(' ');
  const [year, month, day] = d.split('-').map(Number) as [number, number, number];
  const [hour, minute] = t.split(':').map(Number) as [number, number];
  return { year, month, day, hour, minute, second: 0 };
};
const utc = (s: string, zone: string) => formatInstant(wallClockToUtc(wall(s), zone));
const plusMonths = (instant: string, n: number, zone: string) =>
  formatInstant(addMonthsOnWallClock(parseInstant(instant), n, zone));

describe('wallClockToUtc', () => {
  it('converts unambiguous times with the current offset', () => {
    expect(utc('2026-07-01 12:00', 'Europe/Berlin')).toBe('2026-07-01T10:00:00Z');
    expect(utc('2026-01-01 12:00', 'Europe/Berlin')).toBe('2026-01-01T11:00:00Z');
  });

  it('shifts gap times earlier (offset after the transition)', () => {
    // Berlin 2026-03-29 02:30 does not exist: +02:00 → 00:30Z.
    expect(utc('2026-03-29 02:30', 'Europe/Berlin')).toBe('2026-03-29T00:30:00Z');
    expect(utc('2026-03-08 02:30', 'America/New_York')).toBe('2026-03-08T06:30:00Z');
  });

  it('takes the earlier instant for ambiguous times', () => {
    // Berlin 2026-10-25 02:30 occurs twice: CEST (+02:00) first → 00:30Z.
    expect(utc('2026-10-25 02:30', 'Europe/Berlin')).toBe('2026-10-25T00:30:00Z');
    expect(utc('2026-11-01 01:30', 'America/New_York')).toBe('2026-11-01T05:30:00Z');
  });

  it('handles zones without DST', () => {
    expect(utc('2026-03-29 02:30', 'UTC')).toBe('2026-03-29T02:30:00Z');
  });

  it('rejects unknown zones', () => {
    expect(() => utc('2026-01-01 00:00', 'Europe/Atlantis')).toThrow(RangeError);
    expect(isKnownZone('Europe/Atlantis')).toBe(false);
    expect(isKnownZone('Europe/Brussels')).toBe(true);
  });
});

describe('addMonthsOnWallClock', () => {
  it('clamps to the last day of shorter months', () => {
    // 31 Mar 10:00 CEST → 30 Apr 10:00 CEST
    expect(plusMonths('2026-03-31T08:00:00Z', 1, 'Europe/Berlin')).toBe('2026-04-30T08:00:00Z');
    // 31 Jan 2028 (leap year) → 29 Feb
    expect(plusMonths('2028-01-31T09:00:00Z', 1, 'Europe/Berlin')).toBe('2028-02-29T09:00:00Z');
  });

  it('rolls over the year', () => {
    expect(plusMonths('2026-12-31T09:00:00Z', 1, 'Europe/Berlin')).toBe('2027-01-31T09:00:00Z');
    expect(plusMonths('2026-11-15T09:00:00Z', 14, 'Europe/Berlin')).toBe('2028-01-15T09:00:00Z');
  });

  it('uses the local date, not the UTC date', () => {
    // 2026-01-31 23:30Z is 1 Feb 00:30 in Berlin → 1 Mar 00:30 CET = 2026-02-28T23:30Z
    expect(plusMonths('2026-01-31T23:30:00Z', 1, 'Europe/Berlin')).toBe('2026-02-28T23:30:00Z');
  });

  it('keeps the wall-clock time across a DST change', () => {
    // 3 Oct 17:00 CEST → 3 Nov 17:00 CET
    expect(plusMonths('2026-10-03T15:00:00Z', 1, 'Europe/Berlin')).toBe('2026-11-03T16:00:00Z');
  });

  it('lands in a DST gap a month later and shifts earlier', () => {
    // 29 Jan 02:30 CET (01:30Z) + 2 months → 29 Mar 02:30, which does not exist in Berlin
    // → interpreted with CEST (+02:00) → 00:30Z.
    expect(plusMonths('2026-01-29T01:30:00Z', 2, 'Europe/Berlin')).toBe('2026-03-29T00:30:00Z');
  });

  it('lands in an ambiguous hour a month later and takes the earlier instant', () => {
    // 25 Sep 02:30 CEST (00:30Z) + 1 month → 25 Oct 02:30, which occurs twice → CEST → 00:30Z.
    expect(plusMonths('2026-09-25T00:30:00Z', 1, 'Europe/Berlin')).toBe('2026-10-25T00:30:00Z');
  });
});
