---
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

Home Assistant est le cœur de mon SmartHub. Le mode d’installation conditionne
directement la fiabilité et le coût de maintenance : mise à jour, retour arrière,
sauvegarde/restauration et dépannage.

Mon SmartHub ne vit pas “tout seul” : Home Assistant s’intègre dans une
infrastructure domestique (réseau segmenté, sauvegardes, autres services en
conteneurs). L’enjeu est donc de choisir une installation qui reste simple et
prédictible.

Contraintes :

- Reproductibilité : réinstaller et migrer facilement vers une nouvelle machine.
- Exploitation : versions maîtrisées et rollback possible.
- Intégration : cohérence avec le réseau, les volumes et la stratégie de backup.
- Traçabilité : configuration compatible avec un flux Git (revue, historique).

## Décision

Installer Home Assistant sous forme **Home Assistant Container** (Docker) et
l’exploiter dans une **stack** décrite dans un repo Git (compose/Dockerfile),
déployée via une tâche planifiée.

Principes :

- Git comme source de vérité (revue, historique).
- Versions maîtrisées (pin) et rollback possible.
- Cohérence avec les principes **Rester simple** et **Documenter les décisions**.

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
