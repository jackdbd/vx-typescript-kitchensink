// Type definitions for @vx/marker 0.0.184
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/marker" {
  import React from "react";

  interface IProps {
    className?: string;
    from?: any;
    label?: any; // string | function
    labelAnchor?: string;
    labelDx?: number;
    labelDy?: number;
    labelFill?: string;
    labelFontSize?: number | string;
    labelPaintOrder?: string;
    labelStroke?: string;
    labelStrokeWidth?: number | string;
    left?: number;
    stroke?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
    to?: any;
    top?: number;
    transform?: string;
  }

  const Marker: React.ComponentType<IProps>;
}
