# Within24 — landing site (folder `landing/`, own git repository)

Within24 (written exactly like that) is the brand; the domain is within24.app. Keep the brand in one
config file (`src/config/site.ts`) so it can be replaced in minutes. Infrastructure names (repository
`houndly-landing`, Cloudflare Pages project `houndly-landing`) keep the old codename.

## Goal

A marketing site for a SaaS that tracks EU regulatory reporting deadlines (Cyber Resilience Act, NIS2, GDPR)
and wakes the on-call person. The site has three jobs:

1. Bring search traffic with a free deadline calculator and helpful articles.
2. Turn readers into leads: the Incident Kit (report templates + checklists) in exchange for an email.
3. Measure purchase intent: a pricing page with a "fake door" Buy button and an early-access form.

Every page must be fully readable by Google without running JavaScript.

## Stack

- Astro (static output, SSG) + TypeScript (strict).
- React only as islands for interactive parts (the calculator, forms). Everything else is plain Astro components.
- Articles: Markdown/MDX in Astro content collections with a typed frontmatter schema (zod).
- Dates and time zones: Luxon (IANA zones, DST-safe). Never use raw `Date` arithmetic for deadlines.
- Tests: Vitest for the rules module and calculator logic.
- Styling: plain CSS with custom properties (design tokens in one file). No UI kit.
- Hosting: Cloudflare Pages. Analytics: a cookieless, privacy-friendly tool (Plausible or Umami) — no cookie banner needed.
- Package manager: pnpm. Pin exact dependency versions.

## SEO rules (non-negotiable)

1. Static HTML for every page. The calculator island renders its default state on the server
   (`client:load` or `client:visible`), so the form, labels and an example result table exist in the HTML.
2. Every page has a unique `<title>` (≤ 60 chars), meta description (≤ 155 chars), canonical URL, Open Graph
   and Twitter tags, and one `<h1>`.
3. Clean URLs: `/` (calculator), `/guides/<slug>/`, `/pricing/`, `/incident-kit/`. Trailing slash, lowercase,
   English slugs. Locale prefix for future languages (`/de/...`); English has no prefix.
4. `sitemap.xml` (via @astrojs/sitemap) and `robots.txt`. `hreflang` tags once a second language exists.
5. JSON-LD: `WebApplication` on the calculator page, `Article` (with `datePublished`, `dateModified`, author)
   on guides, `BreadcrumbList` on guides. Do not rely on FAQ rich results.
6. Internal links: every guide links to the calculator and to 2–3 related guides; the calculator page links
   to the main guides.
7. Performance budget: Lighthouse ≥ 95 for Performance, SEO and Accessibility on mobile. Self-host fonts,
   no layout shift, images as AVIF/WebP with width/height set.
8. Every guide shows "Last verified: <date>" and a sources list with links to official texts
   (EUR-Lex, ENISA, European Commission, national authorities).

## Deadline rules (shared with the backend)

- The source of truth for rules is the backend repository (`../backend/rules/`). This repository keeps
  a committed copy in `rules/` (`v1.json` + shared test cases in `rules/cases/`), updated only by
  `pnpm sync-rules`, which copies from `../backend/rules/`.
- Never edit `rules/` by hand here. A test checks that the copy matches its recorded checksum and
  `rule_version`; the calculator shows that version in the footer.
- Keep the JSON framework-neutral (no TypeScript-only constructs): the backend reads the same file.
- Each rule: `regime` (CRA | NIS2 | GDPR), `event_type`, `stage` (early_warning | notification | final_report),
  `anchor` (`aware_at` | `fix_available_at` | `notification_submitted_at`), `offset` (`{ "hours": 24 }` or
  `{ "months": 1 }`), `source_url`, `verified_at` (null until checked), `notes`.
- One pure function `computeDeadlines(input, rules)` — no side effects, no current time inside it
  (pass `now` in). Output matches the shared contract exactly (`rule_id`, `status`, `due_at` in UTC or
  `waiting_for`); a separate `presentDeadlines()` adds display values in the user's and the reporting zone.
- Anchors that are not known yet (fix not available, notification not submitted) produce a deadline with
  status "waiting for <anchor>". The UI shows a hint about what to enter — never a date or an estimate
  (as in `rules/README.md`).
- Conservative interpretation: hour offsets are exact (`aware_at + 24h`), no rounding or holiday extensions.
  Month offsets use calendar months; define and test the end-of-month rule (e.g. Jan 31 + 1 month).
- Every rule stays `TODO(verify)` until checked against the official legal text. The site footer shows the
  rules version and verification date.
- Tests: every regime/event/stage, DST transitions in at least Europe/Berlin and America/New_York,
  end-of-month, early submission of the notification moving the final-report deadline, invalid input.

## Calculator UX

- Inputs: "became aware at" (defaults to now) + time zone (defaults to browser zone, editable),
  event type, applicable regimes (checkboxes, with a 3-question helper), optional "fix available at"
  and "notification submitted at".
- Output: one row per deadline with local time, UTC, live countdown and overdue state;
  `.ics` download (per deadline and all); "Copy link" with state in the URL query (no personal data).
- Below the result: the bridge to the product ("Deadlines calculated. Who wakes up at 3 a.m.?") and the
  Incident Kit form.
- "This is not legal advice" next to the result, not only in the footer.
- Accessible: real labels, keyboard usable, countdown not announced every second to screen readers.

## Forms and analytics

- Incident Kit form: email (required), company, product type, applicable laws. Double opt-in.
  Provider is an open decision — propose options in the plan; keep it behind one small adapter.
- Early-access form on the pricing page: email, company, product type, applicable laws, "how do you handle
  this today" (free text).
- Custom analytics events: `calculator_opened`, `calculator_calculated`, `ics_downloaded`, `link_copied`,
  `kit_requested`, `buy_clicked` (with plan), `waitlist_submitted`.
- No tracking cookies, no third-party scripts beyond the analytics tool and the form provider.

## Design direction

- Subject: incident response against legal clocks. The audience is a CTO or lead engineer at a small
  software/device company, possibly reading at night under stress. Clarity beats decoration.
- The one memorable element: the calculator result shown as parallel timelines (one lane per law),
  with "now" moving along them. Keep everything around it quiet.
- Avoid generic AI-site defaults: cream background + serif + terracotta, near-black + acid-green,
  identical rounded cards with soft shadows, all-caps eyebrow labels, "→" on every button.
- Copy: plain English, sentence case, active verbs, no hype. Buttons say exactly what happens.
- Responsive down to 360px, visible focus, `prefers-reduced-motion` respected, light and dark themes.

## Task order

L1 skeleton (Astro, layouts, SEO component, sitemap/robots, i18n-ready routing, analytics, deploy)
→ L2 rules module + calculator island + tests
→ L3 guides: content collection + first 4 pillar guides (texts are supplied; do not invent legal facts)
→ L4 Incident Kit page + pricing fake door + forms
→ L5 launch checklist (Search Console, sitemap submitted, Lighthouse, OG images).
Status lives in `TASKS.md`.

## Conventions

- One task at a time: show a plan first and wait for approval, then code, tests, commit, push.
- Never write legal facts from memory into content or rules. Mark anything unverified with `TODO(verify)`.
- This is a standalone git repository. Never modify files outside it (the backend lives in a sibling folder
  and is read only by `pnpm sync-rules`).
- Before finishing a task: `pnpm astro check && pnpm lint && pnpm test && pnpm build`.
