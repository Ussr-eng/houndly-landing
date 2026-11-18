---
title: 'Eskalation für kleine Teams: wer wann geweckt wird'
description: 'Eine erste Eskalationsrichtlinie für kleine Teams: wer nach wie vielen Minuten angerufen wird, warum Anrufe, und warum Meldefristen nicht warten.'
slug: escalation-policy
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
related: [on-call-rotation-small-team, support-to-developer-escalation, cra-24-hour-clock]
---

Eine Eskalationsrichtlinie beantwortet eine Frage: Wenn die Person in Bereitschaft nicht reagiert, wer ist als Nächstes dran und nach wie langer Zeit? Schreiben Sie sie auf, bevor die erste Nacht kommt, in der Sie sie brauchen.

## Eine erste Richtlinie

| Minuten nach dem Alarm | Wer                          | Wie                                |
| ---------------------- | ---------------------------- | ---------------------------------- |
| 0                      | Hauptperson in Bereitschaft  | Push-Benachrichtigung und Telegram |
| 5                      | Hauptperson in Bereitschaft  | Anruf                              |
| 15                     | Vertretung                   | Anruf                              |
| 30                     | Engineering-Leitung oder CTO | Anruf                              |

Die Kette stoppt, sobald jemand „Ich übernehme“ tippt. Bestätigen heißt: Sie kümmern sich darum, nicht: Es ist behoben.

## Warum Anrufe

Push-Benachrichtigungen und Chatnachrichten verschläft man leicht. Einen Anruf, der immer wieder klingelt, nicht. Nutzen Sie Anrufe für Alarme, die jemanden wecken müssen, und leisere Kanäle für alles andere.

## Verschiedene Alarme, verschiedene Geschwindigkeiten

- **Dringend:** Kunden betroffen oder Sicherheit gefährdet. Volle Kette, Anrufe.
- **Kann bis morgen warten:** eingeschränkt, aber funktionsfähig. Nur eine Nachricht, nachts keine Eskalation.
- **Möglicherweise meldepflichtig:** Anzeichen einer Ausnutzung oder eines Sicherheitsvorfalls. Volle Kette, und die Eskalation erreicht jemanden, der über eine gesetzliche Meldung entscheiden kann.

## Gesetzliche Fristen warten nicht auf die Eskalation

Nach dem Cyber Resilience Act läuft die 24-Stunden-Frist für die Frühwarnung ab dem Moment, in dem Sie Kenntnis von einer aktiv ausgenutzten Schwachstelle erlangen (Art. 14 Abs. 2 Buchst. a); siehe [wann die Frist beginnt](/guides/cra-24-hour-clock/). Dreißig Minuten Eskalation sind in Ordnung. Fünf Stunden, weil niemand rangegangen ist, nicht. Testen Sie die Kette monatlich mit einem Testalarm.
