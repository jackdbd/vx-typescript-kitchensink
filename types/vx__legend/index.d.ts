// Type definitions for @vx/legend 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/legend" {
  import { ScaleFunction } from "@vx/axis";

  interface LegendProps {
    children?: any;
    className?: string;
    direction?: string;
    domain?: any;
    fill?: any;
    itemDirection?: string;
    itemMargin?: string;
    labelAlign?: string;
    labelFlex?: string;
    labelFormat?: any;
    labelMargin?: string;
    labelTransform?: any;
    scale: ScaleFunction;
    shape?: any;
    shapeHeight?: number | string;
    shapeMargin?: string;
    shapeStyle?: any;
    shapeWidth?: number | string;
    style?: React.StyleHTMLAttributes<SVGElement>;
    size?: any;
  }

  const LegendThreshold: React.ComponentType<LegendProps>;
}
