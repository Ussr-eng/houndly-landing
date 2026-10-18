// Types mirroring rules/schema.json and rules/case.schema.json. Semantics: rules/README.md.

export const regimes = ['CRA', 'NIS2', 'GDPR'] as const;
export type Regime = (typeof regimes)[number];

export const eventTypes = [
  'actively_exploited_vulnerability',
  'severe_incident',
  'significant_incident',
  'personal_data_breach',
] as const;
export type EventType = (typeof eventTypes)[number];

export type Stage = 'early_warning' | 'notification' | 'final_report';
export type Anchor = 'aware_at' | 'fix_available_at' | 'notification_submitted_at';
export type Offset = { hours: number } | { months: number };

export interface Rule {
  id: string;
  regime: Regime;
  event_type: EventType;
  stage: Stage;
  anchor: Anchor;
  offset: Offset;
  source_url: string;
  verified_at: string | null;
  notes: string;
}

export interface RuleSet {
  rule_set_version: string;
  rules: Rule[];
}

export interface IncidentEvent {
  regime: Regime;
  event_type: EventType;
}

/** Instants are UTC strings formatted exactly "YYYY-MM-DDTHH:MM:SSZ". */
export interface DeadlineInput {
  aware_at: string;
  reporting_timezone: string;
  events: IncidentEvent[];
  fix_available_at: string | null;
  notification_submitted_at: string | null;
}

export type Deadline =
  | { rule_id: string; status: 'due'; due_at: string }
  | { rule_id: string; status: 'waiting'; waiting_for: Anchor };

/** In precedence order: if several apply, the first wins. */
export const errorCodes = [
  'unsupported_event',
  'unknown_reporting_timezone',
  'notification_submitted_before_aware_at',
] as const;
export type ErrorCode = (typeof errorCodes)[number];

export type ComputeResult = { ok: true; deadlines: Deadline[] } | { ok: false; error: ErrorCode };
