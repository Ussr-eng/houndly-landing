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
  /** Word forms; `plural` picks one for a number. */
  day: string[];
  hour: string[];
  minute: string[];
  plural: (n: number) => number;
  lessThanMinute: string;
}

const twoForms = (n: number) => (n === 1 ? 0 : 1);
/** Russian: 1 день, 2 дня, 5 дней; 21 день, 22 дня, 11 дней. */
const russianForms = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 0;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 1;
  return 2;
};

const UNITS: Record<Locale, Units> = {
  en: {
    d: 'd',
    h: 'h',
    min: 'min',
    s: 's',
    day: ['day', 'days'],
    hour: ['hour', 'hours'],
    minute: ['minute', 'minutes'],
    plural: twoForms,
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
    plural: twoForms,
    lessThanMinute: 'weniger als eine Minute',
  },
  ru: {
    d: 'дн',
    h: 'ч',
    min: 'мин',
    s: 'с',
    day: ['день', 'дня', 'дней'],
    hour: ['час', 'часа', 'часов'],
    minute: ['минута', 'минуты', 'минут'],
    plural: russianForms,
    lessThanMinute: 'меньше минуты',
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

/** Coarse spoken form for screen readers, minute precision: "1 day 23 hours", "4 minutes". */
export function formatCountdownSpoken(r: Remaining, locale: Locale = 'en'): string {
  const u = UNITS[locale];
  const unit = (n: number, forms: string[]) => `${n} ${forms[u.plural(n)] ?? ''}`;
  if (r.days) return `${unit(r.days, u.day)} ${unit(r.hours, u.hour)}`;
  if (r.hours) return `${unit(r.hours, u.hour)} ${unit(r.minutes, u.minute)}`;
  if (r.minutes) return unit(r.minutes, u.minute);
  return u.lessThanMinute;
}
