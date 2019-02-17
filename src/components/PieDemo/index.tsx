import { GradientPinkBlue } from "@vx/gradient";
import { Group } from "@vx/group";
import {
  Browser,
  browserUsage,
  Letter,
  letterFrequency,
  LetterFrequencyDatum,
} from "@vx/mock-data";
import { Pie, PieInner } from "@vx/shape";
import React from "react";

import { Accessor } from "@vx/scale";
import { IMargin } from "../../interfaces";

const white = "#ffffff";
const black = "#000000";

const letters = letterFrequency.slice(0, 4);
const browserNames = Object.keys(browserUsage[0]).filter(
  (k: string) => k !== "date"
);

const browsers = browserNames.map((k: string) => {
  const d: any = browserUsage[0];
  const usageString = d[k] as string;
  const usageNumber = +usageString;
  const browser: Browser = {
    label: k,
    usage: usageNumber,
  };
  return browser;
});

const usageAccessor: Accessor<Browser, number> = (d) => d.usage;
const frequencyAccessor: Accessor<LetterFrequencyDatum, number> = (
  d: LetterFrequencyDatum
) => d.frequency;

interface IProps {
  height: number;
  margin: IMargin;
  width: number;
}

export class PieDemo extends React.Component<IProps> {
  public render() {
    const { height, margin, width } = this.props;

    const radius = Math.min(width, height) / 2;
    const centerY = height / 2;
    const centerX = width / 2;

    return (
      <svg width={width} height={height}>
        <GradientPinkBlue id="pie-gradients" />
        <rect
          rx={14}
          width={width}
          height={height}
          fill="url('#pie-gradients')"
        />
        <Group top={centerY - margin.top} left={centerX}>
          <Pie
            data={browsers}
            pieValue={usageAccessor}
            outerRadius={radius - 80}
            innerRadius={radius - 120}
            cornerRadius={3}
            padAngle={0}
          >
            {(pie: PieInner<Browser>) => {
              // console.warn("pie browser usage", pie);
              return pie.arcs.map((arc, i) => {
                const opacity = 1 / (i + 2);
                const [centroidX, centroidY] = pie.path.centroid(arc);
                const { startAngle, endAngle } = arc;
                const hasSpaceForLabel = endAngle - startAngle >= 0.1;
                // TODO: pie.path(arc) returns string | null
                const d = pie.path(arc) as string | undefined;
                return (
                  <g key={`browser-${arc.data.label}-${i}`}>
                    <path fill={white} fillOpacity={opacity} d={d} />
                    {hasSpaceForLabel && (
                      <text
                        dy=".33em"
                        fontSize={9}
                        fill={white}
                        textAnchor="middle"
                        x={centroidX}
                        y={centroidY}
                      >
                        {arc.data.label}
                      </text>
                    )}
                  </g>
                );
              });
            }}
          </Pie>
          <Pie
            data={letters}
            pieValue={frequencyAccessor}
            pieSortValues={(a, b) => -1}
            outerRadius={radius - 135}
          >
            {(pie: PieInner<Letter>) => {
              // console.warn("pie letters frequency", pie);
              return pie.arcs.map((arc, i) => {
                const opacity = 1 / (i + 2);
                const [centroidX, centroidY] = pie.path.centroid(arc);
                const d = pie.path(arc) as string | undefined;
                return (
                  <g key={`letters-${arc.data.label}-${i}`}>
                    <path d={d} fill={black} fillOpacity={opacity} />
                    <text
                      dy=".33em"
                      fill="white"
                      fontSize={9}
                      textAnchor="middle"
                      x={centroidX}
                      y={centroidY}
                    >
                      {arc.data.letter}
                    </text>
                  </g>
                );
              });
            }}
          </Pie>
        </Group>
      </svg>
    );
  }
}
