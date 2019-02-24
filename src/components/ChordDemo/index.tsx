import { Chord, Ribbon } from "@vx/chord";
import { LinearGradient } from "@vx/gradient";
import { Group } from "@vx/group";
import { scaleOrdinal } from "@vx/scale";
import { Arc } from "@vx/shape";
import React from "react";

const pink = "#ff2fab";
const orange = "#ffc62e";
const purple = "#dc04ff";
const purple2 = "#7324ff";
const red = "#d04376";
const green = "#52f091";
const blue = "#04a6ff";
const lime = "#00ddc6";
const bg = "#e4e3d8";

const matrix = [
  [11975, 5871, 8916, 2868],
  [1951, 10048, 2060, 6171],
  [8010, 16145, 8090, 8045],
  [1013, 990, 940, 6907],
];

function descending(a: number, b: number) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

const color = scaleOrdinal({
  domain: [1, 2, 3, 4],
  range: [
    "url(#gpinkorange)",
    "url(#gpurplered)",
    "url(#gpurplegreen)",
    "url(#gbluelime)",
  ],
});
interface IProps {
  height: number;
  width: number;
}

export class ChordDemo extends React.Component<IProps> {
  public render() {
    const centerSize = 20;
    const { height, width } = this.props;

    if (width <= 0) {
      return null;
    }

    const outerRadius = Math.min(width, height) * 0.5 - (centerSize + 10);
    const innerRadius = outerRadius - centerSize;

    return (
      <svg width={width} height={height}>
        <LinearGradient
          id="gpinkorange"
          from={pink}
          to={orange}
          vertical={false}
        />
        <LinearGradient
          id="gpurplered"
          from={purple}
          to={red}
          vertical={false}
        />
        <LinearGradient
          id="gpurplegreen"
          from={purple2}
          to={green}
          vertical={false}
        />
        <LinearGradient id="gbluelime" from={blue} to={lime} vertical={false} />
        <rect width={width} height={height} fill={bg} rx={14} />
        <Group top={height / 2} left={width / 2}>
          <Chord matrix={matrix} padAngle={0.05} sortSubgroups={descending}>
            {(props) => {
              const { chords } = props;
              return (
                <g>
                  {chords.groups.map((group, i) => {
                    return (
                      <Arc
                        data={group}
                        fill={color(i)}
                        key={`key-${i}`}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                      />
                    );
                  })}
                  {chords.map((chord, i) => {
                    return (
                      <Ribbon
                        chord={chord}
                        fill={color(i)}
                        fillOpacity={0.75}
                        key={`ribbon-${i}`}
                        radius={innerRadius}
                      />
                    );
                  })}
                </g>
              );
            }}
          </Chord>
        </Group>
      </svg>
    );
  }
}
