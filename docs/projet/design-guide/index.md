# Guide de conception

Ce guide fixe des principes de conception pour garder **mon SmartHub** **stable**,
**facile à maintenir** et **simple à faire évoluer** dans le temps, même quand
les outils ou les intégrations changent.

Il sert aussi à **expliquer** certains choix structurants et à les **tracer** : quand une décision a un impact durable, elle est formalisée dans un ADR (_Architecture Decision Record_) pour conserver le contexte, la décision et ses compromis.

## Principes directeurs

Ces principes aident à trancher vite, sans réinventer des règles à chaque changement d’outil.

| Principe | Explication |
| --- | --- |
| **Rester simple** (_Keep it simple_) | Évite de transformer une maison en “SI d’entreprise” (trop de couches, trop d’outils, trop de dépendances), sinon le coût se paie en pannes et en temps passé à maintenir l’ensemble de l’écosystème. Référence clé : [The Enterprise Smart Home Syndrome](https://frenck.dev/the-enterprise-smart-home-syndrome/) (frenck). |
| **Vie privée d’abord** (_Privacy first_) | Favorise le traitement local. Pour évaluer rapidement l’exposition au cloud d’une intégration, s’appuyer sur la [classification des intégrations Home Assistant](https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things/#classifiers). Si le cloud est utilisé, le faire en connaissance de cause et limiter les données partagées au strict nécessaire. |
| **Acceptation par la famille** (_Family acceptance_) | Les automatisations doivent être le plus transparentes possible, sans avoir besoin d’explication pour être utilisées. Tout doit fonctionner de manière évidente et fiable pour les autres membres du foyer, incluant les enfants et les invités, par exemple en conservant l’usage naturel des interrupteurs. Source : [Creating a Kid-Friendly Smart Home](https://blog.smartthings.com/smartthings-updates/kid-friendly-smart-home/) (SmartThings, “FAF”). |
| **Documenter les décisions** | Quand un choix a un impact durable (réseau, sécurité, stockage, dépendances cloud), noter le contexte et la raison du choix pour éviter de “réapprendre” plus tard. |

Ces principes directeurs sont complétés par des [ADR](/projet/design-guide/adr/) (_Architecture Decision Records_) pour formaliser les décisions structurantes.
