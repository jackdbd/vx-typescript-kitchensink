// Type definitions for @vx/group 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/group" {
  import React, { SVGAttributes } from "react";

  interface GroupProps extends SVGAttributes<SVGGElement> {
    top?: number;
    left?: number;
    [prop: string]: any; // ...restProps
  }

  const Group: React.FunctionComponent<GroupProps>;
}
