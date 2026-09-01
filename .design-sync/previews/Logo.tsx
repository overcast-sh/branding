import React from "react";
import { Logo, Card, Row } from "@overcast-sh/branding";

export const OnLight = () => (
  <Card label="light surfaces" surface="light">
    <Logo variant="light" height={48} />
  </Card>
);

export const OnDark = () => (
  <Card label="dark surfaces" surface="dark">
    <Logo variant="dark" height={48} />
  </Card>
);

export const SiteHeader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 20px",
      background: "var(--oc-bg)",
      border: "1px solid var(--oc-line)",
      borderRadius: "var(--oc-radius-card)",
      minWidth: 560,
    }}
  >
    <Logo variant="light" height={32} />
    <nav style={{ display: "flex", gap: 24, fontFamily: "var(--oc-font-mono)", fontSize: 13 }}>
      <span style={{ color: "var(--oc-accent)" }}>docs</span>
      <span style={{ color: "var(--oc-muted)" }}>pricing</span>
      <span style={{ color: "var(--oc-muted)" }}>github</span>
    </nav>
  </div>
);
