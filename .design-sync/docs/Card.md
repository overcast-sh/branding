---
category: Brand book
---

# Card

A token-styled surface card: centered content on a `--oc-card` background with a `--oc-line` border and the brand card radius, plus an optional mono-font caption label. The brand book uses it to present assets on controlled surfaces.

```tsx
<Card label="on light" surface="light"><Mark size={96} /></Card>
<Card label="on dark" surface="dark"><Mark variant="dark" size={96} /></Card>
<Card>…</Card>   // default: theme-following --oc-card surface
```

- `surface`: `card` (default, follows the theme tokens), `light` (pinned white), or `dark` (pinned ink) — the pinned surfaces are for showing how content reads on a specific ground regardless of theme.
- `label` renders in the brand mono at caption size below the content; `pad` adjusts inner padding (default 20).
