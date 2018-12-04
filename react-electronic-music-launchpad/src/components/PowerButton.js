import React from 'react';

function PowerButton(props) {
  const { power, onClick } = props;

  // Try to mute all video and audio elements on the page
  function offSound() {
    document.querySelectorAll('audio').forEach(elem => elem.pause());
  }

  if (!power) {
    offSound();
  }

  return (
    <div>
      {power ? (
        <button
          type="button"
          className="btn btn-2 btn-2i btn-off"
          onClick={onClick}
        >
          ON
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-2 btn-2i btn-on"
          onClick={onClick}
        >
          OFF
        </button>
      )}
    </div>
  );
}

export default PowerButton;
