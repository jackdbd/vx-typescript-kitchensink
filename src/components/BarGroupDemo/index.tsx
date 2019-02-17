import { AxisBottom, TextAnchor } from "@vx/axis";
import { Group } from "@vx/group";
import { cityTemperature, CityTemperatureDatum } from "@vx/mock-data";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { BarGroup } from "@vx/shape";
import { timeFormat, timeParse } from "d3-time-format";
import React from "react";

import { IMargin } from "../../interfaces";

const blue = "#aeeef8";
const green = "#e5fd3d";
const purple = "#9caff6";
const bg = "#612efb";

const data = cityTemperature.slice(0, 8);
const keys = Object.keys(data[0]).filter((d: string) => d !== "date");

const parseDate = timeParse("%Y%m%d");
const format = timeFormat("%b %d");
const formatDate = (dateString: string) => {
  const date = parseDate(dateString);
  return format(date!);
};

const x0Accessor = (d: CityTemperatureDatum) => d.date;

const x0Scale = scaleBand({
  domain: data.map(x0Accessor),
  padding: 0.2,
});

const x1Scale = scaleBand({
  domain: keys,
  padding: 0.1,
});

const yDomain = [
  0,
  Math.max(
    ...data.map((d: any) => Math.max(...keys.map((key: any) => d[key])))
  ),
];
const yScale = scaleLinear({
  domain: yDomain,
});

const colorScale = scaleOrdinal({
  domain: keys,
  range: [blue, green, purple],
});

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

export class BarGroupDemo extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.renderBar = this.renderBar.bind(this);
    this.renderBarGroup = this.renderBarGroup.bind(this);
  }

  public render() {
    const { height, margin, width } = this.props;

    const xMax = width;
    const yMax = height - margin.top - 100;

    x0Scale.rangeRound([0, xMax]);
    x1Scale.rangeRound([0, x0Scale.bandwidth()]);
    yScale.range([yMax, 0]);

    return (
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={bg} rx={14} />
        <Group top={margin.top}>
          <BarGroup
            data={data}
            keys={keys}
            height={yMax}
            x0={x0Accessor}
            x0Scale={x0Scale}
            x1Scale={x1Scale}
            yScale={yScale}
            color={colorScale}
          >
            {(barGroups: any) => {
              return barGroups.map(this.renderBarGroup);
            }}
          </BarGroup>
        </Group>
        <AxisBottom
          top={yMax + margin.top}
          tickFormat={formatDate}
          scale={x0Scale}
          stroke={green}
          tickStroke={green}
          hideAxisLine={true}
          tickLabelProps={tickLabelPropsFunction}
        />
      </svg>
    );
  }

  private handleClick(event: React.MouseEvent) {
    const dataset = (event.target as any).dataset;
    const { key, value } = dataset;
    alert(JSON.stringify({ key, value }));
  }

  private renderBar(bar: any, i: number) {
    return (
      <rect
        data-value={bar.value}
        data-key={bar.key}
        fill={bar.color}
        height={bar.height}
        key={bar.key}
        onClick={this.handleClick}
        rx={4}
        x={bar.x}
        y={bar.y}
        width={bar.width}
      />
    );
  }

  private renderBarGroup(barGroup: any, i: number) {
    const { x0, bars } = barGroup;
    const date = x0Scale(x0);
    const keyGroup = `group-${i}-x0-${x0}-date-${date}`;
    return (
      <Group key={keyGroup} left={x0}>
        {bars.map(this.renderBar)}
      </Group>
    );
  }
}

function tickLabelPropsFunction(value: any, index: number) {
  const textAnchor = "middle" as TextAnchor;
  return { fill: green, fontSize: 11, textAnchor };
}
