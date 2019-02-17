import { AxisBottom, TextAnchor } from "@vx/axis";
import { Grid } from "@vx/grid";
import { Group } from "@vx/group";
import { LegendOrdinal } from "@vx/legend";
import { cityTemperature } from "@vx/mock-data";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { BarStack } from "@vx/shape";
import { timeFormat, timeParse } from "d3-time-format";
import React from "react";
import styled from "styled-components";

import { IMargin } from "../../interfaces";

const Container = styled.div`
  position: relative;
`;

interface IDivProps {
  margin: IMargin;
}

const Div = styled.div`
  display: flex;
  font-size: 14px;
  justify-content: center;
  position: absolute;
  top: ${(props: IDivProps) => `${props.margin.top / 2 - 10}px;`};
  width: 100%;
`;

const purple1 = "#6c5efb";
const purple2 = "#c998ff";
const purple3 = "#a44afe";
const bg = "#eaedff";

const data = cityTemperature.slice(0, 12);
const keys = Object.keys(data[0]).filter((d) => d !== "date");

const totals = data.reduce((prev: any, current: any) => {
  const t = keys.reduce((dailyTotal, k) => {
    dailyTotal += parseInt(current[k], 10);
    return dailyTotal;
  }, 0);
  return prev.concat(t);
}, []);

const parseDate = timeParse("%Y%m%d");
const format = timeFormat("%b %d");
const formatDate = (dateString: string) => {
  const date = parseDate(dateString);
  return format(date!);
};

const xAccessor = (d: any) => d.date;

const xScale = scaleBand({
  domain: data.map(xAccessor),
  padding: 0.2,
});
const yScale = scaleLinear({
  domain: [0, Math.max(...totals)],
  nice: true,
});
const color = scaleOrdinal({
  domain: keys,
  range: [purple1, purple2, purple3],
});

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

export class BarStackDemo extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.renderBar = this.renderBar.bind(this);
    this.renderStackLayer = this.renderStackLayer.bind(this);
  }

  public render() {
    const { height, margin, width } = this.props;

    const xMax = width;
    const yMax = height - margin.top - 100;

    xScale.rangeRound([0, xMax]);
    yScale.range([yMax, 0]);

    return (
      <Container>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={bg} rx={14} />
          <Grid
            top={margin.top}
            left={margin.left}
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            stroke={"black"}
            strokeOpacity={0.1}
            xOffset={xScale.bandwidth() / 2}
          />
          <Group top={margin.top}>
            <BarStack
              data={data}
              keys={keys}
              x={xAccessor}
              xScale={xScale}
              yScale={yScale}
              color={color}
            >
              {(layers: any) => {
                return layers.map(this.renderStackLayer);
              }}
            </BarStack>
          </Group>
          <AxisBottom
            top={yMax + margin.top}
            scale={xScale}
            tickFormat={formatDate}
            stroke={purple3}
            tickStroke={purple3}
            tickLabelProps={tickLabelFunction}
          />
        </svg>
        <Div margin={margin}>
          <LegendOrdinal
            scale={color}
            direction="row"
            labelMargin="0 15px 0 0"
          />
        </Div>
      </Container>
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
        key={i}
        x={bar.x}
        y={bar.y}
        height={bar.height}
        width={bar.width}
        fill={bar.color}
        onClick={this.handleClick}
      />
    );
  }

  private renderStackLayer(layer: any, i: number) {
    return layer.bars.map(this.renderBar);
  }
}

function tickLabelFunction(value: any, i: number) {
  const textAnchor = "middle" as TextAnchor;
  return {
    fill: purple3,
    fontSize: 11,
    textAnchor,
  };
}
