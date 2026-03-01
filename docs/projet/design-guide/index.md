# Guide de conception

Ce guide te donne des principes simples pour décider vite, garder un SmartHub fiable et éviter que la maison connectée ne devienne un empilement fragile (pannes, latence, maintenance constante), même quand les choix techniques évoluent.

## Pourquoi ces principes

## Principes directeurs

Ces principes aident à trancher vite, sans réinventer des règles à chaque changement d’outil.

| Principe | Explication |
| --- | --- |
| **Rester simple** (_Keep it simple_) | Évite de transformer une maison en “SI d’entreprise” (trop de couches, trop d’outils, trop de dépendances), sinon le coût se paie en pannes et en temps passé à maintenir l’ensemble de l’écosystème. Référence clé : [The Enterprise Smart Home Syndrome](https://frenck.dev/the-enterprise-smart-home-syndrome/) (frenck). |
| **Vie privée d’abord** (_Privacy first_) | Favorise le traitement local. Pour évaluer rapidement l’exposition au cloud d’une intégration, s’appuyer sur la classification Home Assistant (classifiers : Local Push/Local Polling/Cloud Push/Cloud Polling) : <https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things/#classifiers>. Si du cloud est utilisé, le faire en connaissance de cause et limiter les données partagées au strict nécessaire. |
| **Acceptation par la famille** (_Family acceptance_) | Les automatisations doivent être le plus transparentes possible, sans avoir besoin d’explication pour être utilisées. Tout doit fonctionner de manière évidente et fiable pour les autres membres du foyer, incluant les enfants et les invités, par exemple en conservant l’usage naturel des interrupteurs. Source : [Creating a Kid-Friendly Smart Home](https://blog.smartthings.com/smartthings-updates/kid-friendly-smart-home/) (SmartThings, “FAF”). |
| **Documenter les décisions** | Quand un choix a un impact durable (réseau, sécurité, stockage, dépendances cloud), noter le contexte et la raison du choix pour éviter de “réapprendre” plus tard. |

Ces principes directeurs sont complétés par des ADR (_Architecture Decision Records_) pour formaliser les décisions structurantes.
