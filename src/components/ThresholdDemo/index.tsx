import { AxisBottom, AxisLeft } from "@vx/axis";
import { curveBasis } from "@vx/curve";
import { GridColumns, GridRows } from "@vx/grid";
import { Group } from "@vx/group";
import { cityTemperature, CityTemperatureDatum } from "@vx/mock-data";
import { scaleLinear, scaleTime } from "@vx/scale";
import { LinePath } from "@vx/shape";
import { Threshold } from "@vx/threshold";
import { extent, max, min } from "d3-array";
import { timeParse } from "d3-time-format";
import React from "react";

import { IMargin } from "../../interfaces";

const parseDate = timeParse("%Y%m%d");

const dateAccessor = (d: CityTemperatureDatum) => parseDate(d.date) as Date;
const nyAccessor = (d: CityTemperatureDatum) => +d["New York"];
const sfAccessor = (d: CityTemperatureDatum) => +d["San Francisco"];

const xScale = scaleTime({
  domain: extent(cityTemperature.map(dateAccessor)) as [Date, Date],
});

const minima = cityTemperature.map(d => min([nyAccessor(d), sfAccessor(d)]));
const maxima = cityTemperature.map(d => max([nyAccessor(d), sfAccessor(d)]));
const tempMin = min(minima as [number, number]) as number;
const tempMax = max(maxima as [number, number]) as number;
const yScale = scaleLinear({
  domain: [tempMin, tempMax],
  nice: true,
});

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

export class ThresholdDemo extends React.Component<IProps> {
  public render() {
    const { height, margin, width } = this.props;
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

    return (
      <div>
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
            <line stroke="#e0e0e0" x1={xMax} x2={xMax} y1={0} y2={yMax} />
            <AxisBottom
              numTicks={width > 520 ? 10 : 5}
              scale={xScale}
              top={yMax}
            />
            <AxisLeft scale={yScale} />
            <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
              Temperature (°F)
            </text>
            <Threshold
              aboveAreaProps={{
                fill: "green",
                fillOpacity: 0.4,
              }}
              belowAreaProps={{
                fill: "red",
                fillOpacity: 0.4,
              }}
              clipAboveTo={0}
              clipBelowTo={yMax}
              curve={curveBasis}
              data={cityTemperature}
              x={(d: CityTemperatureDatum) => xScale(dateAccessor(d))}
              y0={(d: CityTemperatureDatum) => yScale(nyAccessor(d))}
              y1={(d: CityTemperatureDatum) => yScale(sfAccessor(d))}
            />
            <LinePath
              curve={curveBasis}
              data={cityTemperature}
              stroke="#000"
              strokeDasharray="1,2"
              strokeOpacity={0.8}
              strokeWidth={1.5}
              x={(d: CityTemperatureDatum) => xScale(dateAccessor(d))}
              y={(d: CityTemperatureDatum) => yScale(sfAccessor(d))}
            />
            <LinePath
              curve={curveBasis}
              data={cityTemperature}
              stroke="#000"
              strokeWidth={1.5}
              x={(d: CityTemperatureDatum) => xScale(dateAccessor(d))}
              y={(d: CityTemperatureDatum) => yScale(nyAccessor(d))}
            />
          </Group>
        </svg>
      </div>
    );
  }
}
