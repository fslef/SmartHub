# ADR

Cette section regroupe les _Architecture Decision Records_ (ADR) du projet.

Un ADR sert à **garder une trace courte d’un choix structurant** (réseau, sécurité,
stockage, dépendances cloud), pour que tu n’aies pas à “réapprendre” plus tard
pourquoi un compromis a été fait.

Concrètement, un ADR capture, de manière concise et durable :

- le **contexte** (ce qui pose problème, les contraintes)
- la **décision** (ce qui est choisi)
- les **conséquences** (impacts, compromis, ce que ça change au quotidien)

## Quand créer un ADR

Crée un ADR quand une décision :

- a un **impact durable** (tu ne veux pas la re-débattre chaque mois)
- touche à la **fiabilité** (pannes, latence), la **sécurité** ou la **vie privée**
- introduit une **dépendance** (matériel, service, abonnement, contrainte réseau)

## Status possibles

Le champ **Status** indique l’état de la décision dans le temps (il doit être
cohérent avec le frontmatter `status` de l’ADR).

::: info Légende des statuts
Dans chaque ADR, le status **actif** est surligné avec la syntaxe Markdown
`==...==` (par exemple `==Accepted==`).

Statuts utilisés dans SmartHub :

- `Draft` : brouillon. L’ADR peut changer à tout moment.
- `Proposed` : décision proposée, pas encore validée.
- `Accepted` : décision validée et considérée comme la référence actuelle.
- `Rejected` : décision étudiée mais non retenue.
- `Superseded` : décision remplacée par une autre ADR plus récente.
- `Deprecated` : décision encore documentée, mais à éviter pour du nouveau.
:::

## Format attendu

Dans SmartHub, un ADR suit le même squelette :

- **Status** (Proposed, Accepted, Rejected, Superseded, Deprecated)
- **Contexte**
- **Décision**
- **Conséquences**
