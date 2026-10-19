// Deadline calculator island (client:load). The server render and the first client render use
// the fixed example (EXAMPLE_STATE, Europe/Brussels, no clock), so hydration matches exactly.
// After mount: read the link, switch "aware at" to now and times to the browser zone, start
// the clock. Rows stay the same unless the link changes them, so the layout does not shift.

import { useEffect, useId, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { site, siteUrl } from '../../config/site';
import { fill, t } from '../../i18n';
import type { Locale } from '../../i18n/config';
import { track } from '../../lib/analytics';
import { countries, countryByCode } from '../../lib/calculator/countries';
import { buildIcs, icsDate, shortHash, type IcsEvent } from '../../lib/calculator/ics';
import { timelineLayout } from '../../lib/calculator/timeline';
import { nowInstant } from '../../lib/calculator/local-input';
import { decodeQuery, encodeQuery } from '../../lib/calculator/query';
import {
  EXAMPLE_DISPLAY_ZONE,
  EXAMPLE_STATE,
  eventKey,
  reportingZone,
  toDeadlineInput,
  type CalculatorState,
  type EventKey,
} from '../../lib/calculator/state';
import { computeDeadlines } from '../../lib/deadlines/compute';
import { formatLongUtc, formatZoned } from '../../lib/deadlines/format';
import { formatInstant, parseInstant } from '../../lib/deadlines/instant';
import { presentDeadlines, type DeadlineRow } from '../../lib/deadlines/present';
import { currentRuleSet, verificationSummary } from '../../lib/deadlines/rules';
import type { Anchor } from '../../lib/deadlines/types';
import { isKnownZone } from '../../lib/deadlines/zoned';
import { DateTimeField } from './DateTimeField';
import { DeadlineTable } from './DeadlineTable';
import { EventPicker } from './EventPicker';
import { Timeline } from './Timeline';
import { useNow } from './useNow';
import './calculator.css';

interface Props {
  locale: Locale;
}

const ruleSet = currentRuleSet;
const version = ruleSet.rule_set_version;
const verification = verificationSummary(ruleSet.rules);
const availableEvents: EventKey[] = [...new Set(ruleSet.rules.map(eventKey))];
const OPTIONAL_ANCHORS = ['fix_available_at', 'notification_submitted_at'] as const;

function browserZone(): string | null {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return zone && isKnownZone(zone) ? zone : null;
  } catch {
    return null;
  }
}

function allZones(extra: string): string[] {
  let list: string[] = [];
  try {
    list = Intl.supportedValuesOf('timeZone');
  } catch {
    // Older browsers: the current and example zones are still offered.
  }
  return [...new Set([...list, extra, EXAMPLE_DISPLAY_ZONE, 'UTC'])].sort();
}

