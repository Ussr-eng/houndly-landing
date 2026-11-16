import type { Locale } from './config';
import { en, type UiStrings } from './en';
import { de } from './de';

const strings: Record<Locale, UiStrings> = { en, de };

export function t(locale: Locale): UiStrings {
  return strings[locale];
}

/** Replace {name} placeholders. Unknown placeholders are left as they are. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, key: string) =>
    key in values ? String(values[key]) : m,
  );
}
