// Type definitions for @vx/event 0.0.182
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/event" {
  // import { Point } from "@vx/point";
  import React from "react";

  type Node = SVGGraphicsElement | SVGElement | null; // TODO: find the appropriate type
  type Point = { x: number; y: number };

  const localPoint: (event: React.MouseEvent) => Point;
  const localPoint: (node: any, event: React.MouseEvent) => Point;
  const touchPoint: (node: any, event: Event) => Point;
}
