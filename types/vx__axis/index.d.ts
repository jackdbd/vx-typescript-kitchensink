// Type definitions for @vx/axis 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
//                 Sean Lynch <https://github.com/techniq>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/axis" {
  import React from "react";
  import { ScaleBand, ScaleLinear, ScaleTime } from "d3-scale";

  type ORIENT = {
    left: "left";
    right: "right";
    top: "top";
    bottom: "bottom";
  };

  type TextAnchor = "start" | "middle" | "end" | "inherit";

  interface Point {
    x: number;
    y: number;
  }

  interface LabelProps {
    dx?: string;
    dy?: string;
    fill?: string;
    fontFamily?: string;
    fontSize?: number;
    textAnchor?: TextAnchor;
  }

  interface TickLabelProps {
    dy: string;
    fill: string;
    fontFamily: string;
    fontSize: number;
    textAnchor: TextAnchor;
  }

  type ScaleFunction =
    | ScaleBand<any, any>
    | ScaleLinear<any, any>
    | ScaleTime<any, any>;
  // let format = scale.tickFormat ? scale.tickFormat() : identity;
  type FormatFunction = (val: any, index: number) => string;
  interface TickOptions {
    x: number;
    y: number;
    formattedValue: FormatFunction | string;
  }
  type TickComponentFunction = (options: TickOptions) => any;
  type TickFormatFunction = (value: any, index: number) => string;
  type TickLabelPropsFunction = (value: any, index: number) => TickLabelProps;

  export interface AxisProps {
    axisClassName?: string;
    axisLineClassName?: string;
    hideAxisLine?: boolean;
    hideTicks?: boolean;
    hideZero?: boolean;
    label?: string;
    labelClassName?: string;
    labelOffset?: number;
    labelProps?: LabelProps;
    left?: number;
    numTicks?: number;
    // orientation: ORIENT.left,
    rangePadding?: number;
    scale: ScaleFunction;
    stroke?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
    tickClassName?: string;
    tickFormat?: TickFormatFunction;
    tickLabelProps?: TickLabelPropsFunction;
    tickLength?: number;
    tickStroke?: string;
    tickTransform?: string;
    tickValues?: string[] | number[];
    tickComponent?: TickComponentFunction | React.ReactNode;
    top?: number;
    children?: (
      renderProps: {
        axisFromPoint: Point;
        axisToPoint: Point;
        horizontal: boolean;
        tickSign: 1 | -1;
        numTicks: number;
        label: string;
        rangePadding: number;
        tickLength: number;
        tickFormat: TickFormatFunction;
        tickPosition: (value: number) => number;
        ticks: {
          value: any;
          index: number;
          from: Point;
          to: Point;
          formattedValue: string;
        };
      }
    ) => React.ReactNode;
  }

  const AxisLeft: React.ComponentType<AxisProps>;
  const AxisRight: React.ComponentType<AxisProps>;
  const AxisBottom: React.ComponentType<AxisProps>;
  const AxisTop: React.ComponentType<AxisProps>;
}
