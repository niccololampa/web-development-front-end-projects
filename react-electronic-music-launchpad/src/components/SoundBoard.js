import React, { Component } from 'react';
import SoundPads from './SoundPads';

// SoundBoard Component  (Collection of Buttons)
class SoundBoard extends Component {
  constructor(props) {
    super(props);
    this.is_Mounted = false;

    this.handleSoundPadClick = this.handleSoundPadClick.bind(this);
    this.renderSoundBoard = this.renderSoundBoard.bind(this);
  }

  componentDidMount() {
    this.is_Mounted = true;
    /* event listener for keyboard will get 
      the event.key value then implement the same fucntion for soundpad click */

    document.addEventListener('keyup', event => {
      if (this.is_Mounted === true) {
        this.handleSoundPadClick(event.key.toUpperCase());
      }
    });
  }

  componentWillUnmount() {
    this.is_Mounted = false;
    document.removeEventListener('keyup', event => {
      if (this.is_Mounted === true) {
        this.handleSoundPadClick(event.key.toUpperCase());
      }
    });
  }

  // Handle SoundPadMouseClick (also handles keyboard down events)
  handleSoundPadClick(keyVal) {
    const { power, display } = this.props;

    // only plays music if key is included in the program
    if (document.getElementById(keyVal) != null) {
      // will display the instrument id in display
      const music = document.getElementById(keyVal);

      const idParentButton = music.parentElement.id;
      const parentButton = document.getElementById(idParentButton);

      // will add a clicked class to parent button when clicked (Power off)
      if (!power) {
        parentButton.className += ' pad-activate-poweroff';
      }

      if (power) {
        // will add a clicked class to parent button when clicked (Power on)
        parentButton.className += ' pad-activate';
        display(idParentButton);
        music.currentTime = 0;
        music.play();
      }

      setTimeout(() => {
        parentButton.classList.remove('pad-activate-poweroff', 'pad-activate');
      }, 100);
    }
  }

  // button renderer so every button component is unique
  renderSoundPads(keyVal, sound, instName, power) {
    // replace instName so that space can be converted to - and will be valid to be used as id.
    const newInstName = instName.replace(/\s/g, '-').toUpperCase();
    return (
      <SoundPads
        key={newInstName}
        keyVal={keyVal}
        newInstName={newInstName}
        sound={sound}
        power={power}
        onClick={() => this.handleSoundPadClick(keyVal)}
      />
    );
  }

  // buttons / Soundpad are arranged in the soundPad
  renderSoundBoard() {
    const { buttons, power } = this.props;
    // create rows of buttons.
    // this will place 3 buttons per div row.
    const buttonRows = [];

    for (let i = 0; i < buttons.length; i += 3) {
      let childrenButtons = [];

      let countLimit = 3;

      // if remaining buttons is fewer than 3 buttons. Replace count limit to number of remaining buttons
      if (i + 3 > buttons.length - 1) {
        countLimit = buttons.length - i;
      }

      for (let j = i; j < i + countLimit; j += 1) {
        // only render if key is provided
        if (buttons[j].keyVal !== '') {
          childrenButtons.push(
            this.renderSoundPads(
              buttons[j].keyVal,
              buttons[j].soundUrl,
              buttons[j].instName,
              power
            )
          );
        }
      }

      buttonRows.push(
        <div key={`buttonRow${i}`} className="sound-board-rows">
          {childrenButtons}
        </div>
      );
      childrenButtons = [];
    }
    return buttonRows;
  }

  render() {
    return <div className="sound-board">{this.renderSoundBoard()}</div>;
  }
}

export default SoundBoard;
