import { GlyphDiamond, GlyphStar, GlyphTriangle, GlyphWye } from "@vx/glyph";
import {
  Legend,
  LegendItem,
  LegendLabel,
  LegendLinear,
  LegendOrdinal,
  LegendQuantile,
  LegendSize,
  LegendThreshold,
} from "@vx/legend";
import {
  scaleLinear,
  scaleOrdinal,
  scaleQuantize,
  scaleThreshold,
} from "@vx/scale";
import { format } from "d3-format";
import React from "react";

const oneDecimalFormat = format(".1f");

const sizeScale = scaleLinear({
  domain: [0, 10],
  range: [10, 30],
});

const sizeColorScale = scaleLinear({
  domain: [0, 10],
  range: ["#75fcfc", "#3236b8"],
});

const quantileScale = scaleQuantize({
  domain: [0, 0.15],
  range: ["#eb4d70", "#f19938", "#6ce18b", "#78f6ef", "#9096f8"],
});

const linearScale = scaleLinear({
  domain: [0, 10],
  range: ["#ed4fbb", "#e9a039"],
});

const thresholdScale = scaleThreshold({
  domain: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1],
  range: ["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"],
});

const ordinalColorScale = scaleOrdinal({
  domain: ["a", "b", "c", "d"],
  range: ["#66d981", "#71f5ef", "#4899f1", "#7d81f6"],
});

const ordinalColor2Scale = scaleOrdinal({
  domain: ["a", "b", "c", "d"],
  range: ["#fae856", "#f29b38", "#e64357", "#8386f7"],
});

const shapeScale = scaleOrdinal({
  domain: ["a", "b", "c", "d", "e"],
  range: [
    <GlyphStar size={50} top={50 / 6} left={50 / 6} fill="#dd59b8" />,
    <GlyphWye size={50} top={50 / 6} left={50 / 6} fill="#de6a9a" />,
    <GlyphTriangle size={50} top={50 / 6} left={50 / 6} fill="#de7d7b" />,
    <GlyphDiamond size={50} top={50 / 6} left={50 / 6} fill="#df905f" />,
    (props: any) => (
      <text fontSize="12" dy="1em" dx=".33em" fill="#e0a346">
        $
      </text>
    ),
  ],
});

interface IProps {
  height: number;
  width: number;
}

