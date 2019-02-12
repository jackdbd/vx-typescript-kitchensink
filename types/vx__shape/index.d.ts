// Type definitions for @vx/shape 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/shape" {
  import { Curve } from "@vx/curve";
  import { Accessor, ScaleFunction } from "@vx/scale";
  import React, { SVGAttributes } from "react";

  type Datum = any;
  type NumberOrNumberAccessor = number | Accessor<any, number>;
  type Point = { x: number; y: number };

  interface IArcProps {
    centroid?: NumberOrNumberAccessor;
    children: any;
    className?: string;
    cornerRadius?: NumberOrNumberAccessor;
    data: Datum[];
    endAngle: NumberOrNumberAccessor;
    innerRadius: NumberOrNumberAccessor;
    innerRef: React.Ref;
    outerRadius: NumberOrNumberAccessor;
    padAngle: NumberOrNumberAccessor;
    padRadius: NumberOrNumberAccessor;
    startAngle?: NumberOrNumberAccessor;
  }

  interface IAreaProps extends SVGAttributes<SVGElement> {
    children?: any;
    classname?: string;
    curve: Curve;
    data: Datum[];
    defined?: boolean;
    innerRef?: React.Ref;
    stroke?: string;
    strokeWidth?: number;
    x: NumberOrNumberAccessor;
    x0?: NumberOrNumberAccessor;
    x1?: NumberOrNumberAccessor;
    y?: NumberOrNumberAccessor;
    y0?: NumberOrNumberAccessor;
    y1?: NumberOrNumberAccessor;
  }

  interface IAreaClosedProps extends SVGAttributes<SVGElement> {
    children?: any;
    classname?: string;
    curve: Curve;
    data: Datum[];
    defined?: boolean;
    innerRef?: React.Ref;
    x: NumberOrNumberAccessor;
    x0?: NumberOrNumberAccessor;
    x1?: NumberOrNumberAccessor;
    y: NumberOrNumberAccessor;
    y0?: NumberOrNumberAccessor;
    y1?: NumberOrNumberAccessor;
    yScale: ScaleFunction;
  }

  interface IAreaStackProps {
    children?: any;
    classname?: string;
    color: ScaleFunction;
    curve: Curve;
    data: Datum[];
    defined?: boolean;
    keys: string[];
    left: number;
    offset: any; // func | array | string
    top: number;
    value: NumberOrNumberAccessor;
    x: NumberOrNumberAccessor;
    x0: NumberOrNumberAccessor;
    x1: NumberOrNumberAccessor;
    y: NumberOrNumberAccessor;
    y0: NumberOrNumberAccessor;
    y1: NumberOrNumberAccessor;
  }

  interface IBarProps extends SVGAttributes<SVGRectElement> {
    classname?: string;
    data?: Datum[];
    // fill: string;
    // height: number;
    onMouseLeave?: (event: MouseEvent) => void;
    onMouseMove?: (event: MouseEvent) => void;
    onTouchMove?: EventListener;
    onTouchStart?: EventListener;
    ref?: React.Ref;
    // rx?: number;
    // ry?: number;
    // stroke?: string;
    // strokeWidth?: number;
    // width: number;
    // x: number;
    // y: number;
  }

  interface IBarGroupProps {}
  interface IBarStackProps {}

  interface ICircle {
    className?: string;
    innerRef?: React.Ref;
  }

  interface IExtraProps {
    pointerEvents: string;
  }

  interface ILineProps {
    className?: string;
    from: Point;
    innerRef?: React.Ref;
    stroke?: string;
    strokeDasharray?: string;
    strokeWidth?: number;
    style?: React.StyleHTMLAttributes<SVGLineElement> & IExtraProps;
    to: Point;
  }

  interface ILinePathProps extends SVGAttributes<SVGPathElement> {
    curve?: Curve;
    data: Datum[];
    defined?: boolean;
    // radius?: number | string | Accessor<any, number>;
    // stroke?: string;
    // strokeDasharray?: string;
    // strokeWidth?: number;
    x: NumberOrNumberAccessor;
    y: NumberOrNumberAccessor;
  }

  interface ILineRadialProps extends SVGAttributes<SVGPathElement> {
    angle?: NumberOrNumberAccessor;
    className?: string;
    curve?: Curve;
    data: Datum[];
    innerRef?: React.Ref;
    radius?: number | string | Accessor<any, number>;
    stroke?: string;
    strokeDasharray?: string;
    strokeWidth?: number;
  }

  interface IPieProps {
    centroid?: NumberOrNumberAccessor;
    children?: any;
    className: string;
    cornerRadius?: NumberOrNumberAccessor;
    data: Datum[];
    endAngle?: NumberOrNumberAccessor;
    innerRadius?: NumberOrNumberAccessor;
    left: number;
    outerRadius?: NumberOrNumberAccessor;
    padAngle?: NumberOrNumberAccessor;
    padRadius?: NumberOrNumberAccessor;
    pieSort: any;
    pieSortValues: any;
    pieValue: NumberOrNumberAccessor;
    startAngle?: NumberOrNumberAccessor;
    top: number;
  }

  interface IPolygonProps {
    center?: Point;
    children?: any;
    className?: string;
    fill?: string;
    innerRef?: React.Ref;
    rotate: number;
    sides: number;
    size: number;
  }

  interface IStackProps {}

  const Arc: React.ComponentType<IArcProps>;

  const Area: React.ComponentType<IAreaProps>;
  const AreaClosed: React.ComponentType<IAreaClosedProps>;
  const AreaStack: React.ComponentType<IAreaStackProps>;

  const Bar: React.ComponentType<IBarProps>;
  const BarGroup: React.ComponentType<IBarGroupProps>;
  const BarGroupHorizontal: React.ComponentType<IBarGroupProps>;
  const BarStack: React.ComponentType<IBarStackProps>;
  const BarStackHorizontal: React.ComponentType<IBarStackProps>;

  const Circle: React.ComponentType<ICircleProps>;

  const Line: React.ComponentType<ILineProps>;
  const LinePath: React.ComponentType<ILinePathProps>;
  const LineRadial: React.ComponentType<ILineRadialProps>;

  const Pie: React.ComponentType<IPieProps>;

  const Polygon: React.ComponentType<IPolygonProps>;

  const Stack: React.ComponentType<IStackProps>;

  const LinkHorizontalCurve: React.ComponentType<any>;
  const LinkRadialCurve: React.ComponentType<any>;
  const LinkVerticalCurve: React.ComponentType<any>;

  const LinkHorizontal: React.ComponentType<any>;
  const LinkRadial: React.ComponentType<any>;
  const LinkVertical: React.ComponentType<any>;

  const LinkHorizontalLine: React.ComponentType<any>;
  const LinkRadialLine: React.ComponentType<any>;
  const LinkVerticalLine: React.ComponentType<any>;

  const LinkHorizontalStep: React.ComponentType<any>;
  const LinkRadialStep: React.ComponentType<any>;
  const LinkVerticalStep: React.ComponentType<any>;
}
