// Type definitions for @vx/point 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/point" {
  interface options {
    x?: number;
    y?: number;
  }
  declare class Point {
    constructor(x: number, y: number);
    constructor(options);

    get x(): number;
    set x(newX: number): void;

    get y(): number;
    set y(newY: number): void;

    toArray(): [number, number];
    value(): { x: number; y: number };
  }
}
