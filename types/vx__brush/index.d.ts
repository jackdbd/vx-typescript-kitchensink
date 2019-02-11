// Type definitions for @vx/brush 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/brush" {
  import { WrappedComponent } from "@vx/bounds";
  // import { Point } from "@vx/point";
  import React from "react";

  type Point = { x: number; y: number };
  type BrushHandler = (_ref: React.Ref) => any; // TODO: avoid any

  interface IWithBrushProps {
    domain?: any;
    end?: Point;
    isBrushing?: boolean;
    onBrushDrag?: BrushHandler;
    onBrushEnd?: BrushHandler;
    onBrushStart?: BrushHandler;
    start?: Point;
    onBrushReset?: BrushHandler;
    updateBrush?: any;
  }

  interface IProps {
    className?: string;
    fill?: string;
    height?: number;
    isBrushing?: boolean;
    stroke?: string;
    strokeWidth?: number;
    width?: number;
    x?: number;
    y?: number;
    // other props
  }

  type WrappedComponent<P = {}> = BaseComponent<P & IWithBrushProps>;

  function withBrush(
    WrappedComponent: WrappedComponent<P>
  ): (props: P) => JSX.Element;

  function constrainToRegion(_ref: React.Ref): Point;

  function getCoordsFromEvent(
    node: SVGGraphicsElement | SVGElement | null,
    event: React.MouseEvent
  ): Point;

  const BoxBrush: React.ComponentType<IProps>;
}
