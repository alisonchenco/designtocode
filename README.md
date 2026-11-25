# design-to-code

A dependency-free learning page and editable design system, built with HTML, CSS, and JavaScript.

## Run locally

From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173 for the learning page or http://127.0.0.1:4173/design-system.html for the token editor.

The token editor is temporarily hidden from the learning page; its implementation and saved settings remain available at the direct URL.

## Directory

The **Directory** navigation tab opens `directory.html`, with links to Launchpad, Blueprint, and Microsoft VibeHub. The supplied screenshots are stored locally in `assets/directory/` and displayed without cropping or distortion in square `#F7F7F5` panels. The cards stay in three columns through 830px and stack below that. Resource access depends on the destination's own permissions.

## Editing the design system

Change brand, text, background, and surface colors; font family and size; base spacing; and corner radius. The component previews update immediately. Valid edits save in this browser's local storage, not to the source files or another device. If browser storage is unavailable, the page reports it and you can export your tokens as JSON instead.

Use **Reset to defaults** to restore the original values. Text/background contrast warnings help identify color combinations below WCAG AA for normal text. The landing page remains unchanged by preview token edits.

## Syntax checks

```sh
node --check script.js
node --check design-system.js
node --check books.js
```

No build step or package installation is required.

Below the book gallery, Three levels of a good handoff uses blue exploded UI diagrams to explain layout, shared tokens/components, and states/responsiveness, linked to the existing practical guides. Square panels give the diagrams and readable annotations room to breathe on desktop and mobile.

Each blueprint gently separates its layers once when it becomes visible. Hover or keyboard focus holds the layers expanded, with annotations moving alongside them. Reduced-motion preferences keep the diagrams static.

The final AI handoff topic uses the same numbered accordions and callout pattern as Design-to-code essentials. It covers design-file responsibilities, engineering guardrails, and agent review. **Copy rules** in the In code accordion copies the illustrative 12-line CLAUDE.md sample. The sample is page content, not a repository policy file.

Learning-page prose uses self-hosted Roboto from Google Fonts, with its SIL Open Font License in `assets/fonts/OFL.txt`. Headings and the design system's editable preview typography retain their existing fonts.

The learning-page title swaps the positions of design and code around a stationary to once, then settles on design to code within five seconds. Reduced-motion preferences show a static design to code title instead.

The visual library after the hero uses eleven original topic-cover illustrations in `assets/covers/`. These accessible SVGs form a staggered 4–3–4 gallery on wider screens and a two-column gallery on smaller screens. Each cover opens a topic-specific book reader. Close it using the close button, Escape, or the backdrop; keyboard focus returns to the selected cover.

Covers remain unchanged at rest. Hovering with a mouse or focusing with a keyboard folds the cover aside using a flat 2D transition, revealing clean paper shapes and page lines without perspective or realistic shadows. Hover never launches a reader; clicking or keyboard activation does. Reduced-motion preferences remove the opening transition, and touch devices retain direct tap-to-open behavior.
