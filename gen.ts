// Overcast brand asset generator — parametric cloud-and-prompt logomark.
// The cloud silhouette is the union outline of three circles (radii in golden
// progression r, r√φ, rφ) resting on a common baseline. All sizes derive from
// the same geometry, with per-size detail reduction and pixel-grid snapping.
// Runs directly under Node ≥ 22.6 (erasable TypeScript, no build step).
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const PHI = (1 + Math.sqrt(5)) / 2;

type Pt = { x: number; y: number };
type Circle = Pt & { r: number };
type Fit = { x: number; y: number; w: number; h?: number };
type Mode = "dark" | "light";
type Variant = "circuit" | "prompt";

// ---------- optional wordmark outlining ----------
// If ./fonts/JetBrainsMono-{Bold,Regular}.ttf exist next to this script and
// opentype.js is installed, all text is emitted as outlined <path> elements
// (self-contained SVGs, no font dependency). Otherwise falls back to <text>
// with the system mono stack.
type Fonts = { bold: any; regular: any };
let FONTS: Fonts | null = null;
try {
  const m: any = await import("opentype.js");
  const ot = m.default ?? m;
  const load = (rel: string) => {
    const b = readFileSync(new URL(rel, import.meta.url));
    return ot.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
  };
  FONTS = {
    bold: load("./fonts/JetBrainsMono-Bold.ttf"),
    regular: load("./fonts/JetBrainsMono-Regular.ttf"),
  };
  console.log("wordmark: outlining with JetBrains Mono");
} catch {
  console.log("wordmark: fonts/opentype.js not found, using <text> fallback");
}

const MONO_STACK = `ui-monospace, 'Cascadia Code', 'SF Mono', Menlo, Consolas, monospace`;

interface TextOpts {
  x: number;
  y: number;
  size: number;
  ls?: number;
  weight?: number;
  fill: string;
  anchor?: "start" | "middle" | "end";
}

function monoText(str: string, { x, y, size, ls = 0, weight = 400, fill, anchor = "start" }: TextOpts): string {
  if (!FONTS) {
    const anchorAttr = anchor !== "start" ? ` text-anchor="${anchor}"` : "";
    return `<text x="${x}" y="${y}" font-family="${MONO_STACK}" font-weight="${weight}" font-size="${size}" letter-spacing="${ls}"${anchorAttr} fill="${fill}">${str}</text>`;
  }
  const font = weight >= 600 ? FONTS.bold : FONTS.regular;
  const scale = size / font.unitsPerEm;
  let adv = 0;
  for (const ch of str) adv += font.charToGlyph(ch).advanceWidth * scale + ls;
  adv -= ls;
  let cx = anchor === "middle" ? x - adv / 2 : anchor === "end" ? x - adv : x;
  const parts: string[] = [];
  for (const ch of str) {
    const g = font.charToGlyph(ch);
    const d = g.getPath(cx, y, size).toPathData(2);
    if (d) parts.push(d);
    cx += g.advanceWidth * scale + ls;
  }
  return `<path d="${parts.join(" ")}" fill="${fill}"/>`;
}

// ---------- geometry core ----------
// Circles defined y-UP from baseline y=0, then flipped into SVG coords.
function cloudGeometry(): { c1: Circle; c2: Circle; c3: Circle; W: number; H: number } {
  const r1 = 1.0; // left cap
  const r2 = PHI; // top dome
  const r3 = Math.sqrt(PHI); // right cap ≈ 1.272 (geometric mean of r1, r2)
  const x1 = 0;
  const x2 = 1.6; // top dome center x
  const x3 = 3.1; // right cap center x
  const W = r1 + x3 + r3; // total width
  const H = W / PHI; // golden aspect
  const c1: Circle = { x: x1, y: r1, r: r1 };
  const c3: Circle = { x: x3, y: r3, r: r3 };
  const c2: Circle = { x: x2, y: H - r2, r: r2 };
  return { c1, c2, c3, W, H };
}

// upper intersection (larger y in y-up space) of two circles
function upperIntersection(p: Circle, q: Circle): Pt {
  const dx = q.x - p.x, dy = q.y - p.y;
  const d = Math.hypot(dx, dy);
  const a = (p.r * p.r - q.r * q.r + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, p.r * p.r - a * a));
  const mx = p.x + (a * dx) / d, my = p.y + (a * dy) / d;
  const i1: Pt = { x: mx - (h * dy) / d, y: my + (h * dx) / d };
  const i2: Pt = { x: mx + (h * dy) / d, y: my - (h * dx) / d };
  return i1.y > i2.y ? i1 : i2;
}

