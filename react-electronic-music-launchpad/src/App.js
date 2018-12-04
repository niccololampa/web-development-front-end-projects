import React, { Component } from 'react';
import LaunchPad from './components/LaunchPad';
import EditBar from './components/EditBar';

const defButtons = [
  {
    keyVal: 'Q',
    soundUrl: 'https://www.freesfx.co.uk/rx2/mp3s/5/17650_1462196936.mp3',
    instName: 'BEAT'
  },
  {
    keyVal: 'W',
    soundUrl:
      'https://d9olupt5igjta.cloudfront.net/samples/sample_files/7085/14305f61566036b8573ea55b58b6f69854e4ed10/mp3/_96_Scratch_Loop_03.mp3?1512767102',
    instName: 'SCRATCHING'
  },
  {
    keyVal: 'E',
    soundUrl:
      'https://d9olupt5igjta.cloudfront.net/samples/sample_files/2330/60dec82e0d752a5e51aef5fc9f59a247ad2e5c6c/mp3/_BHK_FX_Long_66.mp3?1512765677',
    instName: 'BUZZY DROP'
  },
  {
    keyVal: 'A',
    soundUrl:
      'https://sampleswap.org/samples-ghost/SFX%20and%20UNUSUAL%20SOUNDS/ELECTRO%20and%20SYNTHETIC/209[kb]space-whirl-up.wav.mp3',
    instName: 'LASER'
  },
  {
    keyVal: 'S',
    soundUrl:
      'https://sampleswap.org/samples-ghost/SFX%20and%20UNUSUAL%20SOUNDS/ELECTRO%20and%20SYNTHETIC/280[kb]laser-treatment-0.wav.mp3',
    instName: 'WARP'
  },
  {
    keyVal: 'D',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    instName: 'OPEN HH'
  },
  {
    keyVal: 'Z',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    instName: 'KICK AND HAT'
  },
  {
    keyVal: 'X',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    instName: 'KICK'
  },
  {
    keyVal: 'C',
    soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    instName: 'CLAP'
  }
];

// MainDisplay Component
class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: defButtons,
      editMode: false
    };

    this.handleCustomizeButton = this.handleCustomizeButton.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleAddMoreButtons = this.handleAddMoreButtons.bind(this);
  }

  handleCustomizeButton() {
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  }

  handleUpdate(e) {
    const { buttons } = this.state;
    const updateButtons = [...buttons];
    // get the target which changed
    const { target } = e;
    // get the name of the target. Name has string format rowNumber-ObjectProperty
    let { value } = target;
    const { name } = target;
    // split rowNumber and Object Property and create a reference list
    const rowElement = name.split('-');
    // get the row number of target derived from name
    const rowNum = rowElement[0];
    // get the ObjectProperty
    const property = rowElement[1];
    // to make sure that all key reference are uppercase.
    if (property === 'keyVal' && value !== '') {
      const newkeyVal = value[0].toUpperCase();
      // check if key exist already
      // get the current keys
      const existingKeys = buttons.map(x => x.keyVal);
      // check if value is in the existing keys
      const existing = existingKeys.indexOf(newkeyVal) !== -1;

      // reject value and reset to blank if already existing
      if (existing) {
        value = '';
        window.alert('No duplicate keys allowed');
      }

      if (!existing) {
        value = newkeyVal;
      }
    }
    // update the buttons
    updateButtons[rowNum][property] = value;
    this.setState({ buttons: updateButtons });
  }

  handleAddMoreButtons() {
    const { buttons } = this.state;
    const updateButtons = buttons.slice();
    // number of rows
    const numRows = buttons.length + 1;

    updateButtons.push({
      keyVal: '',
      soundUrl: 'https://',
      instName: `INSTRUMENT ${numRows}`
    });

    this.setState({ buttons: updateButtons });
  }

  render() {
    const { buttons, editMode } = this.state;
    return (
      <div>
        {!editMode && <LaunchPad buttons={buttons} />}
        <EditBar
          buttons={buttons}
          editMode={editMode}
          handleAddMoreButtons={this.handleAddMoreButtons}
          handleUpdate={this.handleUpdate}
          handleCustomizeButton={this.handleCustomizeButton}
        />
      </div>
    );
  }
}
export default MainDisplay;
