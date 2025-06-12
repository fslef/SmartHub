# Intégration : MQTT

## Objectif
Permet à Home Assistant d’échanger des données avec des appareils et services compatibles MQTT, comme Zigbee2MQTT ou Shelly, pour centraliser l’automatisation et la supervision dans ton installation domotique.

## Configuration

### Minimale
```yaml
mqtt:
  broker: 192.168.1.10
  port: 8883
  username: !secret mqtt_user
  password: !secret mqtt_password
```

### Bonnes pratiques
- ==Sécurité :== Utilise des mots de passe forts dans `secrets.yaml` (voir [documentation Home Assistant](https://www.home-assistant.io/docs/configuration/secrets/))
- ==Sécurité :== Active le chiffrement TLS pour toutes les connexions externes (voir [TLS Mosquitto](https://www.home-assistant.io/integrations/mqtt/#tls-support))
- ==Sécurité :== N’expose jamais le port MQTT sur Internet sans protection (voir [sécuriser l'accès distant](https://www.home-assistant.io/docs/configuration/remote/))
- Mets à jour régulièrement Mosquitto et Home Assistant pour bénéficier des correctifs de sécurité et de stabilité (voir [mise à jour Home Assistant](https://www.home-assistant.io/docs/installation/updating/))
- Surveille l’utilisation CPU/mémoire du broker pour éviter les saturations (voir [supervision Mosquitto](https://mosquitto.org/man/mosquitto-8.html))
- Sauvegarde la configuration du broker, les identifiants d’accès et le fichier `secrets.yaml` pour une restauration rapide (voir [sauvegardes Home Assistant](https://www.home-assistant.io/common-tasks/backup/))

## Références
- [MQTT — Documentation officielle Home Assistant](https://www.home-assistant.io/integrations/mqtt/)
