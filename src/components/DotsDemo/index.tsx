import { GradientPinkRed } from "@vx/gradient";
import { Group } from "@vx/group";
import { genRandomNormalPoints, Point } from "@vx/mock-data";
import { Accessor, scaleLinear } from "@vx/scale";
import { Circle } from "@vx/shape";
import { IWithTooltipProps, Tooltip, withTooltip } from "@vx/tooltip";
import React from "react";

import { localPoint } from "@vx/event";
import { IMargin } from "../../interfaces";

const points = genRandomNormalPoints(600).filter((_, i) => {
  return i < 100;
});

const xAccessor: Accessor<Point, number> = (d) => d[0];
const yAccessor: Accessor<Point, number> = (d) => d[1];

interface IProps {
  height: number;
  margin: IMargin;
  width: number;

  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
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

// let tooltipTimeout: number;

// TODO: improve types
function handleTooltip(options: any) {
  const { data, event, xScale, yScale, showTooltip } = options;
  const { x } = localPoint(event);
  const x0 = xScale.invert(x);
  // const index = bisectDate(data, x0, 1);
  // const d0 = data[index - 1];
  // const d1 = data[index];
  // let d = d0;
  // if (d1 && d1.date) {
  //   d = x0 - xAccessor(d0) > xAccessor(d1) - x0 ? d1 : d0;
  // }
  console.warn("x0", x0, "x", x, "data", data, "options", options);
  // showTooltip({
  //   tooltipData: d,
  //   tooltipLeft: x,
  //   tooltipTop: yScale(d.close),
  // });
}

export const DotsDemoWithTooltip = withTooltip(
  (props: IDotsDemoWithTooltipProps) => {
    // const { margin, height, showTooltip, tooltipData, width } = props;
    // at first tooltipLeft and tooltipTop are undefined
    const tooltipLeft = props.tooltipLeft || 0;
    const tooltipTop = props.tooltipTop || 0;

    console.warn("props", props);

    // const xMax = width - margin.left - margin.right;
    // const yMax = height - margin.top - margin.bottom;

    // const xScale = scaleLinear({
    //   clamp: true,
    //   domain: [1.3, 2.2],
    //   range: [0, xMax],
    // });

    // const yScale = scaleLinear({
    //   clamp: true,
    //   domain: [0.75, 1.6],
    //   range: [yMax, 0],
    // });

    const onMouseEnter = (event: MouseEvent) => {
      console.warn("mouse ENTER", event);
      // handleTooltip({
      //   data: stock,
      //   event,
      //   showTooltip,
      //   xAccessor: xStock,
      //   xScale,
      //   yScale,
      // });
    };

    const onMouseLeave = (event: MouseEvent) => {
      console.warn("mouse LEAVE", event);
    };

    const tooltipOpen = true;

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
            style={{
              backgroundColor: "rgba(92, 119, 235, 1.000)",
              color: "white",
            }}
          >
            {`TODO: show tooltip`}
          </Tooltip>
        )}
      </div>
    );
  }
);
