---
title: 'When does the CRA 24-hour reporting clock start?'
description: 'The CRA early warning is due 24 hours after you become aware. What the regulation says about that moment, and a conservative routine for on-call teams.'
slug: cra-24-hour-clock
regimes: [CRA]
datePublished: 2026-10-27
dateModified: 2026-10-27
lastVerified: 2026-10-27
sources:
  - title: Regulation (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [cra-reporting-deadlines, cra-what-to-report, escalation-policy]
---

The clock starts when the manufacturer becomes aware of the actively exploited vulnerability or severe incident (Art. 14(2)(a), 14(4)(a)). Not when the alert fired, and not when the investigation is finished. The regulation does not define "becoming aware", so the safe reading is the earliest moment you could defend.

## What the text gives you

- An **actively exploited vulnerability** needs "reliable evidence that a malicious actor has exploited it in a system without permission of the system owner" (Art. 3(42)).
- Recital 68 describes it as the moment a manufacturer "establishes" that a breach resulted from a malicious actor using a flaw in its product.
- A **severe incident** is one that affects, or is capable of affecting, the protection of sensitive or important data or functions, or that leads or could lead to malicious code in the product or in a user's systems (Art. 14(5)).

So an alert alone usually does not start the clock. Reliable evidence of exploitation, or of a severe incident, does. See [what counts as reportable](/guides/cra-what-to-report/).

## A conservative routine

1. Write down the time of the first alert, even if it looks like an outage.
2. Write down the time someone first saw evidence of exploitation or a severe impact. Use this as "aware at".
3. If you are unsure between two times, use the earlier one. A report filed early costs nothing; a late one is a breach.
4. Keep the timeline. If an authority asks why you chose that moment, the timeline is your answer.

## Weekends and night shifts

The 24 hours are exact hours. Article 14 has no extension for nights, weekends or public holidays. An exploit confirmed at 03:12 on Saturday means an early warning by 03:12 on Sunday. That is why the [escalation policy](/guides/escalation-policy/) matters.

## Small companies

Microenterprises and small enterprises cannot be fined for missing the 24-hour early-warning deadline (Art. 64(10)(a)). The obligation to report still applies, and so do the 72-hour and final deadlines.

Work out the dates for your incident in the [deadline calculator](/deadlines/).
