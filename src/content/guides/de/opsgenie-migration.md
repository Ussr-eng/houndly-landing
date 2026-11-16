---
title: 'Opsgenie Support-Ende: Termine und Migrationsplan'
description: 'Der Support für Opsgenie endet am 5. April 2027. Die wichtigsten Termine und ein Migrationsplan für kleine Teams: Inventur, Parallelbetrieb, Nachttest.'
slug: opsgenie-migration
locale: de
regimes: [CRA]
topic: on-call
datePublished: 2026-11-16
dateModified: 2026-11-16
lastVerified: 2026-11-16
sources:
  - title: Opsgenie migration to Jira Service Management
    url: https://www.atlassian.com/software/opsgenie/migration
    publisher: Atlassian
  - title: Verordnung (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [on-call-rotation-small-team, escalation-policy, support-to-developer-escalation]
---

Atlassian stellt Opsgenie ein und überführt die Kunden zu Jira Service Management. Der Support endet am 5. April 2027. Ein kleines Team schafft den Umzug in einer Woche, wenn es mit einer Inventur beginnt und nicht mit einer Anbieter-Demo.

## Opsgenie Support-Ende: die Termine

- **4. Juni 2025, Verkaufsende (End of Sale).** Seit diesem Tag können Sie Ihre Opsgenie-Edition nicht mehr wechseln und keine weiteren Sites hinzufügen. Zusätzliche Lizenzen können Sie bis zum Support-Ende noch kaufen.
- **5. April 2027, Support-Ende (End of Support).** Opsgenie wird abgeschaltet und ist nicht mehr erreichbar. Alle Daten, die Sie bis dahin nicht umgezogen haben, werden gelöscht.

Atlassian nennt den zweiten Termin „End of Support“. Andernorts ist auch vom End of Life (EOL) von Opsgenie die Rede. Gemeint ist derselbe Tag.

## Schritt 1. Inventur: Was erledigt Opsgenie heute für Sie?

- Dienstpläne und Rotationen: wer, zu welchen Zeiten, in welchen Zeitzonen, mit welchen Vertretungen.
- Eskalationsregeln: wer nach wie vielen Minuten alarmiert wird.
- Integrationen: welche Werkzeuge Alarme senden (Grafana, Sentry, CloudWatch, Datadog, E-Mail).
- Benachrichtigungskanäle, auf die sich jede Person verlässt: App-Push, SMS, Anruf.
- Heartbeats und Wartungsfenster, falls Sie sie nutzen.

Exportieren Sie die Dienstpläne, bevor Sie den Zugang verlieren.

## Schritt 2. Entscheiden, was Sie wirklich brauchen

Die meisten kleinen Teams nutzen nur einen Bruchteil von Opsgenie. Schreiben Sie das Unverzichtbare auf: ein Anruf, der jemanden weckt, die Eskalation an eine zweite Person, eine wöchentliche Rotation und ein Knopf „Ich kümmere mich“. Mehr dazu im englischen Leitfaden [On-call rotation for small teams](/guides/on-call-rotation-small-team/).

## Schritt 3. Eine Woche lang beide Werkzeuge parallel betreiben

Richten Sie jede Integration auf beide Werkzeuge aus. Vergleichen Sie, welche Alarme ankommen, wie schnell sie ankommen und wer geweckt wird. Schalten Sie Opsgenie erst nach einer Woche ohne Abweichungen ab.

## Schritt 4. Den Weg um 3 Uhr nachts testen

Lösen Sie nachts einen Testalarm aus, mit der Person, die wirklich Bereitschaft hat. Prüfen Sie, ob das Telefon tatsächlich klingelt und ob die [Eskalation](/guides/escalation-policy/) die zweite Person erreicht, wenn niemand reagiert.

## Wenn Sie Software in der EU verkaufen

Der Umzug ist ein guter Zeitpunkt, um die gesetzlichen Fristen mit aufzunehmen. Nach dem Cyber Resilience Act beginnt mit einer aktiv ausgenutzten Schwachstelle eine Meldefrist von 24 Stunden (Art. 14 Abs. 2 Buchst. a). Wir bauen Within24 so, dass es Ihre Opsgenie-Dienstpläne importiert und diese Fristen neben der Alarmierung mitlaufen lässt. Mehr auf der englischen Seite [Within24 as an Opsgenie alternative for small teams](/opsgenie-alternative/).
