import { AxisLeft, TextAnchor } from "@vx/axis";
import { Group } from "@vx/group";
import { cityTemperature } from "@vx/mock-data";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { Bar, BarGroupHorizontal } from "@vx/shape";
import { timeFormat, timeParse } from "d3-time-format";
import React from "react";

import { IMargin } from "../../interfaces";

const parseDate = timeParse("%Y%m%d");
const format = timeFormat("%b %d");
const formatDate = (dateString: string) => {
  const date = parseDate(dateString);
  return format(date!);
};
const max = (arr: any, fn: any) => Math.max(...arr.map(fn));

const data = cityTemperature.slice(0, 4);
const keys = Object.keys(data[0]).filter(d => d !== "date");

const y0Accessor = (d: any) => d.date;

const y0Scale = scaleBand({
  domain: data.map(y0Accessor),
  padding: 0.2,
});
const y1Scale = scaleBand({
  domain: keys,
  padding: 0.1,
});
const xScale = scaleLinear({
  domain: [0, max(data, (d: any) => max(keys, (key: any) => d[key]))],
});
const color = scaleOrdinal({
  domain: keys,
  range: ["#aeeef8", "#e5fd3d", "#9caff6"],
});
interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

export class BarGroupHorizontalDemo extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.renderBar = this.renderBar.bind(this);
    this.renderBarGroup = this.renderBarGroup.bind(this);
  }

  public render() {
    const { height, margin, width } = this.props;

    const xMax = width - margin.left - margin.right;
    const yMax = height - 100;

    y0Scale.rangeRound([0, yMax]);
    y1Scale.rangeRound([0, y0Scale.bandwidth()]);
    xScale.rangeRound([xMax, 0]);

    return (
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#612efb"
          rx={14}
        />
        <Group top={margin.top} left={margin.left}>
          <BarGroupHorizontal
            data={data}
            keys={keys}
            width={xMax}
            y0={y0Accessor}
            y0Scale={y0Scale}
            y1Scale={y1Scale}
            xScale={xScale}
            color={color}
          >
            {(barGroups: any) => {
              return barGroups.map(this.renderBarGroup);
            }}
          </BarGroupHorizontal>
          <AxisLeft
            scale={y0Scale}
            stroke="#e5fd3d"
            tickStroke="#e5fd3d"
            tickFormat={formatDate}
            hideAxisLine
            tickLabelProps={tickLabelPropsFunction}
          />
        </Group>
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
    const { y0, bars } = barGroup;
    const key = `group-${i}-y0-${y0}`;
    return (
      <Group key={y0} top={y0}>
        {bars.map(this.renderBar)}
      </Group>
    );
  }
}

function tickLabelPropsFunction(value: any, i: number) {
  const textAnchor = "end" as TextAnchor;
  return {
    dy: "0.33em",
    fill: "#e5fd3d",
    fontSize: 11,
    textAnchor,
  };
}
