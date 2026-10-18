import { useId, useState } from 'react';
import type { EventKey } from '../../lib/calculator/state';
import type { UiStrings } from '../../i18n/en';

type CraAnswer = 'no' | 'vulnerability' | 'incident' | 'both';
type YesNo = 'yes' | 'no';

interface Props {
  available: EventKey[];
  selected: EventKey[];
  strings: UiStrings['calculator'];
  onChange: (events: EventKey[]) => void;
}

/** Events chosen from the helper's answers. The person still confirms the boxes. */
export function eventsFromAnswers(cra: CraAnswer, nis2: YesNo, gdpr: YesNo): EventKey[] {
  const out: EventKey[] = [];
  if (cra === 'vulnerability' || cra === 'both') out.push('cra.actively_exploited_vulnerability');
  if (cra === 'incident' || cra === 'both') out.push('cra.severe_incident');
  if (nis2 === 'yes') out.push('nis2.significant_incident');
  if (gdpr === 'yes') out.push('gdpr.personal_data_breach');
  return out;
}

export function EventPicker({ available, selected, strings, onChange }: Props) {
  const s = strings;
  const uid = useId();
  const [cra, setCra] = useState<CraAnswer>('no');
  const [nis2, setNis2] = useState<YesNo>('no');
  const [gdpr, setGdpr] = useState<YesNo>('no');
  const [applied, setApplied] = useState<string>('');

  const radio = <T extends string>(
    group: string,
    value: T,
    current: T,
    set: (v: T) => void,
    label: string,
  ) => (
    <label className="calc-choice" key={value}>
      <input
        type="radio"
        name={`${uid}-${group}`}
        value={value}
        checked={current === value}
        onChange={() => set(value)}
      />
      {label}
    </label>
  );

  const toggle = (key: EventKey, on: boolean) =>
    onChange(available.filter((k) => (k === key ? on : selected.includes(k))));

  return (
    <div className="calc-events">
      <details className="calc-helper">
        <summary>{s.helper.summary}</summary>
        <fieldset>
          <legend>{s.helper.cra.legend}</legend>
          {radio('cra', 'no', cra, setCra, s.helper.cra.no)}
          {radio('cra', 'vulnerability', cra, setCra, s.helper.cra.vulnerability)}
          {radio('cra', 'incident', cra, setCra, s.helper.cra.incident)}
          {radio('cra', 'both', cra, setCra, s.helper.cra.both)}
        </fieldset>
        <fieldset>
          <legend>{s.helper.nis2.legend}</legend>
          {radio('nis2', 'yes', nis2, setNis2, s.helper.nis2.yes)}
          {radio('nis2', 'no', nis2, setNis2, s.helper.nis2.no)}
        </fieldset>
        <fieldset>
          <legend>{s.helper.gdpr.legend}</legend>
          {radio('gdpr', 'yes', gdpr, setGdpr, s.helper.gdpr.yes)}
          {radio('gdpr', 'no', gdpr, setGdpr, s.helper.gdpr.no)}
        </fieldset>
        <button
          type="button"
          className="calc-button"
          onClick={() => {
            const events = eventsFromAnswers(cra, nis2, gdpr).filter((k) => available.includes(k));
            onChange(events);
            setApplied(events.length ? s.helper.applied : s.helper.appliedNone);
          }}
        >
          {s.helper.apply}
        </button>
        <p role="status" className="calc-hint">
          {applied}
        </p>
        <p className="calc-hint">{s.helper.disclaimer}</p>
      </details>

      <fieldset>
        <legend>{s.events.legend}</legend>
        <p className="calc-hint">{s.events.hint}</p>
        {available.map((key) => (
          <label className="calc-choice" key={key}>
            <input
              type="checkbox"
              name="events"
              value={key}
              checked={selected.includes(key)}
              onChange={(e) => toggle(key, e.target.checked)}
            />
            {s.events.labels[key as keyof typeof s.events.labels] ?? key}
          </label>
        ))}
      </fieldset>
    </div>
  );
}
