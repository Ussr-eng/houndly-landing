// Behaviour beyond the shared cases: error precedence, duplicates, purity, invalid input.

import { describe, expect, it } from 'vitest';
import { computeDeadlines } from '../../src/lib/deadlines/compute';
import { currentRuleSet } from '../../src/lib/deadlines/rules';
import type { DeadlineInput } from '../../src/lib/deadlines/types';

const nis2 = { regime: 'NIS2', event_type: 'significant_incident' } as const;

const base: DeadlineInput = {
  aware_at: '2026-10-01T09:00:00Z',
  reporting_timezone: 'Europe/Brussels',
  events: [nis2],
  fix_available_at: null,
  notification_submitted_at: null,
};

const run = (patch: Partial<DeadlineInput>) =>
  computeDeadlines({ ...base, ...patch }, currentRuleSet);

describe('computeDeadlines', () => {
  it('runs in an unusual host zone (vitest sets TZ)', () => {
    expect(process.env['TZ']).toBe('Pacific/Chatham');
    expect(new Date('2026-01-01T00:00:00Z').getTimezoneOffset()).not.toBe(0);
  });

  it('reports unsupported_event before unknown_reporting_timezone', () => {
    expect(
      run({
        events: [{ regime: 'CRA', event_type: 'personal_data_breach' }],
        reporting_timezone: 'Europe/Atlantis',
      }),
    ).toEqual({ ok: false, error: 'unsupported_event' });
  });

  it('reports unknown_reporting_timezone before notification_submitted_before_aware_at', () => {
    expect(
      run({
        reporting_timezone: 'Europe/Atlantis',
        notification_submitted_at: '2026-09-30T00:00:00Z',
      }),
    ).toEqual({ ok: false, error: 'unknown_reporting_timezone' });
  });

  it('rejects an unsupported pair even next to a supported one', () => {
    expect(
      run({
        events: [
          { regime: 'NIS2', event_type: 'significant_incident' },
          { regime: 'GDPR', event_type: 'severe_incident' },
        ],
      }),
    ).toEqual({ ok: false, error: 'unsupported_event' });
  });

  it('accepts a notification submitted at the same instant as awareness', () => {
    expect(run({ notification_submitted_at: base.aware_at }).ok).toBe(true);
  });

  it('returns one entry per rule when an event is listed twice', () => {
    const result = run({ events: [nis2, nis2] });
    expect(result.ok && result.deadlines.map((d) => d.rule_id)).toEqual([
      'nis2.significant_incident.early_warning',
      'nis2.significant_incident.notification',
      'nis2.significant_incident.final_report',
    ]);
  });

  it('counts the final report from a late submission', () => {
    // 10 Oct 11:00 CEST + 1 month = 10 Nov 11:00 CET = 10:00Z (Brussels wall clock).
    const result = run({ notification_submitted_at: '2026-10-10T09:00:00Z' });
    expect(result.ok && result.deadlines.at(-1)).toEqual({
      rule_id: 'nis2.significant_incident.final_report',
      status: 'due',
      due_at: '2026-11-10T10:00:00Z',
    });
  });

  it('does not mutate its input or the rules', () => {
    const input = structuredClone(base);
    const rules = structuredClone(currentRuleSet);
    computeDeadlines(input, rules);
    expect(input).toEqual(base);
    expect(rules).toEqual(currentRuleSet);
  });

  it.each([
    ['without seconds', '2026-10-01T09:00Z'],
    ['with an offset', '2026-10-01T09:00:00+02:00'],
    ['with milliseconds', '2026-10-01T09:00:00.000Z'],
    ['an impossible date', '2026-02-30T09:00:00Z'],
    ['empty', ''],
  ])('throws TypeError for an instant %s', (_name, aware_at) => {
    expect(() => run({ aware_at })).toThrow(TypeError);
  });
});
