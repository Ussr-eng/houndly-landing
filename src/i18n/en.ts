// UI strings. Placeholders in braces ({time}) are filled with fill() from src/i18n/index.ts.

export const en = {
  skipToContent: 'Skip to content',
  nav: {
    label: 'Main',
    home: 'Home',
    calculator: 'Deadline calculator',
    guides: 'Guides',
    kit: 'Incident Kit',
    pricing: 'Pricing',
  },
  footer: {
    rulesVersion: 'Rules {version}',
    rulesUnverified: 'not yet verified against the official texts',
    rulesVerified: 'verified {date}',
    notLegalAdvice: 'This site is not legal advice.',
    notAffiliated: 'Not affiliated with ENISA or the European Commission.',
    links: 'Legal',
    privacy: 'Privacy',
    legal: 'Legal notice',
  },
  breadcrumbs: { label: 'Breadcrumb', home: 'Home', guides: 'Guides' },
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
    title: 'Incident Kit for CRA, NIS2 and GDPR reporting',
    description:
      'Report templates and checklists for the first hours of a reportable incident under CRA, NIS2 and GDPR. Free, sent to your inbox.',
    intro:
      'Templates and checklists for the first hours of a reportable incident. Free, sent to your inbox.',
    insideHeading: "What's inside",
    // TODO(content): descriptions follow when the kit content is supplied.
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
    eyebrow: 'CRA incident reporting for small software teams',
    heading: 'File every CRA report on time, with the draft already written.',
    intro:
      'When an alert may be a reportable CRA incident, Within24 starts the 24-hour, 72-hour and final-report clocks, wakes whoever is on call, and drafts each report for the ENISA Single Reporting Platform with a source for every statement. You review it and submit.',
    primary: 'Calculate your reporting deadlines',
    secondary: 'Join early access',
    status:
      'Early access: we are building Within24 now. Not legal advice. Not affiliated with ENISA.',
    pain: {
      heading: 'The alert does not wait for Monday',
      items: [
        '3:12 a.m., Saturday. An alert fires. Is it just downtime, or an actively exploited vulnerability?',
        'Under the CRA, the 24-hour early warning counts from when you become aware, not from Monday morning.',
        'Small teams have the same obligation as large ones, without a security team to own it.',
      ],
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
      ],
      // TODO(verify): Opsgenie end-of-life date before launch.
      opsgenie: 'Moving off Opsgenie before April 2027? Bring your schedules with you.',
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
          q: 'Does the Cyber Resilience Act apply to SaaS?',
          // TODO(verify): wording against the CRA scope articles and the Commission guidance.
          a: 'Often not directly: the CRA covers products with digital elements. A cloud service can be in scope as remote data processing for such a product, and software you ship to customers usually is. Check your own case against the official text.',
        },
        {
          q: 'When does CRA reporting start?',
          a: 'Reporting of actively exploited vulnerabilities and severe incidents applies from 11 September 2026. The other requirements apply from 11 December 2027.',
        },
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
    // TODO(verify): every helper question is a rough legal qualification. Review the wording
    // against the official texts before launch.
    helper: {
      summary: 'Not sure which boxes apply? Answer three questions',
      cra: {
        legend:
          'Do you make or sell a product with digital elements in the EU, and is it affected?',
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
        legend: 'Does the incident involve a breach of personal data?',
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
      notLegalAdvice: 'This is not legal advice.',
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
      disclaimer: 'Not legal advice. Rules not yet verified against the official text.',
    },
  },
};

export type UiStrings = typeof en;
