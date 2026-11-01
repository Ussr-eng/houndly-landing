# CRA applicability check: text base and evals

Groundwork for the free "Does the CRA apply to my product?" check. Nothing here is shown on the
site yet.

- `source/cra-2024-2847-en.txt`: the official English text of Regulation (EU) 2024/2847 as
  published in the Official Journal (OJ L, 20.11.2024), exported from the PDF.
- `corpus.json`: that text split into citable chunks (recitals, article paragraphs, Annex III and
  IV categories, annex parts). Each chunk has an `id` such as `art-2-2`, `recital-12` or
  `annex-iii-class-i-17`. Rebuild it with `pnpm build-cra-corpus`; a test fails if it is stale.
- `evals/cases.json`: product descriptions with the expected verdict, category and the provisions
  the answer must cite. Every expected answer was checked against the regulation text.
- `answer.ts`: the answer shape the AI must return. `score.ts`: compares one answer with one case
  and lists failures (wrong verdict or category, missing or unknown citation, a date, period or
  amount that the cited provisions do not contain, `depends` without a clarifying question).

Like `rules/`, `corpus.json` and `evals/cases.json` are plain JSON with no site-specific
constructs, so a backend can read the same files.
