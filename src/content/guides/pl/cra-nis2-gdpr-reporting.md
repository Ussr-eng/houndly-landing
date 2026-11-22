---
title: 'CRA, NIS2 i RODO: jeden incydent, kilka terminów zgłoszenia'
description: 'Jeden incydent bezpieczeństwa może uruchomić terminy zgłoszeń z CRA, NIS2 i RODO naraz. Wyzwalacze, terminy i adresaci obok siebie, z artykułami.'
slug: cra-nis2-gdpr-reporting
locale: pl
regimes: [CRA, NIS2, GDPR]
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
  - title: Rozporządzenie (UE) 2016/679 (RODO)
    url: https://eur-lex.europa.eu/eli/reg/2016/679/oj
    publisher: EUR-Lex
related: [cra-reporting-deadlines, cra-saas-scope, cra-24-hour-clock]
---

Jeden incydent bezpieczeństwa może uruchomić naraz nawet trzy terminy prawne, każdy z własnym adresatem. CRA obejmuje Twój produkt, NIS2 Twoją organizację jako podmiot kluczowy lub ważny, a RODO dane osobowe. Każdy akt sprawdza się osobno; zgłoszenie na podstawie jednego nie zwalnia z pozostałych.

NIS2 to dyrektywa: obowiązek zgłoszenia wynika z prawa krajowego Twojego państwa, które transponuje art. 23. Poniższe terminy to te, które ustala dyrektywa; szczegóły i organ, do którego zgłaszasz, sprawdź w prawie krajowym.

## Obok siebie

|                 | CRA                                                                                           | NIS2                                                                                                                | RODO                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Co go uruchamia | Aktywnie wykorzystywana podatność lub poważny incydent w Twoim produkcie (art. 14 ust. 1 i 3) | Poważny incydent: poważne zakłócenie działania lub strata finansowa albo znaczna szkoda dla innych (art. 23 ust. 3) | Naruszenie ochrony danych osobowych, chyba że jest mało prawdopodobne, by skutkowało ryzykiem (art. 33 ust. 1) |
| Kto zgłasza     | Producent produktu                                                                            | Podmiot kluczowy lub ważny (art. 23 ust. 1)                                                                         | Administrator; podmiot przetwarzający informuje administratora bez zbędnej zwłoki (art. 33 ust. 2)             |
| Pierwszy termin | Wczesne ostrzeżenie, 24 h od powzięcia wiadomości                                             | Wczesne ostrzeżenie, 24 h od powzięcia wiadomości (art. 23 ust. 4 lit. a))                                          | Zgłoszenie, w miarę możliwości w ciągu 72 h od stwierdzenia naruszenia (art. 33 ust. 1)                        |
| Drugi           | Powiadomienie, 72 h                                                                           | Zgłoszenie incydentu, 72 h (art. 23 ust. 4 lit. b))                                                                 | Informacje można przekazywać etapami (art. 33 ust. 4)                                                          |
| Końcowy         | 14 dni od poprawki (podatność); 1 miesiąc od powiadomienia (incydent)                         | 1 miesiąc od zgłoszenia incydentu; sprawozdanie z postępów, jeśli incydent nadal trwa (art. 23 ust. 4 lit. d) i e)) | —                                                                                                              |
| Do kogo         | Krajowy CSIRT i ENISA, przez pojedynczą platformę zgłoszeń (art. 14 ust. 7)                   | Krajowy CSIRT lub właściwy organ (art. 23 ust. 1)                                                                   | Właściwy organ nadzorczy (art. 33 ust. 1)                                                                      |

RODO dodaje coś, czego nie mają pozostałe: zgłoszenie dokonane po 72 godzinach musi zawierać przyczyny opóźnienia (art. 33 ust. 1). Jeśli naruszenie może powodować wysokie ryzyko dla osób, zawiadamiasz też osoby, których dotyczy (art. 34).

## Przykład

Atakujący wykorzystuje lukę w logowaniu Twojej aplikacji mobilnej, aby czytać konta klientów. To może być:

- aktywnie wykorzystywana podatność w rozumieniu CRA, bo złośliwy podmiot wykorzystał lukę w Twoim produkcie;
- naruszenie ochrony danych osobowych w rozumieniu RODO, bo uzyskano dostęp do danych klientów;
- poważny incydent w rozumieniu NIS2, jeśli Twoja firma jest objęta NIS2.

Trzy zgłoszenia, trzech adresatów, a najwcześniejszy termin to 24 godziny.

## Jak nadążyć

Prowadź jedną oś czasu incydentu i pisz z niej każde zgłoszenie, aby fakty się zgadzały. [Kalkulator terminów](/deadlines/) pokazuje wszystkie zegary incydentu na równoległych torach, po jednym na akt.
