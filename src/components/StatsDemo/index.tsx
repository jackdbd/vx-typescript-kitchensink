import { LinearGradient } from "@vx/gradient";
import { Group } from "@vx/group";
import { genStats, StatsDatum } from "@vx/mock-data";
import { PatternLines } from "@vx/pattern";
import { Accessor, scaleBand, scaleLinear } from "@vx/scale";
import { BoxPlot, ViolinPlot } from "@vx/stats";
import { extent } from "d3-array";
// import { Tooltip } from "@vx/tooltip";
import React from "react";

const getDigit = (s: string) => {
  return parseInt(s.slice(s.length - 1, s.length), 10);
};

const data = genStats(5);
const xAccessor: Accessor<StatsDatum, number> = (d) => getDigit(d.boxPlot.x);
const minAccessor: Accessor<StatsDatum, number> = (d) => d.boxPlot.min;
const maxAccessor: Accessor<StatsDatum, number> = (d) => d.boxPlot.max;
const medianAccessor: Accessor<StatsDatum, number> = (d) => d.boxPlot.median;
const firstQuartileAccessor: Accessor<StatsDatum, number> = (d) =>
  d.boxPlot.firstQuartile;
const thirdQuartileAccessor: Accessor<StatsDatum, number> = (d) =>
  d.boxPlot.thirdQuartile;
const outliersAccessor: Accessor<StatsDatum, number[]> = (d) =>
  d.boxPlot.outliers;

interface IProps {
  height: number;
  width: number;
}

export class StatsDemo extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { height, width } = this.props;
    if (width < 10) {
      return null;
    }

    const xMax = width;
    const yMax = height - 120;

    const xScale = scaleBand({
      domain: data.map(xAccessor),
      padding: 0.4,
      rangeRound: [0, xMax],
    });

    const cb = (d: StatsDatum, i: number) => {
      const { min, max } = d.boxPlot;
      return [min, max];
    };
    const values = data.map(cb).flat();
    const [minYValue, maxYValue] = extent(values) as [number, number];

    const yScale = scaleLinear({
      domain: [minYValue, maxYValue],
      rangeRound: [yMax, 0],
    });

    const boxWidth = xScale.bandwidth();
    const constrainedWidth = Math.min(40, boxWidth);

    return (
      <svg width={width} height={height}>
        <LinearGradient id="boxplot" to="#8b6ce7" from="#87f2d4" />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={`url(#boxplot)`}
          rx={14}
        />
        <PatternLines
          fill="rgba(0,0,0,0.3)"
          height={3}
          id="hViolinLines"
          orientation={["horizontal"]}
          stroke="#ced4da"
          strokeWidth={1}
          width={3}
        />
        <Group top={40}>
          {data.map((d, i) => (
            <g key={i}>
              <ViolinPlot
                data={d.binData}
                fill="url(#hViolinLines)"
                left={xScale(xAccessor(d))}
                stroke="#dee2e6"
                valueScale={yScale}
                width={constrainedWidth}
              />
              <BoxPlot
                boxWidth={constrainedWidth * 0.4}
                data={d.binData}
                fill="#FFFFFF"
                fillOpacity={0.3}
                firstQuartile={firstQuartileAccessor(d)}
                left={xScale(xAccessor(d)) + 0.3 * constrainedWidth}
                max={maxAccessor(d)}
                median={medianAccessor(d)}
                medianProps={{
                  style: {
                    stroke: "white",
                  },
                }}
                min={minAccessor(d)}
                outliers={outliersAccessor(d)}
                thirdQuartile={thirdQuartileAccessor(d)}
                stroke="#FFFFFF"
                strokeWidth={2}
                valueScale={yScale}
              />
            </g>
          ))}
        </Group>
      </svg>
    );
  }
}
