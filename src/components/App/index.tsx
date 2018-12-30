import React, { Component } from "react";
import logo from "./logo.svg";
import AxisDemo from "../AxisDemo";
import LinesDemo from "../LinesDemo";
import "./App.css";

class App extends Component {
  render() {
    const margin = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    };
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <AxisDemo width={400} height={300} margin={margin} />
          <LinesDemo width={400} height={300} margin={margin} />
        </header>
      </div>
    );
  }
}

export default App;
