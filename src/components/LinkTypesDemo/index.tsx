import { LinearGradient } from "@vx/gradient";
import { Group } from "@vx/group";
import { Tree } from "@vx/hierarchy";
import {
  LinkHorizontal,
  LinkHorizontalCurve,
  LinkHorizontalLine,
  LinkHorizontalStep,
  LinkRadial,
  LinkRadialCurve,
  LinkRadialLine,
  LinkRadialStep,
  LinkVertical,
  LinkVerticalCurve,
  LinkVerticalLine,
  LinkVerticalStep,
} from "@vx/shape";
import { hierarchy } from "d3-hierarchy";
import { pointRadial } from "d3-shape";
import React from "react";

import { IMargin } from "../../interfaces";

const data = {
  name: "T",
  // tslint:disable-next-line object-literal-sort-keys
  children: [
    {
      name: "A",
      // tslint:disable-next-line object-literal-sort-keys
      children: [
        { name: "A1" },
        { name: "A2" },
        { name: "A3" },
        {
          name: "C",
          // tslint:disable-next-line object-literal-sort-keys
          children: [
            {
              name: "C1",
            },
            {
              name: "D",
              // tslint:disable-next-line object-literal-sort-keys
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
            },
          ],
        },
      ],
    },
    { name: "Z" },
    {
      name: "B",
      // tslint:disable-next-line object-literal-sort-keys
      children: [{ name: "B1" }, { name: "B2" }, { name: "B3" }],
    },
  ],
};

type SupportedLayout = "cartesian" | "polar";
type SupportedOrientation = "horizontal" | "vertical";
type SupportedLinkType = "diagonal" | "curve" | "step" | "line";

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

interface IState {
  layout: SupportedLayout;
  linkType: any;
  orientation: SupportedOrientation;
  stepPercent: number;
}

interface IPoint {
  x: number;
  y: number;
}

