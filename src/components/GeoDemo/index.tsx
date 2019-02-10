import { Graticule, Mercator } from "@vx/geo";
import { scaleQuantize } from "@vx/scale";
import { extent } from "d3-array";
import { Feature, FeatureCollection, Geometry, Polygon } from "geojson";
import React from "react";
import * as topojson from "topojson-client";
// tslint:disable-next-line no-implicit-dependencies
import { Topology } from "topojson-specification";

import worldTopoJson from "../../static/world-topo.json";

const topology = (worldTopoJson as unknown) as Topology;

const featureOrFeatureCollection = topojson.feature(
  topology,
  topology.objects.units
);
const world = featureOrFeatureCollection as FeatureCollection;

const backgroundColor = "#f9f7e8";
const countryBordersColor = "#f9f7e8";

const points = world.features.map((f: Feature) => {
  const polygon = f.geometry as Polygon;
  return polygon.coordinates.length;
});
const domain = extent(points);

const colorScale = scaleQuantize({
  domain,
  range: [
    "#ffb01d",
    "#ffa020",
    "#ff9221",
    "#ff8424",
    "#ff7425",
    "#fc5e2f",
    "#f94b3a",
    "#f63a48",
  ],
});

interface IProps {
  height: number;
  width: number;
}

interface IMercator {
  features: Feature[];
  path: (g: Geometry) => string; // SVG <path> string
}

export class GeoDemo extends React.Component<IProps> {
  public render() {
    const { height, width } = this.props;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = (width / 630) * 100;

    return (
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={backgroundColor}
          rx={14}
        />
        <Mercator
          data={world.features}
          scale={scale}
          translate={[centerX, centerY + 50]}
        >
          {(mercator: IMercator) => {
            return (
              <g>
                <Graticule
                  graticule={(g: Geometry) => {
                    return mercator.path(g);
                  }}
                  stroke={"rgba(33,33,33,0.05)"}
                />
                {mercator.features.map((feature: any, i: number) => {
                  // console.warn("feature", feature);
                  const { feature: f } = feature;
                  return (
                    <path
                      key={`map-feature-${i}`}
                      d={mercator.path(f)}
                      fill={colorScale(f.geometry.coordinates.length)}
                      stroke={countryBordersColor}
                      strokeWidth={0.5}
                      onClick={(event: React.MouseEvent) => {
                        alert(`clicked: ${f.properties.name} (${f.id})`);
                      }}
                    />
                  );
                })}
              </g>
            );
          }}
        </Mercator>
      </svg>
    );
  }
}
