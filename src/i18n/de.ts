// German UI strings: a full translation of en.ts. Typed as UiStrings, so a key missing here
// fails the build. Legal facts are the same as in English (articles, dates, numbers); only the
// wording is translated. Links in hrefs stay English paths: non-English pages get them rewritten
// to /de/… at build time (src/middleware.ts).
import type { HomeModule, PrivacySection, UiStrings } from './en';

export const de: UiStrings = {
  skipToContent: 'Zum Inhalt springen',
  language: {
    short: 'DE',
    name: 'Deutsch',
    switcherLabel: 'Sprache',
    hint: {
      text: 'Diese Seite gibt es auch auf Deutsch.',
      link: 'Auf Deutsch lesen',
      close: 'Schließen',
    },
  },
  nav: {
    label: 'Hauptnavigation',
    home: 'Startseite',
    oncall: 'On-Call',
    cra: 'Der CRA',
    calculator: 'Fristenrechner',
    guides: 'Leitfäden',
    kit: 'Incident Kit',
    pricing: 'Preise',
    earlyAccess: 'Früher Zugang',
  },
  footer: {
    rulesVersion: 'Regeln {version}',
    rulesUnverified: 'noch nicht anhand der offiziellen Texte geprüft',
    rulesVerified: 'geprüft am {date}',
    links: 'Rechtliches',
    privacy: 'Datenschutz',
    legal: 'Impressum',
    craHeading: 'Der CRA',
    craLinks: {
      asks: 'Was der CRA verlangt',
      dates: 'Wichtige Termine',
      reports: 'Drei Meldungen',
      scope: 'Gilt er für Sie?',
    },
    oncallHeading: 'On-Call',
    oncallLinks: {
      overview: 'So funktioniert On-Call',
      rotas: 'Dienstpläne',
      support: 'Vom Support zum Entwickler',
      opsgenie: 'Opsgenie-Alternative',
    },
    toolsHeading: 'Werkzeuge',
    faq: 'FAQ',
  },
  breadcrumbs: { label: 'Brotkrumen-Navigation', home: 'Startseite', guides: 'Leitfäden' },
  guides: {
    title: 'Leitfäden zu EU-Meldepflichten und On-Call',
    description:
      'Verständliche Leitfäden zu den Meldefristen nach CRA, NIS2 und DSGVO und zum Bereitschaftsdienst in kleinen Teams. Jeder zitiert die offiziellen Texte.',
    intro:
      'Was das Gesetz verlangt, wenn etwas schiefgeht, und wie ein kleines Team um 3 Uhr nachts antwortbereit bleibt. Jede rechtliche Aussage verlinkt den Artikel, aus dem sie stammt.',
    topics: { law: 'Meldepflichten nach EU-Recht', 'on-call': 'On-Call organisieren' },
    faqLink: 'Kurze Antworten: häufige Fragen',
  },
  guide: {
    lastVerified: 'Zuletzt geprüft',
    notVerified: 'Noch nicht anhand der offiziellen Texte geprüft',
    sources: 'Quellen',
    related: 'Weitere Leitfäden',
    calculatorCta: 'Ihre Meldefristen berechnen',
    published: 'Veröffentlicht',
    updated: 'Aktualisiert',
    readInThisLanguage: 'Diesen Leitfaden auf Deutsch lesen',
  },
  deadlinesPage: {
    title: 'Rechner für EU-Meldefristen bei Vorfällen',
    description:
      'Berechnen Sie die Meldefristen nach CRA, NIS2 und DSGVO in Ihrer Zeitzone. Kostenlos, ohne Anmeldung.',
    appName: '{site} Fristenrechner',
    lead: 'Geben Sie ein, wann Sie von einer aktiv ausgenutzten Schwachstelle oder einem Vorfall Kenntnis erlangt haben. Sie erhalten jede Meldefrist nach Cyber Resilience Act (CRA), NIS2 und DSGVO in Ihrer Zeitzone und in der der Behörde.',
  },
  notFound: {
    title: 'Seite nicht gefunden',
    body: 'Diese Seite gibt es nicht, oder sie ist umgezogen.',
    back: 'Zum Fristenrechner',
  },
  bridge: {
    heading: 'Fristen berechnet. Wer wacht um 3 Uhr nachts auf?',
    intro: 'Within24 lässt diese Uhren für Ihr Team laufen.',
    steps: [
      'Sie erfassen den Vorfall einmal. Jede gesetzliche Frist, die gilt, beginnt zu laufen.',
      'Vor jeder Frist wird die Person in Bereitschaft alarmiert, bis jemand bestätigt.',
      'Vor jeder Frist liegt ein Entwurf der Meldung bereit.',
    ],
    link: 'Pläne und frühen Zugang ansehen',
  },
  form: {
    email: 'E-Mail',
    required: '(Pflichtfeld)',
    optional: '(optional)',
    company: 'Unternehmen',
    productType: 'Produktart',
    productTypeNone: 'Bitte wählen…',
    productTypes: {
      mobile: 'Mobile App',
      desktop: 'Desktop-Software',
      self_hosted: 'Selbst gehostete oder On-Prem-Software',
      iot: 'Vernetztes Gerät oder IoT',
      sdk: 'SDK oder Bibliothek',
      saas: 'Nur SaaS',
      other: 'Sonstiges',
    },
    productTypeQuestion: 'Was liefern Sie aus?',
    interest: 'Was brauchen Sie zuerst?',
    interests: { oncall: 'On-Call', cra: 'CRA-Meldungen', both: 'Beides' },
    companySize: 'Unternehmensgröße',
    companySizes: {
      '1-9': '1–9',
      '10-49': '10–49',
      '50-249': '50–249',
      '250+': '250+',
    },
    oncallTool: 'On-Call heute',
    oncallTools: {
      pagerduty: 'PagerDuty',
      opsgenie: 'Opsgenie',
      grafana_oncall: 'Grafana OnCall',
      other_tool: 'Ein anderes Werkzeug',
      phone_chat: 'Telefon oder Chat',
      nobody: 'Niemand hat Bereitschaft',
    },
    sellsEu: 'Verkaufen Sie in der EU?',
    sellsEuOptions: { yes: 'Ja', no: 'Nein', unsure: 'Weiß nicht' },
    channels: 'Welche Kanäle brauchen Sie?',
    channelsHint: '(optional, beliebig viele)',
    channelLabels: {
      phone_call: 'Anruf',
      sms: 'SMS',
      telegram: 'Telegram',
      email: 'E-Mail',
      app_push: 'App-Push',
    },
    note: 'Noch etwas?',
    noteHint: 'Zum Beispiel, was Sie an Ihrem On-Call heute am meisten stört. Bis zu 300 Zeichen.',
    laws: 'Geltende Gesetze',
    lawLabels: { CRA: 'CRA', NIS2: 'NIS2', GDPR: 'DSGVO', unsure: 'Weiß nicht' },
    honeypot: 'Dieses Feld leer lassen',
    sending: 'Wird gesendet…',
    errors: {
      summary: 'Bitte prüfen Sie die markierten Felder.',
      required: 'Geben Sie Ihre E-Mail-Adresse ein.',
      invalid: 'Geben Sie eine gültige E-Mail-Adresse ein, etwa name@firma.de.',
      too_long: 'Das ist zu lang.',
      verification:
        'Wir konnten nicht bestätigen, dass diese Anfrage von einem Menschen kommt. Bitte versuchen Sie es noch einmal.',
      unavailable:
        'Die Anmeldung ist gerade nicht möglich. Bitte versuchen Sie es später noch einmal.',
      network:
        'Das Formular konnte nicht gesendet werden. Prüfen Sie Ihre Verbindung und versuchen Sie es noch einmal.',
    },
    privacyNote: 'Wir nutzen Ihre Angaben nur für den Zweck dieses Formulars. Siehe {link}.',
    privacyLink: 'Datenschutzerklärung',
  },
  kit: {
    title: 'Incident Kit für CRA-Meldungen',
    description:
      'Vorlagen für die drei CRA-Meldungen, eine Checkliste für die ENISA-Meldeplattform und ein Ablaufplan für die erste Stunde. Kostenlos per E-Mail.',
    intro:
      'Vorlagen und Checklisten für die ersten Stunden eines meldepflichtigen Vorfalls. Kostenlos, per E-Mail.',
    insideHeading: 'Was drin ist',
    items: [
      {
        name: 'Meldungsvorlagen',
        text: 'Frühwarnung, Meldung und Abschlussbericht.',
      },
      {
        name: 'Checkliste zur Vorbereitung',
        text: 'Für die ENISA Single Reporting Platform (SRP): was Sie vor der Meldung bereithalten sollten.',
      },
      {
        name: 'Ablaufplan für die ersten 60 Minuten',
        text: 'Wer in der ersten Stunde nach Kenntniserlangung was tut.',
      },
    ],
    formHeading: 'Kit anfordern',
    news: 'Schicken Sie mir auch Produktneuigkeiten (etwa einmal im Monat). Abmeldung jederzeit möglich.',
    submit: 'Kit zusenden',
    nextHeading: 'Wie es weitergeht',
    next: [
      'Bestätigen Sie Ihre E-Mail-Adresse über den Link, den wir Ihnen senden.',
      'Das Kit kommt per E-Mail.',
      'Wir geben Ihre Adresse nicht weiter.',
    ],
    success:
      'Fast geschafft. Sehen Sie in Ihr Postfach und bestätigen Sie Ihre E-Mail-Adresse, um das Kit zu erhalten.',
    checkEmail: {
      title: 'Sehen Sie in Ihr Postfach',
      description: 'Bestätigen Sie Ihre E-Mail-Adresse, um das Incident Kit zu erhalten.',
      body: 'Wir haben Ihnen einen Bestätigungslink geschickt. Öffnen Sie ihn, um das Incident Kit per E-Mail zu erhalten.',
      hint: 'Nach ein paar Minuten noch nichts da? Sehen Sie im Spam-Ordner nach.',
      back: 'Zurück zum Fristenrechner',
    },
    confirmed: {
      title: 'E-Mail bestätigt',
      description: 'Ihre E-Mail-Adresse ist bestätigt. Das Incident Kit ist unterwegs.',
      body: 'Vielen Dank. Das Incident Kit ist auf dem Weg in Ihr Postfach.',
      back: 'Zurück zum Fristenrechner',
    },
  },
  earlyAccess: {
    title: 'Frühen Zugang zu Within24 sichern',
    description:
      'Frühen Zugang zu Within24: KI-Entwürfe für CRA-Meldungen und gesetzliche Fristen für kleine Softwareteams. Es wird nichts berechnet.',
    plansLink: 'Pläne vergleichen',
  },
  pricing: {
    title: 'Preise und früher Zugang',
    description:
      'Pläne für Teams, die Vorfälle nach CRA, NIS2 und DSGVO fristgerecht melden müssen. Früher Zugang: Es wird nichts berechnet.',
    intro:
      'Within24 ist im frühen Zugang. Wählen Sie den passenden Plan und hinterlassen Sie Ihre E-Mail: Wir melden uns vor dem Start, und Sie entscheiden dann, ob Sie kaufen.',
    perMonth: '/ Monat',
    noPayment: 'Früher Zugang. Es wird nichts berechnet.',
    choose: '{plan} wählen',
    useCalculator: 'Rechner nutzen',
    perTeam:
      'Preise gelten pro Team, nicht pro Person: Starter deckt bis zu {people} Personen in Bereitschaft für insgesamt {price} € im Monat ab.',
    priceLock: 'Teams aus dem frühen Zugang behalten diesen Preis 12 Monate nach dem Start.',
    consultant: 'Berater mit mehreren Kunden? Sagen Sie es uns im Formular.',
    pagerDuty:
      'Sie nutzen schon PagerDuty oder Opsgenie? Starter funktioniert damit: Senden Sie Ihre Alarme per Webhook.',
    oncallOnly:
      'Sie brauchen nur On-Call? Jeder Plan funktioniert ohne den CRA-Teil: Gesetzliche Fristen starten erst, wenn Sie einen Vorfall als meldepflichtig markieren.',
    recommended: 'Empfohlen',
    plans: {
      free: {
        name: 'Free',
        description: 'Werkzeuge, um herauszufinden, was für Sie gilt.',
        features: ['Fristenrechner', 'Leitfäden'],
      },
      starter: {
        name: 'Starter',
        description: 'Für ein kleines Produktteam.',
        features: [
          'Bis zu 5 Personen in Bereitschaft',
          '1 Produkt',
          'Alarm-Webhooks',
          'Eskalation per Telegram und E-Mail',
          'Import aus Opsgenie',
          'Fristen nach CRA, NIS2 und DSGVO',
          'KI-Entwürfe jeder Meldung',
        ],
      },
      team: {
        name: 'Team',
        description: 'Für Teams mit Support und mehreren Produkten.',
        features: [
          'Bis zu 20 Personen in Bereitschaft',
          'Unbegrenzt viele Produkte',
          'Anrufe',
          'KI-Triage jedes Alarms',
          'Knopf „Entwickler anrufen“ für den Support',
          'Audit-Export',
        ],
      },
    },
    formHeading: 'Frühen Zugang sichern',
    formIntro:
      'Wir schreiben Ihnen, sobald Ihr Plan bereit ist. Ein paar schnelle Klicks, damit wir zuerst das Richtige bauen. Es wird nichts berechnet.',
    plan: 'Plan',
    planNone: 'Noch unklar',
    submit: 'Frühen Zugang sichern',
    success:
      'Bitte bestätigen Sie die E-Mail in Ihrem Postfach. Wir melden uns vor dem Start; Sie entscheiden dann, ob Sie kaufen.',
    thanks: {
      title: 'Bestätigen Sie Ihre E-Mail für den frühen Zugang',
      description:
        'Bestätigen Sie Ihre E-Mail-Adresse, um auf die Liste für den frühen Zugang zu kommen.',
      body: 'Bitte bestätigen Sie die E-Mail in Ihrem Postfach. Wir melden uns vor dem Start; Sie entscheiden dann, ob Sie kaufen.',
      back: 'Zurück zu den Preisen',
    },
    confirmed: {
      title: 'Sie stehen auf der Liste für den frühen Zugang',
      description: 'Ihre E-Mail-Adresse ist für den frühen Zugang zu Within24 bestätigt.',
      body: 'Vielen Dank. Wir melden uns vor dem Start.',
      back: 'Zurück zum Fristenrechner',
    },
  },
  home: {
    title: 'On-Call und EU-Meldepflichten für kleine Softwareteams',
    description:
      'Dienstpläne, Eskalation und Anrufe, Import aus Opsgenie, dazu Fristen nach CRA, NIS2 und DSGVO. Fragen Sie unseren KI-Guide, ob Within24 passt.',
    heading: 'On-Call und EU-Meldepflichten für kleine Softwareteams',
    intro:
      'Dienstpläne, Eskalation und Anrufe, ein Import aus Opsgenie und Fristen nach CRA, NIS2 und DSGVO mit KI-Entwürfen der Meldungen. Gehostet in der EU.',
    primary: 'Frühen Zugang sichern',
    secondary: 'Ihre Meldefristen berechnen',
    status: 'Früher Zugang: Wir bauen Within24 gerade.',
    // Der KI-Guide im Hero (src/components/fit-check).
    guide: {
      label: 'Beschreiben Sie Ihr Problem. In Sekunden sehen Sie, ob wir es lösen.',
      hint: 'Mit Enter fragen. Umschalt+Enter beginnt eine neue Zeile.',
      examples: [
        'Wir verlassen Opsgenie vor April und brauchen nachts Anrufe',
        'Der Support kann keinen Entwickler wecken',
        'Wir verkaufen ein Gerät in der EU. Was müssen wir nach dem CRA melden?',
        'Ein Alarmsturm weckt drei Leute gleichzeitig',
      ],
      button: 'KI-Guide fragen',
      buttonBusy: 'KI antwortet',
      tryLabel: 'Beispiele:',
      chips: [
        {
          label: 'Weg von Opsgenie',
          text: 'Wir sind 8 Engineers und verlassen Opsgenie vor April. Wir brauchen Dienstpläne, Eskalation und Anrufe.',
        },
        {
          label: 'CRA-Meldungen',
          text: 'Wir verkaufen ein vernetztes Gerät in der EU und müssen Schwachstellen nach dem CRA melden.',
        },
        {
          label: 'Support soll Entwickler erreichen',
          text: 'Unser Support braucht einen Weg, nachts den Entwickler in Bereitschaft anzurufen.',
        },
      ],
      thinking: 'Wir prüfen Ihr Problem an jedem Modul',
      verdicts: {
        fits: 'Passt',
        partly: 'Passt teilweise',
        not_yet: 'Noch nicht',
        not_for_us: 'Machen wir nicht',
        off_topic: 'Nicht unser Thema',
      },
      offTopic:
        'Ich beantworte nur eine Frage: Kann Within24 Ihr Problem lösen? Beschreiben Sie, was Ihr Team braucht, zum Beispiel wie Sie nachts geweckt werden oder welche Meldungen Sie abgeben müssen.',
      statuses: {
        available: 'Verfügbar',
        building: 'In Arbeit',
        next: 'Als Nächstes',
        not_planned: 'Nicht geplant',
        unknown: 'Wir fragen das Team',
      },
      emailLabel: 'Vollständige Analyse per E-Mail',
      emailHint: 'Welcher Tarif passt, was Sie zuerst einrichten und was es noch nicht gibt.',
      emailPlaceholder: 'sie@firma.de',
      emailButton: 'Analyse per E-Mail senden',
      emailSending: 'Wird gesendet…',
      consent:
        'Wir senden die Analyse sofort. Beim ersten Mal bitten wir Sie in einer zweiten E-Mail, Ihren Platz im frühen Zugang zu bestätigen.',
      privacy: 'Datenschutzerklärung',
      sent: {
        heading: 'Sehen Sie in Ihr Postfach.',
        text: 'Die vollständige Analyse ist unterwegs.',
      },
      again: 'Etwas anderes fragen',
      left: 'Sie können bis zu {max} Fragen pro Tag stellen. Heute noch {left}.',
      lastOne: 'Sie können bis zu {max} Fragen pro Tag stellen. Das war die letzte für heute.',
      errors: {
        short: 'Beschreiben Sie Ihr Problem zuerst in ein paar Worten.',
        email: 'Geben Sie eine gültige E-Mail-Adresse ein.',
        network: 'Keine Verbindung. Prüfen Sie Ihr Internet und versuchen Sie es erneut.',
        robot:
          'Wir konnten nicht bestätigen, dass Sie kein Roboter sind. Laden Sie die Seite neu und versuchen Sie es erneut.',
        tooMany: 'Sie können bis zu 5 Fragen pro Tag stellen. Bitte kommen Sie morgen wieder.',
        expired: 'Diese Antwort ist abgelaufen. Bitte fragen Sie erneut.',
        already: 'Diese Analyse haben wir bereits gesendet. Sehen Sie in Ihr Postfach.',
        unavailable:
          'Der KI-Guide ist gerade nicht verfügbar. Bitte versuchen Sie es später erneut.',
      },
    },
    modules: {
      heading: 'Was Within24 macht',
      headingAnswered: 'Was Ihr Problem abdeckt',
      note: 'Jede Karte sagt, ob es heute funktioniert, gebaut wird oder als Nächstes kommt.',
      swipe: 'Wischen, um alle zu sehen',
      fit: 'Passt zu Ihrem Problem',
      items: [
        {
          id: 'oncall',
          title: 'Die richtige Person wecken',
          text: 'Dienstpläne, Eskalation und Anrufe, bis jemand „Ich übernehme“ tippt.',
          tag: 'In der Beta',
          tone: 'ok',
          href: '/on-call/',
          link: 'So funktioniert On-Call',
        },
        {
          id: 'alerts',
          title: 'Ein Problem, ein Vorfall',
          text: 'Alarme aus Grafana, Prometheus oder jedem Webhook, zu einem Vorfall gebündelt.',
          tag: 'In der Beta',
          tone: 'ok',
        },
        {
          id: 'opsgenie',
          title: 'Weg von Opsgenie',
          text: 'Dienstpläne, Eskalationsrichtlinien und Integrationen mitnehmen, bevor Opsgenie schließt.',
          tag: 'In Arbeit',
          tone: 'build',
          href: '/opsgenie-alternative/',
          link: 'Opsgenie-Alternative',
        },
        {
          id: 'report',
          title: 'Rechtzeitig melden',
          text: 'Fristen nach CRA, NIS2 und DSGVO mit KI-Entwürfen der Meldungen. Der Fristenrechner ist schon jetzt kostenlos.',
          tag: 'Kostenlose Tools',
          tone: 'free',
          href: '/deadlines/',
          link: 'Fristen berechnen',
        },
        {
          id: 'customers',
          title: 'Betroffene Kunden informieren',
          text: 'Wer das betroffene Produkt nutzt, eine Statusseite und ein Knopf „Entwickler anrufen“.',
          tag: 'Als Nächstes',
          tone: 'next',
        },
        {
          id: 'team',
          title: 'Faire Bereitschaft',
          text: 'Nacht- und Wochenendstunden für die Lohnabrechnung, dazu Vorfallstatistiken.',
          tag: 'Als Nächstes',
          tone: 'next',
        },
      ] as HomeModule[],
    },
    example: {
      caption:
        'Beispielvorfall: Sam hat 4 Minuten nach dem Alarm übernommen, und die drei CRA-Fristen laufen seit 9 Stunden.',
      badge: 'Beispiel',
      id: 'INC-0412',
      name: 'Aktiv ausgenutzte Schwachstelle',
      status: 'Fristen laufen',
      oncall: {
        label: 'Bereitschaft',
        events: [
          { time: '03:12', text: 'Alarm von Sentry: Exploit-Versuche an der Login-API' },
          { time: '03:13', text: 'Rufe Sam an, diese Woche in Bereitschaft' },
          { time: '03:16', text: 'Sam: „Ich übernehme“' },
        ],
      },
      clocksLabel: 'CRA-Fristen',
      axis: ['Sa 03:12', '+24 Std', '+48 Std', '+72 Std'],
      now: 'Jetzt',
      lanes: {
        earlyWarning: 'Frühwarnung',
        earlyWarningValue: 'noch 14:47:12',
        notification: 'Meldung',
        notificationValue: 'Fällig Di 03:12',
        finalReport: 'Abschlussbericht',
        finalReportValue: 'Wartet auf „Fix verfügbar seit“',
      },
      draft: 'Entwurf der Frühwarnung bereit: 9 Aussagen, 9 Quellen',
    },
    how: {
      heading: 'So funktioniert es',
      steps: [
        {
          name: 'Ein Alarm könnte meldepflichtig sein',
          text: 'Ein Webhook kommt von PagerDuty, Opsgenie, Grafana oder Sentry. Die KI markiert Alarme, die nach CRA, NIS2 oder DSGVO meldepflichtig aussehen.',
        },
        {
          name: 'Die gesetzlichen Fristen starten',
          text: 'Ihr Engineer bestätigt, und die Timer für 24 Stunden, 72 Stunden und den Abschlussbericht laufen ab dem Moment, in dem Sie Kenntnis erlangt haben.',
        },
        {
          name: 'Jemand ist wach und handelt',
          text: 'Anruf, Telegram und E-Mail, eskaliert entlang des Dienstplans, bis jemand „Ich übernehme“ tippt.',
        },
        {
          name: 'Jede Meldung wird entworfen',
          text: 'Vor jeder Frist liegt ein Entwurf aus der Vorfall-Zeitleiste bereit, mit einer Quelle für jede Aussage. Sie bearbeiten ihn und reichen ihn selbst auf der ENISA Single Reporting Platform ein.',
        },
      ],
    },
    pricing: {
      heading: 'Preise',
      intro:
        'Preise für den frühen Zugang. Wählen Sie einen Plan, um auf die Liste zu kommen; es wird nichts berechnet.',
      more: 'Mehr zu den Plänen',
    },
    trust: {
      heading: 'Worauf Sie sich verlassen können',
      items: [
        {
          name: 'Gebaut von einem On-Call-Engineer',
          text: 'Unser Gründer war zwei Jahre lang für eine Kundensupport-Plattform in Bereitschaft. Within24 ist für die Alarme um 3 Uhr nachts aus diesen Jahren gebaut.',
        },
        {
          name: 'Ein Mensch entscheidet immer',
          text: 'Within24 meldet nie selbst an die ENISA und sagt Ihnen nie, dass eine Meldung nicht nötig ist.',
        },
        {
          name: 'Jede Antwort hat eine Quelle',
          text: 'Artikelnummern und Links zu den offiziellen Texten. Wo es keine Quelle gibt, sagen wir, dass es unklar ist.',
        },
        {
          name: 'Ihre Daten bleiben minimal',
          text: 'Keine Tracking-Cookies. Ihre E-Mail speichern wir nur mit Ihrer Einwilligung.',
        },
      ],
      privacy: 'Datenschutzerklärung lesen',
    },
    faq: {
      heading: 'Fragen',
      items: [
        {
          q: 'Reichen Sie die Meldungen für uns bei der ENISA ein?',
          a: 'Nein. Die ENISA Single Reporting Platform hat keine API, und die Entscheidung zu melden bleibt bei einem Menschen. Within24 weckt die richtige Person und bereitet den Text vor.',
        },
        {
          q: 'Welche Daten sieht die KI?',
          a: 'Nur was Sie ihr senden: Alarm-Inhalte und die Vorfall-Zeitleiste. Personenbezogene Daten werden maskiert, bevor sie das Modell erreichen, und die KI entscheidet nie allein.',
        },
        {
          q: 'Wir nutzen schon PagerDuty. Müssen wir wechseln?',
          a: 'Nein. Senden Sie Ihre Alarme per Webhook an Within24. PagerDuty weckt weiter Ihr Team; Within24 ergänzt die gesetzlichen Fristen und die Entwürfe der Meldungen.',
        },
        {
          q: 'Wir verlassen Opsgenie. Können wir Within24 ohne den CRA-Teil nutzen?',
          a: 'Ja. Die gesetzlichen Fristen starten erst, wenn Sie einen Vorfall als meldepflichtig markieren.',
        },
        {
          q: 'Wann kann ich es nutzen?',
          a: 'Wir bauen gerade den Kern und nehmen Teams aus dem frühen Zugang in kleinen Gruppen auf.',
        },
      ],
    },
  },
  faqPage: {
    title: 'CRA-Meldungen und On-Call: häufige Fragen',
    description:
      'Kurze Antworten: für wen der CRA gilt, seine Fristen für 24 Stunden, 72 Stunden und den Abschlussbericht, das Verhältnis zu NIS2 und DSGVO und On-Call.',
    intro:
      'Kurze Antworten, jeweils mit dem Artikel, aus dem sie stammen, und einem Leitfaden, der tiefer geht.',
    verified:
      'Zuletzt geprüft: 27. Oktober 2026, anhand der Texte der Verordnung (EU) 2024/2847, der Richtlinie (EU) 2022/2555 und der Verordnung (EU) 2016/679.',
    more: 'Zum Leitfaden',
    productHeading: 'Über Within24',
    groups: [
      {
        id: 'scope',
        heading: 'Gilt der CRA für mich?',
        items: [
          {
            q: 'Gilt der Cyber Resilience Act für SaaS?',
            a: 'Meist nicht direkt: Erwägungsgrund 12 verweist SaaS, PaaS und IaaS auf NIS2. Ein Cloud-Backend fällt darunter, wenn es die Datenfernverarbeitung eines Produkts ist, das Sie ausliefern, etwa der Server, den Ihre App oder Ihr Gerät zum Funktionieren braucht (Art. 3 Nr. 1, Art. 3 Nr. 2).',
            link: '/guides/cra-saas-scope/',
          },
          {
            q: 'Gilt er für kostenlose oder Open-Source-Software?',
            a: 'Nur für Software, die im Rahmen einer Geschäftstätigkeit bereitgestellt wird (Erwägungsgrund 18). Ein Preis für das Produkt, für Support über die Kosten hinaus oder eine Monetarisierung darüber kann als Geschäftstätigkeit zählen (Erwägungsgrund 15). Verwalter quelloffener Software haben leichtere Pflichten und werden nach dem CRA nicht mit Geldbußen belegt (Art. 24, Art. 64 Abs. 10 Buchst. b).',
          },
          {
            q: 'Wir sitzen nicht in der EU. Gilt er trotzdem?',
            a: 'Ja, wenn Ihr Produkt auf dem EU-Markt bereitgestellt wird (Art. 2 Abs. 1). Sie melden trotzdem über die ENISA Single Reporting Platform, an das CSIRT nach der Reihenfolge in Art. 14 Abs. 7: das Land Ihres Bevollmächtigten, dann Ihres Einführers, dann Ihres Händlers, dann das Land mit den meisten Nutzern.',
          },
          {
            q: 'Gilt die Meldepflicht für Produkte, die vor Dezember 2027 verkauft wurden?',
            a: 'Ja. Die Meldepflicht nach Artikel 14 gilt für alle betroffenen Produkte, auch für solche, die vor dem 11. Dezember 2027 in Verkehr gebracht wurden (Art. 69 Abs. 3).',
          },
          {
            q: 'Wer muss melden: wir oder unser Kunde?',
            a: 'Der Hersteller: wer das Produkt entwickelt oder entwickeln lässt und unter eigenem Namen oder eigener Marke vermarktet (Art. 3 Nr. 13, Art. 14 Abs. 1).',
          },
        ],
      },
      {
        id: 'deadlines',
        heading: 'Fristen und Meldungen',
        items: [
          {
            q: 'Welche Meldefristen setzt der CRA?',
            a: 'Eine Frühwarnung innerhalb von 24 Stunden nach Kenntniserlangung, eine Meldung innerhalb von 72 Stunden, dann ein Abschlussbericht: 14 Tage nach Verfügbarkeit einer Korrektur bei einer Schwachstelle oder einen Monat nach der Meldung bei einem Vorfall (Art. 14 Abs. 2, Art. 14 Abs. 4).',
            link: '/guides/cra-reporting-deadlines/',
          },
          {
            q: 'Wann beginnt die 24-Stunden-Frist?',
            a: 'Wenn Sie Kenntnis von der aktiv ausgenutzten Schwachstelle oder dem schwerwiegenden Vorfall erlangen (Art. 14 Abs. 2 Buchst. a). Die Verordnung definiert den Moment nicht; nehmen Sie also den frühesten, den Sie vertreten können.',
            link: '/guides/cra-24-hour-clock/',
          },
          {
            q: 'Halten Wochenenden oder Feiertage die Frist an?',
            a: 'Nein. Die Fristen von 24 und 72 Stunden werden in Stunden gezählt, und Artikel 14 sieht keine Verlängerung für Nächte, Wochenenden oder Feiertage vor. Die Fristen von 14 Tagen und einem Monat behandeln wir genauso und verlängern sie nie.',
          },
          {
            q: 'Was, wenn unsere Korrektur länger als 14 Tage dauert?',
            a: 'Die 14 Tage für den Abschlussbericht zu einer Schwachstelle beginnen erst, wenn eine Korrektur- oder Abhilfemaßnahme verfügbar ist (Art. 14 Abs. 2 Buchst. c). Bis dahin gibt es kein Datum für den Abschlussbericht, Frühwarnung und Meldung gelten aber weiter.',
          },
          {
            q: 'Ein Forscher hat uns eine Schwachstelle gemeldet. Müssen wir sie melden?',
            a: 'Nicht als aktiv ausgenutzte Schwachstelle, wenn es keinen Hinweis gibt, dass ein böswilliger Akteur sie genutzt hat (Art. 3 Nr. 42, Erwägungsgrund 68). Sie können sie freiwillig melden (Art. 15).',
            link: '/guides/cra-what-to-report/',
          },
          {
            q: 'Kann die Behörde nach der Meldung mehr verlangen?',
            a: 'Ja. Das CSIRT, das Ihre Meldung erhält, kann einen Zwischenbericht mit Statusaktualisierungen anfordern (Art. 14 Abs. 6).',
          },
          {
            q: 'Müssen wir auch unsere Nutzer informieren?',
            a: 'Ja. Nach der Kenntniserlangung informieren Sie die betroffenen Nutzer und, wo angemessen, alle Nutzer, und sagen ihnen, was sie tun können, um die Auswirkungen zu mindern (Art. 14 Abs. 8).',
          },
          {
            q: 'Was passiert, wenn wir zu spät melden?',
            a: 'Verstöße gegen die Pflichten aus Artikel 14 können mit bis zu 15 Mio. EUR oder 2,5 % des weltweiten Jahresumsatzes geahndet werden, je nachdem, welcher Betrag höher ist (Art. 64 Abs. 2). Kleinst- und Kleinunternehmen werden für eine versäumte 24-Stunden-Frühwarnung nicht mit einer Geldbuße belegt (Art. 64 Abs. 10 Buchst. a).',
          },
        ],
      },
      {
        id: 'laws',
        heading: 'CRA, NIS2 und DSGVO zusammen',
        items: [
          {
            q: 'Wie unterscheiden sich CRA-Meldungen von NIS2 und DSGVO?',
            a: 'Jedes Gesetz hat seinen eigenen Auslöser, Empfänger und seine eigene Frist. Der CRA betrifft Ihr Produkt, NIS2 den Dienst Ihrer Organisation, die DSGVO personenbezogene Daten. Ein Vorfall kann unter alle drei fallen.',
            link: '/guides/cra-nis2-gdpr-reporting/',
          },
          {
            q: 'Gilt NIS2 für uns?',
            a: 'NIS2 erfasst Einrichtungen der Sektoren aus ihren Anhängen I und II, darunter Anbieter von Cloud-Computing-Diensten, die mindestens mittelgroß sind (NIS2 Art. 2 Abs. 1). Manche Arten sind unabhängig von der Größe erfasst (Art. 2 Abs. 2). Die Einzelheiten regelt das nationale Recht Ihres Landes.',
          },
          {
            q: 'Kann eine Meldung CRA, NIS2 und DSGVO abdecken?',
            a: 'Nein. Jede geht an einen anderen Empfänger: die CRA-Meldung über die Single Reporting Platform an das CSIRT und die ENISA (CRA Art. 14 Abs. 7), NIS2 an das nationale CSIRT oder die zuständige Behörde (NIS2 Art. 23 Abs. 1), die DSGVO an die Datenschutzaufsichtsbehörde (DSGVO Art. 33 Abs. 1). Schreiben Sie sie aus einer Vorfall-Zeitleiste, damit die Fakten übereinstimmen.',
          },
          {
            q: 'Welche DSGVO-Frist gilt bei einer Datenpanne?',
            a: 'Möglichst binnen 72 Stunden nach Kenntniserlangung, es sei denn, die Verletzung führt voraussichtlich nicht zu einem Risiko für Personen. Eine spätere Meldung muss die Verzögerung begründen (DSGVO Art. 33 Abs. 1).',
          },
        ],
      },
      {
        id: 'on-call',
        heading: 'On-Call organisieren',
        items: [
          {
            q: 'Wie viele Leute brauchen wir für On-Call?',
            a: 'Mit drei Personen hat jede jede dritte Woche Bereitschaft. Das geht, ist aber schwer; ab fünf ist es auf Dauer tragbar. Eine Hauptperson, eine Vertretung, wöchentliche Schichten, Übergabe in der Arbeitszeit.',
            link: '/guides/on-call-rotation-small-team/',
          },
          {
            q: 'Wen wecken wir, wenn die Person in Bereitschaft nicht antwortet?',
            a: 'Schreiben Sie eine Eskalationsrichtlinie, bevor Sie sie brauchen: zum Beispiel die Hauptperson per Anruf nach 5 Minuten, die Vertretung nach 15, die Engineering-Leitung nach 30.',
            link: '/guides/escalation-policy/',
          },
          {
            q: 'Kann unser Support einen Entwickler wecken?',
            a: 'Er sollte einen Knopf oder eine Nummer haben, die immer die Person erreicht, die gerade Bereitschaft hat, und die Erlaubnis, sie zu nutzen. Ein Kunde, der sagt „Ich sehe die Daten von jemand anderem“, kann eine gesetzliche Frist starten.',
            link: '/guides/support-to-developer-escalation/',
          },
        ],
      },
    ],
  },
  oncall: {
    title: 'On-Call für kleine Teams, mit EU-Fristen eingebaut',
    description:
      'Dienstpläne, Eskalation, Anrufe und ein Knopf „Entwickler anrufen“ für den Support. Arbeitet neben PagerDuty oder ersetzt Opsgenie. Früher Zugang.',
    breadcrumb: 'On-Call',
    heading: 'On-Call, der die richtige Person weckt',
    intro:
      'Für Teams mit 3 bis 20 Engineers. Alarme kommen per Webhook, und Within24 ruft die Person in Bereitschaft an und eskaliert entlang des Dienstplans, bis jemand „Ich übernehme“ tippt.',
    status: 'Früher Zugang: Wir bauen Within24 gerade.',
    primary: 'Frühen Zugang sichern',
    sections: [
      {
        id: 'alerts',
        heading: 'Wie ein Alarm einen Menschen erreicht',
        text: 'Ein Webhook kommt von Grafana, Sentry, New Relic, PagerDuty oder Opsgenie. Within24 schickt zuerst Telegram und E-Mail und ruft an, wenn niemand antwortet (Anrufe im Team-Plan). Nach einer festgelegten Zeit geht es zur nächsten Person.',
        links: [
          { label: 'Eskalationsrichtlinie für kleine Teams', href: '/guides/escalation-policy/' },
        ],
      },
      {
        id: 'rotas',
        heading: 'Dienstpläne, die ein kleines Team durchhält',
        text: 'Eine wöchentliche Rotation, eine Vertretung und Tausch, wenn jemand weg ist.',
        links: [
          {
            label: 'On-Call-Rotation für kleine Teams',
            href: '/guides/on-call-rotation-small-team/',
          },
        ],
      },
      {
        id: 'support',
        heading: 'Der Support kann einen Entwickler wecken',
        text: 'Der Support bekommt einen Knopf „Entwickler anrufen“: keine Alarmregeln schreiben, keine Telefonnummern suchen.',
        links: [
          {
            label: 'Wie der Support den Entwickler in Bereitschaft erreicht',
            href: '/guides/support-to-developer-escalation/',
          },
        ],
      },
      {
        id: 'opsgenie',
        heading: 'Weg von Opsgenie',
        text: 'Importieren Sie Ihre Dienstpläne und Eskalationsregeln in jedem bezahlten Plan, betreiben Sie beide Werkzeuge eine Woche parallel und wechseln Sie dann.',
        links: [
          { label: 'Within24 als Opsgenie-Alternative', href: '/opsgenie-alternative/' },
          {
            label: 'Opsgenie Support-Ende: Termine und Migrationsplan',
            href: '/guides/opsgenie-migration/',
          },
        ],
      },
      {
        id: 'legal',
        heading: 'Wenn ein Vorfall auch ein rechtlicher ist',
        text: 'Markieren Sie einen Vorfall als meldepflichtig, und die Fristen nach CRA, NIS2 und DSGVO starten ab dem Moment, in dem Sie Kenntnis erlangt haben. Bis dahin ist ein Alarm einfach ein Alarm.',
        links: [
          { label: 'Was der CRA von Ihnen verlangt', href: '/cra/' },
          { label: 'Ihre Meldefristen berechnen', href: '/deadlines/' },
        ],
      },
    ],
    pricing: {
      heading: 'Preise',
      intro:
        'Preise für den frühen Zugang. Wählen Sie einen Plan, um auf die Liste zu kommen; es wird nichts berechnet.',
    },
    next: {
      heading: 'On-Call, der die gesetzlichen Fristen kennt',
      text: 'Wir melden uns vor dem Start; Sie entscheiden dann, ob Sie kaufen.',
    },
  },
  opsgenieAlt: {
    title: 'Opsgenie-Alternative für kleine Teams',
    description:
      'Opsgenie wird am 5. April 2027 abgeschaltet. Within24 ist On-Call für Teams von 3 bis 20: Dienstpläne, Eskalation, ein Preis pro Team, in der EU gehostet.',
    breadcrumb: 'Opsgenie-Alternative',
    heading: 'Eine Opsgenie-Alternative für kleine Teams',
    intro:
      'Opsgenie wird am 5. April 2027 abgeschaltet. Within24 ist On-Call für Teams von 3 bis 20 Personen: ein wöchentlicher Dienstplan, Eskalation, bis jemand „Ich übernehme“ tippt, und ein Preis für das ganze Team.',
    primary: 'Frühen Zugang sichern',
    status:
      'Früher Zugang: Wir bauen Within24 gerade. Tragen Sie sich ein und sagen Sie uns, über welche Kanäle wir Sie wecken müssen.',
    keep: {
      heading: 'Was Sie von Opsgenie behalten',
      columns: { from: 'In Opsgenie', to: 'In Within24' },
      rows: [
        {
          from: 'Dienstpläne und Rotationen',
          to: 'Ein wöchentlicher Dienstplan, eine Vertretung, Tausch, wenn jemand weg ist',
        },
        {
          from: 'Eskalationsrichtlinien',
          to: 'Stufen mit einer Person, einem Dienstplan oder einem Team und einer Wartezeit dazwischen',
        },
        {
          from: 'Integrationen',
          to: 'Ein Alarm-Webhook für Grafana, Sentry, New Relic und alles, was HTTP senden kann',
        },
        {
          from: 'Benachrichtigungen',
          to: 'Telegram und E-Mail in jedem Plan, Anrufe im Team-Plan',
        },
        {
          from: 'Bestätigen (Acknowledge)',
          to: 'Ein Knopf „Ich übernehme“, der die Eskalation stoppt',
        },
      ],
    },
    sections: [
      {
        id: 'left-out',
        heading: 'Was wir weglassen',
        text: 'Keine mobile App, keine SMS, keine Heartbeats und kein Servicekatalog. Ein kleines Team nutzt das selten. Wenn Sie darauf angewiesen sind, passt Jira Service Management oder ein größeres Werkzeug besser.',
        links: [],
      },
      {
        id: 'price',
        heading: 'Ein Preis für das Team',
        text: 'Starter deckt bis zu 5 Personen in Bereitschaft für insgesamt 29 € im Monat ab. Team deckt bis zu 20 für 99 € ab. Sie zahlen nicht pro Person. Teams aus dem frühen Zugang behalten diesen Preis 12 Monate nach dem Start.',
        links: [{ label: 'Pläne vergleichen', href: '/pricing/' }],
      },
      {
        id: 'move',
        heading: 'Umzug in einer Woche',
        text: 'Importieren Sie Ihre Dienstpläne und Eskalationsregeln, schicken Sie Ihre Alarme eine Woche lang an beide Werkzeuge, testen Sie den Weg um 3 Uhr nachts mit der echten Person in Bereitschaft und schalten Sie Opsgenie dann ab.',
        links: [
          {
            label: 'Opsgenie Support-Ende: Termine und Migrationsplan',
            href: '/guides/opsgenie-migration/',
          },
        ],
      },
      {
        id: 'eu',
        heading: 'In der EU gehostet',
        text: 'Within24 läuft auf Servern in der EU. Alarme, Dienstpläne und Vorfallverlauf bleiben dort.',
        links: [],
      },
      {
        id: 'legal',
        heading: 'Wenn Sie Software in der EU verkaufen',
        text: 'Markieren Sie einen Vorfall als meldepflichtig, und die Fristen nach CRA, NIS2 und DSGVO starten neben der Alarmierung. Bis dahin ist ein Alarm einfach ein Alarm.',
        links: [
          { label: 'Was der CRA von Ihnen verlangt', href: '/cra/' },
          { label: 'Ihre Meldefristen berechnen', href: '/deadlines/' },
        ],
      },
    ],
    form: {
      heading: 'Sagen Sie uns, was Sie wecken muss',
      text: 'Wir schreiben Ihnen, sobald On-Call zum Ausprobieren bereit ist. Es wird nichts berechnet.',
    },
  },
  cra: {
    title: 'Cyber Resilience Act: was und wann melden',
    description:
      'Was der Cyber Resilience Act verlangt, wenn etwas schiefgeht: wer meldet, an wen, die Fristen von 24 und 72 Stunden, der Abschlussbericht und Termine.',
    breadcrumb: 'Der CRA',
    verified:
      'Zuletzt geprüft: 25. Oktober 2026, anhand des am 20. November 2024 im Amtsblatt veröffentlichten Textes.',
    asks: {
      heading: 'Was der Cyber Resilience Act von Ihnen verlangt',
      intro:
        'Der Cyber Resilience Act (Verordnung (EU) 2024/2847) legt Sicherheitsregeln für Hardware und Software fest, die in der EU verkauft werden. Der Großteil betrifft, wie Sie ein Produkt bauen und pflegen. Ein Teil betrifft, was passiert, wenn etwas schiefgeht: Sie melden es, und dabei läuft eine Frist.',
      facts: [
        {
          name: 'Wer',
          text: 'Hersteller von Produkten mit digitalen Elementen, die auf dem EU-Markt bereitgestellt werden.',
          ref: 'Artikel 2 Abs. 1, Artikel 3 Nr. 1 und 13',
        },
        {
          name: 'Was melden',
          text: 'Aktiv ausgenutzte Schwachstellen in Ihrem Produkt und schwerwiegende Vorfälle, die seine Sicherheit beeinträchtigen.',
          ref: 'Artikel 14 Abs. 1 und 3',
        },
        {
          name: 'An wen',
          text: 'Gleichzeitig an das als Koordinator benannte CSIRT und an die ENISA, über die ENISA Single Reporting Platform.',
          ref: 'Artikel 14 Abs. 1 und 7, Artikel 16',
        },
        {
          name: 'Wie schnell',
          text: 'Unverzüglich: eine Frühwarnung innerhalb von 24 Stunden nach Kenntniserlangung, eine Meldung innerhalb von 72 Stunden, dann ein Abschlussbericht.',
          ref: 'Artikel 14 Abs. 2 und 4',
        },
      ],
      datesHeading: 'Wichtige Termine',
      upcoming: 'In {months} Monaten',
      upcomingSoon: 'In weniger als einem Monat',
      dates: [
        {
          date: '2024-12-10',
          label: '10. Dezember 2024',
          done: 'In Kraft',
          text: 'Die Verordnung ist in Kraft getreten.',
          ref: 'Artikel 71 Abs. 1',
        },
        {
          date: '2026-06-11',
          label: '11. Juni 2026',
          done: 'Gilt',
          text: 'Die Regeln zur Notifizierung von Konformitätsbewertungsstellen gelten (Kapitel IV, Artikel 35 bis 51).',
          ref: 'Artikel 71 Abs. 2',
        },
        {
          date: '2026-09-11',
          label: '11. September 2026',
          done: 'Gilt jetzt',
          text: 'Die Meldepflicht beginnt. Artikel 14 gilt ab diesem Tag, auch für Produkte, die vor 2027 in Verkehr gebracht wurden.',
          ref: 'Artikel 71 Abs. 2 und 69 Abs. 3',
        },
        {
          date: '2027-12-11',
          label: '11. Dezember 2027',
          done: 'Gilt',
          text: 'Alles Übrige gilt: grundlegende Anforderungen, Konformitätsbewertung und CE-Kennzeichnung.',
          ref: 'Artikel 71 Abs. 2',
        },
      ],
      link: 'Ihre Meldefristen berechnen',
    },
    reports: {
      heading: 'Drei Meldungen, drei Fristen',
      intro:
        'Artikel 14 legt drei Stufen fest. Within24 führt für jede eine Frist und hat vor ihrem Ablauf einen Entwurf bereit. Sie prüfen jeden Entwurf und reichen ihn selbst auf der ENISA Single Reporting Platform ein.',
      due: 'Fällig',
      covers: 'Was die Meldung enthält',
      within24: 'Was Within24 tut',
      stages: [
        {
          name: 'Frühwarnung',
          due: 'Unverzüglich, spätestens 24 Stunden nach Kenntniserlangung.',
          covers:
            'Dass es passiert ist, und die Mitgliedstaaten, in denen Ihr Produkt bereitgestellt wird. Bei Vorfällen: ob er durch eine rechtswidrige oder böswillige Handlung verursacht zu sein scheint.',
          within24:
            'Startet die Frist, wenn Ihr Engineer den Alarm bestätigt. Ruft die Person in Bereitschaft an, bis jemand antwortet. Entwirft die Frühwarnung aus dem Alarm und den ersten Notizen.',
        },
        {
          name: 'Meldung',
          due: 'Unverzüglich, spätestens 72 Stunden nach Kenntniserlangung.',
          covers:
            'Was bisher bekannt ist, was Sie getan haben, was Nutzer zur Minderung tun können und wie sensibel die Informationen sind.',
          within24:
            'Baut die Vorfall-Zeitleiste auf, während Sie arbeiten: Alarme, Notizen, Statuswechsel. Entwirft die Meldung mit einer Quelle für jede Aussage.',
        },
        {
          name: 'Abschlussbericht',
          due: 'Schwachstelle: 14 Tage, nachdem eine Korrektur oder Abhilfe verfügbar ist. Vorfall: einen Monat nach Abgabe der Meldung.',
          covers:
            'Eine Beschreibung mit Schweregrad und Auswirkungen. Bei einer Schwachstelle: der böswillige Akteur, falls bekannt, und das Sicherheitsupdate. Bei einem Vorfall: die wahrscheinliche Ursache und die Abhilfemaßnahmen.',
          within24:
            'Wartet auf „Fix verfügbar seit“ und startet dann die letzte Frist. Entwirft den Abschlussbericht aus dem geschlossenen Vorfall.',
        },
      ],
      users:
        'Sie müssen auch die betroffenen Nutzer über das Problem informieren und sagen, was sie tun können (Artikel 14 Abs. 8). Within24 entwirft auch diese Nachricht.',
    },
    scope: {
      heading: 'Gilt der CRA für Sie?',
      intro:
        'Das hängt davon ab, was Sie ausliefern, nicht davon, wie groß Sie sind. Nutzen Sie dies als erste Prüfung und lesen Sie Ihren Fall dann im offiziellen Text nach.',
      shipHeading: 'Wenn Sie ausliefern',
      usuallyHeading: 'Meistens',
      items: [
        {
          name: 'Mobile Apps, Desktop- oder selbst gehostete Software',
          text: 'Betroffen, wenn sie sich mit einem Gerät oder Netz verbinden können, was fast alle tun (Artikel 2 Abs. 1).',
        },
        {
          name: 'Vernetzte Geräte und Firmware',
          text: 'Betroffen. Manche Produktkategorien gelten als wichtig oder kritisch (Anhänge III und IV) und brauchen eine strengere Konformitätsbewertung (Artikel 7 und 8).',
        },
        {
          name: 'SDKs und Bibliotheken',
          text: 'Betroffen, wenn Sie sie im Rahmen einer Geschäftstätigkeit bereitstellen, bezahlt oder kostenlos (Artikel 3 Nr. 22).',
        },
        {
          name: 'Nur SaaS',
          text: 'Allein nicht betroffen: Cloud-Dienste fallen stattdessen unter NIS2. Ein Backend ist erfasst, wenn es Datenfernverarbeitung ist, die ein Produkt zum Funktionieren braucht, etwa der Server hinter Ihrer App (Artikel 3 Nr. 2, Erwägungsgrund 12).',
        },
        {
          name: 'Open Source ohne Geschäftstätigkeit',
          text: 'Nicht betroffen (Erwägungsgrund 18). Organisationen, die Open Source für den kommerziellen Einsatz unterstützen, haben als Verwalter quelloffener Software leichtere Pflichten (Artikel 24).',
        },
        {
          name: 'Von außerhalb der EU',
          text: 'Betroffen für Produkte, die auf dem EU-Markt bereitgestellt werden, egal wo Sie sitzen. Artikel 14 Abs. 7 legt fest, an welches CSIRT Sie melden.',
        },
      ],
      link: 'Prüfen, welche Fristen für Ihr Produkt gelten',
    },
    faq: {
      heading: 'Fragen',
      items: [
        {
          q: 'Gilt der Cyber Resilience Act für SaaS?',
          a: 'Meist nicht direkt. Der CRA erfasst Produkte mit digitalen Elementen, und Erwägungsgrund 12 verweist Cloud-Dienste auf NIS2. Ein Cloud-Backend ist erfasst, wenn es Datenfernverarbeitung für ein Produkt ist, das Sie ausliefern, etwa der Server, den eine App oder ein Gerät zum Funktionieren braucht (Artikel 3 Nr. 1 und 2).',
        },
        {
          q: 'Wann beginnt die CRA-Meldepflicht?',
          a: 'Die Meldung aktiv ausgenutzter Schwachstellen und schwerwiegender Vorfälle gilt ab dem 11. September 2026. Die übrigen Anforderungen gelten ab dem 11. Dezember 2027.',
        },
        {
          q: 'Gilt die CRA-Meldepflicht für Produkte, die vor 2027 verkauft wurden?',
          a: 'Ja. Die Meldepflichten gelten ab dem 11. September 2026 für alle Produkte mit digitalen Elementen auf dem Markt, auch für früher in Verkehr gebrachte (Artikel 69 Abs. 3).',
        },
        {
          q: 'Wie unterscheidet sich das von Meldungen nach NIS2 und DSGVO?',
          a: 'Jedes Gesetz hat seinen eigenen Auslöser, seine Behörde und seine Frist. NIS2 erfasst Vorfälle bei wesentlichen und wichtigen Einrichtungen. Die DSGVO erfasst Verletzungen des Schutzes personenbezogener Daten. Ein Vorfall kann unter alle drei fallen, und Within24 führt ihre Fristen nebeneinander.',
        },
      ],
    },
    sourcesHeading: 'Quellen',
    sources: [
      {
        name: 'Verordnung (EU) 2024/2847 (Cyber Resilience Act), EUR-Lex',
        url: 'https://eur-lex.europa.eu/eli/reg/2024/2847/oj',
      },
    ],
    next: {
      heading: 'Ermitteln Sie Ihre eigenen Fristen',
      calculator: 'Ihre Meldefristen berechnen',
      earlyAccess: 'Frühen Zugang sichern',
    },
  },
  formError: {
    invalid: {
      title: 'Bitte prüfen Sie das Formular',
      body: 'Einige Angaben fehlten oder waren ungültig. Gehen Sie zurück und prüfen Sie die E-Mail-Adresse und die übrigen Felder.',
    },
    verification: {
      title: 'Wir konnten die Anfrage nicht prüfen',
      body: 'Die Spam-Prüfung ist fehlgeschlagen. Gehen Sie zurück und senden Sie das Formular noch einmal.',
    },
    unavailable: {
      title: 'Die Anmeldung ist gerade nicht möglich',
      body: 'Bitte versuchen Sie es später noch einmal. Es wurde nichts gespeichert.',
    },
    description: 'Das Formular konnte nicht gesendet werden.',
    backKit: 'Zurück zum Incident Kit',
    backPricing: 'Zurück zu den Preisen',
  },
  craCheck: {
    launcher: 'Gilt der CRA für Sie?',
    launcherOpen: 'CRA-Prüfung öffnen',
    hideLauncher: 'Ausblenden',
    title: 'CRA-Prüfung',
    subtitle: 'KI, Antworten aus dem Gesetzestext',
    close: 'CRA-Prüfung schließen',
    restart: 'Neu beginnen',
    stepOf: 'Schritt {n} von 4',
    stepDone: 'fertig',
    stepsLabel: 'Schritte',
    steps: ['E-Mail', 'Produkt', 'Antwort', 'Ihr Problem'],
    you: 'Sie',
    greeting:
      'Hallo. Ich prüfe, ob der Cyber Resilience Act der EU für Ihr Produkt gilt, und nenne die Artikel hinter der Antwort.',
    askEmail:
      'Zuerst Ihre geschäftliche E-Mail. Wir nutzen sie, um auf Ihre Prüfung zurückzukommen und Ihnen zu sagen, wann Within24 bereit ist.',
    askEmailSmall: 'Sie bestätigen die Adresse per E-Mail. Abmeldung jederzeit.',
    emailLabel: 'Geschäftliche E-Mail',
    emailPlaceholder: 'sie@firma.de',
    continue: 'Weiter',
    askProduct:
      'Danke. Beschreiben Sie jetzt Ihr Produkt: was es tut, wer es nutzt und wie es sich verbindet. Ein, zwei Sätze reichen.',
    productLabel: 'Beschreiben Sie Ihr Produkt',
    productPlaceholder: 'Eine WLAN-Kamera mit Handy-App…',
    examples: [
      {
        label: 'Smartes Türschloss',
        text: 'Wir bauen ein smartes Türschloss. Man öffnet es mit unserer Handy-App, und die App spricht über unsere eigene Cloud mit dem Schloss.',
      },
      {
        label: 'SaaS für Projektmanagement',
        text: 'Eine Web-App für Projektmanagement. Kunden nutzen sie im Browser; es gibt nichts zu installieren.',
      },
      {
        label: 'Wir machen eine App',
        text: 'Wir machen eine mobile App, die man aus dem App Store und von Google Play installiert.',
      },
    ],
    answerLabel: 'Ihre Antwort',
    answerPlaceholder: 'Ihre Antwort',
    questionsLeft: 'Ich kann höchstens noch {n} Fragen stellen.',
    send: 'Senden',
    thinking: 'Wird geprüft',
    thinkingSteps: [
      'Lese Anwendungsbereich und Ausnahmen',
      'Vergleiche mit den Kategorien aus Anhang III und IV',
      'Prüfe jeden Artikel am Text',
    ],
    verdicts: {
      in_scope: 'Ja, der CRA gilt',
      out_of_scope: 'Nein, der CRA gilt nicht',
      depends: 'Es kommt darauf an',
      off_topic: 'Diese Prüfung betrifft nur den CRA',
    },
    categories: {
      default: 'Standardkategorie',
      important_class_i: 'Wichtiges Produkt, Klasse I',
      important_class_ii: 'Wichtiges Produkt, Klasse II',
      critical: 'Kritisches Produkt',
    },
    clocks: {
      intro: 'Wird eine Schwachstelle darin aktiv ausgenutzt, melden Sie:',
      lanes: ['Frühwarnung', 'Meldung', 'Abschlussbericht'],
      caption: '24 Std · 72 Std · 14 Tage nach dem Fix',
      link: 'Ihre Termine berechnen',
    },
    copy: 'Antwort kopieren',
    copied: 'Kopiert',
    askPain:
      'Eine letzte Frage. Was ist für Sie gerade das Schwierigste an CRA-Meldungen oder an der Reaktion auf Vorfälle?',
    askPainSmall:
      'Ihre Antwort geht direkt an das Team. Wir bauen als Nächstes, was uns die Leute hier sagen.',
    pains: {
      which_reports: 'Unklar, welche Meldungen wir schulden',
      reports_take_long: 'Die Meldungen zu schreiben dauert zu lange',
      nobody_watches_clock: 'Nachts behält niemand die Frist im Blick',
      wrong_person_woken: 'Nächtliche Alarme wecken die falsche Person',
      customers_ask_cra: 'Kunden fragen uns nach dem CRA',
      other: 'Selbst schreiben',
    },
    painLabel: 'Ihr größtes Problem',
    painPlaceholder: 'In Ihren eigenen Worten',
    thanks:
      'Vielen Dank. Wir lesen jede Antwort. Wenn viele Teams dasselbe Problem nennen, bauen wir dafür zuerst.',
    checkInbox: 'Sehen Sie in Ihr Postfach und bestätigen Sie Ihre Adresse.',
    earlyAccess: 'Frühen Zugang sichern',
    footnote: 'Was Sie hier schreiben, speichern wir, um Within24 zu verbessern.',
    privacy: 'Datenschutzerklärung',
    source: 'Antworten zitieren die Verordnung (EU) 2024/2847. Antworten derzeit auf Englisch.',
    errors: {
      email: 'Das sieht nicht wie eine E-Mail-Adresse aus.',
      robot:
        'Wir konnten nicht bestätigen, dass Sie kein Roboter sind. Laden Sie die Seite neu und versuchen Sie es noch einmal.',
      tooMany:
        'Zu viele Prüfungen aus Ihrem Netz. Bitte versuchen Sie es in einer Stunde noch einmal.',
      expired: 'Diese Prüfung ist abgelaufen. Beginnen Sie neu, um eine neue zu starten.',
      unavailable:
        'Die Prüfung ist gerade nicht verfügbar. Bitte versuchen Sie es in ein paar Minuten noch einmal.',
      network: 'Keine Verbindung. Prüfen Sie Ihr Netz und versuchen Sie es noch einmal.',
    },
  },
  privacy: {
    title: 'Datenschutzerklärung',
    description:
      'Welche personenbezogenen Daten Within24 erhebt, warum, welche Anbieter sie verarbeiten, wie lange wir sie speichern und wie Sie Ihre Rechte nutzen.',
    lastUpdated: 'Zuletzt aktualisiert',
    updatedOn: '18. November 2026',
    translationNote:
      'Dies ist eine Übersetzung. Weicht sie von der englischen Fassung ab, gilt die englische Fassung.',
    intro:
      'Diese Erklärung beschreibt, welche personenbezogenen Daten Within24 auf within24.app erhebt, warum, und was Sie dagegen tun können. Zum Lesen der Website und zur Nutzung des Rechners brauchen wir keine personenbezogenen Daten. Ihre E-Mail erhalten wir nur, wenn Sie eines unserer Formulare senden die CRA-Prüfung nutzen oder die vollständige Analyse des KI-Guides anfordern.',
    sections: [
      {
        heading: 'Wer verantwortlich ist',
        blocks: [
          {
            p: 'Within24 wird von einem privaten Unternehmen mit Sitz in der Europäischen Union betrieben. Das Unternehmen ist Verantwortlicher für die hier beschriebenen personenbezogenen Daten. Bei Fragen zu dieser Erklärung oder zu Ihren Daten schreiben Sie an [hello@within24.app](mailto:hello@within24.app).',
          },
        ],
      },
      {
        heading: 'Was wir erheben und warum',
        blocks: [
          {
            table: {
              head: ['Wo', 'Was wir erhalten', 'Warum'],
              rows: [
                [
                  'Fristenrechner',
                  'Nichts. Er läuft in Ihrem Browser. Die Zeiten, die Sie eingeben, bleiben in der Seitenadresse, damit Sie den Link kopieren können; wir erhalten sie nie.',
                  'Um Ihre Fristen anzuzeigen.',
                ],
                [
                  'Analyse (Umami)',
                  'Seitenaufrufe und anonyme Ereignisse wie „Rechner genutzt“ oder „Plan gewählt“, die verweisende Website, Browser- und Gerätetyp und das Land. Ihre IP-Adresse wird kurz genutzt, um eindeutige Besucher zu zählen und das Land zu schätzen; sie wird nicht in den Analysedaten gespeichert. Keine Cookies.',
                  'Um zu sehen, welche Seiten helfen und für welche Pläne sich Besucher interessieren.',
                ],
                [
                  'Formular für das Incident Kit',
                  'E-Mail (Pflicht). Optional: Unternehmen, Produktart, welche Gesetze gelten.',
                  'Um Ihnen das Kit zu senden, nachdem Sie Ihre E-Mail bestätigt haben.',
                ],
                [
                  'Formular für den frühen Zugang',
                  'E-Mail (Pflicht). Optionale Antworten: was Sie zuerst brauchen, was Sie ausliefern, Unternehmensgröße, Ihr heutiges On-Call-Werkzeug, ob Sie in der EU verkaufen, welche Alarmkanäle Sie brauchen, den gewählten Plan, eine freie Notiz.',
                  'Um Sie einzuladen, wenn das Produkt bereit ist, und um zu lernen, was wir zuerst bauen sollen.',
                ],
                [
                  'CRA-Prüfung (der Chat in der Seitenecke)',
                  'E-Mail (Pflicht), die Produktbeschreibung und Antworten, die Sie eingeben, die Antwort der KI, das Problem, das Sie am Ende nennen, die Seite, auf der Sie sie genutzt haben, und die Uhrzeit.',
                  'Um zu beantworten, ob der CRA für Ihr Produkt gilt, um nach Bestätigung Ihrer Adresse per E-Mail nachzufassen und um zu entscheiden, was wir als Nächstes bauen.',
                ],
                [
                  'KI-Guide (das Feld oben auf der Startseite)',
                  'Das Problem, das Sie beschreiben, die Antwort der KI, die Seite, auf der Sie ihn genutzt haben, und die Uhrzeit. Nur wenn Sie die vollständige Analyse anfordern: Ihre E-Mail und die Analyse, die wir senden.',
                  'Um zu beantworten, ob Within24 zu Ihrem Problem passt, um Ihnen die angeforderte Analyse per E-Mail zu senden und um zu entscheiden, was wir als Nächstes bauen.',
                ],
                [
                  'Beide Formulare',
                  'Den Zeitpunkt Ihrer Anmeldung, welches Formular Sie genutzt haben und von welcher Seite Sie kamen, die Version des Einwilligungstextes und ob Sie gelegentliche Neuigkeiten wünschen.',
                  'Um Ihre Einwilligung nachzuweisen und Ihre Wahl zu respektieren.',
                ],
                [
                  'Bot-Prüfung (Cloudflare Turnstile)',
                  'Ihre IP-Adresse, TLS-Fingerabdruck und Browser-User-Agent, verarbeitet von Cloudflare.',
                  'Um Spam aus den Formularen fernzuhalten.',
                ],
                [
                  'Hosting (Cloudflare Pages)',
                  'Technische Daten jeder Anfrage, etwa IP-Adresse und Browser, verarbeitet von Cloudflare.',
                  'Um die Website auszuliefern und vor Angriffen zu schützen.',
                ],
              ],
            },
          },
          { p: 'Wir verkaufen Ihre Daten nicht und nutzen sie nicht für Werbung.' },
        ],
      },
      {
        heading: 'Rechtsgrundlagen',
        blocks: [
          {
            ul: [
              'Formulare und E-Mails: Ihre Einwilligung (Art. 6 Abs. 1 Buchst. a DSGVO), die Sie mit dem Absenden des Formulars und der Bestätigung Ihrer E-Mail geben. Sie können sie jederzeit über den Abmeldelink in jeder E-Mail oder per Nachricht an uns widerrufen.',
              'CRA-Prüfung: Wir verarbeiten, was Sie eingeben, um Ihnen die erbetene Antwort zu geben (Art. 6 Abs. 1 Buchst. b DSGVO). E-Mails nach der Prüfung beruhen auf Ihrer Einwilligung, die Sie mit der Bestätigung Ihrer Adresse geben.',
              'KI-Guide: Wir verarbeiten, was Sie eingeben, und Ihre E-Mail, wenn Sie die vollständige Analyse anfordern, um Ihnen die erbetene Antwort zu geben (Art. 6 Abs. 1 Buchst. b DSGVO). E-Mails zum frühen Zugang beruhen auf Ihrer Einwilligung, die Sie mit der Bestätigung Ihrer Adresse geben.',
              'Analyse, Bot-Prüfung und Hosting: unser berechtigtes Interesse (Art. 6 Abs. 1 Buchst. f DSGVO), eine sichere Website zu betreiben und zu erfahren, welche Seiten nützlich sind. Wir haben eine Analyse ohne Cookies gewählt, um Ihre Privatsphäre wenig zu belasten.',
            ],
          },
        ],
      },
      {
        heading: 'Dienstleister',
        blocks: [
          {
            p: 'Diese Anbieter verarbeiten Daten für uns. Sonst erhält niemand die Daten.',
          },
          {
            table: {
              head: ['Anbieter', 'Was er tut', 'Wo', 'Bedingungen'],
              rows: [
                [
                  'Brevo SAS',
                  'Speichert Formularanmeldungen und versendet Bestätigungs-, Kit- und Analyse-E-Mails',
                  'Unternehmen in Frankreich; kann Daten in die USA und nach Indien übermitteln',
                  '[Datenschutzerklärung von Brevo](https://www.brevo.com/legal/privacypolicy/)',
                ],
                [
                  'Cloudflare, Inc.',
                  'Hostet die Website (Pages) und betreibt die Bot-Prüfung (Turnstile)',
                  'Weltweites Netz; Unternehmen in den USA',
                  '[Datenschutzerklärung von Cloudflare](https://www.cloudflare.com/privacypolicy/), [Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/)',
                ],
                [
                  'Anthropic, PBC',
                  'Schreibt die Antworten der CRA-Prüfung und des KI-Guides aus Ihren Eingaben (KI-Modell)',
                  'Unternehmen in den USA',
                  '[Datenschutzerklärung von Anthropic](https://www.anthropic.com/legal/privacy)',
                ],
                [
                  'Hetzner Online GmbH',
                  'Hostet unseren API-Server und die Datenbank der CRA-Prüfung und des KI-Guides',
                  'Unternehmen in Deutschland; unser Server steht in der EU (Deutschland oder Finnland)',
                  '[Datenschutzerklärung von Hetzner](https://www.hetzner.com/legal/privacy-policy/)',
                ],
                [
                  'Umami Software, Inc.',
                  'Analyse ohne Cookies',
                  'EU und USA',
                  '[Datenschutzerklärung von Umami](https://umami.is/privacy)',
                ],
              ],
            },
          },
        ],
      },
      {
        heading: 'Übermittlungen außerhalb der EU',
        blocks: [
          {
            p: 'Einige Anbieter verarbeiten Daten in den USA oder anderswo außerhalb der EU. Cloudflare stützt sich auf das EU-US Data Privacy Framework und ersatzweise auf die Standardvertragsklauseln der Europäischen Kommission. Für Brevo, Anthropic und Umami sind die Garantien in ihren Datenschutzerklärungen und Auftragsverarbeitungsbedingungen beschrieben.',
          },
        ],
      },
      {
        heading: 'Wie lange wir Daten speichern',
        blocks: [
          {
            ul: [
              'Bestätigte Anmeldungen: bis Sie sich abmelden oder die Löschung verlangen. Wenn die Liste für den frühen Zugang geschlossen wird, löschen wir Antworten, die wir nicht mehr brauchen.',
              'CRA-Prüfung: Was Sie eingeben, die Antworten und Ihre E-Mail werden 24 Monate nach Ihrer letzten Nutzung der Prüfung gelöscht oder früher, wenn Sie es verlangen.',
              'KI-Guide: Was Sie eingeben und die Antworten werden 24 Monate nach Ihrer Frage gelöscht oder früher, wenn Sie es verlangen.',
              'Analyse: als zusammengefasste Statistik gespeichert.',
              'Daten aus Hosting und Bot-Prüfung: von Cloudflare für die Fristen in den eigenen Bedingungen gespeichert.',
            ],
          },
        ],
      },
      {
        heading: 'Ihre Rechte',
        blocks: [
          {
            p: 'Sie können verlangen, dass wir die Daten, die wir über Sie haben, offenlegen, berichtigen, löschen oder exportieren. Sie können auch einer Verarbeitung auf Grundlage unseres berechtigten Interesses widersprechen oder Ihre Einwilligung jederzeit widerrufen. Der Widerruf berührt die Verarbeitung bis dahin nicht.',
          },
          {
            p: 'Schreiben Sie an [hello@within24.app](mailto:hello@within24.app); wir antworten innerhalb eines Monats. Sie können sich auch bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere in dem EU-Land, in dem Sie leben oder arbeiten oder in dem nach Ihrer Ansicht der Verstoß stattfand (Art. 77 DSGVO).',
          },
        ],
      },
      {
        heading: 'Cookies',
        blocks: [
          {
            p: 'Within24 setzt keine Cookies und speichert nichts im lokalen Speicher Ihres Browsers. Das Analysewerkzeug arbeitet ohne Cookies, daher gibt es kein Cookie-Banner. Wenn ein Formular lädt, kann die Bot-Prüfung von Cloudflare unbedingt erforderliche Sicherheits-Cookies setzen, wie in der [Cookie-Liste von Cloudflare](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/) beschrieben.',
          },
        ],
      },
      {
        heading: 'Änderungen dieser Erklärung',
        blocks: [
          {
            p: 'Wenn wir ändern, wie wir mit Daten umgehen, aktualisieren wir diese Seite und ihr Datum. Betrifft eine Änderung, worin Sie eingewilligt haben, schreiben wir Ihnen vorher eine E-Mail.',
          },
        ],
      },
    ] as PrivacySection[],
  },
  legal: {
    title: 'Impressum',
    description: 'Wer diese Website betreibt und wie Sie ihn erreichen.',
    operator: 'Betreiber',
    companyGeneral: 'Ein privates Unternehmen mit Sitz in der Europäischen Union',
    countryGeneral: 'Europäische Union',
    country: 'Land',
    email: 'E-Mail',
    emailPending: 'folgt, sobald die Domain eingerichtet ist',
    translationNote:
      'Dies ist eine Übersetzung. Weicht sie von der englischen Fassung ab, gilt die englische Fassung.',
  },
  calculator: {
    deadlineName: '{regime} {stage}',
    formHeading: 'Ihr Vorfall',
    resultHeading: 'Meldefristen',
    events: {
      legend: 'Was ist passiert? Kreuzen Sie jedes zutreffende Ereignis an',
      hint: 'Prüfen Sie diese Kästchen selbst, bevor Sie sich auf das Ergebnis verlassen.',
      labels: {
        'cra.actively_exploited_vulnerability':
          'CRA: aktiv ausgenutzte Schwachstelle in Ihrem Produkt',
        'cra.severe_incident':
          'CRA: schwerwiegender Vorfall, der die Sicherheit Ihres Produkts beeinträchtigt',
        'nis2.significant_incident': 'NIS2: erheblicher Sicherheitsvorfall',
        'gdpr.personal_data_breach': 'DSGVO: Verletzung des Schutzes personenbezogener Daten',
      },
    },
    helper: {
      summary: 'Unsicher, welche Kästchen zutreffen? Beantworten Sie drei Fragen',
      cra: {
        legend:
          'Sind Sie Hersteller eines Produkts mit digitalen Elementen, das in der EU verkauft wird, und ist es betroffen?',
        no: 'Nein',
        vulnerability: 'Ja: Eine Schwachstelle darin wird aktiv ausgenutzt',
        incident: 'Ja: Ein schwerwiegender Vorfall beeinträchtigt seine Sicherheit',
        both: 'Ja: beides',
      },
      nis2: {
        legend:
          'Ist Ihre Organisation eine wesentliche oder wichtige Einrichtung nach NIS2, und ist dies ein erheblicher Sicherheitsvorfall?',
        yes: 'Ja',
        no: 'Nein',
      },
      gdpr: {
        legend:
          'Betrifft der Vorfall eine Verletzung des Schutzes personenbezogener Daten, für die Sie verantwortlich sind?',
        yes: 'Ja',
        no: 'Nein',
      },
      apply: 'Passende Kästchen ankreuzen',
      applied:
        'Kästchen anhand Ihrer Antworten angekreuzt. Prüfen Sie sie, bevor Sie sich auf das Ergebnis verlassen.',
      appliedNone: 'Ihre Antworten passen zu keinem Kästchen. Prüfen Sie sie selbst.',
    },
    aware: {
      label: 'Kenntnis erlangt am',
      readAs: 'Gelesen als {utc}.',
      gap: 'Diese Ortszeit gibt es nicht (die Uhren wurden vorgestellt). Die frühere Lesart wird verwendet: {utc}.',
      ambiguous:
        'Diese Ortszeit kommt zweimal vor (die Uhren wurden zurückgestellt). Die frühere wird verwendet: {utc}.',
      required: 'Geben Sie ein, wann Sie von dem Ereignis Kenntnis erlangt haben.',
      useNow: 'Auf die aktuelle Zeit setzen',
    },
    invalidDate: 'Geben Sie ein vollständiges Datum mit Uhrzeit ein.',
    country: {
      label: 'Meldeland',
      hint: 'In Monaten gezählte Fristen nutzen die Uhr dieses Landes ({zone}).',
    },
    countryNames: {
      AT: 'Österreich',
      BE: 'Belgien',
      BG: 'Bulgarien',
      HR: 'Kroatien',
      CY: 'Zypern',
      CZ: 'Tschechien',
      DK: 'Dänemark',
      EE: 'Estland',
      FI: 'Finnland',
      FR: 'Frankreich',
      DE: 'Deutschland',
      GR: 'Griechenland',
      HU: 'Ungarn',
      IE: 'Irland',
      IT: 'Italien',
      LV: 'Lettland',
      LT: 'Litauen',
      LU: 'Luxemburg',
      MT: 'Malta',
      NL: 'Niederlande',
      PL: 'Polen',
      PT: 'Portugal',
      RO: 'Rumänien',
      SK: 'Slowakei',
      SI: 'Slowenien',
      ES: 'Spanien',
      SE: 'Schweden',
    },
    displayZone: {
      label: 'Zeiten anzeigen in',
      hint: 'Ändert nur die Anzeige der Zeiten, nicht die Fristen.',
    },
    anchors: {
      fix_available_at: {
        label: 'Erste Korrektur oder Abhilfe verfügbar seit (optional)',
        hint: 'Für den CRA-Abschlussbericht. Leer lassen, wenn es noch keine gibt.',
      },
      notification_submitted_at: {
        label: 'Meldung abgegeben am (optional)',
        hint: 'Für den Abschlussbericht. Leer lassen, wenn Sie sie noch nicht abgegeben haben.',
      },
    },
    fixBeforeAware:
      'Die Korrektur liegt vor dem Zeitpunkt Ihrer Kenntniserlangung. Prüfen Sie beide Zeiten: Dieser Fall ist von den Regeln noch nicht abgedeckt.',
    result: {
      exampleCaption: 'Beispiel: Kenntnis erlangt am {time}.',
      liveCaption: 'Kenntnis erlangt am {time}.',
      summary: '{country} (Zeit der Behörde) · Zeiten angezeigt in {zone}',
      change: 'Ändern',
      unverified:
        'Regeln noch nicht anhand des offiziellen Textes geprüft. Prüfen Sie jede Frist an ihrer Quelle, bevor Sie sich darauf verlassen.',
      noEvents: 'Kreuzen Sie mindestens ein Ereignis an, um Fristen zu sehen.',
      noAware: 'Geben Sie ein, wann Sie Kenntnis erlangt haben, um Fristen zu sehen.',
      columns: {
        deadline: 'Frist',
        due: 'Fällig',
        left: 'Verbleibend',
        calendar: 'Kalender',
      },
      dueAuthority: 'Zeit der Behörde ({country}): {time}',
      dueUtc: 'UTC: {time}',
      source: 'Quelle',
      overdueBy: 'Überfällig seit {time}',
      dueIn: 'Fällig in {time}',
      pending: '—',
      waiting: {
        aware_at: 'Wartet auf den Zeitpunkt Ihrer Kenntniserlangung.',
        fix_available_at:
          'Wartet auf eine Korrektur oder Abhilfe. Geben Sie ein, wann die erste verfügbar war, um diese Frist zu berechnen.',
        notification_submitted_at:
          'Wartet auf die Meldung. Geben Sie ein, wann Sie sie abgegeben haben, um diese Frist zu berechnen.',
      },
      downloadOne: '.ics herunterladen',
      downloadOneLabel: 'Frist {deadline} als Kalenderdatei (.ics) herunterladen',
      downloadAll: 'Alle Fristen herunterladen (.ics)',
      copyLink: 'Link zu dieser Berechnung kopieren',
      copied: 'Link kopiert.',
      copyFallback: 'Diesen Link kopieren',
      nowOverdue: '{deadline} ist jetzt überfällig.',
      noscript: 'Der Rechner braucht JavaScript. Die Tabelle zeigt ein Beispiel.',
      linkInvalid: 'Einige Werte im Link konnten nicht gelesen werden und wurden übersprungen.',
      linkOtherRules:
        'Dieser Link wurde mit den Regeln {old} erstellt. Berechnet wird mit den aktuellen Regeln {current}.',
      errors: {
        unsupported_event:
          'Für eines der gewählten Ereignisse gibt es nach diesem Gesetz keine Regeln. Entfernen Sie das Häkchen, um Fristen zu sehen.',
        unknown_reporting_timezone:
          'Die Zeitzone des Meldelandes ist diesem Browser nicht bekannt.',
        notification_submitted_before_aware_at:
          'Die Meldung liegt vor dem Zeitpunkt Ihrer Kenntniserlangung. Prüfen Sie beide Zeiten.',
      },
    },
    timeline: {
      aware: 'Kenntnis',
      now: 'Jetzt',
      later: 'später',
      tick: '+{hours} Std',
      lanes: {
        'cra.actively_exploited_vulnerability': 'CRA · Schwachstelle',
        'cra.severe_incident': 'CRA · schwerer Vorfall',
        'nis2.significant_incident': 'NIS2',
        'gdpr.personal_data_breach': 'DSGVO',
      },
      stages: {
        early_warning: 'Frühwarnung',
        notification: 'Meldung',
        final_report: 'Abschlussbericht',
      },
      waiting: {
        aware_at: 'wartet',
        fix_available_at: 'wartet: Fix',
        notification_submitted_at: 'wartet: Meldung',
      },
    },
    stages: {
      early_warning: 'Frühwarnung',
      notification: 'Meldung',
      final_report: 'Abschlussbericht',
    },
    eventTypes: {
      actively_exploited_vulnerability: 'Aktiv ausgenutzte Schwachstelle',
      severe_incident: 'Schwerwiegender Vorfall',
      significant_incident: 'Erheblicher Sicherheitsvorfall',
      personal_data_breach: 'Verletzung des Schutzes personenbezogener Daten',
    },
    ics: {
      summary: 'Frist: {deadline}',
      due: 'Fällig {reporting} (Zeit der Behörde), {utc}.',
      source: 'Quelle: {url}',
      rules: 'Regeln {version}.',
      disclaimer: 'Regeln noch nicht anhand des offiziellen Textes geprüft.',
    },
  },
};
