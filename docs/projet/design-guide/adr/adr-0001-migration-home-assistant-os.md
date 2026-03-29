---
status: "Accepted"
date: "2026-03-29"
authors: "Équipe SmartHub"
tags:
  - architecture
  - home-assistant
  - haos
  - operations
  - simplicity
  - security
supersedes: ""
superseded_by: ""
---

# ADR-0001 : Migration vers Home Assistant OS

## Status

Draft | Proposed | ==Accepted== | Rejected | Superseded | Deprecated

## Contexte

Initialement, l'installation de Home Assistant était envisagée via une stack
Docker (conteneurs, compose, Dockhand) pour viser la reproductibilité via Git
et le contrôle fin des versions. En pratique, l'expérience s'est avérée
décevante :

- **Complexité de configuration** : maintenir une stack Docker (compose, volumes,
  réseau, Dockhand) demandait un effort disproportionné pour un projet
  domestique. Chaque nouveau service exigeait un travail d'intégration manuel
  (ports, variables, dépendances).
- **Sécurité sous-optimale** : dans une stack Docker "maison", la sécurité de
  chaque conteneur repose entièrement sur toi (réseau, isolation, mises à jour).
  Il n'y a pas de mécanisme intégré pour évaluer le niveau de confiance d'un
  service avant de l'installer.
- **Fonctionnalités manquantes** : l'installation Container n'offre ni le
  Supervisor ni les add-ons, ce qui oblige à recréer manuellement des briques
  déjà packagées et maintenues par la communauté.

Le constat est simple : le temps passé à opérer l'infrastructure Docker ne
servait pas le projet (automatiser la maison) mais la "tuyauterie" autour.

## Décision

Migrer vers **Home Assistant OS** (installation officielle avec Supervisor) et
s'appuyer sur l'écosystème natif pour les services complémentaires :

- Les services (Mosquitto, Zigbee2MQTT, etc.) sont installés comme **add-ons**
  gérés par le Supervisor, qui restent techniquement des conteneurs mais dont le
  cycle de vie (installation, mise à jour, sauvegarde, réseau) est entièrement
  piloté par Home Assistant.
- Les mises à jour de Home Assistant et des add-ons se font via l'interface
  **Paramètres > Système > Mises à jour** ou la CLI `ha`.
- La sauvegarde reste externalisée sur le NAS Synology (voir
  [ADR-0005](/projet/design-guide/adr/adr-0005-sauvegarde-restauration-nas-synology)).

### Le système de notation de sécurité des add-ons

Home Assistant attribue à chaque add-on une **note de sécurité de 1 à 6** qui
reflète le niveau de droits demandés par l'application :

- **6** : très sécurisé — l'add-on ne demande aucun accès privilégié.
- **1** : à n'installer que si tu fais entièrement confiance à la source.

La note baisse quand l'add-on :

- tourne sur le **réseau de l'hôte** (`host_network`)
- désactive ou n'inclut pas de **profil AppArmor**
- demande un accès **complet au matériel** (`full_access`, `privileged`)
- requiert un **rôle API élevé** (`admin`, `manager`)
- monte des dossiers en **lecture-écriture** là où la lecture seule suffirait

Par défaut, tous les add-ons tournent en **mode protégé** : ils n'ont aucun
droit particulier sur le système. Désactiver cette protection est possible mais
explicitement signalé.

Ce système de notation est suffisant pour évaluer rapidement si un add-on est
sûr avant de l'installer, sans avoir à auditer manuellement chaque conteneur
comme c'était le cas avec la stack Docker.

## Conséquences

### Positives

- **POS-001** : Simplification radicale de l'exploitation : plus de compose, plus
  de Dockhand, plus de réseau Docker à maintenir.
- **POS-002** : Accès aux add-ons officiels et communautaires, avec un cycle de
  vie géré (installation, mise à jour, sauvegarde).
- **POS-003** : Le système de notation de sécurité des add-ons donne une
  visibilité immédiate sur le niveau de confiance de chaque service.
- **POS-004** : Mises à jour gérées nativement par le Supervisor, avec
  sauvegarde automatique avant mise à jour et rollback possible.
- **POS-005** : Le Supervisor gère aussi le réseau et l'isolation entre add-ons,
  ce qui améliore la posture de sécurité par défaut.

### Négatives

- **NEG-001** : Moins de contrôle sur les versions exactes des conteneurs (pas
  de pinning fin via Git).
- **NEG-002** : La traçabilité des changements repose sur l'historique du
  Supervisor et les sauvegardes, et non sur un repo Git.
- **NEG-003** : Certaines personnalisations avancées (réseau, volumes) sont plus
  difficilement accessibles qu'avec une stack Docker libre.

## Alternatives envisagées

### Rester sur Home Assistant Container (Docker)

- **ALT-001** : **Description** : continuer avec l'installation conteneur et
  corriger les points de friction au fil de l'eau.
- **ALT-002** : **Raison de rejet** : la complexité et le manque de visibilité
  sur la sécurité des services restent structurels, pas conjoncturels. Le rapport
  effort/bénéfice n'est pas favorable pour un projet domestique.

### Home Assistant Supervised (sur Debian)

- **ALT-003** : **Description** : installer le Supervisor sur une distribution
  Linux existante pour garder un accès complet au système hôte.
- **ALT-004** : **Raison de rejet** : cette installation n'est pas officiellement
  supportée pour la production, et elle ajoute une couche de complexité (gestion
  du système hôte + Supervisor) sans bénéfice clair par rapport à Home Assistant
  OS.

## Notes d'implémentation

- **IMP-001** : Installer Home Assistant OS sur le mini PC HP (image officielle
  Generic x86-64).
- **IMP-002** : Installer les add-ons nécessaires (Mosquitto, Zigbee2MQTT, etc.)
  depuis le magasin d'add-ons et vérifier leur note de sécurité.
- **IMP-003** : Configurer le stockage réseau (NAS Synology) pour les
  sauvegardes via **Paramètres > Système > Stockage** (partage SMB/NFS).
- **IMP-004** : Activer les sauvegardes automatiques avec rétention, comme décrit
  dans
  [ADR-0005](/projet/design-guide/adr/adr-0005-sauvegarde-restauration-nas-synology).

## Références

- **REF-001** :
  [ADR-0005](/projet/design-guide/adr/adr-0005-sauvegarde-restauration-nas-synology)
  : Stratégie de sauvegarde et restauration sur NAS Synology.
- **REF-002** : Home Assistant — Installation :
  <https://www.home-assistant.io/installation/>
- **REF-003** : Home Assistant — Sécurité des add-ons (documentation
  développeur) :
  <https://developers.home-assistant.io/docs/add-ons/security>
