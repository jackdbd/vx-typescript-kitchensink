// Type definitions for @vx/geo 0.0.184
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/geo" {
  //   import { geoMercator } from "d3-geo";
  import { Geometry } from "geojson";
  import React, { SVGAttributes } from "react";

  interface IGraticuleProps extends SVGAttributes<SVGLineElement> {
    children?: React.ReactNode;
    graticule?: (g: Geometry) => string; // SVG <path> string
    lines?: any; // func
    outline?: any; // func
  }

  interface IProjectionProps {
    center?: [number, number];
    centroid?: [number, number];
    children: React.ReactNode;
    className?: string;
    clipAngle?: number;
    clipExtent?: any;
    data: any;
    fitExtent?: any;
    fitSize?: any;
    precision?: number;
    projection?: string;
    projectionFunc?: any;
    rotate?: any;
    scale?: number;
    translate?: any;
  }

  // TODO: what is the best way to define the props for Albers, Mercator, etc?

  interface IAlbersProps extends IProjectionProps {
    projection: "albers";
  }

  interface IAlbersUsaProps extends IProjectionProps {
    projection: "albersUsa";
  }

  interface IEqualEarthProps extends IProjectionProps {
    projection: "equalEarth";
  }

  type MercatorProps = Pick<
    IProjectionProps,
    Exclude<keyof IProjectionProps, "projection">
  >;

  type NaturalEarthProps = Pick<
    IProjectionProps,
    Exclude<keyof IProjectionProps, "projection">
  >;

  type OrthographicProps = Pick<
    IProjectionProps,
    Exclude<keyof IProjectionProps, "projection">
  >;

  const Graticule: React.ComponentType<IGraticuleProps>;
  const Projection: React.ComponentType<IProjectionProps>;

  const Albers: React.ComponentType<IAlbersProps>;
  const AlbersUsa: React.ComponentType<IAlbersUsaProps>;
  const EqualEarth: React.ComponentType<IEqualEarthProps>;
  const Mercator: React.ComponentType<MercatorProps>;
  const NaturalEarth: React.ComponentType<NaturalEarthProps>;
  const Orthographic: React.ComponentType<OrthographicProps>;
}
