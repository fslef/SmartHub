---
status: "Accepted"
date: "2026-02-28"
authors: "Équipe SmartHub"
tags:
  - architecture
  - backups
  - restore
  - synology
  - home-assistant
supersedes: ""
superseded_by: ""
---

# ADR-0005 : Stratégie de sauvegarde et restauration sur NAS Synology

## Status

Draft | Proposed | ==Accepted== | Rejected | Superseded | Deprecated

Cet ADR décrit où stocker les sauvegardes Home Assistant et comment rendre la
restauration fiable, y compris après un incident sur le site.

## Contexte

Une maison connectée doit pouvoir se remettre d’une panne matérielle, d’une mise à
jour problématique ou d’une erreur de configuration.

Dans mon SmartHub, le NAS sert déjà de cible “durable” et bénéficie d’une sauvegarde
sur un site distant, ce qui permet de réduire le risque lié à un sinistre local.

Les contraintes principales sont :

- Disposer de sauvegardes automatiques, avec rétention.
- Pouvoir restaurer rapidement, y compris sur un nouveau matériel.
- Centraliser les sauvegardes sur une cible “durable” du foyer.
- Rester simple à opérer (peu de scripts, peu de dépendances).

## Décision

Stocker les sauvegardes Home Assistant sur un **NAS Synology**, via une cible de
stockage réseau configurée côté Home Assistant.

S’appuyer sur la **sauvegarde hors site du NAS** (déjà en place) pour inclure ce
dossier de sauvegardes et couvrir le scénario “sinistre local”.

Objectif : que la création, la planification et la restauration des sauvegardes
restent pilotées depuis Home Assistant, tout en externalisant les fichiers sur un
stockage du foyer.

## Conséquences

### Positives

- **POS-001**: Les sauvegardes sont stockées hors du nœud Home Assistant, ce qui
  limite l’impact d’une panne locale.
- **POS-002**: Restauration plus rapide en cas de remplacement de machine.
- **POS-003**: Cible de stockage unique et durable (NAS), cohérente avec une
  stratégie domestique.
- **POS-004**: Exploitation simple : un plan de sauvegarde, un emplacement, une
  rétention.

### Négatives

- **NEG-001**: Dépendance au NAS (disponibilité, volume, permissions).
- **NEG-002**: Une mauvaise configuration de partage réseau peut exposer des
  données (droits trop larges).
- **NEG-003**: Dépendance à la chaîne de sauvegarde hors site du NAS (fenêtre de
  sauvegarde, bande passante, supervision) pour couvrir le risque “sinistre
  local”.

## Alternatives envisagées

### Sauvegardes locales uniquement

- **ALT-001**: **Description**: Conserver les sauvegardes sur le stockage local
  de la machine Home Assistant.
- **ALT-002**: **Raison de rejet**: Risque élevé en cas de panne disque ou de
  corruption, et restauration moins fluide.

### Sauvegarde cloud (tiers)

- **ALT-003**: **Description**: Envoyer les sauvegardes vers un stockage cloud
  (fournisseur tiers).
- **ALT-004**: **Raison de rejet**: Dépendance supplémentaire, contraintes de
  confidentialité, complexité de mise en place selon les environnements.

### Sauvegarde NAS mais orchestration hors Home Assistant

- **ALT-005**: **Description**: Laisser Home Assistant générer des fichiers et
  les synchroniser via une tâche NAS (rsync, scripts).
- **ALT-006**: **Raison de rejet**: Plus de pièces en mouvement, diagnostic plus
  difficile, configuration moins “centrée Home Assistant”.

## Notes d’implémentation

- **IMP-001**: Créer un dossier dédié sur le NAS (par exemple `home-assistant/backup`).
- **IMP-002**: Créer un compte NAS dédié aux sauvegardes avec des droits limités
  à ce dossier.
- **IMP-003**: Déclarer le stockage réseau dans Home Assistant (partage SMB/NFS
  selon l’environnement) et pointer les sauvegardes vers cette cible.
- **IMP-004**: Activer des sauvegardes automatiques et une politique de rétention
  (nombre de sauvegardes, fenêtre glissante).
- **IMP-005**: Tester une restauration de bout en bout à intervalles réguliers
  (au moins après un changement majeur) et documenter le pas-à-pas.
- **IMP-006**: Vérifier que le dossier de sauvegardes Home Assistant est inclus
  dans la sauvegarde du NAS vers le site distant.
- **IMP-007**: Optionnel : chiffrer la sauvegarde hors site si ce n’est pas déjà
  le cas.

## Références

- **REF-001**: [ADR-0001](/projet/design-guide/adr/adr-0001-installation-home-assistant-stack-docker)
  : Type d’installation Home Assistant : Docker — impacte la méthode de
  restauration.
- **REF-002**: Home Assistant — Backups (documentation officielle) :
  <https://www.home-assistant.io/common-tasks/os/#backups>
