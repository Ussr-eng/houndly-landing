---
title: 'Koniec wsparcia Opsgenie: daty i tygodniowy plan migracji'
description: 'Wsparcie Opsgenie kończy się 5 kwietnia 2027 r. Kluczowe daty i tygodniowy plan migracji: inwentaryzacja, praca równoległa i test o 3 w nocy.'
slug: opsgenie-migration
locale: pl
regimes: [CRA]
topic: on-call
datePublished: 2026-11-22
dateModified: 2026-11-22
lastVerified: 2026-11-16
sources:
  - title: Opsgenie migration to Jira Service Management
    url: https://www.atlassian.com/software/opsgenie/migration
    publisher: Atlassian
  - title: Rozporządzenie (UE) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [on-call-rotation-small-team, escalation-policy, support-to-developer-escalation]
---

Atlassian zamyka Opsgenie i przenosi klientów do Jira Service Management. Wsparcie kończy się 5 kwietnia 2027 r. Mały zespół może przejść w tydzień, jeśli zacznie od inwentaryzacji, a nie od prezentacji dostawcy.

## Daty końca wsparcia Opsgenie

- **4 czerwca 2025, koniec sprzedaży.** Od tej daty nie można zmienić edycji Opsgenie ani dodać witryn. Dodatkowe miejsca można kupować do końca wsparcia.
- **5 kwietnia 2027, koniec wsparcia.** Opsgenie zostaje wyłączone i nie jest już dostępne. Wszystkie dane, których nie przeniesiesz, zostaną usunięte.

Atlassian nazywa drugą datę „end of support”. Spotkasz też określenie koniec życia Opsgenie, czyli EOL. To ten sam dzień.

## Krok 1. Spisz, co Opsgenie robi dziś dla Ciebie

- Harmonogramy i rotacje: kto, w jakich godzinach, w jakich strefach czasowych, wyjątki.
- Polityki eskalacji: kto jest wywoływany po ilu minutach.
- Integracje: które narzędzia wysyłają alerty (Grafana, Sentry, CloudWatch, Datadog, e-mail).
- Kanały powiadomień, na których polega każda osoba: push, SMS, połączenie.
- Heartbeaty i okna serwisowe, jeśli ich używasz.

Wyeksportuj harmonogramy, zanim stracisz dostęp.

## Krok 2. Zdecyduj, czego naprawdę potrzebujesz

Większość małych zespołów używa ułamka Opsgenie. Zapisz rzeczy niezbędne: połączenie, które kogoś obudzi, eskalację do drugiej osoby, tygodniową rotację i przycisk „Zajmuję się tym”. Zobacz [rotację dyżurów w małym zespole](/guides/on-call-rotation-small-team/).

## Krok 3. Uruchom oba narzędzia równolegle przez tydzień

Skieruj każdą integrację do obu narzędzi. Porównaj, które alerty docierają, jak szybko i kto jest budzony. Wyłącz Opsgenie dopiero po tygodniu bez różnic.

## Krok 4. Przetestuj ścieżkę z 3 w nocy

Wywołaj w nocy testowy alert z prawdziwą osobą dyżurną. Sprawdź, czy telefon naprawdę dzwoni i czy [eskalacja](/guides/escalation-policy/) dociera do drugiej osoby, gdy nikt nie odbiera.

## Jeśli tworzysz oprogramowanie sprzedawane w UE

Migracja to dobry moment, by dodać zegary prawne. Na podstawie Cyber Resilience Act aktywnie wykorzystywana podatność uruchamia 24-godzinny termin zgłoszenia (art. 14 ust. 2 lit. a)). Budujemy Within24 tak, aby importował Twoje harmonogramy z Opsgenie i prowadził te zegary obok powiadomień. Zobacz [Within24 jako alternatywę dla Opsgenie dla małych zespołów](/opsgenie-alternative/).
