---
title: 'Czy Cyber Resilience Act dotyczy SaaS?'
description: 'Czysty SaaS podlega zwykle NIS2, a nie CRA. Ale backend aplikacji lub urządzenia, które dostarczasz, jest objęty. Trzy typowe przypadki, z artykułami.'
slug: cra-saas-scope
locale: pl
regimes: [CRA, NIS2]
datePublished: 2026-11-22
dateModified: 2026-11-22
lastVerified: 2026-10-27
sources:
  - title: Rozporządzenie (UE) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
  - title: Dyrektywa (UE) 2022/2555 (NIS2)
    url: https://eur-lex.europa.eu/eli/dir/2022/2555/oj
    publisher: EUR-Lex
related: [cra-what-to-report, cra-nis2-gdpr-reporting, cra-reporting-deadlines]
---

Czysty SaaS sam w sobie zwykle nie jest „produktem z elementami cyfrowymi” w rozumieniu CRA. Motyw 12 mówi, że SaaS, PaaS i IaaS podlegają zamiast tego dyrektywie NIS2. Ale chmurowa część produktu, który dostarczasz, jest objęta, a wiele firm SaaS coś dostarcza.

## Co obejmuje CRA

CRA dotyczy produktów z elementami cyfrowymi udostępnianych na rynku UE, które łączą się z urządzeniem lub siecią (art. 2 ust. 1). Produkt z elementami cyfrowymi to produkt będący oprogramowaniem lub sprzętem wraz z jego rozwiązaniami w zakresie zdalnego przetwarzania danych (art. 3 pkt 1).

Zdalne przetwarzanie danych jest objęte tylko wtedy, gdy (art. 3 pkt 2):

- Ty, producent, je zaprojektowałeś i opracowałeś albo odpowiadasz za nie; oraz
- bez niego produkt nie mógłby wykonywać jednej ze swoich funkcji.

## Trzy typowe przypadki

| Dostarczasz                                                              | CRA?                                                          | Dlaczego                               |
| ------------------------------------------------------------------------ | ------------------------------------------------------------- | -------------------------------------- |
| Aplikację webową używaną tylko w przeglądarce, bez instalacji            | Zwykle nie; może mieć zastosowanie NIS2                       | Motyw 12: SaaS podlega NIS2            |
| Aplikację mobilną lub desktopową, agenta, SDK lub CLI, plus Twój backend | Tak: aplikacja i backend jako jej zdalne przetwarzanie danych | Art. 3 pkt 1 i 2                       |
| Urządzenie z panelem w chmurze, który nim steruje                        | Tak: urządzenie i chmura                                      | Motyw 12 podaje dokładnie ten przykład |

Motyw 12 mówi też, że strony internetowe, które nie wspierają funkcjonalności produktu, nie są objęte.

## Jeśli jesteś objęty

Obowiązek zgłaszania z art. 14 obejmuje Twój produkt, w tym jego zdalne przetwarzanie danych. Wykorzystana luka w backendzie, od którego zależy Twoja aplikacja, może być zdarzeniem podlegającym zgłoszeniu. Zobacz, [co podlega zgłoszeniu](/guides/cra-what-to-report/).

## Jeśli masz czysty SaaS

Zamiast tego może mieć zastosowanie NIS2: motyw 12 CRA mówi, że dostawcy usług przetwarzania w chmurze będący co najmniej średnimi przedsiębiorstwami podlegają NIS2. NIS2 ma własne wczesne ostrzeżenie w ciągu 24 godzin od powzięcia wiadomości o poważnym incydencie (NIS2 art. 23 ust. 4 lit. a)). Zobacz [jeden incydent, kilka terminów](/guides/cra-nis2-gdpr-reporting/).

Przypadki graniczne to właśnie te, w których warto zapytać prawnika.
