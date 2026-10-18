import v1 from '../../../rules/v1.json';
import type { Rule, RuleSet } from './types';

// rules/v1.json is validated against rules/schema.json in tests/rules-sync.test.ts,
// which is what makes this cast safe.
export const currentRuleSet = v1 as unknown as RuleSet;

export function ruleById(ruleSet: RuleSet, id: string): Rule | undefined {
  return ruleSet.rules.find((r) => r.id === id);
}

export interface VerificationSummary {
  allVerified: boolean;
  unverifiedCount: number;
  /** Latest verified_at date (YYYY-MM-DD) among verified rules, or null. */
  latestVerifiedAt: string | null;
}

export function verificationSummary(rules: Rule[]): VerificationSummary {
  const verified = rules
    .map((r) => r.verified_at)
    .filter((d): d is string => d !== null)
    .sort();
  return {
    allVerified: verified.length === rules.length && rules.length > 0,
    unverifiedCount: rules.length - verified.length,
    latestVerifiedAt: verified.at(-1) ?? null,
  };
}
