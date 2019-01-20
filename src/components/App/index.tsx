import { ParentProps, ParentSize } from "@vx/responsive";
import React from "react";
import styled, { keyframes } from "styled-components";
import AxisDemo, { AxisDemoResponsive } from "../AxisDemo";
import LinesDemo, { LinesDemoResponsive } from "../LinesDemo";
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
  margin: IMargin;
}

class App extends React.Component<IProps> {
  public static defaultProps: Partial<IProps> = {
    margin: {
      bottom: 10,
      left: 10,
      right: 10,
      top: 10,
    },
  };
  public render() {
    const { margin } = this.props;
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
              return <AxisDemo width={width} height={400} margin={margin} />;
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return <LinesDemo width={width} height={400} margin={margin} />;
            }}
          </ParentSize>
          <ParentSize>
            {(props: ParentProps) => {
              const { width } = props;
              return <AxisDemo width={width} height={200} margin={margin} />;
            }}
          </ParentSize>
        </Grid>
      </Div>
    );
  }
}

export default App;