// Build the cloud outline path in TARGET SVG coords (y-down).
function cloudPath(fit: Fit, prec = 2): string {
  const { c1, c2, c3, W, H } = cloudGeometry();
  const s = fit.w / W;
  const T = (px: number, py: number): Pt => ({
    x: fit.x + (px + c1.r) * s,
    y: fit.y + (H - py) * s,
  });
  const P = (pt: Pt) => `${round(pt.x, prec)} ${round(pt.y, prec)}`;
  const i12 = upperIntersection(c1, c2);
  const i23 = upperIntersection(c2, c3);
  const start = T(c1.x, 0); // bottom tangent of left cap
  const a = T(i12.x, i12.y);
  const b = T(i23.x, i23.y);
  const end = T(c3.x, 0); // bottom tangent of right cap
  // arc: traverse each circle clockwise (screen) => sweep=1.
  const arc = (c: Circle, from: Pt, to: Pt): string => {
    const cs = T(c.x, c.y);
    const a0 = Math.atan2(from.y - cs.y, from.x - cs.x);
    const a1 = Math.atan2(to.y - cs.y, to.x - cs.x);
    let span = a1 - a0;
    while (span <= 0) span += Math.PI * 2; // sweep=1 -> positive/cw span
    const large = span > Math.PI ? 1 : 0;
    const R = round(c.r * s, prec);
    return `A ${R} ${R} 0 ${large} 1 ${P(to)}`;
  };
  return [`M ${P(start)}`, arc(c1, start, a), arc(c2, a, b), arc(c3, b, end), `Z`].join(" ");
}

function round(v: number, p = 2): number {
  const m = 10 ** p;
  return Math.round(v * m) / m;
}

// ---------- palette ----------
const C = {
  ink: "#16222E", // tile / dark surface
  inkEdge: "#0E1620",
  cloudOnDark: "#33536F",
  cloudOnDarkStroke: "#89BCE2",
  accentDark: "#5FB8FF", // trace on dark
  accentGlow: "#8FD0FF",
  cloudOnLight: "#C4D8EA",
  cloudOnLightStroke: "#31536F",
  accentLight: "#1273C4", // trace on light (AA on white)
  accentGlowLight: "#3E97DF",
  textDark: "#16222E",
  textLight: "#DCEBF8",
  subDark: "#54718A",
  subLight: "#7FA8C9",
} as const;

// ---------- trace (circuit alternate) ----------
// Node positions as fractions of the cloud's fitted box.
const TRACE4: Pt[] = [
  { x: 0.18, y: 0.62 },
  { x: 0.18, y: 0.8 },
  { x: 0.472, y: 0.8 },
  { x: 0.472, y: 0.46 },
  { x: 0.8, y: 0.46 },
  { x: 0.8, y: 0.8 },
];
const TRACE4_DOTS = [0, 2, 3, 5];
const TRACE3: Pt[] = [
  { x: 0.2, y: 0.76 },
  { x: 0.52, y: 0.76 },
  { x: 0.52, y: 0.46 },
  { x: 0.82, y: 0.46 },
];
const TRACE3_DOTS = [0, 1, 3];

// ---------- prompt (>_) content ----------
// Chevron apex at golden x division; cursor bar on same baseline.
function promptContent(fit: Fit & { h: number }, accent: string, glow: string, sw: number, prec: number, minimal: boolean): string {
  const px = (fx: number) => round(fit.x + fx * fit.w, prec);
  const py = (fy: number) => round(fit.y + fy * fit.h, prec);
  const apexX = 1 - 1 / PHI; // 0.382
  const chevTopY = 0.38, chevBotY = 0.8, chevBackX = apexX - 0.185;
  const midY = (chevTopY + chevBotY) / 2;
  const chev = `<path d="M ${px(chevBackX)} ${py(chevTopY)} L ${px(apexX)} ${py(midY)} L ${px(chevBackX)} ${py(chevBotY)}" stroke="${accent}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  if (minimal) return chev;
  const curs = `<line x1="${px(apexX + 0.11)}" y1="${py(chevBotY)}" x2="${px(apexX + 0.37)}" y2="${py(chevBotY)}" stroke="${glow}" stroke-width="${sw}" stroke-linecap="round"/>`;
  return `${chev}\n  ${curs}`;
}

function tracePts(pts: Pt[], fit: Fit & { h: number }, prec = 2): Pt[] {
  return pts.map((p) => ({
    x: round(fit.x + p.x * fit.w, prec),
    y: round(fit.y + p.y * fit.h, prec),
  }));
}
function polyline(pts: Pt[], stroke: string, w: number): string {
  const s = pts.map((p) => `${p.x},${p.y}`).join(" ");
  return `<polyline points="${s}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function dots(pts: Pt[], idx: number[], fill: string, r: number): string {
  return idx.map((i) => `<circle cx="${pts[i].x}" cy="${pts[i].y}" r="${r}" fill="${fill}"/>`).join("\n  ");
}

