// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { PLACEHOLDER_SITE_URL } from './src/config/site.ts';
import { isNoindexByDesign } from './src/config/indexing.ts';

const site = (process.env.PUBLIC_SITE_URL || PLACEHOLDER_SITE_URL).replace(/\/+$/, '');

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  // Inline CSS (about 10 KB): one less render-blocking request on mobile.
  build: { format: 'directory', inlineStylesheets: 'always' },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !isNoindexByDesign(new URL(page).pathname),
      // Turns on hreflang in the sitemap once a second locale is added.
      i18n: { defaultLocale: 'en', locales: { en: 'en' } },
    }),
  ],
});
