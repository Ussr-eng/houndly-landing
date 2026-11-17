// Pages are built once per locale from one template under src/pages/[...locale]/: English at
// the root (no prefix), every other built locale under /<locale>/.
import { builtLocales, defaultLocale, isLocale, type Locale } from './config';

export interface LocalePath {
  params: { locale: string | undefined };
  props: { locale: Locale };
}

/** getStaticPaths for a page that exists in every built locale. */
export function localeStaticPaths(): LocalePath[] {
  return builtLocales.map((locale) => ({
    params: { locale: locale === defaultLocale ? undefined : locale },
    props: { locale },
  }));
}

/** The locale of the page being rendered, from Astro's URL-based currentLocale. */
export function pageLocale(current: string | undefined): Locale {
  return current && isLocale(current) ? current : defaultLocale;
}
