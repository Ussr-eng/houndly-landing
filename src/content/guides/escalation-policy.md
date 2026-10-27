---
title: 'Escalation policy for small teams: who gets woken and when'
description: 'A starting escalation policy for a small team: who is called after how many minutes, why phone calls, and why legal reporting clocks do not wait.'
slug: escalation-policy
regimes: [CRA]
topic: on-call
datePublished: 2026-10-27
dateModified: 2026-10-27
lastVerified: 2026-10-27
sources:
  - title: Regulation (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [on-call-rotation-small-team, support-to-developer-escalation, cra-24-hour-clock]
---

An escalation policy answers one question: if the person on call does not respond, who is next and after how long? Write it down before the first night it is needed.

## A starting policy

| Minutes after the alert | Who                     | How                            |
| ----------------------- | ----------------------- | ------------------------------ |
| 0                       | Primary on call         | Push notification and Telegram |
| 5                       | Primary on call         | Phone call                     |
| 15                      | Backup                  | Phone call                     |
| 30                      | Engineering lead or CTO | Phone call                     |

The chain stops as soon as someone taps "I'm on it". Acknowledging means you own it, not that it is fixed.

## Why phone calls

Push notifications and chat messages are easy to sleep through. A phone call that keeps ringing is not. Use calls for alerts that must wake someone, and quieter channels for everything else.

## Different alerts, different speeds

- **Urgent:** customers affected or security at risk. Full chain, phone calls.
- **Can wait until morning:** degraded but working. Message only, no escalation at night.
- **Possibly reportable:** signs of exploitation or a security incident. Full chain, and the escalation reaches someone who can decide on legal reporting.

## Legal clocks do not wait for escalation

Under the Cyber Resilience Act, the 24-hour early-warning clock runs from when you become aware of an actively exploited vulnerability (Art. 14(2)(a)); see [when the clock starts](/guides/cra-24-hour-clock/). Thirty minutes of escalation is fine. Five hours because nobody answered is not. Test the chain monthly with a fake alert.
