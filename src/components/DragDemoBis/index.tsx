import { curveBasis } from "@vx/curve";
import { Drag, IDragProps, IDragStartProps } from "@vx/drag";
// import { localPoint } from "@vx/event";
import { LinearGradient } from "@vx/gradient";
import { LinePath } from "@vx/shape";
import React from "react";

interface IDatum {
  x: number;
  y: number;
}

interface IProps {
  data?: IDatum[][];
  height: number;
  width: number;
}

interface IState {
  data: IDatum[][];
}

export class DragDemoBis extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: props.data || [],
    };
  }

  public render() {
    const { height, width } = this.props;
    return (
      <div className="DragII" style={{ touchAction: "none" }}>
        <svg height={height} width={width}>
          <LinearGradient id="stroke" from="#ff614e" to="#ffdc64" />
          <rect fill="#04002b" height={height} rx={14} width={width} />
          {this.state.data.map((d, i) => {
            return (
              <LinePath
                curve={curveBasis}
                data={d}
                fill={"transparent"}
                key={`line-${i}`}
                stroke="url(#stroke)"
                strokeWidth={3}
                x={(dd: IDatum) => dd.x}
                y={(dd: IDatum) => dd.y}
              />
            );
          })}
          <Drag
            height={height}
            onDragMove={(props) => {
              //   console.warn("dragMove", props);
              const { x, y, dx, dy } = props;
              // add the new point to the current line
              this.setState((state) => {
                const nextData = [...state.data];
                const point = [{ x: x + dx, y: y + dy }];
                const i = nextData.length - 1;
                nextData[i] = nextData[i].concat(point);
                return { data: nextData };
              });
            }}
            onDragStart={(props: IDragStartProps) => {
              const { x, y } = props;
              //   add the new line with the starting point
              this.setState((state) => {
                const newLine = [{ x, y }];
                return {
                  data: state.data.concat([newLine]),
                };
              });
            }}
            resetOnStart={true}
            width={width}
          >
            {(props) => {
              const {
                dx,
                dy,
                isDragging,
                dragStart,
                dragEnd,
                dragMove,
              } = props;

              const x = props.x ? props.x + dx - 4 : 0;
              const y = props.y ? props.y + dy - 4 : 0;
              const cx = props.x ? props.x : 0;
              const cy = props.y ? props.y : 0;

              return (
                <g>
                  {/* decorate the currently drawing line */}
                  {isDragging && (
                    <g>
                      <rect
                        fill="white"
                        height={8}
                        style={{ pointerEvents: "none" }}
                        width={8}
                        x={x}
                        y={y}
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        fill="transparent"
                        r={4}
                        stroke="white"
                        style={{ pointerEvents: "none" }}
                      />
                    </g>
                  )}
                  {/* create the drawing area */}
                  <rect
                    fill="transparent"
                    height={height}
                    onMouseDown={dragStart}
                    onMouseMove={dragMove}
                    onMouseUp={dragEnd}
                    onTouchEnd={dragEnd}
                    onTouchMove={dragMove}
                    onTouchStart={dragStart}
                    width={width}
                  />
                </g>
              );
            }}
          </Drag>
        </svg>
      </div>
    );
  }
}
