---
title: 'Fin d’Opsgenie : dates et migration en une semaine'
description: 'Le support d’Opsgenie s’arrête le 5 avril 2027. Dates clés et migration en une semaine pour une petite équipe : inventaire, double run, test de nuit.'
slug: opsgenie-migration
locale: fr
regimes: [CRA]
topic: on-call
datePublished: 2026-11-22
dateModified: 2026-11-22
lastVerified: 2026-11-16
sources:
  - title: Opsgenie migration to Jira Service Management
    url: https://www.atlassian.com/software/opsgenie/migration
    publisher: Atlassian
  - title: Règlement (UE) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [on-call-rotation-small-team, escalation-policy, support-to-developer-escalation]
---

Atlassian ferme Opsgenie et transfère ses clients vers Jira Service Management. Le support s’arrête le 5 avril 2027. Une petite équipe peut migrer en une semaine si elle commence par un inventaire, pas par une démo commerciale.

## Les dates de fin de support d’Opsgenie

- **4 juin 2025, fin de commercialisation.** Depuis cette date, vous ne pouvez plus changer d’édition d’Opsgenie ni ajouter de sites. Vous pouvez encore acheter des licences supplémentaires jusqu’à la fin du support.
- **5 avril 2027, fin du support.** Opsgenie est fermé et n’est plus accessible. Toutes les données que vous n’avez pas déplacées sont supprimées.

Atlassian appelle la seconde date « end of support ». Vous la verrez aussi appelée fin de vie d’Opsgenie, ou EOL. C’est le même jour.

## Étape 1. Inventoriez ce qu’Opsgenie fait pour vous aujourd’hui

- Plannings et rotations : qui, quelles heures, quels fuseaux horaires, quelles exceptions.
- Politiques d’escalade : qui est alerté après combien de minutes.
- Intégrations : quels outils envoient des alertes (Grafana, Sentry, CloudWatch, Datadog, e-mail).
- Canaux de notification sur lesquels chaque personne compte : push, SMS, appel.
- Heartbeats et fenêtres de maintenance, si vous les utilisez.

Exportez les plannings avant de perdre l’accès.

## Étape 2. Décidez de ce dont vous avez vraiment besoin

La plupart des petites équipes n’utilisent qu’une fraction d’Opsgenie. Notez l’indispensable : un appel qui réveille quelqu’un, une escalade vers une deuxième personne, un roulement hebdomadaire et un bouton « Je m’en occupe ». Voir [roulement d’astreinte pour petites équipes](/guides/on-call-rotation-small-team/).

## Étape 3. Faites tourner les deux en parallèle pendant une semaine

Branchez chaque intégration sur les deux outils. Comparez quelles alertes arrivent, à quelle vitesse, et qui est réveillé. N’éteignez Opsgenie qu’après une semaine sans différence.

## Étape 4. Testez le scénario de 3 h du matin

Déclenchez une alerte de test la nuit avec la vraie personne d’astreinte. Vérifiez que le téléphone sonne vraiment, et que l’[escalade](/guides/escalation-policy/) atteint la deuxième personne si personne ne répond.

## Si vous développez des logiciels vendus dans l’UE

La migration est un bon moment pour ajouter les délais légaux. Au titre du Cyber Resilience Act, une vulnérabilité activement exploitée déclenche un délai de notification de 24 heures (art. 14, paragraphe 2, point a). Nous construisons Within24 pour importer vos plannings Opsgenie et faire tourner ces délais à côté des alertes. Voir [Within24, alternative à Opsgenie pour petites équipes](/opsgenie-alternative/).
