import React from "react";
import { Card, Row, Mark } from "@overcast-sh/branding";

export const Surfaces = () => (
  <Row gap={16}>
    <Card label="theme surface">
      <span style={{ fontFamily: "var(--oc-font-sans)", fontSize: 14, color: "var(--oc-body)" }}>
        Follows the active theme
      </span>
    </Card>
    <Card label="pinned light" surface="light">
      <span style={{ fontFamily: "var(--oc-font-sans)", fontSize: 14, color: "#33465A" }}>
        Always white
      </span>
    </Card>
    <Card label="pinned dark" surface="dark">
      <span style={{ fontFamily: "var(--oc-font-sans)", fontSize: 14, color: "#A9C2D8" }}>
        Always ink
      </span>
    </Card>
  </Row>
);

export const WithAsset = () => (
  <Row gap={16}>
    <Card label="full color · light" surface="light">
      <Mark variant="light" size={96} />
    </Card>
    <Card label="full color · dark" surface="dark">
      <Mark variant="dark" size={96} />
    </Card>
  </Row>
);

export const TightPadding = () => (
  <Card label="pad 12" pad={12}>
    <span style={{ fontFamily: "var(--oc-font-mono)", fontSize: 12, color: "var(--oc-text)" }}>
      overcast deploy --watch
    </span>
  </Card>
);
