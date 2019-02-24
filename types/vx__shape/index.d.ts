// Type definitions for @vx/shape 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/shape" {
  import { Curve } from "@vx/curve";
  import { Accessor, ScaleFunction } from "@vx/scale";
  import { Arc } from "d3-shape";
  import React, { SVGAttributes } from "react";

  // TODO: remove this. It's just to understand how Arc and Pie work
  // import { Browser } from "@vx/mock-data";

  // dependecies
  /*
"@vx/curve": "0.0.182",
    "@vx/group": "0.0.183",
    "@vx/point": "0.0.182",
    "classnames": "^2.2.5",
    "d3-path": "^1.0.5",
    "d3-shape": "^1.2.0",
    "prop-types": "^15.5.10"
*/

  type Datum = any;

  type NumberOrNumberAccessor = number | Accessor<any, number>;
  type StringOrStringAccessor = string | Accessor<any, string>;
  type ValueOrAccessor = NumberOrNumberAccessor | StringOrStringAccessor;

  // are path and pie d3 functions (d3-shape, d3-path)?
  // TODO: this type should be returned by Pie and it should extract its Datum automatically
  type PieInner<T> = {
    arcs: ArcInner<T>[];
    path: Arc<This, ArcInner<T>>;
    pie: any;
  };

  type Point = { x: number; y: number };

  type SortValues<T> = (a: T, b: T) => number;

  interface ArcInner<T> {
    // data: {label: "Google Chrome", usage: 48.09}
    data: T;
    endAngle: number;
    index: number;
    padAngle: number;
    startAngle: number;
    value: number;
  }

  interface IArcProps extends SVGAttributes<SVGPathElement> {
    centroid?: NumberOrNumberAccessor;
    children?: any;
    className?: string;
    cornerRadius?: NumberOrNumberAccessor;
    data: Datum[];
    endAngle?: NumberOrNumberAccessor;
    innerRadius: NumberOrNumberAccessor;
    innerRef?: React.Ref;
    outerRadius: NumberOrNumberAccessor;
    padAngle?: NumberOrNumberAccessor;
    padRadius?: NumberOrNumberAccessor;
    startAngle?: NumberOrNumberAccessor;
  }

  interface IAreaProps extends SVGAttributes<SVGPathElement> {
    children?: any;
    classname?: string;
    curve: Curve;
    data: Datum[];
    defined?: boolean;
    innerRef?: React.Ref;
    x: NumberOrNumberAccessor;
    x0?: NumberOrNumberAccessor;
    x1?: NumberOrNumberAccessor;
    y?: NumberOrNumberAccessor;
    y0?: NumberOrNumberAccessor;
    y1?: NumberOrNumberAccessor;
  }

  interface IAreaClosedProps extends SVGAttributes<SVGPathElement> {
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

  interface IAreaStackProps extends SVGAttributes<SVGPathElement> {
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
    onMouseLeave?: (event: MouseEvent) => void;
    onMouseMove?: (event: MouseEvent) => void;
    onTouchMove?: EventListener;
    onTouchStart?: EventListener;
    ref?: React.Ref;
  }

  interface IBarGroupSharedProps extends SVGAttributes<SVGGElement> {
    color: any;
    data?: Datum[];
    keys?: any;
  }

  interface IBarGroupProps extends IBarGroupSharedProps {
    x0: ValueOrAccessor;
    x0Scale: ScaleFunction;
    x1Scale: ScaleFunction;
    yScale: ScaleFunction;
  }

  interface IBarGroupHorizontalProps extends IBarGroupSharedProps {
    xScale: ScaleFunction;
    y0: ValueOrAccessor;
    y0Scale: ScaleFunction;
    y1Scale: ScaleFunction;
  }

  interface IBarStackSharedProps extends SVGAttributes<SVGRectElement> {
    color: ScaleFunction;
    data?: Datum[];
    keys?: any;
    xScale: ScaleFunction;
    yScale: ScaleFunction;
  }

  interface IBarStackProps extends IBarStackSharedProps {
    x: ValueOrAccessor;
  }

  interface IBarStackHorizontalProps extends IBarStackSharedProps {
    y: ValueOrAccessor;
  }

  interface ICircle {
    className?: string;
    innerRef?: React.Ref;
  }

  interface IExtraProps {
    pointerEvents: string;
  }

  interface ILineProps extends SVGAttributes<SVGLineElement> {
    className?: string;
    from: Point;
    innerRef?: React.Ref;
    style?: React.StyleHTMLAttributes<SVGLineElement> & IExtraProps;
    to: Point;
  }

  interface ILinePathProps extends SVGAttributes<SVGPathElement> {
    curve?: Curve;
    data: Datum[];
    defined?: boolean;
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
  }

  interface ILinkProps {
    source?: any;
    target?: any;
  }

  interface ILinkHorizontalProps extends ILinkProps, SVGAttributes<SVGElement> {
    children?: any;
    data: Datum[];
    innerRef?: React.Ref;
    path?: any;
    x?: Accessor<any, number>;
    y?: Accessor<any, number>;
  }
  interface ILinkHorizontalCurveProps extends ILinkHorizontalProps {
    percent: number;
  }

  interface ILinkHorizontalStepProps extends ILinkHorizontalProps {
    percent: number;
  }

  interface ILinkRadialProps extends ILinkProps {
    children: any;
    innerRef: React.Ref;
    path: any;
    x: Accessor<any, number>;
    y: Accessor<any, number>;
  }

  interface ILinkRadialCurveProps extends ILinkRadialProps {
    percent: number;
  }

  interface ILinkRadialStepProps extends ILinkRadialProps {
    percent: number;
  }

  interface ILinkVerticalProps extends ILinkProps, SVGAttributes<SVGElement> {
    children?: any;
    data: Datum[];
    innerRef?: React.Ref;
    path?: any;
    x?: Accessor<any, number>;
    y?: Accessor<any, number>;
  }

  interface ILinkVerticalCurveProps extends ILinkVerticalProps {
    percent: number;
  }

  interface ILinkVerticalStepProps extends ILinkVerticalProps {
    percent: number;
  }

  interface IPieProps {
    centroid?: NumberOrNumberAccessor;
    children?: any;
    className?: string;
    cornerRadius?: NumberOrNumberAccessor;
    data: Datum[];
    endAngle?: NumberOrNumberAccessor;
    innerRadius?: NumberOrNumberAccessor;
    left?: number;
    outerRadius?: NumberOrNumberAccessor;
    padAngle?: NumberOrNumberAccessor;
    padRadius?: NumberOrNumberAccessor;
    pieSort?: any;
    pieSortValues?: SortValues<any>;
    pieValue?: NumberOrNumberAccessor;
    startAngle?: NumberOrNumberAccessor;
    top?: number;
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
  const BarGroupHorizontal: React.ComponentType<IBarGroupHorizontalProps>;
  const BarStack: React.ComponentType<IBarStackProps>;
  const BarStackHorizontal: React.ComponentType<IBarStackHorizontalProps>;

  const Circle: React.ComponentType<ICircleProps>;

  const Line: React.ComponentType<ILineProps>;
  const LinePath: React.ComponentType<ILinePathProps>;
  const LineRadial: React.ComponentType<ILineRadialProps>;

  const LinkHorizontal: React.ComponentType<ILinkHorizontalProps>;
  const LinkHorizontalCurve: React.ComponentType<ILinkHorizontalCurveProps>;
  const LinkHorizontalLine: React.ComponentType<ILinkHorizontalProps>;
  const LinkHorizontalStep: React.ComponentType<ILinkHorizontalStepProps>;

  const LinkRadial: React.ComponentType<ILinkRadialProps>;
  const LinkRadialCurve: React.ComponentType<ILinkRadialCurveProps>;
  const LinkRadialLine: React.ComponentType<ILinkRadialProps>;
  const LinkRadialStep: React.ComponentType<ILinkRadialStepProps>;

  const LinkVertical: React.ComponentType<ILinkVerticalProps>;
  const LinkVerticalCurve: React.ComponentType<ILinkVerticalCurveProps>;
  const LinkVerticalLine: React.ComponentType<ILinkVerticalProps>;
  const LinkVerticalStep: React.ComponentType<ILinkVerticalStepProps>;

  type LinkComponent =
    | LinkHorizontal
    | LinkHorizontalCurve
    | LinkHorizontalLine
    | LinkHorizontalStep
    | LinkRadial
    | LinkRadialCurve
    | LinkRadialLine
    | LinkRadialStep
    | LinkVertical
    | LinkVerticalCurve
    | LinkVerticalLine
    | LinkVerticalStep;

  const Pie: React.ComponentType<IPieProps>;

  const Polygon: React.ComponentType<IPolygonProps>;

  const Stack: React.ComponentType<IStackProps>;
}
