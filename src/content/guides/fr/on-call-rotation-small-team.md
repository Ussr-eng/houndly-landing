---
title: 'Astreinte en petite équipe : un roulement simple et durable'
description: 'L’astreinte pour 3 à 10 ingénieurs : tours hebdomadaires, un renfort, passations en journée, peu d’alertes et du repos après une mauvaise nuit.'
slug: on-call-rotation-small-team
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
related: [escalation-policy, support-to-developer-escalation, cra-24-hour-clock]
---

Une petite équipe a besoin d’une règle simple : une personne principale d’astreinte chaque semaine, un renfort, une passation à heure fixe, et du repos après une mauvaise nuit. Tout le reste est facultatif tant que vous n’êtes pas plus d’une dizaine.

## Le planning de base

- **Tours hebdomadaires.** Une personne est principale du lundi 10:00 au lundi suivant 10:00. Des tours plus courts multiplient les passations ; des tours plus longs épuisent les gens.
- **Un renfort.** La personne suivante dans le planning est en renfort. Elle n’est réveillée que si la principale ne répond pas.
- **Passation pendant les heures de travail.** Ne passez jamais la main à minuit. Une passation de 15 minutes couvre les incidents ouverts et tout ce qui est fragile.
- **Les échanges sont faciles.** Chacun peut échanger un tour avec un collègue, et l’outil affiche la vraie personne d’astreinte.

## Combien de personnes il faut

À trois, chacun est d’astreinte une semaine sur trois, plus les tours de renfort. Cela tient un temps, mais c’est lourd. À partir de cinq, cela devient tenable. En dessous de trois, admettez honnêtement que vous n’avez pas d’astreinte, et faites-en une décision d’entreprise.

## Gardez le pager calme

N’alertez que pour ce qui demande un humain tout de suite. Le reste va dans un canal ou un ticket. Passez en revue chaque alerte à la passation hebdomadaire : si elle ne méritait pas de réveiller quelqu’un, changez l’alerte.

## Une nuit de notre propre astreinte

L’une des personnes qui construisent Within24 a été réveillée une nuit pour corriger « une erreur ». En réalité, toute l’API client était tombée : une mise à jour récente faisait remplir la RAM au service jusqu’à ce que le nœud tombe. Cette nuit-là, la correction était simple : relancer le nœud et permettre aux clients de retravailler. La vraie correction, la fuite de mémoire, a attendu le jour ouvré suivant.

Deux leçons pour une petite équipe. La nuit, rétablissez d’abord le service et cherchez la cause profonde en journée. Et l’alerte disait « erreur », pas « API en panne » : une meilleure alerte aurait dit ce qui l’attendait avant même qu’il ouvre son ordinateur.

## Après une mauvaise nuit

Si quelqu’un a été debout la nuit, il commence tard le lendemain. Écrivez-le comme une règle, pour que personne n’ait à demander.

## Quand c’est un incident juridique

Si vous vendez des logiciels dans l’UE, l’ingénieur d’astreinte peut être le premier à voir une vulnérabilité activement exploitée, ce qui déclenche un délai de notification de 24 heures au titre du Cyber Resilience Act (art. 14, paragraphe 2, point a). Ajoutez « est-ce à notifier ? » au runbook d’astreinte, et lisez [quand commence le délai de 24 heures](/guides/cra-24-hour-clock/).
