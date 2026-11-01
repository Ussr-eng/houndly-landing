import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { CheckAnswer } from '../cra-check/answer.ts';
import { chunkIndex, type Corpus } from '../cra-check/corpus.ts';
import { datesIn, scoreAnswer, type EvalCase } from '../cra-check/score.ts';
import { buildCorpus, CORPUS_FILE, serializeCorpus } from '../scripts/build-cra-corpus.ts';

const ROOT = join(import.meta.dirname, '..');
const corpus = JSON.parse(readFileSync(join(ROOT, CORPUS_FILE), 'utf8')) as Corpus;
const chunks = chunkIndex(corpus);
const cases = JSON.parse(
  readFileSync(join(ROOT, 'cra-check/evals/cases.json'), 'utf8'),
) as EvalCase[];
const text = (id: string) => chunks.get(id)?.text ?? '';

describe('CRA corpus', () => {
  it('matches what pnpm build-cra-corpus produces from the source text', () => {
    expect(readFileSync(join(ROOT, CORPUS_FILE), 'utf8')).toBe(serializeCorpus(buildCorpus()));
  });

  it('has unique ids', () => {
    expect(chunks.size).toBe(corpus.chunks.length);
  });

  it('has recitals 1 to 130 in order', () => {
    const ids = corpus.chunks.filter((c) => c.kind === 'recital').map((c) => c.id);
    expect(ids).toEqual(Array.from({ length: 130 }, (_, i) => `recital-${i + 1}`));
  });

  it('has every article from 1 to 71', () => {
    const numbers = new Set(
      corpus.chunks.filter((c) => c.kind === 'article').map((c) => c.id.split('-')[1]),
    );
    expect([...numbers].map(Number)).toEqual(Array.from({ length: 71 }, (_, i) => i + 1));
  });

  it('splits Annex III into 19 class I and 4 class II categories, and Annex IV into 3', () => {
    const count = (prefix: string) => corpus.chunks.filter((c) => c.id.startsWith(prefix)).length;
    expect(count('annex-iii-class-i-')).toBe(19);
    expect(count('annex-iii-class-ii-')).toBe(4);
    expect(count('annex-iv-')).toBe(3);
  });

  it('keeps the provisions the check relies on intact', () => {
    expect(text('art-2-2')).toContain(
      '(a) Regulation (EU) 2017/745; (b) Regulation (EU) 2017/746; (c) Regulation (EU) 2019/2144.',
    );
    expect(text('art-3-13')).toMatch(/^‘manufacturer’ means/);
    expect(text('art-14-2')).toContain('within 24 hours');
    expect(text('art-14-2')).toContain('within 72 hours');
    expect(text('art-14-2')).toContain('no later than 14 days');
    expect(text('art-71-2')).toBe(
      'This Regulation shall apply from 11 December 2027. However, Article 14 shall apply from 11 September 2026 and Chapter IV (Articles 35 to 51) shall apply from 11 June 2026. This Regulation shall be binding in its entirety and directly applicable in all Member States.',
    );
    expect(text('annex-iii-class-i-17')).toMatch(
      /^Smart home products with security functionalities/,
    );
    expect(chunks.get('art-7-1')?.title).toBe('Important products with digital elements');
  });

  it('drops page headers, footers, footnotes and the signatures', () => {
    for (const c of corpus.chunks) {
      expect(c.text, c.id).not.toMatch(/OJ L, 20\.11\.2024 EN|\d+\/81|Done at Strasbourg/);
      expect(c.text, c.id).not.toBe('');
    }
    // Footnote (36), under Article 2(4), names the Marine Equipment Directive in full.
    expect(text('art-2-4')).not.toContain('repealing Council Directive 96/98/EC');
  });
});

