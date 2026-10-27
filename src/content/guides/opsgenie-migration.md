---
title: 'Opsgenie is shutting down: a migration plan for small teams'
description: 'Atlassian is retiring Opsgenie. A one-week migration plan for a small team: inventory, must-haves, a parallel run and a real 3 a.m. test.'
slug: opsgenie-migration
regimes: [CRA]
topic: on-call
datePublished: 2026-10-27
dateModified: 2026-10-27
# TODO(verify): end-of-sale and end-of-support dates from Atlassian's own announcement; add it as a source, then publish.
lastVerified: null
draft: true
sources:
  - title: Regulation (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [on-call-rotation-small-team, escalation-policy, support-to-developer-escalation]
---

Atlassian is retiring Opsgenie and steering customers to Jira Service Management. TODO(verify): third-party summaries say new sign-ups stopped in early 2026 and the service ends in April 2027. A small team can move in a week if it starts with an inventory, not with a vendor demo.

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

Migration is a good moment to add the legal clocks. Under the Cyber Resilience Act, an actively exploited vulnerability starts a 24-hour reporting clock (Art. 14(2)(a)). We are building Within24 to import your Opsgenie schedules and run those clocks next to the paging. [Join early access](/early-access/).
