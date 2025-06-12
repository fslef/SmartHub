---
applyTo: "/docs/**/integrations/!(index).md"
---

# Purpose
Offer a concise, self-contained reference for **one specific Home Assistant integration**—explaining its role inside a Home Assistant deployment, giving a minimal YAML example, and listing only the essential best-practice tweaks for security, performance, and reliability.
**Do not duplicate the full integration documentation**; instead, summarise and link to the authoritative page on <https://www.home-assistant.io/integrations/> (e.g. `https://www.home-assistant.io/integrations/<slug>/`).

# Additional rules for “integration” pages

- Write in **French** and edit `/docs/en/` only when explicitly asked to translate.
- Provide information **solely to contextualise the integration within a Home Assistant deployment**; omit generic or vendor-agnostic IoT advice.

## Required page outline
1. `# Intégration : <Nom>`
2. `## Objectif` – 1–2 phrases.
3. `## Configuration`
   - `### Minimale` – fenced YAML with only the parameters a user must edit for this integration in Home Assistant.
   - `### Bonnes pratiques` – **strictly component-specific recommendations** for HA deployments:
     - Order bullets by : Sécurité → Performance → Fiabilité → Sauvegarde.
     - Prefix security items with `==Sécurité :==`.
     - Phrase each bullet in the imperative and cite one official source in parentheses.
     - Omit any recommendation that is generic or not directly applicable to this component in HA.
4. `## Références` – always include the integration’s official Home Assistant page; add **other official sources only when absolutely necessary** (e.g. vendor hardening guides).