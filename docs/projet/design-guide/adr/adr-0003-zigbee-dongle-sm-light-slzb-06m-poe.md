---
title: "ADR-0003: Coordinateur Zigbee via SM Light SLZB-06M (PoE)"
status: "Accepted"
date: "2026-02-28"
authors: "Équipe SmartHub"
tags:
  - architecture
  - zigbee
  - hardware
  - poe
  - reliability
supersedes: ""
superseded_by: ""
---

# ADR-0003 : Coordinateur Zigbee via SM Light SLZB-06M (PoE)

## Status

Draft | Proposed | ==Accepted== | Rejected | Superseded | Deprecated

## Contexte

La qualité du réseau Zigbee dépend fortement de la position du coordinateur et de
la stabilité de la liaison entre le hub et le coordinateur.

Contraintes :

- Optimiser la couverture radio (position centrale).
- Éviter les câbles USB longs, les placements “contraints” et les perturbations.
- Améliorer la maintenabilité (alimentation, redémarrage, remplacement).

## Décision

Utiliser un coordinateur Zigbee **SM Light SLZB-06M**, **alimenté en PoE** et
placé **au centre de la maison** afin d’optimiser la couverture.

## Conséquences

### Positives

- **POS-001**: Placement libre et central (PoE), améliorant la qualité radio.
- **POS-002**: Réduction des problèmes liés à l’USB (câbles, interférences,
  limitations de distance).
- **POS-003**: Maintenabilité : alimentation réseau standardisée, remplacement
  plus simple.

### Négatives

- **NEG-001**: Dépendance au réseau filaire et au switch PoE.
- **NEG-002**: Un mauvais emplacement peut toujours dégrader le maillage
  (murs porteurs, métal, proximité d’antennes).
- **NEG-003**: Coût matériel supérieur à un dongle USB d’entrée de gamme.

## Alternatives envisagées

### Dongle Zigbee USB directement sur le serveur

- **ALT-001**: **Description**: Coordinateur Zigbee USB branché sur la machine
  qui héberge Home Assistant.
- **ALT-002**: **Raison de rejet**: Placement dicté par l’emplacement du serveur
  (souvent non central) et contraintes USB.

### Déporter un dongle USB via rallonge

- **ALT-003**: **Description**: Déporter le dongle via une rallonge USB.
- **ALT-004**: **Raison de rejet**: Fiabilité variable (qualité câble,
  alimentation), esthétique et maintenance moins propres.

### Multiplier les coordinateurs

- **ALT-005**: **Description**: Plusieurs coordinateurs pour “couvrir” la maison.
- **ALT-006**: **Raison de rejet**: Architecture plus complexe, en tension avec
  **Rester simple**.

## Notes d’implémentation

- **IMP-001**: Placer le SLZB-06M au centre de la maison, à distance des sources
  d’interférences (Wi-Fi, baie métallique, TV).
- **IMP-002**: Prévoir une prise réseau dédiée et une alimentation PoE fiable.
- **IMP-003**: Documenter l’adresse IP, le mode d’accès et la procédure de
  remplacement en cas de panne.

## Références

- **REF-001**: SM Light — SLZB-06M (documentation fabricant) :
  https://smlight.tech/product/slzb-06m/
- **REF-002**: Guide de conception — principe **Rester simple** :
  https://frenck.dev/the-enterprise-smart-home-syndrome/
