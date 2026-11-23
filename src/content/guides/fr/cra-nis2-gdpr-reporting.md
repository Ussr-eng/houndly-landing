---
title: 'CRA, NIS2 et RGPD : un incident, plusieurs délais'
description: 'Un incident de sécurité peut déclencher des délais de notification au titre du CRA, de NIS2 et du RGPD. Déclencheurs, délais et destinataires côte à côte.'
slug: cra-nis2-gdpr-reporting
locale: fr
regimes: [CRA, NIS2, GDPR]
datePublished: 2026-11-22
dateModified: 2026-11-22
lastVerified: 2026-10-27
sources:
  - title: Règlement (UE) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
  - title: Directive (UE) 2022/2555 (NIS2)
    url: https://eur-lex.europa.eu/eli/dir/2022/2555/oj
    publisher: EUR-Lex
  - title: Règlement (UE) 2016/679 (RGPD)
    url: https://eur-lex.europa.eu/eli/reg/2016/679/oj
    publisher: EUR-Lex
related: [cra-reporting-deadlines, cra-saas-scope, cra-24-hour-clock]
---

Un même incident de sécurité peut déclencher jusqu’à trois délais légaux à la fois, chacun avec son destinataire. Le CRA couvre votre produit, NIS2 votre organisation en tant qu’entité essentielle ou importante, et le RGPD les données personnelles. Chaque texte s’examine séparément ; notifier au titre de l’un ne dispense pas des autres.

NIS2 est une directive : l’obligation de notifier découle de la loi nationale de votre pays, qui transpose l’article 23. Les délais ci-dessous sont ceux que fixe la directive ; vérifiez votre loi nationale pour les détails et l’autorité destinataire.

## Côte à côte

|                  | CRA                                                                                            | NIS2                                                                                                                                   | RGPD                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Ce qui déclenche | Vulnérabilité activement exploitée ou incident grave dans votre produit (art. 14, par. 1 et 3) | Incident important : perturbation opérationnelle grave ou perte financière, ou dommages considérables à d’autres (art. 23, par. 3)     | Violation de données personnelles, sauf si elle est peu susceptible d’engendrer un risque (art. 33, par. 1)         |
| Qui notifie      | Le fabricant du produit                                                                        | L’entité essentielle ou importante (art. 23, par. 1)                                                                                   | Le responsable du traitement ; un sous-traitant prévient le responsable dans les meilleurs délais (art. 33, par. 2) |
| Premier délai    | Alerte précoce, 24 h après la prise de connaissance                                            | Alerte précoce, 24 h après la prise de connaissance (art. 23, par. 4, point a)                                                         | Notification, si possible dans les 72 h après la prise de connaissance (art. 33, par. 1)                            |
| Deuxième         | Notification, 72 h                                                                             | Notification d’incident, 72 h (art. 23, par. 4, point b)                                                                               | Les informations peuvent suivre par étapes (art. 33, par. 4)                                                        |
| Final            | 14 jours après un correctif (vulnérabilité) ; 1 mois après la notification (incident)          | 1 mois après la notification d’incident ; un rapport d’avancement si l’incident est toujours en cours (art. 23, par. 4, points d et e) | —                                                                                                                   |
| À qui            | CSIRT national et ENISA, via la plateforme unique de déclaration (art. 14, par. 7)             | CSIRT national ou autorité compétente (art. 23, par. 1)                                                                                | Autorité de contrôle compétente (art. 33, par. 1)                                                                   |

Le RGPD ajoute un point que les autres n’ont pas : une notification faite après 72 heures doit être accompagnée des motifs du retard (art. 33, paragraphe 1). Si une violation est susceptible d’engendrer un risque élevé pour les personnes, vous informez aussi les personnes concernées (art. 34).

## Un exemple concret

Un attaquant utilise une faille de la connexion de votre application mobile pour lire des comptes clients. Cela peut être :

- une vulnérabilité activement exploitée au sens du CRA, parce qu’un acteur malveillant a utilisé une faille de votre produit ;
- une violation de données personnelles au sens du RGPD, parce que des données clients ont été consultées ;
- un incident important au sens de NIS2, si votre entreprise entre dans le champ de NIS2.

Trois rapports, trois destinataires, et le premier délai est de 24 heures.

## Comment suivre

Tenez une seule chronologie de l’incident et rédigez chaque rapport à partir d’elle, pour que les faits concordent. Le [calculateur de délais](/deadlines/) montre tous les délais d’un incident sur des lignes parallèles, une par texte.
