import { Group } from "@vx/group";
import { HeatmapCircle, HeatmapRect } from "@vx/heatmap";
import { Bin, genBins } from "@vx/mock-data";
import { scaleLinear } from "@vx/scale";
import React from "react";
import { clearLine } from "readline";
import { IMargin } from "../../interfaces";

const hot1 = "#77312f";
const hot2 = "#f33d15";
const cool1 = "#122549";
const cool2 = "#b4fbde";
const bg = "#28272c";

const data = genBins(16, 16);

interface IHeatmapBinDatum {
  bin: number;
  bins: number[];
}

interface IHeatmapCell {
  bin: Bin;
  color: string;
  column: number;
  count: number;
  cx: number;
  cy: number;
  datum: IHeatmapBinDatum;
  gap: number;
  height: number;
  opacity: number;
  r: number;
  radius: number;
  row: number;
  width: number;
  x: number;
  y: number;
}

type IHeatmapColumn = IHeatmapCell[];

// utils
const max = (dataBins: Bin[], value = (d: any) => d) =>
  Math.max(...dataBins.map(value));
const min = (values: number[], value = (d: any) => d) =>
  Math.min(...values.map(value));

// accessors
const bins = (d: any) => d.bins;
const count = (d: any) => d.count;

const colorMax = max(data, (d: any) => max(bins(d), count));
const bucketSizeMax = max(data, (d: any) => bins(d).length);

// scales
const xScale = scaleLinear({
  domain: [0, data.length],
});
const yScale = scaleLinear({
  domain: [0, bucketSizeMax],
});
const circleColorScale = scaleLinear({
  domain: [0, colorMax],
  range: [hot1, hot2],
});
const rectColorScale = scaleLinear({
  domain: [0, colorMax],
  range: [cool1, cool2],
});
const opacityScale = scaleLinear({
  domain: [0, colorMax],
  range: [0.1, 1],
});

interface IProps {
  height: number;
  margin: IMargin;
  separation: number;
  width: number;
}

const HeatmapsDemo = (props: IProps) => {
  const { height, margin, separation, width } = props;
  // bounds
  let size = width;
  if (size > margin.left + margin.right) {
    size = width - margin.left - margin.right - separation;
  }

  const xMax = size / 2;
  const yMax = height - margin.bottom - margin.top;

  const binWidth = xMax / data.length;
  const binHeight = yMax / bucketSizeMax;
  const radius = min([binWidth, binHeight]) / 2;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill={bg} />
      <Group top={margin.top} left={margin.left}>
        <HeatmapCircle
          data={data}
          xScale={xScale}
          yScale={yScale}
          colorScale={circleColorScale}
          opacityScale={opacityScale}
          radius={radius}
          gap={2}
        >
          {(heatmap: IHeatmapCell[][]) => {
            return heatmap.map((heatmapColumn: IHeatmapColumn) => {
              return heatmapColumn.map((cell: IHeatmapCell) => {
                return (
                  <circle
                    key={`heatmap-circle-${cell.row}-${cell.column}`}
                    className="vx-heatmap-circle"
                    cx={cell.cx}
                    cy={cell.cy}
                    r={cell.r > 0 ? cell.r : 0}
                    fill={cell.color}
                    fillOpacity={cell.opacity}
                    onClick={(event: React.MouseEvent) => {
                      const { row, column } = cell;
                      alert(JSON.stringify({ row, column, ...cell.bin }));
                    }}
                  />
                );
              });
            });
          }}
        </HeatmapCircle>
      </Group>
      <Group top={margin.top} left={xMax + margin.left + separation}>
        <HeatmapRect
          data={data}
          xScale={xScale}
          yScale={yScale}
          colorScale={rectColorScale}
          opacityScale={opacityScale}
          binWidth={binWidth}
          binHeight={binWidth}
          gap={2}
        >
          {(heatmap: IHeatmapCell[][]) => {
            return heatmap.map((heatmapColumn: IHeatmapColumn) => {
              return heatmapColumn.map((cell: IHeatmapCell) => {
                return (
                  <rect
                    key={`heatmap-rect-${cell.row}-${cell.column}`}
                    className="vx-heatmap-rect"
                    width={cell.width > 0 ? cell.width : 0}
                    height={cell.height > 0 ? cell.height : 0}
                    x={cell.x}
                    y={cell.y}
                    fill={cell.color}
                    fillOpacity={cell.opacity}
                    onClick={(event: React.MouseEvent) => {
                      const { row, column } = cell;
                      alert(JSON.stringify({ row, column, ...cell.bin }));
                    }}
                  />
                );
              });
            });
          }}
        </HeatmapRect>
      </Group>
    </svg>
  );
};

export default HeatmapsDemo;
