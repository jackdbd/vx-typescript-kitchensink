import { ParentProps, ParentSize } from "@vx/responsive";
import React from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import AxisDemo, { AxisDemoResponsive } from "../AxisDemo";
import LinesDemo, { LinesDemoResponsive } from "../LinesDemo";
// import "./App.css";

const Div = styled.div`
  text-align: center;
`;

/*
  CSS Grid auto-fit for responsiveness: https://gridbyexample.com/examples/example37/
  Common CSS breakpoints: https://stackoverflow.com/questions/6370690/media-queries-how-to-target-desktop-tablet-and-mobile#7354648
*/
interface GridProps {
  gridGap: number;
}
const Grid = styled.div`
  background-color: #282c34;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  grid-gap: ${(props: GridProps) => `${props.gridGap}` + "rem"};
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
  render() {
    const { margin } = this.props;
    return (
      <Div>
        <h1>vx-kitchensink</h1>
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
        <footer className="App-header">
          <h1>vx-kitchensink</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </footer>
      </Div>
    );
  }
}

export default App;
