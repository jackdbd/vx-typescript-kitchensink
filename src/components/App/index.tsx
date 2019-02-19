import { appleStock } from "@vx/mock-data";
import { ParentProps, ParentSize } from "@vx/responsive";
import React from "react";
import styled, { keyframes } from "styled-components";

import { AreaDemo, AreaDemoWithTooltip } from "../AreaDemo";
import { AxisDemoResponsive } from "../AxisDemo";
import { BarGroupDemo } from "../BarGroupDemo";
import { BarGroupHorizontalDemo } from "../BarGroupHorizontalDemo";
import { BarStackDemo } from "../BarStackDemo";
import { BarStackHorizontalDemo } from "../BarStackHorizontalDemo";
import { CurveDemo } from "../CurveDemo";
import { DendrogramsDemo } from "../DendrogramsDemo";
import { DragDemo } from "../DragDemo";
import { GeoDemo } from "../GeoDemo";
import { GlyphDemo } from "../GlyphDemo";
import { GradientsDemo } from "../GradientsDemo";
import { HeatmapsDemo } from "../HeatmapsDemo";
import { LegendDemos } from "../LegendDemo";
import { LineRadialDemo } from "../LineRadialDemo";
import { LinesDemoResponsive } from "../LinesDemo";
import { PatternsDemo } from "../PatternsDemo";
import { PieDemo } from "../PieDemo";
import { PolygonsDemo } from "../PolygonsDemo";
import { TextDemo } from "../TextDemo";
import { ThresholdDemo } from "../ThresholdDemo";
import { TreemapDemo } from "../TreemapDemo";
import { TreesDemo } from "../TreesDemo";
import { VoronoiDemo } from "../VoronoiDemo";
import { ZoomDemo } from "../ZoomDemo";
import logo from "./logo.svg";

const Div = styled.div`
  text-align: center;
`;

const rotate = () => keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const RotatingLogo = styled.img`
  animation: ${rotate()} infinite 20s linear;
  height: 40vmin;
`;

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

/*
  CSS Grid auto-fit for responsiveness: https://gridbyexample.com/examples/example37/
  Common CSS breakpoints:
  https://stackoverflow.com/questions/6370690/media-queries-how-to-target-desktop-tablet-and-mobile#7354648
*/
interface IGridProps {
  gridGap: number;
}
const Grid = styled.div`
  background-color: #282c34;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  grid-gap: ${(props: IGridProps) => `${props.gridGap}` + "rem"};
`;

interface IMargin {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

interface IProps {
  height: number;
  margin: IMargin;
}

const stock = appleStock.slice(800);

class App extends React.Component<IProps> {
  public static defaultProps: Partial<IProps> = {
    height: 400,
    margin: {
      bottom: 30,
      left: 50,
      right: 10,
      top: 10,
    },
  };
  public render() {
    const { height, margin } = this.props;
    return (
      <Div>
        <Header>
          <h1>vx-kitchensink</h1>
          <RotatingLogo src={logo} alt="logo" />
        </Header>
        <Grid gridGap={2}>
          <AxisDemoResponsive margin={margin} />
          <LinesDemoResponsive margin={margin} />
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return <GradientsDemo height={height} width={width} />;
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return <PatternsDemo height={height} width={width} />;
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return <PolygonsDemo height={height} width={width} />;
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <HeatmapsDemo
                  height={height}
                  margin={margin}
                  separation={20}
                  width={width}
                />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <AreaDemo
                  height={height}
                  ruler={{ left: width / 2, top: height / 2 }}
                  margin={margin}
                  // onMouseMove={(event: Event) => console.warn("Move", event)}
                  width={width}
                />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <AreaDemoWithTooltip
                  height={height}
                  margin={margin}
                  width={width}
                />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <TextDemo
                  height={height}
                  text={"This is a test"}
                  width={width}
                />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return <LegendDemos height={height} width={width} />;
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <GlyphDemo height={height} margin={margin} width={width} />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return <GeoDemo height={height} width={width} />;
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <ThresholdDemo height={height} margin={margin} width={width} />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return <DragDemo height={height} margin={margin} width={width} />;
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <VoronoiDemo height={height} margin={margin} width={width} />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <CurveDemo height={height} margin={margin} width={width} />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return <ZoomDemo height={height} margin={margin} width={width} />;
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return <LineRadialDemo height={height} width={width} />;
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return <PieDemo height={height} margin={margin} width={width} />;
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <BarGroupDemo height={height} margin={margin} width={width} />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <BarGroupHorizontalDemo
                  height={height}
                  margin={margin}
                  width={width}
                />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <BarStackDemo height={height} margin={margin} width={width} />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <BarStackHorizontalDemo
                  height={height}
                  margin={margin}
                  width={width}
                />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <TreemapDemo height={height} margin={margin} width={width} />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <TreesDemo height={height} margin={margin} width={width} />
              );
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return (
                <DendrogramsDemo
                  height={height}
                  margin={margin}
                  width={width}
                />
              );
            }}
          </ParentSize>
        </Grid>
      </Div>
    );
  }
}

export default App;
