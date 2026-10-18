import { describe, expect, it } from 'vitest';
import { buildIcs, escapeText, foldLine, icsDate, shortHash } from '../../src/lib/calculator/ics';

const encoder = new TextEncoder();

describe('ics helpers', () => {
  it('formats UTC dates', () => {
    expect(icsDate('2026-10-02T09:00:00Z')).toBe('20261002T090000Z');
  });

  it('escapes TEXT values', () => {
    expect(escapeText('a\\b;c,d\ne')).toBe('a\\\\b\\;c\\,d\\ne');
  });

  it('folds lines at 75 octets without splitting UTF-8 characters', () => {
    const line = 'DESCRIPTION:' + '€'.repeat(60);
    const folded = foldLine(line).split('\r\n');
    expect(folded.length).toBeGreaterThan(1);
    for (const part of folded) expect(encoder.encode(part).length).toBeLessThanOrEqual(75);
    expect(folded.slice(1).every((p) => p.startsWith(' '))).toBe(true);
    expect(folded.map((p, i) => (i ? p.slice(1) : p)).join('')).toBe(line);
  });

  it('leaves short lines alone', () => {
    expect(foldLine('VERSION:2.0')).toBe('VERSION:2.0');
  });

  it('hashes deterministically', () => {
    expect(shortHash('abc')).toBe(shortHash('abc'));
    expect(shortHash('abc')).not.toBe(shortHash('abd'));
    expect(shortHash('abc')).toMatch(/^[0-9a-f]{8}$/);
  });
});

describe('buildIcs', () => {
  const ics = buildIcs(
    [
      {
        uid: 'nis2.x.20261002T090000Z.abcd1234@example.com',
        at: '2026-10-02T09:00:00Z',
        summary: 'Deadline: NIS2 early warning, significant incident',
        description: 'Due 2026-10-02 09:00 UTC.\nNot legal advice.',
        url: 'https://example.com/?aware=2026-10-01T09:00Z&rules=v1',
      },
    ],
    { now: '2026-10-01T10:00:00Z', prodId: '-//Houndly//Deadline calculator//EN' },
  );
  const lines = ics.split('\r\n');

  it('uses CRLF line endings and ends with one', () => {
    expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true);
    expect(ics.replace(/\r\n/g, '')).not.toMatch(/[\r\n]/);
  });

  it('has the calendar header', () => {
    expect(lines.slice(0, 5)).toEqual([
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Houndly//Deadline calculator//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
    ]);
  });

  it('writes a point-in-time event in UTC with escaped text', () => {
    expect(lines).toContain('DTSTAMP:20261001T100000Z');
    expect(lines).toContain('DTSTART:20261002T090000Z');
    expect(lines).toContain('DTEND:20261002T090000Z');
    expect(lines).toContain('SUMMARY:Deadline: NIS2 early warning\\, significant incident');
    expect(ics).toContain('DESCRIPTION:Due 2026-10-02 09:00 UTC.\\nNot legal advice.');
  });

  it('adds display alarms 2 hours and 30 minutes before', () => {
    expect(lines.filter((l) => l.startsWith('TRIGGER:'))).toEqual([
      'TRIGGER:-PT2H',
      'TRIGGER:-PT30M',
    ]);
    expect(lines.filter((l) => l === 'ACTION:DISPLAY')).toHaveLength(2);
  });

  it('balances BEGIN/END blocks', () => {
    for (const block of ['VCALENDAR', 'VEVENT', 'VALARM']) {
      expect(lines.filter((l) => l === `BEGIN:${block}`).length).toBe(
        lines.filter((l) => l === `END:${block}`).length,
      );
    }
  });
});
