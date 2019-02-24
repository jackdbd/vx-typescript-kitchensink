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
    ScaleOrdinal as D3ScaleOrdinal,
  } from "d3-scale";
  import React from "react";

  type NumberLike = number | { valueOf(): number };
  // type NumberOutput = number;
  // type NumberRange = [number, number];

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
    domain: number[] | string[];
    padding: number;
    rangeRound?: NumberLike[];
  }

  interface ScalePointOptions extends SharedOptions {
    domain: [number, number];
  }

  interface ScaleLinearOptions extends SharedOptions {
    domain: [number, number];
    range?: [number, number] | [string, string];
    rangeRound?: NumberLike[];
  }

  interface ScaleLogOptions extends SharedOptions {
    domain: [number, number];
    range?: [number, number] | [string, string];
    rangeRound?: NumberLike[];
  }

  interface ScaleTimeOptions extends SharedOptions {
    domain: [Date, Date] | [number, number];
    range?: [Date, Date] | [number, number];
    rangeRound?: NumberLike[];
  }

  interface ScaleUtcOptions extends SharedOptions {
    domain: [Date, Date] | [number, number];
    range?: [Date, Date] | [number, number];
  }

  interface ScaleLinear<Range, Output> extends D3ScaleLinear<Range, Output> {
    type: string;
  }

  interface ScaleLog<Range, Output> extends D3ScaleLogarithmic<Range, Output> {
    type: string;
  }

  interface ScaleOrdinalOptions extends SharedOptions {
    domain: number[] | string[];
    // range?: number[] | string[] | React.ReactElement[];
    range?: any;
  }

  interface ScaleQuantizeOptions extends SharedOptions {
    domain: [number, number] | [string, string] | [undefined, undefined];
    range?: number[] | string[] | React.ReactElement[];
  }

  interface ScaleOrdinal<Range, Output> extends D3ScaleOrdinal<Range, Output> {
    type: string;
  }

  interface ScaleTime<Range, Output> extends D3ScaleTime<Range, Output> {
    type: string;
  }

  function scaleBand(scaleOptions: ScaleBandOptions): any;

  function scalePoint(scaleOptions: ScalePointOptions): any;

  function scaleLinear(scaleOptions: ScaleLinearOptions): ScaleLinear<any, any>;

  function scaleTime(
    scaleOptions: ScaleTimeOptions
  ): ScaleTime<Date | number, number>;

  function scaleUtc(scaleOptions: ScaleUtcOptions): any;

  function scaleLog(scaleOptions: ScaleLogOptions): ScaleLog<number, number>;

  function scalePower(scaleOptions: any): any;

  function scaleOrdinal(
    scaleOptions: ScaleOrdinalOptions
  ): ScaleOrdinal<number | string | React.ReactElement>;

  function scaleQuantize(scaleOptions: ScaleQuantizeOptions): any;

  function scaleQuantile(scaleOptions: any): any;

  function scaleThreshold(scaleOptions: any): any;
}
