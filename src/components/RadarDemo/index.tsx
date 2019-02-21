import { Group } from "@vx/group";
import { letterFrequency, LetterFrequencyDatum } from "@vx/mock-data";
import { Point } from "@vx/point";
import { Accessor, scaleLinear } from "@vx/scale";
import { Line, LineRadial } from "@vx/shape";
import React from "react";

import { ScaleLinear } from "d3-scale";
import { IMargin } from "../../interfaces";

const orange = "#ff9933";
const pumpkin = "#f5810c";
const silver = "#d9d9d9";
const bg = "#FAF7E9";

const LEVELS = 5;
const ANG = 360;
const data = letterFrequency.slice(2, 12);
const webs = genAngles(data.length);
const zeroPoint = new Point({ x: 0, y: 0 });

const yAccessor: Accessor<LetterFrequencyDatum, number> = (d) => d.frequency;

const radiusScale = scaleLinear({
  domain: [ANG, 0],
  range: [0, Math.PI * 2],
});

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

export class RadarDemo extends React.Component<IProps> {
  public render() {
    const { height, margin, width } = this.props;
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    const radius = Math.min(xMax, yMax) / 2;

    const yScale = scaleLinear({
      domain: [0, Math.max(...data.map(yAccessor))],
      range: [0, radius],
    });

    const points = genPoints(data.length, radius);
    const polygonPoints = genPolygonPoints(data, yScale, yAccessor);
    const polygonPointsString = genPolygonPointsString(polygonPoints);
    // console.warn(polygonPointsString);

    const ringLines = [...Array(LEVELS)].map((_, i) => {
      const r = ((i + 1) * radius) / LEVELS;
      return r;
    });

    return (
      <svg width={width} height={height}>
        <rect fill={bg} width={width} height={height} rx={14} />
        <Group top={height / 2 - margin.top} left={width / 2}>
          {ringLines.map(renderRing)}
          {points.map(renderLine)}
          <polygon
            points={polygonPointsString}
            fill={orange}
            fillOpacity={0.3}
            stroke={orange}
            strokeWidth={1}
          />
          {polygonPoints.map(renderPoint)}
        </Group>
      </svg>
    );
  }
}

function genAngles(length: number) {
  return [...Array(length + 1)].map((_, i) => {
    return {
      angle: i * (ANG / length),
    };
  });
}

function genPoints(length: number, radius: number) {
  const step = (Math.PI * 2) / length;
  return [...Array(length)].map((_, i) => {
    return {
      x: radius * Math.sin(i * step),
      y: radius * Math.cos(i * step),
    };
  });
}

function genPolygonPoints(
  dataBis: LetterFrequencyDatum[],
  scale: ScaleLinear<number | string, number>,
  accessor: Accessor<LetterFrequencyDatum, any>
) {
  const step = (Math.PI * 2) / dataBis.length;
  const points = new Array(dataBis.length).fill({}).map((_: any, i: number) => {
    if (i === 0) {
      return zeroPoint;
    } else {
      const x = scale(accessor(dataBis[i - 1])) * Math.sin(i * step);
      const y = scale(accessor(dataBis[i - 1])) * Math.cos(i * step);
      return new Point({ x, y });
    }
  });
  return points;
}

function genPolygonPointsString(points: Point[]) {
  return points.map(stringifyPoint).join(" ");
}

function renderPoint(point: Point, i: number) {
  return (
    <circle
      key={`radar-point-${i}`}
      cx={point.x}
      cy={point.y}
      r={4}
      fill={pumpkin}
    />
  );
}

function stringifyPoint(point: Point) {
  return `${point.x},${point.y}`;
}

function renderRing(r: number, i: number) {
  return (
    <LineRadial
      key={`web-${i}`}
      data={webs}
      angle={(d) => radiusScale(d.angle)}
      radius={r}
      fill="none"
      stroke={silver}
      strokeWidth={2}
      strokeOpacity={0.8}
      strokeLinecap="round"
    />
  );
}

function renderLine(point: any, i: number) {
  return (
    <Line from={zeroPoint} key={`radar-line-${i}`} to={point} stroke={silver} />
  );
}
