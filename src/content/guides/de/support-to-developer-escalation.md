---
title: 'Wie der Support nachts den Entwickler erreicht'
description: 'Der Support sieht Probleme oft vor dem Monitoring. Ein einfacher Weg, den richtigen Entwickler zu wecken, und warum das für CRA-Meldungen zählt.'
slug: support-to-developer-escalation
locale: de
regimes: [CRA]
topic: on-call
datePublished: 2026-11-17
dateModified: 2026-11-17
lastVerified: 2026-10-27
sources:
  - title: Verordnung (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [escalation-policy, on-call-rotation-small-team, cra-what-to-report]
---

Der Support sieht ein Problem oft vor dem Monitoring: Ein Kunde schreibt, dass er sich nicht anmelden kann oder die Daten von jemand anderem sieht. Der Support braucht einen offensichtlichen Weg, den richtigen Entwickler zu wecken, ohne zu wissen, wer Bereitschaft hat, und ohne nach einer Telefonnummer zu suchen.

## Was ohne festen Ablauf schiefgeht

- Der Support schreibt um 2 Uhr nachts in einen Chat-Kanal, und niemand liest es vor dem Morgen.
- Der Support ruft jedes Mal den einen Entwickler an, dessen Nummer er hat.
- Der Support zögert, weil er nicht sicher ist, ob es „ernst genug“ ist.

## Ein einfacher Ablauf

1. **Ein Knopf oder eine Nummer**, die immer die Person erreicht, die gerade Bereitschaft hat. Der Support braucht nie den Dienstplan.
2. **Drei Fragen vor dem Anruf:** Was sieht der Kunde, wie viele Kunden sind betroffen, und könnten Daten oder Sicherheit betroffen sein?
3. **Die [Eskalationsrichtlinie](/guides/escalation-policy/) übernimmt:** Antwortet der Entwickler nicht, wird die Vertretung angerufen.
4. **Der Support bekommt eine Antwort:** „Ich übernehme“ oder „Das kann bis morgen warten“, damit er dem Kunden antworten kann.

## Erlauben Sie dem Support, Leute zu wecken

Schreiben Sie auf, dass es in Ordnung ist, einen Entwickler versehentlich zu wecken. Ein Fehlalarm kostet eine unterbrochene Nacht. Ein übersehener Sicherheitsvorfall kann eine verpasste gesetzliche Frist kosten.

## Wenn die Meldung des Kunden ein Sicherheitsvorfall ist

„Ich sehe die Daten eines anderen Kunden“ kann das erste Anzeichen einer ausgenutzten Schwachstelle sein. Nach dem Cyber Resilience Act beginnt die 24-Stunden-Frist, wenn der Hersteller Kenntnis erlangt (Art. 14 Abs. 2 Buchst. a). Ein Support-Ticket kann dieser Moment sein, deshalb muss es schnell bei einem Engineer ankommen. Siehe [was als meldepflichtig zählt](/guides/cra-what-to-report/).

Wir bauen einen Knopf „Entwickler anrufen“ für den Support in Within24 ein. [Frühen Zugang sichern](/early-access/).
