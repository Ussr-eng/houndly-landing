// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { PLACEHOLDER_SITE_URL } from './src/config/site.ts';

const site = (process.env.PUBLIC_SITE_URL || PLACEHOLDER_SITE_URL).replace(/\/+$/, '');

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith('/404'),
      // Turns on hreflang in the sitemap once a second locale is added.
      i18n: { defaultLocale: 'en', locales: { en: 'en' } },
    }),
  ],
});
