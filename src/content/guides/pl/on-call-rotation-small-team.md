---
title: 'Rotacja dyżurów w małym zespole: prosto i na długo'
description: 'Dyżury w zespole od 3 do 10 inżynierów: tygodniowe zmiany, osoba zapasowa, przekazania w godzinach pracy, mało alertów i odpoczynek po złej nocy.'
slug: on-call-rotation-small-team
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
related: [escalation-policy, support-to-developer-escalation, cra-24-hour-clock]
---

Mały zespół potrzebuje jednej prostej zasady: jedna główna osoba dyżurna na tydzień, jedna zapasowa, przekazanie o stałej porze i odpoczynek po złej nocy. Wszystko inne jest opcjonalne, dopóki nie macie więcej niż około dziesięciu osób.

## Podstawowy grafik

- **Tygodniowe zmiany.** Jedna osoba jest główną od poniedziałku 10:00 do następnego poniedziałku 10:00. Krótsze zmiany to więcej przekazań; dłuższe wypalają ludzi.
- **Osoba zapasowa.** Następna osoba w grafiku jest zapasowa. Budzi się ją tylko wtedy, gdy główna nie odbiera.
- **Przekazanie w godzinach pracy.** Nigdy nie przekazuj dyżuru o północy. 15-minutowe przekazanie obejmuje otwarte incydenty i wszystko, co jest kruche.
- **Zamiany są proste.** Każdy może zamienić się zmianą z kolegą, a narzędzie pokazuje osobę, która faktycznie ma dyżur.

## Ilu osób potrzebujesz

Przy trzech osobach każda ma dyżur co trzeci tydzień, plus dyżury zapasowe. Przez jakiś czas to działa, ale jest ciężkie. Od pięciu osób da się to utrzymać. Poniżej trzech przyznaj uczciwie, że nie macie dyżurów, i potraktuj to jako decyzję biznesową.

## Niech pager milczy

Wywołuj tylko w sprawach, które wymagają człowieka teraz. Reszta trafia na kanał lub do zgłoszenia. Przeglądaj każde wywołanie przy cotygodniowym przekazaniu: jeśli nie wymagało budzenia, zmień alert.

## Noc z naszego własnego dyżuru

Jedną z osób budujących Within24 obudzono kiedyś w nocy, by naprawiła „błąd”. Okazało się, że leżało całe API klientów: niedawna aktualizacja sprawiała, że usługa zapełniała RAM, aż węzeł padał. Naprawa tej nocy była prosta: podnieść węzeł i przywrócić klientom możliwość pracy. Prawdziwa naprawa, wyciek pamięci, poczekała do następnego dnia roboczego.

Dwie lekcje dla małego zespołu. W nocy najpierw przywróć usługę, a przyczynę źródłową szukaj za dnia. I alert mówił „błąd”, a nie „API nie działa”: lepszy alert powiedziałby, w co wchodzi, zanim otworzył laptopa.

## Po złej nocy

Jeśli ktoś nie spał w nocy, następnego dnia zaczyna później. Zapisz to jako zasadę, żeby nikt nie musiał pytać.

## Gdy to incydent prawny

Jeśli sprzedajesz oprogramowanie w UE, dyżurny inżynier może pierwszy zobaczyć aktywnie wykorzystywaną podatność, a to uruchamia 24-godzinny termin zgłoszenia z Cyber Resilience Act (art. 14 ust. 2 lit. a)). Dopisz „czy to podlega zgłoszeniu?” do runbooka dyżurów i przeczytaj, [kiedy startuje termin 24 godzin](/guides/cra-24-hour-clock/).
