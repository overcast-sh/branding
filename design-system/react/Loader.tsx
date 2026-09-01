/** The Overcast loading state — the mark with its cursor bar blinking
 * (1.1s stepped, the one sanctioned brand animation). The artwork is the
 * generated loader SVG, which uses the dark-palette mark colors and reads
 * on both light and dark surfaces. */
import React from "react";
import { loader } from "./assets.generated";
import { SvgEmbed } from "./_svg";

export interface LoaderProps {
  /** Rendered size in px (square). Default 96. */
  size?: number;
  /** Accessible name. Default "Loading…". */
  ariaLabel?: string;
}

export const Loader = ({ size = 96, ariaLabel = "Loading…" }: LoaderProps) => (
  <SvgEmbed svg={loader} width={size} height={size} label={ariaLabel} />
);
