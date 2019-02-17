import { AxisBottom, AxisLeft, TextAnchor } from "@vx/axis";
import { Group } from "@vx/group";
import { LegendOrdinal } from "@vx/legend";
import { cityTemperature, CityTemperatureDatum } from "@vx/mock-data";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { BarStackHorizontal } from "@vx/shape";
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

const totals: number[] = data.reduce((prev: any, current: any) => {
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

const yAccessor = (d: CityTemperatureDatum) => d.date;

const xScale = scaleLinear({
  domain: [0, Math.max(...totals)],
  nice: true,
});

const yScale = scaleBand({
  domain: data.map(yAccessor),
  padding: 0.2,
});

const colorScale = scaleOrdinal({
  domain: keys,
  range: [purple1, purple2, purple3],
});

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

export class BarStackHorizontalDemo extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.renderBar = this.renderBar.bind(this);
    this.renderStackLayer = this.renderStackLayer.bind(this);
  }

  public render() {
    const { height, margin, width } = this.props;
    if (width < 10) {
      return null;
    }

    const xMax = width;
    const yMax = height - margin.top - 100;

    xScale.rangeRound([0, xMax]);
    yScale.range([yMax, 0]);

    return (
      <Container>
        <svg width={width} height={height}>
          <rect width={width} height={height} fill={bg} rx={14} />
          <Group top={margin.top} left={margin.left}>
            <BarStackHorizontal
              data={data}
              keys={keys}
              height={yMax}
              y={yAccessor}
              xScale={xScale}
              yScale={yScale}
              color={colorScale}
            >
              {(layers: any) => {
                return layers.map(this.renderStackLayer);
              }}
            </BarStackHorizontal>
            <AxisLeft
              hideAxisLine={true}
              hideTicks={true}
              scale={yScale}
              tickFormat={formatDate}
              stroke={purple3}
              tickStroke={purple3}
              tickLabelProps={tickLabelFunction}
            />
            <AxisBottom
              top={yMax}
              scale={xScale}
              stroke={purple3}
              tickStroke={purple3}
              tickLabelProps={tickLabelFunction}
            />
          </Group>
        </svg>
        <Div margin={margin}>
          <LegendOrdinal
            scale={colorScale}
            direction="row"
            labelMargin="0 15px 0 0"
          />
        </Div>
      </Container>
    );
  }

  private handleClick(event: React.MouseEvent) {
    const dataset = (event.currentTarget as any).dataset;
    const { indexBar, indexLayer, key, value } = dataset;
    alert(`clicked: ${JSON.stringify({ indexBar, indexLayer, key, value })}`);
  }

  private renderBar(d: any, i: number) {
    const { bar, iLayer } = d;
    const key = `${iLayer}-${bar.index}`;
    return (
      <rect
        data-index-bar={bar.index}
        data-index-layer={iLayer}
        data-key={bar.key}
        data-value={bar.value}
        key={key}
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
    const bars = layer.bars.map((bar: any) => ({ bar, iLayer: layer.index }));
    return bars.map(this.renderBar);
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
