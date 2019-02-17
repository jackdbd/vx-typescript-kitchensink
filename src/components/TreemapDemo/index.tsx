import { Group } from "@vx/group";
import { Treemap } from "@vx/hierarchy";
import { shakespeare } from "@vx/mock-data";
import { scaleLinear } from "@vx/scale";
import {
  hierarchy,
  HierarchyNode,
  stratify,
  treemapSquarify,
} from "d3-hierarchy";
import React from "react";

import { IMargin } from "../../interfaces";

const blue = "#0373d9";
const green = "#00ff70";
const bg = "#3436b8";

const colorScale = scaleLinear({
  domain: [0, Math.max(...shakespeare.map((d) => d.size || 0))],
  range: [blue, green],
});

const data = stratify()
  .id((d: any) => d.id)
  .parentId((d: any) => d.parent)(shakespeare)
  .sum((d: any) => d.size || 0);

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

export class TreemapDemo extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.renderNode = this.renderNode.bind(this);
  }

  public render() {
    const { height, margin, width } = this.props;
    const yMax = height - margin.top - margin.bottom;
    const root = hierarchy(data).sort((a: any, b: any) => b.value - a.value);

    return (
      <svg width={width} height={height}>
        <rect width={width} height={height} rx={14} fill={bg} />
        <Treemap
          root={root}
          size={[width, yMax]}
          tile={treemapSquarify}
          round={true}
        >
          {(treemap: HierarchyNode<any>) => {
            // console.warn("TREEMAP LAYOUT", treemap);
            const nodes = treemap.descendants().reverse();
            return <Group top={margin.top}>{nodes.map(this.renderNode)}</Group>;
          }}
        </Treemap>
      </svg>
    );
  }

  private handleClick(event: React.MouseEvent) {
    const dataset = (event.target as any).dataset;
    const { depth, key, value } = dataset;
    alert(`Clicked: ${JSON.stringify({ depth, key, value })}`);
  }

  private renderNode(node: any, i: number) {
    // console.warn("NODE", node);
    const width = node.x1 - node.x0;
    const height = node.y1 - node.y0;
    const key = `treemap-node-${i}`;
    return (
      <Group key={key} top={node.y0} left={node.x0}>
        {node.depth === 1 && (
          <rect
            data-depth={node.depth}
            data-key={key}
            data-value={node.value}
            fill={"transparent"}
            height={height}
            onClick={this.handleClick}
            stroke={bg}
            strokeWidth={4}
            width={width}
          />
        )}
        {node.depth > 2 && (
          <rect
            data-depth={node.depth}
            data-key={key}
            data-value={node.value}
            fill={colorScale(node.value)}
            height={height}
            onClick={this.handleClick}
            stroke={bg}
            width={width}
          />
        )}
      </Group>
    );
  }
}