export const LegendDemos = (props: IProps) => {
  return (
    <div className="chart">
      <LegendDemo title="Size">
        <LegendSize scale={sizeScale}>
          {(labels: any) => {
            return labels.map((label: any) => {
              const size = sizeScale(label.datum);
              const color = sizeColorScale(label.datum);
              return (
                <LegendItem
                  key={`legend-${label.text}-${label.index}`}
                  onClick={(event: React.MouseEvent) => {
                    alert(`clicked: ${JSON.stringify(label)}`);
                  }}
                >
                  <svg width={size} height={size} style={{ margin: "5px 0" }}>
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      fill={color}
                      r={size / 2}
                    />
                  </svg>
                  <LegendLabel align={"left"} margin={"0 4px"}>
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            });
          }}
        </LegendSize>
      </LegendDemo>
      <LegendDemo title="Quantile">
        <LegendQuantile scale={quantileScale}>
          {(labels: any) => {
            return labels.map((label: any, i: number) => {
              const size = 15;
              return (
                <LegendItem
                  key={`legend-${i}`}
                  onClick={(event: React.MouseEvent) => {
                    alert(`clicked: ${JSON.stringify(label)}`);
                  }}
                >
                  <svg width={size} height={size} style={{ margin: "2px 0" }}>
                    <circle
                      fill={label.value}
                      r={size / 2}
                      cx={size / 2}
                      cy={size / 2}
                    />
                  </svg>
                  <LegendLabel align={"left"} margin={"0 4px"}>
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            });
          }}
        </LegendQuantile>
        ;
      </LegendDemo>
      <LegendDemo title="Linear">
        <LegendLinear
          scale={linearScale}
          labelFormat={(d: any, i: number) => {
            if (i % 2 === 0) {
              return oneDecimalFormat(d);
            }
            return "";
          }}
        >
          {(labels: any) => {
            return labels.map((label: any, i: number) => {
              const size = 15;
              return (
                <LegendItem
                  key={`legend-quantile-${i}`}
                  onClick={(event: React.MouseEvent) => {
                    alert(`clicked: ${JSON.stringify(label)}`);
                  }}
                >
                  <svg width={size} height={size} style={{ margin: "2px 0" }}>
                    <circle
                      fill={label.value}
                      r={size / 2}
                      cx={size / 2}
                      cy={size / 2}
                    />
                  </svg>
                  <LegendLabel align={"left"} margin={"0 4px"}>
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            });
          }}
        </LegendLinear>
      </LegendDemo>
      <LegendDemo title="Threshold">
        <LegendThreshold scale={thresholdScale}>
          {(labels: any) => {
            return labels.reverse().map((label: any, i: number) => {
              const size = 15;
              return (
                <LegendItem
                  key={`legend-quantile-${i}`}
                  margin="1px 0"
                  onClick={(event: React.MouseEvent) => {
                    alert(`clicked: ${JSON.stringify(label)}`);
                  }}
                >
                  <svg width={size} height={size}>
                    <rect fill={label.value} width={size} height={size} />
                  </svg>
                  <LegendLabel align={"left"} margin={"2px 0 0 10px"}>
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              );
            });
          }}
        </LegendThreshold>
      </LegendDemo>
      <LegendDemo title="Ordinal">
        <LegendOrdinal
          scale={ordinalColorScale}
          labelFormat={(label: any) => `${label.toUpperCase()}`}
        >
          {(labels: any) => {
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                {labels.map((label: any, i: number) => {
                  const size = 15;
                  return (
                    <LegendItem
                      key={`legend-quantile-${i}`}
                      margin={"0 5px"}
                      onClick={(event: React.MouseEvent) => {
                        alert(`clicked: ${JSON.stringify(label)}`);
                      }}
                    >
                      <svg width={size} height={size}>
                        <rect fill={label.value} width={size} height={size} />
                      </svg>
                      <LegendLabel align={"left"} margin={"0 0 0 4px"}>
                        {label.text}
                      </LegendLabel>
                    </LegendItem>
                  );
                })}
              </div>
            );
          }}
        </LegendOrdinal>
      </LegendDemo>
      <LegendDemo title="Custom Legend">
        <Legend scale={shapeScale}>
          {(labels: any) => {
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                {labels.map((label: any, i: number) => {
                  const size = 15;
                  const color = ordinalColor2Scale(label.datum);
                  const shape = shapeScale(label.datum);
                  const shapeProps = { fill: color };
                  const isValidElement = React.isValidElement(shape);
                  return (
                    <LegendItem
                      key={`legend-quantile-${i}`}
                      margin={"0 4px 0 0"}
                      flexDirection="column"
                      onClick={(event: React.MouseEvent) => {
                        const { datum, index } = label;
                        alert(
                          `clicked: ${JSON.stringify({ datum, color, index })}`
                        );
                      }}
                    >
                      <svg
                        width={size}
                        height={size}
                        style={{ margin: "0 0 8px 0" }}
                      >
                        {!isValidElement &&
                          React.createElement(shape, shapeProps)}
                        {isValidElement && React.cloneElement(shape)}
                      </svg>
                      <LegendLabel align={"left"} margin={0}>
                        {label.text}
                      </LegendLabel>
                    </LegendItem>
                  );
                })}
              </div>
            );
          }}
        </Legend>
      </LegendDemo>
      ;
    </div>
  );
};

interface ILegendDemoProps {
  children: any;
  title: string;
}

function LegendDemo(props: ILegendDemoProps) {
  const { children, title } = props;
  return (
    <div className="legend">
      <div className="title">{title}</div>
      {children}
    </div>
  );
}
