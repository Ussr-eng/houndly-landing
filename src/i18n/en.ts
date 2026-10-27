// UI strings. Placeholders in braces ({time}) are filled with fill() from src/i18n/index.ts.

export const en = {
  skipToContent: 'Skip to content',
  nav: {
    label: 'Main',
    home: 'Home',
    cra: 'The CRA',
    calculator: 'Deadline calculator',
    guides: 'Guides',
    kit: 'Incident Kit',
    pricing: 'Pricing',
    earlyAccess: 'Join early access',
  },
  footer: {
    rulesVersion: 'Rules {version}',
    rulesUnverified: 'not yet verified against the official texts',
    rulesVerified: 'verified {date}',
    links: 'Legal',
    privacy: 'Privacy',
    legal: 'Legal notice',
    craHeading: 'The CRA',
    craLinks: {
      asks: 'What the CRA asks',
      dates: 'Key dates',
      reports: 'Three reports',
      scope: 'Does it apply to you',
    },
    toolsHeading: 'Tools',
    faq: 'FAQ',
  },
  breadcrumbs: { label: 'Breadcrumb', home: 'Home', guides: 'Guides' },
  guides: {
    title: 'Guides to EU incident reporting and on-call',
    description:
      'Plain-English guides to CRA, NIS2 and GDPR reporting deadlines, and to running on-call in a small team. Each one cites the official texts.',
    intro:
      'What the law asks when something goes wrong, and how a small team stays ready to answer at 3 a.m. Every legal statement links to the article it comes from.',
    topics: { law: 'Reporting under EU law', 'on-call': 'Running on-call' },
    faqLink: 'Short answers: frequently asked questions',
  },
  guide: {
    lastVerified: 'Last verified',
    notVerified: 'Not yet verified against the official texts',
    sources: 'Sources',
    related: 'Related guides',
    calculatorCta: 'Calculate your deadlines',
    published: 'Published',
    updated: 'Updated',
  },
  notFound: {
    title: 'Page not found',
    body: 'This page does not exist or has moved.',
    back: 'Go to the deadline calculator',
  },
  bridge: {
    heading: 'Deadlines calculated. Who wakes up at 3 a.m.?',
    intro: 'Within24 keeps these clocks running for your team.',
    steps: [
      'Log the incident once. Every legal clock that applies starts.',
      'Before each deadline, the on-call person is alerted until someone acknowledges.',
      'A draft for each report is ready before its deadline.',
    ],
    link: 'See plans and early access',
  },
  form: {
    email: 'Email',
    required: '(required)',
    optional: '(optional)',
    company: 'Company',
    productType: 'Product type',
    productTypeNone: 'Choose…',
    productTypes: {
      mobile: 'Mobile app',
      desktop: 'Desktop software',
      self_hosted: 'Self-hosted or on-prem software',
      iot: 'Connected device or IoT',
      sdk: 'SDK or library',
      saas: 'SaaS only',
      other: 'Other',
    },
    productTypeQuestion: 'What do you ship?',
    companySize: 'Company size',
    companySizes: {
      '1-9': '1–9',
      '10-49': '10–49',
      '50-249': '50–249',
      '250+': '250+',
    },
    oncallTool: 'On-call today',
    oncallTools: {
      pagerduty: 'PagerDuty',
      opsgenie: 'Opsgenie',
      grafana_oncall: 'Grafana OnCall',
      other_tool: 'Another tool',
      phone_chat: 'Phone or chat',
      nobody: 'Nobody is on call',
    },
    sellsEu: 'Do you sell in the EU?',
    sellsEuOptions: { yes: 'Yes', no: 'No', unsure: 'Not sure' },
    note: 'Anything else?',
    noteHint: 'For example, what hurts most in your on-call today. Up to 300 characters.',
    laws: 'Applicable laws',
    lawLabels: { CRA: 'CRA', NIS2: 'NIS2', GDPR: 'GDPR', unsure: 'Not sure' },
    honeypot: 'Leave this field empty',
    sending: 'Sending…',
    errors: {
      summary: 'Please check the highlighted fields.',
      required: 'Enter your email address.',
      invalid: 'Enter a valid email address, like name@company.com.',
      too_long: 'This is too long.',
      verification: 'We could not verify that this request came from a person. Please try again.',
      unavailable: 'Sign-up is not available right now. Please try again later.',
      network: 'The form could not be sent. Check your connection and try again.',
    },
    privacyNote: 'We use your details only for what this form says. See the {link}.',
    privacyLink: 'privacy policy',
  },
  kit: {
    title: 'Incident Kit for CRA incident reporting',
    description:
      'Templates for the three CRA reports, an ENISA reporting platform checklist and a first-hour runbook for a reportable incident. Free, sent to your inbox.',
    intro:
      'Templates and checklists for the first hours of a reportable incident. Free, sent to your inbox.',
    insideHeading: "What's inside",
    items: [
      {
        name: 'Report templates',
        text: 'Early warning, notification and final report.',
      },
      {
        name: 'Readiness checklist',
        text: 'For the ENISA Single Reporting Platform (SRP): what to have ready before you file.',
      },
      {
        name: 'First 60 minutes runbook',
        text: 'Who does what in the first hour after you become aware.',
      },
    ],
    formHeading: 'Get the kit',
    news: 'Also send me product news (about once a month). You can unsubscribe at any time.',
    submit: 'Send me the kit',
    nextHeading: 'What happens next',
    next: [
      'Confirm your email address with the link we send you.',
      'The kit arrives by email.',
      'We do not share your address.',
    ],
    success: 'Almost done. Check your inbox and confirm your email address to get the kit.',
    checkEmail: {
      title: 'Check your email',
      description: 'Confirm your email address to receive the Incident Kit.',
      body: 'We sent you a confirmation link. Open it to receive the Incident Kit by email.',
      hint: 'Nothing there after a few minutes? Check your spam folder.',
      back: 'Back to the deadline calculator',
    },
    confirmed: {
      title: 'Email confirmed',
      description: 'Your email address is confirmed. The Incident Kit is on its way.',
      body: 'Thank you. The Incident Kit is on its way to your inbox.',
      back: 'Back to the deadline calculator',
    },
  },
  earlyAccess: {
    title: 'Get early access to Within24',
    description:
      'Join the Within24 early-access list: AI-written CRA reports and legal clocks for small software teams. No payment is taken.',
    plansLink: 'Compare plans',
  },
  pricing: {
    title: 'Pricing and early access',
    description:
      'Plans for teams that must report CRA, NIS2 and GDPR incidents on time. Early access: no payment is taken.',
    intro:
      'Within24 is in early access. Choose the plan that fits and leave your email: we contact you before launch, and you decide then whether to buy.',
    perMonth: '/ month',
    noPayment: 'Early access. No payment is taken.',
    choose: 'Choose {plan}',
    useCalculator: 'Use the calculator',
    priceLock: 'Early-access teams keep this price for 12 months after launch.',
    consultant: 'Consultant with several clients? Tell us in the form.',
    pagerDuty:
      'Already on PagerDuty or Opsgenie? Starter works with it: send your alerts by webhook.',
    recommended: 'Recommended',
    plans: {
      free: {
        name: 'Free',
        description: 'Tools for working out what applies to you.',
        features: ['Deadline calculator', 'Guides'],
      },
      starter: {
        name: 'Starter',
        description: 'For one small product team.',
        features: [
          'Up to 5 people on call',
          '1 product',
          'Alert webhooks',
          'Telegram and email escalation',
          'CRA, NIS2 and GDPR clocks',
          'AI drafts of every report',
        ],
      },
      team: {
        name: 'Team',
        description: 'For teams with support staff and several products.',
        features: [
          'Up to 20 people on call',
          'Unlimited products',
          'Phone calls',
          'AI triage of every alert',
          '"Call a developer" button for support',
          'Opsgenie import',
          'Audit export',
        ],
      },
    },
    formHeading: 'Get early access',
    formIntro:
      "We'll email you when your plan is ready. Four quick clicks, so we build the right thing first. No payment is taken.",
    plan: 'Plan',
    planNone: 'Not sure yet',
    submit: 'Join early access',
    success:
      "Check your inbox to confirm. We'll contact you before launch; you decide then whether to buy.",
    thanks: {
      title: 'Check your email to join early access',
      description: 'Confirm your email address to join the early-access list.',
      body: "Check your inbox to confirm. We'll contact you before launch; you decide then whether to buy.",
      back: 'Back to pricing',
    },
    confirmed: {
      title: "You're on the early-access list",
      description: 'Your email address is confirmed for Within24 early access.',
      body: "Thank you. We'll contact you before launch.",
      back: 'Back to the deadline calculator',
    },
  },
  home: {
    title: 'CRA incident reporting for small teams',
    description:
      'AI drafts of your 24-hour, 72-hour and final CRA reports, clocks that start from the alert, and alerts that wake someone up. Early access.',
    heading: 'We take care of your CRA reporting.',
    intro:
      'Our AI writes every CRA report from your incident timeline, with a source for each statement. Within24 starts the legal clocks and wakes whoever is on call.',
    primary: 'Calculate your reporting deadlines',
    secondary: 'Join early access',
    status: 'Early access: we are building Within24 now.',
    // Illustration of the product in the hero. Static example, not a calculation.
    example: {
      caption: 'Example incident: three CRA reporting clocks, 9 hours after the alert.',
      badge: 'Example',
      id: 'INC-0412',
      name: 'Actively exploited vulnerability',
      status: 'Clocks running',
      axis: ['Sat 03:12', '+24 h', '+48 h', '+72 h'],
      now: 'Now',
      lanes: {
        earlyWarning: 'Early warning',
        earlyWarningValue: '14:47:12 left',
        notification: 'Notification',
        notificationValue: 'Due Tue 03:12',
        finalReport: 'Final report',
        finalReportValue: 'Waiting for “fix available at”',
      },
      draft: 'Early warning draft ready: 9 statements, 9 sources',
    },
    pain: {
      heading: 'The alert does not wait for Monday',
      markers: ['03:12', '24 h', 'Same rules'],
      items: [
        '3:12 a.m., Saturday. An alert fires. Is it just downtime, or an actively exploited vulnerability?',
        'Under the CRA, the 24-hour early warning counts from when you become aware, not from Monday morning.',
        'Small teams have the same obligation as large ones, without a security team to own it.',
      ],
    },
    // A short version of the CRA page; the facts themselves come from cra.facts.
    brief: {
      heading: 'CRA reporting has applied since 11 September 2026',
      link: 'Read the CRA overview: key dates, the three reports and who is in scope',
    },
    how: {
      heading: 'How it works',
      steps: [
        {
          name: 'An alert may be reportable',
          text: 'A webhook arrives from PagerDuty, Opsgenie, Grafana or Sentry. AI flags alerts that look reportable under the CRA, NIS2 or GDPR.',
        },
        {
          name: 'The legal clocks start',
          text: 'Your engineer confirms, and the 24-hour, 72-hour and final-report timers start from the moment you became aware.',
        },
        {
          name: 'Someone is awake to act',
          text: 'Phone call, Telegram and email, escalating down the rota until someone taps "I\'m on it".',
        },
        {
          name: 'Each report is drafted',
          text: 'Before each deadline, a draft is ready from the incident timeline, with a source for every statement. You edit it and submit it to the ENISA Single Reporting Platform yourself.',
        },
      ],
    },
    oncall: {
      heading: 'Works with your on-call, or replaces it',
      badge: 'In development',
      items: [
        {
          name: 'You already use PagerDuty, Opsgenie or Grafana',
          text: 'Keep it. Send alerts to Within24 by webhook: your tool keeps paging the team, and Within24 runs the legal clocks and drafts the reports.',
        },
        {
          name: 'Nobody is on call yet',
          text: 'Within24 wakes the right person itself: rotas, escalation, phone calls, and a "Call a developer" button for support staff.',
        },
        {
          name: 'Not every alert is a legal incident',
          text: 'Most alerts are outages. They page the rota, escalate and close with a note. Only the alerts you mark as reportable start legal clocks.',
        },
      ],
      opsgenie: 'Moving off Opsgenie? Bring your schedules with you.',
    },
    pricing: {
      heading: 'Pricing',
      intro: 'Prices for early access. Choose a plan to join the list; no payment is taken.',
      more: 'More about plans',
    },
    trust: {
      heading: 'What you can rely on',
      items: [
        {
          name: 'Built by an on-call engineer',
          text: 'Dmytro spent two years on call for a customer-support platform and built Within24 for the 3 a.m. alert he used to get.',
        },
        {
          name: 'A person always decides',
          text: 'Within24 never submits to ENISA and never tells you a report is not needed.',
        },
        {
          name: 'Every answer has a source',
          text: 'Article numbers and links to the official texts. Where there is no source, we say it is unclear.',
        },
        {
          name: 'Your data stays minimal',
          text: 'No tracking cookies. We keep your email only with your consent.',
        },
      ],
      privacy: 'Read the privacy policy',
    },
    faq: {
      heading: 'Questions',
      items: [
        {
          q: 'Do you submit reports to ENISA for us?',
          a: 'No. The ENISA Single Reporting Platform has no API, and the decision to report stays with a person. Within24 wakes the right person and prepares the text.',
        },
        {
          q: 'What data does the AI see?',
          a: 'Only what you send it: alert payloads and the incident timeline. Personal data is masked before it reaches the model, and the AI never decides on its own.',
        },
        {
          q: 'We already use PagerDuty. Do we need to switch?',
          a: 'No. Send your alerts to Within24 by webhook. PagerDuty keeps waking your team; Within24 adds the legal clocks and the report drafts.',
        },
        {
          q: 'We are moving off Opsgenie. Can we use Within24 without the CRA part?',
          a: 'Yes. The legal clocks start only when you mark an incident as reportable.',
        },
        {
          q: 'When can I use it?',
          a: "We're building the core now and will onboard early-access teams in small groups.",
        },
      ],
    },
  },
  faqPage: {
    title: 'CRA reporting and on-call: frequently asked questions',
    description:
      'Short answers on who the CRA applies to, its 24-hour, 72-hour and final-report deadlines, how it fits with NIS2 and GDPR, and running on-call.',
    intro: 'Short answers, each with the article it comes from and a guide that goes deeper.',
    verified:
      'Last verified: 27 October 2026, against the texts of Regulation (EU) 2024/2847, Directive (EU) 2022/2555 and Regulation (EU) 2016/679.',
    more: 'Read the guide',
    productHeading: 'About Within24',
    // Each answer cites its source; `link` points to the guide that covers the topic in depth.
    groups: [
      {
        id: 'scope',
        heading: 'Does the CRA apply to me?',
        items: [
          {
            q: 'Does the Cyber Resilience Act apply to SaaS?',
            a: 'Usually not directly: recital 12 points SaaS, PaaS and IaaS to NIS2. A cloud backend is in scope when it is the remote data processing of a product you ship, such as the server your app or device needs to work (Art. 3(1), 3(2)).',
            link: '/guides/cra-saas-scope/',
          },
          {
            q: 'Does it apply to free or open-source software?',
            a: 'Only to software supplied in the course of a commercial activity (recital 18). Charging for the product, for support beyond cost, or monetising through it can count as commercial (recital 15). Open-source software stewards have lighter duties and are not fined under the CRA (Art. 24, Art. 64(10)(b)).',
          },
          {
            q: 'We are not based in the EU. Does it apply?',
            a: "Yes, if your product is made available on the EU market (Art. 2(1)). You still report through the ENISA Single Reporting Platform, to the CSIRT chosen by the order in Art. 14(7): your authorised representative's country, then your importer's, then your distributor's, then where most of your users are.",
          },
          {
            q: 'Does reporting apply to products sold before December 2027?',
            a: 'Yes. The reporting duty in Article 14 applies to all products in scope, including those placed on the market before 11 December 2027 (Art. 69(3)).',
          },
          {
            q: 'Who has to report: us or our customer?',
            a: 'The manufacturer: whoever develops the product, or has it developed, and markets it under their own name or trademark (Art. 3(13), Art. 14(1)).',
          },
        ],
      },
      {
        id: 'deadlines',
        heading: 'Deadlines and reports',
        items: [
          {
            q: 'What are the CRA reporting deadlines?',
            a: 'An early warning within 24 hours of becoming aware, a notification within 72 hours, then a final report: 14 days after a fix is available for a vulnerability, or one month after the notification for an incident (Art. 14(2), 14(4)).',
            link: '/guides/cra-reporting-deadlines/',
          },
          {
            q: 'When does the 24-hour clock start?',
            a: 'When you become aware of the actively exploited vulnerability or severe incident (Art. 14(2)(a)). The regulation does not define the moment, so use the earliest one you could defend.',
            link: '/guides/cra-24-hour-clock/',
          },
          {
            q: 'Do weekends or public holidays pause the clock?',
            a: 'No. The 24-hour and 72-hour limits are counted in hours, and Article 14 gives no extension for nights, weekends or holidays. We treat the 14-day and one-month limits the same way and never extend them.',
          },
          {
            q: 'What if our fix takes longer than 14 days?',
            a: 'The 14 days for the final report on a vulnerability start only when a corrective or mitigating measure is available (Art. 14(2)(c)). Until then there is no final-report date, but the early warning and notification still apply.',
          },
          {
            q: 'A researcher reported a vulnerability to us. Do we have to report it?',
            a: 'Not as an actively exploited vulnerability, if there is no evidence a malicious actor used it (Art. 3(42), recital 68). You can report it voluntarily (Art. 15).',
            link: '/guides/cra-what-to-report/',
          },
          {
            q: 'Can the authority ask for more after we file?',
            a: 'Yes. The CSIRT that receives your report may ask for an intermediate report on status updates (Art. 14(6)).',
          },
          {
            q: 'Do we also have to tell our users?',
            a: 'Yes. After becoming aware, inform the impacted users, and where appropriate all users, and say what they can do to reduce the impact (Art. 14(8)).',
          },
          {
            q: 'What happens if we report late?',
            a: 'Missing the Article 14 obligations can be fined up to EUR 15 million or 2.5% of worldwide annual turnover, whichever is higher (Art. 64(2)). Microenterprises and small enterprises are not fined for missing the 24-hour early warning (Art. 64(10)(a)).',
          },
        ],
      },
      {
        id: 'laws',
        heading: 'CRA, NIS2 and GDPR together',
        items: [
          {
            q: 'How is CRA reporting different from NIS2 and GDPR?',
            a: "Each law has its own trigger, recipient and clock. The CRA covers your product, NIS2 your organisation's service, GDPR personal data. One incident can fall under all three.",
            link: '/guides/cra-nis2-gdpr-reporting/',
          },
          {
            q: 'Does NIS2 apply to us?',
            a: "NIS2 covers entities in the sectors listed in its Annexes I and II, cloud computing providers among them, that are medium-sized or larger (NIS2 Art. 2(1)). Some types are covered regardless of size (Art. 2(2)). Your country's national law sets the details.",
          },
          {
            q: 'Can one report cover the CRA, NIS2 and GDPR?',
            a: 'No. Each goes to a different recipient: the CRA report to the CSIRT and ENISA through the Single Reporting Platform (CRA Art. 14(7)), NIS2 to the national CSIRT or competent authority (NIS2 Art. 23(1)), GDPR to the data protection authority (GDPR Art. 33(1)). Write them from one incident timeline so the facts match.',
          },
          {
            q: 'What is the GDPR deadline for a data breach?',
            a: 'Where feasible, 72 hours after becoming aware, unless the breach is unlikely to result in a risk to people. A later notification must give reasons for the delay (GDPR Art. 33(1)).',
          },
        ],
      },
      {
        id: 'on-call',
        heading: 'Running on-call',
        items: [
          {
            q: 'How many people do we need for on-call?',
            a: 'With three people each is on call every third week, which works but is heavy; five or more is sustainable. One primary, one backup, weekly shifts, handover in working hours.',
            link: '/guides/on-call-rotation-small-team/',
          },
          {
            q: 'Who should be woken if the on-call engineer does not answer?',
            a: 'Write an escalation policy before you need it: for example the primary by phone after 5 minutes, the backup after 15, the engineering lead after 30.',
            link: '/guides/escalation-policy/',
          },
          {
            q: 'Can our support team wake a developer?',
            a: 'They should have one button or number that always reaches whoever is on call now, and permission to use it. A customer saying "I can see someone else\'s data" can start a legal clock.',
            link: '/guides/support-to-developer-escalation/',
          },
        ],
      },
    ],
  },
  cra: {
    title: 'Cyber Resilience Act: what to report and when',
    description:
      'What the EU Cyber Resilience Act asks when something goes wrong: who reports, to whom, the 24-hour, 72-hour and final-report deadlines, and key dates.',
    breadcrumb: 'The CRA',
    // Checked against the text of Regulation (EU) 2024/2847 in the Official Journal (OJ L, 20.11.2024).
    verified:
      'Last verified: 25 October 2026, against the text published in the Official Journal on 20 November 2024.',
    asks: {
      heading: 'What the Cyber Resilience Act asks of you',
      intro:
        'The Cyber Resilience Act (Regulation (EU) 2024/2847) sets security rules for hardware and software sold in the EU. Most of it is about how you build and maintain a product. One part is about what happens when something goes wrong: you report it, on a clock.',
      facts: [
        {
          name: 'Who',
          text: 'Manufacturers of products with digital elements made available on the EU market.',
          ref: 'Article 2(1), Article 3(1) and (13)',
        },
        {
          name: 'What to report',
          text: 'Actively exploited vulnerabilities in your product, and severe incidents that affect its security.',
          ref: 'Article 14(1) and 14(3)',
        },
        {
          name: 'To whom',
          text: 'The CSIRT designated as coordinator and ENISA, at the same time, through the ENISA Single Reporting Platform.',
          ref: 'Article 14(1), 14(7) and Article 16',
        },
        {
          name: 'How fast',
          text: 'Without undue delay: an early warning within 24 hours of becoming aware, a notification within 72 hours, then a final report.',
          ref: 'Article 14(2) and 14(4)',
        },
      ],
      datesHeading: 'Key dates',
      // The status of each date is worked out when the site is built.
      upcoming: 'In {months} months',
      upcomingSoon: 'In less than a month',
      dates: [
        {
          date: '2024-12-10',
          label: '10 December 2024',
          done: 'In force',
          text: 'The Regulation entered into force.',
          ref: 'Article 71(1)',
        },
        {
          date: '2026-06-11',
          label: '11 June 2026',
          done: 'Applies',
          text: 'Rules for notifying conformity assessment bodies start to apply (Chapter IV, Articles 35 to 51).',
          ref: 'Article 71(2)',
        },
        {
          date: '2026-09-11',
          label: '11 September 2026',
          done: 'Applies now',
          text: 'Reporting starts. Article 14 applies from this date, also to products placed on the market before 2027.',
          ref: 'Article 71(2) and 69(3)',
        },
        {
          date: '2027-12-11',
          label: '11 December 2027',
          done: 'Applies',
          text: 'Everything else applies: essential requirements, conformity assessment and CE marking.',
          ref: 'Article 71(2)',
        },
      ],
      link: 'Calculate your reporting deadlines',
    },
    reports: {
      heading: 'Three reports, three clocks',
      intro:
        'Article 14 sets three stages. Within24 runs a clock for each one and has a draft ready before it ends. You review each draft and submit it on the ENISA Single Reporting Platform yourself.',
      due: 'Due',
      covers: 'What the report covers',
      within24: 'What Within24 does',
      stages: [
        {
          name: 'Early warning',
          due: 'Without undue delay, at the latest 24 hours after you become aware.',
          covers:
            'That it happened, and the Member States where your product is available. For incidents, whether it looks caused by an unlawful or malicious act.',
          within24:
            'Starts the clock when your engineer confirms the alert. Calls the on-call person until someone answers. Drafts the warning from the alert and the first notes.',
        },
        {
          name: 'Notification',
          due: 'Without undue delay, at the latest 72 hours after you become aware.',
          covers:
            'What is known so far, what you have done, what users can do to mitigate it, and how sensitive the information is.',
          within24:
            'Builds the incident timeline as you work: alerts, notes, status changes. Drafts the notification with a source for each statement.',
        },
        {
          name: 'Final report',
          due: 'Vulnerability: 14 days after a fix or mitigation is available. Incident: one month after you submit the notification.',
          covers:
            'A description with severity and impact. For a vulnerability: the malicious actor, if known, and the security update. For an incident: the likely root cause and the mitigation measures.',
          within24:
            'Waits for “fix available at” and starts the last clock then. Drafts the final report from the closed incident.',
        },
      ],
      users:
        'You also have to tell affected users about the issue and what they can do (Article 14(8)). Within24 drafts that message too.',
    },
    scope: {
      heading: 'Does the CRA apply to you?',
      intro:
        'It depends on what you ship, not on how big you are. Use this as a first check, then read your case against the official text.',
      shipHeading: 'If you ship',
      usuallyHeading: 'Usually',
      items: [
        {
          name: 'Mobile apps, desktop or self-hosted software',
          text: 'In scope when they can connect to a device or network, which nearly all do (Article 2(1)).',
        },
        {
          name: 'Connected devices and firmware',
          text: 'In scope. Some product categories are listed as important or critical (Annexes III and IV) and need a stricter conformity assessment (Articles 7 and 8).',
        },
        {
          name: 'SDKs and libraries',
          text: 'In scope when you supply them as part of a commercial activity, paid or free (Article 3(22)).',
        },
        {
          name: 'SaaS only',
          text: 'Not in scope on its own: cloud services fall under NIS2 instead. A backend is covered when it is remote data processing a product needs to work, like the server behind your app (Article 3(2), recital 12).',
        },
        {
          name: 'Open source with no commercial activity',
          text: 'Not in scope (recital 18). Organisations that support open source meant for commercial use have lighter duties as open-source software stewards (Article 24).',
        },
        {
          name: 'From outside the EU',
          text: 'In scope for products made available on the EU market, wherever you are based. Article 14(7) sets which CSIRT you report to.',
        },
      ],
      link: 'Check which deadlines apply to your product',
    },
    faq: {
      heading: 'Questions',
      items: [
        {
          q: 'Does the Cyber Resilience Act apply to SaaS?',
          a: 'Usually not directly. The CRA covers products with digital elements, and recital 12 points cloud services to NIS2. A cloud backend is in scope when it is remote data processing for a product you ship, such as the server an app or device needs to work (Article 3(1) and (2)).',
        },
        {
          q: 'When does CRA reporting start?',
          a: 'Reporting of actively exploited vulnerabilities and severe incidents applies from 11 September 2026. The other requirements apply from 11 December 2027.',
        },
        {
          q: 'Does CRA reporting apply to products sold before 2027?',
          a: 'Yes. The reporting obligations apply from 11 September 2026 to all products with digital elements on the market, including those placed on the market earlier (Article 69(3)).',
        },
        {
          q: 'How is this different from NIS2 and GDPR reporting?',
          a: 'Each law has its own trigger, authority and clock. NIS2 covers incidents at essential and important entities. GDPR covers personal data breaches. One incident can fall under all three, and Within24 runs their clocks side by side.',
        },
      ],
    },
    sourcesHeading: 'Sources',
    sources: [
      {
        name: 'Regulation (EU) 2024/2847 (Cyber Resilience Act), EUR-Lex',
        url: 'https://eur-lex.europa.eu/eli/reg/2024/2847/oj',
      },
    ],
    next: {
      heading: 'Work out your own deadlines',
      calculator: 'Calculate your reporting deadlines',
      earlyAccess: 'Join early access',
    },
  },
  formError: {
    invalid: {
      title: 'Please check the form',
      body: 'Some details were missing or not valid. Go back and check the email address and the other fields.',
    },
    verification: {
      title: 'We could not verify the request',
      body: 'The spam check failed. Go back and send the form again.',
    },
    unavailable: {
      title: 'Sign-up is not available right now',
      body: 'Please try again later. Nothing was saved.',
    },
    description: 'The form could not be sent.',
    backKit: 'Back to the Incident Kit',
    backPricing: 'Back to pricing',
  },
  privacy: {
    title: 'Privacy policy',
    description: 'How Within24 handles data from the calculator, analytics and the sign-up forms.',
    lastUpdated: 'Last updated',
    notYet: 'not yet published',
    placeholder: 'This section will be completed before launch.',
    sections: [
      'Who is responsible',
      'The deadline calculator',
      'Analytics',
      'Sign-up forms',
      'Service providers',
      'Transfers outside the EU',
      'How long we keep data',
      'Your rights',
      'Cookies',
      'Changes to this policy',
    ],
  },
  legal: {
    title: 'Legal notice',
    description: 'Who operates this website and how to contact them.',
    operator: 'Operator',
    country: 'Country',
    email: 'Email',
    emailPending: 'follows once the domain is set up',
  },
  calculator: {
    formHeading: 'Your incident',
    resultHeading: 'Reporting deadlines',
    events: {
      legend: 'What happened? Tick every event that applies',
      hint: 'Check these boxes yourself before you rely on the result.',
      labels: {
        'cra.actively_exploited_vulnerability':
          'CRA: actively exploited vulnerability in your product',
        'cra.severe_incident': 'CRA: severe incident affecting the security of your product',
        'nis2.significant_incident': 'NIS2: significant incident',
        'gdpr.personal_data_breach': 'GDPR: personal data breach',
      },
    },
    // Checked 2026-10-27: CRA Art. 14(1), 14(3) (the manufacturer reports), NIS2 Art. 23(1),
    // GDPR Art. 33(1) (the controller notifies). Still a rough guide, as the disclaimer says.
    helper: {
      summary: 'Not sure which boxes apply? Answer three questions',
      cra: {
        legend:
          'Are you the manufacturer of a product with digital elements sold in the EU, and is it affected?',
        no: 'No',
        vulnerability: 'Yes: a vulnerability in it is being actively exploited',
        incident: 'Yes: a severe incident affects its security',
        both: 'Yes: both',
      },
      nis2: {
        legend:
          'Is your organisation an essential or important entity under NIS2, and is this a significant incident?',
        yes: 'Yes',
        no: 'No',
      },
      gdpr: {
        legend: 'Does the incident involve a breach of personal data that you are responsible for?',
        yes: 'Yes',
        no: 'No',
      },
      apply: 'Tick the matching boxes',
      applied: 'Boxes ticked from your answers. Check them before you rely on the result.',
      appliedNone: 'Your answers match none of the boxes. Check them yourself.',
      disclaimer: 'This helper is a rough guide, not a legal assessment.',
    },
    aware: {
      label: 'Became aware at',
      readAs: 'Read as {utc}.',
      gap: 'This local time does not exist (the clocks went forward). The earlier reading is used: {utc}.',
      ambiguous:
        'This local time occurs twice (the clocks went back). The earlier one is used: {utc}.',
      required: 'Enter when you became aware of the event.',
      useNow: 'Set to the current time',
    },
    invalidDate: 'Enter a complete date and time.',
    country: {
      label: 'Reporting country',
      hint: 'Deadlines counted in months use the clock of this country ({zone}).',
    },
    displayZone: {
      label: 'Show times in',
      hint: 'Changes only how times are shown, not the deadlines.',
    },
    anchors: {
      fix_available_at: {
        label: 'First fix or mitigation available at (optional)',
        hint: 'For the CRA final report. Leave empty if there is none yet.',
      },
      notification_submitted_at: {
        label: 'Notification submitted at (optional)',
        hint: 'For the final report. Leave empty if you have not submitted it yet.',
      },
    },
    fixBeforeAware:
      'The fix is earlier than the time you became aware. Check both times: this case is not covered by the rules yet.',
    result: {
      exampleCaption: 'Example: aware at {time}.',
      liveCaption: 'Aware at {time}.',
      summary: '{country} (authority time) · times shown in {zone}',
      change: 'Change',
      unverified:
        'Rules not yet verified against the official text. Check each deadline against its source before you rely on it.',
      noEvents: 'Tick at least one event to see deadlines.',
      noAware: 'Enter when you became aware to see deadlines.',
      columns: {
        deadline: 'Deadline',
        due: 'Due',
        left: 'Time left',
        calendar: 'Calendar',
      },
      dueAuthority: 'Authority time ({country}): {time}',
      dueUtc: 'UTC: {time}',
      source: 'Source',
      overdueBy: 'Overdue by {time}',
      dueIn: 'Due in {time}',
      pending: '—',
      waiting: {
        aware_at: 'Waiting for the time you became aware.',
        fix_available_at:
          'Waiting for a fix or mitigation. Enter when the first one was available to calculate this deadline.',
        notification_submitted_at:
          'Waiting for the notification. Enter when you submitted it to calculate this deadline.',
      },
      downloadOne: 'Download .ics',
      downloadOneLabel: 'Download the {deadline} deadline as a calendar file (.ics)',
      downloadAll: 'Download all deadlines (.ics)',
      copyLink: 'Copy link to this calculation',
      copied: 'Link copied.',
      copyFallback: 'Copy this link',
      nowOverdue: '{deadline} is now overdue.',
      noscript: 'The calculator needs JavaScript. The table shows an example.',
      linkInvalid: 'Some values in the link could not be read and were skipped.',
      linkOtherRules:
        'This link was made with rules {old}. It is calculated with the current rules {current}.',
      errors: {
        unsupported_event:
          'One of the selected events has no rules under that law. Untick it to see deadlines.',
        unknown_reporting_timezone:
          'The time zone of the reporting country is not known to this browser.',
        notification_submitted_before_aware_at:
          'The notification is earlier than the time you became aware. Check both times.',
      },
    },
    timeline: {
      aware: 'Aware',
      now: 'Now',
      later: 'later',
      tick: '+{hours} h',
      lanes: {
        'cra.actively_exploited_vulnerability': 'CRA · vulnerability',
        'cra.severe_incident': 'CRA · severe incident',
        'nis2.significant_incident': 'NIS2',
        'gdpr.personal_data_breach': 'GDPR',
      },
      stages: {
        early_warning: 'Early warning',
        notification: 'Notification',
        final_report: 'Final report',
      },
      waiting: {
        aware_at: 'waiting',
        fix_available_at: 'waiting: fix',
        notification_submitted_at: 'waiting: notification',
      },
    },
    stages: {
      early_warning: 'early warning',
      notification: 'notification',
      final_report: 'final report',
    },
    eventTypes: {
      actively_exploited_vulnerability: 'Actively exploited vulnerability',
      severe_incident: 'Severe incident',
      significant_incident: 'Significant incident',
      personal_data_breach: 'Personal data breach',
    },
    ics: {
      summary: 'Deadline: {deadline}',
      due: 'Due {reporting} (authority time), {utc}.',
      source: 'Source: {url}',
      rules: 'Rules {version}.',
      disclaimer: 'Rules not yet verified against the official text.',
    },
  },
};

export type UiStrings = typeof en;
