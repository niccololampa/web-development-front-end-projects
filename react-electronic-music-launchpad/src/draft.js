// import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';

// SoundPads Component
function SoundPads(props) {
  const { keyboardKey, sound, onClick } = props;

  return (
    <button type="button" className="drum-pad" onClick={onClick}>
      {keyboardKey}
      <audio className="clip" id={keyboardKey} src={sound} />
    </button>
  );
}

// SoundBoard Component  (Collection of Buttons)

// MainDisplay Component
class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        ['q', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'],
        ['w', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'],
        ['e', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'],
        ['a', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'],
        ['s', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'],
        ['d', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'],
        ['z', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'],
        ['x', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'],
        ['c', 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3']
      ]
    };
    this.handleSoundPadClick = this.handleSoundPadClick.bind(this);
    this.renderSoundBoard = this.renderSoundBoard.bind(this);
  }

  componentDidMount() {
    /* event listener for keyboard will get 
    the event.key value then implement the same fucntion for soundpad click */
    document.addEventListener('keydown', event => {
      this.handleSoundPadClick(event.key);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', event => {
      this.handleSoundPadClick(event.key);
    });
  }

  // Handle SoundPadMouseClick (also handles keyboard down events)
  handleSoundPadClick(key) {
    document.getElementById(key).play();
    //   new Audio();
  }

  // button renderer so every button component is unique
  renderSoundPads(key, sound) {
    return (
      <SoundPads
        keyboardKey={key}
        sound={sound}
        onClick={() => this.handleSoundPadClick(key)}
      />
    );
  }

  // buttons / Soundpad are arranged in the soundPad
  renderSoundBoard() {
    // create rows of buttons.
    // this will place 3 buttons per div row.
    const buttonRows = [];
    const buttons = this.state.buttons;

    for (let i = 0; i < buttons.length; i += 3) {
      let childrenButtons = [];

      let countLimit = 3;

      // if remaining buttons is fewer than 3 buttons. Replace count limit to number of remaining buttons
      if (i + 3 > buttons.length - 1) {
        countLimit = buttons.length - i;
      }

      for (let j = i; j < i + countLimit; j += 1) {
        childrenButtons.push(
          this.renderSoundPads(buttons[j][0], buttons[j][1])
        );
      }

      buttonRows.push(<div>{childrenButtons}</div>);
      childrenButtons = [];
    }
    return buttonRows;
  }

  render() {
    return (
      <div className="music-container">
        <div id="display">{this.renderSoundBoard()}</div>
      </div>
    );
  }
}

export default MainDisplay;
