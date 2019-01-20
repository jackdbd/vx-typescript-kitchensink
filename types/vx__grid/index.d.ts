// Type definitions for @vx/grid 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
//                 Sean Lynch <https://github.com/techniq>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/grid" {
  import React from "react";
  // TODO: import from vx-scale?
  import { ScaleBand, ScaleLinear, ScaleTime } from "d3-scale";
  // import { scaleBand } from "@vx/scale";

  // TODO: add all d3 scale function combinations?
  type ScaleFunction =
    | ScaleBand<any>
    | ScaleLinear<any, any>
    | ScaleTime<any, any>;

  interface SharedProps {
    className?: string;
    left?: number;
    stroke?: string;
    strokeDasharray?: string;
    strokeWidth?: string | number;
    top?: number;
  }

  interface GridColumnsProps extends SharedProps {
    height: number;
    lineStyle?: React.StyleHTMLAttributes<SVGLineElement>;
    numTicks?: number;
    offset?: number;
    scale: ScaleFunction;
    tickValues?: number[];
  }

  interface GridRowsProps extends SharedProps {
    lineStyle?: React.StyleHTMLAttributes<SVGLineElement>;
    numTicks?: number;
    offset?: number;
    scale: ScaleFunction;
    tickValues?: number[];
    width: number;
  }

  interface GridProps extends SharedProps {
    columnLineStyle?: React.StyleHTMLAttributes<SVGLineElement>;
    columnTickValues?: number[];
    height: number;
    numTicksColumns?: number;
    numTicksRows?: number;
    rowLineStyle?: React.StyleHTMLAttributes<SVGLineElement>;
    rowTickValues?: number[];
    xOffset?: number;
    xScale: ScaleFunction;
    yOffset?: number;
    yScale: ScaleFunction;
    width: number;
  }

  const GridColumns: React.FunctionComponent<GridColumnsProps>;
  const GridRows: React.FunctionComponent<GridRowsProps>;
  const Grid: React.FunctionComponent<GridProps>;
}