// ---------- mark builders ----------
interface MarkOpts {
  size: number;
  pad: number;
  mode: Mode;
  traceLevel: number;
  strokeW: number;
  traceW: number;
  dotR: number;
  tile?: boolean;
  rx?: number;
  prec?: number;
  variant?: Variant;
}

// Bare or tiled mark; mode = the surface it sits on.
function markSVG({ size, pad, mode, traceLevel, strokeW, traceW, dotR, tile, rx, prec = 2, variant = "circuit" }: MarkOpts): string {
  const onDark = mode === "dark";
  const cloudFill = onDark ? C.cloudOnDark : C.cloudOnLight;
  const cloudStroke = onDark ? C.cloudOnDarkStroke : C.cloudOnLightStroke;
  const accent = onDark ? C.accentDark : C.accentLight;

  const { W, H } = cloudGeometry();
  const w = size - pad * 2;
  const h = (w * H) / W;
  // optical vertical centering: mass of cloud is bottom-heavy; lift slightly
  const y = (size - h) / 2 - size * 0.01;
  const fit = { x: pad, y, w, h };

  const cp = cloudPath(fit, prec);
  let traces = "";
  if (variant === "prompt") {
    traces = promptContent(fit, accent, onDark ? C.accentGlow : C.accentGlowLight, traceW, prec, traceLevel <= 2);
  } else if (traceLevel >= 3) {
    const pts = tracePts(traceLevel === 4 ? TRACE4 : TRACE3, fit, prec);
    const dotIdx = traceLevel === 4 ? TRACE4_DOTS : TRACE3_DOTS;
    traces = `${polyline(pts, accent, traceW)}\n  ${dots(pts, dotIdx, accent, dotR)}`;
  } else if (traceLevel === 2) {
    const pts = tracePts([{ x: 0.22, y: 0.66 }, { x: 0.78, y: 0.66 }], fit, prec);
    traces = `${polyline(pts, accent, traceW)}\n  ${dots(pts, [0, 1], accent, dotR)}`;
  }

  const tileRect = tile ? `<rect width="${size}" height="${size}" rx="${rx}" fill="${C.ink}"/>\n  ` : "";
  const strokeAttr = strokeW > 0 ? ` stroke="${cloudStroke}" stroke-width="${strokeW}"` : "";
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${tileRect}<path d="${cp}" fill="${cloudFill}"${strokeAttr}/>
  ${traces}
</svg>`;
}

// Horizontal lockup: mark + wordmark
function lockupSVG({ mode, variant = "circuit" }: { mode: Mode; variant?: Variant }): string {
  const onDark = mode === "dark";
  const text = onDark ? C.textLight : C.textDark;
  const sub = onDark ? C.subLight : C.subDark;
  const H = 64, W = 300;
  const markSize = 56;
  const mark = markInline({
    size: markSize, pad: 2, mode, traceLevel: 4,
    strokeW: 1.4, traceW: 2, dotR: 2.4, ox: 4, oy: 4, variant,
  });
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${mark}
  ${monoText("overcast", { x: 70, y: 39, size: 27, ls: -0.5, weight: 700, fill: text })}
  ${monoText("LOCAL AWS EMULATOR", { x: 71.5, y: 54, size: 9.5, ls: 2.1, fill: sub })}
</svg>`;
}

// inline mark group (no svg wrapper) at offset
function markInline({ size, pad, mode, traceLevel, strokeW, traceW, dotR, ox, oy, variant }: MarkOpts & { ox: number; oy: number }): string {
  const inner = markSVG({ size, pad, mode, traceLevel, strokeW, traceW, dotR, tile: false, variant })
    .split("\n").slice(1, -1).join("\n  ");
  return `<g transform="translate(${ox} ${oy})">${inner}</g>`;
}

// ---------- emit ----------
const OUT = process.argv[2] || "out";

const files: Record<string, string> = {};

