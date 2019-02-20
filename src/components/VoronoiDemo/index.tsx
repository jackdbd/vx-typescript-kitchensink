import { getCoordsFromEvent } from "@vx/brush";
import { RectClipPath } from "@vx/clip-path";
import { GradientOrangeRed, GradientPinkRed } from "@vx/gradient";
import { Group } from "@vx/group";
import { Accessor, scaleLinear, ScaleLinear } from "@vx/scale";
import {
  Polygon,
  Site,
  voronoi,
  VoronoiDiagram,
  VoronoiPolygon,
} from "@vx/voronoi";
import React from "react";

import { IMargin } from "../../interfaces";

const neighborRadius = 75;

interface IDatum {
  id: string;
  x: number;
  y: number;
}

const xAccessor = (d: IDatum) => d.x;
const yAccessor = (d: IDatum) => d.y;

const extent = (arr: IDatum[], accessor: Accessor<IDatum, number>) => {
  return [Math.min(...arr.map(accessor)), Math.max(...arr.map(accessor))];
};

const data: IDatum[] = Array(200)
  .fill(null)
  .map(() => {
    const datum: IDatum = {
      id: Math.random()
        .toString(36)
        .slice(2),
      x: Math.random(),
      y: Math.random(),
    };
    return datum;
  });

const xDomain = extent(data, xAccessor) as [number, number];
const yDomain = extent(data, yAccessor) as [number, number];

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

interface IState {
  innerHeight: number;
  innerWidth: number;
  neighbors: Map<string, boolean>;
  selected: Site | null;
  // selectedNeighbors?: null;
  voronoiDiagram: VoronoiDiagram;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
}

export class VoronoiDemo extends React.PureComponent<IProps, IState> {
  public static getUpdatedState(props: IProps) {
    const { width, height, margin } = props;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear({
      domain: xDomain,
      range: [0, innerWidth],
    });

    const yScale = scaleLinear({
      domain: yDomain,
      range: [innerHeight, 0],
    });

    const voronoiOptions = {
      height: innerHeight,
      width: innerWidth,
      x: (d: IDatum) => xScale(d.x),
      y: (d: IDatum) => yScale(d.y),
    };
    const voronoiDiagram = voronoi(voronoiOptions)(data);

    return {
      innerHeight,
      innerWidth,
      neighbors: new Map(),
      selected: null,
      // selectedNeighbors: null,
      voronoiDiagram,
      xScale,
      yScale,
    };
  }
  private svg: any;

  constructor(props: IProps) {
    super(props);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = VoronoiDemo.getUpdatedState(props);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (
      nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height
    ) {
      this.setState(VoronoiDemo.getUpdatedState(nextProps));
    }
  }

  public render() {
    const { width, height, margin } = this.props;

    const {
      voronoiDiagram,
      innerWidth,
      innerHeight,
      xScale,
      yScale,
      selected,
      neighbors,
    } = this.state;

    const polygons = voronoiDiagram.polygons();

    return (
      <svg
        width={width}
        height={height}
        ref={(ref: any) => {
          this.svg = ref;
        }}
      >
        <GradientOrangeRed id="voronoi_orange_red" />
        <GradientPinkRed id="voronoi_pink_red" />
        <rect
          fill="url(#voronoi_pink_red)"
          height={innerHeight}
          rx={14}
          width={innerWidth}
        />
        <RectClipPath
          id="voronoi_clip"
          height={innerHeight}
          rx={14}
          width={innerWidth}
        />
        <Group
          clipPath="url(#voronoi_clip)"
          left={margin.left}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
          top={margin.top}
        >
          {polygons.map((polygon: Polygon) => {
            const hasNeighbors = neighbors.get(polygon.data.id);
            return (
              <VoronoiPolygon
                fill={
                  selected &&
                  (polygon.data.id === selected.data.id || hasNeighbors)
                    ? "url(#voronoi_orange_red)"
                    : "url(#voronoi_pink_red)"
                }
                fillOpacity={neighbors && hasNeighbors ? 0.4 : 1}
                key={`polygon-${polygon.data.id}`}
                polygon={polygon}
                stroke="#ffffff"
                strokeWidth={1}
              />
            );
          })}
          {data.map((d: IDatum) => (
            <circle
              cx={xScale(d.x)}
              cy={yScale(d.y)}
              fill="#ffffff"
              fillOpacity={0.5}
              key={`circle-${d.id}`}
              r={2}
            />
          ))}
        </Group>
      </svg>
    );
  }

  private handleMouseMove(event: React.MouseEvent) {
    const { voronoiDiagram } = this.state;
    const { x, y } = getCoordsFromEvent(this.svg, event);
    const closest = voronoiDiagram.find(x, y, neighborRadius);

    if (closest) {
      const neighbors = new Map();
      const cell = voronoiDiagram.cells[closest.index];
      cell.halfedges.forEach((index: number) => {
        const edge = voronoiDiagram.edges[index];
        const { left, right } = edge;
        if (left && left !== closest) {
          neighbors.set(left.data.id, true);
        } else if (right && right !== closest) {
          neighbors.set(right.data.id, true);
        }
      });
      this.setState({ selected: closest, neighbors });
    }
  }

  private handleMouseLeave(event: React.MouseEvent) {
    this.setState({ selected: null, neighbors: new Map() });
  }
}
