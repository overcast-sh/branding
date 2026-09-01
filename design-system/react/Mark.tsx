/** The bare Overcast mark — a cloud grounded on a flat baseline carrying a
 * shell prompt `>_`. Four generated variants: full-color for light/dark
 * surfaces, and single-color mono (ink / white) for print-like uses.
 * Minimum size 24px; clearspace = the chevron's height on all sides. */
import React from "react";
import { markLight, markDark, markMonoInk, markMonoWhite } from "./assets.generated";
import { SvgEmbed } from "./_svg";

const VARIANTS = {
  light: markLight,
  dark: markDark,
  "mono-ink": markMonoInk,
  "mono-white": markMonoWhite,
} as const;

export interface MarkProps {
  /** `light` (default) / `dark` full-color, or `mono-ink` / `mono-white` single-color. */
  variant?: keyof typeof VARIANTS;
  /** Rendered size in px (square). Minimum 24. Default 96. */
  size?: number;
  /** Accessible name. Default "Overcast". */
  ariaLabel?: string;
}

export const Mark = ({ variant = "light", size = 96, ariaLabel = "Overcast" }: MarkProps) => (
  <SvgEmbed svg={VARIANTS[variant] ?? markLight} width={size} height={size} label={ariaLabel} />
);
