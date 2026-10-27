---
title: 'On-call rotation for small teams: a simple setup that lasts'
description: 'How a team of 3 to 10 engineers can run on-call: weekly shifts, a backup, handovers in working hours, a quiet pager and time off after a bad night.'
slug: on-call-rotation-small-team
regimes: [CRA]
topic: on-call
datePublished: 2026-10-27
dateModified: 2026-10-27
lastVerified: 2026-10-27
sources:
  - title: Regulation (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [escalation-policy, support-to-developer-escalation, cra-24-hour-clock]
---

A small team needs one simple rule: one primary on call each week, one backup, a handover at a fixed time, and time off after a bad night. Everything else is optional until you have more than about ten people.

## The basic rota

- **Weekly shifts.** One person is primary from Monday 10:00 to the next Monday 10:00. Shorter shifts mean more handovers; longer ones burn people out.
- **A backup.** The next person in the rota is backup. They are woken only if the primary does not answer.
- **Handover in working hours.** Never hand over at midnight. A 15-minute handover covers open incidents and anything fragile.
- **Swaps are easy.** Anyone can swap a shift with a colleague, and the tool shows the real person on call.

## How many people you need

With three people, each is on call every third week, plus backup duty. It works for a while, but it is heavy. With five or more it becomes sustainable. Below three, be honest that you have no on-call, and make that a business decision.

## Keep the pager quiet

Only page for things that need a human now. Everything else goes to a channel or a ticket. Review every page at the weekly handover: if it did not need waking someone, change the alert.

## A night from our own rota

Dmytro, who builds Within24, was once woken at night to fix "an error". It turned out the whole client API was down: a recent update made the service fill up the RAM until the node fell over. The fix that night was simple: bring the node back up and get customers working again. The real fix, the memory leak, waited until the next working day.

Two lessons for a small team. At night, restore the service first and find the root cause in daylight. And the alert said "error", not "API down": a better alert would have said what he was walking into before he opened the laptop.

## After a bad night

If someone was up at night, they start late the next day. Write it down as a rule, so nobody has to ask.

## When it is a legal incident

If you sell software in the EU, the on-call engineer may be the first to see an actively exploited vulnerability, which starts a 24-hour reporting clock under the Cyber Resilience Act (Art. 14(2)(a)). Put "is this reportable?" in the on-call runbook, and read [when the 24-hour clock starts](/guides/cra-24-hour-clock/).
