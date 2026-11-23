---
title: 'Déposer un rapport CRA sur la plateforme de l’ENISA'
description: 'Chaque rapport CRA obligatoire passe par la plateforme unique de déclaration de l’ENISA. Quel CSIRT reçoit le vôtre, la suite, et quoi préparer.'
slug: enisa-single-reporting-platform
locale: fr
regimes: [CRA]
datePublished: 2026-11-22
dateModified: 2026-11-22
lastVerified: 2026-10-31
sources:
  - title: Règlement (UE) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
  - title: Single Reporting Platform (SRP)
    url: https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp
    publisher: ENISA
  - title: Single Reporting Platform – frequently asked questions
    url: https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp/frequently-asked-questions
    publisher: ENISA
related: [cra-reporting-deadlines, cra-24-hour-clock, cra-what-to-report]
---

Chaque rapport CRA obligatoire passe par un seul canal : la plateforme unique de déclaration (Single Reporting Platform, SRP) gérée par l’ENISA (art. 14, paragraphe 1, et art. 16, paragraphe 1). Vous déposez auprès du CSIRT d’un État membre, et l’ENISA le voit en même temps. Déterminez quel CSIRT est le vôtre avant un incident, pas pendant.

## Quel CSIRT reçoit votre rapport

Vous utilisez le point d’accès de notification du CSIRT désigné comme coordinateur dans l’État membre de votre établissement principal dans l’UE (art. 14, paragraphe 7). C’est là que sont prises principalement les décisions relatives à la cybersécurité de vos produits. Si ce lieu ne peut pas être déterminé, c’est l’État membre où vous avez le plus de salariés dans l’UE.

Pas d’établissement dans l’UE ? Prenez le premier cas qui s’applique (art. 14, paragraphe 7) :

1. l’État où est établi votre mandataire pour le plus grand nombre de produits ;
2. l’État où est établi l’importateur qui met sur le marché le plus grand nombre de vos produits ;
3. l’État où est établi le distributeur qui met à disposition le plus grand nombre de vos produits ;
4. l’État où se trouvent la plupart de vos utilisateurs.

## Ce qui se passe après le dépôt

Le CSIRT qui reçoit le rapport le transmet via la plateforme aux CSIRT de chaque État membre où vous avez indiqué que le produit est disponible (art. 16, paragraphe 2). C’est pourquoi l’alerte précoce demande ces États membres. Vous pouvez demander que la diffusion soit retardée pour des motifs de cybersécurité justifiés, par exemple pendant une divulgation coordonnée (art. 16, paragraphe 2).

## Préparez-vous avant votre premier incident

- Décidez à quel État membre et à quel CSIRT vous notifiez, et inscrivez-le dans votre runbook.
- Tenez la liste des États membres où chaque produit est disponible.
- Gardez prêts à copier les noms des produits, leurs versions et une personne de contact.
- Configurez l’accès avant d’en avoir besoin. Le portail est portal.cra-srp.enisa.europa.eu, et chaque personne se connecte avec son propre compte EU Login avec authentification multifacteur. Un Primary Assigned Representative enregistre votre entreprise et choisit votre CSIRT, puis peut inviter jusqu’à 20 Secondary Assigned Representatives. Assurez-vous qu’au moins deux personnes peuvent se connecter.
- Le CSIRT vérifie que chaque représentant agit réellement pour votre entreprise. Vous pouvez déposer jusqu’à 20 notifications avant que cette vérification devienne obligatoire.
- Convenez de qui dépose et de qui vérifie. Au lancement, il n’y a pas d’API et la plateforme n’existe qu’en anglais : une personne saisit donc toujours le rapport dans l’interface web.

Notre [Incident Kit](/incident-kit/) gratuit contient des modèles à remplir pour les trois rapports.
