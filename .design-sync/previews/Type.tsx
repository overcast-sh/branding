import React from "react";
import { Type } from "@overcast-sh/branding";

export const TypeScale = () => (
  <div style={{ maxWidth: 640 }}>
    <Type
      role="heading / mono"
      note="JetBrains Mono 700 — headings, labels, wordmark"
      css={{ fontFamily: "var(--oc-font-mono)", fontWeight: 700, fontSize: 28 }}
      sample="overcast — the local AWS emulator"
    />
    <Type
      role="label / mono"
      note="JetBrains Mono 400 — UI labels, captions"
      css={{ fontFamily: "var(--oc-font-mono)", fontSize: 12, letterSpacing: "0.02em" }}
      sample="REGION us-east-1 · 14 SERVICES RUNNING"
    />
    <Type
      role="body / sans"
      note="system sans — running text"
      css={{ fontFamily: "var(--oc-font-sans)", fontSize: 14, lineHeight: 1.6 }}
      sample="Run the AWS cloud on your laptop. Overcast emulates the APIs your stack already speaks, so deploys work offline."
    />
    <Type
      role="code / mono"
      note="JetBrains Mono 400 — code and terminal output"
      css={{ fontFamily: "var(--oc-font-mono)", fontSize: 13 }}
      sample="$ overcast start --services s3,lambda,dynamodb"
    />
  </div>
);
