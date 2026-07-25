// Rasterize Overcast SVG assets to PNG + ICO.
// Usage: node rasterize.ts [dir]   (dir = asset root, default ".")
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = process.argv[2] || ".";
mkdirSync(join(OUT, "png"), { recursive: true });

// [source svg, dest png, output width px]
const jobs: [string, string, number][] = [
  ["icons/icon-16.svg", "png/icon-16.png", 16],
  ["icons/icon-32.svg", "png/icon-32.png", 32],
  ["icons/icon-48.svg", "png/icon-48.png", 48],
  ["icons/icon-96.svg", "png/icon-96.png", 96],
  ["icons/icon-256.svg", "png/icon-256.png", 256],
  ["icons/icon-256.svg", "png/icon-512.png", 512],
  ["icons/icon-256.svg", "png/apple-touch-icon.png", 180],
  ["mark/mark-light.svg", "png/mark-light-384.png", 384],
  ["mark/mark-dark.svg", "png/mark-dark-384.png", 384],
  ["logo/overcast-logo-light.svg", "png/logo-light-900.png", 900],
  ["logo/overcast-logo-dark.svg", "png/logo-dark-900.png", 900],
  ["social/github-social-card.svg", "png/github-social-card.png", 1280],
];

for (const [src, dst, width] of jobs) {
  const svg = readFileSync(join(OUT, src), "utf8");
  const r = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { loadSystemFonts: true }, // harmless when text is outlined
  });
  writeFileSync(join(OUT, dst), r.render().asPng());
  console.log(`${dst}  (${width}px)`);
}

// Multi-resolution favicon.ico from the 16/32/48 PNGs
const ico = await pngToIco([
  join(OUT, "png/icon-16.png"),
  join(OUT, "png/icon-32.png"),
  join(OUT, "png/icon-48.png"),
]);
writeFileSync(join(OUT, "favicon/favicon.ico"), ico);
console.log("favicon/favicon.ico  (16+32+48)");
