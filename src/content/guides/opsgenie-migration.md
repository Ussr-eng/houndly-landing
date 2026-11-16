---
title: 'Opsgenie end of support: dates and a one-week migration plan'
description: 'Opsgenie support ends on 5 April 2027. The key dates and a one-week migration plan for a small team: inventory, a parallel run and a 3 a.m. test.'
slug: opsgenie-migration
regimes: [CRA]
topic: on-call
datePublished: 2026-10-27
dateModified: 2026-11-16
lastVerified: 2026-11-16
sources:
  - title: Opsgenie migration to Jira Service Management
    url: https://www.atlassian.com/software/opsgenie/migration
    publisher: Atlassian
  - title: Regulation (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [on-call-rotation-small-team, escalation-policy, support-to-developer-escalation]
---

Atlassian is shutting Opsgenie down and moving customers to Jira Service Management. Support ends on 5 April 2027. A small team can move in a week if it starts with an inventory, not with a vendor demo.

## Opsgenie end-of-support dates

- **4 June 2025, end of sale.** Since this date you can no longer change your Opsgenie edition or add sites. You can still buy extra seats until support ends.
- **5 April 2027, end of support.** Opsgenie is shut down and no longer accessible. Any data you have not moved is deleted.

Atlassian calls the second date "end of support". Elsewhere you will also see it called Opsgenie's end of life, or EOL. It is the same day.

## Step 1. Inventory what Opsgenie does for you today

- Schedules and rotations: who, which hours, which time zones, overrides.
- Escalation policies: who is paged after how many minutes.
- Integrations: which tools send alerts (Grafana, Sentry, CloudWatch, Datadog, email).
- Notification channels each person relies on: app push, SMS, phone call.
- Heartbeats and maintenance windows, if you use them.

Export schedules before you lose access.

## Step 2. Decide what you actually need

Most small teams use a fraction of Opsgenie. Write down the must-haves: a phone call that wakes someone, escalation to a second person, a weekly rotation and an "I'm on it" button. See [on-call rotation for small teams](/guides/on-call-rotation-small-team/).

## Step 3. Run both in parallel for a week

Point every integration at both tools. Compare which alerts arrive, how fast, and who gets woken. Switch off Opsgenie only after a week with no differences.

## Step 4. Test the 3 a.m. path

Trigger a test alert at night with the real on-call person. Check that the phone actually rings, and that the [escalation](/guides/escalation-policy/) reaches the second person if nobody answers.

## If you build software sold in the EU

Migration is a good moment to add the legal clocks. Under the Cyber Resilience Act, an actively exploited vulnerability starts a 24-hour reporting clock (Art. 14(2)(a)). We are building Within24 to import your Opsgenie schedules and run those clocks next to the paging. See [Within24 as an Opsgenie alternative for small teams](/opsgenie-alternative/).
