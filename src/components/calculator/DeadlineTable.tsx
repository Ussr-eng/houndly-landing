import type { DeadlineRow } from '../../lib/deadlines/present';
import { formatCountdown, formatCountdownSpoken, remaining } from '../../lib/deadlines/countdown';
import { fill } from '../../i18n';
import type { UiStrings } from '../../i18n/en';

interface Props {
  rows: DeadlineRow[];
  /** Null until the clock starts on the client: countdown cells show a neutral placeholder. */
  now: number | null;
  displayZone: string;
  reportingLabel: string;
  strings: UiStrings['calculator'];
  deadlineName: (row: DeadlineRow) => string;
  onDownload: (row: DeadlineRow & { status: 'due' }) => void;
}

function TimeLeft({ dueMs, now, s }: { dueMs: number; now: number; s: Props['strings'] }) {
  const r = remaining(dueMs, now);
  const visual = formatCountdown(r);
  const spoken = formatCountdownSpoken(r);
  return (
    <>
      {/* The ticking value is hidden from screen readers; they get a coarse, non-live text. */}
      <span aria-hidden="true" className={r.overdue ? 'calc-overdue' : undefined}>
        {r.overdue ? fill(s.result.overdueBy, { time: visual }) : visual}
      </span>
      <span className="visually-hidden">
        {fill(r.overdue ? s.result.overdueBy : s.result.dueIn, { time: spoken })}
      </span>
    </>
  );
}

export function DeadlineTable({
  rows,
  now,
  displayZone,
  reportingLabel,
  strings: s,
  deadlineName,
  onDownload,
}: Props) {
  const c = s.result.columns;
  return (
    <table className="calc-table">
      <thead>
        <tr>
          <th scope="col">{c.deadline}</th>
          <th scope="col">
            {c.local} <span className="calc-col-note">({displayZone})</span>
          </th>
          <th scope="col">
            {c.reporting} <span className="calc-col-note">({reportingLabel})</span>
          </th>
          <th scope="col">{c.utc}</th>
          <th scope="col">{c.left}</th>
          <th scope="col">{c.calendar}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const overdue = row.status === 'due' && now !== null && row.dueMs <= now;
          return (
            <tr key={row.rule.id} className={overdue ? 'is-overdue' : undefined}>
              <th scope="row">
                <span className="calc-deadline-name">{deadlineName(row)}</span>
                <span className="calc-deadline-meta">
                  {s.eventTypes[row.rule.event_type]} ·{' '}
                  <a href={row.rule.source_url} rel="noopener">
                    {s.result.source}
                  </a>
                </span>
              </th>
              {row.status === 'due' ? (
                <>
                  <td data-label={`${c.local} (${displayZone})`}>{row.display.local}</td>
                  <td data-label={`${c.reporting} (${reportingLabel})`}>{row.display.reporting}</td>
                  <td data-label={c.utc}>{row.display.utc}</td>
                  <td data-label={c.left} className="calc-left">
                    {now === null ? (
                      s.result.pending
                    ) : (
                      <TimeLeft dueMs={row.dueMs} now={now} s={s} />
                    )}
                  </td>
                  <td data-label={c.calendar}>
                    <button
                      type="button"
                      className="calc-link-button"
                      aria-label={fill(s.result.downloadOneLabel, { deadline: deadlineName(row) })}
                      onClick={() => onDownload(row)}
                    >
                      {s.result.downloadOne}
                    </button>
                  </td>
                </>
              ) : (
                <td colSpan={5} className="calc-waiting">
                  {s.result.waiting[row.waitingFor]}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
