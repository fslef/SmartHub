---
title: "ADR-0004: Accès distant via Home Assistant Cloud (Nabu Casa)"
status: "Accepted"
date: "2026-02-28"
authors: "Équipe SmartHub"
tags:
  - architecture
  - home-assistant
  - remote-access
  - security
supersedes: ""
superseded_by: ""
---

# ADR-0004 : Accès distant via Home Assistant Cloud (Nabu Casa)

## Status

Draft | Proposed | ==Accepted== | Rejected | Superseded | Deprecated

## Contexte

L’accès à distance est nécessaire pour consulter l’état de la maison et piloter
certains usages depuis l’extérieur (notifications, contrôle ponctuel, dépannage).

Les contraintes principales sont les suivantes :

- Réduire au minimum l’exposition d’un service sur Internet (pas de redirection de
  ports “au hasard”, pas d’auto-hébergement complexe).
- Préserver la confidentialité (chiffrement, minimisation des données transitant
  côté tiers).
- Maintenir une solution simple à opérer sur la durée (mises à jour, support,
  diagnostics).
- Favoriser, lorsque c’est raisonnable, une option qui soutient financièrement
  l’écosystème Home Assistant.

## Décision

Utiliser **Home Assistant Cloud**, fourni par **Nabu Casa**, pour l’accès distant
à l’instance Home Assistant.

Cette décision est motivée par :

- Une approche “service officiel” pensée pour éviter d’exposer directement
  l’instance sur Internet.
- Un positionnement explicite “privacy-first”.
- Le fait que l’abonnement contribue au financement de la fondation et du travail
  autour de l’Open Home.
- Un alignement avec le principe **Rester simple** (éviter d’empiler des couches
  d’infrastructure) : https://frenck.dev/the-enterprise-smart-home-syndrome/.

## Conséquences

### Positives

- **POS-001**: Mise en place rapide, sans infrastructure réseau dédiée.
- **POS-002**: Réduction de la surface d’exposition Internet (pas de port-forward
  direct vers Home Assistant).
- **POS-003**: Fonctionnalité supportée par l’écosystème officiel Home Assistant.
- **POS-004**: Contribution au financement du travail Open Home via
  l’abonnement.

### Négatives

- **NEG-001**: Dépendance à un service tiers et à sa disponibilité.
- **NEG-002**: Coût récurrent (abonnement).
- **NEG-003**: Risque de verrouillage (flux et habitudes outillées autour d’un
  fournisseur précis).
- **NEG-004**: Certains cas avancés peuvent rester plus flexibles via une
  solution VPN ou reverse proxy.

## Alternatives envisagées

### Reverse proxy + certificats (auto-hébergé)

- **ALT-001**: **Description**: Exposer Home Assistant via un reverse proxy
  (par exemple Nginx/Caddy/Traefik) avec TLS et durcissement.
- **ALT-002**: **Raison de rejet**: Complexité opérationnelle et risque accru
  d’erreurs (exposition Internet, configuration TLS, mises à jour, WAF).

### VPN vers le réseau domestique

- **ALT-003**: **Description**: Accès distant via un VPN (par exemple WireGuard)
  pour atteindre Home Assistant comme sur le LAN.
- **ALT-004**: **Raison de rejet**: Besoin d’une configuration réseau et client
  (certains appareils, invités, automatisations) qui peut dégrader la simplicité
  et l’adoption.

### Tunnel managé (tiers)

- **ALT-005**: **Description**: Tunnel sortant (par exemple Cloudflare Tunnel)
  pour publier Home Assistant sans port-forward.
- **ALT-006**: **Raison de rejet**: Dépendance à un tiers non centré Home
  Assistant, modèle de confiance différent, intégration moins “native” et objectif
  de soutien financier à l’écosystème Home Assistant moins direct.

## Notes d’implémentation

- **IMP-001**: Activer Home Assistant Cloud depuis **Paramètres > Home Assistant
-  Cloud** et finaliser l’association au compte Nabu Casa.
- **IMP-002**: Vérifier l’absence de redirection de ports vers Home Assistant
  (et la supprimer si elle existe).
- **IMP-003**: Activer l’authentification multifacteur sur le compte associé,
  revoir les utilisateurs et droits côté Home Assistant.
- **IMP-004**: Définir un critère de succès simple : accès distant fonctionnel
  sur mobile en 4G, sans configuration VPN, et sans erreurs récurrentes.

## Références

- **REF-001**: Nabu Casa — Home Assistant Cloud :
  https://www.nabucasa.com/
- **REF-002**: Nabu Casa — “Our commitment to Home Assistant” :
  https://www.nabucasa.com/about/
- **REF-003**: Home Assistant — page “Home Assistant Cloud” :
  https://www.home-assistant.io/cloud/
