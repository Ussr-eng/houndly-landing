import type { APIRoute } from 'astro';
import { robotsTxt } from '../config/indexing';
import { allowIndexing } from '../config/site';

export const GET: APIRoute = ({ site }) =>
  new Response(
    robotsTxt({
      allowIndexing: allowIndexing(),
      sitemapUrl: new URL('sitemap-index.xml', site).href,
    }),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
