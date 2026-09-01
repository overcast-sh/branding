import React from "react";
import { Icon, Card, Row } from "@overcast-sh/branding";

export const Sizes = () => (
  <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
    {[16, 32, 48, 96].map((s) => (
      <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Icon size={s} />
        <span style={{ fontFamily: "var(--oc-font-mono)", fontSize: 11, color: "var(--oc-muted)" }}>{s}px</span>
      </div>
    ))}
  </div>
);

export const OnAnySurface = () => (
  <Row gap={16}>
    <Card label="on light" surface="light">
      <Icon size={48} />
    </Card>
    <Card label="on dark" surface="dark">
      <Icon size={48} />
    </Card>
  </Row>
);
