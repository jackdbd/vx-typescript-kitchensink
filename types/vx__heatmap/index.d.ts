// Type definitions for @vx/heatmap 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/heatmap" {
  import {
    scaleBand,
    ScaleBandOptions,
    ScaleLinear,
    LinearScaleOptions,
  } from "@vx/scale";

  interface SharedProps {
    colorScale: any;
    data: any;
    gap: number;
    opacityScale: any;
    xScale: any;
    yScale: any;
  }

  interface HeatmapCircleProps extends SharedProps {
    radius: number;
  }

  interface HeatmapRectProps extends SharedProps {
    binHeight: number;
    binWidth: number;
  }

  const HeatmapCircle: React.ComponentType<HeatmapCircleProps>;
  const HeatmapRect: React.ComponentType<HeatmapRectProps>;
}