for (const variant of ["circuit", "prompt"] as Variant[]) {
  const v = variant === "prompt" ? "" : "alternates/";
  for (const d of ["icons", "logo", "mark"]) mkdirSync(join(OUT, v, d), { recursive: true });
  files[`${v}icons/icon-96.svg`] = markSVG({ size: 96, pad: 11, mode: "dark", traceLevel: 4, strokeW: 1.6, traceW: 2.4, dotR: 3, tile: true, rx: 20, variant });
  files[`${v}icons/icon-48.svg`] = markSVG({ size: 48, pad: 5, mode: "dark", traceLevel: 4, strokeW: 1.2, traceW: 1.7, dotR: 2, tile: true, rx: 10, variant });
  files[`${v}icons/icon-32.svg`] = markSVG({ size: 32, pad: 3.5, mode: "dark", traceLevel: 3, strokeW: 1, traceW: 1.4, dotR: 1.5, tile: true, rx: 7, variant });
  files[`${v}icons/icon-16.svg`] = markSVG({ size: 16, pad: 1.5, mode: "dark", traceLevel: 3, strokeW: 0, traceW: 1.5, dotR: 0.9, tile: true, rx: 3.5, prec: 1, variant });
  files[`${v}mark/mark-dark.svg`] = markSVG({ size: 96, pad: 4, mode: "dark", traceLevel: 4, strokeW: 1.8, traceW: 2.6, dotR: 3.2, tile: false, variant });
  files[`${v}mark/mark-light.svg`] = markSVG({ size: 96, pad: 4, mode: "light", traceLevel: 4, strokeW: 1.8, traceW: 2.6, dotR: 3.2, tile: false, variant });
  files[`${v}logo/overcast-logo-light.svg`] = lockupSVG({ mode: "light", variant });
  files[`${v}logo/overcast-logo-dark.svg`] = lockupSVG({ mode: "dark", variant });
}

// ---------- extended deliverables (prompt variant = primary) ----------

// 256 app icon
files["icons/icon-256.svg"] = markSVG({ size: 256, pad: 30, mode: "dark", traceLevel: 4, strokeW: 4, traceW: 6.5, dotR: 8, tile: true, rx: 54, variant: "prompt" });

