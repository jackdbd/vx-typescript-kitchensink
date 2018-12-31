import React from "react";
import { Group } from "@vx/group";
import { GridRows } from "@vx/grid";
import { LinePath } from "@vx/shape";
import { curveMonotoneX } from "@vx/curve";
import { genDateValue, DateValueDatum } from "@vx/mock-data";
import { scaleTime, scaleLinear, Accessor } from "@vx/scale";
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

const x: Accessor<DateValueDatum, Date> = d => d.date;
const y: Accessor<DateValueDatum, number> = d => d.value;

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
  const xMax = width;
  const yMax = height / 8;

  const [minDate, maxDate] = extent(data, x) as [Date, Date];
  const scaleTimeOptions = {
    domain: [minDate, maxDate],
    range: [0, xMax],
  };
  const xScale = scaleTime(scaleTimeOptions);

  const maxValue = max(data, y) as number;
  const scaleLinearOptions = {
    domain: [0, maxValue],
    range: [yMax, 0],
    rangeRound: [1, 2],
  };
  const yScale = scaleLinear(scaleLinearOptions);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill="#242424" rx={14} />
      <GridRows
        top={margin.top}
        left={margin.left}
        scale={xScale}
        stroke="rgba(142, 32, 95, 0.9)"
        width={xMax}
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