describe('CRA check eval cases', () => {
  it('has 44 cases with unique ids', () => {
    expect(cases).toHaveLength(44);
    expect(new Set(cases.map((c) => c.id)).size).toBe(44);
  });

  it('cites only provisions that exist in the corpus', () => {
    for (const c of cases)
      for (const id of c.expected.must_cite) expect(chunks.has(id), `${c.id}: ${id}`).toBe(true);
  });

  it('sets a category exactly when the expected verdict is in_scope', () => {
    for (const c of cases)
      expect(c.expected.category !== null, c.id).toBe(c.expected.verdict === 'in_scope');
  });

  it('covers every verdict and category', () => {
    const seen = new Set(cases.flatMap((c) => [c.expected.verdict, c.expected.category]));
    for (const v of [
      'in_scope',
      'out_of_scope',
      'depends',
      'off_topic',
      'default',
      'important_class_i',
      'important_class_ii',
      'critical',
    ])
      expect(seen, v).toContain(v);
  });
});

describe('scoreAnswer', () => {
  const lock = cases.find((c) => c.id === 'a01-smart-door-lock') as EvalCase;
  const router = cases.find((c) => c.id === 'c25-router-on-market-since-2025') as EvalCase;
  const vague = cases.find((c) => c.id === 'e42-too-vague') as EvalCase;
  const good: CheckAnswer = {
    verdict: 'in_scope',
    category: 'important_class_i',
    citations: ['annex-iii-class-i-17', 'art-7-1', 'art-3-2'],
    clarifying_question: null,
    summary: 'Smart door locks are important products of class I.',
  };
  const codes = (c: EvalCase, a: unknown) => scoreAnswer(c, a, chunks).map((f) => f.code);

  it('passes a correct answer', () => {
    expect(scoreAnswer(lock, good, chunks)).toEqual([]);
  });

  it('rejects an answer of the wrong shape', () => {
    expect(codes(lock, { verdict: 'yes' })).toEqual(['invalid_shape']);
  });

  it('flags a wrong verdict and a wrong category', () => {
    expect(codes(lock, { ...good, verdict: 'out_of_scope', category: null })).toEqual([
      'verdict_mismatch',
      'category_mismatch',
    ]);
    expect(codes(lock, { ...good, category: 'default' })).toEqual(['category_mismatch']);
  });

  it('flags missing and made-up citations', () => {
    expect(
      codes(lock, { ...good, citations: ['annex-iii-class-i-17', 'art-7-1', 'art-99-1'] }),
    ).toEqual(['missing_citation', 'unknown_citation']);
  });

  it('accepts dates and periods that the cited provisions contain', () => {
    const answer: CheckAnswer = {
      ...good,
      citations: [...router.expected.must_cite, 'art-14-2'],
      summary:
        'Reporting applies from 11 September 2026 (2026-09-11): an early warning within 24 hours.',
    };
    expect(scoreAnswer({ ...router, expected: { ...router.expected } }, answer, chunks)).toEqual(
      [],
    );
  });

  it('flags dates, periods and amounts that no cited provision contains', () => {
    const answer: CheckAnswer = {
      ...good,
      summary: 'From 1 January 2027 you must report within 48 hours or pay €15,000,000 or 2.5 %.',
    };
    expect(codes(lock, answer)).toEqual([
      'unsupported_date',
      'unsupported_duration',
      'unsupported_amount',
      'unsupported_amount',
    ]);
  });

  it('requires a clarifying question when the verdict is depends', () => {
    const answer: CheckAnswer = {
      verdict: 'depends',
      category: null,
      citations: [],
      clarifying_question: ' ',
      summary: '',
    };
    expect(codes(vague, answer)).toEqual(['missing_clarifying_question']);
    expect(
      codes(vague, {
        ...answer,
        clarifying_question: 'Do people install it, or use it in a browser?',
      }),
    ).toEqual([]);
  });

  it('reads long and ISO dates', () => {
    expect(datesIn('on 11 December 2027 and 2026-06-11')).toEqual([
      '11 December 2027',
      '11 June 2026',
    ]);
  });
});
