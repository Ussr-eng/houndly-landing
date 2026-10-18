import { alternates, normalizePath, type Alternate } from '../../i18n/config';

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

export interface SeoInput {
  title: string;
  description: string;
  /** Site-relative path of the page, e.g. "/guides/nis2-early-warning/". */
  path: string;
  origin: string;
  ogImage: string;
  ogImageAlt: string;
  ogType?: 'website' | 'article';
  ogLocale: string;
  siteName: string;
  noindex?: boolean;
  locales?: readonly string[];
  defaultLocale?: string;
  /** Locale-neutral path used to build hreflang alternates. Defaults to `path`. */
  neutralPath?: string;
}

export interface Seo {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogImageAlt: string;
  ogType: 'website' | 'article';
  ogLocale: string;
  siteName: string;
  robots: string | null;
  alternates: Alternate[];
}

export class SeoError extends Error {}

export function absoluteUrl(origin: string, pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return origin.replace(/\/+$/, '') + (pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`);
}

/** Validates and resolves page metadata. Throws at build time on rule violations. */
export function buildSeo(input: SeoInput): Seo {
  const title = input.title.trim();
  const description = input.description.trim();
  if (!title) throw new SeoError('SEO: title is empty');
  if (title.length > TITLE_MAX)
    throw new SeoError(`SEO: title is ${title.length} chars (max ${TITLE_MAX}): "${title}"`);
  if (!description) throw new SeoError(`SEO: description is empty for "${title}"`);
  if (description.length > DESCRIPTION_MAX)
    throw new SeoError(
      `SEO: description is ${description.length} chars (max ${DESCRIPTION_MAX}) for "${title}"`,
    );
  if (normalizePath(input.path) !== input.path)
    throw new SeoError(`SEO: path must be lowercase with a trailing slash: "${input.path}"`);

  const origin = input.origin.replace(/\/+$/, '');
  return {
    title,
    description,
    canonical: origin + input.path,
    ogImage: absoluteUrl(origin, input.ogImage),
    ogImageAlt: input.ogImageAlt,
    ogType: input.ogType ?? 'website',
    ogLocale: input.ogLocale,
    siteName: input.siteName,
    robots: input.noindex ? 'noindex, nofollow' : null,
    alternates: input.noindex
      ? []
      : alternates(input.neutralPath ?? input.path, origin, input.locales, input.defaultLocale),
  };
}
