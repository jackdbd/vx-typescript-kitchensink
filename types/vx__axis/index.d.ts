// Type definitions for @vx/axis 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/axis" {
  type ORIENT = {
    left: "left";
    right: "right";
    top: "top";
    bottom: "bottom";
  };

  type TextAnchor = "start" | "middle" | "end" | "inherit";

  // TODO: use Pick or Partial
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

  // TODO import all scale and define this type as scale0 | scale1
  type ScaleFunction = any;
  // let format = scale.tickFormat ? scale.tickFormat() : identity;
  type FormatFunction = (val: any, index: number) => any;
  interface TickOptions {
    x: any;
    y: any;
    formattedValue: FormatFunction;
  }
  type TickComponentFunction = (options: TickOptions) => any;
  type TickFormatFunction = any;
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
    tickValues?: string[];
    tickComponent?: TickComponentFunction;
    top?: number;
    children?: any;
  }

  export function Axis(_ref: AxisProps): any;
  export function AxisLeft(_ref: AxisProps): any;
  export function AxisRight(_ref: any): any;
  export function AxisTop(_ref: any): any;
  export function AxisBottom(_ref: any): any;
}
