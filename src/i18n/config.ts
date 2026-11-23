// Locale routing. English has no prefix; other locales live under /<locale>/.
//
// Adding a language (see README, "Languages"):
//   1. add it to `locales`, `htmlLang`, `ogLocale` and astro.config.mjs;
//   2. add src/i18n/<locale>.ts with every UI string (typed as UiStrings, so a missing one fails
//      the build) and register it in src/i18n/index.ts;
//   3. translate the guides into src/content/guides/<locale>/;
//   4. add it to `builtLocales`: every page under src/pages/[...locale]/ is then built for it.
// A locale in `hiddenLocales` is built for the team only: noindex, left out of hreflang, the
// sitemap, the language switcher on other pages and the browser-language hint.

export const locales = ['en', 'de', 'fr', 'pl', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Locales every page is built in. */
export const builtLocales: readonly Locale[] = ['en', 'de', 'fr', 'pl', 'ru'];

/** Built, but not for the public. Russian is the owner's own reading copy (2026-11-17). */
export const hiddenLocales: readonly Locale[] = ['ru'];

/** Built and public: these get hreflang, the sitemap, the switcher and the hint. */
export const publicLocales: readonly Locale[] = builtLocales.filter(
  (l) => !hiddenLocales.includes(l),
);

export const htmlLang: Record<Locale, string> = {
  en: 'en',
  de: 'de',
  fr: 'fr',
  pl: 'pl',
  ru: 'ru',
};
export const ogLocale: Record<Locale, string> = {
  en: 'en_GB',
  de: 'de_DE',
  fr: 'fr_FR',
  pl: 'pl_PL',
  ru: 'ru_RU',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Normalise a site path: leading slash, trailing slash, lowercase, no query or hash. */
export function normalizePath(path: string): string {
  const clean = (path.split(/[?#]/)[0] ?? '').toLowerCase().replace(/\/{2,}/g, '/');
  const withLead = clean.startsWith('/') ? clean : `/${clean}`;
  return withLead.endsWith('/') ? withLead : `${withLead}/`;
}

/** Path for `path` (locale-neutral, e.g. "/guides/x/") in `locale`. */
export function localizedPath(
  locale: string,
  path: string,
  options: { defaultLocale?: string } = {},
): string {
  const base = normalizePath(path);
  const def = options.defaultLocale ?? defaultLocale;
  return locale === def ? base : normalizePath(`/${locale}${base}`);
}

/** The locale of a path and the path without its locale prefix: "/de/faq/" → de, "/faq/". */
export function splitLocale(path: string): { locale: Locale; path: string } {
  const m = /^\/([a-z]{2})(\/.*)$/.exec(path);
  if (m && m[1] !== defaultLocale && isLocale(m[1] ?? '')) {
    return { locale: m[1] as Locale, path: m[2] ?? '/' };
  }
  return { locale: defaultLocale, path };
}

export interface Alternate {
  hreflang: string;
  href: string;
}

/**
 * hreflang alternates for a locale-neutral path. `available` lists the locales the page
 * exists in; with fewer than two the page carries no hreflang tags.
 */
export function alternates(
  path: string,
  origin: string,
  available: readonly string[] = [defaultLocale],
  def: string = defaultLocale,
): Alternate[] {
  if (available.length < 2) return [];
  const list = available.map((locale) => ({
    hreflang: locale,
    href: origin + localizedPath(locale, path, { defaultLocale: def }),
  }));
  list.push({
    hreflang: 'x-default',
    href: origin + localizedPath(def, path, { defaultLocale: def }),
  });
  return list;
}
