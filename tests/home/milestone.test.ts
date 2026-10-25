import { describe, expect, it } from 'vitest';
import { DateTime } from 'luxon';
import { milestoneStatus } from '../../src/lib/milestone';

const at = (iso: string) => DateTime.fromISO(iso, { zone: 'utc' });

describe('milestoneStatus', () => {
  it('is done from the start of the day in Brussels', () => {
    // 11 Sep 2026 00:00 in Brussels is 10 Sep 22:00 UTC (CEST).
    expect(milestoneStatus('2026-09-11', at('2026-09-10T22:00:00Z'))).toEqual({ kind: 'done' });
    expect(milestoneStatus('2026-09-11', at('2026-09-10T21:59:59Z'))).toEqual({
      kind: 'upcoming',
      months: 0,
    });
  });

  it('counts whole months left, rounded down', () => {
    expect(milestoneStatus('2027-12-11', at('2026-10-25T12:00:00Z'))).toEqual({
      kind: 'upcoming',
      months: 13,
    });
  });

  it('rejects an invalid date', () => {
    expect(() => milestoneStatus('2027-02-30', at('2026-10-25T12:00:00Z'))).toThrow(TypeError);
  });
});
