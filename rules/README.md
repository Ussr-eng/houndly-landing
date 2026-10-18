# Deadline rules

Source of truth for regulatory deadline computation. The backend (Python, `compute_deadlines`) and the
landing site (TypeScript, copied via its own sync command) implement this spec and must both pass every
case in `cases/`.

> Every rule is unverified (`verified_at: null`, `TODO(verify)` in `notes`) until checked against the
> official legal text. This is not legal advice.

## Files

| Path | Purpose |
|---|---|
| `schema.json` | JSON Schema (draft 2020-12) for a rule set file. |
| `v1.json` | Rule set `v1`. |
| `case.schema.json` | JSON Schema for a shared test case. |
| `cases/NNN-slug.json` | Shared test cases: input → expected deadlines or expected error. |

Schemas use `pattern` instead of `format`, so validators that ignore `format` (the default in Python
`jsonschema` and in `ajv`) still enforce them.

## Versioning

Rules are immutable within a version. Any change to a rule (offset, anchor, stage, or adding/removing
a rule) creates a new file `vN.json` with `rule_set_version: "vN"`. A computed deadline stores
`rule_id` and `rule_version`; recomputation of an existing deadline uses the version it was created
with. Setting `verified_at` or editing `notes`/`source_url` without changing behaviour does not need a new
version. `TODO(verify)`: confirm this policy for verification-only edits.

## Input

| Field | Meaning |
|---|---|
| `aware_at` | When the organisation became aware of the event. Always known. |
| `reporting_timezone` | IANA timezone of the competent authority's member state. Month offsets are counted on its wall clock. The user's display timezone is a UI concern and never affects computation. |
| `events` | List of `{regime, event_type}`: the incident's legal qualification under each applicable regime. |
| `fix_available_at` | When the **first corrective or mitigating measure was made available** (CRA wording). A mitigation counts, not only a full fix. `null` if not yet. |
| `notification_submitted_at` | When the notification stage was actually submitted. `null` if not yet. |

All instants are UTC, second precision, formatted exactly `YYYY-MM-DDTHH:MM:SSZ`.

## Algorithm

1. **Validate** (errors below). Otherwise continue.
2. **Select rules**: every rule whose `(regime, event_type)` equals one of the `events`. Rules are keyed by
   `id`; the result contains exactly one entry per selected rule, compared as a set (order is irrelevant).
3. **Resolve the anchor** value from the input. If it is `null`, the entry is
   `{ "rule_id", "status": "waiting", "waiting_for": <anchor> }` — never a date, never an estimate.
4. **Apply the offset** to get `due_at`:
   - **`hours`** — exact elapsed time: `due_at = anchor + N × 3600 s` on the UTC timeline. No rounding,
     no calendar days, no holiday extensions. The timezone is irrelevant (24h across a DST change is not
     "same local time tomorrow").
   - **`months`** — calendar months on the reporting timezone's wall clock:
     1. Convert the anchor to local date-time in `reporting_timezone`.
     2. Add N to the month (rolling the year as needed); keep hour, minute, second.
     3. **End of month — clamp**: if the day does not exist in the target month, use the last day of that
        month (Jan 31 + 1 month → Feb 28, or Feb 29 in a leap year). Never overflow into the next month.
     4. Convert the local date-time back to UTC with **disambiguation `"earlier"`**:
        - **DST gap** (local time does not exist): shift the wall-clock time *earlier* by the length of
          the gap, i.e. interpret it with the offset in effect *after* the transition.
          Example: `America/New_York` 2026-03-08 02:30 → 01:30 EST = `2026-03-08T06:30:00Z`.
        - **Ambiguous** (local time occurs twice): take the earlier of the two instants (the first
          occurrence, with the pre-transition offset).
          Example: `America/New_York` 2026-11-01 01:30 → 01:30 EDT = `2026-11-01T05:30:00Z`.
        - Equivalent formulation: compute the UTC instant under both candidate offsets and take the
          minimum.
5. **Output** `{ "rule_id", "status": "due", "due_at" }` with `due_at` in the instant format above.

Reference behaviour: JavaScript `Temporal` —
`zdt.add({ months: N }, { overflow: "constrain" })` on a `ZonedDateTime` in `reporting_timezone`, with
`disambiguation: "earlier"`. Python: month arithmetic on the naive local date-time, then the minimum of
the `fold=0` and `fold=1` conversions to UTC.

`compute_deadlines` is pure: no current time, no I/O. Whether a deadline is already missed is decided by
the caller with an explicit `now`.

## Errors

Error cases expect a stable code in `expected_error`; message text is not part of the contract.
If several errors apply, the first in this table wins.

| Code | When |
|---|---|
| `unsupported_event` | An `events` entry matches no rule in the rule set (e.g. `CRA` + `personal_data_breach`). |
| `unknown_reporting_timezone` | `reporting_timezone` is not a known IANA zone. |
| `notification_submitted_before_aware_at` | `notification_submitted_at` < `aware_at`. |

`TODO(verify)`: `fix_available_at` earlier than `aware_at` (the measure existed before the vulnerability was
known to be actively exploited). The 14-day final report could then fall before the 72h notification.
Currently not an error and not covered by a case; behaviour to be decided.

## Cases

Each case file has `id` equal to its file name, `rule_set_version`, `input`, and exactly one of
`expected` (complete list of deadlines for the selected rules) or `expected_error`. Cases with
`America/New_York` exercise US DST rules for the algorithm only; real reporting timezones are EU zones.

## Open TODO(verify)

- Article/paragraph numbers and periods for every rule (see each rule's `notes`).
- The three EUR-Lex ELI URLs.
- CRA: start date of the reporting obligations (believed 11 September 2026); whether the 72h
  notification counts from awareness; the reading of "corrective or mitigating measure".
- NIS2: national transposition differences; intermediate and progress reports are not modelled.
- GDPR: Art. 33(2), 33(4) and 34 have no fixed periods and are not modelled.
- That "becoming aware" maps to `aware_at` identically under all three regimes.
- Exact hours and clamped calendar months as the conservative reading; whether Regulation (EEC, Euratom)
  No 1182/71 on periods, dates and time limits applies.
- `fix_available_at` before `aware_at` (see Errors).
