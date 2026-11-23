---
title: 'Platforma zgłoszeń ENISA: jak składać zgłoszenia z CRA'
description: 'Każde obowiązkowe zgłoszenie z CRA trafia przez pojedynczą platformę zgłoszeń ENISA. Który CSIRT je otrzymuje, co dzieje się potem i co przygotować.'
slug: enisa-single-reporting-platform
locale: pl
regimes: [CRA]
datePublished: 2026-11-22
dateModified: 2026-11-22
lastVerified: 2026-10-31
sources:
  - title: Rozporządzenie (UE) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
  - title: Single Reporting Platform (SRP)
    url: https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp
    publisher: ENISA
  - title: Single Reporting Platform – frequently asked questions
    url: https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp/frequently-asked-questions
    publisher: ENISA
related: [cra-reporting-deadlines, cra-24-hour-clock, cra-what-to-report]
---

Każde obowiązkowe zgłoszenie z CRA idzie jednym kanałem: pojedynczą platformą zgłoszeń (Single Reporting Platform, SRP) prowadzoną przez ENISA (art. 14 ust. 1, art. 16 ust. 1). Składasz je do CSIRT jednego państwa członkowskiego, a ENISA widzi je w tym samym czasie. Ustal, który CSIRT jest Twój, przed incydentem, a nie w jego trakcie.

## Który CSIRT otrzymuje Twoje zgłoszenie

Używasz elektronicznego punktu zgłoszeń CSIRT wyznaczonego jako koordynator w państwie członkowskim Twojego głównego miejsca prowadzenia działalności w UE (art. 14 ust. 7). To miejsce, w którym zapadają głównie decyzje dotyczące cyberbezpieczeństwa Twoich produktów. Jeśli nie da się go ustalić, jest to państwo członkowskie, w którym masz najwięcej pracowników w UE.

Nie masz siedziby w UE? Użyj pierwszego pasującego (art. 14 ust. 7):

1. państwo, w którym ma siedzibę Twój upoważniony przedstawiciel dla największej liczby produktów;
2. państwo, w którym ma siedzibę importer wprowadzający do obrotu najwięcej Twoich produktów;
3. państwo, w którym ma siedzibę dystrybutor udostępniający najwięcej Twoich produktów;
4. państwo, w którym jest najwięcej Twoich użytkowników.

## Co się dzieje po złożeniu

CSIRT, który otrzymał zgłoszenie, przekazuje je przez platformę do CSIRT każdego państwa członkowskiego, w którym według Twojej informacji produkt jest dostępny (art. 16 ust. 2). Dlatego wczesne ostrzeżenie pyta o te państwa. Możesz poprosić o opóźnienie rozpowszechnienia z uzasadnionych względów cyberbezpieczeństwa, na przykład w trakcie skoordynowanego ujawniania (art. 16 ust. 2).

## Przygotuj się przed pierwszym incydentem

- Ustal, do którego państwa członkowskiego i CSIRT zgłaszasz, i zapisz to w runbooku.
- Prowadź listę państw członkowskich, w których dostępny jest każdy produkt.
- Miej pod ręką nazwy produktów, wersje i osobę kontaktową, gotowe do wklejenia.
- Skonfiguruj dostęp, zanim będzie potrzebny. Portal to portal.cra-srp.enisa.europa.eu, a każda osoba loguje się własnym kontem EU Login z uwierzytelnianiem wieloskładnikowym. Jeden Primary Assigned Representative rejestruje firmę i wybiera CSIRT, a potem może zaprosić do 20 Secondary Assigned Representatives. Upewnij się, że co najmniej dwie osoby mogą się zalogować.
- CSIRT sprawdza, czy każdy przedstawiciel naprawdę działa w imieniu Twojej firmy. Do 20 zgłoszeń możesz złożyć, zanim ta weryfikacja stanie się obowiązkowa.
- Ustalcie, kto składa, a kto sprawdza. Na start nie ma API, a platforma jest tylko po angielsku, więc zgłoszenie zawsze wpisuje człowiek w interfejsie webowym.

Nasz darmowy [Incident Kit](/incident-kit/) zawiera szablony do wypełnienia dla wszystkich trzech zgłoszeń.
