import { describe, expect, it } from 'vitest';
import { eventKey, type EventKey } from '../../src/lib/calculator/state';
import {
  FOCUS_SHARE,
  markerStatus,
  offsetLabel,
  timelineLayout,
} from '../../src/lib/calculator/timeline';
import { computeDeadlines } from '../../src/lib/deadlines/compute';
import { parseInstant } from '../../src/lib/deadlines/instant';
import { presentDeadlines } from '../../src/lib/deadlines/present';
import { currentRuleSet } from '../../src/lib/deadlines/rules';
import type { DeadlineInput } from '../../src/lib/deadlines/types';

const H = 3600_000;
const laneOrder: EventKey[] = [...new Set(currentRuleSet.rules.map(eventKey))];
const ms = (s: string) => parseInstant(s).toMillis();

function layout(
  events: string[],
  opts: { now?: string | null; fix?: string; sub?: string; aware?: string } = {},
) {
  const input: DeadlineInput = {
    aware_at: opts.aware ?? '2026-10-01T09:00:00Z',
    reporting_timezone: 'Europe/Brussels',
    events: events.map((e) => {
      const [regime, event_type] = e.split('.') as [never, never];
      return { regime: (regime as string).toUpperCase() as never, event_type };
    }),
    fix_available_at: opts.fix ?? null,
    notification_submitted_at: opts.sub ?? null,
  };
  const result = computeDeadlines(input, currentRuleSet);
  if (!result.ok) throw new Error(result.error);
  const rows = presentDeadlines(result.deadlines, currentRuleSet, {
    displayZone: 'UTC',
    reportingZone: 'Europe/Brussels',
  });
  return timelineLayout({
    rows,
    awareMs: ms(input.aware_at),
    anchors: {
      aware_at: ms(input.aware_at),
      fix_available_at: input.fix_available_at ? ms(input.fix_available_at) : null,
      notification_submitted_at: input.notification_submitted_at
        ? ms(input.notification_submitted_at)
        : null,
    },
    nowMs: opts.now ? ms(opts.now) : null,
    laneOrder,
  });
}

describe('offsetLabel', () => {
  it.each([
    [{ hours: 24 }, '24 h'],
    [{ hours: 72 }, '72 h'],
    [{ hours: 336 }, '14 d'],
    [{ hours: 100 }, '100 h'],
    [{ months: 1 }, '1 mo'],
  ])('%j → %s', (offset, label) => {
    expect(offsetLabel(offset)).toBe(label);
  });
});

describe('markerStatus: due soon = last 25% of anchor → due', () => {
  const anchor = 0;
  it.each([
    ['24 h stage', 24 * H, 6 * H],
    ['72 h stage', 72 * H, 18 * H],
    ['14 d stage', 336 * H, 84 * H],
    ['1 month (31 d)', 744 * H, 186 * H],
  ])('%s turns "soon" with %s ms left', (_name, due, soonWindow) => {
    expect(markerStatus(anchor, due, due - soonWindow - 1)).toBe('upcoming');
    expect(markerStatus(anchor, due, due - soonWindow)).toBe('soon');
    expect(markerStatus(anchor, due, due - 1)).toBe('soon');
    expect(markerStatus(anchor, due, due)).toBe('overdue');
  });

  it('is pending before the clock starts', () => {
    expect(markerStatus(0, 24 * H, null)).toBe('pending');
  });

  it('uses the real month length for month offsets', () => {
    const result = layout(['nis2.significant_incident'], {
      sub: '2026-10-03T15:00:00Z',
      // Final report due 2026-11-03T16:00Z (wall clock +1 month across the DST end):
      // 745 h after submission, so "soon" starts 186.25 h before: 2026-10-26T21:45Z.
      now: '2026-10-26T21:44:00Z',
    });
    const final = result.lanes[0]?.markers.find((m) => m.stage === 'final_report');
    expect(final?.status).toBe('upcoming');
    const later = layout(['nis2.significant_incident'], {
      sub: '2026-10-03T15:00:00Z',
      now: '2026-10-26T21:45:00Z',
    });
    expect(later.lanes[0]?.markers.find((m) => m.stage === 'final_report')?.status).toBe('soon');
  });
});

