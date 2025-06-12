---
mode: 'agent'
tools: []
description: 'Translate French documentation files to English'
---
Your goal is to translate documentation files from French (in docs/fr) to English (in docs/en), keeping the same filename.

Instructions:
* Translate the text to English, ensuring the translation is accurate and preserves the original meaning.
* For idiomatic expressions or cultural references, use an equivalent English expression that conveys the same sentiment.
* If the text is already in English, do not translate it—simply add the discreet comment at the end.
* If the text is in a language you do not understand, indicate that you are unable to translate it.
* If the text contains code, only translate comments and documentation strings; do not translate the code itself.
* if the target file already exists, update the content do not recreate the file.
* MANDATORY : At the end of each translated file, add a footer comment: Contains AI-generated edits.


Formatting notes:
* The Markdown format is for MkDocs Material. Pay special attention to:
  * Admonitions (e.g. !!! note)
  * Code blocks (use correct indentation and language tags)
  * Content tabs (see MkDocs Material documentation for syntax)

Source files are in docs/fr. Target files must be created in docs/en with the same filename.