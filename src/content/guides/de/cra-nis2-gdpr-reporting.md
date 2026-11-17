---
title: 'CRA, NIS2 und DSGVO: ein Vorfall, mehrere Meldefristen'
description: 'Ein Sicherheitsvorfall kann Meldefristen nach CRA, NIS2 und DSGVO gleichzeitig starten. Auslöser, Fristen und Empfänger nebeneinander, mit den Artikeln.'
slug: cra-nis2-gdpr-reporting
locale: de
regimes: [CRA, NIS2, GDPR]
datePublished: 2026-11-17
dateModified: 2026-11-17
lastVerified: 2026-10-27
sources:
  - title: Verordnung (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
  - title: Richtlinie (EU) 2022/2555 (NIS2)
    url: https://eur-lex.europa.eu/eli/dir/2022/2555/oj
    publisher: EUR-Lex
  - title: Verordnung (EU) 2016/679 (DSGVO)
    url: https://eur-lex.europa.eu/eli/reg/2016/679/oj
    publisher: EUR-Lex
related: [cra-reporting-deadlines, cra-saas-scope, cra-24-hour-clock]
---

Ein Sicherheitsvorfall kann bis zu drei gesetzliche Fristen gleichzeitig starten, jede mit einem eigenen Empfänger. Der CRA betrifft Ihr Produkt, NIS2 Ihre Organisation als wesentliche oder wichtige Einrichtung und die DSGVO personenbezogene Daten. Jedes Gesetz wird getrennt geprüft; eine Meldung nach dem einen erfüllt die anderen nicht.

NIS2 ist eine Richtlinie: Die Meldepflicht ergibt sich aus dem nationalen Recht Ihres Landes, das Artikel 23 umsetzt. Die Fristen unten sind die der Richtlinie; Einzelheiten und die zuständige Behörde finden Sie in Ihrem nationalen Recht.

## Nebeneinander

|             | CRA                                                                                                            | NIS2                                                                                                                                   | DSGVO                                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Auslöser    | Aktiv ausgenutzte Schwachstelle oder schwerwiegender Vorfall in Ihrem Produkt (Art. 14 Abs. 1, Art. 14 Abs. 3) | Erheblicher Sicherheitsvorfall: schwere Betriebsstörung oder finanzielle Verluste oder erheblicher Schaden für andere (Art. 23 Abs. 3) | Verletzung des Schutzes personenbezogener Daten, außer sie führt voraussichtlich nicht zu einem Risiko für Personen (Art. 33 Abs. 1) |
| Wer meldet  | Hersteller des Produkts                                                                                        | Wesentliche oder wichtige Einrichtung (Art. 23 Abs. 1)                                                                                 | Verantwortlicher; ein Auftragsverarbeiter informiert den Verantwortlichen unverzüglich (Art. 33 Abs. 2)                              |
| Erste Frist | Frühwarnung, 24 Std nach Kenntniserlangung                                                                     | Frühwarnung, 24 Std nach Kenntniserlangung (Art. 23 Abs. 4 Buchst. a)                                                                  | Meldung, möglichst binnen 72 Std nach Kenntniserlangung (Art. 33 Abs. 1)                                                             |
| Zweite      | Meldung, 72 Std                                                                                                | Meldung des Vorfalls, 72 Std (Art. 23 Abs. 4 Buchst. b)                                                                                | Informationen können schrittweise folgen (Art. 33 Abs. 4)                                                                            |
| Abschluss   | 14 Tage nach einer Korrektur (Schwachstelle); 1 Monat nach der Meldung (Vorfall)                               | 1 Monat nach der Meldung des Vorfalls; ein Fortschrittsbericht, wenn er noch andauert (Art. 23 Abs. 4 Buchst. d, e)                    | —                                                                                                                                    |
| An wen      | Nationales CSIRT und ENISA über die Single Reporting Platform (Art. 14 Abs. 7)                                 | Nationales CSIRT oder zuständige Behörde (Art. 23 Abs. 1)                                                                              | Zuständige Aufsichtsbehörde (Art. 33 Abs. 1)                                                                                         |

Die DSGVO verlangt eines, was die anderen nicht verlangen: Eine Meldung nach mehr als 72 Stunden muss die Verzögerung begründen (Art. 33 Abs. 1). Führt eine Verletzung voraussichtlich zu einem hohen Risiko für Personen, informieren Sie auch die betroffenen Personen (Art. 34).

## Ein durchgerechnetes Beispiel

Ein Angreifer nutzt eine Lücke im Login Ihrer Mobile-App, um Kundenkonten zu lesen. Das kann sein:

- eine aktiv ausgenutzte Schwachstelle nach dem CRA, weil ein böswilliger Akteur einen Fehler in Ihrem Produkt genutzt hat;
- eine Verletzung des Schutzes personenbezogener Daten nach der DSGVO, weil auf Kundendaten zugegriffen wurde;
- ein erheblicher Sicherheitsvorfall nach NIS2, wenn Ihr Unternehmen unter NIS2 fällt.

Drei Meldungen, drei Empfänger, und die früheste Frist beträgt 24 Stunden.

## So behalten Sie den Überblick

Führen Sie eine Vorfall-Zeitleiste und schreiben Sie jede Meldung daraus, damit die Fakten übereinstimmen. Der [Fristenrechner](/deadlines/) zeigt alle Fristen eines Vorfalls auf parallelen Bahnen, eine pro Gesetz.
