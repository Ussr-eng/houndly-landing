---
title: 'CRA: what counts as a reportable vulnerability or incident'
description: 'The CRA makes two kinds of event reportable: an actively exploited vulnerability and a severe incident. What each means, with examples and a quick triage.'
slug: cra-what-to-report
regimes: [CRA]
datePublished: 2026-10-27
dateModified: 2026-10-27
lastVerified: 2026-10-27
sources:
  - title: Regulation (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [cra-reporting-deadlines, cra-24-hour-clock, cra-saas-scope]
---

The CRA makes two kinds of event reportable: an actively exploited vulnerability in your product, and a severe incident that affects its security (Art. 14(1), 14(3)). An ordinary bug, an outage, or a vulnerability nobody has exploited is not on the mandatory list.

## Actively exploited vulnerability

A vulnerability "for which there is reliable evidence that a malicious actor has exploited it in a system without permission of the system owner" (Art. 3(42)).

- **Report it:** logs show an attacker used an authentication flaw in your product to get into a customer's account.
- **You don't have to report it:** a security researcher finds the same flaw and tells you in good faith. Recital 68 says vulnerabilities found "with no malicious intent for purposes of good faith testing" should not be subject to mandatory notification. You can still report voluntarily (Art. 15).

## Severe incident

An incident having an impact on the security of the product is severe when it (Art. 14(5)):

- negatively affects, or is capable of affecting, the product's ability to protect the availability, authenticity, integrity or confidentiality of sensitive or important data or functions; or
- has led, or is capable of leading, to malicious code in the product or in a user's network and information systems.

Recital 68 gives an example: an attacker successfully introduces malicious code into the release channel you use to ship security updates.

## A quick triage for the on-call engineer

1. Is there evidence someone exploited a flaw in our product without permission? If yes, it is an actively exploited vulnerability.
2. Did something hit our build, release or update process, or could it put malicious code on users' systems? If yes, it is likely a severe incident.
3. Is it only downtime, with no security impact? Then the CRA reporting duty does not apply. [NIS2 or GDPR still might](/guides/cra-nis2-gdpr-reporting/).

When in doubt, start the clocks and decide with a second person. Stopping a clock you did not need costs nothing. The [deadline calculator](/deadlines/) shows every clock for the event.
