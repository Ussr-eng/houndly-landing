---
title: 'CRA: welche Schwachstellen und Vorfälle meldepflichtig sind'
description: 'Der CRA macht zwei Ereignisarten meldepflichtig: aktiv ausgenutzte Schwachstellen und schwerwiegende Vorfälle. Bedeutung, Beispiele, Triage.'
slug: cra-what-to-report
locale: de
regimes: [CRA]
datePublished: 2026-11-17
dateModified: 2026-11-17
lastVerified: 2026-10-27
sources:
  - title: Verordnung (EU) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [cra-reporting-deadlines, cra-24-hour-clock, cra-saas-scope]
---

Der CRA macht zwei Arten von Ereignissen meldepflichtig: eine aktiv ausgenutzte Schwachstelle in Ihrem Produkt und einen schwerwiegenden Vorfall, der seine Sicherheit beeinträchtigt (Art. 14 Abs. 1, Art. 14 Abs. 3). Ein gewöhnlicher Fehler, ein Ausfall oder eine Schwachstelle, die niemand ausgenutzt hat, steht nicht auf der Pflichtliste.

## Aktiv ausgenutzte Schwachstelle

Eine Schwachstelle, für die es verlässliche Nachweise gibt, dass ein böswilliger Akteur sie ohne Erlaubnis des Systemeigentümers in einem System ausgenutzt hat (Art. 3 Nr. 42).

- **Melden:** Logs zeigen, dass ein Angreifer eine Authentifizierungslücke in Ihrem Produkt genutzt hat, um in das Konto eines Kunden zu gelangen.
- **Keine Pflicht zur Meldung:** Eine Sicherheitsforscherin findet dieselbe Lücke und teilt sie Ihnen in gutem Glauben mit. Nach Erwägungsgrund 68 sollen Schwachstellen, die ohne böswillige Absicht bei Tests in gutem Glauben gefunden werden, nicht der Meldepflicht unterliegen. Freiwillig melden können Sie trotzdem (Art. 15).

## Schwerwiegender Vorfall

Ein Vorfall, der die Sicherheit des Produkts beeinträchtigt, ist schwerwiegend, wenn er (Art. 14 Abs. 5):

- die Fähigkeit des Produkts, die Verfügbarkeit, Authentizität, Integrität oder Vertraulichkeit sensibler oder wichtiger Daten oder Funktionen zu schützen, beeinträchtigt oder beeinträchtigen kann; oder
- zu Schadcode im Produkt oder in den Netz- und Informationssystemen eines Nutzers geführt hat oder führen kann.

Erwägungsgrund 68 nennt ein Beispiel: Ein Angreifer schleust erfolgreich Schadcode in den Release-Kanal ein, über den Sie Sicherheitsupdates ausliefern.

## Schnelle Triage für die Person in Bereitschaft

1. Gibt es Hinweise, dass jemand einen Fehler in unserem Produkt ohne Erlaubnis ausgenutzt hat? Wenn ja, ist es eine aktiv ausgenutzte Schwachstelle.
2. Hat es unseren Build-, Release- oder Update-Prozess getroffen, oder könnte es Schadcode auf die Systeme der Nutzer bringen? Wenn ja, ist es wahrscheinlich ein schwerwiegender Vorfall.
3. Ist es nur ein Ausfall ohne Auswirkungen auf die Sicherheit? Dann gilt die CRA-Meldepflicht nicht. [NIS2 oder DSGVO können trotzdem gelten](/guides/cra-nis2-gdpr-reporting/).

Im Zweifel starten Sie die Fristen und entscheiden zu zweit. Eine Frist zu stoppen, die Sie nicht gebraucht haben, kostet nichts. Der [Fristenrechner](/deadlines/) zeigt jede Frist für das Ereignis.
