import React from "react";
import { Loader } from "@overcast-sh/branding";

export const Default = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 24 }}>
    <Loader size={96} />
  </div>
);

export const WithStatus = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 24 }}>
    <Loader size={48} ariaLabel="Deploying…" />
    <span style={{ fontFamily: "var(--oc-font-mono)", fontSize: 12, color: "var(--oc-muted)" }}>
      deploying stack…
    </span>
  </div>
);
