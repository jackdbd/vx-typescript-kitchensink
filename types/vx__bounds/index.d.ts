// Type definitions for @vx/bounds 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/bounds" {
  import React from "react";

  type FunctionComponent = () => JSX.Element;
  type FunctionComponentWithProps = (props: any) => JSX.Element;
  type BaseComponent =
    | FunctionComponent
    | FunctionComponentWithProps
    | React.Component
    | React.ComponentClass
    | React.FunctionComponent
    | React.PureComponent;

  interface IRectShape {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  }

  type RectAndParentRect = {
    rect: IRectShape;
    parentRect: IRectShape;
  };

  interface WithBoundingRectsProps extends IProps {
    getRects: () => RectAndParentRect;
    parentRect: IRectShape;
    rect: IRectShape;
  }

  type WrappedComponent<P = {}> = BaseComponent<P & WithBoundingRectsProps>;

  const withBoundingRectsProps: WithBoundingRectsProps;

  function withBoundingRects(WrappedComponent): (props) => JSX.Element;
}
