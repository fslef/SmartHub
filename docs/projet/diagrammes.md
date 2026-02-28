---
sidebar: false
---

# Démo : diagrammes (Kroki + PlantUML)

Cette page te montre comment écrire des diagrammes _diagram-as-code_ dans SmartHub.

::: info
Les diagrammes sont rendus par **Kroki** depuis des blocs `plantuml`.
Si tu auto-héberges Kroki, tu peux définir `KROKI_ENDPOINT` au moment du build.
:::

## C4 (contexte)

Exemple _fictif_ et volontairement simplifié.

```plantuml[Contexte C4 (exemple)]
@startuml
!include <C4/C4_Context>

Person(occupant, "Occupant", "Vit dans la maison")
System(smarthub, "SmartHub", "Supervision et automatisation")
System_Ext(homeAssistant, "Home Assistant", "Orchestration domotique")

Rel(occupant, smarthub, "Consulte et pilote")
Rel(smarthub, homeAssistant, "Échange des états et des commandes")

@enduml
```

## C4 (conteneurs)

```plantuml[Conteneurs C4 (exemple)]
@startuml
!include <C4/C4_Container>

Person(occupant, "Occupant", "Vit dans la maison")

System_Boundary(smarthubBoundary, "SmartHub") {
  Container(ui, "Tableau de bord", "Web", "Affiche l’état et des actions")
  Container(api, "API", "HTTP", "Expose les données et commandes")
}

System_Ext(homeAssistant, "Home Assistant", "Orchestration domotique")

Rel(occupant, ui, "Utilise")
Rel(ui, api, "Appelle")
Rel(api, homeAssistant, "Intègre")

@enduml
```

## PlantUML (séquence)

```plantuml[Séquence (exemple)]
@startuml
actor Occupant as O
participant "SmartHub" as S
participant "Home Assistant" as H

O -> S: Demande l’état
S -> H: Lit l’état
H --> S: État courant
S --> O: Affiche l’état
@enduml
```
