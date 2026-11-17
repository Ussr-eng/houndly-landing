---
title: 'On-Call-Rotation für kleine Teams: einfach und haltbar'
description: 'Wie ein Team mit 3 bis 10 Engineers On-Call organisiert: Wochenschichten, Vertretung, Übergabe in der Arbeitszeit, ruhige Alarme, Ausgleich.'
slug: on-call-rotation-small-team
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
related: [escalation-policy, support-to-developer-escalation, cra-24-hour-clock]
---

Ein kleines Team braucht eine einfache Regel: jede Woche eine Hauptperson in Bereitschaft, eine Vertretung, eine Übergabe zu fester Zeit und Ausgleich nach einer harten Nacht. Alles andere ist optional, bis Sie mehr als etwa zehn Leute sind.

## Der Grund-Dienstplan

- **Wochenschichten.** Eine Person ist Hauptperson von Montag 10:00 Uhr bis zum nächsten Montag 10:00 Uhr. Kürzere Schichten bedeuten mehr Übergaben; längere brennen Leute aus.
- **Eine Vertretung.** Die nächste Person im Dienstplan ist Vertretung. Sie wird nur geweckt, wenn die Hauptperson nicht antwortet.
- **Übergabe in der Arbeitszeit.** Nie um Mitternacht übergeben. Eine Übergabe von 15 Minuten deckt offene Vorfälle und alles Wacklige ab.
- **Tauschen ist einfach.** Jede Person kann eine Schicht mit einer Kollegin oder einem Kollegen tauschen, und das Werkzeug zeigt, wer wirklich Bereitschaft hat.

## Wie viele Leute Sie brauchen

Mit drei Personen hat jede jede dritte Woche Bereitschaft, dazu Vertretungsdienst. Das geht eine Weile, ist aber schwer. Ab fünf Personen wird es auf Dauer tragbar. Unter drei sollten Sie ehrlich sagen, dass Sie keinen Bereitschaftsdienst haben, und das als geschäftliche Entscheidung treffen.

## Halten Sie die Alarme ruhig

Alarmieren Sie nur für Dinge, die jetzt einen Menschen brauchen. Alles andere geht in einen Kanal oder ein Ticket. Gehen Sie jeden Alarm bei der wöchentlichen Übergabe durch: Musste er niemanden wecken, ändern Sie den Alarm.

## Eine Nacht aus unserem eigenen Dienstplan

Einer der Leute, die Within24 bauen, wurde einmal nachts geweckt, um „einen Fehler“ zu beheben. Es stellte sich heraus, dass die gesamte Kunden-API ausgefallen war: Ein kürzliches Update ließ den Dienst den Arbeitsspeicher füllen, bis der Knoten umfiel. Die Lösung in dieser Nacht war einfach: den Knoten wieder hochfahren und die Kunden wieder arbeiten lassen. Die eigentliche Korrektur, das Speicherleck, wartete bis zum nächsten Arbeitstag.

Zwei Lehren für ein kleines Team. Nachts zuerst den Dienst wiederherstellen und die Ursache bei Tageslicht suchen. Und der Alarm sagte „Fehler“, nicht „API ausgefallen“: Ein besserer Alarm hätte ihm gesagt, was ihn erwartet, bevor er den Laptop aufklappte.

## Nach einer harten Nacht

Wer nachts wach war, fängt am nächsten Tag später an. Schreiben Sie das als Regel auf, damit niemand fragen muss.

## Wenn es ein rechtlicher Vorfall ist

Wenn Sie Software in der EU verkaufen, sieht die Person in Bereitschaft vielleicht als Erste eine aktiv ausgenutzte Schwachstelle. Damit beginnt nach dem Cyber Resilience Act eine 24-Stunden-Meldefrist (Art. 14 Abs. 2 Buchst. a). Nehmen Sie „Ist das meldepflichtig?“ in das On-Call-Runbook auf und lesen Sie, [wann die 24-Stunden-Frist beginnt](/guides/cra-24-hour-clock/).
