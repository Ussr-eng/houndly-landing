---
title: 'CRA, NIS2 and GDPR: one incident, several reporting clocks'
description: 'One security incident can start reporting clocks under the CRA, NIS2 and GDPR at once. Triggers, deadlines and recipients side by side, with the articles.'
slug: cra-nis2-gdpr-reporting
regimes: [CRA, NIS2, GDPR]
datePublished: 2026-10-27
dateModified: 2026-10-27
lastVerified: 2026-10-27
sources:
  - title: Regulation (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
  - title: Directive (EU) 2022/2555 (NIS2)
    url: https://eur-lex.europa.eu/eli/dir/2022/2555/oj
    publisher: EUR-Lex
  - title: Regulation (EU) 2016/679 (GDPR)
    url: https://eur-lex.europa.eu/eli/reg/2016/679/oj
    publisher: EUR-Lex
related: [cra-reporting-deadlines, cra-saas-scope, cra-24-hour-clock]
---

One security incident can start up to three legal clocks at once, each with its own recipient. The CRA covers your product, NIS2 covers your organisation as an essential or important entity, and GDPR covers personal data. Each law is checked separately; reporting under one does not discharge the others.

NIS2 is a directive: the duty to report comes from your country's national law, which transposes Article 23. The deadlines below are the ones the directive sets; check your national law for the details and the authority you report to.

## Side by side

|                  | CRA                                                                                     | NIS2                                                                                                                 | GDPR                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| What triggers it | Actively exploited vulnerability or severe incident in your product (Art. 14(1), 14(3)) | Significant incident: severe operational disruption or financial loss, or considerable damage to others (Art. 23(3)) | Personal data breach, unless unlikely to result in a risk to people (Art. 33(1)) |
| Who reports      | Manufacturer of the product                                                             | Essential or important entity (Art. 23(1))                                                                           | Controller; a processor tells the controller without undue delay (Art. 33(2))    |
| First deadline   | Early warning, 24 h after becoming aware                                                | Early warning, 24 h after becoming aware (Art. 23(4)(a))                                                             | Notification, where feasible within 72 h after becoming aware (Art. 33(1))       |
| Second           | Notification, 72 h                                                                      | Incident notification, 72 h (Art. 23(4)(b))                                                                          | Information can follow in phases (Art. 33(4))                                    |
| Final            | 14 days after a fix (vulnerability); 1 month after the notification (incident)          | 1 month after the incident notification; a progress report if still ongoing (Art. 23(4)(d), (e))                     | —                                                                                |
| To whom          | National CSIRT and ENISA, via the Single Reporting Platform (Art. 14(7))                | National CSIRT or competent authority (Art. 23(1))                                                                   | Competent supervisory authority (Art. 33(1))                                     |

GDPR adds one thing the others don't: a notification made after 72 hours must give reasons for the delay (Art. 33(1)). Where a breach is likely to result in a high risk to people, you also tell the people affected (Art. 34).

## A worked example

An attacker uses a flaw in your mobile app's login to read customer accounts. That can be:

- a CRA actively exploited vulnerability, because a malicious actor used a flaw in your product;
- a GDPR personal data breach, because customer data was accessed;
- a NIS2 significant incident, if your company is in NIS2 scope.

Three reports, three recipients, and the earliest deadline is 24 hours.

## How to keep up

Keep one incident timeline and write each report from it, so the facts match. The [deadline calculator](/deadlines/) shows all clocks for an incident on parallel lanes, one per law.
