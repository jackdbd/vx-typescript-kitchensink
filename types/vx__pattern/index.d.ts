// Type definitions for @vx/pattern 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/pattern" {
  type Orientation = "diagonal" | "horizontal" | "vertical";

  interface PatternCirclesProps {
    complement?: boolean;
    fill: string;
    height: number;
    id: string;
    width: number;
  }

  interface PatternLinesProps {
    height: number;
    id: string;
    orientation?: Orientation[];
    stroke: string;
    strokeWidth: number;
    width: number;
  }

  interface PatternWavesProps {
    complement?: boolean;
    fill: string;
    height: number;
    id: string;
    stroke: string;
    strokeWidth: number;
    width: number;
  }

  const PatternCircles: React.ComponentType<PatternCirclesProps>;
  const PatternLines: React.ComponentType<PatternLinesProps>;
  const PatternWaves: React.ComponentType<PatternWavesProps>;
}
