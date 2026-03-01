---
title: "ADR-0002: Segmentation réseau (VLAN) pour les objets connectés"
status: "Accepted"
date: "2026-02-28"
authors: "Équipe SmartHub"
tags:
  - architecture
  - network
  - vlan
  - security
  - iot
supersedes: ""
superseded_by: ""
---

# ADR-0002 : Segmentation réseau (VLAN) pour les objets connectés

## Status

Draft | Proposed | ==Accepted== | Rejected | Superseded | Deprecated

## Contexte

Les équipements connectés (IoT, multimédia, invités) ont des profils de risque et
des besoins réseau différents. Un réseau plat facilite les mouvements latéraux en
cas de compromis d’un appareil et rend les diagnostics plus difficiles.

Objectifs :

- Limiter l’impact d’un appareil IoT compromis.
- Rendre explicites les flux autorisés (principe du moindre privilège).
- Conserver une exploitation simple et stable.

## Décision

Segmenter le réseau en VLANs dédiés, avec un filtrage inter-VLAN par défaut
restrictif.

VLANs existants :

- **Default** — VLAN **1** — `10.0.10.0/24`
- **Trusted** — VLAN **62** — `10.0.62.0/24`
- **Lab 1337** — VLAN **137** — `10.0.137.0/24`
- **Mobile & IoT** — VLAN **70** — `10.0.70.0/24`
- **Guest** — VLAN **59** — `10.0.59.0/24`
- **Multimedia** — VLAN **40** — `10.0.40.0/24`

Principe de filtrage :

- **Deny inter-VLAN par défaut**.
- Ouverture **au cas par cas**, en privilégiant les flux vers les services “cœur”
  (Home Assistant, DNS, NTP) plutôt que des ouvertures larges.

## Conséquences

### Positives

- **POS-001**: Réduction du risque de propagation latérale en cas de compromission
  d’un équipement IoT.
- **POS-002**: Meilleure lisibilité : chaque zone a un rôle et des flux attendus.
- **POS-003**: Possibilité de durcir progressivement (règles, logs) sans changer
  l’architecture.

### Négatives

- **NEG-001**: Besoin de définir et maintenir des règles firewall inter-VLAN.
- **NEG-002**: Certaines découvertes réseau (mDNS/SSDP) peuvent nécessiter un
  relais/reflector ou des règles spécifiques.
- **NEG-003**: Un mauvais découpage peut ajouter de la friction (périphériques
  difficiles à appairer, casting, imprimantes).

## Alternatives envisagées

### Réseau plat

- **ALT-001**: **Description**: Tous les équipements dans le même réseau.
- **ALT-002**: **Raison de rejet**: Risque accru et absence de garde-fous entre
  équipements de confiance différente.

### Segmentation minimale (Invités uniquement)

- **ALT-003**: **Description**: Un VLAN Guest isolé, le reste dans le réseau
  principal.
- **ALT-004**: **Raison de rejet**: Les IoT restent mélangés au réseau de
  confiance, ce qui ne répond pas à l’objectif “least privilege”.

### Isolation extrême (un VLAN par catégorie d’IoT)

- **ALT-005**: **Description**: Multiplier les VLANs (capteurs, caméras, TV,
  assistants vocaux, imprimantes).
- **ALT-006**: **Raison de rejet**: Complexité d’exploitation disproportionnée
  pour un gain marginal, en tension avec **Rester simple**.

## Notes d’implémentation

- **IMP-001**: Placer les équipements IoT dans **Mobile & IoT (VLAN 70)**, les
  invités dans **Guest (VLAN 59)**, le multimédia dans **Multimedia (VLAN 40)**.
- **IMP-002**: Définir où réside le “cœur SmartHub” (Home Assistant et services
  associés) : **Trusted (VLAN 62)** ou **Lab 1337 (VLAN 137)**.
- **IMP-003**: Autoriser uniquement les flux nécessaires depuis **VLAN 70** vers
  le “cœur SmartHub” (ports/protocoles minimaux).
- **IMP-004**: Autoriser l’administration (UI, SSH si utilisé) depuis
  **Trusted (VLAN 62)** uniquement.
- **IMP-005**: Pour les besoins de découverte (mDNS/SSDP), préférer une
  configuration explicite (reflector ciblé) plutôt que l’ouverture large entre
  VLANs.
- **IMP-006**: Journaliser temporairement les refus inter-VLAN lors des phases
  d’ajout de nouveaux appareils pour ajuster finement les règles.

## Références

- **REF-001**: Guide de conception — principe **Rester simple** :
  https://frenck.dev/the-enterprise-smart-home-syndrome/
