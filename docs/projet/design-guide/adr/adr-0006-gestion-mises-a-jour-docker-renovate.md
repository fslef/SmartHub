---
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

Cet ADR décrit une façon simple et traçable de gérer les mises à jour de la stack
(Home Assistant et services en conteneurs), avec une cadence maîtrisée et un
rollback possible.

## Contexte

Les mises à jour apportent des correctifs (dont sécurité) et des évolutions, mais
elles peuvent aussi casser des intégrations ou changer des comportements.

Deux sujets distincts coexistent :

- **Mises à jour de la stack** (Home Assistant et services en conteneurs) : on
  veut rester à jour sans déployer “à l’aveugle”, garder une cadence maîtrisée et
  pouvoir revenir en arrière.
- **Mises à jour OTA Zigbee** (firmwares des équipements) : elles corrigent des
  failles de sécurité, des bugs et améliorent parfois la stabilité ou la
  compatibilité. Elles doivent être planifiées et pilotées séparément (durée,
  perturbations possibles, comportement modifié).

Objectifs :

- Contrôler le déploiement des versions majeures (revue des breaking changes).
- Déployer automatiquement les correctifs mineurs (patch).
- Traçabilité via Git (revue, historique).
- Automatisation sans perdre en lisibilité.

## Décision

### Mises à jour de la stack (Home Assistant et conteneurs)

Gérer les mises à jour de la stack via un **repo Git** et une chaîne de
déploiement basée sur un **Dockerfile/compose** :

- **Renovate** ouvre une PR à chaque nouvelle release.
- **Montée de version majeure contrôlée** : la PR est revue (en particulier les
  breaking changes), puis approuvée manuellement.
- Une tâche planifiée synchronise et déploie.
- **Correctifs automatiques** : les mises à jour correctives (patch) de la
  version validée sont déployées automatiquement.

### Mises à jour OTA Zigbee (firmwares)

Les mises à jour **OTA firmware** sont
**planifiées** (fenêtres de maintenance/campagnes) et **automatisées**
(exécution), avec supervision.

## Conséquences

### Positives

- **POS-001**: Mises à jour structurées et traçables (PR, historique Git).
- **POS-002**: Réduction du risque : revue explicite des breaking changes avant
  adoption.
- **POS-003**: Correctifs appliqués rapidement, avec moins d’effort.
- **POS-004**: Convergence avec l’objectif “infrastructure déclarative” (un état
  souhaité, un déploiement reproductible).
- **POS-005**: Les OTA Zigbee restent pilotées à part, avec une approche
  prudente, réduisant le risque de régressions difficiles à diagnostiquer.

### Négatives

- **NEG-001**: Nécessite une discipline minimale (revue des PR, surveillance du
  pipeline).
- **NEG-002**: Risque de dérive si les PR Renovate ne sont pas traitées
  régulièrement.
- **NEG-003**: Complexité supplémentaire par rapport à une mise à jour “clic
  dans l’UI”.
- **NEG-004**: Les OTA restent un effort ponctuel (fenêtre de maintenance,
  surveillance) et ne bénéficient pas de la même automatisation que la stack.

## Alternatives envisagées

Ces alternatives concernent les **mises à jour de la stack** (pas les OTA).

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

### Stack (Home Assistant et conteneurs)

- **IMP-001**: Définir une convention claire de versioning dans le repo
  (fichier de versions, tag Docker, changelog minimal).
- **IMP-002**: Configurer Renovate pour cibler explicitement les images
  (Home Assistant et services associés) et ouvrir des PR petites.
- **IMP-003**: Rendre le déploiement idempotent (relancer sans effet de bord).
- **IMP-004**: Avant d’approuver une PR, lire le changelog officiel et vérifier
  les breaking changes.
- **IMP-005**: Prévoir un rollback simple (revenir au tag précédent) et s’appuyer
  sur les sauvegardes (voir
  [ADR-0005](/projet/design-guide/adr/adr-0005-sauvegarde-restauration-nas-synology)).

### OTA Zigbee (firmwares)

- **IMP-006**: Planifier les OTA (fenêtres de maintenance/campagnes) et les
  exécuter via une automatisation, avec supervision.
- **IMP-007**: Éviter de lancer plusieurs OTA en parallèle et privilégier des
  mises à jour quand le réseau est peu sollicité.
- **IMP-008**: Si les notifications de disponibilité OTA deviennent du bruit,
  désactiver la vérification automatique et ne faire des vérifications que lors
  de fenêtres planifiées.

## Références

- **REF-001**: [ADR-0005](/projet/design-guide/adr/adr-0005-sauvegarde-restauration-nas-synology)
  : Stratégie de sauvegarde et restauration sur NAS Synology.
- **REF-002**: Renovate (documentation) :
  <https://docs.renovatebot.com/>
- **REF-003**: Home Assistant — Release notes :
  <https://www.home-assistant.io/blog/>
- **REF-004**: Zigbee2MQTT — OTA updates (documentation) :
  <https://www.zigbee2mqtt.io/guide/usage/ota_updates.html>
