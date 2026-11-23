// French UI strings: a full translation of en.ts. Typed as UiStrings, so a key missing here
// fails the build. Legal facts are the same as in English (articles, dates, numbers); only the
// wording is translated. Links in hrefs stay English paths: non-English pages get them rewritten
// to /fr/… at build time (src/middleware.ts).
import type { HomeModule, PrivacySection, UiStrings } from './en';

export const fr: UiStrings = {
  skipToContent: 'Aller au contenu',
  language: {
    short: 'FR',
    name: 'Français',
    switcherLabel: 'Langue',
    hint: {
      text: 'Cette page existe aussi en français.',
      link: 'Lire en français',
      close: 'Fermer',
    },
  },
  nav: {
    label: 'Navigation principale',
    home: 'Accueil',
    oncall: 'Astreinte',
    cra: 'Le CRA',
    calculator: 'Calculateur de délais',
    guides: 'Guides',
    kit: 'Incident Kit',
    pricing: 'Tarifs',
    earlyAccess: 'Accès anticipé',
  },
  footer: {
    rulesVersion: 'Règles {version}',
    rulesUnverified: 'pas encore vérifiées par rapport aux textes officiels',
    rulesVerified: 'vérifiées le {date}',
    links: 'Mentions',
    privacy: 'Confidentialité',
    legal: 'Mentions légales',
    craHeading: 'Le CRA',
    craLinks: {
      asks: 'Ce que demande le CRA',
      dates: 'Dates clés',
      reports: 'Trois rapports',
      scope: 'Êtes-vous concerné',
    },
    oncallHeading: 'Astreinte',
    oncallLinks: {
      overview: 'Comment fonctionne l’astreinte',
      rotas: 'Plannings',
      support: 'Du support au développeur',
      opsgenie: 'Alternative à Opsgenie',
    },
    toolsHeading: 'Outils',
    faq: 'FAQ',
  },
  breadcrumbs: { label: 'Fil d’Ariane', home: 'Accueil', guides: 'Guides' },
  guides: {
    title: 'Guides : notification d’incidents dans l’UE et astreinte',
    description:
      'Des guides clairs sur les délais de notification du CRA, de NIS2 et du RGPD, et sur l’astreinte dans une petite équipe. Chacun cite les textes officiels.',
    intro:
      'Ce que la loi exige quand un incident survient, et comment une petite équipe reste prête à répondre à 3 h du matin. Chaque affirmation juridique renvoie à l’article dont elle provient.',
    topics: { law: 'Notifier selon le droit de l’UE', 'on-call': 'Organiser l’astreinte' },
    faqLink: 'Réponses courtes : questions fréquentes',
  },
  guide: {
    lastVerified: 'Dernière vérification',
    notVerified: 'Pas encore vérifié par rapport aux textes officiels',
    sources: 'Sources',
    related: 'Guides liés',
    calculatorCta: 'Calculer vos délais',
    published: 'Publié',
    updated: 'Mis à jour',
    readInThisLanguage: 'Lire ce guide en français',
  },
  deadlinesPage: {
    title: 'Calculateur des délais de notification d’incidents UE',
    description:
      'Calculez les délais de notification d’incidents du CRA, de NIS2 et du RGPD dans votre fuseau horaire. Gratuit, sans inscription.',
    appName: 'Calculateur de délais {site}',
    lead: 'Indiquez quand vous avez pris connaissance d’une vulnérabilité activement exploitée ou d’un incident. Obtenez chaque délai de notification du Cyber Resilience Act (CRA), de NIS2 et du RGPD, dans votre fuseau horaire et dans celui de l’autorité.',
  },
  notFound: {
    title: 'Page introuvable',
    body: 'Cette page n’existe pas ou a été déplacée.',
    back: 'Aller au calculateur de délais',
  },
  bridge: {
    heading: 'Délais calculés. Qui se réveille à 3 h du matin ?',
    intro: 'Within24 fait tourner ces horloges pour votre équipe.',
    steps: [
      'Enregistrez l’incident une seule fois. Chaque délai légal applicable démarre.',
      'Avant chaque échéance, la personne d’astreinte est alertée jusqu’à ce que quelqu’un accuse réception.',
      'Un brouillon de chaque rapport est prêt avant son échéance.',
    ],
    link: 'Voir les offres et l’accès anticipé',
  },
  form: {
    email: 'E-mail',
    required: '(obligatoire)',
    optional: '(facultatif)',
    company: 'Entreprise',
    productType: 'Type de produit',
    productTypeNone: 'Choisir…',
    productTypes: {
      mobile: 'Application mobile',
      desktop: 'Logiciel de bureau',
      self_hosted: 'Logiciel auto-hébergé ou sur site',
      iot: 'Appareil connecté ou IoT',
      sdk: 'SDK ou bibliothèque',
      saas: 'SaaS uniquement',
      other: 'Autre',
    },
    productTypeQuestion: 'Que livrez-vous ?',
    interest: 'De quoi avez-vous besoin en premier ?',
    interests: { oncall: 'Astreinte', cra: 'Notification CRA', both: 'Les deux' },
    companySize: 'Taille de l’entreprise',
    companySizes: {
      '1-9': '1–9',
      '10-49': '10–49',
      '50-249': '50–249',
      '250+': '250+',
    },
    oncallTool: 'Astreinte aujourd’hui',
    oncallTools: {
      pagerduty: 'PagerDuty',
      opsgenie: 'Opsgenie',
      grafana_oncall: 'Grafana OnCall',
      other_tool: 'Un autre outil',
      phone_chat: 'Téléphone ou messagerie',
      nobody: 'Personne n’est d’astreinte',
    },
    sellsEu: 'Vendez-vous dans l’UE ?',
    sellsEuOptions: { yes: 'Oui', no: 'Non', unsure: 'Je ne sais pas' },
    channels: 'De quels canaux avez-vous besoin ?',
    channelsHint: '(facultatif, plusieurs choix possibles)',
    channelLabels: {
      phone_call: 'Appel téléphonique',
      sms: 'SMS',
      telegram: 'Telegram',
      email: 'E-mail',
      app_push: 'Notification push',
    },
    note: 'Autre chose ?',
    noteHint:
      'Par exemple, ce qui pèse le plus dans votre astreinte aujourd’hui. 300 caractères au maximum.',
    laws: 'Textes applicables',
    lawLabels: { CRA: 'CRA', NIS2: 'NIS2', GDPR: 'RGPD', unsure: 'Je ne sais pas' },
    honeypot: 'Laissez ce champ vide',
    sending: 'Envoi…',
    errors: {
      summary: 'Vérifiez les champs signalés.',
      required: 'Saisissez votre adresse e-mail.',
      invalid: 'Saisissez une adresse e-mail valide, par exemple nom@entreprise.fr.',
      too_long: 'C’est trop long.',
      verification:
        'Nous n’avons pas pu vérifier que cette demande vient d’une personne. Veuillez réessayer.',
      unavailable:
        'L’inscription n’est pas disponible pour le moment. Veuillez réessayer plus tard.',
      network: 'Le formulaire n’a pas pu être envoyé. Vérifiez votre connexion et réessayez.',
    },
    privacyNote:
      'Nous utilisons vos données uniquement pour ce qu’indique ce formulaire. Voir la {link}.',
    privacyLink: 'politique de confidentialité',
  },
  kit: {
    title: 'Incident Kit pour la notification d’incidents CRA',
    description:
      'Modèles des trois rapports CRA, liste de contrôle pour la plateforme de l’ENISA et runbook de la première heure d’un incident. Gratuit, par e-mail.',
    intro:
      'Modèles et listes de contrôle pour les premières heures d’un incident à notifier. Gratuit, envoyé par e-mail.',
    insideHeading: 'Contenu du kit',
    items: [
      {
        name: 'Modèles de rapports',
        text: 'Alerte précoce, notification et rapport final.',
      },
      {
        name: 'Liste de préparation',
        text: 'Pour la plateforme unique de déclaration de l’ENISA (SRP) : ce qu’il faut avoir prêt avant de déclarer.',
      },
      {
        name: 'Runbook des 60 premières minutes',
        text: 'Qui fait quoi dans la première heure après la prise de connaissance.',
      },
    ],
    formHeading: 'Recevoir le kit',
    news: 'Envoyez-moi aussi les nouveautés du produit (environ une fois par mois). Désinscription possible à tout moment.',
    submit: 'M’envoyer le kit',
    nextHeading: 'La suite',
    next: [
      'Confirmez votre adresse e-mail avec le lien que nous vous envoyons.',
      'Le kit arrive par e-mail.',
      'Nous ne partageons pas votre adresse.',
    ],
    success:
      'Presque terminé. Consultez votre boîte de réception et confirmez votre adresse e-mail pour recevoir le kit.',
    checkEmail: {
      title: 'Consultez vos e-mails',
      description: 'Confirmez votre adresse e-mail pour recevoir l’Incident Kit.',
      body: 'Nous vous avons envoyé un lien de confirmation. Ouvrez-le pour recevoir l’Incident Kit par e-mail.',
      hint: 'Rien après quelques minutes ? Vérifiez vos courriers indésirables.',
      back: 'Retour au calculateur de délais',
    },
    confirmed: {
      title: 'Adresse confirmée',
      description: 'Votre adresse e-mail est confirmée. L’Incident Kit est en route.',
      body: 'Merci. L’Incident Kit est en route vers votre boîte de réception.',
      back: 'Retour au calculateur de délais',
    },
  },
  earlyAccess: {
    title: 'Obtenir l’accès anticipé à Within24',
    description:
      'Rejoignez la liste d’accès anticipé de Within24 : rapports CRA rédigés par IA et délais légaux pour les petites équipes logicielles. Aucun paiement.',
    plansLink: 'Comparer les offres',
  },
  pricing: {
    title: 'Tarifs et accès anticipé',
    description:
      'Des offres pour les équipes qui doivent notifier à temps les incidents CRA, NIS2 et RGPD. Accès anticipé : aucun paiement n’est demandé.',
    intro:
      'Within24 est en accès anticipé. Choisissez l’offre qui vous convient et laissez votre e-mail : nous vous contactons avant le lancement, et vous décidez alors d’acheter ou non.',
    perMonth: '/ mois',
    noPayment: 'Accès anticipé. Aucun paiement n’est demandé.',
    choose: 'Choisir {plan}',
    useCalculator: 'Utiliser le calculateur',
    perTeam:
      'Les prix sont par équipe, pas par personne : Starter couvre jusqu’à {people} personnes d’astreinte pour {price} € par mois au total.',
    priceLock: 'Les équipes en accès anticipé gardent ce prix pendant 12 mois après le lancement.',
    consultant: 'Consultant avec plusieurs clients ? Dites-le-nous dans le formulaire.',
    pagerDuty:
      'Vous utilisez déjà PagerDuty ou Opsgenie ? Starter fonctionne avec : envoyez vos alertes par webhook.',
    oncallOnly:
      'Besoin uniquement d’astreinte ? Chaque offre fonctionne sans la partie CRA : les délais légaux ne démarrent que si vous marquez un incident comme à notifier.',
    recommended: 'Recommandé',
    plans: {
      free: {
        name: 'Free',
        description: 'Des outils pour savoir ce qui s’applique à vous.',
        features: ['Calculateur de délais', 'Guides'],
      },
      starter: {
        name: 'Starter',
        description: 'Pour une petite équipe produit.',
        features: [
          'Jusqu’à 5 personnes d’astreinte',
          '1 produit',
          'Webhooks d’alerte',
          'Escalade par Telegram et e-mail',
          'Import depuis Opsgenie',
          'Délais CRA, NIS2 et RGPD',
          'Brouillons IA de chaque rapport',
        ],
      },
      team: {
        name: 'Team',
        description: 'Pour les équipes avec un support et plusieurs produits.',
        features: [
          'Jusqu’à 20 personnes d’astreinte',
          'Produits illimités',
          'Appels téléphoniques',
          'Tri IA de chaque alerte',
          'Bouton « Appeler un développeur » pour le support',
          'Export d’audit',
        ],
      },
    },
    formHeading: 'Obtenir l’accès anticipé',
    formIntro:
      'Nous vous écrirons quand votre offre sera prête. Quelques clics rapides, pour que nous construisions d’abord ce qu’il faut. Aucun paiement.',
    plan: 'Offre',
    planNone: 'Pas encore décidé',
    submit: 'Rejoindre l’accès anticipé',
    success:
      'Consultez votre boîte de réception pour confirmer. Nous vous contacterons avant le lancement ; vous déciderez alors d’acheter ou non.',
    thanks: {
      title: 'Confirmez votre e-mail pour rejoindre l’accès anticipé',
      description: 'Confirmez votre adresse e-mail pour rejoindre la liste d’accès anticipé.',
      body: 'Consultez votre boîte de réception pour confirmer. Nous vous contacterons avant le lancement ; vous déciderez alors d’acheter ou non.',
      back: 'Retour aux tarifs',
    },
    confirmed: {
      title: 'Vous êtes sur la liste d’accès anticipé',
      description: 'Votre adresse e-mail est confirmée pour l’accès anticipé à Within24.',
      body: 'Merci. Nous vous contacterons avant le lancement.',
      back: 'Retour au calculateur de délais',
    },
  },
  home: {
    title: 'Astreinte et notification d’incidents UE, petites équipes',
    description:
      'Plannings, escalade et appels, import depuis Opsgenie, délais CRA, NIS2 et RGPD. Demandez à notre guide IA si Within24 convient à votre équipe.',
    heading: 'Astreinte et notification d’incidents UE pour les petites équipes logicielles',
    intro:
      'Plannings, escalade et appels téléphoniques, import depuis Opsgenie, et délais CRA, NIS2 et RGPD avec brouillons de rapports par IA. Hébergé dans l’UE.',
    primary: 'Rejoindre l’accès anticipé',
    secondary: 'Calculer vos délais de notification',
    status: 'Accès anticipé : nous construisons Within24 en ce moment.',
    guide: {
      label: 'Décrivez votre problème. Voyez en quelques secondes si nous le résolvons.',
      hint: 'Entrée pour envoyer. Maj+Entrée pour aller à la ligne.',
      examples: [
        'Nous quittons Opsgenie avant avril et avons besoin d’appels la nuit',
        'Le support n’a aucun moyen de réveiller un développeur',
        'Nous vendons un appareil dans l’UE. Que devons-nous notifier au titre du CRA ?',
        'Une tempête d’alertes réveille trois personnes à la fois',
      ],
      button: 'Demander au guide IA',
      buttonBusy: 'L’IA répond',
      tryLabel: 'Essayez :',
      chips: [
        {
          label: 'Quitter Opsgenie',
          text: 'Nous sommes 8 ingénieurs et quittons Opsgenie avant avril. Il nous faut des plannings, de l’escalade et des appels téléphoniques.',
        },
        {
          label: 'Notification CRA',
          text: 'Nous vendons un appareil connecté dans l’UE et devons notifier des vulnérabilités au titre du CRA.',
        },
        {
          label: 'Le support doit joindre un développeur',
          text: 'Notre équipe support a besoin d’un moyen d’appeler le développeur d’astreinte la nuit.',
        },
      ],
      thinking: 'Nous comparons votre problème à chaque module',
      verdicts: {
        fits: 'Convient',
        partly: 'Convient en partie',
        not_yet: 'Pas encore',
        not_for_us: 'Hors de notre activité',
        off_topic: 'Hors sujet',
      },
      offTopic:
        'Je ne réponds qu’à une question : Within24 peut-il résoudre votre problème. Décrivez ce dont votre équipe a besoin, par exemple comment vous êtes réveillé la nuit ou quels rapports vous devez déposer.',
      statuses: {
        available: 'Disponible',
        building: 'En construction',
        next: 'Bientôt',
        not_planned: 'Pas prévu',
        unknown: 'Nous demanderons à l’équipe',
      },
      emailLabel: 'Recevoir l’analyse complète par e-mail',
      emailHint: 'Quelle offre convient, quoi configurer en premier et ce qui manque encore.',
      emailPlaceholder: 'vous@entreprise.fr',
      emailButton: 'M’envoyer l’analyse',
      emailSending: 'Envoi…',
      consent:
        'Nous envoyons l’analyse tout de suite. La première fois, un second e-mail vous demande de confirmer votre place en accès anticipé.',
      privacy: 'Politique de confidentialité',
      sent: {
        heading: 'Consultez votre boîte de réception.',
        text: 'L’analyse complète est en route.',
      },
      again: 'Poser une autre question',
      left: 'Vous pouvez poser jusqu’à {max} questions par jour. Il vous en reste {left} aujourd’hui.',
      lastOne:
        'Vous pouvez poser jusqu’à {max} questions par jour. C’était la dernière pour aujourd’hui.',
      errors: {
        short: 'Décrivez d’abord votre problème en quelques mots.',
        email: 'Saisissez une adresse e-mail valide.',
        network: 'Pas de connexion. Vérifiez votre accès à Internet et réessayez.',
        robot:
          'Nous n’avons pas pu confirmer que vous n’êtes pas un robot. Rechargez la page et réessayez.',
        tooMany: 'Vous pouvez poser jusqu’à 5 questions par jour. Revenez demain.',
        expired: 'Cette réponse a expiré. Posez à nouveau votre question.',
        already: 'Nous avons déjà envoyé cette analyse. Consultez votre boîte de réception.',
        unavailable:
          'Le guide IA n’est pas disponible pour le moment. Veuillez réessayer plus tard.',
      },
    },
    modules: {
      heading: 'Ce que fait Within24',
      headingAnswered: 'Ce qui couvre votre problème',
      note: 'Chaque carte indique si le module fonctionne aujourd’hui, est en construction ou arrive ensuite.',
      swipe: 'Faites glisser pour tout voir',
      fit: 'Répond à votre problème',
      items: [
        {
          id: 'oncall',
          title: 'Réveiller la bonne personne',
          text: 'Plannings, escalade et appels jusqu’à ce que quelqu’un appuie sur « Je m’en occupe ».',
          tag: 'En bêta',
          tone: 'ok',
          href: '/on-call/',
          link: 'Comment fonctionne l’astreinte',
        },
        {
          id: 'alerts',
          title: 'Un problème, un incident',
          text: 'Les alertes de Grafana, Prometheus ou de tout webhook, regroupées en un seul incident.',
          tag: 'En bêta',
          tone: 'ok',
        },
        {
          id: 'opsgenie',
          title: 'Quitter Opsgenie',
          text: 'Reprenez plannings, politiques d’escalade et intégrations avant la fermeture d’Opsgenie.',
          tag: 'En construction',
          tone: 'build',
          href: '/opsgenie-alternative/',
          link: 'Alternative à Opsgenie',
        },
        {
          id: 'report',
          title: 'Notifier à temps',
          text: 'Délais CRA, NIS2 et RGPD avec brouillons de rapports par IA. Le calculateur de délais est déjà gratuit.',
          tag: 'Outils gratuits',
          tone: 'free',
          href: '/deadlines/',
          link: 'Calculer les délais',
        },
        {
          id: 'customers',
          title: 'Informer les clients touchés',
          text: 'Qui utilise le produit touché, une page de statut et un bouton « Appeler un développeur ».',
          tag: 'Bientôt',
          tone: 'next',
        },
        {
          id: 'team',
          title: 'Une astreinte équitable',
          text: 'Heures de nuit et de week-end pour la paie, et statistiques d’incidents.',
          tag: 'Bientôt',
          tone: 'next',
        },
      ] as HomeModule[],
    },
    example: {
      caption:
        'Exemple d’incident : Sam a pris la main 4 minutes après l’alerte, et les trois délais CRA courent depuis 9 heures.',
      badge: 'Exemple',
      id: 'INC-0412',
      name: 'Vulnérabilité activement exploitée',
      status: 'Délais en cours',
      oncall: {
        label: 'Astreinte',
        events: [
          {
            time: '03:12',
            text: 'Alerte Sentry : tentatives d’exploitation sur l’API de connexion',
          },
          { time: '03:13', text: 'Appel à Sam, d’astreinte cette semaine' },
          { time: '03:16', text: 'Sam : « Je m’en occupe »' },
        ],
      },
      clocksLabel: 'Délais CRA',
      axis: ['sam. 03:12', '+24 h', '+48 h', '+72 h'],
      now: 'Maintenant',
      lanes: {
        earlyWarning: 'Alerte précoce',
        earlyWarningValue: 'reste 14:47:12',
        notification: 'Notification',
        notificationValue: 'Échéance mar. 03:12',
        finalReport: 'Rapport final',
        finalReportValue: 'En attente de « correctif disponible le »',
      },
      draft: 'Brouillon d’alerte précoce prêt : 9 affirmations, 9 sources',
    },
    how: {
      heading: 'Comment ça marche',
      steps: [
        {
          name: 'Une alerte peut être à notifier',
          text: 'Un webhook arrive de PagerDuty, Opsgenie, Grafana ou Sentry. L’IA signale les alertes qui semblent à notifier au titre du CRA, de NIS2 ou du RGPD.',
        },
        {
          name: 'Les délais légaux démarrent',
          text: 'Votre ingénieur confirme, et les minuteurs de 24 heures, de 72 heures et du rapport final démarrent au moment où vous avez pris connaissance de l’incident.',
        },
        {
          name: 'Quelqu’un est réveillé pour agir',
          text: 'Appel, Telegram et e-mail, avec escalade dans le planning jusqu’à ce que quelqu’un appuie sur « Je m’en occupe ».',
        },
        {
          name: 'Chaque rapport est préparé',
          text: 'Avant chaque échéance, un brouillon est prêt à partir de la chronologie de l’incident, avec une source pour chaque affirmation. Vous le modifiez et le déposez vous-même sur la plateforme unique de déclaration de l’ENISA.',
        },
      ],
    },
    pricing: {
      heading: 'Tarifs',
      intro:
        'Prix de l’accès anticipé. Choisissez une offre pour rejoindre la liste ; aucun paiement n’est demandé.',
      more: 'En savoir plus sur les offres',
    },
    trust: {
      heading: 'Ce sur quoi vous pouvez compter',
      items: [
        {
          name: 'Conçu par un ingénieur d’astreinte',
          text: 'Notre fondateur a passé deux ans d’astreinte pour une plateforme de support client. Within24 est conçu pour les alertes de 3 h du matin de ces années-là.',
        },
        {
          name: 'Une personne décide toujours',
          text: 'Within24 ne dépose jamais rien auprès de l’ENISA et ne vous dit jamais qu’un rapport n’est pas nécessaire.',
        },
        {
          name: 'Chaque réponse a une source',
          text: 'Numéros d’articles et liens vers les textes officiels. Quand il n’y a pas de source, nous disons que ce n’est pas clair.',
        },
        {
          name: 'Le minimum de données',
          text: 'Aucun cookie de suivi. Nous ne conservons votre e-mail qu’avec votre consentement.',
        },
      ],
      privacy: 'Lire la politique de confidentialité',
    },
    faq: {
      heading: 'Questions',
      items: [
        {
          q: 'Déposez-vous les rapports auprès de l’ENISA à notre place ?',
          a: 'Non. La plateforme unique de déclaration de l’ENISA n’a pas d’API, et la décision de notifier reste à une personne. Within24 réveille la bonne personne et prépare le texte.',
        },
        {
          q: 'Quelles données l’IA voit-elle ?',
          a: 'Seulement ce que vous lui envoyez : le contenu des alertes et la chronologie de l’incident. Les données personnelles sont masquées avant d’atteindre le modèle, et l’IA ne décide jamais seule.',
        },
        {
          q: 'Nous utilisons déjà PagerDuty. Faut-il changer ?',
          a: 'Non. Envoyez vos alertes à Within24 par webhook. PagerDuty continue de réveiller votre équipe ; Within24 ajoute les délais légaux et les brouillons de rapports.',
        },
        {
          q: 'Nous quittons Opsgenie. Peut-on utiliser Within24 sans la partie CRA ?',
          a: 'Oui. Les délais légaux ne démarrent que si vous marquez un incident comme à notifier.',
        },
        {
          q: 'Quand pourrai-je l’utiliser ?',
          a: 'Nous construisons le cœur du produit en ce moment et accueillerons les équipes en accès anticipé par petits groupes.',
        },
      ],
    },
  },
  faqPage: {
    title: 'Notification CRA et astreinte : questions fréquentes',
    description:
      'Réponses courtes : à qui s’applique le CRA, ses délais de 24 h, 72 h et du rapport final, son articulation avec NIS2 et le RGPD, et l’astreinte.',
    intro:
      'Des réponses courtes, chacune avec l’article dont elle provient et un guide qui va plus loin.',
    verified:
      'Dernière vérification : 27 octobre 2026, par rapport aux textes du règlement (UE) 2024/2847, de la directive (UE) 2022/2555 et du règlement (UE) 2016/679.',
    more: 'Lire le guide',
    productHeading: 'À propos de Within24',
    groups: [
      {
        id: 'scope',
        heading: 'Le CRA s’applique-t-il à moi ?',
        items: [
          {
            q: 'Le Cyber Resilience Act s’applique-t-il au SaaS ?',
            a: 'En général pas directement : le considérant 12 renvoie le SaaS, le PaaS et l’IaaS à NIS2. Un backend cloud est couvert lorsqu’il constitue la solution de traitement de données à distance d’un produit que vous livrez, comme le serveur dont votre application ou votre appareil a besoin pour fonctionner (art. 3, points 1 et 2).',
            link: '/guides/cra-saas-scope/',
          },
          {
            q: 'S’applique-t-il aux logiciels gratuits ou open source ?',
            a: 'Seulement aux logiciels fournis dans le cadre d’une activité commerciale (considérant 18). Faire payer le produit, facturer un support au-delà des coûts ou monétiser par son intermédiaire peut être considéré comme commercial (considérant 15). Les stewards de logiciels open source ont des obligations allégées et ne reçoivent pas d’amende au titre du CRA (art. 24, art. 64, paragraphe 10, point b).',
          },
          {
            q: 'Nous ne sommes pas établis dans l’UE. Est-ce que cela s’applique ?',
            a: 'Oui, si votre produit est mis à disposition sur le marché de l’UE (art. 2, paragraphe 1). Vous notifiez quand même via la plateforme unique de déclaration de l’ENISA, au CSIRT désigné selon l’ordre de l’art. 14, paragraphe 7 : le pays de votre mandataire, puis celui de votre importateur, puis celui de votre distributeur, puis celui où se trouvent la plupart de vos utilisateurs.',
          },
          {
            q: 'L’obligation de notifier vaut-elle pour les produits vendus avant décembre 2027 ?',
            a: 'Oui. L’obligation de notification de l’article 14 s’applique à tous les produits couverts, y compris ceux mis sur le marché avant le 11 décembre 2027 (art. 69, paragraphe 3).',
          },
          {
            q: 'Qui doit notifier : nous ou notre client ?',
            a: 'Le fabricant : celui qui développe le produit ou le fait développer, et le commercialise sous son propre nom ou sa propre marque (art. 3, point 13, art. 14, paragraphe 1).',
          },
        ],
      },
      {
        id: 'deadlines',
        heading: 'Délais et rapports',
        items: [
          {
            q: 'Quels sont les délais de notification du CRA ?',
            a: 'Une alerte précoce dans les 24 heures suivant la prise de connaissance, une notification dans les 72 heures, puis un rapport final : 14 jours après la mise à disposition d’un correctif pour une vulnérabilité, ou un mois après la notification pour un incident (art. 14, paragraphes 2 et 4).',
            link: '/guides/cra-reporting-deadlines/',
          },
          {
            q: 'Quand le délai de 24 heures commence-t-il ?',
            a: 'Lorsque vous prenez connaissance de la vulnérabilité activement exploitée ou de l’incident grave (art. 14, paragraphe 2, point a). Le règlement ne définit pas ce moment : retenez le plus tôt que vous pourriez défendre.',
            link: '/guides/cra-24-hour-clock/',
          },
          {
            q: 'Les week-ends ou jours fériés suspendent-ils le délai ?',
            a: 'Non. Les limites de 24 et 72 heures se comptent en heures, et l’article 14 ne prévoit aucune prolongation pour les nuits, les week-ends ou les jours fériés. Nous traitons de la même façon les limites de 14 jours et d’un mois et ne les prolongeons jamais.',
          },
          {
            q: 'Et si notre correctif prend plus de 14 jours ?',
            a: 'Les 14 jours du rapport final sur une vulnérabilité ne commencent qu’une fois qu’une mesure corrective ou d’atténuation est disponible (art. 14, paragraphe 2, point c). D’ici là, il n’y a pas de date de rapport final, mais l’alerte précoce et la notification restent dues.',
          },
          {
            q: 'Un chercheur nous a signalé une vulnérabilité. Devons-nous la notifier ?',
            a: 'Pas en tant que vulnérabilité activement exploitée, s’il n’existe aucune preuve qu’un acteur malveillant l’a utilisée (art. 3, point 42, considérant 68). Vous pouvez la notifier volontairement (art. 15).',
            link: '/guides/cra-what-to-report/',
          },
          {
            q: 'L’autorité peut-elle demander davantage après notre dépôt ?',
            a: 'Oui. Le CSIRT qui reçoit votre rapport peut demander un rapport intermédiaire sur l’évolution de la situation (art. 14, paragraphe 6).',
          },
          {
            q: 'Devons-nous aussi informer nos utilisateurs ?',
            a: 'Oui. Après la prise de connaissance, informez les utilisateurs touchés et, le cas échéant, tous les utilisateurs, et indiquez ce qu’ils peuvent faire pour réduire l’impact (art. 14, paragraphe 8).',
          },
          {
            q: 'Que se passe-t-il si nous notifions en retard ?',
            a: 'Le non-respect des obligations de l’article 14 peut entraîner une amende allant jusqu’à 15 millions d’EUR ou 2,5 % du chiffre d’affaires annuel mondial, le montant le plus élevé étant retenu (art. 64, paragraphe 2). Les microentreprises et petites entreprises ne reçoivent pas d’amende pour une alerte précoce de 24 heures manquée (art. 64, paragraphe 10, point a).',
          },
        ],
      },
      {
        id: 'laws',
        heading: 'CRA, NIS2 et RGPD ensemble',
        items: [
          {
            q: 'En quoi la notification CRA diffère-t-elle de NIS2 et du RGPD ?',
            a: 'Chaque texte a son propre déclencheur, son destinataire et son délai. Le CRA couvre votre produit, NIS2 le service de votre organisation, le RGPD les données personnelles. Un même incident peut relever des trois.',
            link: '/guides/cra-nis2-gdpr-reporting/',
          },
          {
            q: 'NIS2 s’applique-t-elle à nous ?',
            a: 'NIS2 couvre les entités des secteurs énumérés dans ses annexes I et II, dont les fournisseurs de services d’informatique en nuage, qui sont de taille moyenne ou plus grandes (NIS2, art. 2, paragraphe 1). Certains types sont couverts quelle que soit leur taille (art. 2, paragraphe 2). La loi nationale de votre pays fixe les détails.',
          },
          {
            q: 'Un seul rapport peut-il couvrir le CRA, NIS2 et le RGPD ?',
            a: 'Non. Chacun va à un destinataire différent : le rapport CRA au CSIRT et à l’ENISA via la plateforme unique de déclaration (CRA, art. 14, paragraphe 7), NIS2 au CSIRT national ou à l’autorité compétente (NIS2, art. 23, paragraphe 1), le RGPD à l’autorité de protection des données (RGPD, art. 33, paragraphe 1). Rédigez-les à partir d’une seule chronologie de l’incident pour que les faits concordent.',
          },
          {
            q: 'Quel est le délai RGPD pour une violation de données ?',
            a: 'Si possible, 72 heures après en avoir pris connaissance, sauf si la violation n’est pas susceptible d’engendrer un risque pour les personnes. Une notification plus tardive doit être accompagnée des motifs du retard (RGPD, art. 33, paragraphe 1).',
          },
        ],
      },
      {
        id: 'on-call',
        heading: 'Organiser l’astreinte',
        items: [
          {
            q: 'Combien de personnes faut-il pour l’astreinte ?',
            a: 'À trois, chacun est d’astreinte une semaine sur trois : cela fonctionne, mais c’est lourd ; à partir de cinq, c’est tenable. Une personne principale, une en renfort, des tours hebdomadaires, une passation pendant les heures de travail.',
            link: '/guides/on-call-rotation-small-team/',
          },
          {
            q: 'Qui réveiller si l’ingénieur d’astreinte ne répond pas ?',
            a: 'Écrivez une politique d’escalade avant d’en avoir besoin : par exemple la personne principale par téléphone après 5 minutes, le renfort après 15, le responsable technique après 30.',
            link: '/guides/escalation-policy/',
          },
          {
            q: 'Notre support peut-il réveiller un développeur ?',
            a: 'Il devrait disposer d’un bouton ou d’un numéro qui joint toujours la personne d’astreinte du moment, et de l’autorisation de s’en servir. Un client qui dit « je vois les données de quelqu’un d’autre » peut déclencher un délai légal.',
            link: '/guides/support-to-developer-escalation/',
          },
        ],
      },
    ],
  },
  oncall: {
    title: 'Astreinte pour petites équipes, délais UE intégrés',
    description:
      'Plannings, escalade, appels et bouton « Appeler un développeur » pour le support. Fonctionne avec PagerDuty ou remplace Opsgenie. Accès anticipé.',
    breadcrumb: 'Astreinte',
    heading: 'Une astreinte qui réveille la bonne personne',
    intro:
      'Pour les équipes de 3 à 20 ingénieurs. Les alertes arrivent par webhook, et Within24 appelle la personne d’astreinte et remonte le planning jusqu’à ce que quelqu’un appuie sur « Je m’en occupe ».',
    status: 'Accès anticipé : nous construisons Within24 en ce moment.',
    primary: 'Rejoindre l’accès anticipé',
    sections: [
      {
        id: 'alerts',
        heading: 'Comment une alerte atteint une personne',
        text: 'Un webhook arrive de Grafana, Sentry, New Relic, PagerDuty ou Opsgenie. Within24 envoie d’abord un message Telegram et un e-mail, puis appelle si personne ne répond (appels sur l’offre Team). Après un délai défini, il passe à la personne suivante.',
        links: [
          {
            label: 'Politique d’escalade pour petites équipes',
            href: '/guides/escalation-policy/',
          },
        ],
      },
      {
        id: 'rotas',
        heading: 'Des plannings qu’une petite équipe peut tenir',
        text: 'Un roulement hebdomadaire, une personne en renfort et des échanges quand quelqu’un est absent.',
        links: [
          {
            label: 'Roulement d’astreinte pour petites équipes',
            href: '/guides/on-call-rotation-small-team/',
          },
        ],
      },
      {
        id: 'support',
        heading: 'Le support peut réveiller un développeur',
        text: 'Le support dispose d’un bouton « Appeler un développeur » : aucune règle d’alerte à écrire et aucun numéro à chercher.',
        links: [
          {
            label: 'Comment le support peut joindre le développeur d’astreinte',
            href: '/guides/support-to-developer-escalation/',
          },
        ],
      },
      {
        id: 'opsgenie',
        heading: 'Quitter Opsgenie',
        text: 'Importez vos plannings et règles d’escalade sur toute offre payante, faites tourner les deux outils en parallèle pendant une semaine, puis basculez.',
        links: [
          { label: 'Within24, alternative à Opsgenie', href: '/opsgenie-alternative/' },
          {
            label: 'Fin du support d’Opsgenie : dates et plan de migration en une semaine',
            href: '/guides/opsgenie-migration/',
          },
        ],
      },
      {
        id: 'legal',
        heading: 'Quand un incident est aussi juridique',
        text: 'Marquez un incident comme à notifier et les délais CRA, NIS2 et RGPD démarrent au moment où vous en avez pris connaissance. D’ici là, une alerte n’est qu’une alerte.',
        links: [
          { label: 'Ce que le CRA vous demande', href: '/cra/' },
          { label: 'Calculer vos délais de notification', href: '/deadlines/' },
        ],
      },
    ],
    pricing: {
      heading: 'Tarifs',
      intro:
        'Prix de l’accès anticipé. Choisissez une offre pour rejoindre la liste ; aucun paiement n’est demandé.',
    },
    next: {
      heading: 'Une astreinte qui connaît les délais légaux',
      text: 'Nous vous contacterons avant le lancement ; vous déciderez alors d’acheter ou non.',
    },
  },
  opsgenieAlt: {
    title: 'Alternative à Opsgenie pour petites équipes',
    description:
      'Opsgenie ferme le 5 avril 2027. Within24, c’est l’astreinte pour les équipes de 3 à 20 : plannings, escalade, un prix par équipe, hébergé dans l’UE.',
    breadcrumb: 'Alternative à Opsgenie',
    heading: 'Une alternative à Opsgenie pour les petites équipes',
    intro:
      'Opsgenie ferme le 5 avril 2027. Within24, c’est l’astreinte pour les équipes de 3 à 20 personnes : un planning hebdomadaire, une escalade jusqu’à ce que quelqu’un appuie sur « Je m’en occupe », et un seul prix pour toute l’équipe.',
    primary: 'Rejoindre l’accès anticipé',
    status:
      'Accès anticipé : nous construisons Within24 en ce moment. Rejoignez la liste et dites-nous quels canaux doivent vous réveiller.',
    keep: {
      heading: 'Ce que vous gardez d’Opsgenie',
      columns: { from: 'Dans Opsgenie', to: 'Dans Within24' },
      rows: [
        {
          from: 'Plannings et rotations',
          to: 'Un planning hebdomadaire, une personne en renfort, des échanges en cas d’absence',
        },
        {
          from: 'Politiques d’escalade',
          to: 'Des étapes avec une personne, un planning ou une équipe, et un délai entre elles',
        },
        {
          from: 'Intégrations',
          to: 'Un webhook d’alerte pour Grafana, Sentry, New Relic et tout ce qui sait envoyer du HTTP',
        },
        {
          from: 'Notifications',
          to: 'Telegram et e-mail sur toutes les offres, appels sur l’offre Team',
        },
        { from: 'Acknowledge', to: 'Un bouton « Je m’en occupe » qui arrête l’escalade' },
      ],
    },
    sections: [
      {
        id: 'left-out',
        heading: 'Ce que nous laissons de côté',
        text: 'Pas d’application mobile, pas de SMS, pas de heartbeats ni de catalogue de services. Une petite équipe s’en sert rarement. Si vous en dépendez, Jira Service Management ou un outil plus grand vous conviendra mieux.',
        links: [],
      },
      {
        id: 'price',
        heading: 'Un seul prix pour l’équipe',
        text: 'Starter couvre jusqu’à 5 personnes d’astreinte pour 29 € par mois au total. Team couvre jusqu’à 20 personnes pour 99 €. Vous ne payez pas par personne. Les équipes en accès anticipé gardent ce prix pendant 12 mois après le lancement.',
        links: [{ label: 'Comparer les offres', href: '/pricing/' }],
      },
      {
        id: 'move',
        heading: 'Migrer en une semaine',
        text: 'Importez vos plannings et règles d’escalade, envoyez vos alertes aux deux outils pendant une semaine, testez le scénario de 3 h du matin avec la vraie personne d’astreinte, puis éteignez Opsgenie.',
        links: [
          {
            label: 'Fin du support d’Opsgenie : dates et plan de migration en une semaine',
            href: '/guides/opsgenie-migration/',
          },
        ],
      },
      {
        id: 'eu',
        heading: 'Hébergé dans l’UE',
        text: 'Within24 tourne sur des serveurs dans l’UE. Les alertes, les plannings et l’historique des incidents y restent.',
        links: [],
      },
      {
        id: 'legal',
        heading: 'Si vous vendez des logiciels dans l’UE',
        text: 'Marquez un incident comme à notifier et les délais CRA, NIS2 et RGPD démarrent à côté des appels. D’ici là, une alerte n’est qu’une alerte.',
        links: [
          { label: 'Ce que le CRA vous demande', href: '/cra/' },
          { label: 'Calculer vos délais de notification', href: '/deadlines/' },
        ],
      },
    ],
    form: {
      heading: 'Dites-nous ce qui doit vous réveiller',
      text: 'Nous vous écrirons quand l’astreinte sera prête à être essayée. Aucun paiement.',
    },
  },
  cra: {
    title: 'Cyber Resilience Act : quoi notifier et quand',
    description:
      'Ce que le Cyber Resilience Act exige quand un incident survient : qui notifie, à qui, les délais de 24 h, 72 h et du rapport final, et les dates clés.',
    breadcrumb: 'Le CRA',
    verified:
      'Dernière vérification : 25 octobre 2026, par rapport au texte publié au Journal officiel le 20 novembre 2024.',
    asks: {
      heading: 'Ce que le Cyber Resilience Act vous demande',
      intro:
        'Le Cyber Resilience Act (règlement (UE) 2024/2847) fixe des règles de sécurité pour le matériel et les logiciels vendus dans l’UE. L’essentiel porte sur la façon de concevoir et de maintenir un produit. Une partie concerne ce qui se passe quand un incident survient : vous le notifiez, dans un délai fixé.',
      facts: [
        {
          name: 'Qui',
          text: 'Les fabricants de produits comportant des éléments numériques mis à disposition sur le marché de l’UE.',
          ref: 'Article 2, paragraphe 1, article 3, points 1 et 13',
        },
        {
          name: 'Quoi notifier',
          text: 'Les vulnérabilités activement exploitées dans votre produit, et les incidents graves ayant un impact sur sa sécurité.',
          ref: 'Article 14, paragraphes 1 et 3',
        },
        {
          name: 'À qui',
          text: 'Au CSIRT désigné comme coordinateur et à l’ENISA, simultanément, via la plateforme unique de déclaration de l’ENISA.',
          ref: 'Article 14, paragraphes 1 et 7, et article 16',
        },
        {
          name: 'En combien de temps',
          text: 'Sans retard injustifié : une alerte précoce dans les 24 heures suivant la prise de connaissance, une notification dans les 72 heures, puis un rapport final.',
          ref: 'Article 14, paragraphes 2 et 4',
        },
      ],
      datesHeading: 'Dates clés',
      upcoming: 'Dans {months} mois',
      upcomingSoon: 'Dans moins d’un mois',
      dates: [
        {
          date: '2024-12-10',
          label: '10 décembre 2024',
          done: 'En vigueur',
          text: 'Le règlement est entré en vigueur.',
          ref: 'Article 71, paragraphe 1',
        },
        {
          date: '2026-06-11',
          label: '11 juin 2026',
          done: 'Applicable',
          text: 'Les règles de notification des organismes d’évaluation de la conformité commencent à s’appliquer (chapitre IV, articles 35 à 51).',
          ref: 'Article 71, paragraphe 2',
        },
        {
          date: '2026-09-11',
          label: '11 septembre 2026',
          done: 'Applicable aujourd’hui',
          text: 'La notification commence. L’article 14 s’applique à partir de cette date, y compris aux produits mis sur le marché avant 2027.',
          ref: 'Article 71, paragraphe 2, et article 69, paragraphe 3',
        },
        {
          date: '2027-12-11',
          label: '11 décembre 2027',
          done: 'Applicable',
          text: 'Tout le reste s’applique : exigences essentielles, évaluation de la conformité et marquage CE.',
          ref: 'Article 71, paragraphe 2',
        },
      ],
      link: 'Calculer vos délais de notification',
    },
    reports: {
      heading: 'Trois rapports, trois délais',
      intro:
        'L’article 14 prévoit trois étapes. Within24 fait tourner un délai pour chacune et prépare un brouillon avant son échéance. Vous relisez chaque brouillon et le déposez vous-même sur la plateforme unique de déclaration de l’ENISA.',
      due: 'Échéance',
      covers: 'Contenu du rapport',
      within24: 'Ce que fait Within24',
      stages: [
        {
          name: 'Alerte précoce',
          due: 'Sans retard injustifié, au plus tard 24 heures après la prise de connaissance.',
          covers:
            'Le fait que cela s’est produit, et les États membres où votre produit est disponible. Pour les incidents, s’il semble causé par un acte illicite ou malveillant.',
          within24:
            'Démarre le délai quand votre ingénieur confirme l’alerte. Appelle la personne d’astreinte jusqu’à ce que quelqu’un réponde. Rédige l’alerte à partir de l’alerte technique et des premières notes.',
        },
        {
          name: 'Notification',
          due: 'Sans retard injustifié, au plus tard 72 heures après la prise de connaissance.',
          covers:
            'Ce que l’on sait à ce stade, ce que vous avez fait, ce que les utilisateurs peuvent faire pour atténuer le problème, et le degré de sensibilité des informations.',
          within24:
            'Construit la chronologie de l’incident pendant que vous travaillez : alertes, notes, changements de statut. Rédige la notification avec une source pour chaque affirmation.',
        },
        {
          name: 'Rapport final',
          due: 'Vulnérabilité : 14 jours après la mise à disposition d’un correctif ou d’une mesure d’atténuation. Incident : un mois après le dépôt de la notification.',
          covers:
            'Une description avec la gravité et l’impact. Pour une vulnérabilité : l’acteur malveillant, s’il est connu, et la mise à jour de sécurité. Pour un incident : la cause profonde probable et les mesures d’atténuation.',
          within24:
            'Attend « correctif disponible le » et démarre alors le dernier délai. Rédige le rapport final à partir de l’incident clôturé.',
        },
      ],
      users:
        'Vous devez aussi informer les utilisateurs touchés du problème et de ce qu’ils peuvent faire (article 14, paragraphe 8). Within24 rédige aussi ce message.',
    },
    scope: {
      heading: 'Le CRA s’applique-t-il à vous ?',
      intro:
        'Cela dépend de ce que vous livrez, pas de votre taille. Servez-vous de ceci comme premier contrôle, puis confrontez votre cas au texte officiel.',
      shipHeading: 'Si vous livrez',
      usuallyHeading: 'En général',
      items: [
        {
          name: 'Applications mobiles, logiciels de bureau ou auto-hébergés',
          text: 'Couverts lorsqu’ils peuvent se connecter à un appareil ou à un réseau, ce qui est presque toujours le cas (article 2, paragraphe 1).',
        },
        {
          name: 'Appareils connectés et micrologiciels',
          text: 'Couverts. Certaines catégories de produits sont classées importantes ou critiques (annexes III et IV) et exigent une évaluation de la conformité plus stricte (articles 7 et 8).',
        },
        {
          name: 'SDK et bibliothèques',
          text: 'Couverts lorsque vous les fournissez dans le cadre d’une activité commerciale, payante ou gratuite (article 3, point 22).',
        },
        {
          name: 'SaaS uniquement',
          text: 'Non couvert à lui seul : les services cloud relèvent plutôt de NIS2. Un backend est couvert lorsqu’il constitue le traitement de données à distance dont un produit a besoin pour fonctionner, comme le serveur derrière votre application (article 3, point 2, considérant 12).',
        },
        {
          name: 'Open source sans activité commerciale',
          text: 'Non couvert (considérant 18). Les organisations qui soutiennent des logiciels open source destinés à un usage commercial ont des obligations allégées en tant que stewards de logiciels open source (article 24).',
        },
        {
          name: 'Depuis l’extérieur de l’UE',
          text: 'Couvert pour les produits mis à disposition sur le marché de l’UE, où que vous soyez établi. L’article 14, paragraphe 7, désigne le CSIRT auquel vous notifiez.',
        },
      ],
      link: 'Vérifier quels délais s’appliquent à votre produit',
    },
    faq: {
      heading: 'Questions',
      items: [
        {
          q: 'Le Cyber Resilience Act s’applique-t-il au SaaS ?',
          a: 'En général pas directement. Le CRA couvre les produits comportant des éléments numériques, et le considérant 12 renvoie les services cloud à NIS2. Un backend cloud est couvert lorsqu’il constitue le traitement de données à distance d’un produit que vous livrez, comme le serveur dont une application ou un appareil a besoin pour fonctionner (article 3, points 1 et 2).',
        },
        {
          q: 'Quand la notification CRA commence-t-elle ?',
          a: 'La notification des vulnérabilités activement exploitées et des incidents graves s’applique à partir du 11 septembre 2026. Les autres exigences s’appliquent à partir du 11 décembre 2027.',
        },
        {
          q: 'La notification CRA vaut-elle pour les produits vendus avant 2027 ?',
          a: 'Oui. Les obligations de notification s’appliquent à partir du 11 septembre 2026 à tous les produits comportant des éléments numériques sur le marché, y compris ceux mis sur le marché plus tôt (article 69, paragraphe 3).',
        },
        {
          q: 'En quoi est-ce différent de la notification NIS2 et RGPD ?',
          a: 'Chaque texte a son propre déclencheur, son autorité et son délai. NIS2 couvre les incidents des entités essentielles et importantes. Le RGPD couvre les violations de données personnelles. Un même incident peut relever des trois, et Within24 fait tourner leurs délais côte à côte.',
        },
      ],
    },
    sourcesHeading: 'Sources',
    sources: [
      {
        name: 'Règlement (UE) 2024/2847 (Cyber Resilience Act), EUR-Lex',
        url: 'https://eur-lex.europa.eu/eli/reg/2024/2847/oj',
      },
    ],
    next: {
      heading: 'Calculez vos propres délais',
      calculator: 'Calculer vos délais de notification',
      earlyAccess: 'Rejoindre l’accès anticipé',
    },
  },
  formError: {
    invalid: {
      title: 'Vérifiez le formulaire',
      body: 'Certaines informations manquaient ou n’étaient pas valides. Revenez en arrière et vérifiez l’adresse e-mail et les autres champs.',
    },
    verification: {
      title: 'Nous n’avons pas pu vérifier la demande',
      body: 'Le contrôle anti-spam a échoué. Revenez en arrière et renvoyez le formulaire.',
    },
    unavailable: {
      title: 'L’inscription n’est pas disponible pour le moment',
      body: 'Veuillez réessayer plus tard. Rien n’a été enregistré.',
    },
    description: 'Le formulaire n’a pas pu être envoyé.',
    backKit: 'Retour à l’Incident Kit',
    backPricing: 'Retour aux tarifs',
  },
  craCheck: {
    launcher: 'Le CRA s’applique-t-il à vous ?',
    launcherOpen: 'Ouvrir la vérification CRA',
    hideLauncher: 'Masquer',
    title: 'Vérification CRA',
    subtitle: 'IA, réponses tirées du texte de loi',
    close: 'Fermer la vérification CRA',
    restart: 'Recommencer',
    stepOf: 'étape {n} sur 4',
    stepDone: 'terminé',
    stepsLabel: 'Étapes',
    steps: ['E-mail', 'Produit', 'Réponse', 'Votre problème'],
    you: 'Vous',
    greeting:
      'Bonjour. Je vérifie si le Cyber Resilience Act de l’UE s’applique à votre produit et je cite les articles qui fondent la réponse.',
    askEmail:
      'D’abord, votre e-mail professionnel. Nous l’utilisons pour donner suite à votre vérification et vous prévenir quand Within24 sera prêt.',
    askEmailSmall: 'Vous confirmez l’adresse par e-mail. Désinscription possible à tout moment.',
    emailLabel: 'E-mail professionnel',
    emailPlaceholder: 'vous@entreprise.fr',
    continue: 'Continuer',
    askProduct:
      'Merci. Décrivez maintenant votre produit : ce qu’il fait, qui l’utilise et comment il se connecte. Une ou deux phrases suffisent.',
    productLabel: 'Décrivez votre produit',
    productPlaceholder: 'Une caméra Wi-Fi avec une application mobile…',
    examples: [
      {
        label: 'Serrure connectée',
        text: 'Nous fabriquons une serrure connectée. Les gens l’ouvrent avec notre application mobile, et l’application communique avec la serrure via notre propre cloud.',
      },
      {
        label: 'SaaS de gestion de projet',
        text: 'Une application web de gestion de projet. Les clients l’utilisent dans le navigateur ; il n’y a rien à installer.',
      },
      {
        label: 'Nous faisons une app',
        text: 'Nous faisons une application mobile que les gens installent depuis l’App Store et Google Play.',
      },
    ],
    answerLabel: 'Votre réponse',
    answerPlaceholder: 'Votre réponse',
    questionsLeft: 'Je peux poser au plus {n} questions de plus.',
    send: 'Envoyer',
    thinking: 'Vérification',
    thinkingSteps: [
      'Lecture du champ d’application et des exclusions',
      'Comparaison avec les catégories des annexes III et IV',
      'Contrôle de chaque article par rapport au texte',
    ],
    verdicts: {
      in_scope: 'Oui, le CRA s’applique',
      out_of_scope: 'Non, le CRA ne s’applique pas',
      depends: 'Cela dépend',
      off_topic: 'Cette vérification ne porte que sur le CRA',
    },
    categories: {
      default: 'Catégorie par défaut',
      important_class_i: 'Produit important, classe I',
      important_class_ii: 'Produit important, classe II',
      critical: 'Produit critique',
    },
    clocks: {
      intro: 'Si une vulnérabilité de ce produit est activement exploitée, vous notifiez :',
      lanes: ['Alerte précoce', 'Notification', 'Rapport final'],
      caption: '24 h · 72 h · 14 jours après le correctif',
      link: 'Calculer vos dates',
    },
    copy: 'Copier la réponse',
    copied: 'Copié',
    askPain:
      'Une dernière question. Qu’est-ce qui est le plus difficile pour vous en ce moment dans la notification CRA ou la réponse aux incidents ?',
    askPainSmall:
      'Votre réponse va directement à l’équipe. Nous construisons ensuite ce que les gens nous disent ici.',
    pains: {
      which_reports: 'Nous ne savons pas quels rapports nous devons',
      reports_take_long: 'Rédiger les rapports prend trop de temps',
      nobody_watches_clock: 'Personne ne surveille les délais la nuit',
      wrong_person_woken: 'Les alertes de nuit réveillent la mauvaise personne',
      customers_ask_cra: 'Nos clients nous interrogent sur le CRA',
      other: 'Écrire ma réponse',
    },
    painLabel: 'Votre plus gros problème',
    painPlaceholder: 'Dites-le avec vos mots',
    thanks:
      'Merci. Nous lisons chaque réponse. Si beaucoup d’équipes citent le même problème, nous le traitons en premier.',
    checkInbox: 'Consultez votre boîte de réception et confirmez votre adresse.',
    earlyAccess: 'Obtenir l’accès anticipé',
    footnote: 'Nous conservons ce que vous écrivez ici pour améliorer Within24.',
    privacy: 'Politique de confidentialité',
    source: 'Les réponses citent le règlement (UE) 2024/2847.',
    errors: {
      email: 'Cela ne ressemble pas à une adresse e-mail.',
      robot:
        'Nous n’avons pas pu confirmer que vous n’êtes pas un robot. Rechargez la page et réessayez.',
      tooMany: 'Trop de vérifications depuis votre réseau. Veuillez réessayer dans une heure.',
      expired: 'Cette vérification a expiré. Recommencez pour en lancer une nouvelle.',
      unavailable:
        'La vérification n’est pas disponible pour le moment. Veuillez réessayer dans quelques minutes.',
      network: 'Pas de connexion. Vérifiez votre réseau et réessayez.',
    },
  },
  privacy: {
    title: 'Politique de confidentialité',
    description:
      'Quelles données personnelles Within24 collecte, pourquoi, quels prestataires les traitent, combien de temps nous les gardons et comment exercer vos droits.',
    lastUpdated: 'Dernière mise à jour',
    updatedOn: '23 novembre 2026',
    translationNote:
      'Ceci est une traduction. En cas de divergence avec la version anglaise, la version anglaise prévaut.',
    intro:
      'Cette politique explique quelles données personnelles Within24 collecte sur within24.app, pourquoi, et ce que vous pouvez faire à ce sujet. Lire le site et utiliser le calculateur ne nécessitent aucune donnée personnelle. Nous ne collectons votre e-mail que lorsque vous envoyez l’un de nos formulaires, utilisez la vérification CRA ou demandez l’analyse complète du guide IA. Cette politique couvre aussi le chat d’aide de notre application web (app.within24.app).',
    sections: [
      {
        heading: 'Qui est responsable',
        blocks: [
          {
            p: 'Within24 est exploité par une société privée immatriculée dans l’Union européenne. Cette société est le responsable du traitement des données personnelles décrites ici. Pour toute question sur cette politique ou sur vos données, écrivez à [hello@within24.app](mailto:hello@within24.app).',
          },
        ],
      },
      {
        heading: 'Ce que nous collectons et pourquoi',
        blocks: [
          {
            table: {
              head: ['Où', 'Ce que nous recevons', 'Pourquoi'],
              rows: [
                [
                  'Calculateur de délais',
                  'Rien. Il fonctionne dans votre navigateur. Les heures que vous saisissez restent dans l’adresse de la page pour que vous puissiez copier le lien ; nous ne les recevons jamais.',
                  'Pour afficher vos délais.',
                ],
                [
                  'Mesure d’audience (Umami)',
                  'Les pages vues et des événements anonymes, comme « calculateur utilisé » ou « offre choisie », le site d’origine, le type de navigateur et d’appareil, et le pays. Votre adresse IP est utilisée brièvement pour compter les visiteurs uniques et estimer le pays ; elle n’est pas conservée dans les données de mesure. Aucun cookie.',
                  'Pour voir quelles pages aident les gens et quelles offres les intéressent.',
                ],
                [
                  'Formulaire Incident Kit',
                  'E-mail (obligatoire). Facultatif : entreprise, type de produit, textes applicables.',
                  'Pour vous envoyer le kit après confirmation de votre e-mail.',
                ],
                [
                  'Formulaire d’accès anticipé',
                  'E-mail (obligatoire). Réponses facultatives : ce dont vous avez besoin en premier, ce que vous livrez, la taille de l’entreprise, votre outil d’astreinte actuel, si vous vendez dans l’UE, les canaux d’alerte dont vous avez besoin, l’offre choisie, une note libre.',
                  'Pour vous inviter quand le produit sera prêt, et savoir quoi construire en premier.',
                ],
                [
                  'Vérification CRA (le chat dans le coin de la page)',
                  'E-mail (obligatoire), la description du produit et les réponses que vous saisissez, la réponse donnée par l’IA, le problème que vous citez à la fin, la page où vous l’avez utilisée et l’heure.',
                  'Pour répondre à la question de savoir si le CRA s’applique à votre produit, pour vous recontacter par e-mail une fois votre adresse confirmée, et pour décider quoi construire ensuite.',
                ],
                [
                  'Guide IA (le champ en haut de la page d’accueil)',
                  'Le problème que vous décrivez, la réponse donnée par l’IA, la page où vous l’avez utilisé et l’heure. Uniquement si vous demandez l’analyse complète : votre e-mail et l’analyse que nous envoyons.',
                  'Pour répondre à la question de savoir si Within24 convient à votre problème, pour vous envoyer par e-mail l’analyse complète que vous demandez, et pour décider quoi construire ensuite.',
                ],
                [
                  'Chat d’aide de l’application web (app.within24.app)',
                  'L’e-mail de votre compte et votre espace de travail, les messages que vous écrivez, les images que vous joignez (réenregistrées sans localisation, données d’appareil photo ni autres détails du fichier), les réponses de l’IA, la page d’où vous écrivez, la langue de l’application et l’heure.',
                  'Pour répondre à votre question, permettre à l’équipe de corriger ce que vous signalez et de vous répondre par e-mail, et décider quoi construire ensuite.',
                ],
                [
                  'Les deux formulaires',
                  'L’heure de votre inscription, le formulaire utilisé et la page d’où vous venez, la version du texte de consentement, et si vous avez demandé des nouvelles occasionnelles.',
                  'Pour prouver votre consentement et respecter vos choix.',
                ],
                [
                  'Contrôle anti-robot (Cloudflare Turnstile)',
                  'Votre adresse IP, votre empreinte TLS et l’agent utilisateur de votre navigateur, traités par Cloudflare.',
                  'Pour tenir le spam à l’écart des formulaires.',
                ],
                [
                  'Hébergement (Cloudflare Pages)',
                  'Les données techniques de chaque requête, comme l’adresse IP et le navigateur, traitées par Cloudflare.',
                  'Pour diffuser le site et le protéger des attaques.',
                ],
              ],
            },
          },
          {
            p: 'Nous ne vendons pas vos données et nous ne les utilisons pas à des fins publicitaires.',
          },
        ],
      },
      {
        heading: 'Bases légales',
        blocks: [
          {
            ul: [
              'Formulaires et e-mails : votre consentement (RGPD, article 6, paragraphe 1, point a), donné lorsque vous envoyez le formulaire et confirmez votre e-mail. Vous pouvez le retirer à tout moment avec le lien de désinscription présent dans chaque e-mail ou en nous écrivant.',
              'Vérification CRA : nous traitons ce que vous saisissez pour vous donner la réponse que vous demandez (RGPD, article 6, paragraphe 1, point b). Les e-mails après la vérification reposent sur votre consentement, donné lorsque vous confirmez votre adresse.',
              'Guide IA : nous traitons ce que vous saisissez, et votre e-mail lorsque vous demandez l’analyse complète, pour vous donner la réponse que vous demandez (RGPD, article 6, paragraphe 1, point b). Les e-mails d’accès anticipé reposent sur votre consentement, donné lorsque vous confirmez votre adresse.',
              'Chat d’aide de l’application web : nous traitons vos messages et vos images pour vous répondre et vous assister dans le service que vous utilisez (RGPD, article 6, paragraphe 1, point b).',
              'Mesure d’audience, contrôle anti-robot et hébergement : notre intérêt légitime (RGPD, article 6, paragraphe 1, point f) à exploiter un site sûr et à savoir quelles pages sont utiles. Nous avons choisi une mesure d’audience sans cookies pour limiter l’atteinte à votre vie privée.',
            ],
          },
        ],
      },
      {
        heading: 'Prestataires',
        blocks: [
          {
            p: 'Ces prestataires traitent des données pour notre compte. Personne d’autre ne les reçoit.',
          },
          {
            table: {
              head: ['Prestataire', 'Ce qu’il fait', 'Où', 'Ses conditions'],
              rows: [
                [
                  'Brevo SAS',
                  'Conserve les inscriptions aux formulaires et envoie les e-mails de confirmation, du kit et de l’analyse',
                  'Société en France ; peut transférer des données vers les États-Unis et l’Inde',
                  '[Politique de confidentialité de Brevo](https://www.brevo.com/legal/privacypolicy/)',
                ],
                [
                  'Cloudflare, Inc.',
                  'Héberge le site (Pages) et effectue le contrôle anti-robot (Turnstile)',
                  'Réseau mondial ; société aux États-Unis',
                  '[Politique de confidentialité de Cloudflare](https://www.cloudflare.com/privacypolicy/), [Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/)',
                ],
                [
                  'Anthropic, PBC',
                  'Rédige les réponses de la vérification CRA, du guide IA et du chat d’aide de l’application web à partir de ce que vous saisissez et des images que vous joignez (modèle d’IA)',
                  'Société aux États-Unis',
                  '[Politique de confidentialité d’Anthropic](https://www.anthropic.com/legal/privacy)',
                ],
                [
                  'Hetzner Online GmbH',
                  'Héberge notre serveur d’API et la base de données de la vérification CRA, du guide IA et du chat d’aide',
                  'Société en Allemagne ; notre serveur est dans l’UE (Allemagne ou Finlande)',
                  '[Politique de confidentialité de Hetzner](https://www.hetzner.com/legal/privacy-policy/)',
                ],
                [
                  'Umami Software, Inc.',
                  'Mesure d’audience sans cookies',
                  'UE et États-Unis',
                  '[Politique de confidentialité d’Umami](https://umami.is/privacy)',
                ],
              ],
            },
          },
        ],
      },
      {
        heading: 'Transferts hors de l’UE',
        blocks: [
          {
            p: 'Certains prestataires traitent des données aux États-Unis ou ailleurs hors de l’UE. Cloudflare s’appuie sur le cadre de protection des données UE–États-Unis (Data Privacy Framework) et, à défaut, sur les clauses contractuelles types de la Commission européenne. Pour Brevo, Anthropic et Umami, les garanties sont décrites dans leurs politiques de confidentialité et leurs conditions de traitement des données.',
          },
        ],
      },
      {
        heading: 'Durée de conservation',
        blocks: [
          {
            ul: [
              'Inscriptions confirmées : jusqu’à votre désinscription ou votre demande de suppression. À la fermeture de la liste d’accès anticipé, nous supprimons les réponses dont nous n’avons plus besoin.',
              'Vérification CRA : ce que vous saisissez, les réponses et votre e-mail sont supprimés 24 mois après votre dernière utilisation de la vérification, ou plus tôt sur demande.',
              'Guide IA : ce que vous saisissez et les réponses sont supprimés 24 mois après votre question, ou plus tôt sur demande.',
              'Chat d’aide : vos messages, les réponses et les images jointes sont supprimés 24 mois après le dernier message de la conversation, ou plus tôt sur demande. Les images jamais envoyées sont supprimées au bout d’un jour.',
              'Mesure d’audience : conservée sous forme de statistiques agrégées.',
              'Données d’hébergement et du contrôle anti-robot : conservées par Cloudflare pendant les durées prévues dans ses propres conditions.',
            ],
          },
        ],
      },
      {
        heading: 'Vos droits',
        blocks: [
          {
            p: 'Vous pouvez nous demander d’accéder aux données que nous détenons sur vous, de les rectifier, de les supprimer ou de les exporter. Vous pouvez aussi vous opposer à un traitement fondé sur notre intérêt légitime, ou retirer votre consentement à tout moment. Le retrait du consentement n’affecte pas les traitements effectués auparavant.',
          },
          {
            p: 'Écrivez à [hello@within24.app](mailto:hello@within24.app) ; nous répondons dans un délai d’un mois. Vous pouvez aussi introduire une réclamation auprès d’une autorité de protection des données, notamment dans le pays de l’UE où vous vivez ou travaillez, ou là où vous pensez que le problème s’est produit (RGPD, article 77).',
          },
        ],
      },
      {
        heading: 'Cookies',
        blocks: [
          {
            p: 'Within24 ne dépose aucun cookie et n’enregistre rien dans le stockage local de votre navigateur. L’outil de mesure d’audience fonctionne sans cookies, il n’y a donc pas de bannière cookies. Lorsqu’un formulaire se charge, le contrôle anti-robot de Cloudflare peut déposer des cookies de sécurité strictement nécessaires, décrits dans la [liste des cookies de Cloudflare](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/).',
          },
        ],
      },
      {
        heading: 'Modifications de cette politique',
        blocks: [
          {
            p: 'Lorsque nous changeons notre façon de traiter les données, nous mettons à jour cette page et sa date. Si un changement touche ce que vous avez accepté, nous vous écrivons avant qu’il ne s’applique.',
          },
        ],
      },
    ] as PrivacySection[],
  },
  legal: {
    title: 'Mentions légales',
    description: 'Qui exploite ce site et comment le contacter.',
    operator: 'Éditeur',
    companyGeneral: 'Une société privée immatriculée dans l’Union européenne',
    countryGeneral: 'Union européenne',
    country: 'Pays',
    email: 'E-mail',
    emailPending: 'communiqué une fois le domaine configuré',
    translationNote:
      'Ceci est une traduction. En cas de divergence avec la version anglaise, la version anglaise prévaut.',
  },
  calculator: {
    deadlineName: '{stage} {regime}',
    formHeading: 'Votre incident',
    resultHeading: 'Délais de notification',
    events: {
      legend: 'Que s’est-il passé ? Cochez chaque événement qui s’applique',
      hint: 'Vérifiez vous-même ces cases avant de vous fier au résultat.',
      labels: {
        'cra.actively_exploited_vulnerability':
          'CRA : vulnérabilité activement exploitée dans votre produit',
        'cra.severe_incident':
          'CRA : incident grave ayant un impact sur la sécurité de votre produit',
        'nis2.significant_incident': 'NIS2 : incident important',
        'gdpr.personal_data_breach': 'RGPD : violation de données à caractère personnel',
      },
    },
    helper: {
      summary: 'Vous ne savez pas quelles cases cocher ? Répondez à trois questions',
      cra: {
        legend:
          'Êtes-vous le fabricant d’un produit comportant des éléments numériques vendu dans l’UE, et ce produit est-il touché ?',
        no: 'Non',
        vulnerability: 'Oui : une vulnérabilité de ce produit est activement exploitée',
        incident: 'Oui : un incident grave a un impact sur sa sécurité',
        both: 'Oui : les deux',
      },
      nis2: {
        legend:
          'Votre organisation est-elle une entité essentielle ou importante au sens de NIS2, et s’agit-il d’un incident important ?',
        yes: 'Oui',
        no: 'Non',
      },
      gdpr: {
        legend:
          'L’incident implique-t-il une violation de données personnelles dont vous êtes responsable ?',
        yes: 'Oui',
        no: 'Non',
      },
      apply: 'Cocher les cases correspondantes',
      applied: 'Cases cochées d’après vos réponses. Vérifiez-les avant de vous fier au résultat.',
      appliedNone: 'Vos réponses ne correspondent à aucune case. Vérifiez vous-même.',
    },
    aware: {
      label: 'Pris connaissance le',
      readAs: 'Lu comme {utc}.',
      gap: 'Cette heure locale n’existe pas (passage à l’heure d’été). La lecture la plus tôt est utilisée : {utc}.',
      ambiguous:
        'Cette heure locale existe deux fois (passage à l’heure d’hiver). La plus tôt est utilisée : {utc}.',
      required: 'Indiquez quand vous avez pris connaissance de l’événement.',
      useNow: 'Mettre l’heure actuelle',
    },
    invalidDate: 'Saisissez une date et une heure complètes.',
    country: {
      label: 'Pays de notification',
      hint: 'Les délais comptés en mois utilisent l’heure de ce pays ({zone}).',
    },
    countryNames: {
      AT: 'Autriche',
      BE: 'Belgique',
      BG: 'Bulgarie',
      HR: 'Croatie',
      CY: 'Chypre',
      CZ: 'Tchéquie',
      DK: 'Danemark',
      EE: 'Estonie',
      FI: 'Finlande',
      FR: 'France',
      DE: 'Allemagne',
      GR: 'Grèce',
      HU: 'Hongrie',
      IE: 'Irlande',
      IT: 'Italie',
      LV: 'Lettonie',
      LT: 'Lituanie',
      LU: 'Luxembourg',
      MT: 'Malte',
      NL: 'Pays-Bas',
      PL: 'Pologne',
      PT: 'Portugal',
      RO: 'Roumanie',
      SK: 'Slovaquie',
      SI: 'Slovénie',
      ES: 'Espagne',
      SE: 'Suède',
    } as Record<string, string>,
    displayZone: {
      label: 'Afficher les heures en',
      hint: 'Change seulement l’affichage des heures, pas les délais.',
    },
    anchors: {
      fix_available_at: {
        label: 'Premier correctif ou mesure d’atténuation disponible le (facultatif)',
        hint: 'Pour le rapport final CRA. Laissez vide s’il n’y en a pas encore.',
      },
      notification_submitted_at: {
        label: 'Notification déposée le (facultatif)',
        hint: 'Pour le rapport final. Laissez vide si vous ne l’avez pas encore déposée.',
      },
    },
    fixBeforeAware:
      'Le correctif est antérieur au moment de la prise de connaissance. Vérifiez les deux heures : ce cas n’est pas encore couvert par les règles.',
    result: {
      exampleCaption: 'Exemple : connaissance prise le {time}.',
      liveCaption: 'Connaissance prise le {time}.',
      summary: '{country} (heure de l’autorité) · heures affichées en {zone}',
      change: 'Modifier',
      unverified:
        'Règles pas encore vérifiées par rapport au texte officiel. Vérifiez chaque délai par rapport à sa source avant de vous y fier.',
      noEvents: 'Cochez au moins un événement pour voir les délais.',
      noAware: 'Indiquez quand vous avez pris connaissance pour voir les délais.',
      columns: {
        deadline: 'Délai',
        due: 'Échéance',
        left: 'Temps restant',
        calendar: 'Calendrier',
      },
      dueAuthority: 'Heure de l’autorité ({country}) : {time}',
      dueUtc: 'UTC : {time}',
      source: 'Source',
      overdueBy: 'En retard de {time}',
      dueIn: 'Échéance dans {time}',
      pending: '—',
      waiting: {
        aware_at: 'En attente du moment de la prise de connaissance.',
        fix_available_at:
          'En attente d’un correctif ou d’une mesure d’atténuation. Indiquez quand le premier était disponible pour calculer ce délai.',
        notification_submitted_at:
          'En attente de la notification. Indiquez quand vous l’avez déposée pour calculer ce délai.',
      },
      downloadOne: 'Télécharger .ics',
      downloadOneLabel: 'Télécharger le délai « {deadline} » comme fichier de calendrier (.ics)',
      downloadAll: 'Télécharger tous les délais (.ics)',
      copyLink: 'Copier le lien vers ce calcul',
      copied: 'Lien copié.',
      copyFallback: 'Copiez ce lien',
      nowOverdue: 'Le délai « {deadline} » est maintenant dépassé.',
      noscript: 'Le calculateur a besoin de JavaScript. Le tableau montre un exemple.',
      linkInvalid: 'Certaines valeurs du lien n’ont pas pu être lues et ont été ignorées.',
      linkOtherRules:
        'Ce lien a été créé avec les règles {old}. Il est calculé avec les règles actuelles {current}.',
      errors: {
        unsupported_event:
          'L’un des événements choisis n’a pas de règles dans ce texte. Décochez-le pour voir les délais.',
        unknown_reporting_timezone:
          'Le fuseau horaire du pays de notification n’est pas connu de ce navigateur.',
        notification_submitted_before_aware_at:
          'La notification est antérieure au moment de la prise de connaissance. Vérifiez les deux heures.',
      },
    },
    timeline: {
      aware: 'Connaissance',
      now: 'Maintenant',
      later: 'plus tard',
      tick: '+{hours} h',
      lanes: {
        'cra.actively_exploited_vulnerability': 'CRA · vulnérabilité',
        'cra.severe_incident': 'CRA · incident grave',
        'nis2.significant_incident': 'NIS2',
        'gdpr.personal_data_breach': 'RGPD',
      },
      stages: {
        early_warning: 'Alerte précoce',
        notification: 'Notification',
        final_report: 'Rapport final',
      },
      waiting: {
        aware_at: 'en attente',
        fix_available_at: 'en attente : correctif',
        notification_submitted_at: 'en attente : notification',
      },
    },
    stages: {
      early_warning: 'alerte précoce',
      notification: 'notification',
      final_report: 'rapport final',
    },
    eventTypes: {
      actively_exploited_vulnerability: 'Vulnérabilité activement exploitée',
      severe_incident: 'Incident grave',
      significant_incident: 'Incident important',
      personal_data_breach: 'Violation de données personnelles',
    },
    ics: {
      summary: 'Délai : {deadline}',
      due: 'Échéance {reporting} (heure de l’autorité), {utc}.',
      source: 'Source : {url}',
      rules: 'Règles {version}.',
      disclaimer: 'Règles pas encore vérifiées par rapport au texte officiel.',
    },
  },
};
