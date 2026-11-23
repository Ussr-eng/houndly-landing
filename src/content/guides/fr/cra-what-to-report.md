---
title: 'CRA : quelle vulnérabilité ou quel incident notifier'
description: 'Le CRA rend deux types d’événements à notifier : une vulnérabilité activement exploitée et un incident grave. Leur sens, des exemples et un tri rapide.'
slug: cra-what-to-report
locale: fr
regimes: [CRA]
datePublished: 2026-11-22
dateModified: 2026-11-22
lastVerified: 2026-10-27
sources:
  - title: Règlement (UE) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [cra-reporting-deadlines, cra-24-hour-clock, cra-saas-scope]
---

Le CRA rend deux types d’événements à notifier : une vulnérabilité activement exploitée dans votre produit, et un incident grave ayant un impact sur sa sécurité (art. 14, paragraphes 1 et 3). Un bogue ordinaire, une panne ou une vulnérabilité que personne n’a exploitée ne figurent pas sur la liste obligatoire.

## Vulnérabilité activement exploitée

Une vulnérabilité pour laquelle il existe des éléments de preuve fiables qu’un acteur malveillant l’a exploitée dans un système sans l’autorisation du propriétaire du système (art. 3, point 42).

- **À notifier :** les journaux montrent qu’un attaquant a utilisé une faille d’authentification de votre produit pour entrer dans le compte d’un client.
- **Pas d’obligation de notifier :** un chercheur en sécurité trouve la même faille et vous la signale de bonne foi. Le considérant 68 indique que les vulnérabilités découvertes sans intention malveillante, à des fins de tests de bonne foi, ne devraient pas faire l’objet d’une notification obligatoire. Vous pouvez quand même notifier volontairement (art. 15).

## Incident grave

Un incident ayant un impact sur la sécurité du produit est grave lorsque (art. 14, paragraphe 5) :

- il a ou peut avoir un effet négatif sur la capacité du produit à protéger la disponibilité, l’authenticité, l’intégrité ou la confidentialité de données ou de fonctions sensibles ou importantes ; ou
- il a entraîné ou peut entraîner l’introduction ou l’exécution de code malveillant dans le produit ou dans les réseaux et systèmes d’information d’un utilisateur.

Le considérant 68 donne un exemple : un attaquant parvient à introduire du code malveillant dans le canal de diffusion que vous utilisez pour livrer les mises à jour de sécurité.

## Un tri rapide pour l’ingénieur d’astreinte

1. Y a-t-il des preuves que quelqu’un a exploité une faille de notre produit sans autorisation ? Si oui, c’est une vulnérabilité activement exploitée.
2. Quelque chose a-t-il touché notre processus de build, de publication ou de mise à jour, ou pourrait-il placer du code malveillant sur les systèmes des utilisateurs ? Si oui, c’est probablement un incident grave.
3. S’agit-il seulement d’une indisponibilité, sans impact sur la sécurité ? Alors l’obligation de notification du CRA ne s’applique pas. [NIS2 ou le RGPD peuvent encore s’appliquer](/guides/cra-nis2-gdpr-reporting/).

En cas de doute, lancez les délais et décidez à deux. Arrêter un délai inutile ne coûte rien. Le [calculateur de délais](/deadlines/) montre chaque délai de l’événement.
