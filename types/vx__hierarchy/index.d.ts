// Type definitions for @vx/hierarchy 0.0.183
// Project: https://github.com/hshoff/vx
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "@vx/hierarchy" {
  import { TreemapLayout, HierarchyNode } from "d3-hierarchy";
  import React from "react";

  type Node = {
    children?: Node[];
    data: any;
    depth: number;
    height: 1;
    parent?: Node;
    value: number;
    x0: number;
    x1: number;
    y0: number;
    y1: number;
  };

  interface ISharedProps {
    children: React.ReactElement;
    className?: string;
    left?: number;
    nodeComponent?: any;
    root: object;
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
    node: any;
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
    nodeSize: number;
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
