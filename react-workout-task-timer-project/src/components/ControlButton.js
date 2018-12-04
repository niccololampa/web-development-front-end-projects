import React from 'react';

function ControlButton(props) {
  const { id, classStyle, value, clickButtons, buttonDisplay } = props;

  return (
    <div className={classStyle}>
      <button
        type="button"
        id={id}
        value={value}
        className={id}
        onClick={() => clickButtons(value)}
      >
        {buttonDisplay}
      </button>
    </div>
  );
}

export default ControlButton;
