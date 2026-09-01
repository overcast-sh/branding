/** Overcast logo lockup — the mark plus the lowercase `overcast` wordmark
 * (outlined to paths, no font dependency). Use in site/app headers and READMEs.
 * Pick the variant that matches the surface: `light` on light backgrounds,
 * `dark` on dark ones. Below 160px width prefer the bare Mark instead. */
import React from "react";
import { logoLight, logoDark } from "./assets.generated";
import { SvgEmbed } from "./_svg";

export interface LogoProps {
  /** Surface the logo sits on: `light` (default) or `dark`. */
  variant?: "light" | "dark";
  /** Rendered height in px; width follows the 300:64 intrinsic ratio. Default 40. */
  height?: number;
  /** Accessible name. Default "Overcast". */
  ariaLabel?: string;
}

export const Logo = ({ variant = "light", height = 40, ariaLabel = "Overcast" }: LogoProps) => (
  <SvgEmbed
    svg={variant === "dark" ? logoDark : logoLight}
    width={Math.round(height * (300 / 64))}
    height={height}
    label={ariaLabel}
  />
);
