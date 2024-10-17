export const CSS_VAR_NAME = {
  BOTTOM: "--bottom",
  CURRENT_SNAP_POINT_POSITION_Y: "--current-snap-point-position-y",
} as const satisfies Record<string, `--${string}`>;
