// Type definitions for @vx/voronoi 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/voronoi" {
  import React, { SVGAttributes } from "react";
  import { Accessor } from "@vx/scale";

  type Datum = {
    id: string;
    x: number;
    y: number;
  };

  type Site = {
    data: Datum;
    index: number;
    [number]: number;
  };

  type Cell = {
    halfedges: number[];
    site: Site;
  };

  type Edge = {
    left: Site;
    right: Site;
    [number]: [number, number];
  };

  type Polygon = {
    data: Datum;
    [number]: [number, number];
  };

  interface VoronoiDiagram {
    cells: Cell[];
    edges: Edge[];
    find: (x: number, y: number, neighborRadius: number) => Site | undefined;
    polygons: () => Polygon[];
  }

  interface IOptions {
    height: number;
    width: number;
    x: Accessor;
    y: Accessor;
  }

  interface IProps extends SVGAttributes<SVGElement> {
    polygon: Polygon;
  }

  const voronoi: (options: IOptions) => (data: any) => VoronoiDiagram;

  const VoronoiPolygon: React.ComponentType<IProps>;
}
