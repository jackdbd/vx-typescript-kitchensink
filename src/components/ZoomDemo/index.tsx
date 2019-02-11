import { RectClipPath } from "@vx/clip-path";
import { localPoint } from "@vx/event";
import { genPhyllotaxis } from "@vx/mock-data";
import { scaleLinear } from "@vx/scale";
import { Zoom, ZoomState } from "@vx/zoom";
import { interpolateRainbow } from "d3-scale-chromatic";
import React from "react";

import { IMargin } from "../../interfaces";

const bg = "#0a0a0a";
const points = [...new Array(1000)];

const colorScale = scaleLinear({ range: [0, 1], domain: [0, 1000] });
const sizeScale = scaleLinear({ domain: [0, 600], range: [0.5, 8] });

const initialTransform = {
  scaleX: 1.27,
  scaleY: 1.27,
  skewX: 0,
  skewY: 0,
  translateX: -211.62,
  translateY: 162.59,
};

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

interface IState {
  showMiniMap: boolean;
}

export class ZoomDemo extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { showMiniMap: true };
    this.toggleMiniMap = this.toggleMiniMap.bind(this);
  }

  public render() {
    const { width, height } = this.props;
    const { showMiniMap } = this.state;

    const gen = genPhyllotaxis({ radius: 10, width, height });
    const phyllotaxis = points.map((d: any, i) => gen(i));

    return (
      <Zoom
        height={height}
        scaleXMax={4}
        scaleXMin={1 / 2}
        scaleYMax={4}
        scaleYMin={1 / 2}
        transformMatrix={initialTransform}
        width={width}
      >
        {(zoom: ZoomState) => {
          // console.warn("ZOOM", zoom);
          return (
            <div style={{ position: "relative" }}>
              <svg
                width={width}
                height={height}
                style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
              >
                <RectClipPath id="zoom-clip" width={width} height={height} />
                <rect width={width} height={height} rx={14} fill={bg} />
                <g transform={zoom.toString()}>
                  {phyllotaxis.map((point, i) => {
                    return (
                      <React.Fragment key={`dot-${i}`}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          fill={interpolateRainbow(colorScale(i))}
                          r={i > 500 ? sizeScale(1000 - i) : sizeScale(i)}
                        />
                      </React.Fragment>
                    );
                  })}
                </g>
                <rect
                  fill="transparent"
                  height={height}
                  onWheel={zoom.handleWheel}
                  onDoubleClick={(event: React.MouseEvent) => {
                    const point = localPoint(event);
                    zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
                  }}
                  onMouseDown={zoom.dragStart}
                  onMouseLeave={() => {
                    if (!zoom.isDragging) {
                      return;
                    }
                    zoom.dragEnd();
                  }}
                  onMouseMove={zoom.dragMove}
                  onMouseUp={zoom.dragEnd}
                  rx={14}
                  width={width}
                />
                {showMiniMap && (
                  <g
                    clipPath="url(#zoom-clip)"
                    transform={`
                      scale(0.25)
                      translate(${width * 4 - width - 60}, ${height * 4 -
                      height -
                      60})
                    `}
                  >
                    <rect width={width} height={height} fill="#1a1a1a" />
                    {phyllotaxis.map((d, i) => {
                      const { x, y } = d;
                      return (
                        <React.Fragment key={`dot-sm-${i}`}>
                          <circle
                            cx={x}
                            cy={y}
                            r={i > 500 ? sizeScale(1000 - i) : sizeScale(i)}
                            fill={interpolateRainbow(colorScale(i))}
                          />
                        </React.Fragment>
                      );
                    })}
                    <rect
                      width={width}
                      height={height}
                      fill="white"
                      fillOpacity={0.2}
                      stroke="white"
                      strokeWidth={4}
                      transform={zoom.toStringInvert()}
                    />
                  </g>
                )}
              </svg>
              <div className="controls">
                <button
                  className="btn btn-zoom"
                  onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
                >
                  +
                </button>
                <button
                  className="btn btn-zoom btn-bottom"
                  onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
                >
                  -
                </button>
                <button className="btn btn-lg" onClick={zoom.center}>
                  Center
                </button>
                <button className="btn btn-lg" onClick={zoom.reset}>
                  Reset
                </button>
                <button className="btn btn-lg" onClick={zoom.clear}>
                  Clear
                </button>
              </div>
              <div className="mini-map">
                <button className="btn btn-lg" onClick={this.toggleMiniMap}>
                  {showMiniMap ? "Hide" : "Show"} Mini Map
                </button>
              </div>
            </div>
          );
        }}
      </Zoom>
    );
  }

  private toggleMiniMap() {
    this.setState((prevState) => {
      return {
        showMiniMap: !prevState.showMiniMap,
      };
    });
  }
}
