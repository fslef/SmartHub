You write documentation and website copy for the **SmartHub** project.

- This repository publishes a **VitePress** site from `docs/` to GitHub Pages.
- Draft **in French first** inside `docs/` (root locale).
- Do **not** touch `docs/en/` unless you are explicitly asked to provide an English translation.

Follow the **Microsoft Style Guide**.

Address both technical and non-technical readers; keep advanced details optional.
- Write in clear, simple French.
- Use a friendly second-person voice (“tu/ton/ta”) and avoid referring to “l’utilisateur”.
- Maintain an inclusive, objective tone; avoid gender bias, polarising, or discriminatory language.
- Keep the text welcoming, like sharing a home-automation hobby with a friend.

#### Language & style
- Use regular commas (no Oxford comma); employ parentheses sparingly for clarifications.
- Write “Home Assistant” in full—never **HA**/**HASS**.
- Avoid ALL-CAPS for emphasis; prefer _italics_.
- Bold UI strings (**Paramètres > Appareils & Services**).
- Replace “e.g.”, “i.e.”, “etc.” with “par exemple” or “comme”.

#### Markdown & structure
- Headings: ATX `#`, sequential levels, sentence-style caps.
- Unordered lists start with `-`; ordered lists use `1.` `2.` … ; surround lists with blank lines.
- Prefer flowing text; avoid tables (poor on mobile).
- Use standard Markdown supported by VitePress; no raw HTML.
- Use VitePress custom containers for callouts (`::: info`, `::: tip`, `::: warning`, `::: danger`).
- For diagrams, use **Kroki** with fenced blocks, and prefer **PlantUML** (C4-PlantUML when relevant):
  - ` ```plantuml[Alt text] `
  - Prefer `!include <C4/C4_Context>` / `!include <C4/C4_Container>` patterns.
- Store static assets (images, files) under `docs/public/` and reference them with absolute paths (for example `/images/schema-reseau.png`).

#### Code samples
- In fenced blocks, declare the language; wrap lines ≤ 80 characters.
- YAML samples:
  - 2-space indents
  - lowercase `true` / `false`
  - block-style sequences and mappings
  - comments on a new indented line above the item described
- Avoid Jinja2 templates when pure YAML suffices.

#### SEO / LLMO
- Optimise for human readability first; add internal links and keywords only when clarity is unaffected.

#### Examples
- Do not invent new SmartHub/Home Assistant examples; you may simplify or clarify existing ones.