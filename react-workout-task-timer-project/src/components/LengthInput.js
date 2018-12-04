import React from 'react';
import ControlButton from './ControlButton';

function LengthInput(props) {
  const { purpose, id, timeLength, classStyle, clickButtons } = props;

  return (
    <div className={classStyle}>
      <div id={`${id}-label`} className="adjust-label">
        {purpose}
      </div>
      <div className="input-click-area">
        <ControlButton
          id={`${id}-increment`}
          value="+"
          buttonDisplay="+"
          clickButtons={clickButtons}
        />
        <div className="time-length-display">{timeLength}</div>
        <ControlButton
          id={`${id}-decrement`}
          value="-"
          buttonDisplay="-"
          clickButtons={clickButtons}
        />
      </div>
    </div>
  );
}

export default LengthInput;
