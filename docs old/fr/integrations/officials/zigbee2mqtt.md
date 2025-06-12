# Intégration : Zigbee2MQTT

## Objectif
Permet d’utiliser vos périphériques Zigbee sans le pont ou la passerelle propriétaire du fabricant. Il relaie les événements et vous offre le contrôle de vos appareils Zigbee via MQTT, de sorte que vous puissiez les intégrer à n’importe quelle infrastructure domotique.

## Configuration minimale
```yaml
zigbee2mqtt:
  homeassistant: true
  permit_join: false
  mqtt:
    base_topic: zigbee2mqtt
    server: "mqtt://192.168.1.10:1883"
    user: !secret mqt_user
    password: !secret mqtt_password
```

## Configuration recommandée pour la sécurité et la fiabilité

### Sécurisation de l’accès
- Utilise des mots de passe forts dans `secrets.yaml` pour Zigbee2MQTT et le broker MQTT
- Active le chiffrement TLS sur le broker MQTT si possible
- N’expose jamais le port MQTT sur Internet sans protection
- Désactive `permit_join` sauf lors de l’appairage de nouveaux appareils Zigbee

### Performance et fiabilité
- Surveille l’utilisation CPU/mémoire du broker MQTT et de Zigbee2MQTT
- Mets à jour régulièrement Zigbee2MQTT, Mosquitto et Home Assistant
- Utilise un coordinateur Zigbee recommandé et à jour
- Active la découverte automatique MQTT dans Home Assistant

### Sauvegarde
- Sauvegarde la configuration de Zigbee2MQTT (`configuration.yaml`, base de données Zigbee2MQTT), la configuration du broker MQTT, et le fichier `secrets.yaml` de Home Assistant

!!! info "Pour aller plus loin"
    - [Documentation officielle Zigbee2MQTT](https://www.zigbee2mqtt.io/)
    - [Sécuriser Home Assistant](https://www.home-assistant.io/docs/security/)
    - [Best practices for securing your MQTT broker](https://www.home-assistant.io/integrations/mqtt/#securing-your-mqtt-broker)

## Références
- [Zigbee2MQTT - Documentation officielle](https://www.zigbee2mqtt.io/)
- [MQTT - Intégration Home Assistant](https://www.home-assistant.io/integrations/mqtt/)
- [Forum communauté Zigbee2MQTT](https://community.home-assistant.io/tag/zigbee2mqtt)
