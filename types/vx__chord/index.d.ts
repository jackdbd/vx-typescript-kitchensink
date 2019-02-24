// Type definitions for @vx/chord 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/chord" {
  import React, { SVGAttributes } from "react";

  interface IChordProps extends SVGAttributes<SVGPathElement> {
    children: any;
    matrix: any;
    padAngle?: number;
    sortChords?: any;
    sortGroups?: any;
    sortSubgroups?: any;
  }

  interface IRibbonProps extends SVGAttributes<SVGPathElement> {
    children?: any;
    chord: any;
    className?: string;
    endAngle?: any;
    radius?: any;
    source?: any;
    startAngle?: any;
    target?: any;
  }

  const Chord: React.ComponentType<IChordProps>;
  const Ribbon: React.ComponentType<IRibbonProps>;
}
