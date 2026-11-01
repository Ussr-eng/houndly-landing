// The contract between the AI applicability check and everything that reads its answer
// (the page, the email report and the evals). The model must return exactly this shape.

export const VERDICTS = ['in_scope', 'out_of_scope', 'depends', 'off_topic'] as const;
export type Verdict = (typeof VERDICTS)[number];

/** Product category under the CRA: default, important class I or II (Annex III), critical (Annex IV). */
export const CATEGORIES = [
  'default',
  'important_class_i',
  'important_class_ii',
  'critical',
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface CheckAnswer {
  verdict: Verdict;
  /** Set only when the verdict is `in_scope`. */
  category: Category | null;
  /** Corpus chunk ids, e.g. `art-2-2`, `annex-iii-class-i-17`. */
  citations: string[];
  /** Asked when the verdict is `depends`: one question that would settle it. */
  clarifying_question: string | null;
  /** Plain-English explanation shown to the visitor. */
  summary: string;
}

export function isCheckAnswer(value: unknown): value is CheckAnswer {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    VERDICTS.includes(v['verdict'] as Verdict) &&
    (v['category'] === null || CATEGORIES.includes(v['category'] as Category)) &&
    Array.isArray(v['citations']) &&
    v['citations'].every((c) => typeof c === 'string') &&
    (v['clarifying_question'] === null || typeof v['clarifying_question'] === 'string') &&
    typeof v['summary'] === 'string'
  );
}
