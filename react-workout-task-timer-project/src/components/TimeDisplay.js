import React from 'react';
import './TimeDisplay.css';

function TimeDisplay(props) {
  const { sessionNow, display } = props;

  return (
    <div className="time-display">
      <div id="timer-label" className="timer-label">
        {sessionNow ? 'SESSION' : 'BREAK'}
      </div>
      <div id="timer-left" className="timer-left">
        {`${display.min}:${display.sec < 10 ? 0 : ''}${display.sec}`}{' '}
      </div>
    </div>
  );
}

export default TimeDisplay;
