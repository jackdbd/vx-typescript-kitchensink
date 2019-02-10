// Type definitions for @vx/brush 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/brush" {
  import React from "react";

  type IProps = any; // TODO

  function withBrush(WrappedComponent: any): (props) => JSX.Element;
  function constrainToRegion(): any;
  function getCoordsFromEvent(svg: any, event: React.MouseEvent): any;

  const BoxBrush: React.ComponentType<IProps>;
}
