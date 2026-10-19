// Layout for the parallel-timelines view. Pure: positions are fractions (0..1) of the plot
// width, computed from the same rows and clock tick as the table, so the two cannot drift.
// The timeline is decorative (aria-hidden); the table is the accessible source.
//
// Axis: a broken axis. The first FOCUS_SHARE of the width covers aware → aware + 96 h (the
// 24 h / 72 h deadlines); after a visible break the rest covers up to the latest due time or
// now, with a margin and rounded up to whole days, so it changes at most once a day.

import { Duration } from 'luxon';
import type { DeadlineRow } from '../deadlines/present';
import type { Anchor, Offset, Stage } from '../deadlines/types';
import { eventKey, type EventKey } from './state';

export const FOCUS_MS = Duration.fromObject({ hours: 96 }).toMillis();
export const FOCUS_SHARE = 0.75;
const LATEST_MAX = 0.96;
const DAY_MS = Duration.fromObject({ days: 1 }).toMillis();
/** "Due soon" starts when this share of the stage's duration (anchor → due) is left. */
export const SOON_SHARE = 0.25;
/** Assumed label width (fraction of the plot) for collision checks; long labels are ~30%. */
const LABEL_WIDTH = 0.3;
const EDGE = 0.15;
const alignFor = (pos: number) => (pos < EDGE ? 'start' : pos > 1 - EDGE ? 'end' : 'center');

export type MarkerStatus = 'pending' | 'upcoming' | 'soon' | 'overdue';

export interface TimelineMarker {
  ruleId: string;
  stage: Stage;
  pos: number;
  offsetLabel: string;
  status: MarkerStatus;
  labelSide: 'below' | 'above';
  /** Labels near the plot edges align inward so they never overflow. */
  labelAlign: 'start' | 'center' | 'end';
}

export interface TimelineWaiting {
  ruleId: string;
  stage: Stage;
  waitingFor: Anchor;
}

export interface TimelineLane {
  key: EventKey;
  markers: TimelineMarker[];
  waiting: TimelineWaiting[];
  /** Overdue spans [from, to] (due → now). */
  overdue: [number, number][];
}

export interface TimelineLayout {
  lanes: TimelineLane[];
  ticks: { pos: number; hours: number; align: 'center' | 'end' }[];
  /** Position of the axis break, or null when everything fits the first 96 h. */
  breakAt: number | null;
  /** Elapsed track and "now" marker; null before the clock starts. */
  now: { pos: number; beforeStart: boolean; labelAlign: 'start' | 'center' | 'end' } | null;
}

/** "24 h", "72 h", "14 d" (whole days from 96 h up), "1 mo". */
export function offsetLabel(offset: Offset): string {
  if ('months' in offset) return `${offset.months} mo`;
  const h = offset.hours;
  return h >= 96 && h % 24 === 0 ? `${h / 24} d` : `${h} h`;
}

export function markerStatus(anchorMs: number, dueMs: number, nowMs: number | null): MarkerStatus {
  if (nowMs === null) return 'pending';
  if (dueMs <= nowMs) return 'overdue';
  return dueMs - nowMs <= (dueMs - anchorMs) * SOON_SHARE ? 'soon' : 'upcoming';
}

export function timelineLayout(input: {
  rows: DeadlineRow[];
  awareMs: number;
  anchors: Record<Anchor, number | null>;
  nowMs: number | null;
  /** Lane order: the selectable (regime, event_type) pairs in rule order. */
  laneOrder: EventKey[];
}): TimelineLayout {
  const { rows, awareMs, anchors, nowMs, laneOrder } = input;
  const focusEnd = awareMs + FOCUS_MS;
  const latest = Math.max(
    awareMs,
    ...rows.map((r) => (r.status === 'due' ? r.dueMs : awareMs)),
    nowMs ?? awareMs,
  );
  const broken = latest > focusEnd;
  // The latest point lands at most at LATEST_MAX of the width, so its marker never touches the
  // edge; whole days keep the scale stable while the clock ticks.
  const end = broken
    ? focusEnd +
      Math.ceil((latest - focusEnd) / ((LATEST_MAX - FOCUS_SHARE) / (1 - FOCUS_SHARE)) / DAY_MS) *
        DAY_MS
    : focusEnd;

  const pos = (t: number): number => {
    const x = Math.min(Math.max(t, awareMs), end);
    if (!broken) return (x - awareMs) / FOCUS_MS;
    if (x <= focusEnd) return ((x - awareMs) / FOCUS_MS) * FOCUS_SHARE;
    return FOCUS_SHARE + ((x - focusEnd) / (end - focusEnd)) * (1 - FOCUS_SHARE);
  };

  const nowPos = nowMs === null ? null : pos(nowMs);

  const lanes = laneOrder
    .map((key): TimelineLane => {
      const laneRows = rows.filter((r) => eventKey(r.rule) === key);
      const markers = laneRows
        .filter((r): r is DeadlineRow & { status: 'due' } => r.status === 'due')
        .map((r): TimelineMarker => ({
          ruleId: r.rule.id,
          stage: r.rule.stage,
          pos: pos(r.dueMs),
          offsetLabel: offsetLabel(r.rule.offset),
          status: markerStatus(anchors[r.rule.anchor] ?? awareMs, r.dueMs, nowMs),
          labelSide: 'above',
          labelAlign: alignFor(pos(r.dueMs)),
        }))
        .sort((a, b) => a.pos - b.pos);
      // Labels go above the rail unless they would overlap the previous label there.
      const extent = (m: TimelineMarker): [number, number] =>
        m.labelAlign === 'start'
          ? [m.pos, m.pos + LABEL_WIDTH]
          : m.labelAlign === 'end'
            ? [m.pos - LABEL_WIDTH, m.pos]
            : [m.pos - LABEL_WIDTH / 2, m.pos + LABEL_WIDTH / 2];
      let lastAboveEnd = -Infinity;
      for (const m of markers) {
        const [from, to] = extent(m);
        if (from < lastAboveEnd) m.labelSide = 'below';
        else lastAboveEnd = to;
      }
      return {
        key,
        markers,
        waiting: laneRows
          .filter((r): r is DeadlineRow & { status: 'waiting' } => r.status === 'waiting')
          .map((r) => ({ ruleId: r.rule.id, stage: r.rule.stage, waitingFor: r.waitingFor })),
        overdue:
          nowPos === null
            ? []
            : markers.filter((m) => m.status === 'overdue').map((m) => [m.pos, nowPos]),
      };
    })
    .filter((lane) => lane.markers.length + lane.waiting.length > 0);

  const share = broken ? FOCUS_SHARE : 1;
  return {
    lanes,
    ticks: [24, 48, 72, 96].map((hours) => {
      const p = (hours / 96) * share;
      return { pos: p, hours, align: p > 1 - EDGE / 2 ? ('end' as const) : ('center' as const) };
    }),
    breakAt: broken ? FOCUS_SHARE : null,
    now:
      nowMs === null || nowPos === null
        ? null
        : {
            pos: nowPos,
            beforeStart: nowMs < awareMs,
            labelAlign: alignFor(nowPos),
          },
  };
}
