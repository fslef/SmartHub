# Infrastructure

Cette section décrit brièvement l’infrastructure (matériel, réseau, stockage) sur laquelle tournent SmartHub et Home Assistant, pour que tu saches où vivent les services et où vont les données.

## Vue d’ensemble

- **Calcul** : un mini PC HP qui sert d’hôte Docker pour exécuter les conteneurs.
- **Stockage** : un NAS Synology qui héberge les données persistantes des conteneurs et les sauvegardes Home Assistant.
- **Réseau** : une connexion Internet qui arrive sur une Cloud Gateway UniFi, puis distribution via un switch UniFi et une borne Wi‑Fi UniFi.

::: info Détails à venir
Tu détailleras la configuration (Docker, partages du NAS, segmentation réseau, Wi‑Fi) dans des sous-pages dédiées.
:::

## Schéma de l’installation (C4)

Le diagramme ci-dessous montre les éléments principaux et les flux essentiels : accès à l’interface Home Assistant, chemin réseau, et stockage persistant sur le NAS.

```plantuml[Schéma C4 de l’infrastructure]
@startuml
!include <C4/C4_Container>

LAYOUT_TOP_DOWN()

Person(admin, "Toi", "Administres et utilises Home Assistant")
System_Ext(internet, "Internet", "Accès WAN")

System_Boundary(lan, "Réseau local") {
  Container(gateway, "Cloud Gateway UniFi", "Routeur / pare-feu", "Connexion WAN, routage, services réseau")
  Container(switch, "Switch UniFi", "Switch", "Distribution réseau filaire")
  Container(ap, "Borne Wi‑Fi UniFi", "Point d’accès", "Accès Wi‑Fi au réseau local")

  Container(host, "Mini PC HP", "Hôte Docker", "Exécute les conteneurs")
  Container(ha, "Home Assistant", "Conteneur", "Automatisation et supervision")

  System(nas, "NAS Synology", "Stockage", "Données persistantes des conteneurs et sauvegardes")
}

Rel(admin, ha, "Accède à l’interface", "LAN (Wi‑Fi ou filaire)")

Rel(internet, gateway, "Fournit la connectivité")
Rel(gateway, switch, "Réseau local")
Rel(switch, ap, "Uplink")
Rel(switch, host, "Ethernet")
Rel(switch, nas, "Ethernet")

Rel(host, ha, "Héberge")
Rel(ha, nas, "Lit/écrit", "Stockage persistant + sauvegardes")
Rel(ha, internet, "Accède", "Mises à jour, intégrations cloud (si utilisées)")

@enduml
```
