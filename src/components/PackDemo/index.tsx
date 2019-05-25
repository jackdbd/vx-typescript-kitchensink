import { Group } from "@vx/group";
import { Pack } from "@vx/hierarchy";
import { exoplanets as exoplanetsData, PlanetDatum } from "@vx/mock-data";
import { Accessor, scaleQuantize } from "@vx/scale";
import { extent } from "d3-array";
import { hierarchy, HierarchyNode } from "d3-hierarchy";
import React from "react";

import { IMargin } from "../../interfaces";

const radiusAccessor: Accessor<PlanetDatum, number> = (d) => +d.radius;

const exoplanets = exoplanetsData.filter((d: PlanetDatum) => +d.distance === 0);
const planets = exoplanetsData.filter((d: PlanetDatum) => +d.distance !== 0);

const childrenPlanets = [{ children: planets }].concat(exoplanets as any);
const pack = { children: childrenPlanets } as any;

const colorsDomain = extent(exoplanetsData.map(radiusAccessor));
const colorScale = scaleQuantize({
  domain: colorsDomain,
  range: ["#ffe108", "#ffc10e", "#fd6d6f", "#855af2", "#11d2f9", "#49f4e7"],
});

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

export class PackDemo extends React.Component<IProps> {
  public render() {
    const { height, margin, width } = this.props;
    const allData = hierarchy(pack);
    console.warn("pack hierarchy", pack, "all hierarchy data", allData);
    const data = hierarchy<PlanetDatum>(pack)
      .sum((d: PlanetDatum) => {
        // console.warn("d", d);
        return +d.radius * +d.radius;
      })
      .sort((a: HierarchyNode<PlanetDatum>, b: HierarchyNode<PlanetDatum>) => {
        // console.warn("a", a, "b", b);
        // const cond0 = !a.children - !b.children;
        const cond0 = 0;
        // const cond1 = isNaN(+a.data.distance) - isNaN(+b.data.distance);
        const cond1 = 0;
        const cond2 = +a.data.distance - +b.data.distance;
        return cond0 || cond1 || cond2;
      });

    return (
      <svg width={width} height={height}>
        <rect width={width} height={height} rx={14} fill="#ffffff" />
        <Pack root={data} size={[width * 2, height * 2]}>
          {(packNode: any) => {
            const circles = packNode.descendants().slice(2);
            return (
              <Group top={-height - margin.bottom} left={-width / 2}>
                {circles.map(renderCircle)}
              </Group>
            );
          }}
        </Pack>
      </svg>
    );
  }
}

function renderCircle(circle: any, i: number) {
  return (
    <circle
      cx={circle.x}
      cy={circle.y}
      fill={colorScale(circle.data.radius)}
      key={`cir-${i}`}
      r={circle.r}
    />
  );
}
