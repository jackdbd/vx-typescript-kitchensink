// Type definitions for @vx/point 0.0.189
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/point" {
  interface Options {
    readonly x?: number;
    readonly y?: number;
  }

  export class Point {
    constructor(options: Options);

    readonly x: number;
    readonly y: number;

    toArray(): [number, number];
    value(): { x: number; y: number };
  }
}
