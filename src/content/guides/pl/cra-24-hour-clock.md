---
title: 'Kiedy startuje 24-godzinny termin zgłoszenia z CRA?'
description: 'Wczesne ostrzeżenie z CRA składa się 24 h od powzięcia wiadomości. Co rozporządzenie mówi o tej chwili i ostrożna procedura dla zespołów dyżurnych.'
slug: cra-24-hour-clock
locale: pl
regimes: [CRA]
datePublished: 2026-11-22
dateModified: 2026-11-22
lastVerified: 2026-10-27
sources:
  - title: Rozporządzenie (UE) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [cra-reporting-deadlines, cra-what-to-report, escalation-policy]
---

Termin zaczyna biec, gdy producent powziął wiadomość o aktywnie wykorzystywanej podatności lub poważnym incydencie (art. 14 ust. 2 lit. a), art. 14 ust. 4 lit. a)). Nie wtedy, gdy uruchomił się alert, i nie wtedy, gdy zakończyło się dochodzenie. Rozporządzenie nie definiuje „powzięcia wiadomości”, więc bezpieczna interpretacja to najwcześniejsza chwila, której potrafisz bronić.

## Co mówi tekst

- **Aktywnie wykorzystywana podatność** wymaga wiarygodnych dowodów, że złośliwy podmiot wykorzystał ją w systemie bez zgody właściciela systemu (art. 3 pkt 42).
- Motyw 68 opisuje chwilę, w której producent ustala, że naruszenie bezpieczeństwa wynikło z wykorzystania przez złośliwy podmiot luki w jego produkcie.
- **Poważny incydent** wpływa lub może wpłynąć negatywnie na ochronę wrażliwych lub ważnych danych lub funkcji albo prowadzi lub może prowadzić do wprowadzenia złośliwego kodu do produktu lub do systemów użytkownika (art. 14 ust. 5).

Sam alert zwykle więc nie uruchamia terminu. Uruchamiają go wiarygodne dowody wykorzystania podatności albo poważnego incydentu. Zobacz, [co podlega zgłoszeniu](/guides/cra-what-to-report/).

## Ostrożna procedura

1. Zapisz godzinę pierwszego alertu, nawet jeśli wygląda na awarię.
2. Zapisz godzinę, o której ktoś po raz pierwszy zobaczył ślad wykorzystania podatności lub poważnych skutków. Użyj jej jako „dowiedziałem się”.
3. Jeśli wahasz się między dwiema godzinami, wybierz wcześniejszą. Wczesne zgłoszenie nic nie kosztuje; spóźnione jest naruszeniem.
4. Zachowaj oś czasu. Jeśli organ zapyta, dlaczego wybrałeś tę chwilę, oś czasu jest odpowiedzią.

## Weekendy i nocne zmiany

24 godziny to dokładne godziny. Art. 14 nie przewiduje przedłużenia na noce, weekendy ani święta. Exploit potwierdzony w sobotę o 03:12 oznacza wczesne ostrzeżenie do niedzieli do 03:12. Dlatego tak ważna jest [polityka eskalacji](/guides/escalation-policy/).

## Małe firmy

Mikroprzedsiębiorstwa i małe przedsiębiorstwa nie mogą zostać ukarane za niedotrzymanie 24-godzinnego terminu wczesnego ostrzeżenia (art. 64 ust. 10 lit. a)). Obowiązek zgłoszenia nadal obowiązuje, podobnie jak terminy 72 godzin i sprawozdania końcowego.

Oblicz daty dla swojego incydentu w [kalkulatorze terminów](/deadlines/).
