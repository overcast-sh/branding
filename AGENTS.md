# AGENTS.md — Overcast branding repo

> For AI agents (Claude etc.) working in this repo or building anything
> Overcast-branded (website, web UI, docs, social assets).

## What this repo is

The canonical source for Overcast's visual identity. Everything is
**generated** — `gen.ts` holds the parametric geometry, `design-system/`
holds the tokens. SVGs and PNGs are build outputs.

## Hard rules

1. **Never hand-edit files in** `logo/ mark/ icons/ favicon/ loading/ social/
   brand/ png/ alternates/`. Change `gen.ts` (geometry/palette) and run
   `npm run build`. Commit the regenerated outputs together with the script
   change.
2. **Design with the tokens.** `design-system/tokens.css` (custom properties,
   light+dark) is the drop-in for any web surface; `design-system/tokens.json`
   (W3C design-tokens format) is the machine-readable source of truth. If you
   change one, sync the other — and update the palette in `gen.ts` if the
   brand colors themselves moved.
3. **The accent swaps with the surface.** `#5FB8FF` on dark grounds,
   `#1273C4` on light. Never the dark-surface accent on white (fails
   contrast). Semantic colors (success/warning/danger) never replace the
   accent.
4. **The mono is the voice.** Headings, labels, wordmark, code: JetBrains Mono
   (fallback stack in tokens). Body text: system sans. Wordmark is always
   lowercase `overcast`.
5. **One animation.** The blinking cursor (`--oc-blink`, 1.1s steps). No other
   brand motion; respect `prefers-reduced-motion`.
6. **Both themes, always.** Follow the token pattern: `prefers-color-scheme`
   media query + `data-theme` attribute overrides that win in both directions.
7. **Differentiation:** no orange, no radio/sound waves — that's Overcast.fm
   (podcast app) territory. Our cloud is navy, grounded, and carries a `>_`.
8. **Size discipline:** never scale a large SVG down; use the per-size icons
   (they reduce detail and snap to the pixel grid). Minimum 24px for the bare
   mark, 16px for the tiled icon. Clearspace = the chevron's height.

## Geometry (if you touch `gen.ts`)

Cloud = union outline of three circles, radii in golden progression
(r, r·√φ, r·φ) on a shared baseline; bounding box φ:1; chevron apex at
(1−1/φ)·w; cursor bar on the chevron's lower shoulder line. The construction
diagram (`brand/construction.svg`) is generated from the same code — it can
never drift from reality.

## Commands

```sh
npm install       # once
npm run build     # gen (SVGs, outlined wordmark) + rasterize (PNG/ICO)
```

`gen.ts` outlines wordmark text to paths when `fonts/` +
opentype.js are available; otherwise it falls back to a system `<text>`
stack. CI or fresh clones should always have both (fonts are committed).

```sh
npm run storybook        # brand book on :6006
npm run build-storybook  # static brand book
```

## Reference

- `stories/` — the Storybook brand book (Overview, Logo, Color, Typography, Icons, Motion, Voice, Tokens)
- `brand-guidelines.html` — standalone single-file guidelines (no install needed)
- `design-system/tokens.json` — tokens, machine-readable source of truth
- `design-system/tokens.css` — tokens, drop-in CSS
- `design-system/tokens.tailwind.css` + `tailwind.preset.ts` — Tailwind v4 / v3
- `design-system/fonts.css` — JetBrains Mono @font-face
- `LICENSE.md` — assets reserved · scripts MIT · fonts OFL
