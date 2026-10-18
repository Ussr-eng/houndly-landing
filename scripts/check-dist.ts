// Post-build audit of dist/: enforces the SEO rules from CLAUDE.md on the generated HTML.
// Run after `pnpm build`. Exits non-zero with a list of problems.

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = join(import.meta.dirname, '..', 'dist');
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;
// Same variable and parsing as src/config/indexing.ts. Run with the env used for the build;
// the robots.txt check below catches a mismatch.
const ALLOW_INDEXING = process.env.PUBLIC_ALLOW_INDEXING?.trim().toLowerCase() === 'true';
// Keep in sync with PLACEHOLDER_SITE_URL in src/config/site.ts.
const PLACEHOLDER_HOST = 'site-url-not-set.invalid';
// Pages that are noindex regardless of the global switch.
const NOINDEX_BY_DESIGN = new Set(['/404.html']);

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

function attr(tag: string, name: string): string | null {
  const m = new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(tag);
  return m ? (m[1] ?? m[2] ?? m[3] ?? '') : null;
}

function metaContent(html: string, key: 'name' | 'property', value: string): string | null {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if (attr(tag, key) === value) return attr(tag, 'content');
  }
  return null;
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function targetExists(pathname: string): boolean {
  const clean = decodeURI(pathname);
  if (clean.endsWith('/')) return existsSync(join(DIST, clean, 'index.html'));
  return existsSync(join(DIST, clean));
}

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run `pnpm build` first.');
  process.exit(1);
}

const problems: string[] = [];
const titles = new Map<string, string>();
const files = htmlFiles(DIST);

for (const file of files) {
  const page = '/' + relative(DIST, file).split(sep).join('/');
  const html = readFileSync(file, 'utf8');
  const fail = (msg: string) => problems.push(`${page}: ${msg}`);
  const isNoindex = /noindex/.test(metaContent(html, 'name', 'robots') ?? '');
  const byDesign = NOINDEX_BY_DESIGN.has(page);

  if (byDesign && !isNoindex) fail('must be noindex by design');
  else if (!byDesign && !ALLOW_INDEXING && !isNoindex)
    fail('missing noindex while PUBLIC_ALLOW_INDEXING is off');
  else if (!byDesign && ALLOW_INDEXING && isNoindex)
    fail('has noindex while PUBLIC_ALLOW_INDEXING is on');

  const h1s = html.match(/<h1\b/gi)?.length ?? 0;
  if (h1s !== 1) fail(`expected one <h1>, found ${h1s}`);

  if (!/<html\b[^>]*\slang="[a-z]{2}(-[A-Z]{2})?"/.test(html)) fail('missing <html lang>');

  const title = decode(/<title>([^<]*)<\/title>/i.exec(html)?.[1]?.trim() ?? '');
  if (!title) fail('missing <title>');
  else if (title.length > TITLE_MAX) fail(`title is ${title.length} chars: "${title}"`);
  else if (titles.has(title)) fail(`duplicate title with ${titles.get(title)}: "${title}"`);
  else titles.set(title, page);

  const description = decode(metaContent(html, 'name', 'description') ?? '');
  if (!description) fail('missing meta description');
  else if (description.length > DESCRIPTION_MAX) fail(`description is ${description.length} chars`);

  const canonicalTag = (html.match(/<link\b[^>]*>/gi) ?? []).find(
    (t) => attr(t, 'rel') === 'canonical',
  );
  const canonical = canonicalTag ? attr(canonicalTag, 'href') : null;
  if (!canonical) fail('missing canonical');
  else if (!/^https:\/\/[^/]+(\/[a-z0-9\-/]*)?\/$/.test(canonical))
    fail(`canonical must be absolute https, lowercase, trailing slash: ${canonical}`);
  else {
    if (ALLOW_INDEXING && new URL(canonical).host === PLACEHOLDER_HOST)
      fail('indexing is on but PUBLIC_SITE_URL is not set (placeholder canonical)');
    const expected = page.replace(/index\.html$/, '');
    if (!byDesign && new URL(canonical).pathname !== expected)
      fail(`canonical path ${new URL(canonical).pathname} does not match ${expected}`);
  }

  for (const p of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type']) {
    if (!metaContent(html, 'property', p)) fail(`missing ${p}`);
  }
  for (const n of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
    if (!metaContent(html, 'name', n)) fail(`missing ${n}`);
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1] ?? '') as { '@context'?: string; '@type'?: string };
      if (data['@context'] !== 'https://schema.org' || !data['@type'])
        fail('JSON-LD without schema.org @context or @type');
      if (data['@type'] === 'FAQPage') fail('FAQPage JSON-LD is not allowed');
    } catch {
      fail('invalid JSON-LD');
    }
  }

  for (const tag of html.match(/<a\b[^>]*>/gi) ?? []) {
    const href = attr(tag, 'href');
    if (!href || !href.startsWith('/') || href.startsWith('//')) continue;
    const pathname = href.split(/[?#]/)[0] ?? '';
    if (!pathname.includes('.') && !pathname.endsWith('/'))
      fail(`internal link without trailing slash: ${href}`);
    else if (pathname !== pathname.toLowerCase()) fail(`internal link not lowercase: ${href}`);
    else if (!targetExists(pathname)) fail(`broken internal link: ${href}`);
  }
}

if (!existsSync(join(DIST, 'sitemap-index.xml'))) problems.push('missing /sitemap-index.xml');

const robotsPath = join(DIST, 'robots.txt');
if (!existsSync(robotsPath)) problems.push('missing /robots.txt');
else {
  const robots = readFileSync(robotsPath, 'utf8');
  const disallowAll = /^Disallow:\s*\/\s*$/m.test(robots);
  const hasSitemap = /^Sitemap:/m.test(robots);
  if (!ALLOW_INDEXING && (!disallowAll || hasSitemap))
    problems.push('/robots.txt: must disallow all and omit Sitemap while indexing is off');
  if (ALLOW_INDEXING && (disallowAll || !hasSitemap))
    problems.push('/robots.txt: must allow crawling and list the sitemap while indexing is on');
}

if (problems.length) {
  console.error(`check-dist: ${problems.length} problem(s) in ${files.length} HTML files\n`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log(
  `check-dist: ${files.length} HTML files OK (indexing ${ALLOW_INDEXING ? 'on' : 'off'})`,
);
