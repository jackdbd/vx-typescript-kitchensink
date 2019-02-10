import { curveMonotoneX } from "@vx/curve";
import { localPoint } from "@vx/event";
import { GridColumns, GridRows } from "@vx/grid";
import { appleStock, AppleStockDatum } from "@vx/mock-data";
import { scaleLinear, scaleTime } from "@vx/scale";
import { AreaClosed, Bar, Line } from "@vx/shape";
import { Tooltip, withTooltip, WithTooltipProps } from "@vx/tooltip";
import { bisector } from "d3-array";
import { timeFormat } from "d3-time-format";
import React from "react";

import { IMargin } from "../../interfaces";

const stock = appleStock.slice(800);
const formatDate = timeFormat("%b %d, '%y");

const min = (arr: any, fn: any) => Math.min(...arr.map(fn));
const max = (arr: any, fn: any) => Math.max(...arr.map(fn));
const extent = (arr: any, fn: any) => [min(arr, fn), max(arr, fn)];
const xStock = (d: AppleStockDatum) => new Date(d.date);
const yStock = (d: AppleStockDatum) => d.close;
const bisectDate = bisector((d: AppleStockDatum) => new Date(d.date)).left;

interface IRuler {
  left: number;
  top: number;
}

interface IProps {
  height: number;
  margin: IMargin;
  onMouseLeave?: (event: MouseEvent) => void;
  onMouseMove?: (event: MouseEvent) => void;
  onTouchMove?: EventListener;
  onTouchStart?: EventListener;
  ruler?: IRuler;
  width: number;
}

class AreaDemo extends React.Component<IProps> {
  public render() {
    const { width, height, margin, ruler } = this.props;
    if (width < 10) {
      return null;
    }

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const xScale = scaleTime({
      domain: extent(stock, xStock),
      range: [0, xMax],
    });
    const yScale = scaleLinear({
      domain: [0, max(stock, yStock) + yMax / 3],
      nice: true,
      range: [yMax, 0],
    });

    return (
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#32deaa"
          rx={14}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <GridRows
          lineStyle={{ pointerEvents: "none" }}
          scale={yScale}
          width={xMax}
          strokeDasharray="2,2"
          stroke="rgba(255,255,255,0.3)"
        />
        <GridColumns
          lineStyle={{ pointerEvents: "none" }}
          scale={xScale}
          height={yMax}
          strokeDasharray="2,2"
          stroke="rgba(255,255,255,0.3)"
        />
        <AreaClosed
          curve={curveMonotoneX}
          data={stock}
          fill={"url(#gradient)"}
          stroke={"url(#gradient)"}
          strokeWidth={1}
          x={(d: AppleStockDatum) => xScale(xStock(d))}
          y={(d: AppleStockDatum) => yScale(yStock(d))}
          yScale={yScale}
        />
        <Bar
          x={0}
          y={0}
          width={width}
          height={height}
          fill="transparent"
          rx={14}
          data={stock}
          onMouseLeave={this.props.onMouseLeave}
          onMouseMove={this.props.onMouseMove}
          onTouchMove={this.props.onTouchMove}
          onTouchStart={this.props.onTouchStart}
        />
        {ruler && (
          <g>
            <Line
              from={{ x: ruler.left, y: 0 }}
              to={{ x: ruler.left, y: yMax }}
              stroke="rgba(92, 119, 235, 1.000)"
              strokeWidth={2}
              style={{ pointerEvents: "none" }}
              strokeDasharray="2,2"
            />
            <circle
              cx={ruler.left}
              cy={ruler.top + 1}
              r={4}
              fill="black"
              fillOpacity={0.1}
              stroke="black"
              strokeOpacity={0.1}
              strokeWidth={2}
              style={{ pointerEvents: "none" }}
            />
            <circle
              cx={ruler.left}
              cy={ruler.top}
              r={4}
              fill="rgba(92, 119, 235, 1.000)"
              stroke="white"
              strokeWidth={2}
              style={{ pointerEvents: "none" }}
            />
          </g>
        )}
      </svg>
    );
  }
}

type IAreaDemoWithTooltipProps = IProps & WithTooltipProps;

function handleTooltip(options: any) {
  const { data, event, xAccessor, xScale, yScale, showTooltip } = options;
  const { x } = localPoint(event);
  const x0 = xScale.invert(x);
  const index = bisectDate(data, x0, 1);
  const d0 = data[index - 1];
  const d1 = data[index];
  let d = d0;
  if (d1 && d1.date) {
    d = x0 - xAccessor(d0) > xAccessor(d1) - x0 ? d1 : d0;
  }
  showTooltip({
    tooltipData: d,
    tooltipLeft: x,
    tooltipTop: yScale(d.close),
  });
}

const AreaDemoWithTooltip = withTooltip((props: IAreaDemoWithTooltipProps) => {
  const { margin, height, showTooltip, tooltipData, width } = props;
  // at first tooltipLeft and tooltipTop are undefined
  const tooltipLeft = props.tooltipLeft || 0;
  const tooltipTop = props.tooltipTop || 0;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scaleTime({
    domain: extent(stock, xStock),
    range: [0, xMax],
  });
  const yScale = scaleLinear({
    domain: [0, max(stock, yStock) + yMax / 3],
    nice: true,
    range: [yMax, 0],
  });

  const onMouseMove = (event: MouseEvent) => {
    handleTooltip({
      data: stock,
      event,
      showTooltip,
      xAccessor: xStock,
      xScale,
      yScale,
    });
  };

  return (
    <div>
      <AreaDemo
        {...props}
        onMouseMove={onMouseMove}
        ruler={{ left: tooltipLeft, top: tooltipTop }}
      />
      {tooltipData && (
        <div>
          <Tooltip
            top={tooltipTop - 12}
            left={tooltipLeft + 12}
            style={{
              backgroundColor: "rgba(92, 119, 235, 1.000)",
              color: "white",
            }}
          >
            {`$${yStock(tooltipData)}`}
          </Tooltip>
          <Tooltip
            top={yMax - 14}
            left={tooltipLeft}
            style={{
              transform: "translateX(-50%)",
            }}
          >
            {formatDate(xStock(tooltipData))}
          </Tooltip>
        </div>
      )}
    </div>
  );
});

export { AreaDemo, AreaDemoWithTooltip };
