import { LinearGradient } from "@vx/gradient";
import { Group } from "@vx/group";
import { Cluster, IHierarchyDefaultNodeProps } from "@vx/hierarchy";
import { LinkVertical } from "@vx/shape";
import { hierarchy, HierarchyNode } from "d3-hierarchy";
import React from "react";

import { IMargin } from "../../interfaces";

const citrus = "#ddf163";
const white = "#ffffff";
const green = "#79d259";
const aqua = "#37ac8c";
const merlinsbeard = "#f7f7f3";
const bg = "#306c90";

interface ITreeNode {
  children?: ITreeNode[];
  name: string;
}

const cluster: ITreeNode = {
  name: "T",
  // tslint:disable-next-line object-literal-sort-keys
  children: [
    {
      name: "A",
      // tslint:disable-next-line object-literal-sort-keys
      children: [
        { name: "A1" },
        { name: "A2" },
        {
          name: "C",
          // tslint:disable-next-line object-literal-sort-keys
          children: [
            {
              name: "C1",
            },
          ],
        },
      ],
    },
    {
      name: "B",
      // tslint:disable-next-line object-literal-sort-keys
      children: [{ name: "B1" }, { name: "B2" }, { name: "B3" }],
    },
    {
      name: "X",
      // tslint:disable-next-line object-literal-sort-keys
      children: [
        {
          name: "Z",
        },
      ],
    },
  ],
};

function Node(props: IHierarchyDefaultNodeProps) {
  const { node } = props;
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) {
    return <RootNode node={node} />;
  }

  return (
    <Group top={node.y} left={node.x}>
      {node.depth !== 0 && (
        <circle
          r={12}
          fill={bg}
          stroke={isParent ? white : citrus}
          onClick={() => {
            alert(`clicked: ${JSON.stringify(node.data.name)}`);
          }}
        />
      )}
      <text
        dy={".33em"}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={"middle"}
        style={{ pointerEvents: "none" }}
        fill={isParent ? white : citrus}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function RootNode(props: IHierarchyDefaultNodeProps) {
  const { node } = props;
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  return (
    <Group top={node.y} left={node.x}>
      <rect
        width={width}
        height={height}
        y={centerY}
        x={centerX}
        fill="url('#top')"
      />
      <text
        dy={".33em"}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={"middle"}
        style={{ pointerEvents: "none" }}
        fill={bg}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

export class DendrogramsDemo extends React.Component<IProps> {
  public render() {
    const { height, margin, width } = this.props;
    const data = hierarchy(cluster);
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    return (
      <svg width={width} height={height}>
        <LinearGradient id="top" from={green} to={aqua} />
        <rect width={width} height={height} rx={14} fill={bg} />
        <Cluster root={data} size={[xMax, yMax]}>
          {(clusterNode: HierarchyNode<ITreeNode>) => {
            return (
              <Group top={margin.top} left={margin.left}>
                {clusterNode.links().map(renderLink)}
                {clusterNode.descendants().map(renderDescendant)}
              </Group>
            );
          }}
        </Cluster>
      </svg>
    );
  }
}

function renderLink(link: any, i: number) {
  console.warn("link", link);
  return (
    <LinkVertical
      key={`cluster-link-${i}`}
      data={link}
      stroke={merlinsbeard}
      strokeWidth="1"
      strokeOpacity={0.2}
      fill="none"
    />
  );
}

function renderDescendant(node: any, i: number) {
  //   console.warn("node", node);
  return <Node key={`cluster-node-${i}`} node={node} />;
}
