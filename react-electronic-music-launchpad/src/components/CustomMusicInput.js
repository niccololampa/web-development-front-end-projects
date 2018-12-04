import React from 'react';

function CustomMusicInput(props) {
  const { buttons, onClickAddMore, onUpdate } = props;

  //   create row for inputs depending on Array Length
  function renderMusicInputForm(musArray) {
    const numberOfSfx = musArray.length;
    const rows = [];

    for (let i = 0; i < numberOfSfx; i += 1) {
      rows.push(
        <tr key={`row${i}`}>
          <th>
            <input
              className="input-customize"
              type="text"
              value={musArray[i].keyVal}
              name={`${i}-keyVal`}
              onChange={onUpdate}
            />
          </th>
          <th>
            <input
              className="input-customize"
              type="text"
              value={musArray[i].instName}
              name={`${i}-instName`}
              onChange={onUpdate}
            />
          </th>
          <th>
            <input
              className="input-customize"
              type="text"
              value={musArray[i].soundUrl}
              name={`${i}-soundUrl`}
              onChange={onUpdate}
            />
          </th>
        </tr>
      );
    }
    return rows;
  }

  return (
    <form className="music-form">
      <table className="music-table">
        <tbody>
          <tr>
            <th>KEYBOARD KEY</th>
            <th>INSTRUMENT NAME</th>
            <th>
              MUSIC URL
              <br /> (include https:// or http://)
            </th>
          </tr>
          {renderMusicInputForm(buttons)}
          <tr>
            <th />
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        onClick={onClickAddMore}
        className="add-more-button"
      >
        Add More Buttons
      </button>
    </form>
  );
}

export default CustomMusicInput;
