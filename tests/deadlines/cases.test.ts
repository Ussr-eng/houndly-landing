// Runs every shared case in rules/cases/ against computeDeadlines and requires exact output.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { computeDeadlines } from '../../src/lib/deadlines/compute';
import { currentRuleSet } from '../../src/lib/deadlines/rules';
import type { Deadline, DeadlineInput, ErrorCode } from '../../src/lib/deadlines/types';

interface Case {
  id: string;
  rule_set_version: string;
  input: DeadlineInput;
  expected?: Deadline[];
  expected_error?: ErrorCode;
}

const dir = join(import.meta.dirname, '../../rules/cases');
const cases: Case[] = readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')) as Case);

const byRuleId = (a: Deadline, b: Deadline) => a.rule_id.localeCompare(b.rule_id);

describe('shared cases (rules/cases)', () => {
  it('found the case files', () => {
    expect(cases.length).toBeGreaterThanOrEqual(18);
  });

  it.each(cases.map((c) => [c.id, c] as const))('%s', (_id, c) => {
    expect(c.rule_set_version).toBe(currentRuleSet.rule_set_version);
    const result = computeDeadlines(c.input, currentRuleSet);
    if (c.expected_error !== undefined) {
      expect(result).toEqual({ ok: false, error: c.expected_error });
    } else {
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect([...result.deadlines].sort(byRuleId)).toStrictEqual(
        [...(c.expected ?? [])].sort(byRuleId),
      );
    }
  });
});
