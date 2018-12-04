import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import LengthInput from './components/LengthInput';
import TimeDisplay from './components/TimeDisplay';
import PlayStopButtons from './components/PlayStopButtons';

import './App.css';

class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 1,
      breakLength: 2,
      timeDisplayed: { min: 1, sec: 0 },
      countdown: false,
      sessionNow: true
    };

    this.switchSession = this.switchSession.bind(this);
    this.timing = this.timing.bind(this);
    this.handlePlayButtons = this.handlePlayButtons.bind(this);
    this.handlePauseButton = this.handlePauseButton.bind(this);
    this.handleResetButtons = this.handleResetButtons.bind(this);
    this.handleSessionInput = this.handleSessionInput.bind(this);
    this.handleBreakInput = this.handleBreakInput.bind(this);
  }

  switchSession() {
    const {
      sessionLength,
      breakLength,
      timeDisplayed,
      sessionNow
    } = this.state;

    // timer ends
    if (timeDisplayed.min === 0 && timeDisplayed.sec === 0) {
      // play alarm
      const music = document.getElementById('beep');
      music.play();

      // session time ends
      if (sessionNow) {
        this.setState({ sessionNow: false });
        return { min: breakLength, sec: 0 };
      }

      // break time ends
      if (!sessionNow) {
        this.setState({ sessionNow: true });
        return { min: sessionLength, sec: 0 };
      }
    }

    // if timer did not end just return the previous
    return timeDisplayed;
  }

  // function to set the time
  timing() {
    const newTimeDisplayed = this.switchSession();

    if (newTimeDisplayed.sec === 0) {
      newTimeDisplayed.sec = 60;
      newTimeDisplayed.min -= 1;
    }

    newTimeDisplayed.sec -= 1;
    this.setState({ timeDisplayed: newTimeDisplayed, countdown: true });
  }

  handlePlayButtons() {
    // initialize the timer
    this.timer = setInterval(this.timing, 1000);
    this.setState({ countdown: true });
  }

  handlePauseButton() {
    this.setState({ countdown: false });
    clearInterval(this.timer);
    document.getElementById('beep').pause();
    document.getElementById('beep').load();
  }

  handleResetButtons() {
    document.getElementById('beep').pause();
    clearInterval(this.timer);
    // if reset is pressed bring back to default
    this.setState({
      sessionLength: 1,
      breakLength: 1,
      timeDisplayed: { min: 1, sec: 0 },
      countdown: false,
      sessionNow: true
    });
  }

  handleSessionInput(type) {
    const { sessionLength, timeDisplayed, countdown } = this.state;

    /* only execute when countdown is not ongoing    */
    if (countdown === false) {
      let newSessionLength = sessionLength;

      /* add or subract minutes only if 
      greater than 0 and lower than or equal to 60 */
      if (type === '+' && sessionLength < 60) {
        newSessionLength += 1;
      } else if (type === '-' && sessionLength > 1) {
        newSessionLength -= 1;
      }

      const newTimeDisplayed = { ...timeDisplayed };

      newTimeDisplayed.min = String(newSessionLength);
      newTimeDisplayed.sec = 0;

      this.setState({
        sessionLength: newSessionLength,
        timeDisplayed: newTimeDisplayed,
        sessionNow: true
      });
    }
  }

  handleBreakInput(type) {
    const { breakLength, countdown } = this.state;

    /* only execute when countdown is not ongoing    */
    if (countdown === false) {
      let newBreakLength = breakLength;

      /* add or subract minutes only if 
      greater than 0 and lower than or equal to 60 */
      if (type === '+' && breakLength < 60) {
        newBreakLength += 1;
      } else if (type === '-' && breakLength > 1) {
        newBreakLength -= 1;
      }

      this.setState({ breakLength: newBreakLength });
    }
  }

  render() {
    const {
      sessionLength,
      countdown,
      breakLength,
      timeDisplayed,
      sessionNow
    } = this.state;
    return (
      <div className="App">
        <div className="title-area"> REACT WORKOUT & TASK TIMER </div>
        <div className="clock-area">
          <TimeDisplay display={timeDisplayed} sessionNow={sessionNow} />
          <PlayStopButtons
            clickPlayButtons={this.handlePlayButtons}
            clickPauseButtons={this.handlePauseButton}
            clickResetButtons={this.handleResetButtons}
            countdown={countdown}
          />

          <div className="input-area">
            <LengthInput
              purpose="SESSION"
              id="session"
              timeLength={sessionLength}
              classStyle="time-input"
              clickButtons={this.handleSessionInput}
            />
            <LengthInput
              purpose="BREAK"
              id="break"
              timeLength={breakLength}
              classStyle="time-input"
              clickButtons={this.handleBreakInput}
            />
          </div>
        </div>
        <div className="author-area">
          <div className="author">
            Coded and designed by Niccolo Lampa. For react demo purposes only.
            Email: niccololampa@gmail.com
          </div>
        </div>
        <audio
          className="clip"
          id="beep"
          // src="https://d9olupt5igjta.cloudfront.net/samples/sample_files/11234/0ef16664224d4540ac40ef77816f772563909556/mp3/_VEH2_Special_Sounds_-_06.mp3?1487528109"
          src="https://d9olupt5igjta.cloudfront.net/samples/sample_files/9466/0af92cebb54694aa75ef1bcfbfc1bb3148c7f639/mp3/144133-loopx2-wav.mp3?1480660434"
        >
          <track kind="captions" />
        </audio>
      </div>
    );
  }
}

export default MainDisplay;
