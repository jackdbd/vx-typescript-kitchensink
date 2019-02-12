import { curveBasisOpen } from "@vx/curve";
import { LinearGradient } from "@vx/gradient";
import { Group } from "@vx/group";
import { appleStock, AppleStockDatum } from "@vx/mock-data";
import { Accessor, scaleLog, scaleTime } from "@vx/scale";
import { LineRadial } from "@vx/shape";
import { extent } from "d3-array";
import React from "react";

const green = "#e5fd3d";
const blue = "#aeeef8";
const darkgreen = "#dff84d";
const bg = "#744cca";

const dateAccessor: Accessor<AppleStockDatum, Date> = (d) => new Date(d.date);
const closeAccessor: Accessor<AppleStockDatum, number> = (d) => +d.close;

const xDomain = extent(appleStock.map(dateAccessor)) as [Date, Date];
const xScale = scaleTime({
  domain: xDomain,
  range: [0, Math.PI * 2],
});

const yDomain = extent(appleStock.map(closeAccessor)) as [number, number];
const yScale = scaleLog({
  domain: yDomain,
});

const angle: Accessor<AppleStockDatum, number> = (d: AppleStockDatum) =>
  xScale(dateAccessor(d));
const radius: Accessor<AppleStockDatum, number> = (d: AppleStockDatum) =>
  yScale(closeAccessor(d));

const firstPoint = appleStock[0];
const lastPoint = appleStock[appleStock.length - 1];

interface IProps {
  height: number;
  width: number;
}

export const LineRadialDemo = (props: IProps) => {
  const { height, width } = props;
  return (
    <svg width={width} height={height}>
      <LinearGradient from={green} to={blue} id="line-gradient" />
      <rect width={width} height={height} fill={bg} rx={14} />
      <Group top={height / 2} left={width / 2}>
        {yScale.ticks().map((tick, i) => {
          const y = yScale(tick);
          const opacity = 1 / (i + 1) - (1 / i) * 0.2;
          return (
            <g key={`radial-grid-${i}`} transform={"scale(30)"}>
              <circle
                fill={blue}
                fillOpacity={opacity}
                r={y}
                stroke={blue}
                strokeOpacity={0.2}
                strokeWidth={1}
              />
              <text
                dy={"-.33em"}
                fill={blue}
                fillOpacity={0.6}
                fontSize={8}
                textAnchor="middle"
                y={-y}
              >
                {tick}
              </text>
            </g>
          );
        })}
        <LineRadial
          angle={angle}
          curve={curveBasisOpen}
          data={appleStock}
          fill="none"
          radius={radius}
          stroke="url('#line-gradient')"
          strokeWidth={2}
          strokeOpacity={0.8}
          strokeLinecap="round"
          transform={"scale(100)"}
        />
        {[firstPoint, lastPoint].map((d, i) => {
          const cx = (xScale(dateAccessor(d)) * Math.PI) / 180;
          const cy = -yScale(closeAccessor(d));
          return (
            <circle
              //   cx={Math.random() * 100}
              //   cy={Math.random() * 100}
              cx={!isNaN(cx) ? cx : 0}
              cy={!isNaN(cy) ? cy : 0}
              fill={darkgreen}
              key={`line-cap-${i}`}
              r={10}
            />
          );
        })}
      </Group>
    </svg>
  );
};
