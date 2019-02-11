// Type definitions for @vx/responsive 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/responsive" {
  import React from "react";

  interface IWithParentSizeProps {
    debounceTime: number;
    parentHeight: number;
    parentWidth: number;
  }

  interface ParentProps extends any {
    height: number;
    left: number;
    top: number;
    width: number;
    ref: React.Ref;
    resize: (_ref: React.Ref) => any;
  }

  type FunctionComponent = () => JSX.Element;
  type FunctionComponentWithProps = (props: any) => JSX.Element;
  type BaseComponent =
    | FunctionComponent
    | FunctionComponentWithProps
    | React.Component
    | React.ComponentClass
    | React.FunctionComponent
    | React.PureComponent;

  function ParentSize(props: any): JSX.Element<ParentProps>;

  interface SVGProps {
    children: JSX.Element;
    height: number;
    width: number;
  }

  function ScaleSVG(props: SVGProps): any;

  type WrappedComponent<P = {}> = BaseComponent<P & IWithParentSizeProps>;

  function withParentSize(
    WrappedComponent: WrappedComponent<P>
  ): (props: P) => JSX.Element;

  function withScreenSize(BaseComponent: BaseComponent): JSX.Element;
}
