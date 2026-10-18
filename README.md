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
absolute canonical with trailing slash, OG/Twitter tags, valid JSON-LD, no broken internal links.

## Configuration

- Brand name, default copy, author, analytics script: `src/config/site.ts`.
- Build-time environment (see `.env.example`):
  - `PUBLIC_SITE_URL` — production origin for canonicals, sitemap and robots.txt.
  - `PUBLIC_ANALYTICS_DOMAIN` — Plausible site domain. Unset means no analytics script.

## Deploy

GitHub Actions (`.github/workflows/ci.yml`) runs all checks, then deploys `dist/` to Cloudflare Pages
with `wrangler pages deploy`: `main` goes to production, other branches to preview URLs.

Repository settings needed:

- Secrets: `CLOUDFLARE_API_TOKEN` (Pages: Edit), `CLOUDFLARE_ACCOUNT_ID`.
- Variables: `CLOUDFLARE_PAGES_PROJECT` (default `houndly-landing`), `PUBLIC_SITE_URL`,
  `PUBLIC_ANALYTICS_DOMAIN`.

Without the secrets the deploy step is skipped and CI still passes.
