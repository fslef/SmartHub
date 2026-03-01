---
title: "ADR-0006: Gestion des mises à jour via Git + pin mensuel + Renovate"
status: "Accepted"
date: "2026-02-28"
authors: "Équipe SmartHub"
tags:
  - architecture
  - updates
  - git
  - renovate
  - docker
  - home-assistant
  - zigbee2mqtt
  - ota
supersedes: ""
superseded_by: ""
---

# ADR-0006 : Gestion des mises à jour via Git + pin mensuel + Renovate

## Status

Draft | Proposed | ==Accepted== | Rejected | Superseded | Deprecated

## Contexte

Les mises à jour Home Assistant et des services associés apportent des correctifs
et des évolutions, mais peuvent aussi introduire des breaking changes.

Au-delà des conteneurs, certains composants (par exemple Zigbee2MQTT) pilotent
également des mises à jour de firmware “OTA” sur les appareils. Ces mises à jour
ont un profil de risque différent : elles peuvent changer le comportement d’un
appareil, sont longues et peuvent perturber le réseau Zigbee.

Objectifs :

- Garder une cadence maîtrisée pour les versions “majeures” (mensuelles).
- Mettre en production rapidement les correctifs intermédiaires (patches).
- Garder une trace des changements via un flux Git (revue, historique).
- Automatiser le plus possible, sans sacrifier la lisibilité.

## Décision

Gérer les mises à jour via un **repo Git** et une chaîne de déploiement basée sur
un **Dockerfile/compose** :

- **Pin mensuel** de la version Home Assistant (version “du mois”).
- **Renovate** ouvre une PR à chaque nouvelle release.
- La PR est revue (en particulier les breaking changes), puis approuvée.
- Une tâche planifiée synchronise et déploie.
- Les mises à jour intermédiaires (patch) associées au pin du mois sont déployées
  automatiquement.

Étendre ce principe à Zigbee2MQTT et aux firmwares OTA :

- Les mises à jour **Zigbee2MQTT (conteneur)** suivent le même flux (Renovate,
  PR, revue, déploiement).
- Les mises à jour **OTA firmware** sont traitées comme des changements à risque
  et restent **déclenchées de manière volontaire** (pas d’auto-déploiement
  généralisé), idéalement pendant une fenêtre de maintenance.

## Conséquences

### Positives

- **POS-001**: Mises à jour structurées et traçables (PR, historique Git).
- **POS-002**: Réduction du risque : revue explicite des breaking changes avant
  adoption.
- **POS-003**: Correctifs intermédiaires appliqués rapidement, avec moins
  d’effort.
- **POS-004**: Convergence avec l’objectif “infrastructure déclarative” (un état
  souhaité, un déploiement reproductible).
- **POS-005**: Les OTA Zigbee sont gérées de façon prudente, réduisant le risque
  de régressions difficiles à diagnostiquer.

### Négatives

- **NEG-001**: Nécessite une discipline minimale (revue des PR, surveillance du
  pipeline).
- **NEG-002**: Risque de dérive si les PR Renovate ne sont pas traitées
  régulièrement.
- **NEG-003**: Complexité supplémentaire par rapport à une mise à jour “clic
  dans l’UI”.
- **NEG-004**: Les OTA restent un effort ponctuel (fenêtre de maintenance,
  surveillance), même si les images Docker sont automatisées.

## Alternatives envisagées

### Mise à jour manuelle au fil de l’eau

- **ALT-001**: **Description**: Mettre à jour au cas par cas, sans pin ni
  automatisation.
- **ALT-002**: **Raison de rejet**: Reproductibilité faible, risque de dérive
  et de “mise à jour oubliée”.

### Auto-update sur un tag flottant (`latest`)

- **ALT-003**: **Description**: Déployer automatiquement la dernière version
  disponible.
- **ALT-004**: **Raison de rejet**: Risque élevé d’introduire une régression sans
  fenêtre de revue, en tension avec la fiabilité.

### Home Assistant OS + Supervisor (flux natif)

- **ALT-005**: **Description**: S’appuyer sur le mécanisme natif de mises à jour
  Home Assistant OS / Supervisor.
- **ALT-006**: **Raison de rejet**: Ne correspond pas au choix d’installation
  (stack Docker) et réduit la cohérence du flux Git.

## Notes d’implémentation

- **IMP-001**: Définir une convention claire de versioning dans le repo
  (fichier de versions, tag Docker, changelog minimal).
- **IMP-002**: Configurer Renovate pour cibler explicitement les images
  (Home Assistant et services associés) et ouvrir des PR petites.
- **IMP-003**: Rendre le déploiement idempotent (relancer sans effet de bord).
- **IMP-004**: Avant d’approuver une PR, lire le changelog officiel et vérifier
  les breaking changes.
- **IMP-005**: Prévoir un rollback simple (revenir au tag précédent) et s’appuyer
  sur les sauvegardes (voir ADR-0005).
- **IMP-006**: Pour Zigbee2MQTT, éviter de lancer plusieurs OTA en parallèle et
  privilégier des mises à jour quand le réseau est peu sollicité.
- **IMP-007**: Si les notifications de disponibilité OTA deviennent du bruit,
  désactiver la vérification automatique et ne faire des vérifications que lors
  d’actions planifiées.

## Références

- **REF-001**: ADR-0005 : Stratégie de sauvegarde et restauration sur NAS Synology.
- **REF-002**: Renovate (documentation) :
  https://docs.renovatebot.com/
- **REF-003**: Home Assistant — Release notes :
  https://www.home-assistant.io/blog/
- **REF-004**: Zigbee2MQTT — OTA updates (documentation) :
  https://www.zigbee2mqtt.io/guide/usage/ota_updates.html
