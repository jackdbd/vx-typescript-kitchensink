// Type definitions for @vx/annotation 0.0.184
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/annotation" {
  import React from "react";

  interface IProps {
    className?: string;
    label?: string;
    labelAnchor?: "start" | "middle" | "end";
    labelDx?: number;
    labelDy?: number;
    labelFill?: string;
    labelFontSize?: number;
    labelPaintOrder?: string;
    labelStroke?: string;
    labelStrokeWidth?: number;
    left?: number;
    points?: any;
    stroke?: string;
    strokeWidth?: number;
    top?: number;
  }

  const LinePathAnnotation: React.ComponentType<IProps>;
}
