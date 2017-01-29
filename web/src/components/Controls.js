import React from 'react';
import { connect } from 'react-redux';

import pictureTakeIcon from '../../assets/ic_picturetake.png'

const pictureTakeIconStyle = {
  width: '36px',
  maxHeight: '100%'
};

const pictureTakeButtonStyle = {
  position: 'absolute',
  cursor: 'pointer',
  border: 'none',
  bottom: '0',
  right: '0',
  zIndex: '1',
  background: 'transparent'
};

const closeButtonStyle = {
  position: 'absolute',
  zIndex: '1'
}

const buttonStyle = {
  cursor: 'pointer',
};

const Controls = ({ onPreview, closePreview, startScreenshot, cameraIsActive}) => {
  if (cameraIsActive) {
    return (
      <div style={closeButtonStyle}>
        <button style={buttonStyle} onClick={closePreview}>❌</button>
        <button style={buttonStyle} onClick={startScreenshot}>📷</button>
      </div>
    );
  } else {
    return (
      <button style={pictureTakeButtonStyle} onClick={onPreview}>
        <img style={pictureTakeIconStyle} src={pictureTakeIcon} />
      </button>
    );
  }
}

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
    startScreenshot: (screenshot) => {
      dispatch({type: 'manualScreenshot'});
    }
  }
}))(Controls);

export {
  ControlsContainer
};
