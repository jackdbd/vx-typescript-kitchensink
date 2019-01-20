// Type definitions for @vx/responsive 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/responsive" {
  import {
    Component as ReactComponent,
    ComponentClass as ReactComponentClass,
    FunctionComponent as ReactFunctionComponent,
    PureComponent as ReactPureComponent,
  } from "react";

  interface WithParentSizeProps {
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
    | ReactComponent
    | ReactComponentClass
    | ReactFunctionComponent
    | ReactPureComponent;

  function ParentSize(props: any): JSX.Element<ParentProps>;

  interface SVGProps {
    children: JSX.Element;
    height: number;
    width: number;
  }
  function ScaleSVG(props: SVGProps): any;

  // interface WrappedComponent extends BaseComponent extends PropsResponsive {}
  // type WrappedComponent = BaseComponent<P = {}>;
  type WrappedComponent<P = {}> = BaseComponent<P & WithParentSizeProps>;
  // interface WrappedComponent<P = {}> extends BaseComponent< P & WithParentSizeProps>
  function withParentSize(WrappedComponent): (props) => JSX.Element;
  function withScreenSize(BaseComponent: BaseComponent): JSX.Element;
}
