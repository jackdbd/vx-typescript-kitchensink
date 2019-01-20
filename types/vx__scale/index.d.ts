// Type definitions for @vx/scale 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/scale" {
  import {
    ScaleBand as D3ScaleBand,
    ScaleLinear as D3ScaleLinear,
    ScaleTime as D3ScaleTime,
  } from "d3-scale";

  type NumberLike = number | { valueOf(): number };
  type ScaleFunction = ScaleLinear | ScaleTime;
  type Accessor<T, R> = (datum: T) => R;

  interface SharedOptions {
    clamp?: boolean;
    nice?: boolean;
  }

  interface LinearScaleOptions extends SharedOptions {
    domain: number[];
    range: number[];
    rangeRound?: NumberLike[]; // TODO: this should be optional in vx-scale
  }

  interface TimeScaleOptions extends SharedOptions {
    domain: Date[] | number[];
    range: Date[] | number[];
    rangeRound?: NumberLike[]; // TODO: this should be optional in vx-scale
  }

  interface ScaleLinear<Range, Output> extends D3ScaleLinear<Range, Output> {
    type: string;
  }

  interface ScaleTime<Range, Output> extends D3ScaleTime<Range, Output> {
    type: string;
  }

  function scaleBand(): any;
  function scalePoint(): any;
  function scaleLinear(
    scaleOptions: LinearScaleOptions
  ): ScaleLinear<number, number>;
  function scaleTime(scaleOptions: TimeScaleOptions): ScaleTime<any, any>;
  function scaleUtc(): any;
  function scaleLog(): any;
  function scalePower(): any;
  function scaleOrdinal(): any;
  function scaleQuantize(): any;
  function scaleQuantile(): any;
  function scaleThreshold(): any;
}
