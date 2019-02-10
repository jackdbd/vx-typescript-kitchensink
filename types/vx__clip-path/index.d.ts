// Type definitions for @vx/clip-path 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/clip-path" {
  import React from "react";

  interface IProps {
    id: string;
    children: any;
  }

  interface ICircleProps extends IProps {
    cx?: number | string;
    cy?: number | string;
    r?: number | string;
  }

  interface IRectProps extends IProps {
    height?: number | string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
  }

  const ClipPath: React.ComponentType<IProps>;

  const CircleClipPath: React.ComponentType<ICircleProps>;
  const RectClipPath: React.ComponentType<IRectProps>;
}
