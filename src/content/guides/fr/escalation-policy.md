---
title: 'Politique d’escalade : qui réveiller, et quand'
description: 'Une politique d’escalade pour petite équipe : qui est appelé après combien de minutes, pourquoi des appels, et pourquoi les délais légaux n’attendent pas.'
slug: escalation-policy
locale: fr
regimes: [CRA]
topic: on-call
datePublished: 2026-11-22
dateModified: 2026-11-22
lastVerified: 2026-10-27
sources:
  - title: Règlement (UE) 2024/2847 (Cyber Resilience Act)
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj
    publisher: EUR-Lex
related: [on-call-rotation-small-team, support-to-developer-escalation, cra-24-hour-clock]
---

Une politique d’escalade répond à une seule question : si la personne d’astreinte ne répond pas, qui est la suivante, et au bout de combien de temps ? Écrivez-la avant la première nuit où vous en aurez besoin.

## Une politique de départ

| Minutes après l’alerte | Qui                             | Comment                       |
| ---------------------- | ------------------------------- | ----------------------------- |
| 0                      | Personne d’astreinte principale | Notification push et Telegram |
| 5                      | Personne d’astreinte principale | Appel téléphonique            |
| 15                     | Renfort                         | Appel téléphonique            |
| 30                     | Responsable technique ou CTO    | Appel téléphonique            |

La chaîne s’arrête dès que quelqu’un appuie sur « Je m’en occupe ». Accuser réception veut dire que vous en êtes responsable, pas que c’est réglé.

## Pourquoi des appels

On dort facilement malgré une notification push ou un message de chat. Pas malgré un téléphone qui sonne sans arrêt. Utilisez les appels pour les alertes qui doivent réveiller quelqu’un, et des canaux plus discrets pour le reste.

## Alertes différentes, vitesses différentes

- **Urgent :** clients touchés ou sécurité en jeu. Chaîne complète, appels.
- **Peut attendre le matin :** service dégradé mais fonctionnel. Message seulement, pas d’escalade la nuit.
- **Peut-être à notifier :** signes d’exploitation ou d’incident de sécurité. Chaîne complète, et l’escalade atteint quelqu’un qui peut décider de la notification légale.

## Les délais légaux n’attendent pas l’escalade

Au titre du Cyber Resilience Act, le délai de 24 heures de l’alerte précoce court à partir du moment où vous prenez connaissance d’une vulnérabilité activement exploitée (art. 14, paragraphe 2, point a) ; voir [quand commence le délai](/guides/cra-24-hour-clock/). Trente minutes d’escalade, c’est acceptable. Cinq heures parce que personne n’a répondu, non. Testez la chaîne chaque mois avec une fausse alerte.
