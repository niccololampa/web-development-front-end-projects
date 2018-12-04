// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SoundBoard from './SoundBoard';
import MiniDisplay from './MiniDisplay';
import PowerButton from './PowerButton';
import VolumeController from './VolumeController';
import './LaunchPad.css';
// import ReactDOM from 'react-dom';

// MainDisplay Component
class LaunchPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'READY',
      power: true,
      volume: 100
    };
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handlePower = this.handlePower.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
  }

  handleDisplay(instrument) {
    this.setState({ display: instrument });
  }

  handlePower() {
    this.setState(prevState => ({
      power: !prevState.power,
      display: prevState.power ? 'POWER OFF' : 'READY'
    }));
  }

  handleVolume(e) {
    this.setState({ volume: e.target.value });
  }

  render() {
    const { display, power, volume } = this.state;
    const { buttons } = this.props;
    return (
      <div>
        <div id="drum-machine">
          <MiniDisplay display={display} classString="status-display" />
          <PowerButton power={power} onClick={this.handlePower} />
          <SoundBoard
            buttons={buttons}
            display={this.handleDisplay}
            power={power}
            volume={volume}
          />
          <MiniDisplay display={volume} classString="volume-display" />
          <VolumeController volume={volume} onChange={this.handleVolume} />
        </div>
      </div>
    );
  }
}
export default LaunchPad;
