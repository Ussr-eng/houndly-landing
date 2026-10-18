// computeDeadlines: the shared deadline algorithm from rules/README.md. Pure: no current time,
// no I/O, no display zone. Input must be valid against rules/case.schema.json (instants are
// checked and throw TypeError otherwise); contract errors are returned, never thrown.

import { formatInstant, parseInstant } from './instant';
import { addMonthsOnWallClock, isKnownZone } from './zoned';
import type { ComputeResult, Deadline, DeadlineInput, Rule, RuleSet } from './types';

export function computeDeadlines(input: DeadlineInput, rules: RuleSet): ComputeResult {
  const awareAt = parseInstant(input.aware_at);
  const anchors = {
    aware_at: awareAt,
    fix_available_at: input.fix_available_at === null ? null : parseInstant(input.fix_available_at),
    notification_submitted_at:
      input.notification_submitted_at === null
        ? null
        : parseInstant(input.notification_submitted_at),
  };

  // 1. Validate, in the README's precedence order.
  const matches = (rule: Rule) =>
    input.events.some((e) => e.regime === rule.regime && e.event_type === rule.event_type);
  const supported = input.events.every((e) =>
    rules.rules.some((r) => r.regime === e.regime && r.event_type === e.event_type),
  );
  if (!supported) return { ok: false, error: 'unsupported_event' };
  if (!isKnownZone(input.reporting_timezone))
    return { ok: false, error: 'unknown_reporting_timezone' };
  if (anchors.notification_submitted_at && anchors.notification_submitted_at < awareAt)
    return { ok: false, error: 'notification_submitted_before_aware_at' };

  // 2–5. One entry per selected rule (rules are unique by id, so duplicates in events collapse).
  const deadlines = rules.rules.filter(matches).map((rule): Deadline => {
    const anchor = anchors[rule.anchor];
    if (anchor === null) return { rule_id: rule.id, status: 'waiting', waiting_for: rule.anchor };
    const due =
      'hours' in rule.offset
        ? anchor.plus({ hours: rule.offset.hours })
        : addMonthsOnWallClock(anchor, rule.offset.months, input.reporting_timezone);
    return { rule_id: rule.id, status: 'due', due_at: formatInstant(due) };
  });

  return { ok: true, deadlines };
}
