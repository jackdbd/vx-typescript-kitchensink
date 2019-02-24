// Type definitions for @vx/network 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/network" {
  import React from "react";

  interface INode {
    x: number;
    y: number;
  }

  interface ILink {
    source: INode;
    target: INode;
  }

  interface IGraph {
    links: ILink[];
    nodes: INode[];
  }

  interface IGraphProps {
    graph: IGraph;
    linkComponent?: React.ReactNode;
    nodeComponent?: React.ReactNode;
  }

  interface ILinksProps {
    className?: string;
    links: ILink[];
    linkComponent?: React.ReactNode;
  }

  interface INodesProps {
    className?: string;
    nodes: INode[];
    nodeComponent?: React.ReactNode;
  }

  const Graph: React.ComponentType<IGraphProps>;
  const Links: React.ComponentType<ILinksProps>;
  const Nodes: React.ComponentType<INodesProps>;
}
