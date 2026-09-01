/** The tiled Overcast icon — the mark on an ink rounded square. Use whenever
 * the background is unknown or busy (avatars, favicons, app tiles). Each
 * generated size reduces detail and snaps to the pixel grid, so the component
 * picks the nearest generated asset at or above the requested size instead of
 * scaling a large SVG down. Minimum 16px. */
import React from "react";
import { icon16, icon32, icon48, icon96, icon256 } from "./assets.generated";
import { SvgEmbed } from "./_svg";

const SIZES: Array<[number, string]> = [
  [16, icon16],
  [32, icon32],
  [48, icon48],
  [96, icon96],
  [256, icon256],
];

export interface IconProps {
  /** Rendered size in px (square). Snaps to the nearest generated asset ≥ size (16/32/48/96/256). Default 32. */
  size?: number;
  /** Accessible name. Default "Overcast". */
  ariaLabel?: string;
}

export const Icon = ({ size = 32, ariaLabel = "Overcast" }: IconProps) => {
  const [, svg] = SIZES.find(([s]) => s >= size) ?? SIZES[SIZES.length - 1];
  return <SvgEmbed svg={svg} width={size} height={size} label={ariaLabel} />;
};
