# Houndly landing

Static marketing site (Astro). Project rules: [CLAUDE.md](CLAUDE.md). Status: [TASKS.md](TASKS.md).

## Develop

Requires Node 24 (`.nvmrc`) and pnpm via corepack.

```sh
pnpm install
pnpm dev
```

Before pushing:

```sh
pnpm astro check && pnpm lint && pnpm test && pnpm build && pnpm check:dist
```

`check:dist` audits the built HTML: one `<h1>`, unique title ≤ 60 chars, description ≤ 155 chars,
absolute canonical with trailing slash, OG/Twitter tags, valid JSON-LD, no broken internal links,
and noindex tags plus robots.txt that match `PUBLIC_ALLOW_INDEXING` (404 is always noindex).

## Configuration

- Brand name, default copy, author, analytics script: `src/config/site.ts`.
- Build-time environment (see `.env.example`):
  - `PUBLIC_SITE_URL` — production origin for canonicals, sitemap and robots.txt. Unset means the
    placeholder `https://site-url-not-set.invalid`, which `check:dist` rejects when indexing is on.
  - `PUBLIC_ALLOW_INDEXING` — `true` makes the site indexable. Anything else (the default) adds
    `noindex, nofollow` to every page and makes robots.txt disallow all crawling. Turned on at launch (L5).
  - `PUBLIC_ANALYTICS_WEBSITE_ID` and `PUBLIC_ANALYTICS_DOMAIN` — Umami Cloud website ID and the host
    to count. The script is added only when both are set, in production builds.

`check:dist` reads `PUBLIC_ALLOW_INDEXING` too: run it with the same environment as the build.

## Deploy

GitHub Actions (`.github/workflows/ci.yml`) runs all checks, then deploys `dist/` to Cloudflare Pages
with `wrangler pages deploy`: `main` goes to production, other branches to preview URLs.

Repository settings needed:

- Secrets: `CLOUDFLARE_API_TOKEN` (Pages: Edit), `CLOUDFLARE_ACCOUNT_ID`.
- Variables: `CLOUDFLARE_PAGES_PROJECT` (default `houndly-landing`), `PUBLIC_SITE_URL`,
  `PUBLIC_ALLOW_INDEXING` (leave unset until launch), `PUBLIC_ANALYTICS_WEBSITE_ID`,
  `PUBLIC_ANALYTICS_DOMAIN`.

Pull-request previews always build with indexing off and without analytics.

Without the secrets the deploy step is skipped and CI still passes.
