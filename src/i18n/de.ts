// German UI strings. Only guides are translated so far, so this file overrides the labels a
// guide page shows and takes everything else from English (see fullSiteLocales in config.ts).
import { en, type UiStrings } from './en';

export const de: UiStrings = {
  ...en,
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
  breadcrumbs: { label: 'Brotkrumen-Navigation', home: 'Startseite', guides: 'Leitfäden' },
  guide: {
    ...en.guide,
    lastVerified: 'Zuletzt geprüft',
    notVerified: 'Noch nicht anhand der offiziellen Texte geprüft',
    sources: 'Quellen',
    related: 'Weitere Leitfäden (auf Englisch)',
    calculatorCta: 'Meldefristen berechnen (auf Englisch)',
    published: 'Veröffentlicht',
    updated: 'Aktualisiert',
    otherLanguage: 'Read this guide in English',
  },
};
