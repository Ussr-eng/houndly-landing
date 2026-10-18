// Deterministic date formatting (no Intl): identical output on the server and in every browser,
// so the server-rendered example hydrates without mismatches.

import type { DateTime } from 'luxon';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;
const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const pad = (n: number) => String(n).padStart(2, '0');

function offsetLabel(minutes: number): string {
  if (minutes === 0) return 'UTC';
  const sign = minutes > 0 ? '+' : '−';
  const abs = Math.abs(minutes);
  return `UTC${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}

/** "Fri 2 Oct 2026, 11:00 (UTC+02:00)" in `zone`. */
export function formatZoned(dt: DateTime, zone: string): string {
  const z = dt.setZone(zone);
  return `${WEEKDAYS[z.weekday - 1]} ${z.day} ${MONTHS[z.month - 1]} ${z.year}, ${pad(z.hour)}:${pad(z.minute)} (${offsetLabel(z.offset)})`;
}

/** "2026-10-02 09:00 UTC" */
export function formatUtc(dt: DateTime): string {
  const u = dt.toUTC();
  return `${u.year}-${pad(u.month)}-${pad(u.day)} ${pad(u.hour)}:${pad(u.minute)} UTC`;
}

/** "1 October 2026, 09:00 UTC" */
export function formatLongUtc(dt: DateTime): string {
  const u = dt.toUTC();
  return `${u.day} ${MONTHS_LONG[u.month - 1]} ${u.year}, ${pad(u.hour)}:${pad(u.minute)} UTC`;
}
