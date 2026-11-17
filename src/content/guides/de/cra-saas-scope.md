---
title: 'Gilt der Cyber Resilience Act für SaaS?'
description: 'Reines SaaS fällt meist unter NIS2, nicht unter den CRA. Das Backend einer App oder eines Geräts, das Sie ausliefern, ist aber erfasst. Drei Fälle.'
slug: cra-saas-scope
locale: de
regimes: [CRA, NIS2]
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
related: [cra-what-to-report, cra-nis2-gdpr-reporting, cra-reporting-deadlines]
---

Reines SaaS ist für sich genommen meist kein „Produkt mit digitalen Elementen“ im Sinne des CRA. Nach Erwägungsgrund 12 fallen SaaS, PaaS und IaaS stattdessen unter die NIS2-Richtlinie. Der Cloud-Teil eines Produkts, das Sie ausliefern, ist aber erfasst, und viele SaaS-Unternehmen liefern etwas aus.

## Was der CRA erfasst

Der CRA gilt für Produkte mit digitalen Elementen, die auf dem EU-Markt bereitgestellt werden und sich mit einem Gerät oder Netz verbinden (Art. 2 Abs. 1). Ein Produkt mit digitalen Elementen ist ein Software- oder Hardwareprodukt samt seinen Lösungen zur Datenfernverarbeitung (Art. 3 Nr. 1).

Datenfernverarbeitung ist nur erfasst, wenn (Art. 3 Nr. 2):

- Sie als Hersteller sie konzipiert und entwickelt haben oder sie in Ihrer Verantwortung liegt; und
- das Produkt ohne sie eine seiner Funktionen nicht erfüllen könnte.

## Drei typische Fälle

| Sie liefern aus                                                                  | CRA?                                                       | Warum                                         |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------- |
| Eine Web-App, nur im Browser genutzt, nichts zu installieren                     | Meist nein; NIS2 kann gelten                               | Erwägungsgrund 12: SaaS fällt unter NIS2      |
| Eine Mobile- oder Desktop-App, ein Agent, ein SDK oder eine CLI plus Ihr Backend | Ja: die App und das Backend als ihre Datenfernverarbeitung | Art. 3 Nr. 1, Art. 3 Nr. 2                    |
| Ein Gerät mit einem Cloud-Dashboard, das es steuert                              | Ja: Gerät und Cloud                                        | Erwägungsgrund 12 nennt genau dieses Beispiel |

Nach Erwägungsgrund 12 sind außerdem Websites, die die Funktion eines Produkts nicht unterstützen, nicht erfasst.

## Wenn Sie erfasst sind

Die Meldepflicht nach Artikel 14 gilt für Ihr Produkt einschließlich seiner Datenfernverarbeitung. Eine ausgenutzte Lücke im Backend, von dem Ihre App abhängt, kann ein meldepflichtiges Ereignis sein. Siehe [was als meldepflichtig zählt](/guides/cra-what-to-report/).

## Wenn Sie reines SaaS sind

Dann kann stattdessen NIS2 gelten: Nach Erwägungsgrund 12 des CRA fallen Anbieter von Cloud-Computing-Diensten, die mindestens mittelgroß sind, unter NIS2. NIS2 hat eine eigene Frühwarnung innerhalb von 24 Stunden nach Kenntniserlangung eines erheblichen Sicherheitsvorfalls (NIS2 Art. 23 Abs. 4 Buchst. a). Siehe [ein Vorfall, mehrere Fristen](/guides/cra-nis2-gdpr-reporting/).

Gerade bei Grenzfällen sollten Sie eine Anwältin oder einen Anwalt fragen.
