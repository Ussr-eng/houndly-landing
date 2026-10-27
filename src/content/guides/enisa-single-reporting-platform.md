---
title: 'ENISA Single Reporting Platform: how CRA reports are filed'
description: 'Every mandatory CRA report goes through ENISA’s Single Reporting Platform. Which CSIRT receives yours, what happens next, and what to prepare.'
slug: enisa-single-reporting-platform
regimes: [CRA]
datePublished: 2026-10-27
dateModified: 2026-10-27
# TODO(verify): portal, EU Login and "no API" facts against ENISA's SRP page; add it as a source, then publish.
lastVerified: null
draft: true
sources:
  - title: Regulation (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [cra-reporting-deadlines, cra-24-hour-clock, cra-what-to-report]
---

Every mandatory CRA report goes through one channel: the Single Reporting Platform (SRP) run by ENISA (Art. 14(1), 16(1)). You submit to the CSIRT of one Member State, and ENISA sees it at the same time. Work out which CSIRT is yours before an incident, not during one.

## Which CSIRT receives your report

You use the notification end-point of the CSIRT designated as coordinator in the Member State of your main establishment in the EU (Art. 14(7)). That is where decisions about the cybersecurity of your products are predominantly taken. If that cannot be determined, it is the Member State where you have the most employees in the EU.

No establishment in the EU? Use the first that applies (Art. 14(7)):

1. where your authorised representative for the most products is established;
2. where the importer placing the most of your products on the market is established;
3. where the distributor making the most of your products available is established;
4. where most of your users are.

## What happens after you submit

The CSIRT that receives the report passes it on through the platform to the CSIRTs of every Member State where you said the product is available (Art. 16(2)). That is why the early warning asks for those Member States. You can ask for dissemination to be delayed on justified cybersecurity grounds, for example during coordinated disclosure (Art. 16(2)).

## Prepare before your first incident

- Decide which Member State and CSIRT you report to, and write it in your runbook.
- Keep a list of Member States where each product is available.
- Keep product names, versions and a contact person ready to paste.
- Set up access before you need it. TODO(verify): the portal is portal.cra-srp.enisa.europa.eu; each person signs in with their own EU Login account and multi-factor authentication. Make sure at least two people can sign in.
- Agree who submits and who checks. TODO(verify): submission is a web form in English with no API, so a person always files the report.

Our free [Incident Kit](/incident-kit/) has fill-in templates for all three reports.
