// Internal links on a page in another language point to that language's pages: on /de/...
// a link to "/pricing/" becomes "/de/pricing/". Runs over the built HTML (src/middleware.ts),
// so templates, UI strings and guide Markdown can all write plain English paths.
//
// Left alone: links that already carry a locale prefix, links with hreflang (the language
// switcher and hint point at a specific language), links marked data-keep-locale, and paths
// that are not pages (no trailing slash: /api/..., files).

import { defaultLocale, locales, type Locale } from '../i18n/config';

const prefixed = new RegExp(`^/(${locales.filter((l) => l !== defaultLocale).join('|')})/`);

/** "/pricing/?plan=team#x" → "/de/pricing/?plan=team#x"; null when the link stays as it is. */
export function localizeHref(href: string, locale: Locale): string | null {
  if (locale === defaultLocale) return null;
  if (!href.startsWith('/') || href.startsWith('//')) return null;
  const pathname = href.split(/[?#]/)[0] ?? '';
  if (!pathname.endsWith('/') || prefixed.test(pathname)) return null;
  return `/${locale}${href}`;
}

const A_TAG = /<a\b[^>]*>/gi;
const HREF = /(\shref=)("([^"]*)"|'([^']*)')/i;

/** Rewrites internal <a href> in a whole HTML document for `locale`. */
export function localizeLinks(html: string, locale: Locale): string {
  if (locale === defaultLocale) return html;
  return html.replace(A_TAG, (tag) => {
    if (/\shreflang=/i.test(tag) || /\sdata-keep-locale\b/i.test(tag)) return tag;
    return tag.replace(HREF, (all, attr: string, _q, dq?: string, sq?: string) => {
      const href = dq ?? sq ?? '';
      const next = localizeHref(href, locale);
      return next ? `${attr}"${next}"` : all;
    });
  });
}
