// Type definitions for vx 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/group" {
  import React, { Props, Attributes } from "react";

  interface GroupProps {
    top?: number;
    left?: number;
    transform?: string;
    className?: string;
    children: React.ReactElement | React.ReactElement[];
    key?: string;
    [prop: string]: any;
  }
  const Group: React.ComponentType<GroupProps>;
}
