import { PatternCircles, PatternWaves } from "@vx/pattern";
import { scaleLinear, scaleOrdinal } from "@vx/scale";
import { Stack } from "@vx/shape";
import { range, transpose } from "d3-array";
import React from "react";

const NUM_LAYERS = 20;
const SAMPLES_PER_LAYER = 200;
const BUMPS_PER_LAYER = 10;

const keys = range(NUM_LAYERS);

const bumps = (n: number, m: number) => {
  const arr = [];
  let i;
  for (i = 0; i < n; ++i) {
    arr[i] = 0;
  }
  for (i = 0; i < m; ++i) {
    bump(arr, n);
  }
  return arr;
};

const bump = (arr: number[], n: number) => {
  const x = 1 / (0.1 + Math.random());
  const y = 2 * Math.random() - 0.5;
  const z = 10 / (0.1 + Math.random());
  for (let i = 0; i < n; i++) {
    const w = (i / n - y) * z;
    arr[i] += x * Math.exp(-w * w);
  }
};

const yScale = scaleLinear({
  domain: [-30, 50],
});

const xScale = scaleLinear({
  domain: [0, SAMPLES_PER_LAYER - 1],
});

const colorScale = scaleOrdinal({
  domain: keys,
  range: [
    "#ffc409",
    "#f14702",
    "#262d97",
    "white",
    "#036ecd",
    "#9ecadd",
    "#51666e",
  ],
});

const patternScale = scaleOrdinal({
  domain: keys,
  range: [
    "mustard",
    "cherry",
    "navy",
    "circles",
    "circles",
    "circles",
    "circles",
  ],
});

interface IProps {
  height: number;
  width: number;
}

export class StreamgraphDemo extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { width, height } = this.props;

    const layers = transpose(
      keys.map((_) => bumps(SAMPLES_PER_LAYER, BUMPS_PER_LAYER))
    ) as number[][];

    xScale.range([0, width]);
    yScale.range([height, 0]);

    return (
      <svg width={width} height={height}>
        <PatternCircles
          id="mustard"
          height={40}
          width={40}
          radius={5}
          fill="#036ecf"
          complement
        />
        <PatternWaves
          id="cherry"
          height={12}
          width={12}
          fill="transparent"
          stroke="#232493"
          strokeWidth={1}
          complement
        />
        <PatternCircles
          id="navy"
          height={60}
          width={60}
          radius={10}
          fill="white"
          complement
        />
        <PatternCircles
          id="circles"
          height={60}
          width={60}
          radius={10}
          fill="transparent"
          complement
        />
        <g
          onClick={(event) => this.forceUpdate()}
          onTouchStart={(event) => this.forceUpdate()}
        >
          <rect
            fill={`#ffdede`}
            height={height}
            rx={14}
            width={width}
            x={0}
            y={0}
          />
          <Stack
            color={colorScale}
            data={layers}
            keys={keys}
            offset="wiggle"
            x={(d, i) => xScale(i)}
            y0={(d) => yScale(d[0])}
            y1={(d) => yScale(d[1])}
          >
            {(props) => {
              const { stacks, path } = props;
              return stacks.map((stack: any, i: number) => {
                const d = path(stack);
                const color = colorScale(stack.key);
                const pattern = patternScale(stack.key);
                return (
                  <g key={`series-${stack.key}`}>
                    <path d={d} fill={color} />
                    {pattern !== "circles" && (
                      <path d={d} fill={`url(#${pattern})`} />
                    )}
                  </g>
                );
              });
            }}
          </Stack>
        </g>
      </svg>
    );
  }
}
