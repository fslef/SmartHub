# Infrastructure

Cette section décrit brièvement l’infrastructure (matériel, réseau, stockage) sur laquelle tournent SmartHub et Home Assistant.

## Vue d’ensemble

- **Calcul** : un mini PC HP qui sert d’hôte Docker pour exécuter les conteneurs.
- **Stockage** : un NAS Synology qui héberge les données persistantes des conteneurs et les sauvegardes Home Assistant.
- **Réseau** : une connexion Internet qui arrive sur une Cloud Gateway UniFi, puis distribution via un switch UniFi et une borne Wi‑Fi UniFi.

::: info Détails à venir
Je détaillerai la configuration (Docker, partages du NAS, segmentation réseau, Wi‑Fi) dans des sous-pages dédiées.
:::

## Schéma de l’installation

Le diagramme ci-dessous montre les éléments principaux:

```plantuml[Schéma C4 de l’infrastructure]
@startuml
!include <C4/C4_Container>

' Un peu plus large pour éviter le retour à la ligne
skinparam wrapWidth 260

' Augmente la résolution du rendu PNG (réduit la pixelisation)
skinparam dpi 400

' Boundary "system" sans la ligne de type (ex. "[System]")
AddBoundaryTag("systemNoType", $SYSTEM_BOUNDARY_BG_COLOR, $SYSTEM_BOUNDARY_COLOR, $SYSTEM_BOUNDARY_COLOR, "", "", "", "", DashedLine())

' Couleurs par type d’équipement (lisibles et cohérentes)
' - calcul (mini PC) : fond plus soutenu
' - applications (stack) : fond plus pastel (plus clair que le mini PC)
' - stockage (NAS) : autre teinte distincte
AddElementTag("compute", #7E4CC9, #FFFFFF, #6F42C1, "")
AddElementTag("apps", #8E5CD9, #FFFFFF, #7E4CC9, "")
AddElementTag("storage", #3451B2, #FFFFFF, #3A5CCC, "")

<style>
title {
  HorizontalAlignment right
}
</style>

!$iconOrange = "<img:https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/orange.png{scale=0.18}>"
!$iconUnifi = "<img:https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/unifi.png{scale=0.05}>"
!$iconHp = "<img:https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/hp.png{scale=0.05}>"
!$iconHomeAssistant = "<img:https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/home-assistant.png{scale=0.05}>"
!$iconSynology = "<img:https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/synology.png{scale=0.05}>"

LAYOUT_TOP_DOWN()

hide stereotype

skinparam defaultTextAlignment center
System_Ext(internet, "$iconOrange", "Fibre Orange")

skinparam defaultTextAlignment left

Boundary(lan, "Réseau local", "", "systemNoType") {
  Container(gateway, "$iconUnifi Cloud Gateway UniFi", "Routeur / pare-feu", "Assure le routage et le filtrage réseau")

  Container(switch, "$iconUnifi Switch UniFi", "Commutation Ethernet", "Relie les équipements filaires du réseau local")
  Container(ap, "$iconUnifi Borne Wi‑Fi UniFi", "Point d’accès Wi‑Fi", "Fournit l’accès Wi‑Fi au réseau local")

  Container(host, "$iconHp Mini PC HP", "Linux + Docker", "Hôte qui exécute les conteneurs Docker", "", "compute")
  Container(nas, "$iconSynology NAS Synology", "Stockage réseau", "Volumes persistants Docker et sauvegardes Home Assistant", "", "storage")

  Container(ha, "$iconHomeAssistant Stack Docker Home Assistant", "Conteneur Docker", "Home Assistant, Mosquitto, Z2M, ...", "", "apps")

  ' Force `host` et `nas` sur la même ligne
  host -[hidden]right-> nas

  ' Force `ha` sous `host`
  host -[hidden]down-> ha

  ' Force `nas` au-dessus de `ha`
  nas -[hidden]down-> ha
}

Rel_D(internet, gateway, "")
Rel_D(gateway, switch, "Réseau local")
Rel_R(switch, ap, "Uplink")
Rel_D(switch, host, "Ethernet")
Rel_D(switch, nas, "Ethernet")

Rel_D(host, ha, "Héberge")
Rel(ha, nas, "Lit/écrit", "Stockage persistant + sauvegardes")

@enduml
```
