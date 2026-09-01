---
category: Brand book
---

# Type

A typography specimen row: a mono-font role label and note above a sample rendered with the given CSS — the brand book's way of documenting each type role.

```tsx
<Type
  role="heading / mono"
  note="JetBrains Mono 700 — headings, labels, wordmark"
  css={{ fontFamily: "var(--oc-font-mono)", fontWeight: 700, fontSize: 28 }}
  sample="overcast — the local AWS emulator"
/>
```

- `css` takes React inline-style properties; build samples from the type tokens (`--oc-font-mono`, `--oc-font-sans`).
- Rows stack with a hairline separator; use one `Type` per role.
