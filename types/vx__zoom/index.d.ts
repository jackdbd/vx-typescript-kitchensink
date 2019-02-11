// Type definitions for @vx/zoom 0.0.185
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/zoom" {
  import React from "react";

  interface ITransformMatrix {
    scaleX: number;
    scaleY: number;
    skewX: number;
    skewY: number;
    translateX: number;
    translateY: number;
  }

  type WheelDelta = (
    event: React.WheelEvent
  ) => { scaleX: number; scaleY: number };

  type ZoomState = {
    applyInverseToPoint: any;
    applyToPoint: any;
    center: any;
    clear: any;
    dragEnd: any;
    dragMove: any;
    dragStart: any;
    handleWheel: any;
    initialTransformMatrix: ITransformMatrix;
    invert: any;
    isDragging: boolean;
    reset: any;
    scale: any;
    scaleTo: any;
    setTransformMatrix: any;
    setTranslate: any;
    toString: any;
    toStringInvert: any;
    transformMatrix: ITransformMatrix;
    translate: any;
    translateTo: any;
  };

  interface IProps {
    children: React.ReactNode;
    height: number;
    scaleXMin?: number;
    scaleXMax?: number;
    scaleYMin?: number;
    scaleYMax?: number;
    transformMatrix?: ITransformMatrix;
    wheelDelta?: WheelDelta;
    width: number;
  }
  const Zoom: React.ComponentType<IProps>;
}