describe('timelineLayout', () => {
  it('places the server-rendered example on a single 96 h axis, waiting stage unplaced', () => {
    const l = layout(['cra.actively_exploited_vulnerability']);
    expect(l.breakAt).toBeNull();
    expect(l.now).toBeNull();
    expect(l.lanes).toHaveLength(1);
    expect(l.lanes[0]?.markers.map((m) => [m.offsetLabel, m.pos, m.status])).toEqual([
      ['24 h', 0.25, 'pending'],
      ['72 h', 0.75, 'pending'],
    ]);
    expect(l.lanes[0]?.waiting).toEqual([
      {
        ruleId: 'cra.actively_exploited_vulnerability.final_report',
        stage: 'final_report',
        waitingFor: 'fix_available_at',
      },
    ]);
    expect(l.lanes[0]?.waiting[0]).not.toHaveProperty('pos');
    expect(l.ticks.map((t) => [t.hours, t.pos])).toEqual([
      [24, 0.25],
      [48, 0.5],
      [72, 0.75],
      [96, 1],
    ]);
  });

  it('gives both CRA events their own lane so equal offsets never stack', () => {
    const l = layout(['cra.actively_exploited_vulnerability', 'cra.severe_incident']);
    expect(l.lanes.map((lane) => lane.key)).toEqual([
      'cra.actively_exploited_vulnerability',
      'cra.severe_incident',
    ]);
    for (const lane of l.lanes) {
      expect(lane.markers.map((m) => m.pos)).toEqual([0.25, 0.75]);
      expect(lane.markers.every((m) => m.ruleId.startsWith(`${lane.key}.`))).toBe(true);
    }
  });

  it('orders lanes by rule order regardless of selection order', () => {
    const l = layout(['gdpr.personal_data_breach', 'nis2.significant_incident']);
    expect(l.lanes.map((lane) => lane.key)).toEqual([
      'nis2.significant_incident',
      'gdpr.personal_data_breach',
    ]);
  });

  it('breaks the axis after 96 h for later deadlines', () => {
    const l = layout(['nis2.significant_incident'], { sub: '2026-10-02T09:00:00Z' });
    expect(l.breakAt).toBe(FOCUS_SHARE);
    const [early, notification, final] = l.lanes[0]?.markers ?? [];
    expect(early?.pos).toBeCloseTo((24 / 96) * FOCUS_SHARE);
    expect(notification?.pos).toBeCloseTo((72 / 96) * FOCUS_SHARE);
    expect(final?.pos).toBeGreaterThan(FOCUS_SHARE);
    expect(final?.pos).toBeLessThanOrEqual(0.96);
    expect(l.ticks.at(-1)?.pos).toBe(FOCUS_SHARE);
    // The end-aligned final report label would overlap the notification label above the rail.
    expect(l.lanes[0]?.markers.map((m) => m.labelSide)).toEqual(['above', 'above', 'below']);
  });

  it('keeps later positions stable while the clock ticks within a day', () => {
    const a = layout(['nis2.significant_incident'], {
      sub: '2026-10-02T09:00:00Z',
      now: '2026-10-20T10:00:00Z',
    });
    const b = layout(['nis2.significant_incident'], {
      sub: '2026-10-02T09:00:00Z',
      now: '2026-10-20T10:00:01Z',
    });
    expect(b.lanes[0]?.markers.map((m) => m.pos)).toEqual(a.lanes[0]?.markers.map((m) => m.pos));
  });

  it('marks overdue stages with a span from due to now', () => {
    const l = layout(['gdpr.personal_data_breach'], { now: '2026-10-04T21:00:00Z' });
    // GDPR 72 h due 2026-10-04T09:00Z; now is 84 h after aware, still inside the 96 h focus.
    expect(l.lanes[0]?.markers[0]?.status).toBe('overdue');
    expect(l.lanes[0]?.overdue).toEqual([[0.75, 84 / 96]]);
    expect(l.now).toEqual({ pos: 84 / 96, beforeStart: false, labelAlign: 'end' });
  });

  it('marks a 24 h stage "soon" in its last 6 hours', () => {
    const l = layout(['nis2.significant_incident'], { now: '2026-10-02T03:00:00Z' });
    expect(l.lanes[0]?.markers.map((m) => m.status)).toEqual(['soon', 'upcoming']);
  });

  it('extends the axis to now when every deadline is long past', () => {
    const l = layout(['gdpr.personal_data_breach'], { now: '2026-11-01T09:00:00Z' });
    expect(l.breakAt).toBe(FOCUS_SHARE);
    expect(l.now?.pos).toBeLessThan(1);
    expect(l.now?.pos).toBeGreaterThan(0.9);
    expect(l.now?.labelAlign).toBe('end');
    expect(l.lanes[0]?.overdue[0]?.[1]).toBe(l.now?.pos);
  });

  it('pins now at the start when awareness is in the future', () => {
    const l = layout(['gdpr.personal_data_breach'], { now: '2026-09-30T09:00:00Z' });
    expect(l.now).toEqual({ pos: 0, beforeStart: true, labelAlign: 'start' });
    expect(l.lanes[0]?.markers[0]?.status).toBe('upcoming');
  });

  it('puts labels of close markers on alternate sides', () => {
    // A fix 13 days before awareness (warned about in the UI) puts the 14 d final report at
    // +24 h, on top of the early warning.
    const l = layout(['cra.actively_exploited_vulnerability'], { fix: '2026-09-18T09:00:00Z' });
    // final = fix + 336 h = 2026-10-02T09:00Z = the 24 h marker's position.
    const sides = l.lanes[0]?.markers.map((m) => [m.stage, m.labelSide]);
    expect(sides).toEqual([
      ['early_warning', 'above'],
      ['final_report', 'below'],
      ['notification', 'above'],
    ]);
  });

  it('aligns labels near the edges inward', () => {
    const l = layout(['nis2.significant_incident'], { sub: '2026-10-02T09:00:00Z' });
    expect(l.lanes[0]?.markers.map((m) => m.labelAlign)).toEqual(['center', 'center', 'end']);
    expect(l.ticks.map((t) => t.align)).toEqual(['center', 'center', 'center', 'center']);
    const single = layout(['gdpr.personal_data_breach']);
    expect(single.ticks.at(-1)?.align).toBe('end');
  });
});
