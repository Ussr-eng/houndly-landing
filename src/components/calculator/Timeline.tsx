// Parallel timelines: one lane per (regime, event_type), stages as markers, a moving "now".
// Decorative duplicate of the table (aria-hidden, nothing focusable); all positions come from
// timelineLayout(), rendered from the same rows and clock tick as the table.

import type { CSSProperties } from 'react';
import { fill } from '../../i18n';
import type { UiStrings } from '../../i18n/en';
import type { TimelineLayout } from '../../lib/calculator/timeline';

interface Props {
  layout: TimelineLayout;
  strings: UiStrings['calculator'];
}

const at = (pos: number) => ({ '--pos': pos }) as CSSProperties;

export function Timeline({ layout, strings: s }: Props) {
  const tl = s.timeline;
  const now = layout.now;
  return (
    <div className="tl" aria-hidden="true">
      <div className="tl-body">
        {layout.lanes.map((lane) => (
          <div className="tl-lane" key={lane.key}>
            <div className="tl-label">
              {tl.lanes[lane.key as keyof typeof tl.lanes] ?? lane.key}
            </div>
            <div className="tl-track">
              <div className="tl-rail" />
              {layout.breakAt !== null && <div className="tl-break" style={at(layout.breakAt)} />}
              {now && <div className="tl-elapsed" style={at(now.pos)} />}
              {lane.overdue.map(([from, to]) => (
                <div
                  key={from}
                  className="tl-overdue"
                  style={{ ...at(from), '--to': to } as CSSProperties}
                />
              ))}
              {lane.markers.map((m) => (
                <div
                  key={m.ruleId}
                  className={`tl-marker tl-marker--${m.status} tl-marker--${m.labelSide} tl-align--${m.labelAlign}`}
                  style={at(m.pos)}
                >
                  <span className="tl-dot" />
                  <span className="tl-mlabel">
                    <span className="tl-mlabel-long">{tl.stages[m.stage]} · </span>
                    {m.offsetLabel}
                  </span>
                </div>
              ))}
            </div>
            <div className="tl-waiting">
              {lane.waiting.map((w) => (
                <span key={w.ruleId} className="tl-wait">
                  {tl.waiting[w.waitingFor]}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="tl-plot">
          {now && (
            <div
              className={`tl-now tl-align--${now.labelAlign}`}
              style={{ '--now-pos': now.pos } as CSSProperties}
            >
              <span className="tl-now-label">{tl.now}</span>
            </div>
          )}
        </div>
      </div>
      <div className="tl-axis">
        <div className="tl-axis-plot">
          <span className="tl-tick tl-tick--start" style={at(0)}>
            {tl.aware}
          </span>
          {layout.ticks.map((t) => (
            <span key={t.hours} className={`tl-tick tl-align--${t.align}`} style={at(t.pos)}>
              {fill(tl.tick, { hours: t.hours })}
            </span>
          ))}
          {layout.breakAt !== null && (
            <span className="tl-tick tl-tick--later" style={at((1 + layout.breakAt) / 2)}>
              {tl.later}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
