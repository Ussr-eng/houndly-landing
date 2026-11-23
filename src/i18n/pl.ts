// Polish UI strings: a full translation of en.ts. Typed as UiStrings, so a key missing here
// fails the build. Legal facts are the same as in English (articles, dates, numbers); only the
// wording is translated. Links in hrefs stay English paths: non-English pages get them rewritten
// to /pl/… at build time (src/middleware.ts).
import type { HomeModule, PrivacySection, UiStrings } from './en';

export const pl: UiStrings = {
  skipToContent: 'Przejdź do treści',
  language: {
    short: 'PL',
    name: 'Polski',
    switcherLabel: 'Język',
    hint: {
      text: 'Ta strona jest dostępna także po polsku.',
      link: 'Czytaj po polsku',
      close: 'Zamknij',
    },
  },
  nav: {
    label: 'Nawigacja główna',
    home: 'Strona główna',
    oncall: 'Dyżury',
    cra: 'CRA',
    calculator: 'Kalkulator terminów',
    guides: 'Poradniki',
    kit: 'Incident Kit',
    pricing: 'Cennik',
    earlyAccess: 'Wczesny dostęp',
  },
  footer: {
    rulesVersion: 'Reguły {version}',
    rulesUnverified: 'jeszcze niesprawdzone z tekstami urzędowymi',
    rulesVerified: 'sprawdzone {date}',
    links: 'Informacje prawne',
    privacy: 'Prywatność',
    legal: 'Nota prawna',
    craHeading: 'CRA',
    craLinks: {
      asks: 'Czego wymaga CRA',
      dates: 'Kluczowe daty',
      reports: 'Trzy zgłoszenia',
      scope: 'Czy dotyczy Ciebie',
    },
    oncallHeading: 'Dyżury',
    oncallLinks: {
      overview: 'Jak działają dyżury',
      rotas: 'Grafiki',
      support: 'Od wsparcia do programisty',
      opsgenie: 'Alternatywa dla Opsgenie',
    },
    toolsHeading: 'Narzędzia',
    faq: 'FAQ',
  },
  breadcrumbs: { label: 'Ścieżka nawigacji', home: 'Strona główna', guides: 'Poradniki' },
  guides: {
    title: 'Poradniki o zgłaszaniu incydentów w UE i dyżurach',
    description:
      'Proste poradniki o terminach zgłoszeń z CRA, NIS2 i RODO oraz o dyżurach w małym zespole. Każdy cytuje teksty urzędowe.',
    intro:
      'Czego wymaga prawo, gdy coś pójdzie nie tak, i jak mały zespół pozostaje gotowy odpowiedzieć o 3 w nocy. Każde stwierdzenie prawne odsyła do artykułu, z którego pochodzi.',
    topics: { law: 'Zgłoszenia według prawa UE', 'on-call': 'Prowadzenie dyżurów' },
    faqLink: 'Krótkie odpowiedzi: najczęstsze pytania',
  },
  guide: {
    lastVerified: 'Ostatnio sprawdzono',
    notVerified: 'Jeszcze niesprawdzone z tekstami urzędowymi',
    sources: 'Źródła',
    related: 'Powiązane poradniki',
    calculatorCta: 'Oblicz swoje terminy',
    published: 'Opublikowano',
    updated: 'Zaktualizowano',
    readInThisLanguage: 'Przeczytaj ten poradnik po polsku',
  },
  deadlinesPage: {
    title: 'Kalkulator terminów zgłaszania incydentów w UE',
    description:
      'Oblicz terminy zgłoszenia incydentu z CRA, NIS2 i RODO w swojej strefie czasowej. Za darmo, bez rejestracji.',
    appName: 'Kalkulator terminów {site}',
    lead: 'Podaj, kiedy dowiedziałeś się o aktywnie wykorzystywanej podatności lub incydencie. Otrzymasz każdy termin zgłoszenia z Cyber Resilience Act (CRA), NIS2 i RODO w swojej strefie czasowej i w strefie organu.',
  },
  notFound: {
    title: 'Nie znaleziono strony',
    body: 'Ta strona nie istnieje albo została przeniesiona.',
    back: 'Przejdź do kalkulatora terminów',
  },
  bridge: {
    heading: 'Terminy obliczone. Kto wstanie o 3 w nocy?',
    intro: 'Within24 pilnuje tych zegarów za Twój zespół.',
    steps: [
      'Zarejestruj incydent raz. Startuje każdy zegar prawny, który ma zastosowanie.',
      'Przed każdym terminem osoba dyżurna jest powiadamiana, aż ktoś potwierdzi.',
      'Projekt każdego zgłoszenia jest gotowy przed jego terminem.',
    ],
    link: 'Zobacz plany i wczesny dostęp',
  },
  form: {
    email: 'E-mail',
    required: '(wymagane)',
    optional: '(opcjonalnie)',
    company: 'Firma',
    productType: 'Rodzaj produktu',
    productTypeNone: 'Wybierz…',
    productTypes: {
      mobile: 'Aplikacja mobilna',
      desktop: 'Oprogramowanie desktopowe',
      self_hosted: 'Oprogramowanie self-hosted lub on-prem',
      iot: 'Urządzenie połączone lub IoT',
      sdk: 'SDK lub biblioteka',
      saas: 'Tylko SaaS',
      other: 'Inne',
    },
    productTypeQuestion: 'Co dostarczasz?',
    interest: 'Czego potrzebujesz najpierw?',
    interests: { oncall: 'Dyżury', cra: 'Zgłoszenia CRA', both: 'Obu' },
    companySize: 'Wielkość firmy',
    companySizes: {
      '1-9': '1–9',
      '10-49': '10–49',
      '50-249': '50–249',
      '250+': '250+',
    },
    oncallTool: 'Dyżury dziś',
    oncallTools: {
      pagerduty: 'PagerDuty',
      opsgenie: 'Opsgenie',
      grafana_oncall: 'Grafana OnCall',
      other_tool: 'Inne narzędzie',
      phone_chat: 'Telefon lub czat',
      nobody: 'Nikt nie ma dyżuru',
    },
    sellsEu: 'Czy sprzedajesz w UE?',
    sellsEuOptions: { yes: 'Tak', no: 'Nie', unsure: 'Nie wiem' },
    channels: 'Jakich kanałów potrzebujesz?',
    channelsHint: '(opcjonalnie, dowolne)',
    channelLabels: {
      phone_call: 'Połączenie telefoniczne',
      sms: 'SMS',
      telegram: 'Telegram',
      email: 'E-mail',
      app_push: 'Powiadomienie push',
    },
    note: 'Coś jeszcze?',
    noteHint: 'Na przykład co najbardziej boli w Twoich dyżurach dziś. Do 300 znaków.',
    laws: 'Obowiązujące przepisy',
    lawLabels: { CRA: 'CRA', NIS2: 'NIS2', GDPR: 'RODO', unsure: 'Nie wiem' },
    honeypot: 'Zostaw to pole puste',
    sending: 'Wysyłanie…',
    errors: {
      summary: 'Sprawdź zaznaczone pola.',
      required: 'Wpisz swój adres e-mail.',
      invalid: 'Wpisz poprawny adres e-mail, np. imie@firma.pl.',
      too_long: 'To jest za długie.',
      verification:
        'Nie udało się potwierdzić, że to zgłoszenie pochodzi od człowieka. Spróbuj ponownie.',
      unavailable: 'Zapisy są teraz niedostępne. Spróbuj ponownie później.',
      network: 'Nie udało się wysłać formularza. Sprawdź połączenie i spróbuj ponownie.',
    },
    privacyNote: 'Używamy Twoich danych tylko do tego, co opisuje ten formularz. Zobacz {link}.',
    privacyLink: 'politykę prywatności',
  },
  kit: {
    title: 'Incident Kit do zgłaszania incydentów z CRA',
    description:
      'Szablony trzech zgłoszeń CRA, lista kontrolna platformy ENISA i runbook na pierwszą godzinę incydentu podlegającego zgłoszeniu. Za darmo, na e-mail.',
    intro:
      'Szablony i listy kontrolne na pierwsze godziny incydentu podlegającego zgłoszeniu. Za darmo, wysyłane na e-mail.',
    insideHeading: 'Co jest w środku',
    items: [
      {
        name: 'Szablony zgłoszeń',
        text: 'Wczesne ostrzeżenie, powiadomienie i sprawozdanie końcowe.',
      },
      {
        name: 'Lista gotowości',
        text: 'Do pojedynczej platformy zgłoszeń ENISA (SRP): co mieć gotowe przed zgłoszeniem.',
      },
      {
        name: 'Runbook pierwszych 60 minut',
        text: 'Kto co robi w pierwszej godzinie po tym, jak się dowiedziałeś.',
      },
    ],
    formHeading: 'Odbierz kit',
    news: 'Wysyłajcie mi też nowości o produkcie (mniej więcej raz w miesiącu). Mogę zrezygnować w każdej chwili.',
    submit: 'Wyślijcie mi kit',
    nextHeading: 'Co dalej',
    next: [
      'Potwierdź adres e-mail linkiem, który wyślemy.',
      'Kit przyjdzie e-mailem.',
      'Nie udostępniamy Twojego adresu.',
    ],
    success: 'Prawie gotowe. Sprawdź skrzynkę i potwierdź adres e-mail, aby otrzymać kit.',
    checkEmail: {
      title: 'Sprawdź skrzynkę',
      description: 'Potwierdź adres e-mail, aby otrzymać Incident Kit.',
      body: 'Wysłaliśmy Ci link potwierdzający. Otwórz go, aby otrzymać Incident Kit e-mailem.',
      hint: 'Po kilku minutach nic nie ma? Sprawdź folder spam.',
      back: 'Wróć do kalkulatora terminów',
    },
    confirmed: {
      title: 'Adres potwierdzony',
      description: 'Twój adres e-mail jest potwierdzony. Incident Kit jest w drodze.',
      body: 'Dziękujemy. Incident Kit jest w drodze do Twojej skrzynki.',
      back: 'Wróć do kalkulatora terminów',
    },
  },
  earlyAccess: {
    title: 'Wczesny dostęp do Within24',
    description:
      'Dołącz do listy wczesnego dostępu Within24: zgłoszenia CRA pisane przez AI i zegary prawne dla małych zespołów. Bez płatności.',
    plansLink: 'Porównaj plany',
  },
  pricing: {
    title: 'Cennik i wczesny dostęp',
    description:
      'Plany dla zespołów, które muszą na czas zgłaszać incydenty z CRA, NIS2 i RODO. Wczesny dostęp: nie pobieramy żadnej opłaty.',
    intro:
      'Within24 jest we wczesnym dostępie. Wybierz pasujący plan i zostaw e-mail: skontaktujemy się przed startem, a wtedy zdecydujesz, czy kupić.',
    perMonth: '/ mies.',
    noPayment: 'Wczesny dostęp. Nie pobieramy żadnej opłaty.',
    choose: 'Wybierz {plan}',
    useCalculator: 'Użyj kalkulatora',
    perTeam:
      'Ceny są za zespół, nie za osobę: Starter obejmuje do {people} osób dyżurnych za łącznie {price} € miesięcznie.',
    priceLock: 'Zespoły z wczesnego dostępu zachowują tę cenę przez 12 miesięcy po starcie.',
    consultant: 'Jesteś konsultantem z kilkoma klientami? Napisz o tym w formularzu.',
    pagerDuty:
      'Używasz już PagerDuty albo Opsgenie? Starter z nimi współpracuje: wysyłaj alerty przez webhook.',
    oncallOnly:
      'Potrzebujesz tylko dyżurów? Każdy plan działa bez części CRA: zegary prawne startują dopiero, gdy oznaczysz incydent jako podlegający zgłoszeniu.',
    recommended: 'Polecany',
    plans: {
      free: {
        name: 'Free',
        description: 'Narzędzia, by ustalić, co Cię dotyczy.',
        features: ['Kalkulator terminów', 'Poradniki'],
      },
      starter: {
        name: 'Starter',
        description: 'Dla jednego małego zespołu produktowego.',
        features: [
          'Do 5 osób dyżurnych',
          '1 produkt',
          'Webhooki alertów',
          'Eskalacja przez Telegram i e-mail',
          'Import z Opsgenie',
          'Zegary CRA, NIS2 i RODO',
          'Projekty każdego zgłoszenia od AI',
        ],
      },
      team: {
        name: 'Team',
        description: 'Dla zespołów z działem wsparcia i kilkoma produktami.',
        features: [
          'Do 20 osób dyżurnych',
          'Bez limitu produktów',
          'Połączenia telefoniczne',
          'Wstępna ocena każdego alertu przez AI',
          'Przycisk „Zadzwoń do programisty” dla wsparcia',
          'Eksport audytowy',
        ],
      },
    },
    formHeading: 'Dołącz do wczesnego dostępu',
    formIntro:
      'Napiszemy, gdy Twój plan będzie gotowy. Kilka szybkich kliknięć, żebyśmy najpierw zbudowali to, co trzeba. Bez płatności.',
    plan: 'Plan',
    planNone: 'Jeszcze nie wiem',
    submit: 'Dołącz do wczesnego dostępu',
    success:
      'Sprawdź skrzynkę, aby potwierdzić. Skontaktujemy się przed startem; wtedy zdecydujesz, czy kupić.',
    thanks: {
      title: 'Potwierdź e-mail, aby dołączyć do wczesnego dostępu',
      description: 'Potwierdź adres e-mail, aby dołączyć do listy wczesnego dostępu.',
      body: 'Sprawdź skrzynkę, aby potwierdzić. Skontaktujemy się przed startem; wtedy zdecydujesz, czy kupić.',
      back: 'Wróć do cennika',
    },
    confirmed: {
      title: 'Jesteś na liście wczesnego dostępu',
      description: 'Twój adres e-mail jest potwierdzony dla wczesnego dostępu do Within24.',
      body: 'Dziękujemy. Skontaktujemy się przed startem.',
      back: 'Wróć do kalkulatora terminów',
    },
  },
  home: {
    title: 'Dyżury i zgłaszanie incydentów w UE dla małych zespołów',
    description:
      'Grafiki, eskalacja i połączenia, import z Opsgenie oraz zegary CRA, NIS2 i RODO. Zapytaj naszego przewodnika AI, czy Within24 pasuje do Twojego zespołu.',
    heading: 'Dyżury i zgłaszanie incydentów w UE dla małych zespołów programistycznych',
    intro:
      'Grafiki, eskalacja i połączenia telefoniczne, import z Opsgenie oraz zegary CRA, NIS2 i RODO z projektami zgłoszeń od AI. Hosting w UE.',
    primary: 'Dołącz do wczesnego dostępu',
    secondary: 'Oblicz terminy zgłoszeń',
    status: 'Wczesny dostęp: właśnie budujemy Within24.',
    guide: {
      label: 'Opisz swój problem. W kilka sekund zobaczysz, czy go rozwiązujemy.',
      hint: 'Enter wysyła pytanie. Shift+Enter zaczyna nową linię.',
      examples: [
        'Odchodzimy z Opsgenie przed kwietniem i potrzebujemy połączeń w nocy',
        'Wsparcie nie ma jak obudzić programisty',
        'Sprzedajemy urządzenie w UE. Co zgłaszamy w ramach CRA?',
        'Jedna burza alertów budzi trzy osoby naraz',
      ],
      button: 'Zapytaj przewodnika AI',
      buttonBusy: 'AI odpowiada',
      tryLabel: 'Spróbuj:',
      chips: [
        {
          label: 'Odejście z Opsgenie',
          text: 'Jesteśmy zespołem 8 inżynierów i odchodzimy z Opsgenie przed kwietniem. Potrzebujemy grafików, eskalacji i połączeń telefonicznych.',
        },
        {
          label: 'Zgłoszenia CRA',
          text: 'Sprzedajemy w UE urządzenie połączone z siecią i musimy zgłaszać podatności w ramach CRA.',
        },
        {
          label: 'Wsparcie musi dotrzeć do programisty',
          text: 'Nasz dział wsparcia potrzebuje sposobu, by w nocy zadzwonić do dyżurnego programisty.',
        },
      ],
      thinking: 'Porównujemy Twój problem z każdym modułem',
      verdicts: {
        fits: 'Pasuje',
        partly: 'Pasuje częściowo',
        not_yet: 'Jeszcze nie',
        not_for_us: 'Tym się nie zajmujemy',
        off_topic: 'Nie na temat',
      },
      offTopic:
        'Odpowiadam tylko na jedno pytanie: czy Within24 rozwiąże Twój problem. Opisz, czego potrzebuje Twój zespół, na przykład jak budzicie się w nocy albo jakie zgłoszenia musicie składać.',
      statuses: {
        available: 'Dostępne',
        building: 'W budowie',
        next: 'Wkrótce',
        not_planned: 'Nie planujemy',
        unknown: 'Zapytamy zespół',
      },
      emailLabel: 'Otrzymaj pełną analizę e-mailem',
      emailHint: 'Który plan pasuje, co skonfigurować najpierw i czego jeszcze nie ma.',
      emailPlaceholder: 'ty@firma.pl',
      emailButton: 'Wyślijcie mi analizę',
      emailSending: 'Wysyłanie…',
      consent:
        'Analizę wysyłamy od razu. Za pierwszym razem drugi e-mail poprosi o potwierdzenie miejsca we wczesnym dostępie.',
      privacy: 'Polityka prywatności',
      sent: {
        heading: 'Sprawdź skrzynkę.',
        text: 'Pełna analiza jest w drodze.',
      },
      again: 'Zapytaj o coś innego',
      left: 'Możesz zadać do {max} pytań dziennie. Dziś zostało: {left}.',
      lastOne: 'Możesz zadać do {max} pytań dziennie. To było ostatnie na dziś.',
      errors: {
        short: 'Najpierw opisz problem w kilku słowach.',
        email: 'Wpisz poprawny adres e-mail.',
        network: 'Brak połączenia. Sprawdź internet i spróbuj ponownie.',
        robot:
          'Nie udało się potwierdzić, że nie jesteś robotem. Odśwież stronę i spróbuj ponownie.',
        tooMany: 'Możesz zadać do 5 pytań dziennie. Wróć jutro.',
        expired: 'Ta odpowiedź wygasła. Zapytaj ponownie.',
        already: 'Już wysłaliśmy tę analizę. Sprawdź skrzynkę.',
        unavailable: 'Przewodnik AI jest teraz niedostępny. Spróbuj ponownie później.',
      },
    },
    modules: {
      heading: 'Co robi Within24',
      headingAnswered: 'Co rozwiązuje Twój problem',
      note: 'Każda karta mówi, czy moduł działa już dziś, jest w budowie, czy pojawi się później.',
      swipe: 'Przesuń, aby zobaczyć wszystko',
      fit: 'Pasuje do Twojego problemu',
      items: [
        {
          id: 'oncall',
          title: 'Obudź właściwą osobę',
          text: 'Grafiki, eskalacja i połączenia, aż ktoś stuknie „Zajmuję się tym”.',
          tag: 'W becie',
          tone: 'ok',
          href: '/on-call/',
          link: 'Jak działają dyżury',
        },
        {
          id: 'alerts',
          title: 'Jeden problem, jeden incydent',
          text: 'Alerty z Grafany, Prometheusa lub dowolnego webhooka, zebrane w jeden incydent.',
          tag: 'W becie',
          tone: 'ok',
        },
        {
          id: 'opsgenie',
          title: 'Przejdź z Opsgenie',
          text: 'Przenieś grafiki, polityki eskalacji i integracje, zanim Opsgenie zostanie zamknięte.',
          tag: 'W budowie',
          tone: 'build',
          href: '/opsgenie-alternative/',
          link: 'Alternatywa dla Opsgenie',
        },
        {
          id: 'report',
          title: 'Zgłaszaj na czas',
          text: 'Zegary CRA, NIS2 i RODO z projektami zgłoszeń od AI. Kalkulator terminów jest już za darmo.',
          tag: 'Darmowe narzędzia',
          tone: 'free',
          href: '/deadlines/',
          link: 'Oblicz terminy',
        },
        {
          id: 'customers',
          title: 'Poinformuj dotkniętych klientów',
          text: 'Kto używa dotkniętego produktu, strona statusu i przycisk „Zadzwoń do programisty”.',
          tag: 'Wkrótce',
          tone: 'next',
        },
        {
          id: 'team',
          title: 'Sprawiedliwe dyżury',
          text: 'Godziny nocne i weekendowe do wypłat oraz statystyki incydentów.',
          tag: 'Wkrótce',
          tone: 'next',
        },
      ] as HomeModule[],
    },
    example: {
      caption:
        'Przykładowy incydent: Sam zajął się nim 4 minuty po alercie, a trzy zegary CRA biegną od 9 godzin.',
      badge: 'Przykład',
      id: 'INC-0412',
      name: 'Aktywnie wykorzystywana podatność',
      status: 'Zegary biegną',
      oncall: {
        label: 'Dyżur',
        events: [
          { time: '03:12', text: 'Alert z Sentry: próby exploita na API logowania' },
          { time: '03:13', text: 'Dzwonimy do Sama, który ma dyżur w tym tygodniu' },
          { time: '03:16', text: 'Sam: „Zajmuję się tym”' },
        ],
      },
      clocksLabel: 'Zegary CRA',
      axis: ['sob. 03:12', '+24 h', '+48 h', '+72 h'],
      now: 'Teraz',
      lanes: {
        earlyWarning: 'Wczesne ostrzeżenie',
        earlyWarningValue: 'zostało 14:47:12',
        notification: 'Powiadomienie',
        notificationValue: 'Termin: wt. 03:12',
        finalReport: 'Sprawozdanie końcowe',
        finalReportValue: 'Czeka na „poprawka dostępna od”',
      },
      draft: 'Projekt wczesnego ostrzeżenia gotowy: 9 stwierdzeń, 9 źródeł',
    },
    how: {
      heading: 'Jak to działa',
      steps: [
        {
          name: 'Alert może wymagać zgłoszenia',
          text: 'Webhook przychodzi z PagerDuty, Opsgenie, Grafany lub Sentry. AI oznacza alerty, które wyglądają na podlegające zgłoszeniu z CRA, NIS2 lub RODO.',
        },
        {
          name: 'Startują zegary prawne',
          text: 'Twój inżynier potwierdza, a liczniki 24 godzin, 72 godzin i sprawozdania końcowego startują od chwili, w której się dowiedziałeś.',
        },
        {
          name: 'Ktoś nie śpi i działa',
          text: 'Połączenie, Telegram i e-mail, z eskalacją w dół grafiku, aż ktoś stuknie „Zajmuję się tym”.',
        },
        {
          name: 'Każde zgłoszenie ma projekt',
          text: 'Przed każdym terminem projekt jest gotowy na podstawie osi czasu incydentu, ze źródłem przy każdym stwierdzeniu. Ty go poprawiasz i sam składasz na pojedynczej platformie zgłoszeń ENISA.',
        },
      ],
    },
    pricing: {
      heading: 'Cennik',
      intro:
        'Ceny we wczesnym dostępie. Wybierz plan, aby dołączyć do listy; nie pobieramy opłaty.',
      more: 'Więcej o planach',
    },
    trust: {
      heading: 'Na czym możesz polegać',
      items: [
        {
          name: 'Zbudowane przez inżyniera z dyżurów',
          text: 'Nasz założyciel przez dwa lata pełnił dyżury dla platformy obsługi klienta. Within24 powstaje z myślą o alertach o 3 w nocy z tamtych lat.',
        },
        {
          name: 'Zawsze decyduje człowiek',
          text: 'Within24 nigdy nie składa niczego w ENISA i nigdy nie mówi, że zgłoszenie nie jest potrzebne.',
        },
        {
          name: 'Każda odpowiedź ma źródło',
          text: 'Numery artykułów i linki do tekstów urzędowych. Gdy źródła nie ma, mówimy, że sprawa jest niejasna.',
        },
        {
          name: 'Minimum danych',
          text: 'Żadnych śledzących plików cookie. Twój e-mail przechowujemy tylko za Twoją zgodą.',
        },
      ],
      privacy: 'Przeczytaj politykę prywatności',
    },
    faq: {
      heading: 'Pytania',
      items: [
        {
          q: 'Czy składacie za nas zgłoszenia do ENISA?',
          a: 'Nie. Pojedyncza platforma zgłoszeń ENISA nie ma API, a decyzja o zgłoszeniu należy do człowieka. Within24 budzi właściwą osobę i przygotowuje tekst.',
        },
        {
          q: 'Jakie dane widzi AI?',
          a: 'Tylko to, co jej wyślesz: treść alertów i oś czasu incydentu. Dane osobowe są maskowane, zanim trafią do modelu, a AI nigdy nie decyduje sama.',
        },
        {
          q: 'Używamy już PagerDuty. Czy musimy zmieniać?',
          a: 'Nie. Wysyłaj alerty do Within24 przez webhook. PagerDuty dalej budzi Twój zespół; Within24 dodaje zegary prawne i projekty zgłoszeń.',
        },
        {
          q: 'Odchodzimy z Opsgenie. Czy możemy używać Within24 bez części CRA?',
          a: 'Tak. Zegary prawne startują dopiero, gdy oznaczysz incydent jako podlegający zgłoszeniu.',
        },
        {
          q: 'Kiedy będę mógł z tego korzystać?',
          a: 'Teraz budujemy rdzeń produktu i będziemy wprowadzać zespoły z wczesnego dostępu w małych grupach.',
        },
      ],
    },
  },
  faqPage: {
    title: 'Zgłoszenia CRA i dyżury: najczęstsze pytania',
    description:
      'Krótkie odpowiedzi: kogo dotyczy CRA, jego terminy 24 h, 72 h i sprawozdania końcowego, związek z NIS2 i RODO oraz prowadzenie dyżurów.',
    intro:
      'Krótkie odpowiedzi, każda z artykułem, z którego pochodzi, i poradnikiem, który idzie głębiej.',
    verified:
      'Ostatnio sprawdzono: 27 października 2026 r., z tekstami rozporządzenia (UE) 2024/2847, dyrektywy (UE) 2022/2555 i rozporządzenia (UE) 2016/679.',
    more: 'Przeczytaj poradnik',
    productHeading: 'O Within24',
    groups: [
      {
        id: 'scope',
        heading: 'Czy CRA mnie dotyczy?',
        items: [
          {
            q: 'Czy Cyber Resilience Act dotyczy SaaS?',
            a: 'Zwykle nie bezpośrednio: motyw 12 kieruje SaaS, PaaS i IaaS do NIS2. Backend w chmurze jest objęty, gdy jest rozwiązaniem do zdalnego przetwarzania danych produktu, który dostarczasz, np. serwerem potrzebnym do działania Twojej aplikacji lub urządzenia (art. 3 pkt 1 i 2).',
            link: '/guides/cra-saas-scope/',
          },
          {
            q: 'Czy dotyczy oprogramowania darmowego lub open source?',
            a: 'Tylko oprogramowania dostarczanego w ramach działalności handlowej (motyw 18). Pobieranie opłat za produkt, za wsparcie ponad koszty albo monetyzacja przez produkt mogą się liczyć jako działalność handlowa (motyw 15). Podmioty zarządzające oprogramowaniem open source mają lżejsze obowiązki i nie są karane grzywną na podstawie CRA (art. 24, art. 64 ust. 10 lit. b)).',
          },
          {
            q: 'Nie mamy siedziby w UE. Czy to nas dotyczy?',
            a: 'Tak, jeśli Twój produkt jest udostępniany na rynku UE (art. 2 ust. 1). Nadal zgłaszasz przez pojedynczą platformę zgłoszeń ENISA, do CSIRT wybranego według kolejności z art. 14 ust. 7: państwo Twojego upoważnionego przedstawiciela, potem importera, potem dystrybutora, potem to, w którym jest najwięcej Twoich użytkowników.',
          },
          {
            q: 'Czy obowiązek zgłaszania dotyczy produktów sprzedanych przed grudniem 2027?',
            a: 'Tak. Obowiązek zgłaszania z art. 14 dotyczy wszystkich objętych produktów, także wprowadzonych do obrotu przed 11 grudnia 2027 r. (art. 69 ust. 3).',
          },
          {
            q: 'Kto zgłasza: my czy nasz klient?',
            a: 'Producent: ten, kto opracowuje produkt lub zleca jego opracowanie i wprowadza go do obrotu pod własną nazwą lub znakiem towarowym (art. 3 pkt 13, art. 14 ust. 1).',
          },
        ],
      },
      {
        id: 'deadlines',
        heading: 'Terminy i zgłoszenia',
        items: [
          {
            q: 'Jakie są terminy zgłoszeń z CRA?',
            a: 'Wczesne ostrzeżenie w ciągu 24 godzin od powzięcia wiadomości, powiadomienie w ciągu 72 godzin, a potem sprawozdanie końcowe: 14 dni od udostępnienia poprawki w przypadku podatności albo miesiąc od powiadomienia w przypadku incydentu (art. 14 ust. 2 i 4).',
            link: '/guides/cra-reporting-deadlines/',
          },
          {
            q: 'Kiedy startuje zegar 24 godzin?',
            a: 'Gdy dowiadujesz się o aktywnie wykorzystywanej podatności lub poważnym incydencie (art. 14 ust. 2 lit. a)). Rozporządzenie nie definiuje tej chwili, więc przyjmij najwcześniejszą, której potrafisz bronić.',
            link: '/guides/cra-24-hour-clock/',
          },
          {
            q: 'Czy weekendy lub święta wstrzymują zegar?',
            a: 'Nie. Limity 24 i 72 godzin liczy się w godzinach, a art. 14 nie przewiduje przedłużenia na noce, weekendy ani święta. Limity 14 dni i jednego miesiąca traktujemy tak samo i nigdy ich nie przedłużamy.',
          },
          {
            q: 'A jeśli poprawka zajmie nam więcej niż 14 dni?',
            a: '14 dni na sprawozdanie końcowe o podatności zaczyna biec dopiero, gdy dostępny jest środek naprawczy lub łagodzący (art. 14 ust. 2 lit. c)). Do tego czasu nie ma daty sprawozdania końcowego, ale wczesne ostrzeżenie i powiadomienie nadal obowiązują.',
          },
          {
            q: 'Badacz zgłosił nam podatność. Czy musimy ją zgłosić?',
            a: 'Nie jako aktywnie wykorzystywaną podatność, jeśli nie ma dowodów, że wykorzystał ją złośliwy podmiot (art. 3 pkt 42, motyw 68). Możesz zgłosić ją dobrowolnie (art. 15).',
            link: '/guides/cra-what-to-report/',
          },
          {
            q: 'Czy organ może zażądać więcej po zgłoszeniu?',
            a: 'Tak. CSIRT, który otrzyma Twoje zgłoszenie, może zażądać sprawozdania okresowego z aktualizacjami statusu (art. 14 ust. 6).',
          },
          {
            q: 'Czy musimy też poinformować użytkowników?',
            a: 'Tak. Po powzięciu wiadomości poinformuj użytkowników, których to dotyczy, a w stosownych przypadkach wszystkich użytkowników, i napisz, co mogą zrobić, by ograniczyć skutki (art. 14 ust. 8).',
          },
          {
            q: 'Co się stanie, jeśli zgłosimy za późno?',
            a: 'Za naruszenie obowiązków z art. 14 grozi administracyjna kara pieniężna do 15 mln EUR lub 2,5% całkowitego rocznego światowego obrotu, w zależności od tego, która kwota jest wyższa (art. 64 ust. 2). Mikroprzedsiębiorstwa i małe przedsiębiorstwa nie są karane za niedotrzymanie terminu 24-godzinnego wczesnego ostrzeżenia (art. 64 ust. 10 lit. a)).',
          },
        ],
      },
      {
        id: 'laws',
        heading: 'CRA, NIS2 i RODO razem',
        items: [
          {
            q: 'Czym zgłoszenia z CRA różnią się od NIS2 i RODO?',
            a: 'Każdy akt ma własny wyzwalacz, adresata i zegar. CRA obejmuje Twój produkt, NIS2 usługę Twojej organizacji, RODO dane osobowe. Jeden incydent może podlegać wszystkim trzem.',
            link: '/guides/cra-nis2-gdpr-reporting/',
          },
          {
            q: 'Czy NIS2 nas dotyczy?',
            a: 'NIS2 obejmuje podmioty z sektorów wymienionych w jej załącznikach I i II, w tym dostawców usług przetwarzania w chmurze, które są co najmniej średnimi przedsiębiorstwami (NIS2 art. 2 ust. 1). Niektóre rodzaje podmiotów są objęte bez względu na wielkość (art. 2 ust. 2). Szczegóły określa prawo krajowe Twojego państwa.',
          },
          {
            q: 'Czy jedno zgłoszenie może objąć CRA, NIS2 i RODO?',
            a: 'Nie. Każde trafia do innego adresata: zgłoszenie z CRA do CSIRT i ENISA przez pojedynczą platformę zgłoszeń (CRA art. 14 ust. 7), NIS2 do krajowego CSIRT lub właściwego organu (NIS2 art. 23 ust. 1), RODO do organu ochrony danych (RODO art. 33 ust. 1). Pisz je na podstawie jednej osi czasu incydentu, aby fakty się zgadzały.',
          },
          {
            q: 'Jaki jest termin RODO na zgłoszenie naruszenia danych?',
            a: 'W miarę możliwości 72 godziny od stwierdzenia naruszenia, chyba że jest mało prawdopodobne, by skutkowało ono ryzykiem dla osób. Późniejsze zgłoszenie musi zawierać przyczyny opóźnienia (RODO art. 33 ust. 1).',
          },
        ],
      },
      {
        id: 'on-call',
        heading: 'Prowadzenie dyżurów',
        items: [
          {
            q: 'Ilu osób potrzebujemy do dyżurów?',
            a: 'Przy trzech osobach każda ma dyżur co trzeci tydzień: to działa, ale jest ciężkie; od pięciu osób da się to utrzymać. Jedna osoba główna, jedna zapasowa, tygodniowe zmiany, przekazanie w godzinach pracy.',
            link: '/guides/on-call-rotation-small-team/',
          },
          {
            q: 'Kogo budzić, jeśli dyżurny inżynier nie odbiera?',
            a: 'Spisz politykę eskalacji, zanim będzie potrzebna: na przykład osoba główna telefonicznie po 5 minutach, zapasowa po 15, lider zespołu inżynierów po 30.',
            link: '/guides/escalation-policy/',
          },
          {
            q: 'Czy nasz dział wsparcia może obudzić programistę?',
            a: 'Powinien mieć jeden przycisk lub numer, który zawsze łączy z osobą aktualnie dyżurującą, oraz pozwolenie, by z niego korzystać. Klient mówiący „widzę dane kogoś innego” może uruchomić zegar prawny.',
            link: '/guides/support-to-developer-escalation/',
          },
        ],
      },
    ],
  },
  oncall: {
    title: 'Dyżury dla małych zespołów z terminami UE w środku',
    description:
      'Grafiki, eskalacja, połączenia i przycisk „Zadzwoń do programisty” dla wsparcia. Działa obok PagerDuty lub zastępuje Opsgenie. Wczesny dostęp.',
    breadcrumb: 'Dyżury',
    heading: 'Dyżury, które budzą właściwą osobę',
    intro:
      'Dla zespołów od 3 do 20 inżynierów. Alerty przychodzą przez webhook, a Within24 dzwoni do osoby dyżurnej i eskaluje w dół grafiku, aż ktoś stuknie „Zajmuję się tym”.',
    status: 'Wczesny dostęp: właśnie budujemy Within24.',
    primary: 'Dołącz do wczesnego dostępu',
    sections: [
      {
        id: 'alerts',
        heading: 'Jak alert dociera do człowieka',
        text: 'Webhook przychodzi z Grafany, Sentry, New Relic, PagerDuty lub Opsgenie. Within24 najpierw wysyła Telegram i e-mail, a potem dzwoni, jeśli nikt nie odpowiada (połączenia w planie Team). Po ustalonym czasie przechodzi do następnej osoby.',
        links: [
          { label: 'Polityka eskalacji dla małych zespołów', href: '/guides/escalation-policy/' },
        ],
      },
      {
        id: 'rotas',
        heading: 'Grafiki, które mały zespół utrzyma',
        text: 'Tygodniowa rotacja, osoba zapasowa i zamiany, gdy ktoś jest nieobecny.',
        links: [
          {
            label: 'Rotacja dyżurów w małym zespole',
            href: '/guides/on-call-rotation-small-team/',
          },
        ],
      },
      {
        id: 'support',
        heading: 'Wsparcie może obudzić programistę',
        text: 'Dział wsparcia dostaje przycisk „Zadzwoń do programisty”: bez pisania reguł alertów i szukania numerów telefonów.',
        links: [
          {
            label: 'Jak dział wsparcia może dotrzeć do dyżurnego programisty',
            href: '/guides/support-to-developer-escalation/',
          },
        ],
      },
      {
        id: 'opsgenie',
        heading: 'Przejście z Opsgenie',
        text: 'Zaimportuj grafiki i reguły eskalacji w dowolnym płatnym planie, uruchom oba narzędzia równolegle przez tydzień, a potem się przełącz.',
        links: [
          { label: 'Within24 jako alternatywa dla Opsgenie', href: '/opsgenie-alternative/' },
          {
            label: 'Koniec wsparcia Opsgenie: daty i tygodniowy plan migracji',
            href: '/guides/opsgenie-migration/',
          },
        ],
      },
      {
        id: 'legal',
        heading: 'Gdy incydent jest też sprawą prawną',
        text: 'Oznacz incydent jako podlegający zgłoszeniu, a zegary CRA, NIS2 i RODO wystartują od chwili, w której się dowiedziałeś. Do tego czasu alert jest tylko alertem.',
        links: [
          { label: 'Czego wymaga od Ciebie CRA', href: '/cra/' },
          { label: 'Oblicz terminy zgłoszeń', href: '/deadlines/' },
        ],
      },
    ],
    pricing: {
      heading: 'Cennik',
      intro:
        'Ceny we wczesnym dostępie. Wybierz plan, aby dołączyć do listy; nie pobieramy opłaty.',
    },
    next: {
      heading: 'Dyżury, które znają zegary prawne',
      text: 'Skontaktujemy się przed startem; wtedy zdecydujesz, czy kupić.',
    },
  },
  opsgenieAlt: {
    title: 'Alternatywa dla Opsgenie dla małych zespołów',
    description:
      'Opsgenie kończy działanie 5 kwietnia 2027 r. Within24 to dyżury dla zespołów od 3 do 20 osób: grafiki, eskalacja, jedna cena za zespół, hosting w UE.',
    breadcrumb: 'Alternatywa dla Opsgenie',
    heading: 'Alternatywa dla Opsgenie dla małych zespołów',
    intro:
      'Opsgenie kończy działanie 5 kwietnia 2027 r. Within24 to dyżury dla zespołów od 3 do 20 osób: tygodniowy grafik, eskalacja, aż ktoś stuknie „Zajmuję się tym”, i jedna cena za cały zespół.',
    primary: 'Dołącz do wczesnego dostępu',
    status:
      'Wczesny dostęp: właśnie budujemy Within24. Dołącz do listy i napisz, które kanały muszą Cię budzić.',
    keep: {
      heading: 'Co zachowujesz z Opsgenie',
      columns: { from: 'W Opsgenie', to: 'W Within24' },
      rows: [
        {
          from: 'Harmonogramy i rotacje',
          to: 'Tygodniowy grafik, osoba zapasowa, zamiany, gdy ktoś jest nieobecny',
        },
        {
          from: 'Polityki eskalacji',
          to: 'Kroki z osobą, grafikiem lub zespołem i odstępem czasu między nimi',
        },
        {
          from: 'Integracje',
          to: 'Jeden webhook alertów dla Grafany, Sentry, New Relic i wszystkiego, co umie wysłać HTTP',
        },
        {
          from: 'Powiadomienia',
          to: 'Telegram i e-mail w każdym planie, połączenia telefoniczne w planie Team',
        },
        { from: 'Acknowledge', to: 'Przycisk „Zajmuję się tym”, który zatrzymuje eskalację' },
      ],
    },
    sections: [
      {
        id: 'left-out',
        heading: 'Czego nie robimy',
        text: 'Bez aplikacji mobilnej, bez SMS, bez heartbeatów i bez katalogu usług. Mały zespół rzadko ich używa. Jeśli na nich polegasz, lepiej sprawdzi się Jira Service Management lub większe narzędzie.',
        links: [],
      },
      {
        id: 'price',
        heading: 'Jedna cena za zespół',
        text: 'Starter obejmuje do 5 osób dyżurnych za łącznie 29 € miesięcznie. Team obejmuje do 20 osób za 99 €. Nie płacisz za osobę. Zespoły z wczesnego dostępu zachowują tę cenę przez 12 miesięcy po starcie.',
        links: [{ label: 'Porównaj plany', href: '/pricing/' }],
      },
      {
        id: 'move',
        heading: 'Przeprowadzka w tydzień',
        text: 'Zaimportuj grafiki i reguły eskalacji, kieruj alerty do obu narzędzi przez tydzień, przetestuj ścieżkę z 3 w nocy z prawdziwą osobą dyżurną, a potem wyłącz Opsgenie.',
        links: [
          {
            label: 'Koniec wsparcia Opsgenie: daty i tygodniowy plan migracji',
            href: '/guides/opsgenie-migration/',
          },
        ],
      },
      {
        id: 'eu',
        heading: 'Hosting w UE',
        text: 'Within24 działa na serwerach w UE. Alerty, grafiki i historia incydentów tam pozostają.',
        links: [],
      },
      {
        id: 'legal',
        heading: 'Jeśli sprzedajesz oprogramowanie w UE',
        text: 'Oznacz incydent jako podlegający zgłoszeniu, a zegary CRA, NIS2 i RODO wystartują obok powiadomień. Do tego czasu alert jest tylko alertem.',
        links: [
          { label: 'Czego wymaga od Ciebie CRA', href: '/cra/' },
          { label: 'Oblicz terminy zgłoszeń', href: '/deadlines/' },
        ],
      },
    ],
    form: {
      heading: 'Napisz, co musi Cię budzić',
      text: 'Napiszemy, gdy dyżury będą gotowe do wypróbowania. Bez płatności.',
    },
  },
  cra: {
    title: 'Cyber Resilience Act: co i kiedy zgłaszać',
    description:
      'Czego wymaga unijny Cyber Resilience Act, gdy coś pójdzie nie tak: kto zgłasza, do kogo, terminy 24 h, 72 h i sprawozdania końcowego oraz kluczowe daty.',
    breadcrumb: 'CRA',
    verified:
      'Ostatnio sprawdzono: 25 października 2026 r., z tekstem opublikowanym w Dzienniku Urzędowym 20 listopada 2024 r.',
    asks: {
      heading: 'Czego wymaga od Ciebie Cyber Resilience Act',
      intro:
        'Cyber Resilience Act (rozporządzenie (UE) 2024/2847) ustala zasady bezpieczeństwa dla sprzętu i oprogramowania sprzedawanego w UE. Większość dotyczy tego, jak budujesz i utrzymujesz produkt. Jedna część dotyczy tego, co się dzieje, gdy coś pójdzie nie tak: zgłaszasz to, w określonym czasie.',
      facts: [
        {
          name: 'Kto',
          text: 'Producenci produktów z elementami cyfrowymi udostępnianych na rynku UE.',
          ref: 'Art. 2 ust. 1, art. 3 pkt 1 i 13',
        },
        {
          name: 'Co zgłaszać',
          text: 'Aktywnie wykorzystywane podatności w Twoim produkcie oraz poważne incydenty mające wpływ na jego bezpieczeństwo.',
          ref: 'Art. 14 ust. 1 i 3',
        },
        {
          name: 'Do kogo',
          text: 'Do CSIRT wyznaczonego jako koordynator i do ENISA, jednocześnie, przez pojedynczą platformę zgłoszeń ENISA.',
          ref: 'Art. 14 ust. 1 i 7 oraz art. 16',
        },
        {
          name: 'Jak szybko',
          text: 'Bez zbędnej zwłoki: wczesne ostrzeżenie w ciągu 24 godzin od powzięcia wiadomości, powiadomienie w ciągu 72 godzin, a potem sprawozdanie końcowe.',
          ref: 'Art. 14 ust. 2 i 4',
        },
      ],
      datesHeading: 'Kluczowe daty',
      upcoming: 'Za {months} mies.',
      upcomingSoon: 'Za mniej niż miesiąc',
      dates: [
        {
          date: '2024-12-10',
          label: '10 grudnia 2024',
          done: 'Obowiązuje',
          text: 'Rozporządzenie weszło w życie.',
          ref: 'Art. 71 ust. 1',
        },
        {
          date: '2026-06-11',
          label: '11 czerwca 2026',
          done: 'Stosuje się',
          text: 'Zaczynają się stosować przepisy o notyfikacji jednostek oceniających zgodność (rozdział IV, art. 35–51).',
          ref: 'Art. 71 ust. 2',
        },
        {
          date: '2026-09-11',
          label: '11 września 2026',
          done: 'Stosuje się już teraz',
          text: 'Startuje zgłaszanie. Art. 14 stosuje się od tej daty, także do produktów wprowadzonych do obrotu przed 2027 r.',
          ref: 'Art. 71 ust. 2 i art. 69 ust. 3',
        },
        {
          date: '2027-12-11',
          label: '11 grudnia 2027',
          done: 'Stosuje się',
          text: 'Stosuje się wszystko inne: zasadnicze wymagania, ocena zgodności i oznakowanie CE.',
          ref: 'Art. 71 ust. 2',
        },
      ],
      link: 'Oblicz terminy zgłoszeń',
    },
    reports: {
      heading: 'Trzy zgłoszenia, trzy zegary',
      intro:
        'Art. 14 przewiduje trzy etapy. Within24 uruchamia zegar dla każdego i ma gotowy projekt przed jego końcem. Każdy projekt sprawdzasz i sam składasz na pojedynczej platformie zgłoszeń ENISA.',
      due: 'Termin',
      covers: 'Co obejmuje zgłoszenie',
      within24: 'Co robi Within24',
      stages: [
        {
          name: 'Wczesne ostrzeżenie',
          due: 'Bez zbędnej zwłoki, najpóźniej 24 godziny po powzięciu wiadomości.',
          covers:
            'Że do tego doszło i w których państwach członkowskich Twój produkt jest dostępny. W przypadku incydentów: czy wygląda na spowodowany działaniem bezprawnym lub złośliwym.',
          within24:
            'Uruchamia zegar, gdy Twój inżynier potwierdzi alert. Dzwoni do osoby dyżurnej, aż ktoś odbierze. Przygotowuje projekt ostrzeżenia z alertu i pierwszych notatek.',
        },
        {
          name: 'Powiadomienie',
          due: 'Bez zbędnej zwłoki, najpóźniej 72 godziny po powzięciu wiadomości.',
          covers:
            'Co wiadomo do tej pory, co zrobiłeś, co użytkownicy mogą zrobić, aby ograniczyć skutki, i jak wrażliwe są informacje.',
          within24:
            'Buduje oś czasu incydentu w trakcie pracy: alerty, notatki, zmiany statusu. Przygotowuje projekt powiadomienia ze źródłem przy każdym stwierdzeniu.',
        },
        {
          name: 'Sprawozdanie końcowe',
          due: 'Podatność: 14 dni od udostępnienia poprawki lub środka łagodzącego. Incydent: miesiąc od złożenia powiadomienia.',
          covers:
            'Opis z wagą i skutkami. Dla podatności: złośliwy podmiot, jeśli jest znany, i aktualizacja zabezpieczeń. Dla incydentu: prawdopodobna przyczyna źródłowa i środki łagodzące.',
          within24:
            'Czeka na „poprawka dostępna od” i wtedy uruchamia ostatni zegar. Przygotowuje projekt sprawozdania końcowego z zamkniętego incydentu.',
        },
      ],
      users:
        'Musisz też poinformować dotkniętych użytkowników o problemie i o tym, co mogą zrobić (art. 14 ust. 8). Within24 przygotowuje projekt także tej wiadomości.',
    },
    scope: {
      heading: 'Czy CRA Cię dotyczy?',
      intro:
        'To zależy od tego, co dostarczasz, a nie od wielkości firmy. Potraktuj to jako pierwszą weryfikację, a potem porównaj swój przypadek z tekstem urzędowym.',
      shipHeading: 'Jeśli dostarczasz',
      usuallyHeading: 'Zwykle',
      items: [
        {
          name: 'Aplikacje mobilne, oprogramowanie desktopowe lub self-hosted',
          text: 'Objęte, gdy mogą się połączyć z urządzeniem lub siecią, co dotyczy prawie wszystkich (art. 2 ust. 1).',
        },
        {
          name: 'Urządzenia połączone i oprogramowanie układowe',
          text: 'Objęte. Niektóre kategorie produktów są wymienione jako ważne lub krytyczne (załączniki III i IV) i wymagają surowszej oceny zgodności (art. 7 i 8).',
        },
        {
          name: 'SDK i biblioteki',
          text: 'Objęte, gdy dostarczasz je w ramach działalności handlowej, odpłatnie lub za darmo (art. 3 pkt 22).',
        },
        {
          name: 'Tylko SaaS',
          text: 'Samo w sobie nieobjęte: usługi chmurowe podlegają raczej NIS2. Backend jest objęty, gdy jest zdalnym przetwarzaniem danych, którego produkt potrzebuje do działania, jak serwer za Twoją aplikacją (art. 3 pkt 2, motyw 12).',
        },
        {
          name: 'Open source bez działalności handlowej',
          text: 'Nieobjęte (motyw 18). Organizacje wspierające open source przeznaczone do użytku komercyjnego mają lżejsze obowiązki jako podmioty zarządzające oprogramowaniem open source (art. 24).',
        },
        {
          name: 'Spoza UE',
          text: 'Objęte w przypadku produktów udostępnianych na rynku UE, bez względu na siedzibę. Art. 14 ust. 7 określa, do którego CSIRT zgłaszasz.',
        },
      ],
      link: 'Sprawdź, które terminy dotyczą Twojego produktu',
    },
    faq: {
      heading: 'Pytania',
      items: [
        {
          q: 'Czy Cyber Resilience Act dotyczy SaaS?',
          a: 'Zwykle nie bezpośrednio. CRA obejmuje produkty z elementami cyfrowymi, a motyw 12 kieruje usługi chmurowe do NIS2. Backend w chmurze jest objęty, gdy jest zdalnym przetwarzaniem danych dla produktu, który dostarczasz, np. serwerem potrzebnym do działania aplikacji lub urządzenia (art. 3 pkt 1 i 2).',
        },
        {
          q: 'Od kiedy obowiązuje zgłaszanie z CRA?',
          a: 'Zgłaszanie aktywnie wykorzystywanych podatności i poważnych incydentów stosuje się od 11 września 2026 r. Pozostałe wymagania stosuje się od 11 grudnia 2027 r.',
        },
        {
          q: 'Czy zgłaszanie z CRA dotyczy produktów sprzedanych przed 2027 r.?',
          a: 'Tak. Obowiązki zgłaszania stosuje się od 11 września 2026 r. do wszystkich produktów z elementami cyfrowymi na rynku, także wprowadzonych do obrotu wcześniej (art. 69 ust. 3).',
        },
        {
          q: 'Czym to się różni od zgłoszeń z NIS2 i RODO?',
          a: 'Każdy akt ma własny wyzwalacz, organ i zegar. NIS2 obejmuje incydenty w podmiotach kluczowych i ważnych. RODO obejmuje naruszenia ochrony danych osobowych. Jeden incydent może podlegać wszystkim trzem, a Within24 prowadzi ich zegary obok siebie.',
        },
      ],
    },
    sourcesHeading: 'Źródła',
    sources: [
      {
        name: 'Rozporządzenie (UE) 2024/2847 (Cyber Resilience Act), EUR-Lex',
        url: 'https://eur-lex.europa.eu/eli/reg/2024/2847/oj',
      },
    ],
    next: {
      heading: 'Oblicz własne terminy',
      calculator: 'Oblicz terminy zgłoszeń',
      earlyAccess: 'Dołącz do wczesnego dostępu',
    },
  },
  formError: {
    invalid: {
      title: 'Sprawdź formularz',
      body: 'Brakowało niektórych danych albo były niepoprawne. Wróć i sprawdź adres e-mail oraz pozostałe pola.',
    },
    verification: {
      title: 'Nie udało się zweryfikować zgłoszenia',
      body: 'Kontrola antyspamowa nie powiodła się. Wróć i wyślij formularz ponownie.',
    },
    unavailable: {
      title: 'Zapisy są teraz niedostępne',
      body: 'Spróbuj ponownie później. Nic nie zostało zapisane.',
    },
    description: 'Nie udało się wysłać formularza.',
    backKit: 'Wróć do Incident Kit',
    backPricing: 'Wróć do cennika',
  },
  craCheck: {
    launcher: 'Czy CRA Cię dotyczy?',
    launcherOpen: 'Otwórz sprawdzenie CRA',
    hideLauncher: 'Ukryj',
    title: 'Sprawdzenie CRA',
    subtitle: 'AI, odpowiedzi z tekstu prawa',
    close: 'Zamknij sprawdzenie CRA',
    restart: 'Zacznij od nowa',
    stepOf: 'krok {n} z 4',
    stepDone: 'gotowe',
    stepsLabel: 'Kroki',
    steps: ['E-mail', 'Produkt', 'Odpowiedź', 'Twój problem'],
    you: 'Ty',
    greeting:
      'Cześć. Sprawdzam, czy unijny Cyber Resilience Act dotyczy Twojego produktu, i cytuję artykuły, na których opiera się odpowiedź.',
    askEmail:
      'Najpierw Twój służbowy e-mail. Używamy go, aby wrócić do Ciebie po sprawdzeniu i dać znać, gdy Within24 będzie gotowe.',
    askEmailSmall: 'Adres potwierdzasz e-mailem. Możesz zrezygnować w każdej chwili.',
    emailLabel: 'Służbowy e-mail',
    emailPlaceholder: 'ty@firma.pl',
    continue: 'Dalej',
    askProduct:
      'Dzięki. Teraz opisz swój produkt: co robi, kto go używa i jak się łączy. Wystarczy zdanie lub dwa.',
    productLabel: 'Opisz swój produkt',
    productPlaceholder: 'Kamera Wi-Fi z aplikacją na telefon…',
    examples: [
      {
        label: 'Inteligentny zamek',
        text: 'Produkujemy inteligentny zamek do drzwi. Ludzie otwierają go naszą aplikacją na telefon, a aplikacja łączy się z zamkiem przez naszą własną chmurę.',
      },
      {
        label: 'SaaS do zarządzania projektami',
        text: 'Aplikacja webowa do zarządzania projektami. Klienci używają jej w przeglądarce; nie trzeba niczego instalować.',
      },
      {
        label: 'Robimy aplikację',
        text: 'Robimy aplikację mobilną, którą ludzie instalują z App Store i Google Play.',
      },
    ],
    answerLabel: 'Twoja odpowiedź',
    answerPlaceholder: 'Twoja odpowiedź',
    questionsLeft: 'Mogę zadać jeszcze najwyżej {n}.',
    send: 'Wyślij',
    thinking: 'Sprawdzam',
    thinkingSteps: [
      'Czytam zakres i wyłączenia',
      'Porównuję z kategoriami z załączników III i IV',
      'Sprawdzam każdy artykuł z tekstem',
    ],
    verdicts: {
      in_scope: 'Tak, CRA ma zastosowanie',
      out_of_scope: 'Nie, CRA nie ma zastosowania',
      depends: 'To zależy',
      off_topic: 'To sprawdzenie dotyczy tylko CRA',
    },
    categories: {
      default: 'Kategoria domyślna',
      important_class_i: 'Ważny produkt, klasa I',
      important_class_ii: 'Ważny produkt, klasa II',
      critical: 'Krytyczny produkt',
    },
    clocks: {
      intro: 'Jeśli podatność w nim jest aktywnie wykorzystywana, zgłaszasz:',
      lanes: ['Wczesne ostrzeżenie', 'Powiadomienie', 'Sprawozdanie końcowe'],
      caption: '24 h · 72 h · 14 dni po poprawce',
      link: 'Oblicz swoje daty',
    },
    copy: 'Kopiuj odpowiedź',
    copied: 'Skopiowano',
    askPain:
      'Ostatnie pytanie. Co jest dla Ciebie teraz najtrudniejsze w zgłoszeniach z CRA lub w reagowaniu na incydenty?',
    askPainSmall:
      'Twoja odpowiedź trafia prosto do zespołu. Budujemy to, o czym ludzie piszą tutaj.',
    pains: {
      which_reports: 'Nie wiemy, jakie zgłoszenia nas obowiązują',
      reports_take_long: 'Pisanie zgłoszeń trwa za długo',
      nobody_watches_clock: 'Nikt nie pilnuje zegara w nocy',
      wrong_person_woken: 'Nocne alerty budzą niewłaściwą osobę',
      customers_ask_cra: 'Klienci pytają nas o CRA',
      other: 'Napiszę sam',
    },
    painLabel: 'Twój największy problem',
    painPlaceholder: 'Opisz własnymi słowami',
    thanks:
      'Dziękujemy. Czytamy każdą odpowiedź. Jeśli wiele zespołów wskaże ten sam problem, zajmiemy się nim najpierw.',
    checkInbox: 'Sprawdź skrzynkę i potwierdź adres.',
    earlyAccess: 'Uzyskaj wczesny dostęp',
    footnote: 'Zachowujemy to, co tu piszesz, aby ulepszać Within24.',
    privacy: 'Polityka prywatności',
    source: 'Odpowiedzi cytują rozporządzenie (UE) 2024/2847.',
    errors: {
      email: 'To nie wygląda na adres e-mail.',
      robot: 'Nie udało się potwierdzić, że nie jesteś robotem. Odśwież stronę i spróbuj ponownie.',
      tooMany: 'Za dużo sprawdzeń z Twojej sieci. Spróbuj ponownie za godzinę.',
      expired: 'To sprawdzenie wygasło. Zacznij od nowa, aby uruchomić nowe.',
      unavailable: 'Sprawdzenie jest teraz niedostępne. Spróbuj ponownie za kilka minut.',
      network: 'Brak połączenia. Sprawdź sieć i spróbuj ponownie.',
    },
  },
  privacy: {
    title: 'Polityka prywatności',
    description:
      'Jakie dane osobowe zbiera Within24, po co, którzy dostawcy je przetwarzają, jak długo je przechowujemy i jak skorzystać ze swoich praw.',
    lastUpdated: 'Ostatnia aktualizacja',
    updatedOn: '23 listopada 2026',
    translationNote:
      'To jest tłumaczenie. Jeśli różni się od wersji angielskiej, obowiązuje wersja angielska.',
    intro:
      'Ta polityka wyjaśnia, jakie dane osobowe Within24 zbiera w serwisie within24.app, po co i co możesz z tym zrobić. Czytanie serwisu i korzystanie z kalkulatora nie wymagają żadnych danych osobowych. Twój e-mail zbieramy tylko wtedy, gdy wysyłasz jeden z naszych formularzy, korzystasz ze sprawdzenia CRA lub prosisz o pełną analizę przewodnika AI. Polityka obejmuje też czat pomocy w naszej aplikacji internetowej (app.within24.app).',
    sections: [
      {
        heading: 'Kto odpowiada',
        blocks: [
          {
            p: 'Within24 prowadzi prywatna spółka zarejestrowana w Unii Europejskiej. Spółka jest administratorem opisanych tu danych osobowych. Z każdym pytaniem o tę politykę lub Twoje dane pisz na [hello@within24.app](mailto:hello@within24.app).',
          },
        ],
      },
      {
        heading: 'Co zbieramy i po co',
        blocks: [
          {
            table: {
              head: ['Gdzie', 'Co otrzymujemy', 'Po co'],
              rows: [
                [
                  'Kalkulator terminów',
                  'Nic. Działa w Twojej przeglądarce. Wpisane godziny zostają w adresie strony, żebyś mógł skopiować link; nigdy ich nie otrzymujemy.',
                  'Aby pokazać Twoje terminy.',
                ],
                [
                  'Analityka (Umami)',
                  'Odsłony stron i anonimowe zdarzenia, takie jak „użyto kalkulatora” lub „wybrano plan”, strona odsyłająca, rodzaj przeglądarki i urządzenia oraz kraj. Twój adres IP jest krótko używany do policzenia unikalnych odwiedzających i oszacowania kraju; nie jest zapisywany w danych analitycznych. Bez plików cookie.',
                  'Aby widzieć, które strony pomagają ludziom i którymi planami się interesują.',
                ],
                [
                  'Formularz Incident Kit',
                  'E-mail (wymagany). Opcjonalnie: firma, rodzaj produktu, które przepisy mają zastosowanie.',
                  'Aby wysłać Ci kit po potwierdzeniu e-maila.',
                ],
                [
                  'Formularz wczesnego dostępu',
                  'E-mail (wymagany). Opcjonalne odpowiedzi: czego potrzebujesz najpierw, co dostarczasz, wielkość firmy, Twoje obecne narzędzie do dyżurów, czy sprzedajesz w UE, jakich kanałów alertów potrzebujesz, wybrany plan, dowolna notatka.',
                  'Aby zaprosić Cię, gdy produkt będzie gotowy, i dowiedzieć się, co zbudować najpierw.',
                ],
                [
                  'Sprawdzenie CRA (czat w rogu strony)',
                  'E-mail (wymagany), wpisany opis produktu i odpowiedzi, odpowiedź udzielona przez AI, problem wskazany na końcu, strona, na której z niego korzystałeś, i czas.',
                  'Aby odpowiedzieć, czy CRA dotyczy Twojego produktu, odezwać się e-mailem po potwierdzeniu adresu i zdecydować, co zbudować dalej.',
                ],
                [
                  'Przewodnik AI (pole u góry strony głównej)',
                  'Opisany przez Ciebie problem, odpowiedź udzielona przez AI, strona, na której z niego korzystałeś, i czas. Tylko jeśli prosisz o pełną analizę: Twój e-mail i wysyłana analiza.',
                  'Aby odpowiedzieć, czy Within24 pasuje do Twojego problemu, wysłać Ci e-mailem pełną analizę, o którą prosisz, i zdecydować, co zbudować dalej.',
                ],
                [
                  'Czat pomocy w aplikacji internetowej (app.within24.app)',
                  'E-mail Twojego konta i Twój workspace, wiadomości, które piszesz, dołączone obrazy (zapisane ponownie bez lokalizacji, danych aparatu i innych szczegółów pliku), odpowiedzi AI, strona, z której piszesz, język aplikacji i czas.',
                  'Aby odpowiedzieć na Twoje pytanie, aby zespół mógł naprawić to, co zgłaszasz, i odpowiedzieć e-mailem, oraz aby zdecydować, co zbudować dalej.',
                ],
                [
                  'Oba formularze',
                  'Czas zapisu, użyty formularz i strona, z której przyszedłeś, wersja tekstu zgody oraz to, czy prosiłeś o okazjonalne nowości.',
                  'Aby udokumentować Twoją zgodę i szanować Twoje wybory.',
                ],
                [
                  'Kontrola botów (Cloudflare Turnstile)',
                  'Twój adres IP, odcisk TLS i identyfikator przeglądarki (user agent), przetwarzane przez Cloudflare.',
                  'Aby chronić formularze przed spamem.',
                ],
                [
                  'Hosting (Cloudflare Pages)',
                  'Dane techniczne każdego żądania, takie jak adres IP i przeglądarka, przetwarzane przez Cloudflare.',
                  'Aby dostarczać serwis i chronić go przed atakami.',
                ],
              ],
            },
          },
          { p: 'Nie sprzedajemy Twoich danych i nie używamy ich do reklamy.' },
        ],
      },
      {
        heading: 'Podstawy prawne',
        blocks: [
          {
            ul: [
              'Formularze i e-maile: Twoja zgoda (art. 6 ust. 1 lit. a) RODO), wyrażona, gdy wysyłasz formularz i potwierdzasz e-mail. Możesz ją wycofać w każdej chwili linkiem do rezygnacji w każdym e-mailu albo pisząc do nas.',
              'Sprawdzenie CRA: przetwarzamy to, co wpisujesz, aby udzielić odpowiedzi, o którą prosisz (art. 6 ust. 1 lit. b) RODO). E-maile po sprawdzeniu opierają się na Twojej zgodzie, wyrażonej przy potwierdzeniu adresu.',
              'Przewodnik AI: przetwarzamy to, co wpisujesz, oraz Twój e-mail, gdy prosisz o pełną analizę, aby udzielić odpowiedzi, o którą prosisz (art. 6 ust. 1 lit. b) RODO). E-maile wczesnego dostępu opierają się na Twojej zgodzie, wyrażonej przy potwierdzeniu adresu.',
              'Czat pomocy w aplikacji internetowej: przetwarzamy Twoje wiadomości i obrazy, aby Ci odpowiedzieć i wspierać Cię w usłudze, z której korzystasz (art. 6 ust. 1 lit. b) RODO).',
              'Analityka, kontrola botów i hosting: nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f) RODO) w prowadzeniu bezpiecznego serwisu i w wiedzy, które strony są przydatne. Wybraliśmy analitykę bez plików cookie, aby jak najmniej ingerować w Twoją prywatność.',
            ],
          },
        ],
      },
      {
        heading: 'Dostawcy usług',
        blocks: [
          {
            p: 'Ci dostawcy przetwarzają dane w naszym imieniu. Nikt inny ich nie otrzymuje.',
          },
          {
            table: {
              head: ['Dostawca', 'Co robi', 'Gdzie', 'Jego warunki'],
              rows: [
                [
                  'Brevo SAS',
                  'Przechowuje zapisy z formularzy i wysyła e-maile z potwierdzeniem, kitem i analizą',
                  'Spółka we Francji; może przekazywać dane do USA i Indii',
                  '[Polityka prywatności Brevo](https://www.brevo.com/legal/privacypolicy/)',
                ],
                [
                  'Cloudflare, Inc.',
                  'Hostuje serwis (Pages) i prowadzi kontrolę botów (Turnstile)',
                  'Sieć globalna; spółka w USA',
                  '[Polityka prywatności Cloudflare](https://www.cloudflare.com/privacypolicy/), [Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/)',
                ],
                [
                  'Anthropic, PBC',
                  'Pisze odpowiedzi sprawdzenia CRA, przewodnika AI i czatu pomocy w aplikacji internetowej na podstawie tego, co wpisujesz, i dołączonych obrazów (model AI)',
                  'Spółka w USA',
                  '[Polityka prywatności Anthropic](https://www.anthropic.com/legal/privacy)',
                ],
                [
                  'Hetzner Online GmbH',
                  'Hostuje nasz serwer API oraz bazę danych sprawdzenia CRA, przewodnika AI i czatu pomocy',
                  'Spółka w Niemczech; nasz serwer jest w UE (w Niemczech lub Finlandii)',
                  '[Polityka prywatności Hetzner](https://www.hetzner.com/legal/privacy-policy/)',
                ],
                [
                  'Umami Software, Inc.',
                  'Analityka bez plików cookie',
                  'UE i USA',
                  '[Polityka prywatności Umami](https://umami.is/privacy)',
                ],
              ],
            },
          },
        ],
      },
      {
        heading: 'Przekazywanie danych poza UE',
        blocks: [
          {
            p: 'Niektórzy dostawcy przetwarzają dane w USA lub w innych miejscach poza UE. Cloudflare opiera się na ramach ochrony danych UE–USA (Data Privacy Framework), a zapasowo na standardowych klauzulach umownych Komisji Europejskiej. W przypadku Brevo, Anthropic i Umami zabezpieczenia opisują ich polityki prywatności i warunki przetwarzania danych.',
          },
        ],
      },
      {
        heading: 'Jak długo przechowujemy dane',
        blocks: [
          {
            ul: [
              'Potwierdzone zapisy: do czasu rezygnacji lub prośby o usunięcie. Gdy lista wczesnego dostępu zostanie zamknięta, usuwamy odpowiedzi, których już nie potrzebujemy.',
              'Sprawdzenie CRA: to, co wpisujesz, odpowiedzi i Twój e-mail usuwamy 24 miesiące po ostatnim użyciu sprawdzenia lub wcześniej na Twoją prośbę.',
              'Przewodnik AI: to, co wpisujesz, i odpowiedzi usuwamy 24 miesiące po zadaniu pytania lub wcześniej na Twoją prośbę.',
              'Czat pomocy: Twoje wiadomości, odpowiedzi i dołączone obrazy usuwamy 24 miesiące po ostatniej wiadomości w rozmowie lub wcześniej na Twoją prośbę. Obrazy, których nie wyślesz, usuwamy po jednym dniu.',
              'Analityka: przechowywana jako zbiorcze statystyki.',
              'Dane hostingu i kontroli botów: przechowywane przez Cloudflare przez okresy określone w jego warunkach.',
            ],
          },
        ],
      },
      {
        heading: 'Twoje prawa',
        blocks: [
          {
            p: 'Możesz poprosić nas o pokazanie, sprostowanie, usunięcie lub wyeksportowanie danych, które o Tobie mamy. Możesz też sprzeciwić się przetwarzaniu opartemu na naszym prawnie uzasadnionym interesie albo w każdej chwili wycofać zgodę. Wycofanie zgody nie wpływa na przetwarzanie, które odbyło się wcześniej.',
          },
          {
            p: 'Napisz na [hello@within24.app](mailto:hello@within24.app); odpowiadamy w ciągu miesiąca. Możesz też złożyć skargę do organu ochrony danych, w szczególności w państwie UE, w którym mieszkasz lub pracujesz, albo tam, gdzie Twoim zdaniem doszło do problemu (art. 77 RODO).',
          },
        ],
      },
      {
        heading: 'Pliki cookie',
        blocks: [
          {
            p: 'Within24 nie ustawia plików cookie i niczego nie zapisuje w pamięci lokalnej (local storage) Twojej przeglądarki. Narzędzie analityczne działa bez plików cookie, więc nie ma banera cookie. Gdy ładuje się formularz, kontrola botów Cloudflare może ustawić niezbędne pliki cookie bezpieczeństwa, opisane na [liście plików cookie Cloudflare](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/).',
          },
        ],
      },
      {
        heading: 'Zmiany tej polityki',
        blocks: [
          {
            p: 'Gdy zmieniamy sposób przetwarzania danych, aktualizujemy tę stronę i jej datę. Jeśli zmiana dotyczy tego, na co się zgodziłeś, napiszemy do Ciebie, zanim zacznie obowiązywać.',
          },
        ],
      },
    ] as PrivacySection[],
  },
  legal: {
    title: 'Nota prawna',
    description: 'Kto prowadzi ten serwis i jak się z nim skontaktować.',
    operator: 'Operator',
    companyGeneral: 'Prywatna spółka zarejestrowana w Unii Europejskiej',
    countryGeneral: 'Unia Europejska',
    country: 'Kraj',
    email: 'E-mail',
    emailPending: 'podamy po skonfigurowaniu domeny',
    translationNote:
      'To jest tłumaczenie. Jeśli różni się od wersji angielskiej, obowiązuje wersja angielska.',
  },
  calculator: {
    deadlineName: '{stage} {regime}',
    formHeading: 'Twój incydent',
    resultHeading: 'Terminy zgłoszeń',
    events: {
      legend: 'Co się stało? Zaznacz każde zdarzenie, które ma zastosowanie',
      hint: 'Sam sprawdź te pola, zanim zaufasz wynikowi.',
      labels: {
        'cra.actively_exploited_vulnerability':
          'CRA: aktywnie wykorzystywana podatność w Twoim produkcie',
        'cra.severe_incident':
          'CRA: poważny incydent mający wpływ na bezpieczeństwo Twojego produktu',
        'nis2.significant_incident': 'NIS2: poważny incydent',
        'gdpr.personal_data_breach': 'RODO: naruszenie ochrony danych osobowych',
      },
    },
    helper: {
      summary: 'Nie wiesz, które pola zaznaczyć? Odpowiedz na trzy pytania',
      cra: {
        legend:
          'Czy jesteś producentem produktu z elementami cyfrowymi sprzedawanego w UE i czy ten produkt jest dotknięty?',
        no: 'Nie',
        vulnerability: 'Tak: podatność w nim jest aktywnie wykorzystywana',
        incident: 'Tak: poważny incydent ma wpływ na jego bezpieczeństwo',
        both: 'Tak: jedno i drugie',
      },
      nis2: {
        legend:
          'Czy Twoja organizacja jest podmiotem kluczowym lub ważnym w rozumieniu NIS2 i czy to poważny incydent?',
        yes: 'Tak',
        no: 'Nie',
      },
      gdpr: {
        legend: 'Czy incydent obejmuje naruszenie ochrony danych osobowych, za które odpowiadasz?',
        yes: 'Tak',
        no: 'Nie',
      },
      apply: 'Zaznacz pasujące pola',
      applied: 'Pola zaznaczone na podstawie odpowiedzi. Sprawdź je, zanim zaufasz wynikowi.',
      appliedNone: 'Twoje odpowiedzi nie pasują do żadnego pola. Sprawdź je sam.',
    },
    aware: {
      label: 'Moment powzięcia wiadomości',
      readAs: 'Odczytano jako {utc}.',
      gap: 'Ten czas lokalny nie istnieje (zegary przestawiono do przodu). Użyto wcześniejszego odczytu: {utc}.',
      ambiguous:
        'Ten czas lokalny występuje dwa razy (zegary cofnięto). Użyto wcześniejszego: {utc}.',
      required: 'Podaj, kiedy dowiedziałeś się o zdarzeniu.',
      useNow: 'Ustaw bieżący czas',
    },
    invalidDate: 'Podaj pełną datę i godzinę.',
    country: {
      label: 'Państwo zgłoszenia',
      hint: 'Terminy liczone w miesiącach używają czasu tego państwa ({zone}).',
    },
    countryNames: {
      AT: 'Austria',
      BE: 'Belgia',
      BG: 'Bułgaria',
      HR: 'Chorwacja',
      CY: 'Cypr',
      CZ: 'Czechy',
      DK: 'Dania',
      EE: 'Estonia',
      FI: 'Finlandia',
      FR: 'Francja',
      DE: 'Niemcy',
      GR: 'Grecja',
      HU: 'Węgry',
      IE: 'Irlandia',
      IT: 'Włochy',
      LV: 'Łotwa',
      LT: 'Litwa',
      LU: 'Luksemburg',
      MT: 'Malta',
      NL: 'Niderlandy',
      PL: 'Polska',
      PT: 'Portugalia',
      RO: 'Rumunia',
      SK: 'Słowacja',
      SI: 'Słowenia',
      ES: 'Hiszpania',
      SE: 'Szwecja',
    } as Record<string, string>,
    displayZone: {
      label: 'Pokaż godziny w strefie',
      hint: 'Zmienia tylko sposób wyświetlania godzin, nie terminy.',
    },
    anchors: {
      fix_available_at: {
        label: 'Pierwsza poprawka lub środek łagodzący dostępne od (opcjonalnie)',
        hint: 'Do sprawozdania końcowego z CRA. Zostaw puste, jeśli jeszcze ich nie ma.',
      },
      notification_submitted_at: {
        label: 'Powiadomienie złożone (opcjonalnie)',
        hint: 'Do sprawozdania końcowego. Zostaw puste, jeśli jeszcze go nie złożyłeś.',
      },
    },
    fixBeforeAware:
      'Poprawka jest wcześniejsza niż chwila, w której się dowiedziałeś. Sprawdź obie godziny: tego przypadku reguły jeszcze nie obejmują.',
    result: {
      exampleCaption: 'Przykład: dowiedziano się {time}.',
      liveCaption: 'Dowiedziano się {time}.',
      summary: '{country} (czas organu) · godziny w strefie {zone}',
      change: 'Zmień',
      unverified:
        'Reguły nie zostały jeszcze sprawdzone z tekstem urzędowym. Sprawdź każdy termin z jego źródłem, zanim na nim polegasz.',
      noEvents: 'Zaznacz co najmniej jedno zdarzenie, aby zobaczyć terminy.',
      noAware: 'Podaj, kiedy się dowiedziałeś, aby zobaczyć terminy.',
      columns: {
        deadline: 'Termin',
        due: 'Do kiedy',
        left: 'Pozostało',
        calendar: 'Kalendarz',
      },
      dueAuthority: 'Czas organu ({country}): {time}',
      dueUtc: 'UTC: {time}',
      source: 'Źródło',
      overdueBy: 'Po terminie o {time}',
      dueIn: 'Termin za {time}',
      pending: '—',
      waiting: {
        aware_at: 'Czeka na chwilę, w której się dowiedziałeś.',
        fix_available_at:
          'Czeka na poprawkę lub środek łagodzący. Podaj, kiedy pierwszy był dostępny, aby obliczyć ten termin.',
        notification_submitted_at:
          'Czeka na powiadomienie. Podaj, kiedy je złożyłeś, aby obliczyć ten termin.',
      },
      downloadOne: 'Pobierz .ics',
      downloadOneLabel: 'Pobierz termin „{deadline}” jako plik kalendarza (.ics)',
      downloadAll: 'Pobierz wszystkie terminy (.ics)',
      copyLink: 'Kopiuj link do tego obliczenia',
      copied: 'Link skopiowany.',
      copyFallback: 'Skopiuj ten link',
      nowOverdue: 'Termin „{deadline}” właśnie minął.',
      noscript: 'Kalkulator wymaga JavaScriptu. Tabela pokazuje przykład.',
      linkInvalid: 'Niektórych wartości z linku nie udało się odczytać i zostały pominięte.',
      linkOtherRules:
        'Ten link powstał z regułami {old}. Obliczono go z bieżącymi regułami {current}.',
      errors: {
        unsupported_event:
          'Jedno z wybranych zdarzeń nie ma reguł w tym akcie. Odznacz je, aby zobaczyć terminy.',
        unknown_reporting_timezone: 'Ta przeglądarka nie zna strefy czasowej państwa zgłoszenia.',
        notification_submitted_before_aware_at:
          'Powiadomienie jest wcześniejsze niż chwila, w której się dowiedziałeś. Sprawdź obie godziny.',
      },
    },
    timeline: {
      aware: 'Dowiedziano się',
      now: 'Teraz',
      later: 'później',
      tick: '+{hours} h',
      lanes: {
        'cra.actively_exploited_vulnerability': 'CRA · podatność',
        'cra.severe_incident': 'CRA · poważny incydent',
        'nis2.significant_incident': 'NIS2',
        'gdpr.personal_data_breach': 'RODO',
      },
      stages: {
        early_warning: 'Wczesne ostrzeżenie',
        notification: 'Powiadomienie',
        final_report: 'Sprawozdanie końcowe',
      },
      waiting: {
        aware_at: 'czeka',
        fix_available_at: 'czeka: poprawka',
        notification_submitted_at: 'czeka: powiadomienie',
      },
    },
    stages: {
      early_warning: 'wczesne ostrzeżenie',
      notification: 'powiadomienie',
      final_report: 'sprawozdanie końcowe',
    },
    eventTypes: {
      actively_exploited_vulnerability: 'Aktywnie wykorzystywana podatność',
      severe_incident: 'Poważny incydent',
      significant_incident: 'Poważny incydent',
      personal_data_breach: 'Naruszenie ochrony danych osobowych',
    },
    ics: {
      summary: 'Termin: {deadline}',
      due: 'Do {reporting} (czas organu), {utc}.',
      source: 'Źródło: {url}',
      rules: 'Reguły {version}.',
      disclaimer: 'Reguły nie zostały jeszcze sprawdzone z tekstem urzędowym.',
    },
  },
};
