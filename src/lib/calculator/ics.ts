// RFC 5545 calendar file for computed deadlines. Times are UTC (no VTIMEZONE needed);
// each event is a point in time (DTSTART = DTEND) with display alarms 2 h and 30 min before.

export interface IcsEvent {
  uid: string;
  /** Contract instant "YYYY-MM-DDTHH:MM:SSZ". */
  at: string;
  summary: string;
  description: string;
  url?: string;
}

export const ICS_ALARMS = ['-PT2H', '-PT30M'] as const;

/** "2026-10-02T09:00:00Z" → "20261002T090000Z" */
export function icsDate(instant: string): string {
  return instant.replace(/[-:]/g, '');
}

/** Escape a TEXT value (RFC 5545 §3.3.11). */
export function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n');
}

const encoder = new TextEncoder();

/** Fold a content line at 75 octets without splitting a UTF-8 character (RFC 5545 §3.1). */
export function foldLine(line: string): string {
  const out: string[] = [];
  let current = '';
  let size = 0;
  let limit = 75;
  for (const ch of line) {
    const bytes = encoder.encode(ch).length;
    if (size + bytes > limit) {
      out.push(current);
      current = '';
      size = 0;
      limit = 74; // continuation lines start with a space
    }
    current += ch;
    size += bytes;
  }
  out.push(current);
  return out.join('\r\n ');
}

export function buildIcs(events: IcsEvent[], options: { now: string; prodId: string }): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${options.prodId}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];
  for (const e of events) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${e.uid}`,
      `DTSTAMP:${icsDate(options.now)}`,
      `DTSTART:${icsDate(e.at)}`,
      `DTEND:${icsDate(e.at)}`,
      `SUMMARY:${escapeText(e.summary)}`,
      `DESCRIPTION:${escapeText(e.description)}`,
      ...(e.url ? [`URL:${e.url}`] : []),
      'TRANSP:TRANSPARENT',
    );
    for (const trigger of ICS_ALARMS) {
      lines.push(
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `DESCRIPTION:${escapeText(e.summary)}`,
        `TRIGGER:${trigger}`,
        'END:VALARM',
      );
    }
    lines.push('END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.map(foldLine).join('\r\n') + '\r\n';
}

/** Short deterministic hash (FNV-1a, 32 bit) for UIDs. Not for security. */
export function shortHash(value: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}
