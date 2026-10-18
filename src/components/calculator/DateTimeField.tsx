import { useState } from 'react';
import { formatUtc } from '../../lib/deadlines/format';
import { parseInstant } from '../../lib/deadlines/instant';
import type { WallClockKind } from '../../lib/deadlines/zoned';
import { instantToLocalInput, localInputToInstant } from '../../lib/calculator/local-input';
import { fill } from '../../i18n';
import type { UiStrings } from '../../i18n/en';

interface Props {
  id: string;
  label: string;
  hint?: string;
  /** Contract instant, or null when empty. */
  value: string | null;
  zone: string;
  required?: boolean;
  requiredMessage?: string;
  strings: UiStrings['calculator'];
  onChange: (instant: string | null) => void;
  children?: React.ReactNode;
}

/**
 * <input type="datetime-local"> read on the display zone's wall clock. Keeps the typed text
 * while it is incomplete, and explains DST gap/overlap readings.
 */
export function DateTimeField({
  id,
  label,
  hint,
  value,
  zone,
  required = false,
  requiredMessage,
  strings,
  onChange,
  children,
}: Props) {
  // What the person typed, valid only for the value and zone it was typed against. A value set
  // from outside (link, "current time") or a zone change makes it stale, so it is ignored.
  const [draft, setDraft] = useState<{
    text: string;
    kind: WallClockKind;
    value: string | null;
    zone: string;
  } | null>(null);
  const active = draft && draft.value === value && draft.zone === zone ? draft : null;
  const kind = active?.kind ?? 'normal';

  const shown = active ? active.text : value ? instantToLocalInput(value, zone) : '';
  const invalid =
    active !== null && active.text !== '' && localInputToInstant(active.text, zone) === null;
  const missing = required && !value && !invalid;

  const messages: string[] = [];
  if (hint) messages.push(hint);
  if (invalid) messages.push(strings.invalidDate);
  else if (missing && requiredMessage) messages.push(requiredMessage);
  else if (value) {
    const utc = formatUtc(parseInstant(value));
    if (kind === 'gap') messages.push(fill(strings.aware.gap, { utc }));
    else if (kind === 'ambiguous') messages.push(fill(strings.aware.ambiguous, { utc }));
    else messages.push(fill(strings.aware.readAs, { utc }));
  }

  return (
    <div className="calc-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="datetime-local"
        value={shown}
        required={required}
        aria-invalid={invalid || missing ? true : undefined}
        aria-describedby={messages.length ? `${id}-hint` : undefined}
        onChange={(e) => {
          const text = e.target.value;
          const parsed = localInputToInstant(text, zone);
          if (parsed) {
            setDraft({ text, kind: parsed.kind, value: parsed.instant, zone });
            onChange(parsed.instant);
          } else if (text === '') {
            setDraft({ text, kind: 'normal', value: null, zone });
            onChange(null);
          } else {
            // Incomplete: keep the text, keep the last valid value.
            setDraft({ text, kind: 'normal', value, zone });
          }
        }}
      />
      {messages.length > 0 && (
        <p id={`${id}-hint`} className="calc-hint">
          {messages.join(' ')}
        </p>
      )}
      {children}
    </div>
  );
}
