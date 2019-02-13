// Type definitions for @vx/legend 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/legend" {
  import { ScaleFunction } from "@vx/axis";
  import React from "react";

  interface LegendProps extends React.DOMAttributes<HTMLDivElement> {
    align?: string;
    children?: any;
    className?: string;
    direction?: string;
    domain?: any;
    fill?: any;
    flexDirection?: string;
    itemDirection?: string;
    itemMargin?: string;
    labelAlign?: string;
    labelFlex?: string;
    labelFormat?: any;
    labelMargin?: string;
    labelTransform?: any;
    margin?: any;
    scale?: ScaleFunction;
    shape?: any;
    shapeHeight?: number | string;
    shapeMargin?: string;
    shapeStyle?: any;
    shapeWidth?: number | string;
    style?: React.StyleHTMLAttributes<SVGElement>;
    size?: any;
  }

  const Circle: any;
  const Rect: any;

  const Legend: React.ComponentType<LegendProps>;
  const LegendItem: React.ComponentType<LegendProps>;
  const LegendLabel: React.ComponentType<LegendProps>;
  const LegendLinear: React.ComponentType<LegendProps>;
  const LegendOrdinal: React.ComponentType<LegendProps>;
  const LegendQuantile: React.ComponentType<LegendProps>;
  const LegendShape: React.ComponentType<LegendProps>;
  const LegendSize: React.ComponentType<LegendProps>;
  const LegendThreshold: React.ComponentType<LegendProps>;
}
