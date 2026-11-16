// Locale routing. English has no prefix; other locales live under /<locale>/.
// Adding a language: add it to `locales`, add src/i18n/<locale>.ts, add pages under src/pages/<locale>/.
// A locale can start with single translated pages (German has one guide): until it is listed in
// `fullSiteLocales`, its pages keep the English header, footer and links, and only pages that
// name their translations carry hreflang tags.

export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Locales in which every page exists. */
export const fullSiteLocales: readonly Locale[] = ['en'];

export const htmlLang: Record<Locale, string> = { en: 'en', de: 'de' };
export const ogLocale: Record<Locale, string> = { en: 'en_GB', de: 'de_DE' };

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

/** The locale whose pages a link from a `locale` page should point to. */
export function siteLocale(locale: Locale): Locale {
  return fullSiteLocales.includes(locale) ? locale : defaultLocale;
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
