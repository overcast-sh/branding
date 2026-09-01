---
category: Brand
---

# Icon

The tiled Overcast icon: the mark on an ink (`#16222E`) rounded square. The tile makes it safe on any background — use it for avatars, favicons, app tiles, and anywhere the surface is unknown or busy.

```tsx
<Icon size={32} />
<Icon size={96} />
```

- Each generated size (16/32/48/96/256) reduces detail and snaps to the pixel grid; the component picks the nearest generated asset at or above `size` — never scale a large one down yourself.
- Minimum 16px.
- The tile is ink on every surface — it does not swap with the theme.
