// UI strings. Placeholders in braces ({time}) are filled with fill() from src/i18n/index.ts.

export const en = {
  skipToContent: 'Skip to content',
  nav: {
    label: 'Main',
    calculator: 'Deadline calculator',
    guides: 'Guides',
  },
  footer: {
    rulesVersion: 'Rules {version}',
    rulesUnverified: 'not yet verified against the official texts',
    rulesVerified: 'verified {date}',
    notLegalAdvice: 'This site is not legal advice.',
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
      exampleCaption: 'Example: aware at {time}, reporting country Belgium.',
      liveCaption: 'Aware at {time}, reporting country {country}.',
      notLegalAdvice: 'This is not legal advice.',
      unverified:
        'Rules not yet verified against the official text. Check each deadline against its source before you rely on it.',
      noEvents: 'Tick at least one event to see deadlines.',
      noAware: 'Enter when you became aware to see deadlines.',
      columns: {
        deadline: 'Deadline',
        local: 'Your time',
        reporting: 'Authority time',
        utc: 'UTC',
        left: 'Time left',
        calendar: 'Calendar',
      },
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
