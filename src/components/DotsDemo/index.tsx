import { localPoint } from "@vx/event";
import { GradientPinkRed } from "@vx/gradient";
import { Group } from "@vx/group";
import { genRandomNormalPoints, Point } from "@vx/mock-data";
import { Accessor, scaleLinear } from "@vx/scale";
import { Circle } from "@vx/shape";
import { IWithTooltipProps, Tooltip, withTooltip } from "@vx/tooltip";
import React from "react";
import styled from "styled-components";

import { IMargin } from "../../interfaces";

const Div = styled.div`
  background-color: white;
  border: 1px solid black;
  color: black;
  font-size: 1rem;
  height: 2em;
  margin: 0;
  padding: 0;
`;

const points = genRandomNormalPoints(600).filter((_, i) => {
  return i < 500;
});

const xAccessor: Accessor<Point, number> = (d) => d[0];
const yAccessor: Accessor<Point, number> = (d) => d[1];

interface IProps {
  height: number;
  margin: IMargin;
  width: number;

  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
}

export class DotsDemo extends React.Component<IProps> {
  public render() {
    const { height, margin, onMouseEnter, onMouseLeave, width } = this.props;
    // const xMax = width;
    // const yMax = height - 80;
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const xScale = scaleLinear({
      clamp: true,
      domain: [1.3, 2.2],
      range: [0, xMax],
    });

    const yScale = scaleLinear({
      clamp: true,
      domain: [0.75, 1.6],
      range: [yMax, 0],
    });

    return (
      <svg width={width} height={height}>
        <GradientPinkRed id="pink" />
        <rect width={width} height={height} rx={14} fill={"url(#pink)"} />
        <Group>
          {points.map((point, i) => {
            const cx = xScale(xAccessor(point));
            const cy = yScale(yAccessor(point));
            const r = i % 3 === 0 ? 2 : 2.765;
            return (
              <Circle
                className="dot"
                cx={cx}
                cy={cy}
                r={r}
                fill="#f6c431"
                // key={`point-${point.x}-${i}`}
                key={`point-${i}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            );
          })}
        </Group>
      </svg>
    );
  }
}

type IDotsDemoWithTooltipProps = IProps & IWithTooltipProps;

let tooltipTimeout: any;
const delay = 500;

export const DotsDemoWithTooltip = withTooltip(
  (props: IDotsDemoWithTooltipProps) => {
    const { hideTooltip, showTooltip, tooltipData, tooltipOpen } = props;

    // at first tooltipLeft and tooltipTop are undefined
    const tooltipLeft = props.tooltipLeft || 0;
    const tooltipTop = props.tooltipTop || 0;

    const onMouseEnter = (event: React.MouseEvent) => {
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
      }
      const { x, y } = localPoint(event);
      showTooltip({
        tooltipData: `x: ${x}; y: ${y}`,
        tooltipLeft: x,
        tooltipTop: y,
      });
    };

    const onMouseLeave = (event: React.MouseEvent) => {
      tooltipTimeout = setTimeout(() => {
        hideTooltip();
      }, delay);
    };

    return (
      <div>
        <DotsDemo
          {...props}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop - 12}
            left={tooltipLeft + 12}
            style={{ padding: 0 }}
          >
            <Div>{tooltipData}</Div>
          </Tooltip>
        )}
      </div>
    );
  }
);
