// Calculator state in the URL query. No personal data: times, a country code, event types and
// the rule set version. The display zone is deliberately not included.
//
//   ?aware=2026-10-01T09:00Z&country=be&events=cra.actively_exploited_vulnerability,gdpr.personal_data_breach
//    &fix=2026-10-05T12:00Z&sub=2026-10-03T15:00Z&rules=v1

import { isInstant } from '../deadlines/instant';
import { countryByCode } from './countries';
import { eventKey, parseEventKey, type CalculatorState, type EventKey } from './state';

const QUERY_INSTANT = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})(:\d{2})?Z$/;

function encodeInstant(instant: string): string {
  return instant.endsWith(':00Z') ? instant.slice(0, -4) + 'Z' : instant;
}

function decodeInstant(value: string): string | null {
  const m = QUERY_INSTANT.exec(value);
  if (!m) return null;
  const instant = `${m[1]}${m[2] ?? ':00'}Z`;
  return isInstant(instant) ? instant : null;
}

export function encodeQuery(state: CalculatorState, rulesVersion: string): string {
  const parts: [string, string][] = [];
  if (state.awareAt) parts.push(['aware', encodeInstant(state.awareAt)]);
  parts.push(['country', state.country.toLowerCase()]);
  if (state.events.length) parts.push(['events', state.events.join(',')]);
  if (state.fixAvailableAt) parts.push(['fix', encodeInstant(state.fixAvailableAt)]);
  if (state.notificationSubmittedAt)
    parts.push(['sub', encodeInstant(state.notificationSubmittedAt)]);
  parts.push(['rules', rulesVersion]);
  // Values only contain [a-z0-9._:,-]; keep ":" and "," readable.
  return (
    '?' +
    parts
      .map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%3A/g, ':').replace(/%2C/g, ',')}`)
      .join('&')
  );
}

export interface DecodedQuery {
  values: Partial<CalculatorState>;
  /** Parameter names whose values could not be read. */
  invalid: string[];
  rulesVersion: string | null;
}

export function decodeQuery(search: string): DecodedQuery {
  const params = new URLSearchParams(search);
  const values: Partial<CalculatorState> = {};
  const invalid: string[] = [];

  const instant = (name: string, key: 'awareAt' | 'fixAvailableAt' | 'notificationSubmittedAt') => {
    const raw = params.get(name);
    if (raw === null) return;
    const parsed = decodeInstant(raw);
    if (parsed) values[key] = parsed;
    else invalid.push(name);
  };
  instant('aware', 'awareAt');
  instant('fix', 'fixAvailableAt');
  instant('sub', 'notificationSubmittedAt');

  const country = params.get('country');
  if (country !== null) {
    const c = countryByCode(country);
    if (c) values.country = c.code;
    else invalid.push('country');
  }

  const events = params.get('events');
  if (events !== null) {
    const keys: EventKey[] = [];
    let bad = false;
    for (const part of events.split(',').filter(Boolean)) {
      const e = parseEventKey(part);
      if (e) keys.push(eventKey(e));
      else bad = true;
    }
    if (bad) invalid.push('events');
    values.events = [...new Set(keys)];
  }

  const rules = params.get('rules');
  return { values, invalid, rulesVersion: rules && /^v[1-9]\d*$/.test(rules) ? rules : null };
}
