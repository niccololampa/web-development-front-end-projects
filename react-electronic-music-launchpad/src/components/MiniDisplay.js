import React from 'react';

function MiniDisplay(props) {
  const { display, classString } = props;

  return (
    <div id="display" className={classString}>
      <span>
        {typeof display === 'string'
          ? display.replace(/-/g, ' ').toUpperCase()
          : display}
      </span>
    </div>
  );
}

MiniDisplay.defaultProps = {
  display: 'None'
};

export default MiniDisplay;
