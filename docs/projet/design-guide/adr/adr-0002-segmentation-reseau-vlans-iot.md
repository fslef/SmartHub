---
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

Cet ADR décrit comment segmenter le réseau domestique pour isoler les objets
connectés et rendre les flux réseau plus explicites.

## Contexte

Les équipements connectés (IoT, multimédia, invités) n’ont pas le même niveau de
confiance ni les mêmes besoins réseau. Dans un réseau unique (non segmenté), un
appareil compromis peut plus facilement atteindre des services de confiance, et
les flux deviennent opaques.

Enjeux :

- Réduire l’impact d’un appareil IoT compromis (limiter les mouvements latéraux).
- Rendre explicites les flux autorisés (moindre privilège).
- Garder une exploitation simple (diagnostic, ajout d’appareils, évolutions).

## Décision

Segmenter le réseau en VLAN dédiés, avec un filtrage inter-VLAN par défaut
restrictif.

VLAN existants :

- **Default** — VLAN **1** — `10.0.10.0/24`
- **Trusted** — VLAN **62** — `10.0.62.0/24`
- **Lab 1337** — VLAN **137** — `10.0.137.0/24`
- **Mobile & IoT** — VLAN **70** — `10.0.70.0/24`
- **Guest** — VLAN **59** — `10.0.59.0/24`
- **Multimedia** — VLAN **40** — `10.0.40.0/24`

Principe de filtrage :

- **Deny inter-VLAN par défaut**.
- Ouverture **au cas par cas** (règles explicites), en privilégiant les flux vers
  les services “cœur” (Home Assistant, DNS, NTP) plutôt que des ouvertures
  larges.

Prérequis :

- Un routeur/firewall capable de filtrer entre VLAN.
- Des équipements réseau managés (switch et Wi-Fi) capables de porter des VLAN.

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
- **NEG-004**: Complexité matérielle : sans switch/AP managés, la segmentation est
  difficile à déployer proprement.

## Alternatives envisagées

### Réseau unique (non segmenté)

- **ALT-001**: **Description**: Tous les équipements dans le même réseau.
- **ALT-002**: **Raison de rejet**: Risque accru et absence de garde-fous entre
  équipements de confiance différente.

### Segmentation minimale (Invités uniquement)

- **ALT-003**: **Description**: Un VLAN Guest isolé, le reste dans le réseau
  principal.
- **ALT-004**: **Raison de rejet**: Les IoT restent mélangés au réseau de
  confiance, ce qui ne répond pas à l’objectif “least privilege”.

### Isolation extrême (un VLAN par catégorie d’IoT)

- **ALT-005**: **Description**: Multiplier les VLAN (capteurs, caméras, TV,
  assistants vocaux, imprimantes).
- **ALT-006**: **Raison de rejet**: Complexité d’exploitation disproportionnée
  pour un gain marginal, en tension avec **Rester simple**.

## Notes d’implémentation

- **IMP-001**: Placer les équipements IoT dans **Mobile & IoT (VLAN 70)**, les
  invités dans **Guest (VLAN 59)**, le multimédia dans **Multimedia (VLAN 40)**.
- **IMP-002**: Le “cœur du SmartHub” (Home Assistant et services associés) réside
  dans **Lab 1337 (VLAN 137)**.
- **IMP-003**: N’autoriser que les flux nécessaires entre VLAN (ports/protocoles
  minimaux), au cas par cas.
- **IMP-004**: Autoriser l’administration (UI, SSH si utilisé) depuis
  **Trusted (VLAN 62)** uniquement.
- **IMP-005**: Pour les besoins de découverte (mDNS/SSDP), préférer une
  configuration explicite (reflector ciblé) plutôt que l’ouverture large entre
  VLAN (voir la documentation UniFi :
  [UniFi Gateway - Multicast DNS](https://help.ui.com/hc/en-us/articles/12648701398807-UniFi-Gateway-Multicast-DNS)).
- **IMP-006**: Journaliser temporairement les refus inter-VLAN lors des phases
  d’ajout de nouveaux appareils pour ajuster finement les règles.

## Références

- **REF-001**: Guide de conception — principe **Rester simple** :
  <https://frenck.dev/the-enterprise-smart-home-syndrome/>
- **REF-002**: UniFi — mDNS entre VLAN (Multicast DNS) :
  <https://help.ui.com/hc/en-us/articles/12648701398807-UniFi-Gateway-Multicast-DNS>
- **REF-003**: UniFi — Utiliser des VLAN pour sécurité et performance :
  <https://help.ui.com/hc/en-us/articles/26136851868695-Using-VLANs-for-Network-Security-and-Performance>
- **REF-004**: UniFi — Gérer le trafic broadcast/multicast (mDNS, Bonjour) :
  <https://help.ui.com/hc/en-us/articles/27384925962647-Managing-Broadcast-Traffic-with-UniFi>
- **REF-005**: UniFi — Pare-feu par zones (Zone-Based Firewalls) :
  <https://help.ui.com/hc/en-us/articles/115003173168-Zone-Based-Firewalls-in-UniFi>
- **REF-006**: UniFi — Gestion du trafic et des politiques (Policy Engine) :
  <https://help.ui.com/hc/en-us/articles/5546542486551>
