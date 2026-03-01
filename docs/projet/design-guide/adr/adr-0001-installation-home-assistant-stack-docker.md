---
title: "ADR-0001: Type d’installation Home Assistant : Docker"
status: "Accepted"
date: "2026-02-28"
authors: "Équipe SmartHub"
tags:
  - architecture
  - home-assistant
  - docker
  - operations
  - simplicity
supersedes: ""
superseded_by: ""
---

# ADR-0001 : Type d’installation Home Assistant : Docker

## Status

Draft | Proposed | ==Accepted== | Rejected | Superseded | Deprecated

## Contexte

Home Assistant peut être installé de plusieurs manières (Home Assistant OS,
conteneur, environnement Python). Le choix d’installation impacte :

- Les mises à jour (processus, retour arrière).
- La sauvegarde et la restauration.
- L’intégration avec l’infrastructure existante (réseau, supervision).
- Le niveau de complexité opérationnelle.

Dans SmartHub, Home Assistant n’est pas isolé : il s’insère dans une
infrastructure domestique plus large (réseau segmenté, sauvegardes, autres
services en conteneurs). On cherche donc une méthode d’installation :

- Reproductible (réinstallation simple, migration vers une nouvelle machine).
- Compatible avec un flux Git (revue, historique).
- Prévisible côté exploitation (versions maîtrisées, rollback possible).

## Décision

Installer Home Assistant sous forme **Home Assistant Container** (Docker), dans
une **stack** pilotée par un repo Git et déployée via une tâche planifiée de
synchronisation et de déploiement.

Cette décision vise à rester cohérente avec :

- Une gestion de configuration déclarative (Git comme source de vérité).
- Une exploitation simple, reproductible et automatisable.
- Les principes **Rester simple** et **Documenter les décisions**.

## Conséquences

### Positives

- **POS-001**: Reproductibilité : l’état souhaité est décrit (compose/Dockerfile).
- **POS-002**: Déploiement contrôlé : pinning de versions, rollback simple.
- **POS-003**: Intégration naturelle avec Renovate et le flux PR (voir
  [ADR-0006](/projet/design-guide/adr/adr-0006-gestion-mises-a-jour-docker-renovate)).
- **POS-004**: Portabilité : migration facilitée vers une nouvelle machine.

### Négatives

- **NEG-001**: Certaines fonctionnalités “Supervisor/add-ons” ne sont pas
  disponibles dans une installation conteneur.
- **NEG-002**: Demande de maintenir quelques briques d’infra (réseau, volumes,
  sauvegardes) en dehors de Home Assistant.
- **NEG-003**: Courbe d’apprentissage Docker pour le dépannage.

## Alternatives envisagées

### Home Assistant OS (installation supervisée)

- **ALT-001**: **Description**: Installation officielle “OS” avec Supervisor et
  add-ons.
- **ALT-002**: **Motivation**: Optimiser les ressources et réduire la charge
  d’infrastructure (Supervisor + add-ons, moins de briques externes à opérer).
- **ALT-003**: **Raison de rejet**: Moins aligné avec le flux Git + Docker
  souhaité et avec la stratégie de déploiement existante.

## Notes d’implémentation

- **IMP-001**: Décrire la stack (compose) dans un repo Git, avec volumes et
  réseau explicitement définis.
- **IMP-002**: Pinner la version Home Assistant et gérer les mises à jour via
  Renovate (voir
  [ADR-0006](/projet/design-guide/adr/adr-0006-gestion-mises-a-jour-docker-renovate)).
- **IMP-003**: Mettre en place une sauvegarde compatible “stack Docker” (voir
  [ADR-0005](/projet/design-guide/adr/adr-0005-sauvegarde-restauration-nas-synology)).

## Références

- **REF-001**: [ADR-0006](/projet/design-guide/adr/adr-0006-gestion-mises-a-jour-docker-renovate)
  : Gestion des mises à jour via Git + pin mensuel + Renovate.
- **REF-002**: [ADR-0005](/projet/design-guide/adr/adr-0005-sauvegarde-restauration-nas-synology)
  : Stratégie de sauvegarde et restauration sur NAS Synology.
- **REF-003**: Home Assistant — Installation (documentation) :
  <https://www.home-assistant.io/installation/>
