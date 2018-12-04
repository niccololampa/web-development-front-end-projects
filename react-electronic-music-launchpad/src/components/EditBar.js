import React from 'react';
import CustomMusicInput from './CustomMusicInput';
import './EditBar.css';

function EditBar(props) {
  const {
    buttons,
    editMode,
    handleAddMoreButtons,
    handleUpdate,
    handleCustomizeButton
  } = props;
  return (
    <div className={editMode ? 'edit-area-active' : 'edit-area-non-active'}>
      {editMode && (
        <CustomMusicInput
          buttons={buttons}
          onClickAddMore={handleAddMoreButtons}
          onUpdate={handleUpdate}
        />
      )}
      <button
        type="button"
        className={
          editMode ? 'customize-button-active' : 'customize-button-inactive'
        }
        onClick={handleCustomizeButton}
      >
        <div>
          <i
            className={editMode ? 'fa fa-gear fa-spin gear' : 'fa fa-gear gear'}
          />
        </div>
        {editMode ? 'DONE' : 'ADD / CUSTOM'}
      </button>
      <div className="author">
        Created by Niccolo Lampa. For React demo purposes only. Email
        niccololampa@gmail.com
      </div>
    </div>
  );
}

export default EditBar;
