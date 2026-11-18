// Build-time middleware (every page is prerendered): localizes internal links on pages that
// are not in the default language. See src/lib/i18n-links.ts.
import { defineMiddleware } from 'astro:middleware';
import { localizeLinks } from './lib/i18n-links';
import { pageLocale } from './i18n/routes';
import { defaultLocale } from './i18n/config';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const locale = pageLocale(context.currentLocale);
  if (locale === defaultLocale) return response;
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const html = await response.text();
  return new Response(localizeLinks(html, locale), {
    status: response.status,
    headers: response.headers,
  });
});
