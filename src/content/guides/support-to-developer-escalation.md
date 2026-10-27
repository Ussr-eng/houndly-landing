---
title: 'How support staff can reach the on-call developer at night'
description: 'Support often sees a problem before monitoring does. A simple way for support staff to wake the right developer, and why it matters for CRA reporting.'
slug: support-to-developer-escalation
regimes: [CRA]
topic: on-call
datePublished: 2026-10-27
dateModified: 2026-10-27
lastVerified: 2026-10-27
sources:
  - title: Regulation (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [escalation-policy, on-call-rotation-small-team, cra-what-to-report]
---

Support often sees a problem before monitoring does: a customer writes that they cannot log in, or that they see someone else's data. Support staff need one obvious way to wake the right developer, without knowing who is on call or digging for a phone number.

## What goes wrong without a process

- Support posts in a chat channel at 2 a.m. and nobody reads it until morning.
- Support calls the one developer whose number they have, every time.
- Support hesitates, because they are not sure it is "serious enough".

## A simple process

1. **One button or one number** that always reaches whoever is on call now. Support never needs the rota.
2. **Three questions before the call:** what the customer sees, how many customers, and whether data or security may be affected.
3. **The [escalation policy](/guides/escalation-policy/) takes over:** if the developer does not answer, the backup is called.
4. **Support gets an answer:** "I'm on it" or "this can wait until morning", so they can reply to the customer.

## Give support permission to wake people

Write down that waking a developer by mistake is fine. The cost of a false alarm is one interrupted night. The cost of a missed security incident can be a missed legal deadline.

## When the customer's report is a security incident

"I can see another customer's data" may be the first sign of an exploited vulnerability. Under the Cyber Resilience Act, the 24-hour clock starts when the manufacturer becomes aware (Art. 14(2)(a)). A support ticket can be that moment, so it must reach an engineer fast. See [what counts as reportable](/guides/cra-what-to-report/).

We are building a "Call a developer" button for support staff into Within24. [Join early access](/early-access/).
