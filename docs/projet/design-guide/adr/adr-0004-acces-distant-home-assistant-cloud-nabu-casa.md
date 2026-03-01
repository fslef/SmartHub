---
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

L’accès distant sert à consulter, piloter et intervenir sur mon SmartHub depuis l’extérieur
(mobile en 4G, voyage). L’enjeu principal est la sécurité : exposer Home Assistant
sur Internet augmente la surface d’attaque et le risque d’erreur de configuration.

Contraintes :

- Exposition minimale sur Internet (éviter les redirections de ports et la
  complexité d’un auto-hébergement “à maintenir”).
- Confidentialité : chiffrement et minimisation des données côté tiers.
- Exploitation : solution simple à opérer (mises à jour, support, diagnostics).
- Écosystème : si possible, soutenir financièrement Home Assistant.

## Décision

Utiliser **Home Assistant Cloud**, fourni par **Nabu Casa**, pour l’accès distant
à l’instance Home Assistant (voir l’offre :
[Pricing Nabu Casa](https://www.nabucasa.com/pricing/)).

Critères de choix :

- Éviter d’exposer directement Home Assistant sur Internet.
- Approche “privacy-first” (chiffrement, minimisation côté tiers).
- Exploitation simple et support officiel.
- L’abonnement contribue au financement de Home Assistant et de la
  [Fondation Open Home](https://www.openhomefoundation.org/).

## Conséquences

### Positives

- **POS-001**: Mise en place rapide, sans infrastructure réseau dédiée.
- **POS-002**: Réduction de la surface d’exposition Internet (pas de port-forward
  direct vers Home Assistant).
- **POS-003**: Fonctionnalité supportée par l’écosystème officiel Home Assistant.
- **POS-004**: Contribution au financement du travail de la Fondation Open Home
  via l’abonnement.

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
  Assistant, modèle de confiance différent, intégration moins “native”, et aussi
  contraire au principe de simplicité (nécessite de déployer et opérer des
  ressources dédiées).

## Notes d’implémentation

- **IMP-001**: Activer Home Assistant Cloud depuis
  **Paramètres > Home Assistant Cloud** et finaliser l’association au compte
  Nabu Casa.
- **IMP-002**: Vérifier l’absence de redirection de ports vers Home Assistant
  (et la supprimer si elle existe).
- **IMP-003**: Activer l’authentification multifacteur sur le compte associé,
  revoir les utilisateurs et droits côté Home Assistant.
- **IMP-004**: Définir un critère de succès simple : accès distant fonctionnel
  sur mobile en 4G, sans configuration VPN, et sans erreurs récurrentes.

## Références

- **REF-001**: Nabu Casa — Home Assistant Cloud :
  <https://www.nabucasa.com/>
- **REF-002**: Nabu Casa — “Our commitment to Home Assistant” :
  <https://www.nabucasa.com/about/>
- **REF-003**: Home Assistant — page “Home Assistant Cloud” :
  <https://www.home-assistant.io/cloud/>
- **REF-004**: Nabu Casa — Pricing :
  [https://www.nabucasa.com/pricing/](https://www.nabucasa.com/pricing/)
- **REF-005**: Fondation Open Home :
  [https://www.openhomefoundation.org/](https://www.openhomefoundation.org/)
