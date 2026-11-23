---
title: 'Comment le support joint le développeur d’astreinte la nuit'
description: 'Le support voit souvent un problème avant la supervision. Comment il peut réveiller le bon développeur, et pourquoi c’est important pour le CRA.'
slug: support-to-developer-escalation
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
related: [escalation-policy, on-call-rotation-small-team, cra-what-to-report]
---

Le support voit souvent un problème avant la supervision : un client écrit qu’il ne peut plus se connecter, ou qu’il voit les données de quelqu’un d’autre. Le support a besoin d’un moyen évident de réveiller le bon développeur, sans savoir qui est d’astreinte ni chercher un numéro de téléphone.

## Ce qui se passe sans processus

- Le support écrit dans un canal de chat à 2 h du matin et personne ne le lit avant le matin.
- Le support appelle à chaque fois le seul développeur dont il a le numéro.
- Le support hésite, parce qu’il ne sait pas si c’est « assez grave ».

## Un processus simple

1. **Un bouton ou un numéro** qui joint toujours la personne d’astreinte du moment. Le support n’a jamais besoin du planning.
2. **Trois questions avant l’appel :** ce que voit le client, combien de clients, et si des données ou la sécurité peuvent être touchées.
3. **La [politique d’escalade](/guides/escalation-policy/) prend le relais :** si le développeur ne répond pas, le renfort est appelé.
4. **Le support reçoit une réponse :** « Je m’en occupe » ou « cela peut attendre le matin », pour pouvoir répondre au client.

## Autorisez le support à réveiller les gens

Écrivez noir sur blanc que réveiller un développeur par erreur, ce n’est pas grave. Une fausse alerte coûte une nuit interrompue. Un incident de sécurité manqué peut coûter un délai légal manqué.

## Quand le signalement du client est un incident de sécurité

« Je vois les données d’un autre client » peut être le premier signe d’une vulnérabilité exploitée. Au titre du Cyber Resilience Act, le délai de 24 heures commence lorsque le fabricant en prend connaissance (art. 14, paragraphe 2, point a). Un ticket de support peut être ce moment : il doit donc parvenir vite à un ingénieur. Voir [ce qui doit être notifié](/guides/cra-what-to-report/).

Nous intégrons à Within24 un bouton « Appeler un développeur » pour le support. [Rejoindre l’accès anticipé](/early-access/).
