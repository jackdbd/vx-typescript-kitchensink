// Type definitions for @vx/text 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Sean Lynch <https://github.com/techniq>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/text" {
  import React from "react";

  interface TextProps extends React.SVGAttributes<SVGTextElement> {
    angle?: number;
    capHeight?: number | string;
    children: string;
    dx?: number | string;
    dy?: number | string;
    lineHeight?: number | string;
    scaleToFit?: boolean;
    textAnchor?: "start" | "middle" | "end" | "inherit";
    verticalAnchor?: "start" | "middle" | "end";
    x?: number | string;
    y?: number | string;
  }

  function getStringWidth(): any;
  const Text: React.ComponentType<TextProps>;
}
