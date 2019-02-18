// Type definitions for @vx/hierarchy 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/hierarchy" {
  import { TreemapLayout, HierarchyNode } from "d3-hierarchy";
  import React from "react";

  // dependencies
  /*
  "@vx/group": "0.0.183",
    "classnames": "^2.2.5",
    "d3-hierarchy": "^1.1.4",
    "prop-types": "^15.6.1"
  */

  interface INode {
    children?: INode[];
    data: any;
    depth: number;
    height: 1;
    parent?: INode;
    value: number;
    x?: number;
    x0?: number;
    x1?: number;
    y?: number;
    y0?: number;
    y1?: number;
  }

  interface ISharedProps {
    children: React.ReactElement;
    className?: string;
    left?: number;
    nodeComponent?: any;
    root: HierarchyNode<any>;
    size?: number[];
    top?: number;
  }

  interface IClusterProps extends ISharedProps {
    linkComponent?: any;
    nodeSize?: number[];
    separation?: any;
  }

  interface IHierarchyDefaultLinkProps {
    link: any;
  }

  interface IHierarchyDefaultNodeProps {
    node: INode;
  }

  interface IPackProps extends ISharedProps {
    padding?: number;
    radius?: any;
  }

  interface IPartitionProps extends ISharedProps {
    padding?: number;
    round: bool;
  }

  interface ITreeProps extends ISharedProps {
    linkComponent?: any;
    nodeComponent?: any;
    nodeSize?: number;
    separation?: number;
  }

  interface ITreemapProps extends ISharedProps {
    children: React.ReactNode<HierarchyNode<any>>;
    padding?: number;
    paddingBottom?: number;
    paddingInner?: number;
    paddingLeft?: number;
    paddingOuter?: number;
    paddingRight?: number;
    paddingTop?: number;
    round: boolean;
    tile?: any;
  }

  const Cluster: React.ComponentType<IClusterProps>;

  const HierarchyDefaultLink: React.ComponentType<IHierarchyDefaultLinkProps>;

  const HierarchyDefaultNode: React.ComponentType<IHierarchyDefaultNodeProps>;

  const Pack: React.ComponentType<IPackProps>;

  const Partition: React.ComponentType<IPartitionProps>;

  const Tree: React.ComponentType<ITreeProps>;

  const Treemap: React.ComponentType<ITreemapProps>;
}
