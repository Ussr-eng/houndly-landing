// <input type="datetime-local"> values ("YYYY-MM-DDTHH:mm") ↔ contract instants, read on the
// wall clock of the display zone. Gap and ambiguous local times resolve "earlier", the same
// conservative rule the deadline computation uses.

import { DateTime } from 'luxon';
import { formatInstant, parseInstant } from '../deadlines/instant';
import { resolveWallClock, type WallClockKind } from '../deadlines/zoned';

const LOCAL = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/;

export function instantToLocalInput(instant: string, zone: string): string {
  return parseInstant(instant).setZone(zone).toFormat("yyyy-MM-dd'T'HH:mm");
}

export function localInputToInstant(
  value: string,
  zone: string,
): { instant: string; kind: WallClockKind } | null {
  const m = LOCAL.exec(value);
  if (!m) return null;
  const [year, month, day, hour, minute, second] = m.slice(1).map((v) => Number(v ?? 0)) as [
    number,
    number,
    number,
    number,
    number,
    number,
  ];
  if (!DateTime.utc(year, month, day, hour, minute, second).isValid) return null;
  try {
    const { instant, kind } = resolveWallClock({ year, month, day, hour, minute, second }, zone);
    return { instant: formatInstant(instant), kind };
  } catch {
    return null;
  }
}

/** Current time, rounded down to the minute (earlier = conservative). */
export function nowInstant(nowMs: number): string {
  return formatInstant(DateTime.fromMillis(nowMs, { zone: 'utc' }).startOf('minute'));
}
