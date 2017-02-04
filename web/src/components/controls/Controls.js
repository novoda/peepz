import React from 'react';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import Style from './controls.style';

const Controls = ({ onPreview, closePreview, startScreenshot, cameraIsActive}) => {
  if (cameraIsActive) {
    return (
      <div className={css(Style.closeButtonStyle)}>
        <button className={css(Style.buttonStyle)} onClick={closePreview}>❌</button>
        <button className={css(Style.buttonStyle)} onClick={startScreenshot}>📷</button>
      </div>
    );
  } else {
    return (
      <button className={css(Style.pictureTakeButtonStyle)} onClick={onPreview}>
        <img className={css(Style.pictureTakeIconStyle)} />
      </button>
    );
  }
};

const ControlsContainer = connect(state => {
  return {
    cameraIsActive: state.camera.active
  };
}, (dispatch => {
  return {
    onPreview: () => {
      dispatch({type: 'showPreview'});
    },
    closePreview: () => {
      dispatch({type: 'closePreview'});
    },
    startScreenshot: () => {
      dispatch({type: 'manualScreenshot'});
    }
  };
}))(Controls);

export {
  ControlsContainer
};
