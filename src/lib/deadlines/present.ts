// Display values for computed deadlines. Kept apart from computeDeadlines, which follows the
// shared contract exactly; the display zone never affects computation.

import { formatUtc, formatZoned } from './format';
import { parseInstant } from './instant';
import type { Anchor, Deadline, Rule, RuleSet } from './types';

export type DeadlineRow =
  | {
      status: 'due';
      rule: Rule;
      dueAt: string;
      dueMs: number;
      display: { local: string; reporting: string; utc: string };
    }
  | { status: 'waiting'; rule: Rule; waitingFor: Anchor };

export function presentDeadlines(
  deadlines: Deadline[],
  ruleSet: RuleSet,
  options: { displayZone: string; reportingZone: string },
): DeadlineRow[] {
  const order = new Map(ruleSet.rules.map((r, i) => [r.id, i]));
  const rows = deadlines.map((d): DeadlineRow => {
    const rule = ruleSet.rules.find((r) => r.id === d.rule_id);
    if (!rule) throw new Error(`Unknown rule id: ${d.rule_id}`);
    if (d.status === 'waiting') return { status: 'waiting', rule, waitingFor: d.waiting_for };
    const due = parseInstant(d.due_at);
    return {
      status: 'due',
      rule,
      dueAt: d.due_at,
      dueMs: due.toMillis(),
      display: {
        local: formatZoned(due, options.displayZone),
        reporting: formatZoned(due, options.reportingZone),
        utc: formatUtc(due),
      },
    };
  });
  // Due rows by time (then rule order); waiting rows last, in rule order.
  const rank = (r: DeadlineRow) => (r.status === 'due' ? 0 : 1);
  return rows.sort(
    (a, b) =>
      rank(a) - rank(b) ||
      (a.status === 'due' && b.status === 'due' ? a.dueMs - b.dueMs : 0) ||
      (order.get(a.rule.id) ?? 0) - (order.get(b.rule.id) ?? 0),
  );
}
