# Serveurs

L'ensemble des services est réparti sur deux machines principales :

## Home Assistant Yellow
- **Matériel principal :** [Home Assistant Yellow PoE](https://www.home-assistant.io/yellow/)
- **Processeur :** [Compute Module 5 (CM5)](https://www.raspberrypi.com/products/compute-module-5/)
- **Stockage :** SSD NVMe
- **Usage :** Hébergement de toute la stack domotique critique sur une infrastructure dédiée, rapide et fiable.
- **Services hébergés :**
    - Home Assistant (HA)
    - Mosquitto (MQTT)
    - Zigbee2MQTT (Z2mqtt)

## Tywell Box
- **Produit :** [Tywell Box](https://www.tywell.fr/)
- **Rôle :** Passerelle domotique indépendante, principalement utilisée pour récupérer l'état des capteurs de fenêtre K•LINE ([voir capteurs](https://www.k-line.fr/ma-maison-connectee/capteurs-de-fenetre/)).
- **Protocole :** X3D
- **Intégration :** Connectée à l'écosystème domotique via [Tydom2MQTT](https://github.com/m4dm4rtig4n/tydom2mqtt) pour permettre l'intégration des équipements dans Home Assistant.
- **Gestion bioclimatique :** Utilisée dans un premier temps pour la gestion bioclimatique des ouvrants. Cette gestion pourra éventuellement être reprise plus tard directement dans Home Assistant via un Blueprint dédié.

## Lenovo ThinkCentre M700 Tiny
- **Machine :** Lenovo ThinkCentre M700 Tiny
- **Mémoire vive :** 8 Go de RAM
- **Usage :** Hébergement des composants secondaires et autres services sous forme de conteneurs Docker, permettant d'isoler et de gérer facilement différents services nécessaires à l'écosystème global.
- **Services hébergés :**
    - [Homebox](https://homebox.software/en/)
    - [Pi-hole](https://pi-hole.net/)
    - [Frigate](https://frigate.video/)
    - [Plate Recognizer](https://platerecognizer.com/)

### Accélérateur Coral USB
- **Produit :** [Coral USB Accelerator](https://www.coral.ai/products/accelerator)
- **Rôle :** Module d'accélération d'inférence IA (Edge TPU) connecté en USB au Lenovo, utilisé pour le traitement vidéo temps réel (par exemple avec Frigate) afin d'améliorer les performances de détection d'objets tout en réduisant la charge CPU.

!!! info "Frigate sur machine dédiée ?"
    Il est possible que Frigate soit finalement déployé sur une machine dédiée pour des raisons de performance ou d'isolation. Cette configuration sera évaluée selon les besoins réels et la charge du système.

## SMLIGHT SLZB-06M
- **Produit :** SMLIGHT - Adaptateur USB Ethernet POE Zigbee 3.0 EFR32MG21 (Référence : SLZB-06M)
- **Rôle :** Passerelle Zigbee 3.0 connectée en USB ou Ethernet (PoE), permettant l'intégration et la gestion des équipements Zigbee dans l'écosystème domotique. Offre une grande flexibilité d'installation et une compatibilité étendue avec Home Assistant et Zigbee2MQTT.
