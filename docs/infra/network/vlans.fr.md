# :material-lan: Homelab VLAN Design & Segmentation

## :material-information-outline: Objectif

Cette documentation décrit l'architecture de segmentation réseau par VLANs dans le cadre d'un homelab avancé. L'approche suit les principes Zero Trust, la micro-segmentation, et une organisation par rôles fonctionnels.

## :material-format-list-bulleted: VLANs définis

| VLAN ID | Nom VLAN         | Description |
|---------|------------------|-------------|
| `10`    | **Infra-Network** :material-server-network: | Administration des équipements réseau : switchs, firewall, routeurs, IPMI. Utilisé exclusivement pour la gestion hors bande. |
| `20`    | **Security** :material-shield-lock: | Composants de sécurité : SIEM, IDS, log collectors, agents audit. Collecte de journaux uniquement ; aucun accès sortant. |
| `30`    | **IoT-Devices** :material-robot-outline: | Capteurs, ESP, modules connectés passifs. Aucun trafic latéral autorisé. Communique uniquement avec `IoT-Services`. |
| `31`    | **Cameras** :material-cctv: | Caméras IP, NVR. Flux vidéo uniquement. Communication permise vers stockage (NAS) ou supervision. |
| `33`    | **IoT-Services** :material-home-assistant: | Contrôleurs domotiques (Home Assistant, Mosquitto, Zigbee2MQTT). Services exposés via Ingress sécurisé. |
| `34`    | **Makerspace** :material-hammer-screwdriver: | Prototypage personnel : imprimantes 3D, OctoPrint, CNC. Accès restreint aux postes de travail de confiance. |
| `40`    | **User-Trusted** :material-laptop: | Postes approuvés (perso ou pro) : laptops, desktops, VMs. Accès filtré aux services internes. |
| `60`    | **User-Guest** :material-account-question: | Accès Internet-only pour invités. Aucune visibilité ni communication LAN. |
| `70`    | **Printing** :material-printer: | Imprimantes réseau partagées. Accès via mDNS relay ou CUPS selon filtrage. |
| `80`    | **NAS** :material-harddisk: | NAS, stockage partagé (NFS, SMB, S3). Source de sauvegarde et persistance K8s. |
| `90`    | **Infra-Servers** :material-server: | Nœuds Talos Kubernetes, API Talos, API K8s. Accessible uniquement depuis `Infra-Network` et `User-Trusted` selon règles strictes. |

## :material-lightbulb-on-outline: Principes de conception

- :material-cogs: **Micro-segmentation** : chaque rôle réseau ou appareil a un VLAN dédié.
- :material-security: **Zero Trust** : aucune communication inter-VLAN autorisée sans contrôle explicite.
- :material-router-wireless: **L3 Firewall Routing** : tous les flux sont inspectés, filtrés et journalisés.
- :material-code-tags: **GitOps Ready** : nommage exploitable dans Terraform, Ansible, NetBox, etc.

## :material-lan-connect: Routage & Accès

### Flux réseau typiques

- `IoT-Devices` → `IoT-Services` : ports MQTT, HTTP API (limités, unidirectionnels)
- `Cameras` → `NAS` : ports NFS, SMB
- `User-Trusted` → `IoT-Services`, `Infra-Servers`, `Makerspace` : selon ACL
- `Security` → tous : collecte de logs via syslog, fluentbit, agent, NetFlow
- `User-Guest` → Internet uniquement (DNS + HTTP/S sortant)

## :material-file-tree-outline: Structuration Unifi

Créer des profils VLAN dans Unifi Network en vous basant sur :

- Nom : identique à la colonne "Nom VLAN"
- VLAN ID : correspondance 1:1
- Description : utiliser celle du tableau ci-dessus

Regrouper dans des catégories logiques :

- `infra-*`
- `iot-*`
- `user-*`
- `printing`, `security`, `nas`

## :material-lan-check: Exemple d’assignation de port

| Port switch | VLAN assigné       | Mode         |
|-------------|--------------------|--------------|
| Port 1      | Infra-Network      | Access       |
| Port 2-3    | User-Trusted       | Access       |
| Port 4      | Cameras            | Access       |
| Port 5      | NAS                | Trunk        |
| Port 6      | Infra-Servers      | Trunk (Talos)|

## :material-ip: Plan d'adressage IP recommandé

| VLAN ID | Nom VLAN       | CIDR           | Passerelle IP |
|---------|----------------|----------------|----------------|
| `10`    | Infra-Network  | 10.10.10.0/24  | 10.10.10.1     |
| `20`    | Security       | 10.10.20.0/24  | 10.10.20.1     |
| `30`    | IoT-Devices    | 10.10.30.0/24  | 10.10.30.1     |
| `31`    | Cameras        | 10.10.31.0/24  | 10.10.31.1     |
| `33`    | IoT-Services   | 10.10.33.0/24  | 10.10.33.1     |
| `34`    | Makerspace     | 10.10.34.0/24  | 10.10.34.1     |
| `40`    | User-Trusted   | 10.10.40.0/24  | 10.10.40.1     |
| `60`    | User-Guest     | 10.10.60.0/24  | 10.10.60.1     |
| `70`    | Printing       | 10.10.70.0/24  | 10.10.70.1     |
| `80`    | NAS            | 10.10.80.0/24  | 10.10.80.1     |
| `90`    | Infra-Servers  | 10.10.90.0/24  | 10.10.90.1     |

## :material-fire: Points de vigilance

- Ne jamais autoriser le trafic sortant de `IoT-Devices`, `Cameras`, ou `User-Guest` vers `User-Trusted`, `Infra-*`, ou `Security`.
- Toujours loguer les accès à `Infra-Servers` et `IoT-Services`.
- Appliquer des NetworkPolicy (Kubernetes) et firewall L3 (Unifi) pour chaque flux autorisé.

## :material-file-document-outline: Notes finales

Ce modèle peut être adapté à des contextes plus larges (lab multi-site, SOC, cloud-hybride). Il est recommandé de versionner cette configuration avec les manifests K8s et les règles firewall associées.
