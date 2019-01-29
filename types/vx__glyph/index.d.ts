// Type definitions for @vx/glyph 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/glyph" {
  import React from "react";

  interface GlyphProps {
    children?: any;
    className?: string;
    left?: number;
    top?: number;
  }

  interface GlyphDotProps {
    children?: any;
    cx: number;
    cy: number;
    r: number;
    fill: string;
    stroke?: string;
    strokeWidth?: number;
  }

  interface GlyphPropsWithSize extends GlyphProps {
    size: any; // number | function
  }

  const Glyph: React.ComponentType<GlyphProps>;
  const GlyphCircle: React.ComponentType<GlyphPropsWithSize>;
  const GlyphCross: React.ComponentType<GlyphPropsWithSize>;
  const GlyphDiamond: React.ComponentType<GlyphPropsWithSize>;
  const GlyphDot: React.ComponentType<GlyphDotProps>;
  const GlyphSquare: React.ComponentType<GlyphPropsWithSize>;
  const GlyphStar: React.ComponentType<GlyphPropsWithSize>;
  const GlyphTriangle: React.ComponentType<GlyphPropsWithSize>;
  const GlyphWye: React.ComponentType<GlyphPropsWithSize>;
}
