// Type definitions for @vx/stats 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/stats" {
  import React, { SVGAttributes } from "react";

  interface ISharedProps extends SVGAttributes<SVGElement> {
    className?: string;
    children?: any;
    data: any;
    horizontal?: boolean;
    left?: number;
    top?: number;
    valueScale: _propTypes.default.func;
  }

  interface IBoxPlotProps extends ISharedProps {
    boxProps?: any; // object
    boxWidth?: number;
    container?: boolean;
    containerProps?: any; // object
    fill?: string;
    fillOpacity?: number | string;
    firstQuartile?: number;
    horizontal?: boolean;
    max?: number;
    maxProps?: any; // object
    median?: number;
    medianProps?: any; // object
    min?: number;
    minProps?: any; // object
    outliers?: any;
    outlierProps?: any; // object
    rx?: number;
    ry?: number;
    stroke?: string;
    strokeWidth?: number | string;
    thirdQuartile?: number;
    valueScale?: any;
  }

  interface IViolinPlotProps extends ISharedProps {
    count?: any;
    value?: any;
    width?: number;
  }

  const BoxPlot: React.ComponentType<IBoxPlotProps>;
  const ViolinPlot: React.ComponentType<IViolinPlotProps>;
}
