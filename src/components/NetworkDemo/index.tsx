import { Graph } from "@vx/network";
import React from "react";

const nodes = [{ x: 50, y: 20 }, { x: 200, y: 300 }, { x: 300, y: 40 }];
const links = [
  { source: nodes[0], target: nodes[1] },
  { source: nodes[1], target: nodes[2] },
  { source: nodes[2], target: nodes[0] },
];

const graph = {
  links,
  nodes,
};

interface IProps {
  height: number;
  width: number;
}

export class NetworkDemo extends React.Component<IProps> {
  public render() {
    const { height, width } = this.props;

    if (width <= 0) {
      return null;
    }

    return (
      <svg width={width} height={height}>
        <rect width={width} height={height} rx={14} fill="#272b4d" />
        <Graph graph={graph} />
      </svg>
    );
  }
}
