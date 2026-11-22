---
title: 'Polityka eskalacji dla małych zespołów: kogo i kiedy budzić'
description: 'Startowa polityka eskalacji dla małego zespołu: kto dostaje telefon po ilu minutach, dlaczego połączenia i dlaczego terminy prawne nie czekają.'
slug: escalation-policy
locale: pl
regimes: [CRA]
topic: on-call
datePublished: 2026-11-22
dateModified: 2026-11-22
lastVerified: 2026-10-27
sources:
  - title: Rozporządzenie (UE) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [on-call-rotation-small-team, support-to-developer-escalation, cra-24-hour-clock]
---

Polityka eskalacji odpowiada na jedno pytanie: jeśli osoba dyżurna nie reaguje, kto jest następny i po jakim czasie? Spisz ją przed pierwszą nocą, w której będzie potrzebna.

## Startowa polityka

| Minuty po alercie | Kto                              | Jak                           |
| ----------------- | -------------------------------- | ----------------------------- |
| 0                 | Główna osoba dyżurna             | Powiadomienie push i Telegram |
| 5                 | Główna osoba dyżurna             | Połączenie telefoniczne       |
| 15                | Osoba zapasowa                   | Połączenie telefoniczne       |
| 30                | Lider zespołu inżynierów lub CTO | Połączenie telefoniczne       |

Łańcuch zatrzymuje się, gdy tylko ktoś stuknie „Zajmuję się tym”. Potwierdzenie oznacza, że bierzesz sprawę na siebie, a nie że jest naprawiona.

## Dlaczego połączenia

Przez powiadomienie push i wiadomość na czacie łatwo przespać. Przez dzwoniący bez przerwy telefon nie. Używaj połączeń dla alertów, które muszą kogoś obudzić, a cichszych kanałów dla reszty.

## Różne alerty, różne tempo

- **Pilne:** klienci są dotknięci albo zagrożone jest bezpieczeństwo. Pełny łańcuch, połączenia.
- **Może poczekać do rana:** działa, ale gorzej. Tylko wiadomość, bez eskalacji w nocy.
- **Może podlegać zgłoszeniu:** ślady wykorzystania podatności lub incydentu bezpieczeństwa. Pełny łańcuch, a eskalacja dociera do kogoś, kto może zdecydować o zgłoszeniu prawnym.

## Terminy prawne nie czekają na eskalację

Na podstawie Cyber Resilience Act 24-godzinny termin wczesnego ostrzeżenia biegnie od chwili, w której powziąłeś wiadomość o aktywnie wykorzystywanej podatności (art. 14 ust. 2 lit. a)); zobacz, [kiedy startuje termin](/guides/cra-24-hour-clock/). Trzydzieści minut eskalacji jest w porządku. Pięć godzin, bo nikt nie odebrał, już nie. Testuj łańcuch co miesiąc fałszywym alertem.
