---
title: 'Jak dział wsparcia dotrze w nocy do dyżurnego programisty'
description: 'Wsparcie często widzi problem przed monitoringiem. Jak dział wsparcia może obudzić właściwego programistę i dlaczego to ważne dla zgłoszeń z CRA.'
slug: support-to-developer-escalation
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
related: [escalation-policy, on-call-rotation-small-team, cra-what-to-report]
---

Wsparcie często widzi problem przed monitoringiem: klient pisze, że nie może się zalogować albo że widzi dane kogoś innego. Dział wsparcia potrzebuje jednego oczywistego sposobu, by obudzić właściwego programistę, bez wiedzy, kto ma dyżur, i bez szukania numeru telefonu.

## Co idzie źle bez procesu

- Wsparcie pisze na kanale czatu o 2 w nocy i nikt tego nie czyta do rana.
- Wsparcie za każdym razem dzwoni do jedynego programisty, którego numer ma.
- Wsparcie się waha, bo nie jest pewne, czy to „wystarczająco poważne”.

## Prosty proces

1. **Jeden przycisk lub jeden numer**, który zawsze łączy z osobą, która ma teraz dyżur. Wsparcie nigdy nie potrzebuje grafiku.
2. **Trzy pytania przed telefonem:** co widzi klient, ilu klientów i czy mogą być zagrożone dane lub bezpieczeństwo.
3. **Dalej działa [polityka eskalacji](/guides/escalation-policy/):** jeśli programista nie odbiera, dzwoni się do osoby zapasowej.
4. **Wsparcie dostaje odpowiedź:** „Zajmuję się tym” albo „to może poczekać do rana”, żeby mogło odpisać klientowi.

## Pozwól wsparciu budzić ludzi

Zapisz, że obudzenie programisty przez pomyłkę jest w porządku. Fałszywy alarm kosztuje jedną przerwaną noc. Przeoczony incydent bezpieczeństwa może kosztować przekroczony termin prawny.

## Gdy zgłoszenie klienta jest incydentem bezpieczeństwa

„Widzę dane innego klienta” może być pierwszym znakiem wykorzystanej podatności. Na podstawie Cyber Resilience Act 24-godzinny termin startuje, gdy producent powziął wiadomość (art. 14 ust. 2 lit. a)). Zgłoszenie do wsparcia może być tą chwilą, więc musi szybko trafić do inżyniera. Zobacz, [co podlega zgłoszeniu](/guides/cra-what-to-report/).

Budujemy w Within24 przycisk „Zadzwoń do programisty” dla działu wsparcia. [Dołącz do wczesnego dostępu](/early-access/).
