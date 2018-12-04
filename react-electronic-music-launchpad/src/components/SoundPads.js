import React from 'react';

// SoundPads Component
function SoundPads(props) {
  const { keyVal, sound, newInstName, power, onClick } = props;

  return (
    <button
      id={newInstName}
      type="button"
      className={`drum-pad btn btn-2b ${power ? 'btn-2-pad' : 'pad-poweroff'}`}
      onClick={onClick}
    >
      <audio className="clip" id={keyVal} src={sound}>
        <track kind="captions" />
      </audio>
      {keyVal}
    </button>
  );
}

export default SoundPads;