// Monochrome marks: solid silhouette, prompt knocked out via mask
function monoMark(color: string): string {
  const size = 96, pad = 4;
  const { W, H } = cloudGeometry();
  const w = size - pad * 2;
  const h = (w * H) / W;
  const y = (size - h) / 2 - size * 0.01;
  const fit = { x: pad, y, w, h };
  const cp = cloudPath(fit);
  const prompt = promptContent(fit, "#000", "#000", 3.4, 2, false).replaceAll('stroke="#000"', 'stroke="black"');
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="knockout">
    <path d="${cp}" fill="white"/>
    ${prompt}
  </mask>
  <path d="${cp}" fill="${color}" mask="url(#knockout)"/>
</svg>`;
}
files["mark/mark-mono-white.svg"] = monoMark("#FFFFFF");
files["mark/mark-mono-ink.svg"] = monoMark(C.ink);

// Loader — mark with blinking cursor (SMIL; the one sanctioned brand animation)
function loaderSVG(): string {
  const size = 96, pad = 4;
  const { W, H } = cloudGeometry();
  const w = size - pad * 2, h = (w * H) / W;
  const y = (size - h) / 2 - size * 0.01;
  const fit = { x: pad, y, w, h };
  const cp = cloudPath(fit);
  const px = (fx: number) => round(fit.x + fx * fit.w, 2);
  const py = (fy: number) => round(fit.y + fy * fit.h, 2);
  const apexX = 1 - 1 / PHI;
  const chev = `<path d="M ${px(apexX - 0.185)} ${py(0.38)} L ${px(apexX)} ${py(0.59)} L ${px(apexX - 0.185)} ${py(0.8)}" stroke="${C.accentDark}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="${cp}" fill="${C.cloudOnDark}" stroke="${C.cloudOnDarkStroke}" stroke-width="1.8"/>
  ${chev}
  <line x1="${px(apexX + 0.11)}" y1="${py(0.8)}" x2="${px(apexX + 0.37)}" y2="${py(0.8)}" stroke="${C.accentGlow}" stroke-width="2.6" stroke-linecap="round">
    <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.5;0.5001;0.9999;1" dur="1.1s" repeatCount="indefinite"/>
  </line>
</svg>`;
}
files["loading/overcast-loader.svg"] = loaderSVG();

// Favicon (SVG) — same as icon-32 geometry
files["favicon/favicon.svg"] = markSVG({ size: 32, pad: 3.5, mode: "dark", traceLevel: 3, strokeW: 1, traceW: 1.4, dotR: 1.5, tile: true, rx: 7, variant: "prompt" });

// GitHub social card 1280x640
function socialSVG(): string {
  const mark = markInline({ size: 200, pad: 6, mode: "dark", traceLevel: 4, strokeW: 3.4, traceW: 5.2, dotR: 6, ox: 380, oy: 206, variant: "prompt" });
  return `<svg width="1280" height="640" viewBox="0 0 1280 640" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="640" fill="#10161D"/>
  <rect width="1280" height="640" fill="url(#vign)"/>
  <defs>
    <radialGradient id="vign" cx="0.5" cy="0.42" r="0.75">
      <stop offset="0" stop-color="#1A2735"/>
      <stop offset="1" stop-color="#10161D"/>
    </radialGradient>
  </defs>
  ${mark}
  ${monoText("overcast", { x: 620, y: 310, size: 86, ls: -2, weight: 700, fill: "#DCEBF8" })}
  ${monoText("LOCAL AWS EMULATOR", { x: 624, y: 360, size: 27, ls: 6, fill: "#7FA8C9" })}
  ${monoText("overcast.sh", { x: 640, y: 560, size: 24, fill: "#5FB8FF", anchor: "middle" })}
</svg>`;
}
files["social/github-social-card.svg"] = socialSVG();

// Construction diagram — the geometry, annotated
function constructionSVG(): string {
  const size = 480, pad = 60;
  const { c1, c2, c3, W, H } = cloudGeometry();
  const s = (size - pad * 2) / W;
  const T = (px2: number, py2: number): Pt => ({ x: pad + (px2 + c1.r) * s, y: pad + 40 + (H - py2) * s });
  const circ = (c: Circle, label: string): string => {
    const p = T(c.x, c.y);
    return `<circle cx="${round(p.x)}" cy="${round(p.y)}" r="${round(c.r * s)}" stroke="#5FB8FF" stroke-width="1" stroke-dasharray="4 4" fill="none" opacity="0.55"/>
  <circle cx="${round(p.x)}" cy="${round(p.y)}" r="2" fill="#5FB8FF"/>
  <text x="${round(p.x)}" y="${round(p.y) - c.r * s - 8}" text-anchor="middle" font-family="ui-monospace, Consolas, monospace" font-size="13" fill="#7FA8C9">${label}</text>`;
  };
  const fit = { x: pad, y: pad + 40, w: size - pad * 2 };
  const cp = cloudPath({ ...fit, h: (fit.w * H) / W });
  const base = T(c1.x, 0);
  const baseEnd = T(c3.x, 0);
  return `<svg width="${size}" height="${size * 0.82}" viewBox="0 0 ${size} ${size * 0.82}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size * 0.82}" fill="#10161D"/>
  <path d="${cp}" fill="#33536F" fill-opacity="0.35" stroke="#89BCE2" stroke-width="1.6"/>
  ${circ(c1, "r")}
  ${circ(c2, "r·φ")}
  ${circ(c3, "r·√φ")}
  <line x1="${round(base.x - 30)}" y1="${round(base.y)}" x2="${round(baseEnd.x + 50)}" y2="${round(base.y)}" stroke="#54718A" stroke-width="1" stroke-dasharray="2 4"/>
  <text x="${round(baseEnd.x + 54)}" y="${round(base.y) + 4}" font-family="ui-monospace, Consolas, monospace" font-size="12" fill="#54718A">baseline</text>
  <text x="${size / 2}" y="${size * 0.82 - 36}" text-anchor="middle" font-family="ui-monospace, Consolas, monospace" font-size="11" fill="#7FA8C9">width : height = φ : 1 · radii in golden progression r, r√φ, rφ</text>
  <text x="${size / 2}" y="${size * 0.82 - 18}" text-anchor="middle" font-family="ui-monospace, Consolas, monospace" font-size="11" fill="#7FA8C9">apex of &gt; at (1−1/φ)·w · cursor on chevron baseline</text>
</svg>`;
}
files["brand/construction.svg"] = constructionSVG();

for (const d of ["loading", "favicon", "social", "brand"]) mkdirSync(join(OUT, d), { recursive: true });

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(OUT, name), svg + "\n");
}
console.log(`wrote ${Object.keys(files).length} files to ${OUT}`);
