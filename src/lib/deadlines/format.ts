// Deterministic date formatting (no Intl): identical output on the server and in every browser,
// so the server-rendered example hydrates without mismatches.

import type { DateTime } from 'luxon';

import type { Locale } from '../../i18n/config';

interface DateWords {
  weekdays: readonly string[];
  months: readonly string[];
  monthsLong: readonly string[];
  /** Day number as written before a month name: "2" in English, "2." in German. */
  day: (n: number) => string;
}

const WORDS: Record<Locale, DateWords> = {
  en: {
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    monthsLong: [
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
    ],
    day: (n) => String(n),
  },
  de: {
    weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    monthsLong: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ],
    day: (n) => `${n}.`,
  },
  ru: {
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    months: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    monthsLong: [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ],
    day: (n) => String(n),
  },
};

const pad = (n: number) => String(n).padStart(2, '0');

function offsetLabel(minutes: number): string {
  if (minutes === 0) return 'UTC';
  const sign = minutes > 0 ? '+' : '−';
  const abs = Math.abs(minutes);
  return `UTC${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}

/** "Fri 2 Oct 2026, 11:00 (UTC+02:00)" in `zone` ("Fr 2. Okt 2026, …" in German). */
export function formatZoned(dt: DateTime, zone: string, locale: Locale = 'en'): string {
  const z = dt.setZone(zone);
  const w = WORDS[locale];
  return `${w.weekdays[z.weekday - 1]} ${w.day(z.day)} ${w.months[z.month - 1]} ${z.year}, ${pad(z.hour)}:${pad(z.minute)} (${offsetLabel(z.offset)})`;
}

/** "2026-10-02 09:00 UTC" */
export function formatUtc(dt: DateTime): string {
  const u = dt.toUTC();
  return `${u.year}-${pad(u.month)}-${pad(u.day)} ${pad(u.hour)}:${pad(u.minute)} UTC`;
}

/** "1 October 2026, 09:00 UTC" */
export function formatLongUtc(dt: DateTime, locale: Locale = 'en'): string {
  const u = dt.toUTC();
  const w = WORDS[locale];
  return `${w.day(u.day)} ${w.monthsLong[u.month - 1]} ${u.year}, ${pad(u.hour)}:${pad(u.minute)} UTC`;
}
