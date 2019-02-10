import { Drag, IDragProps, IItem, raise } from "@vx/drag";
import { LinearGradient } from "@vx/gradient";
import { scaleOrdinal, ScaleOrdinal } from "@vx/scale";
import React, { ReactText } from "react";

import { IMargin } from "../../interfaces";

interface IGenItemsOptions {
  height: number;
  width: number;
}

interface IGenCirclesOptions {
  height: number;
  num: number;
  width: number;
}

const colors = [
  "#025aac",
  "#02cff9",
  "#02efff",
  "#03aeed",
  "#0384d7",
  "#edfdff",
  "#ab31ff",
  "#5924d7",
  "#d145ff",
  "#1a02b1",
  "#e582ff",
  "#ff00d4",
  "#270eff",
  "#827ce2",
];

function genCircles(options: IGenCirclesOptions) {
  const { num, width, height } = options;
  const circles = Array(num)
    .fill(1)
    .map((d: number, i: number) => {
      const radius = 25 - Math.random() * 20;
      const item: IItem = {
        id: i,
        radius,
        x: Math.round(Math.random() * (width - radius * 2) + radius),
        y: Math.round(Math.random() * (height - radius * 2) + radius),
      };
      return item;
    });
  return circles;
}

const genItems = (options: IGenItemsOptions) => {
  const { width, height } = options;
  const genCirclesOptions = {
    height,
    num: width < 360 ? 40 : 185,
    width,
  };
  const items = genCircles(genCirclesOptions);
  return items;
};

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

interface IState {
  items: IItem[];
}

export class DragDemo extends React.Component<IProps, IState> {
  private colorScale: ScaleOrdinal<ReactText, string>;

  constructor(props: IProps) {
    super(props);
    const genItemsOptions = { height: props.height, width: props.width };
    this.state = {
      items: genItems(genItemsOptions),
    };
    this.colorScale = scaleOrdinal({
      domain: this.state.items.map((d: IItem) => d.id),
      range: colors,
    });
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.width !== this.props.width) {
      const genItemsOptions = {
        height: nextProps.height,
        width: nextProps.width,
      };
      this.setState(() => {
        return {
          items: genItems(genItemsOptions),
        };
      });
    }
  }

  public render() {
    const { width, height } = this.props;
    return (
      <div className="Drag" style={{ touchAction: "none" }}>
        <svg width={width} height={height}>
          <LinearGradient id="stroke" from="#ff00a5" to="#ffc500" />
          <rect fill="#c4c3cb" width={width} height={height} rx={14} />
          {this.state.items.map((d: IItem, i: number) => (
            <Drag
              key={`${d.id}`}
              height={height}
              width={width}
              onDragStart={() => {
                // svg follows the painter model
                // so we need to move the data item
                // to end of the array for it to be drawn
                // "on top of" the other data items
                this.setState(state => {
                  return {
                    items: raise(state.items, i),
                  };
                });
              }}
            >
              {(props: IDragProps) => {
                const {
                  dragStart,
                  dragEnd,
                  dragMove,
                  isDragging,
                  dx,
                  dy,
                } = props;
                return (
                  <circle
                    cx={d.x}
                    cy={d.y}
                    fill={isDragging ? "url(#stroke)" : this.colorScale(d.id)}
                    fillOpacity={0.9}
                    key={`dot-${d.id}`}
                    onMouseDown={dragStart}
                    onMouseMove={dragMove}
                    onMouseUp={dragEnd}
                    onTouchEnd={dragEnd}
                    onTouchMove={dragMove}
                    onTouchStart={dragStart}
                    r={isDragging ? d.radius + 4 : d.radius}
                    stroke={isDragging ? "white" : "transparent"}
                    strokeWidth={2}
                    transform={`translate(${dx}, ${dy})`}
                  />
                );
              }}
            </Drag>
          ))}
        </svg>
      </div>
    );
  }
}
