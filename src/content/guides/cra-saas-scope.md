---
title: 'Does the Cyber Resilience Act apply to SaaS?'
description: 'Pure SaaS is generally covered by NIS2, not the CRA. But the backend of an app or device you ship is in scope. Three common cases, with the articles.'
slug: cra-saas-scope
regimes: [CRA, NIS2]
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
related: [cra-what-to-report, cra-nis2-gdpr-reporting, cra-reporting-deadlines]
---

Pure SaaS, on its own, is generally not a "product with digital elements" under the CRA. Recital 12 says that SaaS, PaaS and IaaS fall under the NIS2 Directive instead. But the cloud part of a product you ship is in scope, and many SaaS companies ship something.

## What the CRA covers

The CRA applies to products with digital elements made available on the EU market that connect to a device or network (Art. 2(1)). A product with digital elements is "a software or hardware product and its remote data processing solutions" (Art. 3(1)).

Remote data processing is in scope only when (Art. 3(2)):

- you, the manufacturer, designed and developed it, or it is under your responsibility; and
- without it, the product could not perform one of its functions.

## Three common cases

| You ship                                                              | CRA?                                                        | Why                                 |
| --------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------- |
| A web app used only in the browser, nothing installed                 | Generally no; NIS2 may apply                                | Recital 12: SaaS is covered by NIS2 |
| A mobile or desktop app, an agent, an SDK or a CLI, plus your backend | Yes: the app, and the backend as its remote data processing | Art. 3(1), 3(2)                     |
| A device with a cloud dashboard that controls it                      | Yes: device and cloud                                       | Recital 12 gives this exact example |

Recital 12 also says websites that do not support a product's functionality are out of scope.

## If you are in scope

The reporting duty in Article 14 covers your product, including its remote data processing. An exploited flaw in the backend your app depends on can be a reportable event. See [what counts as reportable](/guides/cra-what-to-report/).

## If you are pure SaaS

NIS2 may apply instead: recital 12 of the CRA says cloud computing providers that are medium-sized or larger fall within NIS2. NIS2 has its own early warning within 24 hours of becoming aware of a significant incident (NIS2 Art. 23(4)(a)). See [one incident, several clocks](/guides/cra-nis2-gdpr-reporting/).

Borderline products are exactly where you should ask a lawyer.
