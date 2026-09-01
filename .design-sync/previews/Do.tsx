import React from "react";
import { Do } from "@overcast-sh/branding";

export const UsageRules = () => (
  <div style={{ maxWidth: 560 }}>
    <Do good>Use the tiled icon whenever the background is unknown or busy.</Do>
    <Do good>Set headings, labels, and code in JetBrains Mono.</Do>
    <Do good={false}>Don't rotate, outline, shadow, or gradient-fill the mark.</Do>
    <Do good={false}>Don't capitalize the wordmark — it's always lowercase overcast.</Do>
    <Do good={false}>No orange, no radio waves — that's Overcast.fm's territory.</Do>
  </div>
);
