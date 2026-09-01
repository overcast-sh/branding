---
category: Brand
---

# Mark

The bare Overcast mark — the AWS cloud grounded on a flat baseline, carrying a shell prompt `>_`. Use it where the brand is already established: nav corners, footers, watermarks, stickers.

```tsx
<Mark variant="light" size={96} />        // full color, light surfaces (default)
<Mark variant="dark" size={96} />         // full color, dark surfaces
<Mark variant="mono-ink" size={48} />     // single color, print / light
<Mark variant="mono-white" size={48} />   // single color, print / dark
```

- Minimum size 24px. Below that, or on busy/unknown backgrounds, use `Icon` (the tiled version) instead.
- Clearspace = the chevron's height on all sides.
- Never rotate, outline, shadow, or gradient-fill the mark.
