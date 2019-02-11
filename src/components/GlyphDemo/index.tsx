import { curveBasis, curveMonotoneX } from "@vx/curve";
import { GlyphDot } from "@vx/glyph";
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

const x = (d: DateValueDatum) => xScale(dateAccessor(d));
const y = (d: DateValueDatum) => yScale(valueAccessor(d));

const primary = "#8921e0";
const secondary = "#00f2ff";
const contrast = "#ffffff";

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

export class GlyphDemo extends React.Component<IProps> {
  public render() {
    const { height, margin, width } = this.props;
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

    return (
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={secondary}
          rx={14}
        />
        <Group top={margin.top}>
          <LinePath
            data={data}
            x={x}
            y={y}
            stroke={primary}
            strokeWidth={2}
            strokeDasharray="2,2"
            curve={curveBasis}
          />
          <LinePath
            data={data}
            x={x}
            y={y}
            stroke={primary}
            strokeWidth={3}
            curve={curveMonotoneX}
          />
          {data.map((d, i) => {
            const cx = x(d);
            const cy = y(d);
            return (
              <g key={`line-point-${i}`}>
                <GlyphDot
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill={contrast}
                  stroke={secondary}
                  strokeWidth={10}
                />
                <GlyphDot
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill={secondary}
                  stroke={primary}
                  strokeWidth={3}
                />
                <GlyphDot cx={cx} cy={cy} r={4} fill={contrast} />
              </g>
            );
          })}
        </Group>
      </svg>
    );
  }
}
