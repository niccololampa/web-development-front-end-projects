import React from 'react';
import ControlButton from './ControlButton';

import './PlayStopButtons.css';

function PlayStopButtons(props) {
  const {
    clickPlayButtons,
    clickPauseButtons,
    clickResetButtons,
    countdown
  } = props;
  return (
    <div className="play-stop-area">
      <ControlButton
        id="start_stop"
        value="start_stop"
        buttonDisplay={
          <div>
            <i className="fa fa-play" aria-hidden="true" />
            <i className="fa fa-pause" aria-hidden="true" />
          </div>
        }
        classStyle="control"
        clickButtons={
          countdown === false ? clickPlayButtons : clickPauseButtons
        }
      />
      <ControlButton
        id="reset"
        value="reset"
        buttonDisplay={<i className="fa fa-refresh" aria-hidden="true" />}
        classStyle="control"
        clickButtons={clickResetButtons}
      />
    </div>
  );
}

export default PlayStopButtons;
