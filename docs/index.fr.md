Bienvenue dans la documentation de mon SmartHub, mon système de maison intelligente.

Cette documentation détaille comment j'ai configuré mon installation domotique, depuis l'infrastructure réseau jusqu'aux automatisations quotidiennes.

## :material-lightbulb-on: Motivations

Ce projet est né d'un projet de construction de maison, qui m'a amené à repenser entièrement ma future installation domotique. J'utilise Home Assistant depuis août 2021, j'ai souhaité documenter cette nouvelle approche pour :

- Tirer les leçons de mes erreurs passées et éviter de les reproduire
- Partager mon expérience, car partager c'est apprendre deux fois
- Créer une référence pour mes futures modifications et améliorations
- Contribuer à la communauté

## :material-magnify: Vue d'ensemble

Mon SmartHub est composé de plusieurs éléments :

- Une infrastructure réseau sécurisée et segmentée
- Une configuration Docker pour déployer facilement les services
- Une installation Home Assistant avec des automatisations personnalisées
- Des intégrations avec divers périphériques Zigbee

## :material-tools: Principales technologies utilisées

Ce projet s'appuie sur plusieurs technologies clés :

- **Home Assistant** : plateforme centrale de gestion domotique open-source
- **Docker & Docker Compose** : pour le déploiement et l'isolation des services
- **Zigbee** : protocole de communication sans fil pour objets connectés à faible consommation
- **MQTT** : protocole de messagerie léger pour l'Internet des objets
- A l'étude
    - **Grafana & InfluxDB** : pour la visualisation et le stockage des données de capteurs
    - Une **solution de monitoring de sécurité** pour surveiller et detecter tout événement de sécurité.

## :material-rocket-launch: Pour commencer

Pour explorer cette documentation :

1. Consultez la **Configuration Réseau** pour comprendre l'architecture
2. Découvrez la **Configuration Docker** pour le déploiement des services
3. Explorez la **Configuration Home Assistant** pour les intégrations
4. Inspirez-vous des **Automatisations** pour créer vos propres scénarios