export class LinkTypesDemo extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      layout: "cartesian",
      linkType: "diagonal",
      orientation: "horizontal",
      stepPercent: 0.25,
    };
    this.onSelectLayoutChange = this.onSelectLayoutChange.bind(this);
    this.onSelectOrientationChange = this.onSelectOrientationChange.bind(this);
    this.onSelectLinkTypeChange = this.onSelectLinkTypeChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.renderLink = this.renderLink.bind(this);
    this.renderDescendants = this.renderDescendants.bind(this);
  }
  public render() {
    const { height, margin, width } = this.props;
    const { layout, orientation, linkType, stepPercent } = this.state;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    let origin: IPoint;
    let sizeWidth: number;
    let sizeHeight: number;

    if (layout === "polar") {
      origin = {
        x: innerWidth / 2,
        y: innerHeight / 2,
      };
      sizeWidth = 2 * Math.PI;
      sizeHeight = Math.min(innerWidth, innerHeight) / 2;
    } else {
      origin = { x: 0, y: 0 };
      if (orientation === "vertical") {
        sizeWidth = innerWidth;
        sizeHeight = innerHeight;
      } else {
        sizeWidth = innerHeight;
        sizeHeight = innerWidth;
      }
    }

    return (
      <div>
        <div style={{ color: "rgba(38, 150, 136, 1.000)", fontSize: 10 }}>
          <label>layout:</label>
          <select
            onClick={stopEventPropagation}
            onChange={this.onSelectLayoutChange}
            value={layout}
          >
            <option value="cartesian">cartesian</option>
            <option value="polar">polar</option>
          </select>

          <label>orientation:</label>
          <select
            onClick={stopEventPropagation}
            onChange={this.onSelectOrientationChange}
            value={orientation}
            disabled={layout === "polar"}
          >
            <option value="vertical">vertical</option>
            <option value="horizontal">horizontal</option>
          </select>

          <label>link:</label>
          <select
            onClick={stopEventPropagation}
            onChange={this.onSelectLinkTypeChange}
            value={linkType}
          >
            <option value="diagonal">diagonal</option>
            <option value="step">step</option>
            <option value="curve">curve</option>
            <option value="line">line</option>
          </select>

          <label>step:</label>
          <input
            onClick={stopEventPropagation}
            type="range"
            min={0}
            max={1}
            step={0.1}
            onChange={this.onInputChange}
            value={stepPercent}
            disabled={linkType !== "step" || layout === "polar"}
          />
        </div>

        <svg width={width} height={height}>
          <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
          <rect width={width} height={height} rx={14} fill="#272b4d" />
          <Group top={margin.top} left={margin.left}>
            <Tree
              root={hierarchy(data, (d: any) =>
                d.isExpanded ? null : d.children
              )}
              size={[sizeWidth, sizeHeight]}
              separation={(a: any, b: any) =>
                (a.parent === b.parent ? 1 : 0.5) / a.depth
              }
            >
              {(dataNode: any) => {
                console.warn("dataNode", dataNode);
                return (
                  <Group top={origin.y} left={origin.x}>
                    {dataNode.links().map(this.renderLink)}
                    {dataNode.descendants().map(this.renderDescendants)}
                  </Group>
                );
              }}
            </Tree>
          </Group>
        </svg>
      </div>
    );
  }

  private renderLink(link: any, i: number) {
    const { layout, linkType, orientation, stepPercent } = this.state;
    let LinkComponent: any;

    if (layout === "polar") {
      if (linkType === "step") {
        LinkComponent = LinkRadialStep;
      } else if (linkType === "curve") {
        LinkComponent = LinkRadialCurve;
      } else if (linkType === "line") {
        LinkComponent = LinkRadialLine;
      } else {
        LinkComponent = LinkRadial;
      }
    } else {
      if (orientation === "vertical") {
        if (linkType === "step") {
          LinkComponent = LinkVerticalStep;
        } else if (linkType === "curve") {
          LinkComponent = LinkVerticalCurve;
        } else if (linkType === "line") {
          LinkComponent = LinkVerticalLine;
        } else {
          LinkComponent = LinkVertical;
        }
      } else {
        if (linkType === "step") {
          LinkComponent = LinkHorizontalStep;
        } else if (linkType === "curve") {
          LinkComponent = LinkHorizontalCurve;
        } else if (linkType === "line") {
          LinkComponent = LinkHorizontalLine;
        } else {
          LinkComponent = LinkHorizontal;
        }
      }
    }

    return (
      <LinkComponent
        data={link}
        percent={+stepPercent}
        stroke="#374469"
        strokeWidth="1"
        fill="none"
        key={i}
        onClick={(linkData: any) => (event: React.MouseEvent) => {
          console.warn("clicked", linkData, "event", event);
        }}
      />
    );
  }

  private renderDescendants(node: any, key: any) {
    const { layout, orientation } = this.state;
    const width = 40;
    const height = 20;

    let top;
    let left;
    if (layout === "polar") {
      const [radialX, radialY] = pointRadial(node.x, node.y);
      top = radialY;
      left = radialX;
    } else {
      if (orientation === "vertical") {
        top = node.y;
        left = node.x;
      } else {
        top = node.x;
        left = node.y;
      }
    }

    return (
      <Group top={top} left={left} key={key}>
        {node.depth === 0 && (
          <circle
            r={12}
            fill="url('#lg')"
            onClick={() => {
              node.data.isExpanded = !node.data.isExpanded;
              console.warn("node", node);
              this.forceUpdate();
            }}
          />
        )}
        {node.depth !== 0 && (
          <rect
            height={height}
            width={width}
            y={-height / 2}
            x={-width / 2}
            fill={"#272b4d"}
            stroke={node.data.children ? "#03c0dc" : "#26deb0"}
            strokeWidth={1}
            strokeDasharray={!node.data.children ? "2,2" : "0"}
            strokeOpacity={!node.data.children ? 0.6 : 1}
            rx={!node.data.children ? 10 : 0}
            onClick={() => {
              node.data.isExpanded = !node.data.isExpanded;
              // console.warn(node);
              this.forceUpdate();
            }}
          />
        )}
        <text
          dy={".33em"}
          fontSize={9}
          fontFamily="Arial"
          textAnchor={"middle"}
          style={{ pointerEvents: "none" }}
          fill={
            node.depth === 0 ? "#71248e" : node.children ? "white" : "#26deb0"
          }
        >
          {node.data.name}
        </text>
      </Group>
    );
  }

  private onSelectLayoutChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const layout = event.target.value as SupportedLayout;
    this.setState({ layout });
  }

  private onSelectOrientationChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const orientation = event.target.value as SupportedOrientation;
    this.setState({ orientation });
  }

  private onSelectLinkTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const linkType = event.target.value as SupportedLinkType;
    this.setState({ linkType });
  }

  // TODO: fix
  private onInputChange(event: any) {
    const stepPercent = parseInt(event.target.value, 10);
    this.setState({ stepPercent });
  }
}

function stopEventPropagation(event: React.MouseEvent) {
  event.stopPropagation();
}
