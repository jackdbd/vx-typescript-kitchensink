import { LinearGradient } from "@vx/gradient";
import { Group } from "@vx/group";
import { IHierarchyDefaultNodeProps, Tree } from "@vx/hierarchy";
import { LinkHorizontal } from "@vx/shape";
import { hierarchy, HierarchyNode } from "d3-hierarchy";
import React from "react";

import { IMargin } from "../../interfaces";

const peach = "#fd9b93";
const pink = "#fe6e9e";
const blue = "#03c0dc";
const green = "#26deb0";
const plum = "#71248e";
const lightpurple = "#374469";
const white = "#ffffff";
const bg = "#272b4d";

interface ITreeNode {
  children?: ITreeNode[];
  name: string;
}

const treeNode: ITreeNode = {
  children: [
    {
      children: [
        { name: "A1" },
        { name: "A2" },
        { name: "A3" },
        {
          children: [
            {
              name: "C1",
            },
            {
              children: [
                {
                  name: "D1",
                },
                {
                  name: "D2",
                },
                {
                  name: "D3",
                },
              ],
              name: "D",
            },
          ],
          name: "C",
        },
      ],
      name: "A",
    },
    { name: "Z" },
    {
      children: [{ name: "B1" }, { name: "B2" }, { name: "B3" }],
      name: "B",
    },
  ],
  name: "T",
};

function Node(props: IHierarchyDefaultNodeProps) {
  //   console.warn("Node props", props);
  const { node } = props;
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) {
    return <RootNode node={node} />;
  }
  if (isParent) {
    return <ParentNode node={node} />;
  }

  return (
    <Group top={node.x} left={node.y}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={bg}
        stroke={green}
        strokeWidth={1}
        strokeDasharray={"2,2"}
        strokeOpacity={0.6}
        rx={10}
        onClick={(event: React.MouseEvent) => {
          alert(`clicked: ${JSON.stringify(node.data.name)}, ${event}`);
        }}
      />
      <text
        dy={".33em"}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={"middle"}
        fill={green}
        style={{ pointerEvents: "none" }}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function RootNode(props: IHierarchyDefaultNodeProps) {
  console.warn("RootNode props", props);
  const { node } = props;
  return (
    <Group top={node.x} left={node.y}>
      <circle r={12} fill="url('#lg')" />
      <text
        dy={".33em"}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={"middle"}
        style={{ pointerEvents: "none" }}
        fill={plum}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function ParentNode(props: IHierarchyDefaultNodeProps) {
  console.warn("ParentNode props", props);
  const { node } = props;
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  return (
    <Group top={node.x} left={node.y}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={bg}
        stroke={blue}
        strokeWidth={1}
        onClick={(event: React.MouseEvent) => {
          alert(`clicked: ${JSON.stringify(node.data.name)}`);
          console.warn("clicked parent node", event);
        }}
      />
      <text
        dy={".33em"}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={"middle"}
        style={{ pointerEvents: "none" }}
        fill={white}
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

export class TreesDemo extends React.Component<IProps> {
  public render() {
    const { height, width, margin } = this.props;
    const data = hierarchy(treeNode);
    // console.warn("data", data);
    const yMax = height - margin.top - margin.bottom;
    const xMax = width - margin.left - margin.right;

    return (
      <svg width={width} height={height}>
        <LinearGradient id="lg" from={peach} to={pink} />
        <rect width={width} height={height} rx={14} fill={bg} />
        <Tree root={data} size={[yMax, xMax]}>
          {(tree: HierarchyNode<ITreeNode>) => {
            // console.warn("tree", tree.links());
            return (
              <Group top={margin.top} left={margin.left}>
                {tree.links().map(renderLink)}
                {tree.descendants().map(renderDescendant)}
              </Group>
            );
          }}
        </Tree>
      </svg>
    );
  }
}

function renderLink(link: any, i: number) {
  console.warn("link", link);
  return (
    <LinkHorizontal
      fill="none"
      data={link}
      key={`link-${i}`}
      stroke={lightpurple}
      strokeWidth="1"
    />
  );
}

function renderDescendant(node: any, i: number) {
  //   console.warn("node", node);
  return <Node key={`node-${i}`} node={node} />;
}
