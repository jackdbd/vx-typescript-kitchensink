// Type definitions for @vx/shape 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/shape" {
  import { Curve } from "@vx/curve";
  import { Accessor, ScaleFunction } from "@vx/scale";

  type Datum = any; // TODO

  interface AreaProps {
    curve: Curve;
    data: Datum[];
    fill: string;
    stroke?: string;
    strokeWidth?: number;
    x: Accessor;
    y0: Accessor;
    y1: Accessor;
  }

  interface AreaClosedProps {
    curve: Curve;
    data: Datum[];
    fill: string;
    stroke?: string;
    strokeWidth?: number;
    x: Accessor;
    y: Accessor;
    yScale: ScaleFunction;
  }

  interface BarProps {
    data?: Datum[];
    fill: string;
    height: number;
    onMouseLeave?: (event: MouseEvent) => void;
    onMouseMove?: (event: MouseEvent) => void;
    onTouchMove?: EventListener;
    onTouchStart?: EventListener;
    rx?: number;
    ry?: number;
    stroke?: string;
    strokeWidth?: number;
    width: number;
    x: number;
    y: number;
  }

  interface Point {
    x: number;
    y: number;
  }

  interface ExtraProps {
    pointerEvents: string;
  }

  interface LineProps {
    from: Point;
    stroke?: string;
    strokeDasharray?: string;
    strokeWidth?: number;
    style?: React.StyleHTMLAttributes<SVGLineElement> & ExtraProps;
    to: Point;
  }

  interface LinePathProps {
    curve: Curve;
    data: Datum[];
    stroke?: string;
    strokeDasharray?: string;
    strokeWidth?: number;
    x: Accessor;
    y: Accessor;
  }

  interface PolygonProps {
    fill: string;
    rotate: number;
    sides: number;
    size: number;
  }

  const Area: React.ComponentType<AreaProps>;
  const AreaClosed: React.ComponentType<AreaClosedProps>;
  const Bar: React.ComponentType<BarProps>;
  const Line: React.ComponentType<LineProps>;
  const LinePath: React.ComponentType<LinePathProps>;
  const Polygon: React.ComponentType<PolygonProps>;
}
