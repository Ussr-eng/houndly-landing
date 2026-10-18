// Wall-clock arithmetic in an IANA zone, as specified in rules/README.md ("months" offsets).

import { DateTime, IANAZone } from 'luxon';

const DAY_MS = 24 * 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;

export function isKnownZone(zone: string): boolean {
  return IANAZone.isValidZone(zone);
}

export interface WallClock {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

/**
 * Convert a wall-clock time in `zone` to a UTC instant with disambiguation "earlier":
 * - ambiguous (fall back): the earlier of the two instants;
 * - gap (spring forward): interpret with the offset in effect after the transition,
 *   which shifts the wall-clock time earlier by the length of the gap.
 * Luxon's own resolution moves gap times forward, so it is not used here.
 */
export function wallClockToUtc(wall: WallClock, zoneName: string): DateTime<true> {
  const zone = IANAZone.create(zoneName);
  if (!zone.isValid) throw new RangeError(`Unknown time zone: "${zoneName}"`);
  // The wall-clock fields read as if they were UTC; offsets are subtracted from this.
  const asUtc = DateTime.utc(wall.year, wall.month, wall.day, wall.hour, wall.minute, wall.second);
  if (!asUtc.isValid) throw new RangeError('Invalid wall-clock time');
  const t0 = asUtc.toMillis();

  // Offsets (minutes) a day before and after cover any single transition near t0.
  const offsetBefore = zone.offset(t0 - DAY_MS);
  const offsetAfter = zone.offset(t0 + DAY_MS);
  const valid = [offsetBefore, offsetAfter]
    .map((offset) => t0 - offset * MINUTE_MS)
    .filter((t) => zone.offset(t) * MINUTE_MS === t0 - t);

  const instant = valid.length ? Math.min(...valid) : t0 - offsetAfter * MINUTE_MS;
  return DateTime.fromMillis(instant, { zone: 'utc' }) as DateTime<true>;
}

/**
 * Add calendar months on the wall clock of `zone`: keep the time of day, clamp the day to the
 * last day of the target month, convert back with disambiguation "earlier".
 */
export function addMonthsOnWallClock(
  instant: DateTime,
  months: number,
  zoneName: string,
): DateTime<true> {
  const local = instant.setZone(zoneName);
  if (!local.isValid) throw new RangeError(`Unknown time zone: "${zoneName}"`);
  const monthIndex = local.year * 12 + (local.month - 1) + months;
  const year = Math.floor(monthIndex / 12);
  const month = (monthIndex % 12) + 1;
  const daysInMonth = DateTime.utc(year, month, 1).daysInMonth ?? 28;
  return wallClockToUtc(
    {
      year,
      month,
      day: Math.min(local.day, daysInMonth),
      hour: local.hour,
      minute: local.minute,
      second: local.second,
    },
    zoneName,
  );
}
