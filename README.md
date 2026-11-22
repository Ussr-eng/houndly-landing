# Within24 landing

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

## Forms (Incident Kit, early access)

Both forms post to the Pages Function `POST /api/subscribe` (`functions/api/subscribe.ts`, logic in
`src/lib/forms/`). Without JavaScript the function answers with a 303 to a status page; with
JavaScript the form shows the result inline. Request bodies and email addresses are never logged.

Cloudflare Pages environment variables (Settings → Environment variables), per environment:

| Name                                                  | Type     | Value                                                                                                                  |
| ----------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `FORM_PROVIDER`                                       | variable | `brevo`, or `fake` (accepts everything, stores nothing). Unset: forms answer "not available".                          |
| `BREVO_API_KEY`                                       | secret   | Brevo API key                                                                                                          |
| `BREVO_LIST_KIT`, `BREVO_LIST_WAITLIST`               | variable | Brevo list IDs                                                                                                         |
| `BREVO_TEMPLATE_KIT`, `BREVO_TEMPLATE_WAITLIST`       | variable | Brevo double opt-in template IDs                                                                                       |
| `BREVO_TEMPLATE_KIT_DE`, `BREVO_TEMPLATE_WAITLIST_DE` | variable | German double opt-in templates; unset: the English template is used. Same pattern for every language (`_FR`, `_PL`, …) |
| `TURNSTILE_SECRET_KEY`                                | secret   | Turnstile secret key                                                                                                   |

GitHub repository variable: `PUBLIC_TURNSTILE_SITE_KEY` (Turnstile site key; the widget is added
only when it is set).

Brevo contact attributes (create them in Brevo; text unless noted): `COMPANY`, `PRODUCT_TYPE`,
`LAWS`, `INTEREST` (what they need first), `COMPANY_SIZE`, `CURRENT_PROCESS` (on-call tool), `SELLS_EU`, `CHANNELS` (alert channels, comma-separated, asked on /opsgenie-alternative/), `NOTE`, `PLAN`, `SOURCE` (form and the page the person came from), `CONSENT_VERSION`, `NEWS_CONSENT` (boolean),
`SIGNUP_AT`, `LANGUAGE` (site language of the form: `en`, `de`).

The Incident Kit file is served from an unguessable path under `public/kit/` and linked only from
the kit email. Replace the placeholder ZIP there with the real kit (same file name).

## Languages

English is the default and has no URL prefix; every other language lives under `/<code>/` with
the same English slugs (`/de/pricing/`). Each page in `src/pages/[...locale]/` is built once per
language in `builtLocales`. Internal links are written as English paths; on non-English pages
`src/middleware.ts` rewrites them to the language prefix at build time. A visitor picks the
language with the switcher in the header; a browser in another language sees a one-line hint.
Nothing redirects by IP or country.

Public languages: English, German, French and Polish. Russian (`/ru/`) is built for the team only.

To add a language (for example Spanish):

1. `src/i18n/config.ts`: add `es` to `locales`, `htmlLang`, `ogLocale` and `builtLocales`.
2. `astro.config.mjs`: add it to `i18n.locales` and to the sitemap `i18n.locales`.
3. `src/i18n/es.ts`: a full copy of `en.ts` typed as `UiStrings` (a missing key fails the build),
   registered in `src/i18n/index.ts`.
4. `src/content/guides/es/`: translated guides with `locale: es` and the same `slug`. A guide
   without a translation is simply not built in that language.
5. Date words, countdown units and plural rule in `src/lib/deadlines/format.ts` and
   `countdown.ts`, unit labels in `src/lib/calculator/timeline.ts` (typed by locale: the build fails
   until they exist).
6. Brevo: optional `BREVO_TEMPLATE_KIT_ES` and `BREVO_TEMPLATE_WAITLIST_ES`.

A language listed in `hiddenLocales` is built but noindex, left out of the sitemap, the switcher
and hreflang: for drafts or internal versions.

## Content Security Policy

`pnpm build` runs `scripts/csp.ts` after `astro build`: it adds the policy, with the sha256
hashes of all inline scripts, to `dist/_headers`. `CSP_MODE=report` writes it as report-only
(pull-request previews). `check:dist` fails if an inline script is not covered.

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
