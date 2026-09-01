---
category: Brand
---

# Logo

The full Overcast lockup: the cloud mark plus the lowercase `overcast` wordmark (outlined to paths — no font dependency). Use it in site headers, READMEs, and anywhere the brand introduces itself.

```tsx
<Logo variant="light" height={40} />   // on light surfaces (default)
<Logo variant="dark" height={40} />    // on dark surfaces
```

- Pick `variant` by the surface behind it: `light` on light backgrounds, `dark` on dark. The accent and cloud colors swap per surface — never put the dark-surface lockup on white.
- `height` sets the rendered height (default 40px); width follows the intrinsic 300:64 ratio.
- Below ~160px width, use the bare `Mark` instead of shrinking the lockup.
- The wordmark is always lowercase `overcast` — never capitalize or re-set it in another font.
