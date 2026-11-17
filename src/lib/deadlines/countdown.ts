// Time left until a deadline. Elapsed-time display only: deadlines themselves come from
// computeDeadlines.

import type { Locale } from '../../i18n/config';

export interface Remaining {
  overdue: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function remaining(dueMs: number, nowMs: number): Remaining {
  const diff = dueMs - nowMs;
  const total = Math.floor(Math.abs(diff) / 1000);
  return {
    overdue: diff <= 0,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

interface Units {
  d: string;
  h: string;
  min: string;
  s: string;
  day: [string, string];
  hour: [string, string];
  minute: [string, string];
  lessThanMinute: string;
}

const UNITS: Record<Locale, Units> = {
  en: {
    d: 'd',
    h: 'h',
    min: 'min',
    s: 's',
    day: ['day', 'days'],
    hour: ['hour', 'hours'],
    minute: ['minute', 'minutes'],
    lessThanMinute: 'less than a minute',
  },
  de: {
    d: 'T',
    h: 'Std',
    min: 'Min',
    s: 'Sek',
    day: ['Tag', 'Tage'],
    hour: ['Stunde', 'Stunden'],
    minute: ['Minute', 'Minuten'],
    lessThanMinute: 'weniger als eine Minute',
  },
};

/** Compact visual form: "1 d 23 h 04 min 05 s", "4 min 05 s". */
export function formatCountdown(r: Remaining, locale: Locale = 'en'): string {
  const u = UNITS[locale];
  const tail = `${pad(r.minutes)} ${u.min} ${pad(r.seconds)} ${u.s}`;
  if (r.days) return `${r.days} ${u.d} ${r.hours} ${u.h} ${tail}`;
  if (r.hours) return `${r.hours} ${u.h} ${tail}`;
  return `${r.minutes} ${u.min} ${pad(r.seconds)} ${u.s}`;
}

const unit = (n: number, [one, many]: [string, string]) => `${n} ${n === 1 ? one : many}`;

/** Coarse spoken form for screen readers, minute precision: "1 day 23 hours", "4 minutes". */
export function formatCountdownSpoken(r: Remaining, locale: Locale = 'en'): string {
  const u = UNITS[locale];
  if (r.days) return `${unit(r.days, u.day)} ${unit(r.hours, u.hour)}`;
  if (r.hours) return `${unit(r.hours, u.hour)} ${unit(r.minutes, u.minute)}`;
  if (r.minutes) return unit(r.minutes, u.minute);
  return u.lessThanMinute;
}
