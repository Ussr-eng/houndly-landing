import type { Locale } from './config';
import { en, type UiStrings } from './en';

const strings: Record<Locale, UiStrings> = { en };

export function t(locale: Locale): UiStrings {
  return strings[locale];
}
