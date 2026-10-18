// Time left until a deadline. Elapsed-time display only: deadlines themselves come from
// computeDeadlines.

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

/** Compact visual form: "1 d 23 h 04 min 05 s", "4 min 05 s". */
export function formatCountdown(r: Remaining): string {
  if (r.days) return `${r.days} d ${r.hours} h ${pad(r.minutes)} min ${pad(r.seconds)} s`;
  if (r.hours) return `${r.hours} h ${pad(r.minutes)} min ${pad(r.seconds)} s`;
  return `${r.minutes} min ${pad(r.seconds)} s`;
}

const unit = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** Coarse spoken form for screen readers, minute precision: "1 day 23 hours", "4 minutes". */
export function formatCountdownSpoken(r: Remaining): string {
  if (r.days) return `${unit(r.days, 'day')} ${unit(r.hours, 'hour')}`;
  if (r.hours) return `${unit(r.hours, 'hour')} ${unit(r.minutes, 'minute')}`;
  if (r.minutes) return unit(r.minutes, 'minute');
  return 'less than a minute';
}
