import { describe, expect, it } from 'vitest';
import { computeDeadlines } from '../../src/lib/deadlines/compute';
import {
  formatCountdown,
  formatCountdownSpoken,
  remaining,
} from '../../src/lib/deadlines/countdown';
import { presentDeadlines } from '../../src/lib/deadlines/present';
import { currentRuleSet, verificationSummary } from '../../src/lib/deadlines/rules';

describe('presentDeadlines', () => {
  const result = computeDeadlines(
    {
      aware_at: '2026-10-01T09:00:00Z',
      reporting_timezone: 'Europe/Berlin',
      events: [
        { regime: 'CRA', event_type: 'actively_exploited_vulnerability' },
        { regime: 'GDPR', event_type: 'personal_data_breach' },
      ],
      fix_available_at: null,
      notification_submitted_at: null,
    },
    currentRuleSet,
  );
  if (!result.ok) throw new Error('setup');
  const rows = presentDeadlines(result.deadlines, currentRuleSet, {
    displayZone: 'America/New_York',
    reportingZone: 'Europe/Berlin',
  });

  it('sorts due rows by time and puts waiting rows last', () => {
    expect(rows.map((r) => r.rule.id)).toEqual([
      'cra.actively_exploited_vulnerability.early_warning',
      'cra.actively_exploited_vulnerability.notification',
      'gdpr.personal_data_breach.notification',
      'cra.actively_exploited_vulnerability.final_report',
    ]);
    expect(rows.at(-1)).toMatchObject({ status: 'waiting', waitingFor: 'fix_available_at' });
  });

  it('formats display, reporting and UTC times without Intl', () => {
    expect(rows[0]).toMatchObject({
      status: 'due',
      dueAt: '2026-10-02T09:00:00Z',
      display: {
        local: 'Fri 2 Oct 2026, 05:00 (UTC−04:00)',
        reporting: 'Fri 2 Oct 2026, 11:00 (UTC+02:00)',
        utc: '2026-10-02 09:00 UTC',
      },
    });
  });
});

describe('countdown', () => {
  const now = Date.UTC(2026, 9, 1, 9, 0, 0);
  it('counts down', () => {
    const r = remaining(now + ((26 * 60 + 4) * 60 + 5) * 1000, now);
    expect(r).toEqual({ overdue: false, days: 1, hours: 2, minutes: 4, seconds: 5 });
    expect(formatCountdown(r)).toBe('1 d 2 h 04 min 05 s');
    expect(formatCountdownSpoken(r)).toBe('1 day 2 hours');
  });

  it('marks the exact due instant and later as overdue', () => {
    expect(remaining(now, now).overdue).toBe(true);
    const r = remaining(now - 90 * 1000, now);
    expect(r).toMatchObject({ overdue: true, minutes: 1, seconds: 30 });
    expect(formatCountdown(r)).toBe('1 min 30 s');
    expect(formatCountdownSpoken(r)).toBe('1 minute');
  });

  it('speaks short durations coarsely', () => {
    expect(formatCountdownSpoken(remaining(now + 30_000, now))).toBe('less than a minute');
    expect(formatCountdownSpoken(remaining(now + 3 * 3600_000, now))).toBe('3 hours 0 minutes');
  });
});

describe('verificationSummary', () => {
  it('reports v1 as verified', () => {
    expect(verificationSummary(currentRuleSet.rules)).toEqual({
      allVerified: true,
      unverifiedCount: 0,
      latestVerifiedAt: '2026-10-27',
    });
  });

  it('reports unverified rules', () => {
    const rules = currentRuleSet.rules.map((r) => ({ ...r, verified_at: null }));
    expect(verificationSummary(rules)).toEqual({
      allVerified: false,
      unverifiedCount: rules.length,
      latestVerifiedAt: null,
    });
  });

  it('reports the latest date once all are verified', () => {
    const rules = currentRuleSet.rules.map((r, i) => ({
      ...r,
      verified_at: i ? '2026-11-01' : '2026-11-03',
    }));
    expect(verificationSummary(rules)).toEqual({
      allVerified: true,
      unverifiedCount: 0,
      latestVerifiedAt: '2026-11-03',
    });
  });
});
