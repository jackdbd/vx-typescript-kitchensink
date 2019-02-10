import {
  curveBasis,
  curveBundle,
  curveCardinal,
  curveCatmullRom,
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
} from "@vx/curve";
import { GridColumns, GridRows } from "@vx/grid";
import { Group } from "@vx/group";
import { DateValueDatum, genDateValue } from "@vx/mock-data";
import {
  scaleLinear,
  ScaleLinearOptions,
  scaleTime,
  ScaleTimeOptions,
} from "@vx/scale";
import { LinePath } from "@vx/shape";
import { extent } from "d3-array";
import React from "react";

import { IMargin } from "../../interfaces";

const data = genDateValue(15);

const dateAccessor = (d: DateValueDatum) => d.date;
const valueAccessor = (d: DateValueDatum) => d.value;

const timeDomain = extent(data.map(dateAccessor)) as [Date, Date];
const scaleTimeOptions: ScaleTimeOptions = {
  domain: timeDomain,
};
const xScale = scaleTime(scaleTimeOptions);

const scaleLinearOptions: ScaleLinearOptions = {
  domain: [0, Math.max(...data.map(valueAccessor))],
};
const yScale = scaleLinear(scaleLinearOptions);

const xAccessor = (d: DateValueDatum) => xScale(dateAccessor(d));
const yAccessor = (d: DateValueDatum) => yScale(valueAccessor(d));

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

const curves = [
  { func: curveBasis, stroke: "#ffffe5", strokeDasharray: "2,2" },
  { func: curveBundle, stroke: "#f7fcb9", strokeDasharray: "4,1" },
  { func: curveLinear, stroke: "#d9f0a3", strokeDasharray: "4" },
  { func: curveMonotoneX, stroke: "#addd8e", strokeDasharray: "4,1,2" },
  { func: curveMonotoneY, stroke: "#78c679", strokeDasharray: "2,2" },
  { func: curveNatural, stroke: "#41ab5d", strokeDasharray: "5,5" },
  { func: curveStep, stroke: "#238443", strokeDasharray: "none" },
];

export class CurveDemo extends React.Component<IProps> {
  public render() {
    const { height, margin, width } = this.props;
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

    return (
      <svg width={width} height={height}>
        <rect
          fill="#f3f3f3"
          height={height}
          rx={14}
          width={width}
          x={0}
          y={0}
        />
        <Group left={margin.left} top={margin.top}>
          <GridRows
            height={yMax}
            scale={yScale}
            stroke="#e0e0e0"
            width={xMax}
          />
          <GridColumns
            height={yMax}
            scale={xScale}
            stroke="#e0e0e0"
            width={xMax}
          />
          {curves.map((c, i) => {
            return (
              <LinePath
                data={data}
                key={i}
                x={xAccessor}
                y={yAccessor}
                stroke={c.stroke}
                strokeWidth={2}
                strokeDasharray={c.strokeDasharray}
                curve={c.func}
              />
            );
          })}
        </Group>
      </svg>
    );
  }
}
