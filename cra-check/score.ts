// Scores one answer of the AI applicability check against an eval case. Pure: no network, no clock.

import { isCheckAnswer, type Category, type Verdict } from './answer.ts';
import type { Chunk } from './corpus.ts';

export interface EvalCase {
  id: string;
  /** What a visitor types, in English. */
  input: string;
  expected: {
    verdict: Verdict;
    /** Required category when the verdict is `in_scope`; null when it is not checked. */
    category: Category | null;
    /** Chunk ids the answer must cite. */
    must_cite: string[];
  };
  /** Why this is the right answer, with the provisions that say so. */
  reason: string;
}

export type FailureCode =
  | 'invalid_shape'
  | 'verdict_mismatch'
  | 'category_mismatch'
  | 'missing_citation'
  | 'unknown_citation'
  | 'missing_clarifying_question'
  | 'unsupported_date'
  | 'unsupported_duration'
  | 'unsupported_amount';

export interface Failure {
  code: FailureCode;
  detail: string;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DATE_LONG = new RegExp(`\\b\\d{1,2} (?:${MONTHS.join('|')}) \\d{4}\\b`, 'g');
const DATE_ISO = /\b(\d{4})-(\d{2})-(\d{2})\b/g;
const DURATION = /\b(\d+)[ -](hour|day|month|year)s?\b/gi;
const AMOUNT = /€\s?\d[\d,.]*|\b\d[\d,.]*\s?(?:EUR|euros?)\b|\b\d+(?:\.\d+)?\s?%/gi;

/** Dates written in the answer, as `11 December 2027`. ISO dates are converted to that form. */
export function datesIn(text: string): string[] {
  const long = text.match(DATE_LONG) ?? [];
  const iso = [...text.matchAll(DATE_ISO)].map(
    (m) => `${Number(m[3])} ${MONTHS[Number(m[2]) - 1] ?? '?'} ${m[1]}`,
  );
  return [...long, ...iso];
}

export function scoreAnswer(c: EvalCase, answer: unknown, chunks: Map<string, Chunk>): Failure[] {
  if (!isCheckAnswer(answer))
    return [{ code: 'invalid_shape', detail: 'answer does not match CheckAnswer' }];
  const failures: Failure[] = [];
  const fail = (code: FailureCode, detail: string) => failures.push({ code, detail });

  if (answer.verdict !== c.expected.verdict)
    fail('verdict_mismatch', `expected ${c.expected.verdict}, got ${answer.verdict}`);
  if (
    c.expected.verdict === 'in_scope' &&
    c.expected.category &&
    answer.category !== c.expected.category
  )
    fail('category_mismatch', `expected ${c.expected.category}, got ${String(answer.category)}`);
  for (const id of c.expected.must_cite)
    if (!answer.citations.includes(id)) fail('missing_citation', id);
  for (const id of answer.citations) if (!chunks.has(id)) fail('unknown_citation', id);
  if (answer.verdict === 'depends' && !answer.clarifying_question?.trim())
    fail('missing_clarifying_question', 'verdict is depends but no question was asked');

  // Every date, period and amount the visitor reads must come from a provision the answer cites.
  const cited = answer.citations
    .map((id) => chunks.get(id)?.text ?? '')
    .join('\n')
    .replace(/\s+/g, ' ');
  const shown = `${answer.summary}\n${answer.clarifying_question ?? ''}`;
  for (const date of datesIn(shown)) if (!cited.includes(date)) fail('unsupported_date', date);
  for (const m of shown.matchAll(DURATION)) {
    const re = new RegExp(`\\b${m[1]}[ -]${(m[2] ?? '').toLowerCase()}`, 'i');
    if (!re.test(cited)) fail('unsupported_duration', m[0]);
  }
  for (const m of shown.match(AMOUNT) ?? [])
    if (!cited.includes(m.trim())) fail('unsupported_amount', m);
  return failures;
}
