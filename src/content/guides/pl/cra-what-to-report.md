---
title: 'CRA: jaka podatność lub incydent podlega zgłoszeniu'
description: 'CRA każe zgłaszać dwa rodzaje zdarzeń: aktywnie wykorzystywaną podatność i poważny incydent. Co oznacza każde, z przykładami i szybką oceną.'
slug: cra-what-to-report
locale: pl
regimes: [CRA]
datePublished: 2026-11-22
dateModified: 2026-11-22
lastVerified: 2026-10-27
sources:
  - title: Rozporządzenie (UE) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [cra-reporting-deadlines, cra-24-hour-clock, cra-saas-scope]
---

CRA każe zgłaszać dwa rodzaje zdarzeń: aktywnie wykorzystywaną podatność w Twoim produkcie oraz poważny incydent mający wpływ na jego bezpieczeństwo (art. 14 ust. 1 i 3). Zwykły błąd, awaria lub podatność, której nikt nie wykorzystał, nie są na liście obowiązkowej.

## Aktywnie wykorzystywana podatność

Podatność, co do której istnieją wiarygodne dowody, że złośliwy podmiot wykorzystał ją w systemie bez zgody właściciela systemu (art. 3 pkt 42).

- **Zgłoś:** logi pokazują, że atakujący wykorzystał lukę w uwierzytelnianiu Twojego produktu, aby dostać się na konto klienta.
- **Nie musisz zgłaszać:** badacz bezpieczeństwa znajduje tę samą lukę i w dobrej wierze Ci o niej mówi. Motyw 68 mówi, że podatności wykryte bez złych zamiarów, na potrzeby testów w dobrej wierze, nie powinny podlegać obowiązkowemu powiadomieniu. Nadal możesz zgłosić ją dobrowolnie (art. 15).

## Poważny incydent

Incydent mający wpływ na bezpieczeństwo produktu jest poważny, gdy (art. 14 ust. 5):

- wpływa lub może wpłynąć negatywnie na zdolność produktu do ochrony dostępności, autentyczności, integralności lub poufności wrażliwych lub ważnych danych lub funkcji; albo
- doprowadził lub może doprowadzić do wprowadzenia lub wykonania złośliwego kodu w produkcie lub w sieciach i systemach informatycznych użytkownika.

Motyw 68 podaje przykład: atakujący skutecznie wprowadza złośliwy kod do kanału, którym dostarczasz aktualizacje zabezpieczeń.

## Szybka ocena dla dyżurnego inżyniera

1. Czy są dowody, że ktoś bez zgody wykorzystał lukę w naszym produkcie? Jeśli tak, to aktywnie wykorzystywana podatność.
2. Czy coś uderzyło w nasz proces budowania, wydawania lub aktualizacji albo mogłoby umieścić złośliwy kod w systemach użytkowników? Jeśli tak, to prawdopodobnie poważny incydent.
3. Czy to tylko przestój, bez wpływu na bezpieczeństwo? Wtedy obowiązek zgłoszenia z CRA nie ma zastosowania. [NIS2 lub RODO nadal mogą](/guides/cra-nis2-gdpr-reporting/).

W razie wątpliwości uruchom zegary i zdecyduj razem z drugą osobą. Zatrzymanie niepotrzebnego zegara nic nie kosztuje. [Kalkulator terminów](/deadlines/) pokazuje każdy zegar dla zdarzenia.
