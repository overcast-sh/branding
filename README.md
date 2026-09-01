<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="logo/overcast-logo-dark.svg">
    <img alt="Overcast" src="logo/overcast-logo-light.svg" width="360">
  </picture>
</p>
<p align="center"><em>Brand assets for Overcast — the local AWS emulator.</em></p>

# Overcast branding

**[brand.overcast.sh](https://brand.overcast.sh)** — the brand landing page: guidelines, brand
book, and every asset, downloadable individually or as one zip.

Brand assets for [Overcast](https://overcast.sh) — the local AWS emulator.

The mark: a cloud grounded on a flat baseline with a shell prompt `>_` inside —
the AWS cloud, running in your terminal.

**Open [brand-guidelines.html](brand-guidelines.html)** for the full guidelines:
construction geometry, color palette, typography, usage rules, and file index.
It renders in light and dark mode.

## Quick picks

| Need | File |
| --- | --- |
| README / website header | `logo/overcast-logo-{light,dark}.svg` |
| GitHub org avatar | `png/icon-256.png` |
| Repo social preview | `png/github-social-card.png` |
| Favicon (modern) | `favicon/favicon.svg` |
| Favicon (legacy) | `favicon/favicon.ico` |
| Apple touch icon | `png/apple-touch-icon.png` |
| Loading state | `loading/overcast-loader.svg` (blinking cursor) |
| Single-color print / stickers | `mark/mark-mono-{white,ink}.svg` |

## Pipeline

Everything is generated — never hand-edit the SVGs.

```sh
npm install
npm run build     # gen.ts (SVGs, outlined wordmark) + rasterize.ts (PNG/ICO)
```

- **`gen.ts`** — parametric generator. The cloud silhouette is the union of
  three circles with radii in golden progression (r, r·√φ, r·φ) on a shared
  baseline, φ:1 bounding box; the chevron apex sits at the golden division of
  the width. Each size is derived from this geometry with per-size detail
  reduction, not naive scaling. When `fonts/` is present, all wordmark text is
  outlined to paths via opentype.js (self-contained SVGs, no font dependency).
- **`rasterize.ts`** — renders PNGs at all target sizes with @resvg/resvg-js
  and bundles the multi-resolution `favicon.ico`.
- **`build.mts`** — runs both.

## Design system

`design-system/` holds the tokens in four formats (keep in sync;
`tokens.json` is the source of truth):

| File | For |
| --- | --- |
| `tokens.json` | W3C design-tokens format — machine-readable |
| `tokens.css` | drop-in CSS custom properties (`--oc-*`), light+dark |
| `tokens.tailwind.css` | Tailwind v4 `@theme` |
| `tailwind.preset.ts` | Tailwind v3 preset |
| `fonts.css` | JetBrains Mono `@font-face` |

## Brand book (Storybook)

```sh
npm run storybook          # dev server on :6006
npm run build-storybook    # static build (deployable to Pages)
```

Pages: Overview, Logo, Color, Typography, Icons, Motion, Voice, Tokens.
Agents: read [AGENTS.md](AGENTS.md) before building anything branded.
See [LICENSE.md](LICENSE.md) — assets reserved, scripts MIT, fonts OFL.
