import React from 'react';
import './Display.css';

function Display(props) {
  const { input, display } = props;

  return (
    <div className="combined-display">
      <div className="input" id="input">
        {input}
      </div>
      <div className="display"> {display}</div>
    </div>
  );
}

export default Display;
