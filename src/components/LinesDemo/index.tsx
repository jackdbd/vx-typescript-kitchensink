import React from "react";
import { Group } from "@vx/group";
import { GridRows, GridColumns } from "@vx/grid";
import { LinePath } from "@vx/shape";
import { curveMonotoneX } from "@vx/curve";
import { genDateValue } from "@vx/mock-data";
import { scaleTime, scaleLinear } from "@vx/scale";
import { extent, max } from "d3-array";

function genLines(num: number) {
  return new Array(num).fill(1).map(() => {
    return genDateValue(25);
  });
}

const series = genLines(12);
const data = series.reduce((rec, d) => {
  return rec.concat(d);
}, []);

// accessors
const x = (d: any) => d.date;
const y = (d: any) => d.value;

interface IMargin {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface IProps {
  width: number;
  height: number;
  margin: IMargin;
}

const LinesDemo = (props: IProps) => {
  const { height, width, margin } = props;
  // bounds
  const xMax = width;
  const yMax = height / 8;

  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
  });

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill="#242424" rx={14} />
      <GridRows
        top={margin.top}
        left={margin.left}
        scale={xScale}
        // xScale={xScale}
        // yScale={yScale}
        stroke="rgba(142, 32, 95, 0.9)"
        width={xMax}
        // height={yMax}
        // numTicksRows={numTicksForHeight(height)}
        // numTicksColumns={numTicksForWidth(width)}
      />
      {xMax > 8 &&
        series.map((d, i) => {
          return (
            <Group key={`lines-${i}`} top={(i * yMax) / 2}>
              <LinePath
                data={d}
                x={(d: any) => xScale(x(d))}
                y={(d: any) => yScale(y(d))}
                stroke={"#ffffff"}
                strokeWidth={1}
                curve={i % 2 == 0 ? curveMonotoneX : undefined}
              />
            </Group>
          );
        })}
    </svg>
  );
};

export default LinesDemo;
