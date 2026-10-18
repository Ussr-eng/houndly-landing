import { eventTypes, regimes } from '../deadlines/types';
import type { DeadlineInput, EventType, IncidentEvent, Regime } from '../deadlines/types';
import { countryByCode, defaultCountry } from './countries';

/** "cra.actively_exploited_vulnerability": one (regime, event_type) pair. */
export type EventKey = `${Lowercase<Regime>}.${EventType}`;

export interface CalculatorState {
  /** Contract instants ("YYYY-MM-DDTHH:MM:SSZ") or null when empty. */
  awareAt: string | null;
  country: string;
  events: EventKey[];
  fixAvailableAt: string | null;
  notificationSubmittedAt: string | null;
}

/**
 * The server-rendered example and the first-visit default share these events, country and
 * optional fields, so the result table has the same rows before and after hydration.
 */
export const EXAMPLE_STATE: CalculatorState = {
  awareAt: '2026-10-01T09:00:00Z',
  country: defaultCountry,
  events: ['cra.actively_exploited_vulnerability'],
  fixAvailableAt: null,
  notificationSubmittedAt: null,
};
export const EXAMPLE_DISPLAY_ZONE = 'Europe/Brussels';

export function eventKey(e: IncidentEvent): EventKey {
  return `${e.regime.toLowerCase() as Lowercase<Regime>}.${e.event_type}`;
}

/** Parses "regime.event_type" with known regime and event type names; null otherwise. */
export function parseEventKey(key: string): IncidentEvent | null {
  const [regime, eventType, ...rest] = key.split('.');
  if (rest.length || !regime || !eventType) return null;
  const r = regimes.find((x) => x.toLowerCase() === regime);
  const t = eventTypes.find((x) => x === eventType);
  return r && t ? { regime: r, event_type: t } : null;
}

export function reportingZone(state: CalculatorState): string {
  return (countryByCode(state.country) ?? countryByCode(defaultCountry))?.zone ?? 'Europe/Brussels';
}

/** The computeDeadlines input, or null while required fields are missing. */
export function toDeadlineInput(state: CalculatorState): DeadlineInput | null {
  if (!state.awareAt || state.events.length === 0) return null;
  const events = state.events.map(parseEventKey).filter((e): e is IncidentEvent => e !== null);
  return {
    aware_at: state.awareAt,
    reporting_timezone: reportingZone(state),
    events,
    fix_available_at: state.fixAvailableAt,
    notification_submitted_at: state.notificationSubmittedAt,
  };
}
