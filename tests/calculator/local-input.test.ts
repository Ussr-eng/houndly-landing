import { describe, expect, it } from 'vitest';
import {
  instantToLocalInput,
  localInputToInstant,
  nowInstant,
} from '../../src/lib/calculator/local-input';

describe('local input', () => {
  it('shows an instant on the display zone wall clock', () => {
    expect(instantToLocalInput('2026-10-01T09:00:00Z', 'Europe/Brussels')).toBe('2026-10-01T11:00');
    expect(instantToLocalInput('2026-10-01T09:00:00Z', 'America/New_York')).toBe(
      '2026-10-01T05:00',
    );
  });

  it('reads a local value back as UTC', () => {
    expect(localInputToInstant('2026-10-01T11:00', 'Europe/Brussels')).toEqual({
      instant: '2026-10-01T09:00:00Z',
      kind: 'normal',
    });
  });

  it('resolves DST gaps and overlaps to the earlier instant and says so', () => {
    expect(localInputToInstant('2026-03-29T02:30', 'Europe/Brussels')).toEqual({
      instant: '2026-03-29T00:30:00Z',
      kind: 'gap',
    });
    expect(localInputToInstant('2026-10-25T02:30', 'Europe/Brussels')).toEqual({
      instant: '2026-10-25T00:30:00Z',
      kind: 'ambiguous',
    });
  });

  it.each(['', '2026-10-01', '2026-02-30T10:00', '2026-10-01T25:00', 'garbage'])(
    'rejects %j',
    (value) => {
      expect(localInputToInstant(value, 'Europe/Brussels')).toBeNull();
    },
  );

  it('rounds now down to the minute', () => {
    expect(nowInstant(Date.UTC(2026, 9, 1, 9, 0, 59, 999))).toBe('2026-10-01T09:00:00Z');
  });
});
