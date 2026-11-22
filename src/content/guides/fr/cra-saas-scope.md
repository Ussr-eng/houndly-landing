---
title: 'Le Cyber Resilience Act s’applique-t-il au SaaS ?'
description: 'Le SaaS pur relève en général de NIS2, pas du CRA. Mais le backend d’une application ou d’un appareil que vous livrez est couvert. Trois cas courants.'
slug: cra-saas-scope
locale: fr
regimes: [CRA, NIS2]
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
related: [cra-what-to-report, cra-nis2-gdpr-reporting, cra-reporting-deadlines]
---

Le SaaS pur, à lui seul, n’est en général pas un « produit comportant des éléments numériques » au sens du CRA. Le considérant 12 indique que le SaaS, le PaaS et l’IaaS relèvent plutôt de la directive NIS2. Mais la partie cloud d’un produit que vous livrez est couverte, et beaucoup d’éditeurs SaaS livrent quelque chose.

## Ce que couvre le CRA

Le CRA s’applique aux produits comportant des éléments numériques mis à disposition sur le marché de l’UE qui se connectent à un appareil ou à un réseau (art. 2, paragraphe 1). Un produit comportant des éléments numériques est un produit logiciel ou matériel et ses solutions de traitement de données à distance (art. 3, point 1).

Le traitement de données à distance n’est couvert que si (art. 3, point 2) :

- vous, le fabricant, l’avez conçu et développé, ou il relève de votre responsabilité ; et
- sans lui, le produit ne pourrait pas remplir l’une de ses fonctions.

## Trois cas courants

| Vous livrez                                                                          | CRA ?                                                                         | Pourquoi                                   |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------ |
| Une application web utilisée seulement dans le navigateur, rien à installer          | En général non ; NIS2 peut s’appliquer                                        | Considérant 12 : le SaaS relève de NIS2    |
| Une application mobile ou de bureau, un agent, un SDK ou une CLI, plus votre backend | Oui : l’application, et le backend comme son traitement de données à distance | Art. 3, points 1 et 2                      |
| Un appareil avec un tableau de bord cloud qui le pilote                              | Oui : l’appareil et le cloud                                                  | Le considérant 12 donne cet exemple précis |

Le considérant 12 précise aussi que les sites web qui ne soutiennent pas la fonctionnalité d’un produit ne sont pas couverts.

## Si vous êtes couvert

L’obligation de notification de l’article 14 couvre votre produit, y compris son traitement de données à distance. Une faille exploitée dans le backend dont dépend votre application peut être un événement à notifier. Voir [ce qui doit être notifié](/guides/cra-what-to-report/).

## Si vous faites du SaaS pur

NIS2 peut s’appliquer à la place : le considérant 12 du CRA indique que les fournisseurs de services d’informatique en nuage de taille moyenne ou plus grands relèvent de NIS2. NIS2 prévoit sa propre alerte précoce dans les 24 heures suivant la prise de connaissance d’un incident important (NIS2, art. 23, paragraphe 4, point a). Voir [un incident, plusieurs délais](/guides/cra-nis2-gdpr-reporting/).

Les produits à la limite sont précisément ceux pour lesquels il faut consulter un avocat.
