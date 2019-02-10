// Type definitions for @vx/threshold 0.0.184
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/threshold" {
  import React from "react";

  interface IProps {
    className?: string;
    curve?: any; // func
    clipAboveTo?: any; // func or number
    clipBelowTo?: any; // func or number
    id?: string;
    data: any;
    x: any; // func or number
    y0: any; // func or number
    y1: any; // func or number
    aboveAreaProps?: object;
    belowAreaProps?: object;
  }

  const Threshold: React.ComponentType<IProps>;
}
