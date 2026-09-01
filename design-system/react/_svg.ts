// Shared helper for the asset-wrapper components: render a generated SVG
// string verbatim, resizing only the root element's width/height attributes.
import React from "react";

export const resized = (svg: string, w: number, h: number): string =>
  svg.replace(
    /<svg([^>]*?)\bwidth="[^"]*"([^>]*?)\bheight="[^"]*"/,
    `<svg$1width="${w}"$2height="${h}"`,
  );

export const SvgEmbed = ({
  svg,
  width,
  height,
  label,
}: {
  svg: string;
  width: number;
  height: number;
  label: string;
}) =>
  React.createElement("span", {
    role: "img",
    "aria-label": label,
    style: { display: "inline-flex", lineHeight: 0 },
    dangerouslySetInnerHTML: { __html: resized(svg, width, height) },
  });
