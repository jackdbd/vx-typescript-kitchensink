// Type definitions for @vx/group 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/group" {
  import React from "react";

  interface GroupProps {
    top?: number;
    left?: number;
    transform?: string;
    className?: string;
    children: React.ReactElement | React.ReactElement[];
    key?: React.Key;
    [prop: string]: any; // ...restProps
  }

  // interface GroupComponent<P> extends FunctionComponent<P> {
  //   (
  //     props: P & { children: React.ReactNode },
  //     context?: any
  //   ): JSX.IntrinsicElements.g;
  // }
  const Group: React.FunctionComponent<GroupProps>;
}
