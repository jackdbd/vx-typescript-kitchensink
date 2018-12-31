// Type definitions for @vx/point 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/point" {
  declare class Point {
    constructor(x: number, y: number);
    value(): { x: number; y: number };
    toArray(): [number, number];
  }
}
