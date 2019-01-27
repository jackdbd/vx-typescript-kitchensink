// Type definitions for @vx/scale 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/scale" {
  import {
    ScaleBand as D3ScaleBand,
    ScaleLinear as D3ScaleLinear,
    ScaleLogarithmic as D3ScaleLogarithmic,
    ScaleTime as D3ScaleTime,
  } from "d3-scale";

  type NumberLike = number | { valueOf(): number };

  type ScaleFunction =
    | ScaleBand<any>
    | ScaleLinear<any, any>
    | ScaleTime<any, any>;

  type Accessor<T, R> = (datum: T) => R;

  interface SharedOptions {
    clamp?: boolean;
    nice?: boolean;
  }

  interface ScaleBandOptions extends SharedOptions {
    domain: number[];
    padding: number;
  }

  interface ScalePointOptions extends SharedOptions {
    domain: number[];
  }

  interface ScaleLinearOptions extends SharedOptions {
    domain: number[];
    range?: number[] | string[];
    rangeRound?: NumberLike[]; // TODO: this should be optional in vx-scale
  }

  interface ScaleLogOptions extends SharedOptions {
    domain: number[];
    range?: number[] | string[];
    rangeRound?: NumberLike[]; // TODO: this should be optional in vx-scale
  }

  interface ScaleTimeOptions extends SharedOptions {
    domain: Date[] | number[];
    range: Date[] | number[];
    rangeRound?: NumberLike[]; // TODO: this should be optional in vx-scale
  }

  interface ScaleUtcOptions extends SharedOptions {
    domain: Date[] | number[];
    range: Date[] | number[];
  }

  interface ScaleLinear<Range, Output> extends D3ScaleLinear<Range, Output> {
    type: string;
  }

  interface ScaleLog<Range, Output> extends D3ScaleLogarithmic<Range, Output> {
    type: string;
  }

  interface ScaleTime<Range, Output> extends D3ScaleTime<Range, Output> {
    type: string;
  }

  function scaleBand(scaleOptions: ScaleBandOptions): any;
  function scalePoint(scaleOptions: ScalePointOptions): any;
  function scaleLinear(
    scaleOptions: ScaleLinearOptions
  ): ScaleLinear<number, number>;
  function scaleTime(scaleOptions: ScaleTimeOptions): ScaleTime<any, any>;
  function scaleUtc(scaleOptions: ScaleUtcOptions): any;
  function scaleLog(scaleOptions: ScaleLogOptions): ScaleLog<number, number>;
  function scalePower(scaleOptions: any): any;
  function scaleOrdinal(scaleOptions: any): any;
  function scaleQuantize(scaleOptions: any): any;
  function scaleQuantile(scaleOptions: any): any;
  function scaleThreshold(scaleOptions: any): any;
}
