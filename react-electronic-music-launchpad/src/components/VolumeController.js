import React from 'react';

function VolumeController(props) {
  const { volume, onChange } = props;

  // set volume
  function changeVol(elem) {
    elem.volume = volume / 100;
  }

  function setVolume() {
    document.querySelectorAll('audio').forEach(elem => changeVol(elem));
  }

  setVolume();

  return (
    <input
      type="range"
      value={volume}
      id="volume"
      min="0"
      max="100"
      step="5"
      onChange={onChange}
    />
  );
}

export default VolumeController;
