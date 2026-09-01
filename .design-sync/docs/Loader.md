---
category: Brand
---

# Loader

The Overcast loading state: the mark with its cursor bar blinking (1.1s, stepped). The blinking cursor is the one sanctioned brand animation — don't add spinners or other motion alongside it.

```tsx
<Loader size={96} />
<Loader size={48} ariaLabel="Deploying…" />
```

- Center it in the region that's loading; pair with a short mono-font status line if text is needed.
- The artwork uses the dark-palette mark colors and reads on both light and dark surfaces.
