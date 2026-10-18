import { DateTime } from 'luxon';

const INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
const FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";

/** Parse a contract instant ("YYYY-MM-DDTHH:MM:SSZ") to a UTC DateTime. Throws on anything else. */
export function parseInstant(value: string): DateTime<true> {
  if (!INSTANT.test(value)) throw new TypeError(`Invalid instant: "${value}"`);
  const dt = DateTime.fromISO(value, { zone: 'utc' });
  if (!dt.isValid) throw new TypeError(`Invalid instant: "${value}"`);
  return dt;
}

export function isInstant(value: string): boolean {
  try {
    parseInstant(value);
    return true;
  } catch {
    return false;
  }
}

/** Format as a contract instant, truncated to whole seconds. */
export function formatInstant(dt: DateTime): string {
  return dt.toUTC().toFormat(FORMAT);
}