function download(filename: string, content: string): void {
  const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function Calculator({ locale }: Props) {
  const s = t(locale).calculator;
  const id = useId();
  const [state, setState] = useState<CalculatorState>(EXAMPLE_STATE);
  const [displayZone, setDisplayZone] = useState(EXAMPLE_DISPLAY_ZONE);
  const [zones, setZones] = useState<string[]>([EXAMPLE_DISPLAY_ZONE]);
  const [live, setLive] = useState(false);
  const [linkNotices, setLinkNotices] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'fallback'>('idle');
  // Deadlines already overdue at this time are not announced (load, last edit).
  const [baselineAt, setBaselineAt] = useState<number | null>(null);
  const userChanged = useRef(false);
  const now = useNow(live);

  // After hydration only: read the browser zone, the link and the clock. These are external
  // to React and must not be read during render (the server cannot know them), so setting
  // state here once is intended.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const zone = browserZone() ?? EXAMPLE_DISPLAY_ZONE;
    const decoded = decodeQuery(window.location.search);
    setZones(allZones(zone));
    setDisplayZone(zone);
    setState({ ...EXAMPLE_STATE, awareAt: nowInstant(Date.now()), ...decoded.values });
    const notices: string[] = [];
    if (decoded.invalid.length) notices.push(s.result.linkInvalid);
    if (decoded.rulesVersion && decoded.rulesVersion !== version)
      notices.push(fill(s.result.linkOtherRules, { old: decoded.rulesVersion, current: version }));
    setLinkNotices(notices);
    setBaselineAt(Date.now());
    setLive(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    track('calculator_opened');
    // Runs once on mount by design.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (patch: Partial<CalculatorState>) => {
    userChanged.current = true;
    setCopyStatus('idle');
    // The last clock tick: deadlines already overdue then are not announced after this edit.
    setBaselineAt((prev) => now ?? prev);
    setState((prev) => ({ ...prev, ...patch }));
  };

  const query = encodeQuery(state, version);
  const input = toDeadlineInput(state);
  const zone = reportingZone(state);
  const country = countryByCode(state.country);
  // Cheap (a handful of rules), so recomputed on every render, including clock ticks.
  const result = input ? computeDeadlines(input, ruleSet) : null;
  const rows = result?.ok
    ? presentDeadlines(result.deadlines, ruleSet, { displayZone, reportingZone: zone })
    : [];
  const dueRows = rows.filter((r): r is DeadlineRow & { status: 'due' } => r.status === 'due');

  const deadlineName = (row: DeadlineRow) => `${row.rule.regime} ${s.stages[row.rule.stage]}`;

  // calculator_calculated: once per distinct input, 2 s after the person stops editing.
  // Dependencies are primitives so the one-second clock re-render does not reset the timer.
  const resultOk = result?.ok === true;
  const events = input?.events ?? [];
  const regimesProp = [...new Set(events.map((e) => e.regime))].sort().join(',');
  const eventTypesProp = [...new Set(events.map((e) => e.event_type))].sort().join(',');
  const lastTracked = useRef<string | null>(null);
  useEffect(() => {
    if (!userChanged.current || !resultOk || lastTracked.current === query) return;
    const timer = setTimeout(() => {
      lastTracked.current = query;
      track('calculator_calculated', { regimes: regimesProp, event_type: eventTypesProp });
    }, 2000);
    return () => clearTimeout(timer);
  }, [query, resultOk, regimesProp, eventTypesProp]);

  // Announce the deadline that most recently became overdue. Derived from the clock, so the
  // live region changes only when another deadline crosses its due time.
  const crossed =
    now === null || baselineAt === null
      ? []
      : dueRows.filter((r) => r.dueMs > baselineAt && r.dueMs <= now);
  const latest = crossed.reduce<(typeof crossed)[number] | null>(
    (a, r) => (a === null || r.dueMs >= a.dueMs ? r : a),
    null,
  );
  const announcement = latest ? fill(s.result.nowOverdue, { deadline: deadlineName(latest) }) : '';

  const shareUrl = () => `${window.location.origin}${window.location.pathname}${query}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopyStatus('copied');
      track('link_copied');
    } catch {
      setCopyStatus('fallback');
    }
  };

  const icsEvent = (row: DeadlineRow & { status: 'due' }, url: string): IcsEvent => {
    const name = `${deadlineName(row)} (${s.eventTypes[row.rule.event_type].toLowerCase()})`;
    return {
      // UID host follows the configured site URL (PUBLIC_SITE_URL), not the host it runs on.
      uid: `${row.rule.id}.${icsDate(row.dueAt)}.${shortHash(query)}@${new URL(siteUrl()).host}`,
      at: row.dueAt,
      summary: fill(s.ics.summary, { deadline: name }),
      description: [
        fill(s.ics.due, { reporting: row.display.reporting, utc: row.display.utc }),
        fill(s.ics.source, { url: row.rule.source_url }),
        fill(s.ics.rules, { version }),
        verification.allVerified ? s.result.notLegalAdvice : s.ics.disclaimer,
        url,
      ].join('\n'),
      url,
    };
  };

  const downloadIcs = (selection: (DeadlineRow & { status: 'due' })[], scope: 'single' | 'all') => {
    if (!selection.length) return;
    const url = shareUrl();
    const ics = buildIcs(
      selection.map((r) => icsEvent(r, url)),
      {
        now: formatInstant(DateTime.utc()),
        prodId: `-//${site.name}//Deadline calculator//EN`,
      },
    );
    const day = icsDate(selection[0]?.dueAt ?? '').slice(0, 8);
    const base = site.name.toLowerCase();
    const name =
      scope === 'all'
        ? `${base}-deadlines-${day}.ics`
        : `${base}-${selection[0]?.rule.id.replace(/[._]/g, '-')}-${day}.ics`;
    download(name, ics);
    track('ics_downloaded', { scope });
  };

  // Optional anchor fields appear when a selected rule counts from them.
  const selectedRules = ruleSet.rules.filter((r) => state.events.includes(eventKey(r)));
  const usesAnchor = (a: Anchor) => selectedRules.some((r) => r.anchor === a);
  const anchorValue = {
    fix_available_at: state.fixAvailableAt,
    notification_submitted_at: state.notificationSubmittedAt,
  };
  const setAnchor = (a: (typeof OPTIONAL_ANCHORS)[number], v: string | null) =>
    update(a === 'fix_available_at' ? { fixAvailableAt: v } : { notificationSubmittedAt: v });
  const fixBeforeAware =
    !!state.fixAvailableAt &&
    !!state.awareAt &&
    usesAnchor('fix_available_at') &&
    state.fixAvailableAt < state.awareAt;

  const caption = state.awareAt
    ? live
      ? fill(s.result.liveCaption, { time: formatZoned(parseInstant(state.awareAt), displayZone) })
      : fill(s.result.exampleCaption, { time: formatLongUtc(parseInstant(state.awareAt)) })
    : '';

  const instantMs = (v: string | null) => (v ? parseInstant(v).toMillis() : null);
  const timeline =
    state.awareAt && result?.ok
      ? timelineLayout({
          rows,
          awareMs: parseInstant(state.awareAt).toMillis(),
          anchors: {
            aware_at: instantMs(state.awareAt),
            fix_available_at: instantMs(state.fixAvailableAt),
            notification_submitted_at: instantMs(state.notificationSubmittedAt),
          },
          nowMs: now,
          laneOrder: availableEvents,
        })
      : null;

  // "Change" moves to the settings below the results (mobile) or beside them (desktop).
  const focusSettings = () => {
    const el = document.getElementById(`${id}-country`);
    el?.scrollIntoView({ block: 'center' });
    el?.focus({ preventScroll: true });
  };

  // DOM order is the mobile order: primary inputs → results → settings and optional fields.
  // On wide screens the grid puts settings under the primary inputs and the results beside them.
  return (
    <div className="calc">
      <div className="calc-primary" role="group" aria-labelledby={`${id}-form`}>
        <h2 id={`${id}-form`}>{s.formHeading}</h2>
        {linkNotices.map((n) => (
          <p key={n} className="calc-notice">
            {n}
          </p>
        ))}

        <EventPicker
          available={availableEvents}
          selected={state.events}
          strings={s}
          onChange={(events) => update({ events })}
        />

        <DateTimeField
          id={`${id}-aware`}
          label={s.aware.label}
          value={state.awareAt}
          zone={displayZone}
          required
          requiredMessage={s.aware.required}
          strings={s}
          onChange={(awareAt) => update({ awareAt })}
        >
          <button
            type="button"
            className="calc-link-button"
            onClick={() => update({ awareAt: nowInstant(Date.now()) })}
          >
            {s.aware.useNow}
          </button>
        </DateTimeField>
      </div>

      <section className="calc-result" aria-labelledby={`${id}-result`}>
        <h2 id={`${id}-result`}>{s.resultHeading}</h2>
        <p className="calc-notice">
          <strong>{s.result.notLegalAdvice}</strong>
          {!verification.allVerified && <> {s.result.unverified}</>}
        </p>
        <p className="calc-summary">
          {fill(s.result.summary, {
            country: country?.name ?? state.country,
            zone: displayZone.replace(/_/g, ' '),
          })}{' '}
          ·{' '}
          <button type="button" className="calc-link-button calc-inline" onClick={focusSettings}>
            {s.result.change}
          </button>
        </p>
        <p className="calc-caption">{caption}</p>

        {!state.awareAt ? (
          <p className="calc-empty">{s.result.noAware}</p>
        ) : state.events.length === 0 ? (
          <p className="calc-empty">{s.result.noEvents}</p>
        ) : result && !result.ok ? (
          <p className="calc-error" role="alert">
            {s.result.errors[result.error]}
          </p>
        ) : (
          <>
            {timeline && <Timeline layout={timeline} strings={s} />}
            <div className="calc-table-wrap">
              <DeadlineTable
                rows={rows}
                now={now}
                displayZone={displayZone.replace(/_/g, ' ')}
                reportingLabel={country?.name ?? zone}
                strings={s}
                deadlineName={deadlineName}
                onDownload={(row) => downloadIcs([row], 'single')}
              />
            </div>
          </>
        )}

        <div className="calc-actions">
          <button
            type="button"
            className="calc-button calc-button--primary"
            disabled={!dueRows.length}
            onClick={() => downloadIcs(dueRows, 'all')}
          >
            {s.result.downloadAll}
          </button>
          <button type="button" className="calc-button" onClick={copyLink} disabled={!live}>
            {s.result.copyLink}
          </button>
          <p role="status" className="calc-hint">
            {copyStatus === 'copied' ? s.result.copied : ''}
          </p>
        </div>
        {copyStatus === 'fallback' && (
          <div className="calc-field">
            <label htmlFor={`${id}-share`}>{s.result.copyFallback}</label>
            <input
              id={`${id}-share`}
              type="text"
              readOnly
              value={shareUrl()}
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>
        )}
        <p className="visually-hidden" role="status" aria-live="polite">
          {announcement}
        </p>
      </section>

      <div className="calc-settings">
        <div className="calc-field">
          <label htmlFor={`${id}-country`}>{s.country.label}</label>
          <select
            id={`${id}-country`}
            value={state.country}
            aria-describedby={`${id}-country-hint`}
            onChange={(e) => update({ country: e.target.value })}
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <p id={`${id}-country-hint`} className="calc-hint">
            {fill(s.country.hint, { zone })}
          </p>
        </div>

        <div className="calc-field">
          <label htmlFor={`${id}-zone`}>{s.displayZone.label}</label>
          <select
            id={`${id}-zone`}
            value={displayZone}
            aria-describedby={`${id}-zone-hint`}
            onChange={(e) => setDisplayZone(e.target.value)}
          >
            {zones.map((z) => (
              <option key={z} value={z}>
                {z.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
          <p id={`${id}-zone-hint`} className="calc-hint">
            {s.displayZone.hint}
          </p>
        </div>

        {OPTIONAL_ANCHORS.filter(usesAnchor).map((a) => (
          <DateTimeField
            key={a}
            id={`${id}-${a}`}
            label={s.anchors[a].label}
            hint={s.anchors[a].hint}
            value={anchorValue[a]}
            zone={displayZone}
            strings={s}
            onChange={(v) => setAnchor(a, v)}
          />
        ))}
        {fixBeforeAware && <p className="calc-notice">{s.fixBeforeAware}</p>}
      </div>
    </div>
  );
}
