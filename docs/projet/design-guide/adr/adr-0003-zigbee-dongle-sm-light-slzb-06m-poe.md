---
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

Cet ADR décrit le choix du coordinateur Zigbee et son positionnement, afin
d’améliorer la couverture radio et la fiabilité au quotidien.

## Contexte

La stabilité du réseau Zigbee dépend surtout du coordinateur : sa position
(couverture, obstacles) et la qualité de la liaison avec Home Assistant.

Dans une maison, le serveur Home Assistant est souvent placé là où c’est pratique
(baie, bureau), pas forcément là où la radio est bonne. L’enjeu est de pouvoir
positionner le coordinateur au bon endroit, sans bricolage USB et sans fragiliser
la connexion.

Contraintes :

- Optimiser la couverture radio (position centrale).
- Éviter les câbles USB longs, les placements “contraints” et les perturbations.
- Améliorer la maintenabilité (alimentation, redémarrage, remplacement).
- Standardiser la connectique (Ethernet) et l’alimentation (PoE).

## Décision

Utiliser un coordinateur Zigbee **SM Light SLZB-06M**, **alimenté en PoE** et
placé **au centre de la maison** pour optimiser la couverture.

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
- **ALT-006**: **Raison de rejet**: Architecture plus complexe, en contradiction avec
  **Rester simple**.

## Notes d’implémentation

- **IMP-001**: Placer le SLZB-06M au centre de la maison, à distance des sources
  d’interférences (Wi-Fi, baie métallique, TV).
- **IMP-002**: Prévoir une prise réseau dédiée et une alimentation PoE fiable.
- **IMP-003**: Réserver une adresse IP (DHCP statique) et documenter l’adresse,
  le mode d’accès et les informations utiles au dépannage.
- **IMP-004**: Documenter la procédure de remplacement (y compris ce qui doit
  être vérifié côté logiciel) en cas de panne.

## Références

- **REF-001**: SM Light — SLZB-06M (documentation fabricant) :
  <https://smlight.tech/product/slzb-06m/>
- **REF-002**: Guide de conception — principe **Rester simple** :
  <https://frenck.dev/the-enterprise-smart-home-syndrome/>
