import { GradientPinkRed } from "@vx/gradient";
import { Group } from "@vx/group";
import { scaleBand } from "@vx/scale";
import { Polygon } from "@vx/shape";
import React from "react";

interface IProps {
  height: number;
  width: number;
}

interface IPolygon {
  fill: string;
  rotate: number;
  sides: number;
}

const polygons: IPolygon[] = [
  {
    fill: "rgb(174, 238, 248)",
    rotate: 90,
    sides: 3,
  },
  {
    fill: "rgb(229, 253, 61)",
    rotate: 45,
    sides: 4,
  },
  {
    fill: "rgb(229, 130, 255)",
    rotate: 0,
    sides: 6,
  },
  {
    fill: "url(#polygon-pink)",
    rotate: 0,
    sides: 8,
  },
];

const yScale = scaleBand({
  domain: polygons.map((p: IPolygon, i: number) => i),
  padding: 20,
});

export const PolygonsDemo = (props: IProps) => {
  const { height, width } = props;
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="#7f82e3" rx={14} />
      <GradientPinkRed id="polygon-pink" />
      {polygons.map((polygon, i) => (
        <Group key={`polygon-${i}`} top={yScale(i)} left={width / 2}>
          <Polygon
            sides={polygon.sides}
            size={30}
            fill={polygon.fill}
            rotate={polygon.rotate}
          />
        </Group>
      ))}
    </svg>
  );
};
