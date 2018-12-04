import React from 'react';

// Buttons Component

function Keypads(props) {
  const { buttonId, buttonValue, name, classStyle, handleButtonClick } = props;

  return (
    <button
      type="button"
      id={buttonId}
      name={name}
      value={buttonValue}
      className={classStyle}
      onClick={() => handleButtonClick(buttonValue)}
    >
      {buttonValue}
    </button>
  );
}

export default Keypads;
