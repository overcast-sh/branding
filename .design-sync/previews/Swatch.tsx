import React from "react";
import { Row, Swatch } from "@overcast-sh/branding";

export const BrandPalette = () => (
  <Row gap={16}>
    <Swatch name="Accent / on light" hex="#1273C4" use="signal color on light surfaces" />
    <Swatch name="Accent / on dark" hex="#5FB8FF" use="signal color on dark surfaces" />
    <Swatch name="Ink" hex="#16222E" use="text on light; the icon tile" />
    <Swatch name="Cloud / on light" hex="#C4D8EA" use="cloud fill on light surfaces" />
  </Row>
);

export const SemanticColors = () => (
  <Row gap={16}>
    <Swatch name="Success" hex="#2E9E6B" use="passing states — never replaces the accent" />
    <Swatch name="Warning" hex="#C08A2D" use="caution states" />
    <Swatch name="Danger" hex="#C9564A" use="failing states" />
  </Row>
);
