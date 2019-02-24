// Type definitions for @vx/chord 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/chord" {
  import { Chord, Chords, ChordSubgroup } from "d3-chord";
  import React, { SVGAttributes } from "react";

  type SortValues<T> = (a: T, b: T) => number;

  interface IChordProps extends SVGAttributes<SVGPathElement> {
    children: React.FunctionComponent<{ chords: Chords }>;
    matrix: number[][];
    padAngle?: number;
    sortChords?: SortValues<number>;
    sortGroups?: SortValues<number>;
    sortSubgroups?: SortValues<number>;
  }

  interface IRibbonProps extends SVGAttributes<SVGPathElement> {
    children?: React.ReactNode;
    chord: Chord;
    endAngle?: number;
    radius?: number;
    source?: ChordSubgroup;
    startAngle?: number;
    target?: ChordSubgroup;
  }

  const Chord: React.ComponentType<IChordProps>;
  const Ribbon: React.ComponentType<IRibbonProps>;
}
