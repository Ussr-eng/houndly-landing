// Language choice. Each language lives at its own URL (English unprefixed, others under
// /<locale>/), linked with hreflang so search engines show the right one; nothing redirects.
// The switcher remembers what the person picked; the hint offers this page in the browser's
// language once, unless the person already picked or dismissed it.

export const LANGUAGE_KEY = 'w24-language';
export const HINT_DISMISSED_KEY = 'w24-language-hint-dismissed';

/** Primary subtag, lowercased: "de-AT" → "de". */
export function primaryLanguage(tag: string): string {
  return (tag.split('-')[0] ?? '').trim().toLowerCase();
}

/**
 * The locale to suggest, or null. `browser` is navigator.languages in order of preference;
 * the first one this page exists in wins, and nothing is suggested when that is the current
 * page's language, or when the person already chose a language or dismissed the hint.
 */
export function suggestLocale(options: {
  browser: readonly string[];
  current: string;
  available: readonly string[];
  stored: string | null;
  dismissed: boolean;
}): string | null {
  const { browser, current, available, stored, dismissed } = options;
  if (dismissed || stored) return null;
  for (const tag of browser) {
    const lang = primaryLanguage(tag);
    if (lang === current) return null;
    if (available.includes(lang)) return lang;
  }
  return null;
}

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage blocked: the hint may show again on the next page. Nothing else depends on it.
  }
}

export function enhanceLanguage(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[data-set-language]').forEach((link) => {
    link.addEventListener('click', () => write(LANGUAGE_KEY, link.dataset['setLanguage'] ?? ''));
  });

  const hints = [...document.querySelectorAll<HTMLElement>('[data-language-hint]')];
  if (!hints.length) return;
  const current = document.documentElement.lang;
  const locale = suggestLocale({
    browser: navigator.languages?.length ? navigator.languages : [navigator.language],
    current,
    available: hints.map((h) => h.dataset['languageHint'] ?? ''),
    stored: read(LANGUAGE_KEY),
    dismissed: read(HINT_DISMISSED_KEY) === '1',
  });
  const hint = hints.find((h) => h.dataset['languageHint'] === locale);
  if (!hint) return;
  hint.hidden = false;
  hint.querySelector('[data-language-hint-close]')?.addEventListener('click', () => {
    write(HINT_DISMISSED_KEY, '1');
    hint.hidden = true;
  });
}
