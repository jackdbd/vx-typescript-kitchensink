// Type definitions for @vx/tooltip 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/tooltip" {
  import {
    BaseComponent,
    IRectShape,
    IWithBoundingRectsProps,
  } from "@vx/bounds";
  import React from "react";

  interface TooltipProps {
    children: JSX.Element | string;
    className?: string;
    left: number | string;
    style?: React.StyleHTMLAttributes;
    top: number | string;
    // TODO restProps
  }

  interface TooltipWithBoundsProps
    extends TooltipProps,
      IWithBoundingRectsProps {
    offsetLeft: number;
    offsetTop: number;
  }

  interface IProps {
    tooltipData: any;
    tooltipLeft: number | undefined; // at first it's undefined
    tooltipOpen: boolean;
    tooltipTop: number | undefined; // at first it's undefined
  }

  interface IWithTooltipProps extends IProps {
    hideTooltip: () => void;
    showTooltip: (props: Partial<IProps>) => void;
    updateTooltip: (props: IProps) => void;
  }

  type WrappedComponent<P = {}> = BaseComponent<P & IWithTooltipProps>;

  function withTooltip(
    WrappedComponent: WrappedComponent<P>
  ): (props: P) => JSX.Element;

  const Tooltip: React.ComponentType<TooltipProps>;
  const TooltipWithBounds: React.ComponentType<TooltipWithBoundsProps>;
}
