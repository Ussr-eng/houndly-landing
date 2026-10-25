import { DateTime } from 'luxon';

export type MilestoneStatus = { kind: 'done' } | { kind: 'upcoming'; months: number };

/**
 * Status of a calendar date ("YYYY-MM-DD", start of day in Brussels) relative to `now`.
 * Upcoming dates report whole calendar months left, rounded down.
 */
export function milestoneStatus(date: string, now: DateTime): MilestoneStatus {
  const at = DateTime.fromISO(date, { zone: 'Europe/Brussels' });
  if (!at.isValid) throw new TypeError(`Invalid date: "${date}"`);
  if (now >= at) return { kind: 'done' };
  return { kind: 'upcoming', months: Math.floor(at.diff(now, 'months').months) };
}
