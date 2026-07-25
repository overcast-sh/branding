// Shared building blocks for the brand book stories.
// Everything styles through the design tokens so the theme toolbar works.
import React from "react";

export const Row = ({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start", margin: "16px 0" }}>{children}</div>
);

export const Card = ({
  children,
  label,
  surface = "card",
  pad = 20,
}: {
  children: React.ReactNode;
  label?: string;
  surface?: "card" | "dark" | "light";
  pad?: number;
}) => {
  const bg = surface === "dark" ? "#10161D" : surface === "light" ? "#FFFFFF" : "var(--oc-card)";
  const fg = surface === "dark" ? "#7FA8C9" : surface === "light" ? "#54718A" : "var(--oc-muted)";
  return (
    <div
      style={{
        background: bg,
        border: "1px solid var(--oc-line)",
        borderRadius: "var(--oc-radius-card)",
        padding: pad,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      {children}
      {label && <span style={{ fontFamily: "var(--oc-font-mono)", fontSize: 11, color: fg }}>{label}</span>}
    </div>
  );
};

export const Swatch = ({ name, hex, use }: { name: string; hex: string; use: string }) => (
  <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--oc-line)", width: 180 }}>
    <div style={{ height: 64, background: hex }} />
    <div style={{ padding: "10px 12px", background: "var(--oc-card)" }}>
      <b style={{ display: "block", fontSize: 12, color: "var(--oc-text)", fontFamily: "var(--oc-font-sans)" }}>{name}</b>
      <code style={{ fontFamily: "var(--oc-font-mono)", fontSize: 11, color: "var(--oc-muted)" }}>{hex}</code>
      <div style={{ fontSize: 11, color: "var(--oc-muted)", marginTop: 4, fontFamily: "var(--oc-font-sans)" }}>{use}</div>
    </div>
  </div>
);

export const Type = ({
  role,
  css,
  sample,
  note,
}: {
  role: string;
  css: React.CSSProperties;
  sample: string;
  note: string;
}) => (
  <div style={{ borderBottom: "1px solid var(--oc-line)", padding: "16px 0 20px", width: "100%" }}>
    <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap", marginBottom: 10 }}>
      <span style={{ fontFamily: "var(--oc-font-mono)", fontSize: 12, color: "var(--oc-accent)" }}>{role}</span>
      <span style={{ fontFamily: "var(--oc-font-sans)", fontSize: 11, color: "var(--oc-muted)" }}>{note}</span>
    </div>
    <div style={{ color: "var(--oc-text)", overflowWrap: "break-word", ...css }}>{sample}</div>
  </div>
);

export const Do = ({ good, children }: { good: boolean; children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 10, alignItems: "baseline", margin: "6px 0", fontFamily: "var(--oc-font-sans)", fontSize: 14, color: "var(--oc-body)" }}>
    <span style={{ fontFamily: "var(--oc-font-mono)", color: good ? "var(--oc-success)" : "var(--oc-danger)" }}>{good ? "✓" : "✗"}</span>
    <span>{children}</span>
  </div>
);
