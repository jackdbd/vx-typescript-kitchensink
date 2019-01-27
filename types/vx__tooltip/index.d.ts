// Type definitions for @vx/tooltip 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/tooltip" {
  import React from "react";
  import {
    Component as ReactComponent,
    ComponentClass as ReactComponentClass,
    FunctionComponent as ReactFunctionComponent,
    PureComponent as ReactPureComponent,
  } from "react";

  type FunctionComponent = () => JSX.Element;
  type FunctionComponentWithProps = (props: any) => JSX.Element;
  type BaseComponent =
    | FunctionComponent
    | FunctionComponentWithProps
    | ReactComponent
    | ReactComponentClass
    | ReactFunctionComponent
    | ReactPureComponent;

  interface TooltipProps {
    children: JSX.Element | string;
    className?: string;
    left: number | string;
    style?: React.StyleHTMLAttributes;
    top: number | string;
    // TODO restProps
  }

  interface IRectShape {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  }

  interface IBoundingRectProps {
    getRects: any; // TODO
    parentRect: IRectShape;
    rect: IRectShape;
  }

  interface TooltipWithBoundsProps extends TooltipProps, IBoundingRectProps {
    offsetLeft: number;
    offsetTop: number;
  }

  interface IProps {
    tooltipData: any;
    tooltipLeft: number;
    tooltipOpen: boolean;
    tooltipTop: number;
  }

  interface WithTooltipProps extends IProps {
    hideTooltip: () => void;
    showTooltip: () => void;
    updateTooltip: (props: IProps) => void;
  }

  type WrappedComponent<P = {}> = BaseComponent<P & WithTooltipProps>;

  function withTooltip(WrappedComponent): (props) => JSX.Element;
  const Tooltip: React.ComponentType<TooltipProps>;
  const TooltipWithBounds: React.ComponentType<TooltipWithBoundsProps>;
}
