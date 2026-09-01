# Overcast brand conventions

Overcast is a local AWS emulator. The brand voice is a terminal: navy cloud, shell prompt `>_`, monospace headings. Everything you build must read as "the AWS cloud, running in your terminal."

## Setup

No provider or wrapper is needed. Link `styles.css` (it imports the tokens, the JetBrains Mono `@font-face`, and component styles). Components and your own layout both style through CSS custom properties.

Theming: tokens follow `prefers-color-scheme` and a `data-theme` attribute on `<html>` overrides it in both directions. To pin a theme: `document.documentElement.dataset.theme = "dark"` (or `"light"`). Style through the tokens only — never hardcode a palette hex next to a token-styled element.

## The styling idiom: `var(--oc-*)` everywhere

- Surfaces: `--oc-bg` (page), `--oc-card` (panels), `--oc-line` (hairline borders), `--oc-accent-soft` (accent-tinted fills), `--oc-tile` (the icon tile ink — same on every surface)
- Text: `--oc-text` (headings), `--oc-body` (running text), `--oc-muted` (secondary)
- Brand: `--oc-accent` (THE signal color — `#1273C4` on light, `#5FB8FF` on dark; the token swaps automatically), `--oc-cursor`, `--oc-cloud`, `--oc-cloud-stroke`
- Semantic: `--oc-success`, `--oc-warning`, `--oc-danger` — states only, never a substitute for the accent
- Type: `--oc-font-mono` (JetBrains Mono — headings, labels, code, anything brand-voiced), `--oc-font-sans` (system sans — body text only)
- Space: `--oc-space-1` … `--oc-space-7` (4/8/12/16/24/40/64px)
- Radii: `--oc-radius-control` (6px — buttons, inputs), `--oc-radius-card` (10px — cards, panels)
- Motion: `--oc-hover` (120ms ease-out) and the ONE sanctioned animation — the blinking cursor: class `oc-cursor-blink` (uses `--oc-blink`, 1.1s steps, reduced-motion aware). No other brand motion, no spinners.

Hard rules: wordmark is always lowercase `overcast` in the mono. No orange, no radio/sound waves (that's Overcast.fm). Never put the dark-surface accent on white.

## Components

`Logo` (lockup, `variant` light/dark), `Mark` (bare cloud, 4 variants, min 24px), `Icon` (tiled — use on busy/unknown backgrounds, min 16px), `Loader` (blinking-cursor loading state), plus token-styled blocks: `Card` (surface panel with optional caption), `Row` (wrapping flex row), `Swatch`, `Type`, `Do`. Each component's doc shows composition; prefer `Icon` over `Mark` when you don't control the background.

## Where the truth lives

Read `styles.css` → `_ds_bundle.css` (all `--oc-*` definitions, light+dark) and `fonts/fonts.css` before styling. `guidelines/AGENTS.md` is the full brand rulebook. Per-component usage: each `<Name>.prompt.md`.

## Idiomatic example

```tsx
<header style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
  padding: "var(--oc-space-3) var(--oc-space-5)", background: "var(--oc-bg)",
  borderBottom: "1px solid var(--oc-line)" }}>
  <Logo variant="light" height={32} />
  <nav style={{ display: "flex", gap: "var(--oc-space-5)",
    fontFamily: "var(--oc-font-mono)", fontSize: 13 }}>
    <a style={{ color: "var(--oc-accent)" }}>docs</a>
    <a style={{ color: "var(--oc-muted)" }}>github</a>
  </nav>
</header>
```
