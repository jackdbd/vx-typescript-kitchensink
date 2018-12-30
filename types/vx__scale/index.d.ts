// Type definitions for @vx/scale 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/scale" {
  type Range = (range: ReadonlyArray<any>) => this;
  import {
    ScaleLinear as D3ScaleLinear,
    ScaleTime as D3ScaleTime,
  } from "d3-scale";

  interface VxRef {
    range?: any;
    rangeRound?: any;
    domain?: any;
    nice?: boolean;
    clamp?: boolean;
  }

  interface ScaleLinear extends D3ScaleLinear<any, any> {
    type: string;
  }

  interface ScaleTime extends D3ScaleTime<any, any> {
    type: string;
  }

  type ScaleFunction = ScaleLinear | ScaleTime;

  // export type AccessorFunction = (d: object) => Pick<object, K>

  export function scaleBand(): any;
  export function scalePoint(): any;
  export function scaleLinear(_ref?: VxRef): D3ScaleLinear;
  export function scaleTime(_ref?: VxRef): D3ScaleTime;
  export function scaleUtc(): any;
  export function scaleLog(): any;
  export function scalePower(): any;
  export function scaleOrdinal(): any;
  export function scaleQuantize(): any;
  export function scaleQuantile(): any;
  export function scaleThreshold(): any;
}
