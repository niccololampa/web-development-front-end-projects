import React, { Component } from 'react';
import * as d3 from 'd3';
import logo from './logo.svg';
import './App.css';

// -----------------------------------------------------------------------------------------
// CREATE D3 BARCHART COMPONENT

class BarChart extends Component {
  componentDidMount() {
    this.makeChart();
  }

  makeChart() {}
}
// -----------------------------------------------------------------------------------------
// BODY OF THE WEB DISPLAY
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
