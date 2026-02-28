# Infrastructure

Cette section décrit brièvement l’infrastructure (matériel, réseau, stockage) sur laquelle tournent SmartHub et Home Assistant.

## Vue d’ensemble

- **Calcul** : un mini PC HP qui sert d’hôte Docker pour exécuter les conteneurs.
- **Stockage** : un NAS Synology qui héberge les données persistantes des conteneurs et les sauvegardes Home Assistant.
- **Réseau** : une connexion Internet qui arrive sur une Cloud Gateway UniFi, puis distribution via un switch UniFi et une borne Wi‑Fi UniFi.

::: info Détails à venir
Tu détailleras la configuration (Docker, partages du NAS, segmentation réseau, Wi‑Fi) dans des sous-pages dédiées.
:::

## Schéma de l’installation (C4)

Le diagramme ci-dessous montre les éléments principaux et leurs liens : calcul (hôte Docker), stockage (NAS) et réseau (UniFi).

```plantuml[Schéma C4 de l’infrastructure]
@startuml
!include <C4/C4_Container>

LAYOUT_TOP_DOWN()

System_Ext(internet, "Internet", "WAN (FAI)", "Connexion fournie par ton opérateur")

System_Boundary(lan, "Réseau local") {
  Container(gateway, "Cloud Gateway UniFi", "Routeur / pare-feu", "Termine l’accès Internet, assure le routage et le filtrage")

  together {
    Container(switch, "Switch UniFi", "Commutation Ethernet", "Relie les équipements filaires du réseau local")
    Container(ap, "Borne Wi‑Fi UniFi", "Point d’accès Wi‑Fi", "Fournit l’accès Wi‑Fi au réseau local")
  }

  together {
    Container(host, "Mini PC HP", "Linux + Docker", "Machine hôte qui exécute les conteneurs")
    System(nas, "NAS Synology", "Stockage réseau", "Données persistantes des conteneurs et sauvegardes Home Assistant")
  }

  Container(ha, "Home Assistant", "Conteneur", "Plateforme domotique : automatisations, intégrations, supervision")
}

Rel(internet, gateway, "Fournit la connectivité")
Rel(gateway, switch, "Réseau local")
Rel(switch, ap, "Uplink")
Rel(switch, host, "Ethernet")
Rel(switch, nas, "Ethernet")

Rel(host, ha, "Héberge")
Rel(ha, nas, "Lit/écrit", "Stockage persistant + sauvegardes")

' Indices de mise en page : garder certains éléments au même niveau
switch -[hidden]-> ap
host -[hidden]-> nas

@enduml
```
