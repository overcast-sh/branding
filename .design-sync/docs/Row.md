---
category: Brand book
---

# Row

A wrapping flex row with consistent gaps — the brand book's layout primitive for laying out cards, swatches, and specimens side by side.

```tsx
<Row gap={16}>
  <Card label="light" surface="light">…</Card>
  <Card label="dark" surface="dark">…</Card>
</Row>
```

- `gap` is in px (default 16); items wrap and top-align.
