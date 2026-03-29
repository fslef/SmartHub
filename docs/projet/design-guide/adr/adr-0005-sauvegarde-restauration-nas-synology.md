---
status: "Accepted"
date: "2026-03-29"
authors: "Équipe SmartHub"
tags:
  - architecture
  - backups
  - restore
  - synology
  - nabu-casa
  - home-assistant
supersedes: ""
superseded_by: ""
---

# ADR-0005 : Stratégie de sauvegarde et restauration

## Status

Draft | Proposed | ==Accepted== | Rejected | Superseded | Deprecated

Cet ADR décrit où stocker les sauvegardes Home Assistant et comment rendre la
restauration fiable, y compris après un incident sur le site.

## Contexte

Sans sauvegarde exploitable, une panne matérielle, une mise à jour problématique
ou une erreur de configuration rend le **retour arrière** (rollback) impossible.
La remise en état repose alors sur une reconstruction et une reconfiguration,
avec un risque plus élevé de pertes de données et de dérive.

Dans mon SmartHub, deux cibles complémentaires sont disponibles :

- **Home Assistant Cloud (Nabu Casa)** : sauvegarde hors site intégrée
  nativement dans Home Assistant, sans configuration réseau à maintenir.
- **NAS Synology** : stockage local durable, déjà présent dans le foyer.

L'enjeu est de combiner ces deux cibles pour couvrir à la fois le scénario
"panne locale" (le cloud prend le relais) et le scénario "pas d'Internet"
(le NAS reste accessible).

Contraintes :

- Disposer de sauvegardes automatiques, avec rétention.
- Pouvoir restaurer rapidement, y compris sur un nouveau matériel.
- Couvrir les scénarios de perte locale et de perte d'accès Internet.
- Rester simple à opérer (tout piloté depuis Home Assistant).

## Décision

Configurer Home Assistant pour sauvegarder sur **deux cibles complémentaires** :

1. **Home Assistant Cloud (Nabu Casa)** : sauvegarde hors site automatique,
   intégrée nativement via l'abonnement Nabu Casa. C'est la cible principale
   pour la reprise après sinistre.
2. **NAS Synology** : sauvegarde locale via l'intégration de stockage réseau
   native de Home Assistant OS (**Paramètres > Système > Stockage**). C'est la
   cible de proximité pour une restauration rapide.

La création, la planification et la restauration sont entièrement pilotées
depuis Home Assistant, sans scripts ni orchestration externe.

## Conséquences

### Positives

- **POS-001** : Les sauvegardes sont stockées hors du nœud Home Assistant, sur
  deux cibles indépendantes (cloud + NAS local).
- **POS-002** : En cas de sinistre local (panne du NAS et de la machine), la
  sauvegarde Nabu Casa permet de restaurer depuis n'importe où.
- **POS-003** : En cas de perte d'accès Internet, le NAS reste accessible pour
  une restauration rapide.
- **POS-004** : Exploitation simple : tout est configuré et piloté depuis
  l'interface Home Assistant, sans scripts externes.

### Négatives

- **NEG-001** : Dépendance à l'abonnement Nabu Casa pour la cible cloud.
- **NEG-002** : Dépendance au NAS (disponibilité, volume, permissions) pour la
  cible locale.
- **NEG-003** : Une mauvaise configuration du partage réseau peut exposer des
  données (droits trop larges sur le NAS).


## Alternatives envisagées

### Sauvegardes locales uniquement

- **ALT-001** : **Description** : conserver les sauvegardes sur le stockage
  local de la machine Home Assistant.
- **ALT-002** : **Raison de rejet** : risque élevé en cas de panne disque ou de
  corruption, et restauration moins fluide.

### NAS Synology uniquement (sans cloud)

- **ALT-003** : **Description** : sauvegarder uniquement sur le NAS, sans cible
  cloud.
- **ALT-004** : **Raison de rejet** : ne couvre pas le scénario de sinistre
  local complet (panne NAS + machine). L’ajout de Nabu Casa est simple et
  n’ajoute pas de complexité opérationnelle.

### Nabu Casa uniquement (sans NAS)

- **ALT-005** : **Description** : sauvegarder uniquement sur Home Assistant
  Cloud.
- **ALT-006** : **Raison de rejet** : la restauration depuis le cloud est plus
  lente qu’une restauration locale, et dépend de la disponibilité Internet.

### Orchestration hors Home Assistant (rsync, scripts)

- **ALT-007** : **Description** : laisser Home Assistant générer des fichiers et
  les synchroniser via une tâche NAS (rsync, scripts).
- **ALT-008** : **Raison de rejet** : plus de pièces en mouvement, diagnostic
  plus difficile, configuration moins “centrée Home Assistant”.

## Notes d’implémentation

- **IMP-001** : Créer un dossier dédié sur le NAS (par exemple
  `home-assistant/backup`).
- **IMP-002** : Créer un compte NAS dédié aux sauvegardes avec des droits
  limités à ce dossier.
- **IMP-003** : Déclarer le stockage réseau dans Home Assistant via
  **Paramètres > Système > Stockage** (partage SMB/NFS) et pointer les
  sauvegardes vers cette cible.
- **IMP-004** : Vérifier que Home Assistant Cloud (Nabu Casa) est activé et
  configuré comme cible de sauvegarde dans
  **Paramètres > Système > Sauvegardes**.
- **IMP-005** : Activer les sauvegardes automatiques et une politique de
  rétention (nombre de sauvegardes, fenêtre glissante).
- **IMP-006** : Tester une restauration de bout en bout à intervalles réguliers
  (au moins après un changement majeur), depuis le NAS et depuis le cloud.

## Références

- **REF-001** : [ADR-0001](/projet/design-guide/adr/adr-0001-migration-home-assistant-os)
  : Type d’installation Home Assistant : Home Assistant OS — impacte la méthode
  de restauration.
- **REF-002** : Home Assistant — Backups (documentation officielle) :
  <https://www.home-assistant.io/common-tasks/os/#backups>
- **REF-003** : Home Assistant Cloud — Sauvegarde :
  <https://www.nabucasa.com/>
