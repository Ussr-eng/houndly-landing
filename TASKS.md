# TASKS — landing

Status: todo | in progress | done. One task in progress at a time.

| # | Task | Status | Notes |
|---|---|---|---|
| L1 | Skeleton: Astro, layouts, SEO component, sitemap/robots, i18n-ready routing, analytics, deploy, CI | done | Merged in #1. Indexing off until L5. |
| L2 | Calculator island on rules copied from ../backend (`pnpm sync-rules`) + tests | done | PR #2. Rules, helper wording and PT/ES zones checked against the official texts on 2026-10-27; `rules/` is edited here until the backend is deployed (`pnpm relock-rules`). |
| L2b | Design pass for the calculator | done | Merged in #3. |
| L3 | Guides: content collection + first pillar guides | in progress | 8 guides + `/guides/` live; `/faq/` live (25 questions). SRP and Opsgenie guides stay drafts until checked against official sources. |
| L4 | Incident Kit page + pricing fake door + forms | done | Brevo live since 2026-10-21; kit content shipped. Legal texts still to come. |
| L6 | Home page as funnel entry: positioning, prices €0/€29/€99, segmentation form; calculator → `/deadlines/` | in progress | Branch landing-v2. Needs Brevo attributes `COMPANY_SIZE`, `SELLS_EU`, `NOTE`. |
| L7 | Free CRA applicability check (`/cra-check/`): CRA text corpus with checksums, evals, Claude via a Pages Function, cited answers, full report by email | todo | Short verdict on screen without email; full report by email. |
| L5 | Launch: Search Console, sitemap, Lighthouse, OG images | in progress | OG images per guide, Lighthouse mobile 99–100 on all key pages (SEO 100 with indexing on). Left: privacy policy text, then set PUBLIC_ALLOW_INDEXING=true, Search Console, submit sitemap-index.xml. |
